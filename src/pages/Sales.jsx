import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials } from '../components/ui.jsx';
import { orders, currency } from '../lib/data.js';

const statuses = ['All', 'Paid', 'Fulfilled', 'Pending', 'Refunded'];

export default function Sales() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');

  const rows = useMemo(() =>
    orders.filter((o) =>
      (status === 'All' || o.status === status) &&
      (o.customer.toLowerCase().includes(q.toLowerCase()) || o.id.toLowerCase().includes(q.toLowerCase()))
    ), [q, status]);

  const gross = orders.reduce((s, o) => s + o.total, 0);
  const paid = orders.filter((o) => o.status === 'Paid' || o.status === 'Fulfilled').reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === 'Pending').reduce((s, o) => s + o.total, 0);

  return (
    <>
      <PageHeader crumb="Operations / Sales" title="Sales & Orders" subtitle="Recent sales activity across all channels">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> New order</button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Gross Sales" value={gross} delta={9.3} up fmt="money" icon="wallet" tone="brand" />
        <StatCard label="Collected" value={paid} delta={6.7} up fmt="money" icon="cart" tone="accent" />
        <StatCard label="Awaiting Payment" value={pending} delta={4} up={false} fmt="money" icon="alert" tone="warn" />
      </div>

      <div className="toolbar section-gap">
        <div className="topbar__search" style={{ width: 'min(320px,60vw)' }}>
          <Search />
          <input placeholder="Search order or customer…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {statuses.map((s) => (
          <button key={s} className={'chip' + (status === s ? ' active' : '')} onClick={() => setStatus(s)}>{s}</button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th><th>Customer</th><th>Date</th><th>Channel</th>
                <th className="num">Items</th><th className="num">Total</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id}>
                  <td className="cell-strong">{o.id}</td>
                  <td><span className="avatar-sm">{initials(o.customer)}</span>{o.customer}</td>
                  <td className="cell-sub">{o.date}</td>
                  <td>{o.channel}</td>
                  <td className="num">{o.items}</td>
                  <td className="num">{currency(o.total)}</td>
                  <td><Badge>{o.status}</Badge></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={7}><div className="empty">No orders match your filter.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
