import { TrendingUp, TrendingDown, Wallet, ShoppingCart, Users, AlertTriangle } from 'lucide-react';
import { currency } from '../lib/data.js';

const icons = { wallet: Wallet, cart: ShoppingCart, users: Users, alert: AlertTriangle };
const tones = {
  brand:  { bg: 'var(--brand-050)',  fg: 'var(--brand)' },
  accent: { bg: 'var(--accent-050)', fg: 'var(--accent)' },
  info:   { bg: 'var(--info-bg)',    fg: 'var(--info)' },
  warn:   { bg: 'var(--warn-bg)',    fg: 'var(--warn)' },
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
  const shown = fmt === 'money' ? currency(value) : Number(value).toLocaleString('en-IN');
  return (
    <div className="card card__pad stat">
      <span className="stat__ic" style={{ background: t.bg, color: t.fg }}><Icon size={20} /></span>
      <div className="stat__label">{label}</div>
      <div className="stat__value">{shown}</div>
      <span className={'stat__delta ' + (up ? 'up' : 'down')}>
        {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        {up ? `+${delta}% vs last month` : `+${delta} this week`}
      </span>
    </div>
  );
}

const badgeMap = {
  'In stock': 'b-ok', 'Paid': 'b-ok', 'Fulfilled': 'b-info', 'Active': 'b-ok',
  'Low': 'b-warn', 'Pending': 'b-warn', 'On hold': 'b-warn', 'On leave': 'b-warn', 'Open': 'b-info',
  'Out of stock': 'b-danger', 'Refunded': 'b-danger', 'Overdue': 'b-danger',
  'Lead': 'b-info',
};
export function Badge({ children }) {
  return <span className={'badge ' + (badgeMap[children] || 'b-muted')}>{children}</span>;
}

export function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}
