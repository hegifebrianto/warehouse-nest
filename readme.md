# 📦 Warehouse API

A robust backend system for managing warehouse and inventory operations, built with [NestJS](https://nestjs.com/), MongoDB, Bull (Redis), and Swagger.

## ✨ Features

* 🔐 Authentication (JWT-based login, password change, email update, etc.)
* 📦 Warehouse and Inventory CRUD
* 📨 Email confirmation and notification using Resend API
* 📄 Swagger UI documentation
* 🧅 Job Queue support using Bull (Redis)
* 🌐 Config-based environment setup with `@nestjs/config`
* 🧪 Unit and E2E testing using Jest

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hegifebrianto/warehouse-nest.git
cd warehouse-api
```

### 2. Install dependencies

```bash
npm install
```

> If you face peer dependency issues, use `--legacy-peer-deps`

---

### 3. Environment Setup

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/warehouse
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=re_xxx
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

### 4. Run the App

#### Development mode (with auto-reload):

```bash
npm run dev
```

#### Production mode:

```bash
npm run build
npm run start:prod
```

---

## 📚 API Documentation

Swagger UI is available at:

```
http://localhost:3000/api
```

> Make sure your server is running and `SwaggerModule` is configured in `main.ts`.

---

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e
```

---

## 🛠️ Tech Stack

* **Framework**: NestJS
* **Database**: MongoDB with Mongoose
* **Queue**: Bull + Redis
* **Email**: Resend
* **Auth**: Passport + JWT
* **Validation**: class-validator
* **Docs**: Swagger

---

## 📁 Project Structure

```
src/
│
├── auth/                  # Authentication (login, register, guards, etc.)
├── models/                # Core business entities (e.g., users, warehouses)
├── emails/                # Resend email handling
├── common/                # Shared DTOs, guards, and interfaces
├── main.ts                # App entry point
└── app.module.ts          # Root module
```

---

## 🧑‍💻 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a pull request

---

## 📄 License

MIT

---

## 🔗 Related Links

* NestJS: [https://nestjs.com](https://nestjs.com)
* Resend: [https://resend.com](https://resend.com)
* MongoDB: [https://www.mongodb.com](https://www.mongodb.com)
