import { getAmbientLightConfig, getSpotLightConfig, getPointLightConfig} from "../middleware/light/LightConfig"
import { getBoxGeometryConfig, getSphereGeometryConfig, getLoadGeometryConfig } from "../middleware/geometry/GeometryConfig"
import { getModelConfig } from "../middleware/model/ModelConfig"
import { getImageTextureConfig } from "../middleware/texture/TextureConfig"
import { getMeshStandardMaterialConfig } from "../middleware/material/MaterialConfig"
import { getOrthographicCameraConfig, getPerspectiveCameraConfig } from "../middleware/camera/CameraConfig"
import { CONFIGTYPE } from "../middleware/constants/configType"
import { getWebGLRendererConfig } from "../middleware/render/RendererConfig"
import { getSceneConfig } from "../middleware/scene/SceneConfig"
import { getTransformControlsConfig } from "../middleware/controls/ControlsConfig"

const typeMap: {[key: string]: Function} = {
  [CONFIGTYPE.IMAGETEXTURE]: getImageTextureConfig,

  [CONFIGTYPE.MESHSTANDARDMATERIAL]: getMeshStandardMaterialConfig,

  [CONFIGTYPE.AMBIENTLIGHT]: getAmbientLightConfig,
  [CONFIGTYPE.SPOTLIGHT]: getSpotLightConfig,
  [CONFIGTYPE.POINTLIGHT]: getPointLightConfig,

  [CONFIGTYPE.BOXGEOMETRY]: getBoxGeometryConfig,
  [CONFIGTYPE.SPHEREGEOMETRY]: getSphereGeometryConfig,
  [CONFIGTYPE.LOADGEOMETRY]: getLoadGeometryConfig,

  [CONFIGTYPE.MODEL]: getModelConfig,
  [CONFIGTYPE.MESH]: getModelConfig,
  [CONFIGTYPE.LINE]: getModelConfig,
  [CONFIGTYPE.POINTS]: getModelConfig,

  [CONFIGTYPE.PERSPECTIVECAMERA]: getPerspectiveCameraConfig,
  [CONFIGTYPE.ORTHOGRAPHICCAMERA]: getOrthographicCameraConfig,

  [CONFIGTYPE.WEBGLRENDERER]: getWebGLRendererConfig,

  [CONFIGTYPE.SCENE]: getSceneConfig,

  [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig
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