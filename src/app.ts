import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth';

export const prisma = new PrismaClient();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

// simple health route
app.get('/', (req, res) => res.json({ ok: true, version: 'authkit-1.0' }));

export default app;
