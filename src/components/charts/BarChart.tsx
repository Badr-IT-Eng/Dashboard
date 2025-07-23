import React from 'react';

const BarChart = () => {
  const data = [
    { day: 'Mon', hours: 6.5, target: 8 },
    { day: 'Tue', hours: 7.2, target: 8 },
    { day: 'Wed', hours: 5.8, target: 8 },
    { day: 'Thu', hours: 8.1, target: 8 },
    { day: 'Fri', hours: 7.9, target: 8 },
    { day: 'Sat', hours: 4.2, target: 6 },
    { day: 'Sun', hours: 3.8, target: 6 }
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.hours, d.target)));

  return (
    <div className="h-64">
      <div className="flex justify-center space-x-4 mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
          <span className="text-gray-300 text-sm">Actual Hours</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 rounded mr-2"></div>
          <span className="text-gray-300 text-sm">Target Hours</span>
        </div>
      </div>
      
      <div className="relative h-48">
        <div className="flex items-end justify-around h-full px-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div className="flex space-x-1 items-end h-36">
                {/* Target bar (background) */}
                <div 
                  className="w-4 bg-gray-600 rounded-sm opacity-50"
                  style={{ height: `${(item.target / maxValue) * 144}px` }}
                ></div>
                
                {/* Actual bar */}
                <div 
                  className="w-4 bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm hover:from-blue-500 hover:to-blue-300 transition-all cursor-pointer"
                  style={{ height: `${(item.hours / maxValue) * 144}px` }}
                ></div>
              </div>
              
              <span className="text-gray-400 text-sm">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChart;