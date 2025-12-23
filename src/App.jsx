import { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import PropertyCard from './components/PropertyCard';
import propertiesData from './data/properties.json';

function App() {
  // Extract properties array from JSON
  const allProperties = propertiesData.properties;

  // State for filtered properties
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Search function - receives search criteria from SearchForm
  const handleSearch = (criteria) => {
    console.log('Searching with criteria:', criteria);

    // Filter properties based on criteria
    const results = allProperties.filter((property) => {
      // Check property type
      if (criteria.propertyType && property.type !== criteria.propertyType) {
        return false;
      }

      // Check min price
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) {
        return false;
      }

      // Check max price
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) {
        return false;
      }

      // Check bedrooms
      if (criteria.bedrooms) {
        if (criteria.bedrooms === '5') {
          // 5+ bedrooms
          if (property.bedrooms < 5) return false;
        } else {
          // Exact match
          if (property.bedrooms !== Number(criteria.bedrooms)) return false;
        }
      }

      // Check date added (properties added AFTER selected date)
      if (criteria.dateAdded) {
        const selectedDate = new Date(criteria.dateAdded);
        const propertyDate = new Date(property.dateAdded);
        if (propertyDate < selectedDate) {
          return false;
        }
      }

      // Check postcode (case-insensitive partial match)
      if (criteria.postcode) {
        const searchPostcode = criteria.postcode.toLowerCase().trim();
        const propertyPostcode = property.postcode.toLowerCase();
        if (!propertyPostcode.includes(searchPostcode)) {
          return false;
        }
      }

      // Property passed all filters
      return true;
    });

    console.log('Found properties:', results.length);
    setFilteredProperties(results);
    setSearchPerformed(true);
  };

  // Reset function
  const handleReset = () => {
    setFilteredProperties(allProperties);
    setSearchPerformed(false);
  };

  return (
    <div className="App">
      {/* Header with Logo and Search Form */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <h1>ESTATE<span>FINDER</span></h1>
          </div>
          <SearchForm onSearch={handleSearch} onReset={handleReset} />
        </div>
      </header>

      {/* Main Content Area - Property Results */}
      <main className="main-content">
        <div className="results-header">
          <h2>
            {searchPerformed 
              ? `${filteredProperties.length} Properties Found`
              : 'All Properties'
            }
          </h2>
        </div>

        <div className="results-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="no-results">
              <p>No properties match your search criteria.</p>
              <p>Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;