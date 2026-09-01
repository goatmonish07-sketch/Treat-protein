# Crazy Yoga ERP

A complete, working **ERP** (Enterprise Resource Planning) demo for the **Crazy Yoga**
brand, built with **React + Vite**. It ships a marketing landing page plus a full,
responsive admin app covering finance, inventory, sales, purchasing, production,
projects, assets, HR and reporting.

## What's inside

**Public**
- **Landing page** (`/`) — hero, module showcase, "why choose us", CTA and footer, with a
  stylized dashboard preview. Fully responsive.
- **Login** (`/login`) — demo auth; any non-empty email/password signs you in. The app
  shell is gated behind a protected route (state kept in `localStorage`).

**App** (`/app`, sidebar + mobile bottom-nav)
- **Dashboard** — 5 KPIs (revenue, expenses, net profit, orders, dues), revenue overview
  chart, business snapshot, top-selling products, recent activity, cash-flow bars.
- **Inventory** — stock levels, reorder bars, category filter, search.
- **Sales & CRM** — orders + customers (tabbed), sales KPIs, search.
- **Purchase** — purchase orders + vendors (tabbed), payables KPIs.
- **Production** — work orders with live progress bars.
- **Project** — project portfolio with progress, budget and status.
- **Assets** — asset register with valuation and category filter.
- **Finance** — P&L chart, receivables/payables/overdue, invoice ledger (tabbed).
- **HR & Payroll** — team directory + department budget chart + payroll totals.
- **Reports** — report catalogue with CSV actions + sales-by-channel chart.
- **Settings** — company, notifications, account (sign out).

> Front-end demo with realistic **mock data** in `src/lib/data.js`. Wire the pages to a
> real API/database to make it production-ready.

## Responsive & accessible

- Mobile-first, verified at 375/390/768/1024/1280px with **zero horizontal overflow**.
- Sidebar on desktop; slide-in drawer **and** a 5-item bottom nav on mobile.
- 16px inputs (no iOS zoom), ≥44px touch targets, visible focus rings, semantic color
  tokens, SVG icons throughout (lucide-react), `prefers-reduced-motion` friendly.

## Tech

React 18 · Vite 5 · React Router 6 · Recharts · lucide-react · plain-CSS design system.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview
```

## Deploying (Cloudflare Pages / Vercel / Netlify)

- **Build command:** `npm run build`
- **Output directory:** `dist`
- SPA routing: add a `_redirects` file with `/* /index.html 200` (Cloudflare/Netlify) so
  deep links like `/app/finance` don't 404.

## Structure

```
index.html · vite.config.js
src/
  main.jsx  App.jsx  index.css
  lib/data.js                     # mock data
  components/  Layout Sidebar Topbar BottomNav ui
  pages/       Landing Login Dashboard Inventory Sales Purchase
               Production Projects Assets Finance HR Reports Settings
```
