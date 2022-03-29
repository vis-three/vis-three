import { BaseEvent, Mesh, Object3D, Vector3 } from "three";
import { generateConfig } from "../convenient/generateConfig";
import { EventDispatcher } from "../core/EventDispatcher";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import {SymbolConfig} from '../middleware/common/CommonConfig';
import { getConfigModelMap } from "../utils/utils";
import { LoadGeometryConfig } from "../middleware/geometry/GeometryConfig";


export interface ObjectMappingStructure {
  type: string
  geometry?: string
  material?: string | string[]
  children?: ObjectMappingStructure[]
}

export interface MappedEvent extends BaseEvent {
  structureMap: Map<string, unknown>
  configMap: Map<string, unknown>
  resourceMap: Map<string, unknown>
}

export enum RESOURCEEVENTTYPE {
  MAPPED = 'mapped'
}

// TODO: 枚举贴图类型，几何类型，材质类型
export class ResourceManager extends EventDispatcher {

  structureMap: Map<string, unknown> = new Map() // 外部资源结构映射 url -> structure mappingUrl
  configMap: Map<string, unknown> = new Map() // 配置映射 mappingUrl -> config
  resourceMap: Map<string, unknown> = new Map() // 资源映射 mappingUrl -> resource

  constructor () {
    super()
  }

  // 映射资源
  mappingResource (loadResourceMap: Map<string, unknown>): this {

    const structureMap = this.structureMap
    const configMap = this.configMap
    const resourceMap = this.resourceMap

    // 递归映射物体
    const recursionMappingObject = function (url: string, object: Object3D): ObjectMappingStructure {
      // TODO: 区分灯光相机等物体
      const config: ObjectMappingStructure = {
        type: `${object.type}`
      }

      let mappingUrl = ''

      // 映射几何配置
      if ((object as Mesh).geometry) {
        const geometry = (object as Mesh).geometry
        geometry.computeBoundingBox()
        const box = geometry.boundingBox!
        const center = box.getCenter(new Vector3())
        // TODO: 获取锚点位置
        mappingUrl = `${url}.geometry`
        // 存资源
        resourceMap.set(mappingUrl, geometry)
        // 生成配置单        
        configMap.set(mappingUrl, generateConfig(CONFIGTYPE.LOADGEOMETRY, {
          url: mappingUrl,
          position: {
            x: center.x / (box.max.x - box.min.x) * 2,
            y: center.y / (box.max.y - box.min.y) * 2,
            z: center.z / (box.max.z - box.min.z) * 2,
          },
        })) 
        // 载入结构
        config.geometry = mappingUrl
      }

      // 映射材质配置 TODO: 映射贴图配置
      if ((object as Mesh).material) {
        const material = (object as Mesh).material

        if (material instanceof Array) {
          config.material = [] as string[]
          material.forEach((materialChild, i, arr) => {
            mappingUrl = `${url}.material.${i}`
            // 存资源
            resourceMap.set(mappingUrl, materialChild);
            // 生成配置单
            configMap.set(mappingUrl, generateConfig(materialChild.type, materialChild, true, false));
            // 载入结构
            (config.material as string[])[i] = mappingUrl
          })
        } else {
          mappingUrl = `${url}.material`
          // 存资源
          resourceMap.set(mappingUrl, material);
          // 生成配置单
          configMap.set(mappingUrl, generateConfig(material.type, material, true, false));
           // 载入结构
          (config.material as string) = mappingUrl
        }
      }

      // 映射子项配置
      if (object.children.length) {
        config.children = []
        object.children.forEach((child, i, arr) => {
          mappingUrl = `${url}.children.${i}`
          config.children![i] = recursionMappingObject(mappingUrl, child)
        })
      }

      return config
    }

    loadResourceMap.forEach((resource, url) => {
      // 图片贴图
      if (resource instanceof HTMLImageElement) {
        resourceMap.set(url, resource)
        configMap.set(url, generateConfig(CONFIGTYPE.IMAGETEXTURE, {
          url: url
        }))
        structureMap.set(url, url)
      // canvas贴图  
      } else if (resource instanceof HTMLCanvasElement) {
        resourceMap.set(url, resource)
        structureMap.set(url, url)
      // 物体  
      } else if (resource instanceof Object3D) {
        structureMap.set(url, recursionMappingObject(url, resource))
      }
    })

    this.dispatchEvent({
      type: 'mapped',
      structureMap,
      configMap,
      resourceMap
    })
    return this
  }

  // TODO: 根据strictureMap去清空configMap和resourceMap
  remove (url: string) {}

  // TODO: dispose
  dispose () {}
}