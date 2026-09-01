# Crazy Yoga ERP

A business **ERP** (Enterprise Resource Planning) web app for the **Crazy Yoga** brand,
built with **React + Vite**. It provides a unified dashboard for inventory, sales,
customers (CRM), HR, and accounting.

## Modules

- **Dashboard** — KPIs, revenue vs. expenses trend, sales-by-channel breakdown, recent orders and activity feed.
- **Inventory** — product catalogue with stock levels, reorder thresholds, category filter and search.
- **Sales & Orders** — orders across channels with status filters and sales KPIs.
- **Customers (CRM)** — accounts and leads, retail/wholesale segmentation, lifetime value.
- **HR & Employees** — team directory, departments and payroll budget chart.
- **Accounting** — receivables, payables, overdue tracking.
- **Settings** — company, notifications, account (sign out).
- **Auth** — demo login screen with a protected app shell (state kept in `localStorage`).

> This is a front-end scaffold with realistic **mock data** (`src/lib/data.js`).
> Wire the pages to a real API/database to make it production-ready.

## Tech

- React 18 + Vite 5
- React Router 6 (routing + protected routes)
- Recharts (charts)
- lucide-react (icons)
- Plain CSS design system (`src/index.css`) — no UI framework

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Build for production:

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Deploying (Cloudflare Pages / Vercel / Netlify)

- **Build command:** `npm run build`
- **Output directory:** `dist`
- SPA routing: add a catch-all rewrite to `/index.html` (the app uses client-side routing).
  On Cloudflare Pages, add a `_redirects` file with `/* /index.html 200` if deep links 404.

## Structure

```
index.html
vite.config.js
src/
  main.jsx            # entry, BrowserRouter
  App.jsx             # routes + demo auth
  index.css           # design system
  lib/data.js         # mock data
  components/         # Layout, Sidebar, Topbar, ui (StatCard, Badge, PageHeader)
  pages/              # Login, Dashboard, Inventory, Sales, Customers, Employees, Accounting, Settings
```

## Demo login

Any non-empty email and password will sign you in (the form is pre-filled).
