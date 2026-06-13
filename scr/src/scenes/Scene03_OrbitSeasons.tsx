import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { MarsBase } from '../assets/svg/mars-base';
import { useOrbitMotion } from '../motion/useOrbitMotion';
import { useLineDrawReveal } from '../motion/useLineDrawReveal';
import { useRotate3DRack } from '../motion/useRotate3DRack';
import { useFadeSlide } from '../motion/useFadeSlide';

export const Scene03_OrbitSeasons = () => {
  const orbitDuration = 360; // half scene? we'll use full scene duration for one orbit
  const angle = useOrbitMotion({
    durationFrames: orbitDuration,
    revolutions: 1,
    direction: 'cw',
  });
  // Convert angle (radians) to degrees for rotation if needed
  const angleDeg = (angle * 180) / Math.PI;
  const radius = 150;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const orbitPathLength = 2 * Math.PI * radius; // approx 942.48
  const { strokeDasharray, strokeDashoffset } = useLineDrawReveal({
    pathLength: orbitPathLength,
    durationFrames: orbitDuration,
  });
  const tiltAngle = useRotate3DRack({
    durationFrames: orbitDuration,
    axis: 'Y',
    angleDeg: 25.2, // Earth-like tilt, Mars ~25
  });
  const { opacity: textOpacity, offset: textOffset } = useFadeSlide({
    durationFrames: 30,
    direction: 'up',
  });

  return (
    <BackgroundLayer>
      {/* Orbit path */}
      <svg
        viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)` }}
      >
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="none"
          stroke="#F5F5F5"
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {/* Sun */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 24,
          height: 24,
          backgroundColor: '#FF9F1C',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Mars with tilt */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${tiltAngle}deg)`,
        }}
      >
        <MarsBase />
      </div>
      {/* Text */}
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
        687 Earth days per year
      </div>
    </BackgroundLayer>
  );
};