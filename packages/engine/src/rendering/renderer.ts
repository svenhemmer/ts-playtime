export type Renderer = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};

export const createRenderer = (canvas: HTMLCanvasElement): Renderer => ({
  canvas,
  ctx: canvas.getContext("2d")!,
});

export const clear = (renderer: Renderer) => {
  renderer.ctx.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height);
};

export const drawRect = (renderer: Renderer, x: number, y: number, w: number, h: number, color = "red") => {
  renderer.ctx.fillStyle = color;
  renderer.ctx.fillRect(x, y, w, h);
};