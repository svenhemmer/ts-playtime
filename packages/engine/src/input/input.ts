import { InputState } from "@models/input";

export const createInput = (): InputState => ({
  keys: {},
  mouse: { x: 0, y: 0, buttons: {}, dragging: false, dragStart: { x: 0, y: 0 } },
});

export const setupInputListeners = (input: InputState, canvas: HTMLCanvasElement) => {
  // Keyboard
  window.addEventListener("keydown", (e) => {
    input.keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    input.keys[e.key] = false;
  });

  // Mouse
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    input.mouse.x = e.clientX - rect.left;
    input.mouse.y = e.clientY - rect.top;

    // dragging detection
    if (input.mouse.dragging && input.mouse.dragStart) {
      // optional: do something while dragging
    }
  });

  canvas.addEventListener("mousedown", (e) => {
    input.mouse.buttons[e.button] = true;
    input.mouse.dragging = true;
    input.mouse.dragStart = { x: input.mouse.x, y: input.mouse.y };
  });

  canvas.addEventListener("mouseup", (e) => {
    input.mouse.buttons[e.button] = false;
    input.mouse.dragging = false;
    input.mouse.dragStart = undefined;
  });
};