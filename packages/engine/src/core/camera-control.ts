import type { Camera, InputState } from "@models/index";

export const updateCamera = (
  cam: Camera,
  input: InputState,
  dt: number
) => {
  const speed = 500;

  // Keyboard pan
  if (input.keys["a"]) cam.x -= speed * dt;
  if (input.keys["d"]) cam.x += speed * dt;
  if (input.keys["w"]) cam.y += speed * dt;
  if (input.keys["s"]) cam.y -= speed * dt;
};

export const panCameraWithMouse = (
  cam: Camera,
  input: InputState
) => {
  if (!input.mouse.dragging || !input.mouse.dragStart) return;

  const dx = input.mouse.x - input.mouse.dragStart.x;
  const dy = input.mouse.y - input.mouse.dragStart.y;

  cam.x -= dx * cam.zoom;
  cam.y += dy * cam.zoom;

  input.mouse.dragStart = {
    x: input.mouse.x,
    y: input.mouse.y,
  };
};

export const zoomCamera = (cam: Camera, input: InputState) => {
  if (!input.mouse.wheel) return;

  const zoomFactor = 1.1;

  if (input.mouse.wheel > 0) cam.zoom *= zoomFactor;
  else cam.zoom /= zoomFactor;

  input.mouse.wheel = 0;
};