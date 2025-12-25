import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Add to favorites
  const addFavorite = (property) => {
    // Check if already exists
    const exists = favorites.find(fav => fav.id === property.id);
    if (exists) {
      alert('This property is already in your favorites!');
      return;
    }
    setFavorites([...favorites, property]);
  };

  // Remove from favorites
  const removeFavorite = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  // Clear all favorites
  const clearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
    }
  };

  // Check if property is favorite
  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        clearFavorites, 
        isFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}