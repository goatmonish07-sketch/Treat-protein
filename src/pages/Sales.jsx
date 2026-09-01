import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials } from '../components/ui.jsx';
import { orders, customers, currency } from '../lib/data.js';

export default function Sales() {
  const [tab, setTab] = useState('Orders');
  const [q, setQ] = useState('');

  const gross = orders.reduce((s, o) => s + o.total, 0);
  const paid = orders.filter((o) => ['Paid', 'Fulfilled'].includes(o.status)).reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === 'Pending').reduce((s, o) => s + o.total, 0);

  const orderRows = useMemo(() =>
    orders.filter((o) => o.customer.toLowerCase().includes(q.toLowerCase()) || o.id.toLowerCase().includes(q.toLowerCase())),
  [q]);
  const custRows = useMemo(() =>
    customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.company.toLowerCase().includes(q.toLowerCase())),
  [q]);

  return (
    <>
      <PageHeader crumb="Operations / Sales & CRM" title="Sales & CRM" subtitle="Orders, pipeline and customer accounts">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> <span>New order</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Gross Sales" value={gross} delta={9.3} up icon="wallet" tone="brand" />
        <StatCard label="Collected" value={paid} delta={6.7} up icon="cart" tone="accent" />
        <StatCard label="Awaiting Payment" value={pending} delta={4} up={false} icon="alert" tone="warn" />
      </div>

      <div className="toolbar section-gap">
        <button className={'chip' + (tab === 'Orders' ? ' active' : '')} onClick={() => setTab('Orders')}>Orders</button>
        <button className={'chip' + (tab === 'Customers' ? ' active' : '')} onClick={() => setTab('Customers')}>Customers</button>
        <div className="topbar__search" style={{ width: 'min(300px,60vw)', marginLeft: 'auto' }}>
          <Search />
          <input placeholder={'Search ' + tab.toLowerCase() + '…'} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          {tab === 'Orders' ? (
            <table>
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Date</th><th>Channel</th><th className="num">Items</th><th className="num">Total</th><th>Status</th></tr>
              </thead>
              <tbody>
                {orderRows.map((o) => (
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
                {orderRows.length === 0 && <tr><td colSpan={7}><div className="empty">No orders found.</div></td></tr>}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr><th>Customer</th><th>Type</th><th>City</th><th className="num">Orders</th><th className="num">Spend</th><th>Status</th></tr>
              </thead>
              <tbody>
                {custRows.map((c) => (
                  <tr key={c.id}>
                    <td><span className="avatar-sm">{initials(c.name)}</span><span className="cell-strong">{c.name}</span></td>
                    <td>{c.type}</td>
                    <td className="cell-sub">{c.city}</td>
                    <td className="num">{c.orders}</td>
                    <td className="num">{currency(c.spend)}</td>
                    <td><Badge>{c.status}</Badge></td>
                  </tr>
                ))}
                {custRows.length === 0 && <tr><td colSpan={6}><div className="empty">No customers found.</div></td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
