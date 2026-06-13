import { useCurrentFrame } from 'remotion';

export const usePulseIdle = ({
  periodFrames,
  minScale = 0.98,
  maxScale = 1.02,
}: {
  periodFrames: number;
  minScale?: number;
  maxScale?: number;
}) => {
  const frame = useCurrentFrame();
  const progress = (frame % periodFrames) / periodFrames;
  // easeInOutSine
  const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
  return minScale + (maxScale - minScale) * ease(progress);
};