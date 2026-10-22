# 🛍️ bagCart — Full-Stack E-Commerce Platform

#  About the Project

### What is this?
**bagCart** is a complete, ready-to-run online store. Think of it like your own personal Amazon or Shopify store, built from scratch with both:
1. **A public storefront** where customers can browse items, add them to a shopping cart, and pay.
2. **A private admin dashboard** where store managers can check revenue graphs, add new items, change prices, and update orders.

---

### What Can You Do With It?

#### 🙋 For Shoppers & Customers
- **Browse & Search Products**: Easily search through categories, filter by price, and pick sizes or colors.
- **Smart Shopping Cart**: Add items, update quantities, and see live price calculations. Even if you aren’t logged in yet, your cart remembers what you added!
- **Safe Checkout**: Pay securely using card payments powered by Stripe.
- **Live Customer Support Chat**: Chat directly with a support agent in real time if you have questions.
- **Order Tracking & Receipts**: Review past purchases and download PDF receipts.
- **Flexible Sign-in**: Log in with traditional email/password or use one-click social login (Google, Facebook, Twitter).

#### 💼 For Store Owners & Admins
- **Sales & Revenue Dashboard**: View easy-to-read charts showing today's revenue, popular items, and new customers.
- **Product & Inventory Management**: Add new products, upload images, set discount prices, and manage stock counts.
- **Order Processing**: Track orders as they move from *Pending* $\rightarrow$ *Shipped* $\rightarrow$ *Delivered*.
- **Data Export & Import**: Download your sales and orders directly to Excel spreadsheets (`.xlsx`) or CSV files.
- **Live Support Console**: Respond immediately to customer chat messages from within the dashboard.

---

#  Technicalities & System Requirements

This is technical details for developers to understand the project architecture, dependencies, and requirements under the hood.

### 🧱 Tech Stack Overview

#### Frontend (`src/client`)
- **Core Framework**: **Next.js 15.5** (App Router architecture) on **React 19**.
- **Styling**: **Tailwind CSS v4** & PostCSS for responsive layouts; **Framer Motion** for micro-interactions and transitions.
- **State Management**: **Redux Toolkit** (`@reduxjs/toolkit`) + `react-redux` for client-side cart and user session persistence.
- **Data Layer**: 
  - **Apollo Client 3** for GraphQL queries and subscriptions.
  - **Axios** for RESTful API calls.
  - **Zod** + **React Hook Form** for schema validation and form handling.
- **Charts & Visuals**: **ApexCharts** (`react-apexcharts`) for business analytics; **Lucide React** for clean vector icons.
- **Real-Time Client**: **Socket.IO Client** for WebSocket connection to support chat.

#### Backend (`src/server`)
- **Runtime & Framework**: **Node.js** (v20+) with **Express 4.21** written in strict **TypeScript 5**.
- **Database & ORM**: **PostgreSQL** driven by **Prisma ORM 6.13** (automated migrations, type-safe schema modeling).
- **Caching & Sessions**: **Redis** with `connect-redis` for distributed session persistence and high-speed data caching.
- **Background Jobs & Queues**: **BullMQ** for managing asynchronous tasks without blocking request threads.
- **API Interfaces**:
  - **REST API** (`/api/v1`) with versioned route controllers.
  - **GraphQL Server** via **Apollo Server 5** (`/graphql`) integrated with Express middleware.
  - **OpenAPI / Swagger** (`/api-docs`) with live endpoint testing.
- **Payments & Webhooks**: **Stripe Node SDK** (handles checkout sessions, payments, and asynchronous webhook verification).
- **Authentication & Security**:
  - **Passport.js** (Google OAuth 2.0, Facebook, Twitter).
  - **JWT** (JSON Web Tokens: access + refresh tokens).
  - Security hardening: **Helmet**, **HPP** (HTTP Parameter Pollution), **Express-Mongo-Sanitize** (NoSQL injection guard), and **CORS**.
- **Media & File Storage**: **Cloudinary** integration paired with **Multer** for multipart image uploads.
- **Reporting & Exports**: **ExcelJS**, `csv-parse`, `csv-stringify`, and **PDFKit** for PDF receipts.
- **Logging**: **Winston** structured JSON logging and **Morgan** HTTP traffic logger.

---

###  System Requirements

Before running the project, verify you have the following software installed:

