const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export async function fetchQuote(symbol) {
  const res = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
  if (!res.ok) throw new Error(`Finnhub error for ${symbol}`);
  const data = await res.json();
  return {
    symbol,
    price: data.c,
    change: data.d,
    changePercent: data.dp,
    isPositive: data.d >= 0,
  };
}

export async function fetchMultipleQuotes(symbols) {
  const results = await Promise.allSettled(symbols.map(fetchQuote));
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}

export const INDEX_SYMBOLS = [
  { symbol: 'SPY',  name: 'S&P 500' },
  { symbol: 'QQQ',  name: 'NASDAQ' },
  { symbol: 'DIA',  name: 'Dow Jones' },
  { symbol: 'IWM',  name: 'Russell 2000' },
];

export async function fetchMarketOverview() {
  const quotes = await fetchMultipleQuotes(INDEX_SYMBOLS.map(i => i.symbol));
  return quotes.map((q, i) => ({
    name: INDEX_SYMBOLS[i]?.name || q.symbol,
    value: q.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    change: `${q.changePercent >= 0 ? '+' : ''}${q.changePercent?.toFixed(2)}%`,
    isPositive: q.isPositive,
  }));
}

export const TOP_PERFORMER_SYMBOLS = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.',     logo: 'N' },
  { symbol: 'TSLA', name: 'Tesla Inc.',        logo: 'T' },
  { symbol: 'AAPL', name: 'Apple Inc.',        logo: 'A' },
  { symbol: 'MSFT', name: 'Microsoft Corp.',   logo: 'M' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.',   logo: 'A' },
];

export async function fetchTopPerformers() {
  const quotes = await fetchMultipleQuotes(TOP_PERFORMER_SYMBOLS.map(s => s.symbol));
  return TOP_PERFORMER_SYMBOLS.map(meta => {
    const q = quotes.find(q => q.symbol === meta.symbol);
    if (!q) return null;
    return {
      symbol: meta.symbol,
      name: meta.name,
      logo: meta.logo,
      price: q.price,
      gain: `${q.changePercent >= 0 ? '+' : ''}${q.changePercent?.toFixed(2)}%`,
      isPositive: q.isPositive,
    };
  }).filter(Boolean);
}


export const MY_HOLDINGS = {
  NVDA: 15,
  AAPL: 10,
  TSLA: 20,
  MSFT: 8,
  AMZN: 25,
};

export async function fetchPortfolioStats(availableCash = 24500) {
  const symbols = Object.keys(MY_HOLDINGS);
  const quotes = await fetchMultipleQuotes(symbols);

  let portfolioValue = availableCash;
  let totalInvestments = 0;
  let todayPL = 0;

  quotes.forEach(q => {
    const qty = MY_HOLDINGS[q.symbol] || 0;
    const positionValue = q.price * qty;
    const positionChange = q.change * qty;
    portfolioValue += positionValue;
    totalInvestments += positionValue;
    todayPL += positionChange;
  });

  const portfolioChange = ((portfolioValue - availableCash - totalInvestments + todayPL) / (totalInvestments - todayPL || 1)) * 100;
  const todayPLChange = (todayPL / (totalInvestments - todayPL || 1)) * 100;

  return {
    portfolioValue: Math.round(portfolioValue),
    totalInvestments: Math.round(totalInvestments),
    todayProfitLoss: Math.round(todayPL),
    todayProfitLossChange: parseFloat(todayPLChange.toFixed(2)),
    portfolioChange: parseFloat(portfolioChange.toFixed(2)),
    portfolioChangeAmount: Math.round(todayPL),
  };
}

export async function fetchMarketNews() {
  const res = await fetch(`${BASE_URL}/news?category=general&token=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch news');
  const articles = await res.json();

  // Take top 3 articles that have an image
  return articles
    .filter(a => a.image && a.headline)
    .slice(0, 3)
    .map((a, i) => ({
      id: i + 1,
      category: a.category || 'Markets',
      headline: a.headline,
      time: timeAgo(a.datetime * 1000),
      image: a.image,
      url: a.url,
    }));
}

function timeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}