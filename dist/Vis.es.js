var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Clock, Vector3, MOUSE, TOUCH, PerspectiveCamera, Quaternion, Spherical, Vector2, OrthographicCamera, BufferGeometry, Float32BufferAttribute, Color, WebGLRenderTarget, RGBAFormat, WebGLMultisampleRenderTarget, Raycaster, Object3D, WebGLRenderer, Loader, LoaderUtils, FileLoader, FrontSide, RepeatWrapping, MeshPhongMaterial, DefaultLoadingManager, TextureLoader, sRGBEncoding, Cache, SpotLight, PointLight, DirectionalLight, MeshBasicMaterial, MeshPhysicalMaterial, TangentSpaceNormalMap, ImageBitmapLoader, InterleavedBuffer, InterleavedBufferAttribute, BufferAttribute, LinearFilter, LinearMipmapLinearFilter, PointsMaterial, Material, LineBasicMaterial, MeshStandardMaterial, DoubleSide, PropertyBinding, SkinnedMesh, Mesh, LineSegments, Line, LineLoop, Points, Group, MathUtils, InterpolateLinear, AnimationClip, Bone, Matrix4, Skeleton, TriangleFanDrawMode, Interpolant, NearestFilter, NearestMipmapNearestFilter, LinearMipmapNearestFilter, NearestMipmapLinearFilter, ClampToEdgeWrapping, MirroredRepeatWrapping, InterpolateDiscrete, Texture, TriangleStripDrawMode, VectorKeyframeTrack, QuaternionKeyframeTrack, NumberKeyframeTrack, Box3, Sphere, CompressedTexture, UnsignedByteType, LinearEncoding, RGBA_ASTC_4x4_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT5_Format, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, ImageLoader, UVMapping, CubeReflectionMapping, OneMinusSrcAlphaFactor, AddEquation, NormalBlending, SrcAlphaFactor, MultiplyOperation, PCFShadowMap, NoToneMapping, Euler, PlaneBufferGeometry, CurvePath, QuadraticBezierCurve3, CubicBezierCurve3, LineCurve3, CatmullRomCurve3, TubeGeometry, ShapeBufferGeometry, Shape, ShapeGeometry, BoxBufferGeometry, SphereBufferGeometry, CircleBufferGeometry, ConeBufferGeometry, CylinderBufferGeometry, TorusGeometry, RingBufferGeometry, EdgesGeometry, AmbientLight, ShaderMaterial, SpriteMaterial, Scene, UniformsUtils, Sprite, AdditiveBlending, Camera, Fog, FogExp2, CanvasTexture, CubeTexture, RGBFormat, AxesHelper, GridHelper, MeshLambertMaterial, Light, CameraHelper as CameraHelper$1, OctahedronBufferGeometry, PCFSoftShadowMap } from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { v4, validate } from "uuid";
import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { Easing, Tween } from "@tweenjs/tween.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { Pass as Pass$1, FullScreenQuad } from "three/examples/jsm/postprocessing/Pass";
import keyboardjs from "keyboardjs";
import { CSG } from "three-csg-ts";
import { LightShadow } from "three/src/lights/LightShadow";
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
  once(type, listener) {
    const onceListener = function(event) {
      listener.call(this, event);
      this.removeEventListener(type, onceListener);
    };
    this.addEventListener(type, onceListener);
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
    __publicField(this, "target", new Vector3());
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
      const offset = new Vector3();
      const quat = new Quaternion().setFromUnitVectors(this.object.up, new Vector3(0, 1, 0));
      const quatInverse = quat.clone().invert();
      const lastPosition = new Vector3();
      const lastQuaternion = new Quaternion();
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
    const panOffset = new Vector3();
    let zoomChanged = false;
    const rotateStart = new Vector2();
    const rotateEnd = new Vector2();
    const rotateDelta = new Vector2();
    const panStart = new Vector2();
    const panEnd = new Vector2();
    const panDelta = new Vector2();
    const dollyStart = new Vector2();
    const dollyEnd = new Vector2();
    const dollyDelta = new Vector2();
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
      const v = new Vector3();
      return function panLeft2(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0);
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    }();
    const panUp = (() => {
      const v = new Vector3();
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
      const offset = new Vector3();
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
        position = new Vector2();
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
    event.options.orbitControls && this.orbitControls.setCamera(event.camera);
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
class Pass {
  constructor() {
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;
    this.renderToScreen = false;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
}
new OrthographicCamera(-1, 1, 1, -1, 0, 1);
const _geometry = new BufferGeometry();
_geometry.setAttribute("position", new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
_geometry.setAttribute("uv", new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
class RenderPass extends Pass {
  constructor(scene, camera, overrideMaterial, clearColor, clearAlpha) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.overrideMaterial = overrideMaterial;
    this.clearColor = clearColor;
    this.clearAlpha = clearAlpha !== void 0 ? clearAlpha : 0;
    this.clear = true;
    this.clearDepth = false;
    this.needsSwap = false;
    this._oldClearColor = new Color();
  }
  render(renderer, writeBuffer, readBuffer) {
    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    let oldClearAlpha, oldOverrideMaterial;
    if (this.overrideMaterial !== void 0) {
      oldOverrideMaterial = this.scene.overrideMaterial;
      this.scene.overrideMaterial = this.overrideMaterial;
    }
    if (this.clearColor) {
      renderer.getClearColor(this._oldClearColor);
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }
    if (this.clearDepth) {
      renderer.clearDepth();
    }
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    if (this.clear)
      renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
    renderer.render(this.scene, this.camera);
    if (this.clearColor) {
      renderer.setClearColor(this._oldClearColor, oldClearAlpha);
    }
    if (this.overrideMaterial !== void 0) {
      this.scene.overrideMaterial = oldOverrideMaterial;
    }
    renderer.autoClear = oldAutoClear;
  }
}
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
    this.mouse = new Vector2();
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
    event.options.transformControls && transformControls.setCamera(event.camera);
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
  this.getScreenshot = async function(params2 = {}) {
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
    let DataURI = "";
    const gl = this.webGLRenderer.getContext();
    const maxRenderBufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
    const maxSize = maxRenderBufferSize / 4;
    if (params2.width > maxSize || params2.height > maxSize) {
      const renderList = [];
      const rowNum = Math.ceil(params2.width / maxSize);
      const columnNum = Math.ceil(params2.height / maxSize);
      const partWidth = params2.width / rowNum;
      const partHeight = params2.height / columnNum;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.setAttribute("width", params2.width.toString());
      tempCanvas.setAttribute("height", params2.height.toString());
      const ctx = tempCanvas.getContext("2d");
      if (!ctx) {
        console.warn(`can not support canvas 2d;`);
        return DataURI;
      }
      this.setSize(partWidth, partHeight);
      for (let rowIndex = 0; rowIndex < rowNum; rowIndex += 1) {
        for (let columnIndex = 0; columnIndex < columnNum; columnIndex += 1) {
          renderList.push({
            x: partWidth * rowIndex,
            y: partHeight * columnIndex
          });
        }
      }
      const drawList = [];
      renderList.forEach((elem) => {
        this.camera.setViewOffset(params2.width, params2.height, elem.x, elem.y, partWidth, partHeight);
        this.renderManager.render();
        const DataURI2 = this.webGLRenderer.domElement.toDataURL(params2.mine);
        drawList.push(new Promise((resolve, reject) => {
          const image = new Image();
          image.src = DataURI2;
          image.onload = () => {
            ctx.drawImage(image, elem.x, elem.y, partWidth, partHeight);
            resolve(null);
          };
        }));
      });
      this.setSize(cacheSize.width, cacheSize.height);
      await Promise.all(drawList).catch((err) => {
        console.warn(err);
      });
      DataURI = tempCanvas.toDataURL(params2.mine);
      this.camera.clearViewOffset();
    } else {
      this.setSize(params2.width, params2.height);
      this.renderManager.render();
      DataURI = this.webGLRenderer.domElement.toDataURL(params2.mine);
      this.setSize(cacheSize.width, cacheSize.height);
    }
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
class GLTFLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.dracoLoader = null;
    this.ktx2Loader = null;
    this.meshoptDecoder = null;
    this.pluginCallbacks = [];
    this.register(function(parser) {
      return new GLTFMaterialsClearcoatExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureBasisUExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFTextureWebPExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsSheenExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsTransmissionExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsVolumeExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsIorExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsEmissiveStrengthExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsSpecularExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMaterialsIridescenceExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFLightsExtension(parser);
    });
    this.register(function(parser) {
      return new GLTFMeshoptCompression(parser);
    });
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    let resourcePath;
    if (this.resourcePath !== "") {
      resourcePath = this.resourcePath;
    } else if (this.path !== "") {
      resourcePath = this.path;
    } else {
      resourcePath = LoaderUtils.extractUrlBase(url);
    }
    this.manager.itemStart(url);
    const _onError = function(e) {
      if (onError) {
        onError(e);
      } else {
        console.error(e);
      }
      scope.manager.itemError(url);
      scope.manager.itemEnd(url);
    };
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(data) {
      try {
        scope.parse(data, resourcePath, function(gltf) {
          onLoad(gltf);
          scope.manager.itemEnd(url);
        }, _onError);
      } catch (e) {
        _onError(e);
      }
    }, onProgress, _onError);
  }
  setDRACOLoader(dracoLoader) {
    this.dracoLoader = dracoLoader;
    return this;
  }
  setDDSLoader() {
    throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
  }
  setKTX2Loader(ktx2Loader) {
    this.ktx2Loader = ktx2Loader;
    return this;
  }
  setMeshoptDecoder(meshoptDecoder) {
    this.meshoptDecoder = meshoptDecoder;
    return this;
  }
  register(callback) {
    if (this.pluginCallbacks.indexOf(callback) === -1) {
      this.pluginCallbacks.push(callback);
    }
    return this;
  }
  unregister(callback) {
    if (this.pluginCallbacks.indexOf(callback) !== -1) {
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
    }
    return this;
  }
  parse(data, path, onLoad, onError) {
    let content;
    const extensions = {};
    const plugins = {};
    if (typeof data === "string") {
      content = data;
    } else {
      const magic = LoaderUtils.decodeText(new Uint8Array(data, 0, 4));
      if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
        try {
          extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);
        } catch (error) {
          if (onError)
            onError(error);
          return;
        }
        content = extensions[EXTENSIONS.KHR_BINARY_GLTF].content;
      } else {
        content = LoaderUtils.decodeText(new Uint8Array(data));
      }
    }
    const json = JSON.parse(content);
    if (json.asset === void 0 || json.asset.version[0] < 2) {
      if (onError)
        onError(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const parser = new GLTFParser(json, {
      path: path || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    parser.fileLoader.setRequestHeader(this.requestHeader);
    for (let i = 0; i < this.pluginCallbacks.length; i++) {
      const plugin = this.pluginCallbacks[i](parser);
      plugins[plugin.name] = plugin;
      extensions[plugin.name] = true;
    }
    if (json.extensionsUsed) {
      for (let i = 0; i < json.extensionsUsed.length; ++i) {
        const extensionName = json.extensionsUsed[i];
        const extensionsRequired = json.extensionsRequired || [];
        switch (extensionName) {
          case EXTENSIONS.KHR_MATERIALS_UNLIT:
            extensions[extensionName] = new GLTFMaterialsUnlitExtension();
            break;
          case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            extensions[extensionName] = new GLTFMaterialsPbrSpecularGlossinessExtension();
            break;
          case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
            extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
            break;
          case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
            extensions[extensionName] = new GLTFTextureTransformExtension();
            break;
          case EXTENSIONS.KHR_MESH_QUANTIZATION:
            extensions[extensionName] = new GLTFMeshQuantizationExtension();
            break;
          default:
            if (extensionsRequired.indexOf(extensionName) >= 0 && plugins[extensionName] === void 0) {
              console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');
            }
        }
      }
    }
    parser.setExtensions(extensions);
    parser.setPlugins(plugins);
    parser.parse(onLoad, onError);
  }
  parseAsync(data, path) {
    const scope = this;
    return new Promise(function(resolve, reject) {
      scope.parse(data, path, resolve, reject);
    });
  }
}
function GLTFRegistry() {
  let objects = {};
  return {
    get: function(key) {
      return objects[key];
    },
    add: function(key, object) {
      objects[key] = object;
    },
    remove: function(key) {
      delete objects[key];
    },
    removeAll: function() {
      objects = {};
    }
  };
}
const EXTENSIONS = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
};
class GLTFLightsExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;
    this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const parser = this.parser;
    const nodeDefs = this.parser.json.nodes || [];
    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];
      if (nodeDef.extensions && nodeDef.extensions[this.name] && nodeDef.extensions[this.name].light !== void 0) {
        parser._addNodeRef(this.cache, nodeDef.extensions[this.name].light);
      }
    }
  }
  _loadLight(lightIndex) {
    const parser = this.parser;
    const cacheKey = "light:" + lightIndex;
    let dependency = parser.cache.get(cacheKey);
    if (dependency)
      return dependency;
    const json = parser.json;
    const extensions = json.extensions && json.extensions[this.name] || {};
    const lightDefs = extensions.lights || [];
    const lightDef = lightDefs[lightIndex];
    let lightNode;
    const color = new Color(16777215);
    if (lightDef.color !== void 0)
      color.fromArray(lightDef.color);
    const range = lightDef.range !== void 0 ? lightDef.range : 0;
    switch (lightDef.type) {
      case "directional":
        lightNode = new DirectionalLight(color);
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;
      case "point":
        lightNode = new PointLight(color);
        lightNode.distance = range;
        break;
      case "spot":
        lightNode = new SpotLight(color);
        lightNode.distance = range;
        lightDef.spot = lightDef.spot || {};
        lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== void 0 ? lightDef.spot.innerConeAngle : 0;
        lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== void 0 ? lightDef.spot.outerConeAngle : Math.PI / 4;
        lightNode.angle = lightDef.spot.outerConeAngle;
        lightNode.penumbra = 1 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + lightDef.type);
    }
    lightNode.position.set(0, 0, 0);
    lightNode.decay = 2;
    if (lightDef.intensity !== void 0)
      lightNode.intensity = lightDef.intensity;
    lightNode.name = parser.createUniqueName(lightDef.name || "light_" + lightIndex);
    dependency = Promise.resolve(lightNode);
    parser.cache.add(cacheKey, dependency);
    return dependency;
  }
  createNodeAttachment(nodeIndex) {
    const self2 = this;
    const parser = this.parser;
    const json = parser.json;
    const nodeDef = json.nodes[nodeIndex];
    const lightDef = nodeDef.extensions && nodeDef.extensions[this.name] || {};
    const lightIndex = lightDef.light;
    if (lightIndex === void 0)
      return null;
    return this._loadLight(lightIndex).then(function(light) {
      return parser._getNodeRef(self2.cache, lightIndex, light);
    });
  }
}
class GLTFMaterialsUnlitExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return MeshBasicMaterial;
  }
  extendParams(materialParams, materialDef, parser) {
    const pending = [];
    materialParams.color = new Color(1, 1, 1);
    materialParams.opacity = 1;
    const metallicRoughness = materialDef.pbrMetallicRoughness;
    if (metallicRoughness) {
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.fromArray(array);
        materialParams.opacity = array[3];
      }
      if (metallicRoughness.baseColorTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, sRGBEncoding));
      }
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsEmissiveStrengthExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const emissiveStrength = materialDef.extensions[this.name].emissiveStrength;
    if (emissiveStrength !== void 0) {
      materialParams.emissiveIntensity = emissiveStrength;
    }
    return Promise.resolve();
  }
}
class GLTFMaterialsClearcoatExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name])
      return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.clearcoatFactor !== void 0) {
      materialParams.clearcoat = extension.clearcoatFactor;
    }
    if (extension.clearcoatTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatMap", extension.clearcoatTexture));
    }
    if (extension.clearcoatRoughnessFactor !== void 0) {
      materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;
    }
    if (extension.clearcoatRoughnessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatRoughnessMap", extension.clearcoatRoughnessTexture));
    }
    if (extension.clearcoatNormalTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "clearcoatNormalMap", extension.clearcoatNormalTexture));
      if (extension.clearcoatNormalTexture.scale !== void 0) {
        const scale = extension.clearcoatNormalTexture.scale;
        materialParams.clearcoatNormalScale = new Vector2(scale, scale);
      }
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsIridescenceExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name])
      return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.iridescenceFactor !== void 0) {
      materialParams.iridescence = extension.iridescenceFactor;
    }
    if (extension.iridescenceTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "iridescenceMap", extension.iridescenceTexture));
    }
    if (extension.iridescenceIor !== void 0) {
      materialParams.iridescenceIOR = extension.iridescenceIor;
    }
    if (materialParams.iridescenceThicknessRange === void 0) {
      materialParams.iridescenceThicknessRange = [100, 400];
    }
    if (extension.iridescenceThicknessMinimum !== void 0) {
      materialParams.iridescenceThicknessRange[0] = extension.iridescenceThicknessMinimum;
    }
    if (extension.iridescenceThicknessMaximum !== void 0) {
      materialParams.iridescenceThicknessRange[1] = extension.iridescenceThicknessMaximum;
    }
    if (extension.iridescenceThicknessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "iridescenceThicknessMap", extension.iridescenceThicknessTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsSheenExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name])
      return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    materialParams.sheenColor = new Color(0, 0, 0);
    materialParams.sheenRoughness = 0;
    materialParams.sheen = 1;
    const extension = materialDef.extensions[this.name];
    if (extension.sheenColorFactor !== void 0) {
      materialParams.sheenColor.fromArray(extension.sheenColorFactor);
    }
    if (extension.sheenRoughnessFactor !== void 0) {
      materialParams.sheenRoughness = extension.sheenRoughnessFactor;
    }
    if (extension.sheenColorTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "sheenColorMap", extension.sheenColorTexture, sRGBEncoding));
    }
    if (extension.sheenRoughnessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "sheenRoughnessMap", extension.sheenRoughnessTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsTransmissionExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name])
      return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    if (extension.transmissionFactor !== void 0) {
      materialParams.transmission = extension.transmissionFactor;
    }
    if (extension.transmissionTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "transmissionMap", extension.transmissionTexture));
    }
    return Promise.all(pending);
  }
}
class GLTFMaterialsVolumeExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name])
      return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.thickness = extension.thicknessFactor !== void 0 ? extension.thicknessFactor : 0;
    if (extension.thicknessTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "thicknessMap", extension.thicknessTexture));
    }
    materialParams.attenuationDistance = extension.attenuationDistance || 0;
    const colorArray = extension.attenuationColor || [1, 1, 1];
    materialParams.attenuationColor = new Color(colorArray[0], colorArray[1], colorArray[2]);
    return Promise.all(pending);
  }
}
class GLTFMaterialsIorExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_IOR;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name])
      return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const extension = materialDef.extensions[this.name];
    materialParams.ior = extension.ior !== void 0 ? extension.ior : 1.5;
    return Promise.resolve();
  }
}
class GLTFMaterialsSpecularExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(materialIndex) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name])
      return null;
    return MeshPhysicalMaterial;
  }
  extendMaterialParams(materialIndex, materialParams) {
    const parser = this.parser;
    const materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }
    const pending = [];
    const extension = materialDef.extensions[this.name];
    materialParams.specularIntensity = extension.specularFactor !== void 0 ? extension.specularFactor : 1;
    if (extension.specularTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "specularIntensityMap", extension.specularTexture));
    }
    const colorArray = extension.specularColorFactor || [1, 1, 1];
    materialParams.specularColor = new Color(colorArray[0], colorArray[1], colorArray[2]);
    if (extension.specularColorTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "specularColorMap", extension.specularColorTexture, sRGBEncoding));
    }
    return Promise.all(pending);
  }
}
class GLTFTextureBasisUExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_TEXTURE_BASISU;
  }
  loadTexture(textureIndex) {
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[this.name]) {
      return null;
    }
    const extension = textureDef.extensions[this.name];
    const loader = parser.options.ktx2Loader;
    if (!loader) {
      if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      } else {
        return null;
      }
    }
    return parser.loadTextureImage(textureIndex, extension.source, loader);
  }
}
class GLTFTextureWebPExtension {
  constructor(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
    this.isSupported = null;
  }
  loadTexture(textureIndex) {
    const name = this.name;
    const parser = this.parser;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];
    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }
    const extension = textureDef.extensions[name];
    const source = json.images[extension.source];
    let loader = parser.textureLoader;
    if (source.uri) {
      const handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null)
        loader = handler;
    }
    return this.detectSupport().then(function(isSupported) {
      if (isSupported)
        return parser.loadTextureImage(textureIndex, extension.source, loader);
      if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      }
      return parser.loadTexture(textureIndex);
    });
  }
  detectSupport() {
    if (!this.isSupported) {
      this.isSupported = new Promise(function(resolve) {
        const image = new Image();
        image.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
        image.onload = image.onerror = function() {
          resolve(image.height === 1);
        };
      });
    }
    return this.isSupported;
  }
}
class GLTFMeshoptCompression {
  constructor(parser) {
    this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
    this.parser = parser;
  }
  loadBufferView(index) {
    const json = this.parser.json;
    const bufferView = json.bufferViews[index];
    if (bufferView.extensions && bufferView.extensions[this.name]) {
      const extensionDef = bufferView.extensions[this.name];
      const buffer = this.parser.getDependency("buffer", extensionDef.buffer);
      const decoder = this.parser.options.meshoptDecoder;
      if (!decoder || !decoder.supported) {
        if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        } else {
          return null;
        }
      }
      return Promise.all([buffer, decoder.ready]).then(function(res) {
        const byteOffset = extensionDef.byteOffset || 0;
        const byteLength = extensionDef.byteLength || 0;
        const count = extensionDef.count;
        const stride = extensionDef.byteStride;
        const result = new ArrayBuffer(count * stride);
        const source = new Uint8Array(res[0], byteOffset, byteLength);
        decoder.decodeGltfBuffer(new Uint8Array(result), count, stride, source, extensionDef.mode, extensionDef.filter);
        return result;
      });
    } else {
      return null;
    }
  }
}
const BINARY_EXTENSION_HEADER_MAGIC = "glTF";
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = { JSON: 1313821514, BIN: 5130562 };
class GLTFBinaryExtension {
  constructor(data) {
    this.name = EXTENSIONS.KHR_BINARY_GLTF;
    this.content = null;
    this.body = null;
    const headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);
    this.header = {
      magic: LoaderUtils.decodeText(new Uint8Array(data.slice(0, 4))),
      version: headerView.getUint32(4, true),
      length: headerView.getUint32(8, true)
    };
    if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    } else if (this.header.version < 2) {
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    }
    const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
    const chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
    let chunkIndex = 0;
    while (chunkIndex < chunkContentsLength) {
      const chunkLength = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      const chunkType = chunkView.getUint32(chunkIndex, true);
      chunkIndex += 4;
      if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
        const contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
        this.content = LoaderUtils.decodeText(contentArray);
      } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
        const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
        this.body = data.slice(byteOffset, byteOffset + chunkLength);
      }
      chunkIndex += chunkLength;
    }
    if (this.content === null) {
      throw new Error("THREE.GLTFLoader: JSON content not found.");
    }
  }
}
class GLTFDracoMeshCompressionExtension {
  constructor(json, dracoLoader) {
    if (!dracoLoader) {
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    }
    this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
    this.json = json;
    this.dracoLoader = dracoLoader;
    this.dracoLoader.preload();
  }
  decodePrimitive(primitive, parser) {
    const json = this.json;
    const dracoLoader = this.dracoLoader;
    const bufferViewIndex = primitive.extensions[this.name].bufferView;
    const gltfAttributeMap = primitive.extensions[this.name].attributes;
    const threeAttributeMap = {};
    const attributeNormalizedMap = {};
    const attributeTypeMap = {};
    for (const attributeName in gltfAttributeMap) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];
    }
    for (const attributeName in primitive.attributes) {
      const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      if (gltfAttributeMap[attributeName] !== void 0) {
        const accessorDef = json.accessors[primitive.attributes[attributeName]];
        const componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
        attributeTypeMap[threeAttributeName] = componentType;
        attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;
      }
    }
    return parser.getDependency("bufferView", bufferViewIndex).then(function(bufferView) {
      return new Promise(function(resolve) {
        dracoLoader.decodeDracoFile(bufferView, function(geometry) {
          for (const attributeName in geometry.attributes) {
            const attribute = geometry.attributes[attributeName];
            const normalized = attributeNormalizedMap[attributeName];
            if (normalized !== void 0)
              attribute.normalized = normalized;
          }
          resolve(geometry);
        }, threeAttributeMap, attributeTypeMap);
      });
    });
  }
}
class GLTFTextureTransformExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(texture, transform) {
    if (transform.texCoord !== void 0) {
      console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.');
    }
    if (transform.offset === void 0 && transform.rotation === void 0 && transform.scale === void 0) {
      return texture;
    }
    texture = texture.clone();
    if (transform.offset !== void 0) {
      texture.offset.fromArray(transform.offset);
    }
    if (transform.rotation !== void 0) {
      texture.rotation = transform.rotation;
    }
    if (transform.scale !== void 0) {
      texture.repeat.fromArray(transform.scale);
    }
    texture.needsUpdate = true;
    return texture;
  }
}
class GLTFMeshStandardSGMaterial extends MeshStandardMaterial {
  constructor(params) {
    super();
    this.isGLTFSpecularGlossinessMaterial = true;
    const specularMapParsFragmentChunk = [
      "#ifdef USE_SPECULARMAP",
      "	uniform sampler2D specularMap;",
      "#endif"
    ].join("\n");
    const glossinessMapParsFragmentChunk = [
      "#ifdef USE_GLOSSINESSMAP",
      "	uniform sampler2D glossinessMap;",
      "#endif"
    ].join("\n");
    const specularMapFragmentChunk = [
      "vec3 specularFactor = specular;",
      "#ifdef USE_SPECULARMAP",
      "	vec4 texelSpecular = texture2D( specularMap, vUv );",
      "	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture",
      "	specularFactor *= texelSpecular.rgb;",
      "#endif"
    ].join("\n");
    const glossinessMapFragmentChunk = [
      "float glossinessFactor = glossiness;",
      "#ifdef USE_GLOSSINESSMAP",
      "	vec4 texelGlossiness = texture2D( glossinessMap, vUv );",
      "	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture",
      "	glossinessFactor *= texelGlossiness.a;",
      "#endif"
    ].join("\n");
    const lightPhysicalFragmentChunk = [
      "PhysicalMaterial material;",
      "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );",
      "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );",
      "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );",
      "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.",
      "material.roughness += geometryRoughness;",
      "material.roughness = min( material.roughness, 1.0 );",
      "material.specularColor = specularFactor;"
    ].join("\n");
    const uniforms = {
      specular: { value: new Color().setHex(16777215) },
      glossiness: { value: 1 },
      specularMap: { value: null },
      glossinessMap: { value: null }
    };
    this._extraUniforms = uniforms;
    this.onBeforeCompile = function(shader2) {
      for (const uniformName in uniforms) {
        shader2.uniforms[uniformName] = uniforms[uniformName];
      }
      shader2.fragmentShader = shader2.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", specularMapParsFragmentChunk).replace("#include <metalnessmap_pars_fragment>", glossinessMapParsFragmentChunk).replace("#include <roughnessmap_fragment>", specularMapFragmentChunk).replace("#include <metalnessmap_fragment>", glossinessMapFragmentChunk).replace("#include <lights_physical_fragment>", lightPhysicalFragmentChunk);
    };
    Object.defineProperties(this, {
      specular: {
        get: function() {
          return uniforms.specular.value;
        },
        set: function(v) {
          uniforms.specular.value = v;
        }
      },
      specularMap: {
        get: function() {
          return uniforms.specularMap.value;
        },
        set: function(v) {
          uniforms.specularMap.value = v;
          if (v) {
            this.defines.USE_SPECULARMAP = "";
          } else {
            delete this.defines.USE_SPECULARMAP;
          }
        }
      },
      glossiness: {
        get: function() {
          return uniforms.glossiness.value;
        },
        set: function(v) {
          uniforms.glossiness.value = v;
        }
      },
      glossinessMap: {
        get: function() {
          return uniforms.glossinessMap.value;
        },
        set: function(v) {
          uniforms.glossinessMap.value = v;
          if (v) {
            this.defines.USE_GLOSSINESSMAP = "";
            this.defines.USE_UV = "";
          } else {
            delete this.defines.USE_GLOSSINESSMAP;
            delete this.defines.USE_UV;
          }
        }
      }
    });
    delete this.metalness;
    delete this.roughness;
    delete this.metalnessMap;
    delete this.roughnessMap;
    this.setValues(params);
  }
  copy(source) {
    super.copy(source);
    this.specularMap = source.specularMap;
    this.specular.copy(source.specular);
    this.glossinessMap = source.glossinessMap;
    this.glossiness = source.glossiness;
    delete this.metalness;
    delete this.roughness;
    delete this.metalnessMap;
    delete this.roughnessMap;
    return this;
  }
}
class GLTFMaterialsPbrSpecularGlossinessExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS;
    this.specularGlossinessParams = [
      "color",
      "map",
      "lightMap",
      "lightMapIntensity",
      "aoMap",
      "aoMapIntensity",
      "emissive",
      "emissiveIntensity",
      "emissiveMap",
      "bumpMap",
      "bumpScale",
      "normalMap",
      "normalMapType",
      "displacementMap",
      "displacementScale",
      "displacementBias",
      "specularMap",
      "specular",
      "glossinessMap",
      "glossiness",
      "alphaMap",
      "envMap",
      "envMapIntensity"
    ];
  }
  getMaterialType() {
    return GLTFMeshStandardSGMaterial;
  }
  extendParams(materialParams, materialDef, parser) {
    const pbrSpecularGlossiness = materialDef.extensions[this.name];
    materialParams.color = new Color(1, 1, 1);
    materialParams.opacity = 1;
    const pending = [];
    if (Array.isArray(pbrSpecularGlossiness.diffuseFactor)) {
      const array = pbrSpecularGlossiness.diffuseFactor;
      materialParams.color.fromArray(array);
      materialParams.opacity = array[3];
    }
    if (pbrSpecularGlossiness.diffuseTexture !== void 0) {
      pending.push(parser.assignTexture(materialParams, "map", pbrSpecularGlossiness.diffuseTexture, sRGBEncoding));
    }
    materialParams.emissive = new Color(0, 0, 0);
    materialParams.glossiness = pbrSpecularGlossiness.glossinessFactor !== void 0 ? pbrSpecularGlossiness.glossinessFactor : 1;
    materialParams.specular = new Color(1, 1, 1);
    if (Array.isArray(pbrSpecularGlossiness.specularFactor)) {
      materialParams.specular.fromArray(pbrSpecularGlossiness.specularFactor);
    }
    if (pbrSpecularGlossiness.specularGlossinessTexture !== void 0) {
      const specGlossMapDef = pbrSpecularGlossiness.specularGlossinessTexture;
      pending.push(parser.assignTexture(materialParams, "glossinessMap", specGlossMapDef));
      pending.push(parser.assignTexture(materialParams, "specularMap", specGlossMapDef, sRGBEncoding));
    }
    return Promise.all(pending);
  }
  createMaterial(materialParams) {
    const material = new GLTFMeshStandardSGMaterial(materialParams);
    material.fog = true;
    material.color = materialParams.color;
    material.map = materialParams.map === void 0 ? null : materialParams.map;
    material.lightMap = null;
    material.lightMapIntensity = 1;
    material.aoMap = materialParams.aoMap === void 0 ? null : materialParams.aoMap;
    material.aoMapIntensity = 1;
    material.emissive = materialParams.emissive;
    material.emissiveIntensity = materialParams.emissiveIntensity === void 0 ? 1 : materialParams.emissiveIntensity;
    material.emissiveMap = materialParams.emissiveMap === void 0 ? null : materialParams.emissiveMap;
    material.bumpMap = materialParams.bumpMap === void 0 ? null : materialParams.bumpMap;
    material.bumpScale = 1;
    material.normalMap = materialParams.normalMap === void 0 ? null : materialParams.normalMap;
    material.normalMapType = TangentSpaceNormalMap;
    if (materialParams.normalScale)
      material.normalScale = materialParams.normalScale;
    material.displacementMap = null;
    material.displacementScale = 1;
    material.displacementBias = 0;
    material.specularMap = materialParams.specularMap === void 0 ? null : materialParams.specularMap;
    material.specular = materialParams.specular;
    material.glossinessMap = materialParams.glossinessMap === void 0 ? null : materialParams.glossinessMap;
    material.glossiness = materialParams.glossiness;
    material.alphaMap = null;
    material.envMap = materialParams.envMap === void 0 ? null : materialParams.envMap;
    material.envMapIntensity = 1;
    return material;
  }
}
class GLTFMeshQuantizationExtension {
  constructor() {
    this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
  }
}
class GLTFCubicSplineInterpolant extends Interpolant {
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  copySampleValue_(index) {
    const result = this.resultBuffer, values = this.sampleValues, valueSize = this.valueSize, offset = index * valueSize * 3 + valueSize;
    for (let i = 0; i !== valueSize; i++) {
      result[i] = values[offset + i];
    }
    return result;
  }
}
GLTFCubicSplineInterpolant.prototype.interpolate_ = function(i1, t0, t, t1) {
  const result = this.resultBuffer;
  const values = this.sampleValues;
  const stride = this.valueSize;
  const stride2 = stride * 2;
  const stride3 = stride * 3;
  const td = t1 - t0;
  const p = (t - t0) / td;
  const pp = p * p;
  const ppp = pp * p;
  const offset1 = i1 * stride3;
  const offset0 = offset1 - stride3;
  const s2 = -2 * ppp + 3 * pp;
  const s3 = ppp - pp;
  const s0 = 1 - s2;
  const s1 = s3 - pp + p;
  for (let i = 0; i !== stride; i++) {
    const p0 = values[offset0 + i + stride];
    const m0 = values[offset0 + i + stride2] * td;
    const p1 = values[offset1 + i + stride];
    const m1 = values[offset1 + i] * td;
    result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
  }
  return result;
};
const _q = new Quaternion();
class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {
  interpolate_(i1, t0, t, t1) {
    const result = super.interpolate_(i1, t0, t, t1);
    _q.fromArray(result).normalize().toArray(result);
    return result;
  }
}
const WEBGL_CONSTANTS = {
  FLOAT: 5126,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
};
const WEBGL_COMPONENT_TYPES = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
const WEBGL_FILTERS = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
const WEBGL_WRAPPINGS = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
const WEBGL_TYPE_SIZES = {
  "SCALAR": 1,
  "VEC2": 2,
  "VEC3": 3,
  "VEC4": 4,
  "MAT2": 4,
  "MAT3": 9,
  "MAT4": 16
};
const ATTRIBUTES = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
};
const PATH_PROPERTIES = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
};
const INTERPOLATION = {
  CUBICSPLINE: void 0,
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
const ALPHA_MODES = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function createDefaultMaterial(cache) {
  if (cache["DefaultMaterial"] === void 0) {
    cache["DefaultMaterial"] = new MeshStandardMaterial({
      color: 16777215,
      emissive: 0,
      metalness: 1,
      roughness: 1,
      transparent: false,
      depthTest: true,
      side: FrontSide
    });
  }
  return cache["DefaultMaterial"];
}
function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {
  for (const name in objectDef.extensions) {
    if (knownExtensions[name] === void 0) {
      object.userData.gltfExtensions = object.userData.gltfExtensions || {};
      object.userData.gltfExtensions[name] = objectDef.extensions[name];
    }
  }
}
function assignExtrasToUserData(object, gltfDef) {
  if (gltfDef.extras !== void 0) {
    if (typeof gltfDef.extras === "object") {
      Object.assign(object.userData, gltfDef.extras);
    } else {
      console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + gltfDef.extras);
    }
  }
}
function addMorphTargets(geometry, targets, parser) {
  let hasMorphPosition = false;
  let hasMorphNormal = false;
  let hasMorphColor = false;
  for (let i = 0, il = targets.length; i < il; i++) {
    const target = targets[i];
    if (target.POSITION !== void 0)
      hasMorphPosition = true;
    if (target.NORMAL !== void 0)
      hasMorphNormal = true;
    if (target.COLOR_0 !== void 0)
      hasMorphColor = true;
    if (hasMorphPosition && hasMorphNormal && hasMorphColor)
      break;
  }
  if (!hasMorphPosition && !hasMorphNormal && !hasMorphColor)
    return Promise.resolve(geometry);
  const pendingPositionAccessors = [];
  const pendingNormalAccessors = [];
  const pendingColorAccessors = [];
  for (let i = 0, il = targets.length; i < il; i++) {
    const target = targets[i];
    if (hasMorphPosition) {
      const pendingAccessor = target.POSITION !== void 0 ? parser.getDependency("accessor", target.POSITION) : geometry.attributes.position;
      pendingPositionAccessors.push(pendingAccessor);
    }
    if (hasMorphNormal) {
      const pendingAccessor = target.NORMAL !== void 0 ? parser.getDependency("accessor", target.NORMAL) : geometry.attributes.normal;
      pendingNormalAccessors.push(pendingAccessor);
    }
    if (hasMorphColor) {
      const pendingAccessor = target.COLOR_0 !== void 0 ? parser.getDependency("accessor", target.COLOR_0) : geometry.attributes.color;
      pendingColorAccessors.push(pendingAccessor);
    }
  }
  return Promise.all([
    Promise.all(pendingPositionAccessors),
    Promise.all(pendingNormalAccessors),
    Promise.all(pendingColorAccessors)
  ]).then(function(accessors) {
    const morphPositions = accessors[0];
    const morphNormals = accessors[1];
    const morphColors = accessors[2];
    if (hasMorphPosition)
      geometry.morphAttributes.position = morphPositions;
    if (hasMorphNormal)
      geometry.morphAttributes.normal = morphNormals;
    if (hasMorphColor)
      geometry.morphAttributes.color = morphColors;
    geometry.morphTargetsRelative = true;
    return geometry;
  });
}
function updateMorphTargets(mesh, meshDef) {
  mesh.updateMorphTargets();
  if (meshDef.weights !== void 0) {
    for (let i = 0, il = meshDef.weights.length; i < il; i++) {
      mesh.morphTargetInfluences[i] = meshDef.weights[i];
    }
  }
  if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
    const targetNames = meshDef.extras.targetNames;
    if (mesh.morphTargetInfluences.length === targetNames.length) {
      mesh.morphTargetDictionary = {};
      for (let i = 0, il = targetNames.length; i < il; i++) {
        mesh.morphTargetDictionary[targetNames[i]] = i;
      }
    } else {
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
    }
  }
}
function createPrimitiveKey(primitiveDef) {
  const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
  let geometryKey;
  if (dracoExtension) {
    geometryKey = "draco:" + dracoExtension.bufferView + ":" + dracoExtension.indices + ":" + createAttributesKey(dracoExtension.attributes);
  } else {
    geometryKey = primitiveDef.indices + ":" + createAttributesKey(primitiveDef.attributes) + ":" + primitiveDef.mode;
  }
  return geometryKey;
}
function createAttributesKey(attributes) {
  let attributesKey = "";
  const keys = Object.keys(attributes).sort();
  for (let i = 0, il = keys.length; i < il; i++) {
    attributesKey += keys[i] + ":" + attributes[keys[i]] + ";";
  }
  return attributesKey;
}
function getNormalizedComponentScale(constructor) {
  switch (constructor) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function getImageURIMimeType(uri) {
  if (uri.search(/\.jpe?g($|\?)/i) > 0 || uri.search(/^data\:image\/jpeg/) === 0)
    return "image/jpeg";
  if (uri.search(/\.webp($|\?)/i) > 0 || uri.search(/^data\:image\/webp/) === 0)
    return "image/webp";
  return "image/png";
}
class GLTFParser {
  constructor(json = {}, options = {}) {
    this.json = json;
    this.extensions = {};
    this.plugins = {};
    this.options = options;
    this.cache = new GLTFRegistry();
    this.associations = new Map();
    this.primitiveCache = {};
    this.meshCache = { refs: {}, uses: {} };
    this.cameraCache = { refs: {}, uses: {} };
    this.lightCache = { refs: {}, uses: {} };
    this.sourceCache = {};
    this.textureCache = {};
    this.nodeNamesUsed = {};
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true;
    const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
    const firefoxVersion = isFirefox ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
    if (typeof createImageBitmap === "undefined" || isSafari || isFirefox && firefoxVersion < 98) {
      this.textureLoader = new TextureLoader(this.options.manager);
    } else {
      this.textureLoader = new ImageBitmapLoader(this.options.manager);
    }
    this.textureLoader.setCrossOrigin(this.options.crossOrigin);
    this.textureLoader.setRequestHeader(this.options.requestHeader);
    this.fileLoader = new FileLoader(this.options.manager);
    this.fileLoader.setResponseType("arraybuffer");
    if (this.options.crossOrigin === "use-credentials") {
      this.fileLoader.setWithCredentials(true);
    }
  }
  setExtensions(extensions) {
    this.extensions = extensions;
  }
  setPlugins(plugins) {
    this.plugins = plugins;
  }
  parse(onLoad, onError) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    this.cache.removeAll();
    this._invokeAll(function(ext) {
      return ext._markDefs && ext._markDefs();
    });
    Promise.all(this._invokeAll(function(ext) {
      return ext.beforeRoot && ext.beforeRoot();
    })).then(function() {
      return Promise.all([
        parser.getDependencies("scene"),
        parser.getDependencies("animation"),
        parser.getDependencies("camera")
      ]);
    }).then(function(dependencies) {
      const result = {
        scene: dependencies[0][json.scene || 0],
        scenes: dependencies[0],
        animations: dependencies[1],
        cameras: dependencies[2],
        asset: json.asset,
        parser,
        userData: {}
      };
      addUnknownExtensionsToUserData(extensions, result, json);
      assignExtrasToUserData(result, json);
      Promise.all(parser._invokeAll(function(ext) {
        return ext.afterRoot && ext.afterRoot(result);
      })).then(function() {
        onLoad(result);
      });
    }).catch(onError);
  }
  _markDefs() {
    const nodeDefs = this.json.nodes || [];
    const skinDefs = this.json.skins || [];
    const meshDefs = this.json.meshes || [];
    for (let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++) {
      const joints = skinDefs[skinIndex].joints;
      for (let i = 0, il = joints.length; i < il; i++) {
        nodeDefs[joints[i]].isBone = true;
      }
    }
    for (let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      const nodeDef = nodeDefs[nodeIndex];
      if (nodeDef.mesh !== void 0) {
        this._addNodeRef(this.meshCache, nodeDef.mesh);
        if (nodeDef.skin !== void 0) {
          meshDefs[nodeDef.mesh].isSkinnedMesh = true;
        }
      }
      if (nodeDef.camera !== void 0) {
        this._addNodeRef(this.cameraCache, nodeDef.camera);
      }
    }
  }
  _addNodeRef(cache, index) {
    if (index === void 0)
      return;
    if (cache.refs[index] === void 0) {
      cache.refs[index] = cache.uses[index] = 0;
    }
    cache.refs[index]++;
  }
  _getNodeRef(cache, index, object) {
    if (cache.refs[index] <= 1)
      return object;
    const ref = object.clone();
    const updateMappings = (original, clone2) => {
      const mappings = this.associations.get(original);
      if (mappings != null) {
        this.associations.set(clone2, mappings);
      }
      for (const [i, child] of original.children.entries()) {
        updateMappings(child, clone2.children[i]);
      }
    };
    updateMappings(object, ref);
    ref.name += "_instance_" + cache.uses[index]++;
    return ref;
  }
  _invokeOne(func) {
    const extensions = Object.values(this.plugins);
    extensions.push(this);
    for (let i = 0; i < extensions.length; i++) {
      const result = func(extensions[i]);
      if (result)
        return result;
    }
    return null;
  }
  _invokeAll(func) {
    const extensions = Object.values(this.plugins);
    extensions.unshift(this);
    const pending = [];
    for (let i = 0; i < extensions.length; i++) {
      const result = func(extensions[i]);
      if (result)
        pending.push(result);
    }
    return pending;
  }
  getDependency(type, index) {
    const cacheKey = type + ":" + index;
    let dependency = this.cache.get(cacheKey);
    if (!dependency) {
      switch (type) {
        case "scene":
          dependency = this.loadScene(index);
          break;
        case "node":
          dependency = this.loadNode(index);
          break;
        case "mesh":
          dependency = this._invokeOne(function(ext) {
            return ext.loadMesh && ext.loadMesh(index);
          });
          break;
        case "accessor":
          dependency = this.loadAccessor(index);
          break;
        case "bufferView":
          dependency = this._invokeOne(function(ext) {
            return ext.loadBufferView && ext.loadBufferView(index);
          });
          break;
        case "buffer":
          dependency = this.loadBuffer(index);
          break;
        case "material":
          dependency = this._invokeOne(function(ext) {
            return ext.loadMaterial && ext.loadMaterial(index);
          });
          break;
        case "texture":
          dependency = this._invokeOne(function(ext) {
            return ext.loadTexture && ext.loadTexture(index);
          });
          break;
        case "skin":
          dependency = this.loadSkin(index);
          break;
        case "animation":
          dependency = this._invokeOne(function(ext) {
            return ext.loadAnimation && ext.loadAnimation(index);
          });
          break;
        case "camera":
          dependency = this.loadCamera(index);
          break;
        default:
          throw new Error("Unknown type: " + type);
      }
      this.cache.add(cacheKey, dependency);
    }
    return dependency;
  }
  getDependencies(type) {
    let dependencies = this.cache.get(type);
    if (!dependencies) {
      const parser = this;
      const defs = this.json[type + (type === "mesh" ? "es" : "s")] || [];
      dependencies = Promise.all(defs.map(function(def, index) {
        return parser.getDependency(type, index);
      }));
      this.cache.add(type, dependencies);
    }
    return dependencies;
  }
  loadBuffer(bufferIndex) {
    const bufferDef = this.json.buffers[bufferIndex];
    const loader = this.fileLoader;
    if (bufferDef.type && bufferDef.type !== "arraybuffer") {
      throw new Error("THREE.GLTFLoader: " + bufferDef.type + " buffer type is not supported.");
    }
    if (bufferDef.uri === void 0 && bufferIndex === 0) {
      return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
    }
    const options = this.options;
    return new Promise(function(resolve, reject) {
      loader.load(LoaderUtils.resolveURL(bufferDef.uri, options.path), resolve, void 0, function() {
        reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));
      });
    });
  }
  loadBufferView(bufferViewIndex) {
    const bufferViewDef = this.json.bufferViews[bufferViewIndex];
    return this.getDependency("buffer", bufferViewDef.buffer).then(function(buffer) {
      const byteLength = bufferViewDef.byteLength || 0;
      const byteOffset = bufferViewDef.byteOffset || 0;
      return buffer.slice(byteOffset, byteOffset + byteLength);
    });
  }
  loadAccessor(accessorIndex) {
    const parser = this;
    const json = this.json;
    const accessorDef = this.json.accessors[accessorIndex];
    if (accessorDef.bufferView === void 0 && accessorDef.sparse === void 0) {
      return Promise.resolve(null);
    }
    const pendingBufferViews = [];
    if (accessorDef.bufferView !== void 0) {
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.bufferView));
    } else {
      pendingBufferViews.push(null);
    }
    if (accessorDef.sparse !== void 0) {
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.indices.bufferView));
      pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.values.bufferView));
    }
    return Promise.all(pendingBufferViews).then(function(bufferViews) {
      const bufferView = bufferViews[0];
      const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
      const elementBytes = TypedArray.BYTES_PER_ELEMENT;
      const itemBytes = elementBytes * itemSize;
      const byteOffset = accessorDef.byteOffset || 0;
      const byteStride = accessorDef.bufferView !== void 0 ? json.bufferViews[accessorDef.bufferView].byteStride : void 0;
      const normalized = accessorDef.normalized === true;
      let array, bufferAttribute;
      if (byteStride && byteStride !== itemBytes) {
        const ibSlice = Math.floor(byteOffset / byteStride);
        const ibCacheKey = "InterleavedBuffer:" + accessorDef.bufferView + ":" + accessorDef.componentType + ":" + ibSlice + ":" + accessorDef.count;
        let ib = parser.cache.get(ibCacheKey);
        if (!ib) {
          array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes);
          ib = new InterleavedBuffer(array, byteStride / elementBytes);
          parser.cache.add(ibCacheKey, ib);
        }
        bufferAttribute = new InterleavedBufferAttribute(ib, itemSize, byteOffset % byteStride / elementBytes, normalized);
      } else {
        if (bufferView === null) {
          array = new TypedArray(accessorDef.count * itemSize);
        } else {
          array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);
        }
        bufferAttribute = new BufferAttribute(array, itemSize, normalized);
      }
      if (accessorDef.sparse !== void 0) {
        const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
        const TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];
        const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
        const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;
        const sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
        const sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);
        if (bufferView !== null) {
          bufferAttribute = new BufferAttribute(bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);
        }
        for (let i = 0, il = sparseIndices.length; i < il; i++) {
          const index = sparseIndices[i];
          bufferAttribute.setX(index, sparseValues[i * itemSize]);
          if (itemSize >= 2)
            bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
          if (itemSize >= 3)
            bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
          if (itemSize >= 4)
            bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
          if (itemSize >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return bufferAttribute;
    });
  }
  loadTexture(textureIndex) {
    const json = this.json;
    const options = this.options;
    const textureDef = json.textures[textureIndex];
    const sourceIndex = textureDef.source;
    const sourceDef = json.images[sourceIndex];
    let loader = this.textureLoader;
    if (sourceDef.uri) {
      const handler = options.manager.getHandler(sourceDef.uri);
      if (handler !== null)
        loader = handler;
    }
    return this.loadTextureImage(textureIndex, sourceIndex, loader);
  }
  loadTextureImage(textureIndex, sourceIndex, loader) {
    const parser = this;
    const json = this.json;
    const textureDef = json.textures[textureIndex];
    const sourceDef = json.images[sourceIndex];
    const cacheKey = (sourceDef.uri || sourceDef.bufferView) + ":" + textureDef.sampler;
    if (this.textureCache[cacheKey]) {
      return this.textureCache[cacheKey];
    }
    const promise = this.loadImageSource(sourceIndex, loader).then(function(texture) {
      texture.flipY = false;
      if (textureDef.name)
        texture.name = textureDef.name;
      const samplers = json.samplers || {};
      const sampler = samplers[textureDef.sampler] || {};
      texture.magFilter = WEBGL_FILTERS[sampler.magFilter] || LinearFilter;
      texture.minFilter = WEBGL_FILTERS[sampler.minFilter] || LinearMipmapLinearFilter;
      texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || RepeatWrapping;
      texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || RepeatWrapping;
      parser.associations.set(texture, { textures: textureIndex });
      return texture;
    }).catch(function() {
      return null;
    });
    this.textureCache[cacheKey] = promise;
    return promise;
  }
  loadImageSource(sourceIndex, loader) {
    const parser = this;
    const json = this.json;
    const options = this.options;
    if (this.sourceCache[sourceIndex] !== void 0) {
      return this.sourceCache[sourceIndex].then((texture) => texture.clone());
    }
    const sourceDef = json.images[sourceIndex];
    const URL2 = self.URL || self.webkitURL;
    let sourceURI = sourceDef.uri || "";
    let isObjectURL = false;
    if (sourceDef.bufferView !== void 0) {
      sourceURI = parser.getDependency("bufferView", sourceDef.bufferView).then(function(bufferView) {
        isObjectURL = true;
        const blob = new Blob([bufferView], { type: sourceDef.mimeType });
        sourceURI = URL2.createObjectURL(blob);
        return sourceURI;
      });
    } else if (sourceDef.uri === void 0) {
      throw new Error("THREE.GLTFLoader: Image " + sourceIndex + " is missing URI and bufferView");
    }
    const promise = Promise.resolve(sourceURI).then(function(sourceURI2) {
      return new Promise(function(resolve, reject) {
        let onLoad = resolve;
        if (loader.isImageBitmapLoader === true) {
          onLoad = function(imageBitmap) {
            const texture = new Texture(imageBitmap);
            texture.needsUpdate = true;
            resolve(texture);
          };
        }
        loader.load(LoaderUtils.resolveURL(sourceURI2, options.path), onLoad, void 0, reject);
      });
    }).then(function(texture) {
      if (isObjectURL === true) {
        URL2.revokeObjectURL(sourceURI);
      }
      texture.userData.mimeType = sourceDef.mimeType || getImageURIMimeType(sourceDef.uri);
      return texture;
    }).catch(function(error) {
      console.error("THREE.GLTFLoader: Couldn't load texture", sourceURI);
      throw error;
    });
    this.sourceCache[sourceIndex] = promise;
    return promise;
  }
  assignTexture(materialParams, mapName, mapDef, encoding) {
    const parser = this;
    return this.getDependency("texture", mapDef.index).then(function(texture) {
      if (mapDef.texCoord !== void 0 && mapDef.texCoord != 0 && !(mapName === "aoMap" && mapDef.texCoord == 1)) {
        console.warn("THREE.GLTFLoader: Custom UV set " + mapDef.texCoord + " for texture " + mapName + " not yet supported.");
      }
      if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
        const transform = mapDef.extensions !== void 0 ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : void 0;
        if (transform) {
          const gltfReference = parser.associations.get(texture);
          texture = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture, transform);
          parser.associations.set(texture, gltfReference);
        }
      }
      if (encoding !== void 0) {
        texture.encoding = encoding;
      }
      materialParams[mapName] = texture;
      return texture;
    });
  }
  assignFinalMaterial(mesh) {
    const geometry = mesh.geometry;
    let material = mesh.material;
    const useDerivativeTangents = geometry.attributes.tangent === void 0;
    const useVertexColors = geometry.attributes.color !== void 0;
    const useFlatShading = geometry.attributes.normal === void 0;
    if (mesh.isPoints) {
      const cacheKey = "PointsMaterial:" + material.uuid;
      let pointsMaterial = this.cache.get(cacheKey);
      if (!pointsMaterial) {
        pointsMaterial = new PointsMaterial();
        Material.prototype.copy.call(pointsMaterial, material);
        pointsMaterial.color.copy(material.color);
        pointsMaterial.map = material.map;
        pointsMaterial.sizeAttenuation = false;
        this.cache.add(cacheKey, pointsMaterial);
      }
      material = pointsMaterial;
    } else if (mesh.isLine) {
      const cacheKey = "LineBasicMaterial:" + material.uuid;
      let lineMaterial = this.cache.get(cacheKey);
      if (!lineMaterial) {
        lineMaterial = new LineBasicMaterial();
        Material.prototype.copy.call(lineMaterial, material);
        lineMaterial.color.copy(material.color);
        this.cache.add(cacheKey, lineMaterial);
      }
      material = lineMaterial;
    }
    if (useDerivativeTangents || useVertexColors || useFlatShading) {
      let cacheKey = "ClonedMaterial:" + material.uuid + ":";
      if (material.isGLTFSpecularGlossinessMaterial)
        cacheKey += "specular-glossiness:";
      if (useDerivativeTangents)
        cacheKey += "derivative-tangents:";
      if (useVertexColors)
        cacheKey += "vertex-colors:";
      if (useFlatShading)
        cacheKey += "flat-shading:";
      let cachedMaterial = this.cache.get(cacheKey);
      if (!cachedMaterial) {
        cachedMaterial = material.clone();
        if (useVertexColors)
          cachedMaterial.vertexColors = true;
        if (useFlatShading)
          cachedMaterial.flatShading = true;
        if (useDerivativeTangents) {
          if (cachedMaterial.normalScale)
            cachedMaterial.normalScale.y *= -1;
          if (cachedMaterial.clearcoatNormalScale)
            cachedMaterial.clearcoatNormalScale.y *= -1;
        }
        this.cache.add(cacheKey, cachedMaterial);
        this.associations.set(cachedMaterial, this.associations.get(material));
      }
      material = cachedMaterial;
    }
    if (material.aoMap && geometry.attributes.uv2 === void 0 && geometry.attributes.uv !== void 0) {
      geometry.setAttribute("uv2", geometry.attributes.uv);
    }
    mesh.material = material;
  }
  getMaterialType() {
    return MeshStandardMaterial;
  }
  loadMaterial(materialIndex) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    const materialDef = json.materials[materialIndex];
    let materialType;
    const materialParams = {};
    const materialExtensions = materialDef.extensions || {};
    const pending = [];
    if (materialExtensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const sgExtension = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      materialType = sgExtension.getMaterialType();
      pending.push(sgExtension.extendParams(materialParams, materialDef, parser));
    } else if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
      const kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
      materialType = kmuExtension.getMaterialType();
      pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));
    } else {
      const metallicRoughness = materialDef.pbrMetallicRoughness || {};
      materialParams.color = new Color(1, 1, 1);
      materialParams.opacity = 1;
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        const array = metallicRoughness.baseColorFactor;
        materialParams.color.fromArray(array);
        materialParams.opacity = array[3];
      }
      if (metallicRoughness.baseColorTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, sRGBEncoding));
      }
      materialParams.metalness = metallicRoughness.metallicFactor !== void 0 ? metallicRoughness.metallicFactor : 1;
      materialParams.roughness = metallicRoughness.roughnessFactor !== void 0 ? metallicRoughness.roughnessFactor : 1;
      if (metallicRoughness.metallicRoughnessTexture !== void 0) {
        pending.push(parser.assignTexture(materialParams, "metalnessMap", metallicRoughness.metallicRoughnessTexture));
        pending.push(parser.assignTexture(materialParams, "roughnessMap", metallicRoughness.metallicRoughnessTexture));
      }
      materialType = this._invokeOne(function(ext) {
        return ext.getMaterialType && ext.getMaterialType(materialIndex);
      });
      pending.push(Promise.all(this._invokeAll(function(ext) {
        return ext.extendMaterialParams && ext.extendMaterialParams(materialIndex, materialParams);
      })));
    }
    if (materialDef.doubleSided === true) {
      materialParams.side = DoubleSide;
    }
    const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;
    if (alphaMode === ALPHA_MODES.BLEND) {
      materialParams.transparent = true;
      materialParams.depthWrite = false;
    } else {
      materialParams.transparent = false;
      if (alphaMode === ALPHA_MODES.MASK) {
        materialParams.alphaTest = materialDef.alphaCutoff !== void 0 ? materialDef.alphaCutoff : 0.5;
      }
    }
    if (materialDef.normalTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "normalMap", materialDef.normalTexture));
      materialParams.normalScale = new Vector2(1, 1);
      if (materialDef.normalTexture.scale !== void 0) {
        const scale = materialDef.normalTexture.scale;
        materialParams.normalScale.set(scale, scale);
      }
    }
    if (materialDef.occlusionTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "aoMap", materialDef.occlusionTexture));
      if (materialDef.occlusionTexture.strength !== void 0) {
        materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
      }
    }
    if (materialDef.emissiveFactor !== void 0 && materialType !== MeshBasicMaterial) {
      materialParams.emissive = new Color().fromArray(materialDef.emissiveFactor);
    }
    if (materialDef.emissiveTexture !== void 0 && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, "emissiveMap", materialDef.emissiveTexture, sRGBEncoding));
    }
    return Promise.all(pending).then(function() {
      let material;
      if (materialType === GLTFMeshStandardSGMaterial) {
        material = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(materialParams);
      } else {
        material = new materialType(materialParams);
      }
      if (materialDef.name)
        material.name = materialDef.name;
      assignExtrasToUserData(material, materialDef);
      parser.associations.set(material, { materials: materialIndex });
      if (materialDef.extensions)
        addUnknownExtensionsToUserData(extensions, material, materialDef);
      return material;
    });
  }
  createUniqueName(originalName) {
    const sanitizedName = PropertyBinding.sanitizeNodeName(originalName || "");
    let name = sanitizedName;
    for (let i = 1; this.nodeNamesUsed[name]; ++i) {
      name = sanitizedName + "_" + i;
    }
    this.nodeNamesUsed[name] = true;
    return name;
  }
  loadGeometries(primitives) {
    const parser = this;
    const extensions = this.extensions;
    const cache = this.primitiveCache;
    function createDracoPrimitive(primitive) {
      return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(primitive, parser).then(function(geometry) {
        return addPrimitiveAttributes(geometry, primitive, parser);
      });
    }
    const pending = [];
    for (let i = 0, il = primitives.length; i < il; i++) {
      const primitive = primitives[i];
      const cacheKey = createPrimitiveKey(primitive);
      const cached = cache[cacheKey];
      if (cached) {
        pending.push(cached.promise);
      } else {
        let geometryPromise;
        if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {
          geometryPromise = createDracoPrimitive(primitive);
        } else {
          geometryPromise = addPrimitiveAttributes(new BufferGeometry(), primitive, parser);
        }
        cache[cacheKey] = { primitive, promise: geometryPromise };
        pending.push(geometryPromise);
      }
    }
    return Promise.all(pending);
  }
  loadMesh(meshIndex) {
    const parser = this;
    const json = this.json;
    const extensions = this.extensions;
    const meshDef = json.meshes[meshIndex];
    const primitives = meshDef.primitives;
    const pending = [];
    for (let i = 0, il = primitives.length; i < il; i++) {
      const material = primitives[i].material === void 0 ? createDefaultMaterial(this.cache) : this.getDependency("material", primitives[i].material);
      pending.push(material);
    }
    pending.push(parser.loadGeometries(primitives));
    return Promise.all(pending).then(function(results) {
      const materials = results.slice(0, results.length - 1);
      const geometries = results[results.length - 1];
      const meshes = [];
      for (let i = 0, il = geometries.length; i < il; i++) {
        const geometry = geometries[i];
        const primitive = primitives[i];
        let mesh;
        const material = materials[i];
        if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || primitive.mode === void 0) {
          mesh = meshDef.isSkinnedMesh === true ? new SkinnedMesh(geometry, material) : new Mesh(geometry, material);
          if (mesh.isSkinnedMesh === true && !mesh.geometry.attributes.skinWeight.normalized) {
            mesh.normalizeSkinWeights();
          }
          if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleStripDrawMode);
          } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleFanDrawMode);
          }
        } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
          mesh = new LineSegments(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
          mesh = new Line(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
          mesh = new LineLoop(geometry, material);
        } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
          mesh = new Points(geometry, material);
        } else {
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + primitive.mode);
        }
        if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
          updateMorphTargets(mesh, meshDef);
        }
        mesh.name = parser.createUniqueName(meshDef.name || "mesh_" + meshIndex);
        assignExtrasToUserData(mesh, meshDef);
        if (primitive.extensions)
          addUnknownExtensionsToUserData(extensions, mesh, primitive);
        parser.assignFinalMaterial(mesh);
        meshes.push(mesh);
      }
      for (let i = 0, il = meshes.length; i < il; i++) {
        parser.associations.set(meshes[i], {
          meshes: meshIndex,
          primitives: i
        });
      }
      if (meshes.length === 1) {
        return meshes[0];
      }
      const group = new Group();
      parser.associations.set(group, { meshes: meshIndex });
      for (let i = 0, il = meshes.length; i < il; i++) {
        group.add(meshes[i]);
      }
      return group;
    });
  }
  loadCamera(cameraIndex) {
    let camera;
    const cameraDef = this.json.cameras[cameraIndex];
    const params = cameraDef[cameraDef.type];
    if (!params) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    if (cameraDef.type === "perspective") {
      camera = new PerspectiveCamera(MathUtils.radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);
    } else if (cameraDef.type === "orthographic") {
      camera = new OrthographicCamera(-params.xmag, params.xmag, params.ymag, -params.ymag, params.znear, params.zfar);
    }
    if (cameraDef.name)
      camera.name = this.createUniqueName(cameraDef.name);
    assignExtrasToUserData(camera, cameraDef);
    return Promise.resolve(camera);
  }
  loadSkin(skinIndex) {
    const skinDef = this.json.skins[skinIndex];
    const skinEntry = { joints: skinDef.joints };
    if (skinDef.inverseBindMatrices === void 0) {
      return Promise.resolve(skinEntry);
    }
    return this.getDependency("accessor", skinDef.inverseBindMatrices).then(function(accessor) {
      skinEntry.inverseBindMatrices = accessor;
      return skinEntry;
    });
  }
  loadAnimation(animationIndex) {
    const json = this.json;
    const animationDef = json.animations[animationIndex];
    const pendingNodes = [];
    const pendingInputAccessors = [];
    const pendingOutputAccessors = [];
    const pendingSamplers = [];
    const pendingTargets = [];
    for (let i = 0, il = animationDef.channels.length; i < il; i++) {
      const channel = animationDef.channels[i];
      const sampler = animationDef.samplers[channel.sampler];
      const target = channel.target;
      const name = target.node !== void 0 ? target.node : target.id;
      const input = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.input] : sampler.input;
      const output = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.output] : sampler.output;
      pendingNodes.push(this.getDependency("node", name));
      pendingInputAccessors.push(this.getDependency("accessor", input));
      pendingOutputAccessors.push(this.getDependency("accessor", output));
      pendingSamplers.push(sampler);
      pendingTargets.push(target);
    }
    return Promise.all([
      Promise.all(pendingNodes),
      Promise.all(pendingInputAccessors),
      Promise.all(pendingOutputAccessors),
      Promise.all(pendingSamplers),
      Promise.all(pendingTargets)
    ]).then(function(dependencies) {
      const nodes = dependencies[0];
      const inputAccessors = dependencies[1];
      const outputAccessors = dependencies[2];
      const samplers = dependencies[3];
      const targets = dependencies[4];
      const tracks = [];
      for (let i = 0, il = nodes.length; i < il; i++) {
        const node = nodes[i];
        const inputAccessor = inputAccessors[i];
        const outputAccessor = outputAccessors[i];
        const sampler = samplers[i];
        const target = targets[i];
        if (node === void 0)
          continue;
        node.updateMatrix();
        node.matrixAutoUpdate = true;
        let TypedKeyframeTrack;
        switch (PATH_PROPERTIES[target.path]) {
          case PATH_PROPERTIES.weights:
            TypedKeyframeTrack = NumberKeyframeTrack;
            break;
          case PATH_PROPERTIES.rotation:
            TypedKeyframeTrack = QuaternionKeyframeTrack;
            break;
          case PATH_PROPERTIES.position:
          case PATH_PROPERTIES.scale:
          default:
            TypedKeyframeTrack = VectorKeyframeTrack;
            break;
        }
        const targetName = node.name ? node.name : node.uuid;
        const interpolation = sampler.interpolation !== void 0 ? INTERPOLATION[sampler.interpolation] : InterpolateLinear;
        const targetNames = [];
        if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
          node.traverse(function(object) {
            if (object.morphTargetInfluences) {
              targetNames.push(object.name ? object.name : object.uuid);
            }
          });
        } else {
          targetNames.push(targetName);
        }
        let outputArray = outputAccessor.array;
        if (outputAccessor.normalized) {
          const scale = getNormalizedComponentScale(outputArray.constructor);
          const scaled = new Float32Array(outputArray.length);
          for (let j = 0, jl = outputArray.length; j < jl; j++) {
            scaled[j] = outputArray[j] * scale;
          }
          outputArray = scaled;
        }
        for (let j = 0, jl = targetNames.length; j < jl; j++) {
          const track = new TypedKeyframeTrack(targetNames[j] + "." + PATH_PROPERTIES[target.path], inputAccessor.array, outputArray, interpolation);
          if (sampler.interpolation === "CUBICSPLINE") {
            track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
              const interpolantType = this instanceof QuaternionKeyframeTrack ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;
              return new interpolantType(this.times, this.values, this.getValueSize() / 3, result);
            };
            track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
          }
          tracks.push(track);
        }
      }
      const name = animationDef.name ? animationDef.name : "animation_" + animationIndex;
      return new AnimationClip(name, void 0, tracks);
    });
  }
  createNodeMesh(nodeIndex) {
    const json = this.json;
    const parser = this;
    const nodeDef = json.nodes[nodeIndex];
    if (nodeDef.mesh === void 0)
      return null;
    return parser.getDependency("mesh", nodeDef.mesh).then(function(mesh) {
      const node = parser._getNodeRef(parser.meshCache, nodeDef.mesh, mesh);
      if (nodeDef.weights !== void 0) {
        node.traverse(function(o) {
          if (!o.isMesh)
            return;
          for (let i = 0, il = nodeDef.weights.length; i < il; i++) {
            o.morphTargetInfluences[i] = nodeDef.weights[i];
          }
        });
      }
      return node;
    });
  }
  loadNode(nodeIndex) {
    const json = this.json;
    const extensions = this.extensions;
    const parser = this;
    const nodeDef = json.nodes[nodeIndex];
    const nodeName = nodeDef.name ? parser.createUniqueName(nodeDef.name) : "";
    return function() {
      const pending = [];
      const meshPromise = parser._invokeOne(function(ext) {
        return ext.createNodeMesh && ext.createNodeMesh(nodeIndex);
      });
      if (meshPromise) {
        pending.push(meshPromise);
      }
      if (nodeDef.camera !== void 0) {
        pending.push(parser.getDependency("camera", nodeDef.camera).then(function(camera) {
          return parser._getNodeRef(parser.cameraCache, nodeDef.camera, camera);
        }));
      }
      parser._invokeAll(function(ext) {
        return ext.createNodeAttachment && ext.createNodeAttachment(nodeIndex);
      }).forEach(function(promise) {
        pending.push(promise);
      });
      return Promise.all(pending);
    }().then(function(objects) {
      let node;
      if (nodeDef.isBone === true) {
        node = new Bone();
      } else if (objects.length > 1) {
        node = new Group();
      } else if (objects.length === 1) {
        node = objects[0];
      } else {
        node = new Object3D();
      }
      if (node !== objects[0]) {
        for (let i = 0, il = objects.length; i < il; i++) {
          node.add(objects[i]);
        }
      }
      if (nodeDef.name) {
        node.userData.name = nodeDef.name;
        node.name = nodeName;
      }
      assignExtrasToUserData(node, nodeDef);
      if (nodeDef.extensions)
        addUnknownExtensionsToUserData(extensions, node, nodeDef);
      if (nodeDef.matrix !== void 0) {
        const matrix = new Matrix4();
        matrix.fromArray(nodeDef.matrix);
        node.applyMatrix4(matrix);
      } else {
        if (nodeDef.translation !== void 0) {
          node.position.fromArray(nodeDef.translation);
        }
        if (nodeDef.rotation !== void 0) {
          node.quaternion.fromArray(nodeDef.rotation);
        }
        if (nodeDef.scale !== void 0) {
          node.scale.fromArray(nodeDef.scale);
        }
      }
      if (!parser.associations.has(node)) {
        parser.associations.set(node, {});
      }
      parser.associations.get(node).nodes = nodeIndex;
      return node;
    });
  }
  loadScene(sceneIndex) {
    const json = this.json;
    const extensions = this.extensions;
    const sceneDef = this.json.scenes[sceneIndex];
    const parser = this;
    const scene = new Group();
    if (sceneDef.name)
      scene.name = parser.createUniqueName(sceneDef.name);
    assignExtrasToUserData(scene, sceneDef);
    if (sceneDef.extensions)
      addUnknownExtensionsToUserData(extensions, scene, sceneDef);
    const nodeIds = sceneDef.nodes || [];
    const pending = [];
    for (let i = 0, il = nodeIds.length; i < il; i++) {
      pending.push(buildNodeHierarchy(nodeIds[i], scene, json, parser));
    }
    return Promise.all(pending).then(function() {
      const reduceAssociations = (node) => {
        const reducedAssociations = new Map();
        for (const [key, value] of parser.associations) {
          if (key instanceof Material || key instanceof Texture) {
            reducedAssociations.set(key, value);
          }
        }
        node.traverse((node2) => {
          const mappings = parser.associations.get(node2);
          if (mappings != null) {
            reducedAssociations.set(node2, mappings);
          }
        });
        return reducedAssociations;
      };
      parser.associations = reduceAssociations(scene);
      return scene;
    });
  }
}
function buildNodeHierarchy(nodeId, parentObject, json, parser) {
  const nodeDef = json.nodes[nodeId];
  return parser.getDependency("node", nodeId).then(function(node) {
    if (nodeDef.skin === void 0)
      return node;
    let skinEntry;
    return parser.getDependency("skin", nodeDef.skin).then(function(skin) {
      skinEntry = skin;
      const pendingJoints = [];
      for (let i = 0, il = skinEntry.joints.length; i < il; i++) {
        pendingJoints.push(parser.getDependency("node", skinEntry.joints[i]));
      }
      return Promise.all(pendingJoints);
    }).then(function(jointNodes) {
      node.traverse(function(mesh) {
        if (!mesh.isMesh)
          return;
        const bones = [];
        const boneInverses = [];
        for (let j = 0, jl = jointNodes.length; j < jl; j++) {
          const jointNode = jointNodes[j];
          if (jointNode) {
            bones.push(jointNode);
            const mat = new Matrix4();
            if (skinEntry.inverseBindMatrices !== void 0) {
              mat.fromArray(skinEntry.inverseBindMatrices.array, j * 16);
            }
            boneInverses.push(mat);
          } else {
            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinEntry.joints[j]);
          }
        }
        mesh.bind(new Skeleton(bones, boneInverses), mesh.matrixWorld);
      });
      return node;
    });
  }).then(function(node) {
    parentObject.add(node);
    const pending = [];
    if (nodeDef.children) {
      const children = nodeDef.children;
      for (let i = 0, il = children.length; i < il; i++) {
        const child = children[i];
        pending.push(buildNodeHierarchy(child, node, json, parser));
      }
    }
    return Promise.all(pending);
  });
}
function computeBounds(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const box = new Box3();
  if (attributes.POSITION !== void 0) {
    const accessor = parser.json.accessors[attributes.POSITION];
    const min = accessor.min;
    const max = accessor.max;
    if (min !== void 0 && max !== void 0) {
      box.set(new Vector3(min[0], min[1], min[2]), new Vector3(max[0], max[1], max[2]));
      if (accessor.normalized) {
        const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
        box.min.multiplyScalar(boxScale);
        box.max.multiplyScalar(boxScale);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else {
    return;
  }
  const targets = primitiveDef.targets;
  if (targets !== void 0) {
    const maxDisplacement = new Vector3();
    const vector = new Vector3();
    for (let i = 0, il = targets.length; i < il; i++) {
      const target = targets[i];
      if (target.POSITION !== void 0) {
        const accessor = parser.json.accessors[target.POSITION];
        const min = accessor.min;
        const max = accessor.max;
        if (min !== void 0 && max !== void 0) {
          vector.setX(Math.max(Math.abs(min[0]), Math.abs(max[0])));
          vector.setY(Math.max(Math.abs(min[1]), Math.abs(max[1])));
          vector.setZ(Math.max(Math.abs(min[2]), Math.abs(max[2])));
          if (accessor.normalized) {
            const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
            vector.multiplyScalar(boxScale);
          }
          maxDisplacement.max(vector);
        } else {
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
        }
      }
    }
    box.expandByVector(maxDisplacement);
  }
  geometry.boundingBox = box;
  const sphere = new Sphere();
  box.getCenter(sphere.center);
  sphere.radius = box.min.distanceTo(box.max) / 2;
  geometry.boundingSphere = sphere;
}
function addPrimitiveAttributes(geometry, primitiveDef, parser) {
  const attributes = primitiveDef.attributes;
  const pending = [];
  function assignAttributeAccessor(accessorIndex, attributeName) {
    return parser.getDependency("accessor", accessorIndex).then(function(accessor) {
      geometry.setAttribute(attributeName, accessor);
    });
  }
  for (const gltfAttributeName in attributes) {
    const threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase();
    if (threeAttributeName in geometry.attributes)
      continue;
    pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));
  }
  if (primitiveDef.indices !== void 0 && !geometry.index) {
    const accessor = parser.getDependency("accessor", primitiveDef.indices).then(function(accessor2) {
      geometry.setIndex(accessor2);
    });
    pending.push(accessor);
  }
  assignExtrasToUserData(geometry, primitiveDef);
  computeBounds(geometry, primitiveDef, parser);
  return Promise.all(pending).then(function() {
    return primitiveDef.targets !== void 0 ? addMorphTargets(geometry, primitiveDef.targets, parser) : geometry;
  });
}
function toTrianglesDrawMode(geometry, drawMode) {
  let index = geometry.getIndex();
  if (index === null) {
    const indices = [];
    const position = geometry.getAttribute("position");
    if (position !== void 0) {
      for (let i = 0; i < position.count; i++) {
        indices.push(i);
      }
      geometry.setIndex(indices);
      index = geometry.getIndex();
    } else {
      console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
      return geometry;
    }
  }
  const numberOfTriangles = index.count - 2;
  const newIndices = [];
  if (drawMode === TriangleFanDrawMode) {
    for (let i = 1; i <= numberOfTriangles; i++) {
      newIndices.push(index.getX(0));
      newIndices.push(index.getX(i));
      newIndices.push(index.getX(i + 1));
    }
  } else {
    for (let i = 0; i < numberOfTriangles; i++) {
      if (i % 2 === 0) {
        newIndices.push(index.getX(i));
        newIndices.push(index.getX(i + 1));
        newIndices.push(index.getX(i + 2));
      } else {
        newIndices.push(index.getX(i + 2));
        newIndices.push(index.getX(i + 1));
        newIndices.push(index.getX(i));
      }
    }
  }
  if (newIndices.length / 3 !== numberOfTriangles) {
    console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
  }
  const newGeometry = geometry.clone();
  newGeometry.setIndex(newIndices);
  return newGeometry;
}
class WorkerPool {
  constructor(pool = 4) {
    this.pool = pool;
    this.queue = [];
    this.workers = [];
    this.workersResolve = [];
    this.workerStatus = 0;
  }
  _initWorker(workerId) {
    if (!this.workers[workerId]) {
      const worker = this.workerCreator();
      worker.addEventListener("message", this._onMessage.bind(this, workerId));
      this.workers[workerId] = worker;
    }
  }
  _getIdleWorker() {
    for (let i = 0; i < this.pool; i++)
      if (!(this.workerStatus & 1 << i))
        return i;
    return -1;
  }
  _onMessage(workerId, msg) {
    const resolve = this.workersResolve[workerId];
    resolve && resolve(msg);
    if (this.queue.length) {
      const { resolve: resolve2, msg: msg2, transfer } = this.queue.shift();
      this.workersResolve[workerId] = resolve2;
      this.workers[workerId].postMessage(msg2, transfer);
    } else {
      this.workerStatus ^= 1 << workerId;
    }
  }
  setWorkerCreator(workerCreator) {
    this.workerCreator = workerCreator;
  }
  setWorkerLimit(pool) {
    this.pool = pool;
  }
  postMessage(msg, transfer) {
    return new Promise((resolve) => {
      const workerId = this._getIdleWorker();
      if (workerId !== -1) {
        this._initWorker(workerId);
        this.workerStatus |= 1 << workerId;
        this.workersResolve[workerId] = resolve;
        this.workers[workerId].postMessage(msg, transfer);
      } else {
        this.queue.push({ resolve, msg, transfer });
      }
    });
  }
  dispose() {
    this.workers.forEach((worker) => worker.terminate());
    this.workersResolve.length = 0;
    this.workers.length = 0;
    this.queue.length = 0;
    this.workerStatus = 0;
  }
}
const KTX2TransferSRGB = 2;
const KTX2_ALPHA_PREMULTIPLIED = 1;
const _taskCache = new WeakMap();
let _activeLoaders = 0;
class KTX2Loader extends Loader {
  constructor(manager) {
    super(manager);
    this.transcoderPath = "";
    this.transcoderBinary = null;
    this.transcoderPending = null;
    this.workerPool = new WorkerPool();
    this.workerSourceURL = "";
    this.workerConfig = null;
    if (typeof MSC_TRANSCODER !== "undefined") {
      console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.');
    }
  }
  setTranscoderPath(path) {
    this.transcoderPath = path;
    return this;
  }
  setWorkerLimit(num) {
    this.workerPool.setWorkerLimit(num);
    return this;
  }
  detectSupport(renderer) {
    this.workerConfig = {
      astcSupported: renderer.extensions.has("WEBGL_compressed_texture_astc"),
      etc1Supported: renderer.extensions.has("WEBGL_compressed_texture_etc1"),
      etc2Supported: renderer.extensions.has("WEBGL_compressed_texture_etc"),
      dxtSupported: renderer.extensions.has("WEBGL_compressed_texture_s3tc"),
      bptcSupported: renderer.extensions.has("EXT_texture_compression_bptc"),
      pvrtcSupported: renderer.extensions.has("WEBGL_compressed_texture_pvrtc") || renderer.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
    };
    if (renderer.capabilities.isWebGL2) {
      this.workerConfig.etc1Supported = false;
    }
    return this;
  }
  init() {
    if (!this.transcoderPending) {
      const jsLoader = new FileLoader(this.manager);
      jsLoader.setPath(this.transcoderPath);
      jsLoader.setWithCredentials(this.withCredentials);
      const jsContent = jsLoader.loadAsync("basis_transcoder.js");
      const binaryLoader = new FileLoader(this.manager);
      binaryLoader.setPath(this.transcoderPath);
      binaryLoader.setResponseType("arraybuffer");
      binaryLoader.setWithCredentials(this.withCredentials);
      const binaryContent = binaryLoader.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([jsContent, binaryContent]).then(([jsContent2, binaryContent2]) => {
        const fn = KTX2Loader.BasisWorker.toString();
        const body = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(KTX2Loader.EngineFormat),
          "let _TranscoderFormat = " + JSON.stringify(KTX2Loader.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(KTX2Loader.BasisFormat),
          "/* basis_transcoder.js */",
          jsContent2,
          "/* worker */",
          fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
        ].join("\n");
        this.workerSourceURL = URL.createObjectURL(new Blob([body]));
        this.transcoderBinary = binaryContent2;
        this.workerPool.setWorkerCreator(() => {
          const worker = new Worker(this.workerSourceURL);
          const transcoderBinary = this.transcoderBinary.slice(0);
          worker.postMessage({ type: "init", config: this.workerConfig, transcoderBinary }, [transcoderBinary]);
          return worker;
        });
      });
      if (_activeLoaders > 0) {
        console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances.");
      }
      _activeLoaders++;
    }
    return this.transcoderPending;
  }
  load(url, onLoad, onProgress, onError) {
    if (this.workerConfig === null) {
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    }
    const loader = new FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    loader.setWithCredentials(this.withCredentials);
    const texture = new CompressedTexture();
    loader.load(url, (buffer) => {
      if (_taskCache.has(buffer)) {
        const cachedTask = _taskCache.get(buffer);
        return cachedTask.promise.then(onLoad).catch(onError);
      }
      this._createTexture([buffer]).then(function(_texture) {
        texture.copy(_texture);
        texture.needsUpdate = true;
        if (onLoad)
          onLoad(texture);
      }).catch(onError);
    }, onProgress, onError);
    return texture;
  }
  _createTextureFrom(transcodeResult) {
    const { mipmaps, width, height, format, type, error, dfdTransferFn, dfdFlags } = transcodeResult;
    if (type === "error")
      return Promise.reject(error);
    const texture = new CompressedTexture(mipmaps, width, height, format, UnsignedByteType);
    texture.minFilter = mipmaps.length === 1 ? LinearFilter : LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    texture.encoding = dfdTransferFn === KTX2TransferSRGB ? sRGBEncoding : LinearEncoding;
    texture.premultiplyAlpha = !!(dfdFlags & KTX2_ALPHA_PREMULTIPLIED);
    return texture;
  }
  _createTexture(buffers, config2 = {}) {
    const taskConfig = config2;
    const texturePending = this.init().then(() => {
      return this.workerPool.postMessage({ type: "transcode", buffers, taskConfig }, buffers);
    }).then((e) => this._createTextureFrom(e.data));
    _taskCache.set(buffers[0], { promise: texturePending });
    return texturePending;
  }
  dispose() {
    this.workerPool.dispose();
    if (this.workerSourceURL)
      URL.revokeObjectURL(this.workerSourceURL);
    _activeLoaders--;
    return this;
  }
}
KTX2Loader.BasisFormat = {
  ETC1S: 0,
  UASTC_4x4: 1
};
KTX2Loader.TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16
};
KTX2Loader.EngineFormat = {
  RGBAFormat,
  RGBA_ASTC_4x4_Format,
  RGBA_BPTC_Format,
  RGBA_ETC2_EAC_Format,
  RGBA_PVRTC_4BPPV1_Format,
  RGBA_S3TC_DXT5_Format,
  RGB_ETC1_Format,
  RGB_ETC2_Format,
  RGB_PVRTC_4BPPV1_Format,
  RGB_S3TC_DXT1_Format
};
KTX2Loader.BasisWorker = function() {
  let config2;
  let transcoderPending;
  let BasisModule;
  const EngineFormat = _EngineFormat;
  const TranscoderFormat = _TranscoderFormat;
  const BasisFormat = _BasisFormat;
  self.addEventListener("message", function(e) {
    const message = e.data;
    switch (message.type) {
      case "init":
        config2 = message.config;
        init(message.transcoderBinary);
        break;
      case "transcode":
        transcoderPending.then(() => {
          try {
            const { width, height, hasAlpha, mipmaps, format, dfdTransferFn, dfdFlags } = transcode(message.buffers[0]);
            const buffers = [];
            for (let i = 0; i < mipmaps.length; ++i) {
              buffers.push(mipmaps[i].data.buffer);
            }
            self.postMessage({ type: "transcode", id: message.id, width, height, hasAlpha, mipmaps, format, dfdTransferFn, dfdFlags }, buffers);
          } catch (error) {
            console.error(error);
            self.postMessage({ type: "error", id: message.id, error: error.message });
          }
        });
        break;
    }
  });
  function init(wasmBinary) {
    transcoderPending = new Promise((resolve) => {
      BasisModule = { wasmBinary, onRuntimeInitialized: resolve };
      BASIS(BasisModule);
    }).then(() => {
      BasisModule.initializeBasis();
      if (BasisModule.KTX2File === void 0) {
        console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
      }
    });
  }
  function transcode(buffer) {
    const ktx2File = new BasisModule.KTX2File(new Uint8Array(buffer));
    function cleanup() {
      ktx2File.close();
      ktx2File.delete();
    }
    if (!ktx2File.isValid()) {
      cleanup();
      throw new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    }
    const basisFormat = ktx2File.isUASTC() ? BasisFormat.UASTC_4x4 : BasisFormat.ETC1S;
    const width = ktx2File.getWidth();
    const height = ktx2File.getHeight();
    const levels = ktx2File.getLevels();
    const hasAlpha = ktx2File.getHasAlpha();
    const dfdTransferFn = ktx2File.getDFDTransferFunc();
    const dfdFlags = ktx2File.getDFDFlags();
    const { transcoderFormat, engineFormat } = getTranscoderFormat(basisFormat, width, height, hasAlpha);
    if (!width || !height || !levels) {
      cleanup();
      throw new Error("THREE.KTX2Loader:	Invalid texture");
    }
    if (!ktx2File.startTranscoding()) {
      cleanup();
      throw new Error("THREE.KTX2Loader: .startTranscoding failed");
    }
    const mipmaps = [];
    for (let mip = 0; mip < levels; mip++) {
      const levelInfo = ktx2File.getImageLevelInfo(mip, 0, 0);
      const mipWidth = levelInfo.origWidth;
      const mipHeight = levelInfo.origHeight;
      const dst = new Uint8Array(ktx2File.getImageTranscodedSizeInBytes(mip, 0, 0, transcoderFormat));
      const status = ktx2File.transcodeImage(dst, mip, 0, 0, transcoderFormat, 0, -1, -1);
      if (!status) {
        cleanup();
        throw new Error("THREE.KTX2Loader: .transcodeImage failed.");
      }
      mipmaps.push({ data: dst, width: mipWidth, height: mipHeight });
    }
    cleanup();
    return { width, height, hasAlpha, mipmaps, format: engineFormat, dfdTransferFn, dfdFlags };
  }
  const FORMAT_OPTIONS = [
    {
      if: "astcSupported",
      basisFormat: [BasisFormat.UASTC_4x4],
      transcoderFormat: [TranscoderFormat.ASTC_4x4, TranscoderFormat.ASTC_4x4],
      engineFormat: [EngineFormat.RGBA_ASTC_4x4_Format, EngineFormat.RGBA_ASTC_4x4_Format],
      priorityETC1S: Infinity,
      priorityUASTC: 1,
      needsPowerOfTwo: false
    },
    {
      if: "bptcSupported",
      basisFormat: [BasisFormat.ETC1S, BasisFormat.UASTC_4x4],
      transcoderFormat: [TranscoderFormat.BC7_M5, TranscoderFormat.BC7_M5],
      engineFormat: [EngineFormat.RGBA_BPTC_Format, EngineFormat.RGBA_BPTC_Format],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: false
    },
    {
      if: "dxtSupported",
      basisFormat: [BasisFormat.ETC1S, BasisFormat.UASTC_4x4],
      transcoderFormat: [TranscoderFormat.BC1, TranscoderFormat.BC3],
      engineFormat: [EngineFormat.RGB_S3TC_DXT1_Format, EngineFormat.RGBA_S3TC_DXT5_Format],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: false
    },
    {
      if: "etc2Supported",
      basisFormat: [BasisFormat.ETC1S, BasisFormat.UASTC_4x4],
      transcoderFormat: [TranscoderFormat.ETC1, TranscoderFormat.ETC2],
      engineFormat: [EngineFormat.RGB_ETC2_Format, EngineFormat.RGBA_ETC2_EAC_Format],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: false
    },
    {
      if: "etc1Supported",
      basisFormat: [BasisFormat.ETC1S, BasisFormat.UASTC_4x4],
      transcoderFormat: [TranscoderFormat.ETC1],
      engineFormat: [EngineFormat.RGB_ETC1_Format],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: false
    },
    {
      if: "pvrtcSupported",
      basisFormat: [BasisFormat.ETC1S, BasisFormat.UASTC_4x4],
      transcoderFormat: [TranscoderFormat.PVRTC1_4_RGB, TranscoderFormat.PVRTC1_4_RGBA],
      engineFormat: [EngineFormat.RGB_PVRTC_4BPPV1_Format, EngineFormat.RGBA_PVRTC_4BPPV1_Format],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: true
    }
  ];
  const ETC1S_OPTIONS = FORMAT_OPTIONS.sort(function(a, b) {
    return a.priorityETC1S - b.priorityETC1S;
  });
  const UASTC_OPTIONS = FORMAT_OPTIONS.sort(function(a, b) {
    return a.priorityUASTC - b.priorityUASTC;
  });
  function getTranscoderFormat(basisFormat, width, height, hasAlpha) {
    let transcoderFormat;
    let engineFormat;
    const options = basisFormat === BasisFormat.ETC1S ? ETC1S_OPTIONS : UASTC_OPTIONS;
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (!config2[opt.if])
        continue;
      if (!opt.basisFormat.includes(basisFormat))
        continue;
      if (hasAlpha && opt.transcoderFormat.length < 2)
        continue;
      if (opt.needsPowerOfTwo && !(isPowerOfTwo(width) && isPowerOfTwo(height)))
        continue;
      transcoderFormat = opt.transcoderFormat[hasAlpha ? 1 : 0];
      engineFormat = opt.engineFormat[hasAlpha ? 1 : 0];
      return { transcoderFormat, engineFormat };
    }
    console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32.");
    transcoderFormat = TranscoderFormat.RGBA32;
    engineFormat = EngineFormat.RGBAFormat;
    return { transcoderFormat, engineFormat };
  }
  function isPowerOfTwo(value) {
    if (value <= 2)
      return true;
    return (value & value - 1) === 0 && value !== 0;
  }
};
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
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(new DRACOLoader());
    gltfLoader.setKTX2Loader(new KTX2Loader());
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);
    this.loaderMap = {
      jpg: imageLoader,
      png: imageLoader,
      jpeg: imageLoader,
      obj: new OBJLoader(),
      mtl: new MTLLoader(),
      mp4: videoLoader,
      webm: videoLoader,
      ogg: videoLoader,
      hdr: new RGBELoader(),
      gltf: gltfLoader,
      glb: gltfLoader
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
    this.path = path;
    return this;
  }
  getLoader(ext) {
    if (this.loaderMap[ext]) {
      return this.loaderMap[ext];
    } else {
      return null;
    }
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
      const pathAnalysis = url.replace(/\\/g, "/").split("/");
      const filename = pathAnalysis.pop();
      const path = this.path + pathAnalysis.join("/") + "/";
      loader.setPath(path).loadAsync(filename, (event) => {
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
  CONFIGTYPE2["TORUSGEOMETRY"] = "TorusGeometry";
  CONFIGTYPE2["RINGGEOMETRY"] = "RingGeometry";
  CONFIGTYPE2["EDGESGEOMETRY"] = "EdgesGeometry";
  CONFIGTYPE2["LINECURVEGEOMETRY"] = "LineCurveGeometry";
  CONFIGTYPE2["SPLINECURVEGEOMETRY"] = "SplineCurveGeometry";
  CONFIGTYPE2["CUBICBEZIERCURVEGEOMETRY"] = "CubicBezierCurveGeometry";
  CONFIGTYPE2["QUADRATICBEZIERCURVEGEOMETRY"] = "QuadraticBezierCurveGeometry";
  CONFIGTYPE2["CUSTOMGEOMETRY"] = "CustomGeometry";
  CONFIGTYPE2["LINETUBEGEOMETRY"] = "LineTubeGeometry";
  CONFIGTYPE2["SPLINETUBEGEOMETRY"] = "SplineTubeGeometry";
  CONFIGTYPE2["LINESHAPEGEOMETRY"] = "LineShapeGeometry";
  CONFIGTYPE2["OBJECT3D"] = "Object3D";
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
  CONFIGTYPE2["LOADTEXTURE"] = "LoadTexture";
  CONFIGTYPE2["MESHBASICMATERIAL"] = "MeshBasicMaterial";
  CONFIGTYPE2["MESHSTANDARDMATERIAL"] = "MeshStandardMaterial";
  CONFIGTYPE2["MESHPHONGMATERIAL"] = "MeshPhongMaterial";
  CONFIGTYPE2["SPRITEMATERIAL"] = "SpriteMaterial";
  CONFIGTYPE2["LINEBASICMATERIAL"] = "LineBasicMaterial";
  CONFIGTYPE2["POINTSMATERIAL"] = "PointsMaterial";
  CONFIGTYPE2["SHADERMATERIAL"] = "ShaderMaterial";
  CONFIGTYPE2["MESHPHYSICALMATERIAL"] = "MeshPhysicalMaterial";
  CONFIGTYPE2["AMBIENTLIGHT"] = "AmbientLight";
  CONFIGTYPE2["SPOTLIGHT"] = "SpotLight";
  CONFIGTYPE2["POINTLIGHT"] = "PointLight";
  CONFIGTYPE2["DIRECTIONALLIGHT"] = "DirectionalLight";
  CONFIGTYPE2["HEMISPHERELIGHT"] = "HemisphereLight";
  CONFIGTYPE2["PERSPECTIVECAMERA"] = "PerspectiveCamera";
  CONFIGTYPE2["ORTHOGRAPHICCAMERA"] = "OrthographicCamera";
  CONFIGTYPE2["WEBGLRENDERER"] = "WebGLRenderer";
  CONFIGTYPE2["CSS3DRENDERER"] = "CSS3DRenderer";
  CONFIGTYPE2["SCENE"] = "Scene";
  CONFIGTYPE2["TRNASFORMCONTROLS"] = "TransformControls";
  CONFIGTYPE2["ORBITCONTROLS"] = "OrbitControls";
  CONFIGTYPE2["SMAAPASS"] = "SMAAPass";
  CONFIGTYPE2["UNREALBLOOMPASS"] = "UnrealBloomPass";
  CONFIGTYPE2["SELECTIVEBLOOMPASS"] = "SelectiveBloomPass";
  CONFIGTYPE2["SCRIPTANIMATION"] = "ScriptAnimation";
  CONFIGTYPE2["KEYFRAMEANIMATION"] = "KeyframeAnimation";
})(CONFIGTYPE || (CONFIGTYPE = {}));
var MODULETYPE;
(function(MODULETYPE2) {
  MODULETYPE2["OBJECT3D"] = "Object3D";
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
  OBJECTMODULE2[OBJECTMODULE2["OBJECT3D"] = MODULETYPE.OBJECT3D] = "OBJECT3D";
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
  [CONFIGTYPE.TORUSGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.RINGGEOMETRY]: MODULETYPE.GEOMETRY,
  [CONFIGTYPE.LINESHAPEGEOMETRY]: MODULETYPE.GEOMETRY,
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
const getModule = (type) => {
  const matchModule = (module) => {
    return type.toLocaleLowerCase().includes(module.toLocaleLowerCase());
  };
  for (const module of Object.values(MODULETYPE)) {
    if (matchModule(module)) {
      return module;
    }
  }
  return null;
};
const getObjectConfig = () => {
  return {
    vid: "",
    name: "",
    type: CONFIGTYPE.OBJECT3D,
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
const getHemisphereLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: CONFIGTYPE.HEMISPHERELIGHT,
    color: "rgb(255, 255, 255)",
    groundColor: "rgb(0, 0, 0)"
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
const getTorusGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.TORUSGEOMETRY,
    radius: 3,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2
  });
};
const getRingGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.RINGGEOMETRY,
    innerRadius: 2,
    outerRadius: 3,
    thetaSegments: 8,
    phiSegments: 8,
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
const getShapeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    path: [],
    curveSegments: 12
  });
};
const getLineShapeGeometryConfig = function() {
  return Object.assign(getShapeGeometryConfig(), {
    type: CONFIGTYPE.LINESHAPEGEOMETRY
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
    flipY: true,
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
const getLoadTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    type: CONFIGTYPE.LOADTEXTURE,
    url: ""
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
    blendSrcAlpha: null,
    polygonOffset: false,
    polygonOffsetFactor: 0,
    polygonOffsetUnits: 0
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
const getMeshPhysicalMaterialConfig = function() {
  return Object.assign(getMeshStandardMaterialConfig(), {
    type: CONFIGTYPE.MESHPHYSICALMATERIAL,
    attenuationColor: "rgb(255, 255, 255)",
    attenuationDistance: 0,
    clearcoat: 0,
    clearcoatNormalScale: {
      x: 1,
      y: 1
    },
    clearcoatRoughness: 0,
    ior: 1.5,
    reflectivity: 0.5,
    sheen: 0,
    sheenRoughness: 1,
    sheenColor: "rgb(255, 255, 255)",
    specularIntensity: 0,
    specularColor: "rgb(255, 255, 255)",
    thickness: 0,
    transmission: 0,
    clearcoatMap: "",
    clearcoatNormalMap: "",
    clearcoatRoughnessMap: "",
    sheenRoughnessMap: "",
    sheenColorMap: "",
    specularIntensityMap: "",
    specularColorMap: "",
    thicknessMap: "",
    transmissionMap: ""
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
    left: -window.innerWidth,
    right: window.innerWidth,
    top: window.innerHeight,
    bottom: -window.innerHeight,
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
const getSelectiveBloomPassConfig = function() {
  return Object.assign(getPassConfig(), {
    type: CONFIGTYPE.SELECTIVEBLOOMPASS,
    strength: 1,
    threshold: 0,
    radius: 0,
    renderScene: "",
    renderCamera: "",
    selectedObjects: []
  });
};
const getAnimationConfig = function() {
  return {
    vid: "",
    type: "",
    name: "",
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
  [CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY]: getQuadraticBezierCurveGeometryConfig,
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
  [CONFIGTYPE.KEYFRAMEANIMATION]: getKeyframeAnimationConfig
};
const defaultHanlder = (url, resource, parseMap) => {
  const resourceHanlder = (url2, object) => {
    if (!Object.getPrototypeOf(object)) {
      return null;
    } else if (parseMap.has(Object.getPrototypeOf(object).constructor.name + "Parser")) {
      return parseMap.get(Object.getPrototypeOf(object).constructor.name + "Parser");
    } else {
      return resourceHanlder(url2, Object.getPrototypeOf(object));
    }
  };
  return resourceHanlder(url, resource);
};
class Parser {
  registHandler() {
    return defaultHanlder;
  }
}
class HTMLImageElementParser extends Parser {
  parse({ url, resource, configMap, resourceMap }) {
    const config2 = CONFIGFACTORY[CONFIGTYPE.IMAGETEXTURE]();
    config2.url = url;
    resourceMap.set(url, resource);
    configMap.set(url, config2);
  }
}
class HTMLCanvasElementParser extends Parser {
  parse({ url, resource, configMap, resourceMap }) {
    const config2 = CONFIGFACTORY[CONFIGTYPE.CANVASTEXTURE]();
    config2.url = url;
    resourceMap.set(url, resource);
    configMap.set(url, config2);
  }
}
class HTMLVideoElementParser extends Parser {
  parse({ url, resource, configMap, resourceMap }) {
    const config2 = CONFIGFACTORY[CONFIGTYPE.VIDEOTEXTURE]();
    config2.url = url;
    resourceMap.set(url, resource);
    configMap.set(url, config2);
  }
}
function isValidKey(key, object) {
  return key in object;
}
function isValidEnum(enumeration, value) {
  return Object.values(enumeration).includes(value);
}
function generateConfigFunction(config2) {
  return (merge) => {
    const recursion = (config22, merge2) => {
      for (const key in merge2) {
        if (config22[key] === void 0) {
          console.warn(` config can not set key: ${key}`);
          continue;
        }
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config22[key], merge2[key]);
        } else {
          config22[key] = merge2[key];
        }
      }
    };
    if (merge) {
      recursion(config2, merge);
    }
    return config2;
  };
}
function syncObject(config2, target, filter, callBack) {
  const recursiveConfig = (config22, target2, filter2) => {
    for (const key in config22) {
      if (target2[key] === void 0) {
        continue;
      }
      if (filter2 && filter2[key]) {
        continue;
      }
      if (typeof config22[key] === "object" && typeof config22[key] !== null) {
        if (filter2 && typeof filter2[key] === "object" && typeof filter2[key] !== null) {
          recursiveConfig(config22[key], target2[key], filter2[key]);
        } else {
          recursiveConfig(config22[key], target2[key]);
        }
        continue;
      }
      target2[key] = config22[key];
    }
  };
  recursiveConfig(config2, target, filter);
  callBack && callBack();
}
var utils = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  isValidKey,
  isValidEnum,
  generateConfigFunction,
  syncObject
});
class Object3DParser extends Parser {
  parse(params) {
    this.parseObject3D(params);
  }
  parseColor(color) {
    return `rgb(${Math.round(255 * color.r)}, ${Math.round(255 * color.g)}, ${Math.round(255 * color.b)})`;
  }
  attributeEnhance(object) {
    const result = {};
    for (const key in object) {
      if (key.startsWith("_")) {
        result[key.slice(1)] = object[key];
      } else {
        result[key] = object[key];
      }
    }
    return result;
  }
  parseTexture({ url, resource, configMap, resourceMap }) {
    resourceMap.set(url, resource);
    const config2 = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]();
    configMap.set(url, config2);
    config2.vid = v4();
    config2.url = url;
    syncObject(resource, config2, {
      type: true,
      vid: true,
      url: true
    });
  }
  parseMaterial({
    url,
    resource,
    configMap,
    resourceMap
  }) {
    resourceMap.set(url, resource);
    if (!CONFIGFACTORY[resource.type]) {
      console.warn(`can not found support config in vis for this resource`, resource);
      return;
    }
    const config2 = CONFIGFACTORY[resource.type]();
    configMap.set(url, config2);
    config2.vid = v4();
    syncObject(this.attributeEnhance(resource), config2, {
      type: true,
      vid: true
    });
    for (const key in resource) {
      if (!resource[key]) {
        continue;
      }
      if (resource[key].isColor) {
        config2[key] = this.parseColor(resource[key]);
      } else if (key.toLocaleLowerCase().endsWith("map") && resource[key]) {
        const textureUrl = `${url}.${key}`;
        this.parseTexture({
          url: textureUrl,
          resource: resource[key],
          configMap,
          resourceMap
        });
        config2[key] = configMap.get(textureUrl).vid;
      }
    }
  }
  parseGeometry({
    url,
    resource,
    configMap,
    resourceMap
  }) {
    resourceMap.set(url, resource);
    resource.computeBoundingBox();
    const box = resource.boundingBox;
    const center = box.getCenter(new Vector3());
    const config2 = CONFIGFACTORY[CONFIGTYPE.LOADGEOMETRY]();
    config2.vid = v4();
    config2.url = url;
    config2.position.x = center.x / (box.max.x - box.min.x) * 2;
    config2.position.y = center.y / (box.max.y - box.min.y) * 2;
    config2.position.z = center.z / (box.max.z - box.min.z) * 2;
    configMap.set(url, config2);
  }
  parseObject3D({
    url,
    resource,
    configMap,
    resourceMap
  }) {
    resourceMap.set(url, resource);
    if (!CONFIGFACTORY[resource.type]) {
      console.warn(`can not found support config in vis for this resource`, resource);
      return;
    }
    const config2 = CONFIGFACTORY[resource.type]();
    config2.vid = v4();
    syncObject(resource, config2, {
      type: true,
      vid: true,
      children: true,
      geometry: true,
      material: true,
      parent: true,
      lookAt: true
    });
    config2.rotation.x = resource.rotation.x;
    config2.rotation.y = resource.rotation.y;
    config2.rotation.z = resource.rotation.z;
    configMap.set(url, config2);
    if (resource.material) {
      if (Array.isArray(resource.material)) {
        config2.material = [];
        resource.material.forEach((material, i, arr) => {
          const materialUrl = `${url}.material.${i}`;
          this.parseMaterial({
            url: materialUrl,
            resource: material,
            configMap,
            resourceMap
          });
          config2.material.push(configMap.get(materialUrl).vid);
        });
      } else {
        const materialUrl = `${url}.material`;
        this.parseMaterial({
          url: materialUrl,
          resource: resource.material,
          configMap,
          resourceMap
        });
        config2.material = configMap.get(materialUrl).vid;
      }
    }
    if (resource.geometry) {
      const geometryUrl = `${url}.geometry`;
      this.parseGeometry({
        url: geometryUrl,
        resource: resource.geometry,
        configMap,
        resourceMap
      });
      config2.geometry = configMap.get(geometryUrl).vid;
    }
    if (resource.children && resource.children.length) {
      resource.children.forEach((object, i, arr) => {
        const objectUrl = `${url}.children.${i}`;
        this.parseObject3D({
          url: objectUrl,
          resource: object,
          configMap,
          resourceMap
        });
        config2.children.push(configMap.get(objectUrl).vid);
      });
    }
  }
}
class HTMLElementParser extends Parser {
  parse({ url, resource, configMap, resourceMap }) {
    const config2 = CONFIGFACTORY[CONFIGTYPE.CSS3DPLANE]();
    config2.element = url;
    resourceMap.set(url, resource);
    configMap.set(url, config2);
  }
}
class TextureParser extends Parser {
  parse({ url, resource, configMap, resourceMap }) {
    const config2 = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]();
    config2.url = url;
    resourceMap.set(url, resource);
    configMap.set(url, config2);
  }
}
class GLTFResourceParser extends Parser {
  constructor() {
    super();
    __publicField(this, "object3DParser", new Object3DParser());
  }
  parse({ url, resource, configMap, resourceMap }) {
    this.object3DParser.parse({
      url: `${url}.scene`,
      resource: resource.scene,
      configMap,
      resourceMap
    });
  }
  registHandler() {
    return (url, rescource, parseMap) => {
      if (rescource.parser.constructor.name === "GLTFParser") {
        return parseMap.get(this.constructor.name) || null;
      } else {
        return null;
      }
    };
  }
}
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
    __publicField(this, "paserMap", new Map());
    __publicField(this, "handlerMap", new Map());
    this.addParser(new HTMLImageElementParser(), { warn: false }).addParser(new HTMLCanvasElementParser(), { warn: false }).addParser(new HTMLVideoElementParser(), { warn: false }).addParser(new Object3DParser(), { warn: false }).addParser(new HTMLElementParser(), { warn: false }).addParser(new TextureParser(), { warn: false }).addParser(new GLTFResourceParser(), { warn: false });
    const map = new Map();
    for (const key in resources) {
      if (map.has(key)) {
        console.warn(`resourceManager construct params rescource already exist: ${key}, that will be cover.`);
      }
      map.set(key, resources[key]);
    }
    this.mappingResource(map);
  }
  addParser(parser, options = { warn: true }) {
    if (this.paserMap.has(parser.constructor.name)) {
      options.warn && console.warn(`resourceManager has already exist this parser, that will be cover`, this.paserMap.get(parser.constructor.name));
    }
    this.paserMap.set(parser.constructor.name, parser);
    this.addHanlder(parser.registHandler(), options);
    return this;
  }
  addHanlder(hanlder, options = { warn: true }) {
    if (this.handlerMap.has(hanlder.name)) {
      options.warn && console.warn(`resourceManager has already exist this hanlder, that will be cover`, hanlder.name);
    }
    this.handlerMap.set(hanlder.name, hanlder);
    return this;
  }
  mappingResource(loadResourceMap, options) {
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;
    const resourceConfig = {};
    loadResourceMap.forEach((resource, url) => {
      if (options && options.hanlder && options.hanlder[url]) {
        const hanlder = this.handlerMap.get(options.hanlder[url]);
        if (!hanlder) {
          console.warn(`resource manager can not support this handler: ${options.hanlder[url]}`);
        } else {
          const parser = hanlder(url, resource, this.paserMap);
          if (!parser) {
            console.warn(`resource manager hanlder can not found this resource parser: `, resource, hanlder);
          } else {
            parser.parse({
              url,
              resource,
              configMap,
              resourceMap
            });
            resourceConfig[url] = this.getResourceConfig(url);
          }
        }
      } else {
        let parser = null;
        for (const handler of this.handlerMap.values()) {
          parser = handler(url, resource, this.paserMap);
          if (parser) {
            break;
          }
        }
        if (!parser) {
          console.warn(`resouce manager can not found some handler to parser this resource:`, resource);
        } else {
          parser.parse({
            url,
            resource,
            configMap,
            resourceMap
          });
          resourceConfig[url] = this.getResourceConfig(url);
        }
      }
    });
    this.dispatchEvent({
      type: "mapped",
      structureMap: this.structureMap,
      configMap,
      resourceMap,
      resourceConfig
    });
    return this;
  }
  getResourceConfig(url) {
    const configMap = this.configMap;
    const loadOptions = {};
    [...configMap.keys()].filter((key) => key.startsWith(url)).some((url2) => {
      const config2 = configMap.get(url2);
      if (!config2) {
        console.error(`unknow error: can not found config by url: ${url2}`);
      } else {
        const module = getModule(config2.type);
        if (!module) {
          console.error(`unknow error: can not found module by type: ${config2.type}`, config2);
        } else {
          !loadOptions[module] && (loadOptions[module] = {});
          loadOptions[module][config2.vid] = config2;
        }
      }
    });
    return loadOptions;
  }
  hasResource(url) {
    return this.resourceMap.has(url);
  }
  remove(url) {
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;
    [...configMap.keys()].filter((key) => key.startsWith(url)).forEach((url2) => {
      configMap.delete(url2);
      const resource = resourceMap.get(url2);
      resource.dispose && resource.dispose();
      resourceMap.delete(url2);
    });
    return this;
  }
  dispose() {
    this.resourceMap.forEach((object, url) => {
      object.dispose && object.dispose();
    });
    this.resourceMap.clear();
    this.configMap.clear();
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
    _ProxyBroadcast.cacheArray(value);
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
              if (execNum === num) {
                break;
              }
            }
            index += 1;
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
          _ProxyBroadcast.cacheArray(object[key]);
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
__publicField(ProxyBroadcast, "cacheArray", function(object) {
  if (Array.isArray(object) && !object[Symbol.for(_ProxyBroadcast.arraySymobl)]) {
    object[Symbol.for(_ProxyBroadcast.arraySymobl)] = object.concat([]);
  }
});
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
      return clone(this.data);
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
                  return clone(elem);
                } else {
                  return elem;
                }
              });
              continue;
            }
            result[key] = {};
            if (!template[key]) {
              result[key] = clone(config2[key]);
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
const Rule = (input, compiler, validateFun = validate) => {
  const { operate, key, path, value } = input;
  let vid = key;
  const tempPath = [].concat(path);
  if (path.length) {
    vid = tempPath.shift();
  }
  if (!validateFun(vid)) {
    console.warn(`${compiler.MODULE} Rule: vid is illeage: ${vid}`);
    return;
  }
  if (operate === "add" && !tempPath.length) {
    compiler.add(value);
    return;
  }
  if (input.operate === "delete" && !tempPath.length) {
    compiler.remove(value);
    return;
  }
  if (input.operate === "set" && !tempPath.length && key === vid) {
    compiler.cover(value);
    return;
  }
  compiler.compile(vid, { operate, key, path: tempPath, value });
};
const TextureRule = function(notice, compiler) {
  Rule(notice, compiler);
};
class TextureDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(TextureRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.TEXTURE);
  }
}
const MaterialRule = function(notice, compiler) {
  Rule(notice, compiler);
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
const ObjectRule = function(input, compiler) {
  if (input.key === "parent") {
    return;
  }
  Rule(input, compiler);
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
  Rule(notice, compiler);
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
  Rule(input, compiler, (vid) => {
    return validate(vid) || [CONFIGTYPE.WEBGLRENDERER, CONFIGTYPE.CSS3DRENDERER].includes(vid);
  });
};
class RendererDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(RendererRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.RENDERER);
  }
}
const SceneRule = function(input, compiler) {
  Rule(input, compiler, (vid) => {
    return validate(vid) || [CONFIGTYPE.SCENE].includes(vid);
  });
};
class SceneDataSupport extends ObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(SceneRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.SCENE);
  }
}
const ControlsRule = function(input, compiler) {
  Rule(input, compiler, (vid) => {
    return validate(vid) || [CONFIGTYPE.TRNASFORMCONTROLS, CONFIGTYPE.ORBITCONTROLS].includes(vid);
  });
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
  Rule(input, compiler);
};
class PassDataSupport extends DataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(PassRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.PASS);
  }
}
const AnimationRule = function(notice, compiler) {
  if (notice.key === "name" && notice.path.length === 1) {
    return;
  }
  Rule(notice, compiler);
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
const Object3DRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
class Object3DDataSupport extends ObjectDataSupport {
  constructor(data, ignore) {
    !data && (data = {});
    super(Object3DRule, data, ignore);
    __publicField(this, "MODULE", MODULETYPE.OBJECT3D);
  }
}
class DataSupportManager {
  constructor(parameters) {
    __publicField(this, "object3DDataSupport", new Object3DDataSupport());
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
      const module = getModule(config2.type);
      if (module) {
        this.dataSupportMap.get(module).addConfig(config2);
      } else {
        console.warn(`dataSupportManager can not found this config module: ${config2.type}`);
      }
    }
    return this;
  }
  reactiveConfig(config2) {
    const module = getModule(config2.type);
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
}
const shader$3 = {
  name: "uvPulseShader",
  uniforms: {
    time: { value: 0 },
    width: { value: 0.5 },
    color: {
      value: {
        r: 1,
        g: 0,
        b: 0
      }
    },
    center: {
      value: {
        x: 0.5,
        y: 0.5
      }
    }
  },
  vertexShader: `
    varying vec2 vUv;

    void main () {

      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: `
    uniform float width;
    uniform float time;
    uniform vec3 color;
    uniform vec2 center;

    varying vec2 vUv;

    void main () {
      // \u6839\u636EuTime\u6C42\u51FA\u767E\u5206\u6BD4
      float deg = mod(degrees(time), 360.0);
      if (deg > 0.0 && deg < 180.0) {
        discard;
      }

      float percent = cos(time);
      float distancePercent = distance(center, vUv);

      // \u4ECE\u5916\u5411\u91CC
      if (distancePercent > 0.5) {
        discard;
      }

      if (distancePercent < percent) {
        discard;
      }

      if (distancePercent - percent > width) {
        discard;
      }

      float opacity =  (width - (distancePercent - percent)) / width;

      // float opacity = distancePercent;
      gl_FragColor = vec4(color, opacity);
    }`
};
const shader$2 = {
  name: "fragCoordTestingShader",
  uniforms: {
    resolution: {
      value: {
        x: 1920,
        y: 1080
      }
    }
  },
  vertexShader: `
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  fragmentShader: `
    uniform vec2 resolution;

    void main () {
      vec2 st = gl_FragCoord.xy / resolution;
      gl_FragColor = vec4(st.x,st.y,0.0,1.0);
    }`
};
const shader$1 = {
  name: "colorMixShader",
  uniforms: {
    colorA: {
      value: {
        r: 1,
        g: 0,
        b: 0
      }
    },
    colorB: {
      value: {
        r: 0,
        g: 1,
        b: 0
      }
    },
    percent: {
      value: 0.5
    }
  },
  vertexShader: `
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  fragmentShader: `
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform float percent;

    void main () {
      gl_FragColor = vec4(mix(colorA, colorB, percent), 1.0);
    }`
};
const shader = {
  name: "BloomShader",
  uniforms: {
    brightness: { value: 0.5 },
    extend: { value: 5 },
    range: { value: 10 },
    specular: { value: 0.8 },
    specularRange: { value: 2 },
    color: {
      value: {
        r: 1,
        g: 1,
        b: 1
      }
    }
  },
  vertexShader: `
  uniform float extend;

  varying vec2 vUv;

  void main () {

    vUv = uv;

    vec3 extendPosition = position + normalize(position) * extend;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(extendPosition , 1.0 );
  }`,
  fragmentShader: `
    uniform vec3 color;
    uniform float brightness;
    uniform float specular;
    uniform float range;
    uniform float specularRange;

    varying vec2 vUv;
    
    void main () {

      gl_FragColor = vec4(color, brightness);
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
ShaderLibrary.reigster(shader$3);
ShaderLibrary.reigster(shader$2);
ShaderLibrary.reigster(shader$1);
ShaderLibrary.reigster(shader);
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
      if (getModule(initConfig.type) in OBJECTMODULE && initConfig.type !== CONFIGTYPE.SCENE) {
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
const _Compiler = class {
  constructor() {
    __publicField(this, "target", {});
    __publicField(this, "map", new Map());
    __publicField(this, "weakMap", new WeakMap());
    __publicField(this, "engine");
    __publicField(this, "cacheCompile");
  }
  getMap() {
    return this.map;
  }
  useEngine(engine) {
    this.engine = engine;
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  add(config2) {
    if (!_Compiler.processors.has(config2.type)) {
      console.warn(`${this.MODULE} compiler can not support this type: ${config2.type}`);
      return null;
    }
    const processor = _Compiler.processors.get(config2.type);
    const object = processor.create(config2, this.engine);
    this.map.set(config2.vid, object);
    this.weakMap.set(object, config2.vid);
    return object;
  }
  remove(config2) {
    const vid = config2.vid;
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler can not found this vid object: ${vid}.`);
      return this;
    }
    if (!_Compiler.processors.has(config2.type)) {
      console.warn(`${this.MODULE} compiler can not support this type: ${config2.type}`);
      return this;
    }
    const object = this.map.get(vid);
    _Compiler.processors.get(config2.type).dispose(object);
    this.map.delete(vid);
    this.weakMap.delete(object);
    return this;
  }
  cover(config2) {
    const vid = config2.vid;
    if (!this.map.has(vid)) {
      console.warn(`${this.MODULE} compiler can not found this vid object: ${vid}.`);
      return this;
    }
    Promise.resolve().then(() => {
      syncObject(config2, config2, {
        vid: true,
        type: true
      });
    });
    return this;
  }
  compile(vid, notice) {
    const cacheCompile = this.cacheCompile;
    let object;
    let config2;
    let processor;
    if (cacheCompile && cacheCompile.vid === vid) {
      object = cacheCompile.target;
      config2 = cacheCompile.config;
      processor = cacheCompile.processor;
    } else {
      if (!this.map.has(vid)) {
        console.warn(`${this.MODULE} compiler set function: can not found object which vid is: '${vid}'`);
        return this;
      }
      if (!this.target[vid]) {
        console.warn(`${this.MODULE} compiler set function: can not found config which vid is: '${vid}'`);
        return this;
      }
      object = this.map.get(vid);
      config2 = this.target[vid];
      if (!_Compiler.processors.has(config2.type)) {
        console.warn(`PassCompiler can not support this type: ${config2.type}`);
        return this;
      }
      processor = _Compiler.processors.get(config2.type);
      this.cacheCompile = {
        target: object,
        config: config2,
        processor,
        vid
      };
    }
    processor.process(__spreadValues({
      config: config2,
      target: object,
      engine: this.engine,
      processor,
      compiler: this
    }, notice));
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
    if (this.cacheCompile) {
      this.cacheCompile = void 0;
    }
    for (const config2 of Object.values(this.target)) {
      if (!this.map.has(config2.vid)) {
        console.warn(`${this.MODULE} compiler set function: can not found object which vid is: '${config2.vid}'`);
        continue;
      }
      const object = this.map.get(config2.vid);
      if (!_Compiler.processors.has(config2.type)) {
        console.warn(`${this.MODULE}  can not support this type: ${config2.type}`);
        continue;
      }
      _Compiler.processors.get(config2.type).dispose(object);
    }
    this.map.clear();
    this.target = {};
    return this;
  }
  getObjectSymbol(object) {
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
};
let Compiler = _Compiler;
__publicField(Compiler, "processors", new Map());
__publicField(Compiler, "processor", function(processor) {
  _Compiler.processors.set(processor.configType, processor);
});
const scriptAniSymbol = "vis.scriptAni";
class Processor {
  constructor(options) {
    __publicField(this, "configType");
    __publicField(this, "commands");
    __publicField(this, "create");
    __publicField(this, "dispose");
    this.configType = options.configType;
    this.commands = options.commands;
    this.create = options.create;
    this.dispose = options.dispose;
  }
  process(params) {
    if (!this.commands || !this.commands[params.operate]) {
      this[params.operate](params);
      return;
    }
    let commands2 = this.commands[params.operate];
    for (const key of [].concat(params.path, params.key)) {
      if (!commands2[key] && !commands2.$reg) {
        this[params.operate](params);
        return;
      } else if (commands2[key]) {
        if (typeof commands2[key] === "function") {
          commands2[key](params);
          return;
        } else {
          commands2 = commands2[key];
        }
      } else if (commands2.$reg) {
        for (const item of commands2.$reg) {
          if (item.reg.test(key)) {
            item.handler(params);
            return;
          }
        }
      }
    }
    this[params.operate](params);
  }
  add(params) {
    let target = params.target;
    const path = params.path;
    for (const key of path) {
      if (typeof target[key] !== void 0) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default add operate.`, params);
        return;
      }
    }
    target[params.key] = params.value;
  }
  set(params) {
    let target = params.target;
    const path = params.path;
    for (const key of path) {
      if (typeof target[key] !== void 0) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default set operate.`, params);
        return;
      }
    }
    target[params.key] = params.value;
  }
  delete(params) {
    let target = params.target;
    const path = params.path;
    for (const key of path) {
      if (typeof target[key] !== void 0) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default delete operate.`, params);
        return;
      }
    }
    delete target[params.key];
  }
}
const defineProcessor = (options) => {
  return new Processor(options);
};
const emptyHandler = function() {
};
const config$j = {
  name: "linearTime",
  multiply: 1
};
const generator$j = function(engine, target, attribute, config2) {
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
const config$i = {
  name: "sinWave",
  wavelength: 1,
  offset: 0,
  amplitude: 1,
  speed: 1
};
const generator$i = function(engine, target, attribute, config2) {
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
AniScriptLibrary.register(config$j, generator$j);
AniScriptLibrary.register(config$i, generator$i);
const createFunction = function(config2, engine) {
  let object = engine.compilerManager.getObjectBySymbol(config2.target);
  if (!object) {
    console.error(`can not found object in enigne: ${config2.target}`);
  }
  const attributeList = config2.attribute.split(".");
  attributeList.shift();
  const attribute = attributeList.pop();
  for (const key of attributeList) {
    if (object[key] === void 0) {
      console.error(`animaton processor: target object can not found key: ${key}`, object);
      return () => {
      };
    }
    object = object[key];
  }
  return AniScriptLibrary.generateScript(engine, object, attribute, config2.script);
};
var ScriptAnimationProcessor = defineProcessor({
  configType: CONFIGTYPE.SCRIPTANIMATION,
  commands: {
    set: {
      play({ target, engine, value }) {
        if (value) {
          engine.renderManager.addEventListener("render", target);
        } else {
          engine.renderManager.removeEventListener("render", target);
        }
      },
      $reg: [
        {
          reg: new RegExp(".*"),
          handler({ config: config2, engine }) {
            const fun = config2[Symbol.for(scriptAniSymbol)];
            engine.renderManager.removeEventListener("render", fun);
            const newFun = createFunction(config2, engine);
            config2[Symbol.for(scriptAniSymbol)] = newFun;
            config2.play && engine.renderManager.addEventListener("render", fun);
          }
        }
      ]
    }
  },
  create(config2, engine) {
    const fun = createFunction(config2, engine);
    config2.play && engine.renderManager.addEventListener("render", fun);
    config2[Symbol.for(scriptAniSymbol)] = fun;
    return fun;
  },
  dispose() {
  }
});
class AnimationCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.ANIMATION);
  }
  cover(config2) {
    super.cover(config2);
    const fun = this.map.get(config2.vid);
    config2[Symbol.for(scriptAniSymbol)] = fun;
    return this;
  }
  remove(config2) {
    delete config2[Symbol.for(scriptAniSymbol)];
    super.remove(config2);
    return this;
  }
  compile(vid, notice) {
    super.compile(vid, notice);
    const config2 = this.target[vid];
    const fun = this.map.get(config2.vid);
    config2[Symbol.for(scriptAniSymbol)] = fun;
    return this;
  }
}
Compiler.processor(ScriptAnimationProcessor);
class ObjectCompiler extends Compiler {
  constructor() {
    super();
  }
}
const config$h = {
  name: "openWindow",
  params: {
    url: ""
  }
};
const generator$h = function(engine, config2) {
  return () => {
    window.open(config2.params.url);
  };
};
const config$g = {
  name: "visibleObject",
  params: {
    target: "",
    visible: true,
    delay: 0
  }
};
const generator$g = function(engine, config2) {
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
const config$f = {
  name: "addClass",
  params: {
    target: "",
    className: "",
    delay: 0
  }
};
const generator$f = function(engine, config2) {
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
const config$e = {
  name: "changeScene",
  params: {
    scene: "Scene",
    delay: 0
  }
};
const generator$e = function(engine, config2) {
  const params = config2.params;
  return () => {
    setTimeout(() => {
      engine.setScene(params.scene);
    }, params.delay);
  };
};
const config$d = {
  name: "changeCamera",
  params: {
    camera: "",
    delay: 0
  }
};
const generator$d = function(engine, config2) {
  const params = config2.params;
  return () => {
    setTimeout(() => {
      engine.setCamera(params.camera);
    }, params.delay);
  };
};
const config$c = {
  name: "switchAnimate",
  params: {
    target: "",
    toggle: "auto",
    delay: 0
  }
};
const generator$c = function(engine, config2) {
  const params = config2.params;
  const target = engine.getConfigBySymbol(params.target);
  if (!target) {
    console.warn(`basic event switchAnimate: can not found vid config: ${params.target}`);
    return () => {
    };
  }
  return () => {
    setTimeout(() => {
      if (params.toggle === "auto") {
        target.play != target.play;
        return;
      }
      if (params.toggle === "off") {
        target.play = false;
        return;
      }
      if (params.toggle === "on") {
        target.play = true;
        return;
      }
    }, params.delay);
  };
};
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
const config$b = {
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
const generator$b = function(engine, config2) {
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
const config$a = {
  name: "rotationTo",
  params: {
    target: "",
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$a = function(engine, config2) {
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
    const tween = new Tween(object.rotation).to(params.rotation).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.rotation.x = params.rotation.x;
      supportData.rotation.y = params.rotation.y;
      supportData.rotation.z = params.rotation.z;
      animating = false;
    });
  };
};
const config$9 = {
  name: "upTo",
  params: {
    target: "",
    up: {
      x: 0,
      y: 1,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT
  }
};
const generator$9 = function(engine, config2) {
  const params = config2.params;
  const compiler = engine.compilerManager;
  const object = compiler.getObjectBySymbol(params.target);
  if (!object) {
    console.warn(`real time animation upTo: can not found vid object: ${params.target}`);
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
    const tween = new Tween(object.up).to(params.up).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.up.x = params.up.x;
      supportData.up.y = params.up.y;
      supportData.up.z = params.up.z;
      animating = false;
    });
  };
};
const config$8 = {
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
const config$7 = {
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
const generator$7 = function(engine, config2) {
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
const config$6 = {
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
const generator$6 = function(engine, config2) {
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
const config$5 = {
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
const generator$5 = function(engine, config2) {
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
const config$4 = {
  name: "focusObject",
  params: {
    target: "",
    camera: "",
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
const generator$4 = function(engine, config2) {
  const params = config2.params;
  const target = engine.getObjectBySymbol(params.target);
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
  let animating = false;
  const cacheEuler = new Euler();
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    let camera = engine.camera;
    if (params.camera) {
      camera = engine.getObjectBySymbol(params.camera);
      if (!camera) {
        camera = engine.camera;
        console.warn(`real time animation focusObject: can not found camera config: ${params.camera}`);
      }
    }
    const cameraConfig = engine.getObjectConfig(camera);
    const orb = engine.orbitControls && engine.orbitControls.object === camera;
    if (!cameraConfig) {
      console.warn(`engine current camera can not found config.`);
    }
    const renderManager = engine.renderManager;
    let position = {
      x: target.matrixWorld.elements[12] + params.offset.x,
      y: target.matrixWorld.elements[13] + params.offset.y,
      z: target.matrixWorld.elements[14] + params.offset.z
    };
    const backPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    if (params.space === "local") {
      const vector3 = new Vector3(params.offset.x, params.offset.y, params.offset.z).applyEuler(cacheEuler.setFromRotationMatrix(target.matrixWorld));
      position = {
        x: target.matrixWorld.elements[12] + vector3.x,
        y: target.matrixWorld.elements[13] + vector3.y,
        z: target.matrixWorld.elements[14] + vector3.z
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
      const upVector3 = new Vector3(0, 1, 0).applyEuler(cacheEuler.setFromRotationMatrix(target.matrixWorld));
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
      orbTween = new Tween(orbTarget).to({
        x: target.matrixWorld.elements[12],
        y: target.matrixWorld.elements[13],
        z: target.matrixWorld.elements[14]
      }).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
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
const config$3 = {
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
const generator$3 = function(engine, config2) {
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
const config$2 = {
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
const generator$2 = function(engine, config2) {
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
  const matrix4 = new Matrix4();
  const euler = new Euler();
  const vector3 = new Vector3();
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
const config$1 = {
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
const generator$1 = function(engine, config2) {
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
const config = {
  name: "orbitTargetMove",
  params: {
    target: "",
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
const generator = function(engine, config2) {
  const params = config2.params;
  engine.compilerManager;
  if (!engine.orbitControls) {
    console.warn(`real time animation orbitTargetMove: engine can not install orbitControls.`);
    return () => {
    };
  }
  const renderManager = engine.renderManager;
  let animating = false;
  return () => {
    if (animating) {
      return;
    }
    animating = true;
    let position = params.offset;
    if (params.target) {
      const object = engine.getObjectBySymbol(params.target);
      if (!object) {
        console.warn(`real time animation orbitTargetMove: can not found vid object: ${params.target}`);
      } else {
        position = {
          x: object.matrixWorld.elements[12] + position.x,
          y: object.matrixWorld.elements[13] + position.y,
          z: object.matrixWorld.elements[14] + position.z
        };
      }
    }
    const tween = new Tween(engine.orbitControls.target).to(position).duration(params.duration).delay(params.delay).easing(timingFunction[params.timingFunction]).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
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
EventLibrary.register(config$h, generator$h);
EventLibrary.register(config$g, generator$g);
EventLibrary.register(config$f, generator$f);
EventLibrary.register(config$e, generator$e);
EventLibrary.register(config$d, generator$d);
EventLibrary.register(config$c, generator$c);
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
const objectCacheMap = new WeakMap();
const lookAtHandler = function({ target, config: config2, value, engine }) {
  if (config2.vid === value) {
    console.warn(`can not set object lookAt itself.`);
    return;
  }
  let cacheData = objectCacheMap.get(target);
  if (!cacheData) {
    cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
    objectCacheMap.set(target, cacheData);
  }
  if (!value) {
    if (!cacheData.updateMatrixWorldFun) {
      return;
    }
    target.updateMatrixWorld = cacheData.updateMatrixWorldFun;
    cacheData.lookAtTarget = null;
    cacheData.updateMatrixWorldFun = null;
    return;
  }
  const lookAtTarget = engine.compilerManager.getObject3D(value);
  if (!lookAtTarget) {
    console.warn(`lookAt handler can not found this vid mapping object: '${value}'`);
    return;
  }
  const updateMatrixWorldFun = target.updateMatrixWorld;
  cacheData.updateMatrixWorldFun = updateMatrixWorldFun;
  cacheData.lookAtTarget = lookAtTarget.position;
  target.updateMatrixWorld = (focus) => {
    updateMatrixWorldFun.call(target, focus);
    target.lookAt(cacheData.lookAtTarget);
  };
};
const eventSymbol = "vis.event";
const addEventHanlder = function({ target, path, value, engine }) {
  const eventName = path[0];
  if (!EventLibrary.has(value.name)) {
    console.warn(`EventLibrary: can not support this event: ${value.name}`);
    return;
  }
  const fun = EventLibrary.generateEvent(value, engine);
  const symbol = Symbol.for(eventSymbol);
  value[symbol] = fun;
  target.addEventListener(eventName, fun);
};
const removeEventHandler = function({ target, path, value }) {
  const eventName = path[0];
  const fun = value[Symbol.for(eventSymbol)];
  if (!fun) {
    console.warn(`event remove can not fun found event in config`, value);
    return;
  }
  target.removeEventListener(eventName, fun);
  delete value[Symbol.for(eventSymbol)];
};
const updateEventHandler = function({ target, config: config2, path, engine }) {
  const eventName = path[0];
  const eventConfig = config2[path[0]][path[1]];
  const fun = eventConfig[Symbol.for(eventSymbol)];
  if (!fun) {
    console.warn(`event remove can not fun found event in config`, eventConfig);
    return;
  }
  target.removeEventListener(eventName, fun);
  const newFun = EventLibrary.generateEvent(eventConfig, engine);
  eventConfig[Symbol.for(eventSymbol)] = newFun;
  target.addEventListener(eventName, newFun);
};
const addChildrenHanlder = function({ target, config: config2, value, engine }) {
  const childrenConfig = engine.getConfigBySymbol(value);
  if (!childrenConfig) {
    console.warn(` can not foud object config in engine: ${value}`);
    return;
  }
  if (childrenConfig.parent && childrenConfig.parent !== config2.vid) {
    const parentConfig = engine.getConfigBySymbol(childrenConfig.parent);
    if (!parentConfig) {
      console.warn(` can not foud object parent config in engine: ${childrenConfig.parent}`);
      return;
    }
    parentConfig.children.splice(parentConfig.children.indexOf(value), 1);
  }
  childrenConfig.parent = config2.vid;
  const childrenObject = engine.compilerManager.getObject3D(value);
  if (!childrenObject) {
    console.warn(`can not found this vid in engine: ${value}.`);
    return;
  }
  target.add(childrenObject);
};
const removeChildrenHandler = function({ target, config: config2, value, engine }) {
  const childrenObject = engine.compilerManager.getObject3D(value);
  if (!childrenObject) {
    console.warn(`can not found this vid in engine: ${value}.`);
    return;
  }
  target.remove(childrenObject);
  const childrenConfig = engine.getConfigBySymbol(value);
  if (!childrenConfig) {
    console.warn(`can not found this vid in engine: ${value}.`);
    return;
  }
  childrenConfig.parent = "";
};
const objectCreate = function(object, config2, filter, engine) {
  const asyncFun = Promise.resolve();
  asyncFun.then(() => {
    !filter.lookAt && lookAtHandler({
      target: object,
      config: config2,
      engine,
      value: config2.lookAt
    });
    config2.children.forEach((vid) => {
      addChildrenHanlder({
        target: object,
        config: config2,
        value: vid,
        engine
      });
    });
    for (const eventName of Object.values(EVENTNAME)) {
      config2[eventName].forEach((event, i) => {
        addEventHanlder({
          target: object,
          path: [eventName, i.toString()],
          value: event,
          engine
        });
      });
    }
  });
  syncObject(config2, object, __spreadValues({
    vid: true,
    type: true,
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
  }, filter));
  return object;
};
const objectDispose = function(target) {
  target._listener = {};
};
const objectCommands = {
  add: {
    pointerdown: addEventHanlder,
    pointerup: addEventHanlder,
    pointermove: addEventHanlder,
    pointerenter: addEventHanlder,
    pointerleave: addEventHanlder,
    click: addEventHanlder,
    dblclick: addEventHanlder,
    contextmenu: addEventHanlder,
    children: addChildrenHanlder
  },
  set: {
    lookAt: lookAtHandler,
    pointerdown: updateEventHandler,
    pointerup: updateEventHandler,
    pointermove: updateEventHandler,
    pointerenter: updateEventHandler,
    pointerleave: updateEventHandler,
    click: updateEventHandler,
    dblclick: updateEventHandler,
    contextmenu: updateEventHandler,
    parent: emptyHandler,
    children: {
      $reg: [
        {
          reg: new RegExp(".*"),
          handler: addChildrenHanlder
        }
      ]
    }
  },
  delete: {
    pointerdown: removeEventHandler,
    pointerup: removeEventHandler,
    pointermove: removeEventHandler,
    pointerenter: removeEventHandler,
    pointerleave: removeEventHandler,
    click: removeEventHandler,
    dblclick: removeEventHandler,
    contextmenu: removeEventHandler,
    children: removeChildrenHandler
  }
};
defineProcessor({
  configType: CONFIGTYPE.OBJECT3D,
  commands: objectCommands,
  create(config2, engine) {
    return objectCreate(new Object3D(), config2, {}, engine);
  },
  dispose: objectDispose
});
const cacheCameraMap = new WeakMap();
var PerspectiveCameraProcessor = defineProcessor({
  configType: CONFIGTYPE.PERSPECTIVECAMERA,
  commands: {
    add: __spreadValues({
      scale() {
      }
    }, objectCommands.add),
    set: __spreadProps(__spreadValues({
      scale() {
      },
      adaptiveWindow({ target, value, engine }) {
        if (value) {
          if (!cacheCameraMap.has(value)) {
            const fun = (event) => {
              target.aspect = event.width / event.height;
              target.updateProjectionMatrix();
            };
            cacheCameraMap.set(target, fun);
            engine.addEventListener("setSize", fun);
            fun({
              type: "setSize",
              width: engine.dom.offsetWidth,
              height: engine.dom.offsetHeight
            });
          }
        } else {
          const fun = cacheCameraMap.get(target);
          if (fun) {
            engine.removeEventListener("setSize", fun);
            cacheCameraMap.delete(target);
          }
        }
      }
    }, objectCommands.set), {
      $reg: [
        {
          reg: new RegExp("fov|aspect|near|far"),
          handler({ target, key, value }) {
            target[key] = value;
            target.updateProjectionMatrix();
          }
        }
      ]
    }),
    delete: __spreadValues({
      scale() {
      }
    }, objectCommands.delete)
  },
  create(config2, engine) {
    const camera = new PerspectiveCamera();
    objectCreate(camera, config2, {
      scale: true,
      adaptiveWindow: true
    }, engine);
    camera.updateProjectionMatrix();
    if (config2.adaptiveWindow) {
      const fun = (event) => {
        camera.aspect = event.width / event.height;
        camera.updateProjectionMatrix();
      };
      cacheCameraMap.set(camera, fun);
      engine.addEventListener("setSize", fun);
      fun({
        type: "setSize",
        width: engine.dom.offsetWidth,
        height: engine.dom.offsetHeight
      });
    }
    return camera;
  },
  dispose(camera) {
    cacheCameraMap.delete(camera);
    objectDispose(camera);
  }
});
var OrthographicCameraProcessor = defineProcessor({
  configType: CONFIGTYPE.ORTHOGRAPHICCAMERA,
  commands: {
    add: __spreadValues({
      scale() {
      }
    }, objectCommands.add),
    set: __spreadProps(__spreadValues({
      scale() {
      },
      adaptiveWindow({ target, value, engine }) {
        if (value) {
          if (!cacheCameraMap.has(value)) {
            const fun = (event) => {
              const width = event.width;
              const height = event.height;
              target.left = -width;
              target.right = width;
              target.top = height;
              target.bottom = -height;
              target.updateProjectionMatrix();
            };
            cacheCameraMap.set(target, fun);
            engine.addEventListener("setSize", fun);
            fun({
              type: "setSize",
              width: engine.dom.offsetWidth,
              height: engine.dom.offsetHeight
            });
          }
        } else {
          const fun = cacheCameraMap.get(target);
          if (fun) {
            engine.removeEventListener("setSize", fun);
            cacheCameraMap.delete(target);
          }
        }
      }
    }, objectCommands.set), {
      $reg: [
        {
          reg: new RegExp("left|right|top|bottom|near|far|zoom"),
          handler({ target, key, value }) {
            target[key] = value;
            target.updateProjectionMatrix();
          }
        }
      ]
    }),
    delete: __spreadValues({
      scale() {
      }
    }, objectCommands.delete)
  },
  create(config2, engine) {
    const camera = new OrthographicCamera(-50, 50, 50, -50);
    objectCreate(camera, config2, {
      scale: true,
      adaptiveWindow: true
    }, engine);
    camera.updateProjectionMatrix();
    if (config2.adaptiveWindow) {
      const fun = (event) => {
        const width = event.width;
        const height = event.height;
        camera.left = -width;
        camera.right = width;
        camera.top = height;
        camera.bottom = -height;
        camera.updateProjectionMatrix();
      };
      cacheCameraMap.set(camera, fun);
      engine.addEventListener("setSize", fun);
      fun({
        type: "setSize",
        width: engine.dom.offsetWidth,
        height: engine.dom.offsetHeight
      });
    }
    return camera;
  },
  dispose(camera) {
    cacheCameraMap.delete(camera);
    objectDispose(camera);
  }
});
class CameraCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.CAMERA);
  }
}
Compiler.processor(PerspectiveCameraProcessor);
Compiler.processor(OrthographicCameraProcessor);
var OrbitControlsProcessor = defineProcessor({
  configType: CONFIGTYPE.ORBITCONTROLS,
  commands: {
    set: {
      target({ target, config: config2, path, key, value }) {
        const targetConfig = config2.target;
        if (!config2.type) {
          config2.target = new Vector3(0, 0, 0);
          return;
        }
        if (typeof config2.target === "string")
          ;
        else {
          if (path.length > 1) {
            target.target[key] = value;
          } else {
            target.target = new Vector3(targetConfig.x, targetConfig.y, targetConfig.z);
          }
        }
      }
    }
  },
  create(config2, engine) {
    let controls;
    if (engine.orbitControls) {
      controls = engine.orbitControls;
    } else {
      controls = new VisOrbitControls();
      controls.setCamera(engine.camera);
      controls.setDom(engine.dom);
    }
    if (config2.target) {
      if (typeof config2.target === "string")
        ;
      else {
        controls.target = new Vector3(config2.target.x, config2.target.y, config2.target.z);
      }
    }
    syncObject(config2, controls, {
      target: true
    });
    return controls;
  },
  dispose(target) {
    target.dispose();
  }
});
var TransformControlsProcessor = defineProcessor({
  configType: CONFIGTYPE.TRNASFORMCONTROLS,
  commands: {
    set: {
      snapAllow({ target, config: config2, value }) {
        if (value) {
          target.translationSnap = config2.translationSnap;
          target.rotationSnap = config2.rotationSnap;
          target.scaleSnap = config2.scaleSnap;
        } else {
          target.translationSnap = null;
          target.rotationSnap = null;
          target.scaleSnap = null;
        }
      },
      translationSnap({ target, config: config2, value }) {
        if (config2.snapAllow) {
          target.translationSnap = value;
        }
      },
      rotationSnap({ target, config: config2, value }) {
        if (config2.snapAllow) {
          target.rotationSnap = value;
        }
      },
      scaleSnap({ target, config: config2, value }) {
        if (config2.snapAllow) {
          target.scaleSnap = value;
        }
      }
    }
  },
  create(config2, engine) {
    let control;
    if (engine.transformControls) {
      control = engine.transformControls;
    } else {
      control = new VisTransformControls();
      control.setCamera(engine.camera);
      control.setDom(engine.dom);
    }
    if (config2.snapAllow) {
      control.translationSnap = config2.translationSnap;
      control.rotationSnap = config2.rotationSnap;
      control.scaleSnap = config2.scaleSnap;
    }
    return control;
  },
  dispose(target) {
    target.dispose();
  }
});
class ControlsCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.CONTROLS);
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
    return super.useEngine(engine);
  }
}
Compiler.processor(OrbitControlsProcessor);
Compiler.processor(TransformControlsProcessor);
const getElement = function(element, engine) {
  const resourceMap = engine.resourceManager.resourceMap;
  if (!resourceMap.has(element)) {
    console.warn(`css3D compiler: can not found resource element: ${element}`);
    return document.createElement("div");
  }
  const resource = resourceMap.get(element);
  if (resource instanceof HTMLElement) {
    return resource;
  } else {
    console.warn(`css3D compiler can not suport render this resource type.`, resource.constructor, element);
    return document.createElement("div");
  }
};
var CSS3DObjectProcessor = defineProcessor({
  configType: CONFIGTYPE.CSS3DOBJECT,
  commands: {
    add: objectCommands.add,
    set: __spreadValues({
      element({ target, value, engine }) {
        target.element = getElement(value, engine);
      }
    }, objectCommands.set),
    delete: objectCommands.delete
  },
  create(config2, engine) {
    return objectCreate(new CSS3DObject(getElement(config2.element, engine)), config2, {
      element: true
    }, engine);
  },
  dispose: objectDispose
});
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
    __publicField(this, "cacheBox", new Box3());
    this.type = "CSS3DPlane";
    this.element.classList.add("vis-css3d", "vis-css3d-plane");
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
var CSS3DPlaneProcessor = defineProcessor({
  configType: CONFIGTYPE.CSS3DPLANE,
  commands: {
    add: objectCommands.add,
    set: __spreadValues({
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      }
    }, objectCommands.set),
    delete: objectCommands.delete
  },
  create(config2, engine) {
    return objectCreate(new CSS3DPlane(getElement(config2.element, engine)), config2, {
      element: true
    }, engine);
  },
  dispose: objectDispose
});
class VisCSS3DSprite extends CSS3DSprite {
  constructor(element = document.createElement("div")) {
    const root = document.createElement("div");
    const width = 50;
    const height = 50;
    root.style.width = `${width}px`;
    root.style.height = `${height}px`;
    root.appendChild(element);
    element.classList.add("vis-css3d", "vis-css3d-sprite");
    super(root);
    __publicField(this, "geometry");
    __publicField(this, "_width");
    __publicField(this, "_height");
    __publicField(this, "cacheBox", new Box3());
    __publicField(this, "cachePosition", new Vector3());
    __publicField(this, "cacheQuaternion", new Quaternion());
    __publicField(this, "cacheScale", new Vector3());
    __publicField(this, "cacheMatrix4", new Matrix4());
    __publicField(this, "rotateMatrix4", new Matrix4());
    this.geometry = new PlaneBufferGeometry(width, height);
    this.geometry.computeBoundingBox();
    this._width = width;
    this._height = height;
    this.type = "CSS3DSprite";
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
  raycast(raycaster, intersects) {
    const box = this.cacheBox.copy(this.geometry.boundingBox);
    this.matrixWorld.decompose(this.cachePosition, this.cacheQuaternion, this.cacheScale);
    const rotateMatrix4 = this.rotateMatrix4.lookAt(this.position, raycaster.camera.position, this.up);
    this.cacheQuaternion.setFromRotationMatrix(rotateMatrix4);
    this.cacheMatrix4.compose(this.cachePosition, this.cacheQuaternion, this.cacheScale);
    box.applyMatrix4(this.cacheMatrix4);
    if (raycaster.ray.intersectsBox(box)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(this.position),
        object: this,
        point: this.position
      });
    }
  }
}
var CSS3DSpriteProcessor = defineProcessor({
  configType: CONFIGTYPE.CSS3DSPRITE,
  commands: {
    add: objectCommands.add,
    set: __spreadValues({
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      }
    }, objectCommands.set),
    delete: objectCommands.delete
  },
  create(config2, engine) {
    return objectCreate(new VisCSS3DSprite(getElement(config2.element, engine)), config2, {
      element: true
    }, engine);
  },
  dispose: objectDispose
});
class CSS3DCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.CSS3D);
  }
}
Compiler.processor(CSS3DPlaneProcessor);
Compiler.processor(CSS3DObjectProcessor);
Compiler.processor(CSS3DSpriteProcessor);
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
class LineShapeGeometry extends ShapeBufferGeometry {
  constructor(path = [new Vector2(0, 0)], curveSegments = 12) {
    const lineShape = new Shape();
    const move = path[0];
    if (move) {
      lineShape.moveTo(move.x, move.y);
      for (let i = 1; i < path.length; i += 1) {
        lineShape.lineTo(path[i].x, path[i].y);
      }
    }
    super(lineShape, curveSegments);
    this.type = "LineShapeGeometry";
  }
}
const transfromAnchor = function(geometry, config2) {
  if (!(geometry instanceof CurveGeometry) && !(geometry instanceof TubeGeometry) && !(geometry instanceof ShapeGeometry)) {
    geometry.center();
  }
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const position = config2.position;
  const rotation = config2.rotation;
  const scale = config2.scale;
  const quaternion = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z, "XYZ"));
  geometry.applyQuaternion(quaternion);
  geometry.scale(scale.x, scale.y, scale.z);
  if (!(geometry instanceof CurveGeometry) && !(geometry instanceof TubeGeometry) && !(geometry instanceof ShapeGeometry)) {
    geometry.center();
  }
  geometry.computeBoundingBox();
  geometry.translate((box.max.x - box.min.x) / 2 * position.x, (box.max.y - box.min.y) / 2 * position.y, (box.max.z - box.min.z) / 2 * position.z);
  return geometry;
};
const commonRegCommand = {
  reg: new RegExp(".*"),
  handler({ config: config2, target, processor, engine }) {
    const newGeometry = processor.create(config2, engine);
    target.copy(newGeometry);
    target.dispatchEvent({
      type: "update"
    });
    target.uuid = newGeometry.uuid;
    newGeometry.dispose();
  }
};
const commands = {
  add: {
    groups({ target, value }) {
      target.addGroup(value.start, value.count, value.materialIndex);
    },
    $reg: [commonRegCommand]
  },
  set: {
    groups(params) {
      const { path, target, config: config2 } = params;
      if (path[1] !== void 0) {
        target.groups.splice(Number(params.path[1]), 1);
        const group = config2.groups[path[1]];
        target.addGroup(group.start, group.count, group.materialIndex);
      } else {
        console.warn(`geometry processor can not set group`, params);
      }
    },
    $reg: [commonRegCommand]
  },
  delete: {
    groups({ target, key }) {
      target.groups.splice(Number(key), 1);
    },
    $reg: [commonRegCommand]
  }
};
const create$2 = function(target, config2) {
  target.clearGroups();
  for (const group of config2.groups) {
    target.addGroup(group.start, group.count, group.materialIndex);
  }
  return transfromAnchor(target, config2);
};
const constructMap = new Map();
constructMap.set(CONFIGTYPE.BOXGEOMETRY, (config2) => {
  return new BoxBufferGeometry(config2.width, config2.height, config2.depth, config2.widthSegments, config2.heightSegments, config2.depthSegments);
});
constructMap.set(CONFIGTYPE.SPHEREGEOMETRY, (config2) => {
  return new SphereBufferGeometry(config2.radius, config2.widthSegments, config2.heightSegments, config2.phiStart, config2.phiLength, config2.thetaStart, config2.thetaLength);
});
constructMap.set(CONFIGTYPE.PLANEGEOMETRY, (config2) => {
  return new PlaneBufferGeometry(config2.width, config2.height, config2.widthSegments, config2.heightSegments);
});
constructMap.set(CONFIGTYPE.CIRCLEGEOMETRY, (config2) => {
  return new CircleBufferGeometry(config2.radius, config2.segments, config2.thetaStart, config2.thetaLength);
});
constructMap.set(CONFIGTYPE.CONEGEOMETRY, (config2) => {
  return new ConeBufferGeometry(config2.radius, config2.height, config2.radialSegments, config2.heightSegments, config2.openEnded, config2.thetaStart, config2.thetaLength);
});
constructMap.set(CONFIGTYPE.CYLINDERGEOMETRY, (config2) => {
  return new CylinderBufferGeometry(config2.radiusTop, config2.radiusBottom, config2.height, config2.radialSegments, config2.heightSegments, config2.openEnded, config2.thetaStart, config2.thetaLength);
});
constructMap.set(CONFIGTYPE.LINECURVEGEOMETRY, (config2) => {
  return new LineCurveGeometry(config2.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config2.divisions, config2.space);
});
constructMap.set(CONFIGTYPE.SPLINECURVEGEOMETRY, (config2) => {
  return new SplineCurveGeometry(config2.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config2.divisions, config2.space);
});
constructMap.set(CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY, (config2) => {
  return new CubicBezierCurveGeometry(config2.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config2.divisions, config2.space);
});
constructMap.set(CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY, (config2) => {
  return new QuadraticBezierCurveGeometry(config2.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config2.divisions, config2.space);
});
constructMap.set(CONFIGTYPE.LINETUBEGEOMETRY, (config2) => {
  return new LineTubeGeometry(config2.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config2.tubularSegments, config2.radius, config2.radialSegments, config2.closed);
});
constructMap.set(CONFIGTYPE.SPLINETUBEGEOMETRY, (config2) => {
  return new SplineTubeGeometry(config2.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config2.tubularSegments, config2.radius, config2.radialSegments, config2.closed);
});
constructMap.set(CONFIGTYPE.TORUSGEOMETRY, (config2) => {
  return new TorusGeometry(config2.radius, config2.tube, config2.radialSegments, config2.tubularSegments, config2.arc);
});
constructMap.set(CONFIGTYPE.RINGGEOMETRY, (config2) => {
  return new RingBufferGeometry(config2.innerRadius, config2.outerRadius, config2.thetaSegments, config2.phiSegments, config2.thetaStart, config2.thetaLength);
});
constructMap.set(CONFIGTYPE.LINESHAPEGEOMETRY, (config2) => {
  return new LineShapeGeometry(config2.path.map((vector2) => new Vector2(vector2.x, vector2.y)), config2.curveSegments);
});
const create$1 = function(config2) {
  if (!constructMap.has(config2.type)) {
    console.error(`parametric geometry can not support this type config: ${config2.type}`);
    return new BufferGeometry();
  }
  return create$2(constructMap.get(config2.type)(config2), config2);
};
const dispose$1 = function(target) {
  target.dispose();
};
const parametricProcessorFactory = function(configType) {
  return defineProcessor({
    configType,
    commands,
    create: create$1,
    dispose: dispose$1
  });
};
const ParametricGeometryList = [
  CONFIGTYPE.BOXGEOMETRY,
  CONFIGTYPE.SPHEREGEOMETRY,
  CONFIGTYPE.PLANEGEOMETRY,
  CONFIGTYPE.CIRCLEGEOMETRY,
  CONFIGTYPE.CONEGEOMETRY,
  CONFIGTYPE.CYLINDERGEOMETRY,
  CONFIGTYPE.LINECURVEGEOMETRY,
  CONFIGTYPE.SPLINECURVEGEOMETRY,
  CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY,
  CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY,
  CONFIGTYPE.LINETUBEGEOMETRY,
  CONFIGTYPE.SPLINETUBEGEOMETRY,
  CONFIGTYPE.TORUSGEOMETRY,
  CONFIGTYPE.RINGGEOMETRY,
  CONFIGTYPE.LINESHAPEGEOMETRY
];
const ParametricGeometryProcessors = ParametricGeometryList.map((type) => parametricProcessorFactory(type));
class LoadGeometry extends BufferGeometry {
  constructor(geometry) {
    super();
    __publicField(this, "type", "LoadBufferGeometry");
    geometry && this.copy(geometry);
  }
}
var LoadGeometryProcessor = defineProcessor({
  configType: CONFIGTYPE.LOADGEOMETRY,
  commands,
  create(config2, engine) {
    const originGeometry = engine.resourceManager.resourceMap.get(config2.url);
    if (!originGeometry && !(originGeometry instanceof BufferGeometry)) {
      console.error(`engine rescoure can not found url: ${config2.url}`);
      return new BoxBufferGeometry(5, 5, 5);
    }
    return create$2(new LoadGeometry(originGeometry), config2);
  },
  dispose(target) {
    target.dispose();
  }
});
const generateGeometry = function(attribute) {
  const geometry = new BufferGeometry();
  attribute.position.length && geometry.setAttribute("position", new Float32BufferAttribute(attribute.position, 3));
  attribute.color.length && geometry.setAttribute("color", new Float32BufferAttribute(attribute.color, 3));
  attribute.normal.length && geometry.setAttribute("normal", new Float32BufferAttribute(attribute.normal, 3));
  attribute.uv.length && geometry.setAttribute("uv", new Float32BufferAttribute(attribute.uv, 2));
  attribute.uv2.length && geometry.setAttribute("uv2", new Float32BufferAttribute(attribute.uv2, 2));
  attribute.index.length && geometry.setIndex(attribute.index);
  return geometry;
};
var CustomGeometryProcessor = defineProcessor({
  configType: CONFIGTYPE.CUSTOMGEOMETRY,
  commands,
  create(config2) {
    return create$2(generateGeometry(config2.attribute), config2);
  },
  dispose(target) {
    target.dispose();
  }
});
var EdgesGeometryProcessor = defineProcessor({
  configType: CONFIGTYPE.EDGESGEOMETRY,
  commands,
  create(config2, engine) {
    const geometry = engine.compilerManager.getObjectBySymbol(config2.url);
    if (!geometry || !(geometry instanceof BufferGeometry)) {
      console.error(`engine rescoure can not found url: ${config2.url}`);
      return new EdgesGeometry(new BoxBufferGeometry(5, 5, 5));
    }
    return create$2(new EdgesGeometry(geometry), config2);
  },
  dispose(target) {
    target.dispose();
  }
});
class GeometryCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.GEOMETRY);
  }
}
ParametricGeometryProcessors.forEach((processor) => {
  Compiler.processor(processor);
});
Compiler.processor(LoadGeometryProcessor);
Compiler.processor(CustomGeometryProcessor);
Compiler.processor(EdgesGeometryProcessor);
var GroupProcessor = defineProcessor({
  configType: CONFIGTYPE.GROUP,
  commands: objectCommands,
  create(config2, engine) {
    return objectCreate(new Group(), config2, {}, engine);
  },
  dispose: objectDispose
});
class GroupCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.GROUP);
  }
}
Compiler.processor(GroupProcessor);
const colorHandler = function({
  target,
  value
}) {
  target.color.copy(new Color(value));
};
const lightCreate = function(light, config2, filter, engine) {
  light.color.copy(new Color(config2.color));
  return objectCreate(light, config2, __spreadValues({
    color: true,
    scale: true,
    rotation: true,
    lookAt: true
  }, filter), engine);
};
const lightCommands = Object.assign({}, objectCommands, {
  set: {
    color: colorHandler,
    scale: emptyHandler,
    rotation: emptyHandler,
    lookAt: emptyHandler
  }
});
var AmbientLightProcessor = defineProcessor({
  configType: CONFIGTYPE.AMBIENTLIGHT,
  commands: lightCommands,
  create(config2, engine) {
    return lightCreate(new AmbientLight(), config2, {}, engine);
  },
  dispose: objectDispose
});
var DirectionalLightProcessor = defineProcessor({
  configType: CONFIGTYPE.DIRECTIONALLIGHT,
  commands: lightCommands,
  create(config2, engine) {
    return lightCreate(new DirectionalLight(), config2, {}, engine);
  },
  dispose: objectDispose
});
var PointLightProcessor = defineProcessor({
  configType: CONFIGTYPE.POINTLIGHT,
  commands: lightCommands,
  create(config2, engine) {
    return lightCreate(new PointLight(), config2, {}, engine);
  },
  dispose: objectDispose
});
var SpotLightProcessor = defineProcessor({
  configType: CONFIGTYPE.SPOTLIGHT,
  commands: lightCommands,
  create(config2, engine) {
    return lightCreate(new SpotLight(), config2, {}, engine);
  },
  dispose: objectDispose
});
class LightCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.LIGHT);
  }
}
Compiler.processor(AmbientLightProcessor);
Compiler.processor(DirectionalLightProcessor);
Compiler.processor(PointLightProcessor);
Compiler.processor(SpotLightProcessor);
class SolidObjectCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const replaceMaterial = new ShaderMaterial({
  fragmentShader: `
  void main () {
    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
  }
  `
});
const replaceGeometry = new BoxBufferGeometry(10, 10, 10);
const geometryHandler = function({ target, value, engine }) {
  const geometry = engine.compilerManager.getGeometry(value);
  if (!geometry) {
    console.warn(`can not found geometry by vid in engine: ${value}`);
    target.geometry = replaceGeometry;
    return;
  }
  target.geometry = geometry;
};
const materialHandler = function({ target, config: config2, engine }) {
  let material;
  if (typeof config2.material === "string") {
    material = engine.compilerManager.getMaterial(config2.material) || replaceMaterial;
  } else {
    material = config2.material.map((vid) => engine.compilerManager.getMaterial(vid) || replaceMaterial);
  }
  target.material = material;
};
const solidObjectCreate = function(object, config2, filter, engine) {
  if (!filter.geometry) {
    let geometry = engine.getObjectBySymbol(config2.geometry);
    if (!(geometry instanceof BufferGeometry)) {
      console.warn(`geometry vid in engine is not instance of BufferGeometry: ${config2.geometry}`, geometry);
      geometry = replaceGeometry;
    }
    object.geometry.dispose();
    object.geometry = geometry;
  }
  if (!filter.material) {
    let material;
    if (typeof config2.material === "string") {
      material = engine.compilerManager.getMaterial(config2.material) || replaceMaterial;
    } else {
      material = config2.material.map((vid) => engine.compilerManager.getMaterial(vid) || replaceMaterial);
    }
    object.material = material;
  }
  return objectCreate(object, config2, __spreadValues({
    geometry: true,
    material: true
  }, filter), engine);
};
const solidObjectDispose = function(target) {
  objectDispose(target);
};
const solidObjectCommands = {
  add: __spreadValues({
    material: materialHandler
  }, objectCommands.add),
  set: __spreadValues({
    geometry: geometryHandler,
    material: materialHandler
  }, objectCommands.set),
  delete: __spreadValues({
    material: materialHandler
  }, objectCommands.delete)
};
var LineProcessor = defineProcessor({
  configType: CONFIGTYPE.LINE,
  commands: solidObjectCommands,
  create(config2, engine) {
    return solidObjectCreate(new Line(), config2, {}, engine);
  },
  dispose: solidObjectDispose
});
class LineCompiler extends SolidObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.LINE);
  }
}
Compiler.processor(LineProcessor);
const commonNeedUpdatesRegCommand = {
  reg: new RegExp("transparent|sizeAttenuation"),
  handler({
    target,
    key,
    value
  }) {
    target[key] = value;
    target.needsUpdate = true;
  }
};
const commonMapRegCommand = {
  reg: new RegExp("map$", "i"),
  handler({
    target,
    key,
    value,
    engine
  }) {
    const texture = engine.compilerManager.getObjectBySymbol(value);
    if (!(texture instanceof Texture)) {
      console.warn(`this url resource is not instance of Texture: ${key}`, value, texture);
    }
    target[key] = texture;
    target.needsUpdate = true;
  }
};
const colorSetHandler = function({ target, key, value }) {
  target[key].copy(new Color(value));
};
const create = function(target, config2, engine) {
  const filter = {};
  for (const key of Object.keys(config2)) {
    if (key.toLocaleLowerCase().endsWith("map") && config2[key]) {
      const texture = engine.compilerManager.getObjectBySymbol(config2[key]);
      if (!(texture instanceof Texture)) {
        console.warn(`this url resource is not instance of Texture: ${key}`, config2[key], texture);
        continue;
      }
      target[key] = texture;
      filter[key] = true;
    } else if (target[key] instanceof Color) {
      target[key] = new Color(config2[key]);
      filter[key] = true;
    }
  }
  syncObject(config2, target, filter);
  target.needsUpdate = true;
  return target;
};
const dispose = function(target) {
  target.dispose();
};
var LineBasicMaterialProcessor = defineProcessor({
  configType: CONFIGTYPE.LINEBASICMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config2, engine) {
    return create(new LineBasicMaterial(), config2, engine);
  },
  dispose
});
var MeshBasicMaterialProcessor = defineProcessor({
  configType: CONFIGTYPE.MESHBASICMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config2, engine) {
    return create(new MeshBasicMaterial(), config2, engine);
  },
  dispose
});
var MeshPhongMaterialProcessor = defineProcessor({
  configType: CONFIGTYPE.MESHPHONGMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      specular: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config2, engine) {
    return create(new MeshPhongMaterial(), config2, engine);
  },
  dispose
});
var MeshPhysicalMaterialProcessor = defineProcessor({
  configType: CONFIGTYPE.MESHPHYSICALMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      specularColor: colorSetHandler,
      sheenColor: colorSetHandler,
      attenuationColor: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config2, engine) {
    return create(new MeshPhysicalMaterial(), config2, engine);
  },
  dispose
});
var MeshStandardMaterialProcessor = defineProcessor({
  configType: CONFIGTYPE.MESHSTANDARDMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config2, engine) {
    return create(new MeshStandardMaterial(), config2, engine);
  },
  dispose
});
var PointsMaterialProcessor = defineProcessor({
  configType: CONFIGTYPE.POINTSMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config2, engine) {
    return create(new PointsMaterial(), config2, engine);
  },
  dispose
});
var ShaderMaterialProcessor = defineProcessor({
  configType: CONFIGTYPE.SHADERMATERIAL,
  commands: {
    set: {
      shader({ target, value }) {
        const shader2 = ShaderLibrary.getShader(value);
        (shader2 == null ? void 0 : shader2.vertexShader) && (target.vertexShader = shader2.vertexShader);
        (shader2 == null ? void 0 : shader2.fragmentShader) && (target.fragmentShader = shader2.fragmentShader);
        (shader2 == null ? void 0 : shader2.uniforms) && (target.uniforms = shader2.uniforms);
        (shader2 == null ? void 0 : shader2.defines) && (target.defines = shader2.defines);
        target.needsUpdate = true;
      },
      $reg: [commonNeedUpdatesRegCommand]
    }
  },
  create: function(config2, engine) {
    const material = new ShaderMaterial();
    const shader2 = ShaderLibrary.getShader(config2.shader);
    (shader2 == null ? void 0 : shader2.vertexShader) && (material.vertexShader = shader2.vertexShader);
    (shader2 == null ? void 0 : shader2.fragmentShader) && (material.fragmentShader = shader2.fragmentShader);
    (shader2 == null ? void 0 : shader2.uniforms) && (material.uniforms = shader2.uniforms);
    (shader2 == null ? void 0 : shader2.defines) && (material.defines = shader2.defines);
    syncObject(config2, material, {
      type: true,
      shader: true
    });
    material.needsUpdate = true;
    return material;
  },
  dispose
});
var SpriteMaterialProcessor = defineProcessor({
  configType: CONFIGTYPE.SPRITEMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand]
    }
  },
  create: function(config2, engine) {
    return create(new SpriteMaterial(), config2, engine);
  },
  dispose
});
class MaterialCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.MATERIAL);
  }
}
Compiler.processor(MeshBasicMaterialProcessor);
Compiler.processor(MeshStandardMaterialProcessor);
Compiler.processor(MeshPhongMaterialProcessor);
Compiler.processor(LineBasicMaterialProcessor);
Compiler.processor(PointsMaterialProcessor);
Compiler.processor(SpriteMaterialProcessor);
Compiler.processor(LineBasicMaterialProcessor);
Compiler.processor(ShaderMaterialProcessor);
Compiler.processor(MeshPhysicalMaterialProcessor);
var MeshProcessor = defineProcessor({
  configType: CONFIGTYPE.MESH,
  commands: solidObjectCommands,
  create(config2, engine) {
    return solidObjectCreate(new Mesh(), config2, {}, engine);
  },
  dispose: solidObjectDispose
});
class MeshCompiler extends SolidObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.MESH);
  }
}
Compiler.processor(MeshProcessor);
var Object3DProcessor = defineProcessor({
  configType: CONFIGTYPE.OBJECT3D,
  commands: objectCommands,
  create(config2, engine) {
    return objectCreate(new Object3D(), config2, {}, engine);
  },
  dispose: objectDispose
});
class Object3DCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.OBJECT3D);
  }
}
Compiler.processor(Object3DProcessor);
var SMAAPassProcessor = defineProcessor({
  configType: CONFIGTYPE.SMAAPASS,
  create(config2, engine) {
    const pixelRatio = window.devicePixelRatio;
    const pass = new SMAAPass(engine.dom ? engine.dom.offsetWidth * pixelRatio : window.innerWidth * pixelRatio, engine.dom ? engine.dom.offsetHeight * pixelRatio : window.innerWidth * pixelRatio);
    return pass;
  },
  dispose(pass) {
  }
});
var UnrealBloomPassProcessor = defineProcessor({
  configType: CONFIGTYPE.UNREALBLOOMPASS,
  create(config2, engine) {
    const pixelRatio = window.devicePixelRatio;
    const pass = new UnrealBloomPass(new Vector2(engine.dom ? engine.dom.offsetWidth * pixelRatio : window.innerWidth * pixelRatio, engine.dom ? engine.dom.offsetHeight * pixelRatio : window.innerWidth * pixelRatio), config2.strength, config2.radius, config2.threshold);
    return pass;
  },
  dispose(pass) {
    pass.dispose();
  }
});
const LuminosityHighPassShader = {
  shaderID: "luminosityHighPass",
  uniforms: {
    "tDiffuse": { value: null },
    "luminosityThreshold": { value: 1 },
    "smoothWidth": { value: 1 },
    "defaultColor": { value: new Color(0) },
    "defaultOpacity": { value: 0 }
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
};
const _SelectiveBloomPass = class extends Pass$1 {
  constructor(resolution = new Vector2(256, 256), strength = 1, radius = 0, threshold = 0, renderScene = new Scene(), renderCamera = new PerspectiveCamera(), selectedObjects) {
    super();
    __publicField(this, "resolution");
    __publicField(this, "strength");
    __publicField(this, "radius");
    __publicField(this, "threshold");
    __publicField(this, "selectedObjects", []);
    __publicField(this, "renderScene");
    __publicField(this, "renderCamera");
    __publicField(this, "clearColor", new Color(0, 0, 0));
    __publicField(this, "renderTargetsHorizontal", []);
    __publicField(this, "renderTargetsVertical", []);
    __publicField(this, "nMips", 5);
    __publicField(this, "selectRenderTarget");
    __publicField(this, "renderTargetBright");
    __publicField(this, "highPassUniforms");
    __publicField(this, "materialHighPassFilter");
    __publicField(this, "separableBlurMaterials", []);
    __publicField(this, "compositeMaterial");
    __publicField(this, "bloomTintColors");
    __publicField(this, "mixMaterial");
    __publicField(this, "enabled", true);
    __publicField(this, "needsSwap", false);
    __publicField(this, "_oldClearColor", new Color());
    __publicField(this, "oldClearAlpha", 1);
    __publicField(this, "basic", new MeshBasicMaterial());
    __publicField(this, "fsQuad", new FullScreenQuad());
    __publicField(this, "materialCache", new Map());
    __publicField(this, "sceneBackgroundCache", null);
    __publicField(this, "overrideBackground", new Color("black"));
    __publicField(this, "overrideMeshMaterial", new MeshBasicMaterial({
      color: "black"
    }));
    __publicField(this, "overrideLineMaterial", new LineBasicMaterial({ color: "black" }));
    __publicField(this, "overridePointsMaterial", new PointsMaterial({ color: "black" }));
    __publicField(this, "overrideSpriteMaterial", new SpriteMaterial({ color: "black" }));
    this.resolution = resolution;
    this.strength = strength;
    this.radius = radius;
    this.threshold = threshold;
    this.renderScene = renderScene;
    this.renderCamera = renderCamera;
    this.selectedObjects = selectedObjects;
    let resx = Math.round(this.resolution.x / 2);
    let resy = Math.round(this.resolution.y / 2);
    this.selectRenderTarget = new WebGLRenderTarget(resx, resy);
    this.selectRenderTarget.texture.name = "UnrealBloomPass.selected";
    this.selectRenderTarget.texture.generateMipmaps = false;
    this.renderTargetBright = new WebGLRenderTarget(resx, resy);
    this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
    this.renderTargetBright.texture.generateMipmaps = false;
    for (let i = 0; i < this.nMips; i++) {
      const renderTargetHorizonal = new WebGLRenderTarget(resx, resy);
      renderTargetHorizonal.texture.name = "UnrealBloomPass.h" + i;
      renderTargetHorizonal.texture.generateMipmaps = false;
      this.renderTargetsHorizontal.push(renderTargetHorizonal);
      const renderTargetVertical = new WebGLRenderTarget(resx, resy);
      renderTargetVertical.texture.name = "UnrealBloomPass.v" + i;
      renderTargetVertical.texture.generateMipmaps = false;
      this.renderTargetsVertical.push(renderTargetVertical);
      resx = Math.round(resx / 2);
      resy = Math.round(resy / 2);
    }
    if (LuminosityHighPassShader === void 0)
      console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");
    const highPassShader = LuminosityHighPassShader;
    this.highPassUniforms = UniformsUtils.clone(highPassShader.uniforms);
    this.highPassUniforms["luminosityThreshold"].value = threshold;
    this.highPassUniforms["smoothWidth"].value = 0.01;
    this.materialHighPassFilter = new ShaderMaterial({
      uniforms: this.highPassUniforms,
      vertexShader: highPassShader.vertexShader,
      fragmentShader: highPassShader.fragmentShader,
      defines: {}
    });
    const kernelSizeArray = [3, 5, 7, 9, 11];
    resx = Math.round(this.resolution.x / 2);
    resy = Math.round(this.resolution.y / 2);
    for (let i = 0; i < this.nMips; i++) {
      this.separableBlurMaterials.push(this.getSeperableBlurMaterial(kernelSizeArray[i]));
      this.separableBlurMaterials[i].uniforms["texSize"].value = new Vector2(resx, resy);
      resx = Math.round(resx / 2);
      resy = Math.round(resy / 2);
    }
    this.compositeMaterial = this.getCompositeMaterial(this.nMips);
    this.compositeMaterial.uniforms["blurTexture1"].value = this.renderTargetsVertical[0].texture;
    this.compositeMaterial.uniforms["blurTexture2"].value = this.renderTargetsVertical[1].texture;
    this.compositeMaterial.uniforms["blurTexture3"].value = this.renderTargetsVertical[2].texture;
    this.compositeMaterial.uniforms["blurTexture4"].value = this.renderTargetsVertical[3].texture;
    this.compositeMaterial.uniforms["blurTexture5"].value = this.renderTargetsVertical[4].texture;
    this.compositeMaterial.uniforms["bloomStrength"].value = strength;
    this.compositeMaterial.uniforms["bloomRadius"].value = 0.1;
    this.compositeMaterial.needsUpdate = true;
    const bloomFactors = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms["bloomFactors"].value = bloomFactors;
    this.bloomTintColors = [
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 1)
    ];
    this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
    this.mixMaterial = this.getMixMaterial();
  }
  dispose() {
    for (let i = 0; i < this.renderTargetsHorizontal.length; i++) {
      this.renderTargetsHorizontal[i].dispose();
    }
    for (let i = 0; i < this.renderTargetsVertical.length; i++) {
      this.renderTargetsVertical[i].dispose();
    }
    this.renderTargetBright.dispose();
  }
  setSize(width, height) {
    let resx = Math.round(width / 2);
    let resy = Math.round(height / 2);
    this.selectRenderTarget.setSize(resx, resy);
    this.renderTargetBright.setSize(resx, resy);
    for (let i = 0; i < this.nMips; i++) {
      this.renderTargetsHorizontal[i].setSize(resx, resy);
      this.renderTargetsVertical[i].setSize(resx, resy);
      this.separableBlurMaterials[i].uniforms["texSize"].value = new Vector2(resx, resy);
      resx = Math.round(resx / 2);
      resy = Math.round(resy / 2);
    }
  }
  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    if (!this.selectedObjects.length) {
      if (this.renderToScreen) {
        this.fsQuad.material = this.basic;
        this.basic.map = readBuffer.texture;
        renderer.setRenderTarget(null);
        renderer.clear();
        this.fsQuad.render(renderer);
      }
      return;
    }
    renderer.getClearColor(this._oldClearColor);
    this.oldClearAlpha = renderer.getClearAlpha();
    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.setClearColor(this.clearColor, 0);
    if (maskActive)
      renderer.state.buffers.stencil.setTest(false);
    const selectedObjectsMap = new Map();
    for (const object of this.selectedObjects) {
      selectedObjectsMap.set(object, true);
    }
    const materialCache = this.materialCache;
    if (this.renderScene.background) {
      this.sceneBackgroundCache = this.renderScene.background;
      this.renderScene.background = this.overrideBackground;
    }
    this.renderScene.traverse((object) => {
      if (!selectedObjectsMap.has(object) && !object.isLight && object.visible) {
        materialCache.set(object, object.material);
        if (object instanceof Mesh) {
          object.material = this.overrideMeshMaterial;
        } else if (object instanceof Line) {
          object.material = this.overrideLineMaterial;
        } else if (object instanceof Points) {
          object.material = this.overridePointsMaterial;
        } else if (object instanceof Sprite) {
          object.material = this.overrideSpriteMaterial;
        }
      }
    });
    renderer.setRenderTarget(this.selectRenderTarget);
    renderer.clear();
    renderer.render(this.renderScene, this.renderCamera);
    if (this.renderToScreen) {
      this.fsQuad.material = this.basic;
      this.basic.map = this.selectRenderTarget.texture;
      renderer.setRenderTarget(null);
      renderer.clear();
      this.fsQuad.render(renderer);
    }
    this.highPassUniforms["tDiffuse"].value = this.selectRenderTarget.texture;
    this.highPassUniforms["luminosityThreshold"].value = this.threshold;
    this.fsQuad.material = this.materialHighPassFilter;
    renderer.setRenderTarget(this.renderTargetBright);
    renderer.clear();
    this.fsQuad.render(renderer);
    let inputRenderTarget = this.renderTargetBright;
    for (let i = 0; i < this.nMips; i++) {
      this.fsQuad.material = this.separableBlurMaterials[i];
      this.separableBlurMaterials[i].uniforms["colorTexture"].value = inputRenderTarget.texture;
      this.separableBlurMaterials[i].uniforms["direction"].value = _SelectiveBloomPass.BlurDirectionX;
      renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
      renderer.clear();
      this.fsQuad.render(renderer);
      this.separableBlurMaterials[i].uniforms["colorTexture"].value = this.renderTargetsHorizontal[i].texture;
      this.separableBlurMaterials[i].uniforms["direction"].value = _SelectiveBloomPass.BlurDirectionY;
      renderer.setRenderTarget(this.renderTargetsVertical[i]);
      renderer.clear();
      this.fsQuad.render(renderer);
      inputRenderTarget = this.renderTargetsVertical[i];
    }
    this.fsQuad.material = this.compositeMaterial;
    this.compositeMaterial.uniforms["bloomStrength"].value = this.strength;
    this.compositeMaterial.uniforms["bloomRadius"].value = this.radius;
    this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
    renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
    renderer.clear();
    this.fsQuad.render(renderer);
    this.fsQuad.material = this.mixMaterial;
    this.mixMaterial.uniforms["bloom"].value = this.renderTargetsHorizontal[0].texture;
    this.mixMaterial.uniforms["origin"].value = readBuffer.texture;
    if (maskActive)
      renderer.state.buffers.stencil.setTest(true);
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(readBuffer);
      this.fsQuad.render(renderer);
    }
    renderer.setClearColor(this._oldClearColor, this.oldClearAlpha);
    renderer.autoClear = oldAutoClear;
    for (const entry of materialCache.entries()) {
      entry[0].material = entry[1];
    }
    materialCache.clear();
    if (this.sceneBackgroundCache) {
      this.renderScene.background = this.sceneBackgroundCache;
      this.sceneBackgroundCache = null;
    }
  }
  getMixMaterial() {
    return new ShaderMaterial({
      blending: AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      uniforms: {
        bloom: { value: null },
        origin: { value: null }
      },
      vertexShader: `
    
        varying vec2 vUv;
    
        void main() {
    
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    
        }`,
      fragmentShader: `
        uniform sampler2D bloom;
        uniform sampler2D origin;
    
        varying vec2 vUv;
    
        void main() {
          vec3 bloomColor = texture2D(bloom, vUv).rgb;
          vec3 originColor = texture2D(origin, vUv).rgb;
          gl_FragColor = vec4(originColor + bloomColor, 1.0);
        }`
    });
  }
  getSeperableBlurMaterial(kernelRadius) {
    return new ShaderMaterial({
      defines: {
        KERNEL_RADIUS: kernelRadius,
        SIGMA: kernelRadius
      },
      uniforms: {
        colorTexture: { value: null },
        texSize: { value: new Vector2(0.5, 0.5) },
        direction: { value: new Vector2(0.5, 0.5) }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
    });
  }
  getCompositeMaterial(nMips) {
    return new ShaderMaterial({
      defines: {
        NUM_MIPS: nMips
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
    });
  }
};
let SelectiveBloomPass = _SelectiveBloomPass;
__publicField(SelectiveBloomPass, "BlurDirectionX", new Vector2(1, 0));
__publicField(SelectiveBloomPass, "BlurDirectionY", new Vector2(0, 1));
var SelectiveBloomPassProcessor = defineProcessor({
  configType: CONFIGTYPE.SELECTIVEBLOOMPASS,
  commands: {
    add: {
      selectedObjects({ target, engine, value }) {
        const object = engine.compilerManager.getObject3D(value);
        if (object) {
          target.selectedObjects.push(object);
        } else {
          console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${value}`);
        }
      }
    },
    set: {
      renderScene({ target, engine, value }) {
        const object = engine.compilerManager.getObject3D(value);
        if (object instanceof Scene) {
          target.renderScene = object;
        }
      },
      renderCamera({ target, engine, value }) {
        const object = engine.compilerManager.getObject3D(value);
        if (object instanceof Camera) {
          target.renderCamera = object;
        }
      },
      selectedObjects({ target, config: config2, engine }) {
        const objects = config2.selectedObjects.map((vid) => {
          const object = engine.compilerManager.getObject3D(vid);
          if (object) {
            return object;
          } else {
            console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${vid}`);
            return void 0;
          }
        }).filter((object) => object);
        target.selectedObjects = objects;
      }
    },
    delete: {
      selectedObjects({ target, engine, value }) {
        const object = engine.compilerManager.getObject3D(value);
        if (object) {
          if (target.selectedObjects.includes(object)) {
            target.selectedObjects.splice(target.selectedObjects.indexOf(object), 1);
          }
        } else {
          console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${value}`);
        }
      }
    }
  },
  create(config2, engine) {
    const objects = [];
    for (const vid of config2.selectedObjects) {
      const object = engine.compilerManager.getObject3D(vid);
      object && objects.push(object);
    }
    const pixelRatio = window.devicePixelRatio;
    const pass = new SelectiveBloomPass(new Vector2(engine.dom ? engine.dom.offsetWidth * pixelRatio : window.innerWidth * pixelRatio, engine.dom ? engine.dom.offsetHeight * pixelRatio : window.innerWidth * pixelRatio), config2.strength, config2.radius, config2.threshold, config2.renderScene && engine.compilerManager.getObject3D(config2.renderScene) || void 0, config2.renderCamera && engine.compilerManager.getObject3D(config2.renderCamera) || void 0, objects);
    return pass;
  },
  dispose(target) {
    target.dispose();
  }
});
class PassCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.PASS);
    __publicField(this, "composer");
  }
  useEngine(engine) {
    super.useEngine(engine);
    if (!engine.effectComposer) {
      console.warn(`engine need install effectComposer plugin that can use pass compiler.`);
      return this;
    }
    this.composer = engine.effectComposer;
    return this;
  }
  add(config2) {
    const pass = super.add(config2);
    pass && this.composer.addPass(pass);
    return pass;
  }
  remove(config2) {
    if (!this.map.has(config2.vid)) {
      console.warn(`PassCompiler can not found this vid pass: ${config2.vid}.`);
      return this;
    }
    const pass = this.map.get(config2.vid);
    this.composer.removePass(pass);
    super.remove(config2);
    return this;
  }
}
Compiler.processor(SMAAPassProcessor);
Compiler.processor(UnrealBloomPassProcessor);
Compiler.processor(SelectiveBloomPassProcessor);
var PointsProcessor = defineProcessor({
  configType: CONFIGTYPE.POINTS,
  commands: solidObjectCommands,
  create(config2, engine) {
    return solidObjectCreate(new Points(), config2, {}, engine);
  },
  dispose: solidObjectDispose
});
class PointsCompiler extends SolidObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.POINTS);
  }
}
Compiler.processor(PointsProcessor);
var WebGLRendererProcessor = defineProcessor({
  configType: CONFIGTYPE.WEBGLRENDERER,
  commands: {
    set: {
      size({ target, config: config2 }) {
        if (!config2.size) {
          target.setSize(target.domElement.offsetWidth, target.domElement.offsetHeight);
        } else {
          target.setSize(config2.size.x, config2.size.y);
        }
      },
      clearColor({ target, value }) {
        const alpha = Number(value.slice(0, -1).split(",").pop().trim());
        target.setClearColor(value, alpha);
        target.clear();
      },
      viewport({ target, config: config2 }) {
        const viewport = config2.viewport;
        if (viewport) {
          target.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
        } else {
          const domElement = target.domElement;
          target.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight);
        }
      },
      scissor({ target, config: config2 }) {
        const scissor = config2.scissor;
        if (scissor) {
          target.setScissorTest(true);
          target.setScissor(scissor.x, scissor.y, scissor.width, scissor.height);
        } else {
          target.setScissorTest(false);
          const domElement = target.domElement;
          target.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight);
        }
      },
      pixelRatio({ target, value }) {
        target.setPixelRatio(value);
        target.clear();
      }
    }
  },
  create(config2, engine) {
    let renderer;
    if (engine.webGLRenderer) {
      renderer = engine.webGLRenderer;
    } else {
      renderer = new WebGLRenderer();
    }
    if (config2.size) {
      renderer.setSize(config2.size.x, config2.size.y);
    }
    if (config2.clearColor) {
      const alpha = Number(config2.clearColor.slice(0, -1).split(",").pop().trim());
      renderer.setClearColor(config2.clearColor, alpha);
    }
    if (config2.viewport) {
      const viewport = config2.viewport;
      renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
    }
    if (config2.scissor) {
      const scissor = config2.scissor;
      renderer.setScissorTest(true);
      renderer.setScissor(scissor.x, scissor.y, scissor.width, scissor.height);
    }
    if (config2.pixelRatio) {
      renderer.setPixelRatio(config2.pixelRatio);
    }
    syncObject(config2, renderer, {
      size: true,
      clearColor: true,
      viewport: true,
      scissor: true,
      pixelRatio: true
    });
    return renderer;
  },
  dispose(renderer) {
    renderer.clear();
    renderer.dispose();
  }
});
var CSS3DRendererProcessor = defineProcessor({
  configType: CONFIGTYPE.CSS3DRENDERER,
  commands: {
    set: {
      size({ target, config: config2 }) {
        if (!config2.size) {
          target.setSize(target.domElement.offsetWidth, target.domElement.offsetHeight);
        } else {
          target.setSize(config2.size.x, config2.size.y);
        }
      }
    }
  },
  create(config2, engine) {
    let renderer;
    if (engine.css3DRenderer) {
      renderer = engine.css3DRenderer;
    } else {
      renderer = new CSS3DRenderer();
    }
    if (config2.size) {
      renderer.setSize(config2.size.x, config2.size.y);
    }
    syncObject(config2, renderer, {
      size: true
    });
    return renderer;
  },
  dispose(target) {
  }
});
class RendererCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.RENDERER);
  }
  useEngine(engine) {
    if (engine.webGLRenderer) {
      this.map.set(CONFIGTYPE.WEBGLRENDERER, engine.webGLRenderer);
    }
    if (engine.css3DRenderer) {
      this.map.set(CONFIGTYPE.CSS3DRENDERER, engine.css3DRenderer);
    }
    return super.useEngine(engine);
  }
}
Compiler.processor(WebGLRendererProcessor);
Compiler.processor(CSS3DRendererProcessor);
const setBackground = function(scene, value, engine) {
  if (!value) {
    scene.background = null;
    return;
  }
  if (validate(value)) {
    const texture = engine.compilerManager.getTexture(value);
    if (texture) {
      scene.background = texture;
    } else {
      console.warn(`engine can not found this vid texture : '${value}'`);
    }
  } else {
    scene.background = new Color(value);
  }
};
const setEnvironment = function(scene, value, engine) {
  if (!value) {
    scene.environment = null;
    return;
  }
  if (validate(value)) {
    const texture = engine.compilerManager.getTexture(value);
    if (texture) {
      scene.environment = texture;
    } else {
      console.warn(`engine can not found this vid texture : '${value}'`);
    }
  } else {
    console.warn(`scene environment is illeage: ${value}`);
  }
};
var SceneProcessor = defineProcessor({
  configType: CONFIGTYPE.SCENE,
  commands: {
    add: objectCommands.add,
    set: __spreadProps(__spreadValues({}, objectCommands.set), {
      lookAt() {
      },
      fog({ target, config: config2, key, value }) {
        const fog = config2.fog;
        if (!fog.type) {
          target.fog = null;
        } else if (fog.type === "Fog") {
          if (!target.fog || !(target.fog instanceof Fog)) {
            target.fog = new Fog(fog.color, fog.near, fog.far);
          } else {
            if (key === "color") {
              target.fog.color.copy(new Color(fog.color));
            } else {
              target.fog[key] && (target.fog[key] = value);
            }
          }
        } else if (fog.type === "FogExp2") {
          if (!target.fog || !(target.fog instanceof FogExp2)) {
            target.fog = new FogExp2(fog.color, fog.density);
          } else {
            if (key === "color") {
              target.fog.color.copy(new Color(fog.color));
            } else {
              target.fog[key] && (target.fog[key] = value);
            }
          }
        }
      },
      background({ target, value, engine }) {
        setBackground(target, value, engine);
      },
      environment({ target, value, engine }) {
        setEnvironment(target, value, engine);
      }
    }),
    delete: objectCommands.delete
  },
  create(config2, engine) {
    const scene = new Scene();
    setBackground(scene, config2.background, engine);
    setEnvironment(scene, config2.environment, engine);
    if (config2.fog.type) {
      const fog = config2.fog;
      if (fog.type === "Fog") {
        scene.fog = new Fog(fog.color, fog.near, fog.far);
      } else if (fog.type === "FogExp2") {
        scene.fog = new FogExp2(fog.color, fog.density);
      } else {
        console.warn(`scene processor can not support this type fog:'${config2.type}'`);
      }
    }
    return objectCreate(scene, config2, {
      lookAt: true,
      background: true,
      environment: true,
      fog: true
    }, engine);
  },
  dispose: objectDispose
});
class SceneCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.SCENE);
  }
}
Compiler.processor(SceneProcessor);
const spriteReplaceMaterial = new SpriteMaterial({
  color: "rgb(123, 123, 123)"
});
var SpriteProcessor = defineProcessor({
  configType: CONFIGTYPE.SPRITE,
  commands: {
    add: solidObjectCommands.add,
    set: __spreadProps(__spreadValues({
      lookAt() {
      }
    }, solidObjectCommands.set), {
      material({ target, engine, value }) {
        const material = engine.compilerManager.getMaterial(value);
        if (material && material instanceof SpriteMaterial) {
          target.material = material;
        } else {
          target.material = spriteReplaceMaterial;
        }
      }
    }),
    delete: solidObjectCommands.add
  },
  create(config2, engine) {
    const sprite = new Sprite();
    const material = engine.compilerManager.getMaterial(config2.material);
    if (material && material instanceof SpriteMaterial) {
      sprite.material = material;
    } else {
      sprite.material = spriteReplaceMaterial;
    }
    return solidObjectCreate(sprite, config2, {
      geometry: true,
      material: true,
      lookAt: true
    }, engine);
  },
  dispose: solidObjectDispose
});
class SpriteCompiler extends SolidObjectCompiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.SPRITE);
  }
}
Compiler.processor(SpriteProcessor);
class ImageTexture extends Texture {
  constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    super(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
  }
}
const needUpdateRegCommand = {
  reg: new RegExp("wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping"),
  handler({ target, key, value }) {
    target[key] = value;
    target.needsUpdate = true;
  }
};
var ImageTextureProcessor = defineProcessor({
  configType: CONFIGTYPE.IMAGETEXTURE,
  commands: {
    set: {
      url({ target, value, engine }) {
        target.image = engine.compilerManager.textureCompiler.getResource(value, HTMLImageElement);
        target.needsUpdate = true;
      },
      $reg: [needUpdateRegCommand]
    }
  },
  create(config2, engine) {
    const texture = new ImageTexture();
    if (config2.url) {
      texture.image = engine.compilerManager.textureCompiler.getResource(config2.url, HTMLImageElement);
    }
    syncObject(config2, texture, {
      type: true,
      url: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
var CanvasTextureProcessor = defineProcessor({
  configType: CONFIGTYPE.CANVASTEXTURE,
  commands: {
    set: {
      url({ target, value, engine }) {
        target.image = engine.compilerManager.textureCompiler.getResource(value, HTMLCanvasElement);
        target.needsUpdate = true;
      },
      $reg: [needUpdateRegCommand]
    }
  },
  create(config2, engine) {
    const texture = new CanvasTexture(engine.compilerManager.textureCompiler.getResource(config2.url, HTMLCanvasElement));
    syncObject(config2, texture, {
      type: true,
      url: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
const instanceClasses = [HTMLImageElement, HTMLVideoElement, HTMLCanvasElement];
const imageHanlder = function({ target, index, value, engine }) {
  target.images[index] = engine.compilerManager.textureCompiler.getResource(value, instanceClasses);
  target.needsUpdate = true;
};
var CubeTextureProcessor = defineProcessor({
  configType: CONFIGTYPE.CUBETEXTURE,
  commands: {
    set: {
      cube: {
        px({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 0
          });
        },
        nx({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 1
          });
        },
        py({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 2
          });
        },
        ny({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 3
          });
        },
        pz({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 4
          });
        },
        nz({ target, value, engine }) {
          imageHanlder({
            target,
            value,
            engine,
            index: 5
          });
        }
      }
    }
  },
  create(config2, engine) {
    const texture = new CubeTexture();
    const cube = config2.cube;
    const compiler = engine.compilerManager.textureCompiler;
    const images = [
      compiler.getResource(cube.px, instanceClasses),
      compiler.getResource(cube.nx, instanceClasses),
      compiler.getResource(cube.py, instanceClasses),
      compiler.getResource(cube.ny, instanceClasses),
      compiler.getResource(cube.pz, instanceClasses),
      compiler.getResource(cube.nz, instanceClasses)
    ];
    texture.image = images;
    syncObject(config2, texture, {
      type: true,
      cube: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
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
var VideoTextureProcessor = defineProcessor({
  configType: CONFIGTYPE.VIDEOTEXTURE,
  commands: {
    set: {
      url({ target, value, engine }) {
        target.image = engine.compilerManager.textureCompiler.getResource(value, HTMLVideoElement);
        target.needsUpdate = true;
      },
      $reg: [needUpdateRegCommand]
    }
  },
  create(config2, engine) {
    const texture = new VideoTexture(document.createElement("video"));
    if (config2.url) {
      texture.image = engine.compilerManager.textureCompiler.getResource(config2.url, HTMLVideoElement);
    }
    syncObject(config2, texture, {
      type: true,
      url: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
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
class LoadTexture extends Texture {
  constructor(texture) {
    super();
    Object.keys(texture).forEach((key) => {
      this[key] = texture[key];
    });
    this.copy(texture);
  }
}
var LoadTextureProcessor = defineProcessor({
  configType: CONFIGTYPE.LOADTEXTURE,
  commands: {
    set: {
      url({}) {
      },
      $reg: [needUpdateRegCommand]
    }
  },
  create(config2, engine) {
    let texture;
    const resource = engine.compilerManager.textureCompiler.getResource(config2.url, Texture);
    if (resource instanceof Texture) {
      texture = new LoadTexture(resource);
    } else {
      const tempTexture = new Texture(resource);
      texture = new LoadTexture(tempTexture);
    }
    syncObject(config2, texture, {
      type: true,
      url: true
    });
    texture.needsUpdate = true;
    return texture;
  },
  dispose(target) {
    target.dispose();
  }
});
const _TextureCompiler = class extends Compiler {
  constructor() {
    super();
    __publicField(this, "MODULE", MODULETYPE.TEXTURE);
  }
  getResource(url, instanceClasses2) {
    const resourceMap = this.engine.resourceManager.resourceMap;
    if (!resourceMap.has(url)) {
      console.warn(`engine resourceManager can not found this url: ${url}`);
      return _TextureCompiler.replaceImage;
    }
    const resource = resourceMap.get(url);
    if (Array.isArray(instanceClasses2)) {
      for (const instanceClass of instanceClasses2) {
        if (resource instanceof instanceClass) {
          return resource;
        }
      }
      console.warn(`this url mapping resource is not a texture image class: ${url}`, resource);
      return _TextureCompiler.replaceImage;
    } else {
      if (resource instanceof instanceClasses2) {
        return resource;
      } else {
        console.warn(`this url mapping resource is not a texture image class: ${url}`, resource);
        return _TextureCompiler.replaceImage;
      }
    }
  }
};
let TextureCompiler = _TextureCompiler;
__publicField(TextureCompiler, "replaceImage", new CanvasGenerator({
  width: 512,
  height: 512
}).draw((ctx) => {
  ctx.translate(256, 256);
  ctx.font = "72px";
  ctx.fillStyle = "white";
  ctx.fillText("\u6682\u65E0\u56FE\u7247", 0, 0);
}).getDom());
Compiler.processor(ImageTextureProcessor);
Compiler.processor(CanvasTextureProcessor);
Compiler.processor(CubeTextureProcessor);
Compiler.processor(VideoTextureProcessor);
Compiler.processor(LoadTextureProcessor);
class CompilerManager {
  constructor(parameters) {
    __publicField(this, "object3DCompiler", new Object3DCompiler());
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
    const dataSupportManager = engine.dataSupportManager;
    dataSupportManager.textureDataSupport.addCompiler(this.textureCompiler);
    dataSupportManager.materialDataSupport.addCompiler(this.materialCompiler);
    dataSupportManager.geometryDataSupport.addCompiler(this.geometryCompiler);
    dataSupportManager.rendererDataSupport.addCompiler(this.rendererCompiler);
    dataSupportManager.controlsDataSupport.addCompiler(this.controlsCompiler);
    dataSupportManager.passDataSupport.addCompiler(this.passCompiler);
    dataSupportManager.object3DDataSupport.addCompiler(this.object3DCompiler);
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
  getObject3D(vid) {
    for (const compiler of this.compilerMap.values()) {
      if (compiler instanceof ObjectCompiler) {
        if (compiler.map.has(vid)) {
          return compiler.map.get(vid);
        }
      }
    }
    return null;
  }
  getGeometry(vid) {
    return this.geometryCompiler.map.get(vid) || null;
  }
  getMaterial(vid) {
    return this.materialCompiler.map.get(vid) || null;
  }
  getTexture(vid) {
    return this.textureCompiler.map.get(vid) || null;
  }
  dispose() {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose();
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
      [CONFIGTYPE.CSS3DPLANE]: CSS3DPlaneHelper,
      [CONFIGTYPE.CSS3DSPRITE]: CSS3DPlaneHelper
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
      this.scene.traverse((object) => {
        if (helperMap.has(object)) {
          this.scene.add(helperMap.get(object));
        }
      });
    } else {
      this.scene.traverse((object) => {
        if (helperMap.has(object)) {
          this.scene.remove(helperMap.get(object));
        }
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
  this.addEventListener("setScene", (event) => {
    const oldScene = event.oldScene;
    oldScene.traverse((object) => {
      if (object instanceof CSS3DObject) {
        object.element.style.display = "none";
      }
    });
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
  setCamera(camera, options) {
    if (typeof camera === "object" && camera instanceof Camera) {
      this.camera = camera;
      this.dispatchEvent({
        type: "setCamera",
        camera,
        options: Object.assign({
          orbitControls: true,
          transformControls: true
        }, options || {})
      });
    } else {
      if (this.IS_ENGINESUPPORT) {
        const target = this.compilerManager.getObjectBySymbol(camera);
        if (target) {
          this.camera = target;
          this.dispatchEvent({
            type: "setCamera",
            camera: target,
            options: Object.assign({
              orbitControls: true,
              transformControls: true
            }, options || {})
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
      this.dispatchEvent({
        type: "setScene",
        scene,
        oldScene: this.scene
      });
      this.scene = scene;
    } else {
      if (this.IS_ENGINESUPPORT) {
        const target = this.compilerManager.getObjectBySymbol(scene);
        if (target) {
          this.dispatchEvent({
            type: "setScene",
            scene: target,
            oldScene: this.scene
          });
          this.scene = target;
        } else {
          console.warn(`can not found scene in compilerManager: ${scene}`);
        }
      } else {
        console.warn(`engine is not a Engine support but use symbol to found scene.`);
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
class SupportDataGenerator {
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
    if (getModule(config2.type) !== this.supportDataType) {
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
}
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
  getDataURL(mine) {
    return this.renderer.domElement.toDataURL(mine || "image/png");
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
  getDataURL(mine) {
    return this.renderer.domElement.toDataURL(mine || "image/png");
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
class Modifier {
  constructor(parameters) {
    __publicField(this, "visible", true);
    parameters.visible && (this.visible = parameters.visible);
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
  apply() {
    this.originalGeometry.copy(this.modifiedGeometry);
    this.originalGeometry.uuid = this.modifiedGeometry.uuid;
    this.source.geometry = this.originalGeometry;
  }
  dispose() {
    this.source.geometry = this.originalGeometry;
    this.modifiedGeometry.dispose();
  }
}
class Action {
  next() {
    console.warn(`this action can not set next function: ${this.constructor.name}`);
  }
  prev() {
    console.warn(`this action can not set prev function: ${this.constructor.name}`);
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
const version = "0.2.3";
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
export { Action, AniScriptLibrary, AnimationDataSupport, BooleanModifier, CONFIGMODULE, CONFIGTYPE, CSS3DDataSupport, CSS3DPlane, CameraDataSupport, CameraHelper, CanvasGenerator, ControlsDataSupport, DISPLAYMODE, DataSupportManager, DirectionalLightHelper, DisplayEngine, DisplayEngineSupport, ENGINEPLUGIN, EVENTNAME, Engine, EngineSupport, EventDispatcher, EventLibrary, GeometryDataSupport, GroupDataSupport, GroupHelper, History, JSONHandler, KeyboardManager, LightDataSupport, LineDataSupport, LoaderManager, MODULETYPE, MaterialDataSupport, MaterialDisplayer, MeshDataSupport, ModelingEngine, ModelingEngineSupport, OBJECTMODULE, PassDataSupport, PointLightHelper, PointsDataSupport, ProxyBroadcast, RESOURCEEVENTTYPE, RenderManager, RendererDataSupport, ResourceManager, SceneDataSupport, SelectiveBloomPass, ShaderLibrary, SpotLightHelper, SpriteDataSupport, SupportDataGenerator, TIMINGFUNCTION, TextureDataSupport, TextureDisplayer, Translater, utils as Utils, VIEWPOINT, VideoLoader, generateConfig, getModule };
