import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard } from '../components/ui.jsx';
import { assets, currency } from '../lib/data.js';

const cats = ['All', ...Array.from(new Set(assets.map((a) => a.category)))];

export default function Assets() {
  const [cat, setCat] = useState('All');
  const rows = useMemo(() => assets.filter((a) => cat === 'All' || a.category === cat), [cat]);
  const total = assets.reduce((s, a) => s + a.value, 0);
  const maint = assets.filter((a) => a.status === 'Maintenance').length;

  return (
    <>
      <PageHeader crumb="Operations / Assets" title="Assets" subtitle="Company asset register and valuation">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> <span>Add asset</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Asset Value" value={total} delta={0.8} up icon="wallet" tone="brand" />
        <StatCard label="Total Assets" value={assets.length} delta={1} up icon="box" tone="accent" fmt="num" />
        <StatCard label="In Maintenance" value={maint} delta={1} up={false} icon="alert" tone="warn" fmt="num" />
      </div>

      <div className="toolbar section-gap">
        {cats.map((c) => (
          <button key={c} className={'chip' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>Asset</th><th>Category</th><th className="num">Book Value</th><th>Purchased</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id}>
                  <td className="cell-sub">{a.id}</td>
                  <td className="cell-strong">{a.name}</td>
                  <td>{a.category}</td>
                  <td className="num">{currency(a.value)}</td>
                  <td className="cell-sub">{a.purchased}</td>
                  <td><Badge>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
