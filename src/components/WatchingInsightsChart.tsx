import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, Typography, Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  time: string;
  impressions: number;
  frequency: number;
}

interface WatchingInsightsChartProps {
  data?: DataPoint[];
  selectedProvince?: string | null;
}

const defaultData: DataPoint[] = [
  { time: 'Jan', impressions: 820, frequency: 12 },
  { time: 'Feb', impressions: 710, frequency: 9 },
  { time: 'Mar', impressions: 660, frequency: 8 },
  { time: 'Apr', impressions: 500, frequency: 6 },
  { time: 'May', impressions: 450, frequency: 5 },
  { time: 'Jun', impressions: 580, frequency: 7 },
  { time: 'Jul', impressions: 720, frequency: 10 },
  { time: 'Aug', impressions: 680, frequency: 9 },
  { time: 'Sep', impressions: 750, frequency: 11 },
  { time: 'Oct', impressions: 820, frequency: 13 },
  { time: 'Nov', impressions: 900, frequency: 15 },
  { time: 'Dec', impressions: 950, frequency: 16 }
];

const WatchingInsightsChart: React.FC<WatchingInsightsChartProps> = ({ selectedProvince }) => {
  // Generate dynamic data based on selected province
  const getDynamicData = () => {
    if (!selectedProvince) return defaultData;
    
    // Generate province-specific time series data
    const baseData = {
      'Ontario': [
        { time: 'Jan', impressions: 920, frequency: 14 },
        { time: 'Feb', impressions: 810, frequency: 11 },
        { time: 'Mar', impressions: 760, frequency: 10 },
        { time: 'Apr', impressions: 600, frequency: 8 },
        { time: 'May', impressions: 550, frequency: 7 },
        { time: 'Jun', impressions: 680, frequency: 9 },
        { time: 'Jul', impressions: 820, frequency: 12 },
        { time: 'Aug', impressions: 780, frequency: 11 },
        { time: 'Sep', impressions: 850, frequency: 13 },
        { time: 'Oct', impressions: 920, frequency: 15 },
        { time: 'Nov', impressions: 1000, frequency: 17 },
        { time: 'Dec', impressions: 1050, frequency: 18 }
      ],
      'Quebec': [
        { time: 'Jan', impressions: 750, frequency: 10 },
        { time: 'Feb', impressions: 650, frequency: 8 },
        { time: 'Mar', impressions: 600, frequency: 7 },
        { time: 'Apr', impressions: 450, frequency: 5 },
        { time: 'May', impressions: 400, frequency: 4 },
        { time: 'Jun', impressions: 520, frequency: 6 },
        { time: 'Jul', impressions: 650, frequency: 8 },
        { time: 'Aug', impressions: 620, frequency: 7 },
        { time: 'Sep', impressions: 680, frequency: 9 },
        { time: 'Oct', impressions: 750, frequency: 11 },
        { time: 'Nov', impressions: 820, frequency: 13 },
        { time: 'Dec', impressions: 880, frequency: 14 }
      ],
      'British Columbia': [
        { time: 'Jan', impressions: 680, frequency: 9 },
        { time: 'Feb', impressions: 580, frequency: 7 },
        { time: 'Mar', impressions: 540, frequency: 6 },
        { time: 'Apr', impressions: 420, frequency: 4 },
        { time: 'May', impressions: 380, frequency: 3 },
        { time: 'Jun', impressions: 480, frequency: 5 },
        { time: 'Jul', impressions: 600, frequency: 7 },
        { time: 'Aug', impressions: 570, frequency: 6 },
        { time: 'Sep', impressions: 620, frequency: 8 },
        { time: 'Oct', impressions: 680, frequency: 10 },
        { time: 'Nov', impressions: 750, frequency: 12 },
        { time: 'Dec', impressions: 800, frequency: 13 }
      ],
      'Alberta': [
        { time: 'Jan', impressions: 600, frequency: 8 },
        { time: 'Feb', impressions: 520, frequency: 6 },
        { time: 'Mar', impressions: 480, frequency: 5 },
        { time: 'Apr', impressions: 380, frequency: 3 },
        { time: 'May', impressions: 340, frequency: 2 },
        { time: 'Jun', impressions: 420, frequency: 4 },
        { time: 'Jul', impressions: 520, frequency: 6 },
        { time: 'Aug', impressions: 500, frequency: 5 },
        { time: 'Sep', impressions: 550, frequency: 7 },
        { time: 'Oct', impressions: 600, frequency: 9 },
        { time: 'Nov', impressions: 680, frequency: 11 },
        { time: 'Dec', impressions: 720, frequency: 12 }
      ]
    };
    
    return baseData[selectedProvince as keyof typeof baseData] || defaultData;
  };

  const dynamicData = getDynamicData();
  const chartData = {
    labels: dynamicData.map(item => item.time),
    datasets: [
      {
        label: 'Impressions',
        data: dynamicData.map(item => item.impressions),
        backgroundColor: 'rgba(247, 183, 49, 0.1)',
        borderColor: '#f7b731',
        borderWidth: 3,
        pointBackgroundColor: '#f7b731',
        pointBorderColor: '#f7b731',
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Frequency',
        data: dynamicData.map(item => item.frequency),
        backgroundColor: 'rgba(155, 89, 182, 0.1)',
        borderColor: '#9b59b6',
        borderWidth: 3,
        pointBackgroundColor: '#9b59b6',
        pointBorderColor: '#9b59b6',
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
          font: {
            size: 14,
            weight: 500
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.x;
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#f5f6fa',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#1f2937',
          font: {
            size: 14,
            weight: 500
          }
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 0,
      }
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
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1f2937' }}>
        Watching Insights
      </Typography>
      
      <Box sx={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </Box>
    </Card>
  );
};

export default WatchingInsightsChart;
