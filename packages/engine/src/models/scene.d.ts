import { EntityState } from "./entity";

export type Scene = {
  id: string;
  state: EntityState;

  update: (dt: number) => void;
  render: () => void;
};