import type { EntityState } from "@models/entity";
import type { WebGLRendererCtx } from "@rendering/webgl-renderer";

export const syncMeshes = (state: EntityState, ctx: WebGLRendererCtx) => {
  const { scene } = ctx;

  state.entities.forEach((e) => {
    if (!e.mesh) {
      // lazy creation
      return;
    }

    e.mesh.position.set(e.x, e.y, e.z);
  });
};

export const renderWebGL = (ctx: WebGLRendererCtx) => {
  ctx.renderer.render(ctx.scene, ctx.camera);
};