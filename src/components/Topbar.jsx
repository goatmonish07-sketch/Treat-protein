import { Search, Bell, Plus, Menu } from 'lucide-react';

export default function Topbar({ onMenu }) {
  return (
    <header className="topbar">
      <button className="iconbtn menu-toggle" aria-label="Open menu" onClick={onMenu}>
        <Menu size={18} />
      </button>
      <div className="topbar__search">
        <Search />
        <input placeholder="Search orders, products, customers…" aria-label="Search" />
      </div>
      <div className="topbar__spacer" />
      <button className="btn btn--primary btn--sm"><Plus size={16} /> <span>New</span></button>
      <button className="iconbtn" aria-label="Notifications">
        <Bell size={18} /><span className="dot" />
      </button>
    </header>
  );
}
