import React from 'react';

interface ShadowProps {
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
}

export const Shadow = ({
  width,
  height,
  offsetX = 2,
  offsetY = 2,
  opacity = 0.06,
}: ShadowProps) => (
  <ellipse
    cx={width / 2 + offsetX}
    cy={height / 2 + offsetY}
    rx={width / 2}
    ry={height / 2}
    fill="#000000"
    opacity={opacity}
  />
);
