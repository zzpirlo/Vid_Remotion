import { useCurrentFrame } from 'remotion';

export const useBlinkHighlight = ({
  intervalFrames = 30,
  onFrames = 5,
  offFrames = 25,
}: {
  intervalFrames?: number;
  onFrames?: number;
  offFrames?: number;
}) => {
  const frame = useCurrentFrame();
  const phase = frame % intervalFrames;
  return phase < onFrames ? 1 : 0;
};