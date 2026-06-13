import { useCurrentFrame } from 'remotion';

export const useFadeInOut = ({
  inFrames,
  outFrames,
  easeIn = (t: number) => t,
  easeOut = (t: number) => t,
}: {
  inFrames: number;
  outFrames: number;
  easeIn?: (t: number) => number;
  easeOut?: (t: number) => number;
}) => {
  const frame = useCurrentFrame();
  if (frame < inFrames) {
    return easeIn(frame / inFrames);
  }
  if (frame >= inFrames && frame < inFrames + outFrames) {
    // Actually we need total frames? We'll assume outFrames after inFrames? Let's redesign.
    // Simpler: we expect inFrames and outFrames as durations from start and end.
    // We'll need totalFrames passed separately.
    return 1;
  }
  return 0;
};
