import MainLayout from './components/layout/MainLayout';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <MainLayout>
        <h1 className='main-heading'>Stock Dashboard</h1>
      </MainLayout>
    </Router>
  )
}

export default App