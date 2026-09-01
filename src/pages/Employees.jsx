import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials } from '../components/ui.jsx';
import { employees, departments, currency } from '../lib/data.js';

const barColors = ['#7c3aed', '#14b8a6', '#2563eb', '#f59e0b', '#db2777'];

export default function Employees() {
  const headcount = departments.reduce((s, d) => s + d.headcount, 0);
  const budget = departments.reduce((s, d) => s + d.budget, 0);

  return (
    <>
      <PageHeader crumb="Organization / HR" title="HR & Employees" subtitle="People, departments and payroll budget">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> Add employee</button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Headcount" value={headcount} delta={4} up fmt="num" icon="users" tone="info" />
        <StatCard label="Departments" value={departments.length} delta={0} up fmt="num" icon="users" tone="accent" />
        <StatCard label="Monthly Payroll" value={budget} delta={3.4} up fmt="money" icon="wallet" tone="brand" />
      </div>

      <div className="grid cols-2 section-gap" style={{ gridTemplateColumns: '1fr 1.4fr' }}>
        <div className="card">
          <div className="card__head"><h3>Budget by Department</h3></div>
          <div className="card__pad">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departments} margin={{ left: -8, right: 8, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6b6880' }} interval={0} angle={-12} dy={8} height={44} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} tickFormatter={(v) => '₹' + v / 1000 + 'k'} />
                <Tooltip formatter={(v) => currency(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e9e7f0' }} cursor={{ fill: '#f3effe' }} />
                <Bar dataKey="budget" radius={[6, 6, 0, 0]}>
                  {departments.map((_, i) => <Cell key={i} fill={barColors[i % barColors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Team Directory</h3><small>{employees.length} people</small></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Employee</th><th>Role</th><th>Department</th><th>Status</th></tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <span className="avatar-sm">{initials(e.name)}</span>
                      <span className="cell-strong">{e.name}</span>
                      <div className="cell-sub" style={{ marginLeft: 40 }}>{e.email}</div>
                    </td>
                    <td>{e.role}</td>
                    <td className="cell-sub">{e.dept}</td>
                    <td><Badge>{e.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
