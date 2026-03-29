import { 
  createGameLoop, startLoop, 
  createSceneManager, 
  panCameraWithMouse, updateCamera, zoomCamera, 
  syncMeshes, renderWebGL,
  setScene,
  updateScene,
  renderScene
} from "@core/index";

import { createInput, setupInputListeners } from "@input/index";

import { createWebGLRenderer, createRectMesh, applyCamera } from "@rendering/index";

import { createEntity, createCamera, createScene, createTasks, createAssetStore, runTasks, createConfig } from "@utils/index";

import type { EntityState } from "@models/index";

const WIDTH = 800;
const HEIGHT = 600;

const sceneManager = createSceneManager();
const assets = createAssetStore();
const audioState = { ctx: new AudioContext(), buffers: new Map() };
const camera = createCamera();

const entity = createEntity("player", 100, 100, {
  z: 0,
  width: 100,
  height: 100,
  color: "blue",
});

const state: EntityState = {
  entities: [entity],
};

const scene = createScene(
  "main",
  { entities: [] },
  (dt) => {
    updateCamera(camera, input, dt);
    panCameraWithMouse(camera, input);
    zoomCamera(camera, input);

    applyCamera(camera, renderer, WIDTH, HEIGHT);

    syncMeshes(state, renderer);
  },
  () => {
    renderWebGL(renderer);
  }
);

const renderer = createWebGLRenderer(WIDTH, HEIGHT);

const input = createInput();
setupInputListeners(input, renderer.renderer.domElement, createConfig({ zoom: true }));

const loop = createGameLoop(
  (dt) => { updateScene(sceneManager, dt ) },
  () => { renderScene(sceneManager) }
);

const tasks = createTasks({
  textures: {
    flower: '/flower.png'
  }
}, assets, audioState);

runTasks(tasks, (progress) => console.log(progress)).then(() => {
  entity.mesh = createRectMesh(100, 100, assets, 'flower');
  renderer.scene.add(entity.mesh);
  setScene(sceneManager, scene);
  startLoop(loop)
}
);
