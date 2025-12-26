import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import propertiesData from '../data/properties.json';
import './PropertyDetails.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PropertyDetail() {
  const { id } = useParams();
  const property = propertiesData.properties.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('description');

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Format images for gallery
  const images = property.images.map(img => ({
    original: img,
    thumbnail: img
  }));

  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  return (
    <div className="property-detail">
      {/* Header with back button */}
      <Navbar />
      <header className="detail-header">
        <div className="header-content">
          <Link to="/" className="back-button">← Back to Search</Link>
          <div className="logo">
            <h1>ESTATE<span>FINDER</span></h1>
          </div>
        </div>
      </header>

      {/* Property Info Section */}
      <div className="detail-container">
        <div className="detail-main">
          <h1 className="detail-title">{property.location}</h1>
          <div className="detail-price">{formatPrice(property.price)}</div>
          
          <div className="detail-quick-info">
            <span>{property.bedrooms} Bedrooms</span>
            <span>•</span>
            <span>{property.type}</span>
            <span>•</span>
            <span>{property.tenure}</span>
          </div>

          {/* Image Gallery */}
          <div className="gallery-section">
            <ImageGallery 
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              thumbnailPosition="bottom"
            />
          </div>

          {/* Tabs Section */}
          <div className="tabs-section">
            <div className="tabs-header">
              <button 
                className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-button ${activeTab === 'floorplan' ? 'active' : ''}`}
                onClick={() => setActiveTab('floorplan')}
              >
                Floor Plan
              </button>
              <button 
                className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                Map
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === 'description' && (
                <div className="tab-panel">
                  <h3>Property Description</h3>
                  <p>{property.description}</p>
                  
                  <h3>Key Features</h3>
                  <ul>
                    <li>{property.bedrooms} Bedrooms</li>
                    <li>{property.type}</li>
                    <li>{property.tenure}</li>
                    <li>Postcode: {property.postcode}</li>
                  </ul>
                </div>
              )}

              {activeTab === 'floorplan' && (
                <div className="tab-panel">
                  <h3>Floor Plan</h3>
                  <div className="floorplan-container">
                    <img 
                      src={property.floorPlan} 
                      alt="Floor Plan"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x600?text=Floor+Plan+Coming+Soon';
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="tab-panel">
                  <h3>Location</h3>
                  <div className="map-container">
                    <iframe
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.latitude},${property.longitude}&zoom=15`}
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
<Footer />

export default PropertyDetail;