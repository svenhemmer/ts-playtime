import type { Entity } from "@models/entity";

export const createEntity = (id: string, x: number, y: number, opts: Partial<Omit<Entity, "id" | "x" | "y">> = {}): Entity => ({
  id,
  x,
  y,
  vx: 0,
  vy: 0,
  color: "red",
  width: 50,
  height: 50,
  ...opts,
});