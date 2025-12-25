import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './PropertyCard.css';

function PropertyCard({ property, isDraggable = true }) {
  const { addFavorite, isFavorite } = useFavorites();
  const isAlreadyFavorite = isFavorite(property.id);

  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  const handleAddFavorite = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    addFavorite(property);
  };

  return (
    <div className="property-card-wrapper">
      <Link to={`/property/${property.id}`} className="property-card-link">
        <div className="property-card">
          <div className="card-image">
            <img 
              src={property.image} 
              alt={property.location}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
              }}
            />
            
            {/* Favorite Button Overlay */}
            <button 
              className={`favorite-button ${isAlreadyFavorite ? 'active' : ''}`}
              onClick={handleAddFavorite}
              title={isAlreadyFavorite ? 'Already in favorites' : 'Add to favorites'}
            >
              {isAlreadyFavorite ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div className="card-content">
            <div className="card-price">{formatPrice(property.price)}</div>
            
            <div className="card-details">
              <span className="detail-item">{property.bedrooms} bed</span>
              <span className="detail-separator">•</span>
              <span className="detail-item">{property.type}</span>
            </div>
            
            <div className="card-address">{property.location}</div>
            
            <div className="card-tenure">{property.tenure}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;