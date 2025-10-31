import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, Typography, Box } from '@mui/material';

// Register all Chart.js controllers, elements, scales, and plugins
ChartJS.register(...registerables);

interface DataPoint {
  name: string;
  impressions: number;
  frequency: number;
}

interface BuyingInsightsChartProps {
  data?: DataPoint[];
  selectedProvince?: string | null;
}

const defaultData: DataPoint[] = [
  { name: 'Quebec', impressions: 641.2, frequency: 21.2 },
  { name: 'Ontario', impressions: 497.0, frequency: 6.3 },
  { name: 'British Columbia', impressions: 438.5, frequency: 3.2 },
  { name: 'Alberta', impressions: 432.1, frequency: 1.7 }
];

const BuyingInsightsChart: React.FC<BuyingInsightsChartProps> = ({ selectedProvince }) => {
  // Generate dynamic data based on selected province
  const getDynamicData = () => {
    if (!selectedProvince) return defaultData;
    
    // Generate province-specific data
    const baseData = {
      'Ontario': [
        { name: 'Toronto', impressions: 820.5, frequency: 15.2 },
        { name: 'Ottawa', impressions: 450.3, frequency: 8.7 },
        { name: 'Hamilton', impressions: 320.1, frequency: 6.1 },
        { name: 'London', impressions: 280.9, frequency: 4.8 }
      ],
      'Quebec': [
        { name: 'Montreal', impressions: 950.2, frequency: 22.1 },
        { name: 'Quebec City', impressions: 380.7, frequency: 9.3 },
        { name: 'Laval', impressions: 250.4, frequency: 5.6 },
        { name: 'Gatineau', impressions: 180.2, frequency: 3.9 }
      ],
      'British Columbia': [
        { name: 'Vancouver', impressions: 720.8, frequency: 18.5 },
        { name: 'Victoria', impressions: 280.3, frequency: 7.2 },
        { name: 'Surrey', impressions: 190.6, frequency: 4.1 },
        { name: 'Burnaby', impressions: 160.4, frequency: 3.2 }
      ],
      'Alberta': [
        { name: 'Calgary', impressions: 680.1, frequency: 16.8 },
        { name: 'Edmonton', impressions: 420.5, frequency: 10.2 },
        { name: 'Red Deer', impressions: 150.3, frequency: 3.7 },
        { name: 'Lethbridge', impressions: 120.8, frequency: 2.9 }
      ]
    };
    
    return baseData[selectedProvince as keyof typeof baseData] || defaultData;
  };

  const dynamicData = getDynamicData();
  const chartData = {
    labels: dynamicData.map(item => item.name),
    datasets: [
      {
        label: 'Impressions',
        data: dynamicData.map(item => item.impressions),
        backgroundColor: '#f7b731',
        borderColor: '#f7b731',
        borderWidth: 0,
        borderRadius: 0,
        barThickness: 20,
      },
      {
        label: 'Frequency',
        data: dynamicData.map(item => item.frequency),
        backgroundColor: '#9b59b6',
        borderColor: '#9b59b6',
        borderWidth: 0,
        borderRadius: 0,
        barThickness: 20,
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
        labels: {
          usePointStyle: true,
          pointStyle: 'rect',
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
        Buying Insights
      </Typography>
      
      <Box sx={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Card>
  );
};

export default BuyingInsightsChart;