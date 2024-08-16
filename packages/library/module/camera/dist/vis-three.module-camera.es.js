import { MODULE_TYPE as p, defineModule as c, SUPPORT_LIFE_CYCLE as u } from "@vis-three/tdcm";
import { getObjectConfig as n, defineObjectModel as s, ObjectRule as f } from "@vis-three/module-object";
import { OrthographicCamera as h, PerspectiveCamera as m } from "three";
import { ENGINE_EVENT as r } from "@vis-three/core";
function E(i) {
  i.setCameraBySymbol = function(e) {
    const a = this.getObjectFromModule(
      p.CAMERA,
      e
    );
    return a ? this.setCamera(a) : console.warn("can not found camera", e), this;
  };
}
const w = function() {
  return Object.assign(n(), {
    adaptiveWindow: !1,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50
  });
}, g = function() {
  return Object.assign(n(), {
    adaptiveWindow: !1,
    left: -window.innerWidth,
    right: window.innerWidth,
    top: window.innerHeight,
    bottom: -window.innerHeight,
    near: 5,
    far: 50,
    zoom: 1
  });
}, l = s((i) => ({
  type: "OrthographicCamera",
  config: g,
  context({ model: e }) {
    return {
      updateFun: (a) => {
        const t = e.puppet, o = a.width, d = a.height;
        t.left = -o, t.right = o, t.top = d, t.bottom = -d, t.updateProjectionMatrix();
      }
    };
  },
  commands: {
    add: {
      scale() {
      }
    },
    set: {
      scale() {
      },
      adaptiveWindow({ model: e, value: a, engine: t }) {
        a ? (t.addEventListener(r.SETSIZE, e.updateFun), e.updateFun({
          type: "setSize",
          width: t.dom.offsetWidth,
          height: t.dom.offsetHeight
        })) : t.removeEventListener(r.SETSIZE, e.updateFun);
      },
      $reg: [
        {
          reg: new RegExp("left|right|top|bottom|near|far|zoom"),
          handler({ target: e, key: a, value: t }) {
            e[a] = t, e.updateProjectionMatrix();
          }
        }
      ]
    },
    delete: {
      scale() {
      }
    }
  },
  create({ model: e, config: a, engine: t }) {
    const o = new h(-50, 50, 50, -50);
    return i.create({
      model: e,
      target: o,
      config: a,
      filter: {
        scale: !0,
        adaptiveWindow: !0
      },
      engine: t
    }), o.updateProjectionMatrix(), a.adaptiveWindow && (t.addEventListener(r.SETSIZE, e.updateFun), e.updateFun({
      type: r.SETSIZE,
      width: t.dom.offsetWidth,
      height: t.dom.offsetHeight
    })), o;
  },
  dispose({ target: e }) {
    i.dispose({ target: e });
  }
})), S = s((i) => ({
  type: "PerspectiveCamera",
  config: w,
  context({ model: e }) {
    return {
      updateFun: (a) => {
        e.puppet.aspect = a.width / a.height, e.puppet.updateProjectionMatrix();
      }
    };
  },
  commands: {
    add: {
      scale() {
      }
    },
    set: {
      scale() {
      },
      adaptiveWindow({ model: e, value: a, engine: t }) {
        a ? (t.addEventListener(r.SETSIZE, e.updateFun), e.updateFun({
          type: "setSize",
          width: t.dom.offsetWidth,
          height: t.dom.offsetHeight
        })) : t.removeEventListener(r.SETSIZE, e.updateFun);
      },
      $reg: [
        {
          reg: new RegExp("fov|aspect|near|far"),
          handler({ target: e, key: a, value: t }) {
            e[a] = t, e.updateProjectionMatrix();
          }
        }
      ]
    },
    delete: {
      scale() {
      }
    }
  },
  create({ model: e, config: a, engine: t, compiler: o }) {
    const d = new m();
    return i.create({
      model: e,
      target: d,
      config: a,
      filter: {
        scale: !0,
        adaptiveWindow: !0
      },
      engine: t
    }), d.updateProjectionMatrix(), a.adaptiveWindow && (t.addEventListener(r.SETSIZE, e.updateFun), e.updateFun({
      type: r.SETSIZE,
      width: t.dom.offsetWidth,
      height: t.dom.offsetHeight
    })), d;
  },
  dispose({ target: e }) {
    i.dispose({ target: e });
  }
})), W = c({
  type: "camera",
  object: !0,
  rule: f,
  extend: E,
  models: [l, S],
  lifeOrder: u.THREE
});
export {
  W as default,
  g as getOrthographicCameraConfig,
  w as getPerspectiveCameraConfig
};
