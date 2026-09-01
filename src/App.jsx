import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';
import Sales from './pages/Sales.jsx';
import Customers from './pages/Customers.jsx';
import Employees from './pages/Employees.jsx';
import Accounting from './pages/Accounting.jsx';
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
      <Route path="/login" element={
        authed ? <Navigate to="/" replace /> : <Login onLogin={() => setAuthed(true)} />
      } />
      <Route element={<Protected authed={authed}><Layout /></Protected>}>
        <Route index element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="sales" element={<Sales />} />
        <Route path="customers" element={<Customers />} />
        <Route path="employees" element={<Employees />} />
        <Route path="accounting" element={<Accounting />} />
        <Route path="settings" element={<Settings onLogout={() => setAuthed(false)} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
