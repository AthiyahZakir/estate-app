import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';
import HomePage from './pages/HomePage';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;