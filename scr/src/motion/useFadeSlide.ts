import { useCurrentFrame } from 'remotion';

type Direction = 'up' | 'down' | 'left' | 'right';

export const useFadeSlide = ({
  durationFrames = 30,
  delayFrames = 0,
  direction = 'up',
  easeIn = (t: number) => t,
  easeOut = (t: number) => t,
}: {
  durationFrames?: number;
  delayFrames?: number;
  direction?: Direction;
  easeIn?: (t: number) => number;
  easeOut?: (t: number) => number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delayFrames;
  if (adjustedFrame < 0) return { opacity: 0, offset: 0 };
  if (adjustedFrame > durationFrames) return { opacity: 1, offset: 0 };

  const progress = adjustedFrame / durationFrames;
  const ease = frame < delayFrames + durationFrames / 2 ? easeIn : easeOut;
  const eased = ease(progress > 0.5 ? (progress - 0.5) * 2 : progress * 2);
  const opacity = eased;

  let offset = 0;
  switch (direction) {
    case 'up': offset = -50 * (1 - eased); break;
    case 'down': offset = 50 * (1 - eased); break;
    case 'left': offset = -50 * (1 - eased); break;
    case 'right': offset = 50 * (1 - eased); break;
  }
  return { opacity, offset };
};
