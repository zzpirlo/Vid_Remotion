import React from 'react';

interface HighlightProps {
  width: number;
  height: number;
  opacity?: number;
}

export const Highlight = ({
  width,
  height,
  opacity = 0.1,
}: HighlightProps) => (
  <ellipse
    cx={width * 0.3}
    cy={height * 0.3}
    rx={width * 0.2}
    ry={height * 0.2}
    fill="#FFFFFF"
    opacity={opacity}
  />
);
