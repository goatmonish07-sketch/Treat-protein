// Mock data for the Crazy Yoga ERP demo. Swap for a real API later.

export const company = { name: 'Crazy Yoga', tagline: 'Enterprise Resource Planning' };

export const currency = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });

export const kpis = [
  { key: 'revenue', label: 'Total Revenue', value: 4825000, delta: 12.4, up: true, fmt: 'money', icon: 'wallet', tone: 'brand' },
  { key: 'orders', label: 'Orders', value: 1284, delta: 8.1, up: true, fmt: 'num', icon: 'cart', tone: 'accent' },
  { key: 'customers', label: 'Active Customers', value: 862, delta: 3.2, up: true, fmt: 'num', icon: 'users', tone: 'info' },
  { key: 'lowstock', label: 'Low-stock Items', value: 14, delta: 2, up: false, fmt: 'num', icon: 'alert', tone: 'warn' },
];

export const revenueTrend = [
  { m: 'Jan', revenue: 320, expense: 210 },
  { m: 'Feb', revenue: 358, expense: 220 },
  { m: 'Mar', revenue: 402, expense: 245 },
  { m: 'Apr', revenue: 388, expense: 250 },
  { m: 'May', revenue: 451, expense: 268 },
  { m: 'Jun', revenue: 470, expense: 275 },
  { m: 'Jul', revenue: 512, expense: 290 },
  { m: 'Aug', revenue: 548, expense: 301 },
  { m: 'Sep', revenue: 505, expense: 296 },
  { m: 'Oct', revenue: 560, expense: 310 },
  { m: 'Nov', revenue: 612, expense: 325 },
  { m: 'Dec', revenue: 689, expense: 340 },
];

export const salesByChannel = [
  { name: 'Online Store', value: 42 },
  { name: 'Retail', value: 27 },
  { name: 'Wholesale', value: 19 },
  { name: 'Marketplace', value: 12 },
];

export const channelColors = ['#7c3aed', '#14b8a6', '#2563eb', '#f59e0b'];

export const products = [
  { sku: 'CY-MAT-001', name: 'Pro Grip Yoga Mat', category: 'Mats', stock: 320, reorder: 80, price: 1899, status: 'In stock' },
  { sku: 'CY-BLK-014', name: 'Cork Yoga Block (Pair)', category: 'Props', stock: 54, reorder: 60, price: 799, status: 'Low' },
  { sku: 'CY-STR-002', name: 'Cotton Stretch Strap', category: 'Props', stock: 210, reorder: 50, price: 349, status: 'In stock' },
  { sku: 'CY-WHL-007', name: 'Backbend Yoga Wheel', category: 'Props', stock: 0, reorder: 40, price: 1499, status: 'Out of stock' },
  { sku: 'CY-APP-021', name: 'Breathe Tee — Unisex', category: 'Apparel', stock: 138, reorder: 60, price: 1199, status: 'In stock' },
  { sku: 'CY-APP-033', name: 'Flow Leggings', category: 'Apparel', stock: 47, reorder: 60, price: 1799, status: 'Low' },
  { sku: 'CY-BOT-009', name: 'Steel Water Bottle 750ml', category: 'Accessories', stock: 402, reorder: 100, price: 899, status: 'In stock' },
  { sku: 'CY-BAG-004', name: 'Mat Carry Sling Bag', category: 'Accessories', stock: 76, reorder: 40, price: 649, status: 'In stock' },
  { sku: 'CY-OIL-011', name: 'Calm Essential Oil Set', category: 'Wellness', stock: 22, reorder: 30, price: 1299, status: 'Low' },
];

export const orders = [
  { id: 'SO-10428', customer: 'Asha Menon', date: '2026-08-28', items: 3, total: 4497, channel: 'Online Store', status: 'Paid' },
  { id: 'SO-10427', customer: 'Rohan Gupta', date: '2026-08-28', items: 1, total: 1899, channel: 'Retail', status: 'Fulfilled' },
  { id: 'SO-10426', customer: 'FitZone Studios', date: '2026-08-27', items: 40, total: 62000, channel: 'Wholesale', status: 'Pending' },
  { id: 'SO-10425', customer: 'Meera Nair', date: '2026-08-27', items: 2, total: 2098, channel: 'Marketplace', status: 'Paid' },
  { id: 'SO-10424', customer: 'Zen Collective', date: '2026-08-26', items: 18, total: 24300, channel: 'Wholesale', status: 'Refunded' },
  { id: 'SO-10423', customer: 'Kabir Shah', date: '2026-08-26', items: 1, total: 1499, channel: 'Online Store', status: 'Fulfilled' },
  { id: 'SO-10422', customer: 'Ananya Rao', date: '2026-08-25', items: 4, total: 5196, channel: 'Online Store', status: 'Paid' },
  { id: 'SO-10421', customer: 'Studio Prana', date: '2026-08-25', items: 25, total: 33750, channel: 'Wholesale', status: 'Pending' },
];

