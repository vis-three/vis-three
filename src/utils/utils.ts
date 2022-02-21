import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { getAmbientLightConfig, getSpotLightConfig, getPointLightConfig} from "../middleware/light/LightConfig"
import { getBoxGeometryConfig, getSphereGeometryConfig, getLoadGeometryConfig } from "../middleware/geometry/GeometryConfig"
import { getModelConfig } from "../middleware/model/ModelConfig"
import { getCanvasTextureConfig, getCubeTextureConfig, getImageTextureConfig } from "../middleware/texture/TextureConfig"
import { getLineBasicMaterialConfig, getMeshPhongMaterialConfig, getMeshStandardMaterialConfig, getSpriteMaterialConfig } from "../middleware/material/MaterialConfig"
import { getOrthographicCameraConfig, getPerspectiveCameraConfig } from "../middleware/camera/CameraConfig"
import { getWebGLRendererConfig } from "../middleware/render/RendererConfig"
import { getSceneConfig } from "../middleware/scene/SceneConfig"
import { getOrbitControlsConfig, getTransformControlsConfig } from "../middleware/controls/ControlsConfig"
import { getSpriteConfig } from "../middleware/sprite/SpriteConfig"
import { getEventConfig } from "../middleware/event/eventConfig";
import { getLineSegmentsConfig } from "../middleware/line/LineConfig";


export function isValidKey(key: string | number | symbol , object: object): key is keyof typeof object {
  return key in object;
}


export function getConfigModelMap (): {[key: string]: string} {
  return {
    [CONFIGTYPE.IMAGETEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE.CUBETEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE.CANVASTEXTURE]: MODULETYPE.TEXTURE,

    [CONFIGTYPE.MESHSTANDARDMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.MESHPHONGMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.SPRITEMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.LINEBASICMATERIAL]: MODULETYPE.MATERIAL,

    [CONFIGTYPE.AMBIENTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.SPOTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.POINTLIGHT]: MODULETYPE.LIGHT,

    [CONFIGTYPE.BOXGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.SPHEREGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.LOADGEOMETRY]: MODULETYPE.GEOMETRY,

    [CONFIGTYPE.MODEL]: MODULETYPE.MODEL,
    [CONFIGTYPE.SPRITE]: MODULETYPE.SPRITE,
    [CONFIGTYPE.LINESEGMENTS]: MODULETYPE.LINE,

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
  
    [CONFIGTYPE.MESHSTANDARDMATERIAL]: getMeshStandardMaterialConfig,
    [CONFIGTYPE.MESHPHONGMATERIAL]: getMeshPhongMaterialConfig,
    [CONFIGTYPE.SPRITEMATERIAL]: getSpriteMaterialConfig,
    [CONFIGTYPE.LINEBASICMATERIAL]: getLineBasicMaterialConfig,
  
    [CONFIGTYPE.AMBIENTLIGHT]: getAmbientLightConfig,
    [CONFIGTYPE.SPOTLIGHT]: getSpotLightConfig,
    [CONFIGTYPE.POINTLIGHT]: getPointLightConfig,
  
    [CONFIGTYPE.BOXGEOMETRY]: getBoxGeometryConfig,
    [CONFIGTYPE.SPHEREGEOMETRY]: getSphereGeometryConfig,
    [CONFIGTYPE.LOADGEOMETRY]: getLoadGeometryConfig,
  
    [CONFIGTYPE.MODEL]: getModelConfig,
    [CONFIGTYPE.SPRITE]: getSpriteConfig,
    [CONFIGTYPE.LINESEGMENTS]: getLineSegmentsConfig,
  
    [CONFIGTYPE.PERSPECTIVECAMERA]: getPerspectiveCameraConfig,
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: getOrthographicCameraConfig,
  
    [CONFIGTYPE.WEBGLRENDERER]: getWebGLRendererConfig,
  
    [CONFIGTYPE.SCENE]: getSceneConfig,
  
    [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig,
    [CONFIGTYPE.ORBITCONTROLS]: getOrbitControlsConfig,

    [CONFIGTYPE.EVENT]: getEventConfig
  }
}