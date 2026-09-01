import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard, RowActions, useCrud } from '../components/ui.jsx';
import EntityModal from '../components/EntityModal.jsx';
import { useCollection } from '../lib/store.jsx';
import { currency } from '../lib/data.js';

export default function Assets() {
  const { items, remove } = useCollection('assets');
  const crud = useCrud();
  const [cat, setCat] = useState('All');

  const cats = useMemo(() => ['All', ...Array.from(new Set(items.map((a) => a.category)))], [items]);
  const rows = useMemo(() => items.filter((a) => cat === 'All' || a.category === cat), [items, cat]);
  const total = items.reduce((s, a) => s + a.value, 0);
  const maint = items.filter((a) => a.status === 'Maintenance').length;

  return (
    <>
      <PageHeader crumb="Operations / Assets" title="Assets" subtitle="Company asset register and valuation">
        <button className="btn btn--primary btn--sm" onClick={crud.openCreate}><Plus size={15} /> <span>Add asset</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Asset Value" value={total} delta={0.8} up icon="wallet" tone="brand" />
        <StatCard label="Total Assets" value={items.length} delta={1} up icon="box" tone="accent" fmt="num" />
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
              <tr><th>ID</th><th>Asset</th><th>Category</th><th className="num">Book Value</th><th>Purchased</th><th>Status</th><th></th></tr>
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
                  <td><RowActions name={a.name} onEdit={() => crud.openEdit(a)} onDelete={() => remove(a.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {crud.modal && <EntityModal collection="assets" editing={crud.modal.editing} onClose={crud.close} />}
    </>
  );
}
