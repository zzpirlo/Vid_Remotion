import { useCurrentFrame } from 'remotion';

export const useRotate3DRack = ({
  durationFrames = 60,
  delayFrames = 0,
  axis = 'Y' as const,
  angleDeg = 15,
  ease = (t: number) => t,
}: {
  durationFrames?: number;
  delayFrames?: number;
  axis?: 'X' | 'Y';
  angleDeg?: number;
  ease?: (t: number) => number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delayFrames;
  if (adjustedFrame < 0) return 0;
  if (adjustedFrame > durationFrames) return axis === 'Y' ? angleDeg : angleDeg;

  const progress = adjustedFrame / durationFrames;
  const eased = ease(progress);
  return axis === 'Y' ? eased * angleDeg : eased * angleDeg;
};