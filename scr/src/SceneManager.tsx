import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Scene01_OpeningHook } from './scenes/Scene01_OpeningHook';
import { Scene02_PlanetOverview } from './scenes/Scene02_PlanetOverview';
import { Scene03_OrbitSeasons } from './scenes/Scene03_OrbitSeasons';
import { Scene04_SurfaceFeatures } from './scenes/Scene04_SurfaceFeatures';
import { Scene05_AtmosphereClimate } from './scenes/Scene05_AtmosphereClimate';
import { Scene06_WaterIce } from './scenes/Scene06_WaterIce';
import { Scene07_Moons } from './scenes/Scene07_Moons';
import { Scene08_ExplorationTimeline } from './scenes/Scene08_ExplorationTimeline';
import { Scene09_FutureOutlook } from './scenes/Scene09_FutureOutlook';
import { Scene10_ClosingCTA } from './scenes/Scene10_ClosingCTA';

// Scene durations in frames (6 seconds each at 60fps)
const SCENE_DURATION_FRAMES = 360;
const SCENE_COUNT = 10;

export const SceneManager = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneIndex = Math.min(Math.floor(frame / SCENE_DURATION_FRAMES), SCENE_COUNT - 1);
  const progressInScene = (frame % SCENE_DURATION_FRAMES) / SCENE_DURATION_FRAMES;

  const scenes = [
    Scene01_OpeningHook,
    Scene02_PlanetOverview,
    Scene03_OrbitSeasons,
    Scene04_SurfaceFeatures,
    Scene05_AtmosphereClimate,
    Scene06_WaterIce,
    Scene07_Moons,
    Scene08_ExplorationTimeline,
    Scene09_FutureOutlook,
    Scene10_ClosingCTA,
  ];

  const SceneComponent = scenes[sceneIndex];
  return <SceneComponent progress={progressInScene} />;
};
