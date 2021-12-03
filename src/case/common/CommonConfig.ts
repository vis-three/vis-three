export interface SymbolConfig {
  vid: string,
  type: string
}

export interface Vector3Config {
  x: number
  y: number
  z: number
}

export interface Vector2Config {
  x: number
  y: number
}

export enum MODULETYPE {
  CAMERA = 'camera',
  LIGHT = 'light',
  GEOMETRY = 'geometry',
  MODEL = 'model',
  TEXTURE = 'texture',
  MATERIAL = 'material',
  RENDER = 'render',
  SCENE = 'scene',
  SPRITE = 'sprite',
  STRUCTURE = 'structure'
}

export enum CONFIGTYPE {
  BOXGEOMETRY = 'BoxGeometry',
  SPHEREGEOMETRY = 'SphereGeometry',
  LOADGEOMETRY = 'LoadGeometry',

  MODEL = 'Model',
  MESH = 'Mesh',
  LINE = 'Line',
  POINTS = 'Points',

  IMAGETEXTURE = 'ImageTexture',

  MESHSTANDARDMATERIAL = 'MeshStandardMaterial',

  AMBIENTLIGHT = 'AmbientLight',
  SPOTLIGHT = 'SpotLight',
  POINTLIGHT = 'PointLight',

  PERSPECTIVECAMERA = 'PerspectiveCamera',
  ORTHOGRAPHICCAMERA = 'OrthographicCamera'
}