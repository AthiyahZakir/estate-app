import { Link } from 'react-router-dom';
import './PropertyCard.css';

function PropertyCard({ property }) {
  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  return (
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
  );
}

export default PropertyCard;