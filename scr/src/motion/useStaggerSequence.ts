import { useCurrentFrame } from 'remotion';

export const useStaggerSequence = ({
  count,
  staggerFrames = 2,
}: {
  count: number;
  staggerFrames?: number;
}) => {
  const frame = useCurrentFrame();
  return (index: number) => {
    const startDelay = index * staggerFrames;
    return frame - startDelay;
  };
};