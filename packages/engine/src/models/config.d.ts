export type Config = {
    inputs: {
        keyboard: boolean;
        touch: boolean;
        mouse: {
            move: boolean;
            drag: boolean;
        }
    }
    zoom: boolean;
    width: number;
    height: number;
    fullscreen: boolean;
}