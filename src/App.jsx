import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';
import Sales from './pages/Sales.jsx';
import Purchase from './pages/Purchase.jsx';
import Production from './pages/Production.jsx';
import Projects from './pages/Projects.jsx';
import Assets from './pages/Assets.jsx';
import Finance from './pages/Finance.jsx';
import HR from './pages/HR.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';

const KEY = 'cy_erp_auth';
export const auth = {
  get: () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } },
  set: (v) => { try { v ? localStorage.setItem(KEY, '1') : localStorage.removeItem(KEY); } catch {} },
};

function Protected({ authed, children }) {
  const loc = useLocation();
  if (!authed) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}

export default function App() {
  const [authed, setAuthed] = useState(auth.get());
  useEffect(() => { auth.set(authed); }, [authed]);

  return (
    <Routes>
      <Route path="/" element={<Landing authed={authed} />} />
      <Route path="/login" element={
        authed ? <Navigate to="/app" replace /> : <Login onLogin={() => setAuthed(true)} />
      } />
      <Route path="/app" element={<Protected authed={authed}><Layout /></Protected>}>
        <Route index element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="sales" element={<Sales />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="production" element={<Production />} />
        <Route path="projects" element={<Projects />} />
        <Route path="assets" element={<Assets />} />
        <Route path="finance" element={<Finance />} />
        <Route path="hr" element={<HR />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings onLogout={() => setAuthed(false)} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
