import React from 'react';
import {
  Card,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocationOn as LocationIcon,
  TrackChanges as TargetIcon,
} from '@mui/icons-material';
const AudienceSizeTracker: React.FC = () => {
  // Hardcoded values as requested
  const totalAudience = 12600000; // 12.6 million
  const audiencePercentage = 30.5; // 30.5%
  const totalPostalCodes = 520; // 520 postal codes

  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <Card 
      sx={{ 
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        background: '#ffffff',
        height: '100%',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar
          sx={{
            backgroundColor: '#f7b731',
            width: 32,
            height: 32,
            mr: 1.5
          }}
        >
          <TargetIcon sx={{ fontSize: 20, color: '#ffffff' }} />
        </Avatar>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#2B0030',
            fontSize: '1.1rem'
          }}
        >
          Audience Size Tracker
        </Typography>
      </Box>

      {/* Metrics */}
      <Box display="flex" flexDirection="column" gap={2} flex={1}>
        {/* Total Audience */}
        <Box
          sx={{
            backgroundColor: '#fef9e7',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar
            sx={{
              backgroundColor: '#f7b731',
              width: 40,
              height: 40
            }}
          >
            <PeopleIcon sx={{ fontSize: 24, color: '#ffffff' }} />
          </Avatar>
          <Box flex={1}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6b7280', 
                fontWeight: 500,
                fontSize: '0.875rem',
                mb: 0.5
              }}
            >
              Total Audience
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#2B0030', 
                fontWeight: 700,
                fontSize: '1.75rem',
                lineHeight: 1.2,
                mb: 0.5
              }}
            >
              {formatNumber(totalAudience)}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#9ca3af',
                fontSize: '0.75rem'
              }}
            >
              {audiencePercentage}% of Canadian adult population
            </Typography>
          </Box>
        </Box>

        {/* Total Postcodes */}
        <Box
          sx={{
            backgroundColor: '#fef9e7',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar
            sx={{
              backgroundColor: '#f7b731',
              width: 40,
              height: 40
            }}
          >
            <LocationIcon sx={{ fontSize: 24, color: '#ffffff' }} />
          </Avatar>
          <Box flex={1}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6b7280', 
                fontWeight: 500,
                fontSize: '0.875rem',
                mb: 0.5
              }}
            >
              Total Postcodes
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#2B0030', 
                fontWeight: 700,
                fontSize: '1.75rem',
                lineHeight: 1.2
              }}
            >
              {formatNumber(totalPostalCodes)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default AudienceSizeTracker;
