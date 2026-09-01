import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts';
import { Download, FileText } from 'lucide-react';
import { PageHeader, StatCard } from '../components/ui.jsx';
import { salesByChannel, channelColors, kpis, compact } from '../lib/data.js';

const reports = [
  { name: 'Profit & Loss Statement', period: 'Aug 2026', type: 'Finance' },
  { name: 'Sales Summary', period: 'Aug 2026', type: 'Sales' },
  { name: 'Inventory Valuation', period: 'As of today', type: 'Inventory' },
  { name: 'Purchase Register', period: 'Aug 2026', type: 'Purchase' },
  { name: 'Payroll Report', period: 'Aug 2026', type: 'HR' },
  { name: 'GST / Tax Summary', period: 'Q2 2026', type: 'Finance' },
];

export default function Reports() {
  const rev = kpis.find((k) => k.key === 'revenue');
  const profit = kpis.find((k) => k.key === 'profit');
  const orders = kpis.find((k) => k.key === 'orders');

  return (
    <>
      <PageHeader crumb="Finance & People / Reports" title="Reports" subtitle="Generate, view and export business reports">
        <button className="btn btn--ghost btn--sm"><Download size={15} /> <span>Export all</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Revenue (YTD)" value={rev.value} delta={rev.delta} up icon="wallet" tone="brand" />
        <StatCard label="Net Profit (YTD)" value={profit.value} delta={profit.delta} up icon="trend" tone="accent" />
        <StatCard label="Orders (YTD)" value={orders.value} delta={orders.delta} up icon="cart" tone="info" fmt="num" />
      </div>

      <div className="split section-gap">
        <div className="card">
          <div className="card__head"><h3>Available Reports</h3></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Report</th><th>Type</th><th>Period</th><th></th></tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.name}>
                    <td><FileText size={15} style={{ verticalAlign: '-3px', marginRight: 8, color: 'var(--brand)' }} /><span className="cell-strong">{r.name}</span></td>
                    <td className="cell-sub">{r.type}</td>
                    <td className="cell-sub">{r.period}</td>
                    <td><button className="btn btn--ghost btn--sm"><Download size={14} /> CSV</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Sales by Channel</h3></div>
          <div className="card__pad">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={salesByChannel} dataKey="value" nameKey="name" innerRadius={58} outerRadius={96} paddingAngle={3}>
                  {salesByChannel.map((_, i) => <Cell key={i} fill={channelColors[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => v + '%'} contentStyle={{ borderRadius: 10, border: '1px solid #e9e7f0' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
