// Manual transaction log. No free market-data API provides real
// brokerage buy/sell history — that needs a brokerage integration
// (e.g. Alpaca). This gives a real, user-maintained log stored locally
// instead of a static mock list.

const STORAGE_PREFIX = 'transactions';

function getStorageKey(accountKey = 'default') {
  return `${STORAGE_PREFIX}:${accountKey || 'default'}`;
}

export function getTransactions(accountKey) {
  try {
    const raw = localStorage.getItem(getStorageKey(accountKey));
    return raw ? JSON.parse(raw) : null; // null = never seeded
  } catch {
    return null;
  }
}

// Seeds localStorage with the given defaults only the first time
// (i.e. if nothing has been saved yet). Returns the active list.
export function seedIfEmpty(defaults, accountKey) {
  const existing = getTransactions(accountKey);
  if (existing !== null) return existing;
  const seeded = defaults || [];
  saveTransactions(seeded, accountKey);
  return seeded;
}

function saveTransactions(list, accountKey) {
  try {
    localStorage.setItem(getStorageKey(accountKey), JSON.stringify(list));
  } catch {
    // ignore storage errors
  }
}

// tx: { type, symbol, quantity, price, status? , date? }
export function addTransaction(tx, accountKey) {
  const list = getTransactions(accountKey) || [];
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
  saveTransactions(updated, accountKey);
  return updated;
}

export function deleteTransaction(id, accountKey) {
  const list = getTransactions(accountKey) || [];
  const updated = list.filter(t => t.id !== id);
  saveTransactions(updated, accountKey);
  return updated;
}

export function clearTransactions(accountKey) {
  localStorage.removeItem(getStorageKey(accountKey));
}