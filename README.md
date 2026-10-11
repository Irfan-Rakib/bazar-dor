<div align="center">

# 🛒 Bazar Dor — বাংলাদেশের বাজারদর

**Track daily market prices across Bangladesh, compare trends, and make smarter shopping decisions.**

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[Live Demo](#-live-demo) · [Features](#-features) · [Getting Started](#-getting-started) · [API](#-api-reference) · [Deployment](#-deployment)

</div>

---

## 📖 Overview

**Bazar Dor** is a responsive web application that helps people in Bangladesh explore daily product prices. Users can browse products by category, compare current prices with previous days, weeks, and months, spot price trends, and view minimum and maximum prices across different markets — all presented in Bangla.

## 🌐 Live Demo

> 🔗 **Live URL:** _Add your deployed link here_

## ✨ Features

| Feature                 | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| **Product Categories**  | Browse products organized by category.                                  |
| **Price Comparison**    | Compare today's prices with yesterday's, last week's, and last month's. |
| **Price Trends**        | Instantly see whether a price is increasing, decreasing, or unchanged.  |
| **Market-wise Prices**  | View minimum and maximum prices across different markets.               |
| **Product Details**     | Access detailed information for each product.                           |
| **Sorting**             | Sort products by price, low to high or high to low.                     |
| **Authentication**      | Secure sign-in and sign-up powered by Better Auth.                      |
| **Responsive Design**   | Optimized for desktop, tablet, and mobile devices.                      |
| **Bangla Localization** | Prices and relevant content displayed in Bangla.                        |

## 🧰 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) with [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **UI & Utilities:** [Lucide React](https://lucide.dev/), [React Hot Toast](https://react-hot-toast.com/)
- **Data Source:** Programming Hero Bazar Dor API

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the project root and add the variables required by your authentication and database configuration (see `src/lib/auth.ts` and `src/lib/mongodb.ts`).

```env
# Example — use the variable names defined in your project
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

> ⚠️ **Never commit real secrets or database credentials to GitHub.**

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**5. Build for production**

```bash
npm run build
npm start
```

## 🔌 API Reference

Bazar Dor consumes the **Programming Hero Bazar Dor API**.

**Base URL:** `https://openapi.programming-hero.com/api/bazardor`

| Endpoint                      | Description               |
| ----------------------------- | ------------------------- |
| `GET /categories`             | Get all categories        |
| `GET /categories/chal`        | Get a single category     |
| `GET /products`               | Get all products          |
| `GET /products?category=chal` | Get products by category  |
| `GET /products/1`             | Get an individual product |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts
│   ├── category/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── product/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── signin/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── profile/
│   │   ├── page.tsx
│   │   └── update/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   ├── home/
│   ├── products/
│   ├── auth/
│   └── ui/
├── lib/
│   ├── api.ts
│   ├── utils.ts
│   ├── mongodb.ts
│   ├── auth.ts
│   └── auth-client.ts
└── types/
    └── product.ts
```

## 🔐 Security

- Keep database credentials and authentication secrets private.
- Store environment variables in `.env.local`.
- Do not commit `.env.local` or any file containing secrets.
- Configure production environment variables in your deployment platform.

## ☁️ Deployment

The easiest way to deploy Bazar Dor is with [Vercel](https://vercel.com/):

1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Add the required environment variables in the project settings.
4. Click **Deploy**.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project was created for educational and development purposes.

---

<div align="center">

Made with ❤️ for the people of Bangladesh

</div>
