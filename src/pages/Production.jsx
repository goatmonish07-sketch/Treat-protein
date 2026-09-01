import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard } from '../components/ui.jsx';
import { productionOrders } from '../lib/data.js';

export default function Production() {
  const inProgress = productionOrders.filter((m) => m.status === 'In progress').length;
  const planned = productionOrders.filter((m) => m.status === 'Planned').length;
  const units = productionOrders.reduce((s, m) => s + m.qty, 0);

  return (
    <>
      <PageHeader crumb="Operations / Production" title="Production" subtitle="Manufacturing and work orders">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> <span>New work order</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="In Progress" value={inProgress} delta={2} up icon="trend" tone="brand" fmt="num" />
        <StatCard label="Planned" value={planned} delta={1} up icon="cart" tone="info" fmt="num" />
        <StatCard label="Units Scheduled" value={units} delta={12} up icon="box" tone="accent" fmt="num" />
      </div>

      <div className="card section-gap">
        <div className="card__head"><h3>Work Orders</h3></div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Order</th><th>Product</th><th className="num">Qty</th><th>Progress</th><th>Due</th><th>Status</th></tr>
            </thead>
            <tbody>
              {productionOrders.map((m) => {
                const pct = Math.round((m.done / m.qty) * 100);
                return (
                  <tr key={m.id}>
                    <td className="cell-strong">{m.id}</td>
                    <td>{m.product}</td>
                    <td className="num">{m.qty}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                        <div className="progress"><span style={{ width: pct + '%' }} /></div>
                        <span className="cell-sub" style={{ minWidth: 34 }}>{pct}%</span>
                      </div>
                    </td>
                    <td className="cell-sub">{m.due}</td>
                    <td><Badge>{m.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
