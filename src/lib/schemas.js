// Field schemas that drive the add/edit forms for each collection.
// finalize() coerces types and computes derived fields before saving.

const ORDER_STATUS = ['Paid', 'Fulfilled', 'Pending', 'Refunded'];
const CHANNELS = ['Online Store', 'Retail', 'Wholesale', 'Marketplace'];

export const schemas = {
  products: {
    title: 'Product', prefix: 'CY-NEW',
    fields: [
      { name: 'name', label: 'Product name', required: true, full: true },
      { name: 'category', label: 'Category', type: 'select', required: true,
        options: ['Mats', 'Props', 'Apparel', 'Accessories', 'Wellness'] },
      { name: 'price', label: 'Price (₹)', type: 'number', min: 0, required: true },
      { name: 'stock', label: 'Stock qty', type: 'number', min: 0, required: true },
      { name: 'reorder', label: 'Reorder level', type: 'number', min: 0, required: true },
    ],
    finalize: (v) => {
      const stock = +v.stock, reorder = +v.reorder;
      return { ...v, stock, reorder, price: +v.price,
        status: stock === 0 ? 'Out of stock' : stock <= reorder ? 'Low' : 'In stock' };
    },
  },

  orders: {
    title: 'Order', prefix: 'SO',
    fields: [
      { name: 'customer', label: 'Customer', required: true, full: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'channel', label: 'Channel', type: 'select', options: CHANNELS, required: true },
      { name: 'items', label: 'Items', type: 'number', min: 1, required: true },
      { name: 'total', label: 'Total (₹)', type: 'number', min: 0, required: true },
      { name: 'status', label: 'Status', type: 'select', options: ORDER_STATUS, required: true },
    ],
    finalize: (v) => ({ ...v, items: +v.items, total: +v.total }),
  },

  customers: {
    title: 'Customer', prefix: 'C',
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'company', label: 'Company', placeholder: '—' },
      { name: 'type', label: 'Type', type: 'select', options: ['Retail', 'Wholesale'], required: true },
      { name: 'city', label: 'City', required: true },
      { name: 'orders', label: 'Orders', type: 'number', min: 0 },
      { name: 'spend', label: 'Total spend (₹)', type: 'number', min: 0 },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Lead', 'On hold'], required: true },
    ],
    finalize: (v) => ({ ...v, company: v.company || '—', orders: +v.orders || 0, spend: +v.spend || 0 }),
  },

  vendors: {
    title: 'Vendor', prefix: 'V',
    fields: [
      { name: 'name', label: 'Vendor name', required: true, full: true },
      { name: 'category', label: 'Category', required: true },
      { name: 'orders', label: 'Orders', type: 'number', min: 0 },
      { name: 'outstanding', label: 'Outstanding (₹)', type: 'number', min: 0 },
      { name: 'rating', label: 'Rating (0-5)', type: 'number', min: 0, step: 0.1 },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'On hold'], required: true },
    ],
    finalize: (v) => ({ ...v, orders: +v.orders || 0, outstanding: +v.outstanding || 0, rating: +v.rating || 0 }),
  },

  purchaseOrders: {
    title: 'Purchase Order', prefix: 'PO',
    fields: [
      { name: 'vendor', label: 'Vendor', required: true, full: true },
      { name: 'date', label: 'Order date', type: 'date', required: true },
      { name: 'eta', label: 'Expected delivery', type: 'date', required: true },
      { name: 'amount', label: 'Amount (₹)', type: 'number', min: 0, required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Open', 'Approved', 'Received'], required: true },
    ],
    finalize: (v) => ({ ...v, amount: +v.amount }),
  },

  productionOrders: {
    title: 'Work Order', prefix: 'MO',
    fields: [
      { name: 'product', label: 'Product', required: true, full: true },
      { name: 'qty', label: 'Quantity', type: 'number', min: 1, required: true },
      { name: 'done', label: 'Completed qty', type: 'number', min: 0, required: true },
      { name: 'due', label: 'Due date', type: 'date', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Planned', 'In progress', 'Completed'], required: true },
    ],
    finalize: (v) => ({ ...v, qty: +v.qty, done: Math.min(+v.done, +v.qty) }),
  },

  projects: {
    title: 'Project', prefix: 'PRJ',
    fields: [
      { name: 'name', label: 'Project name', required: true, full: true },
      { name: 'owner', label: 'Owner', required: true },
      { name: 'progress', label: 'Progress (%)', type: 'number', min: 0, max: 100, required: true },
      { name: 'budget', label: 'Budget (₹)', type: 'number', min: 0, required: true },
      { name: 'due', label: 'Due date', type: 'date', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['On track', 'At risk', 'Delayed'], required: true },
    ],
    finalize: (v) => ({ ...v, progress: Math.min(100, Math.max(0, +v.progress)), budget: +v.budget }),
  },

  assets: {
    title: 'Asset', prefix: 'AST',
    fields: [
      { name: 'name', label: 'Asset name', required: true, full: true },
      { name: 'category', label: 'Category', type: 'select', required: true,
        options: ['Vehicle', 'Machinery', 'Fixtures', 'IT Equipment'] },
      { name: 'value', label: 'Book value (₹)', type: 'number', min: 0, required: true },
      { name: 'purchased', label: 'Purchase date', type: 'date', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['In use', 'Maintenance'], required: true },
    ],
    finalize: (v) => ({ ...v, value: +v.value }),
  },

  employees: {
    title: 'Employee', prefix: 'E',
    fields: [
      { name: 'name', label: 'Full name', required: true },
      { name: 'role', label: 'Role', required: true },
      { name: 'dept', label: 'Department', type: 'select', required: true,
        options: ['Operations', 'Sales', 'Warehouse', 'Finance', 'Customer Success'] },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'salary', label: 'Monthly salary (₹)', type: 'number', min: 0, required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'On leave'], required: true },
    ],
    finalize: (v) => ({ ...v, salary: +v.salary }),
  },

  invoices: {
    title: 'Invoice', prefix: 'INV',
    fields: [
      { name: 'party', label: 'Party', required: true, full: true },
      { name: 'type', label: 'Type', type: 'select', options: ['Receivable', 'Payable'], required: true },
      { name: 'due', label: 'Due date', type: 'date', required: true },
      { name: 'amount', label: 'Amount (₹)', type: 'number', min: 0, required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Open', 'Paid', 'Overdue'], required: true },
    ],
    finalize: (v) => ({ ...v, amount: +v.amount }),
  },
};
