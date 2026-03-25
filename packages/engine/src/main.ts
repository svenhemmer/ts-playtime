import { createGameLoop, startLoop } from "@core/game-loop";
import { screenToWorld, createInput, setupInputListeners } from "@input/index";
import { createEntity } from "@utils/entity-helper";
import { createWebGLRenderer } from "@rendering/webgl-renderer";
import { createRectMesh } from "@rendering/mesh-factory";

import { syncMeshes, renderWebGL } from "@core/webgl-systems";

import type { EntityState } from "@models/entity";

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

// attach mesh
entity.mesh = createRectMesh(100, 100, "blue");
renderer.scene.add(entity.mesh);

const state: EntityState = {
  entities: [entity],
};

const loop = createGameLoop(
  (dt) => {
    if (input.keys["ArrowRight"]) entity.x += 200 * dt;
    if (input.keys["ArrowLeft"]) entity.x -= 200 * dt;
    if (input.keys["ArrowUp"]) entity.y += 200 * dt;
    if (input.keys["ArrowDown"]) entity.y -= 200 * dt;

    if (input.mouse.dragging) {
      const pos = screenToWorld(
        input.mouse.x,
        input.mouse.y,
        renderer
      );
      entity.x = pos.x;
      entity.y = pos.y;
    }
    syncMeshes(state, renderer);
  },
  () => {
    renderWebGL(renderer);
  }
);

startLoop(loop);