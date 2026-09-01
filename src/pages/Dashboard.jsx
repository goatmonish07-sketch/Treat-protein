import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
} from 'recharts';
import { Users, Truck, IdCard, Box, TrendingUp } from 'lucide-react';
import { PageHeader, StatCard, Badge } from '../components/ui.jsx';
import {
  kpis, snapshot, revenueTrend, cashflow, topProducts, activity, currency, compact,
} from '../lib/data.js';

const snapIcons = { users: Users, truck: Truck, badge: IdCard, box: Box };
const toneDot = { ok: 'var(--ok)', danger: 'var(--danger)', warn: 'var(--warn)', info: 'var(--info)' };

export default function Dashboard() {
  return (
    <>
      <PageHeader crumb="Home" title="Dashboard" subtitle="Welcome back, Priya! Here's what's happening today.">
        <span className="chip">May 12 – May 18, 2026</span>
      </PageHeader>

      <div className="grid kpi-row">
        {kpis.map((k) => <StatCard key={k.key} {...k} />)}
      </div>

      <div className="split section-gap">
        <div className="card">
          <div className="card__head">
            <h3>Revenue Overview</h3>
            <span className="legend">
              <span><i style={{ background: 'var(--brand)' }} />Revenue</span>
              <span><i style={{ background: 'var(--accent)' }} />Expenses</span>
            </span>
          </div>
          <div className="card__pad">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueTrend} margin={{ left: -8, right: 8, top: 6 }}>
                <defs>
                  <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} tickFormatter={(v) => '₹' + v + 'L'} width={44} />
                <Tooltip formatter={(v) => '₹' + v + 'L'} contentStyle={{ borderRadius: 10, border: '1px solid #e9e7f0' }} />
                <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gRev)" />
                <Area type="monotone" dataKey="expense" stroke="#14b8a6" strokeWidth={2.5} fill="url(#gExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Business Snapshot</h3></div>
          <div className="card__pad" style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
            {snapshot.map((s) => {
              const Icon = snapIcons[s.icon] || Box;
              return (
                <div key={s.label} className="snap-row">
                  <span className="snap-ic"><Icon size={18} /></span>
                  <span className="snap-label">{s.label}</span>
                  <span className="snap-val">{s.value.toLocaleString('en-IN')}</span>
                  <span className="snap-delta"><TrendingUp size={12} /> {s.delta}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="split section-gap">
        <div className="card">
          <div className="card__head"><h3>Top Selling Products</h3><small>This month</small></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Product</th><th>Category</th><th className="num">Sold</th><th className="num">Revenue</th></tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name}>
                    <td className="cell-strong">{p.name}</td>
                    <td className="cell-sub">{p.category}</td>
                    <td className="num">{p.sold}</td>
                    <td className="num">{currency(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Recent Activities</h3></div>
          <div className="card__pad">
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activity.map((a, i) => (
                <li key={i} style={{ display: 'flex', gap: '.7rem' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: toneDot[a.tone], marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div>{a.what}</div>
                    <small className="muted">{a.who} · {a.when}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="card section-gap">
        <div className="card__head">
          <h3>Cash Flow Overview</h3>
          <span className="legend">
            <span><i style={{ background: 'var(--brand)' }} />Inflow</span>
            <span><i style={{ background: 'var(--brand-light,#c4b5fd)' }} />Outflow</span>
          </span>
        </div>
        <div className="card__pad">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={cashflow} margin={{ left: -8, right: 8, top: 6 }} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} tickFormatter={(v) => '₹' + v + 'k'} width={44} />
              <Tooltip formatter={(v) => '₹' + v + 'k'} contentStyle={{ borderRadius: 10, border: '1px solid #e9e7f0' }} cursor={{ fill: '#f3effe' }} />
              <Bar dataKey="inflow" fill="#7c3aed" radius={[5, 5, 0, 0]} />
              <Bar dataKey="outflow" fill="#c4b5fd" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
