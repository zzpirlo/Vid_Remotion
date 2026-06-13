import React from 'react';
import { Shadow } from './shadow';
import { Highlight } from './highlight';

export const LandmarkVallesMarineris = ({
  size = 200,
  color = '#F5F5F5',
  withShadow = false,
  withHighlight = false,
}: {
  size?: number;
  color?: string;
  withShadow?: boolean;
  withHighlight?: boolean;
}) => {
  const scale = size / 200;
  return (
    <svg viewBox="0 0 200 100" width={size} height={size * 0.5} aria-label="Valles Marineris">
      {withShadow && <Shadow width={200} height={100} offsetX={2*scale} offsetY={2*scale} opacity={0.06} />}
      {withHighlight && <Highlight width={200} height={100} opacity={0.1} />}
      <path
        d="M0 50 C50 30 150 70 200 50"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};
