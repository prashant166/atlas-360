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
import { Bar, Line } from 'react-chartjs-2';

// Register all Chart.js controllers, elements, scales, and plugins
ChartJS.register(...registerables);

interface WatchingInsightsTabsProps {
  selectedProvince?: string | null;
}

const WatchingInsightsTabs: React.FC<WatchingInsightsTabsProps> = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Share of Voice Chart
  const ShareOfVoiceChart = () => {
    const data = {
      labels: ['Our Brand', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
      datasets: [
        {
          label: 'Share of Voice (%)',
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
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
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

  // Media Consumption Chart
  const MediaConsumptionChart = () => {
    const data = {
      labels: ['Top Shows', 'Top Networks', 'Top Domains'],
      datasets: [
        {
          label: 'Shows',
          data: [85, 72, 68],
          backgroundColor: '#3498db',
          borderColor: '#3498db',
          borderWidth: 0,
        },
        {
          label: 'Networks',
          data: [78, 65, 55],
          backgroundColor: '#2ecc71',
          borderColor: '#2ecc71',
          borderWidth: 0,
        },
        {
          label: 'Domains',
          data: [92, 88, 75],
          backgroundColor: '#f39c12',
          borderColor: '#f39c12',
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

  // Frequency Distribution Chart
  const FrequencyDistributionChart = () => {
    const data = {
      labels: ['1-2x', '3-5x', '6-10x', '11-20x', '21-50x', '50x+'],
      datasets: [
        {
          label: 'Frequency Distribution',
          data: [15, 25, 30, 20, 8, 2],
          backgroundColor: [
            '#e74c3c',
            '#f39c12',
            '#2ecc71',
            '#3498db',
            '#9b59b6',
            '#8e44ad'
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

  // Temporal Trends Chart
  const TemporalTrendsChart = () => {
    const data = {
      labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
      datasets: [
        {
          label: 'Cumulative Reach',
          data: [120, 180, 250, 320, 450, 380, 200],
          backgroundColor: 'rgba(142, 68, 173, 0.1)',
          borderColor: '#8e44ad',
          borderWidth: 3,
          pointBackgroundColor: '#8e44ad',
          pointBorderColor: '#8e44ad',
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Time of Day (TOD)',
          data: [80, 120, 180, 220, 300, 250, 150],
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderColor: '#3498db',
          borderWidth: 3,
          pointBackgroundColor: '#3498db',
          pointBorderColor: '#3498db',
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Day of Week (DOW)',
          data: [100, 140, 200, 280, 350, 290, 180],
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          borderColor: '#2ecc71',
          borderWidth: 3,
          pointBackgroundColor: '#2ecc71',
          pointBorderColor: '#2ecc71',
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true,
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
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
          },
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

    return <Line data={data} options={options} />;
  };

  const renderChart = () => {
    switch (selectedTab) {
      case 0:
        return <ShareOfVoiceChart />;
      case 1:
        return <MediaConsumptionChart />;
      case 2:
        return <FrequencyDistributionChart />;
      case 3:
        return <TemporalTrendsChart />;
      default:
        return <ShareOfVoiceChart />;
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
          Watching Insights
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
          <Tab label="Share of Voice" />
          <Tab label="Media Consumption" />
          <Tab label="Frequency Distribution" />
          <Tab label="Temporal Trends" />
        </Tabs>
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <Box sx={{ height: '300px' }}>
        {renderChart()}
      </Box>
    </Card>
  );
};

export default WatchingInsightsTabs;