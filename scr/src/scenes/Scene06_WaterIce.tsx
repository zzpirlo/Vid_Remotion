import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { CenteredContainer } from '../layout/CenteredContainer';
import { MarsBase } from '../assets/svg/mars-base';
import { LandmarkPolarCap } from '../assets/svg/landmark-polar-cap';
import { useFadeSlide } from '../motion/useFadeSlide';
import { useLineDrawReveal } from '../motion/useLineDrawReveal';

export const Scene06_WaterIce = () => {
  const marsSize = 180;
  const { opacity: capOpacity, offset: capOffset } = useFadeSlide({
    durationFrames: 30,
    direction: 'up',
  });
  // River line: approximate sine wave from left to right
  const riverPathLength = 220; // approximate
  const { strokeDasharray, strokeDashoffset } = useLineDrawReveal({
    pathLength: riverPathLength,
    durationFrames: 45,
  });

  return (
    <BackgroundLayer>
      <CenteredContainer>
        <div style={{ position: 'relative', width: marsSize, height: marsSize }}>
          <MarsBase />
          {/* Polar caps */}
          <LandmarkPolarCap
            size={30}
            color="#00B4D8"
            style={{
              position: 'absolute',
              top: -15,
              left: marsSize / 2 - 15,
              opacity: capOpacity,
              transform: `translate(0px, ${capOffset}px)`,
            }}
          />
          <LandmarkPolarCap
            size={30}
            color="#00B4D8"
            style={{
              position: 'absolute',
              bottom: -15,
              left: marsSize / 2 - 15,
              opacity: capOpacity,
              transform: `translate(0px, ${capOffset}px)`,
            }}
          />
          {/* River line */}
          <svg
            viewBox={`0 0 ${marsSize} ${marsSize}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <path
              d="M10 90 Q40 50 70 90 T130 90 T170 90"
              fill="none"
              stroke="#00B4D8"
              strokeWidth="2"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(0px, 20px)`,
            fontSize: 28,
            color: '#F5F5F5',
            fontFamily: "'Source Sans Pro', sans-serif",
            textAlign: 'center',
          }}
        >
          Ice caps & ancient rivers
        </div>
      </CenteredContainer>
    </BackgroundLayer>
  );
};