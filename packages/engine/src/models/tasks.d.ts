export type LoadTask = () => Promise<void>;

export type TaskLoadingProgress = {
    loaded: number;
    total: number;
}