import React from 'react';

export const MarsBase = () => (
  <svg viewBox="0 0 200 200" aria-label="Mars base">
    {/* Base planet */}
    <circle cx="100" cy="100" r="90" fill="#E25822" />
    {/* Atmosphere */}
    <circle cx="100" cy="100" r="95" fill="#00B4D8" opacity={0.15} />
    {/* Surface details - Olympus Mons and Valles Marineris as simple paths */}
    {/* Olympus Mons - simple triangle */}
    <path
      d="M100 20 L130 110 L70 110 Z"
      fill="none"
      stroke="#F5F5F5"
      strokeWidth="2"
    />
    {/* Valles Marineris - simple line */}
    <path
      d="M80 100 Q100 130 120 100"
      fill="none"
      stroke="#F5F5F5"
      strokeWidth="2"
    />
  </svg>
);

export const MarsAtmosphere = () => (
  <circle cx="100" cy="100" r="95" fill="#00B4D8" opacity={0.15} />
);

export const MarsShadow = () => (
  <ellipse cx="102" cy="102" rx="90" ry="30" fill="#000000" opacity={0.08} />
);

export const MarsHighlight = () => (
  <path
    d="M55 70 A45 45 0 0 1 100 30 A45 45 0 0 1 145 70"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="2"
    opacity={0.12}
  />
);
