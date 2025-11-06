import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { prisma } from '../app';
import config from '../config';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '../services/tokenService';
import { add } from 'date-fns';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
});

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

  const { email, password, name } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: 'Email already in use' });

  const hashed = await bcrypt.hash(password, config.bcryptRounds);
  const user = await prisma.user.create({ data: { email, password: hashed, name } });
  res.status(201).json({ id: user.id, email: user.email });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const access = signAccessToken(user);
  const refresh = signRefreshToken(user);

  // store refresh session
  const expiresAt = add(new Date(), { days: 7 });
  await prisma.session.create({
    data: { userId: user.id, refreshToken: refresh, expiresAt }
  });

  res.json({ accessToken: access, refreshToken: refresh });
});

router.post('/refresh', async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) return res.status(400).json({ error: 'Missing token' });

  let payload: any;
  try {
    payload = verifyRefreshToken(token);
  } catch (e) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
  // verify session exists
  const session = await prisma.session.findUnique({ where: { refreshToken: token } });
  if (!session) return res.status(401).json({ error: 'Session not found' });

  // sign a new pair (rotate refresh token - simple rotation)
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const newAccess = signAccessToken(user);
  const newRefresh = signRefreshToken(user);
  const expiresAt = add(new Date(), { days: 7 });

  // update session
  await prisma.session.update({
    where: { id: session.id },
    data: { refreshToken: newRefresh, expiresAt }
  });

  res.json({ accessToken: newAccess, refreshToken: newRefresh });
});

export default router;
