import { AssetManifest, AssetStore, AudioState, LoadTask, TaskLoadingProgress } from '@models/index';
import { NearestFilter, Texture, TextureLoader } from 'three';

export const createAssetStore = (): AssetStore => ({
    audio: new Map(),
    textures: new Map()
});

export const createSoundTask = (
    state: AudioState,
    key: string,
    src: string
): LoadTask => async () => {
    const res = await fetch(src);
    const buf = await res.arrayBuffer();
    const audio = await state.ctx.decodeAudioData(buf);
    state.buffers.set(key, audio);
}

export const createTextureTask = (
    store: AssetStore,
    key: string,
    src: string
): LoadTask => async () => {
    const loader = new TextureLoader();

    const texture: Texture = await new Promise<Texture>((resolve, reject) => {
        loader.load(src, resolve, undefined, reject);
    })
    
    store.textures.set(key, texture);
}

export const createTasks = (manifest: AssetManifest, assets: AssetStore, audio: AudioState) => {
    const tasks: LoadTask[] = [];

    for (const [key, src] of Object.entries(!!manifest.sounds? manifest.sounds: [])) {
        tasks.push(createSoundTask(audio, key, src))
    }

    for (const [key, src] of Object.entries(!!manifest.textures? manifest.textures: [])) {
        tasks.push(createTextureTask(assets, key, src))
    }

    return tasks;
}

export const runTasks = (
    tasks: LoadTask[],
    onProgress: (p: TaskLoadingProgress) => void
) => {
    let loaded = 0;
    const total = tasks.length;

    const wrapped = tasks.map(task => task().then(() => {
            loaded ++;
            onProgress({ loaded, total });
        })
    );

    return Promise.all(wrapped);
}