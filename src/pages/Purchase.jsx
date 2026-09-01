import { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials } from '../components/ui.jsx';
import { vendors, purchaseOrders, currency } from '../lib/data.js';

export default function Purchase() {
  const [tab, setTab] = useState('Orders');
  const open = purchaseOrders.filter((p) => p.status !== 'Received').reduce((s, p) => s + p.amount, 0);
  const outstanding = vendors.reduce((s, v) => s + v.outstanding, 0);

  return (
    <>
      <PageHeader crumb="Operations / Purchase" title="Purchase" subtitle="Vendors, purchase orders and bills">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> <span>New PO</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Open PO Value" value={open} delta={6.2} up icon="cart" tone="brand" />
        <StatCard label="Vendor Payables" value={outstanding} delta={2.4} up={false} icon="expense" tone="warn" />
        <StatCard label="Active Vendors" value={vendors.filter((v) => v.status === 'Active').length} delta={1} up icon="truck" tone="info" fmt="num" />
      </div>

      <div className="toolbar section-gap">
        <button className={'chip' + (tab === 'Orders' ? ' active' : '')} onClick={() => setTab('Orders')}>Purchase Orders</button>
        <button className={'chip' + (tab === 'Vendors' ? ' active' : '')} onClick={() => setTab('Vendors')}>Vendors</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          {tab === 'Orders' ? (
            <table>
              <thead>
                <tr><th>PO</th><th>Vendor</th><th>Date</th><th>ETA</th><th className="num">Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {purchaseOrders.map((p) => (
                  <tr key={p.id}>
                    <td className="cell-strong">{p.id}</td>
                    <td>{p.vendor}</td>
                    <td className="cell-sub">{p.date}</td>
                    <td className="cell-sub">{p.eta}</td>
                    <td className="num">{currency(p.amount)}</td>
                    <td><Badge>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr><th>Vendor</th><th>Category</th><th className="num">Orders</th><th className="num">Outstanding</th><th className="num">Rating</th><th>Status</th></tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id}>
                    <td><span className="avatar-sm">{initials(v.name)}</span><span className="cell-strong">{v.name}</span></td>
                    <td className="cell-sub">{v.category}</td>
                    <td className="num">{v.orders}</td>
                    <td className="num">{currency(v.outstanding)}</td>
                    <td className="num">★ {v.rating}</td>
                    <td><Badge>{v.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
