import React, { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register all Chart.js controllers, elements, scales, and plugins
ChartJS.register(...registerables);

interface BuyingInsightsTabsProps {
  selectedProvince?: string | null;
}

const BuyingInsightsTabs: React.FC<BuyingInsightsTabsProps> = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Share of Wallet Chart
  const ShareOfWalletChart = () => {
    const data = {
      labels: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Beauty'],
      datasets: [
        {
          label: 'Impressions',
          data: [850, 720, 680, 520, 480],
          backgroundColor: '#f7b731',
          borderColor: '#f7b731',
          borderWidth: 0,
        },
        {
          label: 'Frequency',
          data: [12.5, 8.3, 6.7, 4.2, 3.8],
          backgroundColor: '#9b59b6',
          borderColor: '#9b59b6',
          borderWidth: 0,
        }
      ],
    };

    const options = {
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: '#f5f6fa',
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  // Purchase Behavior Chart
  const PurchaseBehaviorChart = () => {
    const data = {
      labels: ['0-7 days', '8-14 days', '15-30 days', '31-60 days', '60+ days'],
      datasets: [
        {
          label: 'Time Lag (days)',
          data: [25, 35, 20, 15, 5],
          backgroundColor: '#3498db',
          borderColor: '#3498db',
          borderWidth: 0,
        },
        {
          label: 'First vs Repeat',
          data: [40, 60, 30, 45, 20],
          backgroundColor: '#e74c3c',
          borderColor: '#e74c3c',
          borderWidth: 0,
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
        },
      },
      scales: {
        x: {
          grid: {
            color: '#f5f6fa',
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#f5f6fa',
          },
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  // Retail Scorecard Chart
  const RetailScorecardChart = () => {
    const data = {
      labels: ['Conversion %', 'Visit Rate', 'Bounce Rate', 'Avg. Session', 'Return Rate'],
      datasets: [
        {
          label: 'Retail KPIs',
          data: [12.5, 8.3, 6.7, 4.2, 3.8],
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#f39c12',
            '#e74c3c',
            '#9b59b6'
          ],
          borderWidth: 0,
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#f5f6fa',
          },
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  // Consumer Segmentation Chart
  const ConsumerSegmentationChart = () => {
    const data = {
      labels: ['Premium', 'Value', 'Budget', 'Luxury', 'Eco-Conscious'],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            '#8e44ad',
            '#3498db',
            '#2ecc71',
            '#f39c12',
            '#e74c3c'
          ],
          borderWidth: 0,
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right' as const,
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
      },
    };

    return <Doughnut data={data} options={options} />;
  };

  const renderChart = () => {
    switch (selectedTab) {
      case 0:
        return <ShareOfWalletChart />;
      case 1:
        return <PurchaseBehaviorChart />;
      case 2:
        return <RetailScorecardChart />;
      case 3:
        return <ConsumerSegmentationChart />;
      default:
        return <ShareOfWalletChart />;
    }
  };

  return (
    <Card 
      sx={{ 
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem 1.5rem',
        background: '#fff',
        marginBottom: '1.5rem'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
          Buying Insights
        </Typography>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange}
          sx={{ 
            justifyContent: 'flex-end',
            minHeight: 36,
            '& .MuiTabs-root': {
              minHeight: '36px !important',
            },
            '& .MuiTab-root': {
              fontSize: '0.9rem',
              textTransform: 'none',
              minHeight: 36,
              color: '#6c6c6c',
              '&.Mui-selected': {
                color: '#8e44ad !important',
                borderBottom: '2px solid #8e44ad',
              },
            },
          }}
        >
          <Tab label="Share of Wallet" />
          <Tab label="Purchase Behavior" />
          <Tab label="Retail Scorecard" />
          <Tab label="Consumer Segmentation" />
        </Tabs>
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <Box sx={{ height: '300px' }}>
        {renderChart()}
      </Box>
    </Card>
  );
};

export default BuyingInsightsTabs;