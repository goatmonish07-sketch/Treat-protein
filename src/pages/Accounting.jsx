import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Badge, StatCard } from '../components/ui.jsx';
import { invoices, currency } from '../lib/data.js';

const tabs = ['All', 'Receivable', 'Payable'];

export default function Accounting() {
  const [tab, setTab] = useState('All');
  const rows = useMemo(() => invoices.filter((i) => tab === 'All' || i.type === tab), [tab]);

  const receivable = invoices.filter((i) => i.type === 'Receivable' && i.status !== 'Paid').reduce((s, i) => s + i.amount, 0);
  const payable = invoices.filter((i) => i.type === 'Payable' && i.status !== 'Paid').reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0);

  return (
    <>
      <PageHeader crumb="Organization / Accounting" title="Accounting" subtitle="Receivables, payables and cash position">
        <button className="btn btn--primary btn--sm"><Plus size={15} /> New invoice</button>
      </PageHeader>

      <div className="grid cols-3">
        <StatCard label="Accounts Receivable" value={receivable} delta={7.5} up fmt="money" icon="wallet" tone="accent" />
        <StatCard label="Accounts Payable" value={payable} delta={3.1} up={false} fmt="money" icon="cart" tone="warn" />
        <StatCard label="Overdue" value={overdue} delta={1} up={false} fmt="money" icon="alert" tone="warn" />
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
