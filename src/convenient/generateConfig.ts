import { getAmbientLightConfig, getSpotLightConfig, getPointLightConfig} from "../case/light/LightConfig"
import { getBoxGeometryConfig, getSphereGeometryConfig, getLoadGeometryConfig } from "../case/geometry/GeometryConfig"
import { getModelConfig } from "../case/model/ModelConfig"
import { getImageTextureConfig } from "../case/texture/TextureConfig"
import { getMeshStandardMaterialConfig } from "../case/material/MaterialConfig"

const typeMap: {[key: string]: Function} = {
  'ImageTexture': getImageTextureConfig,

  'MeshStandardMaterial': getMeshStandardMaterialConfig,

  'AmbientLight': getAmbientLightConfig,
  'SpotLight': getSpotLightConfig,
  'PointLight': getPointLightConfig,

  'BoxBufferGeometry': getBoxGeometryConfig,
  'SphereBufferGeometry': getSphereGeometryConfig,
  'LoadBufferGeometry': getLoadGeometryConfig,

  'Model': getModelConfig,
}


export const generateConfig = function<C> (type: string, merge: object): C | null {
  if (typeMap[type]) {
    const recursion = (config: C, merge: object) => {
      for (const key in merge) {
        if (config[key] === undefined) {
          console.warn(`'${type}' config can not set key: ${key}`)
          continue
        }
        if (typeof merge[key] === 'object' && merge[key] !== null) {
          recursion(config[key], merge[key])
        } else {
          config[key] = merge[key]
        }
      }
    }
    const initConfig = typeMap[type]()
    recursion(initConfig, merge)
    return initConfig

  } else {
    console.error(`type: ${type} can not be found in configList.`)
    return null
  }
}