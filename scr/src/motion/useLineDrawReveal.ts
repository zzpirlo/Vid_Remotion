import { useCurrentFrame } from 'remotion';

export const useLineDrawReveal = ({
  pathLength,
  durationFrames = 45,
  delayFrames = 0,
  ease = (t: number) => t,
  reverse = false,
}: {
  pathLength: number;
  durationFrames?: number;
  delayFrames?: number;
  ease?: (t: number) => number;
  reverse?: boolean;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delayFrames;
  if (adjustedFrame < 0) return { strokeDasharray: pathLength, strokeDashoffset: pathLength };
  if (adjustedFrame > durationFrames)
    return { strokeDasharray: pathLength, strokeDashoffset: reverse ? pathLength : 0 };

  const progress = adjustedFrame / durationFrames;
  const eased = ease(progress);
  const offset = pathLength * (reverse ? (1 - eased) : eased);
  return { strokeDasharray: pathLength, strokeDashoffset: offset };
};
