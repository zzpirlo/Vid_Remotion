import { useCurrentFrame } from 'remotion';

export const useOrbitMotion = ({
  durationFrames,
  delayFrames = 0,
  revolutions = 1,
  direction = 'cw' as const,
  ease = (t: number) => t,
}: {
  durationFrames: number;
  delayFrames?: number;
  revolutions?: number;
  direction?: 'cw' | 'ccw';
  ease?: (t: number) => number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delayFrames;
  if (adjustedFrame < 0) return 0;
  if (adjustedFrame > durationFrames) return Math.PI * 2 * revolutions * (direction === 'ccw' ? -1 : 1);

  const progress = adjustedFrame / durationFrames;
  const eased = ease(progress);
  const baseAngle = Math.PI * 2 * revolutions * eased;
  return direction === 'ccw' ? -baseAngle : baseAngle;
};
