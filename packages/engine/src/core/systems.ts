import type { EntityState } from "@models/entity";
import type { InputState } from "@models/input";
import type { Renderer } from "@rendering/renderer";

// Movement system using velocity
export const applyVelocity = (state: EntityState, dt: number) => {
  state.entities.forEach((e) => {
    e.x += (e.vx || 0) * dt;
    e.y += (e.vy || 0) * dt;
  });
};

// Input system: move first entity with arrow keys
export const inputSystem = (state: EntityState, input: InputState, speed = 200) => {
  const e = state.entities[0];
  if (!e) return;

  if (input.keys["ArrowRight"]) e.x += speed * 0.016;
  if (input.keys["ArrowLeft"]) e.x -= speed * 0.016;
  if (input.keys["ArrowDown"]) e.y += speed * 0.016;
  if (input.keys["ArrowUp"]) e.y -= speed * 0.016;
};

// Mouse drag system
export const dragSystem = (state: EntityState, input: InputState) => {
  if (!input.mouse.dragging || !input.mouse.dragStart) return;

  const e = state.entities[0];
  if (!e) return;

  e.x = input.mouse.x - (e.width || 0) / 2;
  e.y = input.mouse.y - (e.height || 0) / 2;
};

// Render system
export const renderSystem = (state: EntityState, renderer: Renderer) => {
  state.entities.forEach((e) => {
    renderer.ctx.fillStyle = e.color || "red";
    renderer.ctx.fillRect(e.x, e.y, e.width || 50, e.height || 50);
  });
};