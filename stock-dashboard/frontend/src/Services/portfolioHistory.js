// Free workaround for historical portfolio value: since Finnhub's free tier
// has no historical-portfolio endpoint, we record a snapshot of the live
// portfolio value once per day in localStorage. Over time this builds real
// history without needing a paid API.

const STORAGE_KEY = 'portfolioSnapshots';

export function getSnapshots() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Records today's portfolio value. Only writes once per day (keyed by
// date), so repeated renders/visits on the same day don't create noise.
export function recordSnapshot(value) {
  if (!value || Number.isNaN(value)) return;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const snapshots = getSnapshots();
  snapshots[today] = Math.round(value);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
  } catch {
    // ignore storage errors (e.g. quota, private mode)
  }
}

const RANGE_DAYS = { weekly: 7, monthly: 30, yearly: 365 };

// Returns chart-ready points ({ name, value }) built from real snapshots
// within the given timeframe window. Empty array if not enough history yet.
export function getChartData(timeframe) {
  const snapshots = getSnapshots();
  const dates = Object.keys(snapshots).sort();
  const days = RANGE_DAYS[timeframe] || 30;
  const cutoff = Date.now() - days * 86400000;

  return dates
    .filter(d => new Date(d).getTime() >= cutoff)
    .map(d => ({
      name: new Date(d).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
      value: snapshots[d],
    }));
}

export function hasEnoughHistory(timeframe, minPoints = 2) {
  return getChartData(timeframe).length >= minPoints;
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}