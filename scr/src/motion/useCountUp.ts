import { useCurrentFrame } from 'remotion';

type Formatter = (value: number) => string;

export const useCountUp = ({
  durationFrames = 45,
  delayFrames = 0,
  endValue = 0,
  formatter = (v: number) => v.toString(),
  ease = (t: number) => t,
}: {
  durationFrames?: number;
  delayFrames?: number;
  endValue?: number;
  formatter?: Formatter;
  ease?: (t: number) => number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delayFrames;
  if (adjustedFrame < 0) return formatter(0);
  if (adjustedFrame > durationFrames) return formatter(endValue);

  const progress = adjustedFrame / durationFrames;
  const eased = ease(progress);
  const value = Math.round(eased * endValue);
  return formatter(value);
};