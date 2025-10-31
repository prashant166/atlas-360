import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  FilterAltOutlined as FilterIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Tv as TVIcon,
} from '@mui/icons-material';

interface FilterBarProps {
  onFilterChange?: (filters: FilterValues) => void;
}

interface FilterValues {
  brand: string;
  category: string;
  competitor: string[];
  intelligenceSelection: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    brand: '',
    category: '',
    competitor: [],
    intelligenceSelection: [],
  });

  // Market moved to Commerce Intelligence section
  const [tvShareOfVoice, setTvShareOfVoice] = useState('');
  
  // Audience Layer states
  const [audienceType, setAudienceType] = useState<'create' | 'saved' | null>(null);
  const [selectedAudience, setSelectedAudience] = useState('');
  const [audienceName, setAudienceName] = useState('');
  const [audienceDescription, setAudienceDescription] = useState('');

  // Audience descriptions mapping
  const audienceDescriptions: { [key: string]: string } = {
    'Fresh Expressor': 'Socially active individuals who see gum as a confidence booster and personal care essential. Often purchase mint or fruity gum before social events or commutes. High engagement on Instagram and TikTok, follow grooming and lifestyle influencers',
    'Gen Z Fresh Explorer': 'Gen Z and young adults (age 15-32), including students and young professionals, motivated by originality and freshness, they value wellness, convenience, fun, and innovative flavors. They seek sugar-free and trending novelty gum flavors'
  };
  
  // Commerce Intelligence state
  const [commerceMarketPosition, setCommerceMarketPosition] = useState('');
  
  // Intelligence Layer states
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleFilterChange = (field: keyof FilterValues) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newFilters = {
      ...filters,
      [field]: event.target.value,
    };
    
    // Auto-select Excel and Snacks when Trident or Mentos is selected
    if (field === 'brand' && (event.target.value === 'trident' || event.target.value === 'mentos')) {
      const currentCompetitors = filters.competitor;
      if (!currentCompetitors.includes('excel')) {
        newFilters.competitor = [...currentCompetitors, 'excel'];
      }
      // Auto-select snacks category
      newFilters.category = 'snacks';
    }
    
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCompetitorChange = (event: any) => {
    const value = event.target.value;
    const newFilters = {
      ...filters,
      competitor: typeof value === 'string' ? value.split(',') : value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleIntelligenceChange = (event: any) => {
    const value = event.target.value;
    const newFilters = {
      ...filters,
      intelligenceSelection: typeof value === 'string' ? value.split(',') : value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };


  const selectStyle: React.CSSProperties = {
    minWidth: '160px',
    height: '36px',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    fontSize: '0.875rem',
    backgroundColor: '#fff',
    color: '#333',
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <Paper 
      elevation={0} 
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        mb: 2,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box 
        display="flex" 
        alignItems="center" 
        gap={1.5} 
        flexWrap="wrap" 
        sx={{ mt: 1 }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <FilterIcon sx={{ color: '#8e44ad', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
            Filters
          </Typography>
        </Box>
        {/* Brand Filter */}
        <select
          value={filters.brand}
          onChange={handleFilterChange('brand')}
          style={selectStyle}
          className="filter-select"
        >
          <option value="">Brand</option>
          <option value="trident">Trident</option>
          <option value="mentos">Mentos</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={handleFilterChange('category')}
          style={selectStyle}
          className="filter-select"
        >
          <option value="">Category</option>
          <option value="dairy">Dairy</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="fast-food">Fast Food</option>
          <option value="coffee">Coffee</option>
        </select>

        {/* Competitor Filter */}
        <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
          <InputLabel id="competitor-select-label">Competitor</InputLabel>
          <Select
            labelId="competitor-select-label"
            multiple
            value={filters.competitor}
            onChange={handleCompetitorChange}
            label="Competitor"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
            sx={{ backgroundColor: 'white' }}
          >
            <MenuItem value="excel">Excel</MenuItem>
            <MenuItem value="5-gum">5 Gum</MenuItem>
          </Select>
        </FormControl>

        {/* Intelligence Selection Filter */}
        <FormControl size="small" sx={{ minWidth: 200, flex: 1 }}>
          <InputLabel id="intelligence-select-label">Select Intelligence</InputLabel>
          <Select
            labelId="intelligence-select-label"
            multiple
            value={filters.intelligenceSelection}
            onChange={handleIntelligenceChange}
            label="Select Intelligence"
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <Typography sx={{ color: '#999', fontSize: '0.875rem' }}>Select Intelligence</Typography>;
              }
              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, py: 0.5 }}>
                  {selected.map((value) => {
                    const getIcon = () => {
                      if (value === 'audience') return <PeopleIcon sx={{ fontSize: 14, mr: 0.5 }} />;
                      if (value === 'commerce') return <ShoppingCartIcon sx={{ fontSize: 14, mr: 0.5 }} />;
                      if (value === 'tv') return <TVIcon sx={{ fontSize: 14, mr: 0.5 }} />;
                      return null;
                    };
                    const getColor = () => {
                      if (value === 'audience') return '#8e44ad';
                      if (value === 'commerce') return '#FF9E00';
                      if (value === 'tv') return '#D0009C';
                      return '#666';
                    };
                    return (
                      <Chip
                        key={value}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getIcon()}
                            <span style={{ textTransform: 'capitalize' }}>{value}</span>
                          </Box>
                        }
                        size="small"
                        sx={{
                          backgroundColor: getColor(),
                          color: '#fff',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: 24,
                          '& .MuiChip-deleteIcon': {
                            color: '#fff',
                            fontSize: 16,
                            '&:hover': {
                              color: '#f0f0f0',
                            },
                          },
                        }}
                        onDelete={(e) => {
                          e.stopPropagation();
                          const newSelection = selected.filter((item) => item !== value);
                          handleIntelligenceChange({ target: { value: newSelection } } as any);
                        }}
                      />
                    );
                  })}
                </Box>
              );
            }}
            sx={{ backgroundColor: 'white' }}
            MenuProps={{
              PaperProps: {
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e0e0e0',
                  '& .MuiMenuItem-root': {
                    py: 1.5,
                    px: 2,
                    fontSize: '0.875rem',
                  },
                },
              },
            }}
          >
            <MenuItem 
              value="audience"
              sx={{
                '&:hover': {
                  backgroundColor: '#f3e8ff',
                },
                '&.Mui-selected': {
                  backgroundColor: '#f3e8ff',
                  '&:hover': {
                    backgroundColor: '#e9d5ff',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PeopleIcon sx={{ fontSize: 20, color: '#8e44ad' }} />
                <Typography sx={{ fontWeight: 500 }}>Audience</Typography>
              </Box>
            </MenuItem>
            <MenuItem 
              value="commerce"
              sx={{
                '&:hover': {
                  backgroundColor: '#fff4e6',
                },
                '&.Mui-selected': {
                  backgroundColor: '#fff4e6',
                  '&:hover': {
                    backgroundColor: '#ffedd5',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ShoppingCartIcon sx={{ fontSize: 20, color: '#FF9E00' }} />
                <Typography sx={{ fontWeight: 500 }}>Commerce</Typography>
              </Box>
            </MenuItem>
            <MenuItem 
              value="tv"
              sx={{
                '&:hover': {
                  backgroundColor: '#fce7f3',
                },
                '&.Mui-selected': {
                  backgroundColor: '#fce7f3',
                  '&:hover': {
                    backgroundColor: '#fbd1e7',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <TVIcon sx={{ fontSize: 20, color: '#D0009C' }} />
                <Typography sx={{ fontWeight: 500 }}>TV</Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Intelligence Selection Boxes */}
      {filters.intelligenceSelection.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {filters.intelligenceSelection.includes('audience') && (
            <Box
              sx={{
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: '#f8f9fa',
                minWidth: '300px',
                flex: 1,
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, color: '#333', fontWeight: 600 }}>
                Audience Selection
              </Typography>
              
              

              {/* Audience Selection Toggle */}
              <ToggleButtonGroup
                value={audienceType}
                exclusive
                onChange={(_, value) => value && setAudienceType(value)}
                size="small"
                sx={{ mb: 2 }}
              >
                <ToggleButton value="create">Create Audience</ToggleButton>
                <ToggleButton value="saved">Saved Audience</ToggleButton>
              </ToggleButtonGroup>

              {/* Create Audience Fields */}
              {audienceType === 'create' && (
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Name your Audience Persona"
                    value={audienceName}
                    onChange={(e) => setAudienceName(e.target.value)}
                    sx={{ mb: 2, backgroundColor: 'white' }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    placeholder="Describe your Audience Persona..."
                    value={audienceDescription}
                    onChange={(e) => setAudienceDescription(e.target.value)}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Box>
              )}

              {/* Saved Audience Field */}
              {audienceType === 'saved' && (
                <Box>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="saved-audience-label">Select Audience</InputLabel>
                  <Select
                    labelId="saved-audience-label"
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    label="Select Audience"
                    sx={{ backgroundColor: 'white' }}
                  >
                      <MenuItem value="Fresh Expressor">Fresh Expressor</MenuItem>
                      <MenuItem value="Gen Z Fresh Explorer">Gen Z Fresh Explorer</MenuItem>
                  </Select>
                </FormControl>
                  {selectedAudience && audienceDescriptions[selectedAudience] && (
                    <Box
                      sx={{
                        p: 1.5,
                        backgroundColor: '#f0f4ff',
                        borderRadius: 1,
                        border: '1px solid #e0e7ff',
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#374151',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                        }}
                      >
                        {audienceDescriptions[selectedAudience]}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}

          {filters.intelligenceSelection.includes('commerce') && (
            <Box
              sx={{
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: '#f8f9fa',
                minWidth: '300px',
                flex: 1,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, color: '#333', fontWeight: 600 }}>
                Commerce Landscape
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#666', fontSize: '0.875rem', fontStyle: 'italic' }}>
                Brand Market Share + Category Sales Trend + Competitive Intelligence
              </Typography>
              
              {/* Market Position */}
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel id="commerce-market-position-label">Select Market Position</InputLabel>
                <Select
                  labelId="commerce-market-position-label"
                  value={commerceMarketPosition}
                  onChange={(e) => setCommerceMarketPosition(e.target.value)}
                  label="Select Market Position"
                  sx={{ backgroundColor: 'white' }}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          
          {filters.intelligenceSelection.includes('tv') && (
            <Box
              sx={{
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: '#f8f9fa',
                minWidth: '300px',
                flex: 1,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, color: '#333', fontWeight: 600 }}>
                TV Landscape
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#666', fontSize: '0.875rem', fontStyle: 'italic' }}>
                TV Delivery Index + Content Affinity
              </Typography>
              
              {/* TV Intelligence Fields - Horizontal Layout */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
              {/* TV Share of Voice */}
                <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
                  <InputLabel id="tv-share-voice-label">Share of Voice</InputLabel>
                  <Select
                    labelId="tv-share-voice-label"
                    value={tvShareOfVoice}
                    onChange={(e) => setTvShareOfVoice(e.target.value)}
                    label="Share of Voice"
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>

              {/* Content Affinity */}
                <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
                  <InputLabel id="tv-genre-label">Select Genre</InputLabel>
                  <Select
                    labelId="tv-genre-label"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                    label="Select Genre"
                  sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="drama">Drama</MenuItem>
                    <MenuItem value="sports">Sports</MenuItem>
                    <MenuItem value="news">News</MenuItem>
                    <MenuItem value="reality">Reality</MenuItem>
                    <MenuItem value="kids">Kids</MenuItem>
                    <MenuItem value="movies">Movies</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default FilterBar;
