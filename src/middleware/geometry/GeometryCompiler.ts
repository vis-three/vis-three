import { Box3, BoxBufferGeometry, BufferGeometry, CircleBufferGeometry, ConeBufferGeometry, CylinderBufferGeometry, EdgesGeometry, Euler, Matrix4, PlaneBufferGeometry, Quaternion, SphereBufferGeometry, Vector3 } from "three";
import { validate } from "uuid";
import { LoadGeometry } from "../../extends/geometry/LoadGeometry";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { BoxGeometryConfig, CircleGeometryConfig, ConeGeometryConfig, CylinderGeometryConfig, EdgesGeometryConfig, GeometryAllType, LoadGeometryConfig, PlaneGeometryConfig, SphereGeometryConfig } from "./GeometryConfig";
import { CONFIGTYPE } from "../constants/configType";

export interface GeometryCompilerTarget extends CompilerTarget {
  [key: string]: GeometryAllType
}

export interface GeometryCompilerParameters {
  target: GeometryCompilerTarget
}

export class GeometryCompiler extends Compiler {
  // 变换锚点
  static transfromAnchor = function (geometry: BufferGeometry, config: GeometryAllType): BufferGeometry {
    geometry.center()
    !geometry.boundingBox && geometry.computeBoundingBox()
    const box: Box3 = geometry.boundingBox!
    const position = config.position
    const rotation = config.rotation
    const scale = config.scale
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

    constructMap.set(CONFIGTYPE.BOXGEOMETRY, (config: BoxGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new BoxBufferGeometry(
        config.width,
        config.height,
        config.depth,
        config.widthSegments,
        config.heightSegments,
        config.depthSegments
      ), config)
    })

    constructMap.set(CONFIGTYPE.SPHEREGEOMETRY, (config: SphereGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new SphereBufferGeometry(
        config.radius,
        config.widthSegments,
        config.heightSegments,
        config.phiStart,
        config.phiLength,
        config.thetaStart,
        config.thetaLength
      ), config)
    })

    constructMap.set(CONFIGTYPE.PLANEGEOMETRY, (config: PlaneGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new PlaneBufferGeometry(
        config.width,
        config.height,
        config.widthSegments,
        config.heightSegments
      ), config)
    })

    constructMap.set(CONFIGTYPE.LOADGEOMETRY, (config: LoadGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new LoadGeometry(
        this.getGeometry(config.url)
      ), config)
    })

    constructMap.set(CONFIGTYPE.CIRCLEGEOMETRY, (config: CircleGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new CircleBufferGeometry(
        config.radius,
        config.segments,
        config.thetaStart,
        config.thetaLength
      ), config)
    })

    constructMap.set(CONFIGTYPE.CONEGEOMETRY, (config: ConeGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new ConeBufferGeometry(
        config.radius,
        config.height,
        config.radialSegments,
        config.heightSegments,
        config.openEnded,
        config.thetaStart,
        config.thetaLength,
      ), config)
    })

    constructMap.set(CONFIGTYPE.CYLINDERGEOMETRY, (config: CylinderGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new CylinderBufferGeometry(
        config.radiusTop,
        config.radiusBottom,
        config.height,
        config.radialSegments,
        config.heightSegments,
        config.openEnded,
        config.thetaStart,
        config.thetaLength,
      ), config)
    })

    constructMap.set(CONFIGTYPE.EDGESGEOMETRY, (config: EdgesGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(new EdgesGeometry(
        this.map.get(config.url),
        config.thresholdAngle
      ), config)
    })

    this.constructMap = constructMap
    this.resourceMap = new Map()

    this.replaceGeometry = new BoxBufferGeometry(5, 5, 5)
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

  private getGeometry (url: string): BufferGeometry {
    if (this.map.has(url)) {
      return this.map.get(url)!
    }

    return this.getRescource(url)
  }
 
  getMap (): Map<SymbolConfig['vid'], BufferGeometry> {
    return this.map
  }

  setTarget (): this {
    return this
  }

  add (vid: string, config: GeometryAllType): this {
    if (config.type && this.constructMap.has(config.type)) {
      const geometry = this.constructMap.get(config.type)!(config)
      this.map.set(vid, geometry)
    }
    return this
  }

  // 几何的set是重新生成几何然后clone或者copy
  set (vid: string, path: string[], value: any): this {
    if (!validate(vid)) {
      console.warn(`geometry compiler set function vid parameters is illeage: '${vid}'`)
      return this
    }

    if (!this.map.has(vid)) {
      console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`)
      return this
    }

    const currentGeometry = this.map.get(vid)!
    const config = this.target[vid]
    const newGeometry = this.constructMap.get(config.type)!(config)
    currentGeometry.copy(newGeometry)
    // 辅助的更新根据uuid的更新而更新，直接copy无法判断是否更新
    // TODO: 使用dispatch通知更新
    currentGeometry.uuid = newGeometry.uuid
    newGeometry.dispose()

    return this
  }

  remove (vid: string): this {
    if (!this.map.has(vid)) {
      console.warn(`Geometry Compiler: can not found vid in compiler: ${vid}`)
      return this
    }

    const geometry = this.map.get(vid)!

    geometry.dispose()

    this.map.delete(vid)
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
    this.map.forEach((geometry, vid) => {
      geometry.dispose()
    })
    return this
  }
}