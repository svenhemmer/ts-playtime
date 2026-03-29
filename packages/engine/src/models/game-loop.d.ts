export type GameLoop = {
  running: boolean;
  lastTime: number;
  update: (dt: number) => void;
  render: () => void;
};