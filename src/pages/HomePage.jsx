// Import required dependencies
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchForm from '../components/SearchForm';
import DraggablePropertyCard from '../components/DraggablePropertyCard';
import FavoritesSidebar from '../components/FavoritesSidebar';
import propertiesData from '../data/properties.json';

function HomePage() {
  // Load all properties from JSON
  const allProperties = propertiesData.properties;
  
  // State: Currently displayed properties (after filtering)
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  
  // State: Track if user has performed a search
  const [searchPerformed, setSearchPerformed] = useState(false);

  /**
   * Handle search form submission
   * Filters properties based on user criteria
   * @param {Object} criteria - Search filters from form
   */
  const handleSearch = (criteria) => {
    console.log('Searching with criteria:', criteria);

    // Filter properties array based on all criteria
    const results = allProperties.filter((property) => {
      // Check property type (House/Flat/Bungalow)
      if (criteria.propertyType && property.type !== criteria.propertyType) {
        return false;
      }
      
      // Check minimum price
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) {
        return false;
      }
      
      // Check maximum price
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) {
        return false;
      }
      
      // Check bedrooms (handle 5+ special case)
      if (criteria.bedrooms) {
        if (criteria.bedrooms === '5') {
          if (property.bedrooms < 5) return false;
        } else {
          if (property.bedrooms !== Number(criteria.bedrooms)) return false;
        }
      }
      
      // Check date added (properties listed after selected date)
      if (criteria.dateAdded) {
        const selectedDate = new Date(criteria.dateAdded);
        const propertyDate = new Date(property.dateAdded);
        if (propertyDate < selectedDate) {
          return false;
        }
      }
      
      // Check postcode (partial match, case-insensitive)
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

  /**
   * Reset search - show all properties
   */
  const handleReset = () => {
    setFilteredProperties(allProperties);
    setSearchPerformed(false);
  };

  return (
    // DnD Provider enables drag-and-drop throughout the page
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {/* Header with logo and search form */}
        <header className="app-header">
          <div className="header-content">
            <div className="logo">
              <h1>ESTATE<span>FINDER</span></h1>
            </div>
            <SearchForm onSearch={handleSearch} onReset={handleReset} />
          </div>
        </header>

        {/* Main content area */}
        <main className="main-content">
          {/* Results count heading */}
          <div className="results-header">
            <h2>
              {searchPerformed 
                ? `${filteredProperties.length} Properties Found`
                : 'All Properties'
              }
            </h2>
          </div>

          {/* Property cards grid */}
          <div className="results-grid">
            {filteredProperties.length > 0 ? (
              // Map through properties and create draggable cards
              filteredProperties.map((property) => (
                <DraggablePropertyCard key={property.id} property={property} />
              ))
            ) : (
              // Show message when no results
              <div className="no-results">
                <p>No properties match your search criteria.</p>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </main>
        
        {/* Favorites sidebar (fixed right side) */}
        <FavoritesSidebar />
      </div>
    </DndProvider>
  );
}

export default HomePage;