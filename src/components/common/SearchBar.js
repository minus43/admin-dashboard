import { useState } from 'react';
import {
  TextField,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

function SearchBar({ 
  onSearch, 
  searchOptions = [], 
  placeholder = "검색어를 입력하세요",
  sx 
}) {
  const [searchType, setSearchType] = useState(searchOptions[0]?.value || 'all');
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    onSearch({
      type: searchType,
      keyword: searchText
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper 
      elevation={isFocused ? 3 : 1}
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '24px',
        transition: 'box-shadow 0.2s',
        border: '1px solid',
        borderColor: isFocused ? 'transparent' : '#dfe1e5',
        '&:hover': {
          boxShadow: '0 1px 6px rgba(32,33,36,.28)',
          borderColor: 'transparent',
        },
        ...sx
      }}
    >
      <IconButton 
        sx={{ 
          p: '10px',
          color: '#9aa0a6',
          '&:hover': { backgroundColor: 'transparent' }
        }}
      >
        <SearchIcon />
      </IconButton>

      <TextField
        size="small"
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: 'none' },
            '&.Mui-focused fieldset': { border: 'none' },
          },
          '& .MuiInputBase-input': { 
            padding: '8px 0',
            color: '#202124',
            fontSize: '16px',
            '&::placeholder': {
              color: '#9aa0a6',
              opacity: 1
            }
          }
        }}
      />

      {searchOptions.length > 0 && (
        <FormControl 
          size="small" 
          sx={{ 
            minWidth: 100,
            mr: 1,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-select': { 
              color: '#5f6368',
              py: 1,
              pr: 2,
              pl: 1
            }
          }}
        >
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            displayEmpty
            sx={{
              '&:hover': { backgroundColor: '#f8f9fa' },
              borderRadius: '4px'
            }}
          >
            {searchOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Paper>
  );
}

export default SearchBar; 