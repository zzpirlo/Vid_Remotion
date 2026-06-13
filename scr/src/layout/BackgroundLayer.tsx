import React from 'react';
import { NoiseTexture } from '../assets/svg/texture-noise';

export const BackgroundLayer = ({ children, showNoise = false }: { children?: React.ReactNode; showNoise?: boolean }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#0A0A0A',
    overflow: 'hidden',
  }}>
    {showNoise && <NoiseTexture />}
    {children}
  </div>
);
