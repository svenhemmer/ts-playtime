import { createGameLoop, startLoop } from "@core/game-loop";
import { screenToWorld, createInput, setupInputListeners } from "@input/index";
import { createEntity } from "@utils/entity-helper";
import { createWebGLRenderer } from "@rendering/webgl-renderer";
import { createRectMesh } from "@rendering/mesh-factory";

import { syncMeshes, renderWebGL } from "@core/webgl-systems";

import type { EntityState } from "@models/entity";
import { panCameraWithMouse, updateCamera, zoomCamera } from "@core/camera-control";
import { createCamera } from "@utils/camera-helper";
import { applyCamera } from "@rendering/camera-system";

const WIDTH = 800;
const HEIGHT = 600;

const renderer = createWebGLRenderer(WIDTH, HEIGHT);

const input = createInput();
setupInputListeners(input, renderer.renderer.domElement);

const entity = createEntity("player", 100, 100, {
  z: 0,
  width: 100,
  height: 100,
  color: "blue",
});

const camera = createCamera();

// attach mesh
entity.mesh = createRectMesh(100, 100, "blue");
renderer.scene.add(entity.mesh);

const state: EntityState = {
  entities: [entity],
};

const loop = createGameLoop(
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

startLoop(loop);