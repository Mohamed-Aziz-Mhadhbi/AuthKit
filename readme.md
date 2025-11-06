# 🔐 AuthKit — Secure Authentication Boilerplate (Next.js + Node.js + PostgreSQL)

AuthKit is a full-stack authentication boilerplate built with **Next.js**, **Node.js (Express)**, and **PostgreSQL**.  
It includes **JWT authentication**, **refresh tokens**, **role-based access control**, **input validation (Zod)**, and **testing with Jest & Supertest**.

This project is designed as a **starter template** for developers who want to build secure, scalable web or mobile apps using a modern JavaScript stack.

---

## 🧠 Features

✅ Secure authentication (JWT + refresh tokens)  
✅ Role-based access control (Admin / User)  
✅ Input validation with Zod  
✅ Password hashing (bcrypt)  
✅ Prisma ORM for database modeling  
✅ Centralized error handling & logging  
✅ REST API with Express  
✅ Unit & integration tests (Jest + Supertest)  
✅ Frontend: Next.js (TypeScript, App Router, Context-based Auth)  
✅ Deployed easily with Render (backend) & Vercel (frontend)

---

## 🧱 Architecture

authkit/
├── client/              # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── context/AuthContext.tsx
│   ├── lib/api.ts
│   └── ...
└── server/              # Express + Node.js backend
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/auth.ts
│   ├── controllers/authController.ts
│   ├── middleware/authMiddleware.ts
│   ├── prisma/schema.prisma
│   └── utils/
│       ├── generateToken.ts
│       └── validateInput.ts
├── tests/
│   ├── auth.test.ts
└── package.json

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/authkit.git
cd authkit
```

### 2️⃣ Backend setup
```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/authkit"
ACCESS_TOKEN_SECRET="your_access_secret"
REFRESH_TOKEN_SECRET="your_refresh_secret"
PORT=5000
```

Run Prisma migrations:
```bash
npx prisma migrate dev
```

Start the server:
```bash
npm run dev
```

Backend runs on:  
👉 http://localhost:5000

---

### 3️⃣ Frontend setup
```bash
cd client
npm install
npm run dev
```

Frontend runs on:  
👉 http://localhost:3000

---

## 🔐 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|-----------|-------------|----------------|
| POST | /api/register | Register new user | ❌ |
| POST | /api/login | Login and get tokens | ❌ |
| POST | /api/refresh | Get new access token | ✅ |
| GET | /api/profile | Get logged-in user data | ✅ |

Example request:

```bash
POST /api/register
{
  "name": "User",
  "email": "user@example.com",
  "password": "strongpassword"
}
```

---

## 🧪 Testing

Run unit and integration tests:
```bash
npm test
```

Tests use:

- Jest for unit tests  
- Supertest for API integration  

Example: registration, login, invalid token, role-based access

```ts
it("should register a user successfully", async () => {
  const res = await request(app)
    .post("/api/register")
    .send({ email: "test@test.com", password: "123456" });
  expect(res.statusCode).toBe(201);
});
```

---

## 🧰 Tech Stack

| Layer | Technologies |
|-------|---------------|
| Frontend | Next.js 14, TypeScript, Tailwind, React Context |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL + Prisma |
| Auth | JWT, bcrypt |
| Validation | Zod |
| Testing | Jest, Supertest |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🧑‍💻 Security Practices

- Hash passwords with bcrypt  
- Use HTTP-only cookies or headers for tokens  
- Validate all inputs with Zod  
- Implement rate limiting on login/register routes  
- Add Helmet middleware for secure headers  
- Configure CORS by whitelist  
- Separate secrets from code in `.env`  

---

## 📦 Deployment

### Backend
1. Create a Render or Railway app  
2. Add your `.env` variables  
3. Push your server code  

### Frontend
1. Deploy `client` folder to Vercel  
2. Add backend API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🧭 Folder Conventions

| Folder | Description |
|--------|--------------|
| controllers/ | Business logic (register, login, refresh) |
| middleware/ | Auth and validation middlewares |
| routes/ | Express routes (auth endpoints) |
| prisma/ | Database schema |
| tests/ | Jest + Supertest specs |

## 🪪 License

This project is licensed under the **MIT License** — feel free to use and adapt it for your own apps.
