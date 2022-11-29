import {
  getAmbientLightConfig,
  getSpotLightConfig,
  getPointLightConfig,
  getDirectionalLightConfig,
  getHemisphereLightConfig,
} from "../light/LightConfig";
import {
  getBoxGeometryConfig,
  getSphereGeometryConfig,
  getLoadGeometryConfig,
  getPlaneGeometryConfig,
  getCircleGeometryConfig,
  getConeGeometryConfig,
  getCylinderGeometryConfig,
  getEdgesGeometryConfig,
  getLineCurveGeometryConfig,
  getSplineCurveGeometryConfig,
  getCubicBezierCurveGeometryConfig,
  getQuadraticBezierCurveGeometryConfig,
  getDodecahedronGeometryConfig,
  getCustomGeometryConfig,
  getSplineTubeGeometryConfig,
  getLineTubeGeometryConfig,
  getTorusGeometryConfig,
  getRingGeometryConfig,
  getLineShapeGeometryConfig,
} from "../geometry/GeometryConfig";
import {
  getCanvasTextureConfig,
  getCubeTextureConfig,
  getImageTextureConfig,
  getLoadTextureConfig,
  getVideoTextureConfig,
} from "../texture/TextureConfig";
import {
  getLineBasicMaterialConfig,
  getMeshBasicMaterialConfig,
  getMeshPhongMaterialConfig,
  getMeshPhysicalMaterialConfig,
  getMeshStandardMaterialConfig,
  getPointsMaterialConfig,
  getShaderMaterialConfig,
  getSpriteMaterialConfig,
} from "../material/MaterialConfig";
import {
  getOrthographicCameraConfig,
  getPerspectiveCameraConfig,
} from "../camera/CameraConfig";
import {
  getCSS3DRenderereConfig,
  getWebGLRendererConfig,
} from "../renderer/RendererConfig";
import { getSceneConfig } from "../scene/SceneConfig";
import {
  getOrbitControlsConfig,
  getTransformControlsConfig,
} from "../controls/ControlsConfig";
import { getSpriteConfig } from "../sprite/SpriteConfig";
import { getMeshConfig } from "../mesh/MeshConfig";
import { getPointsConfig } from "../points/PointsConfig";
import { getLineConfig } from "../line/LineConfig";
import { getGroupConfig } from "../group/GroupConfig";
import {
  getSelectiveBloomPassConfig,
  getSMAAPassConfig,
  getUnrealBloomPassConfig,
} from "../pass/PassConfig";
import { CONFIGTYPE } from "./configType";
import {
  getKeyframeAnimationConfig,
  getScriptAnimationConfig,
} from "../animation/AnimationConfig";
import {
  getCSS3DObjectConfig,
  getCSS3DPlaneConfig,
  getCSS3DSpriteConfig,
} from "../css3D/CSS3DConfig";
import { getObjectConfig } from "../object/ObjectConfig";
import { getCSS2DPlaneConfig } from "../css2D/CSS2DConfig";

