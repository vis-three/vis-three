import { BufferGeometry, DodecahedronBufferGeometry, Material, Points, PointsMaterial } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { PointsConfig } from "./PointsConfig";

export interface PointsCompilerTarget extends ObjectCompilerTarget<PointsConfig> {
  [key: string]: PointsConfig
}

export interface PointsCompilerParameters extends ObjectCompilerParameters<PointsConfig, PointsCompilerTarget> {}

export class PointsCompiler extends ObjectCompiler<PointsConfig, PointsCompilerTarget, Points> {

  COMPILER_NAME = MODULETYPE.POINTS

  private replaceMaterial = new PointsMaterial({color: 'rgb(150, 150, 150)'})
  private replaceGeometry = new DodecahedronBufferGeometry(5)

  constructor (parameters?: PointsCompilerParameters) {
    super(parameters)
  }

  getReplaceMaterial (): Material {
    return this.replaceMaterial
  }

  getReplaceGeometry (): BufferGeometry {
    return this.replaceGeometry
  }

  add (vid: string, config: PointsConfig): this {
    const object = new Points(this.getGeometry(config.geometry), this.getMaterial(config.material))

    Compiler.applyConfig(config, object, {
      geometry: true,
      material: true,
      lookAt: true
    })

    this.map.set(vid, object)
    this.weakMap.set(object, vid)

    this.setLookAt(vid, config.lookAt)

    this.scene.add(object)
    return this
  }

  set (vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(`PointsCompiler: can not found this vid mapping object: '${vid}'`)
      return this
    }

    let mesh = this.map.get(vid)!

    if (key === 'lookAt') {
      return this.setLookAt(vid, value)
    }

    if (key === 'material') {
      mesh.material = this.getMaterial(value)
      return this
    }

    for (let key of path) {
      mesh = mesh[key]
    }

    mesh[key] = value

    return this
  }

  dispose (): this {
    super.dispose()
    this.replaceGeometry.dispose()
    this.replaceMaterial.dispose()
    return this
  }
}