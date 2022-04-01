var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Scene, PerspectiveCamera, Clock, MOUSE, OrthographicCamera, Vector2, WebGLRenderTarget, RGBAFormat, WebGLMultisampleRenderTarget, Raycaster, Object3D, WebGLRenderer, Vector3, Loader, FileLoader, Group as Group$1, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Material, PointsMaterial, MeshPhongMaterial, LineSegments, Points, Mesh, LoaderUtils, FrontSide, RepeatWrapping, Color, DefaultLoadingManager, TextureLoader, Cache, ImageLoader, UVMapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, LinearEncoding, CubeReflectionMapping, TangentSpaceNormalMap, MultiplyOperation, PCFShadowMap, NoToneMapping, Matrix4, Quaternion, Euler, BoxBufferGeometry, SphereBufferGeometry, PlaneBufferGeometry, PointLight, SpotLight, AmbientLight, DirectionalLight, Line, MeshStandardMaterial, SpriteMaterial, Texture, MeshBasicMaterial, DodecahedronBufferGeometry, Fog, FogExp2, Sprite, RGBFormat, CubeTexture, CanvasTexture, AxesHelper, GridHelper, MeshLambertMaterial, Light, CameraHelper as CameraHelper$1, OctahedronBufferGeometry, Sphere, EdgesGeometry, PCFSoftShadowMap, BufferAttribute, Matrix3 } from "three";
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
  clear() {
    this.listeners = new Map();
  }
  useful() {
    return Boolean([...this.listeners.keys()].length);
  }
}
const ScenePlugin = function(params) {
  if (this.scene) {
    console.warn("this has installed scene plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
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
  this.scene = new Scene();
  const sceneAdd = this.scene.add.bind(this.scene);
  this.scene.add = function(...object) {
    sceneAdd(...object);
    this.dispatchEvent({
      type: "afterAdd",
      objects: object
    });
    return this;
  };
  const sceneRemove = this.scene.remove.bind(this.scene);
  this.scene.remove = function(...object) {
    sceneRemove(...object);
    this.dispatchEvent({
      type: "afterRemove",
      objects: object
    });
    return this;
  };
  this.render = () => {
    this.webGLRenderer.render(this.scene, this.currentCamera);
    return this;
  };
  const defalutCamera = new PerspectiveCamera();
  defalutCamera.position.set(50, 50, 50);
  defalutCamera.lookAt(0, 0, 0);
  this.currentCamera = defalutCamera;
  this.addEventListener("setSize", (event) => {
    const width = event.width;
    const height = event.height;
    defalutCamera.aspect = width / height;
    defalutCamera.updateProjectionMatrix();
  });
  return true;
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
const EVENTTYPE = {
  RENDERERMANAGER,
  SCENESTATUSMANAGER,
  POINTERMANAGER,
  MODELCOMPILER
};
class RenderManager extends EventDispatcher {
  constructor() {
    super(...arguments);
    __publicField(this, "clock", new Clock());
    __publicField(this, "animationFrame", -1);
    __publicField(this, "fps", 0);
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
      if (this.hasRendering()) {
        console.warn(`render manager has rendering.`);
        return;
      }
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
    __publicField(this, "hasRendering", () => {
      return this.animationFrame !== -1;
    });
    __publicField(this, "hasVaildRender", () => {
      return this.useful();
    });
  }
}
const RenderManagerPlugin = function() {
  if (this.renderManager) {
    console.warn("has installed render manager plugin.");
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
var VIEWPOINT;
(function(VIEWPOINT2) {
  VIEWPOINT2["DEFAULT"] = "default";
  VIEWPOINT2["TOP"] = "top";
  VIEWPOINT2["BOTTOM"] = "bottom";
  VIEWPOINT2["LEFT"] = "left";
  VIEWPOINT2["RIGHT"] = "right";
  VIEWPOINT2["FRONT"] = "front";
  VIEWPOINT2["BACK"] = "back";
})(VIEWPOINT || (VIEWPOINT = {}));
const ViewpointPlugin = function(params = {}) {
  if (!this.webGLRenderer) {
    console.error("must install some renderer before BasicViewpoint plugin.");
    return false;
  }
  if (!this.scene) {
    console.error("must install some scene before BasicViewpoint plugin.");
    return false;
  }
  !params.viewpoint && (params.viewpoint = VIEWPOINT.DEFAULT);
  !params.perspective && (params.perspective = {});
  !params.perspective.position && (params.perspective.position = {
    x: 60,
    y: 60,
    z: 60
  });
  !params.perspective.lookAt && (params.perspective.lookAt = {
    x: 0,
    y: 0,
    z: 0
  });
  !params.perspective.up && (params.perspective.up = {
    x: 0,
    y: 1,
    z: 0
  });
  !params.orthograpbic && (params.orthograpbic = {});
  !params.orthograpbic.up && (params.orthograpbic.up = {
    x: 0,
    y: 1,
    z: 0
  });
  const perspectiveCamera = new PerspectiveCamera();
  perspectiveCamera.position.set(params.perspective.position.x, params.perspective.position.y, params.perspective.position.z);
  perspectiveCamera.lookAt(params.perspective.lookAt.x, params.perspective.lookAt.y, params.perspective.lookAt.z);
  perspectiveCamera.up.set(params.perspective.up.x, params.perspective.up.y, params.perspective.up.z);
  const orthograpbicCamera = new OrthographicCamera(-window.innerWidth / 8, window.innerWidth / 8, -window.innerHeight / 8, window.innerHeight / 8);
  orthograpbicCamera.up.set(params.perspective.up.x, params.perspective.up.y, params.perspective.up.z);
  this.setViewpoint = function(viewpoint) {
    this.dispatchEvent({
      type: "setViewpoint",
      viewpoint
    });
    return this;
  };
  this.addEventListener("setSize", (event) => {
    const width = event.width;
    const height = event.height;
    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();
    orthograpbicCamera.left = -width / 16;
    orthograpbicCamera.right = width / 16;
    orthograpbicCamera.top = height / 16;
    orthograpbicCamera.bottom = -height / 16;
    orthograpbicCamera.updateProjectionMatrix();
  });
  const distance = params.orthograpbic.distance || 60;
  this.addEventListener("setViewpoint", (event) => {
    const viewpoint = event.viewpoint;
    if (viewpoint === VIEWPOINT.DEFAULT) {
      this.setCamera(perspectiveCamera);
      return;
    }
    if (viewpoint === VIEWPOINT.TOP) {
      orthograpbicCamera.position.set(0, distance, 0);
    } else if (viewpoint === VIEWPOINT.BOTTOM) {
      orthograpbicCamera.position.set(0, -distance, 0);
    } else if (viewpoint === VIEWPOINT.RIGHT) {
      orthograpbicCamera.position.set(distance, 0, 0);
    } else if (viewpoint === VIEWPOINT.LEFT) {
      orthograpbicCamera.position.set(-distance, 0, 0);
    } else if (viewpoint === VIEWPOINT.FRONT) {
      orthograpbicCamera.position.set(0, 0, distance);
    } else if (viewpoint === VIEWPOINT.BACK) {
      orthograpbicCamera.position.set(0, 0, -distance);
    }
    this.setCamera(orthograpbicCamera);
  });
  this.completeSet.add(() => {
    if (params.viewpoint === VIEWPOINT.DEFAULT) {
      this.setCamera(perspectiveCamera);
    } else {
      this.setCamera(orthograpbicCamera);
    }
  });
  return true;
};
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
  this.completeSet.add(() => {
    if (this.setViewpoint) {
      this.addEventListener("setViewpoint", (event) => {
        const viewpoint = event.viewpoint;
        this.orbitControls.target.set(0, 0, 0);
        if (viewpoint === VIEWPOINT.DEFAULT) {
          this.orbitControls.enableRotate = true;
        } else if (viewpoint === VIEWPOINT.TOP) {
          this.orbitControls.enableRotate = false;
        } else if (viewpoint === VIEWPOINT.BOTTOM) {
          this.orbitControls.enableRotate = false;
        } else if (viewpoint === VIEWPOINT.RIGHT) {
          this.orbitControls.enableRotate = false;
        } else if (viewpoint === VIEWPOINT.LEFT) {
          this.orbitControls.enableRotate = false;
        } else if (viewpoint === VIEWPOINT.FRONT) {
          this.orbitControls.enableRotate = false;
        } else if (viewpoint === VIEWPOINT.BACK) {
          this.orbitControls.enableRotate = false;
        }
      });
    }
  });
  return true;
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
    console.warn("this must install renderManager before install stats plugin.");
    return false;
  }
  const stats = new VisStats(params);
  this.stats = stats;
  const statsUpdateFun = () => {
    this.stats.update();
  };
  this.setStats = function(show) {
    if (show) {
      this.dom.appendChild(this.stats.domElement);
      this.renderManager.addEventListener("render", statsUpdateFun);
    } else {
      try {
        this.dom.removeChild(this.stats.domElement);
        this.renderManager.removeEventListener("render", statsUpdateFun);
      } catch (error) {
      }
    }
    return this;
  };
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
    if (Number(window.__THREE__) > 137) {
      composer = new EffectComposer(renderer, new WebGLRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
        format: params.format || RGBAFormat,
        samples: params.samples || 4
      }));
    } else {
      composer = new EffectComposer(renderer, new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
        format: params.format || RGBAFormat
      }));
    }
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
var EVENTNAME;
(function(EVENTNAME2) {
  EVENTNAME2["POINTERDOWN"] = "pointerdown";
  EVENTNAME2["POINTERUP"] = "pointerup";
  EVENTNAME2["POINTERMOVE"] = "pointermove";
  EVENTNAME2["POINTERENTER"] = "pointerenter";
  EVENTNAME2["POINTERLEAVE"] = "pointerleave";
  EVENTNAME2["CLICK"] = "click";
  EVENTNAME2["DBLCLICK"] = "dblclick";
  EVENTNAME2["CONTEXTMENU"] = "contextmenu";
})(EVENTNAME || (EVENTNAME = {}));
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
      if (intersections.length) {
        if (this.penetrate) {
          if (event.button === 0) {
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
          }
        } else {
          const intersection = intersections[0];
          if (event.button === 0) {
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
      }
      if (event.button === 0) {
        this.dispatchEvent(mergeEvent(event, {
          type: "pointerdown",
          intersections
        }));
        this.dispatchEvent(mergeEvent(event, {
          type: "mousedown",
          intersections
        }));
      }
    });
    const cacheObjectMap = new Map();
    let topCacheIntersection = null;
    pointerManager.addEventListener("pointermove", (event) => {
      const intersections = this.intersectObject(event.mouse);
      if (this.penetrate) {
        if (!intersections.length) {
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
          return;
        }
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
            cacheObjectMap.delete(intersection.object);
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
        for (let intersection of cacheObjectMap.values()) {
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointerleave",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "mouseleave",
            intersection
          }));
        }
        cacheObjectMap.clear();
        for (let intersection of intersections) {
          cacheObjectMap.set(intersection.object, intersection);
        }
      } else {
        if (!intersections.length) {
          if (topCacheIntersection) {
            topCacheIntersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointerleave",
              intersection: topCacheIntersection
            }));
            topCacheIntersection.object.dispatchEvent(mergeEvent(event, {
              type: "mouseleave",
              intersection: topCacheIntersection
            }));
            topCacheIntersection = null;
          }
          return;
        }
        const intersection = intersections[0];
        if (!topCacheIntersection) {
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointerenter",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "mouseenter",
            intersection
          }));
          topCacheIntersection = intersection;
          return;
        }
        if (intersection.object !== topCacheIntersection.object) {
          topCacheIntersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointerleave",
            intersection
          }));
          topCacheIntersection.object.dispatchEvent(mergeEvent(event, {
            type: "mouseleave",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointerenter",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "mouseenter",
            intersection
          }));
          topCacheIntersection = intersection;
          return;
        }
        if (intersection.object === topCacheIntersection.object) {
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointermove",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "mousemove",
            intersection
          }));
        }
      }
      this.dispatchEvent(mergeEvent(event, {
        type: "pointermove",
        intersections
      }));
      this.dispatchEvent(mergeEvent(event, {
        type: "mousemove",
        intersections
      }));
    });
    const cacheClickObject = new Map();
    let cacheClickTimer = null;
    pointerManager.addEventListener("pointerup", (event) => {
      const intersections = this.intersectObject(event.mouse);
      if (intersections.length) {
        if (this.penetrate) {
          for (let intersection of intersections) {
            if (event.button === 0) {
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
              if (cacheClickObject.has(intersection.object)) {
                intersection.object.dispatchEvent(mergeEvent(event, {
                  type: "dblclick",
                  intersection
                }));
              }
            } else if (event.button === 2) {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "contextmenu",
                intersection
              }));
            }
          }
        } else {
          const intersection = intersections[0];
          if (event.button === 0) {
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
            if (cacheClickObject.has(intersection.object)) {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "dblclick",
                intersection
              }));
            }
          } else if (event.button === 2) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "contextmenu",
              intersection
            }));
          }
        }
      }
      if (event.button === 0) {
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
        if (cacheClickTimer) {
          clearTimeout(cacheClickTimer);
          cacheClickTimer = null;
          this.dispatchEvent(mergeEvent(event, {
            type: "dblclick",
            intersections
          }));
        } else {
          if (intersections.length) {
            for (let intersection of intersections) {
              cacheClickObject.set(intersection.object, true);
            }
          }
          cacheClickTimer = setTimeout(() => {
            cacheClickTimer = null;
            cacheClickObject.clear();
          }, 300);
        }
      } else if (event.button === 2) {
        this.dispatchEvent(mergeEvent(event, {
          type: "contextmenu",
          intersections
        }));
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
  return true;
};
var TRANSFORMEVENT;
(function(TRANSFORMEVENT2) {
  TRANSFORMEVENT2["OBJECTCHANGED"] = "objectChanged";
})(TRANSFORMEVENT || (TRANSFORMEVENT = {}));
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
        type: TRANSFORMEVENT.OBJECTCHANGED,
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
  transformControls.detach();
  this.transformControls = transformControls;
  this.transing = false;
  transformControls.addEventListener("mouseDown", () => {
    this.transing = true;
  });
  this.scene.add(this.transformControls);
  this.scene.add(this.transformControls.target);
  this.setTransformControls = function(show) {
    if (show) {
      this.scene.add(this.transformControls);
    } else {
      this.scene.remove(this.transformControls);
    }
    return this;
  };
  this.addEventListener("setCamera", (event) => {
    transformControls.setCamera(event.camera);
  });
  if (this.selectionBox) {
    this.addEventListener("selected", (event) => {
      transformControls.setAttach(...event.objects);
    });
  } else {
    this.eventManager.addEventListener("pointerup", (event) => {
      if (this.transing) {
        return;
      }
      if (event.button === 0) {
        const objectList = event.intersections.map((elem) => elem.object);
        transformControls.setAttach(objectList[0]);
      }
    });
  }
  this.completeSet.add(() => {
    if (this.IS_ENGINESUPPORT) {
      const objectToConfig = (object) => {
        const symbol = this.compilerManager.getObjectSymbol(object);
        if (!symbol) {
          return null;
        }
        return this.dataSupportManager.getObjectConfig(symbol);
      };
      let config = null;
      let mode;
      transformControls.addEventListener(TRANSFORMEVENT.OBJECTCHANGED, (event) => {
        const e = event;
        e.transObjectSet.forEach((object) => {
          config = objectToConfig(object);
          mode = e.mode;
          if (config) {
            config[mode].x = object[mode].x;
            config[mode].y = object[mode].y;
            config[mode].z = object[mode].z;
          }
        });
      });
    }
  });
  return true;
};
const WebGLRendererPlugin = function(params = {}) {
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
  this.setCamera = function(camera) {
    this.currentCamera = camera;
    this.dispatchEvent({
      type: "setCamera",
      camera
    });
    return this;
  };
  this.getScreenshot = function(params2 = {}) {
    const cacheSize = {
      width: this.dom.offsetWidth,
      height: this.dom.offsetHeight
    };
    !params2.width && (params2.width = this.dom.offsetWidth);
    !params2.height && (params2.height = this.dom.offsetHeight);
    !params2.mine && (params2.mine = "image/png");
    let renderFlag = false;
    if (this.renderManager.hasRendering()) {
      this.renderManager.stop();
      renderFlag = true;
    }
    this.setSize(params2.width, params2.height);
    this.renderManager.render();
    const element = document.createElement("img");
    const DataURI = this.webGLRenderer.domElement.toDataURL(params2.mine);
    element.src = DataURI;
    this.setSize(cacheSize.width, cacheSize.height);
    if (renderFlag) {
      this.renderManager.play();
    }
    return element;
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
  });
  this.addEventListener("dispose", () => {
    this.webGLRenderer.dispose();
  });
  return true;
};
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
    const container = new Group$1();
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
const _VideoLoader = class extends Loader {
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    if (this.path !== void 0) {
      url = this.path + url;
    }
    this.manager.itemStart(url);
    url = this.manager.resolveURL(url);
    const cached = Cache.get(url);
    if (cached !== void 0) {
      setTimeout(() => {
        if (onLoad)
          onLoad(cached);
        this.manager.itemEnd(url);
      }, 0);
      return cached;
    }
    const video = document.createElement("video");
    video.preload = _VideoLoader.preload;
    video.autoplay = _VideoLoader.autoplay;
    video.loop = _VideoLoader.loop;
    video.muted = _VideoLoader.muted;
    video.src = url;
    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.zIndex = "-1";
    document.body.appendChild(video);
    video.oncanplay = () => {
      Cache.add(url, video);
      this.manager.itemEnd(url);
      if (onLoad)
        onLoad(video);
    };
    video.onerror = (e) => {
      this.manager.itemEnd(url);
      if (onError)
        onError(e);
    };
    return video;
  }
};
let VideoLoader = _VideoLoader;
__publicField(VideoLoader, "autoplay", true);
__publicField(VideoLoader, "preload", "auto");
__publicField(VideoLoader, "muted", true);
__publicField(VideoLoader, "loop", true);
var LOADERMANAGER;
(function(LOADERMANAGER2) {
  LOADERMANAGER2["BEFORELOAD"] = "beforeLoad";
  LOADERMANAGER2["LOADING"] = "loading";
  LOADERMANAGER2["DETAILLOADING"] = "detailLoading";
  LOADERMANAGER2["DETAILLOADED"] = "detailLoaded";
  LOADERMANAGER2["LOADED"] = "loaded";
})(LOADERMANAGER || (LOADERMANAGER = {}));
class LoaderManager extends EventDispatcher {
  constructor(parameters) {
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
    __publicField(this, "path", "");
    this.resourceMap = new Map();
    this.loadTotal = 0;
    this.loadSuccess = 0;
    this.loadError = 0;
    this.isError = false;
    this.isLoading = false;
    this.isLoaded = false;
    this.loadDetailMap = {};
    const imageLoader = new ImageLoader();
    const videoLoader = new VideoLoader();
    this.loaderMap = {
      "jpg": imageLoader,
      "png": imageLoader,
      "jpeg": imageLoader,
      "obj": new OBJLoader(),
      "mtl": new MTLLoader(),
      "mp4": videoLoader,
      "webm": videoLoader,
      "ogg": videoLoader
    };
    if (parameters) {
      this.loaderMap = Object.assign(this.loaderMap, parameters.loaderExtends);
    }
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
  setPath(path) {
    const map = this.loaderMap;
    Object.keys(map).forEach((ext) => {
      map[ext].setPath(path);
    });
    this.path = path;
    return this;
  }
  load(urlList) {
    var _a;
    this.reset();
    this.isLoading = true;
    this.dispatchEvent({
      type: LOADERMANAGER.BEFORELOAD,
      urlList: [...urlList]
    });
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
        console.warn(detail.message);
        detail.error = true;
        this.isError = true;
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
        continue;
      }
      const loader = loaderMap[ext];
      if (!loader) {
        detail.message = `url: ${url} \u4E0D\u652F\u6301\u6B64\u6587\u4EF6\u683C\u5F0F\u52A0\u8F7D\u3002`;
        console.warn(detail.message);
        detail.error = true;
        this.isError = true;
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
  remove(url) {
  }
  toJSON() {
    const assets = [];
    this.resourceMap.forEach((value, url) => {
      assets.push(url);
    });
    return JSON.stringify(assets);
  }
  dispose() {
    this.resourceMap.clear();
    return this;
  }
}
const LoaderManagerPlugin = function(params) {
  if (this.loaderManager) {
    console.warn("engine has installed loaderManager plugin.");
    return false;
  }
  const loaderManager = new LoaderManager(params);
  this.loaderManager = loaderManager;
  this.loadResources = (urlList, callback) => {
    if (this.resourceManager) {
      const lodedFun = (event) => {
        callback(void 0, event);
        this.resourceManager.removeEventListener("mapped", lodedFun);
      };
      try {
        this.resourceManager.addEventListener("mapped", lodedFun);
      } catch (error) {
        callback(error);
      }
    } else {
      const lodedFun = (event) => {
        callback(void 0, event);
        this.loaderManager.removeEventListener("loaded", lodedFun);
      };
      try {
        this.loaderManager.addEventListener("loaded", lodedFun);
      } catch (error) {
        callback(error);
      }
    }
    this.loaderManager.load(urlList);
    return this;
  };
  this.loadResourcesAsync = (urlList) => {
    return new Promise((resolve, reject) => {
      if (this.resourceManager) {
        const lodedFun = (event) => {
          resolve(event);
          this.resourceManager.removeEventListener("mapped", lodedFun);
        };
        try {
          this.resourceManager.addEventListener("mapped", lodedFun);
        } catch (error) {
          reject(error);
        }
      } else {
        const lodedFun = (event) => {
          resolve(event);
          this.loaderManager.removeEventListener("loaded", lodedFun);
        };
        try {
          this.loaderManager.addEventListener("loaded", lodedFun);
        } catch (error) {
          reject(error);
        }
      }
      this.loaderManager.load(urlList);
    });
  };
  return true;
};
var CONFIGTYPE;
(function(CONFIGTYPE2) {
  CONFIGTYPE2["BOXGEOMETRY"] = "BoxGeometry";
  CONFIGTYPE2["SPHEREGEOMETRY"] = "SphereGeometry";
  CONFIGTYPE2["LOADGEOMETRY"] = "LoadGeometry";
  CONFIGTYPE2["PLANEGEOMETRY"] = "PlaneGeometry";
  CONFIGTYPE2["MESH"] = "Mesh";
  CONFIGTYPE2["LINE"] = "Line";
  CONFIGTYPE2["LINESEGMENTS"] = "LineSegments";
  CONFIGTYPE2["POINTS"] = "Points";
  CONFIGTYPE2["SPRITE"] = "Sprite";
  CONFIGTYPE2["GROUP"] = "Group";
  CONFIGTYPE2["IMAGETEXTURE"] = "ImageTexture";
  CONFIGTYPE2["CUBETEXTURE"] = "CubeTexture";
  CONFIGTYPE2["CANVASTEXTURE"] = "CanvasTexture";
  CONFIGTYPE2["VIDEOTEXTURE"] = "VideoTexture";
  CONFIGTYPE2["MESHSTANDARDMATERIAL"] = "MeshStandardMaterial";
  CONFIGTYPE2["MESHPHONGMATERIAL"] = "MeshPhongMaterial";
  CONFIGTYPE2["SPRITEMATERIAL"] = "SpriteMaterial";
  CONFIGTYPE2["LINEBASICMATERIAL"] = "LineBasicMaterial";
  CONFIGTYPE2["POINTSMATERIAL"] = "PointsMaterial";
  CONFIGTYPE2["AMBIENTLIGHT"] = "AmbientLight";
  CONFIGTYPE2["SPOTLIGHT"] = "SpotLight";
  CONFIGTYPE2["POINTLIGHT"] = "PointLight";
  CONFIGTYPE2["DIRECTIONALLIGHT"] = "DirectionalLight";
  CONFIGTYPE2["PERSPECTIVECAMERA"] = "PerspectiveCamera";
  CONFIGTYPE2["ORTHOGRAPHICCAMERA"] = "OrthographicCamera";
  CONFIGTYPE2["WEBGLRENDERER"] = "WebGLRenderer";
  CONFIGTYPE2["SCENE"] = "Scene";
  CONFIGTYPE2["TRNASFORMCONTROLS"] = "TransformControls";
  CONFIGTYPE2["ORBITCONTROLS"] = "OrbitControls";
  CONFIGTYPE2["EVENT"] = "Event";
})(CONFIGTYPE || (CONFIGTYPE = {}));
var MODULETYPE;
(function(MODULETYPE2) {
  MODULETYPE2["CAMERA"] = "camera";
  MODULETYPE2["LIGHT"] = "light";
  MODULETYPE2["GEOMETRY"] = "geometry";
  MODULETYPE2["TEXTURE"] = "texture";
  MODULETYPE2["MATERIAL"] = "material";
  MODULETYPE2["RENDERER"] = "renderer";
  MODULETYPE2["SCENE"] = "scene";
  MODULETYPE2["SPRITE"] = "sprite";
  MODULETYPE2["CONTROLS"] = "controls";
  MODULETYPE2["EVENT"] = "event";
  MODULETYPE2["LINE"] = "line";
  MODULETYPE2["MESH"] = "mesh";
  MODULETYPE2["POINTS"] = "points";
  MODULETYPE2["GROUP"] = "group";
  MODULETYPE2["MODIFIER"] = "modifier";
})(MODULETYPE || (MODULETYPE = {}));
const getObjectConfig = () => {
  return {
    vid: "",
    name: "",
    type: "Object3D",
    castShadow: true,
    receiveShadow: true,
    lookAt: "",
    visible: true,
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
    type: CONFIGTYPE.AMBIENTLIGHT,
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
};
const getPointLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: CONFIGTYPE.POINTLIGHT,
    distance: 30,
    decay: 0.01
  });
};
const getSpotLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: CONFIGTYPE.SPOTLIGHT,
    distance: 30,
    angle: Math.PI / 180 * 45,
    penumbra: 0.01,
    decay: 0.01
  });
};
const getDirectionalLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: CONFIGTYPE.DIRECTIONALLIGHT,
    shadow: {
      mapSize: {
        width: 512,
        height: 512
      },
      camera: {
        near: 0.5,
        far: 500
      }
    }
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
    type: CONFIGTYPE.BOXGEOMETRY,
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
    type: CONFIGTYPE.SPHEREGEOMETRY,
    radius: 3,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  });
};
const getPlaneGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.PLANEGEOMETRY,
    width: 1,
    height: 1,
    widthSegments: 1,
    heightSegments: 1
  });
};
const getLoadGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.LOADGEOMETRY,
    url: ""
  });
};
const getTextureConfig = function() {
  return {
    vid: "",
    type: "Texture",
    name: "",
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
    type: CONFIGTYPE.IMAGETEXTURE,
    url: ""
  });
};
const getVideoTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    type: CONFIGTYPE.VIDEOTEXTURE,
    url: "",
    minFilter: LinearFilter
  });
};
const getCubeTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    type: CONFIGTYPE.CUBETEXTURE,
    cube: {
      nx: "",
      ny: "",
      nz: "",
      px: "",
      py: "",
      pz: ""
    },
    mapping: CubeReflectionMapping,
    flipY: false
  });
};
const getCanvasTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    type: CONFIGTYPE.CANVASTEXTURE,
    url: "",
    needsUpdate: false
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
    type: CONFIGTYPE.MESHSTANDARDMATERIAL,
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
    type: CONFIGTYPE.MESHPHONGMATERIAL,
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
const getSpriteMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.SPRITEMATERIAL,
    color: "rgb(255, 255, 255)",
    rotation: 0,
    map: "",
    alphaMap: "",
    sizeAttenuation: true
  });
};
const getLineBasicMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.LINEBASICMATERIAL,
    color: "rgb(255, 255, 255)",
    linecap: "round",
    linejoin: "round",
    linewidth: 1
  });
};
const getPointsMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.POINTSMATERIAL,
    map: "",
    alphaMap: "",
    color: "rgb(255, 255, 255)",
    sizeAttenuation: true,
    size: 1
  });
};
const getPerspectiveCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.PERSPECTIVECAMERA,
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50
  });
};
const getOrthographicCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.ORTHOGRAPHICCAMERA,
    adaptiveWindow: false,
    left: 1920 / 16,
    right: 1920 / 16,
    top: 1080 / 16,
    bottom: 1080 / 16,
    near: 5,
    far: 50
  });
};
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
    fog: {
      type: "",
      color: "rgb(150, 150, 150)",
      near: 1,
      far: 200,
      density: 3e-3
    }
  };
};
const getTransformControlsConfig = function() {
  return {
    vid: CONFIGTYPE.TRNASFORMCONTROLS,
    type: CONFIGTYPE.TRNASFORMCONTROLS,
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
    vid: CONFIGTYPE.ORBITCONTROLS,
    type: CONFIGTYPE.ORBITCONTROLS,
    autoRotate: false,
    autoRotateSpeed: 2,
    enableDamping: false,
    dampingFactor: 0.05,
    enabled: true,
    enablePan: true,
    enableRotate: true,
    enableZoom: true,
    maxAzimuthAngle: Infinity,
    maxDistance: Infinity,
    maxPolarAngle: Math.PI,
    maxZoom: Infinity,
    minAzimuthAngle: -Infinity,
    minDistance: 0,
    minPolarAngle: 0,
    minZoom: 0,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    screenSpacePanning: true
  };
};
const getSpriteConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "Sprite",
    material: "",
    center: {
      x: 0.5,
      y: 0.5
    }
  });
};
const getEventConfig = function() {
  return {
    vid: "",
    type: CONFIGTYPE.EVENT,
    target: "",
    pointerdown: [],
    pointermove: [],
    pointerup: [],
    pointerenter: [],
    pointerleave: [],
    click: [],
    dblclick: [],
    contextmenu: []
  };
};
const getMeshConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.MESH,
    geometry: "",
    material: ""
  });
};
const getPointsConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.POINTS,
    geometry: "",
    material: ""
  });
};
const getLineConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.LINE,
    geometry: "",
    material: ""
  });
};
const getGroupConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.GROUP,
    children: []
  });
};
function isValidKey(key, object) {
  return key in object;
}
function isValidEnum(enumeration, value) {
  return Object.values(enumeration).includes(value);
}
function generateConfigFunction(config) {
  return (merge) => {
    const recursion = (config2, merge2) => {
      for (const key in merge2) {
        if (config2[key] === void 0) {
          console.warn(` config can not set key: ${key}`);
          continue;
        }
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config2[key], merge2[key]);
        } else {
          config2[key] = merge2[key];
        }
      }
    };
    if (merge) {
      recursion(config, merge);
    }
    return config;
  };
}
function getConfigModelMap() {
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
  };
}
function getConfigFunctionMap() {
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
  };
}
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify$1(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify$1(rnds);
}
const typeMap = getConfigFunctionMap();
const generateConfig = function(type, merge, strict = true, warn = true) {
  if (typeMap[type]) {
    const recursion = (config, merge2) => {
      for (const key in merge2) {
        if (config[key] === void 0) {
          !strict && (config[key] = merge2[key]);
          strict && warn && console.warn(`'${type}' config can not set key: ${key}`);
          continue;
        }
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config[key], merge2[key]);
        } else {
          config[key] = merge2[key];
        }
      }
    };
    const initConfig = typeMap[type]();
    if (initConfig.vid === "") {
      initConfig.vid = v4();
    }
    merge && recursion(initConfig, merge);
    return initConfig;
  } else {
    console.error(`type: ${type} can not be found in configList.`);
    return null;
  }
};
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
        configMap.set(mappingUrl, generateConfig(CONFIGTYPE.LOADGEOMETRY, {
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
            configMap.set(mappingUrl, generateConfig(materialChild.type, materialChild, true, false));
            config.material[i] = mappingUrl;
          });
        } else {
          mappingUrl = `${url}.material`;
          resourceMap.set(mappingUrl, material);
          configMap.set(mappingUrl, generateConfig(material.type, material, true, false));
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
        configMap.set(url, generateConfig(CONFIGTYPE.IMAGETEXTURE, {
          url
        }));
        structureMap.set(url, url);
      } else if (resource instanceof HTMLCanvasElement || resource instanceof HTMLVideoElement) {
        resourceMap.set(url, resource);
        structureMap.set(url, url);
      } else if (resource instanceof Object3D) {
        structureMap.set(url, recursionMappingObject(url, resource));
      } else {
        resourceMap.set(url, resource);
        structureMap.set(url, url);
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
  remove(url) {
  }
  dispose() {
  }
}
const ResourceManagerPlugin = function(params) {
  if (this.resourceManager) {
    console.warn("engine has installed resourceManager plugin.");
    return false;
  }
  const resourceManager = new ResourceManager();
  this.resourceManager = resourceManager;
  if (this.loaderManager) {
    this.loaderManager.addEventListener("loaded", (event) => {
      this.resourceManager.mappingResource(event.resourceMap);
    });
  }
  this.registerResources = (resourceMap) => {
    const map = new Map();
    Object.keys(resourceMap).forEach((key) => {
      map.set(key, resourceMap[key]);
    });
    this.resourceManager.mappingResource(map);
    return this;
  };
  return true;
};
const stringify = (key, value) => {
  if (value === Infinity) {
    return "Infinity";
  }
  if (value === -Infinity) {
    return "-Infinity";
  }
  return value;
};
const parse = (key, value) => {
  if (value === "Infinity") {
    return Infinity;
  }
  if (value === "-Infinity") {
    return -Infinity;
  }
  return value;
};
var JSONHandler = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  stringify,
  parse
});
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
          if (typeof value === "object" && value !== null && !_ProxyBroadcast.proxyWeakSet.has(value)) {
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
          if (typeof value === "object" && value !== null && !_ProxyBroadcast.proxyWeakSet.has(value)) {
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
    const proxy = new Proxy(object, handler);
    _ProxyBroadcast.proxyWeakSet.add(proxy);
    return proxy;
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
  existSymbol(vid) {
    return Boolean(this.data[vid]);
  }
  getConfig(vid) {
    return this.data[vid];
  }
  removeConfig(vid) {
    const data = this.data;
    data[vid] !== void 0 && delete data[vid];
  }
  addCompiler(compiler) {
    compiler.setTarget(this.data);
    compiler.compileAll();
    this.translater.apply(compiler);
    return this;
  }
  toJSON() {
    return JSON.stringify(this.data, stringify);
  }
  load(config) {
    const data = this.data;
    for (const key in config) {
      data[key] = config[key];
    }
    return this;
  }
  remove(config) {
    const data = this.data;
    for (const key in config) {
      data[key] !== void 0 && delete data[key];
    }
    return this;
  }
  getModule() {
    return this.MODULE;
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
    __publicField(this, "MODULE", MODULETYPE.TEXTURE);
  }
}
const MaterialRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`material rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class MaterialDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(MaterialRule, data);
    __publicField(this, "MODULE", MODULETYPE.MATERIAL);
  }
}
class ObjectDataSupport extends DataSupport {
  constructor(rule, data) {
    !data && (data = Object.create(Object.prototype));
    super(rule, data);
    __publicField(this, "MODULE", MODULETYPE.MESH);
    __publicField(this, "IS_OBJECTDATASUPPORT", true);
  }
}
const LightRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    }
    return;
  }
};
class LightDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(LightRule, data);
    __publicField(this, "MODULE", MODULETYPE.LIGHT);
  }
}
const GeometryRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    } else {
      console.warn(`geometry rule vid is illeage: '${key}'`);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, value);
    } else {
      console.warn(`geometry rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    } else {
      console.warn(`geometry rule vid is illeage: '${key}'`);
    }
    return;
  }
};
class GeometryDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(GeometryRule, data);
    __publicField(this, "MODULE", MODULETYPE.GEOMETRY);
  }
}
const CameraRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`camera rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    }
    return;
  }
};
class CameraDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(CameraRule, data);
    __publicField(this, "MODULE", MODULETYPE.CAMERA);
  }
}
const RendererRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "add") {
    compiler.add(key, value);
    return;
  }
  if (operate === "set") {
    compiler.set(path.concat([]), key, value);
    return;
  }
};
class RendererDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(RendererRule, data);
    __publicField(this, "MODULE", MODULETYPE.RENDERER);
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
      [CONFIGTYPE.SCENE]: getSceneConfig()
    });
    super(SceneRule, data);
    __publicField(this, "MODULE", MODULETYPE.SCENE);
  }
}
const ControlsRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid) {
      compiler.set(vid, tempPath, key, value);
    } else if (key) {
      compiler.setAll(key);
    } else {
      console.warn(`controls rule can not found controls type in set operate: ${vid}`);
    }
  }
};
class ControlsDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(ControlsRule, data);
    __publicField(this, "MODULE", MODULETYPE.CONTROLS);
  }
}
const SpriteRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    compiler.set(vid, tempPath, key, value);
  }
  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    }
    return;
  }
};
class SpriteDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(SpriteRule, data);
    __publicField(this, "MODULE", MODULETYPE.SPRITE);
  }
}
const EventRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key) && !path.length) {
      compiler.add(key, value);
    } else {
      if (Number.isInteger(Number(key)) && path.length === 2) {
        const [vid, eventName] = path;
        if (!validate(vid)) {
          console.warn(`EventRule: vid is illeage: ${vid}`);
          return;
        }
        if (!isValidEnum(EVENTNAME, eventName)) {
          console.warn(`EventRule: eventName is not support: ${eventName}`);
          return;
        }
        compiler.addEvent(vid, eventName, value);
      }
    }
    return;
  }
  if (operate === "set") {
    if (!path.length) {
      return;
    }
    const [vid, eventName, index] = path;
    if (!validate(vid)) {
      console.warn(`EventRule: vid is illeage: ${vid}`);
      return;
    }
    if (!isValidEnum(EVENTNAME, eventName)) {
      console.warn(`EventRule: eventName is not support: ${eventName}`);
      return;
    }
    if (!Number.isInteger(Number(index))) {
      console.warn(`EventRule: this index is not integer: ${index}`);
      return;
    }
    compiler.updateEvent(vid, eventName, Number(index));
    return;
  }
  if (operate === "delete") {
    if (validate(key) && !path.length) {
      compiler.remove(key);
    } else {
      if (Number.isInteger(Number(key)) && path.length === 2) {
        const [vid, eventName] = path;
        if (!validate(vid)) {
          console.warn(`EventRule: vid is illeage: ${vid}`);
          return;
        }
        if (!isValidEnum(EVENTNAME, eventName)) {
          console.warn(`EventRule: eventName is not support: ${eventName}`);
          return;
        }
        compiler.removeEvent(vid, eventName, Number(key));
      }
    }
    return;
  }
};
class EventDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(EventRule, data);
    __publicField(this, "MODULE", MODULETYPE.EVENT);
  }
}
const LineRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class LineDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(LineRule, data);
    __publicField(this, "MODULE", MODULETYPE.LINE);
  }
}
const MeshRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`Mesh rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    }
    return;
  }
};
class MeshDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(MeshRule, data);
    __publicField(this, "MODULE", MODULETYPE.MESH);
  }
}
const PointsRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    }
    return;
  }
};
class PointsDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(PointsRule, data);
    __publicField(this, "MODULE", MODULETYPE.POINTS);
  }
}
const GroupRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  console.log(input);
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    }
    return;
  }
};
class GroupDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(GroupRule, data);
    __publicField(this, "MODULE", MODULETYPE.GROUP);
  }
}
const _DataSupportManager = class {
  constructor(parameters) {
    __publicField(this, "cameraDataSupport");
    __publicField(this, "lightDataSupport");
    __publicField(this, "geometryDataSupport");
    __publicField(this, "textureDataSupport");
    __publicField(this, "materialDataSupport");
    __publicField(this, "rendererDataSupport");
    __publicField(this, "sceneDataSupport");
    __publicField(this, "controlsDataSupport");
    __publicField(this, "spriteDataSupport");
    __publicField(this, "eventDataSupport");
    __publicField(this, "lineDataSupport");
    __publicField(this, "meshDataSupport");
    __publicField(this, "pointsDataSupport");
    __publicField(this, "groupDataSupport");
    __publicField(this, "dataSupportMap");
    __publicField(this, "objectDataSupportList");
    this.cameraDataSupport = new CameraDataSupport();
    this.lightDataSupport = new LightDataSupport();
    this.geometryDataSupport = new GeometryDataSupport();
    this.textureDataSupport = new TextureDataSupport();
    this.materialDataSupport = new MaterialDataSupport();
    this.rendererDataSupport = new RendererDataSupport();
    this.sceneDataSupport = new SceneDataSupport();
    this.controlsDataSupport = new ControlsDataSupport();
    this.spriteDataSupport = new SpriteDataSupport();
    this.eventDataSupport = new EventDataSupport();
    this.lineDataSupport = new LineDataSupport();
    this.meshDataSupport = new MeshDataSupport();
    this.pointsDataSupport = new PointsDataSupport();
    this.groupDataSupport = new GroupDataSupport();
    this.objectDataSupportList = [];
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        if (this[key] !== void 0) {
          this[key] = parameters[key];
        }
      });
    } else {
      Object.keys(this).forEach((key) => {
        if (typeof this[key] === "object" && this[key].IS_OBJECTDATASUPPORT) {
          this.objectDataSupportList.push(this[key]);
        }
      });
    }
    const dataSupportMap = new Map();
    for (let module in MODULETYPE) {
      const dataSupport = this[`${MODULETYPE[module]}DataSupport`];
      if (dataSupport) {
        dataSupportMap.set(MODULETYPE[module], dataSupport);
        if (dataSupport.IS_OBJECTDATASUPPORT) {
          this.objectDataSupportList.push(dataSupport);
        }
      } else {
        console.warn(`dataSupportManager can not support this module dataSupport: ${module}`);
      }
    }
    this.dataSupportMap = dataSupportMap;
  }
  getObjectDataSupportList() {
    return this.objectDataSupportList;
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
  getObjectConfig(vid) {
    if (!validate(vid)) {
      console.warn(`vid is illeage: ${vid}`);
      return null;
    }
    for (let objectDataSupport of this.objectDataSupportList) {
      const config = objectDataSupport.getConfig(vid);
      if (config) {
        return config;
      }
    }
    return null;
  }
  getConfigBySymbol(vid) {
    const dataSupportList = this.dataSupportMap.values();
    for (let dataSupport of dataSupportList) {
      const config = dataSupport.getConfig(vid);
      if (config) {
        return config;
      }
    }
    return null;
  }
  removeConfigBySymbol(vid) {
    const dataSupportList = this.dataSupportMap.values();
    for (let dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        dataSupport.removeConfig(vid);
        return;
      }
    }
  }
  getModuleBySymbol(vid) {
    const dataSupportList = this.dataSupportMap.values();
    for (let dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        return dataSupport.MODULE;
      }
    }
    return null;
  }
  load(config) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.load(config[module]);
    });
    return this;
  }
  remove(config) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.remove(config[module]);
    });
    return this;
  }
  toJSON(extendsConfig) {
    const jsonObject = extendsConfig || {};
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      jsonObject[module] = dataSupport.getData();
    });
    return JSON.stringify(jsonObject, stringify);
  }
};
let DataSupportManager = _DataSupportManager;
__publicField(DataSupportManager, "register", function(module, dataSupport) {
  return _DataSupportManager;
});
const DataSupportManagerPlugin = function(params) {
  if (this.dataSupportManager) {
    console.warn("engine has installed dataSupportManager plugin.");
    return false;
  }
  const dataSupportManager = new DataSupportManager(params);
  this.dataSupportManager = dataSupportManager;
  this.toJSON = function() {
    if (this.loaderManager) {
      const assets = {
        assets: JSON.parse(this.loaderManager.toJSON())
      };
      return this.dataSupportManager.toJSON(assets);
    }
    return this.dataSupportManager.toJSON();
  };
  this.completeSet.add(() => {
    const rendererData = this.dataSupportManager.getDataSupport(MODULETYPE.RENDERER).getData();
    if (!rendererData.WebGLRenderer) {
      rendererData.WebGLRenderer = generateConfig(CONFIGTYPE.WEBGLRENDERER);
    }
    const sceneData = this.dataSupportManager.getDataSupport(MODULETYPE.SCENE).getData();
    if (!sceneData[CONFIGTYPE.SCENE]) {
      sceneData[CONFIGTYPE.SCENE] = generateConfig(CONFIGTYPE.SCENE);
    }
    const controlsData = this.dataSupportManager.getDataSupport(MODULETYPE.CONTROLS).getData();
    if (this.transformControls) {
      if (!controlsData[CONFIGTYPE.TRNASFORMCONTROLS]) {
        controlsData[CONFIGTYPE.TRNASFORMCONTROLS] = generateConfig(CONFIGTYPE.TRNASFORMCONTROLS);
      }
    }
    if (this.orbitControls) {
      if (!controlsData[CONFIGTYPE.ORBITCONTROLS]) {
        controlsData[CONFIGTYPE.ORBITCONTROLS] = generateConfig(CONFIGTYPE.ORBITCONTROLS);
      }
    }
  });
  return true;
};
class Compiler {
  static applyConfig(config, object, filter = {}, callBack) {
    const filterMap = Object.assign({
      vid: true,
      type: true
    }, filter);
    const recursiveConfig = (config2, object2) => {
      for (const key in config2) {
        if (filterMap[key]) {
          continue;
        }
        if (typeof config2[key] === "object" && typeof config2[key] !== null && isValidKey(key, object2)) {
          recursiveConfig(config2[key], object2[key]);
          continue;
        }
        if (isValidKey(key, object2)) {
          object2[key] = config2[key];
        }
      }
    };
    recursiveConfig(config, object);
    callBack && callBack();
  }
  constructor() {
  }
}
class ObjectCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "IS_OBJECTCOMPILER", true);
    __publicField(this, "scene");
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "weakMap");
    __publicField(this, "cacheObjectMap");
    __publicField(this, "geometryMap");
    __publicField(this, "materialMap");
    __publicField(this, "objectMapSet");
    if (parameters) {
      parameters.scene && (this.scene = parameters.scene);
      parameters.target && (this.target = parameters.target);
    } else {
      this.scene = new Scene();
      this.target = {};
    }
    this.geometryMap = new Map();
    this.materialMap = new Map();
    this.map = new Map();
    this.weakMap = new WeakMap();
    this.objectMapSet = new Set();
    this.cacheObjectMap = new WeakMap();
  }
  getMaterial(vid) {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid);
      } else {
        console.warn(`${this.COMPILER_NAME}Compiler: can not found material which vid: ${vid}`);
        return this.getReplaceMaterial();
      }
    } else {
      console.warn(`${this.COMPILER_NAME}Compiler: material vid parameter is illegal: ${vid}`);
      return this.getReplaceMaterial();
    }
  }
  getGeometry(vid) {
    if (validate(vid)) {
      if (this.geometryMap.has(vid)) {
        return this.geometryMap.get(vid);
      } else {
        console.warn(`${this.COMPILER_NAME}Compiler: can not found geometry which vid: ${vid}`);
        return this.getReplaceGeometry();
      }
    } else {
      console.warn(`${this.COMPILER_NAME}Compiler: geometry vid parameter is illegal: ${vid}`);
      return this.getReplaceGeometry();
    }
  }
  getObject(vid) {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid);
      }
    }
    return null;
  }
  setLookAt(vid, target) {
    if (vid === target) {
      console.error(`can not set object lookAt itself.`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.error(`${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`);
      return this;
    }
    const model = this.map.get(vid);
    let cacheData = this.cacheObjectMap.get(model);
    if (!cacheData) {
      cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
      this.cacheObjectMap.set(model, cacheData);
    }
    if (!target) {
      if (!cacheData.updateMatrixWorldFun) {
        return this;
      }
      model.updateMatrixWorld = cacheData.updateMatrixWorldFun;
      cacheData.lookAtTarget = null;
      cacheData.updateMatrixWorldFun = null;
      return this;
    }
    let lookAtTarget = this.getObject(target);
    if (!lookAtTarget) {
      console.warn(`${this.COMPILER_NAME}Compiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    const updateMatrixWorldFun = model.updateMatrixWorld;
    cacheData.updateMatrixWorldFun = updateMatrixWorldFun;
    cacheData.lookAtTarget = lookAtTarget.position;
    model.updateMatrixWorld = (focus) => {
      updateMatrixWorldFun.bind(model)(focus);
      model.lookAt(cacheData.lookAtTarget);
    };
    return this;
  }
  linkGeometryMap(map) {
    this.geometryMap = map;
    return this;
  }
  linkMaterialMap(materialMap) {
    this.materialMap = materialMap;
    return this;
  }
  linkObjectMap(...map) {
    for (let objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
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
  getObjectSymbol(object) {
    if (this.weakMap.has(object)) {
      return this.weakMap.get(object);
    } else {
      return null;
    }
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  remove(vid) {
    if (!this.map.has(vid)) {
      console.warn(`${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`);
      return this;
    }
    const object = this.map.get(vid);
    this.scene.remove(object);
    this.weakMap.delete(object);
    this.cacheObjectMap.delete(this.map.get(vid));
    this.map.delete(vid);
    return this;
  }
  dispose() {
    this.map.clear();
    this.objectMapSet.clear();
    return this;
  }
}
class CameraCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.CAMERA);
    __publicField(this, "engine");
    __publicField(this, "constructMap");
    __publicField(this, "filterAttribute");
    __publicField(this, "cacheCameraMap");
    __publicField(this, "replaceMaterial", new Material());
    __publicField(this, "replaceGeometry", new BufferGeometry());
    if (parameters) {
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.engine = new Engine().install(ENGINEPLUGIN.WEBGLRENDERER);
    }
    const constructMap = new Map();
    constructMap.set("PerspectiveCamera", () => new PerspectiveCamera());
    constructMap.set("OrthographicCamera", () => new OrthographicCamera(0, 0, 0, 0));
    this.constructMap = constructMap;
    this.filterAttribute = {
      scale: true
    };
    this.cacheCameraMap = new WeakMap();
  }
  getReplaceMaterial() {
    console.warn(`CameraCompiler: can not use material in CameraCompiler.`);
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`CameraCompiler: can not use geometry in CameraCompiler.`);
    return this.replaceGeometry;
  }
  setAdaptiveWindow(vid, value) {
    if (!this.map.has(vid)) {
      console.warn(`camera compiler can not found this vid camera: '${vid}'`);
      return this;
    }
    const camera = this.map.get(vid);
    let cacheData = this.cacheCameraMap.get(camera);
    if (!cacheData) {
      cacheData = {};
      this.cacheCameraMap.set(camera, cacheData);
    }
    if (!value) {
      if (cacheData.setSizeFun && this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
        this.engine.removeEventListener("setSize", cacheData.setSizeFun);
        cacheData.setSizeFun = void 0;
        return this;
      }
      if (cacheData.setSizeFun && !this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
        cacheData.setSizeFun = void 0;
        return this;
      }
    }
    if (value) {
      if (cacheData.setSizeFun && this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
        return this;
      }
      if (cacheData.setSizeFun && !this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
        this.engine.addEventListener("setSize", cacheData.setSizeFun);
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
      cacheData.setSizeFun = setSizeFun;
      const domElement = this.engine.webGLRenderer.domElement;
      setSizeFun({
        type: "setSize",
        width: domElement.offsetWidth,
        height: domElement.offsetHeight
      });
    }
    return this;
  }
  add(vid, config) {
    if (config.type && this.constructMap.has(config.type)) {
      const camera = this.constructMap.get(config.type)();
      Compiler.applyConfig(config, camera, Object.assign({
        lookAt: true,
        adaptiveWindow: true
      }, this.filterAttribute));
      if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
        camera.updateProjectionMatrix();
      }
      this.map.set(vid, camera);
      this.weakMap.set(camera, vid);
      this.setLookAt(config.vid, config.lookAt);
      this.setAdaptiveWindow(config.vid, config.adaptiveWindow);
      this.scene.add(camera);
    } else {
      console.warn(`CameraCompiler: can not support this config type: ${config.type}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`);
      return this;
    }
    if (this.filterAttribute[key]) {
      return this;
    }
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "adaptiveWindow") {
      return this.setAdaptiveWindow(vid, value);
    }
    let object = this.map.get(vid);
    for (let key2 of path) {
      if (this.filterAttribute[key2]) {
        return this;
      }
      object = object[key2];
    }
    object[key] = value;
    if (object instanceof PerspectiveCamera || object instanceof OrthographicCamera) {
      object.updateProjectionMatrix();
    }
    return this;
  }
  setEngine(engine) {
    this.engine = engine;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class OrbitControlsProcessor {
  constructor() {
    __publicField(this, "config");
    __publicField(this, "control");
    __publicField(this, "assembly", false);
  }
  assemble(params) {
    this.config = params.config;
    this.control = params.control;
    this.assembly = true;
    return this;
  }
  process(params) {
    if (!this.assembly) {
      console.warn(`OrbitControls Processor unassembled`);
      return this;
    }
    this.merge(params.key, params.value);
    return this;
  }
  processAll() {
    if (!this.assembly) {
      console.warn(`OrbitControls Processor unassembled`);
      return this;
    }
    const control = this.control;
    const config = this.config;
    for (let key of Object.keys(config)) {
      control[key] !== void 0 && (control[key] = config[key]);
    }
    return this;
  }
  dispose() {
    this.config = void 0;
    this.control = void 0;
    this.assembly = false;
    return this;
  }
  merge(key, value) {
    this.control[key] = value;
    return true;
  }
}
class TransformControlsProcessor {
  constructor() {
    __publicField(this, "config");
    __publicField(this, "control");
    __publicField(this, "assembly", false);
    __publicField(this, "filterMap", {
      translationSnap: true,
      rotationSnap: true,
      scaleSnap: true
    });
  }
  assemble(params) {
    this.config = params.config;
    this.control = params.control;
    this.assembly = true;
    return this;
  }
  process(params) {
    if (!this.assembly) {
      console.warn(`transformControls Processor unassembled`);
      return this;
    }
    if (this.filterMap[params.key]) {
      return this;
    }
    if (this[params.key]) {
      this[params.key](params.value);
      return this;
    }
    this.merge(params.key, params.value);
    return this;
  }
  processAll() {
    if (!this.assembly) {
      console.warn(`transformControls Processor unassembled`);
      return this;
    }
    const config = this.config;
    for (let key of Object.keys(config)) {
      this.process({
        path: [],
        key,
        value: config[key]
      });
    }
    return this;
  }
  dispose() {
    this.config = void 0;
    this.control = void 0;
    return this;
  }
  snapAllow(value) {
    const config = this.config;
    const control = this.control;
    if (value) {
      control.translationSnap = config.translationSnap;
      control.rotationSnap = config.rotationSnap;
      control.scaleSnap = config.scaleSnap;
    } else {
      control.translationSnap = null;
      control.rotationSnap = null;
      control.scaleSnap = null;
    }
    return true;
  }
  merge(key, value) {
    this.control[key] = value;
    return true;
  }
}
class ControlsCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "transformControls");
    __publicField(this, "orbitControls");
    __publicField(this, "processorMap", {
      [CONFIGTYPE.TRNASFORMCONTROLS]: new TransformControlsProcessor(),
      [CONFIGTYPE.ORBITCONTROLS]: new OrbitControlsProcessor()
    });
    __publicField(this, "controlMap", {
      [CONFIGTYPE.TRNASFORMCONTROLS]: void 0,
      [CONFIGTYPE.ORBITCONTROLS]: void 0
    });
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.transformControls && (this.controlMap[CONFIGTYPE.TRNASFORMCONTROLS] = parameters.transformControls);
      parameters.orbitControls && (this.controlMap[CONFIGTYPE.ORBITCONTROLS] = parameters.orbitControls);
    } else {
      this.target = {
        [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig(),
        [CONFIGTYPE.ORBITCONTROLS]: getOrbitControlsConfig()
      };
    }
  }
  getAssembly(vid) {
    const config = this.target[vid];
    if (!config) {
      console.warn(`controls compiler can not found this config: '${vid}'`);
      return null;
    }
    const processer = this.processorMap[config.type];
    if (!processer) {
      console.warn(`controls compiler can not support this controls: '${vid}'`);
      return null;
    }
    const control = this.controlMap[config.type];
    if (!control) {
      console.warn(`controls compiler can not found type of control: '${config.type}'`);
      return null;
    }
    return {
      config,
      processer,
      control
    };
  }
  set(vid, path, key, value) {
    const assembly = this.getAssembly(vid);
    if (!assembly) {
      return this;
    }
    assembly.processer.assemble({
      config: assembly.config,
      control: assembly.control
    }).process({
      key,
      path,
      value
    });
    return this;
  }
  setAll(vid) {
    const assembly = this.getAssembly(vid);
    if (!assembly) {
      return this;
    }
    assembly.processer.assemble({
      config: assembly.config,
      control: assembly.control
    }).processAll().dispose();
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    for (let vid of Object.keys(this.target)) {
      const assembly = this.getAssembly(vid);
      if (!assembly) {
        continue;
      }
      assembly.processer.assemble({
        config: assembly.config,
        control: assembly.control
      }).processAll().dispose();
    }
    return this;
  }
  dispose() {
    return this;
  }
}
const openWindow$1 = function(compiler, config) {
  return () => {
    window.open(config.params.url);
  };
};
var BasicEventLbirary = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  openWindow: openWindow$1
});
var Easing = {
  Linear: {
    None: function(amount) {
      return amount;
    }
  },
  Quadratic: {
    In: function(amount) {
      return amount * amount;
    },
    Out: function(amount) {
      return amount * (2 - amount);
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount;
      }
      return -0.5 * (--amount * (amount - 2) - 1);
    }
  },
  Cubic: {
    In: function(amount) {
      return amount * amount * amount;
    },
    Out: function(amount) {
      return --amount * amount * amount + 1;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount + 2);
    }
  },
  Quartic: {
    In: function(amount) {
      return amount * amount * amount * amount;
    },
    Out: function(amount) {
      return 1 - --amount * amount * amount * amount;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount;
      }
      return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
    }
  },
  Quintic: {
    In: function(amount) {
      return amount * amount * amount * amount * amount;
    },
    Out: function(amount) {
      return --amount * amount * amount * amount * amount + 1;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
    }
  },
  Sinusoidal: {
    In: function(amount) {
      return 1 - Math.cos(amount * Math.PI / 2);
    },
    Out: function(amount) {
      return Math.sin(amount * Math.PI / 2);
    },
    InOut: function(amount) {
      return 0.5 * (1 - Math.cos(Math.PI * amount));
    }
  },
  Exponential: {
    In: function(amount) {
      return amount === 0 ? 0 : Math.pow(1024, amount - 1);
    },
    Out: function(amount) {
      return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
    },
    InOut: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      if ((amount *= 2) < 1) {
        return 0.5 * Math.pow(1024, amount - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
    }
  },
  Circular: {
    In: function(amount) {
      return 1 - Math.sqrt(1 - amount * amount);
    },
    Out: function(amount) {
      return Math.sqrt(1 - --amount * amount);
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
    }
  },
  Elastic: {
    In: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
    },
    Out: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      amount *= 2;
      if (amount < 1) {
        return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      }
      return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
    }
  },
  Back: {
    In: function(amount) {
      var s = 1.70158;
      return amount * amount * ((s + 1) * amount - s);
    },
    Out: function(amount) {
      var s = 1.70158;
      return --amount * amount * ((s + 1) * amount + s) + 1;
    },
    InOut: function(amount) {
      var s = 1.70158 * 1.525;
      if ((amount *= 2) < 1) {
        return 0.5 * (amount * amount * ((s + 1) * amount - s));
      }
      return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
    }
  },
  Bounce: {
    In: function(amount) {
      return 1 - Easing.Bounce.Out(1 - amount);
    },
    Out: function(amount) {
      if (amount < 1 / 2.75) {
        return 7.5625 * amount * amount;
      } else if (amount < 2 / 2.75) {
        return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
      } else if (amount < 2.5 / 2.75) {
        return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
      } else {
        return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
      }
    },
    InOut: function(amount) {
      if (amount < 0.5) {
        return Easing.Bounce.In(amount * 2) * 0.5;
      }
      return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
    }
  }
};
var now;
if (typeof self === "undefined" && typeof process !== "undefined" && process.hrtime) {
  now = function() {
    var time = process.hrtime();
    return time[0] * 1e3 + time[1] / 1e6;
  };
} else if (typeof self !== "undefined" && self.performance !== void 0 && self.performance.now !== void 0) {
  now = self.performance.now.bind(self.performance);
} else if (Date.now !== void 0) {
  now = Date.now;
} else {
  now = function() {
    return new Date().getTime();
  };
}
var now$1 = now;
var Group = function() {
  function Group2() {
    this._tweens = {};
    this._tweensAddedDuringUpdate = {};
  }
  Group2.prototype.getAll = function() {
    var _this = this;
    return Object.keys(this._tweens).map(function(tweenId) {
      return _this._tweens[tweenId];
    });
  };
  Group2.prototype.removeAll = function() {
    this._tweens = {};
  };
  Group2.prototype.add = function(tween) {
    this._tweens[tween.getId()] = tween;
    this._tweensAddedDuringUpdate[tween.getId()] = tween;
  };
  Group2.prototype.remove = function(tween) {
    delete this._tweens[tween.getId()];
    delete this._tweensAddedDuringUpdate[tween.getId()];
  };
  Group2.prototype.update = function(time, preserve) {
    if (time === void 0) {
      time = now$1();
    }
    if (preserve === void 0) {
      preserve = false;
    }
    var tweenIds = Object.keys(this._tweens);
    if (tweenIds.length === 0) {
      return false;
    }
    while (tweenIds.length > 0) {
      this._tweensAddedDuringUpdate = {};
      for (var i = 0; i < tweenIds.length; i++) {
        var tween = this._tweens[tweenIds[i]];
        var autoStart = !preserve;
        if (tween && tween.update(time, autoStart) === false && !preserve) {
          delete this._tweens[tweenIds[i]];
        }
      }
      tweenIds = Object.keys(this._tweensAddedDuringUpdate);
    }
    return true;
  };
  return Group2;
}();
var Interpolation = {
  Linear: function(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.Linear;
    if (k < 0) {
      return fn(v[0], v[1], f);
    }
    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }
    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  },
  Bezier: function(v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = Interpolation.Utils.Bernstein;
    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }
    return b;
  },
  CatmullRom: function(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.CatmullRom;
    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }
      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }
      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }
      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  },
  Utils: {
    Linear: function(p0, p1, t) {
      return (p1 - p0) * t + p0;
    },
    Bernstein: function(n, i) {
      var fc = Interpolation.Utils.Factorial;
      return fc(n) / fc(i) / fc(n - i);
    },
    Factorial: function() {
      var a = [1];
      return function(n) {
        var s = 1;
        if (a[n]) {
          return a[n];
        }
        for (var i = n; i > 1; i--) {
          s *= i;
        }
        a[n] = s;
        return s;
      };
    }(),
    CatmullRom: function(p0, p1, p2, p3, t) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }
  }
};
var Sequence = function() {
  function Sequence2() {
  }
  Sequence2.nextId = function() {
    return Sequence2._nextId++;
  };
  Sequence2._nextId = 0;
  return Sequence2;
}();
var mainGroup = new Group();
var Tween = function() {
  function Tween2(_object, _group) {
    if (_group === void 0) {
      _group = mainGroup;
    }
    this._object = _object;
    this._group = _group;
    this._isPaused = false;
    this._pauseStart = 0;
    this._valuesStart = {};
    this._valuesEnd = {};
    this._valuesStartRepeat = {};
    this._duration = 1e3;
    this._initialRepeat = 0;
    this._repeat = 0;
    this._yoyo = false;
    this._isPlaying = false;
    this._reversed = false;
    this._delayTime = 0;
    this._startTime = 0;
    this._easingFunction = Easing.Linear.None;
    this._interpolationFunction = Interpolation.Linear;
    this._chainedTweens = [];
    this._onStartCallbackFired = false;
    this._id = Sequence.nextId();
    this._isChainStopped = false;
    this._goToEnd = false;
  }
  Tween2.prototype.getId = function() {
    return this._id;
  };
  Tween2.prototype.isPlaying = function() {
    return this._isPlaying;
  };
  Tween2.prototype.isPaused = function() {
    return this._isPaused;
  };
  Tween2.prototype.to = function(properties, duration) {
    this._valuesEnd = Object.create(properties);
    if (duration !== void 0) {
      this._duration = duration;
    }
    return this;
  };
  Tween2.prototype.duration = function(d) {
    this._duration = d;
    return this;
  };
  Tween2.prototype.start = function(time) {
    if (this._isPlaying) {
      return this;
    }
    this._group && this._group.add(this);
    this._repeat = this._initialRepeat;
    if (this._reversed) {
      this._reversed = false;
      for (var property in this._valuesStartRepeat) {
        this._swapEndStartRepeatValues(property);
        this._valuesStart[property] = this._valuesStartRepeat[property];
      }
    }
    this._isPlaying = true;
    this._isPaused = false;
    this._onStartCallbackFired = false;
    this._isChainStopped = false;
    this._startTime = time !== void 0 ? typeof time === "string" ? now$1() + parseFloat(time) : time : now$1();
    this._startTime += this._delayTime;
    this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
    return this;
  };
  Tween2.prototype._setupProperties = function(_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
    for (var property in _valuesEnd) {
      var startValue = _object[property];
      var startValueIsArray = Array.isArray(startValue);
      var propType = startValueIsArray ? "array" : typeof startValue;
      var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
      if (propType === "undefined" || propType === "function") {
        continue;
      }
      if (isInterpolationList) {
        var endValues = _valuesEnd[property];
        if (endValues.length === 0) {
          continue;
        }
        endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
        _valuesEnd[property] = [startValue].concat(endValues);
      }
      if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
        _valuesStart[property] = startValueIsArray ? [] : {};
        for (var prop in startValue) {
          _valuesStart[property][prop] = startValue[prop];
        }
        _valuesStartRepeat[property] = startValueIsArray ? [] : {};
        this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
      } else {
        if (typeof _valuesStart[property] === "undefined") {
          _valuesStart[property] = startValue;
        }
        if (!startValueIsArray) {
          _valuesStart[property] *= 1;
        }
        if (isInterpolationList) {
          _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
        } else {
          _valuesStartRepeat[property] = _valuesStart[property] || 0;
        }
      }
    }
  };
  Tween2.prototype.stop = function() {
    if (!this._isChainStopped) {
      this._isChainStopped = true;
      this.stopChainedTweens();
    }
    if (!this._isPlaying) {
      return this;
    }
    this._group && this._group.remove(this);
    this._isPlaying = false;
    this._isPaused = false;
    if (this._onStopCallback) {
      this._onStopCallback(this._object);
    }
    return this;
  };
  Tween2.prototype.end = function() {
    this._goToEnd = true;
    this.update(Infinity);
    return this;
  };
  Tween2.prototype.pause = function(time) {
    if (time === void 0) {
      time = now$1();
    }
    if (this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = true;
    this._pauseStart = time;
    this._group && this._group.remove(this);
    return this;
  };
  Tween2.prototype.resume = function(time) {
    if (time === void 0) {
      time = now$1();
    }
    if (!this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = false;
    this._startTime += time - this._pauseStart;
    this._pauseStart = 0;
    this._group && this._group.add(this);
    return this;
  };
  Tween2.prototype.stopChainedTweens = function() {
    for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
      this._chainedTweens[i].stop();
    }
    return this;
  };
  Tween2.prototype.group = function(group) {
    this._group = group;
    return this;
  };
  Tween2.prototype.delay = function(amount) {
    this._delayTime = amount;
    return this;
  };
  Tween2.prototype.repeat = function(times) {
    this._initialRepeat = times;
    this._repeat = times;
    return this;
  };
  Tween2.prototype.repeatDelay = function(amount) {
    this._repeatDelayTime = amount;
    return this;
  };
  Tween2.prototype.yoyo = function(yoyo) {
    this._yoyo = yoyo;
    return this;
  };
  Tween2.prototype.easing = function(easingFunction) {
    this._easingFunction = easingFunction;
    return this;
  };
  Tween2.prototype.interpolation = function(interpolationFunction) {
    this._interpolationFunction = interpolationFunction;
    return this;
  };
  Tween2.prototype.chain = function() {
    var tweens = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      tweens[_i] = arguments[_i];
    }
    this._chainedTweens = tweens;
    return this;
  };
  Tween2.prototype.onStart = function(callback) {
    this._onStartCallback = callback;
    return this;
  };
  Tween2.prototype.onUpdate = function(callback) {
    this._onUpdateCallback = callback;
    return this;
  };
  Tween2.prototype.onRepeat = function(callback) {
    this._onRepeatCallback = callback;
    return this;
  };
  Tween2.prototype.onComplete = function(callback) {
    this._onCompleteCallback = callback;
    return this;
  };
  Tween2.prototype.onStop = function(callback) {
    this._onStopCallback = callback;
    return this;
  };
  Tween2.prototype.update = function(time, autoStart) {
    if (time === void 0) {
      time = now$1();
    }
    if (autoStart === void 0) {
      autoStart = true;
    }
    if (this._isPaused)
      return true;
    var property;
    var elapsed;
    var endTime = this._startTime + this._duration;
    if (!this._goToEnd && !this._isPlaying) {
      if (time > endTime)
        return false;
      if (autoStart)
        this.start(time);
    }
    this._goToEnd = false;
    if (time < this._startTime) {
      return true;
    }
    if (this._onStartCallbackFired === false) {
      if (this._onStartCallback) {
        this._onStartCallback(this._object);
      }
      this._onStartCallbackFired = true;
    }
    elapsed = (time - this._startTime) / this._duration;
    elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
    var value = this._easingFunction(elapsed);
    this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
    if (this._onUpdateCallback) {
      this._onUpdateCallback(this._object, elapsed);
    }
    if (elapsed === 1) {
      if (this._repeat > 0) {
        if (isFinite(this._repeat)) {
          this._repeat--;
        }
        for (property in this._valuesStartRepeat) {
          if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
          }
          if (this._yoyo) {
            this._swapEndStartRepeatValues(property);
          }
          this._valuesStart[property] = this._valuesStartRepeat[property];
        }
        if (this._yoyo) {
          this._reversed = !this._reversed;
        }
        if (this._repeatDelayTime !== void 0) {
          this._startTime = time + this._repeatDelayTime;
        } else {
          this._startTime = time + this._delayTime;
        }
        if (this._onRepeatCallback) {
          this._onRepeatCallback(this._object);
        }
        return true;
      } else {
        if (this._onCompleteCallback) {
          this._onCompleteCallback(this._object);
        }
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
          this._chainedTweens[i].start(this._startTime + this._duration);
        }
        this._isPlaying = false;
        return false;
      }
    }
    return true;
  };
  Tween2.prototype._updateProperties = function(_object, _valuesStart, _valuesEnd, value) {
    for (var property in _valuesEnd) {
      if (_valuesStart[property] === void 0) {
        continue;
      }
      var start = _valuesStart[property] || 0;
      var end = _valuesEnd[property];
      var startIsArray = Array.isArray(_object[property]);
      var endIsArray = Array.isArray(end);
      var isInterpolationList = !startIsArray && endIsArray;
      if (isInterpolationList) {
        _object[property] = this._interpolationFunction(end, value);
      } else if (typeof end === "object" && end) {
        this._updateProperties(_object[property], start, end, value);
      } else {
        end = this._handleRelativeValue(start, end);
        if (typeof end === "number") {
          _object[property] = start + (end - start) * value;
        }
      }
    }
  };
  Tween2.prototype._handleRelativeValue = function(start, end) {
    if (typeof end !== "string") {
      return end;
    }
    if (end.charAt(0) === "+" || end.charAt(0) === "-") {
      return start + parseFloat(end);
    } else {
      return parseFloat(end);
    }
  };
  Tween2.prototype._swapEndStartRepeatValues = function(property) {
    var tmp = this._valuesStartRepeat[property];
    var endValue = this._valuesEnd[property];
    if (typeof endValue === "string") {
      this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
    } else {
      this._valuesStartRepeat[property] = this._valuesEnd[property];
    }
    this._valuesEnd[property] = tmp;
  };
  return Tween2;
}();
var TWEEN = mainGroup;
TWEEN.getAll.bind(TWEEN);
TWEEN.removeAll.bind(TWEEN);
TWEEN.add.bind(TWEEN);
TWEEN.remove.bind(TWEEN);
TWEEN.update.bind(TWEEN);
const moveTo$1 = function(compiler, config) {
  const params = config.params;
  let object = compiler.getObject(params.target);
  if (!object) {
    console.error(`can not found vid object: ${params.target}`);
    return () => {
    };
  }
  let renderManager = compiler.engine.renderManager;
  const supportData = compiler.engine.dataSupportManager.getObjectConfig(params.target);
  if (!config) {
    console.error(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  return () => {
    const tween = new Tween(object.position).to(params.position).duration(params.duration).delay(params.delay).easing(params.timingFunction).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = params.position.x;
      supportData.position.y = params.position.y;
      supportData.position.z = params.position.z;
    });
  };
};
const moveSpacing$1 = function(compiler, config) {
  const params = config.params;
  let object = compiler.getObject(params.target);
  if (!object) {
    console.error(`can not found vid object: ${params.target}`);
    return () => {
    };
  }
  let renderManager = compiler.engine.renderManager;
  const supportData = compiler.engine.dataSupportManager.getObjectConfig(params.target);
  return () => {
    let position = {
      x: object.position.x + params.spacing.x,
      y: object.position.y + params.spacing.y,
      z: object.position.z + params.spacing.z
    };
    const tween = new Tween(object.position).to(position).duration(params.duration).delay(params.delay).easing(params.timingFunction).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = position.x;
      supportData.position.y = position.y;
      supportData.position.z = position.z;
    });
  };
};
var RealTimeAnimateLibrary = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  moveTo: moveTo$1,
  moveSpacing: moveSpacing$1
});
const _EventCompiler = class extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "engine");
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "funMap");
    __publicField(this, "objectMapSet");
    if (parameters) {
      this.target = parameters.target;
      this.engine = parameters.engine;
    } else {
      this.target = {};
    }
    this.map = new Map();
    this.funMap = new Map();
    this.objectMapSet = new Set();
  }
  getObject(vid) {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid);
      }
    }
    return null;
  }
  getTargetObject(vid) {
    if (!this.map.has(vid)) {
      return null;
    }
    const structure = this.map.get(vid);
    return this.getObject(structure.target);
  }
  linkObjectMap(...map) {
    for (let objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
    }
    return this;
  }
  add(vid, config) {
    const structure = {
      target: config.target,
      [EVENTNAME.POINTERDOWN]: [],
      [EVENTNAME.POINTERUP]: [],
      [EVENTNAME.POINTERMOVE]: [],
      [EVENTNAME.POINTERENTER]: [],
      [EVENTNAME.POINTERLEAVE]: [],
      [EVENTNAME.CLICK]: [],
      [EVENTNAME.DBLCLICK]: [],
      [EVENTNAME.CONTEXTMENU]: []
    };
    this.map.set(vid, structure);
    for (let key in config) {
      let value = config[key];
      if (Array.isArray(value) && isValidEnum(EVENTNAME, key) && value.length) {
        for (let configure2 of value) {
          this.addEvent(vid, key, configure2);
        }
      }
    }
    return this;
  }
  addEvent(vid, eventName, config) {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }
    if (!_EventCompiler.eventLibrary[config.name]) {
      console.warn(`EventCompiler: can not support this event: ${config.name}`);
      return this;
    }
    const targetObject = this.getTargetObject(vid);
    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }
    const fun = _EventCompiler.eventLibrary[config.name](this, config);
    const funSymbol = v4();
    this.funMap.set(funSymbol, fun);
    const structure = this.map.get(vid);
    structure[eventName].push(funSymbol);
    targetObject.addEventListener(eventName, fun);
    return this;
  }
  removeEvent(vid, eventName, index) {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }
    const targetObject = this.getTargetObject(vid);
    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }
    const structure = this.map.get(vid);
    const funSymbol = structure[eventName][index];
    const fun = this.funMap.get(funSymbol);
    if (!fun) {
      console.warn(`EventCompiler: No matching fun found: ${vid}, ${eventName}, ${index}`);
      return this;
    }
    targetObject.removeEventListener(eventName, fun);
    this.funMap.delete(funSymbol);
    structure[eventName].splice(index, 1);
    return this;
  }
  updateEvent(vid, eventName, index) {
    this.removeEvent(vid, eventName, index);
    const config = this.target[vid][eventName][index];
    this.addEvent(vid, eventName, config);
  }
  remove(vid) {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }
    const targetObject = this.getTargetObject(vid);
    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }
    const structure = this.map.get(vid);
    for (let key in structure) {
      let funSymbolList = structure[key];
      if (Array.isArray(funSymbolList) && isValidEnum(EVENTNAME, key) && funSymbolList.length) {
        for (let funSymbol of funSymbolList) {
          this.removeEvent(vid, key, funSymbol);
        }
      }
    }
    this.map.delete(vid);
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
    this.map.clear();
    this.funMap.clear();
    this.objectMapSet.clear();
    return this;
  }
};
let EventCompiler = _EventCompiler;
__publicField(EventCompiler, "eventLibrary", {});
__publicField(EventCompiler, "registerEvent", function(map) {
  _EventCompiler.eventLibrary = Object.assign(_EventCompiler.eventLibrary, map);
});
EventCompiler.registerEvent(BasicEventLbirary);
EventCompiler.registerEvent(RealTimeAnimateLibrary);
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
    constructMap.set(CONFIGTYPE.BOXGEOMETRY, (config) => {
      return _GeometryCompiler.transfromAnchor(new BoxBufferGeometry(config.width, config.height, config.depth, config.widthSegments, config.heightSegments, config.depthSegments), config);
    });
    constructMap.set(CONFIGTYPE.SPHEREGEOMETRY, (config) => {
      return _GeometryCompiler.transfromAnchor(new SphereBufferGeometry(config.radius, config.widthSegments, config.heightSegments, config.phiStart, config.phiLength, config.thetaStart, config.thetaLength), config);
    });
    constructMap.set(CONFIGTYPE.PLANEGEOMETRY, (config) => {
      return _GeometryCompiler.transfromAnchor(new PlaneBufferGeometry(config.width, config.height, config.widthSegments, config.heightSegments), config);
    });
    constructMap.set(CONFIGTYPE.LOADGEOMETRY, (config) => {
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
    if (config.type && this.constructMap.has(config.type)) {
      const geometry = this.constructMap.get(config.type)(config);
      this.map.set(vid, geometry);
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
  remove(vid) {
    if (!this.map.has(vid)) {
      console.warn(`Geometry Compiler: can not found vid in compiler: ${vid}`);
      return this;
    }
    const geometry = this.map.get(vid);
    geometry.dispose();
    this.map.delete(vid);
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
    this.map.forEach((geometry, vid) => {
      geometry.dispose();
    });
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
class GroupCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.GROUP);
    __publicField(this, "replaceMaterial", new Material());
    __publicField(this, "replaceGeometry", new BufferGeometry());
    __publicField(this, "filterAttribute");
    this.filterAttribute = {
      lookAt: true,
      children: true
    };
  }
  getReplaceMaterial() {
    console.warn(`GroupCompiler: can not use material in GroupCompiler.`);
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`GroupCompiler: can not use geometry in GroupCompiler.`);
    return this.replaceGeometry;
  }
  add(vid, config) {
    const group = new Group$1();
    Compiler.applyConfig(config, group, this.filterAttribute);
    this.map.set(vid, group);
    this.weakMap.set(group, vid);
    this.scene.add(group);
    for (let target of config.children) {
      this.addChildren(vid, target);
    }
    this.setLookAt(vid, config.lookAt);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`GroupCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    if (key === "lookAt") {
      this.setLookAt(vid, value);
      return this;
    }
    let object = this.map.get(vid);
    for (let key2 of path) {
      if (this.filterAttribute[key2]) {
        return this;
      }
      object = object[key2];
    }
    object[key] = value;
    return this;
  }
  addChildren(vid, target) {
    if (!this.map.has(vid)) {
      console.warn(`GroupCompiler: can not found this vid in compiler: ${vid}.`);
      return this;
    }
    const group = this.map.get(vid);
    const targetObject = this.getObject(target);
    if (!targetObject) {
      console.warn(`GroupCompiler: can not found this vid in compiler: ${target}.`);
      return this;
    }
    group.attach(targetObject);
    return this;
  }
  removeChildren(vid, target) {
    if (!this.map.has(vid)) {
      console.warn(`GroupCompiler: can not found this vid in compiler: ${vid}.`);
      return this;
    }
    const group = this.map.get(vid);
    const targetObject = this.getObject(target);
    if (!targetObject) {
      console.warn(`GroupCompiler: can not found this vid in compiler: ${target}.`);
      return this;
    }
    group.remove(targetObject);
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class LightCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.LIGHT);
    __publicField(this, "constructMap");
    __publicField(this, "filterAttribute");
    __publicField(this, "replaceMaterial", new Material());
    __publicField(this, "replaceGeometry", new BufferGeometry());
    this.constructMap = new Map();
    this.constructMap.set(CONFIGTYPE.POINTLIGHT, () => new PointLight());
    this.constructMap.set(CONFIGTYPE.SPOTLIGHT, () => new SpotLight());
    this.constructMap.set(CONFIGTYPE.AMBIENTLIGHT, () => new AmbientLight());
    this.constructMap.set(CONFIGTYPE.DIRECTIONALLIGHT, () => new DirectionalLight());
    this.setLookAt = function(vid, target) {
      return this;
    };
    this.filterAttribute = {
      scale: true,
      rotation: true,
      lookAt: true
    };
  }
  getReplaceMaterial() {
    console.warn(`LightCompiler: can not use material in LightCompiler.`);
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`LightCompiler: can not use geometry in LightCompiler.`);
    return this.replaceGeometry;
  }
  add(vid, config) {
    if (config.type && this.constructMap.has(config.type)) {
      const light = this.constructMap.get(config.type)();
      Compiler.applyConfig(config, light, this.filterAttribute);
      light.color = new Color(config.color);
      this.map.set(vid, light);
      this.weakMap.set(light, vid);
      this.scene.add(light);
    } else {
      console.warn(`LightCompiler: can not support Light type: ${config.type}.`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`LightCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    if (this.filterAttribute[key]) {
      return this;
    }
    let object = this.map.get(vid);
    if (key === "color") {
      object.color = new Color(value);
      return this;
    }
    for (let key2 of path) {
      if (this.filterAttribute[key2]) {
        return this;
      }
      object = object[key2];
    }
    object[key] = value;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class LineCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.LINE);
    __publicField(this, "replaceMaterial", new LineBasicMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new BoxBufferGeometry(10, 10, 10));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config) {
    const object = new Line(this.getGeometry(config.geometry), this.getMaterial(config.material));
    Compiler.applyConfig(config, object, {
      geometry: true,
      material: true,
      lookAt: true
    });
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    this.setLookAt(vid, config.lookAt);
    this.scene.add(object);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`model compiler can not found this vid mapping object: '${vid}'`);
      return this;
    }
    let mesh = this.map.get(vid);
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "material") {
      mesh.material = this.getMaterial(value);
      return this;
    }
    for (let key2 of path) {
      mesh = mesh[key2];
    }
    mesh[key] = value;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
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
    constructMap.set(CONFIGTYPE.MESHSTANDARDMATERIAL, () => new MeshStandardMaterial());
    constructMap.set(CONFIGTYPE.MESHPHONGMATERIAL, () => new MeshPhongMaterial());
    constructMap.set(CONFIGTYPE.SPRITEMATERIAL, () => new SpriteMaterial());
    constructMap.set(CONFIGTYPE.LINEBASICMATERIAL, () => new LineBasicMaterial());
    constructMap.set(CONFIGTYPE.POINTSMATERIAL, () => new PointsMaterial());
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
      "aoMap": true,
      "specularMap": true
    };
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
        const filterMap = {};
        const colorAttribute = this.colorAttribute;
        for (const key in colorAttribute) {
          if (tempConfig[key]) {
            material[key] = new Color(tempConfig[key]);
            filterMap[key] = true;
          }
        }
        const mapAttribute = this.mapAttribute;
        for (const key in mapAttribute) {
          if (tempConfig[key]) {
            material[key] = this.getTexture(tempConfig[key]);
            filterMap[key] = true;
          }
        }
        Compiler.applyConfig(config, material, filterMap);
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
    this.map.forEach((material, vid) => {
      material.dispose();
    });
    return this;
  }
}
class MeshCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.MESH);
    __publicField(this, "replaceMaterial", new MeshBasicMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new BoxBufferGeometry(10, 10, 10));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config) {
    const object = new Mesh(this.getGeometry(config.geometry), this.getMaterial(config.material));
    Compiler.applyConfig(config, object, {
      geometry: true,
      material: true,
      lookAt: true
    });
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    this.setLookAt(vid, config.lookAt);
    this.scene.add(object);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`model compiler can not found this vid mapping object: '${vid}'`);
      return this;
    }
    let mesh = this.map.get(vid);
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "material") {
      mesh.material = this.getMaterial(value);
      return this;
    }
    for (let key2 of path) {
      mesh = mesh[key2];
    }
    mesh[key] = value;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class PointsCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.POINTS);
    __publicField(this, "replaceMaterial", new PointsMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new DodecahedronBufferGeometry(5));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config) {
    const object = new Points(this.getGeometry(config.geometry), this.getMaterial(config.material));
    Compiler.applyConfig(config, object, {
      geometry: true,
      material: true,
      lookAt: true
    });
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    this.setLookAt(vid, config.lookAt);
    this.scene.add(object);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`PointsCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    let mesh = this.map.get(vid);
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "material") {
      mesh.material = this.getMaterial(value);
      return this;
    }
    for (let key2 of path) {
      mesh = mesh[key2];
    }
    mesh[key] = value;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class WebGLRendererCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "renderer");
    __publicField(this, "engine");
    __publicField(this, "target");
    __publicField(this, "rendererCacheData");
    this.engine = parameters.engine;
    this.target = parameters.target;
    this.renderer = this.engine.webGLRenderer;
    this.rendererCacheData = {};
  }
  setClearColor(value) {
    const alpha = Number(value.slice(0, -1).split(",").pop().trim());
    this.renderer.setClearColor(value, alpha);
    this.renderer.clear();
    return this;
  }
  setPixelRatio(value) {
    this.renderer.setPixelRatio(value);
    this.renderer.clear();
    return this;
  }
  setSize(vector2) {
    const renderer = this.renderer;
    if (vector2) {
      renderer.setSize(vector2.x, vector2.y);
    } else {
      const domElement = renderer.domElement;
      renderer.setSize(domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setViewpoint(config) {
    const renderer = this.renderer;
    if (config) {
      renderer.setViewport(config.x, config.y, config.width, config.height);
    } else {
      const domElement = renderer.domElement;
      renderer.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setScissor(config) {
    const renderer = this.renderer;
    if (config) {
      renderer.setScissorTest(true);
      renderer.setScissor(config.x, config.y, config.width, config.height);
    } else {
      renderer.setScissorTest(false);
      const domElement = renderer.domElement;
      renderer.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setAdaptiveCamera(value) {
    if (!this.engine) {
      console.warn(`renderer compiler is not set engine.`);
      return this;
    }
    const renderer = this.renderer;
    const engine = this.engine;
    const renderManager = engine.renderManager;
    if (!value) {
      if (!this.rendererCacheData.adaptiveCameraFun) {
        return this;
      }
      if (this.rendererCacheData.adaptiveCameraFun) {
        renderManager.removeEventListener("render", this.rendererCacheData.adaptiveCameraFun);
        this.rendererCacheData.adaptiveCameraFun = void 0;
        return this;
      }
    }
    if (value) {
      if (this.rendererCacheData.adaptiveCameraFun) {
        renderManager.addEventListener("render", this.rendererCacheData.adaptiveCameraFun);
        return this;
      }
      const adaptiveCameraFun = (event) => {
        const camera = engine.currentCamera;
        const domWidth = renderer.domElement.offsetWidth;
        const domHeight = renderer.domElement.offsetHeight;
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
        renderer.setScissor(offsetX, offsetY, width, height);
        renderer.setViewport(offsetX, offsetY, width, height);
        renderer.setScissorTest(true);
      };
      this.rendererCacheData.adaptiveCameraFun = adaptiveCameraFun;
      renderManager.addEventListener("render", this.rendererCacheData.adaptiveCameraFun);
    }
    return this;
  }
  set(path, key, value) {
    const actionMap = {
      clearColor: () => this.setClearColor(value),
      pixelRatio: () => this.setPixelRatio(value),
      size: () => this.setSize(this.target.size),
      viewport: () => this.setViewpoint(this.target.viewport),
      scissor: () => this.setScissor(this.target.scissor),
      adaptiveCamera: () => this.setAdaptiveCamera(value)
    };
    if (actionMap[path[0] || key]) {
      actionMap[path[0] || key]();
      return this;
    }
    let config = this.renderer;
    path.forEach((key2, i, arr) => {
      config = config[key2];
    });
    config[key] = value;
    this.renderer.clear();
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    this.setClearColor(target.clearColor);
    this.setPixelRatio(target.pixelRatio);
    this.setSize(target.size);
    this.setViewpoint(target.viewport);
    this.setScissor(target.scissor);
    this.setAdaptiveCamera(target.adaptiveCamera);
    const otherConfig = JSON.parse(JSON.stringify(target));
    delete otherConfig.vid;
    delete otherConfig.type;
    delete otherConfig.clearColor;
    delete otherConfig.pixelRatio;
    delete otherConfig.size;
    delete otherConfig.viewport;
    delete otherConfig.scissor;
    delete otherConfig.adaptiveCamera;
    Compiler.applyConfig(otherConfig, this.renderer);
    this.renderer.clear();
    return this;
  }
  dispose() {
    this.renderer.dispose();
    return this;
  }
}
class RendererCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "engine");
    __publicField(this, "map");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.target = {};
      this.engine = new Engine();
    }
    this.map = {};
  }
  add(type, config) {
    if (type === "WebGLRenderer") {
      const rendererCompiler = new WebGLRendererCompiler({
        engine: this.engine,
        target: config
      });
      rendererCompiler.compileAll();
      this.map[type] = rendererCompiler;
    }
  }
  set(path, key, value) {
    const rendererType = path.shift();
    if (!rendererType) {
      this.map[key].setTarget(value).compileAll();
      return this;
    }
    if (this.map[rendererType]) {
      this.map[rendererType].set(path, key, value);
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
    Object.keys(target).forEach((type) => {
      this.add(type, target[type]);
    });
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
        [CONFIGTYPE.SCENE]: getSceneConfig()
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
    if (config.type === "") {
      this.fogCache = null;
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
      return;
    }
    if (config.type === "FogExp2") {
      if (this.fogCache instanceof FogExp2) {
        const fog = this.fogCache;
        fog.color = new Color(config.color);
        fog.density = config.density;
      } else {
        this.scene.fog = new FogExp2(config.color, config.density);
        this.fogCache = this.scene.fog;
      }
      return;
    }
    console.warn(`scene compiler can not support this type fog:'${config.type}'`);
  }
  linkTextureMap(map) {
    this.textureMap = map;
    return this;
  }
  set(path, key, value) {
    const sceneType = path.shift();
    if (sceneType === CONFIGTYPE.SCENE) {
      const actionMap = {
        background: () => this.background(value),
        environment: () => this.environment(value),
        fog: () => this.fog(this.target[CONFIGTYPE.SCENE].fog)
      };
      if (path.length) {
        key = path.pop();
      }
      actionMap[key] && actionMap[key]();
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
    const sceneTarget = this.target[CONFIGTYPE.SCENE];
    this.background(sceneTarget.background);
    this.environment(sceneTarget.environment);
    this.fog(sceneTarget.fog);
    return this;
  }
  dispose() {
    return this;
  }
}
class SpriteCompiler extends ObjectCompiler {
  constructor(parametes) {
    super(parametes);
    __publicField(this, "COMPILER_NAME", MODULETYPE.SPRITE);
    __publicField(this, "replaceMaterial", new SpriteMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new PlaneBufferGeometry(10, 10, 10));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`SpriteCompiler: can not use geometry in SpriteCompiler.`);
    return this.replaceGeometry;
  }
  getSpriteMaterial(vid) {
    const tempMaterial = this.getMaterial(vid);
    if (tempMaterial instanceof SpriteMaterial) {
      return tempMaterial;
    } else {
      console.warn(`SpriteCompiler: sprite object can not support this type material: ${tempMaterial.type}, vid: ${vid}.`);
      return this.getReplaceMaterial();
    }
  }
  add(vid, config) {
    const sprite = new Sprite();
    this.map.set(vid, sprite);
    this.weakMap.set(sprite, vid);
    sprite.material = this.getSpriteMaterial(config.material);
    sprite.center.set(config.center.x, config.center.y);
    Compiler.applyConfig(config, sprite, {
      center: true,
      material: true
    });
    this.scene.add(sprite);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`SpriteCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    let sprite = this.map.get(vid);
    if (key === "material") {
      sprite.material = this.getSpriteMaterial(value);
      return this;
    }
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    for (let key2 of path) {
      sprite = sprite[key2];
    }
    sprite[key] = value;
    return this;
  }
  dispose() {
    this.map.forEach((sprite, vid) => {
      sprite.geometry.dispose();
    });
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class ImageTexture extends Texture {
  constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    super(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
  }
}
class VideoTexture extends Texture {
  constructor(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
    __publicField(this, "isVideoTexture", true);
    this.format = format !== void 0 ? format : RGBFormat;
    this.minFilter = minFilter !== void 0 ? minFilter : LinearFilter;
    this.magFilter = magFilter !== void 0 ? magFilter : LinearFilter;
    this.generateMipmaps = false;
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const video = this.image;
    const hasVideoFrameCallback = "requestVideoFrameCallback" in video;
    if (hasVideoFrameCallback) {
      this.needsUpdate = true;
    } else if (hasVideoFrameCallback === false && video.readyState >= video.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
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
    constructMap.set(CONFIGTYPE.IMAGETEXTURE, () => new ImageTexture());
    constructMap.set(CONFIGTYPE.CUBETEXTURE, () => new CubeTexture());
    constructMap.set(CONFIGTYPE.CANVASTEXTURE, () => new CanvasTexture(document.createElement("canvas")));
    constructMap.set(CONFIGTYPE.VIDEOTEXTURE, () => new VideoTexture(document.createElement("video")));
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
        if ([CONFIGTYPE.IMAGETEXTURE, CONFIGTYPE.CANVASTEXTURE, CONFIGTYPE.VIDEOTEXTURE].includes(config.type)) {
          texture.image = this.getResource(tempConfig.url);
          delete tempConfig.url;
        } else if (config.type === CONFIGTYPE.CUBETEXTURE) {
          const cube = config.cube;
          const images = [
            this.getResource(cube.px),
            this.getResource(cube.nx),
            this.getResource(cube.py),
            this.getResource(cube.ny),
            this.getResource(cube.pz),
            this.getResource(cube.nz)
          ];
          texture.image = images;
          delete tempConfig.cube;
        }
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
    if (key === "needsUpdate") {
      if (value) {
        texture.needsUpdate = true;
        const config2 = this.target[vid];
        config2.needsUpdate = false;
      }
      return this;
    }
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
class CompilerManager {
  constructor(parameters) {
    __publicField(this, "cameraCompiler");
    __publicField(this, "lightCompiler");
    __publicField(this, "geometryCompiler");
    __publicField(this, "textureCompiler");
    __publicField(this, "materialCompiler");
    __publicField(this, "rendererCompiler");
    __publicField(this, "sceneCompiler");
    __publicField(this, "controlsCompiler");
    __publicField(this, "spriteCompiler");
    __publicField(this, "eventCompiler");
    __publicField(this, "lineCompiler");
    __publicField(this, "meshCompiler");
    __publicField(this, "pointsCompiler");
    __publicField(this, "groupCompiler");
    __publicField(this, "objectCompilerList");
    this.objectCompilerList = [];
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        this[key] = parameters[key];
        parameters[key].IS_OBJECTCOMPILER && this.objectCompilerList.push(parameters[key]);
      });
    }
  }
  support(engine) {
    const dataSupportManager = engine.dataSupportManager;
    const textureDataSupport = dataSupportManager.textureDataSupport;
    const materialDataSupport = dataSupportManager.materialDataSupport;
    const cameraDataSupport = dataSupportManager.cameraDataSupport;
    const lightDataSupport = dataSupportManager.lightDataSupport;
    const geometryDataSupport = dataSupportManager.geometryDataSupport;
    const rendererDataSupport = dataSupportManager.rendererDataSupport;
    const sceneDataSupport = dataSupportManager.sceneDataSupport;
    const controlsDataSupport = dataSupportManager.controlsDataSupport;
    const spriteDataSupport = dataSupportManager.spriteDataSupport;
    const eventDataSupport = dataSupportManager.eventDataSupport;
    const lineDataSupport = dataSupportManager.lineDataSupport;
    const meshDataSupport = dataSupportManager.meshDataSupport;
    const pointsDataSupport = dataSupportManager.pointsDataSupport;
    const groupDataSupport = dataSupportManager.groupDataSupport;
    const textureCompiler = new TextureCompiler({
      target: textureDataSupport.getData()
    });
    this.textureCompiler = textureCompiler;
    const materialCompiler = new MaterialCompiler({
      target: materialDataSupport.getData()
    });
    this.materialCompiler = materialCompiler;
    const geometryCompiler = new GeometryCompiler({
      target: geometryDataSupport.getData()
    });
    this.geometryCompiler = geometryCompiler;
    const cameraCompiler = new CameraCompiler({
      target: cameraDataSupport.getData(),
      scene: engine.scene,
      engine
    });
    this.cameraCompiler = cameraCompiler;
    this.objectCompilerList.push(cameraCompiler);
    const lightCompiler = new LightCompiler({
      scene: engine.scene,
      target: lightDataSupport.getData()
    });
    this.lightCompiler = lightCompiler;
    this.objectCompilerList.push(lightCompiler);
    const spriteCompiler = new SpriteCompiler({
      target: spriteDataSupport.getData(),
      scene: engine.scene
    });
    this.spriteCompiler = spriteCompiler;
    this.objectCompilerList.push(spriteCompiler);
    const lineCompiler = new LineCompiler({
      target: lineDataSupport.getData(),
      scene: engine.scene
    });
    this.lineCompiler = lineCompiler;
    this.objectCompilerList.push(lineCompiler);
    const meshCompiler = new MeshCompiler({
      target: meshDataSupport.getData(),
      scene: engine.scene
    });
    this.meshCompiler = meshCompiler;
    this.objectCompilerList.push(meshCompiler);
    const pointsCompiler = new PointsCompiler({
      target: pointsDataSupport.getData(),
      scene: engine.scene
    });
    this.pointsCompiler = pointsCompiler;
    this.objectCompilerList.push(pointsCompiler);
    const groupCompiler = new GroupCompiler({
      target: groupDataSupport.getData(),
      scene: engine.scene
    });
    this.groupCompiler = groupCompiler;
    this.objectCompilerList.push(groupCompiler);
    const rendererCompiler = new RendererCompiler({
      target: rendererDataSupport.getData(),
      engine
    });
    this.rendererCompiler = rendererCompiler;
    const sceneCompiler = new SceneCompiler({
      target: sceneDataSupport.getData(),
      scene: engine.scene
    });
    this.sceneCompiler = sceneCompiler;
    const controlsCompiler = new ControlsCompiler({
      target: controlsDataSupport.getData(),
      transformControls: engine.transformControls,
      orbitControls: engine.orbitControls
    });
    this.controlsCompiler = controlsCompiler;
    const eventCompiler = new EventCompiler({
      target: eventDataSupport.getData(),
      engine
    });
    this.eventCompiler = eventCompiler;
    const resourceManager = engine.resourceManager;
    sceneCompiler.linkTextureMap(textureCompiler.getMap());
    materialCompiler.linkTextureMap(textureCompiler.getMap());
    const objectMapList = this.objectCompilerList.map((elem) => elem.getMap());
    for (let objectCompiler of this.objectCompilerList) {
      objectCompiler.linkGeometryMap(geometryCompiler.getMap()).linkMaterialMap(materialCompiler.getMap()).linkObjectMap(...objectMapList);
    }
    eventCompiler.linkObjectMap(...objectMapList);
    textureCompiler.linkRescourceMap(resourceManager.resourceMap);
    geometryCompiler.linkRescourceMap(resourceManager.resourceMap);
    textureDataSupport.addCompiler(textureCompiler);
    materialDataSupport.addCompiler(materialCompiler);
    cameraDataSupport.addCompiler(cameraCompiler);
    lightDataSupport.addCompiler(lightCompiler);
    geometryDataSupport.addCompiler(geometryCompiler);
    rendererDataSupport.addCompiler(rendererCompiler);
    sceneDataSupport.addCompiler(sceneCompiler);
    controlsDataSupport.addCompiler(controlsCompiler);
    spriteDataSupport.addCompiler(spriteCompiler);
    lineDataSupport.addCompiler(lineCompiler);
    meshDataSupport.addCompiler(meshCompiler);
    pointsDataSupport.addCompiler(pointsCompiler);
    groupDataSupport.addCompiler(groupCompiler);
    eventDataSupport.addCompiler(eventCompiler);
    return this;
  }
  getObjectSymbol(object) {
    const objectCompilerList = this.objectCompilerList;
    for (let compiler of objectCompilerList) {
      const vid = compiler.getObjectSymbol(object);
      if (vid) {
        return vid;
      }
    }
    return null;
  }
  getObjectBySymbol(vid) {
    const objectCompilerList = this.objectCompilerList;
    for (let compiler of objectCompilerList) {
      const object = compiler.getMap().get(vid);
      if (object) {
        return object;
      }
    }
    return null;
  }
  getMaterial(vid) {
    if (!validate(vid)) {
      console.warn(`compiler manager vid is illeage: ${vid}`);
      return void 0;
    }
    const materialCompiler = this.materialCompiler;
    return materialCompiler.getMap().get(vid);
  }
  getTexture(vid) {
    if (!validate(vid)) {
      console.warn(`compiler manager vid is illeage: ${vid}`);
      return void 0;
    }
    const textureCompiler = this.textureCompiler;
    return textureCompiler.getMap().get(vid);
  }
  getObjectCompilerList() {
    return this.objectCompilerList;
  }
  dispose() {
    Object.keys(this).forEach((key) => {
      if (this[key] instanceof Compiler) {
        this[key].dispose();
      }
    });
    this.objectCompilerList = [];
    return this;
  }
}
const CompilerManagerPlugin = function(params) {
  if (this.compilerManager) {
    console.warn("engine has installed compilerManager plugin.");
    return false;
  }
  const compilerManager = new CompilerManager();
  this.compilerManager = compilerManager;
  this.addEventListener("dispose", () => {
    this.compilerManager.dispose();
  });
  this.completeSet.add(() => {
    if (!this.webGLRenderer) {
      console.warn(`must install webGLRenderer before compilerManager plugin.`);
      return;
    }
    if (!this.scene) {
      console.warn(`must install scene before compilerManager plugin.`);
      return;
    }
    if (!this.renderManager) {
      console.warn(`must install renderManager before compilerManager plugin.`);
      return;
    }
    if (!this.dataSupportManager) {
      console.warn("must install dataSupportManager before compilerManager plugin.");
      return;
    }
    this.compilerManager.support(this);
  });
  return true;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var keyboard = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
        return Array.from(iter);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var KeyCombo = /* @__PURE__ */ function() {
      function KeyCombo2(keyComboStr) {
        _classCallCheck(this, KeyCombo2);
        this.sourceStr = keyComboStr;
        this.subCombos = KeyCombo2.parseComboStr(keyComboStr);
        this.keyNames = this.subCombos.reduce(function(memo, nextSubCombo) {
          return memo.concat(nextSubCombo);
        }, []);
      }
      _createClass(KeyCombo2, [{
        key: "check",
        value: function check(pressedKeyNames) {
          var startingKeyNameIndex = 0;
          for (var i = 0; i < this.subCombos.length; i += 1) {
            startingKeyNameIndex = this._checkSubCombo(this.subCombos[i], startingKeyNameIndex, pressedKeyNames);
            if (startingKeyNameIndex === -1) {
              return false;
            }
          }
          return true;
        }
      }, {
        key: "isEqual",
        value: function isEqual(otherKeyCombo) {
          if (!otherKeyCombo || typeof otherKeyCombo !== "string" && _typeof(otherKeyCombo) !== "object") {
            return false;
          }
          if (typeof otherKeyCombo === "string") {
            otherKeyCombo = new KeyCombo2(otherKeyCombo);
          }
          if (this.subCombos.length !== otherKeyCombo.subCombos.length) {
            return false;
          }
          for (var i = 0; i < this.subCombos.length; i += 1) {
            if (this.subCombos[i].length !== otherKeyCombo.subCombos[i].length) {
              return false;
            }
          }
          for (var _i = 0; _i < this.subCombos.length; _i += 1) {
            var subCombo = this.subCombos[_i];
            var otherSubCombo = otherKeyCombo.subCombos[_i].slice(0);
            for (var j = 0; j < subCombo.length; j += 1) {
              var keyName = subCombo[j];
              var index = otherSubCombo.indexOf(keyName);
              if (index > -1) {
                otherSubCombo.splice(index, 1);
              }
            }
            if (otherSubCombo.length !== 0) {
              return false;
            }
          }
          return true;
        }
      }, {
        key: "_checkSubCombo",
        value: function _checkSubCombo(subCombo, startingKeyNameIndex, pressedKeyNames) {
          subCombo = subCombo.slice(0);
          pressedKeyNames = pressedKeyNames.slice(startingKeyNameIndex);
          var endIndex = startingKeyNameIndex;
          for (var i = 0; i < subCombo.length; i += 1) {
            var keyName = subCombo[i];
            if (keyName[0] === "\\") {
              var escapedKeyName = keyName.slice(1);
              if (escapedKeyName === KeyCombo2.comboDeliminator || escapedKeyName === KeyCombo2.keyDeliminator) {
                keyName = escapedKeyName;
              }
            }
            var index = pressedKeyNames.indexOf(keyName);
            if (index > -1) {
              subCombo.splice(i, 1);
              i -= 1;
              if (index > endIndex) {
                endIndex = index;
              }
              if (subCombo.length === 0) {
                return endIndex;
              }
            }
          }
          return -1;
        }
      }]);
      return KeyCombo2;
    }();
    KeyCombo.comboDeliminator = ">";
    KeyCombo.keyDeliminator = "+";
    KeyCombo.parseComboStr = function(keyComboStr) {
      var subComboStrs = KeyCombo._splitStr(keyComboStr, KeyCombo.comboDeliminator);
      var combo = [];
      for (var i = 0; i < subComboStrs.length; i += 1) {
        combo.push(KeyCombo._splitStr(subComboStrs[i], KeyCombo.keyDeliminator));
      }
      return combo;
    };
    KeyCombo._splitStr = function(str, deliminator) {
      var s = str;
      var d = deliminator;
      var c = "";
      var ca = [];
      for (var ci = 0; ci < s.length; ci += 1) {
        if (ci > 0 && s[ci] === d && s[ci - 1] !== "\\") {
          ca.push(c.trim());
          c = "";
          ci += 1;
        }
        c += s[ci];
      }
      if (c) {
        ca.push(c.trim());
      }
      return ca;
    };
    var Locale = /* @__PURE__ */ function() {
      function Locale2(name) {
        _classCallCheck(this, Locale2);
        this.localeName = name;
        this.activeTargetKeys = [];
        this.pressedKeys = [];
        this._appliedMacros = [];
        this._keyMap = {};
        this._killKeyCodes = [];
        this._macros = [];
      }
      _createClass(Locale2, [{
        key: "bindKeyCode",
        value: function bindKeyCode(keyCode, keyNames) {
          if (typeof keyNames === "string") {
            keyNames = [keyNames];
          }
          this._keyMap[keyCode] = keyNames;
        }
      }, {
        key: "bindMacro",
        value: function bindMacro(keyComboStr, keyNames) {
          if (typeof keyNames === "string") {
            keyNames = [keyNames];
          }
          var handler = null;
          if (typeof keyNames === "function") {
            handler = keyNames;
            keyNames = null;
          }
          var macro = {
            keyCombo: new KeyCombo(keyComboStr),
            keyNames,
            handler
          };
          this._macros.push(macro);
        }
      }, {
        key: "getKeyCodes",
        value: function getKeyCodes(keyName) {
          var keyCodes = [];
          for (var keyCode in this._keyMap) {
            var index = this._keyMap[keyCode].indexOf(keyName);
            if (index > -1) {
              keyCodes.push(keyCode | 0);
            }
          }
          return keyCodes;
        }
      }, {
        key: "getKeyNames",
        value: function getKeyNames(keyCode) {
          return this._keyMap[keyCode] || [];
        }
      }, {
        key: "setKillKey",
        value: function setKillKey(keyCode) {
          if (typeof keyCode === "string") {
            var keyCodes = this.getKeyCodes(keyCode);
            for (var i = 0; i < keyCodes.length; i += 1) {
              this.setKillKey(keyCodes[i]);
            }
            return;
          }
          this._killKeyCodes.push(keyCode);
        }
      }, {
        key: "pressKey",
        value: function pressKey(keyCode) {
          if (typeof keyCode === "string") {
            var keyCodes = this.getKeyCodes(keyCode);
            for (var i = 0; i < keyCodes.length; i += 1) {
              this.pressKey(keyCodes[i]);
            }
            return;
          }
          this.activeTargetKeys.length = 0;
          var keyNames = this.getKeyNames(keyCode);
          for (var _i = 0; _i < keyNames.length; _i += 1) {
            this.activeTargetKeys.push(keyNames[_i]);
            if (this.pressedKeys.indexOf(keyNames[_i]) === -1) {
              this.pressedKeys.push(keyNames[_i]);
            }
          }
          this._applyMacros();
        }
      }, {
        key: "releaseKey",
        value: function releaseKey(keyCode) {
          if (typeof keyCode === "string") {
            var keyCodes = this.getKeyCodes(keyCode);
            for (var i = 0; i < keyCodes.length; i += 1) {
              this.releaseKey(keyCodes[i]);
            }
          } else {
            var keyNames = this.getKeyNames(keyCode);
            var killKeyCodeIndex = this._killKeyCodes.indexOf(keyCode);
            if (killKeyCodeIndex !== -1) {
              this.pressedKeys.length = 0;
            } else {
              for (var _i2 = 0; _i2 < keyNames.length; _i2 += 1) {
                var index = this.pressedKeys.indexOf(keyNames[_i2]);
                if (index > -1) {
                  this.pressedKeys.splice(index, 1);
                }
              }
            }
            this.activeTargetKeys.length = 0;
            this._clearMacros();
          }
        }
      }, {
        key: "_applyMacros",
        value: function _applyMacros() {
          var macros = this._macros.slice(0);
          for (var i = 0; i < macros.length; i += 1) {
            var macro = macros[i];
            if (macro.keyCombo.check(this.pressedKeys)) {
              if (macro.handler) {
                macro.keyNames = macro.handler(this.pressedKeys);
              }
              for (var j = 0; j < macro.keyNames.length; j += 1) {
                if (this.pressedKeys.indexOf(macro.keyNames[j]) === -1) {
                  this.pressedKeys.push(macro.keyNames[j]);
                }
              }
              this._appliedMacros.push(macro);
            }
          }
        }
      }, {
        key: "_clearMacros",
        value: function _clearMacros() {
          for (var i = 0; i < this._appliedMacros.length; i += 1) {
            var macro = this._appliedMacros[i];
            if (!macro.keyCombo.check(this.pressedKeys)) {
              for (var j = 0; j < macro.keyNames.length; j += 1) {
                var index = this.pressedKeys.indexOf(macro.keyNames[j]);
                if (index > -1) {
                  this.pressedKeys.splice(index, 1);
                }
              }
              if (macro.handler) {
                macro.keyNames = null;
              }
              this._appliedMacros.splice(i, 1);
              i -= 1;
            }
          }
        }
      }]);
      return Locale2;
    }();
    var Keyboard = /* @__PURE__ */ function() {
      function Keyboard2(targetWindow, targetElement, targetPlatform, targetUserAgent) {
        _classCallCheck(this, Keyboard2);
        this._locale = null;
        this._currentContext = "";
        this._contexts = {};
        this._listeners = [];
        this._appliedListeners = [];
        this._locales = {};
        this._targetElement = null;
        this._targetWindow = null;
        this._targetPlatform = "";
        this._targetUserAgent = "";
        this._isModernBrowser = false;
        this._targetKeyDownBinding = null;
        this._targetKeyUpBinding = null;
        this._targetResetBinding = null;
        this._paused = false;
        this._contexts.global = {
          listeners: this._listeners,
          targetWindow,
          targetElement,
          targetPlatform,
          targetUserAgent
        };
        this.setContext("global");
      }
      _createClass(Keyboard2, [{
        key: "setLocale",
        value: function setLocale(localeName, localeBuilder) {
          var locale = null;
          if (typeof localeName === "string") {
            if (localeBuilder) {
              locale = new Locale(localeName);
              localeBuilder(locale, this._targetPlatform, this._targetUserAgent);
            } else {
              locale = this._locales[localeName] || null;
            }
          } else {
            locale = localeName;
            localeName = locale._localeName;
          }
          this._locale = locale;
          this._locales[localeName] = locale;
          if (locale) {
            this._locale.pressedKeys = locale.pressedKeys;
          }
          return this;
        }
      }, {
        key: "getLocale",
        value: function getLocale(localName) {
          localName || (localName = this._locale.localeName);
          return this._locales[localName] || null;
        }
      }, {
        key: "bind",
        value: function bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2) {
          if (keyComboStr === null || typeof keyComboStr === "function") {
            preventRepeatByDefault2 = releaseHandler;
            releaseHandler = pressHandler;
            pressHandler = keyComboStr;
            keyComboStr = null;
          }
          if (keyComboStr && _typeof(keyComboStr) === "object" && typeof keyComboStr.length === "number") {
            for (var i = 0; i < keyComboStr.length; i += 1) {
              this.bind(keyComboStr[i], pressHandler, releaseHandler);
            }
            return this;
          }
          this._listeners.push({
            keyCombo: keyComboStr ? new KeyCombo(keyComboStr) : null,
            pressHandler: pressHandler || null,
            releaseHandler: releaseHandler || null,
            preventRepeat: preventRepeatByDefault2 || false,
            preventRepeatByDefault: preventRepeatByDefault2 || false,
            executingHandler: false
          });
          return this;
        }
      }, {
        key: "addListener",
        value: function addListener(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2) {
          return this.bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2);
        }
      }, {
        key: "on",
        value: function on(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2) {
          return this.bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2);
        }
      }, {
        key: "bindPress",
        value: function bindPress(keyComboStr, pressHandler, preventRepeatByDefault2) {
          return this.bind(keyComboStr, pressHandler, null, preventRepeatByDefault2);
        }
      }, {
        key: "bindRelease",
        value: function bindRelease(keyComboStr, releaseHandler) {
          return this.bind(keyComboStr, null, releaseHandler, preventRepeatByDefault);
        }
      }, {
        key: "unbind",
        value: function unbind(keyComboStr, pressHandler, releaseHandler) {
          if (keyComboStr === null || typeof keyComboStr === "function") {
            releaseHandler = pressHandler;
            pressHandler = keyComboStr;
            keyComboStr = null;
          }
          if (keyComboStr && _typeof(keyComboStr) === "object" && typeof keyComboStr.length === "number") {
            for (var i = 0; i < keyComboStr.length; i += 1) {
              this.unbind(keyComboStr[i], pressHandler, releaseHandler);
            }
            return this;
          }
          for (var _i = 0; _i < this._listeners.length; _i += 1) {
            var listener = this._listeners[_i];
            var comboMatches = !keyComboStr && !listener.keyCombo || listener.keyCombo && listener.keyCombo.isEqual(keyComboStr);
            var pressHandlerMatches = !pressHandler && !releaseHandler || !pressHandler && !listener.pressHandler || pressHandler === listener.pressHandler;
            var releaseHandlerMatches = !pressHandler && !releaseHandler || !releaseHandler && !listener.releaseHandler || releaseHandler === listener.releaseHandler;
            if (comboMatches && pressHandlerMatches && releaseHandlerMatches) {
              this._listeners.splice(_i, 1);
              _i -= 1;
            }
          }
          return this;
        }
      }, {
        key: "removeListener",
        value: function removeListener(keyComboStr, pressHandler, releaseHandler) {
          return this.unbind(keyComboStr, pressHandler, releaseHandler);
        }
      }, {
        key: "off",
        value: function off(keyComboStr, pressHandler, releaseHandler) {
          return this.unbind(keyComboStr, pressHandler, releaseHandler);
        }
      }, {
        key: "setContext",
        value: function setContext(contextName) {
          if (this._locale) {
            this.releaseAllKeys();
          }
          if (!this._contexts[contextName]) {
            var globalContext = this._contexts.global;
            this._contexts[contextName] = {
              listeners: [],
              targetWindow: globalContext.targetWindow,
              targetElement: globalContext.targetElement,
              targetPlatform: globalContext.targetPlatform,
              targetUserAgent: globalContext.targetUserAgent
            };
          }
          var context = this._contexts[contextName];
          this._currentContext = contextName;
          this._listeners = context.listeners;
          this.stop();
          this.watch(context.targetWindow, context.targetElement, context.targetPlatform, context.targetUserAgent);
          return this;
        }
      }, {
        key: "getContext",
        value: function getContext() {
          return this._currentContext;
        }
      }, {
        key: "withContext",
        value: function withContext(contextName, callback) {
          var previousContextName = this.getContext();
          this.setContext(contextName);
          callback();
          this.setContext(previousContextName);
          return this;
        }
      }, {
        key: "watch",
        value: function watch(targetWindow, targetElement, targetPlatform, targetUserAgent) {
          var _this = this;
          this.stop();
          var win = typeof globalThis !== "undefined" ? globalThis : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : {};
          if (!targetWindow) {
            if (!win.addEventListener && !win.attachEvent) {
              throw new Error("Cannot find window functions addEventListener or attachEvent.");
            }
            targetWindow = win;
          }
          if (typeof targetWindow.nodeType === "number") {
            targetUserAgent = targetPlatform;
            targetPlatform = targetElement;
            targetElement = targetWindow;
            targetWindow = win;
          }
          if (!targetWindow.addEventListener && !targetWindow.attachEvent) {
            throw new Error("Cannot find addEventListener or attachEvent methods on targetWindow.");
          }
          this._isModernBrowser = !!targetWindow.addEventListener;
          var userAgent = targetWindow.navigator && targetWindow.navigator.userAgent || "";
          var platform = targetWindow.navigator && targetWindow.navigator.platform || "";
          targetElement && targetElement !== null || (targetElement = targetWindow.document);
          targetPlatform && targetPlatform !== null || (targetPlatform = platform);
          targetUserAgent && targetUserAgent !== null || (targetUserAgent = userAgent);
          this._targetKeyDownBinding = function(event) {
            _this.pressKey(event.keyCode, event);
            _this._handleCommandBug(event, platform);
          };
          this._targetKeyUpBinding = function(event) {
            _this.releaseKey(event.keyCode, event);
          };
          this._targetResetBinding = function(event) {
            _this.releaseAllKeys(event);
          };
          this._bindEvent(targetElement, "keydown", this._targetKeyDownBinding);
          this._bindEvent(targetElement, "keyup", this._targetKeyUpBinding);
          this._bindEvent(targetWindow, "focus", this._targetResetBinding);
          this._bindEvent(targetWindow, "blur", this._targetResetBinding);
          this._targetElement = targetElement;
          this._targetWindow = targetWindow;
          this._targetPlatform = targetPlatform;
          this._targetUserAgent = targetUserAgent;
          var currentContext = this._contexts[this._currentContext];
          currentContext.targetWindow = this._targetWindow;
          currentContext.targetElement = this._targetElement;
          currentContext.targetPlatform = this._targetPlatform;
          currentContext.targetUserAgent = this._targetUserAgent;
          return this;
        }
      }, {
        key: "stop",
        value: function stop() {
          if (!this._targetElement || !this._targetWindow) {
            return;
          }
          this._unbindEvent(this._targetElement, "keydown", this._targetKeyDownBinding);
          this._unbindEvent(this._targetElement, "keyup", this._targetKeyUpBinding);
          this._unbindEvent(this._targetWindow, "focus", this._targetResetBinding);
          this._unbindEvent(this._targetWindow, "blur", this._targetResetBinding);
          this._targetWindow = null;
          this._targetElement = null;
          return this;
        }
      }, {
        key: "pressKey",
        value: function pressKey(keyCode, event) {
          if (this._paused) {
            return this;
          }
          if (!this._locale) {
            throw new Error("Locale not set");
          }
          this._locale.pressKey(keyCode);
          this._applyBindings(event);
          return this;
        }
      }, {
        key: "releaseKey",
        value: function releaseKey(keyCode, event) {
          if (this._paused) {
            return this;
          }
          if (!this._locale) {
            throw new Error("Locale not set");
          }
          this._locale.releaseKey(keyCode);
          this._clearBindings(event);
          return this;
        }
      }, {
        key: "releaseAllKeys",
        value: function releaseAllKeys(event) {
          if (this._paused) {
            return this;
          }
          if (!this._locale) {
            throw new Error("Locale not set");
          }
          this._locale.pressedKeys.length = 0;
          this._clearBindings(event);
          return this;
        }
      }, {
        key: "pause",
        value: function pause() {
          if (this._paused) {
            return this;
          }
          if (this._locale) {
            this.releaseAllKeys();
          }
          this._paused = true;
          return this;
        }
      }, {
        key: "resume",
        value: function resume() {
          this._paused = false;
          return this;
        }
      }, {
        key: "reset",
        value: function reset() {
          this.releaseAllKeys();
          this._listeners.length = 0;
          return this;
        }
      }, {
        key: "_bindEvent",
        value: function _bindEvent(targetElement, eventName, handler) {
          return this._isModernBrowser ? targetElement.addEventListener(eventName, handler, false) : targetElement.attachEvent("on" + eventName, handler);
        }
      }, {
        key: "_unbindEvent",
        value: function _unbindEvent(targetElement, eventName, handler) {
          return this._isModernBrowser ? targetElement.removeEventListener(eventName, handler, false) : targetElement.detachEvent("on" + eventName, handler);
        }
      }, {
        key: "_getGroupedListeners",
        value: function _getGroupedListeners() {
          var listenerGroups = [];
          var listenerGroupMap = [];
          var listeners = this._listeners;
          if (this._currentContext !== "global") {
            listeners = [].concat(_toConsumableArray(listeners), _toConsumableArray(this._contexts.global.listeners));
          }
          listeners.sort(function(a, b) {
            return (b.keyCombo ? b.keyCombo.keyNames.length : 0) - (a.keyCombo ? a.keyCombo.keyNames.length : 0);
          }).forEach(function(l) {
            var mapIndex = -1;
            for (var i = 0; i < listenerGroupMap.length; i += 1) {
              if (listenerGroupMap[i] === null && l.keyCombo === null || listenerGroupMap[i] !== null && listenerGroupMap[i].isEqual(l.keyCombo)) {
                mapIndex = i;
              }
            }
            if (mapIndex === -1) {
              mapIndex = listenerGroupMap.length;
              listenerGroupMap.push(l.keyCombo);
            }
            if (!listenerGroups[mapIndex]) {
              listenerGroups[mapIndex] = [];
            }
            listenerGroups[mapIndex].push(l);
          });
          return listenerGroups;
        }
      }, {
        key: "_applyBindings",
        value: function _applyBindings(event) {
          var _this2 = this;
          var preventRepeat = false;
          event || (event = {});
          event.preventRepeat = function() {
            preventRepeat = true;
          };
          event.pressedKeys = this._locale.pressedKeys.slice(0);
          var activeTargetKeys = this._locale.activeTargetKeys;
          var pressedKeys = this._locale.pressedKeys.slice(0);
          var listenerGroups = this._getGroupedListeners();
          var _loop = function _loop2(i2) {
            var listeners = listenerGroups[i2];
            var keyCombo = listeners[0].keyCombo;
            if (keyCombo === null || keyCombo.check(pressedKeys) && activeTargetKeys.some(function(k) {
              return keyCombo.keyNames.includes(k);
            })) {
              for (var j = 0; j < listeners.length; j += 1) {
                var listener = listeners[j];
                if (!listener.executingHandler && listener.pressHandler && !listener.preventRepeat) {
                  listener.executingHandler = true;
                  listener.pressHandler.call(_this2, event);
                  listener.executingHandler = false;
                  if (preventRepeat || listener.preventRepeatByDefault) {
                    listener.preventRepeat = true;
                    preventRepeat = false;
                  }
                }
                if (_this2._appliedListeners.indexOf(listener) === -1) {
                  _this2._appliedListeners.push(listener);
                }
              }
              if (keyCombo) {
                for (var _j = 0; _j < keyCombo.keyNames.length; _j += 1) {
                  var index = pressedKeys.indexOf(keyCombo.keyNames[_j]);
                  if (index !== -1) {
                    pressedKeys.splice(index, 1);
                    _j -= 1;
                  }
                }
              }
            }
          };
          for (var i = 0; i < listenerGroups.length; i += 1) {
            _loop(i);
          }
        }
      }, {
        key: "_clearBindings",
        value: function _clearBindings(event) {
          event || (event = {});
          event.pressedKeys = this._locale.pressedKeys.slice(0);
          for (var i = 0; i < this._appliedListeners.length; i += 1) {
            var listener = this._appliedListeners[i];
            var keyCombo = listener.keyCombo;
            if (keyCombo === null || !keyCombo.check(this._locale.pressedKeys)) {
              listener.preventRepeat = false;
              if (keyCombo !== null || event.pressedKeys.length === 0) {
                this._appliedListeners.splice(i, 1);
                i -= 1;
              }
              if (!listener.executingHandler && listener.releaseHandler) {
                listener.executingHandler = true;
                listener.releaseHandler.call(this, event);
                listener.executingHandler = false;
              }
            }
          }
        }
      }, {
        key: "_handleCommandBug",
        value: function _handleCommandBug(event, platform) {
          var modifierKeys = ["shift", "ctrl", "alt", "capslock", "tab", "command"];
          if (platform.match("Mac") && this._locale.pressedKeys.includes("command") && !modifierKeys.includes(this._locale.getKeyNames(event.keyCode)[0])) {
            this._targetKeyUpBinding(event);
          }
        }
      }]);
      return Keyboard2;
    }();
    function us(locale, platform, userAgent) {
      locale.bindKeyCode(3, ["cancel"]);
      locale.bindKeyCode(8, ["backspace"]);
      locale.bindKeyCode(9, ["tab"]);
      locale.bindKeyCode(12, ["clear"]);
      locale.bindKeyCode(13, ["enter"]);
      locale.bindKeyCode(16, ["shift"]);
      locale.bindKeyCode(17, ["ctrl"]);
      locale.bindKeyCode(18, ["alt", "menu"]);
      locale.bindKeyCode(19, ["pause", "break"]);
      locale.bindKeyCode(20, ["capslock"]);
      locale.bindKeyCode(27, ["escape", "esc"]);
      locale.bindKeyCode(32, ["space", "spacebar"]);
      locale.bindKeyCode(33, ["pageup"]);
      locale.bindKeyCode(34, ["pagedown"]);
      locale.bindKeyCode(35, ["end"]);
      locale.bindKeyCode(36, ["home"]);
      locale.bindKeyCode(37, ["left"]);
      locale.bindKeyCode(38, ["up"]);
      locale.bindKeyCode(39, ["right"]);
      locale.bindKeyCode(40, ["down"]);
      locale.bindKeyCode(41, ["select"]);
      locale.bindKeyCode(42, ["printscreen"]);
      locale.bindKeyCode(43, ["execute"]);
      locale.bindKeyCode(44, ["snapshot"]);
      locale.bindKeyCode(45, ["insert", "ins"]);
      locale.bindKeyCode(46, ["delete", "del"]);
      locale.bindKeyCode(47, ["help"]);
      locale.bindKeyCode(145, ["scrolllock", "scroll"]);
      locale.bindKeyCode(188, ["comma", ","]);
      locale.bindKeyCode(190, ["period", "."]);
      locale.bindKeyCode(191, ["slash", "forwardslash", "/"]);
      locale.bindKeyCode(192, ["graveaccent", "`"]);
      locale.bindKeyCode(219, ["openbracket", "["]);
      locale.bindKeyCode(220, ["backslash", "\\"]);
      locale.bindKeyCode(221, ["closebracket", "]"]);
      locale.bindKeyCode(222, ["apostrophe", "'"]);
      locale.bindKeyCode(48, ["zero", "0"]);
      locale.bindKeyCode(49, ["one", "1"]);
      locale.bindKeyCode(50, ["two", "2"]);
      locale.bindKeyCode(51, ["three", "3"]);
      locale.bindKeyCode(52, ["four", "4"]);
      locale.bindKeyCode(53, ["five", "5"]);
      locale.bindKeyCode(54, ["six", "6"]);
      locale.bindKeyCode(55, ["seven", "7"]);
      locale.bindKeyCode(56, ["eight", "8"]);
      locale.bindKeyCode(57, ["nine", "9"]);
      locale.bindKeyCode(96, ["numzero", "num0"]);
      locale.bindKeyCode(97, ["numone", "num1"]);
      locale.bindKeyCode(98, ["numtwo", "num2"]);
      locale.bindKeyCode(99, ["numthree", "num3"]);
      locale.bindKeyCode(100, ["numfour", "num4"]);
      locale.bindKeyCode(101, ["numfive", "num5"]);
      locale.bindKeyCode(102, ["numsix", "num6"]);
      locale.bindKeyCode(103, ["numseven", "num7"]);
      locale.bindKeyCode(104, ["numeight", "num8"]);
      locale.bindKeyCode(105, ["numnine", "num9"]);
      locale.bindKeyCode(106, ["nummultiply", "num*"]);
      locale.bindKeyCode(107, ["numadd", "num+"]);
      locale.bindKeyCode(108, ["numenter"]);
      locale.bindKeyCode(109, ["numsubtract", "num-"]);
      locale.bindKeyCode(110, ["numdecimal", "num."]);
      locale.bindKeyCode(111, ["numdivide", "num/"]);
      locale.bindKeyCode(144, ["numlock", "num"]);
      locale.bindKeyCode(112, ["f1"]);
      locale.bindKeyCode(113, ["f2"]);
      locale.bindKeyCode(114, ["f3"]);
      locale.bindKeyCode(115, ["f4"]);
      locale.bindKeyCode(116, ["f5"]);
      locale.bindKeyCode(117, ["f6"]);
      locale.bindKeyCode(118, ["f7"]);
      locale.bindKeyCode(119, ["f8"]);
      locale.bindKeyCode(120, ["f9"]);
      locale.bindKeyCode(121, ["f10"]);
      locale.bindKeyCode(122, ["f11"]);
      locale.bindKeyCode(123, ["f12"]);
      locale.bindKeyCode(124, ["f13"]);
      locale.bindKeyCode(125, ["f14"]);
      locale.bindKeyCode(126, ["f15"]);
      locale.bindKeyCode(127, ["f16"]);
      locale.bindKeyCode(128, ["f17"]);
      locale.bindKeyCode(129, ["f18"]);
      locale.bindKeyCode(130, ["f19"]);
      locale.bindKeyCode(131, ["f20"]);
      locale.bindKeyCode(132, ["f21"]);
      locale.bindKeyCode(133, ["f22"]);
      locale.bindKeyCode(134, ["f23"]);
      locale.bindKeyCode(135, ["f24"]);
      locale.bindMacro("shift + `", ["tilde", "~"]);
      locale.bindMacro("shift + 1", ["exclamation", "exclamationpoint", "!"]);
      locale.bindMacro("shift + 2", ["at", "@"]);
      locale.bindMacro("shift + 3", ["number", "#"]);
      locale.bindMacro("shift + 4", ["dollar", "dollars", "dollarsign", "$"]);
      locale.bindMacro("shift + 5", ["percent", "%"]);
      locale.bindMacro("shift + 6", ["caret", "^"]);
      locale.bindMacro("shift + 7", ["ampersand", "and", "&"]);
      locale.bindMacro("shift + 8", ["asterisk", "*"]);
      locale.bindMacro("shift + 9", ["openparen", "("]);
      locale.bindMacro("shift + 0", ["closeparen", ")"]);
      locale.bindMacro("shift + -", ["underscore", "_"]);
      locale.bindMacro("shift + =", ["plus", "+"]);
      locale.bindMacro("shift + [", ["opencurlybrace", "opencurlybracket", "{"]);
      locale.bindMacro("shift + ]", ["closecurlybrace", "closecurlybracket", "}"]);
      locale.bindMacro("shift + \\", ["verticalbar", "|"]);
      locale.bindMacro("shift + ;", ["colon", ":"]);
      locale.bindMacro("shift + '", ["quotationmark", "'"]);
      locale.bindMacro("shift + !,", ["openanglebracket", "<"]);
      locale.bindMacro("shift + .", ["closeanglebracket", ">"]);
      locale.bindMacro("shift + /", ["questionmark", "?"]);
      if (platform.match("Mac")) {
        locale.bindMacro("command", ["mod", "modifier"]);
      } else {
        locale.bindMacro("ctrl", ["mod", "modifier"]);
      }
      for (var keyCode = 65; keyCode <= 90; keyCode += 1) {
        var keyName = String.fromCharCode(keyCode + 32);
        var capitalKeyName = String.fromCharCode(keyCode);
        locale.bindKeyCode(keyCode, keyName);
        locale.bindMacro("shift + " + keyName, capitalKeyName);
        locale.bindMacro("capslock + " + keyName, capitalKeyName);
      }
      var semicolonKeyCode = userAgent.match("Firefox") ? 59 : 186;
      var dashKeyCode = userAgent.match("Firefox") ? 173 : 189;
      var equalKeyCode = userAgent.match("Firefox") ? 61 : 187;
      var leftCommandKeyCode;
      var rightCommandKeyCode;
      if (platform.match("Mac") && (userAgent.match("Safari") || userAgent.match("Chrome"))) {
        leftCommandKeyCode = 91;
        rightCommandKeyCode = 93;
      } else if (platform.match("Mac") && userAgent.match("Opera")) {
        leftCommandKeyCode = 17;
        rightCommandKeyCode = 17;
      } else if (platform.match("Mac") && userAgent.match("Firefox")) {
        leftCommandKeyCode = 224;
        rightCommandKeyCode = 224;
      }
      locale.bindKeyCode(semicolonKeyCode, ["semicolon", ";"]);
      locale.bindKeyCode(dashKeyCode, ["dash", "-"]);
      locale.bindKeyCode(equalKeyCode, ["equal", "equalsign", "="]);
      locale.bindKeyCode(leftCommandKeyCode, ["command", "windows", "win", "super", "leftcommand", "leftwindows", "leftwin", "leftsuper"]);
      locale.bindKeyCode(rightCommandKeyCode, ["command", "windows", "win", "super", "rightcommand", "rightwindows", "rightwin", "rightsuper"]);
      locale.setKillKey("command");
    }
    var keyboard2 = new Keyboard();
    keyboard2.setLocale("us", us);
    keyboard2.Keyboard = Keyboard;
    keyboard2.Locale = Locale;
    keyboard2.KeyCombo = KeyCombo;
    return keyboard2;
  });
})(keyboard);
var keyboardjs = keyboard.exports;
class KeyboardManager extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "map", new Map());
  }
  generateSymbol(entity) {
    if (Array.isArray(entity)) {
      return entity.join(" + ");
    }
    return entity.shortcutKey.join(" + ");
  }
  register(entity) {
    const symbol = this.generateSymbol(entity);
    if (this.map.has(symbol)) {
      console.warn(`KeyboardManager: shortcutKey already exist: ${symbol}. desp: ${this.map.get(symbol).desp}`);
      return this;
    }
    keyboardjs.bind(symbol, entity.keydown || null, entity.keyup);
    this.map.set(symbol, entity);
    return this;
  }
  update(entity) {
    const symbol = this.generateSymbol(entity);
    if (!this.map.has(symbol)) {
      console.warn(`KeyboardManager: shortcutKey unregister then exec register function`);
      this.register(entity);
      return this;
    }
    this.cancel(entity.shortcutKey);
    this.register(entity);
    return this;
  }
  cancel(keyArray) {
    const symbol = this.generateSymbol(keyArray);
    if (this.map.has(symbol)) {
      const entity = this.map.get(symbol);
      keyboardjs.unbind(symbol, entity.keydown || null, entity.keyup);
      this.map.delete(symbol);
    }
    return this;
  }
  checkRepeat(keyArray) {
    const symbol = this.generateSymbol(keyArray);
    return this.map.has(symbol);
  }
}
const KeyboardManagerPlugin = function(params) {
  if (this.keyboardManager) {
    console.warn("engine has installed keyboardManager plugin.");
    return false;
  }
  const keyboardManager = new KeyboardManager();
  this.keyboardManager = keyboardManager;
  this.completeSet.add(() => {
    if (this.transformControls) {
      if (this.IS_ENGINESUPPORT) {
        const transformControls = this.dataSupportManager.controlsDataSupport.getData()[CONFIGTYPE.TRNASFORMCONTROLS];
        keyboardManager.register({
          shortcutKey: ["r"],
          desp: "tranformControls rotate mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "rotate";
          }
        }).register({
          shortcutKey: ["t"],
          desp: "tranformControls translate mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "translate";
          }
        }).register({
          shortcutKey: ["e"],
          desp: "tranformControls scale mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "scale";
          }
        }).register({
          shortcutKey: ["x"],
          desp: "tranformControls switch x axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.showX = !transformControls.showX;
          }
        }).register({
          shortcutKey: ["y"],
          desp: "tranformControls switch y axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            if (event == null ? void 0 : event.ctrlKey) {
              return;
            }
            transformControls.showY = !transformControls.showY;
          }
        }).register({
          shortcutKey: ["z"],
          desp: "tranformControls switch z axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            if (event == null ? void 0 : event.ctrlKey) {
              return;
            }
            transformControls.showZ = !transformControls.showZ;
          }
        }).register({
          shortcutKey: ["space"],
          desp: "tranformControls switch coordinate space",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.space = transformControls.space === "local" ? "world" : "local";
          }
        }).register({
          shortcutKey: ["shift"],
          desp: "tranformControls switch tranform numeric value",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.snapAllow = false;
          },
          keydown: (event) => {
            event == null ? void 0 : event.preventDefault();
            event == null ? void 0 : event.preventRepeat();
            transformControls.snapAllow = true;
          }
        });
      } else {
        const transformControls = this.transformControls;
        keyboardManager.register({
          shortcutKey: ["r"],
          desp: "tranformControls rotate mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "rotate";
          }
        }).register({
          shortcutKey: ["t"],
          desp: "tranformControls translate mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "translate";
          }
        }).register({
          shortcutKey: ["e"],
          desp: "tranformControls scale mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "scale";
          }
        }).register({
          shortcutKey: ["x"],
          desp: "tranformControls switch x axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.showX = !transformControls.showX;
          }
        }).register({
          shortcutKey: ["y"],
          desp: "tranformControls switch y axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            if (event == null ? void 0 : event.ctrlKey) {
              return;
            }
            transformControls.showY = !transformControls.showY;
          }
        }).register({
          shortcutKey: ["z"],
          desp: "tranformControls switch z axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            if (event == null ? void 0 : event.ctrlKey) {
              return;
            }
            transformControls.showZ = !transformControls.showZ;
          }
        }).register({
          shortcutKey: ["space"],
          desp: "tranformControls switch coordinate space",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.space = transformControls.space === "local" ? "world" : "local";
          }
        }).register({
          shortcutKey: ["shift"],
          desp: "tranformControls switch tranform numeric value",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.translationSnap = null;
            transformControls.rotationSnap = null;
            transformControls.scaleSnap = null;
          },
          keydown: (event) => {
            event == null ? void 0 : event.preventDefault();
            event == null ? void 0 : event.preventRepeat();
            transformControls.translationSnap = 5;
            transformControls.rotationSnap = Math.PI / 180 * 10;
            transformControls.scaleSnap = 0.1;
          }
        });
      }
    }
  });
  return true;
};
const AxesHelperPlugin = function(params = {}) {
  if (!this.scene) {
    console.error("must install some scene plugin before BasicViewpoint plugin.");
    return false;
  }
  const axesHelper = new AxesHelper(params.length || 500);
  axesHelper.matrixAutoUpdate = false;
  axesHelper.raycast = () => {
  };
  this.scene.add(axesHelper);
  this.setAxesHelper = function(params2) {
    if (params2.show) {
      this.scene.add(axesHelper);
    } else {
      this.scene.remove(axesHelper);
    }
    return this;
  };
  return true;
};
const GridHelperPlugin = function(params = {}) {
  if (!this.scene) {
    console.error("must install some scene before BasicViewpoint plugin.");
    return false;
  }
  const gridHelper = new GridHelper(params.range || 500, params.spacing || 50, params.axesColor || "rgb(130, 130, 130)", params.cellColor || "rgb(70, 70, 70)");
  if (params.opacity !== 1) {
    const material = gridHelper.material;
    material.transparent = true;
    material.opacity = params.opacity || 0.5;
    material.needsUpdate = true;
  }
  gridHelper.matrixAutoUpdate = false;
  gridHelper.raycast = () => {
  };
  this.scene.add(gridHelper);
  this.setGridHelper = function(params2) {
    if (params2.show) {
      this.scene.add(gridHelper);
    } else {
      this.scene.remove(gridHelper);
    }
    return this;
  };
  this.completeSet.add(() => {
    if (this.setViewpoint) {
      this.addEventListener("setViewpoint", (event) => {
        const viewpoint = event.viewpoint;
        if (viewpoint === VIEWPOINT.DEFAULT) {
          gridHelper.rotation.set(0, 0, 0);
        } else if (viewpoint === VIEWPOINT.TOP) {
          gridHelper.rotation.set(0, 0, 0);
        } else if (viewpoint === VIEWPOINT.BOTTOM) {
          gridHelper.rotation.set(0, 0, 0);
        } else if (viewpoint === VIEWPOINT.RIGHT) {
          gridHelper.rotation.set(0, 0, Math.PI / 2);
        } else if (viewpoint === VIEWPOINT.LEFT) {
          gridHelper.rotation.set(0, 0, Math.PI / 2);
        } else if (viewpoint === VIEWPOINT.FRONT) {
          gridHelper.rotation.set(Math.PI / 2, 0, 0);
        } else if (viewpoint === VIEWPOINT.BACK) {
          gridHelper.rotation.set(Math.PI / 2, 0, 0);
        }
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
    }
  });
  return true;
};
var DISPLAYMODE;
(function(DISPLAYMODE2) {
  DISPLAYMODE2["GEOMETRY"] = "geometry";
  DISPLAYMODE2["MATERIAL"] = "material";
  DISPLAYMODE2["LIGHT"] = "light";
  DISPLAYMODE2["ENV"] = "env";
})(DISPLAYMODE || (DISPLAYMODE = {}));
const DisplayModelPlugin = function(params = {}) {
  if (!this.webGLRenderer) {
    console.error("must install some renderer before DisplayModel plugin.");
    return false;
  }
  if (!this.scene) {
    console.error("must install some scene before DisplayModel plugin.");
    return false;
  }
  !params.overrideColor && (params.overrideColor = "rgb(250, 250, 250)");
  !params.defaultAmbientLightSetting && (params.defaultAmbientLightSetting = {});
  !params.defaultAmbientLightSetting.color && (params.defaultAmbientLightSetting.color = "rgb(255, 255, 255)");
  !params.defaultAmbientLightSetting.intensity && (params.defaultAmbientLightSetting.intensity = 0.5);
  const defaultAmbientLight = new AmbientLight(params.defaultAmbientLightSetting.color, params.defaultAmbientLightSetting.intensity);
  defaultAmbientLight.matrixAutoUpdate = false;
  !params.defaultDirectionalLightSetting && (params.defaultDirectionalLightSetting = {});
  !params.defaultDirectionalLightSetting.color && (params.defaultDirectionalLightSetting.color = "rgb(255, 255, 255)");
  !params.defaultDirectionalLightSetting.intensity && (params.defaultDirectionalLightSetting.intensity = 0.5);
  !params.defaultDirectionalLightSetting.position && (params.defaultDirectionalLightSetting.position = {
    x: -100,
    y: 100,
    z: 100
  });
  const defaultDirectionalLight = new DirectionalLight(params.defaultDirectionalLightSetting.color, params.defaultDirectionalLightSetting.intensity);
  defaultDirectionalLight.castShadow = false;
  defaultDirectionalLight.position.set(params.defaultDirectionalLightSetting.position.x, params.defaultDirectionalLightSetting.position.y, params.defaultDirectionalLightSetting.position.z);
  defaultDirectionalLight.updateMatrix();
  defaultDirectionalLight.updateMatrixWorld();
  defaultDirectionalLight.matrixAutoUpdate = false;
  !params.mode && (params.mode = DISPLAYMODE.ENV);
  this.displayMode = params.mode;
  const meshOverrideMaterial = new MeshLambertMaterial({ color: params.overrideColor });
  const lineOverrideMaterial = new LineBasicMaterial({ color: params.overrideColor });
  const pointsOverrideMaterial = new PointsMaterial({ color: params.overrideColor, size: 5, sizeAttenuation: false });
  const spriteOverrideMaterial = new SpriteMaterial({ color: params.overrideColor });
  const materialCacheMap = new WeakMap();
  const lightSet = new Set();
  const meshSet = new Set();
  const lineSet = new Set();
  const pointsSet = new Set();
  const spriteSet = new Set();
  let backgroundCache;
  let environmentCache;
  const filterTypeMap = {
    Object3D: true,
    Group: true
  };
  const modeSymbol = Symbol.for("light");
  this.scene.addEventListener("afterAdd", (event) => {
    const displayMode = this.displayMode;
    const objects = event.objects;
    for (let elem of objects) {
      if (filterTypeMap[elem.type]) {
        continue;
      }
      if (elem instanceof Mesh && elem.type === "Mesh") {
        meshSet.add(elem);
        if (displayMode === DISPLAYMODE.GEOMETRY) {
          materialCacheMap.set(elem, elem.material);
          elem.material = meshOverrideMaterial;
        }
      } else if (elem instanceof Line && elem.type.includes("Line")) {
        lineSet.add(elem);
        if (displayMode === DISPLAYMODE.GEOMETRY) {
          materialCacheMap.set(elem, elem.material);
          elem.material = lineOverrideMaterial;
        }
      } else if (elem instanceof Light && elem.type.includes("Light")) {
        if (elem === defaultAmbientLight || elem === defaultDirectionalLight) {
          continue;
        }
        if (!lightSet.has(elem)) {
          lightSet.add(elem);
        }
        elem[modeSymbol] = true;
        if (displayMode !== DISPLAYMODE.ENV && displayMode !== DISPLAYMODE.LIGHT) {
          this.scene.remove(elem);
        }
      } else if (elem instanceof Points && elem.type === "Points") {
        pointsSet.add(elem);
        if (displayMode === DISPLAYMODE.GEOMETRY) {
          materialCacheMap.set(elem, elem.material);
          elem.material = pointsOverrideMaterial;
        }
      } else if (elem instanceof Sprite && elem.type === "Sprite") {
        spriteSet.add(elem);
        if (displayMode === DISPLAYMODE.GEOMETRY) {
          materialCacheMap.set(elem, elem.material);
          elem.material = spriteOverrideMaterial;
        }
      }
    }
  });
  this.scene.addEventListener("afterRemove", (event) => {
    const objects = event.objects;
    for (let elem of objects) {
      if (filterTypeMap[elem.type]) {
        continue;
      }
      if (elem instanceof Mesh && elem.type === "Mesh") {
        meshSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      } else if (elem instanceof Line && elem.type.includes("Line")) {
        lineSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      } else if (elem instanceof Light && elem.type.includes("Light")) {
        if (elem === defaultAmbientLight || elem === defaultDirectionalLight) {
          continue;
        }
        if (!elem[modeSymbol]) {
          lightSet.delete(elem);
        }
      } else if (elem instanceof Points && elem.type === "Points") {
        pointsSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      } else if (elem instanceof Sprite && elem.type === "Sprite") {
        spriteSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      }
    }
  });
  this.setDisplayMode = function(mode) {
    this.displayMode = mode || DISPLAYMODE.ENV;
    const filterMaterial = () => {
      for (let mesh of meshSet) {
        if (mesh.material === meshOverrideMaterial) {
          continue;
        }
        materialCacheMap.set(mesh, mesh.material);
        mesh.material = meshOverrideMaterial;
      }
      for (let line of lineSet) {
        if (line.material === lineOverrideMaterial) {
          continue;
        }
        materialCacheMap.set(line, line.material);
        line.material = lineOverrideMaterial;
      }
      for (let points of pointsSet) {
        if (points.material === pointsOverrideMaterial) {
          continue;
        }
        materialCacheMap.set(points, points.material);
        points.material = pointsOverrideMaterial;
      }
      for (let sprite of spriteSet) {
        if (sprite.material === spriteOverrideMaterial) {
          continue;
        }
        materialCacheMap.set(sprite, sprite.material);
        sprite.material = spriteOverrideMaterial;
      }
    };
    const reduceMaterial = () => {
      meshSet.forEach((mesh) => {
        if (materialCacheMap.has(mesh)) {
          mesh.material = materialCacheMap.get(mesh);
          materialCacheMap.delete(mesh);
        }
      });
      lineSet.forEach((line) => {
        if (materialCacheMap.has(line)) {
          line.material = materialCacheMap.get(line);
          materialCacheMap.delete(line);
        }
      });
      pointsSet.forEach((points) => {
        if (materialCacheMap.has(points)) {
          points.material = materialCacheMap.get(points);
          materialCacheMap.delete(points);
        }
      });
      spriteSet.forEach((sprite) => {
        if (materialCacheMap.has(sprite)) {
          sprite.material = materialCacheMap.get(sprite);
          materialCacheMap.delete(sprite);
        }
      });
    };
    const filterLight = () => {
      lightSet.forEach((light) => {
        light[modeSymbol] = true;
        this.scene.remove(light);
      });
      this.scene.add(defaultAmbientLight);
      this.scene.add(defaultDirectionalLight);
    };
    const reduceLight = () => {
      lightSet.forEach((light) => {
        light[modeSymbol] = false;
        this.scene.add(light);
      });
      this.scene.remove(defaultAmbientLight);
      this.scene.remove(defaultDirectionalLight);
    };
    const filterScene = () => {
      if (this.scene.background instanceof Texture) {
        backgroundCache = this.scene.background;
        this.scene.background = null;
      }
      if (this.scene.environment instanceof Texture) {
        environmentCache = this.scene.environment;
        this.scene.environment = null;
      }
    };
    const reduceScene = () => {
      if (backgroundCache) {
        this.scene.background = backgroundCache;
        backgroundCache = void 0;
      }
      if (environmentCache) {
        this.scene.environment = environmentCache;
        environmentCache = void 0;
      }
    };
    if (mode === DISPLAYMODE.GEOMETRY) {
      filterMaterial();
      filterScene();
      filterLight();
    } else if (mode === DISPLAYMODE.MATERIAL) {
      reduceMaterial();
      filterScene();
      filterLight();
    } else if (mode === DISPLAYMODE.LIGHT) {
      reduceMaterial();
      filterScene();
      reduceLight();
    } else if (mode === DISPLAYMODE.ENV) {
      reduceMaterial();
      reduceScene();
      reduceLight();
    } else {
      console.warn(`displayMode plugin can not set this mode: ${mode}`);
    }
    return this;
  };
  return true;
};
const HELPERCOLOR = "rgb(255, 255, 255)";
const getHelperLineMaterial = () => new LineBasicMaterial({ color: HELPERCOLOR });
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
class PointLightHelper extends LineSegments {
  constructor(pointLight2) {
    super();
    __publicField(this, "sphere");
    __publicField(this, "target");
    __publicField(this, "shape");
    __publicField(this, "type", "VisPointLightHelper");
    __publicField(this, "cacheColor");
    __publicField(this, "cacheDistance");
    __publicField(this, "cacheVector3");
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
    shape.matrixAutoUpdate = false;
    this.shape = shape;
    this.target = pointLight2;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cacheColor = pointLight2.color.getHex();
    this.cacheDistance = pointLight2.distance;
    this.cacheVector3 = new Vector3();
    this.add(this.shape);
    this.matrixAutoUpdate = false;
    this.matrix = pointLight2.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = pointLight2.matrixWorld;
    this.onBeforeRender = () => {
      const light = this.target;
      const shape2 = this.shape;
      if (light.distance !== this.cacheDistance) {
        shape2.geometry.dispose();
        shape2.geometry = new OctahedronBufferGeometry(light.distance, 0);
        this.cacheDistance = light.distance;
      }
      if (light.color.getHex() !== this.cacheColor) {
        shape2.material.color.copy(light.color).multiplyScalar(light.intensity);
        this.cacheColor = light.color.getHex();
      }
    };
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;
    sphere.set(this.cacheVector3.set(0, 0, 0), 1);
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
class GroupHelper extends LineSegments {
  constructor(group) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisGroupHelper");
    this.target = group;
    const geometry = new EdgesGeometry(new BoxBufferGeometry(1, 1, 1));
    geometry.computeBoundingBox();
    this.geometry = geometry;
    this.material = getHelperLineMaterial();
    this.material.depthTest = false;
    this.material.depthWrite = false;
    this.matrixAutoUpdate = false;
    this.matrix = group.matrix;
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
    this.matrixWorldNeedsUpdate = false;
    this.matrix = mesh.matrix;
    this.matrixWorld = mesh.matrixWorld;
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
class SpotLightHelper extends LineSegments {
  constructor(spotLight) {
    super();
    __publicField(this, "sphere");
    __publicField(this, "target");
    __publicField(this, "shape");
    __publicField(this, "type", "VisSpotLightHelper");
    __publicField(this, "cacheVector3");
    __publicField(this, "cacheColor");
    __publicField(this, "cacheAngle");
    __publicField(this, "cacheDistance");
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
    const shapeGeometry = new BufferGeometry();
    const positions = [
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
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
      -1,
      1
    ];
    for (let i = 0, j = 1, l = 32; i < l; i++, j++) {
      const p1 = i / l * Math.PI * 2;
      const p2 = j / l * Math.PI * 2;
      positions.push(Math.cos(p1), Math.sin(p1), 1, Math.cos(p2), Math.sin(p2), 1);
    }
    shapeGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    const material = getHelperLineMaterial();
    const shape = new LineSegments(shapeGeometry, material);
    shape.material.color.copy(spotLight.color).multiplyScalar(spotLight.intensity);
    const coneLength = spotLight.distance ? spotLight.distance : 1e3;
    const coneWidth = coneLength * Math.tan(spotLight.angle);
    shape.scale.set(coneWidth, coneWidth, coneLength);
    shape.raycast = () => {
    };
    this.add(shape);
    this.matrixAutoUpdate = false;
    this.matrix = spotLight.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = spotLight.matrixWorld;
    this.target = spotLight;
    this.shape = shape;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cacheColor = spotLight.color.getHex();
    this.cacheDistance = spotLight.distance;
    this.cacheAngle = spotLight.angle;
    this.cacheVector3 = new Vector3();
    this.onBeforeRender = () => {
      const light = this.target;
      const shape2 = this.shape;
      let shapeUpdate = false;
      if (light.distance !== this.cacheDistance) {
        this.cacheDistance = light.distance;
        shape2.scale.z = light.distance;
        shapeUpdate = true;
      }
      if (light.angle !== this.cacheAngle) {
        this.cacheAngle = light.angle;
        shapeUpdate = true;
      }
      if (shapeUpdate) {
        let range = light.distance * Math.tan(light.angle);
        shape2.scale.set(range, range, light.distance);
      }
      if (light.color.getHex() !== this.cacheColor) {
        shape2.material.color.copy(light.color).multiplyScalar(light.intensity);
        this.cacheColor = light.color.getHex();
      }
      shape2.lookAt(light.target.position);
    };
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;
    sphere.set(this.cacheVector3.set(0, 0, 0), 1);
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
class DirectionalLightHelper extends LineSegments {
  constructor(directionalLight) {
    super();
    __publicField(this, "sphere");
    __publicField(this, "target");
    __publicField(this, "shape");
    __publicField(this, "type", "VisDirectionalLightHelper");
    __publicField(this, "cacheColor");
    __publicField(this, "cacheVector3");
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
    const color = new Color().copy(directionalLight.color).multiplyScalar(directionalLight.intensity);
    const planeGemetry = new PlaneBufferGeometry(20, 20);
    planeGemetry.dispose();
    const shape = new LineSegments(new EdgesGeometry(planeGemetry), new LineBasicMaterial({
      color
    }));
    shape.raycast = () => {
    };
    this.shape = shape;
    this.target = directionalLight;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cacheColor = directionalLight.color.getHex();
    this.cacheVector3 = new Vector3();
    this.add(this.shape);
    this.matrixAutoUpdate = false;
    this.matrix = directionalLight.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = directionalLight.matrixWorld;
    this.onBeforeRender = () => {
      const light = this.target;
      const shape2 = this.shape;
      if (light.color.getHex() !== this.cacheColor) {
        shape2.material.color.copy(light.color).multiplyScalar(light.intensity);
        this.cacheColor = light.color.getHex();
      }
      shape2.lookAt(light.target.position);
    };
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;
    sphere.set(this.cacheVector3.set(0, 0, 0), 1);
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
const ObjectHelperPlugin = function(params = {}) {
  if (!this.scene) {
    console.error("must install some scene plugin before ObjectHelper plugin.");
    return false;
  }
  if (params.interact === void 0) {
    params.interact = true;
  }
  if (params.interact) {
    if (!this.eventManager) {
      console.warn("must install eventManager plugin that can use interact function.");
      params.interact = false;
    }
  }
  const typeHelperMap = {
    [CONFIGTYPE.POINTLIGHT]: PointLightHelper,
    [CONFIGTYPE.SPOTLIGHT]: SpotLightHelper,
    [CONFIGTYPE.DIRECTIONALLIGHT]: DirectionalLightHelper,
    [CONFIGTYPE.PERSPECTIVECAMERA]: CameraHelper,
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: CameraHelper,
    [CONFIGTYPE.MESH]: MeshHelper,
    [CONFIGTYPE.GROUP]: GroupHelper
  };
  const filterHelperMap = {
    "AmbientLight": true,
    "Object3D": true,
    "TransformControls": true
  };
  const helperMap = new Map();
  const pointerenterFunMap = new Map();
  const pointerleaveFunMap = new Map();
  const clickFunMap = new Map();
  const scene = this.scene;
  !params.activeColor && (params.activeColor = "rgb(230, 20, 240)");
  !params.hoverColor && (params.hoverColor = "rgb(255, 158, 240)");
  !params.defaultColor && (params.defaultColor = "rgb(255, 255, 255)");
  !params.selectedColor && (params.selectedColor = params.activeColor);
  const defaultColorHex = new Color(params.defaultColor).getHex();
  const activeColorHex = new Color(params.activeColor).getHex();
  const hoverColorHex = new Color(params.hoverColor).getHex();
  const selectedColorHex = new Color(params.selectedColor).getHex();
  scene.addEventListener("afterAdd", (event) => {
    const objects = event.objects;
    for (let object of objects) {
      if (filterHelperMap[object.type] || object.type.includes("Helper")) {
        continue;
      }
      if (typeHelperMap[object.type]) {
        const helper = new typeHelperMap[object.type](object);
        helper.material.color.setHex(defaultColorHex);
        helperMap.set(object, helper);
        scene.add(helper);
        if (params.interact) {
          const pointerenterFun = () => {
            if (this.transing) {
              return;
            }
            if (this.selectionBox) {
              if (this.selectionBox.has(object)) {
                return;
              }
            }
            helper.material.color.setHex(hoverColorHex);
          };
          const pointerleaveFun = () => {
            if (this.transing) {
              return;
            }
            if (this.selectionBox) {
              if (this.selectionBox.has(object)) {
                return;
              }
            }
            helper.material.color.setHex(defaultColorHex);
          };
          const clickFun = () => {
            if (this.transing) {
              return;
            }
            if (this.selectionBox) {
              if (this.selectionBox.has(object)) {
                return;
              }
            }
            helper.material.color.setHex(activeColorHex);
          };
          object.addEventListener("pointerenter", pointerenterFun);
          object.addEventListener("pointerleave", pointerleaveFun);
          object.addEventListener("click", clickFun);
          pointerenterFunMap.set(object, pointerenterFun);
          pointerleaveFunMap.set(object, pointerleaveFun);
          clickFunMap.set(object, clickFun);
        }
      } else {
        console.warn(`object helper can not support this type object: '${object.type}'`);
      }
    }
  });
  scene.addEventListener("afterRemove", (event) => {
    const objects = event.objects;
    for (let object of objects) {
      if (filterHelperMap[object.type] || object.type.includes("Helper")) {
        continue;
      }
      if (!helperMap.has(object)) {
        console.warn(`Object helper plugin can not found this object\`s helper: ${object}`);
        continue;
      }
      const helper = helperMap.get(object);
      scene.remove(helper);
      if (params.interact) {
        object.removeEventListener("pointerenter", pointerenterFunMap.get(object));
        object.removeEventListener("pointerleave", pointerleaveFunMap.get(object));
        object.removeEventListener("click", clickFunMap.get(object));
        pointerenterFunMap.delete(object);
        pointerleaveFunMap.delete(object);
        clickFunMap.delete(object);
      }
      helper.geometry && helper.geometry.dispose();
      if (helper.material) {
        if (helper.material instanceof Material) {
          helper.material.dispose();
        } else {
          helper.material.forEach((material) => {
            material.dispose();
          });
        }
      }
      helperMap.delete(object);
    }
  });
  this.setObjectHelper = function(params2) {
    if (params2.show) {
      helperMap.forEach((helper) => {
        scene.add(helper);
      });
    } else {
      helperMap.forEach((helper) => {
        scene.remove(helper);
      });
    }
    return this;
  };
  const cacheObjectsHelper = new Set();
  this.completeSet.add(() => {
    if (this.selectionBox) {
      this.addEventListener("selected", (event) => {
        cacheObjectsHelper.forEach((helper) => {
          helper.material.color.setHex(defaultColorHex);
        });
        cacheObjectsHelper.clear();
        for (let object of event.objects) {
          if (helperMap.has(object)) {
            const helper = helperMap.get(object);
            helper.material.color.setHex(selectedColorHex);
            cacheObjectsHelper.add(helper);
          }
        }
      });
    }
  });
  return true;
};
const SelectionPlugin = function(params = {}) {
  if (!this.eventManager) {
    console.warn("must install eventManager plugin before Selection plugin.");
    return false;
  }
  this.selectionBox = new Set();
  const dispatchEvent = () => {
    let objectSymbols = [];
    if (this.IS_ENGINESUPPORT) {
      this.selectionBox.forEach((object) => {
        let objectSymbol = this.compilerManager.getObjectSymbol(object);
        if (objectSymbol) {
          objectSymbols.push(objectSymbol);
        } else {
          console.warn("selection plugin can not font vid in compilerManager.", object);
        }
      });
    }
    this.dispatchEvent({
      type: "selected",
      objects: [...this.selectionBox],
      objectSymbols
    });
  };
  this.setSelectionBox = function(params2) {
    this.selectionBox.clear();
    for (let object of params2.objects) {
      this.selectionBox.add(object);
    }
    dispatchEvent();
    return this;
  };
  this.eventManager.addEventListener("click", (event) => {
    var _a, _b, _c;
    if (this.transing) {
      this.transing = false;
      return;
    }
    const intersections = event.intersections;
    if (!event.ctrlKey) {
      this.selectionBox.clear();
    }
    if (this.eventManager.penetrate) {
      for (let intersection of intersections) {
        if (event.ctrlKey) {
          if ((_a = this.selectionBox) == null ? void 0 : _a.has(intersection.object)) {
            this.selectionBox.delete(intersection.object);
            continue;
          }
        }
        this.selectionBox.add(intersection.object);
      }
    } else {
      if (intersections.length) {
        const object = intersections[0].object;
        if (event.ctrlKey) {
          if ((_b = this.selectionBox) == null ? void 0 : _b.has(object)) {
            this.selectionBox.delete(object);
            return;
          }
        }
        (_c = this.selectionBox) == null ? void 0 : _c.add(object);
      }
    }
    dispatchEvent();
  });
  return true;
};
var ENGINEPLUGIN;
(function(ENGINEPLUGIN2) {
  ENGINEPLUGIN2["WEBGLRENDERER"] = "WebGLRenderer";
  ENGINEPLUGIN2["SCENE"] = "Scene";
  ENGINEPLUGIN2["MODELINGSCENE"] = "ModelingScene";
  ENGINEPLUGIN2["RENDERMANAGER"] = "RenderManager";
  ENGINEPLUGIN2["ORBITCONTROLS"] = "OrbitControls";
  ENGINEPLUGIN2["STATS"] = "Stats";
  ENGINEPLUGIN2["EFFECTCOMPOSER"] = "EffectComposer";
  ENGINEPLUGIN2["POINTERMANAGER"] = "PointerManager";
  ENGINEPLUGIN2["EVENTMANAGER"] = "EventManager";
  ENGINEPLUGIN2["TRANSFORMCONTROLS"] = "TransformControls";
  ENGINEPLUGIN2["LOADERMANAGER"] = "LoaderManager";
  ENGINEPLUGIN2["RESOURCEMANAGER"] = "ResourceManager";
  ENGINEPLUGIN2["DATASUPPORTMANAGER"] = "DataSupportManager";
  ENGINEPLUGIN2["COMPILERMANAGER"] = "CompilerManager";
  ENGINEPLUGIN2["KEYBOARDMANAGER"] = "KeyboardManager";
  ENGINEPLUGIN2["AXESHELPER"] = "AxesHelper";
  ENGINEPLUGIN2["GRIDHELPER"] = "GridHelper";
  ENGINEPLUGIN2["VIEWPOINT"] = "Viewpoint";
  ENGINEPLUGIN2["DISPLAYMODE"] = "DisplayMode";
  ENGINEPLUGIN2["OBJECTHELPER"] = "ObjectHelper";
  ENGINEPLUGIN2["SELECTION"] = "Selection";
})(ENGINEPLUGIN || (ENGINEPLUGIN = {}));
const _Engine = class extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "completeSet");
    __publicField(this, "IS_ENGINESUPPORT", false);
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
    __publicField(this, "loaderManager");
    __publicField(this, "resourceManager");
    __publicField(this, "dataSupportManager");
    __publicField(this, "compilerManager");
    __publicField(this, "keyboardManager");
    __publicField(this, "stats");
    __publicField(this, "transing");
    __publicField(this, "displayMode");
    __publicField(this, "selectionBox");
    __publicField(this, "getScreenshot");
    __publicField(this, "setSize");
    __publicField(this, "setCamera");
    __publicField(this, "setDom");
    __publicField(this, "setStats");
    __publicField(this, "setTransformControls");
    __publicField(this, "setViewpoint");
    __publicField(this, "setDisplayMode");
    __publicField(this, "setAxesHelper");
    __publicField(this, "setGridHelper");
    __publicField(this, "setObjectHelper");
    __publicField(this, "setSelectionBox");
    __publicField(this, "loadResources");
    __publicField(this, "loadResourcesAsync");
    __publicField(this, "registerResources");
    __publicField(this, "toJSON");
    __publicField(this, "play");
    __publicField(this, "stop");
    __publicField(this, "render");
    this.completeSet = new Set();
    this.render = function() {
      console.warn("can not install some plugin");
      return this;
    };
  }
  optimizeMemory() {
    Object.keys(this).forEach((key) => {
      if (this[key] === void 0) {
        delete this[key];
      }
    });
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
    this.completeSet.clear();
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
__publicField(Engine, "pluginHandler", new Map());
__publicField(Engine, "register", function(name, handler) {
  _Engine.pluginHandler && _Engine.pluginHandler.set(name, handler);
  return _Engine;
});
__publicField(Engine, "dispose", function() {
  _Engine.pluginHandler = void 0;
});
Engine.register(ENGINEPLUGIN.WEBGLRENDERER, WebGLRendererPlugin);
Engine.register(ENGINEPLUGIN.EFFECTCOMPOSER, EffectComposerPlugin);
Engine.register(ENGINEPLUGIN.SCENE, ScenePlugin);
Engine.register(ENGINEPLUGIN.RENDERMANAGER, RenderManagerPlugin);
Engine.register(ENGINEPLUGIN.POINTERMANAGER, PointerManagerPlugin);
Engine.register(ENGINEPLUGIN.EVENTMANAGER, EventManagerPlugin);
Engine.register(ENGINEPLUGIN.LOADERMANAGER, LoaderManagerPlugin);
Engine.register(ENGINEPLUGIN.RESOURCEMANAGER, ResourceManagerPlugin);
Engine.register(ENGINEPLUGIN.DATASUPPORTMANAGER, DataSupportManagerPlugin);
Engine.register(ENGINEPLUGIN.COMPILERMANAGER, CompilerManagerPlugin);
Engine.register(ENGINEPLUGIN.KEYBOARDMANAGER, KeyboardManagerPlugin);
Engine.register(ENGINEPLUGIN.ORBITCONTROLS, OrbitControlsPlugin);
Engine.register(ENGINEPLUGIN.TRANSFORMCONTROLS, TransformControlsPlugin);
Engine.register(ENGINEPLUGIN.AXESHELPER, AxesHelperPlugin);
Engine.register(ENGINEPLUGIN.GRIDHELPER, GridHelperPlugin);
Engine.register(ENGINEPLUGIN.OBJECTHELPER, ObjectHelperPlugin);
Engine.register(ENGINEPLUGIN.DISPLAYMODE, DisplayModelPlugin);
Engine.register(ENGINEPLUGIN.VIEWPOINT, ViewpointPlugin);
Engine.register(ENGINEPLUGIN.STATS, StatsPlugin);
Engine.register(ENGINEPLUGIN.SELECTION, SelectionPlugin);
class DisplayEngine extends Engine {
  constructor() {
    super();
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(ENGINEPLUGIN.SCENE).install(ENGINEPLUGIN.RENDERMANAGER).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.ORBITCONTROLS).install(ENGINEPLUGIN.POINTERMANAGER).install(ENGINEPLUGIN.EVENTMANAGER).complete();
  }
}
class ModelingEngine extends Engine {
  constructor() {
    super();
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(ENGINEPLUGIN.SCENE).install(ENGINEPLUGIN.POINTERMANAGER).install(ENGINEPLUGIN.EVENTMANAGER).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.SELECTION).install(ENGINEPLUGIN.AXESHELPER).install(ENGINEPLUGIN.GRIDHELPER).install(ENGINEPLUGIN.OBJECTHELPER).install(ENGINEPLUGIN.VIEWPOINT).install(ENGINEPLUGIN.DISPLAYMODE).install(ENGINEPLUGIN.RENDERMANAGER).install(ENGINEPLUGIN.STATS).install(ENGINEPLUGIN.ORBITCONTROLS).install(ENGINEPLUGIN.KEYBOARDMANAGER).install(ENGINEPLUGIN.TRANSFORMCONTROLS).complete();
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
class CanvasTextureGenerator {
  constructor(parameters) {
    __publicField(this, "canvas");
    this.canvas = document.createElement("canvas");
    const devicePixelRatio = window.devicePixelRatio;
    this.canvas.width = ((parameters == null ? void 0 : parameters.width) || 512) * devicePixelRatio;
    this.canvas.height = ((parameters == null ? void 0 : parameters.height) || 512) * devicePixelRatio;
    this.canvas.style.backgroundColor = (parameters == null ? void 0 : parameters.bgColor) || "rgb(255, 255, 255)";
  }
  get() {
    return this.canvas;
  }
  draw(fun) {
    const ctx = this.canvas.getContext("2d");
    ctx == null ? void 0 : ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    if (ctx) {
      fun(ctx);
      return this;
    } else {
      console.warn(`you browser can not support canvas 2d`);
      return this;
    }
  }
  preview(parameters) {
    const canvas = this.canvas;
    canvas.style.position = "fixed";
    canvas.style.top = (parameters == null ? void 0 : parameters.top) || "5%";
    canvas.style.left = (parameters == null ? void 0 : parameters.left) || "5%";
    canvas.style.right = (parameters == null ? void 0 : parameters.right) || "unset";
    canvas.style.bottom = (parameters == null ? void 0 : parameters.bottom) || "unset";
    document.body.appendChild(this.canvas);
    return this;
  }
}
class EngineSupport extends Engine {
  constructor(parameters) {
    super();
    __publicField(this, "IS_ENGINESUPPORT", true);
    this.install(ENGINEPLUGIN.LOADERMANAGER).install(ENGINEPLUGIN.RESOURCEMANAGER).install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters).install(ENGINEPLUGIN.COMPILERMANAGER);
  }
  loadLifeCycle(config) {
    const dataSupportManager = this.dataSupportManager;
    config.texture && dataSupportManager.load({ texture: config.texture });
    config.material && dataSupportManager.load({ material: config.material });
    delete config.texture;
    delete config.material;
    dataSupportManager.load(config);
  }
  removeLifeCycle(config) {
    const dataSupportManager = this.dataSupportManager;
    const texture = config[MODULETYPE.TEXTURE] || {};
    const material = config[MODULETYPE.MATERIAL] || {};
    const assets = config.assets || [];
    delete config.texture;
    delete config.material;
    delete config.assets;
    dataSupportManager.remove(config);
    dataSupportManager.remove({ [MODULETYPE.MATERIAL]: material });
    dataSupportManager.remove({ [MODULETYPE.TEXTURE]: texture });
    const resourceManager = this.resourceManager;
    const loaderManager = this.loaderManager;
    assets.forEach((url) => {
      resourceManager.remove(url);
      loaderManager.remove(url);
    });
  }
  loadConfig(config, callback) {
    this.renderManager.stop();
    if (config.assets && config.assets.length) {
      this.loaderManager.reset().load(config.assets);
      const mappedFun = (event) => {
        delete config.assets;
        this.loadLifeCycle(config);
        this.resourceManager.removeEventListener("mapped", mappedFun);
        callback && callback(event);
        this.renderManager.play();
      };
      this.resourceManager.addEventListener("mapped", mappedFun);
    } else {
      this.loadLifeCycle(config);
      callback && callback();
      this.renderManager.play();
    }
    return this;
  }
  loadConfigAsync(config) {
    return new Promise((resolve, reject) => {
      this.renderManager.stop();
      if (config.assets && config.assets.length) {
        this.loaderManager.reset().load(config.assets);
        const mappedFun = (event) => {
          delete config.assets;
          this.loadLifeCycle(config);
          this.resourceManager.removeEventListener("mapped", mappedFun);
          this.renderManager.play();
          resolve(event);
        };
        this.resourceManager.addEventListener("mapped", mappedFun);
      } else {
        this.loadLifeCycle(config);
        this.renderManager.play();
        resolve(void 0);
      }
    });
  }
  removeConfig(config) {
    this.removeLifeCycle(config);
  }
}
class ModelingEngineSupport extends EngineSupport {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "IS_ENGINESUPPORT", true);
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(ENGINEPLUGIN.SCENE).install(ENGINEPLUGIN.POINTERMANAGER).install(ENGINEPLUGIN.EVENTMANAGER).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.SELECTION).install(ENGINEPLUGIN.AXESHELPER).install(ENGINEPLUGIN.GRIDHELPER).install(ENGINEPLUGIN.OBJECTHELPER).install(ENGINEPLUGIN.VIEWPOINT).install(ENGINEPLUGIN.DISPLAYMODE).install(ENGINEPLUGIN.RENDERMANAGER).install(ENGINEPLUGIN.STATS).install(ENGINEPLUGIN.ORBITCONTROLS).install(ENGINEPLUGIN.KEYBOARDMANAGER).install(ENGINEPLUGIN.TRANSFORMCONTROLS).complete();
  }
}
class DisplayEngineSupport extends EngineSupport {
  constructor(parameters) {
    super();
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    });
    this.install(ENGINEPLUGIN.SCENE);
    this.install(ENGINEPLUGIN.RENDERMANAGER);
    this.install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    });
    this.install(ENGINEPLUGIN.ORBITCONTROLS);
    this.install(ENGINEPLUGIN.POINTERMANAGER);
    this.install(ENGINEPLUGIN.EVENTMANAGER).complete();
  }
}
const openWindow = generateConfigFunction({
  name: "openWindow",
  desp: "\u6253\u5F00url\u6D4F\u89C8\u7A97\u53E3",
  params: {
    url: ""
  }
});
var configure$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  openWindow
});
const moveTo = generateConfigFunction({
  name: "moveTo",
  desp: "\u7269\u4F53\u79FB\u52A8\u5230",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: Easing.Quadratic.InOut
  }
});
const moveSpacing = generateConfigFunction({
  name: "moveSpacing",
  desp: "\u7269\u4F53\u79FB\u52A8\u95F4\u8DDD",
  params: {
    target: "",
    spacing: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1e3,
    timingFunction: Easing.Quadratic.InOut
  }
});
var configure = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  moveTo,
  moveSpacing
});
class SectionAction {
  constructor(parameters) {
    __publicField(this, "oldObjects");
    __publicField(this, "newObjects");
    __publicField(this, "engine");
    __publicField(this, "impact");
    this.oldObjects = parameters.oldObjects;
    this.newObjects = parameters.newObjects;
    this.engine = parameters.engine;
    this.impact = true;
    if (!this.engine.selectionBox) {
      console.warn(`section action can not make any impact.`);
      this.impact = false;
    }
  }
  next() {
    if (!this.impact) {
      return;
    }
    this.engine.setSelectionBox({
      objects: this.newObjects
    });
  }
  prev() {
    if (!this.impact) {
      return;
    }
    this.engine.setSelectionBox({
      objects: this.oldObjects
    });
  }
}
class TransformAction {
  constructor(params) {
    __publicField(this, "transfromControls");
    __publicField(this, "nextState", {
      mode: "translate",
      space: "world",
      tranform: "",
      objectMap: new Map()
    });
    __publicField(this, "prevState", {
      mode: "translate",
      space: "world",
      tranform: "",
      objectMap: new Map()
    });
    this.transfromControls = params.transformControls;
  }
  generate(status) {
    const transformControls = this.transfromControls;
    const mode = transformControls.mode;
    const tranform = mode === "rotate" ? "rotation" : mode === "translate" ? "position" : mode;
    const objectSet = transformControls.getTransObjectSet();
    const state = this[`${status}State`];
    state.mode = mode;
    state.tranform = tranform;
    state.space = transformControls.space;
    const cacheMap = state.objectMap;
    objectSet.forEach((object) => {
      cacheMap.set(object, {
        x: object[tranform].x,
        y: object[tranform].y,
        z: object[tranform].z
      });
    });
    this[status] = function() {
      const transformControls2 = this.transfromControls;
      const state2 = this[`${status}State`];
      transformControls2.mode = state2.mode;
      transformControls2.space = state2.space;
      const tranform2 = state2.tranform;
      const objects = [];
      state2.objectMap.forEach((vector3, object) => {
        object[tranform2].x = vector3.x;
        object[tranform2].y = vector3.y;
        object[tranform2].z = vector3.z;
        objects.push(object);
      });
      transformControls2.setAttach(...objects);
    };
  }
  next() {
  }
  prev() {
  }
}
var Action = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  SectionAction,
  TransformAction
});
class NBuf3 {
  constructor(ct) {
    this.top = 0;
    this.array = new Float32Array(ct);
  }
  write(v) {
    this.array[this.top++] = v.x;
    this.array[this.top++] = v.y;
    this.array[this.top++] = v.z;
  }
}
class NBuf2 {
  constructor(ct) {
    this.top = 0;
    this.array = new Float32Array(ct);
  }
  write(v) {
    this.array[this.top++] = v.x;
    this.array[this.top++] = v.y;
  }
}
class Node {
  constructor(polygons) {
    this.plane = null;
    this.front = null;
    this.back = null;
    this.polygons = [];
    if (polygons)
      this.build(polygons);
  }
  clone() {
    const node = new Node();
    node.plane = this.plane && this.plane.clone();
    node.front = this.front && this.front.clone();
    node.back = this.back && this.back.clone();
    node.polygons = this.polygons.map((p) => p.clone());
    return node;
  }
  invert() {
    for (let i = 0; i < this.polygons.length; i++)
      this.polygons[i].flip();
    this.plane && this.plane.flip();
    this.front && this.front.invert();
    this.back && this.back.invert();
    const temp = this.front;
    this.front = this.back;
    this.back = temp;
  }
  clipPolygons(polygons) {
    if (!this.plane)
      return polygons.slice();
    let front = new Array(), back = new Array();
    for (let i = 0; i < polygons.length; i++) {
      this.plane.splitPolygon(polygons[i], front, back, front, back);
    }
    if (this.front)
      front = this.front.clipPolygons(front);
    this.back ? back = this.back.clipPolygons(back) : back = [];
    return front.concat(back);
  }
  clipTo(bsp) {
    this.polygons = bsp.clipPolygons(this.polygons);
    if (this.front)
      this.front.clipTo(bsp);
    if (this.back)
      this.back.clipTo(bsp);
  }
  allPolygons() {
    let polygons = this.polygons.slice();
    if (this.front)
      polygons = polygons.concat(this.front.allPolygons());
    if (this.back)
      polygons = polygons.concat(this.back.allPolygons());
    return polygons;
  }
  build(polygons) {
    if (!polygons.length)
      return;
    if (!this.plane)
      this.plane = polygons[0].plane.clone();
    const front = [], back = [];
    for (let i = 0; i < polygons.length; i++) {
      this.plane.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
    }
    if (front.length) {
      if (!this.front)
        this.front = new Node();
      this.front.build(front);
    }
    if (back.length) {
      if (!this.back)
        this.back = new Node();
      this.back.build(back);
    }
  }
}
class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  clone() {
    return new Vector(this.x, this.y, this.z);
  }
  negate() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  }
  add(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this;
  }
  sub(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this;
  }
  times(a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
  }
  dividedBy(a) {
    this.x /= a;
    this.y /= a;
    this.z /= a;
    return this;
  }
  lerp(a, t) {
    return this.add(new Vector().copy(a).sub(this).times(t));
  }
  unit() {
    return this.dividedBy(this.length());
  }
  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }
  normalize() {
    return this.unit();
  }
  cross(b) {
    const a = this.clone();
    const ax = a.x, ay = a.y, az = a.z;
    const bx = b.x, by = b.y, bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }
  dot(b) {
    return this.x * b.x + this.y * b.y + this.z * b.z;
  }
  toVector3() {
    return new Vector3(this.x, this.y, this.z);
  }
}
class Plane {
  constructor(normal, w) {
    this.normal = normal;
    this.w = w;
    this.normal = normal;
    this.w = w;
  }
  clone() {
    return new Plane(this.normal.clone(), this.w);
  }
  flip() {
    this.normal.negate();
    this.w = -this.w;
  }
  splitPolygon(polygon, coplanarFront, coplanarBack, front, back) {
    const COPLANAR = 0;
    const FRONT = 1;
    const BACK = 2;
    const SPANNING = 3;
    let polygonType = 0;
    const types = [];
    for (let i = 0; i < polygon.vertices.length; i++) {
      const t = this.normal.dot(polygon.vertices[i].pos) - this.w;
      const type = t < -Plane.EPSILON ? BACK : t > Plane.EPSILON ? FRONT : COPLANAR;
      polygonType |= type;
      types.push(type);
    }
    switch (polygonType) {
      case COPLANAR:
        (this.normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
        break;
      case FRONT:
        front.push(polygon);
        break;
      case BACK:
        back.push(polygon);
        break;
      case SPANNING: {
        const f = [], b = [];
        for (let i = 0; i < polygon.vertices.length; i++) {
          const j = (i + 1) % polygon.vertices.length;
          const ti = types[i], tj = types[j];
          const vi = polygon.vertices[i], vj = polygon.vertices[j];
          if (ti != BACK)
            f.push(vi);
          if (ti != FRONT)
            b.push(ti != BACK ? vi.clone() : vi);
          if ((ti | tj) == SPANNING) {
            const t = (this.w - this.normal.dot(vi.pos)) / this.normal.dot(new Vector().copy(vj.pos).sub(vi.pos));
            const v = vi.interpolate(vj, t);
            f.push(v);
            b.push(v.clone());
          }
        }
        if (f.length >= 3)
          front.push(new Polygon(f, polygon.shared));
        if (b.length >= 3)
          back.push(new Polygon(b, polygon.shared));
        break;
      }
    }
  }
  static fromPoints(a, b, c) {
    const n = new Vector().copy(b).sub(a).cross(new Vector().copy(c).sub(a)).normalize();
    return new Plane(n.clone(), n.dot(a));
  }
}
Plane.EPSILON = 1e-5;
class Polygon {
  constructor(vertices, shared) {
    this.vertices = vertices;
    this.shared = shared;
    this.plane = Plane.fromPoints(vertices[0].pos, vertices[1].pos, vertices[2].pos);
  }
  clone() {
    return new Polygon(this.vertices.map((v) => v.clone()), this.shared);
  }
  flip() {
    this.vertices.reverse().map((v) => v.flip());
    this.plane.flip();
  }
}
class Vertex {
  constructor(pos, normal, uv, color) {
    this.pos = new Vector().copy(pos);
    this.normal = new Vector().copy(normal);
    this.uv = new Vector().copy(uv);
    this.uv.z = 0;
    color && (this.color = new Vector().copy(color));
  }
  clone() {
    return new Vertex(this.pos, this.normal, this.uv, this.color);
  }
  flip() {
    this.normal.negate();
  }
  interpolate(other, t) {
    return new Vertex(this.pos.clone().lerp(other.pos, t), this.normal.clone().lerp(other.normal, t), this.uv.clone().lerp(other.uv, t), this.color && other.color && this.color.clone().lerp(other.color, t));
  }
}
class CSG {
  constructor() {
    this.polygons = new Array();
  }
  static fromPolygons(polygons) {
    const csg = new CSG();
    csg.polygons = polygons;
    return csg;
  }
  static fromGeometry(geom, objectIndex) {
    let polys = [];
    const posattr = geom.attributes.position;
    const normalattr = geom.attributes.normal;
    const uvattr = geom.attributes.uv;
    const colorattr = geom.attributes.color;
    const grps = geom.groups;
    let index;
    if (geom.index) {
      index = geom.index.array;
    } else {
      index = new Array(posattr.array.length / posattr.itemSize | 0);
      for (let i = 0; i < index.length; i++)
        index[i] = i;
    }
    const triCount = index.length / 3 | 0;
    polys = new Array(triCount);
    for (let i = 0, pli = 0, l = index.length; i < l; i += 3, pli++) {
      const vertices = new Array(3);
      for (let j = 0; j < 3; j++) {
        const vi = index[i + j];
        const vp = vi * 3;
        const vt = vi * 2;
        const x = posattr.array[vp];
        const y = posattr.array[vp + 1];
        const z = posattr.array[vp + 2];
        const nx = normalattr.array[vp];
        const ny = normalattr.array[vp + 1];
        const nz = normalattr.array[vp + 2];
        const u = uvattr === null || uvattr === void 0 ? void 0 : uvattr.array[vt];
        const v = uvattr === null || uvattr === void 0 ? void 0 : uvattr.array[vt + 1];
        vertices[j] = new Vertex(new Vector(x, y, z), new Vector(nx, ny, nz), new Vector(u, v, 0), colorattr && new Vector(colorattr.array[vt], colorattr.array[vt + 1], colorattr.array[vt + 2]));
      }
      if (objectIndex === void 0 && grps && grps.length > 0) {
        for (const grp of grps) {
          if (index[i] >= grp.start && index[i] < grp.start + grp.count) {
            polys[pli] = new Polygon(vertices, grp.materialIndex);
          }
        }
      } else {
        polys[pli] = new Polygon(vertices, objectIndex);
      }
    }
    return CSG.fromPolygons(polys.filter((p) => !isNaN(p.plane.normal.x)));
  }
  static toGeometry(csg, toMatrix) {
    let triCount = 0;
    const ps = csg.polygons;
    for (const p of ps) {
      triCount += p.vertices.length - 2;
    }
    const geom = new BufferGeometry();
    const vertices = new NBuf3(triCount * 3 * 3);
    const normals = new NBuf3(triCount * 3 * 3);
    const uvs = new NBuf2(triCount * 2 * 3);
    let colors;
    const grps = [];
    const dgrp = [];
    for (const p of ps) {
      const pvs = p.vertices;
      const pvlen = pvs.length;
      if (p.shared !== void 0) {
        if (!grps[p.shared])
          grps[p.shared] = [];
      }
      if (pvlen && pvs[0].color !== void 0) {
        if (!colors)
          colors = new NBuf3(triCount * 3 * 3);
      }
      for (let j = 3; j <= pvlen; j++) {
        const grp = p.shared === void 0 ? dgrp : grps[p.shared];
        grp.push(vertices.top / 3, vertices.top / 3 + 1, vertices.top / 3 + 2);
        vertices.write(pvs[0].pos);
        vertices.write(pvs[j - 2].pos);
        vertices.write(pvs[j - 1].pos);
        normals.write(pvs[0].normal);
        normals.write(pvs[j - 2].normal);
        normals.write(pvs[j - 1].normal);
        if (uvs) {
          uvs.write(pvs[0].uv);
          uvs.write(pvs[j - 2].uv);
          uvs.write(pvs[j - 1].uv);
        }
        if (colors) {
          colors.write(pvs[0].color);
          colors.write(pvs[j - 2].color);
          colors.write(pvs[j - 1].color);
        }
      }
    }
    geom.setAttribute("position", new BufferAttribute(vertices.array, 3));
    geom.setAttribute("normal", new BufferAttribute(normals.array, 3));
    uvs && geom.setAttribute("uv", new BufferAttribute(uvs.array, 2));
    colors && geom.setAttribute("color", new BufferAttribute(colors.array, 3));
    for (let gi = 0; gi < grps.length; gi++) {
      if (grps[gi] === void 0) {
        grps[gi] = [];
      }
    }
    if (grps.length) {
      let index = [];
      let gbase = 0;
      for (let gi = 0; gi < grps.length; gi++) {
        geom.addGroup(gbase, grps[gi].length, gi);
        gbase += grps[gi].length;
        index = index.concat(grps[gi]);
      }
      geom.addGroup(gbase, dgrp.length, grps.length);
      index = index.concat(dgrp);
      geom.setIndex(index);
    }
    const inv = new Matrix4().copy(toMatrix).invert();
    geom.applyMatrix4(inv);
    geom.computeBoundingSphere();
    geom.computeBoundingBox();
    return geom;
  }
  static fromMesh(mesh, objectIndex) {
    const csg = CSG.fromGeometry(mesh.geometry, objectIndex);
    const ttvv0 = new Vector3();
    const tmpm3 = new Matrix3();
    tmpm3.getNormalMatrix(mesh.matrix);
    for (let i = 0; i < csg.polygons.length; i++) {
      const p = csg.polygons[i];
      for (let j = 0; j < p.vertices.length; j++) {
        const v = p.vertices[j];
        v.pos.copy(ttvv0.copy(v.pos.toVector3()).applyMatrix4(mesh.matrix));
        v.normal.copy(ttvv0.copy(v.normal.toVector3()).applyMatrix3(tmpm3));
      }
    }
    return csg;
  }
  static toMesh(csg, toMatrix, toMaterial) {
    const geom = CSG.toGeometry(csg, toMatrix);
    const m = new Mesh(geom, toMaterial);
    m.matrix.copy(toMatrix);
    m.matrix.decompose(m.position, m.quaternion, m.scale);
    m.rotation.setFromQuaternion(m.quaternion);
    m.updateMatrixWorld();
    m.castShadow = m.receiveShadow = true;
    return m;
  }
  static union(meshA, meshB) {
    const csgA = CSG.fromMesh(meshA);
    const csgB = CSG.fromMesh(meshB);
    return CSG.toMesh(csgA.union(csgB), meshA.matrix, meshA.material);
  }
  static subtract(meshA, meshB) {
    const csgA = CSG.fromMesh(meshA);
    const csgB = CSG.fromMesh(meshB);
    return CSG.toMesh(csgA.subtract(csgB), meshA.matrix, meshA.material);
  }
  static intersect(meshA, meshB) {
    const csgA = CSG.fromMesh(meshA);
    const csgB = CSG.fromMesh(meshB);
    return CSG.toMesh(csgA.intersect(csgB), meshA.matrix, meshA.material);
  }
  clone() {
    const csg = new CSG();
    csg.polygons = this.polygons.map((p) => p.clone()).filter((p) => Number.isFinite(p.plane.w));
    return csg;
  }
  toPolygons() {
    return this.polygons;
  }
  union(csg) {
    const a = new Node(this.clone().polygons);
    const b = new Node(csg.clone().polygons);
    a.clipTo(b);
    b.clipTo(a);
    b.invert();
    b.clipTo(a);
    b.invert();
    a.build(b.allPolygons());
    return CSG.fromPolygons(a.allPolygons());
  }
  subtract(csg) {
    const a = new Node(this.clone().polygons);
    const b = new Node(csg.clone().polygons);
    a.invert();
    a.clipTo(b);
    b.clipTo(a);
    b.invert();
    b.clipTo(a);
    b.invert();
    a.build(b.allPolygons());
    a.invert();
    return CSG.fromPolygons(a.allPolygons());
  }
  intersect(csg) {
    const a = new Node(this.clone().polygons);
    const b = new Node(csg.clone().polygons);
    a.invert();
    b.clipTo(a);
    b.invert();
    a.clipTo(b);
    b.clipTo(a);
    a.build(b.allPolygons());
    a.invert();
    return CSG.fromPolygons(a.allPolygons());
  }
  inverse() {
    const csg = this.clone();
    for (const p of csg.polygons) {
      p.flip();
    }
    return csg;
  }
  toMesh(toMatrix, toMaterial) {
    return CSG.toMesh(this, toMatrix, toMaterial);
  }
  toGeometry(toMatrix) {
    return CSG.toGeometry(this, toMatrix);
  }
}
class Modifier {
  constructor(parameters) {
    __publicField(this, "visible", true);
    this.visible = parameters.visible !== void 0 ? parameters.visible : true;
  }
}
class BooleanModifier extends Modifier {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "source");
    __publicField(this, "target");
    __publicField(this, "mode");
    __publicField(this, "cacheSourceMatrix");
    __publicField(this, "cacheTargetMatrix");
    __publicField(this, "cacheSoruceGeometryUuid");
    __publicField(this, "cacheTargetGeometryUuid");
    __publicField(this, "originalGeometry");
    __publicField(this, "modifiedGeometry");
    this.source = parameters.source;
    this.target = parameters.target;
    this.mode = parameters.mode || "subtract";
    this.cacheSourceMatrix = this.source.matrix.clone();
    this.cacheTargetMatrix = this.target.matrix.clone();
    this.cacheSoruceGeometryUuid = this.source.geometry.uuid;
    this.cacheTargetGeometryUuid = this.target.geometry.uuid;
    this.originalGeometry = this.source.geometry;
    this.modifiedGeometry = new BufferGeometry();
    this.modify();
    this.source.geometry = this.modifiedGeometry;
  }
  async modify() {
    const source = this.source;
    const likeMesh = {
      geometry: this.originalGeometry,
      matrix: this.source.matrix
    };
    const csgSource = CSG.fromMesh(likeMesh);
    const csgTarget = CSG.fromMesh(this.target);
    const csgGeometry = CSG.toGeometry(csgSource[this.mode](csgTarget), source.matrix);
    this.modifiedGeometry.copy(csgGeometry);
    this.modifiedGeometry.uuid = csgGeometry.uuid;
  }
  render() {
    if (this.visible) {
      if (!this.cacheSourceMatrix.equals(this.source.matrix)) {
        this.modify();
        this.cacheSourceMatrix.copy(this.source.matrix);
        return;
      }
      if (!this.cacheTargetMatrix.equals(this.target.matrix)) {
        this.modify();
        this.cacheTargetMatrix.copy(this.target.matrix);
        return;
      }
      if (this.originalGeometry.uuid !== this.cacheSoruceGeometryUuid) {
        this.modify();
        this.cacheSoruceGeometryUuid = this.originalGeometry.uuid;
        return;
      }
      if (this.target.geometry.uuid !== this.cacheTargetGeometryUuid) {
        this.modify();
        this.cacheTargetGeometryUuid = this.target.geometry.uuid;
        return;
      }
    } else {
      this.modifiedGeometry.copy(this.originalGeometry);
    }
  }
  use() {
    this.originalGeometry.copy(this.modifiedGeometry);
    this.originalGeometry.uuid = this.modifiedGeometry.uuid;
    this.source.geometry = this.originalGeometry;
  }
  dispose() {
    this.source.geometry = this.originalGeometry;
    this.modifiedGeometry.dispose();
  }
}
class History {
  constructor(step) {
    __publicField(this, "actionList", []);
    __publicField(this, "index", -1);
    __publicField(this, "step", 50);
    this.step = step || 50;
  }
  do(command) {
    this.actionList[this.index][command]();
  }
  apply(action, exec = false) {
    const actionList = this.actionList;
    if (this.index === actionList.length - 1 && actionList.length >= this.step) {
      actionList.shift();
      this.index = this.actionList.length - 1;
    } else if (this.index !== -1) {
      actionList.splice(this.index + 1, actionList.length - 1);
    } else if (this.index === -1) {
      this.actionList = [];
    }
    this.actionList.push(action);
    if (exec) {
      this.redo();
    } else {
      this.index += 1;
    }
  }
  redo() {
    this.index += 1;
    if (this.index > this.actionList.length - 1) {
      this.index = this.actionList.length - 1;
      return;
    }
    this.do("next");
  }
  undo() {
    if (this.index < 0) {
      return;
    }
    this.do("prev");
    this.index -= 1;
  }
  clear() {
    this.actionList = [];
  }
}
if (!window.__THREE__) {
  console.error(`vis-three dependent on three.js module, pleace run 'npm i three' first.`);
}
export { Action as ActionLibrary, configure$1 as BasicEventLibrary, BooleanModifier, CONFIGTYPE, CameraDataSupport, CameraHelper, CanvasTextureGenerator, ControlsDataSupport, DISPLAYMODE, DataSupportManager, DirectionalLightHelper, DisplayEngine, DisplayEngineSupport, ENGINEPLUGIN, EVENTTYPE, Engine, EngineSupport, GeometryDataSupport, GroupHelper, History, JSONHandler, LightDataSupport, LineDataSupport, LoaderManager, MODULETYPE, MaterialDataSupport, MaterialDisplayer, MeshDataSupport, ModelingEngine, ModelingEngineSupport, OBJECTEVENT, PointLightHelper, PointsDataSupport, RESOURCEEVENTTYPE, configure as RealTimeAnimateLibrary, RendererDataSupport, ResourceManager, SceneDataSupport, SpotLightHelper, SpriteDataSupport, SupportDataGenerator, TextureDataSupport, TextureDisplayer, VIEWPOINT, VideoLoader, generateConfig };
