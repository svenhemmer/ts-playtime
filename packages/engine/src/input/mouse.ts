import * as THREE from "three";
import type { WebGLRendererCtx } from '@rendering/webgl-renderer';

export const screenToWorld = (
  x: number,
  y: number,
  ctx: WebGLRendererCtx
) => {
  const { renderer, camera } = ctx;

  const rect = renderer.domElement.getBoundingClientRect();

  // normalize to -1..1
  const nx = ((x - rect.left) / rect.width) * 2 - 1;
  const ny = -((y - rect.top) / rect.height) * 2 + 1;

  const vec = new THREE.Vector3(nx, ny, 0);
  vec.unproject(camera);

  return { x: vec.x, y: vec.y };
};