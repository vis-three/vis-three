var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { EventDispatcher, ENGINE_EVENT } from "@vis-three/core";
import { Vector2, Vector3, PerspectiveCamera, OrthographicCamera, Ray } from "three";
import { transPkgName } from "@vis-three/utils";
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
    const extendEventHandler = (event) => {
      event.preventDefault();
      this.dispatchEvent(mergeEvent(event));
    };
    const pointEventHandler = (event) => {
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
    this.mouseDownHandler = pointEventHandler;
    this.mouseUpHandler = pointEventHandler;
    this.pointerDownHandler = pointEventHandler;
    this.pointerUpHandler = pointEventHandler;
    this.clickHandler = pointEventHandler;
    this.dblclickHandler = pointEventHandler;
    this.contextmenuHandler = extendEventHandler;
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
  getWorldPosition(camera, offset, result) {
    !result && (result = new Vector3());
    if (camera instanceof PerspectiveCamera) {
      const mouse = new Vector3(this.mouse.x, this.mouse.y, 1).unproject(camera).sub(result.setFromMatrixPosition(camera.matrixWorld)).normalize();
      result.add(mouse.multiplyScalar(offset));
    } else if (camera instanceof OrthographicCamera) {
      const mouse = new Vector3(
        this.mouse.x,
        this.mouse.y,
        (camera.near + camera.far) / (camera.near - camera.far)
      ).unproject(camera);
      result.set(0, 0, -1).transformDirection(camera.matrixWorld).add(mouse.multiplyScalar(offset));
    } else {
      console.warn(
        `pointer manager can not support this type camera: ${camera.type}`
      );
    }
    return result;
  }
  intersectPlane(camera, plane, result) {
    !result && (result = new Vector3());
    const mouse = new Vector3();
    const ray = new Ray();
    if (camera instanceof PerspectiveCamera) {
      const cameraPosition = new Vector3().setFromMatrixPosition(
        camera.matrixWorld
      );
      mouse.set(this.mouse.x, this.mouse.y, 1).unproject(camera).sub(cameraPosition).normalize();
      ray.set(cameraPosition, mouse);
    } else if (camera instanceof OrthographicCamera) {
      mouse.set(
        this.mouse.x,
        this.mouse.y,
        (camera.near + camera.far) / (camera.near - camera.far)
      ).unproject(camera);
      const direction = new Vector3().set(0, 0, -1).transformDirection(camera.matrixWorld);
      ray.set(mouse, direction);
    } else {
      console.warn(
        `pointer manager can not support this type camera: ${camera.type}`
      );
    }
    return ray.intersectPlane(plane, result);
  }
}
const name = "@vis-three/plugin-pointer-manager";
const POINTER_MANAGER_PLUGIN = transPkgName(name);
const PointerManagerPlugin = function(params) {
  let setDomFun;
  return {
    name: POINTER_MANAGER_PLUGIN,
    install(engine) {
      const pointerManager = new PointerManager(
        Object.assign(params || {}, {
          dom: engine.dom
        })
      );
      setDomFun = (event) => {
        pointerManager.setDom(event.dom);
      };
      engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
      engine.pointerManager = pointerManager;
    },
    dispose(engine) {
      engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
      setDomFun = void 0;
    }
  };
};
export { POINTER_MANAGER_PLUGIN, PointerManager, PointerManagerPlugin };
