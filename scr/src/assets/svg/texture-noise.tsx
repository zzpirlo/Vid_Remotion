import React from 'react';

export const NoiseTexture = () => (
  <filter id="noiseTexture" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" stitchTiles="stitch" />
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0 0.04" />
    </feComponentTransfer>
  </filter>
);
