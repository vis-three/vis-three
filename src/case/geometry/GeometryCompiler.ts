import { Box3, BoxBufferGeometry, BufferGeometry, Euler, Matrix4, Quaternion, Vector3 } from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { AnchorConfig, BoxGeometryConfig, GeometryAllType } from "./GeometryConfig";

export interface GeometryCompilerTarget extends CompilerTarget {
  [key: string]: GeometryAllType
}

export interface GeometryCompilerParameters {
  target: GeometryCompilerTarget
}

export class GeometryCompiler extends Compiler {
  // 变换锚点
  static transfromAnchor = function (geometry: BufferGeometry, anchor: AnchorConfig): BufferGeometry {
    geometry.center()
    !geometry.boundingBox && geometry.computeBoundingBox()
    const box: Box3 = geometry.boundingBox!
    const position = anchor.position
    const rotation = anchor.rotation
    const scale = anchor.scale
    const materix = new Matrix4()
    const vPostion = new Vector3(
      (box.max.x - box.min.x) / 2 * position.x,
      (box.max.y - box.min.y) / 2 * position.y,
      (box.max.z - box.min.z) / 2 * position.z
    )
    const quaternion = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z, 'XYZ'))
    const vScale = new Vector3(scale.x, scale.y, scale.z)

    materix.compose(vPostion, quaternion, vScale)
    geometry.applyMatrix4(materix)
    return geometry
  }

  private target: GeometryCompilerTarget
  private map: Map<SymbolConfig['vid'], BufferGeometry>
  private constructMap: Map<string, () => BufferGeometry>

  constructor (parameters: GeometryCompilerParameters) {
    super()
    this.target = parameters.target
    this.map = new Map()

    const constructMap = new Map()
    constructMap.set('BoxBufferGeometry', (config: BoxGeometryConfig) => {
      const geometry = new BoxBufferGeometry(
        config.width,
        config.height,
        config.depth,
        config.widthSegments,
        config.heightSegments,
        config.depthSegments
      )
      return GeometryCompiler.transfromAnchor(geometry, config.anchor)
    })

    this.constructMap = constructMap
  
  }

  getMap (): Map<SymbolConfig['vid'], BufferGeometry> {
    return this.map
  }

  setTarget (): this {
    return this
  }

  add (vid: string, config: GeometryAllType): this {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const geometry = this.constructMap[config.type](config)
        this.map.set(vid, geometry)
      }
    } else {
      console.error(`geometry vid parameter is illegal: ${vid}`)
    }
    return this
  }

  compileAll (): this {
    const target = this.target
    for (const key in target) {
      this.add(key, target[key])
    }
    return this
  }

  dispose (): this {
    return this
  }
}