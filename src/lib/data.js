// Mock data for the Crazy Yoga ERP demo. Swap for a real API later.

export const company = { name: 'Crazy Yoga', tagline: 'Enterprise Resource Planning' };

export const currency = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });

export const compact = (n) => {
  if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + 'Cr';
  if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2) + 'L';
  if (n >= 1e3) return '₹' + (n / 1e3).toFixed(1) + 'k';
  return '₹' + n;
};

/* ---------- dashboard ---------- */
export const kpis = [
  { key: 'revenue',  label: 'Total Revenue',    value: 24583200, delta: 12.5, up: true,  icon: 'wallet',  tone: 'brand' },
  { key: 'expense',  label: 'Total Expenses',   value: 8452300,  delta: 5.4,  up: false, icon: 'expense', tone: 'warn' },
  { key: 'profit',   label: 'Net Profit',       value: 16130900, delta: 18.6, up: true,  icon: 'trend',   tone: 'accent' },
  { key: 'orders',   label: 'Total Orders',     value: 1243,     delta: 8.2,  up: true,  icon: 'cart',    tone: 'info', fmt: 'num' },
  { key: 'dues',     label: 'Outstanding Dues', value: 678900,   delta: 3.1,  up: false, icon: 'alert',   tone: 'danger' },
];

export const snapshot = [
  { label: 'Active Customers', value: 892,  delta: 5.2, up: true,  icon: 'users' },
  { label: 'Active Vendors',   value: 120,  delta: 2.1, up: true,  icon: 'truck' },
  { label: 'Employees',        value: 156,  delta: 3.6, up: true,  icon: 'badge' },
  { label: 'Products',         value: 2345, delta: 7.8, up: true,  icon: 'box' },
];

export const revenueTrend = [
  { m: 'Jan', revenue: 182, expense: 121 },
  { m: 'Feb', revenue: 201, expense: 128 },
  { m: 'Mar', revenue: 235, expense: 141 },
  { m: 'Apr', revenue: 221, expense: 138 },
  { m: 'May', revenue: 268, expense: 152 },
  { m: 'Jun', revenue: 254, expense: 149 },
  { m: 'Jul', revenue: 289, expense: 163 },
  { m: 'Aug', revenue: 312, expense: 171 },
  { m: 'Sep', revenue: 298, expense: 166 },
  { m: 'Oct', revenue: 331, expense: 178 },
  { m: 'Nov', revenue: 372, expense: 189 },
  { m: 'Dec', revenue: 418, expense: 201 },
];

export const cashflow = [
  { d: 'Mon', inflow: 420, outflow: 310 },
  { d: 'Tue', inflow: 380, outflow: 290 },
  { d: 'Wed', inflow: 510, outflow: 340 },
  { d: 'Thu', inflow: 470, outflow: 360 },
  { d: 'Fri', inflow: 560, outflow: 380 },
  { d: 'Sat', inflow: 610, outflow: 410 },
  { d: 'Sun', inflow: 430, outflow: 300 },
];

export const topProducts = [
  { name: 'Pro Grip Yoga Mat', category: 'Mats', sold: 320, revenue: 607680 },
  { name: 'Flow Leggings', category: 'Apparel', sold: 280, revenue: 503720 },
  { name: 'Steel Water Bottle 750ml', category: 'Accessories', sold: 260, revenue: 233740 },
  { name: 'Breathe Tee — Unisex', category: 'Apparel', sold: 210, revenue: 251790 },
  { name: 'Cork Yoga Block (Pair)', category: 'Props', sold: 190, revenue: 151810 },
];

export const activity = [
  { who: 'System', what: 'Sales Order #SO-10426 created', when: '2m ago', tone: 'info' },
  { who: 'Finance', what: 'Payment of ₹45,000 received', when: '15m ago', tone: 'ok' },
  { who: 'Purchase', what: 'Purchase Order #PO-1255 created', when: '30m ago', tone: 'info' },
  { who: 'HR', what: 'New employee John Smith added', when: '1h ago', tone: 'ok' },
  { who: 'System', what: 'Low stock alert: Backbend Yoga Wheel', when: '2h ago', tone: 'warn' },
];

/* ---------- inventory ---------- */
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

/* ---------- sales ---------- */
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

export const salesByChannel = [
  { name: 'Online Store', value: 42 },
  { name: 'Retail', value: 27 },
  { name: 'Wholesale', value: 19 },
  { name: 'Marketplace', value: 12 },
];
export const channelColors = ['#7c3aed', '#14b8a6', '#2563eb', '#f59e0b'];

