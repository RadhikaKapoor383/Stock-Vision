import { useStockData } from './hooks/useStockData';
import MainLayout from './components/layout/MainLayout';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const { data, loading, error } = useStockData('AAPL');
  
  console.log('loading:', loading);
  console.log('data:', data);
  console.log('error:', error);

  return (
    <Router>
      <MainLayout>
      </MainLayout>
    </Router>
  )
}

export default App