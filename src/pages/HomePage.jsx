import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchForm from '../components/SearchForm';
import DraggablePropertyCard from '../components/DraggablePropertyCard';
import FavoritesSidebar from '../components/FavoritesSidebar';
import propertiesData from '../data/properties.json';

function HomePage() {
  const allProperties = propertiesData.properties;
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (criteria) => {
    console.log('Searching with criteria:', criteria);

    const results = allProperties.filter((property) => {
      if (criteria.propertyType && property.type !== criteria.propertyType) {
        return false;
      }
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) {
        return false;
      }
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) {
        return false;
      }
      if (criteria.bedrooms) {
        if (criteria.bedrooms === '5') {
          if (property.bedrooms < 5) return false;
        } else {
          if (property.bedrooms !== Number(criteria.bedrooms)) return false;
        }
      }
      if (criteria.dateAdded) {
        const selectedDate = new Date(criteria.dateAdded);
        const propertyDate = new Date(property.dateAdded);
        if (propertyDate < selectedDate) {
          return false;
        }
      }
      if (criteria.postcode) {
        const searchPostcode = criteria.postcode.toLowerCase().trim();
        const propertyPostcode = property.postcode.toLowerCase();
        if (!propertyPostcode.includes(searchPostcode)) {
          return false;
        }
      }
      return true;
    });

    console.log('Found properties:', results.length);
    setFilteredProperties(results);
    setSearchPerformed(true);
  };

  const handleReset = () => {
    setFilteredProperties(allProperties);
    setSearchPerformed(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <div className="logo">
              <h1>ESTATE<span>FINDER</span></h1>
            </div>
            <SearchForm onSearch={handleSearch} onReset={handleReset} />
          </div>
        </header>

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
                <DraggablePropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="no-results">
                <p>No properties match your search criteria.</p>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </main>
        
        <FavoritesSidebar />
      </div>
    </DndProvider>
  );
}

export default HomePage;