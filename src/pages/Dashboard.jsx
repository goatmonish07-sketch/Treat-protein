import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { PageHeader, StatCard, Badge, initials } from '../components/ui.jsx';
import { kpis, revenueTrend, salesByChannel, channelColors, orders, activity, currency } from '../lib/data.js';

const toneDot = { ok: 'var(--ok)', danger: 'var(--danger)', warn: 'var(--warn)', info: 'var(--info)' };

export default function Dashboard() {
  return (
    <>
      <PageHeader crumb="Home" title="Dashboard" subtitle="Business overview · August 2026" />

      <div className="grid cols-4">
        {kpis.map((k) => <StatCard key={k.key} {...k} />)}
      </div>

      <div className="grid cols-2 section-gap" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <div className="card">
          <div className="card__head">
            <h3>Revenue vs Expenses</h3>
            <span className="legend">
              <span><i style={{ background: 'var(--brand)' }} />Revenue</span>
              <span><i style={{ background: 'var(--accent)' }} />Expenses</span>
            </span>
          </div>
          <div className="card__pad">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueTrend} margin={{ left: -12, right: 8, top: 6 }}>
                <defs>
                  <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }}
                  tickFormatter={(v) => '₹' + v + 'k'} />
                <Tooltip formatter={(v) => '₹' + v + 'k'} contentStyle={{ borderRadius: 10, border: '1px solid #e9e7f0' }} />
                <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gRev)" />
                <Area type="monotone" dataKey="expense" stroke="#14b8a6" strokeWidth={2.5} fill="url(#gExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Sales by Channel</h3></div>
          <div className="card__pad">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={salesByChannel} dataKey="value" nameKey="name" innerRadius={62} outerRadius={100} paddingAngle={3}>
                  {salesByChannel.map((_, i) => <Cell key={i} fill={channelColors[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => v + '%'} contentStyle={{ borderRadius: 10, border: '1px solid #e9e7f0' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid cols-2 section-gap" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <div className="card">
          <div className="card__head">
            <h3>Recent Orders</h3>
            <a className="btn btn--ghost btn--sm" href="#/sales">View all</a>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Channel</th><th className="num">Total</th><th>Status</th></tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td className="cell-strong">{o.id}</td>
                    <td><span className="avatar-sm">{initials(o.customer)}</span>{o.customer}</td>
                    <td className="cell-sub">{o.channel}</td>
                    <td className="num">{currency(o.total)}</td>
                    <td><Badge>{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Activity</h3></div>
          <div className="card__pad">
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activity.map((a, i) => (
                <li key={i} style={{ display: 'flex', gap: '.7rem' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: toneDot[a.tone], marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div><b>{a.who}</b> {a.what}</div>
                    <small className="muted">{a.when}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
