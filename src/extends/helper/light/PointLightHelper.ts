import { BufferGeometry, Color, Float32BufferAttribute, Intersection, Line, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, Object3D, OctahedronBufferGeometry, PointLight, Points, Raycaster, Sphere, SphereBufferGeometry, Vector3 } from "three";
import { getHelperLineMaterial, VisHelper } from "../common";

export class PointLightHelper extends LineSegments implements VisHelper{
    sphere: Sphere
    target: PointLight
    shape: Mesh
    type: string = 'VisPointLightHelper'
    
    private cacheColor: number
    private cacheDistance: number
    private cacheVector3: Vector3
    
  //TODO: 手动更新api，自动更新api，support更新
  constructor (pointLight: PointLight) {
    super()
    // 光源
    this.geometry = new BufferGeometry()
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
    this.geometry.setAttribute('position', new Float32BufferAttribute(points, 3))
    this.material = getHelperLineMaterial()
    this.geometry.boundingSphere
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
    shape.matrixAutoUpdate = false

    this.shape = shape
    this.target = pointLight
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1)
    this.cacheColor = pointLight.color.getHex()
    this.cacheDistance = pointLight.distance
    this.cacheVector3 = new Vector3()

    this.add(this.shape)

    this.matrixAutoUpdate = false
    this.matrix = pointLight.matrix
    this.matrixWorldNeedsUpdate = false
    this.matrixWorld = pointLight.matrixWorld
    

    // TODO: compiler触发eventDistpatch
    this.onBeforeRender = () => {
      const light = this.target
      const shape = this.shape
      if (light.distance !== this.cacheDistance) {
        shape.geometry.dispose()
        shape.geometry = new OctahedronBufferGeometry(light.distance, 0)
        this.cacheDistance = light.distance
      }

      if (light.color.getHex() !== this.cacheColor) {
        (shape.material as MeshBasicMaterial).color.copy(light.color).multiplyScalar(light.intensity);
        this.cacheColor = light.color.getHex()
      } 
    }
  }


  raycast (raycaster: Raycaster, intersects: Intersection[]) {
    
    const target = this.target
    const matrixWorld = target.matrixWorld
    const sphere = this.sphere
    
    sphere.set(this.cacheVector3.set(0, 0, 0), 1)
    sphere.applyMatrix4(matrixWorld)

    if (raycaster.ray.intersectsSphere(sphere)) {
      
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      })
    }
  }
}