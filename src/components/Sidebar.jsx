import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Wallet, IdCard, Package, ShoppingCart, Truck,
  Factory, KanbanSquare, Boxes, LineChart, Settings, Sparkles,
} from 'lucide-react';
import { company } from '../lib/data.js';

const nav = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { section: 'Operations' },
  { to: '/app/inventory', label: 'Inventory', icon: Package },
  { to: '/app/sales', label: 'Sales & CRM', icon: ShoppingCart },
  { to: '/app/purchase', label: 'Purchase', icon: Truck },
  { to: '/app/production', label: 'Production', icon: Factory },
  { to: '/app/projects', label: 'Project', icon: KanbanSquare },
  { to: '/app/assets', label: 'Assets', icon: Boxes },
  { section: 'Finance & People' },
  { to: '/app/finance', label: 'Finance', icon: Wallet },
  { to: '/app/hr', label: 'HR & Payroll', icon: IdCard },
  { to: '/app/reports', label: 'Reports', icon: LineChart },
  { section: 'System' },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside className={'sidebar' + (open ? ' open' : '')}>
      <div className="sidebar__brand">
        <span className="sidebar__logo"><Sparkles size={20} /></span>
        <div>
          <b>{company.name}</b>
          <span>ERP</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        {nav.map((item, i) =>
          item.section ? (
            <div key={'s' + i} className="sidebar__label">{item.section}</div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 'navlink' + (isActive ? ' active' : '')}
              onClick={onNavigate}
            >
              <item.icon />
              {item.label}
            </NavLink>
          )
        )}
      </nav>

      <div className="sidebar__foot">
        <div className="sidebar__user">
          <span className="avatar">PS</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 600 }}>Priya Sharma</div>
            <small>Operations Head</small>
          </div>
        </div>
      </div>
    </aside>
  );
}
