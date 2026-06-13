import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { CenteredContainer } from '../layout/CenteredContainer';
import { MarsBase } from '../assets/svg/mars-base';
import { LandmarkOlympusMons } from '../assets/svg/landmark-olympus-mons';
import { LandmarkVallesMarineris } from '../assets/svg/landmark-valles-marineris';
import { useScalePop } from '../motion/useScalePop';
import { useFadeSlide } from '../motion/useFadeSlide';
import { useStaggerSequence } from '../motion/useStaggerSequence';

export const Scene04_SurfaceFeatures = () => {
  const marsSize = 180; // diameter of mars base (approx)
  const featureCount = 2;
  const stagger = useStaggerSequence({ count: featureCount, staggerFrames: 15 });
  const scale0 = useScalePop({ durationFrames: 25, delayFrames: stagger(0) });
  const scale1 = useScalePop({ durationFrames: 25, delayFrames: stagger(1) });
  const { opacity: textOpacity, offset: textOffset } = useFadeSlide({
    durationFrames: 30,
    direction: 'up',
  });

  return (
    <BackgroundLayer>
      <CenteredContainer>
        <div
          style={{
            width: marsSize,
            height: marsSize,
            position: 'relative',
          }}
        >
          <MarsBase />
          {/* Olympus Mons */}
          <LandmarkOlympusMons
            size={100}
            color="#F5F5F5"
            style={{
              position: 'absolute',
              top: -20,
              left: -20,
              transform: `scale(${scale0})`,
            }}
          />
          {/* Valles Marineris */}
          <LandmarkVallesMarineris
            size={160}
            color="#F5F5F5"
            style={{
              position: 'absolute',
              top: marsSize / 2 - 20,
              left: marsSize / 2 - 80,
              transform: `scale(${scale1})`,
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
          Tallest volcano & deepest canyon
        </div>
      </CenteredContainer>
    </BackgroundLayer>
  );
};