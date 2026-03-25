import { EntityState, Scene } from "@models/index";

export const createScene = (
  id: string,
  state: EntityState,
  update: (dt: number) => void,
  render: () => void
): Scene => ({
  id,
  state,
  update,
  render,
});