import { BufferGeometry, Color, Float32BufferAttribute, LineSegments, Mesh, MeshBasicMaterial, OctahedronBufferGeometry, Sphere, Vector3 } from "three";
import { getHelperLineMaterial } from "../common";
export class PointLightHelper extends LineSegments {
    sphere;
    target;
    shape;
    type = 'VisPointLightHelper';
    cachaColor;
    cachaDistance;
    constructor(pointLight) {
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
        const color = new Color().copy(pointLight.color).multiplyScalar(pointLight.intensity);
        const shape = new Mesh(new OctahedronBufferGeometry(pointLight.distance, 0), new MeshBasicMaterial({
            color,
            wireframe: true
        }));
        shape.raycast = () => { };
        this.shape = shape;
        this.target = pointLight;
        this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
        this.cachaColor = pointLight.color.getHex();
        this.cachaDistance = pointLight.distance;
        this.add(this.shape);
        this.matrixAutoUpdate = false;
        this.matrix = pointLight.matrix;
        // https://github.com/mrdoob/three.js/issues/14970
        this.onBeforeRender = () => {
            const light = this.target;
            const shape = this.shape;
            const scource = this;
            if (light.distance !== this.cachaDistance) {
                shape.geometry.dispose();
                shape.geometry = new OctahedronBufferGeometry(light.distance, 0);
                this.cachaDistance = light.distance;
            }
            if (light.color.getHex() !== this.cachaColor) {
                shape.material.color.copy(light.color).multiplyScalar(light.intensity);
                scource.material.color.copy(light.color).multiplyScalar(light.intensity);
                this.cachaColor = light.color.getHex();
            }
        };
    }
    raycast(raycaster, intersects) {
        const matrixWorld = this.matrixWorld;
        const sphere = this.sphere;
        sphere.applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsSphere(sphere)) {
            const target = this.target;
            intersects.push({
                distance: raycaster.ray.origin.distanceTo(target.position),
                object: target,
                point: target.position
            });
        }
    }
}
//# sourceMappingURL=PointLightHelper.js.map