import React from 'react';

const DonutChart = () => {
  const data = [
    { label: 'Development', value: 35, color: '#3B82F6' },
    { label: 'Learning', value: 25, color: '#8B5CF6' },
    { label: 'Planning', value: 20, color: '#10B981' },
    { label: 'Review', value: 12, color: '#F59E0B' },
    { label: 'Other', value: 8, color: '#6B7280' }
  ];

  let cumulativePercentage = 0;
  const radius = 80;
  const strokeWidth = 20;

  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <svg className="transform -rotate-90" width="200" height="200">
          {data.map((item, index) => {
            const percentage = item.value;
            const strokeDasharray = `${percentage * 2.51} ${251.2 - percentage * 2.51}`;
            const strokeDashoffset = -cumulativePercentage * 2.51;
            
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={index}
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-in-out hover:stroke-width-24 cursor-pointer"
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-400">Complete</div>
          </div>
        </div>
      </div>
      
      <div className="ml-8 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">{item.label}</span>
                <span className="text-gray-400 text-sm">{item.value}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;