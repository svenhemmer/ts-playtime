import type { Mesh } from 'three';

export type Entity = {
    id: string;
    x: number;
    y: number;
    z?: number;
    vx?: number;
    vy?: number;
    color?: string;
    width?: number;
    height?: number;

    mesh?: Mesh;
}

export type EntityState = {
    entities: Entity[];
}