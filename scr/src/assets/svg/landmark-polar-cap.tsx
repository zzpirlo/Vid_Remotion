import React from 'react';
import { Shadow } from './shadow';
import { Highlight } from './highlight';

export const LandmarkPolarCap = ({
  size = 30,
  color = '#00B4D8',
  withShadow = false,
  withHighlight = false,
}: {
  size?: number;
  color?: string;
  withShadow?: boolean;
  withHighlight?: boolean;
}) => (
  <svg viewBox="0 0 60 60" width={size} height={size} aria-label="Polar cap">
    {withShadow && <Shadow width={60} height={60} offsetX={2} offsetY={2} opacity={0.06} />}
    {withHighlight && <Highlight width={60} height={60} opacity={0.1} />}
    <circle cx="30" cy="30" r="25" fill={color} opacity={0.9} />
  </svg>
);
