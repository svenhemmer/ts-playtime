import { AssetStore } from '@models/assets';
import { PlaneGeometry, MeshBasicMaterial, Mesh, Texture, NearestFilter } from 'three';

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
  const texture: Texture = assets.textures.get(key);
  // pixel perfect... maybe make this a config option?
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true
  });

  return new Mesh(geometry, material);
};