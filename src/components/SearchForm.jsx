import { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Paper,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 3, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Find Your Dream Property
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {/* Property Type Dropdown */}
        <FormControl fullWidth>
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

        {/* Price Range */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Min Price (£)"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g., 200000"
          />
          <TextField
            fullWidth
            label="Max Price (£)"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g., 500000"
          />
        </Box>

        {/* Bedrooms Dropdown */}
        <FormControl fullWidth>
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

        {/* Date Added Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Added (After)"
            value={dateAdded}
            onChange={(newValue) => setDateAdded(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>

        {/* Postcode */}
        <TextField
          fullWidth
          label="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g., BR5"
        />

        {/* Search Button */}
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleSearch}
          sx={{ marginTop: 2 }}
        >
          Search Properties
        </Button>

      </Box>
    </Paper>
  );
}

export default SearchForm;