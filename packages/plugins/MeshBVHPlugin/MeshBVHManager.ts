import { Box3, BufferAttribute, BufferGeometry, Mesh } from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  MeshBVH,
  MeshBVHVisualizer,
  ShapecastIntersection,
  ExtendedTriangle,
} from "three-mesh-bvh";

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

const tempBufferGeometry = new BufferGeometry();

tempBufferGeometry.setAttribute(
  "position",
  new BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0]), 3)
);

export class MeshBVHManager {
  bvh: MeshBVH = new MeshBVH(tempBufferGeometry);
  visualizer?: MeshBVHVisualizer;

  castOptions: CastOptions = {
    intersectsBounds: (box) => false,
    intersectsTriangle: () => {},
  };

  addBVH(mesh: Mesh) {
    const geometry = mesh.geometry.clone();
    geometry.applyMatrix4(mesh.matrixWorld);

    for (const key in geometry.attributes) {
      if (key !== "position") {
        geometry.deleteAttribute(key);
      }
    }

    this.bvh = new MeshBVH(
      BufferGeometryUtils.mergeBufferGeometries([this.bvh.geometry, geometry])
    );

    this.bvh.geometry.boundsTree = this.bvh;

    if (this.visualizer) {
      // @ts-ignore
      this.visualizer.mesh.geometry = this.bvh.geometry;
      this.visualizer.update();
    }
  }

  createVisualizer(): this {
    this.visualizer = new MeshBVHVisualizer(new Mesh(this.bvh.geometry));
    return this;
  }

  shapecast(options?: CastOptions) {
    return this.bvh.shapecast(options || this.castOptions);
  }

  dispose() {
    //@ts-ignore
    this.visualizer?.dispose();
    this.bvh.geometry.dispose();
  }
}
