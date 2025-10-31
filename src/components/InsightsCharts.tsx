import { useState } from 'react';

const InsightsCharts = () => {
  const [selectedCategory, setSelectedCategory] = useState('streaming');

  // Summary cards data
  const summaryCards = [
    {
      id: 'streaming',
      title: 'Streaming Devices',
      percentage: '12.57%',
      icon: '📺',
      impressions: 'Impressions',
      isActive: selectedCategory === 'streaming'
    },
    {
      id: 'gaming',
      title: 'Gaming Consoles',
      percentage: '5.31%',
      icon: '🎮',
      impressions: 'Impressions',
      isActive: selectedCategory === 'gaming'
    },
    {
      id: 'smart',
      title: 'Smart TVs',
      percentage: '82.12%',
      icon: '📱',
      impressions: 'Impressions',
      isActive: selectedCategory === 'smart'
    }
  ];

  // Chart data based on selected category
  const getChartData = () => {
    switch (selectedCategory) {
      case 'streaming':
        return {
          labels: ['Amazon Fire', 'Roku', 'Apple TV', 'Chromecast'],
          data: [45, 38, 22, 15],
          color: '#FF6B35'
        };
      case 'gaming':
        return {
          labels: ['PlayStation', 'Xbox', 'Nintendo Switch', 'Steam Deck'],
          data: [32, 28, 18, 12],
          color: '#FF6B35'
        };
      case 'smart':
        return {
          labels: ['Samsung', 'LG', 'Sony', 'TCL', 'Vizio'],
          data: [55, 42, 35, 28, 20],
          color: '#FF6B35'
        };
      default:
        return {
          labels: ['Amazon Fire', 'Roku', 'Apple TV', 'Chromecast'],
          data: [45, 38, 22, 15],
          color: '#FF6B35'
        };
    }
  };

  const chartData = getChartData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Buying & Watching Insights</h3>
        <p className="text-sm text-gray-600">Device performance and audience engagement metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCategory(card.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              card.isActive
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">{card.icon}</div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{card.percentage}</div>
                <div className="text-sm text-gray-600">{card.impressions}</div>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-700">{card.title}</div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 capitalize">
            {selectedCategory} Performance
          </h4>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
              Export
            </button>
            <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700">
              Add Strategy
            </button>
          </div>
        </div>

        {/* Simple Chart Visualization */}
        <div className="h-80 bg-gray-100 rounded-lg p-4">
          <div className="space-y-4">
            {chartData.labels.map((label, index) => (
              <div key={label} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium text-gray-700">{label}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="bg-orange-500 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(chartData.data[index] / Math.max(...chartData.data)) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">
                      {chartData.data[index]}
                    </span>
                  </div>
                  <div 
                    className="absolute w-3 h-3 bg-purple-500 rounded-full top-1/2 transform -translate-y-1/2"
                    style={{ left: `${(chartData.data[index] / Math.max(...chartData.data)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-center mt-4 space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-600">Impressions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Frequency</span>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Total Reach</div>
          <div className="text-2xl font-bold text-blue-900">2.4M</div>
          <div className="text-xs text-blue-600">+12% vs last month</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Engagement Rate</div>
          <div className="text-2xl font-bold text-green-900">68.5%</div>
          <div className="text-xs text-green-600">+5.2% vs last month</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">Conversion</div>
          <div className="text-2xl font-bold text-purple-900">12.3%</div>
          <div className="text-xs text-purple-600">+2.1% vs last month</div>
        </div>
      </div>
    </div>
  );
};

export default InsightsCharts;
