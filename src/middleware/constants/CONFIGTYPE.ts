/**
 * @experimental  PASS
 */
export enum CONFIGTYPE {
  BOXGEOMETRY = "BoxGeometry",
  SPHEREGEOMETRY = "SphereGeometry",
  LOADGEOMETRY = "LoadGeometry",
  PLANEGEOMETRY = "PlaneGeometry",
  CIRCLEGEOMETRY = "CircleGeometry",
  CONEGEOMETRY = "ConeGeometry",
  CYLINDERGEOMETRY = "CylinderGeometry",
  DODECAHEDRONGEOMETRY = "DodecahedronGeometry",
  EDGESGEOMETRY = "EdgesGeometry",

  MESH = "Mesh",
  LINE = "Line",
  LINESEGMENTS = "LineSegments",
  POINTS = "Points",
  SPRITE = "Sprite",
  GROUP = "Group",
  CSS3DOBJECT = "CSS3DObject",
  CSS3DSPRITE = "CSS3DSprite",
  CSS3DPLANE = "CSS3DPlane",

  IMAGETEXTURE = "ImageTexture",
  CUBETEXTURE = "CubeTexture",
  CANVASTEXTURE = "CanvasTexture",
  VIDEOTEXTURE = "VideoTexture",

  MESHBASICMATERIAL = "MeshBasicMaterial",
  MESHSTANDARDMATERIAL = "MeshStandardMaterial",
  MESHPHONGMATERIAL = "MeshPhongMaterial",
  SPRITEMATERIAL = "SpriteMaterial",
  LINEBASICMATERIAL = "LineBasicMaterial",
  POINTSMATERIAL = "PointsMaterial",
  SHADERMATERIAL = "ShaderMaterial",
  RAWSHADERMATERIAL = "RawShaderMaterial",

  AMBIENTLIGHT = "AmbientLight",
  SPOTLIGHT = "SpotLight",
  POINTLIGHT = "PointLight",
  DIRECTIONALLIGHT = "DirectionalLight",

  PERSPECTIVECAMERA = "PerspectiveCamera",
  ORTHOGRAPHICCAMERA = "OrthographicCamera",

  WEBGLRENDERER = "WebGLRenderer",
  CSS3DRENDERER = "CSS3DRenderer",

  SCENE = "Scene",

  TRNASFORMCONTROLS = "TransformControls",
  ORBITCONTROLS = "OrbitControls",

  SMAAPASS = "SMAAPass",
  UNREALBLOOMPASS = "UnrealBloomPass",

  SCRIPTANIMATION = "ScriptAnimation",
  KEYFRAMEANIMATION = "KeyframeAnimation",
}
