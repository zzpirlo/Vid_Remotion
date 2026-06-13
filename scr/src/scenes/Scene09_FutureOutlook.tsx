import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { CenteredContainer } from '../layout/CenteredContainer';
import { IconAstronaut } from '../assets/svg/icon-astronaut';
import { useScalePop } from '../motion/useScalePop';
import { usePulseIdle } from '../motion/usePulseIdle';
import { useFadeSlide } from '../motion/useFadeSlide';

export const Scene09_FutureOutlook = () => {
  const astronautScale = useScalePop({ durationFrames: 30 });
  const flagScale = useScalePop({ durationFrames: 30, delayFrames: 10 });
  const waveScale = usePulseIdle({ periodFrames: 90, minScale: 0.5, maxScale: 2.0 });
  const { opacity: textOpacity, offset: textOffset } = useFadeSlide({
    durationFrames: 30,
    direction: 'up',
  });

  return (
    <BackgroundLayer>
      <CenteredContainer>
        <div
          style={{
            position: 'relative',
            width: 260,
            height: 200,
          }}
        >
          {/* Expanding wave */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '20%',
              width: 80 * waveScale,
              height: 80 * waveScale,
              backgroundColor: 'rgba(0,180,216,0.1)',
              borderRadius: '50%',
              transform: `translate(-50%, -50%)`,
            }}
          />
          {/* Astronaut */}
          <IconAstronaut
            size={80}
            color="#F5F5F5"
            filled={false}
            withShadow={false}
            withHighlight={false}
            style={{
              position: 'absolute',
              left: '10%',
              top: '50%',
              transform: `translate(-50%, -50%) scale(${astronautScale})`,
            }}
          />
          {/* Flag pole */}
          <div
            style={{
              position: 'absolute',
              left: '70%',
              top: '30%',
              width: 4,
              height: 60,
              backgroundColor: '#2D2D2D',
              transform: 'translateX(-50%)',
            }}
          />
          {/* Flag */}
          <div
            style={{
              position: 'absolute',
              left: '70%',
              top: '20%',
              width: 30,
              height: 20,
              backgroundColor: '#E25822',
              transform: `translate(-50%, -50%) scale(${flagScale})`,
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, 50%) translate(0px, ${textOffset}px)`,
            opacity: textOpacity,
            fontSize: 32,
            color: '#F5F5F5',
            fontFamily: "'Montserrat Alternates', sans-serif",
            textAlign: 'center',
          }}
        >
          What’s next?
        </div>
      </CenteredContainer>
    </BackgroundLayer>
  );
};