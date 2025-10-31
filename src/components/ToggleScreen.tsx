import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ToggleScreenProps {
  selectedTab: 'request' | 'adoption';
  onTabChange: (tab: 'request' | 'adoption') => void;
  darkMode?: boolean;
}

const ToggleContainer = styled(Box)<{ darkMode: boolean }>(({ darkMode }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '52px',
  backgroundColor: 'transparent',
  borderBottom: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
  padding: '8px 24px 0 24px',
  position: 'relative',
  zIndex: 2
}));

const ToggleButton = styled(Button)<{ darkMode: boolean; active: boolean }>(
  ({ active }) => ({
    padding: '0 0 10px 0', // Vertical padding, leaving space for underline
    marginRight: '24px', // Spacing between buttons
    textTransform: 'none',
    fontSize: '15px',
    fontWeight: active ? 700 : 500,
    color: '#ffffff', // White text for visibility on animated background
    backgroundColor: 'transparent',
    borderRadius: '0',
    borderBottom: active ? '2px solid #4F46E5' : '2px solid transparent',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'transparent',
      borderBottom: active
        ? '2px solid #4F46E5'
        : '2px solid rgba(255,255,255,0.3)' // White hover for inactive
    }
  })
);

const ToggleScreen: React.FC<ToggleScreenProps> = ({ 
  selectedTab, 
  onTabChange, 
  darkMode = false 
}) => {
  return (
    <ToggleContainer darkMode={darkMode}>
      <ToggleButton
        darkMode={darkMode}
        active={selectedTab === 'request'}
        onClick={() => onTabChange('request')}
      >
        Audience
      </ToggleButton>
      <ToggleButton
        darkMode={darkMode}
        active={selectedTab === 'adoption'}
        onClick={() => onTabChange('adoption')}
      >
        Intelligence
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ToggleScreen;
