import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Wallet, ShoppingCart, Users, AlertTriangle,
  Receipt, LineChart, Truck, IdCard, Box, Pencil, Trash2,
} from 'lucide-react';
import { currency, compact } from '../lib/data.js';

const icons = {
  wallet: Wallet, cart: ShoppingCart, users: Users, alert: AlertTriangle,
  expense: Receipt, trend: LineChart, truck: Truck, badge: IdCard, box: Box,
};
const tones = {
  brand:  { bg: 'var(--brand-050)',  fg: 'var(--brand)' },
  accent: { bg: 'var(--accent-050)', fg: 'var(--accent)' },
  info:   { bg: 'var(--info-bg)',    fg: 'var(--info)' },
  warn:   { bg: 'var(--warn-bg)',    fg: 'var(--warn)' },
  danger: { bg: 'var(--danger-bg)',  fg: 'var(--danger)' },
};

export function PageHeader({ crumb, title, subtitle, children }) {
  return (
    <div className="page-head">
      <div>
        {crumb && <div className="crumbs">{crumb}</div>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className="toolbar" style={{ margin: 0 }}>{children}</div>}
    </div>
  );
}

export function StatCard({ label, value, delta, up, fmt, icon, tone = 'brand' }) {
  const Icon = icons[icon] || Wallet;
  const t = tones[tone] || tones.brand;
  const shown = fmt === 'num' ? Number(value).toLocaleString('en-IN')
    : fmt === 'money' ? currency(value) : compact(value);
  return (
    <div className="card card__pad stat">
      <span className="stat__ic" style={{ background: t.bg, color: t.fg }}><Icon size={20} /></span>
      <div className="stat__label">{label}</div>
      <div className="stat__value">{shown}</div>
      {delta != null && (
        <span className={'stat__delta ' + (up ? 'up' : 'down')}>
          {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {up ? '+' : ''}{delta}% <span className="muted" style={{ fontWeight: 500 }}>this week</span>
        </span>
      )}
    </div>
  );
}

const badgeMap = {
  'In stock': 'b-ok', 'Paid': 'b-ok', 'Fulfilled': 'b-info', 'Active': 'b-ok', 'Completed': 'b-ok',
  'Received': 'b-ok', 'On track': 'b-ok', 'In use': 'b-ok', 'Approved': 'b-info', 'In progress': 'b-info',
  'Low': 'b-warn', 'Pending': 'b-warn', 'On hold': 'b-warn', 'On leave': 'b-warn', 'Open': 'b-info',
  'Planned': 'b-muted', 'At risk': 'b-warn', 'Maintenance': 'b-warn',
  'Out of stock': 'b-danger', 'Refunded': 'b-danger', 'Overdue': 'b-danger', 'Delayed': 'b-danger',
  'Lead': 'b-info',
};
export function Badge({ children }) {
  return <span className={'badge ' + (badgeMap[children] || 'b-muted')}>{children}</span>;
}

export function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

// Edit + delete buttons for a table row. `name` is used in the delete confirm.
export function RowActions({ onEdit, onDelete, name = 'this record' }) {
  return (
    <div className="row-actions">
      <button className="iconbtn iconbtn--xs" aria-label={'Edit ' + name} title="Edit" onClick={onEdit}>
        <Pencil size={15} />
      </button>
      <button className="iconbtn iconbtn--xs iconbtn--danger" aria-label={'Delete ' + name} title="Delete"
        onClick={() => { if (window.confirm(`Delete ${name}? This cannot be undone.`)) onDelete(); }}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}

// Small hook to manage add/edit modal state for a page.
export function useCrud() {
  const [modal, setModal] = useState(null); // null | { editing: item|null }
  return {
    modal,
    openCreate: () => setModal({ editing: null }),
    openEdit: (item) => setModal({ editing: item }),
    close: () => setModal(null),
  };
}
