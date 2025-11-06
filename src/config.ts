import dotenv from 'dotenv';
dotenv.config();

export default {
  port: Number(process.env.PORT || 4000),
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET || 'dev-access-secret',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'dev-refresh-secret',
    accessExpire: process.env.ACCESS_TOKEN_EXP || '15m',
    refreshExpire: process.env.REFRESH_TOKEN_EXP || '7d'
  },
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 10)
};
