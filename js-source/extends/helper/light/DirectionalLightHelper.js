import { BufferGeometry, Color, EdgesGeometry, Float32BufferAttribute, LineBasicMaterial, LineSegments, PlaneBufferGeometry, Sphere, Vector3 } from "three";
import { getHelperLineMaterial } from "../common";
export class DirectionalLightHelper extends LineSegments {
    sphere;
    target;
    shape;
    type = 'VisDirectionalLightHelper';
    cacheColor;
    cacheVector3;
    constructor(directionalLight) {
        super();
        // 光源
        this.geometry = new BufferGeometry();
        const points = [
            -1, 0, 0,
            1, 0, 0,
            0, -1, 0,
            0, 1, 0,
            0, 0, -1,
            0, 0, 1,
            -0.707, -0.707, 0,
            0.707, 0.707, 0,
            0.707, -0.707, 0,
            -0.707, 0.707, 0,
            0, -0.707, -0.707,
            0, 0.707, 0.707,
            0, 0.707, -0.707,
            0, -0.707, 0.707,
            -0.707, 0, -0.707,
            0.707, 0, 0.707,
            0.707, 0, -0.707,
            -0.707, 0, 0.707,
        ];
        this.geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
        this.material = getHelperLineMaterial();
        this.geometry.boundingSphere;
        // 形状
        const color = new Color().copy(directionalLight.color).multiplyScalar(directionalLight.intensity);
        const planeGemetry = new PlaneBufferGeometry(20, 20);
        planeGemetry.dispose();
        const shape = new LineSegments(new EdgesGeometry(planeGemetry), new LineBasicMaterial({
            color
        }));
        shape.raycast = () => { };
        this.shape = shape;
        this.target = directionalLight;
        this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
        this.cacheColor = directionalLight.color.getHex();
        this.cacheVector3 = new Vector3();
        this.add(this.shape);
        this.matrixAutoUpdate = false;
        this.matrix = directionalLight.matrix;
        this.matrixWorldNeedsUpdate = false;
        this.matrixWorld = directionalLight.matrixWorld;
        // TODO: compiler触发eventDistpatch
        this.onBeforeRender = () => {
            const light = this.target;
            const shape = this.shape;
            if (light.color.getHex() !== this.cacheColor) {
                shape.material.color.copy(light.color).multiplyScalar(light.intensity);
                this.cacheColor = light.color.getHex();
            }
            shape.lookAt(light.target.position);
        };
    }
    raycast(raycaster, intersects) {
        const target = this.target;
        const matrixWorld = target.matrixWorld;
        const sphere = this.sphere;
        sphere.set(this.cacheVector3.set(0, 0, 0), 1);
        sphere.applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsSphere(sphere)) {
            intersects.push({
                distance: raycaster.ray.origin.distanceTo(target.position),
                object: target,
                point: target.position
            });
        }
    }
}
//# sourceMappingURL=DirectionalLightHelper.js.map