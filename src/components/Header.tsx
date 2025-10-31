import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// ✅ Navbar container
const NavbarContainer = styled(Box)(({ theme }) => ({
  background: '#2B0030', // Deep purple background
  padding: '0 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 68,
  boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  width: '100%',
  boxSizing: 'border-box',

  // Responsive stacking for smaller screens
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
    padding: '12px 20px',
    textAlign: 'center',
    gap: '6px',
  },
}));

// ✅ Left title
const Logo = styled('h1')(() => ({
  fontSize: '1.875rem',
  fontWeight: 700,
  color: '#ffffff',
  letterSpacing: '-0.025em',
  margin: 0,
  flexShrink: 0,
  whiteSpace: 'nowrap',
}));

// ✅ Right text
const RightText = styled('div')(() => ({
  color: '#ffffff',
  fontSize: '0.875rem',
  fontWeight: 400,
  textAlign: 'right',
  minWidth: '200px',
  maxWidth: '340px',
  lineHeight: '1.4',
  flexShrink: 0,
  whiteSpace: 'normal',
  display: 'block',
  visibility: 'visible',
  opacity: 1,
  position: 'relative',
  zIndex: 1,
  marginLeft: 'auto',
}));

// ✅ Final Header component (simplified, no tabs)
const Header: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo>ATLAS 360🧭</Logo>
      <RightText>
        Unifying intelligence across data ecosystems for holistic planning and activation
      </RightText>
    </NavbarContainer>
  );
};

export default Header;
