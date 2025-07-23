import React, { useState, useEffect } from 'react';

const LineChart = () => {
  const [data, setData] = useState([
    { day: 'MON', neural: 65, quantum: 45, cyber: 75 },
    { day: 'TUE', neural: 72, quantum: 52, cyber: 68 },
    { day: 'WED', neural: 68, quantum: 48, cyber: 82 },
    { day: 'THU', neural: 85, quantum: 65, cyber: 91 },
    { day: 'FRI', neural: 91, quantum: 78, cyber: 87 },
    { day: 'SAT', neural: 88, quantum: 82, cyber: 94 },
    { day: 'SUN', neural: 94, quantum: 87, cyber: 96 }
  ]);

  const [activePoint, setActivePoint] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(d => ({
          ...d,
          neural: Math.max(50, Math.min(100, d.neural + (Math.random() - 0.5) * 10)),
          quantum: Math.max(30, Math.min(100, d.quantum + (Math.random() - 0.5) * 8)),
          cyber: Math.max(60, Math.min(100, d.cyber + (Math.random() - 0.5) * 6))
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const maxValue = 100;
  
  return (
    <div className="h-96 cyber-noise">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="cyber-font text-lg font-bold text-white cyber-text-glow">
            NEURAL_MATRIX_ANALYSIS
          </h3>
          <p className="cyber-font text-xs text-cyan-400/70">Real-time quantum synchronization metrics</p>
        </div>
        
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full cyber-pulse"></div>
            <span className="cyber-font text-sm text-cyan-400">NEURAL_FLOW</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full cyber-pulse"></div>
            <span className="cyber-font text-sm text-purple-400">QUANTUM_STATE</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full cyber-pulse"></div>
            <span className="cyber-font text-sm text-green-400">CYBER_SYNC</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-80 cyber-terminal rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 800 300">
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={300 - (y / 100) * 300}
              x2="800"
              y2={300 - (y / 100) * 300}
              stroke="rgba(0, 255, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}
          
          {/* Vertical Grid */}
          {data.map((_, i) => (
            <line
              key={i}
              x1={(i * 114) + 57}
              y1="0"
              x2={(i * 114) + 57}
              y2="300"
              stroke="rgba(0, 255, 255, 0.05)"
              strokeWidth="1"
            />
          ))}
          
          {/* Neural Flow Line */}
          <path
            d={`M ${data.map((d, i) => 
              `${(i * 114) + 57},${300 - (d.neural / maxValue) * 300}`
            ).join(' L ')}`}
            fill="none"
            stroke="url(#neuralGradient)"
            strokeWidth="3"
            className="drop-shadow-lg"
          />
          
          {/* Quantum State Line */}
          <path
            d={`M ${data.map((d, i) => 
              `${(i * 114) + 57},${300 - (d.quantum / maxValue) * 300}`
            ).join(' L ')}`}
            fill="none"
            stroke="url(#quantumGradient)"
            strokeWidth="3"
            className="drop-shadow-lg"
          />
          
          {/* Cyber Sync Line */}
          <path
            d={`M ${data.map((d, i) => 
              `${(i * 114) + 57},${300 - (d.cyber / maxValue) * 300}`
            ).join(' L ')}`}
            fill="none"
            stroke="url(#cyberGradient)"
            strokeWidth="3"
            className="drop-shadow-lg"
          />
          
          {/* Data Points */}
          {data.map((d, i) => (
            <g key={i}>
              {/* Neural Points */}
              <circle
                cx={(i * 114) + 57}
                cy={300 - (d.neural / maxValue) * 300}
                r={activePoint === i ? "8" : "5"}
                fill="#00ffff"
                className="cursor-pointer transition-all duration-200"
                style={{ filter: 'drop-shadow(0 0 10px #00ffff)' }}
                onMouseEnter={() => setActivePoint(i)}
                onMouseLeave={() => setActivePoint(null)}
              />
              
              {/* Quantum Points */}
              <circle
                cx={(i * 114) + 57}
                cy={300 - (d.quantum / maxValue) * 300}
                r={activePoint === i ? "8" : "5"}
                fill="#a855f7"
                className="cursor-pointer transition-all duration-200"
                style={{ filter: 'drop-shadow(0 0 10px #a855f7)' }}
                onMouseEnter={() => setActivePoint(i)}
                onMouseLeave={() => setActivePoint(null)}
              />
              
              {/* Cyber Points */}
              <circle
                cx={(i * 114) + 57}
                cy={300 - (d.cyber / maxValue) * 300}
                r={activePoint === i ? "8" : "5"}
                fill="#22c55e"
                className="cursor-pointer transition-all duration-200"
                style={{ filter: 'drop-shadow(0 0 10px #22c55e)' }}
                onMouseEnter={() => setActivePoint(i)}
                onMouseLeave={() => setActivePoint(null)}
              />
            </g>
          ))}
          
          {/* Gradients */}
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#0080ff" />
            </linearGradient>
            <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-12 cyber-font text-cyan-400/70 text-xs">
          {data.map((d, i) => (
            <span key={i} className="transform -translate-x-1/2">
              {d.day}
            </span>
          ))}
        </div>
        
        {/* Hover Info */}
        {activePoint !== null && (
          <div className="absolute top-4 right-4 cyber-terminal p-3 rounded-lg border border-cyan-400/50">
            <div className="cyber-font text-xs text-cyan-400">
              DAY: {data[activePoint].day}
            </div>
            <div className="cyber-font text-xs text-white mt-1">
              NEURAL: {data[activePoint].neural.toFixed(1)}%
            </div>
            <div className="cyber-font text-xs text-white">
              QUANTUM: {data[activePoint].quantum.toFixed(1)}%
            </div>
            <div className="cyber-font text-xs text-white">
              CYBER: {data[activePoint].cyber.toFixed(1)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;