export const customers = [
  { id: 'C-201', name: 'Asha Menon', company: '—', type: 'Retail', orders: 12, spend: 41200, city: 'Kochi', status: 'Active' },
  { id: 'C-202', name: 'FitZone Studios', company: 'FitZone Pvt Ltd', type: 'Wholesale', orders: 34, spend: 512000, city: 'Bengaluru', status: 'Active' },
  { id: 'C-203', name: 'Rohan Gupta', company: '—', type: 'Retail', orders: 5, spend: 9800, city: 'Delhi', status: 'Active' },
  { id: 'C-204', name: 'Zen Collective', company: 'Zen Collective LLP', type: 'Wholesale', orders: 21, spend: 298000, city: 'Pune', status: 'On hold' },
  { id: 'C-205', name: 'Meera Nair', company: '—', type: 'Retail', orders: 8, spend: 15600, city: 'Chennai', status: 'Active' },
  { id: 'C-206', name: 'Studio Prana', company: 'Prana Wellness', type: 'Wholesale', orders: 17, spend: 244500, city: 'Mumbai', status: 'Active' },
  { id: 'C-207', name: 'Kabir Shah', company: '—', type: 'Retail', orders: 3, spend: 5400, city: 'Ahmedabad', status: 'Lead' },
];

/* ---------- purchase ---------- */
export const vendors = [
  { id: 'V-01', name: 'MatWorks Supplies', category: 'Raw materials', orders: 42, outstanding: 148000, rating: 4.6, status: 'Active' },
  { id: 'V-02', name: 'CottonCo Textiles', category: 'Apparel fabric', orders: 28, outstanding: 96000, rating: 4.4, status: 'Active' },
  { id: 'V-03', name: 'PureCork Exports', category: 'Props', orders: 15, outstanding: 0, rating: 4.8, status: 'Active' },
  { id: 'V-04', name: 'SteelBottle Mfg', category: 'Accessories', orders: 19, outstanding: 32000, rating: 4.1, status: 'On hold' },
  { id: 'V-05', name: 'AromaLabs', category: 'Wellness', orders: 9, outstanding: 12500, rating: 4.7, status: 'Active' },
];
export const purchaseOrders = [
  { id: 'PO-1255', vendor: 'MatWorks Supplies', date: '2026-08-27', amount: 148000, eta: '2026-09-04', status: 'Open' },
  { id: 'PO-1254', vendor: 'CottonCo Textiles', date: '2026-08-26', amount: 96000, eta: '2026-09-06', status: 'Approved' },
  { id: 'PO-1253', vendor: 'SteelBottle Mfg', date: '2026-08-24', amount: 54000, eta: '2026-08-30', status: 'Received' },
  { id: 'PO-1252', vendor: 'AromaLabs', date: '2026-08-22', amount: 22500, eta: '2026-08-28', status: 'Received' },
  { id: 'PO-1251', vendor: 'PureCork Exports', date: '2026-08-20', amount: 78000, eta: '2026-08-27', status: 'Received' },
];

/* ---------- production ---------- */
export const productionOrders = [
  { id: 'MO-540', product: 'Pro Grip Yoga Mat', qty: 500, done: 500, due: '2026-08-26', status: 'Completed' },
  { id: 'MO-541', product: 'Flow Leggings', qty: 400, done: 260, due: '2026-09-02', status: 'In progress' },
  { id: 'MO-542', product: 'Breathe Tee — Unisex', qty: 600, done: 180, due: '2026-09-05', status: 'In progress' },
  { id: 'MO-543', product: 'Cork Yoga Block (Pair)', qty: 300, done: 0, due: '2026-09-10', status: 'Planned' },
  { id: 'MO-544', product: 'Calm Essential Oil Set', qty: 200, done: 40, due: '2026-09-08', status: 'In progress' },
];

/* ---------- projects ---------- */
export const projects = [
  { id: 'PRJ-11', name: 'Autumn Collection Launch', owner: 'Arjun Verma', progress: 72, budget: 850000, due: '2026-09-20', status: 'On track' },
  { id: 'PRJ-12', name: 'Warehouse Automation', owner: 'Nisha Pillai', progress: 45, budget: 1200000, due: '2026-10-15', status: 'At risk' },
  { id: 'PRJ-13', name: 'B2B Portal Revamp', owner: 'Priya Sharma', progress: 88, budget: 640000, due: '2026-09-05', status: 'On track' },
  { id: 'PRJ-14', name: 'Retail Expansion — South', owner: 'Arjun Verma', progress: 30, budget: 2100000, due: '2026-11-30', status: 'On track' },
  { id: 'PRJ-15', name: 'ERP Data Migration', owner: 'Dev Patel', progress: 12, budget: 380000, due: '2026-10-01', status: 'Delayed' },
];

