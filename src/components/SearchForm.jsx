import { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './SearchForm.css';

function SearchForm() {
  // State to store form values
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [dateAdded, setDateAdded] = useState(null);
  const [postcode, setPostcode] = useState('');

  // Handle search button click
  const handleSearch = () => {
    console.log('Search clicked!');
    console.log({
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      dateAdded,
      postcode
    });
  };

  // Handle reset button click
  const handleReset = () => {
    setPropertyType('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setDateAdded(null);
    setPostcode('');
    console.log('Form reset!');
  };

  return (
    <div className="search-form">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {/* Row 1: Property Type, Bedrooms, Postcode */}
        <Box className="form-row">
          <FormControl className="form-field">
            <InputLabel>Property Type</InputLabel>
            <Select
              value={propertyType}
              label="Property Type"
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Flat">Flat</MenuItem>
              <MenuItem value="Bungalow">Bungalow</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="form-field">
            <InputLabel>Bedrooms</InputLabel>
            <Select
              value={bedrooms}
              label="Bedrooms"
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5+</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className="form-field"
            label="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="e.g., BR5"
          />
        </Box>

        {/* Row 2: Price Range, Date */}
        <Box className="form-row">
          <TextField
            className="form-field"
            label="Min Price (£)"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="200000"
          />
          
          <TextField
            className="form-field"
            label="Max Price (£)"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="500000"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="form-field"
              label="Date Added (After)"
              value={dateAdded}
              onChange={(newValue) => setDateAdded(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Box>

        {/* Row 3: Buttons */}
        <Box className="button-row">
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleSearch}
            className="search-button"
          >
            Search Properties
          </Button>

          <Button 
            variant="outlined" 
            size="large" 
            onClick={handleReset}
            className="reset-button"
          >
            Reset
          </Button>
        </Box>

      </Box>
    </div>
  );
}

export default SearchForm;