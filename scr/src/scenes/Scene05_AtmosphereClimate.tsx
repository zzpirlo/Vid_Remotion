import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { CenteredContainer } from '../layout/CenteredContainer';
import { MarsBase } from '../assets/svg/mars-base';
import { MarsAtmosphere } from '../assets/svg/mars-base';
import { DataCallout } from '../assets/svg/data-callout';
import { useFadeInScaleCombo } from '../motion/useFadeInScaleCombo';
import { useCountUp } from '../motion/useCountUp';
import { useFadeSlide } from '../motion/useFadeSlide';

export const Scene05_AtmosphereClimate = () => {
  const atmosphere = useFadeInScaleCombo({
    durationFrames: 30,
    scaleFrom: 0.8,
    scaleTo: 1.0,
  });
  const temperature = useCountUp({
    durationFrames: 45,
    endValue: -60,
    formatter: (v) => `${v}°C`,
  });
  const { opacity: labelOpacity, offset: labelOffset } = useFadeSlide({
    durationFrames: 30,
    direction: 'up',
  });

  return (
    <BackgroundLayer>
      <CenteredContainer>
        <div style={{ position: 'relative', width: 180, height: 180 }}>
          <MarsBase />
          <MarsAtmosphere
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transform: `scale(${atmosphere.scale})`,
              opacity: atmosphere.opacity,
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(0px, ${labelOffset}px)`,
            opacity: labelOpacity,
            fontSize: 28,
            color: '#F5F5F5',
            fontFamily: "'Source Sans Pro', sans-serif",
            textAlign: 'center',
          }}
        >
          <DataCallout
            content={temperature}
            type="circle"
            colorScheme="accent"
            withShadow={false}
            withHighlight={false}
            sizeOverride={80}
          />
        </div>
      </CenteredContainer>
    </BackgroundLayer>
  );
};