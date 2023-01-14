import { Box3, Mesh } from "three";
import { MeshBVH, MeshBVHVisualizer, ShapecastIntersection, ExtendedTriangle } from "three-mesh-bvh";
export type CastOptions = {
    intersectsBounds: (box: Box3, isLeaf: boolean, score: number | undefined, depth: number, nodeIndex: number) => ShapecastIntersection | boolean;
    traverseBoundsOrder?: (box: Box3) => number;
} & ({
    intersectsRange: (triangleOffset: number, triangleCount: number, contained: boolean, depth: number, nodeIndex: number, box: Box3) => boolean;
} | {
    intersectsTriangle: (triangle: ExtendedTriangle, triangleIndex: number, contained: boolean, depth: number) => boolean | void;
});
export declare class MeshBVHManager {
    bvh: MeshBVH;
    visualizer?: MeshBVHVisualizer;
    castOptions: CastOptions;
    addBVH(mesh: Mesh): void;
    createVisualizer(): this;
    shapecast(options?: CastOptions): boolean;
    dispose(): void;
}
