import React from 'react';
import { Shadow } from './shadow';
import { Highlight } from './highlight';

export const IconRocket = ({
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
    aria-label="Rocket icon"
  >
    {withShadow && <Shadow width={48} height={48} />}
    {withHighlight && <Highlight width={48} height={48} />}
    <path
      d="M24 4 L30 20 H40 V24 H28 V40 H20 V24 H8 V20 H18 Z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);
