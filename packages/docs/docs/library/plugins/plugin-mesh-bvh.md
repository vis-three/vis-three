# @vis-three/plugin-mesh-bvh

网格 bvh 插件。

参照：[https://github.com/gkjohnson/three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh)

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-mesh-bvh">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-mesh-bvh?color=blue">

## 插件名称

`MeshBVHPlugin`

:::tip
可以使用枚举：`MESH_BVH_PLUGIN`
:::

## 插件依赖

无

## 插件传参

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
  /**可视化显示bvh */
  visualizer?: boolean;
  /**自定义形状检测规则 */
  shapecast?: CastOptions;
}
```

## 引擎拓展

```ts
export interface MeshBVHEngine extends Engine {
  /**bvh管理器 */
  meshBVHManager: MeshBVHManager;
  /**添加bvh */
  addBVH: (mesh: Mesh) => MeshBVHEngine;
}
```
