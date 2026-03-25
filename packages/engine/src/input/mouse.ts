import { Vector3} from "three";
import type { WebGLRendererCtx } from '@rendering/webgl-renderer';

export const screenToWorld = (
  x: number,
  y: number,
  ctx: WebGLRendererCtx
) => {

  const rect = ctx.renderer.domElement.getBoundingClientRect();

  // normalize to -1..1
  const nx = ((x - rect.left) / rect.width) * 2 - 1;
  const ny = -((y - rect.top) / rect.height) * 2 + 1;

  const vec = new Vector3(nx, ny, 0);
  vec.unproject(ctx.camera);

  return { x: vec.x, y: vec.y };
};