import { Box3, BufferGeometry, Camera, CameraHelper as TCameraHelper, Float32BufferAttribute, Intersection, LineSegments, Matrix4, OrthographicCamera, PerspectiveCamera, Raycaster } from "three";
import { getHelperLineMaterial, VisHelper } from "../common";

export class CameraHelper extends LineSegments implements VisHelper {

  shape: TCameraHelper
  target: Camera
  type: string = 'CameraHelper'

  private cachaData!: {[key: string]: number}

  constructor(camera: Camera) {
    super()
    const geometry = new BufferGeometry()
    // TODO:用顶点索引
    const positions = [
      0, 0, 0, -1, 1, -1,
      0, 0, 0, -1, 1, 1,
      0, 0, 0, -1, -1, -1,
      0, 0, 0, -1, -1, 1,
      -1, -1, 1, -1, -1, -1,
      -1, -1, -1, -1, 1, -1,
      -1, 1, -1, -1, 1, 1,
      -1, 1, 1, -1, -1, 1,

      0, 0, 0, 0, 1, 1,
      0, 0, 0, 0, 1, -1,
      0, 0, 0, 0, -1, -1,
      0, 0, 0, 0, -1, 1,

      0, 1, 1, 0, 1, -1,
      0, 1, -1, 0, -1, -1,
      0, -1, -1, 0, -1, 1,
      0, -1, 1, 0, 1, 1,

      0, -1, 1, 2, -1, 1,
      0, 1, -1, 2, 1, -1,
      0, -1, -1, 2, -1, -1,
      0, 1, 1, 2, 1, 1,
      2, 1, 1, 2, -1, 1,
      2, -1, 1, 2, -1, -1,
      2, -1, -1, 2, 1, -1,
      2, 1, -1, 2, 1, 1
    ]

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.rotateY(-90 * Math.PI / 180)
    geometry.computeBoundingBox()

    const shape = new TCameraHelper(camera)
    shape.matrix = new Matrix4()
    shape.matrixAutoUpdate = true
    shape.raycast = () => {}
    
    this.add(shape)
    this.shape = shape
    this.geometry = geometry
    this.material = getHelperLineMaterial()
    this.target = camera
    this.matrixAutoUpdate = false
    this.matrix = camera.matrix

    // 判断是什么相机缓存什么数据
    if (camera instanceof PerspectiveCamera) {
      this.cachaData = {
        fov: camera.fov,
        aspect: camera.aspect,
        near: camera.near,
        far: camera.far
      }

    } else if (camera instanceof OrthographicCamera) {
      this.cachaData = {
        left: camera.left,
        right: camera.right,
        top: camera.top,
        bottom: camera.bottom,
        near: camera.near,
        far: camera.far
      }
    } else {
      this.cachaData = {}
    }
    

    this.onBeforeRender = () => {
      // 循环对比有没有值更新
      let needsUpdate = false
      const cachaData = this.cachaData

      Object.keys(cachaData).forEach(key => {
        if (cachaData[key] !== camera[key]) {
          cachaData[key] = camera[key]
          needsUpdate = true
        }
      })

      needsUpdate && this.shape.update()
    }
    
  }

  raycast (raycaster: Raycaster, intersects: Intersection[]) {
    const matrixWorld = this.matrixWorld
    const box = this.geometry.boundingBox!.clone()

    box.applyMatrix4(matrixWorld)

    if (raycaster.ray.intersectsBox(box)) {
      const target = this.target
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      })
    }
  }
}