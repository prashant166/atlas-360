import React, { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Chart } from 'react-chartjs-2';
import ShareOfVoicePieChart from './ShareOfVoicePieChart';
import ShareOfWalletPieChart from './ShareOfWalletPieChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface CombinedInsightsProps {
  selectedProvince?: string | null;
}

const CombinedInsights: React.FC<CombinedInsightsProps> = ({ selectedProvince }) => {
  const [insightsType, setInsightsType] = useState<'buying' | 'watching' | 'behavioural'>('buying');
  const [purchaseBehaviorType, setPurchaseBehaviorType] = useState<'timeLag' | 'onceVsRepeat'>('timeLag');
  const [retailType, setRetailType] = useState<'scorecard' | 'split'>('scorecard');

  const handleInsightsChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: 'buying' | 'watching' | 'behavioural' | null,
  ) => {
    if (newType !== null) {
      setInsightsType(newType);
    }
  };

  // Buying Insights Charts
  // const ShareOfWalletChart = () => {
  //   const data = {
  //     labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  //     datasets: [
  //       {
  //         label: 'User Index',
  //         data: [0.75, 0.98, 1.05, 1.08, 1.1, 1.1],
  //         backgroundColor: '#FF9E00', // Orange color
  //         borderColor: '#FF9E00',
  //         borderWidth: 0,
  //       },
  //       {
  //         label: 'Brand Index',
  //         data: [0.65, 0.9, 1.02, 1.02, 1.05, 1.05],
  //         backgroundColor: '#D0009C', // Magenta color
  //         borderColor: '#D0009C',
  //         borderWidth: 0,
  //       }
  //     ],
  //   };

  //   const options = {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     plugins: {
  //       legend: {
  //         display: true,
  //         position: 'top' as const,
  //         labels: {
  //           font: {
  //             size: 10
  //           },
  //           padding: 8
  //         }
  //       },
  //     },
  //     scales: {
  //       x: {
  //         title: {
  //           display: true,
  //           text: 'Age groups',
  //           font: {
  //             size: 10,
  //             weight: 500
  //           }
  //         },
  //         grid: {
  //           display: false,
  //         },
  //         ticks: {
  //           font: {
  //             size: 9
  //           }
  //         }
  //       },
  //       y: {
  //         title: {
  //           display: true,
  //           text: 'User index',
  //           font: {
  //             size: 10,
  //             weight: 500
  //           }
  //         },
  //         beginAtZero: true,
  //         max: 1.25,
  //         grid: {
  //           color: '#f5f6fa',
  //         },
  //         ticks: {
  //           font: {
  //             size: 9
  //           },
  //           stepSize: 0.25
  //         }
  //       },
  //     },
  //   };

  //   return <Bar data={data} options={options} />;
  // };

  const PurchaseBehaviorChart = () => {
    const data = {
      labels: ['< 1 week', '1 - 2 weeks', '2 - 3 weeks', '3 - 4 weeks', '> 4 weeks'],
      datasets: [
        {
          label: 'Total transactions (%)',
          data: [18, 26, 18, 12, 26],
          backgroundColor: '#FF9E00', // Yellow from first chart
          borderColor: '#FF9E00',
          borderWidth: 0,
        },
        {
          label: 'Average order value ($)',
          data: [21.5, 22.5, 21.5, 21.5, 22.5],
          backgroundColor: '#D0009C', // Pink from first chart
          borderColor: '#D0009C',
          borderWidth: 0,
          pointRadius: 6,
          pointHoverRadius: 8,
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y' as const, // This makes it horizontal
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          labels: {
            font: {
              size: 10
            },
            padding: 8,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Total transactions (%)',
            font: {
              size: 10,
              weight: 500
            }
          },
          beginAtZero: true,
          max: 30,
          grid: {
            display: true,
            color: '#f5f6fa',
          },
          ticks: {
            font: {
              size: 9
            },
            stepSize: 2
          }
        },
        y: {
          title: {
            display: true,
            text: 'Purchase lag window',
            font: {
              size: 10,
              weight: 500
            }
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 9
            }
          }
        },
        x1: {
          type: 'linear' as const,
          display: true,
          position: 'top' as const,
          title: {
            display: true,
            text: 'Average order value ($)',
            font: {
              size: 10,
              weight: 500
            }
          },
          beginAtZero: true,
          max: 12,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            font: {
              size: 9
            },
            stepSize: 0.8
          }
        }
      },
    };

    return <Bar data={data} options={options} />;
  };

  const OnceVsRepeatChart = () => {
    const data = {
      labels: ['One time', 'Repeat'],
      datasets: [
        {
          data: [3.93, 96.07],
          backgroundColor: ['#D0009C', '#FF9E00'], // Magenta and Orange
          borderColor: ['#D0009C', '#FF9E00'],
          borderWidth: 0,
        },
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
            font: {
              size: 12
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      },
      cutout: '60%',
    };

    return <Doughnut data={data} options={options} />;
  };

  const RetailScorecardChart = () => {
    const data = {
      labels: [
        'Loblaws Company Ltd',
        'Walmart',
        'Metro',
        'Sobeys',
        'Pattison Food Group',
        'Federated Coop',
        'Giant Tiger',
        'Costco',
        'Generic Retailer',
        'Longo\'s'
      ],
      datasets: [
        {
          label: 'Brand Growth',
          data: [9.9, 9.8, 9.7, 9.2, 8.0, 7.8, 7.2, 6.5, 5.5, 5.2],
          backgroundColor: '#FF6B35', // Orange color as shown in image
          borderColor: '#FF6B35',
          borderWidth: 0,
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y' as const, // Horizontal bar chart
      plugins: {
        legend: {
          display: false, // Hide legend as shown in image
        },
        title: {
          display: false // Hide title
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 10,
          grid: {
            display: true,
            color: '#f5f6fa',
            drawBorder: false
          },
          ticks: {
            font: {
              size: 12
            },
            stepSize: 1,
            color: '#6b7280'
          }
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12
            },
            color: '#1f2937'
          }
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  const RetailerSplitChart = () => {
    const data = {
      labels: [
        'Loblaws Company Ltd',
        'Walmart',
        'Costco',
        'Sobeys',
        'Metro',
        'Generic Retailer',
        'Giant Tiger',
        'Pattison Food Group'
      ],
      datasets: [
        {
          label: 'Online',
          data: [1.2, 1.5, 0.3, 0.2, 0.4, 0, 0, 0],
          backgroundColor: '#FF9E00', // Orange
          borderColor: '#FF9E00',
          borderWidth: 0,
        },
        {
          label: 'Offline',
          data: [33.8, 22.0, 23.2, 9.3, 12.1, 1.5, 1.0, 1.5],
          backgroundColor: '#D0009C', // Magenta
          borderColor: '#D0009C',
          borderWidth: 0,
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y' as const, // Horizontal bars
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          labels: {
            font: {
              size: 10
            },
            padding: 8,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Percentage (%)',
            font: {
              size: 10,
              weight: 500
            }
          },
          beginAtZero: true,
          max: 36,
          grid: {
            display: true,
            color: '#f5f6fa',
          },
          ticks: {
            font: {
              size: 9
            },
            stepSize: 2
          }
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Retailers',
            font: {
              size: 10,
              weight: 500
            }
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 9
            }
          }
        }
      },
    };

    return <Bar data={data} options={options} />;
  };

  const ConsumerSegmentationChart = () => {
    const data = {
      labels: ['Premium', 'Value', 'Budget', 'Luxury', 'Eco-Conscious'],
      datasets: [
        {
          label: 'Segmentation (%)',
          data: [35, 25, 20, 15, 5],
          backgroundColor: '#D0009C', // Pink from first chart
          borderColor: '#D0009C',
          borderWidth: 0,
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y' as const, // This makes it horizontal
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          labels: {
            font: {
              size: 10
            },
            padding: 8
          }
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Percentage (%)',
            font: {
              size: 10,
              weight: 500
            }
          },
          beginAtZero: true,
          max: 40,
          grid: {
            display: true,
            color: '#f5f6fa',
          },
          ticks: {
            font: {
              size: 9
            },
            stepSize: 5
          }
        },
        y: {
          title: {
            display: true,
            text: 'Segments',
            font: {
              size: 10,
              weight: 500
            }
          },
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 9
            }
          }
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  // Watching Insights Charts
  // const ShareOfVoiceChart = () => {
  //   const data = {
  //     labels: ['Our Brand', 'Competitor A', 'Others'],
  //     datasets: [
  //       {
  //         label: 'Share of Voice (%)',
  //         data: [35, 25, 40],
  //         backgroundColor: [
  //           '#8e44ad',
  //           '#3498db',
  //           '#e74c3c'
  //         ],
  //         borderWidth: 0,
  //       }
  //     ],
  //   };

  //   const options = {
  //     indexAxis: 'y' as const,
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //     },
  //     scales: {
  //       x: {
  //         beginAtZero: true,
  //         max: 100,
  //         grid: {
  //           color: '#f5f6fa',
  //         },
  //       },
  //       y: {
  //         grid: {
  //           display: false,
  //         },
  //       },
  //     },
  //   };

  //   return <Bar data={data} options={options} />;
  // };

  const MediaConsumptionChart = () => {
    // Media names for Y-axis
    const mediaLabels = [
      'NFL Football',
      'Monday Night Football',
      'NBA Basketball',
      'MLB Baseball',
      'NHL Hockey',
      'College Football',
      'Soccer',
      'Tennis'
    ];

    // Impressions data (in millions)
    const impressionsData = [28.5, 24.2, 22.8, 20.5, 18.3, 16.7, 14.2, 12.5];

    // Frequency data (as scatter points) - aligned with impressions bars
    // For horizontal bar charts with indexAxis: 'y', scatter uses:
    // - x: the value (impressions amount) - aligns with bar width
    // - y: the category index (0-7) - aligns with bar position
    const frequencyData = impressionsData.map((impression, index) => ({
      x: impression, // Same X value as the bar (impressions in millions)
      y: index, // Y index matches the bar's category position
    }));

    const data: any = {
      labels: mediaLabels,
      datasets: [
        {
          type: 'bar' as const,
          label: 'Impressions',
          data: impressionsData,
          backgroundColor: '#FF9E00', // Orange color
          borderColor: '#FF9E00',
          borderWidth: 0,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
        {
          type: 'scatter' as const,
          label: 'Frequency',
          data: frequencyData,
          backgroundColor: '#D0009C', // Magenta color
          borderColor: '#D0009C',
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBorderWidth: 2,
          pointBorderColor: '#ffffff',
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y' as const, // Horizontal bars
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            font: {
              size: 12,
              weight: 500
            },
            generateLabels: (chart: any) => {
              const datasets = chart.data.datasets;
              return datasets.map((dataset: any, i: number) => {
                const label = dataset.label || '';
                const color = dataset.type === 'bar' ? dataset.backgroundColor : dataset.borderColor;
                return {
                  text: label,
                  fillStyle: color,
                  strokeStyle: color,
                  lineWidth: 0,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
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
              const value = context.parsed.x || context.parsed.y;
              if (context.dataset.type === 'bar') {
                return `${label}: ${value.toFixed(1)}M`;
              } else {
                return `${label}: ${value.toFixed(1)}`;
              }
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
          border: {
            display: false,
          },
          ticks: {
            font: {
              size: 11
            },
            color: '#6b7280',
            callback: function(value: any) {
              return value.toFixed(0) + 'M';
            }
          },
          title: {
            display: true,
            text: 'Impressions (Millions)',
            font: {
              size: 12,
              weight: 500
            },
            color: '#1f2937'
          }
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            font: {
              size: 11
            },
            color: '#1f2937'
          }
        },
      },
    };

    return <Chart type="bar" data={data} options={options} />;
  };

  const FrequencyDistributionChart = () => {
    const data = {
      labels: ['Top 20%', 'Second 20%', 'Third 20%', 'Fourth 20%', 'Bottom 20%'],
      datasets: [
        {
          label: 'Avg. frequency',
          data: [21.0, 6.2, 3.2, 1.7, 1.0],
          backgroundColor: '#FF6B35', // Orange color as shown in image
          borderColor: '#FF6B35',
          borderWidth: 0,
          maxBarThickness: 40,
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
              return `Avg. frequency: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            font: {
              size: 12
            },
            color: '#1f2937'
          }
        },
        y: {
          beginAtZero: true,
          max: 25,
          title: {
            display: true,
            text: 'Avg. frequency',
            font: {
              size: 12,
              weight: 500
            },
            color: '#1f2937'
          },
          grid: {
            color: '#f5f6fa',
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            font: {
              size: 12
            },
            color: '#6b7280',
            stepSize: 5
          }
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  const TemporalTrendsChart = () => {
    // Generate date labels from 2025-09-28 to 2025-10-26 (every 3 days to reduce number of bars)
    const generateDateLabels = () => {
      const startDate = new Date('2025-09-28');
      const endDate = new Date('2025-10-26');
      const labels = [];
      const currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        const date = new Date(currentDate);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        currentDate.setDate(currentDate.getDate() + 3); // Increment by 3 days instead of 1
      }
      
      return labels;
    };

    const labels = generateDateLabels();
    
    // Generate sample data for impressions (bar chart) in millions
    const impressionsData = [27, 25, 26, 26.5, 27, 27.2, 27.5, 27.8, 27.6, 28].slice(0, labels.length).map(v => v * 1000000);

    // Generate sample data for households reached (line chart) with randomized breakpoints
    // Using breakpoints: 5, 15, 20, 12.5, 15 as base variance with realistic fluctuation
    const breakpoints = [5, 15, 20, 12.5, 15, 18, 13, 16, 19, 14]; // Values in units of 100K
    const householdsData = breakpoints.slice(0, labels.length).map(v => v * 100000); // Convert to actual value (500K, 1.5M, 2M, etc.)

    const data = {
      labels: labels,
      datasets: [
        {
          type: 'bar' as const,
          label: 'Impressions',
          data: impressionsData,
          backgroundColor: '#FF9E00', // Orange color
          borderColor: '#FF9E00',
          borderWidth: 0,
          barPercentage: 0.6, // Narrow bars
          categoryPercentage: 0.8,
          yAxisID: 'y',
        },
        {
          type: 'line' as const,
          label: 'Households reached',
          data: householdsData,
          borderColor: '#D0009C', // Magenta color
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#D0009C',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          fill: false,
          tension: 0.35, // Smooth curve
          yAxisID: 'y1',
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            font: {
              size: 12,
              weight: 500
            },
            generateLabels: (chart: any) => {
              const datasets = chart.data.datasets;
              return datasets.map((dataset: any, i: number) => {
                const label = dataset.label || '';
                const color = dataset.type === 'bar' ? dataset.backgroundColor : dataset.borderColor;
                return {
                  text: label,
                  fillStyle: color,
                  strokeStyle: color,
                  lineWidth: dataset.type === 'line' ? 2 : 0,
                  pointStyle: dataset.type === 'line' ? 'circle' : 'rect',
                  hidden: false,
                  index: i
                };
              });
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
              const value = context.parsed.y;
              if (context.dataset.type === 'bar') {
                return `${label}: ${value.toLocaleString()}`;
              } else {
                return `${label}: ${value.toLocaleString()}`;
              }
            }
          }
        }
      },
      scales: {
        x: {
          offset: true, // Centers line points over bars
          grid: {
            display: false,
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            font: {
              size: 11
            },
            color: '#1f2937',
            maxRotation: 45,
            minRotation: 45,
            callback: function(_value: any, index: number) {
              // Show every label since we have fewer data points
              const chartLabels = labels;
              return chartLabels[index] || '';
            }
          }
        },
        y: {
          type: 'linear' as const,
          position: 'left' as const,
          beginAtZero: true,
          max: 30000000, // 30M in actual value
          title: {
            display: true,
            text: 'Impressions',
            font: {
              size: 12,
              weight: 500
            },
            color: '#FF9E00'
          },
          grid: {
            color: '#f5f6fa',
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            font: {
              size: 11
            },
            color: '#6b7280',
            callback: function(value: any) {
              return (value / 1000000).toFixed(0) + 'M';
            }
          }
        },
        y1: {
          type: 'linear' as const,
          position: 'right' as const,
          beginAtZero: true,
          max: 2500000, // 2500K (25 * 100000) to accommodate breakpoints up to 20
          title: {
            display: true,
            text: 'Households reached',
            font: {
              size: 12,
              weight: 500
            },
            color: '#D0009C'
          },
          grid: {
            drawOnChartArea: false,
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            font: {
              size: 11
            },
            color: '#6b7280',
            callback: function(value: any) {
              return (value / 1000).toFixed(0) + 'K';
            }
          }
        },
      },
    };

    return <Chart type="bar" data={data} options={options} />;
  };

  const renderBuyingCharts = () => (
    <div className="grid grid-cols-2 gap-3" style={{ aspectRatio: '2/1' }}>
      <ShareOfWalletPieChart selectedProvince={selectedProvince} />
      <Card sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
            Purchase Behavior
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                color: purchaseBehaviorType === 'timeLag' ? '#8B5CF6' : '#6B7280',
                fontWeight: purchaseBehaviorType === 'timeLag' ? 600 : 400,
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#8B5CF6',
                }
              }}
              onClick={() => setPurchaseBehaviorType('timeLag')}
            >
              Time lag
            </Typography>
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                color: purchaseBehaviorType === 'onceVsRepeat' ? '#8B5CF6' : '#6B7280',
                fontWeight: purchaseBehaviorType === 'onceVsRepeat' ? 600 : 400,
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#8B5CF6',
                }
              }}
              onClick={() => setPurchaseBehaviorType('onceVsRepeat')}
            >
              Once vs Repeat
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, minHeight: '120px' }}>
          {purchaseBehaviorType === 'timeLag' ? <PurchaseBehaviorChart /> : <OnceVsRepeatChart />}
        </Box>
      </Card>
      <Card sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
            Retail Scorecard
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                color: retailType === 'scorecard' ? '#8B5CF6' : '#6B7280',
                fontWeight: retailType === 'scorecard' ? 600 : 400,
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#8B5CF6',
                }
              }}
              onClick={() => setRetailType('scorecard')}
            >
              Retailer scorecard
            </Typography>
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                color: retailType === 'split' ? '#8B5CF6' : '#6B7280',
                fontWeight: retailType === 'split' ? 600 : 400,
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#8B5CF6',
                }
              }}
              onClick={() => setRetailType('split')}
            >
              Retailer split
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, minHeight: '150px' }}>
          {retailType === 'scorecard' ? <RetailScorecardChart /> : <RetailerSplitChart />}
        </Box>
      </Card>
      <Card sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
          Consumer Segmentation
        </Typography>
        <Box sx={{ flex: 1, minHeight: '150px' }}>
          <ConsumerSegmentationChart />
        </Box>
      </Card>
    </div>
  );

  const renderWatchingCharts = () => (
    <div className="grid grid-cols-2 gap-3">
      <ShareOfVoicePieChart selectedProvince={selectedProvince} />
      <Card sx={{ p: 1.5, display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
          Media Consumption
        </Typography>
        <Box sx={{ minHeight: '260px', overflow: 'visible' }}>
          <MediaConsumptionChart />
        </Box>
      </Card>
      <Card sx={{ p: 1.5, display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
          Frequency Distribution
        </Typography>
        <Box sx={{ minHeight: '260px', overflow: 'visible' }}>
          <FrequencyDistributionChart />
        </Box>
      </Card>
      <Card sx={{ p: 1.5, display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
          Temporal Trends
        </Typography>
        <Box sx={{ minHeight: '260px', overflow: 'visible' }}>
          <TemporalTrendsChart />
        </Box>
      </Card>
    </div>
  );

  // Behavioural Insights Charts
  const renderBehaviouralCharts = () => (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 700, 
          color: '#1f2937',
          fontSize: '1.5rem'
        }}
      >
        Prizm Segments
      </Typography>
      <Box 
        sx={{ 
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          '&:hover img': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-in-out'
          }
        }}
      >
        <img 
          src="/images/behavioural.png" 
          alt="Prizm Segments Behavioral Analysis"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transform: 'scale(1.1)',
            transformOrigin: 'center center'
          }}
        />
      </Box>
    </Box>
  );

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
          Insights Dashboard
        </Typography>
        <ToggleButtonGroup
          value={insightsType}
          exclusive
          onChange={handleInsightsChange}
          aria-label="insights type"
          sx={{
            '& .MuiToggleButton-root': {
              border: '1px solid #e5e7eb',
              color: '#6b7280',
              textTransform: 'none',
              fontWeight: 500,
              '&.Mui-selected': {
                backgroundColor: '#8e44ad',
                color: '#ffffff !important',
                '&:hover': {
                  backgroundColor: '#7d3c98',
                  color: '#ffffff !important',
                },
              },
              '&:hover': {
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
              },
            },
          }}
        >
          <ToggleButton value="buying" aria-label="buying insights">
            Buying Insights
          </ToggleButton>
          <ToggleButton value="watching" aria-label="watching insights">
            Watching Insights
          </ToggleButton>
          <ToggleButton value="behavioural" aria-label="behavioural insights">
            Behavioural Insights
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {insightsType === 'buying' && renderBuyingCharts()}
      {insightsType === 'watching' && renderWatchingCharts()}
      {insightsType === 'behavioural' && renderBehaviouralCharts()}
    </Card>
  );
};

export default CombinedInsights;
