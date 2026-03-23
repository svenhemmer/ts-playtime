import { createRenderer, clear, drawRect } from "@rendering/renderer";
import { createGameLoop, startLoop } from "@core/game-loop";
import { createInput, setupInputListeners } from "@input/input";

import type { InputState } from "@models/input";

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

const renderer = createRenderer(canvas);
const input: InputState = createInput();
setupInputListeners(input, canvas);

const state = { x: 50, y: 50 };

const loop = createGameLoop(
  (dt) => {
    // Move with arrow keys
    if (input.keys["ArrowRight"]) state.x += 200 * dt;
    if (input.keys["ArrowLeft"]) state.x -= 200 * dt;
    if (input.keys["ArrowDown"]) state.y += 200 * dt;
    if (input.keys["ArrowUp"]) state.y -= 200 * dt;
  },
  () => {
    clear(renderer);
    drawRect(renderer, state.x, state.y, 100, 100);
  }
);

startLoop(loop);