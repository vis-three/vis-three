import { Material, PlaneBufferGeometry, Scene, Sprite, SpriteMaterial } from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget, ObjectCompiler } from "../../core/Compiler";
import { SymbolConfig, Vector2Config } from "../common/CommonConfig";
import { SpriteConfig } from "./SpriteConfig";

export interface SpriteCompilerTarget extends CompilerTarget {
  [key: string]: SpriteConfig
}

export interface SpriteCompilerParameters {
  target:  SpriteCompilerTarget
  scene: Scene
}

interface ReplaceGeometryParameters {
  sprite: Sprite
  width?: number
  height?: number
}

export class SpriteCompiler extends Compiler implements ObjectCompiler {

  private target!: SpriteCompilerTarget
  private scene!: Scene
  private map: Map<SymbolConfig['vid'], Sprite>
  private weakMap: WeakMap<Sprite, SymbolConfig['vid']>
  private materialMap: Map<string, Material>

  constructor (parametes?: SpriteCompilerParameters) {
    super()
    if (parametes) {
      parametes.target && (this.target = parametes.target)
      parametes.scene && (this.scene = parametes.scene)
    } else {
      this.target = {}
    }

    this.map = new Map()
    this.weakMap = new WeakMap()
    this.materialMap = new Map()
  }

  private getReplaceMaterial (): SpriteMaterial {
    return new SpriteMaterial({
      color: 'rgb(150, 150, 150)'
    })
  }

   // 获取材质
   private getMaterial (vid: string): SpriteMaterial {
    if (validate(vid)) {
      if (this.materialMap.has(vid) ) {
        const material = this.materialMap.get(vid)!
        if (material instanceof SpriteMaterial) {
          return material
        } else {
          console.warn(`vid mapping material not instanceof SpriteMaterial. vid: ${vid}, material: ${material}`)
          return this.getReplaceMaterial()
        }
        
      } else {
        console.warn(`can not found material which vid: ${vid}`)
        return this.getReplaceMaterial()
      }
    } else {
      console.warn(`material vid parameter is illegal: ${vid}`)
      return this.getReplaceMaterial()
    }
  }

  private replaceGeometry (params: ReplaceGeometryParameters): this {
    const oldGeometry = params.sprite.geometry
    if (!params.height) {
      if (oldGeometry instanceof PlaneBufferGeometry) {
        params.height = oldGeometry.parameters.height
      }
    }

    if (!params.width) {
      if (oldGeometry instanceof PlaneBufferGeometry) {
        params.width = oldGeometry.parameters.width
      }
    }

    const plane = new PlaneBufferGeometry(params.width, params.height)
    oldGeometry.dispose()
    params.sprite.geometry = plane
    return this
  }

  linkMaterialMap (materialMap: Map<string, Material>): this {
    this.materialMap = materialMap
    return this
  }

  getSupportVid(object: Sprite):SymbolConfig['vid'] | null{
    if (this.weakMap.has(object)) {
      return this.weakMap.get(object)!
    } else {
      return null
    }
  }

  add (vid: string, config: SpriteConfig): this {
    if (!validate(vid)) {
      console.log(`Sprite compiler vid is illeage: ${vid}`)
      return this
    }

    const sprite = new Sprite()
    this.replaceGeometry({
      sprite,
      width: config.width,
      height: config.height
    })

    sprite.material = this.getMaterial(config.material)

    sprite.center.set(config.center.x, config.center.y)

    this.map.set(vid, sprite)
    this.weakMap.set(sprite, vid)

    this.scene.add(sprite)
    return this
  }

  set (vid: string, path: string[], key: string, value: any): this {
    if (!validate(vid)) {
      console.warn(`sprite compiler vid is illegal: '${vid}'`)
      return this
    }

    if (!this.map.has(vid)) {
      console.warn(`sprite compiler can not found this vid mapping object: '${vid}'`)
      return this
    }

    let sprite = this.map.get(vid)!
    if (key === 'material') {
      sprite.material = this.getMaterial(vid)
      return this
    }

    if (key === 'width' || key === 'height') {
      this.replaceGeometry({
        sprite,
        [key]: value
      })
      return this
    }

    path.forEach((key, i, arr) => {
      sprite = sprite[key]
    })
    sprite[key] = value

    return this
  }

  remove () {}

  getMap (): Map<SymbolConfig['vid'], Sprite> {
    return this.map
  }

  setTarget (target: SpriteCompilerTarget): this {
    this.target = target
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