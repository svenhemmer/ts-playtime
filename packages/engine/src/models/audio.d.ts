export type AudioState = {
    ctx: AudioContext;
    buffers: Map<string, AudioBuffer>;
}