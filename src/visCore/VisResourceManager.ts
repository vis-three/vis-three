import { BaseEvent, BufferGeometry, EventDispatcher, Group, Material, Mesh, Object3D, Texture } from "three";


export interface ModelMappingUrlConfig {
  type: string
  geometry?: string
  material?: string | string[]
  children?: ModelMappingUrlConfig[]
}

export interface MappedEvent extends BaseEvent {
  mappingResourceMap: Map<string, unknown>
  configMappingMap: Map<string, unknown>
}

export enum VisResourceManagerEventType {
  MAPPED = 'mapped'
}

// TODO: 枚举贴图类型，几何类型，材质类型
export class VisResourceManager extends EventDispatcher<MappedEvent> {

  private mappingResourceMap: Map<string, unknown> = new Map() // mappingUrl -> source
  private configMappingMap: Map<string, unknown> = new Map() // url -> config -> mappingUrl

  constructor () {
    super()
  }

  mappingResource (resourceMap: Map<string, unknown>): this {

    const mappingResourceMap = this.mappingResourceMap
    const configMappingMap = this.configMappingMap

    // 递归映射物体
    const recursionMappingObject = function (url: string, object: Object3D): ModelMappingUrlConfig {
      // TODO: 区分灯光相机等物体
      const config: ModelMappingUrlConfig = {
        type: `Vis${object.type}`
      }

      let mappingUrl = ''

      // 映射几何配置
      if ((object as Mesh).geometry) {
        // TODO: 获取锚点位置
        mappingUrl = `${url}.geometry`
        mappingResourceMap.set(mappingUrl, (object as Mesh).geometry)
        config.geometry = mappingUrl
      }

      // 映射材质配置 TODO: 映射贴图配置
      if ((object as Mesh).material) {
        // TODO: 获取材质的参数
        const material = (object as Mesh).material
        if (material instanceof Array) {
          config.material = [] as string[]
          material.forEach((materialChild, i, arr) => {
            mappingUrl = `${url}.material.${i}`
            mappingResourceMap.set(mappingUrl, materialChild);
            (config.material as string[])[i] = mappingUrl
          })
        } else {
          mappingUrl = `${url}.material`
          mappingResourceMap.set(mappingUrl, material);
          (config.material as string) = mappingUrl
        }
      }

      // 映射子项配置
      if (object.children.length) {
        object.children.forEach((child, i, arr) => {
          mappingUrl = `${url}.children.${i}`
          config.children![i] = recursionMappingObject(mappingUrl, child)
        })
      }

      return config
    }

    resourceMap.forEach((resource, url) => {
      if (resource instanceof Texture) {
        mappingResourceMap.set(url, resource)
        // this.configMappingMap.set(url, )
      } else if (resource instanceof Object3D) {
        configMappingMap.set(url, recursionMappingObject(url, resource))
      }
    })

    this.dispatchEvent({
      type: 'mapped',
      mappingResourceMap: this.mappingResourceMap,
      configMappingMap: this.configMappingMap
    })
    return this
  }

// TODO: 枚举贴图类型，几何类型，材质类型
  getResource (mappingUrl: string): unknown {
    return this.mappingResourceMap.get(mappingUrl)
  }

// TODO: 枚举贴图类型，几何类型，材质类型
  getConfig (url: string): unknown {
    return this.configMappingMap.get(url)
  }


  // TODO: dispose
  dispose () {}
}