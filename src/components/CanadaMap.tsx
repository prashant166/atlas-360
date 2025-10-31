import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { 
  Typography, 
  Box,
  Card,
  CardContent
} from '@mui/material';

const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson";

// Sample Canadian data based on the existing canadianData
const provinceData = {
  'Ontario': 0.613,
  'Quebec': 0.641,
  'British Columbia': 0.472,
  'Alberta': 0.445,
  'Manitoba': 0.580,
  'Saskatchewan': 0.520,
  'Nova Scotia': 0.480,
  'New Brunswick': 0.450,
  'Newfoundland and Labrador': 0.420,
  'Prince Edward Island': 0.400,
  'Northwest Territories': 0.350,
  'Nunavut': 0.300,
  'Yukon': 0.320
};

// Color scale from yellow to pink to purple (lightest to darkest)
const colorScale = scaleLinear<string>()
  .domain([0.3, 0.5, 0.7])
  .range(['#FFD700', '#F90969', '#4B0082']);

interface CanadaMapProps {
  onProvinceClick?: (province: string) => void;
  selectedProvince?: string | null;
}

const CanadaMap: React.FC<CanadaMapProps> = ({ onProvinceClick, selectedProvince }) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const handleProvinceClick = (province: string) => {
    if (onProvinceClick) {
      onProvinceClick(province);
    }
  };

  const getProvinceColor = (province: string, value: number) => {
    if (selectedProvince === province) {
      return '#4a90e2'; // Blue for selected
    }
    if (hoveredProvince === province) {
      return '#6bb6ff'; // Light blue for hover
    }
    return colorScale(value);
  };

  return (
    <Card 
      sx={{ 
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        background: '#f7f7f7',
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            fontWeight: 600, 
            color: '#1f2937',
            textAlign: 'center'
          }}
        >
          Geographic View (Canada)
        </Typography>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ 
            scale: 400, 
            center: [-100, 60] 
          }}
          style={{ 
            width: "100%", 
            height: "500px",
            backgroundColor: '#f7f7f7'
          }}
        >
        <Geographies geography={geoUrl}>
          {({ geographies }: any) =>
            geographies.map((geo: any) => {
                const name = geo.properties.name;
                const value = provinceData[name as keyof typeof provinceData] ?? 0.4;
                const isSelected = selectedProvince === name;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getProvinceColor(name, value)}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2 : 0.6}
                    onMouseEnter={() => setHoveredProvince(name)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onClick={() => handleProvinceClick(name)}
                    style={{
                      default: { 
                        outline: "none",
                        cursor: "pointer"
                      },
                      hover: { 
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: { 
                        outline: "none",
                        cursor: "pointer"
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Legend */}
        <Box 
          mt={2} 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          flexDirection="column"
          gap={1}
        >
          <Typography variant="body2" fontWeight="600" color="text.primary" sx={{ mb: 0.5 }}>
            Composite Score
          </Typography>
          <Box 
            sx={{ 
              width: 200, 
              height: 12, 
              background: "linear-gradient(to right, #FFD700, #F90969, #4B0082)",
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }} 
          />
          <Box display="flex" justifyContent="space-between" width="200px">
            <Typography variant="caption" color="text.secondary">
              0
            </Typography>
            <Typography variant="caption" color="text.secondary">
              1
            </Typography>
          </Box>
        </Box>

        {/* Province Info Tooltip */}
        {hoveredProvince && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
              padding: 2,
              borderRadius: 1,
              minWidth: 220,
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {hoveredProvince}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Sales ($): {((provinceData[hoveredProvince as keyof typeof provinceData] ?? 0.4) * 10).toFixed(2)}Mn
            </Typography>
            <Typography variant="body2" gutterBottom>
              Sales (%): {((provinceData[hoveredProvince as keyof typeof provinceData] ?? 0.4) * 0.1).toFixed(2)}%
            </Typography>
            <Typography variant="body2" gutterBottom>
              Penetration rate (%): {((provinceData[hoveredProvince as keyof typeof provinceData] ?? 0.4) * 100).toFixed(2)}%
            </Typography>
            <Typography variant="body2">
              Average order value ($): {((provinceData[hoveredProvince as keyof typeof provinceData] ?? 0.4) * 20).toFixed(2)}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CanadaMap;
