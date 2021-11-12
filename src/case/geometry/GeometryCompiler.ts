import { Box3, BoxBufferGeometry, BufferGeometry, Euler, Matrix4, Quaternion, SphereBufferGeometry, Vector3 } from "three";
import { validate } from "uuid";
import { LoadGeometry } from "../../extends/geometry/LoadGeometry";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { AnchorConfig, BoxGeometryConfig, GeometryAllType, LoadGeometryConfig, SphereGeometryConfig } from "./GeometryConfig";

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
  private constructMap: Map<string, (config: unknown) => BufferGeometry>
  private resourceMap: Map<string, unknown>
  private replaceGeometry: BufferGeometry

  constructor (parameters: GeometryCompilerParameters) {
    super()
    this.target = parameters.target
    this.map = new Map()

    const constructMap = new Map()

    constructMap.set('BoxBufferGeometry', (config: BoxGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new BoxBufferGeometry(
        config.width,
        config.height,
        config.depth,
        config.widthSegments,
        config.heightSegments,
        config.depthSegments
      ), config.anchor)
    })

    constructMap.set('SphereBufferGeometry', (config: SphereGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new SphereBufferGeometry(
        config.radius,
        config.widthSegments,
        config.heightSegments,
        config.phiStart,
        config.phiLength,
        config.thetaStart,
        config.thetaLength
      ), config.anchor)
    })

    constructMap.set('LoadBufferGeometry', (config: LoadGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new LoadGeometry(
        this.getRescource(config.url)
      ), config.anchor)
    })

    this.constructMap = constructMap
    this.resourceMap = new Map()

    this.replaceGeometry = new BoxBufferGeometry(10, 10, 10)
  }

  linkRescourceMap (map: Map<string, unknown>): this {
    this.resourceMap = map
    return this
  }

  private getRescource (url: string): BufferGeometry {
    if (! this.resourceMap.has(url)) {
      console.error(`rescoure can not found url: ${url}`)
      return this.replaceGeometry.clone()
    }

    if (this.resourceMap.has(url) && this.resourceMap.get(url) instanceof BufferGeometry) {
      const geometry = this.resourceMap.get(url)! as BufferGeometry
      return geometry.clone()
    } else {
      console.error(`url mapping rescource is not class with BufferGeometry: ${url}`)
      return this.replaceGeometry.clone()
    }
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
        const geometry = this.constructMap.get(config.type)!(config)
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