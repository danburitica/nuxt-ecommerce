# Nuxt E-commerce

## 📝 Overview
This project is a Server-Side Rendered (SSR) e-commerce application built with Nuxt 3 and TypeScript. It demonstrates expertise in modular architecture, state management with Pinia, dynamic routing, and secure authentication using OAuth.

The application consumes the Platzi Fakestore API for product data and implements a complete shopping cart system with user-specific discounts.

## 🚀 Features
- **SSR Data Fetching**: Utilizes Nuxt composables (`useFetch`) for all API calls, ensuring optimal performance and SEO.
- **State Management**: Pinia store with persistence for the shopping cart.
- **Secure Authentication**: Google OAuth implemented via `@sidebase/nuxt-auth` (Auth.js) to manage user sessions.
- **Business Logic**: Implements a 15% discount exclusively for authenticated members (Dependency Inversion applied via `usePricing` composable).
- **Dynamic Routing**: Product detail page uses dynamic routing (`/products/[id].vue`).
- **Responsive UI**: Basic responsive layout using Tailwind CSS.

## 📦 Prerequisites
Ensure you have the following installed:
- Node.js (LTS version, v18+)
- npm or Yarn/pnpm (npm is used in these instructions)

## ⚙️ Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/danburitica/nuxt-ecommerce.git
cd nuxt-ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Critical Step)
Create a file named `.env` in the root directory and populate it with the required keys.

```
AUTH_ORIGIN="http://localhost:3000/api/auth"

AUTH_SECRET="your_long_secure_random_hex_string"

AUTH_GOOGLE_CLIENT_ID="[YOUR_GOOGLE_CLIENT_ID_HERE]"
AUTH_GOOGLE_CLIENT_SECRET="[YOUR_GOOGLE_CLIENT_SECRET_HERE]"
```
> ⚠️ **Security Note**: Replace the bracketed values with your actual credentials. The `AUTH_SECRET` can be generated using `openssl rand -base64 32`.

## ▶️ Running the Project
To start the development server:

```bash
npm run dev
```

The application will be available at: http://localhost:3000
