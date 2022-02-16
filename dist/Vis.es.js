var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { UVMapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, LinearEncoding, FrontSide, TangentSpaceNormalMap, MultiplyOperation, PCFShadowMap, NoToneMapping, LineBasicMaterial, LineSegments, BufferGeometry, Float32BufferAttribute, Color, Mesh, OctahedronBufferGeometry, MeshBasicMaterial, Sphere, Vector3, CameraHelper as CameraHelper$1, Matrix4, PerspectiveCamera, OrthographicCamera, EdgesGeometry, EventDispatcher as EventDispatcher$1, Material, Scene, AxesHelper, GridHelper, MeshLambertMaterial, PointsMaterial, SpriteMaterial, AmbientLight, DirectionalLight, Line, Light, Points, Sprite, Camera, Texture, Clock, MOUSE, Vector2, WebGLMultisampleRenderTarget, Raycaster, Object3D, WebGLRenderer, Loader, FileLoader, Group, MeshPhongMaterial, LoaderUtils, RepeatWrapping, DefaultLoadingManager, TextureLoader, ImageLoader, Quaternion, Euler, BoxBufferGeometry, SphereBufferGeometry, PointLight, SpotLight, MeshStandardMaterial, Fog, FogExp2, PCFSoftShadowMap } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
class EventDispatcher {
  constructor() {
    __publicField(this, "listeners", new Map());
  }
  addEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }
    listeners.get(type).add(listener);
  }
  hasEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return false;
    }
    return listeners.get(type).has(listener);
  }
  removeEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return;
    }
    if (!listeners.get(type).has(listener)) {
      return;
    }
    listeners.get(type).delete(listener);
  }
  dispatchEvent(event) {
    var _a;
    const type = event.type;
    const listeners = this.listeners;
    if (listeners.has(type)) {
      try {
        (_a = listeners.get(type)) == null ? void 0 : _a.forEach((listener) => {
          listener.call(this, event);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
const getObjectConfig = () => {
  return {
    vid: "",
    type: "Object3D",
    castShadow: true,
    receiveShadow: true,
    lookAt: "",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    }
  };
};
const getLightConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "Light",
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
};
const getAmbientLightConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "AmbientLight",
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
};
const getPointLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: "PointLight",
    distance: 30,
    decay: 0.01
  });
};
const getSpotLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: "SpotLight",
    distance: 30,
    angle: Math.PI / 180 * 45,
    penumbra: 0.01,
    decay: 0.01
  });
};
const getGeometryConfig = function() {
  return {
    vid: "",
    type: "Geometry",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    }
  };
};
const getBoxGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: "BoxGeometry",
    width: 5,
    height: 5,
    depth: 5,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  });
};
const getSphereGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: "SphereGeometry",
    radius: 3,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  });
};
const getLoadGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: "LoadGeometry",
    url: ""
  });
};
const getModelConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "Model",
    display: "Mesh",
    geometry: "",
    material: ""
  });
};
const getTextureConfig = function() {
  return {
    vid: "",
    type: "Texture",
    name: "",
    image: "",
    mapping: UVMapping,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    magFilter: LinearFilter,
    minFilter: LinearMipmapLinearFilter,
    anisotropy: 1,
    format: RGBAFormat,
    offset: {
      x: 0,
      y: 0
    },
    repeat: {
      x: 1,
      y: 1
    },
    rotation: 0,
    center: {
      x: 0,
      y: 0
    },
    matrixAutoUpdate: true,
    encoding: LinearEncoding,
    needsUpdate: false
  };
};
const getImageTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    type: "ImageTexture"
  });
};
const getMaterialConfig = function() {
  return {
    vid: "",
    type: "Material",
    alphaTest: 0,
    colorWrite: true,
    depthTest: true,
    depthWrite: true,
    format: RGBAFormat,
    fog: true,
    name: "",
    needsUpdate: false,
    opacity: 1,
    dithering: false,
    shadowSide: null,
    side: FrontSide,
    toneMapped: true,
    transparent: false,
    visible: true
  };
};
const getMeshStandardMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: "MeshStandardMaterial",
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    metalness: 0,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    roughness: 1,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    roughnessMap: "",
    normalMap: "",
    metalnessMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: ""
  });
};
const getMeshPhongMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: "MeshPhongMateria",
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    specular: "rgb(17, 17, 17)",
    shininess: 30,
    combine: MultiplyOperation,
    normalMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: "",
    specularMap: ""
  });
};
const getPerspectiveCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "PerspectiveCamera",
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50
  });
};
const getOrthographicCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "OrthographicCamera",
    adaptiveWindow: false,
    left: 1920 / 16,
    right: 1920 / 16,
    top: 1080 / 16,
    bottom: 1080 / 16,
    near: 5,
    far: 50
  });
};
var CONFIGTYPE$1;
(function(CONFIGTYPE2) {
  CONFIGTYPE2["BOXGEOMETRY"] = "BoxGeometry";
  CONFIGTYPE2["SPHEREGEOMETRY"] = "SphereGeometry";
  CONFIGTYPE2["LOADGEOMETRY"] = "LoadGeometry";
  CONFIGTYPE2["MODEL"] = "Model";
  CONFIGTYPE2["MESH"] = "Mesh";
  CONFIGTYPE2["LINE"] = "Line";
  CONFIGTYPE2["POINTS"] = "Points";
  CONFIGTYPE2["IMAGETEXTURE"] = "ImageTexture";
  CONFIGTYPE2["MESHSTANDARDMATERIAL"] = "MeshStandardMaterial";
  CONFIGTYPE2["MESHPHONGMATERIAL"] = "MeshPhongMaterial";
  CONFIGTYPE2["AMBIENTLIGHT"] = "AmbientLight";
  CONFIGTYPE2["SPOTLIGHT"] = "SpotLight";
  CONFIGTYPE2["POINTLIGHT"] = "PointLight";
  CONFIGTYPE2["PERSPECTIVECAMERA"] = "PerspectiveCamera";
  CONFIGTYPE2["ORTHOGRAPHICCAMERA"] = "OrthographicCamera";
  CONFIGTYPE2["WEBGLRENDERER"] = "WebGLRenderer";
  CONFIGTYPE2["SCENE"] = "Scene";
  CONFIGTYPE2["TRNASFORMCONTROLS"] = "TransformControls";
  CONFIGTYPE2["ORBITCONTROLS"] = "OrbitControls";
})(CONFIGTYPE$1 || (CONFIGTYPE$1 = {}));
const getWebGLRendererConfig = function() {
  return {
    vid: "WebGLRenderer",
    type: "WebGLRenderer",
    clearColor: "rgba(0, 0, 0, 0)",
    outputEncoding: LinearEncoding,
    physicallyCorrectLights: false,
    shadowMap: {
      enabled: false,
      autoUpdate: true,
      type: PCFShadowMap
    },
    toneMapping: NoToneMapping,
    toneMappingExposure: 1,
    pixelRatio: window.devicePixelRatio,
    adaptiveCamera: false,
    viewport: null,
    scissor: null,
    size: null
  };
};
const getSceneConfig = function() {
  return {
    vid: "Scene",
    type: "Scene",
    background: "",
    environment: "",
    fog: null
  };
};
const getTransformControlsConfig = function() {
  return {
    vid: "TransformControls",
    type: "TransformControls",
    axis: "XYZ",
    enabled: true,
    mode: "translate",
    snapAllow: false,
    rotationSnap: Math.PI / 180 * 10,
    translationSnap: 5,
    scaleSnap: 0.1,
    showX: true,
    showY: true,
    showZ: true,
    size: 1,
    space: "world"
  };
};
const getOrbitControlsConfig = function() {
  return {
    vid: "OrbitControls",
    type: "OrbitControls",
    autoRotate: false,
    autoRotateSpeed: 2,
    enableDamping: false,
    dampingFactor: 0.05
  };
};
const typeMap = {
  [CONFIGTYPE$1.IMAGETEXTURE]: getImageTextureConfig,
  [CONFIGTYPE$1.MESHSTANDARDMATERIAL]: getMeshStandardMaterialConfig,
  [CONFIGTYPE$1.MESHPHONGMATERIAL]: getMeshPhongMaterialConfig,
  [CONFIGTYPE$1.AMBIENTLIGHT]: getAmbientLightConfig,
  [CONFIGTYPE$1.SPOTLIGHT]: getSpotLightConfig,
  [CONFIGTYPE$1.POINTLIGHT]: getPointLightConfig,
  [CONFIGTYPE$1.BOXGEOMETRY]: getBoxGeometryConfig,
  [CONFIGTYPE$1.SPHEREGEOMETRY]: getSphereGeometryConfig,
  [CONFIGTYPE$1.LOADGEOMETRY]: getLoadGeometryConfig,
  [CONFIGTYPE$1.MODEL]: getModelConfig,
  [CONFIGTYPE$1.PERSPECTIVECAMERA]: getPerspectiveCameraConfig,
  [CONFIGTYPE$1.ORTHOGRAPHICCAMERA]: getOrthographicCameraConfig,
  [CONFIGTYPE$1.WEBGLRENDERER]: getWebGLRendererConfig,
  [CONFIGTYPE$1.SCENE]: getSceneConfig,
  [CONFIGTYPE$1.TRNASFORMCONTROLS]: getTransformControlsConfig,
  [CONFIGTYPE$1.ORBITCONTROLS]: getOrbitControlsConfig
};
const generateConfig = function(type, merge, warn) {
  if (typeMap[type]) {
    const recursion = (config, merge2) => {
      for (const key in merge2) {
        if (config[key] === void 0) {
          warn && console.warn(`'${type}' config can not set key: ${key}`);
          continue;
        }
        if (typeof merge2[key] === "object" && merge2[key] !== null) {
          recursion(config[key], merge2[key]);
        } else {
          config[key] = merge2[key];
        }
      }
    };
    const initConfig = typeMap[type]();
    merge && recursion(initConfig, merge);
    return initConfig;
  } else {
    console.error(`type: ${type} can not be found in configList.`);
    return null;
  }
};
const ACTIVECOLOR = "rgb(230, 20, 240)";
const HOVERCOLOR = "rgb(255, 158, 240)";
const HELPERCOLOR = "rgb(255, 255, 255)";
const getHelperLineMaterial = () => new LineBasicMaterial({ color: HELPERCOLOR });
class PointLightHelper extends LineSegments {
  constructor(pointLight2) {
    super();
    __publicField(this, "sphere");
    __publicField(this, "target");
    __publicField(this, "shape");
    __publicField(this, "type", "VisPointLightHelper");
    __publicField(this, "cachaColor");
    __publicField(this, "cachaDistance");
    __publicField(this, "cachaVector3");
    this.geometry = new BufferGeometry();
    const points = [
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0.707,
      0.707,
      0,
      -0.707,
      -0.707,
      0,
      0.707
    ];
    this.geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
    this.material = getHelperLineMaterial();
    this.geometry.boundingSphere;
    const color = new Color().copy(pointLight2.color).multiplyScalar(pointLight2.intensity);
    const shape = new Mesh(new OctahedronBufferGeometry(pointLight2.distance, 0), new MeshBasicMaterial({
      color,
      wireframe: true
    }));
    shape.raycast = () => {
    };
    this.shape = shape;
    this.target = pointLight2;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cachaColor = pointLight2.color.getHex();
    this.cachaDistance = pointLight2.distance;
    this.cachaVector3 = new Vector3();
    this.add(this.shape);
    this.matrixAutoUpdate = false;
    this.matrix = pointLight2.matrix;
    this.onBeforeRender = () => {
      const light = this.target;
      const shape2 = this.shape;
      const scource = this;
      if (light.distance !== this.cachaDistance) {
        shape2.geometry.dispose();
        shape2.geometry = new OctahedronBufferGeometry(light.distance, 0);
        this.cachaDistance = light.distance;
      }
      if (light.color.getHex() !== this.cachaColor) {
        shape2.material.color.copy(light.color).multiplyScalar(light.intensity);
        scource.material.color.copy(light.color).multiplyScalar(light.intensity);
        this.cachaColor = light.color.getHex();
      }
    };
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;
    sphere.set(this.cachaVector3.set(0, 0, 0), 1);
    sphere.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsSphere(sphere)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class CameraHelper extends LineSegments {
  constructor(camera) {
    super();
    __publicField(this, "shape");
    __publicField(this, "target");
    __publicField(this, "type", "CameraHelper");
    __publicField(this, "cachaData");
    const geometry = new BufferGeometry();
    const positions = [
      0,
      0,
      0,
      -1,
      1,
      -1,
      0,
      0,
      0,
      -1,
      1,
      1,
      0,
      0,
      0,
      -1,
      -1,
      -1,
      0,
      0,
      0,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      -1,
      0,
      0,
      0,
      0,
      -1,
      -1,
      0,
      0,
      0,
      0,
      -1,
      1,
      0,
      1,
      1,
      0,
      1,
      -1,
      0,
      1,
      -1,
      0,
      -1,
      -1,
      0,
      -1,
      -1,
      0,
      -1,
      1,
      0,
      -1,
      1,
      0,
      1,
      1,
      0,
      -1,
      1,
      2,
      -1,
      1,
      0,
      1,
      -1,
      2,
      1,
      -1,
      0,
      -1,
      -1,
      2,
      -1,
      -1,
      0,
      1,
      1,
      2,
      1,
      1,
      2,
      1,
      1,
      2,
      -1,
      1,
      2,
      -1,
      1,
      2,
      -1,
      -1,
      2,
      -1,
      -1,
      2,
      1,
      -1,
      2,
      1,
      -1,
      2,
      1,
      1
    ];
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.rotateY(-90 * Math.PI / 180);
    geometry.computeBoundingBox();
    const shape = new CameraHelper$1(camera);
    shape.matrix = new Matrix4();
    shape.matrixAutoUpdate = true;
    shape.raycast = () => {
    };
    this.add(shape);
    this.shape = shape;
    this.geometry = geometry;
    this.material = getHelperLineMaterial();
    this.target = camera;
    this.matrixAutoUpdate = false;
    this.matrix = camera.matrix;
    if (camera instanceof PerspectiveCamera) {
      this.cachaData = {
        fov: camera.fov,
        aspect: camera.aspect,
        near: camera.near,
        far: camera.far
      };
    } else if (camera instanceof OrthographicCamera) {
      this.cachaData = {
        left: camera.left,
        right: camera.right,
        top: camera.top,
        bottom: camera.bottom,
        near: camera.near,
        far: camera.far
      };
    } else {
      this.cachaData = {};
    }
    this.onBeforeRender = () => {
      let needsUpdate = false;
      const cachaData = this.cachaData;
      Object.keys(cachaData).forEach((key) => {
        if (cachaData[key] !== camera[key]) {
          cachaData[key] = camera[key];
          needsUpdate = true;
        }
      });
      needsUpdate && this.shape.update();
    };
  }
  raycast(raycaster, intersects) {
    const matrixWorld = this.matrixWorld;
    const box = this.geometry.boundingBox.clone();
    box.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsBox(box)) {
      const target = this.target;
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class MeshHelper extends LineSegments {
  constructor(mesh) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisMeshHelper");
    __publicField(this, "cachaGeometryUUid");
    const thresholdAngle = 1;
    this.target = mesh;
    this.geometry = new EdgesGeometry(mesh.geometry, thresholdAngle);
    this.cachaGeometryUUid = mesh.geometry.uuid;
    this.material = getHelperLineMaterial();
    this.raycast = () => {
    };
    this.matrixAutoUpdate = false;
    this.matrix = mesh.matrix;
    this.onBeforeRender = () => {
      const target = this.target;
      if (target.geometry.uuid !== this.cachaGeometryUUid) {
        this.geometry.dispose();
        this.geometry = new EdgesGeometry(target.geometry, thresholdAngle);
        this.cachaGeometryUUid = target.geometry.uuid;
      }
    };
  }
}
var HELPERCOMPILEREVENTTYPE;
(function(HELPERCOMPILEREVENTTYPE2) {
  HELPERCOMPILEREVENTTYPE2["ADD"] = "add";
  HELPERCOMPILEREVENTTYPE2["REMOVE"] = "remove";
})(HELPERCOMPILEREVENTTYPE || (HELPERCOMPILEREVENTTYPE = {}));
const _SceneHelperCompiler = class extends EventDispatcher$1 {
  constructor(scene) {
    super();
    __publicField(this, "map");
    __publicField(this, "scene");
    this.map = new Map();
    this.scene = scene;
  }
  getMap() {
    return this.map;
  }
  add(object) {
    if (_SceneHelperCompiler.filterHelperMap[object.type]) {
      return;
    }
    if (_SceneHelperCompiler.typeHelperMap[object.type]) {
      const helper = new _SceneHelperCompiler.typeHelperMap[object.type](object);
      this.map.set(object, helper);
      this.scene._add(helper);
      this.dispatchEvent({
        type: HELPERCOMPILEREVENTTYPE.ADD,
        helper,
        object
      });
    } else {
      console.warn(`Scene helper compiler can not support this type object: '${object.type}'`);
    }
  }
  remove(object) {
    if (_SceneHelperCompiler.filterHelperMap[object.type]) {
      return;
    }
    if (this.map.has(object)) {
      const helper = this.map.get(object);
      this.scene._remove(helper);
      helper.geometry.dispose();
      if (helper.material) {
        if (helper.material instanceof Material) {
          helper.material.dispose();
        } else {
          helper.material.forEach((material) => {
            material.dispose();
          });
        }
      }
      this.map.delete(object);
      this.dispatchEvent({
        type: HELPERCOMPILEREVENTTYPE.REMOVE,
        helper,
        object
      });
    } else {
      console.warn(`Scene helper compiler can not found this object\`s helper: ${object}`);
    }
  }
  setVisiable(visiable) {
    const scene = this.scene;
    if (visiable) {
      this.map.forEach((helper, origin) => {
        scene._add(helper);
      });
    } else {
      this.map.forEach((helper, origin) => {
        scene._remove(helper);
      });
    }
  }
  resetHelperColor(...object) {
    const map = this.map;
    const helperColorHex = _SceneHelperCompiler.helperColorHex;
    object.forEach((elem) => {
      if (map.has(elem)) {
        const helper = map.get(elem);
        helper.material.color.setHex(helperColorHex);
      }
    });
  }
  setHelperHoverColor(...object) {
    const map = this.map;
    const hoverColorHex = _SceneHelperCompiler.hoverColorHex;
    object.forEach((elem) => {
      if (map.has(elem)) {
        const helper = map.get(elem);
        helper.material.color.setHex(hoverColorHex);
      }
    });
  }
  setHelperActiveColor(...object) {
    const map = this.map;
    const activeColorHex = _SceneHelperCompiler.activeColorHex;
    object.forEach((elem) => {
      if (map.has(elem)) {
        const helper = map.get(elem);
        helper.material.color.setHex(activeColorHex);
      }
    });
  }
};
let SceneHelperCompiler = _SceneHelperCompiler;
__publicField(SceneHelperCompiler, "helperColorHex", new Color(HELPERCOLOR).getHex());
__publicField(SceneHelperCompiler, "activeColorHex", new Color(ACTIVECOLOR).getHex());
__publicField(SceneHelperCompiler, "hoverColorHex", new Color(HOVERCOLOR).getHex());
__publicField(SceneHelperCompiler, "typeHelperMap", {
  "PointLight": PointLightHelper,
  "PerspectiveCamera": CameraHelper,
  "OrthographicCamera": CameraHelper,
  "Mesh": MeshHelper
});
__publicField(SceneHelperCompiler, "filterHelperMap", {
  "AmbientLight": true,
  "Object3D": true
});
var ModelingSceneCameraDefalutType;
(function(ModelingSceneCameraDefalutType2) {
  ModelingSceneCameraDefalutType2["DefaultPerspectiveCamera"] = "DefaultPerspectiveCamera";
  ModelingSceneCameraDefalutType2["DefaultOrthograpbicCamera"] = "DefaultOrthograpbicCamera";
})(ModelingSceneCameraDefalutType || (ModelingSceneCameraDefalutType = {}));
var SCENEVIEWPOINT;
(function(SCENEVIEWPOINT2) {
  SCENEVIEWPOINT2["DEFAULT"] = "default";
  SCENEVIEWPOINT2["TOP"] = "top";
  SCENEVIEWPOINT2["BOTTOM"] = "bottom";
  SCENEVIEWPOINT2["LEFT"] = "left";
  SCENEVIEWPOINT2["RIGHT"] = "right";
  SCENEVIEWPOINT2["FRONT"] = "front";
  SCENEVIEWPOINT2["BACK"] = "back";
})(SCENEVIEWPOINT || (SCENEVIEWPOINT = {}));
var SCENEDISPLAYMODE;
(function(SCENEDISPLAYMODE2) {
  SCENEDISPLAYMODE2["GEOMETRY"] = "geometry";
  SCENEDISPLAYMODE2["MATERIAL"] = "material";
  SCENEDISPLAYMODE2["LIGHT"] = "light";
  SCENEDISPLAYMODE2["ENV"] = "env";
})(SCENEDISPLAYMODE || (SCENEDISPLAYMODE = {}));
Scene.prototype.add = function(...object) {
  if (!arguments.length) {
    return this;
  }
  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      this.add(arguments[i]);
    }
    return this;
  }
  const currentObject = object[0];
  if (currentObject === this) {
    console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
    return this;
  }
  if (currentObject && currentObject.isObject3D) {
    if (currentObject.parent !== null) {
      const index = this.children.indexOf(currentObject);
      if (index !== -1) {
        currentObject.parent = null;
        this.children.splice(index, 1);
        currentObject.dispatchEvent({ type: "removed" });
      }
    }
    currentObject.parent = this;
    this.children.push(currentObject);
    currentObject.dispatchEvent({ type: "added" });
  } else {
    console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
  }
  return this;
};
class ModelingScene extends Scene {
  constructor(config) {
    super();
    __publicField(this, "cameraSet");
    __publicField(this, "lightSet");
    __publicField(this, "meshSet");
    __publicField(this, "lineSet");
    __publicField(this, "pointsSet");
    __publicField(this, "spriteSet");
    __publicField(this, "helperCompiler");
    __publicField(this, "resetHoverObjectSet");
    __publicField(this, "resetActiveObjectSet");
    __publicField(this, "displayMode");
    __publicField(this, "meshOverrideMaterial");
    __publicField(this, "lineOverrideMaterial");
    __publicField(this, "pointsOverrideMaterial");
    __publicField(this, "spriteOverrideMaterial");
    __publicField(this, "materialCacheMap");
    __publicField(this, "defaultAmbientLight");
    __publicField(this, "defaultDirectionalLight");
    __publicField(this, "backgroundCache");
    __publicField(this, "environmentCache");
    __publicField(this, "defaultPerspectiveCamera");
    __publicField(this, "defaultOrthograpbicCamera");
    __publicField(this, "axesHelper");
    __publicField(this, "gridHelper");
    __publicField(this, "showAxesHelper");
    __publicField(this, "showGridHelper");
    __publicField(this, "getDefaultPerspectiveCamera");
    __publicField(this, "getDefaultOrthographicCamera");
    __publicField(this, "setAxesHelper");
    __publicField(this, "setGridHelper");
    __publicField(this, "switchDisplayMode");
    __publicField(this, "setDisplayMode");
    this.cameraSet = new Set();
    this.lightSet = new Set();
    this.meshSet = new Set();
    this.lineSet = new Set();
    this.pointsSet = new Set();
    this.spriteSet = new Set();
    this.helperCompiler = new SceneHelperCompiler(this);
    this.resetHoverObjectSet = new Set();
    this.resetActiveObjectSet = new Set();
    if (config.hasDefaultPerspectiveCamera) {
      if (config.defaultPerspectiveCameraSetting) {
        this.defaultPerspectiveCamera = new PerspectiveCamera(config.defaultPerspectiveCameraSetting.fov, config.defaultPerspectiveCameraSetting.aspect, config.defaultPerspectiveCameraSetting.near, config.defaultPerspectiveCameraSetting.far);
      } else {
        this.defaultPerspectiveCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1e3);
      }
      this.defaultPerspectiveCamera.position.set(50, 50, 50);
      this.defaultPerspectiveCamera.lookAt(0, 0, 0);
      this.defaultPerspectiveCamera.name = "\u9ED8\u8BA4\u900F\u89C6\u76F8\u673A";
      this.cameraSet.add(this.defaultPerspectiveCamera);
      this.getDefaultPerspectiveCamera = function() {
        return this.defaultPerspectiveCamera;
      };
    }
    if (config.hasDefaultOrthographicCamera) {
      if (config.defaultOrthographicCameraSetting) {
        const setting = config.defaultOrthographicCameraSetting;
        this.defaultOrthograpbicCamera = new OrthographicCamera(setting.left, setting.right, setting.top, setting.bottom, setting.near, setting.far);
      } else {
        const domWidth = window.innerWidth / 2;
        const domHeight = window.innerHeight / 2;
        this.defaultOrthograpbicCamera = new OrthographicCamera(-domWidth / 8, domWidth / 8, domHeight / 8, -domHeight / 8, 1, 1e3);
      }
      this.defaultOrthograpbicCamera.name = "\u9ED8\u8BA4\u6B63\u4EA4\u76F8\u673A";
      this.cameraSet.add(this.defaultOrthograpbicCamera);
      this.getDefaultOrthographicCamera = function() {
        return this.defaultOrthograpbicCamera;
      };
      this.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 60, 0);
      });
      this.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, -60, 0);
      });
      this.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(60, 0, 0);
      });
      this.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(-60, 0, 0);
      });
      this.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 0, 60);
      });
      this.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 0, -60);
      });
    }
    if (config.hasAxesHelper) {
      this.axesHelper = new AxesHelper(500);
      this.axesHelper.matrixAutoUpdate = false;
      this.axesHelper.raycast = () => {
      };
      super.add(this.axesHelper);
      this.setAxesHelper = function(setting) {
        const axesHelper = this.axesHelper;
        if (setting.size) {
          const position = axesHelper.geometry.getAttribute("position");
          position.setX(setting.size, 1);
          position.setY(setting.size, 3);
          position.setZ(setting.size, 5);
          position.needsUpdate = true;
        }
        if (typeof setting.visiable !== void 0) {
          axesHelper.visible = setting.visiable;
        }
      };
      this.showAxesHelper = (show) => {
        if (show) {
          super.add(this.axesHelper);
        } else {
          super.remove(this.axesHelper);
        }
      };
    }
    if (config.hasGridHelper) {
      const gridHelper = new GridHelper(500, 50, "rgb(130, 130, 130)", "rgb(70, 70, 70)");
      gridHelper.raycast = () => {
      };
      if (gridHelper.material instanceof Material) {
        const material = gridHelper.material;
        material.transparent = true;
        material.opacity = 0.5;
        material.needsUpdate = true;
      }
      gridHelper.matrixAutoUpdate = false;
      gridHelper.raycast = () => {
      };
      this.gridHelper = gridHelper;
      super.add(gridHelper);
      this.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, Math.PI / 2);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, Math.PI / 2);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, (e) => {
        gridHelper.rotation.set(Math.PI / 2, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, (e) => {
        gridHelper.rotation.set(Math.PI / 2, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.showGridHelper = (show) => {
        if (show) {
          super.add(this.gridHelper);
        } else {
          super.remove(this.gridHelper);
        }
      };
    }
    if (config.hasDisplayMode) {
      const overrideColor = "rgb(250, 250, 250)";
      this.meshOverrideMaterial = new MeshLambertMaterial({ color: overrideColor });
      this.lineOverrideMaterial = new LineBasicMaterial({ color: overrideColor });
      this.pointsOverrideMaterial = new PointsMaterial({ color: overrideColor, size: 5, sizeAttenuation: false });
      this.spriteOverrideMaterial = new SpriteMaterial({ color: overrideColor });
      this.materialCacheMap = new WeakMap();
      this.defaultAmbientLight = new AmbientLight("rgb(255, 255, 255)", 0.5);
      this.defaultAmbientLight.matrixAutoUpdate = false;
      this.defaultDirectionalLight = new DirectionalLight("rgb(255, 255, 255)", 0.3);
      this.defaultDirectionalLight.castShadow = false;
      this.defaultDirectionalLight.position.set(-100, 100, 100);
      this.defaultDirectionalLight.updateMatrix();
      this.defaultDirectionalLight.updateMatrixWorld();
      this.defaultDirectionalLight.matrixAutoUpdate = false;
      this.switchDisplayMode = (mode) => {
        const filterMaterial = () => {
          const meterialCacheMap = this.materialCacheMap;
          const meshOverrideMaterial = this.meshOverrideMaterial;
          this.meshSet.forEach((mesh) => {
            meterialCacheMap.set(mesh, mesh.material);
            mesh.material = meshOverrideMaterial;
          });
          const lineOverrideMaterial = this.lineOverrideMaterial;
          this.lineSet.forEach((line) => {
            meterialCacheMap.set(line, line.material);
            line.material = lineOverrideMaterial;
          });
          const pointsOverrideMaterial = this.pointsOverrideMaterial;
          this.pointsSet.forEach((points) => {
            meterialCacheMap.set(points, points.material);
            points.material = pointsOverrideMaterial;
          });
          const spriteOverrideMaterial = this.spriteOverrideMaterial;
          this.spriteSet.forEach((sprite) => {
            meterialCacheMap.set(sprite, sprite.material);
            sprite.material = spriteOverrideMaterial;
          });
        };
        const reduceMaterial = () => {
          const meterialCacheMap = this.materialCacheMap;
          this.meshSet.forEach((mesh) => {
            if (meterialCacheMap.get(mesh)) {
              mesh.material = meterialCacheMap.get(mesh);
              meterialCacheMap.delete(mesh);
            }
          });
          this.lineSet.forEach((line) => {
            if (meterialCacheMap.get(line)) {
              line.material = meterialCacheMap.get(line);
              meterialCacheMap.delete(line);
            }
          });
          this.pointsSet.forEach((points) => {
            if (meterialCacheMap.get(points)) {
              points.material = meterialCacheMap.get(points);
              meterialCacheMap.delete(points);
            }
          });
          this.spriteSet.forEach((sprite) => {
            if (meterialCacheMap.get(sprite)) {
              sprite.material = meterialCacheMap.get(sprite);
              meterialCacheMap.delete(sprite);
            }
          });
        };
        const filterLight = () => {
          this.lightSet.forEach((light) => {
            super.remove(light);
          });
          super.add(this.defaultAmbientLight);
          super.add(this.defaultDirectionalLight);
        };
        const reduceLight = () => {
          this.lightSet.forEach((light) => {
            super.add(light);
          });
          super.remove(this.defaultAmbientLight);
          super.remove(this.defaultDirectionalLight);
        };
        const filterScene = () => {
          if (this.background instanceof Texture) {
            this.backgroundCache = this.background;
            this.background = null;
          }
          if (this.environment instanceof Texture) {
            this.environmentCache = this.environment;
            this.environment = null;
          }
        };
        const reduceScene = () => {
          if (this.backgroundCache) {
            this.background = this.backgroundCache;
            this.backgroundCache = void 0;
          }
          if (this.environmentCache) {
            this.environment = this.environmentCache;
            this.environmentCache = void 0;
          }
        };
        if (mode === SCENEDISPLAYMODE.GEOMETRY) {
          filterMaterial();
          filterScene();
          filterLight();
        } else if (mode === SCENEDISPLAYMODE.MATERIAL) {
          reduceMaterial();
          filterScene();
          filterLight();
        } else if (mode === SCENEDISPLAYMODE.LIGHT) {
          reduceMaterial();
          filterScene();
          reduceLight();
        } else if (mode === SCENEDISPLAYMODE.ENV) {
          reduceMaterial();
          reduceScene();
          reduceLight();
        } else {
          console.warn(`VisScene can not set this mode: ${mode}`);
        }
      };
      this.setDisplayMode = (mode) => {
        this.displayMode = mode;
        this.switchDisplayMode(mode);
      };
      if (config.displayMode !== void 0) {
        this.setDisplayMode(config.displayMode);
        this.switchDisplayMode(this.displayMode);
      } else {
        this.setDisplayMode(SCENEDISPLAYMODE.ENV);
        this.switchDisplayMode(this.displayMode);
      }
    }
  }
  getHelperCompiler() {
    return this.helperCompiler;
  }
  setObjectHelperVisiable(visiable) {
    this.helperCompiler.setVisiable(visiable);
  }
  setObjectHelperHover(...object) {
    const resetObjectSet = this.resetHoverObjectSet;
    const activeObjectSet = this.resetActiveObjectSet;
    object.forEach((elem, i, arr) => {
      resetObjectSet.delete(elem);
      if (activeObjectSet.has(elem)) {
        arr.splice(i, 1);
      }
    });
    activeObjectSet.forEach((elem) => {
      resetObjectSet.delete(elem);
    });
    this.helperCompiler.resetHelperColor(...resetObjectSet);
    resetObjectSet.clear();
    this.helperCompiler.setHelperHoverColor(...object);
    object.forEach((elem) => {
      resetObjectSet.add(elem);
    });
    return this;
  }
  setObjectHelperActive(...object) {
    const resetObjectSet = this.resetActiveObjectSet;
    object.forEach((elem) => {
      resetObjectSet.delete(elem);
    });
    this.helperCompiler.resetHelperColor(...resetObjectSet);
    resetObjectSet.clear();
    this.helperCompiler.setHelperActiveColor(...object);
    object.forEach((elem) => {
      resetObjectSet.add(elem);
    });
    return this;
  }
  showObjectHelper(show) {
    this.helperCompiler.setVisiable(show);
    return this;
  }
  setViewPoint(direction) {
    this.dispatchEvent({ type: `${direction}ViewPoint` });
  }
  add(...object) {
    let addNumber = 0;
    object.forEach((elem) => {
      if (elem instanceof Mesh) {
        this.meshSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Line) {
        this.lineSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Light) {
        this.lightSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Points) {
        this.pointsSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Sprite) {
        this.spriteSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Camera) {
        this.cameraSet.add(elem);
        addNumber += 1;
      }
      this.helperCompiler.add(elem);
    });
    if (this.displayMode !== void 0 && addNumber > 0) {
      this.switchDisplayMode(this.displayMode);
    }
    return super.add(...object);
  }
  remove(...object) {
    const materialCacheMap = this.materialCacheMap;
    object.forEach((elem) => {
      materialCacheMap && materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      if (elem instanceof Mesh) {
        this.meshSet.delete(elem);
      } else if (elem instanceof Line) {
        this.lineSet.delete(elem);
      } else if (elem instanceof Light) {
        this.lightSet.delete(elem);
      } else if (elem instanceof Points) {
        this.pointsSet.delete(elem);
      } else if (elem instanceof Sprite) {
        this.spriteSet.delete(elem);
      } else if (elem instanceof Camera) {
        this.cameraSet.delete(elem);
      }
      this.helperCompiler.remove(elem);
    });
    return super.remove(...object);
  }
  _add(...object) {
    return super.add(...object);
  }
  _remove(...object) {
    return super.remove(...object);
  }
  updateMaterial(object) {
    var _a;
    if (this.displayMode !== void 0 && this.displayMode === "geometry") {
      (_a = this.materialCacheMap) == null ? void 0 : _a.set(object, object.material);
      this.switchDisplayMode && this.switchDisplayMode(this.displayMode);
    }
    return this;
  }
}
var MODULETYPE;
(function(MODULETYPE2) {
  MODULETYPE2["CAMERA"] = "camera";
  MODULETYPE2["LIGHT"] = "light";
  MODULETYPE2["GEOMETRY"] = "geometry";
  MODULETYPE2["MODEL"] = "model";
  MODULETYPE2["TEXTURE"] = "texture";
  MODULETYPE2["MATERIAL"] = "material";
  MODULETYPE2["RENDERER"] = "renderer";
  MODULETYPE2["SCENE"] = "scene";
  MODULETYPE2["SPRITE"] = "sprite";
  MODULETYPE2["STRUCTURE"] = "structure";
  MODULETYPE2["CONTROLS"] = "controls";
})(MODULETYPE || (MODULETYPE = {}));
const ModelingScenePlugin = function(params) {
  if (this.scene instanceof ModelingScene) {
    console.warn("this has installed modeling scene plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  const scene = new ModelingScene(params);
  this.scene = scene;
  this.render = () => {
    this.webGLRenderer.render(scene, this.currentCamera);
    return this;
  };
  if (params.hasDefaultPerspectiveCamera) {
    const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera();
    this.currentCamera = defaultPerspectiveCamera;
    scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, (e) => {
      this.setCamera(defaultPerspectiveCamera);
    });
  }
  if (params.hasDefaultOrthographicCamera) {
    const defaultOrthograpbicCamera = scene.getDefaultOrthographicCamera();
    scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
    });
  }
  return true;
};
const ModelingSceneSupportPlugin = function(params) {
  if (ModelingScenePlugin.call(this, params)) {
    const dataSupport = this.dataSupportManager.getDataSupport(MODULETYPE.SCENE).getData();
    dataSupport.scene = generateConfig(CONFIGTYPE$1.SCENE);
    return true;
  } else {
    return false;
  }
};
var CONFIGTYPE;
(function(CONFIGTYPE2) {
  CONFIGTYPE2["BOXGEOMETRY"] = "BoxGeometry";
  CONFIGTYPE2["SPHEREGEOMETRY"] = "SphereGeometry";
  CONFIGTYPE2["LOADGEOMETRY"] = "LoadGeometry";
  CONFIGTYPE2["MODEL"] = "Model";
  CONFIGTYPE2["MESH"] = "Mesh";
  CONFIGTYPE2["LINE"] = "Line";
  CONFIGTYPE2["POINTS"] = "Points";
  CONFIGTYPE2["IMAGETEXTURE"] = "ImageTexture";
  CONFIGTYPE2["MESHSTANDARDMATERIAL"] = "MeshStandardMaterial";
  CONFIGTYPE2["MESHPHONGMATERIAL"] = "MeshPhongMaterial";
  CONFIGTYPE2["AMBIENTLIGHT"] = "AmbientLight";
  CONFIGTYPE2["SPOTLIGHT"] = "SpotLight";
  CONFIGTYPE2["POINTLIGHT"] = "PointLight";
  CONFIGTYPE2["PERSPECTIVECAMERA"] = "PerspectiveCamera";
  CONFIGTYPE2["ORTHOGRAPHICCAMERA"] = "OrthographicCamera";
  CONFIGTYPE2["WEBGLRENDERER"] = "WebGLRenderer";
  CONFIGTYPE2["SCENE"] = "Scene";
  CONFIGTYPE2["TRNASFORMCONTROLS"] = "TransformControls";
  CONFIGTYPE2["ORBITCONTROLS"] = "OrbitControls";
})(CONFIGTYPE || (CONFIGTYPE = {}));
const ScenePlugin = function(params) {
  if (this.scene) {
    console.warn("this has installed scene plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  this.scene = new Scene();
  this.render = () => {
    this.webGLRenderer.render(this.scene, this.currentCamera);
    return this;
  };
  const defalutCamera = new PerspectiveCamera();
  defalutCamera.position.set(50, 50, 50);
  defalutCamera.lookAt(0, 0, 0);
  this.currentCamera = defalutCamera;
  return true;
};
const SceneSupportPlugin = function(params) {
  if (ScenePlugin.call(this, params)) {
    const dataSupport = this.dataSupportManager.getDataSupport(MODULETYPE.SCENE).getData();
    dataSupport.scene = generateConfig(CONFIGTYPE.SCENE);
    return true;
  } else {
    return false;
  }
};
var RENDERERMANAGER;
(function(RENDERERMANAGER2) {
  RENDERERMANAGER2["RENDER"] = "render";
  RENDERERMANAGER2["PLAY"] = "play";
  RENDERERMANAGER2["STOP"] = "stop";
})(RENDERERMANAGER || (RENDERERMANAGER = {}));
var SCENESTATUSMANAGER;
(function(SCENESTATUSMANAGER2) {
  SCENESTATUSMANAGER2["HOVERCHANGE"] = "hover-change";
  SCENESTATUSMANAGER2["ACTIVECHANGE"] = "active-change";
})(SCENESTATUSMANAGER || (SCENESTATUSMANAGER = {}));
var POINTERMANAGER;
(function(POINTERMANAGER2) {
  POINTERMANAGER2["POINTERDOWN"] = "pointerdown";
  POINTERMANAGER2["POINTERMOVE"] = "pointermove";
  POINTERMANAGER2["POINTERUP"] = "pointerup";
})(POINTERMANAGER || (POINTERMANAGER = {}));
var MODELCOMPILER;
(function(MODELCOMPILER2) {
  MODELCOMPILER2["SETMATERIAL"] = "setMaterial";
})(MODELCOMPILER || (MODELCOMPILER = {}));
var LOADERMANAGER;
(function(LOADERMANAGER2) {
  LOADERMANAGER2["LOADING"] = "loading";
  LOADERMANAGER2["DETAILLOADING"] = "detailLoading";
  LOADERMANAGER2["DETAILLOADED"] = "detailLoaded";
  LOADERMANAGER2["LOADED"] = "loaded";
})(LOADERMANAGER || (LOADERMANAGER = {}));
const EVENTTYPE = {
  RENDERERMANAGER,
  SCENESTATUSMANAGER,
  POINTERMANAGER,
  MODELCOMPILER,
  LOADERMANAGER
};
class RenderManager extends EventDispatcher$1 {
  constructor() {
    super(...arguments);
    __publicField(this, "clock", new Clock());
    __publicField(this, "animationFrame", -1);
    __publicField(this, "render", () => {
      const clock = this.clock;
      const delta = clock.getDelta();
      const total = clock.getElapsedTime();
      this.dispatchEvent({
        type: RENDERERMANAGER.RENDER,
        delta,
        total
      });
    });
    __publicField(this, "play", () => {
      this.dispatchEvent({
        type: RENDERERMANAGER.PLAY
      });
      const playFun = () => {
        this.render();
        this.animationFrame = requestAnimationFrame(playFun);
      };
      playFun();
    });
    __publicField(this, "stop", () => {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = -1;
      this.dispatchEvent({
        type: RENDERERMANAGER.STOP
      });
    });
    __publicField(this, "checkHasRendering", () => {
      return this.animationFrame !== -1;
    });
    __publicField(this, "hasVaildRender", () => {
      if (!this._listeners) {
        return false;
      }
      const listener = this._listeners["render"];
      return listener && listener.length;
    });
  }
}
const RendererManagerPlugin = function() {
  if (this.renderManager) {
    console.warn("this has installed render manager plugin.");
    return false;
  }
  this.renderManager = new RenderManager();
  this.render && this.renderManager.addEventListener("render", this.render);
  this.render = function() {
    this.renderManager.render();
    return this;
  };
  this.play = function() {
    this.renderManager.play();
    return this;
  };
  this.stop = function() {
    this.renderManager.stop();
    return this;
  };
  return true;
};
class VisOrbitControls extends OrbitControls {
  constructor(camera, domElement) {
    super(camera, domElement);
    this.mouseButtons = {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    };
  }
  setCamera(camera) {
    this.object = camera;
    this.update();
    return this;
  }
}
const OrbitControlsPlugin = function(params) {
  if (this.orbitControls) {
    console.warn("this has installed orbitControls plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.warn("this must install renderer before install orbitControls plugin.");
    return false;
  }
  if (!this.renderManager) {
    console.warn("this must install renderManager before install orbitControls plugin.");
    return false;
  }
  this.orbitControls = new VisOrbitControls(this.currentCamera, this.dom);
  this.addEventListener("setCamera", (event) => {
    this.orbitControls.setCamera(event.camera);
  });
  this.renderManager.addEventListener("render", () => {
    this.orbitControls.update();
  });
  if (this.scene instanceof ModelingScene) {
    const scene = this.scene;
    scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = true;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
  }
  return true;
};
const OrbitControlsSupportPlugin = function(params) {
  if (OrbitControlsPlugin.call(this, params)) {
    const dataSupport = this.dataSupportManager.getDataSupport(MODULETYPE.CONTROLS).getData();
    dataSupport[CONFIGTYPE$1.ORBITCONTROLS] = generateConfig(CONFIGTYPE$1.ORBITCONTROLS);
    return true;
  } else {
    return false;
  }
};
class VisStats {
  constructor(parameters) {
    __publicField(this, "REVISION");
    __publicField(this, "dom");
    __publicField(this, "addPanel");
    __publicField(this, "showPanel");
    __publicField(this, "begin");
    __publicField(this, "end");
    __publicField(this, "update");
    __publicField(this, "domElement");
    __publicField(this, "setMode");
    const stats = Stats();
    this.REVISION = stats.REVISION;
    this.dom = stats.dom;
    this.domElement = stats.domElement;
    this.begin = stats.begin.bind(stats);
    this.end = stats.end.bind(stats);
    this.update = stats.update.bind(stats);
    this.addPanel = stats.addPanel.bind(stats);
    this.showPanel = stats.showPanel.bind(stats);
    this.setMode = stats.setMode.bind(stats);
    const dom = this.domElement;
    dom.style.position = "absolute";
    dom.style.top = "0";
    dom.style.left = "35px";
    if (parameters) {
      dom.style.top = `${parameters.top}px`;
      dom.style.left = `${parameters.left}px`;
      dom.style.right = `${parameters.right}px`;
      dom.style.bottom = `${parameters.bottom}px`;
    }
  }
}
const StatsPlugin = function(params) {
  if (this.stats) {
    console.warn("this has installed stats plugin.");
    return false;
  }
  if (!this.renderManager) {
    console.warn("this must install renderManager before install orbitControls plugin.");
    return false;
  }
  const stats = new VisStats(params);
  this.stats = stats;
  this.setStats = function(show) {
    if (show) {
      this.dom.appendChild(this.stats.domElement);
    } else {
      try {
        this.dom.removeChild(this.stats.domElement);
      } catch (error) {
      }
    }
    return this;
  };
  this.renderManager.addEventListener("render", () => {
    this.stats.update();
  });
  return true;
};
const EffectComposerPlugin = function(params) {
  if (this.effectComposer) {
    console.warn("this has installed effect composer plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  let composer;
  if (params == null ? void 0 : params.WebGLMultisampleRenderTarget) {
    const renderer = this.webGLRenderer;
    const pixelRatio = renderer.getPixelRatio();
    const size = renderer.getDrawingBufferSize(new Vector2());
    composer = new EffectComposer(renderer, new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
      format: RGBAFormat
    }));
  } else {
    composer = new EffectComposer(this.webGLRenderer);
  }
  this.effectComposer = composer;
  let renderPass;
  if (this.scene) {
    renderPass = new RenderPass(this.scene, this.currentCamera);
  } else {
    console.error(`composer con not found support scene plugin.`);
    return false;
  }
  composer.addPass(renderPass);
  this.addEventListener("setCamera", (event) => {
    renderPass.camera = event.camera;
  });
  this.addEventListener("setSize", (event) => {
    composer.setSize(event.width, event.height);
  });
  if (this.renderManager) {
    this.renderManager.removeEventListener("render", this.render);
  }
  this.render = () => {
    this.effectComposer.render();
    return this;
  };
  if (this.renderManager) {
    this.renderManager.addEventListener("render", (event) => {
      this.effectComposer.render(event.delta);
    });
  }
  return true;
};
class PointerManager extends EventDispatcher {
  constructor(parameters) {
    super();
    __publicField(this, "dom");
    __publicField(this, "mouse");
    __publicField(this, "canMouseMove");
    __publicField(this, "mouseEventTimer");
    __publicField(this, "throttleTime");
    const dom = parameters.dom;
    this.dom = dom;
    this.mouse = new Vector2();
    this.canMouseMove = true;
    this.mouseEventTimer = null;
    this.throttleTime = parameters.throttleTime || 1e3 / 60;
    dom.addEventListener("pointerdown", (event) => {
      this.pointerDown(event);
    });
    dom.addEventListener("pointermove", (event) => {
      if (!this.canMouseMove) {
        return;
      }
      this.canMouseMove = false;
      this.mouseEventTimer = setTimeout(() => {
        const mouse = this.mouse;
        const dom2 = this.dom;
        mouse.x = event.offsetX / dom2.offsetWidth * 2 - 1;
        mouse.y = -(event.offsetY / dom2.offsetHeight) * 2 + 1;
        this.canMouseMove = true;
        this.pointerMove(event);
      }, this.throttleTime);
    });
    dom.addEventListener("pointerup", (event) => {
      this.pointerUp(event);
    });
  }
  getMousePoint() {
    return this.mouse;
  }
  pointerDown(event) {
    const eventObject = { mouse: this.mouse };
    for (let key in event) {
      eventObject[key] = event[key];
    }
    this.dispatchEvent(eventObject);
  }
  pointerMove(event) {
    const eventObject = { mouse: this.mouse };
    for (let key in event) {
      eventObject[key] = event[key];
    }
    this.dispatchEvent(eventObject);
  }
  pointerUp(event) {
    const eventObject = { mouse: this.mouse };
    for (let key in event) {
      eventObject[key] = event[key];
    }
    this.dispatchEvent(eventObject);
  }
}
const PointerManagerPlugin = function(params) {
  if (this.pointerManager) {
    console.warn("this has installed pointerManager plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  const pointerManager = new PointerManager(Object.assign(params || {}, {
    dom: this.dom
  }));
  this.pointerManager = pointerManager;
  return true;
};
class EventManager extends EventDispatcher {
  constructor(parameters) {
    super();
    __publicField(this, "raycaster");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "recursive", false);
    __publicField(this, "penetrate", false);
    this.raycaster = new Raycaster();
    this.camera = parameters.camera;
    this.scene = parameters.scene;
    parameters.recursive && (this.recursive = parameters.recursive);
    parameters.penetrate && (this.penetrate = parameters.penetrate);
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  intersectObject(mouse) {
    this.raycaster.setFromCamera(mouse, this.camera);
    return this.raycaster.intersectObjects(this.scene.children, this.recursive);
  }
  use(pointerManager) {
    const mergeEvent = function(event, object) {
      return Object.assign({}, event, object);
    };
    pointerManager.addEventListener("pointerdown", (event) => {
      const intersections = this.intersectObject(event.mouse);
      this.dispatchEvent(mergeEvent(event, {
        type: "pointerdown",
        intersections
      }));
      this.dispatchEvent(mergeEvent(event, {
        type: "mousedown",
        intersections
      }));
      if (intersections.length) {
        if (this.penetrate) {
          for (let intersection of intersections) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointerdown",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "mousedown",
              intersection
            }));
          }
        } else {
          const intersection = intersections[0];
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointerdown",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "mousedown",
            intersection
          }));
        }
      }
    });
    const cacheObjectMap = new Map();
    pointerManager.addEventListener("pointermove", (event) => {
      const intersections = this.intersectObject(event.mouse);
      this.dispatchEvent(mergeEvent(event, {
        type: "pointermove",
        intersections
      }));
      this.dispatchEvent(mergeEvent(event, {
        type: "mousemove",
        intersections
      }));
      if (intersections.length) {
        if (this.penetrate) {
          for (let intersection of intersections) {
            if (cacheObjectMap.has(intersection.object)) {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "pointermove",
                intersection
              }));
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "mousemove",
                intersection
              }));
            } else {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "pointerenter",
                intersection
              }));
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "mouseenter",
                intersection
              }));
            }
          }
        } else {
          const intersection = intersections[0];
          if (cacheObjectMap.has(intersection.object)) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointermove",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "mousemove",
              intersection
            }));
          } else {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointerenter",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "mouseenter",
              intersection
            }));
          }
        }
        for (let intersection of intersections) {
          cacheObjectMap.set(intersection.object, intersection);
        }
      } else {
        cacheObjectMap.forEach((intersection) => {
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointerleave",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "mouseleave",
            intersection
          }));
        });
        cacheObjectMap.clear();
      }
    });
    pointerManager.addEventListener("pointerup", (event) => {
      const intersections = this.intersectObject(event.mouse);
      this.dispatchEvent(mergeEvent(event, {
        type: "pointerup",
        intersections
      }));
      this.dispatchEvent(mergeEvent(event, {
        type: "mouseup",
        intersections
      }));
      this.dispatchEvent(mergeEvent(event, {
        type: "click",
        intersections
      }));
      if (intersections.length) {
        if (this.penetrate) {
          for (let intersection of intersections) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointerup",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "mouseup",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "click",
              intersection
            }));
          }
        } else {
          const intersection = intersections[0];
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointerup",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "mouseup",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "click",
            intersection
          }));
        }
      }
    });
    return this;
  }
}
const EventManagerPlugin = function(params) {
  if (this.eventManager) {
    console.warn("engine has installed eventManager plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  if (!this.pointerManager) {
    console.error("must install pointerManager before this plugin.");
    return false;
  }
  const eventManager = new EventManager(Object.assign({
    scene: this.scene,
    camera: this.currentCamera
  }, params));
  eventManager.use(this.pointerManager);
  this.eventManager = eventManager;
  this.addEventListener("setCamera", (event) => {
    this.eventManager.setCamera(event.camera);
  });
  if (this.scene instanceof ModelingScene) {
    this.eventManager.addEventListener("pointermove", (event) => {
      this.scene.setObjectHelperHover(...event.intersections.map((elem) => elem.object));
    });
    this.eventManager.addEventListener("click", (event) => {
      if (this.transing) {
        this.transing = false;
        return;
      }
      if (event.button === 0) {
        this.scene.setObjectHelperActive(...event.intersections.map((elem) => elem.object));
      }
    });
  }
  return true;
};
const EventManagerSupportPlugin = function(params) {
  if (EventManagerPlugin.call(this, params)) {
    const generateGlobalSupportEvent = (event, type) => {
      const newEvent = Object.assign({}, event);
      newEvent.type = type;
      newEvent.vidList = [];
      if (newEvent.intersections && newEvent.intersections.length) {
        newEvent.vidList = newEvent.intersections.map((intersection) => {
          const vid = this.compilerManager.getObjectVid(intersection.object);
          if (!vid) {
            console.warn(`can not found this object symbol vid in compiler manager: ${intersection.object}`);
          }
          return vid;
        });
      }
      return newEvent;
    };
    this.eventManager.addEventListener("pointermove", (event) => {
      this.eventManager.dispatchEvent(generateGlobalSupportEvent(event, "pointermove-support"));
    });
    this.eventManager.addEventListener("pointerdown", (event) => {
      this.eventManager.dispatchEvent(generateGlobalSupportEvent(event, "pointerdown-support"));
    });
    this.eventManager.addEventListener("pointerup", (event) => {
      this.eventManager.dispatchEvent(generateGlobalSupportEvent(event, "pointerup-support"));
    });
    this.eventManager.addEventListener("click", (event) => {
      this.eventManager.dispatchEvent(generateGlobalSupportEvent(event, "click-support"));
    });
    return true;
  } else {
    return false;
  }
};
var VISTRANSFORMEVENTTYPE;
(function(VISTRANSFORMEVENTTYPE2) {
  VISTRANSFORMEVENTTYPE2["OBJECTCHANGE"] = "objectChange";
  VISTRANSFORMEVENTTYPE2["OBJECTCHANGED"] = "objectChanged";
})(VISTRANSFORMEVENTTYPE || (VISTRANSFORMEVENTTYPE = {}));
class VisTransformControls extends TransformControls {
  constructor(camera, dom) {
    super(camera, dom);
    __publicField(this, "target");
    __publicField(this, "transObjectSet");
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this._onPointerDown = (event) => {
      var _a;
      if (!this.enabled || !((_a = this.object) == null ? void 0 : _a.parent))
        return;
      this.domElement.setPointerCapture(event.pointerId);
      this.domElement.addEventListener("pointermove", this._onPointerMove);
      this.pointerHover(this._getPointer(event));
      this.pointerDown(this._getPointer(event));
    };
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.target = new Object3D();
    this.transObjectSet = new Set();
    let mode = "";
    let target = this.target;
    let transObjectSet = this.transObjectSet;
    let cachaTargetTrans = {
      x: 0,
      y: 0,
      z: 0
    };
    let objectMatrixAutoMap = new WeakMap();
    this.addEventListener("mouseDown", (event) => {
      mode = event.target.mode;
      mode === "translate" && (mode = "position");
      mode === "rotate" && (mode = "rotation");
      cachaTargetTrans.x = target[mode].x;
      cachaTargetTrans.y = target[mode].y;
      cachaTargetTrans.z = target[mode].z;
      transObjectSet.forEach((object) => {
        objectMatrixAutoMap.set(object, object.matrixAutoUpdate);
        object.matrixAutoUpdate = false;
      });
    });
    this.addEventListener("objectChange", (event) => {
      const offsetX = target[mode].x - cachaTargetTrans.x;
      const offsetY = target[mode].y - cachaTargetTrans.y;
      const offsetZ = target[mode].z - cachaTargetTrans.z;
      cachaTargetTrans.x = target[mode].x;
      cachaTargetTrans.y = target[mode].y;
      cachaTargetTrans.z = target[mode].z;
      transObjectSet.forEach((elem) => {
        elem[mode].x += offsetX;
        elem[mode].y += offsetY;
        elem[mode].z += offsetZ;
        elem.updateMatrix();
        elem.updateMatrixWorld();
      });
      this.dispatchEvent({
        type: VISTRANSFORMEVENTTYPE.OBJECTCHANGED,
        transObjectSet,
        mode,
        target
      });
    });
    this.addEventListener("mouseUp", (event) => {
      transObjectSet.forEach((object) => {
        object.matrixAutoUpdate = objectMatrixAutoMap.get(object);
        objectMatrixAutoMap.delete(object);
      });
    });
  }
  getTarget() {
    return this.target;
  }
  getTransObjectSet() {
    return this.transObjectSet;
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  setAttach(...object) {
    this.transObjectSet.clear();
    if (!object.length || !object[0]) {
      this.detach();
      return this;
    }
    this.attach(this.target);
    const target = this.target;
    if (object.length === 1) {
      const currentObject = object[0];
      target.scale.copy(currentObject.scale);
      target.rotation.copy(currentObject.rotation);
      target.position.copy(currentObject.position);
      target.updateMatrix();
      target.updateMatrixWorld();
      this.transObjectSet.add(currentObject);
      return this;
    }
    const xList = [];
    const yList = [];
    const zList = [];
    object.forEach((elem) => {
      xList.push(elem.position.x);
      yList.push(elem.position.y);
      zList.push(elem.position.z);
    });
    target.rotation.set(0, 0, 0);
    target.scale.set(0, 0, 0);
    target.position.x = (Math.max(...xList) - Math.min(...xList)) / 2 + Math.min(...xList);
    target.position.y = (Math.max(...yList) - Math.min(...yList)) / 2 + Math.min(...yList);
    target.position.z = (Math.max(...zList) - Math.min(...zList)) / 2 + Math.min(...zList);
    target.updateMatrix();
    target.updateMatrixWorld();
    object.forEach((elem) => {
      this.transObjectSet.add(elem);
    });
    return this;
  }
}
const TransformControlsPlugin = function(params) {
  if (this.transformControls) {
    console.warn("this has installed transformControls plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.warn("this must install renderer before install transformControls plugin.");
    return false;
  }
  if (!this.pointerManager) {
    console.warn("this must install pointerManager before install transformControls plugin.");
    return false;
  }
  if (!this.eventManager) {
    console.warn("this must install eventManager before install transformControls plugin.");
    return false;
  }
  const transformControls = new VisTransformControls(this.currentCamera, this.dom);
  this.transformControls = transformControls;
  this.transing = false;
  transformControls.addEventListener("mouseDown", () => {
    this.transing = true;
  });
  if (this.scene instanceof Scene) {
    this.scene.add(this.transformControls);
    this.scene.add(this.transformControls.target);
  } else if (this.scene instanceof ModelingScene) {
    this.scene._add(this.transformControls);
    this.scene._add(this.transformControls.target);
  }
  this.setTransformControls = function(show) {
    this.transformControls.visible = show;
    return this;
  };
  this.addEventListener("setCamera", (event) => {
    transformControls.setCamera(event.camera);
  });
  this.eventManager.addEventListener("pointerup", (event) => {
    if (this.transing) {
      return;
    }
    if (event.button === 0) {
      const objectList = event.intersections.map((elem) => elem.object);
      transformControls.setAttach(objectList[0]);
    }
  });
  return true;
};
const TransformControlsSupportPlugin = function(params) {
  if (TransformControlsPlugin.call(this, params)) {
    const dataSupport = this.dataSupportManager.getDataSupport(MODULETYPE.CONTROLS).getData();
    dataSupport[CONFIGTYPE$1.TRNASFORMCONTROLS] = generateConfig(CONFIGTYPE$1.TRNASFORMCONTROLS);
    return true;
  } else {
    return false;
  }
};
const WebGLRendererPlugin = function(params) {
  if (this.webGLRenderer) {
    console.warn("this has installed webglRenderer plugin.");
    return false;
  }
  this.webGLRenderer = new WebGLRenderer(params);
  this.dom = this.webGLRenderer.domElement;
  this.setSize = function(width, height) {
    var _a, _b;
    if (width && width <= 0 || height && height <= 0) {
      console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
      return this;
    }
    !width && (width = (_a = this.dom) == null ? void 0 : _a.offsetWidth);
    !height && (height = (_b = this.dom) == null ? void 0 : _b.offsetHeight);
    this.dispatchEvent({ type: "setSize", width, height });
    return this;
  };
  this.setCamera = function setCamera(camera) {
    this.currentCamera = camera;
    this.dispatchEvent({
      type: "setCamera",
      camera
    });
    return this;
  };
  this.setDom = function(dom) {
    this.dom = dom;
    dom.appendChild(this.webGLRenderer.domElement);
    return this;
  };
  this.addEventListener("setSize", (event) => {
    const width = event.width;
    const height = event.height;
    this.webGLRenderer.setSize(width, height, true);
    const camera = this.currentCamera;
    if (camera) {
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = event.width / event.height;
        camera.updateProjectionMatrix();
      } else if (camera instanceof OrthographicCamera) {
        camera.left = -width / 16;
        camera.right = width / 16;
        camera.top = height / 16;
        camera.bottom = -height / 16;
        camera.updateProjectionMatrix();
      }
    }
  });
  this.addEventListener("dispose", () => {
    this.webGLRenderer.dispose();
  });
  return true;
};
const WebGLRendererSupportPlugin = function(params) {
  if (WebGLRendererPlugin.call(this, params)) {
    const dataSupport = this.dataSupportManager.getDataSupport(MODULETYPE.RENDERER).getData();
    if (!dataSupport.WebGLRenderer) {
      dataSupport.WebGLRenderer = generateConfig(CONFIGTYPE.WEBGLRENDERER);
    }
    return true;
  } else {
    return false;
  }
};
var EnginePlugin;
(function(EnginePlugin2) {
  EnginePlugin2["WEBGLRENDERER"] = "WebGLRenderer";
  EnginePlugin2["SCENE"] = "Scene";
  EnginePlugin2["MODELINGSCENE"] = "ModelingScene";
  EnginePlugin2["RENDERMANAGER"] = "RenderManager";
  EnginePlugin2["ORBITCONTROLS"] = "OrbitControls";
  EnginePlugin2["STATS"] = "Stats";
  EnginePlugin2["EFFECTCOMPOSER"] = "EffectComposer";
  EnginePlugin2["POINTERMANAGER"] = "PointerManager";
  EnginePlugin2["EVENTMANAGER"] = "EventManager";
  EnginePlugin2["TRANSFORMCONTROLS"] = "TransformControls";
})(EnginePlugin || (EnginePlugin = {}));
let pluginHandler$1 = new Map();
pluginHandler$1.set("WebGLRenderer", WebGLRendererPlugin);
pluginHandler$1.set("Scene", ScenePlugin);
pluginHandler$1.set("ModelingScene", ModelingScenePlugin);
pluginHandler$1.set("RenderManager", RendererManagerPlugin);
pluginHandler$1.set("OrbitControls", OrbitControlsPlugin);
pluginHandler$1.set("Stats", StatsPlugin);
pluginHandler$1.set("EffectComposer", EffectComposerPlugin);
pluginHandler$1.set("PointerManager", PointerManagerPlugin);
pluginHandler$1.set("EventManager", EventManagerPlugin);
pluginHandler$1.set("TransformControls", TransformControlsPlugin);
const _Engine = class extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "completeSet");
    __publicField(this, "dom");
    __publicField(this, "webGLRenderer");
    __publicField(this, "currentCamera");
    __publicField(this, "scene");
    __publicField(this, "orbitControls");
    __publicField(this, "transformControls");
    __publicField(this, "effectComposer");
    __publicField(this, "renderManager");
    __publicField(this, "pointerManager");
    __publicField(this, "eventManager");
    __publicField(this, "stats");
    __publicField(this, "transing");
    __publicField(this, "setSize");
    __publicField(this, "setCamera");
    __publicField(this, "setDom");
    __publicField(this, "setStats");
    __publicField(this, "setTransformControls");
    __publicField(this, "play");
    __publicField(this, "stop");
    __publicField(this, "render");
    this.completeSet = new Set();
    this.render = function() {
      console.warn("can not install some plugin");
      return this;
    };
  }
  install(plugin, params) {
    if (_Engine.pluginHandler.has(plugin)) {
      _Engine.pluginHandler.get(plugin).call(this, params);
    } else {
      console.error(`engine can not support ${plugin} plugin.`);
    }
    return this;
  }
  complete() {
    this.completeSet.forEach((fun) => {
      fun(this);
    });
    this.completeSet = void 0;
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
    return this;
  }
};
let Engine = _Engine;
__publicField(Engine, "pluginHandler", pluginHandler$1);
__publicField(Engine, "register", function(name, handler) {
  _Engine.pluginHandler && _Engine.pluginHandler.set(name, handler);
});
__publicField(Engine, "dispose", function() {
  _Engine.pluginHandler = void 0;
});
class DisplayEngine extends Engine {
  constructor() {
    super();
    this.install(EnginePlugin.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    });
    this.install(EnginePlugin.SCENE);
    this.install(EnginePlugin.RENDERMANAGER);
    this.install(EnginePlugin.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    });
    this.install(EnginePlugin.ORBITCONTROLS);
    this.install(EnginePlugin.POINTERMANAGER);
    this.install(EnginePlugin.EVENTMANAGER);
  }
}
class ModelingEngine extends Engine {
  constructor() {
    super();
    this.install(EnginePlugin.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    });
    this.install(EnginePlugin.MODELINGSCENE, {
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: "env"
    });
    this.install(EnginePlugin.RENDERMANAGER);
    this.install(EnginePlugin.STATS);
    this.install(EnginePlugin.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    });
    this.install(EnginePlugin.ORBITCONTROLS);
    this.install(EnginePlugin.POINTERMANAGER);
    this.install(EnginePlugin.EVENTMANAGER);
    this.install(EnginePlugin.TRANSFORMCONTROLS);
  }
}
function isValidKey(key, object) {
  return key in object;
}
function getConfigModelMap() {
  return {
    [CONFIGTYPE$1.IMAGETEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE$1.MESHSTANDARDMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE$1.MESHPHONGMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE$1.AMBIENTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE$1.SPOTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE$1.POINTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE$1.BOXGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE$1.SPHEREGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE$1.LOADGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE$1.MODEL]: MODULETYPE.MODEL,
    [CONFIGTYPE$1.PERSPECTIVECAMERA]: MODULETYPE.CAMERA,
    [CONFIGTYPE$1.ORTHOGRAPHICCAMERA]: MODULETYPE.CAMERA,
    [CONFIGTYPE$1.WEBGLRENDERER]: MODULETYPE.RENDERER,
    [CONFIGTYPE$1.SCENE]: MODULETYPE.SCENE,
    [CONFIGTYPE$1.TRNASFORMCONTROLS]: MODULETYPE.CONTROLS
  };
}
const _ProxyBroadcast = class extends EventDispatcher {
  constructor() {
    super();
  }
  proxyExtends(object, path) {
    if (!path) {
      path = [];
    }
    if (_ProxyBroadcast.proxyWeakSet.has(object) || typeof object !== "object" && object !== null) {
      return object;
    }
    const handler = {
      get: (target, key) => {
        return Reflect.get(target, key);
      },
      set: (target, key, value) => {
        let result;
        if (target[key] === void 0) {
          if (typeof value === "object" && value !== null) {
            const newPath = path.concat([key]);
            value = this.proxyExtends(value, newPath);
          }
          result = Reflect.set(target, key, value);
          this.broadcast({
            operate: "add",
            path: path.concat([]),
            key,
            value
          });
        } else {
          if (typeof value === "object" && !_ProxyBroadcast.proxyWeakSet.has(object)) {
            const newPath = path.concat([key]);
            value = this.proxyExtends(value, newPath);
          }
          result = Reflect.set(target, key, value);
          this.broadcast({
            operate: "set",
            path: path.concat([]),
            key,
            value
          });
        }
        return result;
      },
      deleteProperty: (target, key) => {
        const result = Reflect.deleteProperty(target, key);
        this.broadcast({
          operate: "delete",
          path: path.concat([]),
          key,
          value: ""
        });
        return result;
      }
    };
    if (typeof object === "object" && object !== null) {
      for (const key in object) {
        const tempPath = path.concat([key]);
        if (isValidKey(key, object) && typeof object[key] === "object" && object[key] !== null) {
          object[key] = this.proxyExtends(object[key], tempPath);
        }
      }
    }
    return new Proxy(object, handler);
  }
  broadcast({ operate, path, key, value }) {
    const filterMap = {
      __poto__: true,
      length: true
    };
    if (isValidKey(key, filterMap) && filterMap[key]) {
      return this;
    }
    this.dispatchEvent({
      type: "broadcast",
      notice: { operate, path, key, value }
    });
    return this;
  }
};
let ProxyBroadcast = _ProxyBroadcast;
__publicField(ProxyBroadcast, "proxyWeakSet", new WeakSet());
class Translater {
  constructor() {
    __publicField(this, "rule");
    __publicField(this, "memberSet");
    this.rule = function() {
    };
    this.memberSet = new Set();
  }
  apply(compiler) {
    this.memberSet.add(compiler);
    return this;
  }
  cancel(compiler) {
    this.memberSet.delete(compiler);
    return this;
  }
  setRule(rule) {
    this.rule = rule;
    return this;
  }
  translate(notice) {
    const rule = this.rule;
    this.memberSet.forEach((compiler) => {
      rule(notice, compiler);
    });
    return this;
  }
}
class DataSupport {
  constructor(rule, data) {
    __publicField(this, "data");
    __publicField(this, "broadcast");
    __publicField(this, "translater");
    this.translater = new Translater().setRule(rule);
    this.broadcast = new ProxyBroadcast();
    this.data = this.broadcast.proxyExtends(data);
    this.broadcast.addEventListener("broadcast", (event) => {
      this.translater.translate(event.notice);
    });
  }
  getData() {
    return this.data;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  proxyData(data) {
    this.data = this.broadcast.proxyExtends(data);
    return this.data;
  }
  addCompiler(compiler) {
    compiler.setTarget(this.data);
    compiler.compileAll();
    this.translater.apply(compiler);
    return this;
  }
  toJSON() {
    return JSON.stringify(this.data);
  }
  load(config) {
    const data = this.data;
    for (const key in config) {
      data[key] = config[key];
    }
    return this;
  }
}
var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
const LightRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    compiler.set(path.concat([]), key, value);
  }
};
class LightDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(LightRule, data);
  }
}
const ModelRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
  }
};
class ModelDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(ModelRule, data);
  }
}
const _object_pattern = /^[og]\s*(.+)?/;
const _material_library_pattern = /^mtllib /;
const _material_use_pattern = /^usemtl /;
const _map_use_pattern = /^usemap /;
const _vA = new Vector3();
const _vB = new Vector3();
const _vC = new Vector3();
const _ab = new Vector3();
const _cb = new Vector3();
function ParserState() {
  const state = {
    objects: [],
    object: {},
    vertices: [],
    normals: [],
    colors: [],
    uvs: [],
    materials: {},
    materialLibraries: [],
    startObject: function(name, fromDeclaration) {
      if (this.object && this.object.fromDeclaration === false) {
        this.object.name = name;
        this.object.fromDeclaration = fromDeclaration !== false;
        return;
      }
      const previousMaterial = this.object && typeof this.object.currentMaterial === "function" ? this.object.currentMaterial() : void 0;
      if (this.object && typeof this.object._finalize === "function") {
        this.object._finalize(true);
      }
      this.object = {
        name: name || "",
        fromDeclaration: fromDeclaration !== false,
        geometry: {
          vertices: [],
          normals: [],
          colors: [],
          uvs: [],
          hasUVIndices: false
        },
        materials: [],
        smooth: true,
        startMaterial: function(name2, libraries) {
          const previous = this._finalize(false);
          if (previous && (previous.inherited || previous.groupCount <= 0)) {
            this.materials.splice(previous.index, 1);
          }
          const material = {
            index: this.materials.length,
            name: name2 || "",
            mtllib: Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : "",
            smooth: previous !== void 0 ? previous.smooth : this.smooth,
            groupStart: previous !== void 0 ? previous.groupEnd : 0,
            groupEnd: -1,
            groupCount: -1,
            inherited: false,
            clone: function(index) {
              const cloned = {
                index: typeof index === "number" ? index : this.index,
                name: this.name,
                mtllib: this.mtllib,
                smooth: this.smooth,
                groupStart: 0,
                groupEnd: -1,
                groupCount: -1,
                inherited: false
              };
              cloned.clone = this.clone.bind(cloned);
              return cloned;
            }
          };
          this.materials.push(material);
          return material;
        },
        currentMaterial: function() {
          if (this.materials.length > 0) {
            return this.materials[this.materials.length - 1];
          }
          return void 0;
        },
        _finalize: function(end) {
          const lastMultiMaterial = this.currentMaterial();
          if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
            lastMultiMaterial.inherited = false;
          }
          if (end && this.materials.length > 1) {
            for (let mi = this.materials.length - 1; mi >= 0; mi--) {
              if (this.materials[mi].groupCount <= 0) {
                this.materials.splice(mi, 1);
              }
            }
          }
          if (end && this.materials.length === 0) {
            this.materials.push({
              name: "",
              smooth: this.smooth
            });
          }
          return lastMultiMaterial;
        }
      };
      if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === "function") {
        const declared = previousMaterial.clone(0);
        declared.inherited = true;
        this.object.materials.push(declared);
      }
      this.objects.push(this.object);
    },
    finalize: function() {
      if (this.object && typeof this.object._finalize === "function") {
        this.object._finalize(true);
      }
    },
    parseVertexIndex: function(value, len) {
      const index = parseInt(value, 10);
      return (index >= 0 ? index - 1 : index + len / 3) * 3;
    },
    parseNormalIndex: function(value, len) {
      const index = parseInt(value, 10);
      return (index >= 0 ? index - 1 : index + len / 3) * 3;
    },
    parseUVIndex: function(value, len) {
      const index = parseInt(value, 10);
      return (index >= 0 ? index - 1 : index + len / 2) * 2;
    },
    addVertex: function(a, b, c) {
      const src = this.vertices;
      const dst = this.object.geometry.vertices;
      dst.push(src[a + 0], src[a + 1], src[a + 2]);
      dst.push(src[b + 0], src[b + 1], src[b + 2]);
      dst.push(src[c + 0], src[c + 1], src[c + 2]);
    },
    addVertexPoint: function(a) {
      const src = this.vertices;
      const dst = this.object.geometry.vertices;
      dst.push(src[a + 0], src[a + 1], src[a + 2]);
    },
    addVertexLine: function(a) {
      const src = this.vertices;
      const dst = this.object.geometry.vertices;
      dst.push(src[a + 0], src[a + 1], src[a + 2]);
    },
    addNormal: function(a, b, c) {
      const src = this.normals;
      const dst = this.object.geometry.normals;
      dst.push(src[a + 0], src[a + 1], src[a + 2]);
      dst.push(src[b + 0], src[b + 1], src[b + 2]);
      dst.push(src[c + 0], src[c + 1], src[c + 2]);
    },
    addFaceNormal: function(a, b, c) {
      const src = this.vertices;
      const dst = this.object.geometry.normals;
      _vA.fromArray(src, a);
      _vB.fromArray(src, b);
      _vC.fromArray(src, c);
      _cb.subVectors(_vC, _vB);
      _ab.subVectors(_vA, _vB);
      _cb.cross(_ab);
      _cb.normalize();
      dst.push(_cb.x, _cb.y, _cb.z);
      dst.push(_cb.x, _cb.y, _cb.z);
      dst.push(_cb.x, _cb.y, _cb.z);
    },
    addColor: function(a, b, c) {
      const src = this.colors;
      const dst = this.object.geometry.colors;
      if (src[a] !== void 0)
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
      if (src[b] !== void 0)
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
      if (src[c] !== void 0)
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
    },
    addUV: function(a, b, c) {
      const src = this.uvs;
      const dst = this.object.geometry.uvs;
      dst.push(src[a + 0], src[a + 1]);
      dst.push(src[b + 0], src[b + 1]);
      dst.push(src[c + 0], src[c + 1]);
    },
    addDefaultUV: function() {
      const dst = this.object.geometry.uvs;
      dst.push(0, 0);
      dst.push(0, 0);
      dst.push(0, 0);
    },
    addUVLine: function(a) {
      const src = this.uvs;
      const dst = this.object.geometry.uvs;
      dst.push(src[a + 0], src[a + 1]);
    },
    addFace: function(a, b, c, ua, ub, uc, na, nb, nc) {
      const vLen = this.vertices.length;
      let ia = this.parseVertexIndex(a, vLen);
      let ib = this.parseVertexIndex(b, vLen);
      let ic = this.parseVertexIndex(c, vLen);
      this.addVertex(ia, ib, ic);
      this.addColor(ia, ib, ic);
      if (na !== void 0 && na !== "") {
        const nLen = this.normals.length;
        ia = this.parseNormalIndex(na, nLen);
        ib = this.parseNormalIndex(nb, nLen);
        ic = this.parseNormalIndex(nc, nLen);
        this.addNormal(ia, ib, ic);
      } else {
        this.addFaceNormal(ia, ib, ic);
      }
      if (ua !== void 0 && ua !== "") {
        const uvLen = this.uvs.length;
        ia = this.parseUVIndex(ua, uvLen);
        ib = this.parseUVIndex(ub, uvLen);
        ic = this.parseUVIndex(uc, uvLen);
        this.addUV(ia, ib, ic);
        this.object.geometry.hasUVIndices = true;
      } else {
        this.addDefaultUV();
      }
    },
    addPointGeometry: function(vertices) {
      this.object.geometry.type = "Points";
      const vLen = this.vertices.length;
      for (let vi = 0, l = vertices.length; vi < l; vi++) {
        const index = this.parseVertexIndex(vertices[vi], vLen);
        this.addVertexPoint(index);
        this.addColor(index);
      }
    },
    addLineGeometry: function(vertices, uvs) {
      this.object.geometry.type = "Line";
      const vLen = this.vertices.length;
      const uvLen = this.uvs.length;
      for (let vi = 0, l = vertices.length; vi < l; vi++) {
        this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
      }
      for (let uvi = 0, l = uvs.length; uvi < l; uvi++) {
        this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
      }
    }
  };
  state.startObject("", false);
  return state;
}
class OBJLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.materials = null;
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(text) {
      try {
        onLoad(scope.parse(text));
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.error(e);
        }
        scope.manager.itemError(url);
      }
    }, onProgress, onError);
  }
  setMaterials(materials) {
    this.materials = materials;
    return this;
  }
  parse(text) {
    const state = new ParserState();
    if (text.indexOf("\r\n") !== -1) {
      text = text.replace(/\r\n/g, "\n");
    }
    if (text.indexOf("\\\n") !== -1) {
      text = text.replace(/\\\n/g, "");
    }
    const lines = text.split("\n");
    let line = "", lineFirstChar = "";
    let lineLength = 0;
    let result = [];
    const trimLeft = typeof "".trimLeft === "function";
    for (let i = 0, l = lines.length; i < l; i++) {
      line = lines[i];
      line = trimLeft ? line.trimLeft() : line.trim();
      lineLength = line.length;
      if (lineLength === 0)
        continue;
      lineFirstChar = line.charAt(0);
      if (lineFirstChar === "#")
        continue;
      if (lineFirstChar === "v") {
        const data = line.split(/\s+/);
        switch (data[0]) {
          case "v":
            state.vertices.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
            if (data.length >= 7) {
              state.colors.push(parseFloat(data[4]), parseFloat(data[5]), parseFloat(data[6]));
            } else {
              state.colors.push(void 0, void 0, void 0);
            }
            break;
          case "vn":
            state.normals.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
            break;
          case "vt":
            state.uvs.push(parseFloat(data[1]), parseFloat(data[2]));
            break;
        }
      } else if (lineFirstChar === "f") {
        const lineData = line.substr(1).trim();
        const vertexData = lineData.split(/\s+/);
        const faceVertices = [];
        for (let j = 0, jl = vertexData.length; j < jl; j++) {
          const vertex = vertexData[j];
          if (vertex.length > 0) {
            const vertexParts = vertex.split("/");
            faceVertices.push(vertexParts);
          }
        }
        const v1 = faceVertices[0];
        for (let j = 1, jl = faceVertices.length - 1; j < jl; j++) {
          const v2 = faceVertices[j];
          const v3 = faceVertices[j + 1];
          state.addFace(v1[0], v2[0], v3[0], v1[1], v2[1], v3[1], v1[2], v2[2], v3[2]);
        }
      } else if (lineFirstChar === "l") {
        const lineParts = line.substring(1).trim().split(" ");
        let lineVertices = [];
        const lineUVs = [];
        if (line.indexOf("/") === -1) {
          lineVertices = lineParts;
        } else {
          for (let li = 0, llen = lineParts.length; li < llen; li++) {
            const parts = lineParts[li].split("/");
            if (parts[0] !== "")
              lineVertices.push(parts[0]);
            if (parts[1] !== "")
              lineUVs.push(parts[1]);
          }
        }
        state.addLineGeometry(lineVertices, lineUVs);
      } else if (lineFirstChar === "p") {
        const lineData = line.substr(1).trim();
        const pointData = lineData.split(" ");
        state.addPointGeometry(pointData);
      } else if ((result = _object_pattern.exec(line)) !== null) {
        const name = (" " + result[0].substr(1).trim()).substr(1);
        state.startObject(name);
      } else if (_material_use_pattern.test(line)) {
        state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
      } else if (_material_library_pattern.test(line)) {
        state.materialLibraries.push(line.substring(7).trim());
      } else if (_map_use_pattern.test(line)) {
        console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
      } else if (lineFirstChar === "s") {
        result = line.split(" ");
        if (result.length > 1) {
          const value = result[1].trim().toLowerCase();
          state.object.smooth = value !== "0" && value !== "off";
        } else {
          state.object.smooth = true;
        }
        const material = state.object.currentMaterial();
        if (material)
          material.smooth = state.object.smooth;
      } else {
        if (line === "\0")
          continue;
        console.warn('THREE.OBJLoader: Unexpected line: "' + line + '"');
      }
    }
    state.finalize();
    const container = new Group();
    container.materialLibraries = [].concat(state.materialLibraries);
    const hasPrimitives = !(state.objects.length === 1 && state.objects[0].geometry.vertices.length === 0);
    if (hasPrimitives === true) {
      for (let i = 0, l = state.objects.length; i < l; i++) {
        const object = state.objects[i];
        const geometry = object.geometry;
        const materials = object.materials;
        const isLine = geometry.type === "Line";
        const isPoints = geometry.type === "Points";
        let hasVertexColors = false;
        if (geometry.vertices.length === 0)
          continue;
        const buffergeometry = new BufferGeometry();
        buffergeometry.setAttribute("position", new Float32BufferAttribute(geometry.vertices, 3));
        if (geometry.normals.length > 0) {
          buffergeometry.setAttribute("normal", new Float32BufferAttribute(geometry.normals, 3));
        }
        if (geometry.colors.length > 0) {
          hasVertexColors = true;
          buffergeometry.setAttribute("color", new Float32BufferAttribute(geometry.colors, 3));
        }
        if (geometry.hasUVIndices === true) {
          buffergeometry.setAttribute("uv", new Float32BufferAttribute(geometry.uvs, 2));
        }
        const createdMaterials = [];
        for (let mi = 0, miLen = materials.length; mi < miLen; mi++) {
          const sourceMaterial = materials[mi];
          const materialHash = sourceMaterial.name + "_" + sourceMaterial.smooth + "_" + hasVertexColors;
          let material = state.materials[materialHash];
          if (this.materials !== null) {
            material = this.materials.create(sourceMaterial.name);
            if (isLine && material && !(material instanceof LineBasicMaterial)) {
              const materialLine = new LineBasicMaterial();
              Material.prototype.copy.call(materialLine, material);
              materialLine.color.copy(material.color);
              material = materialLine;
            } else if (isPoints && material && !(material instanceof PointsMaterial)) {
              const materialPoints = new PointsMaterial({ size: 10, sizeAttenuation: false });
              Material.prototype.copy.call(materialPoints, material);
              materialPoints.color.copy(material.color);
              materialPoints.map = material.map;
              material = materialPoints;
            }
          }
          if (material === void 0) {
            if (isLine) {
              material = new LineBasicMaterial();
            } else if (isPoints) {
              material = new PointsMaterial({ size: 1, sizeAttenuation: false });
            } else {
              material = new MeshPhongMaterial();
            }
            material.name = sourceMaterial.name;
            material.flatShading = sourceMaterial.smooth ? false : true;
            material.vertexColors = hasVertexColors;
            state.materials[materialHash] = material;
          }
          createdMaterials.push(material);
        }
        let mesh;
        if (createdMaterials.length > 1) {
          for (let mi = 0, miLen = materials.length; mi < miLen; mi++) {
            const sourceMaterial = materials[mi];
            buffergeometry.addGroup(sourceMaterial.groupStart, sourceMaterial.groupCount, mi);
          }
          if (isLine) {
            mesh = new LineSegments(buffergeometry, createdMaterials);
          } else if (isPoints) {
            mesh = new Points(buffergeometry, createdMaterials);
          } else {
            mesh = new Mesh(buffergeometry, createdMaterials);
          }
        } else {
          if (isLine) {
            mesh = new LineSegments(buffergeometry, createdMaterials[0]);
          } else if (isPoints) {
            mesh = new Points(buffergeometry, createdMaterials[0]);
          } else {
            mesh = new Mesh(buffergeometry, createdMaterials[0]);
          }
        }
        mesh.name = object.name;
        container.add(mesh);
      }
    } else {
      if (state.vertices.length > 0) {
        const material = new PointsMaterial({ size: 1, sizeAttenuation: false });
        const buffergeometry = new BufferGeometry();
        buffergeometry.setAttribute("position", new Float32BufferAttribute(state.vertices, 3));
        if (state.colors.length > 0 && state.colors[0] !== void 0) {
          buffergeometry.setAttribute("color", new Float32BufferAttribute(state.colors, 3));
          material.vertexColors = true;
        }
        const points = new Points(buffergeometry, material);
        container.add(points);
      }
    }
    return container;
  }
}
class MTLLoader extends Loader {
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const path = this.path === "" ? LoaderUtils.extractUrlBase(url) : this.path;
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(text) {
      try {
        onLoad(scope.parse(text, path));
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.error(e);
        }
        scope.manager.itemError(url);
      }
    }, onProgress, onError);
  }
  setMaterialOptions(value) {
    this.materialOptions = value;
    return this;
  }
  parse(text, path) {
    const lines = text.split("\n");
    let info = {};
    const delimiter_pattern = /\s+/;
    const materialsInfo = {};
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      line = line.trim();
      if (line.length === 0 || line.charAt(0) === "#") {
        continue;
      }
      const pos = line.indexOf(" ");
      let key = pos >= 0 ? line.substring(0, pos) : line;
      key = key.toLowerCase();
      let value = pos >= 0 ? line.substring(pos + 1) : "";
      value = value.trim();
      if (key === "newmtl") {
        info = { name: value };
        materialsInfo[value] = info;
      } else {
        if (key === "ka" || key === "kd" || key === "ks" || key === "ke") {
          const ss = value.split(delimiter_pattern, 3);
          info[key] = [parseFloat(ss[0]), parseFloat(ss[1]), parseFloat(ss[2])];
        } else {
          info[key] = value;
        }
      }
    }
    const materialCreator = new MaterialCreator(this.resourcePath || path, this.materialOptions);
    materialCreator.setCrossOrigin(this.crossOrigin);
    materialCreator.setManager(this.manager);
    materialCreator.setMaterials(materialsInfo);
    return materialCreator;
  }
}
class MaterialCreator {
  constructor(baseUrl = "", options = {}) {
    this.baseUrl = baseUrl;
    this.options = options;
    this.materialsInfo = {};
    this.materials = {};
    this.materialsArray = [];
    this.nameLookup = {};
    this.crossOrigin = "anonymous";
    this.side = this.options.side !== void 0 ? this.options.side : FrontSide;
    this.wrap = this.options.wrap !== void 0 ? this.options.wrap : RepeatWrapping;
  }
  setCrossOrigin(value) {
    this.crossOrigin = value;
    return this;
  }
  setManager(value) {
    this.manager = value;
  }
  setMaterials(materialsInfo) {
    this.materialsInfo = this.convert(materialsInfo);
    this.materials = {};
    this.materialsArray = [];
    this.nameLookup = {};
  }
  convert(materialsInfo) {
    if (!this.options)
      return materialsInfo;
    const converted = {};
    for (const mn in materialsInfo) {
      const mat = materialsInfo[mn];
      const covmat = {};
      converted[mn] = covmat;
      for (const prop in mat) {
        let save = true;
        let value = mat[prop];
        const lprop = prop.toLowerCase();
        switch (lprop) {
          case "kd":
          case "ka":
          case "ks":
            if (this.options && this.options.normalizeRGB) {
              value = [value[0] / 255, value[1] / 255, value[2] / 255];
            }
            if (this.options && this.options.ignoreZeroRGBs) {
              if (value[0] === 0 && value[1] === 0 && value[2] === 0) {
                save = false;
              }
            }
            break;
        }
        if (save) {
          covmat[lprop] = value;
        }
      }
    }
    return converted;
  }
  preload() {
    for (const mn in this.materialsInfo) {
      this.create(mn);
    }
  }
  getIndex(materialName) {
    return this.nameLookup[materialName];
  }
  getAsArray() {
    let index = 0;
    for (const mn in this.materialsInfo) {
      this.materialsArray[index] = this.create(mn);
      this.nameLookup[mn] = index;
      index++;
    }
    return this.materialsArray;
  }
  create(materialName) {
    if (this.materials[materialName] === void 0) {
      this.createMaterial_(materialName);
    }
    return this.materials[materialName];
  }
  createMaterial_(materialName) {
    const scope = this;
    const mat = this.materialsInfo[materialName];
    const params = {
      name: materialName,
      side: this.side
    };
    function resolveURL(baseUrl, url) {
      if (typeof url !== "string" || url === "")
        return "";
      if (/^https?:\/\//i.test(url))
        return url;
      return baseUrl + url;
    }
    function setMapForType(mapType, value) {
      if (params[mapType])
        return;
      const texParams = scope.getTextureParams(value, params);
      const map = scope.loadTexture(resolveURL(scope.baseUrl, texParams.url));
      map.repeat.copy(texParams.scale);
      map.offset.copy(texParams.offset);
      map.wrapS = scope.wrap;
      map.wrapT = scope.wrap;
      params[mapType] = map;
    }
    for (const prop in mat) {
      const value = mat[prop];
      let n;
      if (value === "")
        continue;
      switch (prop.toLowerCase()) {
        case "kd":
          params.color = new Color().fromArray(value);
          break;
        case "ks":
          params.specular = new Color().fromArray(value);
          break;
        case "ke":
          params.emissive = new Color().fromArray(value);
          break;
        case "map_kd":
          setMapForType("map", value);
          break;
        case "map_ks":
          setMapForType("specularMap", value);
          break;
        case "map_ke":
          setMapForType("emissiveMap", value);
          break;
        case "norm":
          setMapForType("normalMap", value);
          break;
        case "map_bump":
        case "bump":
          setMapForType("bumpMap", value);
          break;
        case "map_d":
          setMapForType("alphaMap", value);
          params.transparent = true;
          break;
        case "ns":
          params.shininess = parseFloat(value);
          break;
        case "d":
          n = parseFloat(value);
          if (n < 1) {
            params.opacity = n;
            params.transparent = true;
          }
          break;
        case "tr":
          n = parseFloat(value);
          if (this.options && this.options.invertTrProperty)
            n = 1 - n;
          if (n > 0) {
            params.opacity = 1 - n;
            params.transparent = true;
          }
          break;
      }
    }
    this.materials[materialName] = new MeshPhongMaterial(params);
    return this.materials[materialName];
  }
  getTextureParams(value, matParams) {
    const texParams = {
      scale: new Vector2(1, 1),
      offset: new Vector2(0, 0)
    };
    const items = value.split(/\s+/);
    let pos;
    pos = items.indexOf("-bm");
    if (pos >= 0) {
      matParams.bumpScale = parseFloat(items[pos + 1]);
      items.splice(pos, 2);
    }
    pos = items.indexOf("-s");
    if (pos >= 0) {
      texParams.scale.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
      items.splice(pos, 4);
    }
    pos = items.indexOf("-o");
    if (pos >= 0) {
      texParams.offset.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
      items.splice(pos, 4);
    }
    texParams.url = items.join(" ").trim();
    return texParams;
  }
  loadTexture(url, mapping, onLoad, onProgress, onError) {
    const manager = this.manager !== void 0 ? this.manager : DefaultLoadingManager;
    let loader = manager.getHandler(url);
    if (loader === null) {
      loader = new TextureLoader(manager);
    }
    if (loader.setCrossOrigin)
      loader.setCrossOrigin(this.crossOrigin);
    const texture = loader.load(url, onLoad, onProgress, onError);
    if (mapping !== void 0)
      texture.mapping = mapping;
    return texture;
  }
}
class LoaderManager extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "resourceMap");
    __publicField(this, "loaderMap");
    __publicField(this, "loadTotal");
    __publicField(this, "loadSuccess");
    __publicField(this, "loadError");
    __publicField(this, "isError");
    __publicField(this, "isLoading");
    __publicField(this, "isLoaded");
    __publicField(this, "loadDetailMap");
    this.resourceMap = new Map();
    this.loadTotal = 0;
    this.loadSuccess = 0;
    this.loadError = 0;
    this.isError = false;
    this.isLoading = false;
    this.isLoaded = false;
    this.loadDetailMap = {};
    const imageLoader = new ImageLoader();
    this.loaderMap = {
      "jpg": imageLoader,
      "png": imageLoader,
      "jpeg": imageLoader,
      "obj": new OBJLoader(),
      "mtl": new MTLLoader()
    };
  }
  loaded() {
    this.dispatchEvent({
      type: LOADERMANAGER.LOADED,
      loadTotal: this.loadTotal,
      loadSuccess: this.loadSuccess,
      loadError: this.loadError,
      resourceMap: this.resourceMap
    });
    return this;
  }
  checkLoaded() {
    if (this.loadTotal === this.loadSuccess + this.loadError) {
      this.isError = true;
      this.isLoaded = true;
      this.isLoading = false;
      this.loaded();
    }
    return this;
  }
  load(urlList) {
    var _a;
    this.reset();
    this.isLoading = true;
    if (urlList.length <= 0) {
      this.checkLoaded();
      console.warn(`url list is empty.`);
      return this;
    }
    this.loadTotal += urlList.length;
    const resourceMap = this.resourceMap;
    const loaderMap = this.loaderMap;
    const loadDetailMap = this.loadDetailMap;
    for (let url of urlList) {
      const detail = {
        url,
        progress: 0,
        error: false,
        message: url
      };
      loadDetailMap[url] = detail;
      if (resourceMap.has(url)) {
        detail.progress = 1;
        this.loadSuccess += 1;
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        });
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        this.checkLoaded();
        continue;
      }
      const ext = (_a = url.split(".").pop()) == null ? void 0 : _a.toLocaleLowerCase();
      if (!ext) {
        detail.message = `url: ${url} \u5730\u5740\u6709\u8BEF\uFF0C\u65E0\u6CD5\u83B7\u53D6\u6587\u4EF6\u683C\u5F0F\u3002`;
        detail.error = true;
        this.isError = true;
        this.loadError += 1;
        continue;
      }
      const loader = loaderMap[ext];
      if (!loader) {
        detail.message = `url: ${url} \u4E0D\u652F\u6301\u6B64\u6587\u4EF6\u683C\u5F0F\u52A0\u8F7D\u3002`;
        detail.error = true;
        this.isError = true;
        this.loadError += 1;
        continue;
      }
      loader.loadAsync(url, (event) => {
        detail.progress = Number((event.loaded / event.total).toFixed(2));
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADING,
          detail
        });
      }).then((res) => {
        detail.progress = 1;
        this.loadSuccess += 1;
        this.resourceMap.set(url, res);
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        });
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        this.checkLoaded();
      }).catch((err) => {
        detail.error = true;
        detail.message = JSON.stringify(err);
        this.loadError += 1;
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        });
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        this.checkLoaded();
      });
    }
    return this;
  }
  reset() {
    this.loadTotal = 0;
    this.loadSuccess = 0;
    this.loadError = 0;
    this.isError = false;
    this.isLoading = false;
    this.isLoaded = false;
    this.loadDetailMap = {};
    return this;
  }
  register(ext, loader) {
    this.loaderMap[ext] = loader;
    return this;
  }
  hasLoaded(url) {
    return this.resourceMap.has(url);
  }
  getResource(url) {
    return this.resourceMap.get(url);
  }
  getLoadDetailMap() {
    return this.loadDetailMap;
  }
  setLoadDetailMap(map) {
    this.loadDetailMap = map;
    return this;
  }
  dispose() {
    this.resourceMap.clear();
    return this;
  }
}
var RESOURCEEVENTTYPE;
(function(RESOURCEEVENTTYPE2) {
  RESOURCEEVENTTYPE2["MAPPED"] = "mapped";
})(RESOURCEEVENTTYPE || (RESOURCEEVENTTYPE = {}));
class ResourceManager extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "structureMap", new Map());
    __publicField(this, "configMap", new Map());
    __publicField(this, "resourceMap", new Map());
  }
  mappingResource(loadResourceMap) {
    const structureMap = this.structureMap;
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;
    const recursionMappingObject = function(url, object) {
      const config = {
        type: `${object.type}`
      };
      let mappingUrl = "";
      if (object.geometry) {
        const geometry = object.geometry;
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const center = box.getCenter(new Vector3());
        mappingUrl = `${url}.geometry`;
        resourceMap.set(mappingUrl, geometry);
        configMap.set(mappingUrl, generateConfig(CONFIGTYPE$1.LOADGEOMETRY, {
          url: mappingUrl,
          position: {
            x: center.x / (box.max.x - box.min.x) * 2,
            y: center.y / (box.max.y - box.min.y) * 2,
            z: center.z / (box.max.z - box.min.z) * 2
          }
        }));
        config.geometry = mappingUrl;
      }
      if (object.material) {
        const material = object.material;
        if (material instanceof Array) {
          config.material = [];
          material.forEach((materialChild, i, arr) => {
            mappingUrl = `${url}.material.${i}`;
            resourceMap.set(mappingUrl, materialChild);
            configMap.set(mappingUrl, generateConfig(materialChild.type, materialChild, false));
            config.material[i] = mappingUrl;
          });
        } else {
          mappingUrl = `${url}.material`;
          resourceMap.set(mappingUrl, material);
          configMap.set(mappingUrl, generateConfig(material.type, material, false));
          config.material = mappingUrl;
        }
      }
      if (object.children.length) {
        config.children = [];
        object.children.forEach((child, i, arr) => {
          mappingUrl = `${url}.children.${i}`;
          config.children[i] = recursionMappingObject(mappingUrl, child);
        });
      }
      return config;
    };
    loadResourceMap.forEach((resource, url) => {
      if (resource instanceof HTMLImageElement) {
        resourceMap.set(url, resource);
        configMap.set(url, generateConfig(CONFIGTYPE$1.IMAGETEXTURE, {
          image: url
        }));
        structureMap.set(url, url);
      } else if (resource instanceof HTMLCanvasElement) {
        resourceMap.set(url, resource);
        structureMap.set(url, url);
      } else if (resource instanceof Object3D) {
        structureMap.set(url, recursionMappingObject(url, resource));
      }
    });
    this.dispatchEvent({
      type: "mapped",
      structureMap,
      configMap,
      resourceMap
    });
    return this;
  }
  dispose() {
  }
}
class Compiler {
  static applyConfig(config, object, callBack) {
    const filterMap = {
      vid: true,
      type: true
    };
    const recursiveConfig = (config2, object2) => {
      for (const key in config2) {
        if (typeof config2[key] === "object" && typeof config2[key] !== null && isValidKey(key, object2)) {
          recursiveConfig(config2[key], object2[key]);
        } else {
          if (isValidKey(key, object2) && !filterMap[key]) {
            object2[key] = config2[key];
          }
        }
      }
    };
    recursiveConfig(config, object);
    callBack && callBack();
  }
  constructor() {
  }
}
class CameraCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "scene");
    __publicField(this, "engine");
    __publicField(this, "map");
    __publicField(this, "weakMap");
    __publicField(this, "constructMap");
    __publicField(this, "objectMapSet");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.scene && (this.scene = parameters.scene);
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.scene = new Scene();
      this.target = {};
      this.engine = new Engine().install(EnginePlugin.WEBGLRENDERER);
    }
    this.map = new Map();
    this.weakMap = new WeakMap();
    const constructMap = new Map();
    constructMap.set("PerspectiveCamera", () => new PerspectiveCamera());
    constructMap.set("OrthographicCamera", () => new OrthographicCamera(0, 0, 0, 0));
    this.constructMap = constructMap;
    this.objectMapSet = new Set();
  }
  setLookAt(vid, target) {
    if (vid === target) {
      console.error(`can not set object lookAt itself.`);
      return this;
    }
    const camera = this.map.get(vid);
    const userData = camera.userData;
    if (!target) {
      if (!userData.updateMatrixWorldFun) {
        return this;
      }
      camera.updateMatrixWorld = userData.updateMatrixWorldFun;
      userData.lookAtTarget = void 0;
      userData.updateMatrixWorldFun = void 0;
      return this;
    }
    let lookAtTarget = void 0;
    for (const map of this.objectMapSet) {
      if (map.has(target)) {
        lookAtTarget = map.get(target);
        break;
      }
    }
    if (!lookAtTarget) {
      console.warn(`camera compiler can not found this vid mapping object in objectMapSet: '${vid}'`);
      return this;
    }
    const updateMatrixWorldFun = camera.updateMatrixWorld;
    userData.updateMatrixWorldFun = updateMatrixWorldFun;
    userData.lookAtTarget = lookAtTarget.position;
    camera.updateMatrixWorld = (focus) => {
      updateMatrixWorldFun.bind(camera)(focus);
      camera.lookAt(userData.lookAtTarget);
    };
    return this;
  }
  setAdaptiveWindow(vid, value) {
    if (!validate(vid)) {
      console.error(`camera compiler adaptive window vid is illeage: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`camera compiler can not found this vid camera: '${vid}'`);
      return this;
    }
    const camera = this.map.get(vid);
    if (!value) {
      if (camera.userData.setSizeFun && this.engine.hasEventListener("setSize", camera.userData.setSizeFun)) {
        this.engine.removeEventListener("setSize", camera.userData.setSizeFun);
        camera.userData.setSizeFun = void 0;
        return this;
      }
      if (!camera.userData.setSizeFun && !this.engine.hasEventListener("setSize", camera.userData.setSizeFun)) {
        return this;
      }
      if (camera.userData.setSizeFun && !this.engine.hasEventListener("setSize", camera.userData.setSizeFun)) {
        camera.userData.setSizeFun = void 0;
        return this;
      }
    }
    if (value) {
      if (camera.userData.setSizeFun && this.engine.hasEventListener("setSize", camera.userData.setSizeFun)) {
        return this;
      }
      if (!this.engine.hasEventListener("setSize", camera.userData.setSizeFun) && camera.userData.setSizeFun) {
        this.engine.addEventListener("setSize", camera.userData.setSizeFun);
        return this;
      }
      let setSizeFun = (event) => {
      };
      if (camera instanceof PerspectiveCamera) {
        setSizeFun = (event) => {
          camera.aspect = event.width / event.height;
          camera.updateProjectionMatrix();
        };
      } else if (camera instanceof OrthographicCamera) {
        setSizeFun = (event) => {
          const width = event.width;
          const height = event.height;
          camera.left = -width / 16;
          camera.right = width / 16;
          camera.top = height / 16;
          camera.bottom = -height / 16;
        };
      } else {
        console.warn(`camera compiler can not support this class camera:`, camera);
      }
      this.engine.addEventListener("setSize", setSizeFun);
      const domElement = this.engine.webGLRenderer.domElement;
      setSizeFun({
        type: "setSize",
        width: domElement.offsetWidth,
        height: domElement.offsetHeight
      });
    }
    return this;
  }
  linkObjectMap(map) {
    if (!this.objectMapSet.has(map)) {
      this.objectMapSet.add(map);
    }
    return this;
  }
  getSupportVid(object) {
    if (this.weakMap.has(object)) {
      return this.weakMap.get(object);
    } else {
      return null;
    }
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const camera = this.constructMap.get(config.type)();
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.vid;
        delete tempConfig.type;
        delete tempConfig.lookAt;
        delete tempConfig.adaptiveWindow;
        Compiler.applyConfig(tempConfig, camera);
        if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
          camera.updateProjectionMatrix();
        }
        this.map.set(vid, camera);
        this.setLookAt(config.vid, config.lookAt);
        this.setAdaptiveWindow(config.vid, config.adaptiveWindow);
        this.scene.add(camera);
      }
    } else {
      console.error(`camera vid parameter is illegal: ${vid}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!validate(vid)) {
      console.warn(`camera compiler set function vid parameters is illeage: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`);
      return this;
    }
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "adaptiveWindow") {
      return this.setAdaptiveWindow(vid, value);
    }
    const camera = this.map.get(vid);
    let config = camera;
    path.forEach((key2, i, arr) => {
      config = camera[key2];
    });
    config[key] = value;
    if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
      camera.updateProjectionMatrix();
    }
    return this;
  }
  remove() {
  }
  setEngine(engine) {
    this.engine = engine;
    return this;
  }
  setScene(scene) {
    this.scene = scene;
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  getMap() {
    return this.map;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    return this;
  }
}
class ControlsCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "transformControls");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.transformControls && (this.transformControls = parameters.transformControls);
    } else {
      this.target = {
        TransformControls: getTransformControlsConfig()
      };
      this.transformControls = new TransformControls(new Camera());
    }
  }
  set(type, path, key, value) {
    if (type === "TransformControls") {
      const controls = this.transformControls;
      if (key === "snapAllow") {
        const config = this.target["TransformControls"];
        if (value) {
          controls.translationSnap = config.translationSnap;
          controls.rotationSnap = config.rotationSnap;
          controls.scaleSnap = config.scaleSnap;
        } else {
          controls.translationSnap = null;
          controls.rotationSnap = null;
          controls.scaleSnap = null;
        }
        return this;
      }
      controls[key] = value;
    } else {
      console.warn(`controls compiler can not support this controls: '${type}'`);
      return this;
    }
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    return this;
  }
  dispose(parameter) {
    return this;
  }
}
class LoadGeometry extends BufferGeometry {
  constructor(geometry) {
    super();
    __publicField(this, "type", "LoadBufferGeometry");
    geometry && this.copy(geometry);
  }
}
const _GeometryCompiler = class extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "constructMap");
    __publicField(this, "resourceMap");
    __publicField(this, "replaceGeometry");
    this.target = parameters.target;
    this.map = new Map();
    const constructMap = new Map();
    constructMap.set("BoxGeometry", (config) => {
      return _GeometryCompiler.transfromAnchor(new BoxBufferGeometry(config.width, config.height, config.depth, config.widthSegments, config.heightSegments, config.depthSegments), config);
    });
    constructMap.set("SphereGeometry", (config) => {
      return _GeometryCompiler.transfromAnchor(new SphereBufferGeometry(config.radius, config.widthSegments, config.heightSegments, config.phiStart, config.phiLength, config.thetaStart, config.thetaLength), config);
    });
    constructMap.set("LoadGeometry", (config) => {
      return _GeometryCompiler.transfromAnchor(new LoadGeometry(this.getRescource(config.url)), config);
    });
    this.constructMap = constructMap;
    this.resourceMap = new Map();
    this.replaceGeometry = new BoxBufferGeometry(10, 10, 10);
  }
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  getRescource(url) {
    if (!this.resourceMap.has(url)) {
      console.error(`rescoure can not found url: ${url}`);
      return this.replaceGeometry.clone();
    }
    if (this.resourceMap.has(url) && this.resourceMap.get(url) instanceof BufferGeometry) {
      const geometry = this.resourceMap.get(url);
      return geometry.clone();
    } else {
      console.error(`url mapping rescource is not class with BufferGeometry: ${url}`);
      return this.replaceGeometry.clone();
    }
  }
  getMap() {
    return this.map;
  }
  setTarget() {
    return this;
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const geometry = this.constructMap.get(config.type)(config);
        this.map.set(vid, geometry);
      }
    } else {
      console.error(`geometry vid parameter is illegal: ${vid}`);
    }
    return this;
  }
  set(vid, path, value) {
    if (!validate(vid)) {
      console.warn(`geometry compiler set function vid parameters is illeage: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`);
      return this;
    }
    const currentGeometry = this.map.get(vid);
    const config = this.target[vid];
    const newGeometry = this.constructMap.get(config.type)(config);
    currentGeometry.copy(newGeometry);
    currentGeometry.uuid = newGeometry.uuid;
    newGeometry.dispose();
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    return this;
  }
};
let GeometryCompiler = _GeometryCompiler;
__publicField(GeometryCompiler, "transfromAnchor", function(geometry, config) {
  geometry.center();
  !geometry.boundingBox && geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const position = config.position;
  const rotation = config.rotation;
  const scale = config.scale;
  const materix = new Matrix4();
  const vPostion = new Vector3((box.max.x - box.min.x) / 2 * position.x, (box.max.y - box.min.y) / 2 * position.y, (box.max.z - box.min.z) / 2 * position.z);
  const quaternion = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z, "XYZ"));
  const vScale = new Vector3(scale.x, scale.y, scale.z);
  materix.compose(vPostion, quaternion, vScale);
  geometry.applyMatrix4(materix);
  return geometry;
});
class LightCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "scene");
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "weakMap");
    __publicField(this, "constructMap");
    this.scene = parameters.scene;
    this.target = parameters.target;
    this.map = new Map();
    this.weakMap = new WeakMap();
    this.constructMap = new Map();
    this.constructMap.set("PointLight", () => new PointLight());
    this.constructMap.set("SpotLight", () => new SpotLight());
    this.constructMap.set("AmbientLight", () => new AmbientLight());
  }
  getSupportVid(object) {
    if (this.weakMap.has(object)) {
      return this.weakMap.get(object);
    } else {
      return null;
    }
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const light = this.constructMap.get(config.type)();
        Compiler.applyConfig(config, light);
        light.color = new Color(config.color);
        this.map.set(vid, light);
        this.weakMap.set(light, vid);
        this.scene.add(light);
      }
    } else {
      console.error(`vid parameter is illegal: ${vid}`);
    }
  }
  set(path, key, value) {
    const vid = path.shift();
    if (validate(vid) && this.map.has(vid)) {
      let config = this.map.get(vid);
      path.forEach((key2, i, arr) => {
        config = config[key2];
      });
      config[key] = value;
    } else {
      console.error(`vid parameter is illegal: ${vid} or can not found this vid light`);
    }
  }
  remove() {
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  getMap() {
    return this.map;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    return this;
  }
}
class MaterialCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "constructMap");
    __publicField(this, "mapAttribute");
    __publicField(this, "colorAttribute");
    __publicField(this, "texturelMap");
    __publicField(this, "resourceMap");
    __publicField(this, "cachaColor");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
    } else {
      this.target = {};
    }
    this.map = new Map();
    this.texturelMap = new Map();
    this.resourceMap = new Map();
    this.cachaColor = new Color();
    const constructMap = new Map();
    constructMap.set("MeshStandardMaterial", () => new MeshStandardMaterial());
    this.constructMap = constructMap;
    this.colorAttribute = {
      "color": true,
      "emissive": true
    };
    this.mapAttribute = {
      "roughnessMap": true,
      "normalMap": true,
      "metalnessMap": true,
      "map": true,
      "lightMap": true,
      "envMap": true,
      "emissiveMap": true,
      "displacementMap": true,
      "bumpMap": true,
      "alphaMap": true,
      "aoMap": true
    };
  }
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  linkTextureMap(textureMap) {
    this.texturelMap = textureMap;
    return this;
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const material = this.constructMap.get(config.type)();
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.type;
        delete tempConfig.vid;
        const colorAttribute = this.colorAttribute;
        for (const key in colorAttribute) {
          if (tempConfig[key]) {
            material[key] = new Color(tempConfig[key]);
            delete tempConfig[key];
          }
        }
        const mapAttribute = this.mapAttribute;
        for (const key in mapAttribute) {
          if (tempConfig[key]) {
            material[key] = this.getTexture(tempConfig[key]);
            delete tempConfig[key];
          }
        }
        Compiler.applyConfig(tempConfig, material);
        material.needsUpdate = true;
        this.map.set(vid, material);
      } else {
        console.warn(`material compiler can not support this type: ${config.type}`);
      }
    } else {
      console.error(`material vid parameter is illegal: ${vid}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!validate(vid)) {
      console.warn(`material compiler set function: vid is illeage: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`material compiler set function: can not found material which vid is: '${vid}'`);
      return this;
    }
    const material = this.map.get(vid);
    if (this.colorAttribute[key]) {
      material[key] = new Color(value);
      return this;
    }
    if (this.mapAttribute[key]) {
      material[key] = this.getTexture(value);
      material.needsUpdate = true;
      return this;
    }
    let config = material;
    path.forEach((key2, i, arr) => {
      config = config[key2];
    });
    config[key] = value;
    return this;
  }
  getTexture(vid) {
    if (this.texturelMap.has(vid)) {
      const texture = this.texturelMap.get(vid);
      if (texture instanceof Texture) {
        return texture;
      } else {
        console.error(`this object which mapped by vid is not instance of Texture: ${vid}`);
        return null;
      }
    } else {
      console.error(`texture map can not found this vid: ${vid}`);
      return null;
    }
  }
  getMap() {
    return this.map;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    return this;
  }
}
class ModelCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "scene");
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "weakMap");
    __publicField(this, "constructMap");
    __publicField(this, "geometryMap");
    __publicField(this, "materialMap");
    __publicField(this, "objectMapSet");
    __publicField(this, "getReplaceMaterial");
    __publicField(this, "getReplaceGeometry");
    if (parameters) {
      parameters.scene && (this.scene = parameters.scene);
      parameters.target && (this.target = parameters.target);
      parameters.geometryMap && (this.geometryMap = parameters.geometryMap);
      parameters.materialMap && (this.materialMap = parameters.materialMap);
    } else {
      this.scene = new Scene();
      this.target = {};
      this.geometryMap = new Map();
      this.materialMap = new Map();
    }
    this.map = new Map();
    this.weakMap = new WeakMap();
    this.getReplaceMaterial = () => new MeshStandardMaterial({ color: "rgb(150, 150, 150)" });
    this.getReplaceGeometry = () => new BoxBufferGeometry(10, 10, 10);
    const constructMap = new Map();
    constructMap.set("Mesh", (config) => new Mesh(this.getGeometry(config.geometry), this.getMaterial(config.material)));
    constructMap.set("Line", (config) => new Line(this.getGeometry(config.geometry), this.getMaterial(config.material)));
    constructMap.set("Points", (config) => new Points(this.getGeometry(config.geometry), this.getMaterial(config.material)));
    this.constructMap = constructMap;
    this.objectMapSet = new Set();
  }
  getMaterial(vid) {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid);
      } else {
        console.warn(`can not found material which vid: ${vid}`);
        return this.getReplaceMaterial();
      }
    } else {
      console.warn(`material vid parameter is illegal: ${vid}`);
      return this.getReplaceMaterial();
    }
  }
  getGeometry(vid) {
    if (validate(vid)) {
      if (this.geometryMap.has(vid)) {
        return this.geometryMap.get(vid);
      } else {
        console.warn(`can not found geometry which vid: ${vid}`);
        return this.getReplaceGeometry();
      }
    } else {
      console.warn(`geometry vid parameter is illegal: ${vid}`);
      return this.getReplaceGeometry();
    }
  }
  setLookAt(vid, target) {
    if (vid === target) {
      console.error(`can not set object lookAt itself.`);
      return this;
    }
    const model = this.map.get(vid);
    const userData = model.userData;
    if (!target) {
      if (!userData.updateMatrixWorldFun) {
        return this;
      }
      model.updateMatrixWorld = userData.updateMatrixWorldFun;
      userData.lookAtTarget = null;
      userData.updateMatrixWorldFun = null;
      return this;
    }
    let lookAtTarget = null;
    for (const map of this.objectMapSet) {
      if (map.has(target)) {
        lookAtTarget = map.get(target);
        break;
      }
    }
    if (!lookAtTarget) {
      console.warn(`model compiler can not found this vid mapping object in objectMapSet: '${vid}'`);
      return this;
    }
    const updateMatrixWorldFun = model.updateMatrixWorld;
    userData.updateMatrixWorldFun = updateMatrixWorldFun;
    userData.lookAtTarget = lookAtTarget.position;
    model.updateMatrixWorld = (focus) => {
      updateMatrixWorldFun.bind(model)(focus);
      model.lookAt(userData.lookAtTarget);
    };
    return this;
  }
  setMaterial(vid, target) {
    this.map.get(vid).material = this.getMaterial(target);
    return this;
  }
  getSupportVid(object) {
    if (this.weakMap.has(object)) {
      return this.weakMap.get(object);
    } else {
      return null;
    }
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.display)) {
        const object = this.constructMap.get(config.display)(config);
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.vid;
        delete tempConfig.type;
        delete tempConfig.display;
        delete tempConfig.geometry;
        delete tempConfig.material;
        delete tempConfig.lookAt;
        Compiler.applyConfig(tempConfig, object);
        this.map.set(vid, object);
        this.weakMap.set(object, vid);
        this.setLookAt(vid, config.lookAt);
        this.scene.add(object);
      }
    } else {
      console.warn(`model compiler add function: model vid parameter is illegal: ${vid}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!validate(vid)) {
      console.warn(`model compiler vid is illegal: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`model compiler can not found this vid mapping object: '${vid}'`);
      return this;
    }
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "material") {
      return this.setMaterial(vid, value);
    }
    let config = this.map.get(vid);
    path.forEach((key2, i, arr) => {
      config = config[key2];
    });
    config[key] = value;
    return this;
  }
  remove() {
  }
  linkGeometryMap(map) {
    this.geometryMap = map;
    return this;
  }
  linkMaterialMap(materialMap) {
    this.materialMap = materialMap;
    return this;
  }
  linkObjectMap(map) {
    if (!this.objectMapSet.has(map)) {
      this.objectMapSet.add(map);
    }
    return this;
  }
  setScene(scene) {
    this.scene = scene;
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  getMap() {
    return this.map;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    return this;
  }
}
class RendererCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "glRenderer");
    __publicField(this, "engine");
    __publicField(this, "glRendererCacheData");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.glRenderer && (this.glRenderer = parameters.glRenderer);
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.target = {
        WebGLRenderer: getWebGLRendererConfig()
      };
      this.glRenderer = new WebGLRenderer();
    }
    this.glRendererCacheData = {};
  }
  setClearColor(value) {
    const alpha = Number(value.slice(0, -1).split(",").pop().trim());
    this.glRenderer.setClearColor(value, alpha);
    this.glRenderer.clear();
    return this;
  }
  setPixelRatio(value) {
    this.glRenderer.setPixelRatio(value);
    this.glRenderer.clear();
    return this;
  }
  setSize(vector2) {
    const glRenderer = this.glRenderer;
    if (vector2) {
      glRenderer.setSize(vector2.x, vector2.y);
    } else {
      const domElement = glRenderer.domElement;
      glRenderer.setSize(domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setViewpoint(config) {
    const glRenderer = this.glRenderer;
    if (config) {
      glRenderer.setViewport(config.x, config.y, config.width, config.height);
    } else {
      const domElement = glRenderer.domElement;
      glRenderer.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setScissor(config) {
    const glRenderer = this.glRenderer;
    if (config) {
      glRenderer.setScissorTest(true);
      glRenderer.setScissor(config.x, config.y, config.width, config.height);
    } else {
      glRenderer.setScissorTest(false);
      const domElement = glRenderer.domElement;
      glRenderer.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setAdaptiveCamera(value) {
    if (!this.engine) {
      console.warn(`renderer compiler is not set engine.`);
      return this;
    }
    const glRenderer = this.glRenderer;
    const engine = this.engine;
    const renderManager = engine.renderManager;
    if (!value) {
      if (!this.glRendererCacheData.adaptiveCameraFun) {
        return this;
      }
      if (this.glRendererCacheData.adaptiveCameraFun) {
        renderManager.removeEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun);
        this.glRendererCacheData.adaptiveCameraFun = void 0;
        return this;
      }
    }
    if (value) {
      if (this.glRendererCacheData.adaptiveCameraFun) {
        renderManager.addEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun);
        return this;
      }
      const adaptiveCameraFun = (event) => {
        const camera = engine.currentCamera;
        const domWidth = glRenderer.domElement.offsetWidth;
        const domHeight = glRenderer.domElement.offsetHeight;
        let width = 0;
        let height = 0;
        let offsetX = 0;
        let offsetY = 0;
        let aspect = 0;
        if (camera instanceof PerspectiveCamera) {
          aspect = camera.aspect;
        } else if (camera instanceof OrthographicCamera) {
          width = camera.right - camera.left;
          height = camera.top - camera.bottom;
          aspect = width / height;
        } else {
          console.warn(`renderer compiler can not support this camera`, camera);
          return;
        }
        if (aspect >= 1) {
          width = domWidth;
          height = width / aspect;
          offsetY = domHeight / 2 - height / 2;
        } else {
          height = domHeight;
          width = height * aspect;
          offsetX = domWidth / 2 - width / 2;
        }
        glRenderer.setScissor(offsetX, offsetY, width, height);
        glRenderer.setViewport(offsetX, offsetY, width, height);
        glRenderer.setScissorTest(true);
      };
      this.glRendererCacheData.adaptiveCameraFun = adaptiveCameraFun;
      renderManager.addEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun);
    }
    return this;
  }
  set(path, key, value) {
    const rendererType = path.shift();
    if (rendererType === "WebGLRenderer") {
      const glRendererTarget = this.target.WebGLRenderer;
      const actionMap = {
        clearColor: () => this.setClearColor(value),
        pixelRatio: () => this.setPixelRatio(value),
        size: () => this.setSize(glRendererTarget.size),
        viewport: () => this.setViewpoint(glRendererTarget.viewport),
        scissor: () => this.setScissor(glRendererTarget.scissor),
        adaptiveCamera: () => this.setAdaptiveCamera(value)
      };
      if (actionMap[path[0] || key]) {
        actionMap[path[0] || key]();
        return this;
      }
      const glRenderer = this.glRenderer;
      let config = glRenderer;
      path.forEach((key2, i, arr) => {
        config = config[key2];
      });
      config[key] = value;
      glRenderer.clear();
      return this;
    } else {
      console.warn(`renderer compiler can not support this type: ${rendererType}`);
      return this;
    }
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    const glRendererTarget = target.WebGLRenderer;
    this.setClearColor(glRendererTarget.clearColor);
    this.setPixelRatio(glRendererTarget.pixelRatio);
    this.setSize(glRendererTarget.size);
    this.setViewpoint(glRendererTarget.viewport);
    this.setScissor(glRendererTarget.scissor);
    this.setAdaptiveCamera(glRendererTarget.adaptiveCamera);
    const otherConfig = JSON.parse(JSON.stringify(glRendererTarget));
    delete otherConfig.vid;
    delete otherConfig.type;
    delete otherConfig.clearColor;
    delete otherConfig.pixelRatio;
    delete otherConfig.size;
    delete otherConfig.viewport;
    delete otherConfig.scissor;
    delete otherConfig.adaptiveCamera;
    Compiler.applyConfig(otherConfig, this.glRenderer);
    this.glRenderer.clear();
    return this;
  }
  dispose() {
    return this;
  }
}
class SceneCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "textureMap");
    __publicField(this, "target");
    __publicField(this, "scene");
    __publicField(this, "fogCache");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.scene && (this.scene = parameters.scene);
    } else {
      this.target = {
        scene: getSceneConfig()
      };
      this.scene = new Scene();
    }
    this.textureMap = new Map();
    this.fogCache = null;
  }
  background(value) {
    if (!value) {
      this.scene.background = null;
      return;
    }
    if (validate(value)) {
      if (this.textureMap.has(value)) {
        this.scene.background = this.textureMap.get(value);
      } else {
        console.warn(`scene compiler can not found this vid texture : '${value}'`);
      }
    } else {
      this.scene.background = new Color(value);
    }
  }
  environment(value) {
    if (!value) {
      this.scene.environment = null;
      return;
    }
    if (validate(value)) {
      if (this.textureMap.has(value)) {
        this.scene.environment = this.textureMap.get(value);
      } else {
        console.warn(`scene compiler can not found this vid texture : '${value}'`);
      }
    } else {
      console.warn(`this vid is illegal: '${value}'`);
    }
  }
  fog(config) {
    if (!config) {
      this.scene.fog = null;
      return;
    }
    if (config.type === "Fog") {
      if (this.fogCache instanceof Fog) {
        const fog = this.fogCache;
        fog.color = new Color(config.color);
        fog.near = config.near;
        fog.far = config.far;
      } else {
        this.scene.fog = new Fog(config.color, config.near, config.far);
        this.fogCache = this.scene.fog;
      }
    } else if (config.type === "FogExp2") {
      if (this.fogCache instanceof FogExp2) {
        const fog = this.fogCache;
        fog.color = new Color(config.color);
        fog.density = config.density;
      } else {
        this.scene.fog = new FogExp2(config.color, config.density);
        this.fogCache = this.scene.fog;
      }
    } else {
      console.warn(`scene compiler can not support this type fog:'${config.type}'`);
    }
  }
  linkTextureMap(map) {
    this.textureMap = map;
    return this;
  }
  set(path, key, value) {
    const sceneType = path.shift();
    if (sceneType === "scene") {
      const attribute = path[0];
      const actionMap = {
        background: () => this.background(value),
        environment: () => this.environment(value),
        fog: () => this.fog(this.target.scene.fog)
      };
      actionMap[attribute]();
      return this;
    } else {
      console.warn(`scene compiler can not support this type: ${sceneType}`);
      return this;
    }
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const sceneTarget = this.target.scene;
    this.background(sceneTarget.background);
    this.environment(sceneTarget.environment);
    this.fog(sceneTarget.fog);
    return this;
  }
  dispose() {
    return this;
  }
}
class ImageTexture extends Texture {
  constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    super(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
  }
}
class TextureCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "constructMap");
    __publicField(this, "resourceMap");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
    } else {
      this.target = {};
    }
    this.map = new Map();
    this.resourceMap = new Map();
    const constructMap = new Map();
    constructMap.set("ImageTexture", () => new ImageTexture());
    this.constructMap = constructMap;
  }
  getResource(url) {
    const resourceMap = this.resourceMap;
    if (resourceMap.has(url)) {
      const resource = resourceMap.get(url);
      if (resource instanceof HTMLImageElement || resource instanceof HTMLCanvasElement || resource instanceof HTMLVideoElement) {
        return resource;
      } else {
        console.error(`this url mapping resource is not a texture image class: ${url}`);
        return null;
      }
    } else {
      console.warn(`resource can not font url: ${url}`);
      return null;
    }
  }
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const texture = this.constructMap.get(config.type)();
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.type;
        delete tempConfig.vid;
        texture.image = this.getResource(tempConfig.image);
        delete tempConfig.image;
        Compiler.applyConfig(tempConfig, texture);
        texture.needsUpdate = true;
        this.map.set(vid, texture);
      } else {
        console.warn(`texture compiler can not support this type: ${config.type}`);
      }
    } else {
      console.error(`texture vid parameter is illegal: ${vid}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!validate(vid)) {
      console.warn(`texture compiler set function: vid is illeage: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`texture compiler set function: can not found texture which vid is: '${vid}'`);
      return this;
    }
    const texture = this.map.get(vid);
    let config = texture;
    path.forEach((key2, i, arr) => {
      config = config[key2];
    });
    config[key] = value;
    texture.needsUpdate = true;
    return this;
  }
  getMap() {
    return this.map;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    return this;
  }
}
const TextureRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`texture rule vid is illeage: '${vid}'`);
      return;
    }
  }
};
class TextureDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(TextureRule, data);
  }
}
const MaterialRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`material rule vid is illeage: '${vid}'`);
      return;
    }
  }
};
class MaterialDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(MaterialRule, data);
  }
}
const GeometryRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, value);
    } else {
      console.warn(`geometry rule vid is illeage: '${vid}'`);
      return;
    }
  }
};
class GeometryDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(GeometryRule, data);
  }
}
const CameraRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`camera rule vid is illeage: '${vid}'`);
    }
  }
};
class CameraDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(CameraRule, data);
  }
}
const RendererRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "set") {
    compiler.set(path.concat([]), key, value);
  }
};
class RendererDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(RendererRule, data);
  }
}
const SceneRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "set") {
    compiler.set(path.concat([]), key, value);
  }
};
class SceneDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {
      scene: getSceneConfig()
    });
    super(SceneRule, data);
  }
}
const ControlsRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "set") {
    const tempPath = path.concat([]);
    const type = tempPath.shift();
    if (type) {
      compiler.set(type, tempPath, key, value);
    } else {
      console.error(`controls rule can not found controls type in set operate.`);
    }
  }
};
class ControlsDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(ControlsRule, data);
  }
}
class DataSupportManager {
  constructor(parameters) {
    __publicField(this, "cameraDataSupport");
    __publicField(this, "lightDataSupport");
    __publicField(this, "geometryDataSupport");
    __publicField(this, "modelDataSupport");
    __publicField(this, "textureDataSupport");
    __publicField(this, "materialDataSupport");
    __publicField(this, "rendererDataSupport");
    __publicField(this, "sceneDataSupport");
    __publicField(this, "controlsDataSupport");
    __publicField(this, "dataSupportMap");
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        this[key] = parameters[key];
      });
    } else {
      this.cameraDataSupport = new CameraDataSupport();
      this.lightDataSupport = new LightDataSupport();
      this.geometryDataSupport = new GeometryDataSupport();
      this.modelDataSupport = new ModelDataSupport();
      this.textureDataSupport = new TextureDataSupport();
      this.materialDataSupport = new MaterialDataSupport();
      this.rendererDataSupport = new RendererDataSupport();
      this.sceneDataSupport = new SceneDataSupport();
      this.controlsDataSupport = new ControlsDataSupport();
    }
    const dataSupportMap = new Map();
    dataSupportMap.set(MODULETYPE.CAMERA, this.cameraDataSupport);
    dataSupportMap.set(MODULETYPE.LIGHT, this.lightDataSupport);
    dataSupportMap.set(MODULETYPE.GEOMETRY, this.geometryDataSupport);
    dataSupportMap.set(MODULETYPE.MODEL, this.modelDataSupport);
    dataSupportMap.set(MODULETYPE.TEXTURE, this.textureDataSupport);
    dataSupportMap.set(MODULETYPE.MATERIAL, this.materialDataSupport);
    dataSupportMap.set(MODULETYPE.RENDERER, this.rendererDataSupport);
    dataSupportMap.set(MODULETYPE.SCENE, this.sceneDataSupport);
    dataSupportMap.set(MODULETYPE.CONTROLS, this.controlsDataSupport);
    this.dataSupportMap = dataSupportMap;
  }
  getDataSupport(type) {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type);
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }
  getSupportData(type) {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type).getData();
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }
  setSupportData(type, data) {
    if (this.dataSupportMap.has(type)) {
      this.dataSupportMap.get(type).setData(data);
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
    }
    return this;
  }
  load(config) {
    config.camera && this.cameraDataSupport.load(config.camera);
    config.geometry && this.geometryDataSupport.load(config.geometry);
    config.light && this.lightDataSupport.load(config.light);
    config.material && this.materialDataSupport.load(config.material);
    config.model && this.modelDataSupport.load(config.model);
    config.texture && this.textureDataSupport.load(config.texture);
    config.renderer && this.rendererDataSupport.load(config.renderer);
    config.scene && this.sceneDataSupport.load(config.scene);
    config.controls && this.controlsDataSupport.load(config.controls);
    return this;
  }
  toJSON() {
    const jsonObject = {
      [MODULETYPE.RENDERER]: this.rendererDataSupport.toJSON(),
      [MODULETYPE.SCENE]: this.sceneDataSupport.toJSON(),
      [MODULETYPE.CAMERA]: this.cameraDataSupport.toJSON(),
      [MODULETYPE.GEOMETRY]: this.geometryDataSupport.toJSON(),
      [MODULETYPE.LIGHT]: this.lightDataSupport.toJSON(),
      [MODULETYPE.MATERIAL]: this.materialDataSupport.toJSON(),
      [MODULETYPE.MODEL]: this.modelDataSupport.toJSON(),
      [MODULETYPE.TEXTURE]: this.textureDataSupport.toJSON(),
      [MODULETYPE.CONTROLS]: this.controlsDataSupport.toJSON()
    };
    return JSON.stringify(jsonObject);
  }
}
class CompilerManager {
  constructor(parameters) {
    __publicField(this, "cameraCompiler");
    __publicField(this, "lightCompiler");
    __publicField(this, "geometryCompiler");
    __publicField(this, "modelCompiler");
    __publicField(this, "textureCompiler");
    __publicField(this, "materialCompiler");
    __publicField(this, "rendererCompiler");
    __publicField(this, "sceneCompiler");
    __publicField(this, "controlsCompiler");
    Object.keys(parameters).forEach((key) => {
      this[key] = parameters[key];
    });
  }
  getObjectVid(object) {
    const objectCompilerList = [
      this.cameraCompiler,
      this.lightCompiler,
      this.modelCompiler
    ];
    for (let compiler of objectCompilerList) {
      const vid = compiler.getSupportVid(object);
      if (vid) {
        return vid;
      }
    }
    return null;
  }
}
let pluginHandler = new Map();
pluginHandler.set("WebGLRenderer", WebGLRendererSupportPlugin);
pluginHandler.set("Scene", SceneSupportPlugin);
pluginHandler.set("ModelingScene", ModelingSceneSupportPlugin);
pluginHandler.set("RenderManager", RendererManagerPlugin);
pluginHandler.set("Stats", StatsPlugin);
pluginHandler.set("EffectComposer", EffectComposerPlugin);
pluginHandler.set("PointerManager", PointerManagerPlugin);
pluginHandler.set("EventManager", EventManagerSupportPlugin);
pluginHandler.set("OrbitControls", OrbitControlsSupportPlugin);
pluginHandler.set("TransformControls", TransformControlsSupportPlugin);
const _EngineSupport = class extends Engine {
  constructor(parameters) {
    super();
    __publicField(this, "dataSupportManager", new DataSupportManager());
    __publicField(this, "resourceManager", new ResourceManager());
    __publicField(this, "loaderManager", new LoaderManager());
    __publicField(this, "compilerManager");
    if (parameters && parameters.dataSupportManager) {
      this.dataSupportManager = parameters.dataSupportManager;
    }
    this.loaderManager.addEventListener("loaded", (event) => {
      this.resourceManager.mappingResource(event.resourceMap);
    });
  }
  mappingResource(resourceMap) {
    this.resourceManager.mappingResource(resourceMap);
    return this;
  }
  load(config) {
    const loadLifeCycle = () => {
      const dataSupportManager = this.dataSupportManager;
      config.texture && dataSupportManager.load({ texture: config.texture });
      config.material && dataSupportManager.load({ material: config.material });
      delete config.texture;
      delete config.material;
      dataSupportManager.load(config);
    };
    if (config.assets && config.assets.length) {
      this.loaderManager.reset().load(config.assets);
      const mappedFun = () => {
        delete config.assets;
        loadLifeCycle();
        this.resourceManager.removeEventListener("mapped", mappedFun);
      };
      this.resourceManager.addEventListener("mapped", mappedFun);
    } else {
      loadLifeCycle();
    }
  }
  support() {
    if (!this.webGLRenderer) {
      console.warn(`support exec must after installed webGLRenderer`);
      return this;
    }
    if (!this.scene) {
      console.warn(`support exec must after installed some scene`);
      return this;
    }
    if (!this.renderManager) {
      console.warn(`support exec must after installed renderManager`);
      return this;
    }
    const dataSupportManager = this.dataSupportManager;
    const textureDataSupport = dataSupportManager.getDataSupport(MODULETYPE.TEXTURE);
    const materialDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MATERIAL);
    const cameraDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CAMERA);
    const lightDataSupport = dataSupportManager.getDataSupport(MODULETYPE.LIGHT);
    const geometryDataSupport = dataSupportManager.getDataSupport(MODULETYPE.GEOMETRY);
    const modelDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MODEL);
    const rendererDataSupport = dataSupportManager.getDataSupport(MODULETYPE.RENDERER);
    const sceneDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SCENE);
    const controlsDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CONTROLS);
    const textureCompiler = new TextureCompiler({
      target: textureDataSupport.getData()
    });
    const materialCompiler = new MaterialCompiler({
      target: materialDataSupport.getData()
    });
    const cameraCompiler = new CameraCompiler({
      target: cameraDataSupport.getData(),
      scene: this.scene,
      engine: this
    });
    const lightCompiler = new LightCompiler({
      scene: this.scene,
      target: lightDataSupport.getData()
    });
    const geometryCompiler = new GeometryCompiler({
      target: geometryDataSupport.getData()
    });
    const modelCompiler = new ModelCompiler({
      scene: this.scene,
      target: modelDataSupport.getData()
    });
    const rendererCompiler = new RendererCompiler({
      target: rendererDataSupport.getData(),
      glRenderer: this.webGLRenderer,
      engine: this
    });
    const sceneCompiler = new SceneCompiler({
      target: sceneDataSupport.getData(),
      scene: this.scene
    });
    const controlsCompiler = new ControlsCompiler({
      target: controlsDataSupport.getData(),
      transformControls: this.transformControls
    });
    const resourceManager = this.resourceManager;
    sceneCompiler.linkTextureMap(textureCompiler.getMap());
    materialCompiler.linkTextureMap(textureCompiler.getMap());
    modelCompiler.linkGeometryMap(geometryCompiler.getMap()).linkMaterialMap(materialCompiler.getMap()).linkObjectMap(lightCompiler.getMap()).linkObjectMap(cameraCompiler.getMap()).linkObjectMap(modelCompiler.getMap());
    cameraCompiler.linkObjectMap(lightCompiler.getMap()).linkObjectMap(cameraCompiler.getMap()).linkObjectMap(modelCompiler.getMap());
    textureCompiler.linkRescourceMap(resourceManager.resourceMap);
    geometryCompiler.linkRescourceMap(resourceManager.resourceMap);
    textureDataSupport.addCompiler(textureCompiler);
    materialDataSupport.addCompiler(materialCompiler);
    cameraDataSupport.addCompiler(cameraCompiler);
    lightDataSupport.addCompiler(lightCompiler);
    geometryDataSupport.addCompiler(geometryCompiler);
    modelDataSupport.addCompiler(modelCompiler);
    rendererDataSupport.addCompiler(rendererCompiler);
    sceneDataSupport.addCompiler(sceneCompiler);
    controlsDataSupport.addCompiler(controlsCompiler);
    this.compilerManager = new CompilerManager({
      textureCompiler,
      materialCompiler,
      cameraCompiler,
      lightCompiler,
      geometryCompiler,
      modelCompiler,
      rendererCompiler,
      sceneCompiler,
      controlsCompiler
    });
    return this;
  }
  install(plugin, params) {
    if (_EngineSupport.pluginHandler.has(plugin)) {
      _EngineSupport.pluginHandler.get(plugin).call(this, params);
    } else {
      console.error(`EngineSupport can not support ${plugin} plugin.`);
    }
    return this;
  }
};
let EngineSupport = _EngineSupport;
__publicField(EngineSupport, "pluginHandler", pluginHandler);
class ModelingEngineSupport extends EngineSupport {
  constructor(parameters) {
    super(parameters);
    this.install(EnginePlugin.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(EnginePlugin.MODELINGSCENE, {
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: "env"
    }).install(EnginePlugin.RENDERMANAGER).install(EnginePlugin.STATS).install(EnginePlugin.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(EnginePlugin.ORBITCONTROLS).install(EnginePlugin.POINTERMANAGER).install(EnginePlugin.EVENTMANAGER).install(EnginePlugin.TRANSFORMCONTROLS).support();
  }
}
const _SupportDataGenerator = class {
  constructor() {
    __publicField(this, "supportData");
    __publicField(this, "supportDataType");
  }
  create(type) {
    if (!type) {
      console.warn("you must give a module type in create params");
      return this;
    }
    this.supportData = {};
    this.supportDataType = type;
    return this;
  }
  add(config) {
    if (!this.supportData || !this.supportDataType) {
      console.warn(`you must call 'create' method before the 'add' method`);
      return this;
    }
    if (!config.type) {
      console.warn(`config can not found attribute 'type'`);
      return this;
    }
    if (_SupportDataGenerator.configModelMap[config.type] !== this.supportDataType) {
      console.warn(`current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config.type}'`);
      return this;
    }
    this.supportData[config.vid] = generateConfig(config.type, config);
    return this;
  }
  get() {
    this.supportDataType = void 0;
    if (this.supportData) {
      return this.supportData;
    } else {
      return {};
    }
  }
};
let SupportDataGenerator = _SupportDataGenerator;
__publicField(SupportDataGenerator, "configModelMap", getConfigModelMap());
var OBJECTEVENT;
(function(OBJECTEVENT2) {
  OBJECTEVENT2["ACTIVE"] = "active";
  OBJECTEVENT2["HOVER"] = "hover";
})(OBJECTEVENT || (OBJECTEVENT = {}));
const pointLight = new PointLight("rgb(255, 255, 255)", 0.5, 200, 1);
pointLight.position.set(-30, 5, 20);
pointLight.castShadow = true;
const plane = new Mesh(new BoxBufferGeometry(80, 2, 80), new MeshStandardMaterial({
  color: "rgb(255, 255, 255)"
}));
plane.position.set(0, -11, 0);
plane.receiveShadow = true;
plane.castShadow = true;
const _MaterialDisplayer = class {
  constructor(parameters) {
    __publicField(this, "material");
    __publicField(this, "dom");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "object");
    const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("rgb(150, 150, 150)");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 35);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new Vector3(0, 0, 0));
    scene.add(_MaterialDisplayer.ambientLight);
    scene.add(_MaterialDisplayer.pointLight);
    scene.add(_MaterialDisplayer.plane);
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.object = new Object3D();
    (parameters == null ? void 0 : parameters.material) && this.setMaterial(parameters.material);
    (parameters == null ? void 0 : parameters.dom) && this.setDom(parameters.dom);
  }
  setMaterial(material) {
    this.scene.remove(this.object);
    this.material = material;
    if (material.type.includes("Mesh")) {
      this.object = new Mesh(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Line")) {
      this.object = new Line(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Ponits")) {
      this.object = new Points(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Sprite")) {
      this.object = new Sprite(material);
    } else {
      console.warn(`material displayer can not support this type material: '${material.type}'`);
      return this;
    }
    this.object.castShadow = true;
    this.object.receiveShadow = true;
    this.scene.add(this.object);
    return this;
  }
  setDom(dom) {
    this.dom = dom;
    this.setSize();
    dom.appendChild(this.renderer.domElement);
    return this;
  }
  setSize(width, height) {
    if (width && height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, true);
    } else {
      if (!this.dom) {
        console.warn(`material displayer must set dom before setSize with empty parameters`);
        return this;
      }
      const dom = this.dom;
      this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    }
    return this;
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.renderer.dispose();
  }
};
let MaterialDisplayer = _MaterialDisplayer;
__publicField(MaterialDisplayer, "ambientLight", new AmbientLight("rgb(255, 255, 255)", 0.7));
__publicField(MaterialDisplayer, "pointLight", pointLight);
__publicField(MaterialDisplayer, "geometry", new SphereBufferGeometry(10, 12, 12));
__publicField(MaterialDisplayer, "plane", plane);
__publicField(MaterialDisplayer, "dispose", () => {
  _MaterialDisplayer.geometry.dispose();
  _MaterialDisplayer.plane.geometry.dispose();
});
const _TextureDisplayer = class {
  constructor(parameters) {
    __publicField(this, "dom");
    __publicField(this, "texture");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    __publicField(this, "camera");
    const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("rgb(150, 150, 150)");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 35);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new Vector3(0, 0, 0));
    scene.add(_TextureDisplayer.ambientLight);
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    (parameters == null ? void 0 : parameters.texture) && this.setTexture(parameters.texture);
    (parameters == null ? void 0 : parameters.dom) && this.setDom(parameters.dom);
  }
  setTexture(texture) {
    this.scene.background = texture;
    return this;
  }
  setDom(dom) {
    this.dom = dom;
    this.setSize();
    dom.appendChild(this.renderer.domElement);
    return this;
  }
  setSize(width, height) {
    if (width && height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, true);
    } else {
      if (!this.dom) {
        console.warn(`texture displayer must set dom before setSize with empty parameters`);
        return this;
      }
      const dom = this.dom;
      this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    }
    return this;
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.renderer.dispose();
  }
};
let TextureDisplayer = _TextureDisplayer;
__publicField(TextureDisplayer, "ambientLight", new AmbientLight("rgb(255, 255, 255)", 1));
class DisplayEngineSupport extends EngineSupport {
  constructor(parameters) {
    super(parameters);
    this.install(EnginePlugin.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(EnginePlugin.SCENE).install(EnginePlugin.RENDERMANAGER).install(EnginePlugin.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(EnginePlugin.ORBITCONTROLS).install(EnginePlugin.POINTERMANAGER).install(EnginePlugin.EVENTMANAGER).support();
  }
}
export { CONFIGTYPE$1 as CONFIGTYPE, CameraDataSupport, CameraHelper, ControlsDataSupport, DataSupportManager, DisplayEngine, DisplayEngineSupport, EVENTTYPE, Engine, EngineSupport, GeometryDataSupport, LightDataSupport, LoaderManager, MODULETYPE, MaterialDataSupport, MaterialDisplayer, ModelDataSupport, ModelingEngine, ModelingEngineSupport, ModelingScene, OBJECTEVENT, PointLightHelper, RESOURCEEVENTTYPE, RendererDataSupport, ResourceManager, SCENEDISPLAYMODE, SCENEVIEWPOINT, SceneDataSupport, SupportDataGenerator, TextureDataSupport, TextureDisplayer, generateConfig };
