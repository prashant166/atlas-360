import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, Typography, Box } from '@mui/material';

// Register all Chart.js controllers, elements, scales, and plugins
ChartJS.register(...registerables);

interface ShareOfWalletPieChartProps {
  selectedProvince?: string | null;
}

const ShareOfWalletPieChart: React.FC<ShareOfWalletPieChartProps> = ({ selectedProvince }) => {
  // Generate dynamic data based on selected province
  const getDynamicData = () => {
    if (!selectedProvince) {
      return {
        labels: ['Trident', '5 Gum', 'Excel Gum'],
        data: [9.50, 19.74, 70.76]
      };
    }
    
    // Generate province-specific data with slight variations
    const baseData = {
      'Ontario': {
        labels: ['Trident', '5 Gum', 'Excel Gum'],
        data: [10.2, 18.5, 71.3]
      },
      'Quebec': {
        labels: ['Trident', '5 Gum', 'Excel Gum'],
        data: [8.7, 21.4, 69.9]
      },
      'British Columbia': {
        labels: ['Trident', '5 Gum', 'Excel Gum'],
        data: [9.8, 20.1, 70.1]
      },
      'Alberta': {
        labels: ['Trident', '5 Gum', 'Excel Gum'],
        data: [9.1, 19.2, 71.7]
      }
    };
    
    return baseData[selectedProvince as keyof typeof baseData] || {
      labels: ['Trident', '5 Gum', 'Excel Gum'],
      data: [9.50, 19.74, 70.76]
    };
  };

  const dynamicData = getDynamicData();

  // Using the same color theme from the map section: yellow to pink to purple
  const chartData = {
    labels: dynamicData.labels,
    datasets: [
      {
        data: dynamicData.data,
        backgroundColor: [
          '#FFD700', // Yellow (Trident - lowest share)
          '#F90969', // Pink (5 Gum - medium share)
          '#4B0082'  // Dark purple (Excel Gum - highest share)
        ],
        borderColor: [
          '#FFD700',
          '#F90969', 
          '#4B0082'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          '#FFE135', // Slightly lighter yellow
          '#FF1A7A', // Slightly lighter pink
          '#5A1A92'  // Slightly lighter purple
        ],
        hoverBorderWidth: 3,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 12,
            weight: 500
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, index: number) => {
                const value = data.datasets[0].data[index];
                return {
                  text: `${label}: ${value}%`,
                  fillStyle: data.datasets[0].backgroundColor[index],
                  strokeStyle: data.datasets[0].borderColor[index],
                  lineWidth: data.datasets[0].borderWidth,
                  pointStyle: 'circle',
                  hidden: false,
                  index: index
                };
              });
            }
            return [];
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
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
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
        marginBottom: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
        Share of Wallet
      </Typography>
      
      <Box sx={{ flex: 1, minHeight: '200px', display: 'flex', alignItems: 'center' }}>
        <Pie data={chartData} options={options} />
      </Box>
    </Card>
  );
};

export default ShareOfWalletPieChart;