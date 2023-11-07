import { BufferGeometry, Vector2 } from "three";
export declare const cover: {
    generateTopUV(geometry: BufferGeometry, vertices: number[], indexA: number, indexB: number, indexC: number): Vector2[];
    generateSideWallUV(geometry: BufferGeometry, vertices: number[], indexA: number, indexB: number, indexC: number, indexD: number): Vector2[];
};