export const customers = [
  { id: 'C-201', name: 'Asha Menon', company: '—', type: 'Retail', orders: 12, spend: 41200, city: 'Kochi', status: 'Active' },
  { id: 'C-202', name: 'FitZone Studios', company: 'FitZone Pvt Ltd', type: 'Wholesale', orders: 34, spend: 512000, city: 'Bengaluru', status: 'Active' },
  { id: 'C-203', name: 'Rohan Gupta', company: '—', type: 'Retail', orders: 5, spend: 9800, city: 'Delhi', status: 'Active' },
  { id: 'C-204', name: 'Zen Collective', company: 'Zen Collective LLP', type: 'Wholesale', orders: 21, spend: 298000, city: 'Pune', status: 'On hold' },
  { id: 'C-205', name: 'Meera Nair', company: '—', type: 'Retail', orders: 8, spend: 15600, city: 'Chennai', status: 'Active' },
  { id: 'C-206', name: 'Studio Prana', company: 'Prana Wellness', type: 'Wholesale', orders: 17, spend: 244500, city: 'Mumbai', status: 'Active' },
  { id: 'C-207', name: 'Kabir Shah', company: '—', type: 'Retail', orders: 3, spend: 5400, city: 'Ahmedabad', status: 'Lead' },
];

export const employees = [
  { id: 'E-01', name: 'Priya Sharma', role: 'Operations Head', dept: 'Operations', email: 'priya@crazyyoga.co', status: 'Active' },
  { id: 'E-02', name: 'Arjun Verma', role: 'Sales Manager', dept: 'Sales', email: 'arjun@crazyyoga.co', status: 'Active' },
  { id: 'E-03', name: 'Nisha Pillai', role: 'Inventory Lead', dept: 'Warehouse', email: 'nisha@crazyyoga.co', status: 'Active' },
  { id: 'E-04', name: 'Dev Patel', role: 'Accountant', dept: 'Finance', email: 'dev@crazyyoga.co', status: 'On leave' },
  { id: 'E-05', name: 'Sara Khan', role: 'Support Executive', dept: 'Customer Success', email: 'sara@crazyyoga.co', status: 'Active' },
  { id: 'E-06', name: 'Imran Ali', role: 'Fulfilment Associate', dept: 'Warehouse', email: 'imran@crazyyoga.co', status: 'Active' },
];

export const departments = [
  { name: 'Operations', headcount: 6, budget: 820000 },
  { name: 'Sales', headcount: 9, budget: 1250000 },
  { name: 'Warehouse', headcount: 14, budget: 980000 },
  { name: 'Finance', headcount: 4, budget: 560000 },
  { name: 'Customer Success', headcount: 7, budget: 640000 },
];

export const invoices = [
  { id: 'INV-3391', party: 'FitZone Studios', type: 'Receivable', due: '2026-09-05', amount: 62000, status: 'Open' },
  { id: 'INV-3390', party: 'Studio Prana', type: 'Receivable', due: '2026-09-02', amount: 33750, status: 'Open' },
  { id: 'BILL-882', party: 'MatWorks Supplies', type: 'Payable', due: '2026-08-30', amount: 148000, status: 'Overdue' },
  { id: 'INV-3389', party: 'Ananya Rao', type: 'Receivable', due: '2026-08-29', amount: 5196, status: 'Paid' },
  { id: 'BILL-881', party: 'CottonCo Textiles', type: 'Payable', due: '2026-09-10', amount: 96000, status: 'Open' },
  { id: 'INV-3388', party: 'Zen Collective', type: 'Receivable', due: '2026-08-20', amount: 24300, status: 'Overdue' },
];

export const activity = [
  { who: 'Arjun Verma', what: 'closed order SO-10426 (₹62,000)', when: '12m ago', tone: 'ok' },
  { who: 'System', what: 'Backbend Yoga Wheel is out of stock', when: '40m ago', tone: 'danger' },
  { who: 'Nisha Pillai', what: 'received PO-556 — 500 units', when: '1h ago', tone: 'info' },
  { who: 'Dev Patel', what: 'flagged BILL-882 as overdue', when: '2h ago', tone: 'warn' },
  { who: 'Sara Khan', what: 'resolved 4 support tickets', when: '3h ago', tone: 'ok' },
];
