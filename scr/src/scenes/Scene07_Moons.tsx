import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { CenteredContainer } from '../layout/CenteredContainer';
import { MarsBase } from '../assets/svg/mars-base';
import { useOrbitMotion } from '../motion/useOrbitMotion';
import { useFadeSlide } from '../motion/useFadeSlide';

export const Scene07_Moons = () => {
  const marsSize = 180;
  const sceneDuration = 360; // frames for the scene
  // Phobos: faster, 3 revolutions
  const phobosAngle = useOrbitMotion({
    durationFrames: sceneDuration,
    revolutions: 3,
    direction: 'cw',
  });
  // Deimos: slower, 0.5 revolutions
  const deimosAngle = useOrbitMotion({
    durationFrames: sceneDuration,
    revolutions: 0.5,
    direction: 'cw',
  });
  const radiusPhobos = 30;
  const radiusDeimos = 50;
  const phobosX = radiusPhobos * Math.cos(phobosAngle);
  const phobosY = radiusPhobos * Math.sin(phobosAngle);
  const deimosX = radiusDeimos * Math.cos(deimosAngle);
  const deimosY = radiusDeimos * Math.sin(deimosAngle);
  const { opacity: textOpacity, offset: textOffset } = useFadeSlide({
    durationFrames: 30,
    direction: 'up',
  });

  return (
    <BackgroundLayer>
      <CenteredContainer>
        <div style={{ position: 'relative', width: marsSize, height: marsSize }}>
          <MarsBase />
          {/* Phobos */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 12,
              height: 12,
              backgroundColor: '#2D2D2D',
              borderRadius: '50%',
              transform: `translate(-50%, -50%) translate(${phobosX}px, ${phobosY}px)`,
            }}
          />
          {/* Deimos */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 12,
              height: 12,
              backgroundColor: '#2D2D2D',
              borderRadius: '50%',
              transform: `translate(-50%, -50%) translate(${deimosX}px, ${deimosY}px)`,
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(0px, ${textOffset}px)`,
            opacity: textOpacity,
            fontSize: 28,
            color: '#F5F5F5',
            fontFamily: "'Source Sans Pro', sans-serif",
            textAlign: 'center',
          }}
        >
          Two tiny moons
        </div>
      </CenteredContainer>
    </BackgroundLayer>
  );
};