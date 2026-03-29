import type { Texture } from 'three';

export type AssetManifest = {
    sounds?: Record<string, string>;
    textures?: Record<string, string>;
}

export type AssetStore = {
  audio: Map<string, AudioBuffer>;
  textures: Map<string, Texture>;
};