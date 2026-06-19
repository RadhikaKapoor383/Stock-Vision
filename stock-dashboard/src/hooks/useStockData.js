import { useState, useEffect } from 'react';
import { fetchStockQuote } from '../services/stockApi';
import { mockStocks } from '../data/mockData';

export function useStockData(symbol) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchStockQuote(symbol);
                setData(result);
            } catch (err) {
                setError(err.message || 'Error fetching stock data');
            } finally {
                setLoading(false);
            }
        }
        setTimeout(() => {
            setData(mockStocks);
            setLoading(false);
        }, 1000);


    }, [symbol]);

    return { data, loading, error };
}