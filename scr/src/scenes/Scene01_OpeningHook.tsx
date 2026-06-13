import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { CenteredContainer } from '../layout/CenteredContainer';
import { MarsBase } from '../assets/svg/mars-base';
import { useScalePop } from '../motion/useScalePop';
import { useFadeSlide } from '../motion/useFadeSlide';

export const Scene01_OpeningHook = () => {
  const scale = useScalePop({ durationFrames: 30 });
  const { opacity: textOpacity, offset: textOffset } = useFadeSlide({
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
          <MarsBase />
        </div>
        <div
          style={{
            position: 'relative',
            top: textOffset,
            opacity: textOpacity,
            fontSize: 48,
            color: '#F5F5F5',
            fontFamily: "'Montserrat Alternates', sans-serif",
            fontWeight: 800,
            textAlign: 'center',
            marginTop: 20, // space below the mars icon
          }}
        >
          Mars
        </div>
      </CenteredContainer>
    </BackgroundLayer>
  );
};