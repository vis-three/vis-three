# @vis-three/plugin-mesh-bvh

Mesh BVH Plugin.

Reference: [https://github.com/gkjohnson/three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh)

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-mesh-bvh">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-mesh-bvh?color=blue">

## Plugin Name

`MeshBVHPlugin`

:::tip
You can use the enumeration: `MESH_BVH_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export type CastOptions = {
  intersectsBounds: (
    box: Box3,
    isLeaf: boolean,
    score: number | undefined,
    depth: number,
    nodeIndex: number
  ) => ShapecastIntersection | boolean;

  traverseBoundsOrder?: (box: Box3) => number;
} & (
  | {
      intersectsRange: (
        triangleOffset: number,
        triangleCount: number,
        contained: boolean,
        depth: number,
        nodeIndex: number,
        box: Box3
      ) => boolean;
    }
  | {
      intersectsTriangle: (
        triangle: ExtendedTriangle,
        triangleIndex: number,
        contained: boolean,
        depth: number
      ) => boolean | void;
    }
);

export interface MeshBVHPluginParameters {
    /** Visualize BVH */
    visualizer?: boolean;
    /** Custom shape detection rules */
    shapecast?: CastOptions;
}
```

## Engine Extensions

```ts
export interface MeshBVHEngine extends Engine {
    /** BVH Manager */
    meshBVHManager: MeshBVHManager;
    /** Add BVH */
    addBVH: (mesh: Mesh) => MeshBVHEngine;
}
```
