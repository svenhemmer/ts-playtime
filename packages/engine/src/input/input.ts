import { Config, InputState } from "@models/index";

export const createInput = (): InputState => ({
  keys: {},
  mouse: { x: 0, y: 0, buttons: {}, dragging: false, dragStart: { x: 0, y: 0 }, wheel: 0 },
});

export const setupInputListeners = (input: InputState, canvas: HTMLCanvasElement, config?: Config) => {
  if (config?.inputs.keyboard) {
    window.addEventListener("keydown", (e) => {
      input.keys[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      input.keys[e.key] = false;
    });
  }

  if(config?.inputs.mouse.move) {
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      input.mouse.x = e.clientX - rect.left;
      input.mouse.y = e.clientY - rect.top;

      if (config.inputs.mouse.drag) {
        if (input.mouse.dragStart) {
          // optional: do something while dragging
        }

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
      }
    });
  }

  if (config?.zoom) {
    canvas.addEventListener("wheel", (e) => {
      input.mouse.wheel = e.deltaY;
    });
  }
};