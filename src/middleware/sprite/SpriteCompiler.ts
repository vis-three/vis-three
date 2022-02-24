import { BufferGeometry, Material, PlaneBufferGeometry, Sprite, SpriteMaterial } from "three";
import { validate } from "uuid";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";

export interface SpriteCompilerTarget extends ObjectCompilerTarget<SpriteConfig> {
  [key: string]: SpriteConfig
}

export interface SpriteCompilerParameters extends ObjectCompilerParameters<SpriteConfig, SpriteCompilerTarget>  {}

export class SpriteCompiler extends ObjectCompiler<SpriteConfig, SpriteCompilerTarget, Sprite> {

  COMPILER_NAME: string = MODULETYPE.SPRITE

  private replaceMaterial = new SpriteMaterial({color: 'rgb(150, 150, 150)'})
  private replaceGeometry = new PlaneBufferGeometry(10, 10, 10)

  constructor (parametes?: SpriteCompilerParameters) {
    super(parametes)
  }

  getReplaceMaterial (): SpriteMaterial {
    return this.replaceMaterial
  }

  getReplaceGeometry (): BufferGeometry {
    console.warn(`SpriteCompiler: can not use geometry in SpriteCompiler.`)
    return this.replaceGeometry
  }

  private getSpriteMaterial (vid: string): SpriteMaterial {
    const tempMaterial = this.getMaterial(vid)

    if (tempMaterial instanceof SpriteMaterial) {
      return tempMaterial
    } else {
      console.warn(`SpriteCompiler: sprite object can not support this type material: ${tempMaterial.type}, vid: ${vid}.`)
      return this.getReplaceMaterial()
    }
  }

  add (vid: string, config: SpriteConfig): this {
    const sprite = new Sprite()

    this.map.set(vid, sprite)
    this.weakMap.set(sprite, vid)

    sprite.material = this.getSpriteMaterial(config.material)
    

    sprite.center.set(config.center.x, config.center.y)

    Compiler.applyConfig(config, sprite, {
      center: true,
      material: true
    })

    this.scene.add(sprite)
    return this
  }

  set (vid: string, path: string[], key: string, value: any): this {

    if (!this.map.has(vid)) {
      console.warn(`SpriteCompiler: can not found this vid mapping object: '${vid}'`)
      return this
    }

    let sprite = this.map.get(vid)!

    if (key === 'material') {
      sprite.material = this.getSpriteMaterial(value)
      return this
    }

    if (key === 'lookAt') {
      return this.setLookAt(vid, value)
    }

    for (let key of path) {
      sprite = sprite[key]
    }

    sprite[key] = value

    return this
  }

  dispose (): this {
    this.map.forEach((sprite, vid) => {
      sprite.geometry.dispose()
    })
    super.dispose()
    this.replaceGeometry.dispose()
    this.replaceMaterial.dispose()
    return this
  }
}