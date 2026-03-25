import type { Camera } from "@models/camera";
import type { WebGLRendererCtx } from "@rendering/webgl-renderer";

export const applyCamera = (
  cam: Camera,
  ctx: WebGLRendererCtx,
  width: number,
  height: number
) => {
  const { camera } = ctx;

  const halfW = width / 2 / cam.zoom;
  const halfH = height / 2 / cam.zoom;

  camera.left = cam.x - halfW;
  camera.right = cam.x + halfW;
  camera.top = cam.y + halfH;
  camera.bottom = cam.y - halfH;

  camera.updateProjectionMatrix();
};