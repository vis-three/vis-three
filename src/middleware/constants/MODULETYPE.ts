/**
 * @experimental  PASS ANIMATION
 */
export enum MODULETYPE {
  OBJECT3D = "Object3D",
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
  PASS = "pass",
  // MODIFIER = "modifier",

  ANIMATION = "animation",
}

// 物体模块
export enum OBJECTMODULE {
  CAMERA = MODULETYPE.CAMERA,
  LIGHT = MODULETYPE.LIGHT,
  SCENE = MODULETYPE.SCENE,
  SPRITE = MODULETYPE.SPRITE,
  LINE = MODULETYPE.LINE,
  MESH = MODULETYPE.MESH,
  POINTS = MODULETYPE.POINTS,
  GROUP = MODULETYPE.GROUP,
  CSS3D = MODULETYPE.CSS3D,
  OBJECT3D = MODULETYPE.OBJECT3D,
}
