import { AssetManifest, AssetStore, AudioState, LoadTask, TaskLoadingProgress } from '@models/index';

export const createAssetStore = (): AssetStore => ({
    images: new Map(),
    audio: new Map()
});

export const createImageTask = (
    store: AssetStore,
    key: string,
    src: string
): LoadTask => async () => {
    const img = new Image();
    img.src = src;
    await img.decode();
    store.images.set(key, img);
}

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

export const createTasks = (manifest: AssetManifest, assets: AssetStore, audio: AudioState) => {
    const tasks: LoadTask[] = [];

    for (const [key, src] of Object.entries(manifest.images)) {
        tasks.push(createImageTask(assets, key, src));
    }

    for (const [key, src] of Object.entries(manifest.sounds)) {
        tasks.push(createSoundTask(audio, key, src))
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