| Requirement | Minimum / Recommended | Purpose |
| :--- | :--- | :--- |
| **Node.js** | **v20.x or higher** | JavaScript runtime for both client and server |
| **npm** | **v10.x or higher** | Node package manager |
| **PostgreSQL** | **v15.x or higher** | Primary database |
| **Redis** | **v7.x or higher** | Session store, caching, and background queues |
| **Git** | Latest | Source code management |
| **Docker** *(Optional)* | Latest | Convenient if you prefer running Postgres & Redis in containers |

---

# Setup Guide

Follow these numbered steps to get the entire platform up and running locally.

### Step 1: Clone the Repository
Open your terminal and clone the repository:
```bash
git clone https://github.com/your-username/bagCart.git
cd bagCart
```

---

### Step 2: Configure Environment Files

You need to create three `.env` files from their example templates:

#### 1. Root Database Credentials
From the project root:
```bash
cp src/.env.example src/.env
```

#### 2. Backend Server Config
Go to `src/server` and copy the environment template:
```bash
cd src/server
cp .env.example .env
```
Open `src/server/.env` and review the key settings:
```env
# Database connection string (replace with your local postgres user, password, and port)
DATABASE_URL=postgresql://postgres:password@localhost:5432/b2c_ecommerce?schema=public

# Server configuration
PORT=5000
NODE_ENV=development

# Redis URL
REDIS_URL=redis://localhost:6379

# Secrets (use any random string for local testing)
ACCESS_TOKEN_SECRET=your-random-access-secret-12345
REFRESH_TOKEN_SECRET=your-random-refresh-secret-12345
SESSION_SECRET=your-random-session-secret-12345
COOKIE_SECRET=your-random-cookie-secret-12345

# Frontend URL
CLIENT_URL_DEV=http://localhost:3000

# Stripe (Optional for initial browse, required for checkout testing)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 3. Frontend Client Config
From the root, navigate to `src/client` and copy the environment file:
```bash
cd ../client
cp .env.example .env.local
```
`src/client/.env.local` contains the standard defaults:
```env
NEXT_PUBLIC_API_URL_DEV=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NODE_ENV=development

# Optional: If you don't want to run the backend and just want to preview the UI:
# NEXT_PUBLIC_DEMO_MODE=true
```

---

### Step 3: Install & Start the Backend

1. In your terminal, go to the server folder:
   ```bash
   cd src/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Prepare the database with Prisma:
   ```bash
   # Push schema to create all tables
   npx prisma db push
   ```
4. Seed the database with sample products and starter user accounts:
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   ✅ The server is now running at **`http://localhost:5000`**.

---

### Step 4: Install & Start the Frontend

1. Open a **second terminal window** and navigate to the client directory:
   ```bash
   cd src/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   ✅ The website is now live at **`http://localhost:3000`**!

---

### 🔑 Ready-to-Use Test Accounts

After running `npm run seed`, you can immediately log into the web app using these pre-configured credentials:

| Account Type | Email | Password | What You Can Access |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@example.com` | `password123` | Everything: System analytics, user roles, logs, full catalog control |
| **Store Admin** | `admin@example.com` | `password123` | Catalog editing, order management, customer live chat |
| **Customer** | `user@example.com` | `password123` | Storefront shopping, personal cart, checkout, profile |

---

### 🔍 Helpful URLs & Developer Endpoints

When your servers are running locally, bookmark these links:

- **Storefront & Admin Web App**: [`http://localhost:3000`](http://localhost:3000)
- **Interactive Swagger / REST API Docs**: [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs)
- **GraphQL Endpoint**: [`http://localhost:5000/graphql`](http://localhost:5000/graphql)
- **Server Health Check**: [`http://localhost:5000/health`](http://localhost:5000/health)
- **Prisma Visual Database GUI**: Run `npx prisma studio` inside `src/server` to inspect database tables in your browser at `http://localhost:5555`.

---

### 💡 Quick Tips & Troubleshooting

- **Forgot to start Redis?** If you see a connection error mentioning `127.0.0.1:6379`, start your local Redis service (`redis-server` or via Docker: `docker run -d -p 6379:6379 redis:alpine`).
- **Postgres Database Error?** Verify that PostgreSQL is running and that the credentials in `src/server/.env` match your username and password.
- **Want to preview without a backend?** In `src/client/.env.local`, set `NEXT_PUBLIC_DEMO_MODE=true` to test the full UI using in-browser mock data.

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
