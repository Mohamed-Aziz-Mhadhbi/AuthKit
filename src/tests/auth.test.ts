import request from 'supertest';
import app, { prisma } from '../app';
import { prisma as client } from '../app';

describe('Auth routes', () => {
  beforeAll(async () => {
    // ensure DB in test env; using sqlite or a test Postgres recommended 
  });

  afterAll(async () => {
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('register -> login -> refresh works', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const r1 = await request(app).post('/auth/register').send({ email, password });
    expect(r1.status).toBe(201);
    const r2 = await request(app).post('/auth/login').send({ email, password });
    expect(r2.status).toBe(200);
    expect(r2.body).toHaveProperty('accessToken');
    expect(r2.body).toHaveProperty('refreshToken');

    const refresh = r2.body.refreshToken;
    const r3 = await request(app).post('/auth/refresh').send({ refreshToken: refresh });
    expect(r3.status).toBe(200);
    expect(r3.body).toHaveProperty('accessToken');
    expect(r3.body).toHaveProperty('refreshToken');
  });
});
