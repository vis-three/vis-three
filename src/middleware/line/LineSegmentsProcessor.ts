import { BufferAttribute, BufferGeometry, Camera, Float32BufferAttribute, InterleavedBufferAttribute, LineSegments, Object3D, Scene, Vector3, WebGLRenderer } from "three";
import { validate } from "uuid";
import { Vector3Config } from "../common/CommonConfig";
import { LineCompiler } from "./LineCompiler";
import { LineSegmentsConfig } from "./LineConfig";
import { Processor } from "./Processor";

export class LineSegmentsProcessor implements Processor {
  static replaceObject = new Object3D()

  private compiler: LineCompiler
  private cacheAutoUpdateMap = new WeakMap<Object3D, {index: number, position: Vector3}[]>()

  constructor (compiler: LineCompiler) {
    this.compiler = compiler
  }

  getObject (vid: string): Object3D {
    if (!validate(vid)) {
      console.warn(`LineSegmentsProcessor: vid is illeage: ${vid}`)
      return LineSegmentsProcessor.replaceObject
    }

    const object = this.compiler.getObject(vid)
    if (!object) {
      console.warn(`LineSegmentsProcessor: LineCompiler can not found object which vid: ${vid}`)
      return LineSegmentsProcessor.replaceObject
    }

    return object
  }

  add(config: LineSegmentsConfig): LineSegments {
    const lineSegments = new LineSegments(undefined, this.compiler.getMaterial(config.material))

    const geometry = new BufferGeometry()

    const points: number[] = []
    const pairPoints = config.pairPoints

    // 找出pairPoints里面所有需要自动更新的点
    const autoUpdateList: {index: number, position: Vector3}[] = []
    let startPoint: Vector3Config | string
    let endPoint: Vector3Config | string

    pairPoints.forEach((pair, i) => {
      startPoint = pair[0]
      endPoint = pair[1]

      if (typeof startPoint === 'string') {
        const position = this.getObject(startPoint).position
        autoUpdateList.push({
          index: i * 2,
          position
        })
        startPoint = position
      }

      if (typeof endPoint === 'string') {
        const position = this.getObject(endPoint).position
        autoUpdateList.push({
          index: i * 2 + 1,
          position
        })
        endPoint = position
      }

      points.push(startPoint.x, startPoint.y, startPoint.z, endPoint.x, endPoint.y, endPoint.z)
    })

    geometry.setAttribute('position', new Float32BufferAttribute(points, 3))
    lineSegments.geometry.dispose()
    lineSegments.geometry = geometry

    // 判断自动更新列表是否有数据，有数据一起进行自动更新
    if (autoUpdateList.length) {
      this.cacheAutoUpdateMap.set(lineSegments, autoUpdateList)

      // 将原始方法缓存
      let needsUpdate = false
      let positionAttribute: BufferAttribute | InterleavedBufferAttribute
      lineSegments.onBeforeRender = (enderer: WebGLRenderer, scene: Scene, camera: Camera, geometry: BufferGeometry) => {
        positionAttribute = geometry.getAttribute('position')

        for (let elem of autoUpdateList) {
          if (elem.position.x !== positionAttribute.getX(elem.index)) {
            positionAttribute.setX(elem.index, elem.position.x)
            needsUpdate = true
          }

          if (elem.position.y !== positionAttribute.getY(elem.index)) {
            positionAttribute.setY(elem.index, elem.position.y)
            needsUpdate = true
          }

          if (elem.position.z !== positionAttribute.getZ(elem.index)) {
            positionAttribute.setZ(elem.index, elem.position.z)
            needsUpdate = true
          }
        }

        if (needsUpdate) {
          positionAttribute.needsUpdate = true
        }
      }
    }

    return lineSegments
  }

  set() {}
}