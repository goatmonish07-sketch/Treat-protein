import { useState } from 'react';
import { Sparkles, ShieldCheck, BarChart3, Boxes, LogIn } from 'lucide-react';
import { company } from '../lib/data.js';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@crazyyoga.co');
  const [password, setPassword] = useState('demo1234');

  const submit = (e) => {
    e.preventDefault();
    // Demo auth — accepts any non-empty credentials.
    if (email && password) onLogin();
  };

  return (
    <div className="login">
      <aside className="login__aside">
        <div className="login__brand">
          <Sparkles size={22} /> {company.name} <span style={{ opacity: .7, fontWeight: 500 }}>ERP</span>
        </div>
        <div className="login__pitch">
          <h2>Run your whole business from one calm dashboard.</h2>
          <p>Inventory, sales, customers, people and finances — unified, in real time.</p>
          <div className="login__points">
            <div><Boxes size={18} /> Live inventory &amp; low-stock alerts</div>
            <div><BarChart3 size={18} /> Sales &amp; revenue analytics</div>
            <div><ShieldCheck size={18} /> Role-based, secure access</div>
          </div>
        </div>
        <div style={{ opacity: .7, position: 'relative', zIndex: 1, fontSize: '.8rem' }}>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </aside>

      <div className="login__form-wrap">
        <form className="login__form" onSubmit={submit}>
          <h1>Welcome back</h1>
          <p>Sign in to your workspace.</p>

          <div className="field">
            <label htmlFor="email">Work email</label>
            <input id="email" className="input" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div className="field">
            <label htmlFor="pw">Password</label>
            <input id="pw" className="input" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>

          <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} type="submit">
            <LogIn size={16} /> Sign in
          </button>
          <p className="login__hint">Demo build — any email &amp; password will sign you in.</p>
        </form>
      </div>
    </div>
  );
}
