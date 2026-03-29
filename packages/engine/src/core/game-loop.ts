import type { GameLoop } from "@models/game-loop.d.ts";

export const createGameLoop = (update: (dt: number) => void, render: () => void): GameLoop => ({
  running: false,
  lastTime: 0,
  update,
  render,
});

export const startLoop = (loop: GameLoop) => {
  loop.running = true;
  const tick = (time: number) => {
    if (!loop.running) return;

    const dt = (time - loop.lastTime) / 1000;
    loop.lastTime = time;

    loop.update(dt);
    loop.render();

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

export const stopLoop = (loop: GameLoop) => {
  loop.running = false;
};