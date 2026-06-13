import { useCurrentFrame } from 'remotion';

export const useFadeInScaleCombo = ({
  durationFrames = 30,
  delayFrames = 0,
  scaleFrom = 0.8,
  scaleTo = 1.0,
  easeOpacity = (t: number) => t,
  easeScale = (t: number) => t,
}: {
  durationFrames?: number;
  delayFrames?: number;
  scaleFrom?: number;
  scaleTo?: number;
  easeOpacity?: (t: number) => number;
  easeScale?: (t: number) => number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delayFrames;
  if (adjustedFrame < 0) return { opacity: 0, scale: scaleFrom };
  if (adjustedFrame > durationFrames) return { opacity: 1, scale: scaleTo };

  const progress = adjustedFrame / durationFrames;
  const opacityEase = easeOpacity(progress);
  const scaleEase = easeScale(progress);
  const opacity = opacityEase;
  const scale = scaleFrom + (scaleTo - scaleFrom) * scaleEase;
  return { opacity, scale };
};