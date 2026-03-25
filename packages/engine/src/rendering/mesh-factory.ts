import { PlaneGeometry, MeshBasicMaterial, Mesh } from 'three';

export const createRectMesh = (
  width: number,
  height: number,
  color = "red"
) => {
  const geometry = new PlaneGeometry(width, height);
  const material = new MeshBasicMaterial({ color });

  return new Mesh(geometry, material);
};