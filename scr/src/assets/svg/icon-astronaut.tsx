import React from 'react';
import { Shadow } from './shadow';
import { Highlight } from './highlight';

export const IconAstronaut = ({
  size = 48,
  color = '#F5F5F5',
  filled = false,
  withShadow = false,
  withHighlight = false,
}: {
  size?: number;
  color?: string;
  filled?: boolean;
  withShadow?: boolean;
  withHighlight?: boolean;
}) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    aria-label="Astronaut icon"
  >
    {withShadow && <Shadow width={48} height={48} />}
    {withHighlight && <Highlight width={48} height={48} />}
    <path
      d="M24 6 C20 6 16 10 16 14 V24 H18 V30 H30 V24 H32 V14 C32 10 28 6 24 6 Z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="2"
    />
    {/* Visor */}
    <circle cx="24" cy="16" r="6" fill={filled ? '#00B4D8' : 'none'} stroke={color} strokeWidth="2" />
    {/* Backpack */}
    <rect x="16" y="24" width="16" height="12" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" />
  </svg>
);
