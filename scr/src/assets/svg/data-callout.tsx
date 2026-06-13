import React from 'react';
import { Shadow } from './shadow';
import { Highlight } from './highlight';

type CalloutProps = {
  content: string | number;
  type?: 'circle' | 'pill';
  colorScheme?: 'neutral' | 'accent' | 'success' | 'error';
  withShadow?: boolean;
  withHighlight?: boolean;
  sizeOverride?: number; // diameter for circle, height for pill
};

export const DataCallout = ({
  content,
  type = 'circle',
  colorScheme = 'neutral',
  withShadow = false,
  withHighlight = false,
  sizeOverride,
}: CalloutProps) => {
  const bgColors: Record<string, string> = {
    neutral: '#2D2D2D',
    accent: '#E25822',
    success: '#2ECC71',
    error: '#E74C3C',
  };
  const bg = bgColors[colorScheme] || bgColors.neutral;
  const textColor = '#F5F5F5';
  const padding = 12;
  const radius = 8;

  // Estimate size based on content length (simplified)
  const contentStr = String(content);
  const approxWidth = contentStr.length * 14 + 2 * padding;
  const height = sizeOverride ?? (type === 'circle' ? approxWidth : 36);
  const width = type === 'circle' ? height : Math.max(approxWidth, height);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-label={`Data callout: ${content}`}
    >
      {withShadow && (
        <Shadow
          width={width}
          height={height}
          offsetX={2}
          offsetY={2}
          opacity={0.06}
        />
      )}
      {type === 'circle' ? (
        <circle
          cx={width / 2}
          cy={height / 2}
          r={height / 2 - 2}
          fill={bg}
        />
      ) : (
        <rect
          width={width}
          height={height}
          rx={radius}
          ry={radius}
          fill={bg}
        />
      )}
      {withHighlight && (
        <Highlight
          width={width}
          height={height}
          opacity={0.1}
        />
      )}
      <text
        x={width / 2}
        y={height / 2 + 5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={20}
        fontFamily="'IBM Plex Mono', monospace"
      >
        {contentStr}
      </text>
    </svg>
  );
};
