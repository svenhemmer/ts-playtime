import { WebGLRenderer, OrthographicCamera, Scene } from 'three';

export type WebGLRendererCtx = {
  scene: Scene;
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
};

export const createWebGLRenderer = (
  width: number,
  height: number
): WebGLRendererCtx => {
  const scene = new Scene();

  const camera = new OrthographicCamera(
    0,
    width,
    height,
    0,
    -1000,
    1000
  );

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  return { scene, camera, renderer };
};