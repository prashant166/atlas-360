import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Card, Typography, AppBar, Toolbar, Button, Box } from '@mui/material'
import { Save as SaveIcon } from '@mui/icons-material'
import { useState } from 'react'
import FilterBar from './components/FilterBar'
import GeoInsights from './components/GeoInsights'
import ActivateSegment from './components/ActivateSegment'

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  palette: {
    primary: {
      main: '#2B0030',
    },
    secondary: {
      main: '#FF4C2E',
    },
  },
})

function App() {
  const [showGeoInsights, setShowGeoInsights] = useState(false)
  const [hasFilterChanges, setHasFilterChanges] = useState(false)
  const [initialFilters, setInitialFilters] = useState({
    brand: '',
    category: '',
    competitor: '',
    intelligenceSelection: [],
  })

  const handleFilterChange = (filters: any) => {
    console.log('Filter values:', filters)
    
    // Check if any filter has changed from initial state
    const hasChanges = Object.keys(filters).some(key => {
      if (key === 'intelligenceSelection') {
        return JSON.stringify(filters[key]) !== JSON.stringify(initialFilters[key as keyof typeof initialFilters])
      }
      return filters[key] !== initialFilters[key as keyof typeof initialFilters]
    })
    
    setHasFilterChanges(hasChanges)
  }

  const handleSave = () => {
    setShowGeoInsights(true)
    setHasFilterChanges(false)
    setInitialFilters({
      brand: '',
      category: '',
      competitor: '',
      intelligenceSelection: [],
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="bg-gradient-to-br text-gray-800 min-h-screen">
        {/* Simple Header */}
        <AppBar position="static" sx={{ backgroundColor: '#2B0030' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', fontWeight: 600 }}>
              ATLAS 360🧭
            </Typography>
          </Toolbar>
        </AppBar>
        
        <main className="w-full px-6 py-8 space-y-10">
          {/* Filter Bar - Common for all sections */}
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#1f2937' }}>
              Filters
            </Typography>
            <FilterBar onFilterChange={handleFilterChange} />
            
            {/* Save Button - Only show when there are changes */}
            {hasFilterChanges && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{
                    backgroundColor: '#8e44ad',
                    '&:hover': {
                      backgroundColor: '#7d3c98',
                    },
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': {
                        boxShadow: '0 0 0 0 rgba(142, 68, 173, 0.7)',
                      },
                      '70%': {
                        boxShadow: '0 0 0 10px rgba(142, 68, 173, 0)',
                      },
                      '100%': {
                        boxShadow: '0 0 0 0 rgba(142, 68, 173, 0)',
                      },
                    },
                  }}
                >
                  Save Filters
                </Button>
              </Box>
            )}
          </Card>

          {/* Geo Insights - Only shows after save button is clicked */}
          {showGeoInsights && <GeoInsights />}
          
          {/* Activate Segment - Always visible */}
          <ActivateSegment />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App