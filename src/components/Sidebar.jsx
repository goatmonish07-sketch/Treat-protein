import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, UserCog,
  Receipt, Settings, Sparkles,
} from 'lucide-react';
import { company } from '../lib/data.js';

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { section: 'Operations' },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/sales', label: 'Sales & Orders', icon: ShoppingCart },
  { to: '/customers', label: 'Customers', icon: Users },
  { section: 'Organization' },
  { to: '/employees', label: 'HR & Employees', icon: UserCog },
  { to: '/accounting', label: 'Accounting', icon: Receipt },
  { to: '/settings', label: 'Settings', icon: Settings },
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
