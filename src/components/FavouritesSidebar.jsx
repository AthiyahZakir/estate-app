import { useFavorites } from '../context/FavoritesContext';
import './FavoritesSidebar.css';

function FavoritesSidebar() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  return (
    <div className={`favorites-sidebar ${favorites.length > 0 ? 'has-items' : ''}`}>
      <div className="favorites-header">
        <h3>My Favorites ({favorites.length})</h3>
        {favorites.length > 0 && (
          <button 
            className="clear-all-button"
            onClick={clearFavorites}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="favorites-list">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <p>❤️</p>
            <p>No favorites yet!</p>
            <p className="empty-hint">Click the heart icon on properties to add them here</p>
          </div>
        ) : (
          favorites.map((property) => (
            <div key={property.id} className="favorite-item">
              <img 
                src={property.image} 
                alt={property.location}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x80?text=Image';
                }}
              />
              <div className="favorite-info">
                <div className="favorite-price">{formatPrice(property.price)}</div>
                <div className="favorite-details">
                  {property.bedrooms} bed • {property.type}
                </div>
                <div className="favorite-location">{property.postcode}</div>
              </div>
              <button 
                className="remove-favorite"
                onClick={() => removeFavorite(property.id)}
                title="Remove from favorites"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavoritesSidebar;