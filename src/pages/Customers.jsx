import { useMemo, useState } from 'react';
import { Plus, Search, Mail } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials } from '../components/ui.jsx';
import { customers, currency } from '../lib/data.js';

const types = ['All', 'Retail', 'Wholesale'];

export default function Customers() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('All');

  const rows = useMemo(() =>
    customers.filter((c) =>
      (type === 'All' || c.type === type) &&
      (c.name.toLowerCase().includes(q.toLowerCase()) || c.company.toLowerCase().includes(q.toLowerCase()))
    ), [q, type]);

  const active = customers.filter((c) => c.status === 'Active').length;
  const ltv = customers.reduce((s, c) => s + c.spend, 0);

  return (
    <>
      <PageHeader crumb="Operations / Customers" title="Customers" subtitle="Your CRM — accounts, leads and lifetime value">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> Add customer</button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Total Accounts" value={customers.length} delta={5} up fmt="num" icon="users" tone="info" />
        <StatCard label="Active" value={active} delta={2.1} up fmt="num" icon="users" tone="accent" />
        <StatCard label="Lifetime Value" value={ltv} delta={11.2} up fmt="money" icon="wallet" tone="brand" />
      </div>

      <div className="toolbar section-gap">
        <div className="topbar__search" style={{ width: 'min(320px,60vw)' }}>
          <Search />
          <input placeholder="Search name or company…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {types.map((t) => (
          <button key={t} className={'chip' + (type === t ? ' active' : '')} onClick={() => setType(t)}>{t}</button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th><th>Type</th><th>City</th>
                <th className="num">Orders</th><th className="num">Spend</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="avatar-sm">{initials(c.name)}</span>
                    <span className="cell-strong">{c.name}</span>
                    {c.company !== '—' && <div className="cell-sub" style={{ marginLeft: 40 }}>{c.company}</div>}
                  </td>
                  <td>{c.type}</td>
                  <td className="cell-sub">{c.city}</td>
                  <td className="num">{c.orders}</td>
                  <td className="num">{currency(c.spend)}</td>
                  <td><Badge>{c.status}</Badge></td>
                  <td><button className="iconbtn" style={{ width: 32, height: 32 }} aria-label="Email"><Mail size={15} /></button></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={7}><div className="empty">No customers match your filter.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
