import { createRenderer, clear } from "@rendering/renderer";
import { createGameLoop, startLoop } from "@core/game-loop";
import { applyVelocity, inputSystem, dragSystem, renderSystem } from "@core/systems";
import { createInput, setupInputListeners } from "@input/input";
import { createEntity } from "@utils/entity-helper";
import type { EntityState } from "@models/entity";

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

const renderer = createRenderer(canvas);
const input = createInput();
setupInputListeners(input, canvas);

const state: EntityState = {
  entities: [
    createEntity("player", 100, 100, { color: "blue", width: 100, height: 100 }),
  ],
};

const loop = createGameLoop(
  (dt) => {
    inputSystem(state, input);
    dragSystem(state, input);
    applyVelocity(state, dt);
  },
  () => {
    clear(renderer);
    renderSystem(state, renderer);
  }
);

startLoop(loop);