/* ---------- assets ---------- */
export const assets = [
  { id: 'AST-001', name: 'Delivery Van — KL-07', category: 'Vehicle', value: 1250000, purchased: '2024-03-12', status: 'In use' },
  { id: 'AST-002', name: 'Cutting Machine CM-9', category: 'Machinery', value: 680000, purchased: '2023-11-02', status: 'In use' },
  { id: 'AST-003', name: 'Warehouse Racking', category: 'Fixtures', value: 320000, purchased: '2024-06-18', status: 'In use' },
  { id: 'AST-004', name: 'MacBook Pro (x12)', category: 'IT Equipment', value: 2040000, purchased: '2025-01-20', status: 'In use' },
  { id: 'AST-005', name: 'Forklift FL-2', category: 'Machinery', value: 540000, purchased: '2022-09-10', status: 'Maintenance' },
  { id: 'AST-006', name: 'Office Furniture Set', category: 'Fixtures', value: 210000, purchased: '2024-02-05', status: 'In use' },
];

/* ---------- HR ---------- */
export const employees = [
  { id: 'E-01', name: 'Priya Sharma', role: 'Operations Head', dept: 'Operations', salary: 145000, email: 'priya@crazyyoga.co', status: 'Active' },
  { id: 'E-02', name: 'Arjun Verma', role: 'Sales Manager', dept: 'Sales', salary: 110000, email: 'arjun@crazyyoga.co', status: 'Active' },
  { id: 'E-03', name: 'Nisha Pillai', role: 'Inventory Lead', dept: 'Warehouse', salary: 82000, email: 'nisha@crazyyoga.co', status: 'Active' },
  { id: 'E-04', name: 'Dev Patel', role: 'Accountant', dept: 'Finance', salary: 76000, email: 'dev@crazyyoga.co', status: 'On leave' },
  { id: 'E-05', name: 'Sara Khan', role: 'Support Executive', dept: 'Customer Success', salary: 54000, email: 'sara@crazyyoga.co', status: 'Active' },
  { id: 'E-06', name: 'Imran Ali', role: 'Fulfilment Associate', dept: 'Warehouse', salary: 42000, email: 'imran@crazyyoga.co', status: 'Active' },
];
export const departments = [
  { name: 'Operations', headcount: 6, budget: 820000 },
  { name: 'Sales', headcount: 9, budget: 1250000 },
  { name: 'Warehouse', headcount: 14, budget: 980000 },
  { name: 'Finance', headcount: 4, budget: 560000 },
  { name: 'Customer Success', headcount: 7, budget: 640000 },
];

/* ---------- finance ---------- */
export const invoices = [
  { id: 'INV-3391', party: 'FitZone Studios', type: 'Receivable', due: '2026-09-05', amount: 62000, status: 'Open' },
  { id: 'INV-3390', party: 'Studio Prana', type: 'Receivable', due: '2026-09-02', amount: 33750, status: 'Open' },
  { id: 'BILL-882', party: 'MatWorks Supplies', type: 'Payable', due: '2026-08-30', amount: 148000, status: 'Overdue' },
  { id: 'INV-3389', party: 'Ananya Rao', type: 'Receivable', due: '2026-08-29', amount: 5196, status: 'Paid' },
  { id: 'BILL-881', party: 'CottonCo Textiles', type: 'Payable', due: '2026-09-10', amount: 96000, status: 'Open' },
  { id: 'INV-3388', party: 'Zen Collective', type: 'Receivable', due: '2026-08-20', amount: 24300, status: 'Overdue' },
];

/* ---------- landing ---------- */
export const modules = [
  { icon: 'wallet', name: 'Finance', desc: 'Automate accounting, invoicing, budgeting and financial reports.' },
  { icon: 'badge', name: 'HR & Payroll', desc: 'Manage employees, payroll, attendance and performance.' },
  { icon: 'box', name: 'Inventory', desc: 'Real-time stock tracking, warehouse management and reordering.' },
  { icon: 'cart', name: 'Sales & CRM', desc: 'Track leads, manage pipeline and close deals faster.' },
  { icon: 'truck', name: 'Purchase', desc: 'Manage vendors, purchase orders and bills effortlessly.' },
  { icon: 'factory', name: 'Production', desc: 'Plan, produce and monitor output efficiently.' },
  { icon: 'kanban', name: 'Project', desc: 'Plan, track and deliver projects on time and on budget.' },
  { icon: 'chart', name: 'Reports', desc: 'Powerful reports and dashboards for better decisions.' },
];
export const whyPoints = [
  { icon: 'zap', title: 'Easy to Use', desc: 'Intuitive interface for every user.' },
  { icon: 'sliders', title: 'Customizable', desc: 'Flexible to match your business needs.' },
  { icon: 'shield', title: 'Secure', desc: 'Enterprise-grade security and backups.' },
  { icon: 'trend', title: 'Scalable', desc: 'Grows with your business.' },
  { icon: 'headset', title: '24/7 Support', desc: 'Dedicated support team, always on.' },
];
