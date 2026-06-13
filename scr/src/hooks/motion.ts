import { useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Returns opacity based on in/out frames.
 * @param param0
 */
export const useFadeInOut = ({
  inFrames,
  outFrames,
  totalFrames,
  easeIn = (t: number) => t,
  easeOut = (t: number) => t,
}: {
  inFrames: number;
  outFrames: number;
  totalFrames: number;
  easeIn?: (t: number) => number;
  easeOut?: (t: number) => number;
}) => {
  const frame = useCurrentFrame();
  if (frame < inFrames) {
    return easeIn(frame / inFrames);
  }
  if (frame > totalFrames - outFrames) {
    return easeOut((totalFrames - frame) / outFrames);
  }
  return 1;
};

/**
 * Scale pop: 0.8 -> 1.05 -> 1.0 over given frames.
 */
export const useScalePop = ({
  durationFrames,
}: { durationFrames: number }) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / durationFrames, 1);
  // ease out overshoot: cubic-bezier(0.25,0.8,0.25,1) approximated
  const easeOutOvershoot = (t: number) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3);
  const scale = 0.8 + (1.05 - 0.8) * easeOutOvershoot(progress);
  return Math.min(scale, 1.05);
};

/**
 * Returns angle in radians for orbit based on startFrame, endFrames, totalRevolutions.
 */
export const useOrbitProgress = ({
  startFrame,
  endFrame,
  revolutions = 1,
}: {
  startFrame: number;
  endFrame: number;
  revolutions?: number;
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return 0;
  if (frame > endFrame) return Math.PI * 2 * revolutions;
  const progress = (frame - startFrame) / (endFrame - startFrame);
  return Math.PI * 2 * revolutions * progress;
};

/**
 * Pulse oscillation between minScale and maxScale over periodFrames.
 */
export const usePulse = ({
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

/**
 * Stagger delay for an array of refs.
 * Returns a function that given index returns delay in frames.
 */
export const useStagger = ({
  count,
  staggerFrames = 2,
}: {
  count: number;
  staggerFrames?: number;
}) => {
  return (index: number) => index * staggerFrames;
};

/**
 * Returns strokeDasharray and strokeDashoffset for line drawing animation.
 * @param param0 length of path, durationFrames, startFrame
 */
export const useLineDraw = ({
  pathLength,
  durationFrames,
  startFrame = 0,
}: {
  pathLength: number;
  durationFrames: number;
  startFrame?: number;
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return { strokeDasharray: pathLength, strokeDashoffset: pathLength };
  if (frame > startFrame + durationFrames)
    return { strokeDasharray: pathLength, strokeDashoffset: 0 };
  const progress = (frame - startFrame) / durationFrames;
  const offset = pathLength * (1 - progress);
  return { strokeDasharray: pathLength, strokeDashoffset: offset };
};

/**
 * Blink opacity on/off every intervalFrames.
 */
export const useBlink = ({
  intervalFrames,
  durationFrames = 1,
}: {
  intervalFrames: number;
  durationFrames?: number;
}) => {
  const frame = useCurrentFrame();
  const phase = (frame % intervalFrames) < durationFrames;
  return phase ? 1 : 0;
};

/**
 * Simple motion blur trail: returns opacity and offset based on speed.
 * Not fully implemented; placeholder.
 */
export const useMotionBlurTrail = () => {
  return { opacity: 0.4, offsetX: 0, offsetY: 0 };
};
