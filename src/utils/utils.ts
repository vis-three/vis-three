import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { getAmbientLightConfig, getSpotLightConfig, getPointLightConfig, getDirectionalLightConfig} from "../middleware/light/LightConfig"
import { getBoxGeometryConfig, getSphereGeometryConfig, getLoadGeometryConfig, getPlaneGeometryConfig, getCircleGeometryConfig, getConeGeometryConfig, getCylinderGeometryConfig, getEdgesGeometryConfig } from "../middleware/geometry/GeometryConfig"
import { getCanvasTextureConfig, getCubeTextureConfig, getImageTextureConfig, getVideoTextureConfig } from "../middleware/texture/TextureConfig"
import { getLineBasicMaterialConfig, getMeshPhongMaterialConfig, getMeshStandardMaterialConfig, getPointsMaterialConfig, getSpriteMaterialConfig } from "../middleware/material/MaterialConfig"
import { getOrthographicCameraConfig, getPerspectiveCameraConfig } from "../middleware/camera/CameraConfig"
import { getWebGLRendererConfig } from "../middleware/renderer/RendererConfig"
import { getSceneConfig } from "../middleware/scene/SceneConfig"
import { getOrbitControlsConfig, getTransformControlsConfig } from "../middleware/controls/ControlsConfig"
import { getSpriteConfig } from "../middleware/sprite/SpriteConfig"
import { getEventConfig } from "../middleware/event/eventConfig";
import { getMeshConfig } from "../middleware/mesh/MeshConfig";
import { getPointsConfig } from "../middleware/points/PointsConfig";
import { getLineConfig } from "../middleware/line/LineConfig";
import { getGroupConfig } from "../middleware/group/GroupConfig";


export function isValidKey(key: string | number | symbol , object: object): key is keyof typeof object {
  return key in object;
}

export function isValidEnum (enumeration: object, value: string | number): boolean {
  return Object.values(enumeration).includes(value)
}

export function generateConfigFunction<T extends object> (config: T) {
  return (merge: T): T => {
    const recursion = (config: object, merge: object) => {
      for (const key in merge) {
        if (config[key] === undefined) {
          console.warn(` config can not set key: ${key}`)
          continue
        }
        if (typeof merge[key] === 'object' && merge[key] !== null && !Array.isArray(merge[key])) {
          recursion(config[key], merge[key])
        } else {
          config[key] = merge[key]
        }
      }
    }
    if (merge) {
      recursion(config, merge)
    }
    return config
  }
}


export function getConfigModelMap (): {[key: string]: string} {
  return {
    [CONFIGTYPE.IMAGETEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE.CUBETEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE.CANVASTEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE.VIDEOTEXTURE]: MODULETYPE.TEXTURE,

    [CONFIGTYPE.MESHSTANDARDMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.MESHPHONGMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.SPRITEMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.LINEBASICMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.POINTSMATERIAL]: MODULETYPE.MATERIAL,

    [CONFIGTYPE.AMBIENTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.SPOTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.POINTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.DIRECTIONALLIGHT]: MODULETYPE.LIGHT,

    [CONFIGTYPE.BOXGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.SPHEREGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.LOADGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.PLANEGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.CIRCLEGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.CONEGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.CIRCLEGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.EDGESGEOMETRY]: MODULETYPE.GEOMETRY,

    [CONFIGTYPE.SPRITE]: MODULETYPE.SPRITE,
    [CONFIGTYPE.LINE]: MODULETYPE.LINE,
    [CONFIGTYPE.MESH]: MODULETYPE.MESH,
    [CONFIGTYPE.POINTS]: MODULETYPE.POINTS,
    [CONFIGTYPE.GROUP]: MODULETYPE.GROUP,

    [CONFIGTYPE.PERSPECTIVECAMERA]: MODULETYPE.CAMERA,
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: MODULETYPE.CAMERA,

    [CONFIGTYPE.WEBGLRENDERER]: MODULETYPE.RENDERER,

    [CONFIGTYPE.SCENE]: MODULETYPE.SCENE,

    [CONFIGTYPE.TRNASFORMCONTROLS]: MODULETYPE.CONTROLS,

    [CONFIGTYPE.EVENT]: MODULETYPE.EVENT
  }
}

export function getConfigFunctionMap (): {[key: string]: Function} {
  return {
    [CONFIGTYPE.IMAGETEXTURE]: getImageTextureConfig,
    [CONFIGTYPE.CUBETEXTURE]: getCubeTextureConfig,
    [CONFIGTYPE.CANVASTEXTURE]: getCanvasTextureConfig,
    [CONFIGTYPE.VIDEOTEXTURE]: getVideoTextureConfig,
  
    [CONFIGTYPE.MESHSTANDARDMATERIAL]: getMeshStandardMaterialConfig,
    [CONFIGTYPE.MESHPHONGMATERIAL]: getMeshPhongMaterialConfig,
    [CONFIGTYPE.SPRITEMATERIAL]: getSpriteMaterialConfig,
    [CONFIGTYPE.LINEBASICMATERIAL]: getLineBasicMaterialConfig,
    [CONFIGTYPE.POINTSMATERIAL]: getPointsMaterialConfig,
  
    [CONFIGTYPE.AMBIENTLIGHT]: getAmbientLightConfig,
    [CONFIGTYPE.SPOTLIGHT]: getSpotLightConfig,
    [CONFIGTYPE.POINTLIGHT]: getPointLightConfig,
    [CONFIGTYPE.DIRECTIONALLIGHT]: getDirectionalLightConfig,
  
    [CONFIGTYPE.BOXGEOMETRY]: getBoxGeometryConfig,
    [CONFIGTYPE.SPHEREGEOMETRY]: getSphereGeometryConfig,
    [CONFIGTYPE.LOADGEOMETRY]: getLoadGeometryConfig,
    [CONFIGTYPE.PLANEGEOMETRY]: getPlaneGeometryConfig,
    [CONFIGTYPE.CIRCLEGEOMETRY]: getCircleGeometryConfig,
    [CONFIGTYPE.CONEGEOMETRY]: getConeGeometryConfig,
    [CONFIGTYPE.CYLINDERGEOMETRY]: getCylinderGeometryConfig,
    [CONFIGTYPE.EDGESGEOMETRY]: getEdgesGeometryConfig,
  
    [CONFIGTYPE.SPRITE]: getSpriteConfig,
    [CONFIGTYPE.LINE]: getLineConfig,
    [CONFIGTYPE.MESH]: getMeshConfig,
    [CONFIGTYPE.POINTS]: getPointsConfig,
    [CONFIGTYPE.GROUP]: getGroupConfig,
  
    [CONFIGTYPE.PERSPECTIVECAMERA]: getPerspectiveCameraConfig,
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: getOrthographicCameraConfig,
  
    [CONFIGTYPE.WEBGLRENDERER]: getWebGLRendererConfig,
  
    [CONFIGTYPE.SCENE]: getSceneConfig,
  
    [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig,
    [CONFIGTYPE.ORBITCONTROLS]: getOrbitControlsConfig,

    [CONFIGTYPE.EVENT]: getEventConfig
  }
}