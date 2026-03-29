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

import { createEntity, createCamera, createScene } from "@utils/index";

import type { EntityState } from "@models/index";

const WIDTH = 800;
const HEIGHT = 600;

const sceneManager = createSceneManager();

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

setScene(sceneManager, scene);
const renderer = createWebGLRenderer(WIDTH, HEIGHT);

const input = createInput();
setupInputListeners(input, renderer.renderer.domElement);

const entity = createEntity("player", 100, 100, {
  z: 0,
  width: 100,
  height: 100,
  color: "blue",
});

const state: EntityState = {
  entities: [entity],
};

const camera = createCamera();

// attach mesh
entity.mesh = createRectMesh(100, 100, "blue");
renderer.scene.add(entity.mesh);

const loop = createGameLoop(
  (dt) => { updateScene(sceneManager, dt ) },
  () => { renderScene(sceneManager) }
);

startLoop(loop);