import React from 'react';
import { Shadow } from './shadow';
import { Highlight } from './highlight';

export const LandmarkOlympusMons = ({
  size = 100,
  color = '#F5F5F5',
  withShadow = false,
  withHighlight = false,
}: {
  size?: number;
  color?: string;
  withShadow?: boolean;
  withHighlight?: boolean;
}) => {
  const scale = size / 100;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-label="Olympus Mons">
      {withShadow && <Shadow width={100} height={100} offsetX={2*scale} offsetY={2*scale} opacity={0.06} />}
      {withHighlight && <Highlight width={100} height={100} opacity={0.1} />}
      <path
        d="M50 10 L70 50 L30 50 Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      {/* inner lines */}
      <path d="M50 10 L50 30" stroke={color} strokeWidth="1" opacity={0.5} />
    </svg>
  );
};
