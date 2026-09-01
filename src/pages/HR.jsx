import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials } from '../components/ui.jsx';
import { employees, departments, currency } from '../lib/data.js';

const barColors = ['#7c3aed', '#14b8a6', '#2563eb', '#f59e0b', '#db2777'];

export default function HR() {
  const headcount = departments.reduce((s, d) => s + d.headcount, 0);
  const payroll = employees.reduce((s, e) => s + e.salary, 0);

  return (
    <>
      <PageHeader crumb="Finance & People / HR" title="HR & Payroll" subtitle="People, departments and payroll">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> <span>Add employee</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Headcount" value={headcount} delta={4} up icon="badge" tone="info" fmt="num" />
        <StatCard label="Departments" value={departments.length} delta={0} up icon="users" tone="accent" fmt="num" />
        <StatCard label="Monthly Payroll" value={payroll} delta={3.4} up icon="wallet" tone="brand" />
      </div>

      <div className="split--left section-gap">
        <div className="card">
          <div className="card__head"><h3>Budget by Department</h3></div>
          <div className="card__pad">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departments} margin={{ left: -8, right: 8, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#6b6880' }} interval={0} angle={-14} dy={8} height={48} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} tickFormatter={(v) => '₹' + v / 1000 + 'k'} width={46} />
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
                <tr><th>Employee</th><th>Role</th><th>Dept</th><th className="num">Salary</th><th>Status</th></tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <span className="avatar-sm">{initials(e.name)}</span>
                      <span className="cell-strong">{e.name}</span>
                    </td>
                    <td className="cell-sub">{e.role}</td>
                    <td>{e.dept}</td>
                    <td className="num">{currency(e.salary)}</td>
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
