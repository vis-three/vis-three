import { BufferGeometry, Color, Float32BufferAttribute, Intersection, Line, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, Object3D, OctahedronBufferGeometry, PointLight, Points, Raycaster, Sphere, SphereBufferGeometry, Vector3 } from "three";
import { getHelperLineMaterial } from "../common";

export class PointLightHelper extends Object3D{
    sphere: Sphere
    target: PointLight
    scource: LineSegments
    shape: Mesh
    cachaColor: number
    cachaDistance: number

  constructor (pointLight: PointLight) {
    super()
    // 光源
    const scourceGeometry = new BufferGeometry()
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
    ]
    scourceGeometry.setAttribute('position', new Float32BufferAttribute(points, 3))
    const scource = new LineSegments(scourceGeometry, getHelperLineMaterial())
    scource.raycast = () => {}

    // 形状
    const color = new Color().copy(pointLight.color).multiplyScalar(pointLight.intensity)
    const shape = new Mesh(
      new OctahedronBufferGeometry(pointLight.distance, 0),
      new MeshBasicMaterial({
        color,
        wireframe: true
      })
    )
    shape.raycast = () => {}

    this.shape = shape
    this.target = pointLight
    this.scource = scource
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1)
    this.cachaColor = pointLight.color.getHex()
    this.cachaDistance = pointLight.distance

    this.add(scource)
    this.add(this.shape)
    this.matrixAutoUpdate = false
    this.matrix = pointLight.matrix
    console.log(this)

    const cacheUpdateWorldMatrix = this.updateMatrixWorld.bind(this)
    this.updateMatrixWorld = function (focus?: boolean) {
      const light = this.target
      const shape = this.shape
      const scource = this.scource
      if (light.distance !== this.cachaDistance) {
        shape.geometry.dispose()
        shape.geometry = new OctahedronBufferGeometry(light.distance, 0)
        this.cachaDistance = light.distance
      }

      if (light.color.getHex() !== this.cachaColor) {
        (shape.material as MeshBasicMaterial).color.copy(light.color).multiplyScalar(light.intensity);
        (scource.material as LineBasicMaterial).color.copy(light.color).multiplyScalar(light.intensity)
        this.cachaColor = light.color.getHex()
      }
      cacheUpdateWorldMatrix(focus)
    }

    // https://github.com/mrdoob/three.js/issues/14970
    // this.onBeforeRender = () => {
    //   const light = this.target
    //   const shape = this.shape
    //   const scource = this.scource
    //   if (light.distance !== this.cachaDistance) {
    //     shape.geometry.dispose()
    //     shape.geometry = new OctahedronBufferGeometry(light.distance, 0)
    //     this.cachaDistance = light.distance
    //   }

    //   if (light.color.getHex() !== this.cachaColor) {
    //     (shape.material as MeshBasicMaterial).color.copy(light.color).multiplyScalar(light.intensity);
    //     (scource.material as LineBasicMaterial).color.copy(light.color).multiplyScalar(light.intensity)
    //     this.cachaColor = light.color.getHex()
    //   } 
    // }
  }


  raycast (raycaster: Raycaster, intersects: Intersection[]) {
    const matrixWorld = this.matrixWorld
    const sphere = this.sphere

    sphere.applyMatrix4(matrixWorld)

    if (raycaster.ray.intersectsSphere(sphere)) {
      const target = this.target
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      })
    }
  }
}