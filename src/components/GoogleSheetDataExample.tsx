import React from 'react';
import { Card, Box, Typography, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useGoogleSheetData } from '../hooks/useGoogleSheetData';

const GoogleSheetDataExample: React.FC = () => {
  const { data, loading, error, totalAudience, totalPostalCodes } = useGoogleSheetData();

  if (loading) {
    return (
      <Card sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading data from Google Sheets...</Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading data: {error}
        </Alert>
      </Card>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Card sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" color="primary">
            {totalAudience.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Audience
          </Typography>
        </Card>
        <Card sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" color="secondary">
            {totalPostalCodes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Postal Codes
          </Typography>
        </Card>
      </Box>

      {/* Province Data Table */}
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Province-wise Data
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Province</TableCell>
                <TableCell align="right">Total Population</TableCell>
                <TableCell align="right">Average Score</TableCell>
                <TableCell align="right">Geo Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((province) => (
                <TableRow key={province.province}>
                  <TableCell>{province.province}</TableCell>
                  <TableCell align="right">
                    {province.totalPopulation.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {province.avgScore}
                  </TableCell>
                  <TableCell align="right">
                    {province.geoCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default GoogleSheetDataExample;
