export type AssetManifest = {
    images?: Record<string, string>;
    sounds?: Record<string, string>;
}

export type AssetStore = {
  images: Map<string, HTMLImageElement>;
  audio: Map<string, AudioBuffer>;
};