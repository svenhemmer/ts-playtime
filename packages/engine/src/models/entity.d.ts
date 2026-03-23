export type Entity = {
    id: string;
    x: number;
    y: number;
    vx?: number;
    vy?: number;
    color?: string;
    width?: number;
    height?: number;
}

export type EntityState = {
    entities: Entity[];
}