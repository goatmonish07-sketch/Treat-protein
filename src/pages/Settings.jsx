import { LogOut, Building2, Bell, ShieldCheck, RotateCcw } from 'lucide-react';
import { PageHeader } from '../components/ui.jsx';
import { useData } from '../lib/store.jsx';
import { company } from '../lib/data.js';

export default function Settings({ onLogout }) {
  const { reset } = useData();
  return (
    <>
      <PageHeader crumb="Settings" title="Settings" subtitle="Workspace preferences and account" />

      <div className="grid cols-2">
        <div className="card">
          <div className="card__head"><h3><Building2 size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />Company</h3></div>
          <div className="card__pad">
            <div className="field">
              <label>Business name</label>
              <input className="input" style={{ width: '100%' }} defaultValue={company.name} />
            </div>
            <div className="field">
              <label>Base currency</label>
              <select className="input" style={{ width: '100%' }} defaultValue="INR">
                <option value="INR">INR — Indian Rupee (₹)</option>
                <option value="USD">USD — US Dollar ($)</option>
                <option value="EUR">EUR — Euro (€)</option>
              </select>
            </div>
            <button className="btn btn--primary btn--sm">Save changes</button>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3><Bell size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />Notifications</h3></div>
          <div className="card__pad">
            {['Low-stock alerts', 'New order emails', 'Weekly revenue summary', 'Overdue invoice reminders'].map((n, i) => (
              <label key={n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.6rem 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                <span>{n}</span>
                <input type="checkbox" defaultChecked={i < 3} />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card section-gap">
        <div className="card__head"><h3><ShieldCheck size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />Account</h3></div>
        <div className="card__pad" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="cell-strong">Signed in as Priya Sharma</div>
            <small className="muted">admin@crazyyoga.co · Operations Head</small>
          </div>
          <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
            <button className="btn btn--ghost btn--sm"
              onClick={() => { if (window.confirm('Reset all demo data back to the sample records? Your added/edited records will be lost.')) reset(); }}>
              <RotateCcw size={15} /> Reset demo data
            </button>
            <button className="btn btn--ghost btn--sm" onClick={onLogout}><LogOut size={15} /> Sign out</button>
          </div>
        </div>
      </div>
    </>
  );
}
