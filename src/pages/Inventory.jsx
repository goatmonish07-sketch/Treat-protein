import { useMemo, useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';
import { PageHeader, Badge } from '../components/ui.jsx';
import { products, currency } from '../lib/data.js';

const cats = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

export default function Inventory() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const rows = useMemo(() =>
    products.filter((p) =>
      (cat === 'All' || p.category === cat) &&
      (p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))
    ), [q, cat]);

  const value = products.reduce((s, p) => s + p.stock * p.price, 0);

  return (
    <>
      <PageHeader crumb="Operations / Inventory" title="Inventory"
        subtitle={`${products.length} SKUs · stock value ${currency(value)}`}>
        <button className="btn btn--ghost btn--sm"><Download size={15} /> Export</button>
        <button className="btn btn--primary btn--sm"><Plus size={15} /> Add product</button>
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
                <th className="num">Stock</th><th>Level</th><th className="num">Price</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const pct = Math.min(100, Math.round((p.stock / (p.reorder * 3)) * 100));
                return (
                  <tr key={p.sku}>
                    <td className="cell-sub">{p.sku}</td>
                    <td className="cell-strong">{p.name}</td>
                    <td>{p.category}</td>
                    <td className="num">{p.stock}</td>
                    <td>
                      <div className="progress" title={`Reorder at ${p.reorder}`}>
                        <span style={{ width: pct + '%' }} />
                      </div>
                    </td>
                    <td className="num">{currency(p.price)}</td>
                    <td><Badge>{p.status}</Badge></td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={7}><div className="empty">No products match your search.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
