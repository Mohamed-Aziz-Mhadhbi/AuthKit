import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/tokenService';

export function requireAuth(role?: string) {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Missing authorization' });
    const [bearer, token] = auth.split(' ');
    if (bearer !== 'Bearer' || !token) return res.status(401).json({ error: 'Invalid auth header' });

    try {
      const payload: any = verifyAccessToken(token);
      req.user = payload;
      if (role && payload.role !== role) return res.status(403).json({ error: 'Forbidden' });
      next();
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
