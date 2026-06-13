import React from 'react';
import { Composition } from 'remotion';
import { SceneManager } from './SceneManager';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MarsExplainer"
      component={SceneManager}
      durationInFrames={3600}
      fps={60}
      width={1080}
      height={1920}
    />
  );
};