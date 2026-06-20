// Manual transaction log. No free market-data API provides real
// brokerage buy/sell history — that needs a brokerage integration
// (e.g. Alpaca). This gives a real, user-maintained log stored locally
// instead of a static mock list.

const STORAGE_KEY = 'transactions';

export function getTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null; // null = never seeded
  } catch {
    return null;
  }
}

// Seeds localStorage with the given defaults only the first time
// (i.e. if nothing has been saved yet). Returns the active list.
export function seedIfEmpty(defaults) {
  const existing = getTransactions();
  if (existing !== null) return existing;
  saveTransactions(defaults);
  return defaults;
}

function saveTransactions(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore storage errors
  }
}

// tx: { type, symbol, quantity, price, status? , date? }
export function addTransaction(tx) {
  const list = getTransactions() || [];
  const newTx = {
    id: `TX${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    status: 'Completed',
    ...tx,
    symbol: tx.symbol?.toUpperCase(),
    quantity: Number(tx.quantity),
    price: Number(tx.price),
  };
  const updated = [newTx, ...list];
  saveTransactions(updated);
  return updated;
}

export function deleteTransaction(id) {
  const list = getTransactions() || [];
  const updated = list.filter(t => t.id !== id);
  saveTransactions(updated);
  return updated;
}

export function clearTransactions() {
  localStorage.removeItem(STORAGE_KEY);
}