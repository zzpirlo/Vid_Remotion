import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { CenteredContainer } from '../layout/CenteredContainer';
import { useFadeSlide } from '../motion/useFadeSlide';
import { useScalePop } from '../motion/useScalePop';

export const Scene02_PlanetOverview = () => {
  const scale = useScalePop({ durationFrames: 20 });
  const { opacity, offset } = useFadeSlide({
    durationFrames: 30,
    direction: 'up',
  });

  return (
    <BackgroundLayer>
      <CenteredContainer>
        <div
          style={{
            transform: `scale(${scale})`,
          }}
        >
          {/* Optional: we could add a small mars icon here, but not required */}
        </div>
        <div
          style={{
            position: 'relative',
            top: offset,
            opacity,
            fontSize: 32,
            color: '#F5F5F5',
            fontFamily: "'Montserrat Alternates', sans-serif",
            textAlign: 'center',
          }}
        >
          Diameter: 6 779 km
        </div>
      </CenteredContainer>
    </BackgroundLayer>
  );
};