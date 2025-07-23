import React from 'react';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import DonutChart from './charts/DonutChart';

const ChartsSection = () => {
  return (
    <div className="space-y-6">
      {/* Main Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Progress Overview</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">7D</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm hover:bg-gray-600">30D</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm hover:bg-gray-600">3M</button>
          </div>
        </div>
        <LineChart />
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Weekly Activity</h3>
          <BarChart />
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Goal Distribution</h3>
          <DonutChart />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;