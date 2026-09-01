import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials, RowActions, useCrud } from '../components/ui.jsx';
import EntityModal from '../components/EntityModal.jsx';
import { useCollection } from '../lib/store.jsx';
import { currency } from '../lib/data.js';

export default function Sales() {
  const orders = useCollection('orders');
  const customers = useCollection('customers');
  const [tab, setTab] = useState('Orders');
  const [q, setQ] = useState('');
  const crud = useCrud();

  const collection = tab === 'Orders' ? 'orders' : 'customers';

  const gross = orders.items.reduce((s, o) => s + o.total, 0);
  const paid = orders.items.filter((o) => ['Paid', 'Fulfilled'].includes(o.status)).reduce((s, o) => s + o.total, 0);
  const pending = orders.items.filter((o) => o.status === 'Pending').reduce((s, o) => s + o.total, 0);

  const orderRows = useMemo(() =>
    orders.items.filter((o) => o.customer.toLowerCase().includes(q.toLowerCase()) || o.id.toLowerCase().includes(q.toLowerCase())),
  [orders.items, q]);
  const custRows = useMemo(() =>
    customers.items.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || (c.company || '').toLowerCase().includes(q.toLowerCase())),
  [customers.items, q]);

  return (
    <>
      <PageHeader crumb="Operations / Sales & CRM" title="Sales & CRM" subtitle="Orders, pipeline and customer accounts">
        <button className="btn btn--primary btn--sm" onClick={crud.openCreate}>
          <Plus size={15} /> <span>{tab === 'Orders' ? 'New order' : 'Add customer'}</span>
        </button>
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
                <tr><th>Order</th><th>Customer</th><th>Date</th><th>Channel</th><th className="num">Total</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {orderRows.map((o) => (
                  <tr key={o.id}>
                    <td className="cell-strong">{o.id}</td>
                    <td><span className="avatar-sm">{initials(o.customer)}</span>{o.customer}</td>
                    <td className="cell-sub">{o.date}</td>
                    <td>{o.channel}</td>
                    <td className="num">{currency(o.total)}</td>
                    <td><Badge>{o.status}</Badge></td>
                    <td><RowActions name={o.id} onEdit={() => crud.openEdit(o)} onDelete={() => orders.remove(o.id)} /></td>
                  </tr>
                ))}
                {orderRows.length === 0 && <tr><td colSpan={7}><div className="empty">No orders found.</div></td></tr>}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr><th>Customer</th><th>Type</th><th>City</th><th className="num">Orders</th><th className="num">Spend</th><th>Status</th><th></th></tr>
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
                    <td><RowActions name={c.name} onEdit={() => crud.openEdit(c)} onDelete={() => customers.remove(c.id)} /></td>
                  </tr>
                ))}
                {custRows.length === 0 && <tr><td colSpan={7}><div className="empty">No customers found.</div></td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {crud.modal && <EntityModal collection={collection} editing={crud.modal.editing} onClose={crud.close} />}
    </>
  );
}
