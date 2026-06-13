import { useCurrentFrame } from 'remotion';

export const useScalePop = ({
  durationFrames = 20,
  delayFrames = 0,
  minScale = 0.8,
  maxScale = 1.05,
  ease = (t: number) => t,
}: {
  durationFrames?: number;
  delayFrames?: number;
  minScale?: number;
  maxScale?: number;
  ease?: (t: number) => number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delayFrames;
  if (adjustedFrame < 0) return minScale;
  if (adjustedFrame > durationFrames) return 1;

  const progress = adjustedFrame / durationFrames;
  const eased = ease(progress);
  // overshoot effect: ease out with slight overshoot approximated
  const scale = minScale + (maxScale - minScale) * eased;
  // simple overshoot: if eased > 1, clamp? We'll just return scale.
  return Math.min(scale, maxScale);
};
