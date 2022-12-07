/**
 * @experimental  PASS ANIMATION
 */
export enum MODULETYPE {
  OBJECT3D = "object3D",
  CAMERA = "camera",
  LIGHT = "light",
  GEOMETRY = "geometry",
  TEXTURE = "texture",
  MATERIAL = "material",
  RENDERER = "renderer",
  SCENE = "scene",
  SPRITE = "sprite",
  CONTROLS = "controls",
  LINE = "line",
  MESH = "mesh",
  POINTS = "points",
  GROUP = "group",
  CSS3D = "css3D",
  CSS2D = "css2D",
  PASS = "pass",
  // MODIFIER = "modifier",

  ANIMATION = "animation",
}

// 物体模块
export const OBJECTMODULE = {
  [MODULETYPE.CAMERA]: true,
  [MODULETYPE.LIGHT]: true,
  [MODULETYPE.SCENE]: true,
  [MODULETYPE.SPRITE]: true,
  [MODULETYPE.LINE]: true,
  [MODULETYPE.MESH]: true,
  [MODULETYPE.POINTS]: true,
  [MODULETYPE.GROUP]: true,
  [MODULETYPE.CSS3D]: true,
  [MODULETYPE.CSS2D]: true,
  [MODULETYPE.OBJECT3D]: true,
};
