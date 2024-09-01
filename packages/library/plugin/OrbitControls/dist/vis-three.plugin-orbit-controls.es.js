import { EventDispatcher as wt, ENGINE_EVENT as N } from "@vis-three/core";
import { transPkgName as Lt } from "@vis-three/utils";
import { Vector3 as E, MOUSE as x, TOUCH as R, PerspectiveCamera as Y, Quaternion as st, Spherical as it, Vector2 as c, OrthographicCamera as F } from "three";
const Dt = "@vis-three/plugin-orbit-controls";
class At extends wt {
  constructor(r, j) {
    super(), this.enabled = !0, this.target = new E(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }, this.mouseButtons = {
      LEFT: null,
      MIDDLE: x.DOLLY,
      RIGHT: x.ROTATE
    }, this.touches = { ONE: R.ROTATE, TWO: R.DOLLY_PAN }, this._domElementKeyEvents = null, this.object = r || new Y(), this.domElement = j || document.createElement("div"), this.domElement.style.touchAction = "none", this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.update = (() => {
      const t = new E(), e = new st().setFromUnitVectors(
        this.object.up,
        new E(0, 1, 0)
      ), a = e.clone().invert(), h = new E(), f = new st(), b = 2 * Math.PI;
      return () => {
        const nt = this.object.position;
        t.copy(nt).sub(this.target), t.applyQuaternion(e), s.setFromVector3(t), this.autoRotate && o === n.NONE && _(at()), this.enableDamping ? (s.theta += p.theta * this.dampingFactor, s.phi += p.phi * this.dampingFactor) : (s.theta += p.theta, s.phi += p.phi);
        let d = this.minAzimuthAngle, m = this.maxAzimuthAngle;
        return isFinite(d) && isFinite(m) && (d < -Math.PI ? d += b : d > Math.PI && (d -= b), m < -Math.PI ? m += b : m > Math.PI && (m -= b), d <= m ? s.theta = Math.max(d, Math.min(m, s.theta)) : s.theta = s.theta > (d + m) / 2 ? Math.max(d, s.theta) : Math.min(m, s.theta)), s.phi = Math.max(
          this.minPolarAngle,
          Math.min(this.maxPolarAngle, s.phi)
        ), s.makeSafe(), s.radius *= k, s.radius = Math.max(
          this.minDistance,
          Math.min(this.maxDistance, s.radius)
        ), this.enableDamping === !0 ? this.target.addScaledVector(O, this.dampingFactor) : this.target.add(O), t.setFromSpherical(s), t.applyQuaternion(a), nt.copy(this.target).add(t), this.object.lookAt(this.target), this.enableDamping === !0 ? (p.theta *= 1 - this.dampingFactor, p.phi *= 1 - this.dampingFactor, O.multiplyScalar(1 - this.dampingFactor)) : (p.set(0, 0, 0), O.set(0, 0, 0)), k = 1, C || h.distanceToSquared(this.object.position) > l || 8 * (1 - f.dot(this.object.quaternion)) > l ? (this.dispatchEvent({ type: "change" }), h.copy(this.object.position), f.copy(this.object.quaternion), C = !1, !0) : !1;
      };
    })();
    const n = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let o = n.NONE;
    const l = 1e-6, s = new it(), p = new it();
    let k = 1;
    const O = new E();
    let C = !1;
    const y = new c(), g = new c(), M = new c(), P = new c(), T = new c(), w = new c(), L = new c(), D = new c(), S = new c(), i = [], v = {}, at = () => 2 * Math.PI / 60 / 60 * this.autoRotateSpeed, I = () => Math.pow(0.95, this.zoomSpeed), _ = (t) => {
      p.theta -= t;
    }, Z = (t) => {
      p.phi -= t;
    }, K = function() {
      const t = new E();
      return function(a, h) {
        t.setFromMatrixColumn(h, 0), t.multiplyScalar(-a), O.add(t);
      };
    }(), X = (() => {
      const t = new E();
      return (e, a) => {
        this.screenSpacePanning === !0 ? t.setFromMatrixColumn(a, 1) : (t.setFromMatrixColumn(a, 0), t.crossVectors(this.object.up, t)), t.multiplyScalar(e), O.add(t);
      };
    })(), A = (() => {
      const t = new E();
      return (e, a) => {
        const h = this.domElement;
        if (this.object instanceof Y) {
          const f = this.object.position;
          t.copy(f).sub(this.target);
          let b = t.length();
          b *= Math.tan(this.object.fov / 2 * Math.PI / 180), K(
            2 * e * b / h.clientHeight,
            this.object.matrix
          ), X(
            2 * a * b / h.clientHeight,
            this.object.matrix
          );
        } else this.object instanceof F ? (K(
          e * (this.object.right - this.object.left) / this.object.zoom / h.clientWidth,
          this.object.matrix
        ), X(
          a * (this.object.top - this.object.bottom) / this.object.zoom / h.clientHeight,
          this.object.matrix
        )) : (console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
        ), this.enablePan = !1);
      };
    })(), U = (t) => {
      this.object instanceof Y ? k /= t : this.object instanceof F ? (this.object.zoom = Math.max(
        this.minZoom,
        Math.min(this.maxZoom, this.object.zoom * t)
      ), this.object.updateProjectionMatrix(), C = !0) : (console.warn(
        "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
      ), this.enableZoom = !1);
    }, V = (t) => {
      this.object instanceof Y ? k *= t : this.object instanceof F ? (this.object.zoom = Math.max(
        this.minZoom,
        Math.min(this.maxZoom, this.object.zoom / t)
      ), this.object.updateProjectionMatrix(), C = !0) : (console.warn(
        "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
      ), this.enableZoom = !1);
    };
    function W(t) {
      y.set(t.clientX, t.clientY);
    }
    function ht(t) {
      L.set(t.clientX, t.clientY);
    }
    function G(t) {
      P.set(t.clientX, t.clientY);
    }
    const rt = (t) => {
      g.set(t.clientX, t.clientY), M.subVectors(g, y).multiplyScalar(this.rotateSpeed);
      const e = this.domElement;
      _(2 * Math.PI * M.x / e.clientHeight), Z(2 * Math.PI * M.y / e.clientHeight), y.copy(g), this.update();
    }, lt = (t) => {
      D.set(t.clientX, t.clientY), S.subVectors(D, L), S.y > 0 ? U(I()) : S.y < 0 && V(I()), L.copy(D), this.update();
    }, ct = (t) => {
      T.set(t.clientX, t.clientY), w.subVectors(T, P).multiplyScalar(this.panSpeed), A(w.x, w.y), P.copy(T), this.update();
    }, pt = (t) => {
      t.deltaY < 0 ? V(I()) : t.deltaY > 0 && U(I()), this.update();
    }, dt = (t) => {
      let e = !1;
      switch (t.code) {
        case this.keys.UP:
          A(0, this.keyPanSpeed), e = !0;
          break;
        case this.keys.BOTTOM:
          A(0, -this.keyPanSpeed), e = !0;
          break;
        case this.keys.LEFT:
          A(this.keyPanSpeed, 0), e = !0;
          break;
        case this.keys.RIGHT:
          A(-this.keyPanSpeed, 0), e = !0;
          break;
      }
      e && (t.preventDefault(), this.update());
    };
    function q() {
      if (i.length === 1)
        y.set(i[0].pageX, i[0].pageY);
      else {
        const t = 0.5 * (i[0].pageX + i[1].pageX), e = 0.5 * (i[0].pageY + i[1].pageY);
        y.set(t, e);
      }
    }
    function B() {
      if (i.length === 1)
        P.set(i[0].pageX, i[0].pageY);
      else {
        const t = 0.5 * (i[0].pageX + i[1].pageX), e = 0.5 * (i[0].pageY + i[1].pageY);
        P.set(t, e);
      }
    }
    function Q() {
      const t = i[0].pageX - i[1].pageX, e = i[0].pageY - i[1].pageY, a = Math.sqrt(t * t + e * e);
      L.set(0, a);
    }
    const mt = () => {
      this.enableZoom && Q(), this.enablePan && B();
    }, ut = () => {
      this.enableZoom && Q(), this.enableRotate && q();
    }, J = (t) => {
      if (i.length == 1)
        g.set(t.pageX, t.pageY);
      else {
        const a = z(t), h = 0.5 * (t.pageX + a.x), f = 0.5 * (t.pageY + a.y);
        g.set(h, f);
      }
      M.subVectors(g, y).multiplyScalar(this.rotateSpeed);
      const e = this.domElement;
      _(2 * Math.PI * M.x / e.clientHeight), Z(2 * Math.PI * M.y / e.clientHeight), y.copy(g);
    }, $ = (t) => {
      if (i.length === 1)
        T.set(t.pageX, t.pageY);
      else {
        const e = z(t), a = 0.5 * (t.pageX + e.x), h = 0.5 * (t.pageY + e.y);
        T.set(a, h);
      }
      w.subVectors(T, P).multiplyScalar(this.panSpeed), A(w.x, w.y), P.copy(T);
    }, tt = (t) => {
      const e = z(t), a = t.pageX - e.x, h = t.pageY - e.y, f = Math.sqrt(a * a + h * h);
      D.set(0, f), S.set(0, Math.pow(D.y / L.y, this.zoomSpeed)), U(S.y), L.copy(D);
    }, ft = (t) => {
      this.enableZoom && tt(t), this.enablePan && $(t);
    }, bt = (t) => {
      this.enableZoom && tt(t), this.enableRotate && J(t);
    };
    this.onPointerDown = (t) => {
      this.enabled !== !1 && (i.length === 0 && (this.domElement.addEventListener("pointermove", this.onPointerMove), this.domElement.addEventListener("pointerup", this.onPointerUp)), Mt(t), t.pointerType === "touch" ? Pt(t) : Et(t));
    };
    let H = !1;
    this.onPointerMove = (t) => {
      this.enabled !== !1 && (H || (this.domElement.setPointerCapture(t.pointerId), H = !0), t.pointerType === "touch" ? Tt(t) : yt(t));
    }, this.onPointerUp = (t) => {
      this.enabled !== !1 && (H = !1, t.pointerType === "touch" ? Ot() : gt(), et(t), i.length === 0 && (this.domElement.releasePointerCapture(t.pointerId), this.domElement.removeEventListener("pointermove", this.onPointerMove), this.domElement.removeEventListener("pointerup", this.onPointerUp)));
    }, this.onPointerCancel = (t) => {
      et(t);
    };
    const Et = (t) => {
      let e;
      switch (t.button) {
        case 0:
          e = this.mouseButtons.LEFT;
          break;
        case 1:
          e = this.mouseButtons.MIDDLE;
          break;
        case 2:
          e = this.mouseButtons.RIGHT;
          break;
        default:
          e = -1;
      }
      switch (e) {
        case x.DOLLY:
          if (this.enableZoom === !1) return;
          ht(t), o = n.DOLLY;
          break;
        case x.ROTATE:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (this.enablePan === !1) return;
            G(t), o = n.PAN;
          } else {
            if (this.enableRotate === !1) return;
            W(t), o = n.ROTATE;
          }
          break;
        case x.PAN:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (this.enableRotate === !1) return;
            W(t), o = n.ROTATE;
          } else {
            if (this.enablePan === !1) return;
            G(t), o = n.PAN;
          }
          break;
        default:
          o = n.NONE;
      }
      o !== n.NONE && this.dispatchEvent({ type: "start" });
    }, yt = (t) => {
      if (this.enabled !== !1)
        switch (o) {
          case n.ROTATE:
            if (this.enableRotate === !1) return;
            rt(t);
            break;
          case n.DOLLY:
            if (this.enableZoom === !1) return;
            lt(t);
            break;
          case n.PAN:
            if (this.enablePan === !1) return;
            ct(t);
            break;
        }
    }, gt = (t) => {
      this.dispatchEvent({ type: "end" }), o = n.NONE;
    };
    this.onMouseWheel = (t) => {
      this.enabled === !1 || this.enableZoom === !1 || o !== n.NONE || (t.preventDefault(), this.dispatchEvent({ type: "start" }), pt(t), this.dispatchEvent({ type: "end" }));
    }, this.onKeyDown = (t) => {
      this.enabled === !1 || this.enablePan === !1 || dt(t);
    };
    const Pt = (t) => {
      switch (ot(t), i.length) {
        case 1:
          switch (this.touches.ONE) {
            case R.ROTATE:
              if (this.enableRotate === !1) return;
              q(), o = n.TOUCH_ROTATE;
              break;
            case R.PAN:
              if (this.enablePan === !1) return;
              B(), o = n.TOUCH_PAN;
              break;
            default:
              o = n.NONE;
          }
          break;
        case 2:
          switch (this.touches.TWO) {
            case R.DOLLY_PAN:
              if (this.enableZoom === !1 && this.enablePan === !1) return;
              mt(), o = n.TOUCH_DOLLY_PAN;
              break;
            case R.DOLLY_ROTATE:
              if (this.enableZoom === !1 && this.enableRotate === !1)
                return;
              ut(), o = n.TOUCH_DOLLY_ROTATE;
              break;
            default:
              o = n.NONE;
          }
          break;
        default:
          o = n.NONE;
      }
      o !== n.NONE && this.dispatchEvent({ type: "start" });
    }, Tt = (t) => {
      switch (ot(t), o) {
        case n.TOUCH_ROTATE:
          if (this.enableRotate === !1) return;
          J(t), this.update();
          break;
        case n.TOUCH_PAN:
          if (this.enablePan === !1) return;
          $(t), this.update();
          break;
        case n.TOUCH_DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          ft(t), this.update();
          break;
        case n.TOUCH_DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          bt(t), this.update();
          break;
        default:
          o = n.NONE;
      }
    }, Ot = (t) => {
      this.dispatchEvent({ type: "end" }), o = n.NONE;
    };
    this.onContextMenu = (t) => {
      this.enabled !== !1 && t.preventDefault();
    };
    function Mt(t) {
      i.push(t);
    }
    const et = (t) => {
      delete v[t.pointerId];
      for (let e = 0; e < i.length; e++)
        if (i[e].pointerId == t.pointerId) {
          i.splice(e, 1);
          return;
        }
    };
    function ot(t) {
      let e = v[t.pointerId];
      e === void 0 && (e = new c(), v[t.pointerId] = e), e.set(t.pageX, t.pageY);
    }
    function z(t) {
      const e = t.pointerId === i[0].pointerId ? i[1] : i[0];
      return v[e.pointerId];
    }
    this.spherical = s, this.domElement.addEventListener("contextmenu", this.onContextMenu), this.domElement.addEventListener("pointerdown", this.onPointerDown), this.domElement.addEventListener("pointercancel", this.onPointerCancel), this.domElement.addEventListener("wheel", this.onMouseWheel, {
      passive: !1
    }), this.reset = () => {
      this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent({ type: "change" }), this.update(), o = n.NONE;
    }, this.update();
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
  listenToKeyEvents(r) {
    r.addEventListener("keydown", this.onKeyDown), this._domElementKeyEvents = r;
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  setCamera(r) {
    this.object = r;
  }
  setDom(r) {
    this.dispose(), this.domElement = r, this.domElement.addEventListener("contextmenu", this.onContextMenu), this.domElement.addEventListener("pointerdown", this.onPointerDown), this.domElement.addEventListener("pointercancel", this.onPointerCancel), this.domElement.addEventListener("wheel", this.onMouseWheel, {
      passive: !1
    }), this._domElementKeyEvents && this._domElementKeyEvents.addEventListener("keydown", this.onKeyDown);
  }
  dispose() {
    this.domElement.removeEventListener("contextmenu", this.onContextMenu), this.domElement.removeEventListener("pointerdown", this.onPointerDown), this.domElement.removeEventListener("pointercancel", this.onPointerCancel), this.domElement.removeEventListener("wheel", this.onMouseWheel), this.domElement.removeEventListener("pointermove", this.onPointerMove), this.domElement.removeEventListener("pointerup", this.onPointerUp), this._domElementKeyEvents !== null && this._domElementKeyEvents.removeEventListener("keydown", this.onKeyDown);
  }
}
const Nt = Lt(Dt), xt = function(u = {}) {
  let r, j, n;
  return {
    name: Nt,
    install(o) {
      const l = new At(o.camera, o.dom);
      if (u) {
        for (const s in u)
          if (u[s] !== void 0) {
            if (s === "keysDom") {
              l.listenToKeyEvents(u[s]);
              continue;
            }
            typeof u[s] == "object" ? Object.assign(l[s], u[s]) : l[s] = u[s];
          }
      }
      o.orbitControls = l, r = (s) => {
        l.setDom(s.dom);
      }, o.addEventListener(N.SETDOM, r), j = (s) => {
        s.options.orbitControls && l.setCamera(s.camera);
      }, o.addEventListener(
        N.SETCAMERA,
        j
      ), n = () => {
        l.update();
      }, o.addEventListener(N.RENDER, n);
    },
    dispose(o) {
      o.removeEventListener(N.SETDOM, r), o.removeEventListener(
        N.SETCAMERA,
        j
      ), o.removeEventListener(N.RENDER, n);
    }
  };
};
export {
  Nt as ORBIT_CONTROLS_PLUGIN,
  xt as OrbitControlsPlugin,
  At as VisOrbitControls
};
