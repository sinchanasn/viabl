import React from 'react';
import { MetricScores } from '../types';

interface RadarChartProps {
  scores: MetricScores;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 320 }) => {
  const center = size / 2;
  const radius = (size / 2) * 0.72;

  const axes = [
    { key: 'marketNeed', label: 'Market Need', score: scores.marketNeed.score },
    { key: 'competition', label: 'Competition', score: scores.competition.score },
    { key: 'technicalFeasibility', label: 'Technical Feasibility', score: scores.technicalFeasibility.score },
    { key: 'monetization', label: 'Monetization', score: scores.monetization.score },
    { key: 'defensibility', label: 'Defensibility', score: scores.defensibility.score },
    { 
      key: 'growthPotential', 
      label: 'Growth Potential', 
      score: (scores.growthPotential || scores.viralPotential)?.score || 70 
    }
  ];

  const numAxes = axes.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (value: number, index: number) => {
    // start from top (-PI/2)
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points string for data
  const dataPoints = axes.map((axis, i) => {
    const { x, y } = getCoordinates(axis.score, i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Concentric grid lines */}
        {gridLevels.map((level, lvlIdx) => {
          const points = axes.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = level * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={lvlIdx}
              points={points}
              fill={lvlIdx === gridLevels.length - 1 ? '#fafafa' : 'none'}
              stroke="#e4e4e7"
              strokeWidth="1"
              strokeDasharray={lvlIdx < gridLevels.length - 1 ? '2,2' : undefined}
            />
          );
        })}

        {/* Axis lines from center */}
        {axes.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#e4e4e7"
              strokeWidth="1"
            />
          );
        })}

        {/* The Data Polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(24, 24, 27, 0.08)"
          stroke="#18181b"
          strokeWidth="1.75"
        />

        {/* Data points */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(axis.score, i);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="#18181b"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Vertex Labels */}
        {axes.map((axis, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          const isLeft = Math.cos(angle) < -0.2;
          const isRight = Math.cos(angle) > 0.2;
          const textAnchor = isLeft ? 'end' : isRight ? 'start' : 'middle';

          return (
            <g key={i}>
              <text
                x={lx}
                y={ly}
                textAnchor={textAnchor}
                className="text-[10px] font-mono fill-zinc-600 uppercase font-medium"
                dominantBaseline="central"
              >
                {axis.label}
              </text>
              <text
                x={lx}
                y={ly + (ly > center ? 11 : -11)}
                textAnchor={textAnchor}
                className="text-[11px] font-mono font-bold fill-zinc-950"
                dominantBaseline="central"
              >
                {axis.score}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
