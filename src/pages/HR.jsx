import { useMemo } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard, initials, RowActions, useCrud } from '../components/ui.jsx';
import EntityModal from '../components/EntityModal.jsx';
import { useCollection } from '../lib/store.jsx';
import { currency } from '../lib/data.js';

const barColors = ['#7c3aed', '#14b8a6', '#2563eb', '#f59e0b', '#db2777'];

export default function HR() {
  const { items, remove } = useCollection('employees');
  const crud = useCrud();

  const payroll = items.reduce((s, e) => s + e.salary, 0);
  // department budgets derived from current employees
  const depts = useMemo(() => {
    const m = {};
    items.forEach((e) => { m[e.dept] = (m[e.dept] || 0) + e.salary; });
    return Object.entries(m).map(([name, budget]) => ({ name, budget }));
  }, [items]);

  return (
    <>
      <PageHeader crumb="Finance & People / HR" title="HR & Payroll" subtitle="People, departments and payroll">
        <button className="btn btn--primary btn--sm" onClick={crud.openCreate}><Plus size={15} /> <span>Add employee</span></button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Headcount" value={items.length} delta={4} up icon="badge" tone="info" fmt="num" />
        <StatCard label="Departments" value={depts.length} delta={0} up icon="users" tone="accent" fmt="num" />
        <StatCard label="Monthly Payroll" value={payroll} delta={3.4} up icon="wallet" tone="brand" />
      </div>

      <div className="split--left section-gap">
        <div className="card">
          <div className="card__head"><h3>Payroll by Department</h3></div>
          <div className="card__pad">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={depts} margin={{ left: -8, right: 8, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#6b6880' }} interval={0} angle={-14} dy={8} height={48} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b6880' }} tickFormatter={(v) => '₹' + v / 1000 + 'k'} width={46} />
                <Tooltip formatter={(v) => currency(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e9e7f0' }} cursor={{ fill: '#f3effe' }} />
                <Bar dataKey="budget" radius={[6, 6, 0, 0]}>
                  {depts.map((_, i) => <Cell key={i} fill={barColors[i % barColors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3>Team Directory</h3><small>{items.length} people</small></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Employee</th><th>Role</th><th>Dept</th><th className="num">Salary</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {items.map((e) => (
                  <tr key={e.id}>
                    <td><span className="avatar-sm">{initials(e.name)}</span><span className="cell-strong">{e.name}</span></td>
                    <td className="cell-sub">{e.role}</td>
                    <td>{e.dept}</td>
                    <td className="num">{currency(e.salary)}</td>
                    <td><Badge>{e.status}</Badge></td>
                    <td><RowActions name={e.name} onEdit={() => crud.openEdit(e)} onDelete={() => remove(e.id)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {crud.modal && <EntityModal collection="employees" editing={crud.modal.editing} onClose={crud.close} />}
    </>
  );
}