export const CONFIGFACTORY = {
  [CONFIGTYPE.IMAGETEXTURE]: getImageTextureConfig,
  [CONFIGTYPE.CUBETEXTURE]: getCubeTextureConfig,
  [CONFIGTYPE.CANVASTEXTURE]: getCanvasTextureConfig,
  [CONFIGTYPE.VIDEOTEXTURE]: getVideoTextureConfig,
  [CONFIGTYPE.LOADTEXTURE]: getLoadTextureConfig,

  [CONFIGTYPE.MESHBASICMATERIAL]: getMeshBasicMaterialConfig,
  [CONFIGTYPE.MESHSTANDARDMATERIAL]: getMeshStandardMaterialConfig,
  [CONFIGTYPE.MESHPHONGMATERIAL]: getMeshPhongMaterialConfig,
  [CONFIGTYPE.SPRITEMATERIAL]: getSpriteMaterialConfig,
  [CONFIGTYPE.LINEBASICMATERIAL]: getLineBasicMaterialConfig,
  [CONFIGTYPE.POINTSMATERIAL]: getPointsMaterialConfig,
  [CONFIGTYPE.SHADERMATERIAL]: getShaderMaterialConfig,
  [CONFIGTYPE.MESHPHYSICALMATERIAL]: getMeshPhysicalMaterialConfig,

  [CONFIGTYPE.AMBIENTLIGHT]: getAmbientLightConfig,
  [CONFIGTYPE.SPOTLIGHT]: getSpotLightConfig,
  [CONFIGTYPE.POINTLIGHT]: getPointLightConfig,
  [CONFIGTYPE.DIRECTIONALLIGHT]: getDirectionalLightConfig,
  [CONFIGTYPE.HEMISPHERELIGHT]: getHemisphereLightConfig,

  [CONFIGTYPE.BOXGEOMETRY]: getBoxGeometryConfig,
  [CONFIGTYPE.SPHEREGEOMETRY]: getSphereGeometryConfig,
  [CONFIGTYPE.LOADGEOMETRY]: getLoadGeometryConfig,
  [CONFIGTYPE.CUSTOMGEOMETRY]: getCustomGeometryConfig,
  [CONFIGTYPE.PLANEGEOMETRY]: getPlaneGeometryConfig,
  [CONFIGTYPE.CIRCLEGEOMETRY]: getCircleGeometryConfig,
  [CONFIGTYPE.CONEGEOMETRY]: getConeGeometryConfig,
  [CONFIGTYPE.CYLINDERGEOMETRY]: getCylinderGeometryConfig,
  [CONFIGTYPE.EDGESGEOMETRY]: getEdgesGeometryConfig,
  [CONFIGTYPE.LINECURVEGEOMETRY]: getLineCurveGeometryConfig,
  [CONFIGTYPE.SPLINECURVEGEOMETRY]: getSplineCurveGeometryConfig,
  [CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY]: getCubicBezierCurveGeometryConfig,
  [CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY]:
    getQuadraticBezierCurveGeometryConfig,
  [CONFIGTYPE.DODECAHEDRONGEOMETRY]: getDodecahedronGeometryConfig,
  [CONFIGTYPE.SPLINETUBEGEOMETRY]: getSplineTubeGeometryConfig,
  [CONFIGTYPE.LINETUBEGEOMETRY]: getLineTubeGeometryConfig,
  [CONFIGTYPE.TORUSGEOMETRY]: getTorusGeometryConfig,
  [CONFIGTYPE.RINGGEOMETRY]: getRingGeometryConfig,
  [CONFIGTYPE.LINESHAPEGEOMETRY]: getLineShapeGeometryConfig,

  [CONFIGTYPE.OBJECT3D]: getObjectConfig,
  [CONFIGTYPE.SPRITE]: getSpriteConfig,
  [CONFIGTYPE.LINE]: getLineConfig,
  [CONFIGTYPE.MESH]: getMeshConfig,
  [CONFIGTYPE.POINTS]: getPointsConfig,
  [CONFIGTYPE.GROUP]: getGroupConfig,
  [CONFIGTYPE.CSS3DOBJECT]: getCSS3DObjectConfig,
  [CONFIGTYPE.CSS3DSPRITE]: getCSS3DSpriteConfig,
  [CONFIGTYPE.CSS3DPLANE]: getCSS3DPlaneConfig,
  [CONFIGTYPE.CSS2DPLANE]: getCSS2DPlaneConfig,

  [CONFIGTYPE.PERSPECTIVECAMERA]: getPerspectiveCameraConfig,
  [CONFIGTYPE.ORTHOGRAPHICCAMERA]: getOrthographicCameraConfig,

  [CONFIGTYPE.WEBGLRENDERER]: getWebGLRendererConfig,
  [CONFIGTYPE.CSS3DRENDERER]: getCSS3DRenderereConfig,

  [CONFIGTYPE.SCENE]: getSceneConfig,

  [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig,
  [CONFIGTYPE.ORBITCONTROLS]: getOrbitControlsConfig,

  [CONFIGTYPE.SMAAPASS]: getSMAAPassConfig,
  [CONFIGTYPE.UNREALBLOOMPASS]: getUnrealBloomPassConfig,
  [CONFIGTYPE.SELECTIVEBLOOMPASS]: getSelectiveBloomPassConfig,

  [CONFIGTYPE.SCRIPTANIMATION]: getScriptAnimationConfig,
  [CONFIGTYPE.KEYFRAMEANIMATION]: getKeyframeAnimationConfig,
};
