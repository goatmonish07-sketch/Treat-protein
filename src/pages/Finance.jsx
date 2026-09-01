import { useState, useMemo } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard } from '../components/ui.jsx';
import { invoices, revenueTrend, currency } from '../lib/data.js';

const tabs = ['All', 'Receivable', 'Payable'];

export default function Finance() {
  const [tab, setTab] = useState('All');
  const rows = useMemo(() => invoices.filter((i) => tab === 'All' || i.type === tab), [tab]);

  const receivable = invoices.filter((i) => i.type === 'Receivable' && i.status !== 'Paid').reduce((s, i) => s + i.amount, 0);
  const payable = invoices.filter((i) => i.type === 'Payable' && i.status !== 'Paid').reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0);

  return (
    <>
      <PageHeader crumb="Finance / Overview" title="Finance" subtitle="Accounting, receivables, payables and cash position">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> <span>New invoice</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Accounts Receivable" value={receivable} delta={7.5} up icon="wallet" tone="accent" />
        <StatCard label="Accounts Payable" value={payable} delta={3.1} up={false} icon="expense" tone="warn" />
        <StatCard label="Overdue" value={overdue} delta={1.2} up={false} icon="alert" tone="danger" />
      </div>

      <div className="card section-gap">
        <div className="card__head">
          <h3>Profit &amp; Loss</h3>
          <span className="legend">
            <span><i style={{ background: 'var(--brand)' }} />Revenue</span>
            <span><i style={{ background: 'var(--accent)' }} />Expenses</span>
          </span>
        </div>
        <div className="card__pad">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueTrend} margin={{ left: -8, right: 8, top: 6 }}>
              <defs>
                <linearGradient id="fRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.35} /><stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.28} /><stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} tickFormatter={(v) => '₹' + v + 'L'} width={44} />
              <Tooltip formatter={(v) => '₹' + v + 'L'} contentStyle={{ borderRadius: 10, border: '1px solid #e9e7f0' }} />
              <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2.5} fill="url(#fRev)" />
              <Area type="monotone" dataKey="expense" stroke="#14b8a6" strokeWidth={2.5} fill="url(#fExp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="toolbar section-gap">
        {tabs.map((t) => (
          <button key={t} className={'chip' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Document</th><th>Party</th><th>Type</th><th>Due date</th><th className="num">Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.id}>
                  <td className="cell-strong">{i.id}</td>
                  <td>{i.party}</td>
                  <td><span className={'badge ' + (i.type === 'Receivable' ? 'b-info' : 'b-muted')}>{i.type}</span></td>
                  <td className="cell-sub">{i.due}</td>
                  <td className="num">{currency(i.amount)}</td>
                  <td><Badge>{i.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
