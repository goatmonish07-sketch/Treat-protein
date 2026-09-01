import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  products, orders, customers, vendors, purchaseOrders, productionOrders,
  projects, assets, employees, invoices,
} from './data.js';

const KEY = 'cy_erp_data_v1';
const keyField = { products: 'sku' }; // everything else uses `id`

function seed() {
  // deep clone so edits never mutate the source arrays
  return JSON.parse(JSON.stringify({
    products, orders, customers, vendors, purchaseOrders,
    productionOrders, projects, assets, employees, invoices,
  }));
}
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) return { ...seed(), ...saved };
  } catch {}
  return seed();
}

const DataCtx = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} }, [data]);

  const api = useMemo(() => ({
    data,
    add: (coll, item) => setData((d) => ({ ...d, [coll]: [item, ...d[coll]] })),
    update: (coll, id, patch) => setData((d) => {
      const k = keyField[coll] || 'id';
      return { ...d, [coll]: d[coll].map((r) => (r[k] === id ? { ...r, ...patch } : r)) };
    }),
    remove: (coll, id) => setData((d) => {
      const k = keyField[coll] || 'id';
      return { ...d, [coll]: d[coll].filter((r) => r[k] !== id) };
    }),
    reset: () => setData(seed()),
  }), [data]);

  return <DataCtx.Provider value={api}>{children}</DataCtx.Provider>;
}

export function useData() {
  const ctx = useContext(DataCtx);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

export function useCollection(name) {
  const { data, add, update, remove } = useData();
  const k = keyField[name] || 'id';
  return {
    items: data[name],
    keyField: k,
    add: (item) => add(name, item),
    update: (id, patch) => update(name, id, patch),
    remove: (id) => remove(name, id),
  };
}

// unique-ish id generator for new records
export function genId(prefix, coll, k = 'id') {
  const suffix = String(Date.now()).slice(-5);
  let id = `${prefix}-${suffix}`;
  const taken = new Set((coll || []).map((r) => r[k]));
  let n = 0;
  while (taken.has(id)) id = `${prefix}-${suffix}${(++n)}`;
  return id;
}
