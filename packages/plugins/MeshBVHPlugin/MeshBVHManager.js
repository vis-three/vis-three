import { BufferAttribute, BufferGeometry, Mesh } from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshBVH, MeshBVHVisualizer, } from "three-mesh-bvh";
const tempBufferGeometry = new BufferGeometry();
tempBufferGeometry.setAttribute("position", new BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0]), 3));
export class MeshBVHManager {
    bvh = new MeshBVH(tempBufferGeometry);
    visualizer;
    castOptions = {
        intersectsBounds: (box) => false,
        intersectsTriangle: () => { },
    };
    addBVH(mesh) {
        const geometry = mesh.geometry.clone();
        geometry.applyMatrix4(mesh.matrixWorld);
        for (const key in geometry.attributes) {
            if (key !== "position") {
                geometry.deleteAttribute(key);
            }
        }
        this.bvh = new MeshBVH(BufferGeometryUtils.mergeBufferGeometries([this.bvh.geometry, geometry]));
        this.bvh.geometry.boundsTree = this.bvh;
        if (this.visualizer) {
            // @ts-ignore
            this.visualizer.mesh.geometry = this.bvh.geometry;
            this.visualizer.update();
        }
    }
    createVisualizer() {
        this.visualizer = new MeshBVHVisualizer(new Mesh(this.bvh.geometry));
        return this;
    }
    shapecast(options) {
        return this.bvh.shapecast(options || this.castOptions);
    }
    dispose() {
        //@ts-ignore
        this.visualizer?.dispose();
        this.bvh.geometry.dispose();
    }
}
