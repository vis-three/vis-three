import { EventDispatcher as u, ENGINE_EVENT as h } from "@vis-three/core";
import { Vector2 as p, Vector3 as r, PerspectiveCamera as m, OrthographicCamera as c, Ray as v } from "three";
import { transPkgName as E } from "@vis-three/utils";
class H extends u {
  constructor(e) {
    super(), this.dom = e.dom, this.mouse = new p(), this.canMouseMove = !0, this.mouseEventTimer = null, this.throttleTime = e.throttleTime || 1e3 / 60;
    const t = (i) => {
      const s = {
        mouse: {
          x: this.mouse.x,
          y: this.mouse.y
        }
      };
      for (const d in i)
        s[d] = i[d];
      return s;
    }, o = (i) => {
      i.preventDefault(), this.dispatchEvent(t(i));
    }, n = (i) => {
      this.dispatchEvent(t(i));
    };
    this.pointerMoveHandler = (i) => {
      this.canMouseMove && (this.canMouseMove = !1, this.mouseEventTimer = window.setTimeout(() => {
        const s = this.mouse, d = this.dom, a = d.getBoundingClientRect();
        s.x = (i.clientX - a.left) / d.offsetWidth * 2 - 1, s.y = -((i.clientY - a.top) / d.offsetHeight) * 2 + 1, this.canMouseMove = !0, this.dispatchEvent(t(i));
      }, this.throttleTime));
    }, this.mouseDownHandler = n, this.mouseUpHandler = n, this.pointerDownHandler = n, this.pointerUpHandler = n, this.clickHandler = n, this.dblclickHandler = n, this.contextmenuHandler = o;
  }
  /**
   * 设置当前作用的dom
   * @param dom
   * @returns
   */
  setDom(e) {
    if (this.dom) {
      const t = this.dom;
      t.removeEventListener("mousedown", this.mouseDownHandler), t.removeEventListener("mouseup", this.mouseUpHandler), t.removeEventListener("pointerdown", this.pointerDownHandler), t.removeEventListener("pointermove", this.pointerMoveHandler), t.removeEventListener("pointerup", this.pointerUpHandler), t.removeEventListener("click", this.clickHandler), t.removeEventListener("dblclick", this.dblclickHandler), t.removeEventListener("contextmenu", this.contextmenuHandler);
    }
    return e.addEventListener("mousedown", this.mouseDownHandler), e.addEventListener("mouseup", this.mouseUpHandler), e.addEventListener("pointerdown", this.pointerDownHandler), e.addEventListener("pointermove", this.pointerMoveHandler), e.addEventListener("pointerup", this.pointerUpHandler), e.addEventListener("click", this.clickHandler), e.addEventListener("dblclick", this.dblclickHandler), e.addEventListener("contextmenu", this.contextmenuHandler), this.dom = e, this;
  }
  /**
   * 获取归一化的鼠标指针
   * @returns mouse
   */
  getNormalMouse() {
    return this.mouse;
  }
  /**
   * 获取当前指针位置从给定相机出发的世界坐标
   * @param camera
   * @param offset
   * @param result
   * @returns
   */
  getWorldPosition(e, t, o) {
    if (!o && (o = new r()), e instanceof m) {
      const n = new r(this.mouse.x, this.mouse.y, 1).unproject(e).sub(o.setFromMatrixPosition(e.matrixWorld)).normalize();
      o.add(n.multiplyScalar(t));
    } else if (e instanceof c) {
      const n = new r(
        this.mouse.x,
        this.mouse.y,
        (e.near + e.far) / (e.near - e.far)
      ).unproject(e);
      o.set(0, 0, -1).transformDirection(e.matrixWorld).add(n.multiplyScalar(t));
    } else
      console.warn(
        `pointer manager can not support this type camera: ${e.type}`
      );
    return o;
  }
  /**
   * 获取当前指针从给定相机出发与给定平面的焦点
   * @param camera
   * @param plane
   * @param result
   */
  intersectPlane(e, t, o) {
    !o && (o = new r());
    const n = new r(), i = new v();
    if (e instanceof m) {
      const s = new r().setFromMatrixPosition(
        e.matrixWorld
      );
      n.set(this.mouse.x, this.mouse.y, 1).unproject(e).sub(s).normalize(), i.set(s, n);
    } else if (e instanceof c) {
      n.set(
        this.mouse.x,
        this.mouse.y,
        (e.near + e.far) / (e.near - e.far)
      ).unproject(e);
      const s = new r().set(0, 0, -1).transformDirection(e.matrixWorld);
      i.set(n, s);
    } else
      console.warn(
        `pointer manager can not support this type camera: ${e.type}`
      );
    return i.intersectPlane(t, o);
  }
}
const f = "@vis-three/plugin-pointer-manager", w = E(f), g = function(l) {
  let e;
  return {
    name: w,
    install(t) {
      const o = new H(
        Object.assign(l || {}, {
          dom: t.dom
        })
      );
      e = (n) => {
        o.setDom(n.dom);
      }, t.addEventListener(h.SETDOM, e), t.pointerManager = o;
    },
    dispose(t) {
      t.removeEventListener(h.SETDOM, e), e = void 0;
    }
  };
};
export {
  w as POINTER_MANAGER_PLUGIN,
  H as PointerManager,
  g as PointerManagerPlugin
};
