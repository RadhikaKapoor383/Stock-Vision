const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchStockQuote(symbol) {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}