import { useMemo, useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';
import { PageHeader, Badge, RowActions, useCrud } from '../components/ui.jsx';
import EntityModal from '../components/EntityModal.jsx';
import { useCollection } from '../lib/store.jsx';
import { currency } from '../lib/data.js';

export default function Inventory() {
  const { items, remove } = useCollection('products');
  const crud = useCrud();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const cats = useMemo(() => ['All', ...Array.from(new Set(items.map((p) => p.category)))], [items]);
  const rows = useMemo(() =>
    items.filter((p) =>
      (cat === 'All' || p.category === cat) &&
      (p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))
    ), [items, q, cat]);
  const value = items.reduce((s, p) => s + p.stock * p.price, 0);

  return (
    <>
      <PageHeader crumb="Operations / Inventory" title="Inventory"
        subtitle={`${items.length} SKUs · stock value ${currency(value)}`}>
        <button className="btn btn--ghost btn--sm"><Download size={15} /> <span>Export</span></button>
        <button className="btn btn--primary btn--sm" onClick={crud.openCreate}><Plus size={15} /> <span>Add product</span></button>
      </PageHeader>

      <div className="toolbar">
        <div className="topbar__search" style={{ width: 'min(320px,60vw)' }}>
          <Search />
          <input placeholder="Search products or SKU…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {cats.map((c) => (
          <button key={c} className={'chip' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th><th>Product</th><th>Category</th>
                <th className="num">Stock</th><th className="num">Price</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.sku}>
                  <td className="cell-sub">{p.sku}</td>
                  <td className="cell-strong">{p.name}</td>
                  <td>{p.category}</td>
                  <td className="num">{p.stock}</td>
                  <td className="num">{currency(p.price)}</td>
                  <td><Badge>{p.status}</Badge></td>
                  <td><RowActions name={p.name} onEdit={() => crud.openEdit(p)} onDelete={() => remove(p.sku)} /></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={7}><div className="empty">No products match your search.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {crud.modal && <EntityModal collection="products" editing={crud.modal.editing} onClose={crud.close} />}
    </>
  );
}
