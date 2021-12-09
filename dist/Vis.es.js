var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { LineBasicMaterial, LineSegments, BufferGeometry, Float32BufferAttribute, Color, Mesh, OctahedronBufferGeometry, MeshBasicMaterial, Sphere, Vector3, CameraHelper as CameraHelper$1, Matrix4, PerspectiveCamera, OrthographicCamera, EdgesGeometry, Material, Scene, AxesHelper, GridHelper, MeshLambertMaterial, PointsMaterial, SpriteMaterial, AmbientLight, DirectionalLight, Line, Light, Points, Sprite, Camera, Texture, Vector2, Frustum, Quaternion, Raycaster, MOUSE, Object3D, EventDispatcher as EventDispatcher$1, Clock, WebGLRenderer, WebGLMultisampleRenderTarget, RGBAFormat, Euler, BoxBufferGeometry, SphereBufferGeometry, PointLight, SpotLight, MeshStandardMaterial, LinearEncoding, PCFShadowMap, NoToneMapping, Fog, FogExp2, Loader, FileLoader, Group, MeshPhongMaterial, LoaderUtils, FrontSide, RepeatWrapping, DefaultLoadingManager, TextureLoader, ImageLoader, UVMapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, TangentSpaceNormalMap } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
const ACTIVECOLOR = "rgb(230, 20, 240)";
const HOVERCOLOR = "rgb(255, 158, 240)";
const HELPERCOLOR = "rgb(255, 255, 255)";
const SELECTCOLOR = "rgb(230, 20, 240)";
const SELECTBGCOLOR = "rgba(230, 20, 240, 0.15)";
const getHelperLineMaterial = () => new LineBasicMaterial({ color: HELPERCOLOR });
class PointLightHelper extends LineSegments {
  constructor(pointLight) {
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
    const color = new Color().copy(pointLight.color).multiplyScalar(pointLight.intensity);
    const shape = new Mesh(new OctahedronBufferGeometry(pointLight.distance, 0), new MeshBasicMaterial({
      color,
      wireframe: true
    }));
    shape.raycast = () => {
    };
    this.shape = shape;
    this.target = pointLight;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cachaColor = pointLight.color.getHex();
    this.cachaDistance = pointLight.distance;
    this.cachaVector3 = new Vector3();
    this.add(this.shape);
    this.matrixAutoUpdate = false;
    this.matrix = pointLight.matrix;
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
    const thresholdAngle = 10;
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
const _SceneHelperCompiler = class {
  constructor(scene) {
    __publicField(this, "map");
    __publicField(this, "scene");
    this.map = new Map();
    this.scene = scene;
  }
  add(object) {
    if (_SceneHelperCompiler.filterHelperMap[object.type]) {
      return;
    }
    if (_SceneHelperCompiler.typeHelperMap[object.type]) {
      const helper = new _SceneHelperCompiler.typeHelperMap[object.type](object);
      this.map.set(object, helper);
      this.scene._add(helper);
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
    } else {
      console.warn(`Scene helper compiler can not found this object\`s helper: ${object}`);
    }
  }
  setVisiable(visiable) {
    const scene = this.scene;
    if (visiable) {
      this.map.forEach((origin, helper) => {
        scene._add(helper);
      });
    } else {
      this.map.forEach((origin, helper) => {
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
  "AmbientLight": true
});
var ModelingSceneCameraDefalutType;
(function(ModelingSceneCameraDefalutType2) {
  ModelingSceneCameraDefalutType2["DefaultPerspectiveCamera"] = "DefaultPerspectiveCamera";
  ModelingSceneCameraDefalutType2["DefaultOrthograpbicCamera"] = "DefaultOrthograpbicCamera";
})(ModelingSceneCameraDefalutType || (ModelingSceneCameraDefalutType = {}));
var ModelingSceneViewpoint;
(function(ModelingSceneViewpoint2) {
  ModelingSceneViewpoint2["DEFAULT"] = "default";
  ModelingSceneViewpoint2["TOP"] = "top";
  ModelingSceneViewpoint2["BOTTOM"] = "bottom";
  ModelingSceneViewpoint2["LEFT"] = "left";
  ModelingSceneViewpoint2["RIGHT"] = "right";
  ModelingSceneViewpoint2["FRONT"] = "front";
  ModelingSceneViewpoint2["BACK"] = "back";
})(ModelingSceneViewpoint || (ModelingSceneViewpoint = {}));
var ModelingSceneDisplayMode;
(function(ModelingSceneDisplayMode2) {
  ModelingSceneDisplayMode2[ModelingSceneDisplayMode2["GEOMETRY"] = 0] = "GEOMETRY";
  ModelingSceneDisplayMode2[ModelingSceneDisplayMode2["MATERIAL"] = 1] = "MATERIAL";
  ModelingSceneDisplayMode2[ModelingSceneDisplayMode2["LIGHT"] = 2] = "LIGHT";
  ModelingSceneDisplayMode2[ModelingSceneDisplayMode2["ENV"] = 3] = "ENV";
})(ModelingSceneDisplayMode || (ModelingSceneDisplayMode = {}));
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
    __publicField(this, "setDispalyMode");
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
      this.defaultPerspectiveCamera.position.set(30, 30, 30);
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
      this.addEventListener(`${ModelingSceneViewpoint.TOP}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 100, 0);
      });
      this.addEventListener(`${ModelingSceneViewpoint.BOTTOM}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, -100, 0);
      });
      this.addEventListener(`${ModelingSceneViewpoint.RIGHT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(100, 0, 0);
      });
      this.addEventListener(`${ModelingSceneViewpoint.LEFT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(-100, 0, 0);
      });
      this.addEventListener(`${ModelingSceneViewpoint.FRONT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 0, 100);
      });
      this.addEventListener(`${ModelingSceneViewpoint.BACK}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 0, -100);
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
      this.addEventListener(`${ModelingSceneViewpoint.DEFAULT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${ModelingSceneViewpoint.TOP}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${ModelingSceneViewpoint.BOTTOM}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${ModelingSceneViewpoint.RIGHT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, Math.PI / 2);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${ModelingSceneViewpoint.LEFT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, Math.PI / 2);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${ModelingSceneViewpoint.FRONT}ViewPoint`, (e) => {
        gridHelper.rotation.set(Math.PI / 2, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${ModelingSceneViewpoint.BACK}ViewPoint`, (e) => {
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
      this.setDispalyMode = (mode) => {
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
        if (mode === 0) {
          filterMaterial();
          filterScene();
          filterLight();
        } else if (mode === 1) {
          reduceMaterial();
          filterScene();
          filterLight();
        } else if (mode === 2) {
          reduceMaterial();
          filterScene();
          reduceLight();
        } else if (mode === 3) {
          reduceMaterial();
          reduceScene();
          reduceLight();
        } else {
          console.warn(`VisScene can not set this mode: ${mode}`);
        }
      };
      if (config.displayMode !== void 0) {
        this.displayMode = config.displayMode;
        this.setDispalyMode(this.displayMode);
      } else {
        this.displayMode = 3;
        this.setDispalyMode(this.displayMode);
      }
    }
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
  setViewPoint(direction) {
    this.dispatchEvent({ type: `${direction}ViewPoint` });
  }
  add(...object) {
    object.forEach((elem) => {
      if (elem instanceof Mesh) {
        this.meshSet.add(elem);
      } else if (elem instanceof Line) {
        this.lineSet.add(elem);
      } else if (elem instanceof Light) {
        this.lightSet.add(elem);
      } else if (elem instanceof Points) {
        this.pointsSet.add(elem);
      } else if (elem instanceof Sprite) {
        this.spriteSet.add(elem);
      } else if (elem instanceof Camera) {
        this.cameraSet.add(elem);
      }
      this.helperCompiler.add(elem);
    });
    if (this.displayMode !== void 0) {
      this.setDispalyMode(this.displayMode);
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
}
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
      (_a = listeners.get(type)) == null ? void 0 : _a.forEach((listener) => {
        listener.call(this, event);
      });
    }
  }
}
class PointerManager extends EventDispatcher {
  constructor(dom, throttleTime = 1e3 / 60) {
    super();
    __publicField(this, "dom");
    __publicField(this, "mouse");
    __publicField(this, "canMouseMove");
    __publicField(this, "mouseEventTimer");
    __publicField(this, "throttleTime");
    this.dom = dom;
    this.mouse = new Vector2();
    this.canMouseMove = true;
    this.mouseEventTimer = null;
    this.throttleTime = throttleTime;
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
    const eventObject = Object.assign(event, { mouse: this.mouse });
    this.dispatchEvent(eventObject);
  }
  pointerMove(event) {
    const eventObject = Object.assign(event, { mouse: this.mouse });
    this.dispatchEvent(eventObject);
  }
  pointerUp(event) {
    const eventObject = Object.assign(event, { mouse: this.mouse });
    this.dispatchEvent(eventObject);
  }
}
const _frustum = new Frustum();
const _center = new Vector3();
const _tmpPoint = new Vector3();
const _vecNear = new Vector3();
const _vecTopLeft = new Vector3();
const _vecTopRight = new Vector3();
const _vecDownRight = new Vector3();
const _vecDownLeft = new Vector3();
const _vecFarTopLeft = new Vector3();
const _vecFarTopRight = new Vector3();
const _vecFarDownRight = new Vector3();
const _vecFarDownLeft = new Vector3();
const _vectemp1 = new Vector3();
const _vectemp2 = new Vector3();
const _vectemp3 = new Vector3();
const _matrix = new Matrix4();
const _quaternion = new Quaternion();
const _scale = new Vector3();
class SelectionBox {
  constructor(camera, scene, deep = Number.MAX_VALUE) {
    this.camera = camera;
    this.scene = scene;
    this.startPoint = new Vector3();
    this.endPoint = new Vector3();
    this.collection = [];
    this.instances = {};
    this.deep = deep;
  }
  select(startPoint, endPoint) {
    this.startPoint = startPoint || this.startPoint;
    this.endPoint = endPoint || this.endPoint;
    this.collection = [];
    this.updateFrustum(this.startPoint, this.endPoint);
    this.searchChildInFrustum(_frustum, this.scene);
    return this.collection;
  }
  updateFrustum(startPoint, endPoint) {
    startPoint = startPoint || this.startPoint;
    endPoint = endPoint || this.endPoint;
    if (startPoint.x === endPoint.x) {
      endPoint.x += Number.EPSILON;
    }
    if (startPoint.y === endPoint.y) {
      endPoint.y += Number.EPSILON;
    }
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
    if (this.camera.isPerspectiveCamera) {
      _tmpPoint.copy(startPoint);
      _tmpPoint.x = Math.min(startPoint.x, endPoint.x);
      _tmpPoint.y = Math.max(startPoint.y, endPoint.y);
      endPoint.x = Math.max(startPoint.x, endPoint.x);
      endPoint.y = Math.min(startPoint.y, endPoint.y);
      _vecNear.setFromMatrixPosition(this.camera.matrixWorld);
      _vecTopLeft.copy(_tmpPoint);
      _vecTopRight.set(endPoint.x, _tmpPoint.y, 0);
      _vecDownRight.copy(endPoint);
      _vecDownLeft.set(_tmpPoint.x, endPoint.y, 0);
      _vecTopLeft.unproject(this.camera);
      _vecTopRight.unproject(this.camera);
      _vecDownRight.unproject(this.camera);
      _vecDownLeft.unproject(this.camera);
      _vectemp1.copy(_vecTopLeft).sub(_vecNear);
      _vectemp2.copy(_vecTopRight).sub(_vecNear);
      _vectemp3.copy(_vecDownRight).sub(_vecNear);
      _vectemp1.normalize();
      _vectemp2.normalize();
      _vectemp3.normalize();
      _vectemp1.multiplyScalar(this.deep);
      _vectemp2.multiplyScalar(this.deep);
      _vectemp3.multiplyScalar(this.deep);
      _vectemp1.add(_vecNear);
      _vectemp2.add(_vecNear);
      _vectemp3.add(_vecNear);
      const planes = _frustum.planes;
      planes[0].setFromCoplanarPoints(_vecNear, _vecTopLeft, _vecTopRight);
      planes[1].setFromCoplanarPoints(_vecNear, _vecTopRight, _vecDownRight);
      planes[2].setFromCoplanarPoints(_vecDownRight, _vecDownLeft, _vecNear);
      planes[3].setFromCoplanarPoints(_vecDownLeft, _vecTopLeft, _vecNear);
      planes[4].setFromCoplanarPoints(_vecTopRight, _vecDownRight, _vecDownLeft);
      planes[5].setFromCoplanarPoints(_vectemp3, _vectemp2, _vectemp1);
      planes[5].normal.multiplyScalar(-1);
    } else if (this.camera.isOrthographicCamera) {
      const left = Math.min(startPoint.x, endPoint.x);
      const top = Math.max(startPoint.y, endPoint.y);
      const right = Math.max(startPoint.x, endPoint.x);
      const down = Math.min(startPoint.y, endPoint.y);
      _vecTopLeft.set(left, top, -1);
      _vecTopRight.set(right, top, -1);
      _vecDownRight.set(right, down, -1);
      _vecDownLeft.set(left, down, -1);
      _vecFarTopLeft.set(left, top, 1);
      _vecFarTopRight.set(right, top, 1);
      _vecFarDownRight.set(right, down, 1);
      _vecFarDownLeft.set(left, down, 1);
      _vecTopLeft.unproject(this.camera);
      _vecTopRight.unproject(this.camera);
      _vecDownRight.unproject(this.camera);
      _vecDownLeft.unproject(this.camera);
      _vecFarTopLeft.unproject(this.camera);
      _vecFarTopRight.unproject(this.camera);
      _vecFarDownRight.unproject(this.camera);
      _vecFarDownLeft.unproject(this.camera);
      const planes = _frustum.planes;
      planes[0].setFromCoplanarPoints(_vecTopLeft, _vecFarTopLeft, _vecFarTopRight);
      planes[1].setFromCoplanarPoints(_vecTopRight, _vecFarTopRight, _vecFarDownRight);
      planes[2].setFromCoplanarPoints(_vecFarDownRight, _vecFarDownLeft, _vecDownLeft);
      planes[3].setFromCoplanarPoints(_vecFarDownLeft, _vecFarTopLeft, _vecTopLeft);
      planes[4].setFromCoplanarPoints(_vecTopRight, _vecDownRight, _vecDownLeft);
      planes[5].setFromCoplanarPoints(_vecFarDownRight, _vecFarTopRight, _vecFarTopLeft);
      planes[5].normal.multiplyScalar(-1);
    } else {
      console.error("THREE.SelectionBox: Unsupported camera type.");
    }
  }
  searchChildInFrustum(frustum, object) {
    if (object.isMesh || object.isLine || object.isPoints) {
      if (object.isInstancedMesh) {
        this.instances[object.uuid] = [];
        for (let instanceId = 0; instanceId < object.count; instanceId++) {
          object.getMatrixAt(instanceId, _matrix);
          _matrix.decompose(_center, _quaternion, _scale);
          if (frustum.containsPoint(_center)) {
            this.instances[object.uuid].push(instanceId);
          }
        }
      } else {
        if (object.geometry.boundingSphere === null)
          object.geometry.computeBoundingSphere();
        _center.copy(object.geometry.boundingSphere.center);
        _center.applyMatrix4(object.matrixWorld);
        if (frustum.containsPoint(_center)) {
          this.collection.push(object);
        }
      }
    }
    if (object.children.length > 0) {
      for (let x = 0; x < object.children.length; x++) {
        this.searchChildInFrustum(frustum, object.children[x]);
      }
    }
  }
}
class SelectionHelper {
  constructor() {
    __publicField(this, "element");
    __publicField(this, "startPoint");
    __publicField(this, "pointTopLeft");
    __publicField(this, "pointBottomRight");
    __publicField(this, "isDown");
    const element = document.createElement("div");
    element.style.pointerEvents = "none";
    element.style.border = `1px solid ${SELECTCOLOR}`;
    element.style.position = "fixed";
    element.style.zIndex = "100";
    element.style.backgroundColor = SELECTBGCOLOR;
    this.element = element;
    this.startPoint = new Vector2();
    this.pointTopLeft = new Vector2();
    this.pointBottomRight = new Vector2();
    this.isDown = false;
  }
  onSelectStart(event) {
    this.isDown = true;
    document.body.appendChild(this.element);
    this.element.style.left = event.clientX + "px";
    this.element.style.top = event.clientY + "px";
    this.element.style.width = "0px";
    this.element.style.height = "0px";
    this.startPoint.x = event.clientX;
    this.startPoint.y = event.clientY;
  }
  onSelectMove(event) {
    if (!this.isDown) {
      return;
    }
    this.pointBottomRight.x = Math.max(this.startPoint.x, event.clientX);
    this.pointBottomRight.y = Math.max(this.startPoint.y, event.clientY);
    this.pointTopLeft.x = Math.min(this.startPoint.x, event.clientX);
    this.pointTopLeft.y = Math.min(this.startPoint.y, event.clientY);
    this.element.style.left = this.pointTopLeft.x + "px";
    this.element.style.top = this.pointTopLeft.y + "px";
    this.element.style.width = this.pointBottomRight.x - this.pointTopLeft.x + "px";
    this.element.style.height = this.pointBottomRight.y - this.pointTopLeft.y + "px";
  }
  onSelectOver(event) {
    if (!this.isDown) {
      return;
    }
    this.isDown = false;
    document.body.removeChild(this.element);
  }
}
class SceneStatusManager extends SelectionBox {
  constructor(camera, scene, deep = Number.MAX_VALUE) {
    super(camera, scene, deep);
    __publicField(this, "selectionHelper");
    __publicField(this, "raycaster");
    __publicField(this, "hoverObjectSet");
    __publicField(this, "activeObjectSet");
    __publicField(this, "transformControlsFilterMap");
    this.hoverObjectSet = new Set();
    this.activeObjectSet = new Set();
    this.raycaster = new Raycaster();
    this.selectionHelper = new SelectionHelper();
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  filterTransformControls(controls) {
    this.transformControlsFilterMap = {};
    controls.traverse((object) => {
      this.transformControlsFilterMap[object.uuid] = true;
    });
    return this;
  }
  checkHoverObject(event) {
    this.hoverObjectSet.clear();
    const mouse = event.mouse;
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    const reycastObject = this.getRaycastbject(intersects);
    reycastObject && this.hoverObjectSet.add(reycastObject);
    return this;
  }
  checkActiveObject(event) {
    this.activeObjectSet.clear();
    const mouse = event.mouse;
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    const reycastObject = this.getRaycastbject(intersects);
    reycastObject && this.activeObjectSet.add(reycastObject);
    return this;
  }
  getRaycastbject(intersects) {
    if (!intersects.length) {
      return null;
    }
    if (!this.transformControlsFilterMap) {
      return intersects[0].object;
    }
    const transformControlsFilterMap = this.transformControlsFilterMap;
    let index = -1;
    intersects.some((elem, i, arr) => {
      if (!transformControlsFilterMap[elem.object.uuid]) {
        index = i;
        return true;
      }
    });
    if (index === -1) {
      return null;
    }
    return intersects[index].object;
  }
  selectStart(event) {
    const mouse = event.mouse;
    this.selectionHelper.onSelectStart(event);
    this.collection = [];
    this.startPoint.set(mouse.x, mouse.y, 0.5);
    return this;
  }
  selecting(event) {
    this.selectionHelper.onSelectMove(event);
    return this;
  }
  selectEnd(event) {
    const mouse = event.mouse;
    this.selectionHelper.onSelectOver(event);
    this.endPoint.set(mouse.x, mouse.y, 0.5);
    this.select();
    let collection = this.collection;
    collection = collection.filter((object) => !object.type.includes("Helper"));
    if (this.transformControlsFilterMap) {
      const filterMap = this.transformControlsFilterMap;
      collection = collection.filter((object) => !filterMap[object.uuid]);
    }
    collection.forEach((object) => {
      this.activeObjectSet.add(object);
    });
    return this;
  }
  getActiveObjectSet() {
    return this.activeObjectSet;
  }
  getHoverObjectSet() {
    return this.hoverObjectSet;
  }
}
class VisStats {
  constructor(parameter) {
    __publicField(this, "stats");
    __publicField(this, "domElement");
    this.stats = Stats();
    const dom = this.stats.domElement;
    dom.style.position = "absolute";
    dom.style.top = "0";
    dom.style.left = "35px";
    if (parameter) {
      dom.style.top = `${parameter.top}px`;
      dom.style.left = `${parameter.left}px`;
      dom.style.right = `${parameter.right}px`;
      dom.style.bottom = `${parameter.bottom}px`;
    }
    this.domElement = dom;
  }
  render() {
    this.stats.update();
  }
}
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
class VisTransformControls extends TransformControls {
  constructor(camera, dom) {
    super(camera, dom);
    __publicField(this, "target");
    this.target = new Object3D();
    this.attach(this.target);
  }
  getTarget() {
    return this.target;
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  setAttach(...object) {
    if (!object.length) {
      this.visible = false;
      return this;
    }
    const target = this.target;
    if (object.length === 1) {
      const currentObject = object[0];
      target.scale.copy(currentObject.scale);
      target.rotation.copy(currentObject.rotation);
      target.position.copy(currentObject.position);
      target.updateMatrix();
      target.updateMatrixWorld();
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
    console.log(xList);
    console.log(yList);
    console.log(zList);
    target.rotation.set(0, 0, 0);
    target.scale.set(0, 0, 0);
    target.position.x = (Math.max(...xList) - Math.min(...xList)) / 2 + Math.min(...xList);
    target.position.y = (Math.max(...yList) - Math.min(...yList)) / 2 + Math.min(...yList);
    target.position.z = (Math.max(...zList) - Math.min(...zList)) / 2 + Math.min(...zList);
    console.log(target.position);
    target.updateMatrix();
    target.updateMatrixWorld();
    return this;
  }
}
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
        type: "render",
        delta,
        total
      });
    });
    __publicField(this, "play", () => {
      this.dispatchEvent({
        type: "play"
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
        type: "stop"
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
class ModelingEngine extends EventDispatcher$1 {
  constructor(dom) {
    super();
    __publicField(this, "stats");
    __publicField(this, "orbitControls");
    __publicField(this, "transformControls");
    __publicField(this, "pointerManager");
    __publicField(this, "sceneStatusManager");
    __publicField(this, "composer");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    __publicField(this, "renderManager");
    __publicField(this, "hoverObjectSet");
    __publicField(this, "activeObjectSet");
    __publicField(this, "transing");
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true
    });
    const scene = new ModelingScene({
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: ModelingSceneDisplayMode.ENV
    });
    const camera = scene.getDefaultPerspectiveCamera();
    const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera();
    const defaultOrthograpbicCamera = scene.getDefaultOrthographicCamera();
    const stats = new VisStats();
    const orbitControls = new VisOrbitControls(camera, renderer.domElement);
    const transformControls = new VisTransformControls(camera, renderer.domElement);
    this.transing = false;
    const pointerManager = new PointerManager(renderer.domElement);
    const sceneStatusManager = new SceneStatusManager(camera, scene);
    const hoverObjectSet = sceneStatusManager.getHoverObjectSet();
    const activeObjectSet = sceneStatusManager.getActiveObjectSet();
    sceneStatusManager.filterTransformControls(transformControls);
    const pixelRatio = renderer.getPixelRatio();
    const size = renderer.getDrawingBufferSize(new Vector2());
    const renderTarget = new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
      format: RGBAFormat
    });
    const composer = new EffectComposer(renderer, renderTarget);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const renderManager = new RenderManager();
    scene.addEventListener(`${ModelingSceneViewpoint.DEFAULT}ViewPoint`, (e) => {
      this.setCamera(defaultPerspectiveCamera);
      orbitControls.enableRotate = true;
    });
    scene.addEventListener(`${ModelingSceneViewpoint.TOP}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
      orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${ModelingSceneViewpoint.BOTTOM}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
      orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${ModelingSceneViewpoint.RIGHT}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
      orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${ModelingSceneViewpoint.LEFT}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
      orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${ModelingSceneViewpoint.FRONT}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
      orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${ModelingSceneViewpoint.BACK}ViewPoint`, (e) => {
      this.setCamera(defaultOrthograpbicCamera);
      orbitControls.enableRotate = false;
    });
    this.addEventListener("setSize", (event) => {
      const e = event;
      const width = e.width;
      const height = e.height;
      defaultPerspectiveCamera.aspect = width / height;
      defaultPerspectiveCamera.updateProjectionMatrix();
      defaultOrthograpbicCamera.left = -width / 16;
      defaultOrthograpbicCamera.right = width / 16;
      defaultOrthograpbicCamera.top = height / 16;
      defaultOrthograpbicCamera.bottom = -height / 16;
      defaultOrthograpbicCamera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    });
    this.addEventListener("setCamera", (event) => {
      const e = event;
      const camera2 = e.camera;
      orbitControls.setCamera(camera2);
      transformControls.setCamera(camera2);
      sceneStatusManager.setCamera(camera2);
      renderPass.camera = camera2;
    });
    transformControls.addEventListener("mouseDown", () => {
      this.transing = true;
    });
    pointerManager.addEventListener("pointerdown", (event) => {
      if (event.button === 0 && !this.transing) {
        sceneStatusManager.selectStart(event);
      }
    });
    pointerManager.addEventListener("pointermove", (event) => {
      if (!this.transing) {
        if (event.buttons === 1) {
          sceneStatusManager.selecting(event);
        }
        sceneStatusManager.checkHoverObject(event);
        scene.setObjectHelperHover(...hoverObjectSet);
        if (hoverObjectSet.size) {
          hoverObjectSet.forEach((object) => {
            object.dispatchEvent({
              type: "hover"
            });
          });
        }
      } else {
        scene.setObjectHelperHover();
      }
    });
    pointerManager.addEventListener("pointerup", (event) => {
      if (this.transing) {
        this.transing = false;
        return;
      }
      if (event.button === 0 && !this.transing) {
        sceneStatusManager.checkActiveObject(event);
        sceneStatusManager.selectEnd(event);
        scene.setObjectHelperActive(...activeObjectSet);
        if (activeObjectSet.size) {
          scene._add(transformControls.getTarget());
          scene._add(transformControls);
          transformControls.setAttach(...activeObjectSet);
          activeObjectSet.forEach((object) => {
            object.dispatchEvent({
              type: "active"
            });
          });
        } else {
          scene._remove(transformControls.getTarget());
          scene._remove(transformControls);
        }
      }
    });
    renderManager.addEventListener("render", (event) => {
      const e = event;
      composer.render(e.delta);
    });
    this.renderer = renderer;
    this.orbitControls = orbitControls;
    this.transformControls = transformControls;
    this.pointerManager = pointerManager;
    this.sceneStatusManager = sceneStatusManager;
    this.composer = composer;
    this.stats = stats;
    this.scene = scene;
    this.renderManager = renderManager;
    this.hoverObjectSet = hoverObjectSet;
    this.activeObjectSet = activeObjectSet;
    if (dom) {
      this.setSize(dom.offsetWidth, dom.offsetHeight);
      dom.appendChild(renderer.domElement);
    }
  }
  getRenderer() {
    return this.renderer;
  }
  getScene() {
    return this.scene;
  }
  setCamera(camera) {
    this.dispatchEvent({
      type: "setCamera",
      camera
    });
    return this;
  }
  setSize(width, height) {
    if (width <= 0 || height <= 0) {
      console.error(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
      return this;
    }
    this.dispatchEvent({ type: "setSize", width, height });
    return this;
  }
  render() {
    this.renderManager.render();
  }
  play() {
    this.renderManager.play();
  }
  stop() {
    this.renderManager.stop();
  }
  addRender() {
    return this;
  }
  dispose() {
    this.renderer.clear();
    this.renderer.dispose();
  }
}
function isValidKey(key, object) {
  return key in object;
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
    const self = this;
    const handler = {
      get(target, key) {
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        if (target[key] === void 0) {
          if (typeof value === "object" && value !== null) {
            const newPath = path.concat([key]);
            value = self.proxyExtends(value, newPath);
          }
          self.broadcast({
            operate: "add",
            path: path.concat([]),
            key,
            value
          });
        } else {
          if (typeof value === "object" && !_ProxyBroadcast.proxyWeakSet.has(object)) {
            const newPath = path.concat([key]);
            value = self.proxyExtends(value, newPath);
          }
          self.broadcast({
            operate: "set",
            path: path.concat([]),
            key,
            value
          });
        }
        return Reflect.set(target, key, value);
      },
      deleteProperty(target, key) {
        self.broadcast({
          operate: "delete",
          path: path.concat([]),
          key,
          value: ""
        });
        return Reflect.deleteProperty(target, key);
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
  }
};
class ModelDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(ModelRule, data);
  }
}
class Compiler {
  static applyConfig(config, object, callBack) {
    const filterMap = {
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
    __publicField(this, "map");
    __publicField(this, "constructMap");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.scene && (this.scene = parameters.scene);
    } else {
      this.scene = new Scene();
      this.target = {};
    }
    this.map = new Map();
    const constructMap = new Map();
    constructMap.set("PerspectiveCamera", () => new PerspectiveCamera());
    constructMap.set("OrthographicCamera", () => new OrthographicCamera());
    this.constructMap = constructMap;
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const camera = this.constructMap.get(config.type)();
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.vid;
        delete tempConfig.type;
        Compiler.applyConfig(tempConfig, camera);
        if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
          camera.updateProjectionMatrix();
        }
        this.map.set(vid, camera);
        this.scene.add(camera);
      }
    } else {
      console.error(`camera vid parameter is illegal: ${vid}`);
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
})(MODULETYPE || (MODULETYPE = {}));
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
    __publicField(this, "constructMap");
    this.scene = parameters.scene;
    this.target = parameters.target;
    this.map = new Map();
    this.constructMap = new Map();
    this.constructMap.set("PointLight", () => new PointLight());
    this.constructMap.set("SpotLight", () => new SpotLight());
    this.constructMap.set("AmbientLight", () => new AmbientLight());
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const light = this.constructMap.get(config.type)();
        Compiler.applyConfig(config, light);
        light.color = new Color(config.color);
        this.map.set(vid, light);
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
    __publicField(this, "constructMap");
    __publicField(this, "geometryMap");
    __publicField(this, "materialMap");
    __publicField(this, "replaceMaterial");
    __publicField(this, "replaceGeometry");
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
    this.replaceMaterial = new MeshStandardMaterial({ color: "rgb(150, 150, 150)" });
    this.replaceGeometry = new BoxBufferGeometry(10, 10, 10);
    const constructMap = new Map();
    constructMap.set("Mesh", (config) => new Mesh(this.getGeometry(config.geometry), this.getMaterial(config.material)));
    constructMap.set("Line", (config) => new Line(this.getGeometry(config.geometry), this.getMaterial(config.material)));
    constructMap.set("Points", (config) => new Points(this.getGeometry(config.geometry), this.getMaterial(config.material)));
    this.constructMap = constructMap;
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const object = this.constructMap.get(config.type)(config);
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.vid;
        delete tempConfig.type;
        delete tempConfig.geometry;
        delete tempConfig.material;
        Compiler.applyConfig(tempConfig, object);
        this.map.set(vid, object);
        this.scene.add(object);
      }
    } else {
      console.error(`model vid parameter is illegal: ${vid}`);
    }
    return this;
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
      console.error(`vid parameter is illegal: ${vid} or can not found this vid model`);
    }
  }
  getMaterial(vid) {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid);
      } else {
        console.warn(`can not found material which vid: ${vid}`);
        return this.replaceMaterial;
      }
    } else {
      console.error(`material vid parameter is illegal: ${vid}`);
      return this.replaceMaterial;
    }
  }
  getGeometry(vid) {
    if (validate(vid)) {
      if (this.geometryMap.has(vid)) {
        return this.geometryMap.get(vid);
      } else {
        console.warn(`can not found geometry which vid: ${vid}`);
        return this.replaceGeometry;
      }
    } else {
      console.error(`geometry vid parameter is illegal: ${vid}`);
      return this.replaceGeometry;
    }
  }
  linkGeometryMap(map) {
    this.geometryMap = map;
    return this;
  }
  linkMaterialMap(materialMap) {
    this.materialMap = materialMap;
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
    viewport: null,
    scissor: null,
    size: null
  };
};
class RendererCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "glRenderer");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.glRenderer && (this.glRenderer = parameters.glRenderer);
    } else {
      this.target = {
        WebGLRenderer: getWebGLRendererConfig()
      };
      this.glRenderer = new WebGLRenderer();
    }
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
        scissor: () => this.setScissor(glRendererTarget.scissor)
      };
      if (actionMap[path[0]]) {
        actionMap[path[0]]();
        return this;
      }
      let glRenderer = this.glRenderer;
      path.forEach((key2, i, arr) => {
        glRenderer = glRenderer[key2];
      });
      glRenderer[key] = value;
      glRenderer.clear();
      return this;
    } else {
      console.warn(`renderer compiler can not support this type: ${rendererType}`);
      return this;
    }
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
    const otherConfig = JSON.parse(JSON.stringify(glRendererTarget));
    delete otherConfig.vid;
    delete otherConfig.type;
    delete otherConfig.clearColor;
    delete otherConfig.pixelRatio;
    delete otherConfig.size;
    delete otherConfig.viewport;
    delete otherConfig.scissor;
    Compiler.applyConfig(otherConfig, this.glRenderer);
    this.glRenderer.clear();
    return this;
  }
  dispose() {
    return this;
  }
}
const getSceneConfig = function() {
  return {
    vid: "Scene",
    type: "Scene",
    background: "",
    environment: "",
    fog: null
  };
};
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
class ModelingEngineSupport extends ModelingEngine {
  constructor(parameters) {
    super(parameters.dom);
    __publicField(this, "textureCompiler");
    __publicField(this, "materialCompiler");
    __publicField(this, "cameraCompiler");
    __publicField(this, "lightCompiler");
    __publicField(this, "modelCompiler");
    __publicField(this, "geometryCompiler");
    __publicField(this, "rendererCompiler");
    __publicField(this, "sceneCompiler");
    __publicField(this, "resourceManager");
    __publicField(this, "dataSupportManager");
    const dataSupportManager = parameters.dataSupportManager;
    const textureDataSupport = dataSupportManager.getDataSupport(MODULETYPE.TEXTURE);
    const materialDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MATERIAL);
    const cameraDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CAMERA);
    const lightDataSupport = dataSupportManager.getDataSupport(MODULETYPE.LIGHT);
    const geometryDataSupport = dataSupportManager.getDataSupport(MODULETYPE.GEOMETRY);
    const modelDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MODEL);
    const rendererDataSupport = dataSupportManager.getDataSupport(MODULETYPE.RENDERER);
    const sceneDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SCENE);
    const textureCompiler = new TextureCompiler({
      target: textureDataSupport.getData()
    });
    const materialCompiler = new MaterialCompiler({
      target: materialDataSupport.getData()
    });
    const cameraCompiler = new CameraCompiler({
      target: cameraDataSupport.getData(),
      scene: this.scene
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
      glRenderer: this.renderer
    });
    const sceneCompiler = new SceneCompiler({
      target: sceneDataSupport.getData(),
      scene: this.scene
    });
    const resourceManager = parameters.resourceManager;
    sceneCompiler.linkTextureMap(textureCompiler.getMap());
    materialCompiler.linkTextureMap(textureCompiler.getMap());
    modelCompiler.linkGeometryMap(geometryCompiler.getMap());
    modelCompiler.linkMaterialMap(materialCompiler.getMap());
    textureCompiler.linkRescourceMap(resourceManager.getMappingResourceMap());
    geometryCompiler.linkRescourceMap(resourceManager.getMappingResourceMap());
    textureDataSupport.addCompiler(textureCompiler);
    materialDataSupport.addCompiler(materialCompiler);
    cameraDataSupport.addCompiler(cameraCompiler);
    lightDataSupport.addCompiler(lightCompiler);
    geometryDataSupport.addCompiler(geometryCompiler);
    modelDataSupport.addCompiler(modelCompiler);
    rendererDataSupport.addCompiler(rendererCompiler);
    sceneDataSupport.addCompiler(sceneCompiler);
    this.textureCompiler = textureCompiler;
    this.materialCompiler = materialCompiler;
    this.cameraCompiler = cameraCompiler;
    this.lightCompiler = lightCompiler;
    this.modelCompiler = modelCompiler;
    this.geometryCompiler = geometryCompiler;
    this.rendererCompiler = rendererCompiler;
    this.sceneCompiler = sceneCompiler;
    this.dataSupportManager = parameters.dataSupportManager;
    this.resourceManager = parameters.resourceManager;
  }
  getDataSupportManager() {
    return this.dataSupportManager;
  }
}
const GeometryRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  }
};
class GeometryDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(GeometryRule, data);
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
var LOADEEVENTTYPE;
(function(LOADEEVENTTYPE2) {
  LOADEEVENTTYPE2["LOADING"] = "loading";
  LOADEEVENTTYPE2["DETAILLOADING"] = "detailLoading";
  LOADEEVENTTYPE2["DETAILLOADED"] = "detailLoaded";
  LOADEEVENTTYPE2["LOADED"] = "loaded";
})(LOADEEVENTTYPE || (LOADEEVENTTYPE = {}));
class LoaderManager extends EventDispatcher$1 {
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
  load(urlList) {
    var _a;
    this.isLoading = true;
    if (urlList.length <= 0) {
      this.checkLoaded();
      console.warn(`url list is empty.`);
      return this;
    }
    this.loadTotal += urlList.length;
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
          type: "detailLoading",
          detail
        });
      }).then((res) => {
        detail.progress = 1;
        this.loadSuccess += 1;
        this.resourceMap.set(url, res);
        this.dispatchEvent({
          type: "detailLoaded",
          detail
        });
        this.dispatchEvent({
          type: "loading",
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
          type: "detailLoaded",
          detail
        });
        this.dispatchEvent({
          type: "loading",
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        this.checkLoaded();
      });
    }
    return this;
  }
  loaded() {
    this.dispatchEvent({
      type: "loaded",
      loadTotal: this.loadTotal,
      loadSuccess: this.loadSuccess,
      loadError: this.loadError,
      resourceMap: this.resourceMap
    });
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
  dispose() {
    this.resourceMap.clear();
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
}
var RESOURCEEVENTTYPE;
(function(RESOURCEEVENTTYPE2) {
  RESOURCEEVENTTYPE2["MAPPED"] = "mapped";
})(RESOURCEEVENTTYPE || (RESOURCEEVENTTYPE = {}));
class ResourceManager extends EventDispatcher$1 {
  constructor() {
    super();
    __publicField(this, "mappingResourceMap", new Map());
    __publicField(this, "configMappingMap", new Map());
  }
  mappingResource(resourceMap) {
    const mappingResourceMap = this.mappingResourceMap;
    const configMappingMap = this.configMappingMap;
    const recursionMappingObject = function(url, object) {
      const config = {
        type: `${object.type}`
      };
      let mappingUrl = "";
      if (object.geometry) {
        mappingUrl = `${url}.geometry`;
        mappingResourceMap.set(mappingUrl, object.geometry);
        config.geometry = mappingUrl;
      }
      if (object.material) {
        const material = object.material;
        if (material instanceof Array) {
          config.material = [];
          material.forEach((materialChild, i, arr) => {
            mappingUrl = `${url}.material.${i}`;
            mappingResourceMap.set(mappingUrl, materialChild);
            config.material[i] = mappingUrl;
          });
        } else {
          mappingUrl = `${url}.material`;
          mappingResourceMap.set(mappingUrl, material);
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
    resourceMap.forEach((resource, url) => {
      if (resource instanceof HTMLElement) {
        mappingResourceMap.set(url, resource);
      } else if (resource instanceof Object3D) {
        configMappingMap.set(url, recursionMappingObject(url, resource));
      }
    });
    this.dispatchEvent({
      type: "mapped",
      mappingResourceMap: this.mappingResourceMap,
      configMappingMap: this.configMappingMap
    });
    return this;
  }
  getMappingResourceMap() {
    return this.mappingResourceMap;
  }
  getResource(mappingUrl) {
    return this.mappingResourceMap.get(mappingUrl);
  }
  getConfig(url) {
    return this.configMappingMap.get(url);
  }
  dispose() {
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
    distance: 150,
    decay: 0.01
  });
};
const getSpotLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: "SpotLight",
    distance: 150,
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
    radius: 1,
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
    type: "Mesh",
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
const getPerspectiveCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "PerspectiveCamera",
    fov: 45,
    aspect: 1920 / 1080,
    near: 1,
    far: 1e3
  });
};
const getOrthographicCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "OrthographicCamera",
    left: 1920 / 16,
    right: 1920 / 16,
    top: 1080 / 16,
    bottom: 1080 / 16,
    near: 0,
    far: 1e3
  });
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
  CONFIGTYPE2["AMBIENTLIGHT"] = "AmbientLight";
  CONFIGTYPE2["SPOTLIGHT"] = "SpotLight";
  CONFIGTYPE2["POINTLIGHT"] = "PointLight";
  CONFIGTYPE2["PERSPECTIVECAMERA"] = "PerspectiveCamera";
  CONFIGTYPE2["ORTHOGRAPHICCAMERA"] = "OrthographicCamera";
  CONFIGTYPE2["WEBGLRENDERER"] = "WebGLRenderer";
  CONFIGTYPE2["SCENE"] = "Scene";
})(CONFIGTYPE || (CONFIGTYPE = {}));
const typeMap = {
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
  [CONFIGTYPE.SCENE]: getSceneConfig
};
const generateConfig = function(type, merge) {
  if (typeMap[type]) {
    const recursion = (config, merge2) => {
      for (const key in merge2) {
        if (config[key] === void 0) {
          console.warn(`'${type}' config can not set key: ${key}`);
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
    recursion(initConfig, merge);
    return initConfig;
  } else {
    console.error(`type: ${type} can not be found in configList.`);
    return null;
  }
};
const TextureRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
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
  }
};
class MaterialDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(MaterialRule, data);
  }
}
const CameraRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
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
    !data && (data = {
      WebGLRenderer: getWebGLRendererConfig()
    });
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
    __publicField(this, "dataSupportMap");
    this.cameraDataSupport = (parameters == null ? void 0 : parameters.cameraDataSupport) || new CameraDataSupport();
    this.lightDataSupport = (parameters == null ? void 0 : parameters.lightDataSupport) || new LightDataSupport();
    this.geometryDataSupport = (parameters == null ? void 0 : parameters.geometryDataSupport) || new GeometryDataSupport();
    this.modelDataSupport = (parameters == null ? void 0 : parameters.modelDataSupport) || new ModelDataSupport();
    this.textureDataSupport = (parameters == null ? void 0 : parameters.textureDataSupport) || new TextureDataSupport();
    this.materialDataSupport = (parameters == null ? void 0 : parameters.materialDataSupport) || new MaterialDataSupport();
    this.rendererDataSupport = (parameters == null ? void 0 : parameters.rendererDataSupport) || new RendererDataSupport();
    this.sceneDataSupport = (parameters == null ? void 0 : parameters.sceneDataSupport) || new SceneDataSupport();
    const dataSupportMap = new Map();
    dataSupportMap.set(MODULETYPE.CAMERA, this.cameraDataSupport);
    dataSupportMap.set(MODULETYPE.LIGHT, this.lightDataSupport);
    dataSupportMap.set(MODULETYPE.GEOMETRY, this.geometryDataSupport);
    dataSupportMap.set(MODULETYPE.MODEL, this.modelDataSupport);
    dataSupportMap.set(MODULETYPE.TEXTURE, this.textureDataSupport);
    dataSupportMap.set(MODULETYPE.MATERIAL, this.materialDataSupport);
    dataSupportMap.set(MODULETYPE.RENDERER, this.rendererDataSupport);
    dataSupportMap.set(MODULETYPE.SCENE, this.sceneDataSupport);
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
  load(config) {
    config.camera && this.cameraDataSupport.load(config.camera);
    config.geometry && this.geometryDataSupport.load(config.geometry);
    config.light && this.lightDataSupport.load(config.light);
    config.material && this.materialDataSupport.load(config.material);
    config.model && this.modelDataSupport.load(config.model);
    config.texture && this.textureDataSupport.load(config.texture);
    config.renderer && this.rendererDataSupport.load(config.renderer);
    config.scene && this.sceneDataSupport.load(config.scene);
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
      [MODULETYPE.TEXTURE]: this.textureDataSupport.toJSON()
    };
    return JSON.stringify(jsonObject);
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
    if (_SupportDataGenerator.dataTypeMap[config.type] !== this.supportDataType) {
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
__publicField(SupportDataGenerator, "dataTypeMap", {
  [CONFIGTYPE.IMAGETEXTURE]: MODULETYPE.TEXTURE,
  [CONFIGTYPE.MESHSTANDARDMATERIAL]: MODULETYPE.MATERIAL,
  [CONFIGTYPE.AMBIENTLIGHT]: MODULETYPE.LIGHT,
  [CONFIGTYPE.SPOTLIGHT]: MODULETYPE.LIGHT,
  [CONFIGTYPE.POINTLIGHT]: MODULETYPE.LIGHT,
  [CONFIGTYPE.BOXGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.SPHEREGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.LOADGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.MODEL]: MODULETYPE.MODEL,
  [CONFIGTYPE.MESH]: MODULETYPE.MODEL,
  [CONFIGTYPE.LINE]: MODULETYPE.MODEL,
  [CONFIGTYPE.POINTS]: MODULETYPE.MODEL,
  [CONFIGTYPE.PERSPECTIVECAMERA]: MODULETYPE.CAMERA,
  [CONFIGTYPE.ORTHOGRAPHICCAMERA]: MODULETYPE.CAMERA,
  [CONFIGTYPE.WEBGLRENDERER]: MODULETYPE.RENDERER,
  [CONFIGTYPE.SCENE]: MODULETYPE.SCENE
});
export { CONFIGTYPE, CameraDataSupport, CameraHelper, DataSupportManager, GeometryDataSupport, LOADEEVENTTYPE, LightDataSupport, LoaderManager, MODULETYPE, MaterialDataSupport, ModelDataSupport, ModelingEngine, ModelingEngineSupport, PointLightHelper, RESOURCEEVENTTYPE, ResourceManager, SupportDataGenerator, TextureDataSupport, generateConfig };
