export type InputState = {
  keys: Record<string, boolean>;
  mouse: {
    x: number;
    y: number;
    buttons: Record<number, boolean>;
    dragging: boolean;
    dragStart: { x: number; y: number};
  };
}