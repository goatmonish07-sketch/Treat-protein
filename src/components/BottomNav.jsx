import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, LineChart, Menu } from 'lucide-react';

const items = [
  { to: '/app', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/app/sales', label: 'Sales', icon: ShoppingCart },
  { to: '/app/inventory', label: 'Stock', icon: Package },
  { to: '/app/reports', label: 'Reports', icon: LineChart },
];

export default function BottomNav({ onMenu }) {
  return (
    <nav className="bottomnav" aria-label="Primary">
      {items.map((it) => (
        <NavLink key={it.to} to={it.to} end={it.end}
          className={({ isActive }) => 'bottomnav__item' + (isActive ? ' active' : '')}>
          <it.icon size={20} />
          <span>{it.label}</span>
        </NavLink>
      ))}
      <button className="bottomnav__item" onClick={onMenu} aria-label="Open menu">
        <Menu size={20} />
        <span>Menu</span>
      </button>
    </nav>
  );
}
