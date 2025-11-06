import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '@prisma/client';
import { add } from 'date-fns';

export function signAccessToken(user: Partial<User>) {
  return jwt.sign({ userId: user.id, role: user.role }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpire
  });
}

export function signRefreshToken(user: Partial<User>) {
  return jwt.sign({ userId: user.id }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpire
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, config.jwt.accessSecret);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.jwt.refreshSecret);
}
