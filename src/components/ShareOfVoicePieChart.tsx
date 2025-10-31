import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, Typography, Box } from '@mui/material';

// Register all Chart.js controllers, elements, scales, and plugins
ChartJS.register(...registerables);

interface ShareOfVoicePieChartProps {
  selectedProvince?: string | null;
}

const ShareOfVoicePieChart: React.FC<ShareOfVoicePieChartProps> = ({ selectedProvince }) => {
  // Generate dynamic data based on selected province
  const getDynamicData = () => {
    if (!selectedProvince) {
      return {
        labels: ['Trident', 'Mentos', 'Excel', 'Others'],
        data: [42.5, 28.3, 18.7, 10.5]
      };
    }
    
    // Generate province-specific data
    const baseData = {
      'Ontario': {
        labels: ['Trident', 'Mentos', 'Excel', 'Others'],
        data: [45.2, 30.1, 16.8, 7.9]
      },
      'Quebec': {
        labels: ['Trident', 'Mentos', 'Excel', 'Others'],
        data: [38.7, 35.4, 20.2, 5.7]
      },
      'British Columbia': {
        labels: ['Trident', 'Mentos', 'Excel', 'Others'],
        data: [40.1, 26.8, 22.3, 10.8]
      },
      'Alberta': {
        labels: ['Trident', 'Mentos', 'Excel', 'Others'],
        data: [44.3, 29.5, 17.1, 9.1]
      }
    };
    
    return baseData[selectedProvince as keyof typeof baseData] || {
      labels: ['Trident', 'Mentos', 'Excel', 'Others'],
      data: [42.5, 28.3, 18.7, 10.5]
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
          '#4B0082', // Dark purple (Trident - highest share)
          '#F90969', // Pink (Mentos - second highest)
          '#FFD700', // Yellow (Excel - third highest)
          '#FFA500'  // Orange (Others - lowest)
        ],
        borderColor: [
          '#4B0082',
          '#F90969', 
          '#FFD700',
          '#FFA500'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          '#5A1A92', // Slightly lighter purple
          '#FF1A7A', // Slightly lighter pink
          '#FFE135', // Slightly lighter yellow
          '#FFB84D'  // Slightly lighter orange
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
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible'
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
        Share of Voice
      </Typography>
      
      <Box sx={{ minHeight: '260px', display: 'flex', alignItems: 'center', overflow: 'visible' }}>
        <Pie data={chartData} options={options} />
      </Box>
    </Card>
  );
};

export default ShareOfVoicePieChart;