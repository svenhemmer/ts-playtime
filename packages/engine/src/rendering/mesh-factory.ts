import { AssetStore } from '@models/assets';
import { PlaneGeometry, MeshBasicMaterial, Mesh } from 'three';

export const createGenericRectMesh = (
  width: number,
  height: number,
  color = "red"
) => {
  const geometry = new PlaneGeometry(width, height);
  const material = new MeshBasicMaterial({ color });

  return new Mesh(geometry, material);
};

export const createRectMesh = (
  width: number,
  height: number,
  assets: AssetStore,
  key: string
) => {
  const geometry = new PlaneGeometry(width, height);
  const texture = assets.textures.get(key)
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true
  });

  return new Mesh(geometry, material);
};