var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Clock, Vector3 as Vector3$1, MOUSE, TOUCH, PerspectiveCamera, Quaternion as Quaternion$1, Spherical, Vector2 as Vector2$1, OrthographicCamera, WebGLRenderTarget, RGBAFormat, WebGLMultisampleRenderTarget, Raycaster, Object3D, WebGLRenderer, Color, Loader, FileLoader, Group as Group$1, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Material, PointsMaterial, MeshPhongMaterial, LineSegments, Points, Mesh, LoaderUtils, FrontSide, RepeatWrapping, DefaultLoadingManager, TextureLoader, sRGBEncoding, Cache, ImageLoader, UVMapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, LinearEncoding, CubeReflectionMapping, OneMinusSrcAlphaFactor, AddEquation, NormalBlending, SrcAlphaFactor, MultiplyOperation, TangentSpaceNormalMap, PCFShadowMap, NoToneMapping, Matrix4 as Matrix4$1, Euler, Box3 as Box3$1, PlaneBufferGeometry, CurvePath, LineCurve3, CatmullRomCurve3, CubicBezierCurve3, QuadraticBezierCurve3, TubeGeometry, BoxBufferGeometry, SphereBufferGeometry, CircleBufferGeometry, ConeBufferGeometry, CylinderBufferGeometry, EdgesGeometry, PointLight, SpotLight, AmbientLight, DirectionalLight, Line, MeshBasicMaterial, MeshStandardMaterial, SpriteMaterial, ShaderMaterial, Texture, DodecahedronBufferGeometry, Fog, FogExp2, Scene, Sprite, RGBFormat, CubeTexture, CanvasTexture, AxesHelper, GridHelper, MeshLambertMaterial, Light, CameraHelper as CameraHelper$1, Sphere as Sphere$1, OctahedronBufferGeometry, Camera, PCFSoftShadowMap, BufferAttribute, Matrix3 as Matrix3$1 } from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
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
class RenderManager extends EventDispatcher {
  constructor(fps = 0) {
    super();
    __publicField(this, "clock", new Clock());
    __publicField(this, "animationFrame", -1);
    __publicField(this, "fps", 0);
    __publicField(this, "timer", null);
    __publicField(this, "playFun", () => {
    });
    __publicField(this, "render", () => {
      this.dispatchEvent({
        type: "render",
        delta: this.clock.getDelta(),
        total: this.clock.getElapsedTime()
      });
    });
    __publicField(this, "play", () => {
      if (this.hasRendering()) {
        console.warn(`render manager is rendering.`);
        return;
      }
      this.dispatchEvent({
        type: "play"
      });
      this.playFun();
    });
    __publicField(this, "stop", () => {
      if (this.animationFrame !== -1) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = -1;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.dispatchEvent({
        type: "stop"
      });
    });
    __publicField(this, "hasRendering", () => {
      return Boolean(this.animationFrame !== -1 || this.timer);
    });
    __publicField(this, "hasVaildRender", () => {
      return this.useful();
    });
    this.setFPS(fps);
  }
  setFPS(fps) {
    if (this.animationFrame !== -1) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.fps = fps;
    if (fps <= 0) {
      this.fps = 0;
      this.playFun = () => {
        this.render();
        this.animationFrame = requestAnimationFrame(this.playFun);
      };
    } else {
      this.playFun = () => {
        this.timer = setTimeout(() => {
          this.playFun();
        }, fps);
        this.render();
      };
    }
    this.playFun();
    return this;
  }
  dispose() {
    if (this.hasRendering()) {
      this.stop();
    }
    this.clear();
  }
}
const RenderManagerPlugin = function() {
  if (this.renderManager) {
    console.warn("has installed render manager plugin.");
    return false;
  }
  this.renderManager = new RenderManager();
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
  this.addEventListener("dispose", () => {
    this.renderManager.dispose();
  });
  return true;
};
class VisOrbitControls extends EventDispatcher {
  constructor(object, domElement) {
    super();
    __publicField(this, "object");
    __publicField(this, "domElement");
    __publicField(this, "enabled", true);
    __publicField(this, "target", new Vector3$1());
    __publicField(this, "minDistance", 0);
    __publicField(this, "maxDistance", Infinity);
    __publicField(this, "minZoom", 0);
    __publicField(this, "maxZoom", Infinity);
    __publicField(this, "minPolarAngle", 0);
    __publicField(this, "maxPolarAngle", Math.PI);
    __publicField(this, "minAzimuthAngle", -Infinity);
    __publicField(this, "maxAzimuthAngle", Infinity);
    __publicField(this, "enableDamping", false);
    __publicField(this, "dampingFactor", 0.05);
    __publicField(this, "enableZoom", true);
    __publicField(this, "zoomSpeed", 1);
    __publicField(this, "enableRotate", true);
    __publicField(this, "rotateSpeed", 1);
    __publicField(this, "enablePan", true);
    __publicField(this, "panSpeed", 1);
    __publicField(this, "screenSpacePanning", true);
    __publicField(this, "keyPanSpeed", 7);
    __publicField(this, "autoRotate", false);
    __publicField(this, "autoRotateSpeed", 2);
    __publicField(this, "keys", {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    });
    __publicField(this, "mouseButtons", {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    });
    __publicField(this, "touches", { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN });
    __publicField(this, "target0");
    __publicField(this, "position0");
    __publicField(this, "zoom0");
    __publicField(this, "_domElementKeyEvents", null);
    __publicField(this, "spherical");
    __publicField(this, "reset");
    __publicField(this, "update");
    __publicField(this, "onContextMenu");
    __publicField(this, "onPointerDown");
    __publicField(this, "onPointerCancel");
    __publicField(this, "onMouseWheel");
    __publicField(this, "onPointerMove");
    __publicField(this, "onPointerUp");
    __publicField(this, "onKeyDown");
    this.object = object || new PerspectiveCamera();
    this.domElement = domElement || document.createElement("div");
    this.domElement.style.touchAction = "none";
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.update = (() => {
      const offset = new Vector3$1();
      const quat = new Quaternion$1().setFromUnitVectors(this.object.up, new Vector3$1(0, 1, 0));
      const quatInverse = quat.clone().invert();
      const lastPosition = new Vector3$1();
      const lastQuaternion = new Quaternion$1();
      const twoPI = 2 * Math.PI;
      return () => {
        const position = this.object.position;
        offset.copy(position).sub(this.target);
        offset.applyQuaternion(quat);
        spherical.setFromVector3(offset);
        if (this.autoRotate && state === STATE.NONE) {
          rotateLeft(getAutoRotationAngle());
        }
        if (this.enableDamping) {
          spherical.theta += sphericalDelta.theta * this.dampingFactor;
          spherical.phi += sphericalDelta.phi * this.dampingFactor;
        } else {
          spherical.theta += sphericalDelta.theta;
          spherical.phi += sphericalDelta.phi;
        }
        let min = this.minAzimuthAngle;
        let max = this.maxAzimuthAngle;
        if (isFinite(min) && isFinite(max)) {
          if (min < -Math.PI)
            min += twoPI;
          else if (min > Math.PI)
            min -= twoPI;
          if (max < -Math.PI)
            max += twoPI;
          else if (max > Math.PI)
            max -= twoPI;
          if (min <= max) {
            spherical.theta = Math.max(min, Math.min(max, spherical.theta));
          } else {
            spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
          }
        }
        spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, spherical.phi));
        spherical.makeSafe();
        spherical.radius *= scale;
        spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, spherical.radius));
        if (this.enableDamping === true) {
          this.target.addScaledVector(panOffset, this.dampingFactor);
        } else {
          this.target.add(panOffset);
        }
        offset.setFromSpherical(spherical);
        offset.applyQuaternion(quatInverse);
        position.copy(this.target).add(offset);
        this.object.lookAt(this.target);
        if (this.enableDamping === true) {
          sphericalDelta.theta *= 1 - this.dampingFactor;
          sphericalDelta.phi *= 1 - this.dampingFactor;
          panOffset.multiplyScalar(1 - this.dampingFactor);
        } else {
          sphericalDelta.set(0, 0, 0);
          panOffset.set(0, 0, 0);
        }
        scale = 1;
        if (zoomChanged || lastPosition.distanceToSquared(this.object.position) > EPS || 8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS) {
          this.dispatchEvent({ type: "change" });
          lastPosition.copy(this.object.position);
          lastQuaternion.copy(this.object.quaternion);
          zoomChanged = false;
          return true;
        }
        return false;
      };
    })();
    const STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let state = STATE.NONE;
    const EPS = 1e-6;
    const spherical = new Spherical();
    const sphericalDelta = new Spherical();
    let scale = 1;
    const panOffset = new Vector3$1();
    let zoomChanged = false;
    const rotateStart = new Vector2$1();
    const rotateEnd = new Vector2$1();
    const rotateDelta = new Vector2$1();
    const panStart = new Vector2$1();
    const panEnd = new Vector2$1();
    const panDelta = new Vector2$1();
    const dollyStart = new Vector2$1();
    const dollyEnd = new Vector2$1();
    const dollyDelta = new Vector2$1();
    const pointers = [];
    const pointerPositions = {};
    const getAutoRotationAngle = () => {
      return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
    };
    const getZoomScale = () => {
      return Math.pow(0.95, this.zoomSpeed);
    };
    const rotateLeft = (angle) => {
      sphericalDelta.theta -= angle;
    };
    const rotateUp = (angle) => {
      sphericalDelta.phi -= angle;
    };
    const panLeft = function() {
      const v = new Vector3$1();
      return function panLeft2(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0);
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    }();
    const panUp = (() => {
      const v = new Vector3$1();
      return (distance, objectMatrix) => {
        if (this.screenSpacePanning === true) {
          v.setFromMatrixColumn(objectMatrix, 1);
        } else {
          v.setFromMatrixColumn(objectMatrix, 0);
          v.crossVectors(this.object.up, v);
        }
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    })();
    const pan = (() => {
      const offset = new Vector3$1();
      return (deltaX, deltaY) => {
        const element = this.domElement;
        if (this.object instanceof PerspectiveCamera) {
          const position = this.object.position;
          offset.copy(position).sub(this.target);
          let targetDistance = offset.length();
          targetDistance *= Math.tan(this.object.fov / 2 * Math.PI / 180);
          panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
        } else if (this.object instanceof OrthographicCamera) {
          panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
          panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
        } else {
          console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
          this.enablePan = false;
        }
      };
    })();
    const dollyOut = (dollyScale) => {
      if (this.object instanceof PerspectiveCamera) {
        scale /= dollyScale;
      } else if (this.object instanceof OrthographicCamera) {
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
        this.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        this.enableZoom = false;
      }
    };
    const dollyIn = (dollyScale) => {
      if (this.object instanceof PerspectiveCamera) {
        scale *= dollyScale;
      } else if (this.object instanceof OrthographicCamera) {
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
        this.object.updateProjectionMatrix();
        zoomChanged = true;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        this.enableZoom = false;
      }
    };
    function handleMouseDownRotate(event) {
      rotateStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownDolly(event) {
      dollyStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownPan(event) {
      panStart.set(event.clientX, event.clientY);
    }
    const handleMouseMoveRotate = (event) => {
      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(this.rotateSpeed);
      const element = this.domElement;
      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      rotateStart.copy(rotateEnd);
      this.update();
    };
    const handleMouseMoveDolly = (event) => {
      dollyEnd.set(event.clientX, event.clientY);
      dollyDelta.subVectors(dollyEnd, dollyStart);
      if (dollyDelta.y > 0) {
        dollyOut(getZoomScale());
      } else if (dollyDelta.y < 0) {
        dollyIn(getZoomScale());
      }
      dollyStart.copy(dollyEnd);
      this.update();
    };
    const handleMouseMovePan = (event) => {
      panEnd.set(event.clientX, event.clientY);
      panDelta.subVectors(panEnd, panStart).multiplyScalar(this.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
      this.update();
    };
    const handleMouseWheel = (event) => {
      if (event.deltaY < 0) {
        dollyIn(getZoomScale());
      } else if (event.deltaY > 0) {
        dollyOut(getZoomScale());
      }
      this.update();
    };
    const handleKeyDown = (event) => {
      let needsUpdate = false;
      switch (event.code) {
        case this.keys.UP:
          pan(0, this.keyPanSpeed);
          needsUpdate = true;
          break;
        case this.keys.BOTTOM:
          pan(0, -this.keyPanSpeed);
          needsUpdate = true;
          break;
        case this.keys.LEFT:
          pan(this.keyPanSpeed, 0);
          needsUpdate = true;
          break;
        case this.keys.RIGHT:
          pan(-this.keyPanSpeed, 0);
          needsUpdate = true;
          break;
      }
      if (needsUpdate) {
        event.preventDefault();
        this.update();
      }
    };
    function handleTouchStartRotate() {
      if (pointers.length === 1) {
        rotateStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        rotateStart.set(x, y);
      }
    }
    function handleTouchStartPan() {
      if (pointers.length === 1) {
        panStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        panStart.set(x, y);
      }
    }
    function handleTouchStartDolly() {
      const dx = pointers[0].pageX - pointers[1].pageX;
      const dy = pointers[0].pageY - pointers[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }
    const handleTouchStartDollyPan = () => {
      if (this.enableZoom)
        handleTouchStartDolly();
      if (this.enablePan)
        handleTouchStartPan();
    };
    const handleTouchStartDollyRotate = () => {
      if (this.enableZoom)
        handleTouchStartDolly();
      if (this.enableRotate)
        handleTouchStartRotate();
    };
    const handleTouchMoveRotate = (event) => {
      if (pointers.length == 1) {
        rotateEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        rotateEnd.set(x, y);
      }
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(this.rotateSpeed);
      const element = this.domElement;
      rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      rotateStart.copy(rotateEnd);
    };
    const handleTouchMovePan = (event) => {
      if (pointers.length === 1) {
        panEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        panEnd.set(x, y);
      }
      panDelta.subVectors(panEnd, panStart).multiplyScalar(this.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
    };
    const handleTouchMoveDolly = (event) => {
      const position = getSecondPointerPosition(event);
      const dx = event.pageX - position.x;
      const dy = event.pageY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyEnd.set(0, distance);
      dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, this.zoomSpeed));
      dollyOut(dollyDelta.y);
      dollyStart.copy(dollyEnd);
    };
    const handleTouchMoveDollyPan = (event) => {
      if (this.enableZoom)
        handleTouchMoveDolly(event);
      if (this.enablePan)
        handleTouchMovePan(event);
    };
    const handleTouchMoveDollyRotate = (event) => {
      if (this.enableZoom)
        handleTouchMoveDolly(event);
      if (this.enableRotate)
        handleTouchMoveRotate(event);
    };
    this.onPointerDown = (event) => {
      if (this.enabled === false)
        return;
      if (pointers.length === 0) {
        this.domElement.addEventListener("pointermove", this.onPointerMove);
        this.domElement.addEventListener("pointerup", this.onPointerUp);
      }
      addPointer(event);
      if (event.pointerType === "touch") {
        onTouchStart(event);
      } else {
        onMouseDown(event);
      }
    };
    let pointerLock = false;
    this.onPointerMove = (event) => {
      if (this.enabled === false)
        return;
      if (!pointerLock) {
        this.domElement.setPointerCapture(event.pointerId);
        pointerLock = true;
      }
      if (event.pointerType === "touch") {
        onTouchMove(event);
      } else {
        onMouseMove(event);
      }
    };
    this.onPointerUp = (event) => {
      if (this.enabled === false)
        return;
      pointerLock = false;
      if (event.pointerType === "touch") {
        onTouchEnd();
      } else {
        onMouseUp(event);
      }
      removePointer(event);
      if (pointers.length === 0) {
        this.domElement.releasePointerCapture(event.pointerId);
        this.domElement.removeEventListener("pointermove", this.onPointerMove);
        this.domElement.removeEventListener("pointerup", this.onPointerUp);
      }
    };
    this.onPointerCancel = (event) => {
      removePointer(event);
    };
    const onMouseDown = (event) => {
      let mouseAction;
      switch (event.button) {
        case 0:
          mouseAction = this.mouseButtons.LEFT;
          break;
        case 1:
          mouseAction = this.mouseButtons.MIDDLE;
          break;
        case 2:
          mouseAction = this.mouseButtons.RIGHT;
          break;
        default:
          mouseAction = -1;
      }
      switch (mouseAction) {
        case MOUSE.DOLLY:
          if (this.enableZoom === false)
            return;
          handleMouseDownDolly(event);
          state = STATE.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (this.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          } else {
            if (this.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (this.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          } else {
            if (this.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        this.dispatchEvent({ type: "start" });
      }
    };
    const onMouseMove = (event) => {
      if (this.enabled === false)
        return;
      switch (state) {
        case STATE.ROTATE:
          if (this.enableRotate === false)
            return;
          handleMouseMoveRotate(event);
          break;
        case STATE.DOLLY:
          if (this.enableZoom === false)
            return;
          handleMouseMoveDolly(event);
          break;
        case STATE.PAN:
          if (this.enablePan === false)
            return;
          handleMouseMovePan(event);
          break;
      }
    };
    const onMouseUp = (event) => {
      this.dispatchEvent({ type: "end" });
      state = STATE.NONE;
    };
    this.onMouseWheel = (event) => {
      if (this.enabled === false || this.enableZoom === false || state !== STATE.NONE)
        return;
      event.preventDefault();
      this.dispatchEvent({ type: "start" });
      handleMouseWheel(event);
      this.dispatchEvent({ type: "end" });
    };
    this.onKeyDown = (event) => {
      if (this.enabled === false || this.enablePan === false)
        return;
      handleKeyDown(event);
    };
    const onTouchStart = (event) => {
      trackPointer(event);
      switch (pointers.length) {
        case 1:
          switch (this.touches.ONE) {
            case TOUCH.ROTATE:
              if (this.enableRotate === false)
                return;
              handleTouchStartRotate();
              state = STATE.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (this.enablePan === false)
                return;
              handleTouchStartPan();
              state = STATE.TOUCH_PAN;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        case 2:
          switch (this.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (this.enableZoom === false && this.enablePan === false)
                return;
              handleTouchStartDollyPan();
              state = STATE.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (this.enableZoom === false && this.enableRotate === false)
                return;
              handleTouchStartDollyRotate();
              state = STATE.TOUCH_DOLLY_ROTATE;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        this.dispatchEvent({ type: "start" });
      }
    };
    const onTouchMove = (event) => {
      trackPointer(event);
      switch (state) {
        case STATE.TOUCH_ROTATE:
          if (this.enableRotate === false)
            return;
          handleTouchMoveRotate(event);
          this.update();
          break;
        case STATE.TOUCH_PAN:
          if (this.enablePan === false)
            return;
          handleTouchMovePan(event);
          this.update();
          break;
        case STATE.TOUCH_DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false)
            return;
          handleTouchMoveDollyPan(event);
          this.update();
          break;
        case STATE.TOUCH_DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false)
            return;
          handleTouchMoveDollyRotate(event);
          this.update();
          break;
        default:
          state = STATE.NONE;
      }
    };
    const onTouchEnd = (event) => {
      this.dispatchEvent({ type: "end" });
      state = STATE.NONE;
    };
    this.onContextMenu = (event) => {
      if (this.enabled === false)
        return;
      event.preventDefault();
    };
    function addPointer(event) {
      pointers.push(event);
    }
    const removePointer = (event) => {
      delete pointerPositions[event.pointerId];
      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].pointerId == event.pointerId) {
          pointers.splice(i, 1);
          return;
        }
      }
    };
    function trackPointer(event) {
      let position = pointerPositions[event.pointerId];
      if (position === void 0) {
        position = new Vector2$1();
        pointerPositions[event.pointerId] = position;
      }
      position.set(event.pageX, event.pageY);
    }
    function getSecondPointerPosition(event) {
      const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
      return pointerPositions[pointer.pointerId];
    }
    this.spherical = spherical;
    this.domElement.addEventListener("contextmenu", this.onContextMenu);
    this.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.domElement.addEventListener("pointercancel", this.onPointerCancel);
    this.domElement.addEventListener("wheel", this.onMouseWheel, {
      passive: false
    });
    this.reset = () => {
      this.target.copy(this.target0);
      this.object.position.copy(this.position0);
      this.object.zoom = this.zoom0;
      this.object.updateProjectionMatrix();
      this.dispatchEvent({ type: "change" });
      this.update();
      state = STATE.NONE;
    };
    this.update();
  }
  getPolarAngle() {
    return this.spherical.phi;
  }
  getAzimuthalAngle() {
    return this.spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(domElement) {
    domElement.addEventListener("keydown", this.onKeyDown);
    this._domElementKeyEvents = domElement;
  }
  saveState() {
    this.target0.copy(this.target);
    this.position0.copy(this.object.position);
    this.zoom0 = this.object.zoom;
  }
  setCamera(camera) {
    this.object = camera;
  }
  setDom(dom) {
    this.dispose();
    this.domElement = dom;
    this.domElement.addEventListener("contextmenu", this.onContextMenu);
    this.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.domElement.addEventListener("pointercancel", this.onPointerCancel);
    this.domElement.addEventListener("wheel", this.onMouseWheel, {
      passive: false
    });
  }
  dispose() {
    this.domElement.removeEventListener("contextmenu", this.onContextMenu);
    this.domElement.removeEventListener("pointerdown", this.onPointerDown);
    this.domElement.removeEventListener("pointercancel", this.onPointerCancel);
    this.domElement.removeEventListener("wheel", this.onMouseWheel);
    this.domElement.removeEventListener("pointermove", this.onPointerMove);
    this.domElement.removeEventListener("pointerup", this.onPointerUp);
    if (this._domElementKeyEvents !== null) {
      this._domElementKeyEvents.removeEventListener("keydown", this.onKeyDown);
    }
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
  var _a;
  if (!this.webGLRenderer) {
    console.error("must install some renderer before BasicViewpoint plugin.");
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
  const distance = params.orthograpbic.distance || 1e4;
  const orthograpbicCamera = new OrthographicCamera(-window.innerWidth / 8, window.innerWidth / 8, -window.innerHeight / 8, window.innerHeight / 8, 0, distance);
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
    const aspect = width / height;
    perspectiveCamera.aspect = aspect;
    perspectiveCamera.updateProjectionMatrix();
    orthograpbicCamera.left = -distance * aspect;
    orthograpbicCamera.right = distance * aspect;
    orthograpbicCamera.top = distance;
    orthograpbicCamera.bottom = -distance;
    orthograpbicCamera.zoom = distance / height * 5;
    orthograpbicCamera.updateProjectionMatrix();
  });
  (_a = params.orthograpbic.allowRotate) != null ? _a : false;
  this.addEventListener("setViewpoint", (event) => {
    const viewpoint = event.viewpoint;
    if (viewpoint === VIEWPOINT.DEFAULT) {
      this.setCamera(perspectiveCamera);
      return;
    }
    if (viewpoint === VIEWPOINT.TOP) {
      orthograpbicCamera.position.set(0, distance / 2, 0);
    } else if (viewpoint === VIEWPOINT.BOTTOM) {
      orthograpbicCamera.position.set(0, -distance / 2, 0);
    } else if (viewpoint === VIEWPOINT.RIGHT) {
      orthograpbicCamera.position.set(distance / 2, 0, 0);
    } else if (viewpoint === VIEWPOINT.LEFT) {
      orthograpbicCamera.position.set(-distance / 2, 0, 0);
    } else if (viewpoint === VIEWPOINT.FRONT) {
      orthograpbicCamera.position.set(0, 0, distance / 2);
    } else if (viewpoint === VIEWPOINT.BACK) {
      orthograpbicCamera.position.set(0, 0, -distance / 2);
    }
    this.setCamera(orthograpbicCamera);
  });
  this.completeSet.add(() => {
    if (params.viewpoint === VIEWPOINT.DEFAULT) {
      this.setCamera(perspectiveCamera);
    } else {
      this.setCamera(orthograpbicCamera);
    }
    if (this.objectHelperManager) {
      this.objectHelperManager.addFilteredObject(perspectiveCamera, orthograpbicCamera);
    }
  });
  return true;
};
const OrbitControlsPlugin = function(params) {
  if (this.orbitControls) {
    console.warn("this has installed orbitControls plugin.");
    return false;
  }
  if (!this.renderManager) {
    console.warn("this must install renderManager before install orbitControls plugin.");
    return false;
  }
  this.orbitControls = new VisOrbitControls(this.camera, this.dom);
  this.addEventListener("setCamera", (event) => {
    this.orbitControls.setCamera(event.camera);
  });
  this.addEventListener("setDom", (event) => {
    this.orbitControls.setDom(event.dom);
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
const EffectComposerPlugin = function(params = {}) {
  if (this.effectComposer) {
    console.warn("this has installed effect composer plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  let composer;
  if (params.WebGLMultisampleRenderTarget || params.MSAA) {
    const renderer = this.webGLRenderer;
    const pixelRatio = renderer.getPixelRatio();
    const size = renderer.getDrawingBufferSize(new Vector2$1());
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
  if (this.scene && this.camera) {
    renderPass = new RenderPass(this.scene, this.camera);
    composer.addPass(renderPass);
  }
  this.addEventListener("setCamera", (event) => {
    if (!renderPass && this.scene) {
      renderPass = new RenderPass(this.scene, event.camera);
      composer.addPass(renderPass);
      return;
    } else if (renderPass) {
      renderPass.camera = event.camera;
    }
  });
  this.addEventListener("setScene", (event) => {
    if (!renderPass && this.camera) {
      renderPass = new RenderPass(event.scene, this.camera);
      composer.addPass(renderPass);
      return;
    } else if (renderPass) {
      renderPass.scene = event.scene;
    }
  });
  this.addEventListener("setSize", (event) => {
    composer.setSize(event.width, event.height);
  });
  if (this.renderManager) {
    this.renderManager.removeEventListener("render", this.render);
    this.renderManager.addEventListener("render", (event) => {
      this.effectComposer.render(event.delta);
    });
  } else {
    this.render = function() {
      this.effectComposer.render();
      return this;
    };
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
    __publicField(this, "pointerDownHandler");
    __publicField(this, "pointerMoveHandler");
    __publicField(this, "pointerUpHandler");
    __publicField(this, "mouseDownHandler");
    __publicField(this, "mouseUpHandler");
    __publicField(this, "clickHandler");
    __publicField(this, "dblclickHandler");
    __publicField(this, "contextmenuHandler");
    this.dom = parameters.dom;
    this.mouse = new Vector2$1();
    this.canMouseMove = true;
    this.mouseEventTimer = null;
    this.throttleTime = parameters.throttleTime || 1e3 / 60;
    const mergeEvent = (event) => {
      const eventObject = {
        mouse: {
          x: this.mouse.x,
          y: this.mouse.y
        }
      };
      for (const key in event) {
        eventObject[key] = event[key];
      }
      return eventObject;
    };
    const extendEventHanlder = (event) => {
      this.dispatchEvent(mergeEvent(event));
    };
    this.pointerMoveHandler = (event) => {
      if (!this.canMouseMove) {
        return;
      }
      this.canMouseMove = false;
      this.mouseEventTimer = window.setTimeout(() => {
        const mouse = this.mouse;
        const dom = this.dom;
        const boundingBox = dom.getBoundingClientRect();
        mouse.x = (event.clientX - boundingBox.left) / dom.offsetWidth * 2 - 1;
        mouse.y = -((event.clientY - boundingBox.top) / dom.offsetHeight) * 2 + 1;
        this.canMouseMove = true;
        this.dispatchEvent(mergeEvent(event));
      }, this.throttleTime);
    };
    this.mouseDownHandler = extendEventHanlder;
    this.mouseUpHandler = extendEventHanlder;
    this.pointerDownHandler = extendEventHanlder;
    this.pointerUpHandler = extendEventHanlder;
    this.clickHandler = extendEventHanlder;
    this.dblclickHandler = extendEventHanlder;
    this.contextmenuHandler = extendEventHanlder;
  }
  setDom(dom) {
    if (this.dom) {
      const dom2 = this.dom;
      dom2.removeEventListener("mousedown", this.mouseDownHandler);
      dom2.removeEventListener("mouseup", this.mouseUpHandler);
      dom2.removeEventListener("pointerdown", this.pointerDownHandler);
      dom2.removeEventListener("pointermove", this.pointerMoveHandler);
      dom2.removeEventListener("pointerup", this.pointerUpHandler);
      dom2.removeEventListener("click", this.clickHandler);
      dom2.removeEventListener("dblclick", this.dblclickHandler);
      dom2.removeEventListener("contextmenu", this.contextmenuHandler);
    }
    dom.addEventListener("mousedown", this.mouseDownHandler);
    dom.addEventListener("mouseup", this.mouseUpHandler);
    dom.addEventListener("pointerdown", this.pointerDownHandler);
    dom.addEventListener("pointermove", this.pointerMoveHandler);
    dom.addEventListener("pointerup", this.pointerUpHandler);
    dom.addEventListener("click", this.clickHandler);
    dom.addEventListener("dblclick", this.dblclickHandler);
    dom.addEventListener("contextmenu", this.contextmenuHandler);
    this.dom = dom;
    return this;
  }
  getNormalMouse() {
    return this.mouse;
  }
}
const PointerManagerPlugin = function(params) {
  if (this.pointerManager) {
    console.warn("this has installed pointerManager plugin.");
    return false;
  }
  const pointerManager = new PointerManager(Object.assign(params || {}, {
    dom: this.dom
  }));
  this.addEventListener("setDom", (event) => {
    pointerManager.setDom(event.dom);
  });
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
    __publicField(this, "filter", new Set());
    __publicField(this, "recursive", false);
    __publicField(this, "penetrate", false);
    __publicField(this, "propagation", false);
    __publicField(this, "delegation", false);
    this.raycaster = new Raycaster();
    this.camera = parameters.camera;
    this.scene = parameters.scene;
    parameters.recursive && (this.recursive = parameters.recursive);
    parameters.penetrate && (this.penetrate = parameters.penetrate);
  }
  setScene(scene) {
    this.scene = scene;
    return this;
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  addFilterObject(object) {
    this.filter.add(object);
    return this;
  }
  removeFilterObject(object) {
    this.filter.delete(object);
    return this;
  }
  intersectObject(mouse) {
    this.raycaster.setFromCamera(mouse, this.camera);
    const filter = this.filter;
    const filterScene = this.scene.children.filter((object) => !filter.has(object));
    return this.raycaster.intersectObjects(filterScene, this.recursive);
  }
  use(pointerManager) {
    const mergeEvent = function(event, object) {
      return Object.assign({}, event, object);
    };
    const genericEventHanlder = (event, eventName) => {
      const intersections = this.intersectObject(event.mouse);
      if (intersections.length) {
        if (this.penetrate) {
          for (const intersection of intersections) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: eventName,
              intersection
            }));
          }
        } else {
          const intersection = intersections[0];
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: eventName,
            intersection
          }));
        }
      }
      this.dispatchEvent(mergeEvent(event, {
        type: eventName,
        intersections
      }));
    };
    const genericEvents = [
      "pointerdown",
      "pointerup",
      "mousedown",
      "mouseup",
      "pointermove",
      "click",
      "dblclick",
      "contextmenu"
    ];
    for (const name of genericEvents) {
      pointerManager.addEventListener(name, (event) => {
        genericEventHanlder(event, name);
      });
    }
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
        for (const intersection of intersections) {
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
        for (const intersection of cacheObjectMap.values()) {
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
        for (const intersection of intersections) {
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
    return this;
  }
}
const EventManagerPlugin = function(params) {
  if (this.eventManager) {
    console.warn("engine has installed eventManager plugin.");
    return false;
  }
  if (!this.pointerManager) {
    console.error("must install pointerManager before this plugin.");
    return false;
  }
  const eventManager = new EventManager(Object.assign({
    scene: this.scene,
    camera: this.camera
  }, params));
  eventManager.use(this.pointerManager);
  this.eventManager = eventManager;
  this.addEventListener("setCamera", (event) => {
    this.eventManager.setCamera(event.camera);
  });
  this.addEventListener("setScene", (event) => {
    this.eventManager.setScene(event.scene);
  });
  return true;
};
var TRANSFORMEVENT;
(function(TRANSFORMEVENT2) {
  TRANSFORMEVENT2["OBJECTCHANGED"] = "objectChanged";
})(TRANSFORMEVENT || (TRANSFORMEVENT = {}));
class VisTransformControls extends TransformControls {
  constructor(camera, dom) {
    !camera && (camera = new PerspectiveCamera());
    !dom && (dom = document.body);
    super(camera, dom);
    __publicField(this, "target");
    __publicField(this, "transObjectSet");
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this._onPointerDown = (event) => {
      var _a;
      if (!this.enabled || !((_a = this.object) == null ? void 0 : _a.parent))
        return;
      this.domElement.addEventListener("pointermove", this._onPointerMove);
      this.pointerHover(this._getPointer(event));
      this.pointerDown(this._getPointer(event));
    };
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.target = new Object3D();
    this.transObjectSet = new Set();
    let mode = "";
    const target = this.target;
    const transObjectSet = this.transObjectSet;
    const cachaTargetTrans = {
      x: 0,
      y: 0,
      z: 0
    };
    const objectMatrixAutoMap = new WeakMap();
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
  setDom(dom) {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    dom.addEventListener("pointerdown", this._onPointerDown);
    dom.addEventListener("pointermove", this._onPointerHover);
    dom.addEventListener("pointerup", this._onPointerUp);
    this.domElement = dom;
    return this;
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  getTarget() {
    return this.target;
  }
  getTransObjectSet() {
    return this.transObjectSet;
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
      currentObject.matrixWorld.decompose(target.position, target.quaternion, target.scale);
      target.updateMatrix();
      target.updateMatrixWorld();
      this.transObjectSet.add(currentObject);
      return this;
    }
    const xList = [];
    const yList = [];
    const zList = [];
    object.forEach((elem) => {
      xList.push(elem.matrixWorld.elements[12]);
      yList.push(elem.matrixWorld.elements[13]);
      zList.push(elem.matrixWorld.elements[14]);
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
  if (!this.pointerManager) {
    console.warn("this must install pointerManager before install transformControls plugin.");
    return false;
  }
  if (!this.eventManager) {
    console.warn("this must install eventManager before install transformControls plugin.");
    return false;
  }
  const transformControls = new VisTransformControls(this.camera, this.dom);
  transformControls.detach();
  this.transformControls = transformControls;
  this.scene.add(this.transformControls);
  this.scene.add(this.transformControls.target);
  this.transformControls.addEventListener("mouseDown", () => {
    this.transing = true;
  });
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
  this.addEventListener("setDom", (event) => {
    transformControls.setDom(event.dom);
  });
  this.addEventListener("setScene", (event) => {
    const scene = event.scene;
    scene.add(this.transformControls.target);
    scene.add(this.transformControls);
  });
  if (this.selectionBox) {
    this.addEventListener("selected", (event) => {
      transformControls.setAttach(...event.objects);
    });
  } else {
    this.eventManager.addEventListener("click", (event) => {
      if (this.transing) {
        this.transing = false;
        return;
      }
      if (event.button === 0) {
        const objectList = event.intersections.map((elem) => elem.object);
        const object = objectList[0] || null;
        if (object) {
          transformControls.setAttach(object);
        } else {
          transformControls.detach();
        }
      }
    });
  }
  this.eventManager.addFilterObject(transformControls);
  this.completeSet.add(() => {
    if (this.IS_ENGINESUPPORT) {
      const objectToConfig = (object) => {
        const symbol = this.compilerManager.getObjectSymbol(object);
        if (!symbol) {
          return null;
        }
        return this.dataSupportManager.getConfigBySymbol(symbol);
      };
      let config2 = null;
      let mode;
      transformControls.addEventListener(TRANSFORMEVENT.OBJECTCHANGED, (event) => {
        const e = event;
        e.transObjectSet.forEach((object) => {
          config2 = objectToConfig(object);
          mode = e.mode;
          if (config2) {
            config2[mode].x = object[mode].x;
            config2[mode].y = object[mode].y;
            config2[mode].z = object[mode].z;
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
  const domElement = this.webGLRenderer.domElement;
  domElement.style.position = "absolute";
  domElement.style.top = "0";
  domElement.style.left = "0";
  domElement.classList.add("vis-webgl");
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
    const DataURI = this.webGLRenderer.domElement.toDataURL(params2.mine);
    this.setSize(cacheSize.width, cacheSize.height);
    if (renderFlag) {
      this.renderManager.play();
    }
    return DataURI;
  };
  this.addEventListener("setDom", (event) => {
    event.dom.appendChild(this.webGLRenderer.domElement);
  });
  this.addEventListener("setSize", (event) => {
    this.webGLRenderer.setSize(event.width, event.height, true);
  });
  this.addEventListener("dispose", () => {
    this.webGLRenderer.dispose();
  });
  if (this.renderManager) {
    this.renderManager.removeEventListener("render", this.render);
    this.renderManager.addEventListener("render", (event) => {
      this.webGLRenderer.render(this.scene, this.camera);
    });
  } else {
    this.render = function() {
      this.webGLRenderer.render(this.scene, this.camera);
      return this;
    };
  }
  return true;
};
const _object_pattern = /^[og]\s*(.+)?/;
const _material_library_pattern = /^mtllib /;
const _material_use_pattern = /^usemtl /;
const _map_use_pattern = /^usemap /;
const _vA = new Vector3$1();
const _vB = new Vector3$1();
const _vC = new Vector3$1();
const _ab = new Vector3$1();
const _cb = new Vector3$1();
const _color = new Color();
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
              _color.setRGB(parseFloat(data[4]), parseFloat(data[5]), parseFloat(data[6])).convertSRGBToLinear();
              state.colors.push(_color.r, _color.g, _color.b);
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
        const lineData = line.slice(1).trim();
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
        const lineData = line.slice(1).trim();
        const pointData = lineData.split(" ");
        state.addPointGeometry(pointData);
      } else if ((result = _object_pattern.exec(line)) !== null) {
        const name = (" " + result[0].slice(1).trim()).slice(1);
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
      if (mapType === "map" || mapType === "emissiveMap") {
        map.encoding = sRGBEncoding;
      }
      params[mapType] = map;
    }
    for (const prop in mat) {
      const value = mat[prop];
      let n;
      if (value === "")
        continue;
      switch (prop.toLowerCase()) {
        case "kd":
          params.color = new Color().fromArray(value).convertSRGBToLinear();
          break;
        case "ks":
          params.specular = new Color().fromArray(value).convertSRGBToLinear();
          break;
        case "ke":
          params.emissive = new Color().fromArray(value).convertSRGBToLinear();
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
      scale: new Vector2$1(1, 1),
      offset: new Vector2$1(0, 0)
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
      jpg: imageLoader,
      png: imageLoader,
      jpeg: imageLoader,
      obj: new OBJLoader(),
      mtl: new MTLLoader(),
      mp4: videoLoader,
      webm: videoLoader,
      ogg: videoLoader
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
    for (const unit of urlList) {
      let url;
      let ext;
      if (typeof unit === "string") {
        url = unit;
        ext = ((_a = url.split(".").pop()) == null ? void 0 : _a.toLocaleLowerCase()) || "";
      } else {
        url = unit.url;
        ext = unit.ext.toLocaleLowerCase();
      }
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
  exportConfig() {
    const assets = [];
    this.resourceMap.forEach((value, url) => {
      assets.push(url);
    });
    return assets;
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
const shader = {
  name: "uvPulseShader",
  uniforms: {
    uTime: { value: 0 },
    uWidth: { value: 0.5 },
    uColor: {
      value: {
        r: 1,
        g: 0,
        b: 0
      }
    },
    uCenter: {
      value: {
        x: 0.5,
        y: 0.5
      }
    }
  },
  vertexShader: `
    uniform float uWidth;
    uniform float uTime;
    
    varying vec2 vUv;

    void main () {

      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: `
    uniform float uWidth;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec2 uCenter;

    varying vec2 vUv;

    void main () {
      // \u6839\u636EuTime\u6C42\u51FA\u767E\u5206\u6BD4
      float deg = mod(degrees(uTime), 360.0);
      if (deg > 0.0 && deg < 90.0) {
        discard;
      }

      float percent = sin(uTime);
      float distancePercent = distance(uCenter, vUv);

      // \u4ECE\u5916\u5411\u91CC
      if (distancePercent > 0.5) {
        discard;
      }
      if (distancePercent < percent) {
        discard;
      }

      if (distancePercent - percent > uWidth) {
        discard;
      }

      float opacity =  (uWidth - (distancePercent - percent)) / uWidth;

      // float opacity = distancePercent;
      gl_FragColor = vec4(uColor, opacity);
    }`
};
const _ShaderLibrary = class {
  static getShader(name) {
    if (!_ShaderLibrary.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return null;
    }
    return _ShaderLibrary.cloneShader(_ShaderLibrary.library.get(name));
  }
  static generateConfig(name) {
    if (!_ShaderLibrary.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return {};
    }
    const shader2 = _ShaderLibrary.library.get(name);
    const config2 = {
      shader: name,
      uniforms: {}
    };
    shader2.uniforms && (config2.uniforms = JSON.parse(JSON.stringify(shader2.uniforms)));
    return config2;
  }
  static cloneShader(shader2) {
    const newShader = {
      name: shader2.name
    };
    shader2.vertexShader && (newShader.vertexShader = shader2.vertexShader);
    shader2.fragmentShader && (newShader.fragmentShader = shader2.fragmentShader);
    shader2.uniforms && (newShader.uniforms = JSON.parse(JSON.stringify(shader2.uniforms)));
    return newShader;
  }
};
let ShaderLibrary = _ShaderLibrary;
__publicField(ShaderLibrary, "library", new Map());
__publicField(ShaderLibrary, "reigster", function(shader2) {
  if (_ShaderLibrary.library.has(shader2.name)) {
    console.warn(`shader library has exist shader: ${shader2.name} that will be cover.`);
  }
  _ShaderLibrary.library.set(shader2.name, shader2);
});
const defaultShader = {
  name: "defaultShader"
};
ShaderLibrary.reigster(defaultShader);
ShaderLibrary.reigster(shader);
var CONFIGTYPE;
(function(CONFIGTYPE2) {
  CONFIGTYPE2["BOXGEOMETRY"] = "BoxGeometry";
  CONFIGTYPE2["SPHEREGEOMETRY"] = "SphereGeometry";
  CONFIGTYPE2["LOADGEOMETRY"] = "LoadGeometry";
  CONFIGTYPE2["PLANEGEOMETRY"] = "PlaneGeometry";
  CONFIGTYPE2["CIRCLEGEOMETRY"] = "CircleGeometry";
  CONFIGTYPE2["CONEGEOMETRY"] = "ConeGeometry";
  CONFIGTYPE2["CYLINDERGEOMETRY"] = "CylinderGeometry";
  CONFIGTYPE2["DODECAHEDRONGEOMETRY"] = "DodecahedronGeometry";
  CONFIGTYPE2["EDGESGEOMETRY"] = "EdgesGeometry";
  CONFIGTYPE2["LINECURVEGEOMETRY"] = "LineCurveGeometry";
  CONFIGTYPE2["SPLINECURVEGEOMETRY"] = "SplineCurveGeometry";
  CONFIGTYPE2["CUBICBEZIERCURVEGEOMETRY"] = "CubicBezierCurveGeometry";
  CONFIGTYPE2["QUADRATICBEZIERCURVEGEOMETRY"] = "QuadraticBezierCurveGeometry";
  CONFIGTYPE2["CUSTOMGEOMETRY"] = "CustomGeometry";
  CONFIGTYPE2["LINETUBEGEOMETRY"] = "LineTubeGeometry";
  CONFIGTYPE2["SPLINETUBEGEOMETRY"] = "SplineTubeGeometry";
  CONFIGTYPE2["MESH"] = "Mesh";
  CONFIGTYPE2["LINE"] = "Line";
  CONFIGTYPE2["POINTS"] = "Points";
  CONFIGTYPE2["SPRITE"] = "Sprite";
  CONFIGTYPE2["GROUP"] = "Group";
  CONFIGTYPE2["CSS3DOBJECT"] = "CSS3DObject";
  CONFIGTYPE2["CSS3DSPRITE"] = "CSS3DSprite";
  CONFIGTYPE2["CSS3DPLANE"] = "CSS3DPlane";
  CONFIGTYPE2["IMAGETEXTURE"] = "ImageTexture";
  CONFIGTYPE2["CUBETEXTURE"] = "CubeTexture";
  CONFIGTYPE2["CANVASTEXTURE"] = "CanvasTexture";
  CONFIGTYPE2["VIDEOTEXTURE"] = "VideoTexture";
  CONFIGTYPE2["MESHBASICMATERIAL"] = "MeshBasicMaterial";
  CONFIGTYPE2["MESHSTANDARDMATERIAL"] = "MeshStandardMaterial";
  CONFIGTYPE2["MESHPHONGMATERIAL"] = "MeshPhongMaterial";
  CONFIGTYPE2["SPRITEMATERIAL"] = "SpriteMaterial";
  CONFIGTYPE2["LINEBASICMATERIAL"] = "LineBasicMaterial";
  CONFIGTYPE2["POINTSMATERIAL"] = "PointsMaterial";
  CONFIGTYPE2["SHADERMATERIAL"] = "ShaderMaterial";
  CONFIGTYPE2["AMBIENTLIGHT"] = "AmbientLight";
  CONFIGTYPE2["SPOTLIGHT"] = "SpotLight";
  CONFIGTYPE2["POINTLIGHT"] = "PointLight";
  CONFIGTYPE2["DIRECTIONALLIGHT"] = "DirectionalLight";
  CONFIGTYPE2["PERSPECTIVECAMERA"] = "PerspectiveCamera";
  CONFIGTYPE2["ORTHOGRAPHICCAMERA"] = "OrthographicCamera";
  CONFIGTYPE2["WEBGLRENDERER"] = "WebGLRenderer";
  CONFIGTYPE2["CSS3DRENDERER"] = "CSS3DRenderer";
  CONFIGTYPE2["SCENE"] = "Scene";
  CONFIGTYPE2["TRNASFORMCONTROLS"] = "TransformControls";
  CONFIGTYPE2["ORBITCONTROLS"] = "OrbitControls";
  CONFIGTYPE2["SMAAPASS"] = "SMAAPass";
  CONFIGTYPE2["UNREALBLOOMPASS"] = "UnrealBloomPass";
  CONFIGTYPE2["SCRIPTANIMATION"] = "ScriptAnimation";
  CONFIGTYPE2["KEYFRAMEANIMATION"] = "KeyframeAnimation";
})(CONFIGTYPE || (CONFIGTYPE = {}));
const getObjectConfig = () => {
  return {
    vid: "",
    name: "",
    type: "Object3D",
    castShadow: true,
    receiveShadow: true,
    lookAt: "",
    visible: true,
    matrixAutoUpdate: true,
    renderOrder: 0,
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
    },
    up: {
      x: 0,
      y: 1,
      z: 0
    },
    parent: "",
    children: [],
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
    },
    groups: []
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
    width: 5,
    height: 5,
    widthSegments: 1,
    heightSegments: 1
  });
};
const getCircleGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.CIRCLEGEOMETRY,
    radius: 3,
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
};
const getConeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.CONEGEOMETRY,
    radius: 3,
    height: 5,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
};
const getLoadGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.LOADGEOMETRY,
    url: ""
  });
};
const getCustomGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.CUSTOMGEOMETRY,
    attribute: {
      position: [],
      color: [],
      index: [],
      normal: [],
      uv: [],
      uv2: []
    }
  });
};
const getCylinderGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.CYLINDERGEOMETRY,
    radiusTop: 3,
    radiusBottom: 3,
    height: 5,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
};
const getDodecahedronGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: "",
    radius: 3,
    detail: 0
  });
};
const getEdgesGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.LOADGEOMETRY,
    url: "",
    thresholdAngle: 1
  });
};
const getCurveGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    path: [],
    divisions: 36,
    space: true
  });
};
const getLineCurveGeometryConfig = function() {
  return Object.assign(getCurveGeometryConfig(), {
    type: CONFIGTYPE.LINECURVEGEOMETRY
  });
};
const getSplineCurveGeometryConfig = function() {
  return Object.assign(getCurveGeometryConfig(), {
    type: CONFIGTYPE.SPLINECURVEGEOMETRY
  });
};
const getCubicBezierCurveGeometryConfig = function() {
  return Object.assign(getCurveGeometryConfig(), {
    type: CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY
  });
};
const getQuadraticBezierCurveGeometryConfig = function() {
  return Object.assign(getCurveGeometryConfig(), {
    type: CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY
  });
};
const getTubeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: "TubeGeometry",
    path: [],
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: false
  });
};
const getLineTubeGeometryConfig = function() {
  return Object.assign(getTubeGeometryConfig(), {
    type: CONFIGTYPE.LINETUBEGEOMETRY
  });
};
const getSplineTubeGeometryConfig = function() {
  return Object.assign(getTubeGeometryConfig(), {
    type: CONFIGTYPE.SPLINETUBEGEOMETRY
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
    fog: true,
    name: "",
    needsUpdate: false,
    opacity: 1,
    dithering: false,
    shadowSide: null,
    side: FrontSide,
    toneMapped: true,
    transparent: false,
    visible: true,
    blendDst: OneMinusSrcAlphaFactor,
    blendDstAlpha: null,
    blendEquation: AddEquation,
    blendEquationAlpha: null,
    blending: NormalBlending,
    blendSrc: SrcAlphaFactor,
    blendSrcAlpha: null
  };
};
const getMeshBasicMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.MESHBASICMATERIAL,
    color: "rgb(255, 255, 255)",
    combine: MultiplyOperation,
    aoMapIntensity: 1,
    fog: true,
    lightMapIntensity: 1,
    reflectivity: 1,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    wireframeLinewidth: 1,
    map: "",
    envMap: "",
    alphaMap: "",
    aoMap: "",
    lightMap: "",
    specularMap: ""
  });
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
const getShaderMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.SHADERMATERIAL,
    shader: "defaultShader",
    uniforms: {}
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
    left: -1920 / 32,
    right: 1920 / 32,
    top: 1080 / 32,
    bottom: -1080 / 32,
    near: 5,
    far: 50,
    zoom: 1
  });
};
const getRendererConfig = function() {
  return {
    vid: "",
    type: "Renderer",
    size: null
  };
};
const getWebGLRendererConfig = function() {
  return Object.assign(getRendererConfig(), {
    vid: CONFIGTYPE.WEBGLRENDERER,
    type: CONFIGTYPE.WEBGLRENDERER,
    clearColor: "rgba(0, 0, 0, 0)",
    outputEncoding: LinearEncoding,
    physicallyCorrectLights: false,
    shadowMap: {
      enabled: false,
      autoUpdate: true,
      needsUpdate: false,
      type: PCFShadowMap
    },
    toneMapping: NoToneMapping,
    toneMappingExposure: 1,
    pixelRatio: window.devicePixelRatio,
    adaptiveCamera: false,
    viewport: null,
    scissor: null
  });
};
const getCSS3DRenderereConfig = function() {
  return Object.assign(getRendererConfig(), {
    vid: CONFIGTYPE.CSS3DRENDERER,
    type: CONFIGTYPE.CSS3DRENDERER
  });
};
const getSceneConfig = function() {
  return Object.assign(getObjectConfig(), {
    vid: CONFIGTYPE.SCENE,
    type: CONFIGTYPE.SCENE,
    background: "",
    environment: "",
    fog: {
      type: "",
      color: "rgb(150, 150, 150)",
      near: 1,
      far: 200,
      density: 3e-3
    }
  });
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
    screenSpacePanning: true,
    target: null
  };
};
const getSolidObjectConfig = function() {
  return Object.assign(getObjectConfig(), {
    material: "",
    geometry: ""
  });
};
const getSpriteConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    type: "Sprite",
    material: "",
    center: {
      x: 0.5,
      y: 0.5
    }
  });
};
const getMeshConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    type: CONFIGTYPE.MESH,
    geometry: "",
    material: ""
  });
};
const getPointsConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    type: CONFIGTYPE.POINTS,
    geometry: "",
    material: ""
  });
};
const getLineConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
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
const getPassConfig = function() {
  return {
    vid: "",
    type: "Pass"
  };
};
const getSMAAPassConfig = function() {
  return Object.assign(getPassConfig(), {
    type: CONFIGTYPE.SMAAPASS
  });
};
const getUnrealBloomPassConfig = function() {
  return Object.assign(getPassConfig(), {
    type: CONFIGTYPE.UNREALBLOOMPASS,
    strength: 1.5,
    threshold: 0,
    radius: 0
  });
};
const getAnimationConfig = function() {
  return {
    vid: "",
    type: "",
    target: "",
    attribute: "",
    play: true
  };
};
const getScriptAnimationConfig = function() {
  return Object.assign(getAnimationConfig(), {
    type: CONFIGTYPE.SCRIPTANIMATION,
    script: {
      name: ""
    }
  });
};
const getKeyframeAnimationConfig = function() {
  return Object.assign(getAnimationConfig(), {
    type: CONFIGTYPE.KEYFRAMEANIMATION,
    script: {
      name: ""
    }
  });
};
const getCSS3DObjectConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.CSS3DOBJECT,
    element: "",
    width: 50,
    height: 50
  });
};
const getCSS3DPlaneConfig = function() {
  return Object.assign(getCSS3DObjectConfig(), {
    type: CONFIGTYPE.CSS3DPLANE
  });
};
const getCSS3DSpriteConfig = function() {
  return Object.assign(getCSS3DObjectConfig(), {
    type: CONFIGTYPE.CSS3DSPRITE,
    rotation2D: 0
  });
};
const CONFIGFACTORY = {
  [CONFIGTYPE.IMAGETEXTURE]: getImageTextureConfig,
  [CONFIGTYPE.CUBETEXTURE]: getCubeTextureConfig,
  [CONFIGTYPE.CANVASTEXTURE]: getCanvasTextureConfig,
  [CONFIGTYPE.VIDEOTEXTURE]: getVideoTextureConfig,
  [CONFIGTYPE.MESHBASICMATERIAL]: getMeshBasicMaterialConfig,
  [CONFIGTYPE.MESHSTANDARDMATERIAL]: getMeshStandardMaterialConfig,
  [CONFIGTYPE.MESHPHONGMATERIAL]: getMeshPhongMaterialConfig,
  [CONFIGTYPE.SPRITEMATERIAL]: getSpriteMaterialConfig,
  [CONFIGTYPE.LINEBASICMATERIAL]: getLineBasicMaterialConfig,
  [CONFIGTYPE.POINTSMATERIAL]: getPointsMaterialConfig,
  [CONFIGTYPE.SHADERMATERIAL]: getShaderMaterialConfig,
  [CONFIGTYPE.AMBIENTLIGHT]: getAmbientLightConfig,
  [CONFIGTYPE.SPOTLIGHT]: getSpotLightConfig,
  [CONFIGTYPE.POINTLIGHT]: getPointLightConfig,
  [CONFIGTYPE.DIRECTIONALLIGHT]: getDirectionalLightConfig,
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
  [CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY]: getQuadraticBezierCurveGeometryConfig,
  [CONFIGTYPE.DODECAHEDRONGEOMETRY]: getDodecahedronGeometryConfig,
  [CONFIGTYPE.SPLINETUBEGEOMETRY]: getSplineTubeGeometryConfig,
  [CONFIGTYPE.LINETUBEGEOMETRY]: getLineTubeGeometryConfig,
  [CONFIGTYPE.SPRITE]: getSpriteConfig,
  [CONFIGTYPE.LINE]: getLineConfig,
  [CONFIGTYPE.MESH]: getMeshConfig,
  [CONFIGTYPE.POINTS]: getPointsConfig,
  [CONFIGTYPE.GROUP]: getGroupConfig,
  [CONFIGTYPE.CSS3DOBJECT]: getCSS3DObjectConfig,
  [CONFIGTYPE.CSS3DSPRITE]: getCSS3DSpriteConfig,
  [CONFIGTYPE.CSS3DPLANE]: getCSS3DPlaneConfig,
  [CONFIGTYPE.PERSPECTIVECAMERA]: getPerspectiveCameraConfig,
  [CONFIGTYPE.ORTHOGRAPHICCAMERA]: getOrthographicCameraConfig,
  [CONFIGTYPE.WEBGLRENDERER]: getWebGLRendererConfig,
  [CONFIGTYPE.CSS3DRENDERER]: getCSS3DRenderereConfig,
  [CONFIGTYPE.SCENE]: getSceneConfig,
  [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig,
  [CONFIGTYPE.ORBITCONTROLS]: getOrbitControlsConfig,
  [CONFIGTYPE.SMAAPASS]: getSMAAPassConfig,
  [CONFIGTYPE.UNREALBLOOMPASS]: getUnrealBloomPassConfig,
  [CONFIGTYPE.SCRIPTANIMATION]: getScriptAnimationConfig,
  [CONFIGTYPE.KEYFRAMEANIMATION]: getKeyframeAnimationConfig
};
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
  MODULETYPE2["LINE"] = "line";
  MODULETYPE2["MESH"] = "mesh";
  MODULETYPE2["POINTS"] = "points";
  MODULETYPE2["GROUP"] = "group";
  MODULETYPE2["CSS3D"] = "css3D";
  MODULETYPE2["PASS"] = "pass";
  MODULETYPE2["MODIFIER"] = "modifier";
  MODULETYPE2["ANIMATION"] = "animation";
})(MODULETYPE || (MODULETYPE = {}));
var OBJECTMODULE;
(function(OBJECTMODULE2) {
  OBJECTMODULE2[OBJECTMODULE2["CAMERA"] = MODULETYPE.CAMERA] = "CAMERA";
  OBJECTMODULE2[OBJECTMODULE2["LIGHT"] = MODULETYPE.LIGHT] = "LIGHT";
  OBJECTMODULE2[OBJECTMODULE2["SCENE"] = MODULETYPE.SCENE] = "SCENE";
  OBJECTMODULE2[OBJECTMODULE2["SPRITE"] = MODULETYPE.SPRITE] = "SPRITE";
  OBJECTMODULE2[OBJECTMODULE2["LINE"] = MODULETYPE.LINE] = "LINE";
  OBJECTMODULE2[OBJECTMODULE2["MESH"] = MODULETYPE.MESH] = "MESH";
  OBJECTMODULE2[OBJECTMODULE2["POINTS"] = MODULETYPE.POINTS] = "POINTS";
  OBJECTMODULE2[OBJECTMODULE2["GROUP"] = MODULETYPE.GROUP] = "GROUP";
  OBJECTMODULE2[OBJECTMODULE2["CSS3D"] = MODULETYPE.CSS3D] = "CSS3D";
})(OBJECTMODULE || (OBJECTMODULE = {}));
const CONFIGMODULE = {
  [CONFIGTYPE.IMAGETEXTURE]: MODULETYPE.TEXTURE,
  [CONFIGTYPE.CUBETEXTURE]: MODULETYPE.TEXTURE,
  [CONFIGTYPE.CANVASTEXTURE]: MODULETYPE.TEXTURE,
  [CONFIGTYPE.VIDEOTEXTURE]: MODULETYPE.TEXTURE,
  [CONFIGTYPE.MESHBASICMATERIAL]: MODULETYPE.MATERIAL,
  [CONFIGTYPE.MESHSTANDARDMATERIAL]: MODULETYPE.MATERIAL,
  [CONFIGTYPE.MESHPHONGMATERIAL]: MODULETYPE.MATERIAL,
  [CONFIGTYPE.SPRITEMATERIAL]: MODULETYPE.MATERIAL,
  [CONFIGTYPE.LINEBASICMATERIAL]: MODULETYPE.MATERIAL,
  [CONFIGTYPE.POINTSMATERIAL]: MODULETYPE.MATERIAL,
  [CONFIGTYPE.SHADERMATERIAL]: MODULETYPE.MATERIAL,
  [CONFIGTYPE.AMBIENTLIGHT]: MODULETYPE.LIGHT,
  [CONFIGTYPE.SPOTLIGHT]: MODULETYPE.LIGHT,
  [CONFIGTYPE.POINTLIGHT]: MODULETYPE.LIGHT,
  [CONFIGTYPE.DIRECTIONALLIGHT]: MODULETYPE.LIGHT,
  [CONFIGTYPE.BOXGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.SPHEREGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.LOADGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.CUSTOMGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.PLANEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.CIRCLEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.CONEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.CIRCLEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.EDGESGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.CYLINDERGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.LINECURVEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.SPLINECURVEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.LINETUBEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.SPLINETUBEGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.SPRITE]: MODULETYPE.SPRITE,
  [CONFIGTYPE.LINE]: MODULETYPE.LINE,
  [CONFIGTYPE.MESH]: MODULETYPE.MESH,
  [CONFIGTYPE.POINTS]: MODULETYPE.POINTS,
  [CONFIGTYPE.GROUP]: MODULETYPE.GROUP,
  [CONFIGTYPE.CSS3DOBJECT]: MODULETYPE.CSS3D,
  [CONFIGTYPE.CSS3DSPRITE]: MODULETYPE.CSS3D,
  [CONFIGTYPE.CSS3DPLANE]: MODULETYPE.CSS3D,
  [CONFIGTYPE.PERSPECTIVECAMERA]: MODULETYPE.CAMERA,
  [CONFIGTYPE.ORTHOGRAPHICCAMERA]: MODULETYPE.CAMERA,
  [CONFIGTYPE.WEBGLRENDERER]: MODULETYPE.RENDERER,
  [CONFIGTYPE.SCENE]: MODULETYPE.SCENE,
  [CONFIGTYPE.TRNASFORMCONTROLS]: MODULETYPE.CONTROLS,
  [CONFIGTYPE.ORBITCONTROLS]: MODULETYPE.CONTROLS,
  [CONFIGTYPE.SMAAPASS]: MODULETYPE.PASS,
  [CONFIGTYPE.UNREALBLOOMPASS]: MODULETYPE.PASS,
  [CONFIGTYPE.SCRIPTANIMATION]: MODULETYPE.ANIMATION,
  [CONFIGTYPE.KEYFRAMEANIMATION]: MODULETYPE.ANIMATION
};
const generateConfig = function(type, merge, strict = true, warn = true) {
  if (!CONFIGFACTORY[type]) {
    console.error(`type: ${type} can not be found in configList.`);
    return {
      vid: "",
      type
    };
  }
  const recursion = (config2, merge2) => {
    for (const key in merge2) {
      if (config2[key] === void 0) {
        !strict && (config2[key] = merge2[key]);
        strict && warn && console.warn(`'${type}' config can not set key: ${key}`);
        continue;
      }
      if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
        if (config2[key] === null) {
          config2[key] = __spreadValues({}, merge2[key]);
        }
        recursion(config2[key], merge2[key]);
      } else {
        config2[key] = merge2[key];
      }
    }
  };
  const initConfig = CONFIGFACTORY[type]();
  if ([
    CONFIGTYPE.SHADERMATERIAL
  ].includes(type)) {
    const shaderConfig = ShaderLibrary.generateConfig((merge == null ? void 0 : merge.shader) || "defaultShader");
    const cacheStrict = strict;
    strict = false;
    recursion(initConfig, shaderConfig);
    strict = cacheStrict;
  }
  if ([CONFIGTYPE.SCRIPTANIMATION, CONFIGTYPE.KEYFRAMEANIMATION].includes(type)) {
    strict = false;
  }
  if (initConfig.vid === "") {
    initConfig.vid = v4();
  }
  merge && recursion(initConfig, merge);
  if (generateConfig.autoInject && generateConfig.injectEngine) {
    const engine = generateConfig.injectEngine;
    const reactive = engine.reactiveConfig(initConfig);
    if (generateConfig.injectScene) {
      if (CONFIGMODULE[initConfig.type] in OBJECTMODULE && initConfig.type !== CONFIGTYPE.SCENE) {
        let sceneConfig = null;
        if (typeof generateConfig.injectScene === "boolean") {
          sceneConfig = engine.getObjectConfig(engine.scene);
        } else if (typeof generateConfig.injectScene === "string") {
          sceneConfig = engine.getConfigBySymbol(generateConfig.injectScene);
        }
        if (!sceneConfig) {
          console.warn(`current engine scene can not found it config`, engine, engine.scene);
        } else {
          sceneConfig.children.push(initConfig.vid);
        }
      }
    }
    return reactive;
  }
  return initConfig;
};
generateConfig.autoInject = true;
generateConfig.injectScene = false;
generateConfig.injectEngine = null;
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
const clone = (object) => {
  return JSON.parse(JSON.stringify(object, stringify), parse);
};
var JSONHandler = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  stringify,
  parse,
  clone
});
var RESOURCEEVENTTYPE;
(function(RESOURCEEVENTTYPE2) {
  RESOURCEEVENTTYPE2["MAPPED"] = "mapped";
})(RESOURCEEVENTTYPE || (RESOURCEEVENTTYPE = {}));
class ResourceManager extends EventDispatcher {
  constructor(resources = {}) {
    super();
    __publicField(this, "structureMap", new Map());
    __publicField(this, "configMap", new Map());
    __publicField(this, "resourceMap", new Map());
    __publicField(this, "configModuleMap", CONFIGMODULE);
    __publicField(this, "mappingHandler", new Map());
    const mappingHandler = this.mappingHandler;
    mappingHandler.set(HTMLImageElement, this.HTMLImageElementHandler);
    mappingHandler.set(HTMLCanvasElement, this.HTMLCanvasElementHandler);
    mappingHandler.set(HTMLVideoElement, this.HTMLVideoElementHandler);
    mappingHandler.set(Object3D, this.Object3DHandler);
    mappingHandler.set(HTMLDivElement, this.HTMLDivElementHandler);
    mappingHandler.set(HTMLSpanElement, this.HTMLSpanElementHandler);
    const map = new Map();
    for (const key in resources) {
      if (map.has(key)) {
        console.warn(`resourceManager construct params rescource already exist: ${key}, that will be cover.`);
      }
      map.set(key, resources[key]);
    }
    this.mappingResource(map);
  }
  Object3DHandler(url, object) {
    const structureMap = this.structureMap;
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;
    const recursionMappingObject = function(url2, object2) {
      let mappingUrl = url2;
      resourceMap.set(mappingUrl, object2);
      const objectConfig = generateConfig(object2.type, object2, true, false);
      configMap.set(mappingUrl, objectConfig);
      const config2 = {
        type: `${object2.type}`,
        url: mappingUrl
      };
      if (object2.geometry) {
        const geometry = object2.geometry;
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const center = box.getCenter(new Vector3$1());
        mappingUrl = `${url2}.geometry`;
        resourceMap.set(mappingUrl, geometry);
        const geometryConfig = generateConfig(CONFIGTYPE.LOADGEOMETRY, {
          url: mappingUrl,
          position: {
            x: center.x / (box.max.x - box.min.x) * 2,
            y: center.y / (box.max.y - box.min.y) * 2,
            z: center.z / (box.max.z - box.min.z) * 2
          }
        });
        configMap.set(mappingUrl, geometryConfig);
        config2.geometry = mappingUrl;
        objectConfig.geometry = geometryConfig.vid;
      }
      if (object2.material) {
        const material = object2.material;
        if (material instanceof Array) {
          config2.material = [];
          objectConfig.material = [];
          material.forEach((materialChild, i, arr) => {
            mappingUrl = `${url2}.material.${i}`;
            resourceMap.set(mappingUrl, materialChild);
            const materialConfig = generateConfig(materialChild.type, materialChild, true, false);
            configMap.set(mappingUrl, materialConfig);
            config2.material[i] = mappingUrl;
            objectConfig.material.push(materialConfig.vid);
          });
        } else {
          mappingUrl = `${url2}.material`;
          resourceMap.set(mappingUrl, material);
          const materialConfig = generateConfig(material.type, material, true, false);
          configMap.set(mappingUrl, materialConfig);
          config2.material = mappingUrl;
          objectConfig.material = materialConfig.vid;
        }
      }
      if ([CONFIGTYPE.GROUP, CONFIGTYPE.SCENE].includes(object2.type)) {
        configMap.get(config2.url).children = [];
      }
      if (object2.children.length) {
        config2.children = [];
        if ([CONFIGTYPE.GROUP, CONFIGTYPE.SCENE].includes(object2.type)) {
          const group = configMap.get(config2.url);
          object2.children.forEach((child, i, arr) => {
            mappingUrl = `${url2}.children.${i}`;
            group.children.push(mappingUrl);
            config2.children[i] = recursionMappingObject(mappingUrl, child);
          });
        } else {
          object2.children.forEach((child, i, arr) => {
            mappingUrl = `${url2}.children.${i}`;
            config2.children[i] = recursionMappingObject(mappingUrl, child);
          });
        }
      }
      return config2;
    };
    structureMap.set(url, recursionMappingObject(url, object));
    return this;
  }
  HTMLImageElementHandler(url, element) {
    this.resourceMap.set(url, element);
    this.configMap.set(url, generateConfig(CONFIGTYPE.IMAGETEXTURE, {
      url
    }));
    this.structureMap.set(url, url);
    return this;
  }
  HTMLCanvasElementHandler(url, element) {
    this.resourceMap.set(url, element);
    this.configMap.set(url, generateConfig(CONFIGTYPE.CANVASTEXTURE, {
      url
    }));
    this.structureMap.set(url, url);
    return this;
  }
  HTMLVideoElementHandler(url, element) {
    this.resourceMap.set(url, element);
    this.configMap.set(url, generateConfig(CONFIGTYPE.VIDEOTEXTURE, {
      url
    }));
    this.structureMap.set(url, url);
    return this;
  }
  HTMLDivElementHandler(url, element) {
    this.resourceMap.set(url, element);
    this.configMap.set(url, generateConfig(CONFIGTYPE.CSS3DOBJECT, {
      element: url
    }));
    this.structureMap.set(url, url);
    return this;
  }
  HTMLSpanElementHandler(url, element) {
    this.resourceMap.set(url, element);
    this.configMap.set(url, generateConfig(CONFIGTYPE.CSS3DSPRITE, {
      element: url
    }));
    this.structureMap.set(url, url);
    return this;
  }
  mappingResource(loadResourceMap) {
    const structureMap = this.structureMap;
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;
    const mappingHandler = this.mappingHandler;
    const resourceHanlder = (url, object, prototype) => {
      if (!Object.getPrototypeOf(prototype)) {
        return false;
      } else if (mappingHandler.has(Object.getPrototypeOf(prototype).constructor)) {
        mappingHandler.get(Object.getPrototypeOf(prototype).constructor).call(this, url, object);
        return true;
      } else {
        return resourceHanlder(url, object, Object.getPrototypeOf(prototype));
      }
    };
    const cacheAutoInject = generateConfig.autoInject;
    generateConfig.autoInject = false;
    const resourceConfig = {};
    loadResourceMap.forEach((resource, url) => {
      if (!resourceHanlder(url, resource, resource)) {
        resourceMap.set(url, resource);
        structureMap.set(url, url);
        console.warn(`resource manager can not support this resource to generate config`, resource);
      } else {
        resourceConfig[url] = this.getResourceConfig(url);
      }
    });
    generateConfig.autoInject = cacheAutoInject;
    this.dispatchEvent({
      type: "mapped",
      structureMap,
      configMap,
      resourceMap,
      resourceConfig
    });
    return this;
  }
  getResourceConfig(url) {
    if (!this.structureMap.has(url)) {
      console.warn(`resource manager can not found this url resource: ${url}`);
      return {};
    } else if (this.structureMap.get(url) === url) {
      const config2 = this.configMap.get(url);
      if (!config2) {
        return {};
      } else {
        return {
          [this.configModuleMap[config2.type]]: {
            [config2.vid]: clone(config2)
          }
        };
      }
    } else {
      const configure = {};
      const configMap = this.configMap;
      const configModuleMap = this.configModuleMap;
      const structure = this.structureMap.get(url);
      const recursionStructure = (structure2) => {
        let config2 = configMap.get(structure2.url);
        let module = configModuleMap[config2.type];
        if (!configure[module]) {
          configure[module] = {};
        }
        configure[module][config2.vid] = clone(config2);
        if (structure2.geometry) {
          config2 = configMap.get(structure2.geometry);
          module = configModuleMap[config2.type];
          if (!configure[module]) {
            configure[module] = {};
          }
          configure[module][config2.vid] = clone(config2);
        }
        if (structure2.material) {
          config2 = configMap.get(structure2.material);
          module = configModuleMap[config2.type];
          if (!configure[module]) {
            configure[module] = {};
          }
          configure[module][config2.vid] = clone(config2);
        }
        if (structure2.children && structure2.children.length) {
          for (const objectStructure of structure2.children) {
            recursionStructure(objectStructure);
          }
        }
      };
      recursionStructure(structure);
      return configure;
    }
  }
  hasResource(url) {
    return this.resourceMap.has(url);
  }
  remove(url) {
    if (!this.structureMap.has(url)) {
      console.warn(`resource manager can not found this url resource: ${url}`);
      return this;
    } else if (this.structureMap.get(url) === url) {
      this.structureMap.delete(url);
      this.configMap.delete(url);
      const resouce = this.resourceMap.get(url);
      (resouce == null ? void 0 : resouce.dispose) && resouce.dispose();
      this.resourceMap.delete(url);
      return this;
    } else {
      const configMap = this.configMap;
      const resourceMap = this.resourceMap;
      const structure = this.structureMap.get(url);
      const recursionStructure = (structure2) => {
        configMap.delete(structure2.url);
        resourceMap.delete(structure2.url);
        if (structure2.geometry) {
          configMap.delete(structure2.geometry);
          resourceMap.delete(structure2.geometry);
        }
        if (structure2.material) {
          configMap.delete(structure2.material);
          resourceMap.delete(structure2.material);
        }
        if (structure2.children && structure2.children.length) {
          for (const objectStructure of structure2.children) {
            recursionStructure(objectStructure);
          }
        }
      };
      recursionStructure(structure);
      return this;
    }
  }
  dispose() {
    this.resourceMap.forEach((object, url) => {
      object.dispose && object.dispose();
    });
    this.resourceMap.clear();
    this.configMap.clear();
    this.structureMap.clear();
  }
}
const ResourceManagerPlugin = function(params) {
  if (this.resourceManager) {
    console.warn("engine has installed resourceManager plugin.");
    return false;
  }
  const resourceManager = new ResourceManager(params.resources);
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
  this.addEventListener("dispose", () => {
    this.resourceManager.dispose();
  });
  return true;
};
function isValidKey(key, object) {
  return key in object;
}
const _ProxyBroadcast = class extends EventDispatcher {
  constructor(ignore) {
    super();
    __publicField(this, "ignoreAttribute");
    this.ignoreAttribute = ignore || {};
  }
  static proxyGetter(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  }
  static proxySetter(target, key, value, receiver, broadcast, path) {
    if (typeof key === "symbol") {
      return Reflect.set(target, key, value, receiver);
    }
    let result;
    if (target[key] === void 0) {
      if (typeof value === "object" && value !== null && !_ProxyBroadcast.proxyWeakSet.has(value) && !broadcast.ignoreAttribute[key]) {
        const newPath = path.concat([key]);
        value = broadcast.proxyExtends(value, newPath);
      }
      result = Reflect.set(target, key, value);
      broadcast.broadcast({
        operate: "add",
        path: path.concat([]),
        key,
        value
      });
    } else {
      if (typeof value === "object" && value !== null && !_ProxyBroadcast.proxyWeakSet.has(value) && !broadcast.ignoreAttribute[key]) {
        const newPath = path.concat([key]);
        value = broadcast.proxyExtends(value, newPath);
      }
      result = Reflect.set(target, key, value);
      if (Array.isArray(target) && key === "length") {
        const oldValue = target[Symbol.for(_ProxyBroadcast.arraySymobl)];
        const num = oldValue.length - target.length;
        if (num > 0) {
          let execNum = 0;
          let index = 0;
          for (const value2 of oldValue) {
            if (!target.includes(value2)) {
              broadcast.broadcast({
                operate: "delete",
                path: path.concat([]),
                key: index.toString(),
                value: value2
              });
              execNum += 1;
              index += 1;
              if (execNum === num) {
                break;
              }
            }
          }
        }
        target[Symbol.for(this.arraySymobl)] = target.concat([]);
        return result;
      }
      broadcast.broadcast({
        operate: "set",
        path: path.concat([]),
        key,
        value
      });
    }
    return result;
  }
  static proxyDeleter(target, key, broadcast, path) {
    const value = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (Array.isArray(target) || typeof key === "symbol") {
      return result;
    }
    broadcast.broadcast({
      operate: "delete",
      path: path.concat([]),
      key,
      value
    });
    return result;
  }
  proxyExtends(object, path = []) {
    if (_ProxyBroadcast.proxyWeakSet.has(object) || typeof object !== "object") {
      return object;
    }
    const handler = {
      get: _ProxyBroadcast.proxyGetter,
      set: (target, key, value, receiver) => {
        return _ProxyBroadcast.proxySetter(target, key, value, receiver, this, path);
      },
      deleteProperty: (target, key) => {
        return _ProxyBroadcast.proxyDeleter(target, key, this, path);
      }
    };
    if (typeof object === "object" && object !== null) {
      for (const key in object) {
        const tempPath = path.concat([key]);
        let ignoreAttribute = this.ignoreAttribute;
        let ignore = false;
        for (const tempKey of tempPath.slice(1)) {
          if (ignoreAttribute[tempKey] === true) {
            ignore = true;
            break;
          }
          ignoreAttribute[tempKey] && (ignoreAttribute = ignoreAttribute[tempKey]);
        }
        if (ignore) {
          continue;
        }
        if (isValidKey(key, object) && typeof object[key] === "object" && object[key] !== null) {
          if (Array.isArray(object[key])) {
            object[key][Symbol.for(_ProxyBroadcast.arraySymobl)] = object[key].concat([]);
          }
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
    if (filterMap[key]) {
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
__publicField(ProxyBroadcast, "arraySymobl", "vis.array");
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
  constructor(rule, data, ignore) {
    __publicField(this, "data");
    __publicField(this, "broadcast");
    __publicField(this, "translater");
    this.translater = new Translater().setRule(rule);
    this.broadcast = new ProxyBroadcast(ignore);
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
  addConfig(config2) {
    this.data[config2.vid] = config2;
    return this;
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
  toJSON(compress = true) {
    if (!compress) {
      return JSON.stringify(this.data, stringify);
    } else {
      return JSON.stringify(this.exportConfig(), stringify);
    }
  }
  exportConfig(compress = true) {
    if (!compress) {
      return JSON.parse(JSON.stringify(this.data, stringify), parse);
    } else {
      const data = this.data;
      const target = {};
      const cacheConfigTemplate = {};
      const recursion = (config2, template, result = {}) => {
        for (const key in config2) {
          if (["vid", "type"].includes(key)) {
            result[key] = config2[key];
            continue;
          }
          if (typeof config2[key] === "object" && config2[key] !== null) {
            if (Array.isArray(config2[key])) {
              if (!config2[key].length) {
                continue;
              }
              result[key] = config2[key].map((elem) => {
                if (typeof elem === "object" && elem !== null) {
                  return JSON.parse(JSON.stringify(elem));
                } else {
                  return elem;
                }
              });
              continue;
            }
            result[key] = {};
            if (!template[key]) {
              result[key] = JSON.parse(JSON.stringify(config2[key]));
            } else {
              recursion(config2[key], template[key], result[key]);
              if (Object.keys(result[key]).length === 0) {
                delete result[key];
              }
            }
          } else {
            if (template[key] !== config2[key]) {
              result[key] = config2[key];
            }
          }
        }
      };
      for (const config2 of Object.values(data)) {
        if (!cacheConfigTemplate[config2.type]) {
          if (!CONFIGFACTORY[config2.type]) {
            console.error(`can not font some config with: ${config2.type}`);
            continue;
          }
          cacheConfigTemplate[config2.type] = CONFIGFACTORY[config2.type]();
        }
        target[config2.vid] = {};
        recursion(config2, cacheConfigTemplate[config2.type], target[config2.vid]);
      }
      return target;
    }
  }
  load(configMap) {
    const data = this.data;
    const cacheConfigTemplate = {};
    const restore = (config2, template) => {
      for (const key in template) {
        if (typeof config2[key] === "object" && config2[key] !== null && typeof template[key] === "object" && template[key] !== null) {
          restore(config2[key], template[key]);
        } else if (config2[key] === void 0) {
          config2[key] = template[key];
        }
      }
    };
    for (const key in configMap) {
      const config2 = configMap[key];
      if (!cacheConfigTemplate[config2.type]) {
        if (!CONFIGFACTORY[config2.type]) {
          console.error(`can not font some config with: ${config2.type}`);
          continue;
        }
        cacheConfigTemplate[config2.type] = CONFIGFACTORY[config2.type]();
      }
      restore(config2, cacheConfigTemplate[config2.type]);
      data[key] = config2;
    }
    return this;
  }
  remove(config2) {
    const data = this.data;
    for (const key in config2) {
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
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift() || key;
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`texture rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    const vid = path[0] || key;
    if (validate(vid)) {
      compiler.remove(vid);
    } else {
      console.warn(`texture rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class TextureDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(TextureRule, data, ignore);
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
    if (validate(key) && !path.length && typeof value === "object") {
      compiler.cover(key, value);
      return;
    }
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`material rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    const vid = path[0] || key;
    if (validate(vid)) {
      compiler.remove(vid);
    } else {
      console.warn(`texture rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class MaterialDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(MaterialRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.MATERIAL);
  }
}
class ObjectDataSupport extends DataSupport {
  constructor(rule, data, ignore) {
    !data && (data = Object.create(Object.prototype));
    super(rule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.GROUP);
  }
}
const UNIQUESYMBOL = {
  [CONFIGTYPE.WEBGLRENDERER]: true,
  [CONFIGTYPE.CSS3DRENDERER]: true,
  [CONFIGTYPE.SCENE]: true
};
const ObjectRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (key === "parent") {
    return;
  }
  const tempPath = path.concat([]);
  let vid = key;
  let attribute = key;
  if (tempPath.length) {
    vid = tempPath.shift();
    if (tempPath.length) {
      attribute = tempPath[0];
    }
  }
  if (attribute === "children") {
    if (operate === "add") {
      compiler.addChildren(vid, value);
      return;
    }
    if (operate === "delete") {
      compiler.removeChildren(vid, value);
      return;
    }
  }
  if (attribute.toLocaleUpperCase() in EVENTNAME) {
    const index = Number(tempPath.length > 2 ? tempPath[1] : key);
    if (operate === "add") {
      if (Number.isInteger(Number(key)) && tempPath.length === 1) {
        compiler.addEvent(vid, attribute, value);
        return;
      }
      if (!Number.isInteger(index)) {
        console.error(`${compiler.MODULE} rule: event analysis error.`, input);
        return;
      }
      compiler.updateEvent(vid, attribute, index);
      return;
    }
    if (operate === "set") {
      if (!Number.isInteger(index)) {
        console.error(`${compiler.MODULE} rule: event analysis error.`, input);
        return;
      }
      compiler.updateEvent(vid, attribute, index);
      return;
    }
    if (operate === "delete") {
      if (!Number.isInteger(index)) {
        console.error(`${compiler.MODULE} rule: event analysis error.`, input);
        return;
      }
      compiler.removeEvent(vid, attribute, value);
      return;
    }
  }
  if (operate === "add") {
    if (validate(key) || UNIQUESYMBOL[key]) {
      compiler.add(key, value);
      return;
    }
  }
  if (operate === "set") {
    if ((vid && validate(key) || UNIQUESYMBOL[vid]) && !path.length && typeof value === "object") {
      compiler.cover(vid, value);
      return;
    }
    if (vid && validate(vid) || UNIQUESYMBOL[vid]) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`${compiler.MODULE} rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    if (validate(key) || UNIQUESYMBOL[key]) {
      compiler.remove(key, value);
    }
    return;
  }
};
const LightRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class LightDataSupport extends ObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(LightRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.LIGHT);
  }
}
const GeometryRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  const vid = path.length ? path[0] : key;
  const attribute = path.length >= 2 ? path[1] : key;
  const tempPath = path.length ? path.concat([]).slice(1) : [];
  if (operate === "add") {
    if (validate(vid)) {
      if (attribute === "groups") {
        if (Number.isInteger(Number(key))) {
          compiler.addGroup(vid, value);
          return;
        } else {
          console.warn(`geometry rule illeage groups index: ${key}`);
          return;
        }
      }
      if (tempPath.length > 0) {
        compiler.set(vid, tempPath, value);
      } else {
        compiler.add(vid, value);
      }
    } else {
      console.warn(`geometry rule vid is illeage: '${key}'`);
    }
    return;
  }
  if (operate === "set") {
    if (vid && validate(vid)) {
      if (attribute === "groups") {
        const index = Number(path[2] || key);
        if (!Number.isInteger(index)) {
          console.warn(`geometry rule illeage groups index: ${index}`);
          return;
        }
        compiler.updateGroup(vid, index);
        return;
      }
      compiler.set(vid, tempPath, value);
    } else {
      console.warn(`geometry rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete") {
    if (validate(vid)) {
      if (attribute === "groups") {
        const index = Number(path[2] || key);
        if (!Number.isInteger(index)) {
          console.warn(`geometry rule illeage groups index: ${index}`);
          return;
        }
        compiler.removeGroup(vid, index);
        return;
      }
      if (path.length && path[1] === "path") {
        compiler.set(vid, tempPath, value);
        return;
      }
      compiler.remove(vid);
    } else {
      console.warn(`geometry rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class GeometryDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(GeometryRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.GEOMETRY);
  }
}
const CameraRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class CameraDataSupport extends ObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(CameraRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.CAMERA);
  }
}
const RendererRule = function(input, compiler) {
  const { operate, key, value } = input;
  const path = input.path.concat([]);
  if (operate === "add") {
    compiler.add(value);
    return;
  }
  if (operate === "set") {
    if (validate(key) || key === CONFIGTYPE.WEBGLRENDERER) {
      compiler.add(value);
      return;
    }
    let vid = key;
    if (path.length) {
      vid = path.shift();
    }
    if (validate(vid) || vid === CONFIGTYPE.WEBGLRENDERER) {
      compiler.assembly(vid, (processer) => {
        processer.process({
          path: path.concat([]),
          key,
          value
        });
      });
    } else {
      console.warn(`renderer rule can not support this vid: ${vid}`);
    }
    return;
  }
};
class RendererDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(RendererRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.RENDERER);
  }
}
const SceneRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class SceneDataSupport extends ObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(SceneRule, data, ignore);
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
  constructor(data, ignore) {
    !data && (data = {});
    super(ControlsRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.CONTROLS);
  }
}
class SolidObjectDataSupport extends DataSupport {
  constructor(rule, data, ignore) {
    !data && (data = Object.create(Object.prototype));
    super(rule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.MESH);
  }
}
const SpriteRule = function(notice, compiler) {
  if (notice.key === "geometry") {
    return;
  }
  ObjectRule(notice, compiler);
};
class SpriteDataSupport extends SolidObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(SpriteRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.SPRITE);
  }
}
const LineRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class LineDataSupport extends SolidObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(LineRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.LINE);
  }
}
const MeshRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class MeshDataSupport extends SolidObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(MeshRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.MESH);
  }
}
const PointsRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class PointsDataSupport extends SolidObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(PointsRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.POINTS);
  }
}
const GroupRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class GroupDataSupport extends ObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(GroupRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.GROUP);
  }
}
const PassRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  const tempPath = path.concat([]);
  let vid = key;
  if (tempPath.length) {
    vid = tempPath.shift();
  }
  if (operate === "add") {
    compiler.add(value);
    return;
  }
  if (operate === "set") {
    compiler.set(vid, tempPath, key, value);
  }
  if (operate === "delete") {
    compiler.remove(value.vid);
    return;
  }
};
class PassDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(PassRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.PASS);
  }
}
const AnimationRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    } else {
      console.warn(`animation rule vid is illeage: '${key}'`);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.update(vid, tempPath, key, value);
    } else {
      console.warn(`animation rule vid is illeage: '${vid}'`);
    }
    return;
  }
  if (operate === "delete" || operate === "set" && key === "play" && value === "false") {
    if (validate(key)) {
      compiler.remove(value);
    } else {
      console.warn(`animation rule vid is illeage: '${key}'`);
    }
    return;
  }
};
class AnimationDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(AnimationRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.ANIMATION);
  }
}
const CSS3DRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class CSS3DDataSupport extends ObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(CSS3DRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.CSS3D);
  }
}
const _DataSupportManager = class {
  constructor(parameters) {
    __publicField(this, "cameraDataSupport", new CameraDataSupport());
    __publicField(this, "lightDataSupport", new LightDataSupport());
    __publicField(this, "geometryDataSupport", new GeometryDataSupport());
    __publicField(this, "textureDataSupport", new TextureDataSupport());
    __publicField(this, "materialDataSupport", new MaterialDataSupport());
    __publicField(this, "rendererDataSupport", new RendererDataSupport());
    __publicField(this, "sceneDataSupport", new SceneDataSupport());
    __publicField(this, "controlsDataSupport", new ControlsDataSupport());
    __publicField(this, "spriteDataSupport", new SpriteDataSupport());
    __publicField(this, "lineDataSupport", new LineDataSupport());
    __publicField(this, "meshDataSupport", new MeshDataSupport());
    __publicField(this, "pointsDataSupport", new PointsDataSupport());
    __publicField(this, "groupDataSupport", new GroupDataSupport());
    __publicField(this, "css3DDataSupport", new CSS3DDataSupport());
    __publicField(this, "passDataSupport", new PassDataSupport());
    __publicField(this, "animationDataSupport", new AnimationDataSupport());
    __publicField(this, "dataSupportMap");
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        if (this[key] !== void 0) {
          this[key] = parameters[key];
        }
      });
    }
    const dataSupportMap = new Map();
    Object.keys(this).forEach((key) => {
      const dataSupport = this[key];
      if (dataSupport instanceof DataSupport) {
        dataSupportMap.set(dataSupport.MODULE, dataSupport);
      }
    });
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
  getConfigBySymbol(vid) {
    const dataSupportList = this.dataSupportMap.values();
    for (const dataSupport of dataSupportList) {
      const config2 = dataSupport.getConfig(vid);
      if (config2) {
        return config2;
      }
    }
    return null;
  }
  removeConfigBySymbol(...vids) {
    const dataSupportList = this.dataSupportMap.values();
    for (const vid of vids) {
      for (const dataSupport of dataSupportList) {
        if (dataSupport.existSymbol(vid)) {
          dataSupport.removeConfig(vid);
          break;
        }
      }
    }
    return this;
  }
  getModuleBySymbol(vid) {
    const dataSupportList = this.dataSupportMap.values();
    for (const dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        return dataSupport.MODULE;
      }
    }
    return null;
  }
  applyConfig(...configs) {
    for (const config2 of configs) {
      const module = _DataSupportManager.configModuleMap[config2.type];
      if (module) {
        this.dataSupportMap.get(module).addConfig(config2);
      } else {
        console.warn(`dataSupportManager can not found this config module: ${config2.type}`);
      }
    }
    return this;
  }
  reactiveConfig(config2) {
    const module = _DataSupportManager.configModuleMap[config2.type];
    if (module) {
      return this.dataSupportMap.get(module).addConfig(config2).getConfig(config2.vid);
    } else {
      console.warn(`dataSupportManager can not found this config module: ${config2.type}`);
      return config2;
    }
  }
  load(config2) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config2[module] && dataSupport.load(config2[module]);
    });
    return this;
  }
  remove(config2) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config2[module] && dataSupport.remove(config2[module]);
    });
    return this;
  }
  toJSON(extendsConfig = {}, compress = true) {
    return JSON.stringify(this.exportConfig(extendsConfig, compress), stringify);
  }
  exportConfig(extendsConfig = {}, compress = true) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      extendsConfig[module] = dataSupport.exportConfig(compress);
    });
    return extendsConfig;
  }
};
let DataSupportManager = _DataSupportManager;
__publicField(DataSupportManager, "configModuleMap", CONFIGMODULE);
const DataSupportManagerPlugin = function(params) {
  if (this.dataSupportManager) {
    console.warn("engine has installed dataSupportManager plugin.");
    return false;
  }
  const dataSupportManager = new DataSupportManager(params);
  this.dataSupportManager = dataSupportManager;
  this.applyConfig = function(...config2) {
    this.dataSupportManager.applyConfig(...config2);
    return this;
  };
  this.reactiveConfig = function(config2) {
    return this.dataSupportManager.reactiveConfig(config2);
  };
  this.getConfigBySymbol = function(vid) {
    return this.dataSupportManager.getConfigBySymbol(vid);
  };
  this.removeConfigBySymbol = function(...vids) {
    this.dataSupportManager.removeConfigBySymbol(...vids);
    return this;
  };
  this.toJSON = function() {
    if (this.loaderManager) {
      const assets = {
        assets: JSON.parse(this.loaderManager.toJSON())
      };
      return this.dataSupportManager.toJSON(assets);
    }
    return this.dataSupportManager.toJSON();
  };
  this.exportConfig = function() {
    let extendConfig = {};
    if (this.loaderManager) {
      extendConfig = {
        assets: this.loaderManager.exportConfig()
      };
    }
    return this.dataSupportManager.exportConfig(extendConfig);
  };
  this.completeSet.add(() => {
    const rendererData = this.dataSupportManager.getDataSupport(MODULETYPE.RENDERER).getData();
    if (!rendererData.WebGLRenderer) {
      rendererData.WebGLRenderer = generateConfig(CONFIGTYPE.WEBGLRENDERER);
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
  static applyConfig(config2, object, filter = {}, callBack) {
    const filterMap = Object.assign({
      vid: true,
      type: true
    }, filter);
    const recursiveConfig = (config22, object2) => {
      for (const key in config22) {
        if (filterMap[key]) {
          continue;
        }
        if (typeof config22[key] === "object" && typeof config22[key] !== null && isValidKey(key, object2)) {
          recursiveConfig(config22[key], object2[key]);
          continue;
        }
        if (isValidKey(key, object2)) {
          object2[key] = config22[key];
        }
      }
    };
    recursiveConfig(config2, object);
    callBack && callBack();
  }
  constructor() {
  }
}
const config$d = {
  name: "linearTime",
  multiply: 1
};
const generator$d = function(engine, target, attribute, config2) {
  if (target[attribute] === void 0) {
    console.warn(`object not exist attribute: ${attribute}`, target);
    return (event) => {
    };
  }
  if (typeof target[attribute] !== "number") {
    console.warn(`object attribute is not typeof number.`, target, attribute);
    return (event) => {
    };
  }
  return (event) => {
    target[attribute] += event.delta * config2.multiply;
  };
};
const config$c = {
  name: "sinWave",
  wavelength: 1,
  offset: 0,
  amplitude: 1,
  speed: 1
};
const generator$c = function(engine, target, attribute, config2) {
  if (target[attribute] === void 0) {
    console.warn(`object not exist attribute: ${attribute}`, target);
    return (event) => {
    };
  }
  if (typeof target[attribute] !== "number") {
    console.warn(`object attribute is not typeof number.`, target, attribute);
    return (event) => {
    };
  }
  const origin = target[attribute];
  return (event) => {
    target[attribute] = origin + config2.amplitude * Math.sin(event.total * config2.speed / config2.wavelength) + config2.offset;
  };
};
const _AniScriptLibrary = class {
  static generateConfig(name, merge) {
    if (!_AniScriptLibrary.configLibrary.has(name)) {
      console.warn(`event library can not found config by name: ${name}`);
      return {
        name: ""
      };
    }
    const recursion = (config2, merge2) => {
      for (const key in merge2) {
        if (config2[key] === void 0) {
          continue;
        }
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config2[key], merge2[key]);
        } else {
          config2[key] = merge2[key];
        }
      }
    };
    const template = JSON.parse(JSON.stringify(_AniScriptLibrary.configLibrary.get(name)));
    recursion(template, merge);
    return template;
  }
  static generateScript(engine, target, attribute, config2) {
    if (!_AniScriptLibrary.generatorLibrary.has(config2.name)) {
      console.error(`event library can not found generator by name: ${config2.name}`);
      return () => {
      };
    }
    return _AniScriptLibrary.generatorLibrary.get(config2.name)(engine, target, attribute, config2);
  }
  static has(name) {
    return _AniScriptLibrary.configLibrary.has(name);
  }
};
let AniScriptLibrary = _AniScriptLibrary;
__publicField(AniScriptLibrary, "configLibrary", new Map());
__publicField(AniScriptLibrary, "generatorLibrary", new Map());
__publicField(AniScriptLibrary, "register", function(config2, generator2) {
  if (_AniScriptLibrary.configLibrary.has(config2.name)) {
    console.warn(`EventLibrary has already exist this event generator: ${config2.name}, that will be cover.`);
  }
  _AniScriptLibrary.configLibrary.set(config2.name, JSON.parse(JSON.stringify(config2)));
  _AniScriptLibrary.generatorLibrary.set(config2.name, generator2);
});
AniScriptLibrary.register(config$d, generator$d);
AniScriptLibrary.register(config$c, generator$c);
class AnimationCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.ANIMATION);
    __publicField(this, "target", {});
    __publicField(this, "engine");
    __publicField(this, "objectMapSet", new Set());
    __publicField(this, "scriptAniSymbol", "vis.scriptAni");
  }
  linkObjectMap(...map) {
    for (const objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
    }
    return this;
  }
  linkTextureMap(textureMap) {
    this.objectMapSet.add(textureMap);
    return this;
  }
  linkMaterialMap(materialMap) {
    this.objectMapSet.add(materialMap);
    return this;
  }
  getObject(vid) {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid);
      }
    }
    console.error(`animation compiler can not found object which vid: ${vid}`);
    return {};
  }
  add(vid, config2) {
    const renderManager = this.engine.renderManager;
    let object = this.getObject(config2.target);
    const attributeList = config2.attribute.split(".");
    attributeList.shift();
    const attribute = attributeList.pop();
    for (const key of attributeList) {
      if (object[key] === void 0) {
        console.error(`animaton compiler: target object can not found key: ${key}`, object);
        break;
      }
      object = object[key];
    }
    if (config2.type === CONFIGTYPE.SCRIPTANIMATION) {
      const fun = AniScriptLibrary.generateScript(this.engine, object, attribute, config2.script);
      config2[Symbol.for(this.scriptAniSymbol)] = fun;
      config2.play && renderManager.addEventListener("render", fun);
    } else {
      console.warn(`animation compiler can not support this type config: ${config2.type}`);
    }
    return this;
  }
  update(vid, path, key, value) {
    if (!this.target[vid]) {
      console.warn(`AnimationCompiler can not found vid config: ${vid}`);
      return this;
    }
    const config2 = this.target[vid];
    if (config2.type === CONFIGTYPE.SCRIPTANIMATION) {
      const renderManager = this.engine.renderManager;
      const fun = config2[Symbol.for(this.scriptAniSymbol)];
      if (fun === void 0) {
        console.warn(`AnimationCompiler can not found function in update fun: ${vid}`);
        return this;
      }
      if (key === "play" && value) {
        if (!renderManager.hasEventListener("render", fun)) {
          renderManager.addEventListener("render", fun);
        }
        return this;
      }
      if (key === "play" && !value) {
        renderManager.removeEventListener("render", fun);
        return this;
      }
    }
    return this.remove(this.target[vid]).add(vid, this.target[vid]);
  }
  remove(config2) {
    if (config2.type === CONFIGTYPE.SCRIPTANIMATION) {
      this.engine.renderManager.removeEventListener("render", config2[Symbol.for(this.scriptAniSymbol)]);
    }
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  useEngine(engine) {
    this.engine = engine;
    return this;
  }
  compileAll() {
    for (const config2 of Object.values(this.target)) {
      this.add(config2.vid, config2);
    }
    return this;
  }
  dispose(parameter) {
    for (const config2 of Object.values(this.target)) {
      this.remove(config2);
    }
    return this;
  }
  getObjectSymbol(animation) {
    return null;
  }
  getObjectBySymbol(vid) {
    return null;
  }
}
const config$b = {
  name: "openWindow",
  params: {
    url: ""
  }
};
const generator$b = function(engine, config2) {
  return () => {
    window.open(config2.params.url);
  };
};
const config$a = {
  name: "visibleObject",
  params: {
    target: "",
    visible: true,
    delay: 0
  }
};
const generator$a = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
  if (!target) {
    console.warn(`basic event visibleObject: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  return () => {
    setTimeout(() => {
      target.visible = params.visible;
    }, params.delay);
  };
};
const config$9 = {
  name: "addClass",
  params: {
    target: "",
    className: "",
    delay: 0
  }
};
const generator$9 = function(engine, config2) {
  const params = config2.params;
  const targets = [];
  if (params.target === "all") {
    engine.scene.traverse((object) => {
      if (object instanceof CSS3DObject) {
        targets.push(object);
      }
    });
  } else if (Array.isArray(params.target)) {
    params.target.forEach((symbol) => {
      const target = engine.getObjectBySymbol(symbol);
      if (!target) {
        console.warn(`basic event AddClass: can not found vid object: ${params.target}`);
      } else {
        targets.push(target);
      }
    });
  } else {
    const target = engine.getObjectBySymbol(params.target);
    if (!target) {
      console.warn(`basic event AddClass: can not found vid object: ${params.target}`);
      return () => {
      };
    }
    if (!(target instanceof CSS3DObject)) {
      console.warn(`basic event AddClass: object is not a CSS3DObject.`);
      return () => {
      };
    }
    targets.push(target);
  }
  if (!targets.length) {
    console.warn(`basic event AddClass: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  return () => {
    setTimeout(() => {
      targets.forEach((target) => {
        target.element.classList.add(params.className);
      });
    }, params.delay);
  };
};
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
var TIMINGFUNCTION;
(function(TIMINGFUNCTION2) {
  TIMINGFUNCTION2["ELN"] = "ELN";
  TIMINGFUNCTION2["EQI"] = "EQI";
  TIMINGFUNCTION2["EQO"] = "EQO";
  TIMINGFUNCTION2["EASING_LINEAR_NONE"] = "EASING_LINEAR_NONE";
  TIMINGFUNCTION2["EASING_QUARTIC_IN"] = "EASING_QUARTIC_IN";
  TIMINGFUNCTION2["EASING_QUARTIC_OUT"] = "EASING_QUARTIC_OUT";
  TIMINGFUNCTION2["EASING_QUARTIC_INOUT"] = "EASING_QUARTIC_INOUT";
  TIMINGFUNCTION2["EASING_QUADRATIC_IN"] = "EASING_QUADRATIC_IN";
  TIMINGFUNCTION2["EASING_QUADRATIC_OUT"] = "EASING_QUADRATIC_OUT";
  TIMINGFUNCTION2["EASING_QUADRATIC_INOUT"] = "EASING_QUADRATIC_INOUT";
})(TIMINGFUNCTION || (TIMINGFUNCTION = {}));
const timingFunction = {
  ELN: Easing.Linear.None,
  EQI: Easing.Quartic.In,
  EQO: Easing.Quartic.Out,
  EASING_LINEAR_NONE: Easing.Linear.None,
  EASING_QUARTIC_IN: Easing.Quartic.In,
  EASING_QUARTIC_OUT: Easing.Quartic.Out,
  EASING_QUARTIC_INOUT: Easing.Quartic.InOut,
  EASING_QUADRATIC_IN: Easing.Quadratic.In,
  EASING_QUADRATIC_OUT: Easing.Quadratic.Out,
  EASING_QUADRATIC_INOUT: Easing.Quadratic.InOut
};
const config$8 = {
  name: "moveTo",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$8 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(`real time animation moveTO: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const tween = new Tween(object.position).to(params.position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = params.position.x;
      supportData.position.y = params.position.y;
      supportData.position.z = params.position.z;
      animating = false;
    });
  };
};
const config$7 = {
  name: "moveFromTo",
  params: {
    target: "",
    from: {
      x: 0,
      y: 0,
      z: 0
    },
    to: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$7 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(`real time animation moveTO: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    object.position.set(params.from.x, params.from.y, params.from.z);
    object.updateMatrix();
    object.updateMatrixWorld();
    const tween = new Tween(object.position).to(params.to).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = params.to.x;
      supportData.position.y = params.to.y;
      supportData.position.z = params.to.z;
      animating = false;
    });
  };
};
const config$6 = {
  name: "moveSpacing",
  params: {
    target: "",
    spacing: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$6 = function(engine, config2) {
  const params = config2.params;
  const object = engine.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(`can not found vid object: ${params.target}`);
    return () => {
    };
  }
  if (!(object instanceof Object3D)) {
    console.warn(`object is not instanceof Object3D: ${params.target}`);
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.getConfigBySymbol(params.target);
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const position = {
      x: object.position.x + params.spacing.x,
      y: object.position.y + params.spacing.y,
      z: object.position.z + params.spacing.z
    };
    const tween = new Tween(object.position).to(position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = position.x;
      supportData.position.y = position.y;
      supportData.position.z = position.z;
      animating = false;
    });
  };
};
const config$5 = {
  name: "moveToObject",
  params: {
    target: "",
    to: "",
    offset: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$5 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  const toObject = compiler.getObjectBySymbol(params.to);
  if (!object) {
    console.warn(`real time animation MoveToObject: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  if (!toObject) {
    console.warn(`real time animation MoveToObject: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  const supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
  if (!supportData) {
    console.warn(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const position = {
      x: toObject.position.x + params.offset.x,
      y: toObject.position.y + params.offset.y,
      z: toObject.position.z + params.offset.z
    };
    const tween = new Tween(object.position).to(position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = position.x;
      supportData.position.y = position.y;
      supportData.position.z = position.z;
      animating = false;
    });
  };
};
const config$4 = {
  name: "vector3To",
  params: {
    target: "",
    attribute: ".position",
    props: {
      x: "x",
      y: "y",
      z: "z"
    },
    delay: 0,
    duration: 500,
    to: {},
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$4 = function(engine, config2) {
  var _a, _b, _c;
  const params = config2.params;
  const object = engine.compilerManager.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(`real time animation vector3To: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  let supportData = engine.dataSupportManager.getConfigBySymbol(params.target);
  if (!supportData) {
    console.warn(`real time animation vector3To: can not found object config: ${params.target}`);
    return () => {
    };
  }
  const attributeList = params.attribute.split(".");
  attributeList.shift();
  let targetObject = object;
  for (const key of attributeList) {
    if (targetObject[key] === void 0) {
      console.error(`real time animation vector3To: object can not support key: ${key}`, object);
      return () => {
      };
    }
    targetObject = targetObject[key];
    supportData = supportData[key];
  }
  const props = params.props;
  if (!(props.x in targetObject) || !(props.y in targetObject) || !(props.z in targetObject)) {
    console.error(`real time animation vector3To: object can not support props:`, targetObject, props);
    return () => {
    };
  }
  if (!(props.x in supportData) || !(props.y in supportData) || !(props.z in supportData)) {
    console.error(`real time animation vector3To: config can not support props:`, supportData, props);
    return () => {
    };
  }
  const toObject = {
    x: (_a = params.to.x) != null ? _a : targetObject[props.x],
    y: (_b = params.to.y) != null ? _b : targetObject[props.y],
    z: (_c = params.to.z) != null ? _c : targetObject[props.z]
  };
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const tween = new Tween(targetObject).to(toObject).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData[props.x] = toObject.x;
      supportData[props.y] = toObject.y;
      supportData[props.z] = toObject.z;
      animating = false;
    });
  };
};
const config$3 = {
  name: "focusObject",
  params: {
    target: "",
    space: "world",
    offset: {
      x: 0,
      y: 0,
      z: 20
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    back: true
  }
};
const generator$3 = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
  const camera = engine.camera;
  const cameraConfig = engine.getObjectConfig(camera);
  const orb = engine.orbitControls && engine.orbitControls.object === camera;
  const orbTarget = engine.orbitControls.target;
  if (!target) {
    console.warn(`real time animation focusObject: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  if (!(target instanceof Object3D)) {
    console.warn(`real time animation focusObject: vid object is not a class of THREE.Object3D: ${params.target}`);
    return () => {
    };
  }
  if (!cameraConfig) {
    console.warn(`engine current camera can not found config.`);
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const renderManager = engine.renderManager;
    let position = {
      x: target.position.x + params.offset.x,
      y: target.position.y + params.offset.y,
      z: target.position.z + params.offset.z
    };
    const backPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    if (params.space === "local") {
      const vector3 = new Vector3$1(params.offset.x, params.offset.y, params.offset.z).applyEuler(target.rotation);
      position = {
        x: target.position.x + vector3.x,
        y: target.position.y + vector3.y,
        z: target.position.z + vector3.z
      };
    }
    const positionTween = new Tween(camera.position).to(position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    let upTween;
    const backUp = {
      x: camera.up.x,
      y: camera.up.y,
      z: camera.up.z
    };
    if (params.space === "local") {
      const upVector3 = new Vector3$1(0, 1, 0).applyEuler(target.rotation);
      upTween = new Tween(camera.up).to({
        x: upVector3.x,
        y: upVector3.y,
        z: upVector3.z
      }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    }
    let orbTween;
    const backOrb = {
      x: orbTarget.x,
      y: orbTarget.y,
      z: orbTarget.z
    };
    if (orb) {
      orbTween = new Tween(orbTarget).to(target.position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    }
    let renderFun;
    if (orb && params.space === "local") {
      renderFun = (event) => {
        positionTween.update();
        upTween.update();
        orbTween.update();
      };
    } else if (orb) {
      renderFun = (event) => {
        positionTween.update();
        orbTween.update();
      };
    } else if (params.space === "local") {
      renderFun = (event) => {
        positionTween.update();
        upTween.update();
      };
    } else {
      renderFun = (event) => {
        positionTween.update();
      };
    }
    renderManager.addEventListener("render", renderFun);
    positionTween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      if (cameraConfig) {
        cameraConfig.position.x = position.x;
        cameraConfig.position.y = position.y;
        cameraConfig.position.z = position.z;
      }
      animating = false;
      if (params.back) {
        const backFun = () => {
          const positionTween2 = new Tween(camera.position).to(backPosition).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          let upTween2;
          if (params.space === "local") {
            upTween2 = new Tween(camera.up).to(backUp).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          }
          let orbTween2;
          if (orb) {
            orbTween2 = new Tween(orbTarget).to(backOrb).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          }
          const renderFun2 = (event) => {
            positionTween2.update();
            upTween2 && upTween2.update();
            orbTween2 && orbTween2.update();
          };
          positionTween2.onComplete(() => {
            renderManager.removeEventListener("render", renderFun2);
          });
          renderManager.addEventListener("render", renderFun2);
          document.removeEventListener("dblclick", backFun);
        };
        document.addEventListener("dblclick", backFun);
      }
    });
  };
};
const config$2 = {
  name: "fadeObject",
  params: {
    target: "",
    direction: "out",
    delay: 0,
    duration: 300,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    visible: true
  }
};
const generator$2 = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
  if (!target) {
    console.warn(`real time animation fadeObject: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  const objectConfig = engine.getObjectConfig(target);
  if (!objectConfig.material) {
    console.warn(`real time animation fadeObject: target can not support fade: ${params.target}`);
    return () => {
    };
  }
  const materialList = [];
  const materialConfigList = [];
  const materialSymbolList = Array.isArray(objectConfig.material) ? [].concat(objectConfig.material) : [objectConfig.material];
  for (const vid of materialSymbolList) {
    const material = engine.getObjectBySymbol(vid);
    const materialConfig = engine.getConfigBySymbol(vid);
    if (!(material instanceof Material)) {
      console.error(`real time animation fadeObject: object config material is not instanceof Material: ${vid}`);
      continue;
    }
    if (!materialConfig) {
      console.error(`real time animation fadeObject: object config material can not found config: ${vid}`);
      continue;
    }
    materialList.push(material);
    materialConfigList.push(materialConfig);
  }
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const renderManager = engine.renderManager;
    objectConfig.visible = true;
    materialList.forEach((material, i, arr) => {
      material.visible = true;
      material.transparent = true;
      material.opacity = params.direction === "in" ? 0 : 1;
      material.needsUpdate = true;
      const tween = new Tween(material).to({
        opacity: params.direction === "in" ? 1 : 0
      }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
      const renderFun = (event) => {
        tween.update();
      };
      renderManager.addEventListener("render", renderFun);
      tween.onComplete(() => {
        renderManager.removeEventListener("render", renderFun);
        if (params.direction === "out" && params.visible) {
          materialConfigList[i].visible = false;
          objectConfig.visible = false;
        } else if (params.direction === "in" && params.visible) {
          materialConfigList[i].visible = true;
          objectConfig.visible = true;
        }
        materialConfigList[i].opacity = params.direction === "in" ? 1 : 0;
        animating = false;
      });
    });
  };
};
const config$1 = {
  name: "showToCamera",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: -30
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    back: true
  }
};
const generator$1 = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
  const targetConfig = engine.getConfigBySymbol(params.target);
  const camera = engine.camera;
  if (!target) {
    console.warn(`real time animation showToCamera: can not found vid object: ${params.target}`);
    return () => {
    };
  }
  if (!target) {
    console.warn(`real time animation showToCamera: can not found vid config: ${params.target}`);
    return () => {
    };
  }
  if (!(target instanceof Object3D)) {
    console.warn(`real time animation showToCamera: vid object is not a class of THREE.Object3D: ${params.target}`);
    return () => {
    };
  }
  const matrix4 = new Matrix4$1();
  const euler = new Euler();
  const vector3 = new Vector3$1();
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const renderManager = engine.renderManager;
    vector3.set(params.offset.x, params.offset.y, params.offset.z).applyEuler(camera.rotation);
    vector3.set(camera.position.x + vector3.x, camera.position.y + vector3.y, camera.position.z + vector3.z);
    matrix4.lookAt(camera.position, vector3, camera.up);
    euler.setFromRotationMatrix(matrix4);
    const cachePosition = {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z
    };
    const cacheRotation = {
      x: target.rotation.x,
      y: target.rotation.y,
      z: target.rotation.z
    };
    const positionTween = new Tween(target.position).to({
      x: vector3.x,
      y: vector3.y,
      z: vector3.z
    }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const rotationTween = new Tween(target.rotation).to({
      x: euler.x,
      y: euler.y,
      z: euler.z
    }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      positionTween.update();
      rotationTween.update();
    };
    renderManager.addEventListener("render", renderFun);
    positionTween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      targetConfig.position.x = vector3.x;
      targetConfig.position.y = vector3.y;
      targetConfig.position.z = vector3.z;
      targetConfig.rotation.x = euler.x;
      targetConfig.rotation.y = euler.y;
      targetConfig.rotation.z = euler.z;
      animating = false;
      if (params.back) {
        const backFun = () => {
          const positionTween2 = new Tween(target.position).to(cachePosition).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          const rotationTween2 = new Tween(target.rotation).to(cacheRotation).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
          const renderFun2 = (event) => {
            positionTween2.update();
            rotationTween2.update();
          };
          positionTween2.onComplete(() => {
            renderManager.removeEventListener("render", renderFun2);
            targetConfig.position.x = cachePosition.x;
            targetConfig.position.y = cachePosition.y;
            targetConfig.position.z = cachePosition.z;
            targetConfig.rotation.x = cacheRotation.x;
            targetConfig.rotation.y = cacheRotation.y;
            targetConfig.rotation.z = cacheRotation.z;
          });
          renderManager.addEventListener("render", renderFun2);
          document.removeEventListener("dblclick", backFun);
        };
        document.addEventListener("dblclick", backFun);
      }
    });
  };
};
const config = {
  name: "colorChange",
  params: {
    target: "",
    attribute: "color",
    color: "rgb(255, 255, 255)",
    delay: 0,
    duration: 500,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator = function(engine, config2) {
  const params = config2.params;
  const material = engine.getObjectBySymbol(params.target);
  if (!material) {
    console.warn(`real time animation ColorChange: can not found vid material: ${params.target}`);
    return () => {
    };
  }
  if (!material[params.attribute] || !(material[params.attribute] instanceof Color)) {
    console.warn(`real time animation ColorChange: material attribute is illeage: ${params.attribute}`);
    return () => {
    };
  }
  const supportData = engine.getConfigBySymbol(params.target);
  if (!supportData) {
    console.warn(`real time animation ColorChange: can not found material config: ${params.target}`);
    return () => {
    };
  }
  const color = new Color(params.color);
  const renderManager = engine.renderManager;
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    const tween = new Tween(material[params.attribute]).to({
      r: color.r,
      g: color.g,
      b: color.b
    }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData[params.attribute] = params.color;
      animating = false;
    });
  };
};
const _EventLibrary = class {
  static generateConfig(name, merge) {
    if (!_EventLibrary.configLibrary.has(name)) {
      console.warn(`event library can not found config by name: ${name}`);
      return {
        name: ""
      };
    }
    const recursion = (config2, merge2) => {
      for (const key in merge2) {
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config2[key], merge2[key]);
        } else {
          config2[key] = merge2[key];
        }
      }
    };
    const template = JSON.parse(JSON.stringify(_EventLibrary.configLibrary.get(name)));
    recursion(template, merge);
    return template;
  }
  static generateEvent(config2, engine) {
    if (!_EventLibrary.generatorLibrary.has(config2.name)) {
      console.error(`event library can not found generator by name: ${config2.name}`);
      return () => {
      };
    }
    return _EventLibrary.generatorLibrary.get(config2.name)(engine, config2);
  }
  static has(name) {
    return _EventLibrary.configLibrary.has(name);
  }
};
let EventLibrary = _EventLibrary;
__publicField(EventLibrary, "configLibrary", new Map());
__publicField(EventLibrary, "generatorLibrary", new Map());
__publicField(EventLibrary, "register", function(config2, generator2) {
  if (_EventLibrary.configLibrary.has(config2.name)) {
    console.warn(`EventLibrary has already exist this event generator: ${config2.name}, that will be cover.`);
  }
  _EventLibrary.configLibrary.set(config2.name, JSON.parse(JSON.stringify(config2)));
  _EventLibrary.generatorLibrary.set(config2.name, generator2);
});
EventLibrary.register(config$b, generator$b);
EventLibrary.register(config$a, generator$a);
EventLibrary.register(config$9, generator$9);
EventLibrary.register(config$8, generator$8);
EventLibrary.register(config$7, generator$7);
EventLibrary.register(config$6, generator$6);
EventLibrary.register(config$5, generator$5);
EventLibrary.register(config$4, generator$4);
EventLibrary.register(config$3, generator$3);
EventLibrary.register(config$2, generator$2);
EventLibrary.register(config$1, generator$1);
EventLibrary.register(config, generator);
const _ObjectCompiler = class extends Compiler {
  constructor() {
    super();
    __publicField(this, "IS_OBJECTCOMPILER", true);
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "weakMap");
    __publicField(this, "objectCacheMap");
    __publicField(this, "objectMapSet");
    __publicField(this, "filterAttribute", {
      lookAt: true,
      parent: true,
      children: true,
      pointerdown: true,
      pointermove: true,
      pointerup: true,
      pointerenter: true,
      pointerleave: true,
      click: true,
      dblclick: true,
      contextmenu: true
    });
    __publicField(this, "engine");
    this.map = new Map();
    this.weakMap = new WeakMap();
    this.objectMapSet = new Set();
    this.objectCacheMap = new WeakMap();
  }
  getObject(vid) {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid);
      }
    }
    return null;
  }
  mergeFilterAttribute(object) {
    const recursion = (config2, merge) => {
      for (const key in merge) {
        if (config2[key] === void 0) {
          config2[key] = merge[key];
          continue;
        }
        if (typeof merge[key] === "object") {
          recursion(config2[key], merge[key]);
        } else {
          config2[key] = merge[key];
        }
      }
    };
    recursion(this.filterAttribute, object);
    return this;
  }
  setLookAt(vid, target) {
    if (vid === target) {
      console.error(`can not set object lookAt itself.`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.error(`${this.MODULE}Compiler: can not found object which vid: ${vid}.`);
      return this;
    }
    const model = this.map.get(vid);
    let cacheData = this.objectCacheMap.get(model);
    if (!cacheData) {
      cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
      this.objectCacheMap.set(model, cacheData);
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
    const lookAtTarget = this.getObject(target);
    if (!lookAtTarget) {
      console.warn(`${this.MODULE}Compiler: can not found this vid mapping object: '${vid}'`);
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
  addEvent(vid, eventName, config2) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler : No matching vid found: ${vid}`);
      return this;
    }
    if (!EventLibrary.has(config2.name)) {
      console.warn(`${this.MODULE} compiler: can not support this event: ${config2.name}`);
      return this;
    }
    const object = this.map.get(vid);
    const fun = EventLibrary.generateEvent(config2, this.engine);
    const symbol = Symbol.for(_ObjectCompiler.eventSymbol);
    config2[symbol] = fun;
    object.addEventListener(eventName, fun);
    return this;
  }
  removeEvent(vid, eventName, config2) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler: No matching vid found: ${vid}`);
      return this;
    }
    const object = this.map.get(vid);
    const fun = config2[Symbol.for(_ObjectCompiler.eventSymbol)];
    if (!fun) {
      console.warn(`${this.MODULE} compiler: event remove can not fun found event in config`, config2);
      return this;
    }
    object.removeEventListener(eventName, fun);
    delete config2[Symbol.for(_ObjectCompiler.eventSymbol)];
    return this;
  }
  updateEvent(vid, eventName, index) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler: No matching vid found: ${vid}`);
      return this;
    }
    const object = this.map.get(vid);
    const symbol = Symbol.for(_ObjectCompiler.eventSymbol);
    const config2 = this.target[vid][eventName][index];
    const fun = config2[symbol];
    if (!fun) {
      console.warn(`${this.MODULE} compiler: can not fun found event: ${vid}, ${eventName}, ${index}`);
      return this;
    }
    object.removeEventListener(eventName, fun);
    const newFun = EventLibrary.generateEvent(config2, this.engine);
    config2[symbol] = newFun;
    object.addEventListener(eventName, newFun);
    return this;
  }
  addChildren(vid, target) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler: can not found this vid in compiler: ${vid}.`);
      return this;
    }
    const targetConfig = this.engine.getConfigBySymbol(target);
    if (!targetConfig) {
      console.warn(`${this.MODULE} compiler: can not foud object config: ${target}`);
      return this;
    }
    if (targetConfig.parent && targetConfig.parent !== vid) {
      const parentConfig = this.engine.getConfigBySymbol(targetConfig.parent);
      if (!parentConfig) {
        console.warn(`${this.MODULE} compiler: can not foud object config: ${target}`);
        return this;
      }
      parentConfig.children.splice(parentConfig.children.indexOf(target), 1);
    }
    targetConfig.parent = vid;
    const object = this.map.get(vid);
    const targetObject = this.getObject(target);
    if (!targetObject) {
      console.warn(`${this.MODULE} compiler: can not found this vid in compiler: ${target}.`);
      return this;
    }
    object.add(targetObject);
    return this;
  }
  removeChildren(vid, target) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler: can not found this vid in compiler: ${vid}.`);
      return this;
    }
    const object = this.map.get(vid);
    const targetObject = this.getObject(target);
    if (!targetObject) {
      console.warn(`${this.MODULE} compiler: can not found this vid in compiler: ${target}.`);
      return this;
    }
    object.remove(targetObject);
    const targetConfig = this.engine.getConfigBySymbol(target);
    if (!targetConfig) {
      console.warn(`${this.MODULE} compiler: remove children function can not foud object config: ${target}`);
      return this;
    }
    targetConfig.parent = "";
    return this;
  }
  linkObjectMap(...map) {
    for (const objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
    }
    return this;
  }
  useEngine(engine) {
    this.engine = engine;
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
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  add(vid, config2) {
    const object = this.map.get(vid);
    if (!object) {
      console.error(`${this.MODULE} compiler can not finish add method.`);
      return this;
    }
    const asyncFun = Promise.resolve();
    asyncFun.then(() => {
      this.setLookAt(vid, config2.lookAt);
      if (config2.children.length) {
        for (const target of config2.children) {
          this.addChildren(vid, target);
        }
      }
      for (const eventName of Object.values(EVENTNAME)) {
        const eventList = config2[eventName];
        if (eventList.length) {
          for (const event of eventList) {
            this.addEvent(vid, eventName, event);
          }
        }
      }
    });
    Compiler.applyConfig(config2, object, this.filterAttribute);
    object.updateMatrix();
    object.updateMatrixWorld();
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler can not found this vid mapping object: '${vid}'`);
      return this;
    }
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    let object = this.map.get(vid);
    let filter = this.filterAttribute;
    for (const key2 of path) {
      if (filter[key2]) {
        if (filter[key2] === true) {
          return this;
        } else {
          filter = filter[key2];
        }
      }
      object = object[key2];
    }
    object[key] = value;
    return this;
  }
  cover(vid, config2) {
    const object = this.map.get(vid);
    if (!object) {
      console.error(`${this.MODULE} compiler can not found object: ${vid}.`);
      return this;
    }
    const asyncFun = Promise.resolve();
    asyncFun.then(() => {
      this.setLookAt(vid, config2.lookAt);
      if (config2.children.length) {
        for (const target of config2.children) {
          this.addChildren(vid, target);
        }
      }
      for (const eventName of Object.values(EVENTNAME)) {
        if (object._listeners && object._listeners[eventName]) {
          object._listeners[eventName] = [];
        }
        const eventList = config2[eventName];
        if (eventList.length) {
          for (const event of eventList) {
            this.addEvent(vid, eventName, event);
          }
        }
      }
    });
    Compiler.applyConfig(config2, object, this.filterAttribute);
    return this;
  }
  remove(vid, config2) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE}Compiler: can not found object which vid: ${vid}.`);
      return this;
    }
    if (config2.parent) {
      const parentConfig = this.engine.getConfigBySymbol(config2.parent);
      if (!parentConfig) {
        console.warn(`${this.MODULE} compiler: can not found parent object config: ${config2.parent}`);
      } else {
        if (parentConfig.children.includes(vid)) {
          parentConfig.children.splice(parentConfig.children.indexOf(vid), 1);
        } else {
          console.warn(`${this.MODULE} compiler: can not found vid in its parent config: ${vid}`);
        }
      }
    }
    const object = this.map.get(vid);
    this.weakMap.delete(object);
    this.objectCacheMap.delete(this.map.get(vid));
    this.map.delete(vid);
    return this;
  }
  dispose() {
    this.map.clear();
    this.objectMapSet.clear();
    return this;
  }
};
let ObjectCompiler = _ObjectCompiler;
__publicField(ObjectCompiler, "eventSymbol", "vis.event");
class CameraCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.CAMERA);
    __publicField(this, "constructMap");
    __publicField(this, "cacheCameraMap");
    const constructMap = new Map();
    constructMap.set("PerspectiveCamera", () => new PerspectiveCamera());
    constructMap.set("OrthographicCamera", () => new OrthographicCamera(-50, 50, 50, -50));
    this.constructMap = constructMap;
    this.mergeFilterAttribute({
      scale: true,
      adaptiveWindow: true
    });
    this.cacheCameraMap = new WeakMap();
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
          camera.left = -width / 2;
          camera.right = width / 2;
          camera.top = height / 2;
          camera.bottom = -height / 2;
          camera.updateProjectionMatrix();
        };
      } else {
        console.warn(`camera compiler can not support this class camera:`, camera);
      }
      this.engine.addEventListener("setSize", setSizeFun);
      cacheData.setSizeFun = setSizeFun;
      const domElement = this.engine.dom;
      setSizeFun({
        type: "setSize",
        width: domElement.offsetWidth,
        height: domElement.offsetHeight
      });
    }
    return this;
  }
  add(vid, config2) {
    if (config2.type && this.constructMap.has(config2.type)) {
      const camera = this.constructMap.get(config2.type)();
      this.map.set(vid, camera);
      this.weakMap.set(camera, vid);
      this.setLookAt(config2.vid, config2.lookAt);
      this.setAdaptiveWindow(config2.vid, config2.adaptiveWindow);
      super.add(vid, config2);
      if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
        camera.updateProjectionMatrix();
      }
    } else {
      console.warn(`CameraCompiler: can not support this config type: ${config2.type}`);
    }
    return this;
  }
  cover(vid, config2) {
    this.setLookAt(config2.vid, config2.lookAt);
    this.setAdaptiveWindow(config2.vid, config2.adaptiveWindow);
    return super.cover(vid, config2);
  }
  set(vid, path, key, value) {
    if (key === "adaptiveWindow") {
      return this.setAdaptiveWindow(vid, value);
    }
    super.set(vid, path, key, value);
    const object = this.map.get(vid);
    if (object && (object instanceof PerspectiveCamera || object instanceof OrthographicCamera)) {
      object.updateProjectionMatrix();
    }
    return this;
  }
  dispose() {
    super.dispose();
    return this;
  }
}
class Processor {
  constructor() {
    __publicField(this, "filterMap", {});
    __publicField(this, "assembly", false);
    this.filterMap = Object.assign({
      vid: true,
      type: true
    }, this.filterMap);
  }
  mergeAttribute(path, key, value) {
    if (this.filterMap[path.concat([key]).join(".")]) {
      return;
    }
    let object = this.target;
    if (path.length) {
      for (const key2 of path) {
        object = object[key2];
      }
    }
    object[key] = value;
  }
  mergeObject(callBack) {
    const recursiveConfig = (config2, object) => {
      for (const key in config2) {
        if (this.filterMap[key]) {
          continue;
        }
        if (typeof config2[key] === "object" && typeof config2[key] !== null) {
          recursiveConfig(config2[key], object[key]);
          continue;
        }
        object[key] = config2[key];
      }
    };
    recursiveConfig(this.config, this.target);
    callBack && callBack();
  }
  processAll() {
    const recursiveConfig = (config2, path) => {
      for (const key in config2) {
        if (this.filterMap[path.concat([key]).join(".")]) {
          continue;
        }
        if (typeof config2[key] === "object" && typeof config2[key] !== null) {
          recursiveConfig(config2[key], path.concat([key]));
          continue;
        }
        this.process({ path, key, value: config2[key] });
      }
    };
    recursiveConfig(this.config, []);
    return this;
  }
}
class OrbitControlsProcessor extends Processor {
  constructor() {
    super();
    __publicField(this, "config");
    __publicField(this, "target");
    __publicField(this, "engine");
  }
  assemble(params) {
    this.config = params.config;
    this.target = params.control;
    this.engine = params.engine;
    this.assembly = true;
    return this;
  }
  process(params) {
    if (!this.assembly) {
      console.warn(`OrbitControls Processor unassembled`);
      return this;
    }
    if (params.key === "target" || params.path.length && params.path[0] === "target") {
      this.setTarget(this.config.target);
      return this;
    }
    this.mergeAttribute([], params.key, params.value);
    return this;
  }
  setTarget(target) {
    if (typeof target === "object" && target !== null) {
      this.target.target = new Vector3$1(target.x, target.y, target.z);
    }
  }
  dispose() {
    this.config = void 0;
    this.target = void 0;
    this.assembly = false;
    return this;
  }
}
class TransformControlsProcessor extends Processor {
  constructor() {
    super();
    __publicField(this, "config");
    __publicField(this, "target");
    __publicField(this, "filterMap", {
      translationSnap: true,
      rotationSnap: true,
      scaleSnap: true
    });
  }
  assemble(params) {
    this.config = params.config;
    this.target = params.control;
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
    this.mergeAttribute([], params.key, params.value);
    return this;
  }
  dispose() {
    this.config = void 0;
    this.target = void 0;
    return this;
  }
  snapAllow(value) {
    const config2 = this.config;
    const control = this.target;
    if (value) {
      control.translationSnap = config2.translationSnap;
      control.rotationSnap = config2.rotationSnap;
      control.scaleSnap = config2.scaleSnap;
    } else {
      control.translationSnap = null;
      control.rotationSnap = null;
      control.scaleSnap = null;
    }
    return true;
  }
}
class ControlsCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.CONTROLS);
    __publicField(this, "target", {});
    __publicField(this, "map", new Map());
    __publicField(this, "weakMap", new Map());
    __publicField(this, "engine");
    __publicField(this, "processorMap", {
      [CONFIGTYPE.TRNASFORMCONTROLS]: new TransformControlsProcessor(),
      [CONFIGTYPE.ORBITCONTROLS]: new OrbitControlsProcessor()
    });
  }
  getAssembly(vid) {
    const config2 = this.target[vid];
    if (!config2) {
      console.warn(`controls compiler can not found this config: '${vid}'`);
      return null;
    }
    const processer = this.processorMap[config2.type];
    if (!processer) {
      console.warn(`controls compiler can not support this controls: '${vid}'`);
      return null;
    }
    const control = this.map.get(config2.type);
    if (!control) {
      console.warn(`controls compiler can not found type of control: '${config2.type}'`);
      return null;
    }
    return {
      config: config2,
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
      control: assembly.control,
      engine: this.engine
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
      control: assembly.control,
      engine: this.engine
    }).processAll().dispose();
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  useEngine(engine) {
    if (engine.transformControls) {
      this.map.set(CONFIGTYPE.TRNASFORMCONTROLS, engine.transformControls);
      this.weakMap.set(engine.transformControls, CONFIGTYPE.TRNASFORMCONTROLS);
    }
    if (engine.orbitControls) {
      this.map.set(CONFIGTYPE.ORBITCONTROLS, engine.orbitControls);
      this.weakMap.set(engine.orbitControls, CONFIGTYPE.ORBITCONTROLS);
    }
    this.engine = engine;
    return this;
  }
  compileAll() {
    for (const vid of Object.keys(this.target)) {
      const assembly = this.getAssembly(vid);
      if (!assembly) {
        continue;
      }
      assembly.processer.assemble({
        config: assembly.config,
        control: assembly.control,
        engine: this.engine
      }).processAll().dispose();
    }
    return this;
  }
  dispose() {
    this.map.forEach((controls) => {
      controls.dispose && controls.dispose();
    });
    this.map.clear();
    return this;
  }
  getObjectSymbol(texture) {
    return this.weakMap.get(texture) || null;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
}
class VisCSS3DObject extends CSS3DObject {
  constructor(element = document.createElement("div")) {
    const root = document.createElement("div");
    const width = 50;
    const height = 50;
    root.style.width = `${width}px`;
    root.style.height = `${height}px`;
    root.appendChild(element);
    super(root);
    __publicField(this, "geometry");
    __publicField(this, "_width");
    __publicField(this, "_height");
    __publicField(this, "cacheBox", new Box3$1());
    this.geometry = new PlaneBufferGeometry(width, height);
    this.geometry.computeBoundingBox();
    this._width = width;
    this._height = height;
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(value, this._height);
    this.geometry.computeBoundingBox();
    this.element.style.width = `${value}px`;
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(this._width, value);
    this.geometry.computeBoundingBox();
    this.element.style.height = `${value}px`;
    this._height = value;
  }
}
class CSS3DPlane extends VisCSS3DObject {
  constructor(element = document.createElement("div")) {
    super(element);
    this.element.classList.add("vis-css3d-plane");
  }
  raycast(raycaster, intersects) {
    const box = this.cacheBox.copy(this.geometry.boundingBox);
    box.applyMatrix4(this.matrixWorld);
    if (raycaster.ray.intersectsBox(box)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(this.position),
        object: this,
        point: this.position
      });
    }
  }
}
class CSS3DCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.CSS3D);
    __publicField(this, "resourceMap");
    __publicField(this, "constructMap");
    this.constructMap = new Map();
    this.resourceMap = new Map();
    this.constructMap.set(CONFIGTYPE.CSS3DOBJECT, (config2) => new CSS3DObject(this.getElement(config2.element)));
    this.constructMap.set(CONFIGTYPE.CSS3DPLANE, (config2) => new CSS3DPlane(this.getElement(config2.element)));
    this.constructMap.set(CONFIGTYPE.CSS3DSPRITE, (config2) => new CSS3DSprite(this.getElement(config2.element)));
    this.mergeFilterAttribute({
      element: true,
      interactive: true
    });
  }
  getElement(element) {
    if (!this.resourceMap.has(element)) {
      console.warn(`css3D compiler: can not found resource element: ${element}`);
      return document.createElement("div");
    }
    const resource = this.resourceMap.get(element);
    if (resource instanceof HTMLElement) {
      return resource;
    } else {
      console.warn(`css3D compiler can not suport render this resource type.`, resource.constructor, element);
      return document.createElement("div");
    }
  }
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  add(vid, config2) {
    if (config2.type && this.constructMap.has(config2.type)) {
      const css3d = this.constructMap.get(config2.type)(config2);
      css3d.type = config2.type;
      this.map.set(vid, css3d);
      this.weakMap.set(css3d, vid);
      super.add(vid, config2);
    } else {
      console.warn(`css3D compiler can not support this type: ${config2.type}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`css3D compiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    const object = this.map.get(vid);
    if (key === "element") {
      object.element.innerHTML = "";
      object.element.appendChild(this.getElement(value));
      return this;
    }
    super.set(vid, path, key, value);
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
class CurveGeometry extends BufferGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super();
    __publicField(this, "parameters");
    this.type = "CurveGeometry";
    this.parameters = {
      path: path.map((vector3) => vector3.clone()),
      space,
      divisions
    };
  }
}
class LineCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "LineCurveGeometry";
    if (!path.length) {
      console.warn(`LineCurveGeometry path length at least 1.`);
      return;
    }
    const curvePath = new CurvePath();
    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil((divisions - totalArcLengthDivisions) / curvePath.curves.length);
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions));
  }
}
class SplineCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "SplineCurveGeometry";
    if (!path.length) {
      console.warn(`SplineCurveGeometry path length at least 1.`);
      return;
    }
    const splineCurve = new CatmullRomCurve3(path);
    this.setFromPoints(space ? splineCurve.getSpacedPoints(divisions) : splineCurve.getPoints(divisions));
  }
}
class CubicBezierCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "CubicBezierCurveGeometry";
    const curvePath = new CurvePath();
    if (path.length < 4) {
      console.warn(`CubicBezierCurveGeometry path length at least 4.`);
      return;
    }
    const length = 4 + (path.length - 4) - (path.length - 4) % 3;
    for (let i = 2; i < length; i += 3) {
      curvePath.add(new CubicBezierCurve3(path[i - 2], path[i - 1], path[i], path[i + 1]));
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil((divisions - totalArcLengthDivisions) / curvePath.curves.length);
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions));
  }
}
class QuadraticBezierCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "QuadraticBezierCurveGeometry";
    const curvePath = new CurvePath();
    if (path.length < 3) {
      console.warn(`QuadraticBezierCurveGeometry path length at least 3.`);
      return;
    }
    const length = 3 + (path.length - 3) - (path.length - 3) % 2;
    for (let i = 1; i < length; i += 2) {
      curvePath.add(new QuadraticBezierCurve3(path[i - 1], path[i], path[i + 1]));
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil((divisions - totalArcLengthDivisions) / curvePath.curves.length);
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions));
  }
}
class LineTubeGeometry extends TubeGeometry {
  constructor(path = [], tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {
    if (!path.length) {
      console.warn(`LineTubeGeometry path length at least 1.`);
      return;
    }
    const curvePath = new CurvePath();
    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }
    super(curvePath, tubularSegments, radius, radialSegments, closed);
    this.type = "LineTubeGeometry";
  }
}
class SplineTubeGeometry extends TubeGeometry {
  constructor(path = [], tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {
    if (!path.length) {
      console.warn(`SplineTubeGeometry path length at least 1.`);
      return;
    }
    const splineCurve = new CatmullRomCurve3(path);
    super(splineCurve, tubularSegments, radius, radialSegments, closed);
    this.type = "SplineTubeGeometry";
  }
}
const _GeometryCompiler = class extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.GEOMETRY);
    __publicField(this, "target", {});
    __publicField(this, "map", new Map());
    __publicField(this, "weakMap", new WeakMap());
    __publicField(this, "constructMap");
    __publicField(this, "resourceMap", new Map());
    __publicField(this, "replaceGeometry", new BoxBufferGeometry(5, 5, 5));
    const constructMap = new Map();
    constructMap.set(CONFIGTYPE.BOXGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new BoxBufferGeometry(config2.width, config2.height, config2.depth, config2.widthSegments, config2.heightSegments, config2.depthSegments), config2);
    });
    constructMap.set(CONFIGTYPE.SPHEREGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new SphereBufferGeometry(config2.radius, config2.widthSegments, config2.heightSegments, config2.phiStart, config2.phiLength, config2.thetaStart, config2.thetaLength), config2);
    });
    constructMap.set(CONFIGTYPE.PLANEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new PlaneBufferGeometry(config2.width, config2.height, config2.widthSegments, config2.heightSegments), config2);
    });
    constructMap.set(CONFIGTYPE.LOADGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new LoadGeometry(this.getGeometry(config2.url)), config2);
    });
    constructMap.set(CONFIGTYPE.CUSTOMGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(this.generateGeometry(config2.attribute), config2);
    });
    constructMap.set(CONFIGTYPE.CIRCLEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new CircleBufferGeometry(config2.radius, config2.segments, config2.thetaStart, config2.thetaLength), config2);
    });
    constructMap.set(CONFIGTYPE.CONEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new ConeBufferGeometry(config2.radius, config2.height, config2.radialSegments, config2.heightSegments, config2.openEnded, config2.thetaStart, config2.thetaLength), config2);
    });
    constructMap.set(CONFIGTYPE.CYLINDERGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new CylinderBufferGeometry(config2.radiusTop, config2.radiusBottom, config2.height, config2.radialSegments, config2.heightSegments, config2.openEnded, config2.thetaStart, config2.thetaLength), config2);
    });
    constructMap.set(CONFIGTYPE.EDGESGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new EdgesGeometry(this.map.get(config2.url), config2.thresholdAngle), config2);
    });
    constructMap.set(CONFIGTYPE.LINECURVEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new LineCurveGeometry(config2.path.map((vector3) => new Vector3$1(vector3.x, vector3.y, vector3.z)), config2.divisions, config2.space), config2);
    });
    constructMap.set(CONFIGTYPE.SPLINECURVEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new SplineCurveGeometry(config2.path.map((vector3) => new Vector3$1(vector3.x, vector3.y, vector3.z)), config2.divisions, config2.space), config2);
    });
    constructMap.set(CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new CubicBezierCurveGeometry(config2.path.map((vector3) => new Vector3$1(vector3.x, vector3.y, vector3.z)), config2.divisions, config2.space), config2);
    });
    constructMap.set(CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new QuadraticBezierCurveGeometry(config2.path.map((vector3) => new Vector3$1(vector3.x, vector3.y, vector3.z)), config2.divisions, config2.space), config2);
    });
    constructMap.set(CONFIGTYPE.LINETUBEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new LineTubeGeometry(config2.path.map((vector3) => new Vector3$1(vector3.x, vector3.y, vector3.z)), config2.tubularSegments, config2.radius, config2.radialSegments, config2.closed), config2);
    });
    constructMap.set(CONFIGTYPE.SPLINETUBEGEOMETRY, (config2) => {
      return _GeometryCompiler.transfromAnchor(new SplineTubeGeometry(config2.path.map((vector3) => new Vector3$1(vector3.x, vector3.y, vector3.z)), config2.tubularSegments, config2.radius, config2.radialSegments, config2.closed), config2);
    });
    this.constructMap = constructMap;
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
  getGeometry(url) {
    if (this.map.has(url)) {
      return this.map.get(url);
    }
    return this.getRescource(url);
  }
  generateGeometry(attribute) {
    const geometry = new BufferGeometry();
    attribute.position.length && geometry.setAttribute("position", new Float32BufferAttribute(attribute.position, 3));
    attribute.color.length && geometry.setAttribute("color", new Float32BufferAttribute(attribute.color, 3));
    attribute.normal.length && geometry.setAttribute("normal", new Float32BufferAttribute(attribute.normal, 3));
    attribute.uv.length && geometry.setAttribute("uv", new Float32BufferAttribute(attribute.uv, 2));
    attribute.uv2.length && geometry.setAttribute("uv2", new Float32BufferAttribute(attribute.uv2, 2));
    attribute.index.length && geometry.setIndex(attribute.index);
    return geometry;
  }
  getMap() {
    return this.map;
  }
  useEngine(engine) {
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  add(vid, config2) {
    if (config2.type && this.constructMap.has(config2.type)) {
      const geometry = this.constructMap.get(config2.type)(config2);
      geometry.clearGroups();
      for (const group of config2.groups) {
        geometry.addGroup(group.start, group.count, group.materialIndex);
      }
      this.map.set(vid, geometry);
      this.weakMap.set(geometry, vid);
    }
    return this;
  }
  addGroup(vid, group) {
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler can not found object with vid: ${vid}`);
      return this;
    }
    const geometry = this.map.get(vid);
    geometry.addGroup(group.start, group.count, group.materialIndex);
    return this;
  }
  updateGroup(vid, index) {
    return this.removeGroup(vid, index).addGroup(vid, this.target[vid].groups[index]);
  }
  removeGroup(vid, index) {
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler can not found object with vid: ${vid}`);
      return this;
    }
    const geometry = this.map.get(vid);
    geometry.groups.splice(index, 1);
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
    const config2 = this.target[vid];
    const newGeometry = this.constructMap.get(config2.type)(config2);
    currentGeometry.copy(newGeometry);
    currentGeometry.dispatchEvent({
      type: "update"
    });
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
    this.weakMap.delete(geometry);
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
  getObjectSymbol(texture) {
    return this.weakMap.get(texture) || null;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
};
let GeometryCompiler = _GeometryCompiler;
__publicField(GeometryCompiler, "transfromAnchor", function(geometry, config2) {
  if (!(geometry instanceof CurveGeometry) && !(geometry instanceof TubeGeometry)) {
    geometry.center();
  }
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const position = config2.position;
  const rotation = config2.rotation;
  const scale = config2.scale;
  const quaternion = new Quaternion$1().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z, "XYZ"));
  geometry.applyQuaternion(quaternion);
  geometry.scale(scale.x, scale.y, scale.z);
  if (!(geometry instanceof CurveGeometry) && !(geometry instanceof TubeGeometry)) {
    geometry.center();
  }
  geometry.computeBoundingBox();
  geometry.translate((box.max.x - box.min.x) / 2 * position.x, (box.max.y - box.min.y) / 2 * position.y, (box.max.z - box.min.z) / 2 * position.z);
  return geometry;
});
class GroupCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.GROUP);
  }
  add(vid, config2) {
    const group = new Group$1();
    this.map.set(vid, group);
    this.weakMap.set(group, vid);
    super.add(vid, config2);
    return this;
  }
  dispose() {
    super.dispose();
    return this;
  }
}
class LightCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.LIGHT);
    __publicField(this, "constructMap");
    this.constructMap = new Map();
    this.constructMap.set(CONFIGTYPE.POINTLIGHT, () => new PointLight());
    this.constructMap.set(CONFIGTYPE.SPOTLIGHT, () => new SpotLight());
    this.constructMap.set(CONFIGTYPE.AMBIENTLIGHT, () => new AmbientLight());
    this.constructMap.set(CONFIGTYPE.DIRECTIONALLIGHT, () => new DirectionalLight());
    this.mergeFilterAttribute({
      color: true,
      scale: true,
      rotation: true
    });
  }
  setLookAt(vid, target) {
    return this;
  }
  add(vid, config2) {
    if (config2.type && this.constructMap.has(config2.type)) {
      const light = this.constructMap.get(config2.type)();
      light.color = new Color(config2.color);
      this.map.set(vid, light);
      this.weakMap.set(light, vid);
      super.add(vid, config2);
    } else {
      console.warn(`LightCompiler: can not support Light type: ${config2.type}.`);
    }
    return this;
  }
  cover(vid, config2) {
    const light = this.map.get(vid);
    if (!light) {
      console.warn(`light compiler can not found light: ${vid}`);
      return this;
    }
    light.color = new Color(config2.color);
    return super.cover(vid, config2);
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`LightCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    const object = this.map.get(vid);
    if (key === "color") {
      object.color = new Color(value);
      return this;
    }
    super.set(vid, path, key, value);
    return this;
  }
  dispose() {
    super.dispose();
    return this;
  }
}
class SolidObjectCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "IS_SOLIDOBJECTCOMPILER", true);
    __publicField(this, "geometryMap");
    __publicField(this, "materialMap");
    this.geometryMap = new Map();
    this.materialMap = new Map();
    this.mergeFilterAttribute({
      geometry: true,
      material: true
    });
  }
  getMaterial(vid) {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid);
      } else {
        console.warn(`${this.MODULE}Compiler: can not found material which vid: ${vid}`);
        return this.getReplaceMaterial();
      }
    } else {
      console.warn(`${this.MODULE}Compiler: material vid parameter is illegal: ${vid}`);
      return this.getReplaceMaterial();
    }
  }
  getGeometry(vid) {
    if (validate(vid)) {
      if (this.geometryMap.has(vid)) {
        return this.geometryMap.get(vid);
      } else {
        console.warn(`${this.MODULE}Compiler: can not found geometry which vid: ${vid}`);
        return this.getReplaceGeometry();
      }
    } else {
      console.warn(`${this.MODULE}Compiler: geometry vid parameter is illegal: ${vid}`);
      return this.getReplaceGeometry();
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
  add(vid, config2) {
    const object = this.map.get(vid);
    if (!object) {
      console.error(`${this.MODULE} compiler can not finish add method.`);
      return this;
    }
    if (Array.isArray(object.material)) {
      for (const material2 of object.material) {
        material2.dispose();
      }
    } else {
      object.material.dispose();
    }
    let material;
    if (typeof config2.material === "string") {
      material = this.getMaterial(config2.material);
    } else {
      material = config2.material.map((vid2) => this.getMaterial(vid2));
    }
    object.material = material;
    if (!object.isSprite) {
      object.geometry.dispose();
      object.geometry = this.getGeometry(config2.geometry);
    }
    super.add(vid, config2);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler can not found this vid mapping object: '${vid}'`);
      return this;
    }
    const object = this.map.get(vid);
    if (key === "geometry" && !object.isSprite) {
      object.geometry = this.getGeometry(value);
      return this;
    }
    if (key === "material") {
      object.material = this.getMaterial(value);
      return this;
    }
    super.set(vid, path, key, value);
    return this;
  }
}
class LineCompiler extends SolidObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.LINE);
    __publicField(this, "replaceMaterial", new LineBasicMaterial({
      color: "rgb(150, 150, 150)"
    }));
    __publicField(this, "replaceGeometry", new BoxBufferGeometry(10, 10, 10));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config2) {
    const object = new Line();
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    super.add(vid, config2);
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
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.MATERIAL);
    __publicField(this, "target", {});
    __publicField(this, "map", new Map());
    __publicField(this, "weakMap", new WeakMap());
    __publicField(this, "constructMap", new Map());
    __publicField(this, "mapAttribute", {
      roughnessMap: true,
      normalMap: true,
      metalnessMap: true,
      map: true,
      lightMap: true,
      envMap: true,
      emissiveMap: true,
      displacementMap: true,
      bumpMap: true,
      alphaMap: true,
      aoMap: true,
      specularMap: true
    });
    __publicField(this, "colorAttribute", {
      color: true,
      emissive: true,
      specular: true
    });
    __publicField(this, "shaderAttribute", {
      shader: true
    });
    __publicField(this, "needsUpdateAttribute", {
      transparent: true
    });
    __publicField(this, "texturelMap", new Map());
    __publicField(this, "resourceMap", new Map());
    __publicField(this, "cachaColor", new Color());
    const constructMap = new Map();
    constructMap.set(CONFIGTYPE.MESHBASICMATERIAL, () => new MeshBasicMaterial());
    constructMap.set(CONFIGTYPE.MESHSTANDARDMATERIAL, () => new MeshStandardMaterial());
    constructMap.set(CONFIGTYPE.MESHPHONGMATERIAL, () => new MeshPhongMaterial());
    constructMap.set(CONFIGTYPE.SPRITEMATERIAL, () => new SpriteMaterial());
    constructMap.set(CONFIGTYPE.LINEBASICMATERIAL, () => new LineBasicMaterial());
    constructMap.set(CONFIGTYPE.POINTSMATERIAL, () => new PointsMaterial());
    constructMap.set(CONFIGTYPE.SHADERMATERIAL, (config2) => {
      const shader2 = ShaderLibrary.getShader(config2.shader);
      const material = new ShaderMaterial();
      (shader2 == null ? void 0 : shader2.vertexShader) && (material.vertexShader = shader2.vertexShader);
      (shader2 == null ? void 0 : shader2.fragmentShader) && (material.fragmentShader = shader2.fragmentShader);
      (shader2 == null ? void 0 : shader2.uniforms) && (material.uniforms = shader2.uniforms);
      return material;
    });
    this.constructMap = constructMap;
  }
  mergeMaterial(material, config2) {
    const tempConfig = JSON.parse(JSON.stringify(config2));
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
    Compiler.applyConfig(config2, material, Object.assign(filterMap, this.shaderAttribute));
    material.needsUpdate = true;
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
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  linkTextureMap(textureMap) {
    this.texturelMap = textureMap;
    return this;
  }
  add(vid, config2) {
    if (config2.type && this.constructMap.has(config2.type)) {
      const material = this.constructMap.get(config2.type)(config2);
      this.mergeMaterial(material, config2);
      this.map.set(vid, material);
      this.weakMap.set(material, vid);
    } else {
      console.warn(`material compiler can not support this type: ${config2.type}`);
    }
    return this;
  }
  set(vid, path, key, value) {
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
    let config2 = material;
    path.forEach((key2, i, arr) => {
      config2 = config2[key2];
    });
    config2[key] = value;
    if (this.needsUpdateAttribute[key]) {
      material.needsUpdate = true;
    }
    return this;
  }
  cover(vid, config2) {
    if (!this.map.has(vid)) {
      console.warn(`material compiler set function: can not found material which vid is: '${vid}'`);
      return this;
    }
    return this.mergeMaterial(this.map.get(vid), config2);
  }
  remove(vid) {
    if (!this.map.has(vid)) {
      console.warn(`material compiler set function: can not found material which vid is: '${vid}'`);
      return this;
    }
    const material = this.map.get(vid);
    material.dispose();
    this.map.delete(vid);
    this.weakMap.delete(material);
    return this;
  }
  getMap() {
    return this.map;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  useEngine(engine) {
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
  getObjectSymbol(object) {
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
}
class MeshCompiler extends SolidObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.MESH);
    __publicField(this, "replaceMaterial", new MeshBasicMaterial({
      color: "rgb(150, 150, 150)"
    }));
    __publicField(this, "replaceGeometry", new BoxBufferGeometry(10, 10, 10));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config2) {
    const object = new Mesh();
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    super.add(vid, config2);
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class PassCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.PASS);
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "weakMap");
    __publicField(this, "constructMap");
    __publicField(this, "composer");
    __publicField(this, "width", window.innerWidth * window.devicePixelRatio);
    __publicField(this, "height", window.innerHeight * window.devicePixelRatio);
    this.map = new Map();
    this.weakMap = new WeakMap();
    const constructMap = new Map();
    constructMap.set(CONFIGTYPE.SMAAPASS, () => new SMAAPass(this.width, this.height));
    constructMap.set(CONFIGTYPE.UNREALBLOOMPASS, (config2) => new UnrealBloomPass(new Vector2$1(this.width, this.height), config2.strength, config2.radius, config2.threshold));
    this.constructMap = constructMap;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  useEngine(engine) {
    if (!engine.effectComposer) {
      console.warn(`engine need install effectComposer plugin that can use pass compiler.`);
      return this;
    }
    this.composer = engine.effectComposer;
    const pixelRatio = this.composer.renderer.getPixelRatio();
    this.width = Number(this.composer.renderer.domElement.getAttribute("width")) * pixelRatio;
    this.height = Number(this.composer.renderer.domElement.getAttribute("height")) * pixelRatio;
    return this;
  }
  add(config2) {
    if (this.constructMap.has(config2.type)) {
      const pass = this.constructMap.get(config2.type)(config2);
      this.composer.addPass(pass);
      this.map.set(config2.vid, pass);
      this.weakMap.set(pass, config2.vid);
    } else {
      console.warn(`pass compiler can not support this type pass: ${config2.type}.`);
    }
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`pass compiler set function: can not found material which vid is: '${vid}'`);
      return this;
    }
    const pass = this.map.get(vid);
    let config2 = pass;
    path.forEach((key2, i, arr) => {
      config2 = config2[key2];
    });
    config2[key] = value;
    return this;
  }
  remove(vid) {
    if (!this.map.has(vid)) {
      console.warn(`pass compiler can not found this vid pass: ${vid}.`);
      return this;
    }
    const pass = this.map.get(vid);
    this.composer.removePass(pass);
    this.map.delete(vid);
    this.weakMap.delete(pass);
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const config2 of Object.values(target)) {
      this.add(config2);
    }
    return this;
  }
  dispose() {
    this.map.clear();
    return this;
  }
  getObjectSymbol(object) {
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
}
class PointsCompiler extends SolidObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.POINTS);
    __publicField(this, "replaceMaterial", new PointsMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new DodecahedronBufferGeometry(5));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config2) {
    const object = new Points();
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    super.add(vid, config2);
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class WebGLRendererProcessor extends Processor {
  constructor() {
    super();
    __publicField(this, "target");
    __publicField(this, "config");
    __publicField(this, "engine");
    __publicField(this, "rendererCacheData");
    this.rendererCacheData = {};
  }
  assemble(params) {
    this.target = params.renderer;
    this.config = params.config;
    this.engine = params.engine;
    this.assembly = true;
    return this;
  }
  process(params) {
    if (!this.assembly) {
      console.warn(`webGLRenderer Processor unassembled`);
      return this;
    }
    if (this[params.key]) {
      this[params.key](params.value);
      return this;
    }
    if (params.path.length && this[params.path[0]]) {
      this[params.path[0]](params.value);
      return this;
    }
    this.mergeAttribute(params.path, params.key, params.value);
    return this;
  }
  dispose() {
    this.target = void 0;
    this.config = void 0;
    this.engine = void 0;
    this.assembly = false;
    return this;
  }
  clearColor(value) {
    const alpha = Number(value.slice(0, -1).split(",").pop().trim());
    this.target.setClearColor(value, alpha);
    this.target.clear();
    return this;
  }
  pixelRatio(value) {
    this.target.setPixelRatio(value);
    this.target.clear();
    return this;
  }
  size() {
    const renderer = this.target;
    const vector2 = this.config.size;
    if (vector2) {
      renderer.setSize(vector2.x, vector2.y);
    } else {
      const domElement = renderer.domElement;
      renderer.setSize(domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  viewport() {
    const renderer = this.target;
    const config2 = this.config.viewport;
    if (config2) {
      renderer.setViewport(config2.x, config2.y, config2.width, config2.height);
    } else {
      const domElement = renderer.domElement;
      renderer.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  scissor() {
    const renderer = this.target;
    const config2 = this.config.scissor;
    if (config2) {
      renderer.setScissorTest(true);
      renderer.setScissor(config2.x, config2.y, config2.width, config2.height);
    } else {
      renderer.setScissorTest(false);
      const domElement = renderer.domElement;
      renderer.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  adaptiveCamera(value) {
    if (!this.engine) {
      console.warn(`renderer compiler is not set engine.`);
      return this;
    }
    const renderer = this.target;
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
        const camera = engine.camera;
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
}
class RendererCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "MODULE", MODULETYPE.RENDERER);
    __publicField(this, "target");
    __publicField(this, "engine");
    __publicField(this, "processorMap", {
      [CONFIGTYPE.WEBGLRENDERER]: new WebGLRendererProcessor()
    });
    __publicField(this, "map", new Map());
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.target = {};
      this.engine = new Engine();
    }
  }
  assembly(vid, callback) {
    const config2 = this.target[vid];
    if (!config2) {
      console.warn(`controls compiler can not found this config: '${vid}'`);
      return;
    }
    const processer = this.processorMap[config2.type];
    if (!processer) {
      console.warn(`renderer compiler can not support this renderer: '${vid}'`);
      return;
    }
    const renderer = this.map.get(vid);
    if (!renderer) {
      console.warn(`renderer compiler can not found type of renderer: '${config2.type}'`);
      return;
    }
    processer.dispose().assemble({
      config: config2,
      renderer,
      processer,
      engine: this.engine
    });
    callback(processer);
  }
  add(config2) {
    if (config2.type === CONFIGTYPE.WEBGLRENDERER) {
      this.map.set(config2.vid, this.engine.webGLRenderer);
    }
    this.assembly(config2.vid, (processer) => {
      processer.processAll().dispose();
    });
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  useEngine(engine) {
    if (engine.webGLRenderer) {
      this.map.set(CONFIGTYPE.WEBGLRENDERER, engine.webGLRenderer);
    }
    this.engine = engine;
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const config2 of Object.values(target)) {
      this.add(config2);
    }
    return this;
  }
  dispose() {
    this.map.forEach((renderer, vid) => {
      renderer.dispose && renderer.dispose();
    });
    return this;
  }
  getObjectSymbol(renderer) {
    let result = null;
    this.map.forEach((rend, vid) => {
      if (rend === renderer) {
        result = vid;
      }
    });
    return result;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
}
class SceneCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.SCENE);
    __publicField(this, "textureMap");
    __publicField(this, "fogCache");
    this.textureMap = new Map();
    this.fogCache = null;
    this.mergeFilterAttribute({
      background: true,
      environment: true,
      fog: true
    });
  }
  setLookAt(vid, target) {
    return this;
  }
  background(vid, value) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler can not found this vid mapping object: '${vid}'`);
      return;
    }
    const scene = this.map.get(vid);
    if (!value) {
      scene.background = null;
      return;
    }
    if (validate(value)) {
      if (this.textureMap.has(value)) {
        scene.background = this.textureMap.get(value);
      } else {
        console.warn(`scene compiler can not found this vid texture : '${value}'`);
      }
    } else {
      scene.background = new Color(value);
    }
  }
  environment(vid, value) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler can not found this vid mapping object: '${vid}'`);
      return;
    }
    const scene = this.map.get(vid);
    if (!value) {
      scene.environment = null;
      return;
    }
    if (validate(value)) {
      if (this.textureMap.has(value)) {
        scene.environment = this.textureMap.get(value);
      } else {
        console.warn(`scene compiler can not found this vid texture : '${value}'`);
      }
    } else {
      console.warn(`this vid is illegal: '${value}'`);
    }
  }
  fog(vid, config2) {
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler can not found this vid mapping object: '${vid}'`);
      return;
    }
    const scene = this.map.get(vid);
    if (config2.type === "") {
      this.fogCache = null;
      scene.fog = null;
      return;
    }
    if (config2.type === "Fog") {
      if (this.fogCache instanceof Fog) {
        const fog = this.fogCache;
        fog.color = new Color(config2.color);
        fog.near = config2.near;
        fog.far = config2.far;
      } else {
        scene.fog = new Fog(config2.color, config2.near, config2.far);
        this.fogCache = scene.fog;
      }
      return;
    }
    if (config2.type === "FogExp2") {
      if (this.fogCache instanceof FogExp2) {
        const fog = this.fogCache;
        fog.color = new Color(config2.color);
        fog.density = config2.density;
      } else {
        scene.fog = new FogExp2(config2.color, config2.density);
        this.fogCache = scene.fog;
      }
      return;
    }
    console.warn(`scene compiler can not support this type fog:'${config2.type}'`);
  }
  linkTextureMap(map) {
    this.textureMap = map;
    return this;
  }
  add(vid, config2) {
    const scene = new Scene();
    this.map.set(vid, scene);
    this.weakMap.set(scene, vid);
    this.background(vid, config2.background);
    this.environment(vid, config2.environment);
    this.fog(vid, config2.fog);
    super.add(vid, config2);
    return this;
  }
  cover(vid, config2) {
    this.background(vid, config2.background);
    this.environment(vid, config2.environment);
    this.fog(vid, config2.fog);
    return super.cover(vid, config2);
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`sceneCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    const attribute = path.length ? path[0] : key;
    const actionMap = {
      background: () => this.background(vid, value),
      environment: () => this.environment(vid, value),
      fog: () => this.fog(vid, this.target[vid].fog)
    };
    if (actionMap[attribute]) {
      actionMap[attribute]();
      return this;
    }
    super.set(vid, path, key, value);
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  dispose() {
    super.dispose();
    return this;
  }
}
class SpriteCompiler extends SolidObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.SPRITE);
    __publicField(this, "replaceMaterial", new SpriteMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new PlaneBufferGeometry(1, 1));
    this.mergeFilterAttribute({
      geometry: true
    });
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`SpriteCompiler: can not use geometry in SpriteCompiler.`);
    return this.replaceGeometry;
  }
  setLookAt(vid, target) {
    return this;
  }
  getMaterial(vid) {
    const tempMaterial = super.getMaterial(vid);
    if (tempMaterial instanceof SpriteMaterial) {
      return tempMaterial;
    } else {
      console.warn(`SpriteCompiler: sprite object can not support this type material: ${tempMaterial.type}, vid: ${vid}.`);
      return this.getReplaceMaterial();
    }
  }
  add(vid, config2) {
    const sprite = new Sprite();
    this.map.set(vid, sprite);
    this.weakMap.set(sprite, vid);
    super.add(vid, config2);
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
class CanvasGenerator {
  constructor(parameters) {
    __publicField(this, "canvas");
    this.canvas = document.createElement("canvas");
    const devicePixelRatio = window.devicePixelRatio;
    this.canvas.width = ((parameters == null ? void 0 : parameters.width) || 512) * devicePixelRatio;
    this.canvas.height = ((parameters == null ? void 0 : parameters.height) || 512) * devicePixelRatio;
    this.canvas.style.backgroundColor = (parameters == null ? void 0 : parameters.bgColor) || "rgb(255, 255, 255)";
    const ctx = this.canvas.getContext("2d");
    ctx && ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  get() {
    return this.canvas;
  }
  getDom() {
    return this.canvas;
  }
  clear(x = 0, y = 0, width, height) {
    !width && (width = this.canvas.width);
    !height && (height = this.canvas.height);
    const ctx = this.canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(x, y, width, height);
      return this;
    } else {
      console.warn(`you browser can not support canvas 2d`);
      return this;
    }
  }
  draw(fun) {
    const ctx = this.canvas.getContext("2d");
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
    if (parameters == null ? void 0 : parameters.scale) {
      canvas.style.transform = `scale(${parameters.scale})`;
    }
    document.body.appendChild(this.canvas);
    return this;
  }
}
const _TextureCompiler = class extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.TEXTURE);
    __publicField(this, "target", {});
    __publicField(this, "map");
    __publicField(this, "weakMap");
    __publicField(this, "constructMap");
    __publicField(this, "resourceMap");
    this.map = new Map();
    this.weakMap = new WeakMap();
    this.resourceMap = new Map();
    const constructMap = new Map();
    constructMap.set(CONFIGTYPE.IMAGETEXTURE, () => new ImageTexture());
    constructMap.set(CONFIGTYPE.CUBETEXTURE, () => new CubeTexture());
    constructMap.set(CONFIGTYPE.CANVASTEXTURE, () => new CanvasTexture(document.createElement("canvas")));
    constructMap.set(CONFIGTYPE.VIDEOTEXTURE, () => new VideoTexture(document.createElement("video")));
    this.constructMap = constructMap;
  }
  getResource(url) {
    if (!url) {
      return _TextureCompiler.replaceImage;
    }
    const resourceMap = this.resourceMap;
    if (resourceMap.has(url)) {
      const resource = resourceMap.get(url);
      if (resource instanceof HTMLImageElement || resource instanceof HTMLCanvasElement || resource instanceof HTMLVideoElement) {
        return resource;
      } else {
        console.error(`this url mapping resource is not a texture image class: ${url}`);
        return _TextureCompiler.replaceImage;
      }
    } else {
      console.warn(`resource can not font url: ${url}`);
      return _TextureCompiler.replaceImage;
    }
  }
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  add(vid, config2) {
    if (validate(vid)) {
      if (config2.type && this.constructMap.has(config2.type)) {
        const texture = this.constructMap.get(config2.type)();
        const tempConfig = JSON.parse(JSON.stringify(config2));
        delete tempConfig.type;
        delete tempConfig.vid;
        if ([
          CONFIGTYPE.IMAGETEXTURE,
          CONFIGTYPE.CANVASTEXTURE,
          CONFIGTYPE.VIDEOTEXTURE
        ].includes(config2.type)) {
          texture.image = this.getResource(tempConfig.url);
          delete tempConfig.url;
        } else if (config2.type === CONFIGTYPE.CUBETEXTURE) {
          const cube = config2.cube;
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
        this.weakMap.set(texture, vid);
      } else {
        console.warn(`texture compiler can not support this type: ${config2.type}`);
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
    if (!path.length && key === "url") {
      const config22 = this.target[vid];
      if ([
        CONFIGTYPE.IMAGETEXTURE,
        CONFIGTYPE.CANVASTEXTURE,
        CONFIGTYPE.VIDEOTEXTURE
      ].includes(config22.type)) {
        texture.image = this.getResource(value);
      } else {
        console.warn(`texture compiler can not support this type config set url: ${config22.type}`);
      }
      return this;
    }
    if (key === "needsUpdate") {
      if (value) {
        texture.needsUpdate = true;
        const config22 = this.target[vid];
        config22.needsUpdate = false;
      }
      return this;
    }
    let config2 = texture;
    for (const key2 of path) {
      if (config2[key2] === void 0) {
        console.warn(`texture compiler set function: can not found key:${key2} in object.`);
        return this;
      }
      config2 = config2[key2];
    }
    config2[key] = value;
    texture.needsUpdate = true;
    return this;
  }
  remove(vid) {
    if (!this.map.has(vid)) {
      console.warn(`texture compiler can not found vid match object: ${vid}`);
      return this;
    }
    const texture = this.map.get(vid);
    texture.dispose();
    this.map.delete(vid);
    this.weakMap.delete(texture);
    return this;
  }
  getMap() {
    return this.map;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  useEngine(engine) {
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
    this.map.forEach((texture, vid) => {
      texture.dispose();
    });
    this.map.clear();
    return this;
  }
  getObjectSymbol(texture) {
    return this.weakMap.get(texture) || null;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
};
let TextureCompiler = _TextureCompiler;
__publicField(TextureCompiler, "replaceImage", new CanvasGenerator({
  width: 512,
  height: 512
}).draw((ctx) => {
  ctx.translate(256, 256);
  ctx.font = "52px";
  ctx.fillStyle = "white";
  ctx.fillText("\u6682\u65E0\u56FE\u7247", 0, 0);
}).get());
class CompilerManager {
  constructor(parameters) {
    __publicField(this, "cameraCompiler", new CameraCompiler());
    __publicField(this, "lightCompiler", new LightCompiler());
    __publicField(this, "geometryCompiler", new GeometryCompiler());
    __publicField(this, "textureCompiler", new TextureCompiler());
    __publicField(this, "materialCompiler", new MaterialCompiler());
    __publicField(this, "rendererCompiler", new RendererCompiler());
    __publicField(this, "sceneCompiler", new SceneCompiler());
    __publicField(this, "controlsCompiler", new ControlsCompiler());
    __publicField(this, "spriteCompiler", new SpriteCompiler());
    __publicField(this, "lineCompiler", new LineCompiler());
    __publicField(this, "meshCompiler", new MeshCompiler());
    __publicField(this, "pointsCompiler", new PointsCompiler());
    __publicField(this, "groupCompiler", new GroupCompiler());
    __publicField(this, "css3DCompiler", new CSS3DCompiler());
    __publicField(this, "passCompiler", new PassCompiler());
    __publicField(this, "animationCompiler", new AnimationCompiler());
    __publicField(this, "compilerMap");
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        this[key] = parameters[key];
      });
    }
    const textureMap = this.textureCompiler.getMap();
    this.sceneCompiler.linkTextureMap(textureMap);
    this.materialCompiler.linkTextureMap(textureMap);
    this.animationCompiler.linkTextureMap(textureMap);
    const geometryMap = this.geometryCompiler.getMap();
    const materialMap = this.materialCompiler.getMap();
    const objectCompilerList = Object.values(this).filter((object) => object instanceof ObjectCompiler);
    const objectMapList = objectCompilerList.map((compiler) => compiler.getMap());
    for (const objectCompiler of objectCompilerList) {
      if (isValidKey("IS_SOLIDOBJECTCOMPILER", objectCompiler)) {
        objectCompiler.linkGeometryMap(geometryMap).linkMaterialMap(materialMap);
      }
      objectCompiler.linkObjectMap(...objectMapList);
    }
    this.animationCompiler.linkObjectMap(...objectMapList).linkMaterialMap(materialMap);
    const compilerMap = new Map();
    Object.keys(this).forEach((key) => {
      const compiler = this[key];
      if (compiler instanceof Compiler) {
        compilerMap.set(compiler.MODULE, compiler);
      }
    });
    this.compilerMap = compilerMap;
  }
  support(engine) {
    this.compilerMap.forEach((compiler) => {
      compiler.useEngine(engine);
    });
    if (engine.resourceManager) {
      const resourceMap = engine.resourceManager.resourceMap;
      this.textureCompiler.linkRescourceMap(resourceMap);
      this.geometryCompiler.linkRescourceMap(resourceMap);
      this.css3DCompiler.linkRescourceMap(resourceMap);
    }
    const dataSupportManager = engine.dataSupportManager;
    dataSupportManager.textureDataSupport.addCompiler(this.textureCompiler);
    dataSupportManager.materialDataSupport.addCompiler(this.materialCompiler);
    dataSupportManager.geometryDataSupport.addCompiler(this.geometryCompiler);
    dataSupportManager.rendererDataSupport.addCompiler(this.rendererCompiler);
    dataSupportManager.controlsDataSupport.addCompiler(this.controlsCompiler);
    dataSupportManager.passDataSupport.addCompiler(this.passCompiler);
    dataSupportManager.cameraDataSupport.addCompiler(this.cameraCompiler);
    dataSupportManager.lightDataSupport.addCompiler(this.lightCompiler);
    dataSupportManager.spriteDataSupport.addCompiler(this.spriteCompiler);
    dataSupportManager.lineDataSupport.addCompiler(this.lineCompiler);
    dataSupportManager.meshDataSupport.addCompiler(this.meshCompiler);
    dataSupportManager.pointsDataSupport.addCompiler(this.pointsCompiler);
    dataSupportManager.css3DDataSupport.addCompiler(this.css3DCompiler);
    dataSupportManager.groupDataSupport.addCompiler(this.groupCompiler);
    dataSupportManager.sceneDataSupport.addCompiler(this.sceneCompiler);
    dataSupportManager.animationDataSupport.addCompiler(this.animationCompiler);
    return this;
  }
  getObjectSymbol(object) {
    for (const compiler of this.compilerMap.values()) {
      const vid = compiler.getObjectSymbol(object);
      if (vid) {
        return vid;
      }
    }
    return null;
  }
  getObjectBySymbol(vid) {
    for (const compiler of this.compilerMap.values()) {
      const object = compiler.getObjectBySymbol(vid);
      if (object) {
        return object;
      }
    }
    return null;
  }
  dispose() {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose({});
    }
    this.compilerMap.clear();
    return this;
  }
}
const CompilerManagerPlugin = function(params) {
  if (this.compilerManager) {
    console.warn("engine has installed compilerManager plugin.");
    return false;
  }
  if (!this.dataSupportManager) {
    console.warn("must install dataSupportManager before compilerManager plugin.");
    return false;
  }
  if (!this.renderManager) {
    console.warn(`must install renderManager before compilerManager plugin.`);
    return false;
  }
  const compilerManager = new CompilerManager();
  this.compilerManager = compilerManager;
  this.getObjectSymbol = function(object) {
    return this.compilerManager.getObjectSymbol(object);
  };
  this.getObjectBySymbol = function(vid) {
    return this.compilerManager.getObjectBySymbol(vid);
  };
  this.addEventListener("dispose", () => {
    this.compilerManager.dispose();
  });
  this.completeSet.add(() => {
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
  watch(dom) {
    if (!dom) {
      keyboardjs.watch();
    } else {
      keyboardjs.watch(void 0, dom);
    }
    return this;
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
  this.addEventListener("setScene", (event) => {
    event.scene.add(axesHelper);
  });
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
  this.addEventListener("setScene", (event) => {
    event.scene.add(gridHelper);
  });
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
  const meshOverrideMaterial = new MeshLambertMaterial({
    color: params.overrideColor
  });
  const lineOverrideMaterial = new LineBasicMaterial({
    color: params.overrideColor
  });
  const pointsOverrideMaterial = new PointsMaterial({
    color: params.overrideColor,
    size: 5,
    sizeAttenuation: false
  });
  const spriteOverrideMaterial = new SpriteMaterial({
    color: params.overrideColor
  });
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
  this.scene.addEventListener("afterAdd", (event) => {
    const displayMode = this.displayMode;
    const objects = event.objects;
    for (const elem of objects) {
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
    for (const elem of objects) {
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
        lightSet.delete(elem);
      } else if (elem instanceof Points && elem.type === "Points") {
        pointsSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      } else if (elem instanceof Sprite && elem.type === "Sprite") {
        spriteSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      }
    }
  });
  const filterMaterial = () => {
    for (const mesh of meshSet) {
      if (mesh.material === meshOverrideMaterial) {
        continue;
      }
      materialCacheMap.set(mesh, mesh.material);
      mesh.material = meshOverrideMaterial;
    }
    for (const line of lineSet) {
      if (line.material === lineOverrideMaterial) {
        continue;
      }
      materialCacheMap.set(line, line.material);
      line.material = lineOverrideMaterial;
    }
    for (const points of pointsSet) {
      if (points.material === pointsOverrideMaterial) {
        continue;
      }
      materialCacheMap.set(points, points.material);
      points.material = pointsOverrideMaterial;
    }
    for (const sprite of spriteSet) {
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
      light.visible = false;
    });
    this.scene.add(defaultAmbientLight);
    this.scene.add(defaultDirectionalLight);
  };
  const reduceLight = () => {
    lightSet.forEach((light) => {
      light.visible = true;
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
  this.setDisplayMode = function(mode) {
    this.displayMode = mode || DISPLAYMODE.ENV;
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
  this.completeSet.add(() => {
    if (this.objectHelperManager) {
      this.objectHelperManager.addFilteredObject(defaultDirectionalLight);
    }
  });
  return true;
};
const getHelperLineMaterial = () => new LineBasicMaterial({ color: "rgb(255, 255, 255)" });
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
    shape.matrix = new Matrix4$1();
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
    this.sphere = new Sphere$1(new Vector3$1(0, 0, 0), 1);
    this.cacheColor = directionalLight.color.getHex();
    this.cacheVector3 = new Vector3$1();
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
    this.sphere = new Sphere$1(new Vector3$1(0, 0, 0), 1);
    this.cacheColor = pointLight2.color.getHex();
    this.cacheDistance = pointLight2.distance;
    this.cacheVector3 = new Vector3$1();
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
    this.sphere = new Sphere$1(new Vector3$1(0, 0, 0), 1);
    this.cacheColor = spotLight.color.getHex();
    this.cacheDistance = spotLight.distance;
    this.cacheAngle = spotLight.angle;
    this.cacheVector3 = new Vector3$1();
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
        const range = light.distance * Math.tan(light.angle);
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
class CSS3DObjectHelper extends LineSegments {
  constructor(target) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisCSS3DHelper");
    const element = target.element;
    const boundingBox = element.getBoundingClientRect();
    const width = boundingBox.width;
    const height = boundingBox.height;
    this.geometry = new EdgesGeometry(new PlaneBufferGeometry(width, height));
    this.geometry.computeBoundingBox();
    this.material = getHelperLineMaterial();
    this.matrixAutoUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = target.matrixWorld;
    this.target = target;
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const box = this.geometry.boundingBox.clone();
    box.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsBox(box)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class CSS3DPlaneHelper extends LineSegments {
  constructor(target) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisCSS3DPlaneHelper");
    __publicField(this, "observer");
    this.geometry = new EdgesGeometry(new PlaneBufferGeometry(target.width, target.height));
    this.geometry.computeBoundingBox();
    this.material = getHelperLineMaterial();
    this.matrixAutoUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = target.matrixWorld;
    this.target = target;
    const observer = new MutationObserver(() => {
      this.geometry.dispose();
      this.geometry = new EdgesGeometry(new PlaneBufferGeometry(target.width, target.height));
      this.geometry.computeBoundingBox();
    });
    observer.observe(target.element, {
      attributeFilter: ["style"]
    });
    this.observer = observer;
  }
  dispose() {
    this.observer.disconnect();
  }
}
const _GroupHelper = class extends Sprite {
  constructor(group) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisGroupHelper");
    this.target = group;
    this.geometry.computeBoundingBox();
    this.material = new SpriteMaterial({
      map: _GroupHelper.colorTexture
    });
    this.material.depthTest = false;
    this.material.depthWrite = false;
    this.scale.set(5, 5, 5);
    const updateMatrixWorldFun = this.updateMatrixWorld.bind(this);
    this.updateMatrixWorld = (focus) => {
      const position = this.position;
      const groupPosition = this.target.position;
      position.x = groupPosition.x;
      position.y = groupPosition.y;
      position.z = groupPosition.z;
      updateMatrixWorldFun(focus);
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
};
let GroupHelper = _GroupHelper;
__publicField(GroupHelper, "colorTexture", new CanvasTexture(new CanvasGenerator({ width: 512, height: 512 }).draw((ctx) => {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, 512, 512);
  ctx.closePath();
  ctx.translate(256, 200);
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.fillRect(-200, 0, 400, 200);
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.fillRect(-200, -70, 200, 70);
  ctx.closePath();
}).get()));
const _LineHelper = class extends Points {
  constructor(line) {
    super();
    __publicField(this, "target");
    __publicField(this, "cachaGeometryUUid");
    __publicField(this, "type", "VisLineHelper");
    this.target = line;
    this.geometry.dispose();
    this.geometry.copy(line.geometry);
    this.cachaGeometryUUid = line.geometry.uuid;
    this.material = new PointsMaterial({
      color: "rgb(255, 255, 255)",
      alphaMap: _LineHelper.alphaTexture,
      transparent: true,
      size: 5,
      sizeAttenuation: false
    });
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = line.matrix;
    this.matrixWorld = line.matrixWorld;
    this.renderOrder = -1;
    this.raycast = () => {
    };
    this.onBeforeRender = () => {
      const target = this.target;
      if (target.geometry.uuid !== this.cachaGeometryUUid) {
        this.geometry.dispose();
        this.geometry = target.geometry.clone();
        this.cachaGeometryUUid = target.geometry.uuid;
      }
    };
  }
};
let LineHelper = _LineHelper;
__publicField(LineHelper, "alphaTexture", new CanvasTexture(new CanvasGenerator({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" }).draw((ctx) => {
  ctx.beginPath();
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.arc(256, 256, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}).getDom()));
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
const _PointsHelper = class extends Points {
  constructor(points) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisPointsHelper");
    this.target = points;
    this.geometry.dispose();
    this.geometry.copy(points.geometry);
    this.material.dispose();
    this.material = new PointsMaterial({
      color: "rgb(255, 255, 255)",
      alphaMap: _PointsHelper.alphaTexture,
      transparent: true
    });
    const material = Array.isArray(points.material) ? points.material[0] : points.material;
    if (material instanceof PointsMaterial) {
      this.material.size = material.size;
      this.material.sizeAttenuation = material.sizeAttenuation;
    }
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = points.matrix;
    this.matrixWorld = points.matrixWorld;
    this.raycast = () => {
    };
  }
};
let PointsHelper = _PointsHelper;
__publicField(PointsHelper, "alphaTexture", new CanvasTexture(new CanvasGenerator({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" }).draw((ctx) => {
  ctx.beginPath();
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 512, 512);
  ctx.closePath();
}).get()));
const _SpriteHelper = class extends Sprite {
  constructor(sprite) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisSpriteHelper");
    this.target = sprite;
    this.material.dispose();
    this.material = new SpriteMaterial({
      color: "rgb(255, 255, 255)",
      alphaMap: _SpriteHelper.alphaTexture,
      transparent: true,
      depthWrite: false
    });
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = sprite.matrix;
    this.matrixWorld = sprite.matrixWorld;
    this.raycast = () => {
    };
  }
};
let SpriteHelper = _SpriteHelper;
__publicField(SpriteHelper, "alphaTexture", new CanvasTexture(new CanvasGenerator({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" }).draw((ctx) => {
  ctx.beginPath();
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 512, 512);
  ctx.closePath();
}).get()));
class ObjectHelperManager extends EventDispatcher {
  constructor(params = {}) {
    super();
    __publicField(this, "helperGenerator", {
      [CONFIGTYPE.POINTLIGHT]: PointLightHelper,
      [CONFIGTYPE.SPOTLIGHT]: SpotLightHelper,
      [CONFIGTYPE.DIRECTIONALLIGHT]: DirectionalLightHelper,
      [CONFIGTYPE.PERSPECTIVECAMERA]: CameraHelper,
      [CONFIGTYPE.ORTHOGRAPHICCAMERA]: CameraHelper,
      [CONFIGTYPE.MESH]: MeshHelper,
      [CONFIGTYPE.GROUP]: GroupHelper,
      [CONFIGTYPE.SPRITE]: SpriteHelper,
      [CONFIGTYPE.POINTS]: PointsHelper,
      [CONFIGTYPE.LINE]: LineHelper,
      [CONFIGTYPE.CSS3DOBJECT]: CSS3DObjectHelper,
      [CONFIGTYPE.CSS3DPLANE]: CSS3DPlaneHelper
    });
    __publicField(this, "helperFilter", {
      AmbientLight: true,
      Object3D: true,
      TransformControls: true,
      Scene: true
    });
    __publicField(this, "objectFilter", new Set());
    __publicField(this, "objectHelperMap", new Map());
    params.helperGenerator && (this.helperGenerator = Object.assign(this.helperGenerator, params.helperGenerator));
    params.helperFilter && (this.helperFilter = Object.assign(this.helperFilter, params.helperFilter));
    params.objectFilter && (this.objectFilter = new Set(params.objectFilter.concat(Array.from(this.objectFilter))));
  }
  addFilteredObject(...objects) {
    for (const object of objects) {
      this.objectFilter.add(object);
    }
    return this;
  }
  addObjectHelper(object) {
    if (this.objectFilter.has(object) || this.objectHelperMap.has(object) || this.helperFilter[object.type] || object.type.toLocaleLowerCase().includes("helper")) {
      return null;
    }
    if (!this.helperGenerator[object.type]) {
      console.warn(`object helper can not support this type object: '${object.type}'`);
      return null;
    }
    const helper = new this.helperGenerator[object.type](object);
    this.objectHelperMap.set(object, helper);
    return helper;
  }
  disposeObjectHelper(object) {
    if (this.objectFilter.has(object) || this.helperFilter[object.type] || object.type.toLocaleLowerCase().includes("helper")) {
      return null;
    }
    if (!this.objectHelperMap.has(object)) {
      console.warn(`object helper manager can not found this object\`s helper: `, object);
      return null;
    }
    const helper = this.objectHelperMap.get(object);
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
    this.objectHelperMap.delete(object);
    return helper;
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
  const helperManager = new ObjectHelperManager();
  const pointerenterFunMap = new Map();
  const pointerleaveFunMap = new Map();
  const clickFunMap = new Map();
  const helperMap = helperManager.objectHelperMap;
  this.objectHelperManager = helperManager;
  !params.activeColor && (params.activeColor = "rgb(230, 20, 240)");
  !params.hoverColor && (params.hoverColor = "rgb(255, 158, 240)");
  !params.defaultColor && (params.defaultColor = "rgb(255, 255, 255)");
  !params.selectedColor && (params.selectedColor = params.activeColor);
  const defaultColorHex = new Color(params.defaultColor).getHex();
  const activeColorHex = new Color(params.activeColor).getHex();
  const hoverColorHex = new Color(params.hoverColor).getHex();
  const selectedColorHex = new Color(params.selectedColor).getHex();
  const cacheSceneSet = new WeakSet();
  const afterAddFun = (event) => {
    const objects = event.objects;
    for (const object of objects) {
      const helper = helperManager.addObjectHelper(object);
      if (!helper) {
        continue;
      }
      helper.material.color.setHex(defaultColorHex);
      this.scene.add(helper);
      if (params.interact) {
        const pointerenterFun = () => {
          var _a;
          if ((_a = this.transformControls) == null ? void 0 : _a.dragging) {
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
          var _a;
          if ((_a = this.transformControls) == null ? void 0 : _a.dragging) {
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
          var _a;
          if ((_a = this.transformControls) == null ? void 0 : _a.dragging) {
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
    }
  };
  const afterRemoveFun = (event) => {
    const objects = event.objects;
    for (const object of objects) {
      const helper = helperManager.disposeObjectHelper(object);
      if (!helper) {
        continue;
      }
      this.scene.remove(helper);
      if (params.interact) {
        object.removeEventListener("pointerenter", pointerenterFunMap.get(object));
        object.removeEventListener("pointerleave", pointerleaveFunMap.get(object));
        object.removeEventListener("click", clickFunMap.get(object));
        pointerenterFunMap.delete(object);
        pointerleaveFunMap.delete(object);
        clickFunMap.delete(object);
      }
    }
  };
  const initSceneHelper = (scene) => {
    if (cacheSceneSet.has(scene)) {
      return;
    }
    scene.traverse((object) => {
      const helper = helperManager.addObjectHelper(object);
      helper && scene.add(helper);
    });
    cacheSceneSet.add(scene);
  };
  this.scene.addEventListener("afterAdd", afterAddFun);
  this.scene.addEventListener("afterRemove", afterRemoveFun);
  this.setObjectHelper = function(params2) {
    if (params2.show) {
      helperMap.forEach((helper) => {
        this.scene.add(helper);
      });
    } else {
      helperMap.forEach((helper) => {
        this.scene.remove(helper);
      });
    }
    return this;
  };
  this.addEventListener("setScene", (event) => {
    const scene = event.scene;
    !cacheSceneSet.has(scene) && initSceneHelper(scene);
    if (!scene.hasEventListener("afterAdd", afterAddFun)) {
      scene.addEventListener("afterAdd", afterAddFun);
    }
    if (!scene.hasEventListener("afterRemove", afterRemoveFun)) {
      scene.addEventListener("afterRemove", afterRemoveFun);
    }
  });
  const cacheObjectsHelper = new Set();
  this.completeSet.add(() => {
    if (this.selectionBox) {
      this.addEventListener("selected", (event) => {
        cacheObjectsHelper.forEach((helper) => {
          helper.material.color.setHex(defaultColorHex);
        });
        cacheObjectsHelper.clear();
        for (const object of event.objects) {
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
  if (this.selectionBox) {
    console.warn("engine has installed selection plugin.");
    return false;
  }
  if (!this.eventManager) {
    console.warn("must install eventManager plugin before Selection plugin.");
    return false;
  }
  this.selectionBox = new Set();
  const dispatchEvent = () => {
    const objectSymbols = [];
    if (this.IS_ENGINESUPPORT) {
      this.selectionBox.forEach((object) => {
        const objectSymbol = this.compilerManager.getObjectSymbol(object);
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
    for (const object of params2.objects) {
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
      for (const intersection of intersections) {
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
const CSS3DRendererPlugin = function(params = {}) {
  if (this.css3DRenderer) {
    console.warn("this has installed css3DRenderer plugin.");
    return false;
  }
  this.css3DRenderer = new CSS3DRenderer();
  const domElement = this.css3DRenderer.domElement;
  domElement.classList.add("vis-css3D");
  domElement.style.position = "absolute";
  domElement.style.top = "0";
  domElement.style.left = "0";
  this.addEventListener("setDom", (event) => {
    event.dom.appendChild(this.css3DRenderer.domElement);
  });
  this.addEventListener("setSize", (event) => {
    this.css3DRenderer.setSize(event.width, event.height);
  });
  if (this.renderManager) {
    this.renderManager.removeEventListener("render", this.render);
    this.renderManager.addEventListener("render", (event) => {
      this.css3DRenderer.render(this.scene, this.camera);
    });
  } else {
    if (this.webGLRenderer) {
      const render = this.render.bind(this);
      this.render = function() {
        render();
        this.webGLRenderer.render(this.scene, this.camera);
        return this;
      };
    } else {
      this.render = function() {
        this.webGLRenderer.render(this.scene, this.camera);
        return this;
      };
    }
  }
  return true;
};
var ENGINEPLUGIN;
(function(ENGINEPLUGIN2) {
  ENGINEPLUGIN2["WEBGLRENDERER"] = "WebGLRenderer";
  ENGINEPLUGIN2["CSS3DRENDERER"] = "CSS3DRenderer";
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
    __publicField(this, "camera", new PerspectiveCamera());
    __publicField(this, "scene", new Scene());
    __publicField(this, "IS_ENGINESUPPORT", false);
    __publicField(this, "dom");
    __publicField(this, "webGLRenderer");
    __publicField(this, "css3DRenderer");
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
    __publicField(this, "objectHelperManager");
    __publicField(this, "transing");
    __publicField(this, "stats");
    __publicField(this, "displayMode");
    __publicField(this, "selectionBox");
    __publicField(this, "getScreenshot");
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
    __publicField(this, "exportConfig");
    __publicField(this, "applyConfig");
    __publicField(this, "reactiveConfig");
    __publicField(this, "getConfigBySymbol");
    __publicField(this, "removeConfigBySymbol");
    __publicField(this, "getObjectSymbol");
    __publicField(this, "getObjectBySymbol");
    __publicField(this, "play");
    __publicField(this, "stop");
    __publicField(this, "render");
    this.completeSet = new Set();
    this.render = function() {
      console.warn("can not install some plugin");
      return this;
    };
    this.camera.position.set(50, 50, 50);
    this.addEventListener("setSize", (event) => {
      this.camera.aspect = event.width / event.height;
      this.camera.updateProjectionMatrix();
    });
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
  setDom(dom) {
    this.dom = dom;
    this.dispatchEvent({
      type: "setDom",
      dom
    });
    return this;
  }
  setSize(width, height) {
    var _a, _b;
    if (width && width <= 0 || height && height <= 0) {
      console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
      return this;
    }
    !width && (width = ((_a = this.dom) == null ? void 0 : _a.offsetWidth) || window.innerWidth);
    !height && (height = ((_b = this.dom) == null ? void 0 : _b.offsetHeight) || window.innerHeight);
    this.dispatchEvent({ type: "setSize", width, height });
    return this;
  }
  setCamera(camera) {
    if (typeof camera === "object" && camera instanceof Camera) {
      this.camera = camera;
      this.dispatchEvent({
        type: "setCamera",
        camera
      });
    } else {
      if (this.IS_ENGINESUPPORT) {
        const target = this.compilerManager.getObjectBySymbol(camera);
        if (target) {
          this.camera = target;
          this.dispatchEvent({
            type: "setCamera",
            camera: target
          });
        } else {
          console.warn(`can not found camera in compilerManager: ${camera}`);
        }
      } else {
        console.warn(`engine is not a Engine support but use symbol to found camera.`);
      }
    }
    return this;
  }
  setScene(scene) {
    if (typeof scene === "object" && scene instanceof Scene) {
      this.scene = scene;
      this.dispatchEvent({
        type: "setScene",
        scene
      });
    } else {
      if (this.IS_ENGINESUPPORT) {
        const target = this.compilerManager.getObjectBySymbol(scene);
        if (target) {
          this.scene = target;
          this.dispatchEvent({
            type: "setScene",
            scene: target
          });
        } else {
          console.warn(`can not found camera in compilerManager: ${scene}`);
        }
      } else {
        console.warn(`engine is not a Engine support but use symbol to found camera.`);
      }
    }
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
Engine.register(ENGINEPLUGIN.CSS3DRENDERER, CSS3DRendererPlugin);
Engine.register(ENGINEPLUGIN.EFFECTCOMPOSER, EffectComposerPlugin);
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
    }).install(ENGINEPLUGIN.RENDERMANAGER).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.ORBITCONTROLS).install(ENGINEPLUGIN.POINTERMANAGER).install(ENGINEPLUGIN.EVENTMANAGER).complete();
  }
}
class ModelingEngine extends Engine {
  constructor() {
    super();
    this.install(ENGINEPLUGIN.RENDERMANAGER).install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(ENGINEPLUGIN.POINTERMANAGER).install(ENGINEPLUGIN.EVENTMANAGER).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.SELECTION).install(ENGINEPLUGIN.AXESHELPER).install(ENGINEPLUGIN.GRIDHELPER).install(ENGINEPLUGIN.OBJECTHELPER).install(ENGINEPLUGIN.VIEWPOINT).install(ENGINEPLUGIN.DISPLAYMODE).install(ENGINEPLUGIN.STATS).install(ENGINEPLUGIN.ORBITCONTROLS).install(ENGINEPLUGIN.KEYBOARDMANAGER).install(ENGINEPLUGIN.TRANSFORMCONTROLS).complete();
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
  add(config2) {
    if (!this.supportData || !this.supportDataType) {
      console.warn(`you must call 'create' method before the 'add' method`);
      return this;
    }
    if (!config2.type) {
      console.warn(`config can not found attribute 'type'`);
      return this;
    }
    if (_SupportDataGenerator.configModelMap[config2.type] !== this.supportDataType) {
      console.warn(`current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config2.type}'`);
      return this;
    }
    this.supportData[config2.vid] = generateConfig(config2.type, config2);
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
__publicField(SupportDataGenerator, "configModelMap", CONFIGMODULE);
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
    const renderer = new WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
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
    camera.lookAt(new Vector3$1(0, 0, 0));
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
    const renderer = new WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
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
    camera.lookAt(new Vector3$1(0, 0, 0));
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
class EngineSupport extends Engine {
  constructor(parameters = {}, resources = {}) {
    super();
    __publicField(this, "IS_ENGINESUPPORT", true);
    this.install(ENGINEPLUGIN.LOADERMANAGER).install(ENGINEPLUGIN.RESOURCEMANAGER, { resources }).install(ENGINEPLUGIN.POINTERMANAGER).install(ENGINEPLUGIN.EVENTMANAGER).install(ENGINEPLUGIN.RENDERMANAGER).install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters).install(ENGINEPLUGIN.COMPILERMANAGER);
  }
  loadLifeCycle(config2) {
    const dataSupportManager = this.dataSupportManager;
    config2.texture && dataSupportManager.load({ texture: config2.texture });
    config2.material && dataSupportManager.load({ material: config2.material });
    delete config2.texture;
    delete config2.material;
    dataSupportManager.load(config2);
  }
  removeLifeCycle(config2) {
    const dataSupportManager = this.dataSupportManager;
    const texture = config2[MODULETYPE.TEXTURE] || {};
    const material = config2[MODULETYPE.MATERIAL] || {};
    const assets = config2.assets || [];
    delete config2.texture;
    delete config2.material;
    delete config2.assets;
    dataSupportManager.remove(config2);
    dataSupportManager.remove({ [MODULETYPE.MATERIAL]: material });
    dataSupportManager.remove({ [MODULETYPE.TEXTURE]: texture });
    const resourceManager = this.resourceManager;
    const loaderManager = this.loaderManager;
    assets.forEach((url) => {
      resourceManager.remove(url);
      loaderManager.remove(url);
    });
  }
  loadConfig(config2, callback) {
    const renderFlag = this.renderManager.hasRendering();
    if (renderFlag) {
      this.renderManager.stop();
    }
    if (config2.assets && config2.assets.length) {
      const mappedFun = (event) => {
        delete config2.assets;
        this.loadLifeCycle(config2);
        this.resourceManager.removeEventListener("mapped", mappedFun);
        callback && callback(event);
        if (renderFlag) {
          this.renderManager.play();
        } else {
          this.renderManager.render();
        }
      };
      this.resourceManager.addEventListener("mapped", mappedFun);
      this.loaderManager.reset().load(config2.assets);
    } else {
      this.loadLifeCycle(config2);
      callback && callback();
      if (renderFlag) {
        this.renderManager.play();
      } else {
        this.renderManager.render();
      }
    }
    return this;
  }
  loadConfigAsync(config2) {
    return new Promise((resolve, reject) => {
      const renderFlag = this.renderManager.hasRendering();
      if (renderFlag) {
        this.renderManager.stop();
      }
      if (config2.assets && config2.assets.length) {
        const mappedFun = (event) => {
          delete config2.assets;
          this.loadLifeCycle(config2);
          this.resourceManager.removeEventListener("mapped", mappedFun);
          if (renderFlag) {
            this.renderManager.play();
          } else {
            this.renderManager.render();
          }
          resolve(event);
        };
        this.resourceManager.addEventListener("mapped", mappedFun);
        this.loaderManager.reset().load(config2.assets);
      } else {
        this.loadLifeCycle(config2);
        if (renderFlag) {
          this.renderManager.play();
        } else {
          this.renderManager.render();
        }
        resolve(void 0);
      }
    });
  }
  removeConfig(config2) {
    this.removeLifeCycle(config2);
  }
  getObjectConfig(object) {
    const symbol = this.getObjectSymbol(object);
    if (symbol) {
      return this.getConfigBySymbol(symbol);
    } else {
      return null;
    }
  }
}
class ModelingEngineSupport extends EngineSupport {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "IS_ENGINESUPPORT", true);
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.SELECTION).install(ENGINEPLUGIN.AXESHELPER).install(ENGINEPLUGIN.GRIDHELPER).install(ENGINEPLUGIN.OBJECTHELPER).install(ENGINEPLUGIN.VIEWPOINT).install(ENGINEPLUGIN.DISPLAYMODE).install(ENGINEPLUGIN.STATS).install(ENGINEPLUGIN.ORBITCONTROLS).install(ENGINEPLUGIN.KEYBOARDMANAGER).install(ENGINEPLUGIN.TRANSFORMCONTROLS).complete();
  }
}
class DisplayEngineSupport extends EngineSupport {
  constructor(parameters) {
    super(parameters);
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.ORBITCONTROLS).complete();
  }
}
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
    return new Vector3$1(this.x, this.y, this.z);
  }
}
class Plane$1 {
  constructor(normal, w) {
    this.normal = normal;
    this.w = w;
    this.normal = normal;
    this.w = w;
  }
  clone() {
    return new Plane$1(this.normal.clone(), this.w);
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
      const type = t < -Plane$1.EPSILON ? BACK : t > Plane$1.EPSILON ? FRONT : COPLANAR;
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
    return new Plane$1(n.clone(), n.dot(a));
  }
}
Plane$1.EPSILON = 1e-5;
class Polygon {
  constructor(vertices, shared) {
    this.vertices = vertices;
    this.shared = shared;
    this.plane = Plane$1.fromPoints(vertices[0].pos, vertices[1].pos, vertices[2].pos);
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
    const inv = new Matrix4$1().copy(toMatrix).invert();
    geom.applyMatrix4(inv);
    geom.computeBoundingSphere();
    geom.computeBoundingBox();
    return geom;
  }
  static fromMesh(mesh, objectIndex) {
    const csg = CSG.fromGeometry(mesh.geometry, objectIndex);
    const ttvv0 = new Vector3$1();
    const tmpm3 = new Matrix3$1();
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
const _lut = [];
for (let i = 0; i < 256; i++) {
  _lut[i] = (i < 16 ? "0" : "") + i.toString(16);
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.isQuaternion = true;
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }
  static slerp(qa, qb, qm, t) {
    console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead.");
    return qm.slerpQuaternions(qa, qb, t);
  }
  static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
    let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
    const x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
    if (t === 0) {
      dst[dstOffset + 0] = x0;
      dst[dstOffset + 1] = y0;
      dst[dstOffset + 2] = z0;
      dst[dstOffset + 3] = w0;
      return;
    }
    if (t === 1) {
      dst[dstOffset + 0] = x1;
      dst[dstOffset + 1] = y1;
      dst[dstOffset + 2] = z1;
      dst[dstOffset + 3] = w1;
      return;
    }
    if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
      let s = 1 - t;
      const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = cos >= 0 ? 1 : -1, sqrSin = 1 - cos * cos;
      if (sqrSin > Number.EPSILON) {
        const sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);
        s = Math.sin(s * len) / sin;
        t = Math.sin(t * len) / sin;
      }
      const tDir = t * dir;
      x0 = x0 * s + x1 * tDir;
      y0 = y0 * s + y1 * tDir;
      z0 = z0 * s + z1 * tDir;
      w0 = w0 * s + w1 * tDir;
      if (s === 1 - t) {
        const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
        x0 *= f;
        y0 *= f;
        z0 *= f;
        w0 *= f;
      }
    }
    dst[dstOffset] = x0;
    dst[dstOffset + 1] = y0;
    dst[dstOffset + 2] = z0;
    dst[dstOffset + 3] = w0;
  }
  static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
    const x0 = src0[srcOffset0];
    const y0 = src0[srcOffset0 + 1];
    const z0 = src0[srcOffset0 + 2];
    const w0 = src0[srcOffset0 + 3];
    const x1 = src1[srcOffset1];
    const y1 = src1[srcOffset1 + 1];
    const z1 = src1[srcOffset1 + 2];
    const w1 = src1[srcOffset1 + 3];
    dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
    dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
    dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
    dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
    return dst;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
    this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(value) {
    this._w = value;
    this._onChangeCallback();
  }
  set(x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this._onChangeCallback();
    return this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(quaternion) {
    this._x = quaternion.x;
    this._y = quaternion.y;
    this._z = quaternion.z;
    this._w = quaternion.w;
    this._onChangeCallback();
    return this;
  }
  setFromEuler(euler, update) {
    if (!(euler && euler.isEuler)) {
      throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
    }
    const x = euler._x, y = euler._y, z = euler._z, order = euler._order;
    const cos = Math.cos;
    const sin = Math.sin;
    const c1 = cos(x / 2);
    const c2 = cos(y / 2);
    const c3 = cos(z / 2);
    const s1 = sin(x / 2);
    const s2 = sin(y / 2);
    const s3 = sin(z / 2);
    switch (order) {
      case "XYZ":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "YXZ":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case "ZXY":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "ZYX":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case "YZX":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "XZY":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + order);
    }
    if (update !== false)
      this._onChangeCallback();
    return this;
  }
  setFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2, s = Math.sin(halfAngle);
    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(halfAngle);
    this._onChangeCallback();
    return this;
  }
  setFromRotationMatrix(m) {
    const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1);
      this._w = 0.25 / s;
      this._x = (m32 - m23) * s;
      this._y = (m13 - m31) * s;
      this._z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
      this._w = (m32 - m23) / s;
      this._x = 0.25 * s;
      this._y = (m12 + m21) / s;
      this._z = (m13 + m31) / s;
    } else if (m22 > m33) {
      const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
      this._w = (m13 - m31) / s;
      this._x = (m12 + m21) / s;
      this._y = 0.25 * s;
      this._z = (m23 + m32) / s;
    } else {
      const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
      this._w = (m21 - m12) / s;
      this._x = (m13 + m31) / s;
      this._y = (m23 + m32) / s;
      this._z = 0.25 * s;
    }
    this._onChangeCallback();
    return this;
  }
  setFromUnitVectors(vFrom, vTo) {
    let r = vFrom.dot(vTo) + 1;
    if (r < Number.EPSILON) {
      r = 0;
      if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
        this._x = -vFrom.y;
        this._y = vFrom.x;
        this._z = 0;
        this._w = r;
      } else {
        this._x = 0;
        this._y = -vFrom.z;
        this._z = vFrom.y;
        this._w = r;
      }
    } else {
      this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
      this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
      this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
      this._w = r;
    }
    return this.normalize();
  }
  angleTo(q) {
    return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
  }
  rotateTowards(q, step) {
    const angle = this.angleTo(q);
    if (angle === 0)
      return this;
    const t = Math.min(1, step / angle);
    this.slerp(q, t);
    return this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this._onChangeCallback();
    return this;
  }
  dot(v) {
    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let l = this.length();
    if (l === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;
    } else {
      l = 1 / l;
      this._x = this._x * l;
      this._y = this._y * l;
      this._z = this._z * l;
      this._w = this._w * l;
    }
    this._onChangeCallback();
    return this;
  }
  multiply(q, p) {
    if (p !== void 0) {
      console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.");
      return this.multiplyQuaternions(q, p);
    }
    return this.multiplyQuaternions(this, q);
  }
  premultiply(q) {
    return this.multiplyQuaternions(q, this);
  }
  multiplyQuaternions(a, b) {
    const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
    const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    this._onChangeCallback();
    return this;
  }
  slerp(qb, t) {
    if (t === 0)
      return this;
    if (t === 1)
      return this.copy(qb);
    const x = this._x, y = this._y, z = this._z, w = this._w;
    let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
    if (cosHalfTheta < 0) {
      this._w = -qb._w;
      this._x = -qb._x;
      this._y = -qb._y;
      this._z = -qb._z;
      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(qb);
    }
    if (cosHalfTheta >= 1) {
      this._w = w;
      this._x = x;
      this._y = y;
      this._z = z;
      return this;
    }
    const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;
    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t;
      this._w = s * w + t * this._w;
      this._x = s * x + t * this._x;
      this._y = s * y + t * this._y;
      this._z = s * z + t * this._z;
      this.normalize();
      this._onChangeCallback();
      return this;
    }
    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    this._w = w * ratioA + this._w * ratioB;
    this._x = x * ratioA + this._x * ratioB;
    this._y = y * ratioA + this._y * ratioB;
    this._z = z * ratioA + this._z * ratioB;
    this._onChangeCallback();
    return this;
  }
  slerpQuaternions(qa, qb, t) {
    return this.copy(qa).slerp(qb, t);
  }
  random() {
    const u1 = Math.random();
    const sqrt1u1 = Math.sqrt(1 - u1);
    const sqrtu1 = Math.sqrt(u1);
    const u2 = 2 * Math.PI * Math.random();
    const u3 = 2 * Math.PI * Math.random();
    return this.set(sqrt1u1 * Math.cos(u2), sqrtu1 * Math.sin(u3), sqrtu1 * Math.cos(u3), sqrt1u1 * Math.sin(u2));
  }
  equals(quaternion) {
    return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
  }
  fromArray(array, offset = 0) {
    this._x = array[offset];
    this._y = array[offset + 1];
    this._z = array[offset + 2];
    this._w = array[offset + 3];
    this._onChangeCallback();
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._w;
    return array;
  }
  fromBufferAttribute(attribute, index) {
    this._x = attribute.getX(index);
    this._y = attribute.getY(index);
    this._z = attribute.getZ(index);
    this._w = attribute.getW(index);
    return this;
  }
  _onChange(callback) {
    this._onChangeCallback = callback;
    return this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._w;
  }
}
class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.isVector3 = true;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  set(x, y, z) {
    if (z === void 0)
      z = this.z;
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  }
  setX(x) {
    this.x = x;
    return this;
  }
  setY(y) {
    this.y = y;
    return this;
  }
  setZ(z) {
    this.z = z;
    return this;
  }
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      default:
        throw new Error("index is out of range: " + index);
    }
    return this;
  }
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + index);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  add(v, w) {
    if (w !== void 0) {
      console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
      return this.addVectors(v, w);
    }
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  }
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  }
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  }
  sub(v, w) {
    if (w !== void 0) {
      console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
      return this.subVectors(v, w);
    }
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  }
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  }
  multiply(v, w) {
    if (w !== void 0) {
      console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.");
      return this.multiplyVectors(v, w);
    }
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
  multiplyVectors(a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  }
  applyEuler(euler) {
    if (!(euler && euler.isEuler)) {
      console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.");
    }
    return this.applyQuaternion(_quaternion.setFromEuler(euler));
  }
  applyAxisAngle(axis, angle) {
    return this.applyQuaternion(_quaternion.setFromAxisAngle(axis, angle));
  }
  applyMatrix3(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;
    return this;
  }
  applyNormalMatrix(m) {
    return this.applyMatrix3(m).normalize();
  }
  applyMatrix4(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return this;
  }
  applyQuaternion(q) {
    const x = this.x, y = this.y, z = this.z;
    const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;
    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return this;
  }
  project(camera) {
    return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
  }
  unproject(camera) {
    return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
  }
  transformDirection(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z;
    this.y = e[1] * x + e[5] * y + e[9] * z;
    this.z = e[2] * x + e[6] * y + e[10] * z;
    return this.normalize();
  }
  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    return this;
  }
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    return this;
  }
  clamp(min, max) {
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));
    return this;
  }
  clampScalar(minVal, maxVal) {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));
    return this;
  }
  clampLength(min, max) {
    const length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }
  roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(length) {
    return this.normalize().multiplyScalar(length);
  }
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  }
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    return this;
  }
  cross(v, w) {
    if (w !== void 0) {
      console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.");
      return this.crossVectors(v, w);
    }
    return this.crossVectors(this, v);
  }
  crossVectors(a, b) {
    const ax = a.x, ay = a.y, az = a.z;
    const bx = b.x, by = b.y, bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }
  projectOnVector(v) {
    const denominator = v.lengthSq();
    if (denominator === 0)
      return this.set(0, 0, 0);
    const scalar = v.dot(this) / denominator;
    return this.copy(v).multiplyScalar(scalar);
  }
  projectOnPlane(planeNormal) {
    _vector$2.copy(this).projectOnVector(planeNormal);
    return this.sub(_vector$2);
  }
  reflect(normal) {
    return this.sub(_vector$2.copy(normal).multiplyScalar(2 * this.dot(normal)));
  }
  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denominator === 0)
      return Math.PI / 2;
    const theta = this.dot(v) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }
  setFromSpherical(s) {
    return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
  }
  setFromSphericalCoords(radius, phi, theta) {
    const sinPhiRadius = Math.sin(phi) * radius;
    this.x = sinPhiRadius * Math.sin(theta);
    this.y = Math.cos(phi) * radius;
    this.z = sinPhiRadius * Math.cos(theta);
    return this;
  }
  setFromCylindrical(c) {
    return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
  }
  setFromCylindricalCoords(radius, theta, y) {
    this.x = radius * Math.sin(theta);
    this.y = y;
    this.z = radius * Math.cos(theta);
    return this;
  }
  setFromMatrixPosition(m) {
    const e = m.elements;
    this.x = e[12];
    this.y = e[13];
    this.z = e[14];
    return this;
  }
  setFromMatrixScale(m) {
    const sx = this.setFromMatrixColumn(m, 0).length();
    const sy = this.setFromMatrixColumn(m, 1).length();
    const sz = this.setFromMatrixColumn(m, 2).length();
    this.x = sx;
    this.y = sy;
    this.z = sz;
    return this;
  }
  setFromMatrixColumn(m, index) {
    return this.fromArray(m.elements, index * 4);
  }
  setFromMatrix3Column(m, index) {
    return this.fromArray(m.elements, index * 3);
  }
  setFromEuler(e) {
    this.x = e._x;
    this.y = e._y;
    this.z = e._z;
    return this;
  }
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
  }
  fromArray(array, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    return array;
  }
  fromBufferAttribute(attribute, index, offset) {
    if (offset !== void 0) {
      console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute().");
    }
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    return this;
  }
  randomDirection() {
    const u = (Math.random() - 0.5) * 2;
    const t = Math.random() * Math.PI * 2;
    const f = Math.sqrt(1 - u ** 2);
    this.x = f * Math.cos(t);
    this.y = f * Math.sin(t);
    this.z = u;
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
}
const _vector$2 = /* @__PURE__ */ new Vector3();
const _quaternion = /* @__PURE__ */ new Quaternion();
class Matrix4 {
  constructor() {
    this.isMatrix4 = true;
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
    if (arguments.length > 0) {
      console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
    }
  }
  set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    const te = this.elements;
    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  }
  identity() {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }
  clone() {
    return new Matrix4().fromArray(this.elements);
  }
  copy(m) {
    const te = this.elements;
    const me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];
    return this;
  }
  copyPosition(m) {
    const te = this.elements, me = m.elements;
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    return this;
  }
  setFromMatrix3(m) {
    const me = m.elements;
    this.set(me[0], me[3], me[6], 0, me[1], me[4], me[7], 0, me[2], me[5], me[8], 0, 0, 0, 0, 1);
    return this;
  }
  extractBasis(xAxis, yAxis, zAxis) {
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);
    return this;
  }
  makeBasis(xAxis, yAxis, zAxis) {
    this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
    return this;
  }
  extractRotation(m) {
    const te = this.elements;
    const me = m.elements;
    const scaleX = 1 / _v1$2.setFromMatrixColumn(m, 0).length();
    const scaleY = 1 / _v1$2.setFromMatrixColumn(m, 1).length();
    const scaleZ = 1 / _v1$2.setFromMatrixColumn(m, 2).length();
    te[0] = me[0] * scaleX;
    te[1] = me[1] * scaleX;
    te[2] = me[2] * scaleX;
    te[3] = 0;
    te[4] = me[4] * scaleY;
    te[5] = me[5] * scaleY;
    te[6] = me[6] * scaleY;
    te[7] = 0;
    te[8] = me[8] * scaleZ;
    te[9] = me[9] * scaleZ;
    te[10] = me[10] * scaleZ;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  }
  makeRotationFromEuler(euler) {
    if (!(euler && euler.isEuler)) {
      console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
    }
    const te = this.elements;
    const x = euler.x, y = euler.y, z = euler.z;
    const a = Math.cos(x), b = Math.sin(x);
    const c = Math.cos(y), d = Math.sin(y);
    const e = Math.cos(z), f = Math.sin(z);
    if (euler.order === "XYZ") {
      const ae = a * e, af = a * f, be = b * e, bf = b * f;
      te[0] = c * e;
      te[4] = -c * f;
      te[8] = d;
      te[1] = af + be * d;
      te[5] = ae - bf * d;
      te[9] = -b * c;
      te[2] = bf - ae * d;
      te[6] = be + af * d;
      te[10] = a * c;
    } else if (euler.order === "YXZ") {
      const ce = c * e, cf = c * f, de = d * e, df = d * f;
      te[0] = ce + df * b;
      te[4] = de * b - cf;
      te[8] = a * d;
      te[1] = a * f;
      te[5] = a * e;
      te[9] = -b;
      te[2] = cf * b - de;
      te[6] = df + ce * b;
      te[10] = a * c;
    } else if (euler.order === "ZXY") {
      const ce = c * e, cf = c * f, de = d * e, df = d * f;
      te[0] = ce - df * b;
      te[4] = -a * f;
      te[8] = de + cf * b;
      te[1] = cf + de * b;
      te[5] = a * e;
      te[9] = df - ce * b;
      te[2] = -a * d;
      te[6] = b;
      te[10] = a * c;
    } else if (euler.order === "ZYX") {
      const ae = a * e, af = a * f, be = b * e, bf = b * f;
      te[0] = c * e;
      te[4] = be * d - af;
      te[8] = ae * d + bf;
      te[1] = c * f;
      te[5] = bf * d + ae;
      te[9] = af * d - be;
      te[2] = -d;
      te[6] = b * c;
      te[10] = a * c;
    } else if (euler.order === "YZX") {
      const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
      te[0] = c * e;
      te[4] = bd - ac * f;
      te[8] = bc * f + ad;
      te[1] = f;
      te[5] = a * e;
      te[9] = -b * e;
      te[2] = -d * e;
      te[6] = ad * f + bc;
      te[10] = ac - bd * f;
    } else if (euler.order === "XZY") {
      const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
      te[0] = c * e;
      te[4] = -f;
      te[8] = d * e;
      te[1] = ac * f + bd;
      te[5] = a * e;
      te[9] = ad * f - bc;
      te[2] = bc * f - ad;
      te[6] = b * e;
      te[10] = bd * f + ac;
    }
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  }
  makeRotationFromQuaternion(q) {
    return this.compose(_zero, q, _one);
  }
  lookAt(eye, target, up) {
    const te = this.elements;
    _z.subVectors(eye, target);
    if (_z.lengthSq() === 0) {
      _z.z = 1;
    }
    _z.normalize();
    _x.crossVectors(up, _z);
    if (_x.lengthSq() === 0) {
      if (Math.abs(up.z) === 1) {
        _z.x += 1e-4;
      } else {
        _z.z += 1e-4;
      }
      _z.normalize();
      _x.crossVectors(up, _z);
    }
    _x.normalize();
    _y.crossVectors(_z, _x);
    te[0] = _x.x;
    te[4] = _y.x;
    te[8] = _z.x;
    te[1] = _x.y;
    te[5] = _y.y;
    te[9] = _z.y;
    te[2] = _x.z;
    te[6] = _y.z;
    te[10] = _z.z;
    return this;
  }
  multiply(m, n) {
    if (n !== void 0) {
      console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.");
      return this.multiplyMatrices(m, n);
    }
    return this.multiplyMatrices(this, m);
  }
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;
    const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
    const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
    const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
    const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
    const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
    const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
    const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
    const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return this;
  }
  multiplyScalar(s) {
    const te = this.elements;
    te[0] *= s;
    te[4] *= s;
    te[8] *= s;
    te[12] *= s;
    te[1] *= s;
    te[5] *= s;
    te[9] *= s;
    te[13] *= s;
    te[2] *= s;
    te[6] *= s;
    te[10] *= s;
    te[14] *= s;
    te[3] *= s;
    te[7] *= s;
    te[11] *= s;
    te[15] *= s;
    return this;
  }
  determinant() {
    const te = this.elements;
    const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
    const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
    const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
    const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
    return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
  }
  transpose() {
    const te = this.elements;
    let tmp;
    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;
    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;
    return this;
  }
  setPosition(x, y, z) {
    const te = this.elements;
    if (x.isVector3) {
      te[12] = x.x;
      te[13] = x.y;
      te[14] = x.z;
    } else {
      te[12] = x;
      te[13] = y;
      te[14] = z;
    }
    return this;
  }
  invert() {
    const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44, t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44, t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44, t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
    if (det === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
    return this;
  }
  scale(v) {
    const te = this.elements;
    const x = v.x, y = v.y, z = v.z;
    te[0] *= x;
    te[4] *= y;
    te[8] *= z;
    te[1] *= x;
    te[5] *= y;
    te[9] *= z;
    te[2] *= x;
    te[6] *= y;
    te[10] *= z;
    te[3] *= x;
    te[7] *= y;
    te[11] *= z;
    return this;
  }
  getMaxScaleOnAxis() {
    const te = this.elements;
    const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
    const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
    const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  }
  makeTranslation(x, y, z) {
    this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    return this;
  }
  makeRotationX(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationY(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationZ(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationAxis(axis, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;
    const x = axis.x, y = axis.y, z = axis.z;
    const tx = t * x, ty = t * y;
    this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
    return this;
  }
  makeScale(x, y, z) {
    this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    return this;
  }
  makeShear(xy, xz, yx, yz, zx, zy) {
    this.set(1, yx, zx, 0, xy, 1, zy, 0, xz, yz, 1, 0, 0, 0, 0, 1);
    return this;
  }
  compose(position, quaternion, scale) {
    const te = this.elements;
    const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    const sx = scale.x, sy = scale.y, sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
  }
  decompose(position, quaternion, scale) {
    const te = this.elements;
    let sx = _v1$2.set(te[0], te[1], te[2]).length();
    const sy = _v1$2.set(te[4], te[5], te[6]).length();
    const sz = _v1$2.set(te[8], te[9], te[10]).length();
    const det = this.determinant();
    if (det < 0)
      sx = -sx;
    position.x = te[12];
    position.y = te[13];
    position.z = te[14];
    _m1.copy(this);
    const invSX = 1 / sx;
    const invSY = 1 / sy;
    const invSZ = 1 / sz;
    _m1.elements[0] *= invSX;
    _m1.elements[1] *= invSX;
    _m1.elements[2] *= invSX;
    _m1.elements[4] *= invSY;
    _m1.elements[5] *= invSY;
    _m1.elements[6] *= invSY;
    _m1.elements[8] *= invSZ;
    _m1.elements[9] *= invSZ;
    _m1.elements[10] *= invSZ;
    quaternion.setFromRotationMatrix(_m1);
    scale.x = sx;
    scale.y = sy;
    scale.z = sz;
    return this;
  }
  makePerspective(left, right, top, bottom, near, far) {
    if (far === void 0) {
      console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
    }
    const te = this.elements;
    const x = 2 * near / (right - left);
    const y = 2 * near / (top - bottom);
    const a = (right + left) / (right - left);
    const b = (top + bottom) / (top - bottom);
    const c = -(far + near) / (far - near);
    const d = -2 * far * near / (far - near);
    te[0] = x;
    te[4] = 0;
    te[8] = a;
    te[12] = 0;
    te[1] = 0;
    te[5] = y;
    te[9] = b;
    te[13] = 0;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
    return this;
  }
  makeOrthographic(left, right, top, bottom, near, far) {
    const te = this.elements;
    const w = 1 / (right - left);
    const h = 1 / (top - bottom);
    const p = 1 / (far - near);
    const x = (right + left) * w;
    const y = (top + bottom) * h;
    const z = (far + near) * p;
    te[0] = 2 * w;
    te[4] = 0;
    te[8] = 0;
    te[12] = -x;
    te[1] = 0;
    te[5] = 2 * h;
    te[9] = 0;
    te[13] = -y;
    te[2] = 0;
    te[6] = 0;
    te[10] = -2 * p;
    te[14] = -z;
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
    return this;
  }
  equals(matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 16; i++) {
      if (te[i] !== me[i])
        return false;
    }
    return true;
  }
  fromArray(array, offset = 0) {
    for (let i = 0; i < 16; i++) {
      this.elements[i] = array[i + offset];
    }
    return this;
  }
  toArray(array = [], offset = 0) {
    const te = this.elements;
    array[offset] = te[0];
    array[offset + 1] = te[1];
    array[offset + 2] = te[2];
    array[offset + 3] = te[3];
    array[offset + 4] = te[4];
    array[offset + 5] = te[5];
    array[offset + 6] = te[6];
    array[offset + 7] = te[7];
    array[offset + 8] = te[8];
    array[offset + 9] = te[9];
    array[offset + 10] = te[10];
    array[offset + 11] = te[11];
    array[offset + 12] = te[12];
    array[offset + 13] = te[13];
    array[offset + 14] = te[14];
    array[offset + 15] = te[15];
    return array;
  }
}
const _v1$2 = /* @__PURE__ */ new Vector3();
const _m1 = /* @__PURE__ */ new Matrix4();
const _zero = /* @__PURE__ */ new Vector3(0, 0, 0);
const _one = /* @__PURE__ */ new Vector3(1, 1, 1);
const _x = /* @__PURE__ */ new Vector3();
const _y = /* @__PURE__ */ new Vector3();
const _z = /* @__PURE__ */ new Vector3();
class Vector2 {
  constructor(x = 0, y = 0) {
    this.isVector2 = true;
    this.x = x;
    this.y = y;
  }
  get width() {
    return this.x;
  }
  set width(value) {
    this.x = value;
  }
  get height() {
    return this.y;
  }
  set height(value) {
    this.y = value;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    return this;
  }
  setX(x) {
    this.x = x;
    return this;
  }
  setY(y) {
    this.y = y;
    return this;
  }
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      default:
        throw new Error("index is out of range: " + index);
    }
    return this;
  }
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + index);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  add(v, w) {
    if (w !== void 0) {
      console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
      return this.addVectors(v, w);
    }
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  addScalar(s) {
    this.x += s;
    this.y += s;
    return this;
  }
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  }
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  }
  sub(v, w) {
    if (w !== void 0) {
      console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
      return this.subVectors(v, w);
    }
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    return this;
  }
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  }
  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  applyMatrix3(m) {
    const x = this.x, y = this.y;
    const e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6];
    this.y = e[1] * x + e[4] * y + e[7];
    return this;
  }
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    return this;
  }
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    return this;
  }
  clamp(min, max) {
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    return this;
  }
  clampScalar(minVal, maxVal) {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    return this;
  }
  clampLength(min, max) {
    const length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
  roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    const angle = Math.atan2(-this.y, -this.x) + Math.PI;
    return angle;
  }
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y;
    return dx * dx + dy * dy;
  }
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  }
  setLength(length) {
    return this.normalize().multiplyScalar(length);
  }
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  }
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    return this;
  }
  equals(v) {
    return v.x === this.x && v.y === this.y;
  }
  fromArray(array, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  }
  fromBufferAttribute(attribute, index, offset) {
    if (offset !== void 0) {
      console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute().");
    }
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    return this;
  }
  rotateAround(center, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const x = this.x - center.x;
    const y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }
}
class Vector4 {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.isVector4 = true;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  get width() {
    return this.z;
  }
  set width(value) {
    this.z = value;
  }
  get height() {
    return this.w;
  }
  set height(value) {
    this.w = value;
  }
  set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    this.w = scalar;
    return this;
  }
  setX(x) {
    this.x = x;
    return this;
  }
  setY(y) {
    this.y = y;
    return this;
  }
  setZ(z) {
    this.z = z;
    return this;
  }
  setW(w) {
    this.w = w;
    return this;
  }
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      case 3:
        this.w = value;
        break;
      default:
        throw new Error("index is out of range: " + index);
    }
    return this;
  }
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + index);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w !== void 0 ? v.w : 1;
    return this;
  }
  add(v, w) {
    if (w !== void 0) {
      console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
      return this.addVectors(v, w);
    }
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  }
  addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;
    return this;
  }
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this;
  }
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    this.w += v.w * s;
    return this;
  }
  sub(v, w) {
    if (w !== void 0) {
      console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
      return this.subVectors(v, w);
    }
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  }
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;
    return this;
  }
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
    return this;
  }
  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;
    return this;
  }
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  }
  applyMatrix4(m) {
    const x = this.x, y = this.y, z = this.z, w = this.w;
    const e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
    this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
    return this;
  }
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  setAxisAngleFromQuaternion(q) {
    this.w = 2 * Math.acos(q.w);
    const s = Math.sqrt(1 - q.w * q.w);
    if (s < 1e-4) {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    } else {
      this.x = q.x / s;
      this.y = q.y / s;
      this.z = q.z / s;
    }
    return this;
  }
  setAxisAngleFromRotationMatrix(m) {
    let angle, x, y, z;
    const epsilon = 0.01, epsilon2 = 0.1, te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
    if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
      if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
        this.set(1, 0, 0, 0);
        return this;
      }
      angle = Math.PI;
      const xx = (m11 + 1) / 2;
      const yy = (m22 + 1) / 2;
      const zz = (m33 + 1) / 2;
      const xy = (m12 + m21) / 4;
      const xz = (m13 + m31) / 4;
      const yz = (m23 + m32) / 4;
      if (xx > yy && xx > zz) {
        if (xx < epsilon) {
          x = 0;
          y = 0.707106781;
          z = 0.707106781;
        } else {
          x = Math.sqrt(xx);
          y = xy / x;
          z = xz / x;
        }
      } else if (yy > zz) {
        if (yy < epsilon) {
          x = 0.707106781;
          y = 0;
          z = 0.707106781;
        } else {
          y = Math.sqrt(yy);
          x = xy / y;
          z = yz / y;
        }
      } else {
        if (zz < epsilon) {
          x = 0.707106781;
          y = 0.707106781;
          z = 0;
        } else {
          z = Math.sqrt(zz);
          x = xz / z;
          y = yz / z;
        }
      }
      this.set(x, y, z, angle);
      return this;
    }
    let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
    if (Math.abs(s) < 1e-3)
      s = 1;
    this.x = (m32 - m23) / s;
    this.y = (m13 - m31) / s;
    this.z = (m21 - m12) / s;
    this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
    return this;
  }
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    this.w = Math.min(this.w, v.w);
    return this;
  }
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    this.w = Math.max(this.w, v.w);
    return this;
  }
  clamp(min, max) {
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));
    this.w = Math.max(min.w, Math.min(max.w, this.w));
    return this;
  }
  clampScalar(minVal, maxVal) {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));
    this.w = Math.max(minVal, Math.min(maxVal, this.w));
    return this;
  }
  clampLength(min, max) {
    const length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);
    return this;
  }
  roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
    this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(length) {
    return this.normalize().multiplyScalar(length);
  }
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    this.w += (v.w - this.w) * alpha;
    return this;
  }
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    this.w = v1.w + (v2.w - v1.w) * alpha;
    return this;
  }
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
  }
  fromArray(array, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    this.w = array[offset + 3];
    return this;
  }
  toArray(array = [], offset = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    array[offset + 3] = this.w;
    return array;
  }
  fromBufferAttribute(attribute, index, offset) {
    if (offset !== void 0) {
      console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute().");
    }
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    this.w = attribute.getW(index);
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.w = Math.random();
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
    yield this.w;
  }
}
class Box3 {
  constructor(min = new Vector3(Infinity, Infinity, Infinity), max = new Vector3(-Infinity, -Infinity, -Infinity)) {
    this.isBox3 = true;
    this.min = min;
    this.max = max;
  }
  set(min, max) {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  }
  setFromArray(array) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (let i = 0, l = array.length; i < l; i += 3) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];
      if (x < minX)
        minX = x;
      if (y < minY)
        minY = y;
      if (z < minZ)
        minZ = z;
      if (x > maxX)
        maxX = x;
      if (y > maxY)
        maxY = y;
      if (z > maxZ)
        maxZ = z;
    }
    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);
    return this;
  }
  setFromBufferAttribute(attribute) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (let i = 0, l = attribute.count; i < l; i++) {
      const x = attribute.getX(i);
      const y = attribute.getY(i);
      const z = attribute.getZ(i);
      if (x < minX)
        minX = x;
      if (y < minY)
        minY = y;
      if (z < minZ)
        minZ = z;
      if (x > maxX)
        maxX = x;
      if (y > maxY)
        maxY = y;
      if (z > maxZ)
        maxZ = z;
    }
    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);
    return this;
  }
  setFromPoints(points) {
    this.makeEmpty();
    for (let i = 0, il = points.length; i < il; i++) {
      this.expandByPoint(points[i]);
    }
    return this;
  }
  setFromCenterAndSize(center, size) {
    const halfSize = _vector$1.copy(size).multiplyScalar(0.5);
    this.min.copy(center).sub(halfSize);
    this.max.copy(center).add(halfSize);
    return this;
  }
  setFromObject(object, precise = false) {
    this.makeEmpty();
    return this.expandByObject(object, precise);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(box) {
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  }
  makeEmpty() {
    this.min.x = this.min.y = this.min.z = Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(target) {
    return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(target) {
    return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
  }
  expandByPoint(point) {
    this.min.min(point);
    this.max.max(point);
    return this;
  }
  expandByVector(vector) {
    this.min.sub(vector);
    this.max.add(vector);
    return this;
  }
  expandByScalar(scalar) {
    this.min.addScalar(-scalar);
    this.max.addScalar(scalar);
    return this;
  }
  expandByObject(object, precise = false) {
    object.updateWorldMatrix(false, false);
    const geometry = object.geometry;
    if (geometry !== void 0) {
      if (precise && geometry.attributes != void 0 && geometry.attributes.position !== void 0) {
        const position = geometry.attributes.position;
        for (let i = 0, l = position.count; i < l; i++) {
          _vector$1.fromBufferAttribute(position, i).applyMatrix4(object.matrixWorld);
          this.expandByPoint(_vector$1);
        }
      } else {
        if (geometry.boundingBox === null) {
          geometry.computeBoundingBox();
        }
        _box$1.copy(geometry.boundingBox);
        _box$1.applyMatrix4(object.matrixWorld);
        this.union(_box$1);
      }
    }
    const children = object.children;
    for (let i = 0, l = children.length; i < l; i++) {
      this.expandByObject(children[i], precise);
    }
    return this;
  }
  containsPoint(point) {
    return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
  }
  containsBox(box) {
    return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
  }
  getParameter(point, target) {
    return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(box) {
    return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
  }
  intersectsSphere(sphere) {
    this.clampPoint(sphere.center, _vector$1);
    return _vector$1.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
  }
  intersectsPlane(plane2) {
    let min, max;
    if (plane2.normal.x > 0) {
      min = plane2.normal.x * this.min.x;
      max = plane2.normal.x * this.max.x;
    } else {
      min = plane2.normal.x * this.max.x;
      max = plane2.normal.x * this.min.x;
    }
    if (plane2.normal.y > 0) {
      min += plane2.normal.y * this.min.y;
      max += plane2.normal.y * this.max.y;
    } else {
      min += plane2.normal.y * this.max.y;
      max += plane2.normal.y * this.min.y;
    }
    if (plane2.normal.z > 0) {
      min += plane2.normal.z * this.min.z;
      max += plane2.normal.z * this.max.z;
    } else {
      min += plane2.normal.z * this.max.z;
      max += plane2.normal.z * this.min.z;
    }
    return min <= -plane2.constant && max >= -plane2.constant;
  }
  intersectsTriangle(triangle) {
    if (this.isEmpty()) {
      return false;
    }
    this.getCenter(_center);
    _extents.subVectors(this.max, _center);
    _v0.subVectors(triangle.a, _center);
    _v1$1.subVectors(triangle.b, _center);
    _v2.subVectors(triangle.c, _center);
    _f0.subVectors(_v1$1, _v0);
    _f1.subVectors(_v2, _v1$1);
    _f2.subVectors(_v0, _v2);
    let axes = [
      0,
      -_f0.z,
      _f0.y,
      0,
      -_f1.z,
      _f1.y,
      0,
      -_f2.z,
      _f2.y,
      _f0.z,
      0,
      -_f0.x,
      _f1.z,
      0,
      -_f1.x,
      _f2.z,
      0,
      -_f2.x,
      -_f0.y,
      _f0.x,
      0,
      -_f1.y,
      _f1.x,
      0,
      -_f2.y,
      _f2.x,
      0
    ];
    if (!satForAxes(axes, _v0, _v1$1, _v2, _extents)) {
      return false;
    }
    axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (!satForAxes(axes, _v0, _v1$1, _v2, _extents)) {
      return false;
    }
    _triangleNormal.crossVectors(_f0, _f1);
    axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
    return satForAxes(axes, _v0, _v1$1, _v2, _extents);
  }
  clampPoint(point, target) {
    return target.copy(point).clamp(this.min, this.max);
  }
  distanceToPoint(point) {
    const clampedPoint = _vector$1.copy(point).clamp(this.min, this.max);
    return clampedPoint.sub(point).length();
  }
  getBoundingSphere(target) {
    this.getCenter(target.center);
    target.radius = this.getSize(_vector$1).length() * 0.5;
    return target;
  }
  intersect(box) {
    this.min.max(box.min);
    this.max.min(box.max);
    if (this.isEmpty())
      this.makeEmpty();
    return this;
  }
  union(box) {
    this.min.min(box.min);
    this.max.max(box.max);
    return this;
  }
  applyMatrix4(matrix) {
    if (this.isEmpty())
      return this;
    _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
    _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
    _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
    _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
    _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
    _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
    _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
    _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
    this.setFromPoints(_points);
    return this;
  }
  translate(offset) {
    this.min.add(offset);
    this.max.add(offset);
    return this;
  }
  equals(box) {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
}
const _points = [
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3(),
  /* @__PURE__ */ new Vector3()
];
const _vector$1 = /* @__PURE__ */ new Vector3();
const _box$1 = /* @__PURE__ */ new Box3();
const _v0 = /* @__PURE__ */ new Vector3();
const _v1$1 = /* @__PURE__ */ new Vector3();
const _v2 = /* @__PURE__ */ new Vector3();
const _f0 = /* @__PURE__ */ new Vector3();
const _f1 = /* @__PURE__ */ new Vector3();
const _f2 = /* @__PURE__ */ new Vector3();
const _center = /* @__PURE__ */ new Vector3();
const _extents = /* @__PURE__ */ new Vector3();
const _triangleNormal = /* @__PURE__ */ new Vector3();
const _testAxis = /* @__PURE__ */ new Vector3();
function satForAxes(axes, v0, v1, v2, extents) {
  for (let i = 0, j = axes.length - 3; i <= j; i += 3) {
    _testAxis.fromArray(axes, i);
    const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
    const p0 = v0.dot(_testAxis);
    const p1 = v1.dot(_testAxis);
    const p2 = v2.dot(_testAxis);
    if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
      return false;
    }
  }
  return true;
}
const _box = /* @__PURE__ */ new Box3();
const _v1 = /* @__PURE__ */ new Vector3();
const _toFarthestPoint = /* @__PURE__ */ new Vector3();
const _toPoint = /* @__PURE__ */ new Vector3();
class Sphere {
  constructor(center = new Vector3(), radius = -1) {
    this.center = center;
    this.radius = radius;
  }
  set(center, radius) {
    this.center.copy(center);
    this.radius = radius;
    return this;
  }
  setFromPoints(points, optionalCenter) {
    const center = this.center;
    if (optionalCenter !== void 0) {
      center.copy(optionalCenter);
    } else {
      _box.setFromPoints(points).getCenter(center);
    }
    let maxRadiusSq = 0;
    for (let i = 0, il = points.length; i < il; i++) {
      maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
    }
    this.radius = Math.sqrt(maxRadiusSq);
    return this;
  }
  copy(sphere) {
    this.center.copy(sphere.center);
    this.radius = sphere.radius;
    return this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    this.center.set(0, 0, 0);
    this.radius = -1;
    return this;
  }
  containsPoint(point) {
    return point.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(point) {
    return point.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(sphere) {
    const radiusSum = this.radius + sphere.radius;
    return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
  }
  intersectsBox(box) {
    return box.intersectsSphere(this);
  }
  intersectsPlane(plane2) {
    return Math.abs(plane2.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(point, target) {
    const deltaLengthSq = this.center.distanceToSquared(point);
    target.copy(point);
    if (deltaLengthSq > this.radius * this.radius) {
      target.sub(this.center).normalize();
      target.multiplyScalar(this.radius).add(this.center);
    }
    return target;
  }
  getBoundingBox(target) {
    if (this.isEmpty()) {
      target.makeEmpty();
      return target;
    }
    target.set(this.center, this.center);
    target.expandByScalar(this.radius);
    return target;
  }
  applyMatrix4(matrix) {
    this.center.applyMatrix4(matrix);
    this.radius = this.radius * matrix.getMaxScaleOnAxis();
    return this;
  }
  translate(offset) {
    this.center.add(offset);
    return this;
  }
  expandByPoint(point) {
    _toPoint.subVectors(point, this.center);
    const lengthSq = _toPoint.lengthSq();
    if (lengthSq > this.radius * this.radius) {
      const length = Math.sqrt(lengthSq);
      const missingRadiusHalf = (length - this.radius) * 0.5;
      this.center.add(_toPoint.multiplyScalar(missingRadiusHalf / length));
      this.radius += missingRadiusHalf;
    }
    return this;
  }
  union(sphere) {
    if (this.center.equals(sphere.center) === true) {
      _toFarthestPoint.set(0, 0, 1).multiplyScalar(sphere.radius);
    } else {
      _toFarthestPoint.subVectors(sphere.center, this.center).normalize().multiplyScalar(sphere.radius);
    }
    this.expandByPoint(_v1.copy(sphere.center).add(_toFarthestPoint));
    this.expandByPoint(_v1.copy(sphere.center).sub(_toFarthestPoint));
    return this;
  }
  equals(sphere) {
    return sphere.center.equals(this.center) && sphere.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Matrix3 {
  constructor() {
    this.isMatrix3 = true;
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ];
    if (arguments.length > 0) {
      console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
    }
  }
  set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    te[0] = n11;
    te[1] = n21;
    te[2] = n31;
    te[3] = n12;
    te[4] = n22;
    te[5] = n32;
    te[6] = n13;
    te[7] = n23;
    te[8] = n33;
    return this;
  }
  identity() {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this;
  }
  copy(m) {
    const te = this.elements;
    const me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    return this;
  }
  extractBasis(xAxis, yAxis, zAxis) {
    xAxis.setFromMatrix3Column(this, 0);
    yAxis.setFromMatrix3Column(this, 1);
    zAxis.setFromMatrix3Column(this, 2);
    return this;
  }
  setFromMatrix4(m) {
    const me = m.elements;
    this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
    return this;
  }
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;
    const a11 = ae[0], a12 = ae[3], a13 = ae[6];
    const a21 = ae[1], a22 = ae[4], a23 = ae[7];
    const a31 = ae[2], a32 = ae[5], a33 = ae[8];
    const b11 = be[0], b12 = be[3], b13 = be[6];
    const b21 = be[1], b22 = be[4], b23 = be[7];
    const b31 = be[2], b32 = be[5], b33 = be[8];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31;
    te[3] = a11 * b12 + a12 * b22 + a13 * b32;
    te[6] = a11 * b13 + a12 * b23 + a13 * b33;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31;
    te[4] = a21 * b12 + a22 * b22 + a23 * b32;
    te[7] = a21 * b13 + a22 * b23 + a23 * b33;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31;
    te[5] = a31 * b12 + a32 * b22 + a33 * b32;
    te[8] = a31 * b13 + a32 * b23 + a33 * b33;
    return this;
  }
  multiplyScalar(s) {
    const te = this.elements;
    te[0] *= s;
    te[3] *= s;
    te[6] *= s;
    te[1] *= s;
    te[4] *= s;
    te[7] *= s;
    te[2] *= s;
    te[5] *= s;
    te[8] *= s;
    return this;
  }
  determinant() {
    const te = this.elements;
    const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  }
  invert() {
    const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
    if (det === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n31 * n23 - n33 * n21) * detInv;
    te[2] = (n32 * n21 - n31 * n22) * detInv;
    te[3] = t12 * detInv;
    te[4] = (n33 * n11 - n31 * n13) * detInv;
    te[5] = (n31 * n12 - n32 * n11) * detInv;
    te[6] = t13 * detInv;
    te[7] = (n21 * n13 - n23 * n11) * detInv;
    te[8] = (n22 * n11 - n21 * n12) * detInv;
    return this;
  }
  transpose() {
    let tmp;
    const m = this.elements;
    tmp = m[1];
    m[1] = m[3];
    m[3] = tmp;
    tmp = m[2];
    m[2] = m[6];
    m[6] = tmp;
    tmp = m[5];
    m[5] = m[7];
    m[7] = tmp;
    return this;
  }
  getNormalMatrix(matrix4) {
    return this.setFromMatrix4(matrix4).invert().transpose();
  }
  transposeIntoArray(r) {
    const m = this.elements;
    r[0] = m[0];
    r[1] = m[3];
    r[2] = m[6];
    r[3] = m[1];
    r[4] = m[4];
    r[5] = m[7];
    r[6] = m[2];
    r[7] = m[5];
    r[8] = m[8];
    return this;
  }
  setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
    return this;
  }
  scale(sx, sy) {
    const te = this.elements;
    te[0] *= sx;
    te[3] *= sx;
    te[6] *= sx;
    te[1] *= sy;
    te[4] *= sy;
    te[7] *= sy;
    return this;
  }
  rotate(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    const te = this.elements;
    const a11 = te[0], a12 = te[3], a13 = te[6];
    const a21 = te[1], a22 = te[4], a23 = te[7];
    te[0] = c * a11 + s * a21;
    te[3] = c * a12 + s * a22;
    te[6] = c * a13 + s * a23;
    te[1] = -s * a11 + c * a21;
    te[4] = -s * a12 + c * a22;
    te[7] = -s * a13 + c * a23;
    return this;
  }
  translate(tx, ty) {
    const te = this.elements;
    te[0] += tx * te[2];
    te[3] += tx * te[5];
    te[6] += tx * te[8];
    te[1] += ty * te[2];
    te[4] += ty * te[5];
    te[7] += ty * te[8];
    return this;
  }
  equals(matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 9; i++) {
      if (te[i] !== me[i])
        return false;
    }
    return true;
  }
  fromArray(array, offset = 0) {
    for (let i = 0; i < 9; i++) {
      this.elements[i] = array[i + offset];
    }
    return this;
  }
  toArray(array = [], offset = 0) {
    const te = this.elements;
    array[offset] = te[0];
    array[offset + 1] = te[1];
    array[offset + 2] = te[2];
    array[offset + 3] = te[3];
    array[offset + 4] = te[4];
    array[offset + 5] = te[5];
    array[offset + 6] = te[6];
    array[offset + 7] = te[7];
    array[offset + 8] = te[8];
    return array;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const _vector1 = /* @__PURE__ */ new Vector3();
const _vector2 = /* @__PURE__ */ new Vector3();
const _normalMatrix = /* @__PURE__ */ new Matrix3();
class Plane {
  constructor(normal = new Vector3(1, 0, 0), constant = 0) {
    this.isPlane = true;
    this.normal = normal;
    this.constant = constant;
  }
  set(normal, constant) {
    this.normal.copy(normal);
    this.constant = constant;
    return this;
  }
  setComponents(x, y, z, w) {
    this.normal.set(x, y, z);
    this.constant = w;
    return this;
  }
  setFromNormalAndCoplanarPoint(normal, point) {
    this.normal.copy(normal);
    this.constant = -point.dot(this.normal);
    return this;
  }
  setFromCoplanarPoints(a, b, c) {
    const normal = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize();
    this.setFromNormalAndCoplanarPoint(normal, a);
    return this;
  }
  copy(plane2) {
    this.normal.copy(plane2.normal);
    this.constant = plane2.constant;
    return this;
  }
  normalize() {
    const inverseNormalLength = 1 / this.normal.length();
    this.normal.multiplyScalar(inverseNormalLength);
    this.constant *= inverseNormalLength;
    return this;
  }
  negate() {
    this.constant *= -1;
    this.normal.negate();
    return this;
  }
  distanceToPoint(point) {
    return this.normal.dot(point) + this.constant;
  }
  distanceToSphere(sphere) {
    return this.distanceToPoint(sphere.center) - sphere.radius;
  }
  projectPoint(point, target) {
    return target.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);
  }
  intersectLine(line, target) {
    const direction = line.delta(_vector1);
    const denominator = this.normal.dot(direction);
    if (denominator === 0) {
      if (this.distanceToPoint(line.start) === 0) {
        return target.copy(line.start);
      }
      return null;
    }
    const t = -(line.start.dot(this.normal) + this.constant) / denominator;
    if (t < 0 || t > 1) {
      return null;
    }
    return target.copy(direction).multiplyScalar(t).add(line.start);
  }
  intersectsLine(line) {
    const startSign = this.distanceToPoint(line.start);
    const endSign = this.distanceToPoint(line.end);
    return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
  }
  intersectsBox(box) {
    return box.intersectsPlane(this);
  }
  intersectsSphere(sphere) {
    return sphere.intersectsPlane(this);
  }
  coplanarPoint(target) {
    return target.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(matrix, optionalNormalMatrix) {
    const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
    const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);
    const normal = this.normal.applyMatrix3(normalMatrix).normalize();
    this.constant = -referencePoint.dot(normal);
    return this;
  }
  translate(offset) {
    this.constant -= offset.dot(this.normal);
    return this;
  }
  equals(plane2) {
    return plane2.normal.equals(this.normal) && plane2.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _sphere = /* @__PURE__ */ new Sphere();
const _vector = /* @__PURE__ */ new Vector3();
class Frustum {
  constructor(p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane()) {
    this.planes = [p0, p1, p2, p3, p4, p5];
  }
  set(p0, p1, p2, p3, p4, p5) {
    const planes = this.planes;
    planes[0].copy(p0);
    planes[1].copy(p1);
    planes[2].copy(p2);
    planes[3].copy(p3);
    planes[4].copy(p4);
    planes[5].copy(p5);
    return this;
  }
  copy(frustum) {
    const planes = this.planes;
    for (let i = 0; i < 6; i++) {
      planes[i].copy(frustum.planes[i]);
    }
    return this;
  }
  setFromProjectionMatrix(m) {
    const planes = this.planes;
    const me = m.elements;
    const me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
    const me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
    const me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
    const me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];
    planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
    planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
    planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
    planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
    planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
    planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
    return this;
  }
  intersectsObject(object) {
    const geometry = object.geometry;
    if (geometry.boundingSphere === null)
      geometry.computeBoundingSphere();
    _sphere.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
    return this.intersectsSphere(_sphere);
  }
  intersectsSprite(sprite) {
    _sphere.center.set(0, 0, 0);
    _sphere.radius = 0.7071067811865476;
    _sphere.applyMatrix4(sprite.matrixWorld);
    return this.intersectsSphere(_sphere);
  }
  intersectsSphere(sphere) {
    const planes = this.planes;
    const center = sphere.center;
    const negRadius = -sphere.radius;
    for (let i = 0; i < 6; i++) {
      const distance = planes[i].distanceToPoint(center);
      if (distance < negRadius) {
        return false;
      }
    }
    return true;
  }
  intersectsBox(box) {
    const planes = this.planes;
    for (let i = 0; i < 6; i++) {
      const plane2 = planes[i];
      _vector.x = plane2.normal.x > 0 ? box.max.x : box.min.x;
      _vector.y = plane2.normal.y > 0 ? box.max.y : box.min.y;
      _vector.z = plane2.normal.z > 0 ? box.max.z : box.min.z;
      if (plane2.distanceToPoint(_vector) < 0) {
        return false;
      }
    }
    return true;
  }
  containsPoint(point) {
    const planes = this.planes;
    for (let i = 0; i < 6; i++) {
      if (planes[i].distanceToPoint(point) < 0) {
        return false;
      }
    }
    return true;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _projScreenMatrix = /* @__PURE__ */ new Matrix4();
const _lightPositionWorld = /* @__PURE__ */ new Vector3();
const _lookTarget = /* @__PURE__ */ new Vector3();
class LightShadow {
  constructor(camera) {
    this.camera = camera;
    this.bias = 0;
    this.normalBias = 0;
    this.radius = 1;
    this.blurSamples = 8;
    this.mapSize = new Vector2(512, 512);
    this.map = null;
    this.mapPass = null;
    this.matrix = new Matrix4();
    this.autoUpdate = true;
    this.needsUpdate = false;
    this._frustum = new Frustum();
    this._frameExtents = new Vector2(1, 1);
    this._viewportCount = 1;
    this._viewports = [
      new Vector4(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(light) {
    const shadowCamera = this.camera;
    const shadowMatrix = this.matrix;
    _lightPositionWorld.setFromMatrixPosition(light.matrixWorld);
    shadowCamera.position.copy(_lightPositionWorld);
    _lookTarget.setFromMatrixPosition(light.target.matrixWorld);
    shadowCamera.lookAt(_lookTarget);
    shadowCamera.updateMatrixWorld();
    _projScreenMatrix.multiplyMatrices(shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(_projScreenMatrix);
    shadowMatrix.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    shadowMatrix.multiply(shadowCamera.projectionMatrix);
    shadowMatrix.multiply(shadowCamera.matrixWorldInverse);
  }
  getViewport(viewportIndex) {
    return this._viewports[viewportIndex];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    if (this.map) {
      this.map.dispose();
    }
    if (this.mapPass) {
      this.mapPass.dispose();
    }
  }
  copy(source) {
    this.camera = source.camera.clone();
    this.bias = source.bias;
    this.radius = source.radius;
    this.mapSize.copy(source.mapSize);
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const object = {};
    if (this.bias !== 0)
      object.bias = this.bias;
    if (this.normalBias !== 0)
      object.normalBias = this.normalBias;
    if (this.radius !== 1)
      object.radius = this.radius;
    if (this.mapSize.x !== 512 || this.mapSize.y !== 512)
      object.mapSize = this.mapSize.toArray();
    object.camera = this.camera.toJSON(false).object;
    delete object.camera.matrix;
    return object;
  }
}
const version = "0.1.3-5";
if (!window.__THREE__) {
  console.error(`vis-three dependent on three.js module, pleace run 'npm i three' first.`);
}
if (window.__VIS__) {
  console.warn(`Duplicate vis-three frames are introduced`);
} else {
  window.__VIS__ = version;
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
const sceneAdd = Scene.prototype.add;
const sceneRemove = Scene.prototype.remove;
Scene.prototype.add = function(...object) {
  sceneAdd.call(this, ...object);
  this.dispatchEvent({
    type: "afterAdd",
    objects: object
  });
  return this;
};
Scene.prototype.remove = function(...object) {
  sceneRemove.call(this, ...object);
  this.dispatchEvent({
    type: "afterRemove",
    objects: object
  });
  return this;
};
const lightShadow = new LightShadow(new OrthographicCamera(-256, 256, 256, -256));
lightShadow.autoUpdate = false;
lightShadow.needsUpdate = false;
AmbientLight.prototype.shadow = lightShadow;
export { Action as ActionLibrary, AniScriptLibrary, AnimationDataSupport, BooleanModifier, CONFIGMODULE, CONFIGTYPE, CSS3DDataSupport, CameraDataSupport, CameraHelper, CanvasGenerator, ControlsDataSupport, DISPLAYMODE, DataSupportManager, DirectionalLightHelper, DisplayEngine, DisplayEngineSupport, ENGINEPLUGIN, EVENTNAME, Engine, EngineSupport, EventLibrary, GeometryDataSupport, GroupDataSupport, GroupHelper, History, JSONHandler, KeyboardManager, LightDataSupport, LineDataSupport, LoaderManager, MODULETYPE, MaterialDataSupport, MaterialDisplayer, MeshDataSupport, ModelingEngine, ModelingEngineSupport, OBJECTMODULE, PassDataSupport, PointLightHelper, PointsDataSupport, ProxyBroadcast, RESOURCEEVENTTYPE, RenderManager, RendererDataSupport, ResourceManager, SceneDataSupport, ShaderLibrary, SpotLightHelper, SpriteDataSupport, SupportDataGenerator, TIMINGFUNCTION, TextureDataSupport, TextureDisplayer, Translater, VIEWPOINT, VideoLoader, generateConfig };
