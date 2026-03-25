import type { Scene } from "@models/index";

export type SceneManager = {
  current?: Scene;
};

export const createSceneManager = (): SceneManager => ({
  current: undefined,
});

export const setScene = (manager: SceneManager, scene: Scene) => {
  manager.current = scene;
};

export const updateScene = (manager: SceneManager, dt: number) => {
  manager.current?.update(dt);
};

export const renderScene = (manager: SceneManager) => {
  manager.current?.render();
};