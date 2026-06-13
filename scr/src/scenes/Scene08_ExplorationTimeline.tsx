import React from 'react';
import { BackgroundLayer } from '../layout/BackgroundLayer';
import { CenteredContainer } from '../layout/CenteredContainer';
import { IconRocket } from '../assets/svg/icon-rocket';
import { IconAstronaut } from '../assets/svg/icon-astronaut';
import { useLineDrawReveal } from '../motion/useLineDrawReveal';
import { useStaggerSequence } from '../motion/useStaggerSequence';
import { useFadeSlide } from '../motion/useFadeSlide';
import { useScalePop } from '../motion/useScalePop';

type TimelineItem = {
  year: number;
  label: string;
  icon: 'rocket' | 'astronaut';
};

const timelineData: TimelineItem[] = [
  { year: 1965, label: 'Mariner 4', icon: 'rocket' },
  { year: 1976, label: 'Viking 1', icon: 'rocket' },
  { year: 1997, label: 'Sojourner', icon: 'rocket' },
  { year: 2004, label: 'Opportunity', icon: 'rocket' },
  { year: 2012, label: 'Curiosity', icon: 'rocket' },
  { year: 2021, label: 'Perseverance', icon: 'rocket' },
  { year: 2035, label: 'First Humans?', icon: 'astronaut' },
];

export const Scene08_ExplorationTimeline = () => {
  const timelineWidth = 800;
  const timelineHeight = 200;
  const margin = 60;
  const usableWidth = timelineWidth - 2 * margin;
  const step = usableWidth / (timelineData.length - 1);
  const linePathLength = usableWidth; // length of the line to draw
  const { strokeDasharray, strokeDashoffset } = useLineDrawReveal({
    pathLength: linePathLength,
    durationFrames: 45,
  });
  const stagger = useStaggerSequence({ count: timelineData.length, staggerFrames: 2 });
  const markerAnims = timelineData.map((_, idx) => ({
    fade: useFadeSlide({ durationFrames: 20, delayFrames: stagger(idx) }),
    scale: useScalePop({ durationFrames: 15, delayFrames: stagger(idx) }),
  }));

  return (
    <BackgroundLayer>
      <CenteredContainer>
        <svg
          viewBox={`0 0 ${timelineWidth} ${timelineHeight}`}
          width={timelineWidth}
          height={timelineHeight}
        >
          {/* Timeline line */}
          <line
            x1={margin}
            y1={timelineHeight / 2}
            x2={timelineWidth - margin}
            y2={timelineHeight / 2}
            stroke="#F5F5F5"
            strokeWidth="2"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
          {/* Markers */}
          {timelineData.map((item, idx) => {
            const x = margin + idx * step;
            const anims = markerAnims[idx];
            const { opacity: fadeOpacity, offset: fadeOffset } = anims.fade;
            const scale = anims.scale;
            const Icon = item.icon === 'rocket' ? IconRocket : IconAstronaut;
            return (
              <g key={item.year} transform={`translate(${x},${timelineHeight / 2})`}>
                {/* Connector line to timeline */}
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={-20}
                  stroke="#F5F5F5"
                  strokeWidth="1.5"
                  opacity={fadeOpacity}
                />
                {/* Dot */}
                <circle cx="0" cy="-20" r="6" fill="#F5F5F5" opacity={fadeOpacity} />
                {/* Icon */}
                <Icon
                  size={24}
                  color="#F5F5F5"
                  filled={false}
                  withShadow={false}
                  withHighlight={false}
                  style={{
                    transform: `scale(${scale})`,
                    marginLeft: -12,
                    marginTop: -36, // position above the dot
                  }}
                />
                {/* Label */}
                <text
                  x="0"
                  y={-45}
                  textAnchor="middle"
                  fill="#F5F5F5"
                  fontSize="14"
                  fontFamily="'Source Sans Pro', sans-serif"
                  opacity={fadeOpacity}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
        {/* Subtitle text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            fontSize: 24,
            color: '#F5F5F5',
            fontFamily: "'Source Sans Pro', sans-serif",
            textAlign: 'center',
          }}
        >
          1965 Mariner 4 → 2021 Perseverance
        </div>
      </CenteredContainer>
    </BackgroundLayer>
  );
};