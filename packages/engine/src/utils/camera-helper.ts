import type { Camera } from "@models/camera";

export const createCamera = (): Camera => ({
  x: 0,
  y: 0,
  zoom: 1,
});