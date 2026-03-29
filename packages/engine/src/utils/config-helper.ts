import type { Config } from "@models/config";

const defaultConfig: Config = {
    inputs: {
        keyboard: true,
        touch: false,
        mouse: {
            move: true,
            drag: false
        }
    },
    zoom: false,
    width: 800,
    height: 600,
    fullscreen: false
}

export const createConfig = (conf: Partial<Config>): Config => {
    return { ...defaultConfig, ...conf }
};