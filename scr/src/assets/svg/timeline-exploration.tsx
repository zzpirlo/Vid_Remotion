import React from 'react';
import { useFadeInOut } from '../hooks/motion';
import { IconRocket, IconAstronaut } from './icon-rocket'; // temporary import, we'll fix later
import { Shadow } from './shadow';
import { Highlight } from './highlight';

type TimelineItem = {
  year: number;
  label: string;
  icon: 'rocket' | 'astronaut' | 'rover';
};

export const ExplorationTimeline = ({
  data,
  activeIndex = -1,
  width = 800,
  height = 100,
}: {
  data: TimelineItem[];
  activeIndex?: number;
  width?: number;
  height?: number;
}) => {
  const { fps } = React.useContext?.(React.createContext({ fps: 30 })) ?? { fps: 30 }; // fallback
  // We'll just render static for now; motion can be added via props later.
  const margin = 60;
  const usableWidth = width - 2 * margin;
  const step = usableWidth / (data.length - 1 || 1);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-label="Exploration timeline">
      {/* Line */}
      <line
        x1={margin}
        y1={height / 2}
        x2={width - margin}
        y2={height / 2}
        stroke="#F5F5F5"
        strokeWidth="2"
      />
      {/* Markers */}
      {data.map((item, idx) => {
        const x = margin + idx * step;
        const isActive = idx === activeIndex;
        const scale = isActive ? 1.2 : 1;
        const opacity = isActive ? 1 : 0.7;
        return (
          <g key={item.year} transform={`translate(${x},${height / 2}) scale(${scale})`}>
            {/* Connector line to timeline */}
            <line x1="0" y1="0" x2="0" y2={-20} stroke="#F5F5F5" strokeWidth="1.5" opacity={opacity} />
            {/* Dot */}
            <circle cx="0" cy="-20" r="6" fill="#F5F5F5" opacity={opacity} />
            {/* Icon placeholder */}
            {item.icon === 'rocket' && (
              <IconRocket size={24} color="#F5F5F5" filled={isActive} withShadow={false} withHighlight={isActive} />
            )}
            {item.icon === 'astronaut' && (
              <IconAstronaut size={24} color="#F5F5F5" filled={isActive} withShadow={false} withHighlight={isActive} />
            )}
            {/* Label */}
            <text
              x="0"
              y={-40}
              textAnchor="middle"
              fill="#F5F5F5"
              fontSize="14"
              fontFamily="'Source Sans Pro', sans-serif"
              opacity={opacity}
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
