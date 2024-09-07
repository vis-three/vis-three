import { MODULE_TYPE as c, defineModule as u, SUPPORT_LIFE_CYCLE as f } from "@vis-three/tdcm";
import { getObjectConfig as s, defineObjectModel as p, ObjectRule as h } from "@vis-three/module-object";
import { OrthographicCamera as m, PerspectiveCamera as E } from "three";
import { ENGINE_EVENT as d } from "@vis-three/core";
function l(i) {
  i.setCameraBySymbol = function(t) {
    const a = this.getObjectFromModule(
      c.CAMERA,
      t
    );
    return a ? this.setCamera(a) : console.warn("can not found camera", t), this;
  };
}
const w = function() {
  return Object.assign(s(), {
    adaptiveWindow: !1,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50
  });
}, g = function() {
  return Object.assign(s(), {
    adaptiveWindow: !1,
    left: -window.innerWidth,
    right: window.innerWidth,
    top: window.innerHeight,
    bottom: -window.innerHeight,
    near: 5,
    far: 50,
    zoom: 1
  });
}, v = p((i) => ({
  type: "OrthographicCamera",
  config: g,
  context({ model: t }) {
    return {
      updateFun: (a) => {
        const e = t.puppet, r = a.width, o = a.height;
        e.left = -r, e.right = r, e.top = o, e.bottom = -o, e.updateProjectionMatrix();
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
      adaptiveWindow({ model: t, value: a, engine: e }) {
        a ? (e.addEventListener(d.SETSIZE, t.updateFun), t.updateFun({
          type: "setSize",
          width: e.dom.offsetWidth,
          height: e.dom.offsetHeight
        })) : e.removeEventListener(d.SETSIZE, t.updateFun);
      },
      $reg: [
        {
          reg: new RegExp("left|right|top|bottom|near|far|zoom"),
          handler({ target: t, key: a, value: e }) {
            t[a] = e, t.updateProjectionMatrix();
          }
        }
      ]
    },
    delete: {
      scale() {
      }
    }
  },
  create({ model: t, config: a, engine: e }) {
    const r = new m(-50, 50, 50, -50);
    if (i.create({
      model: t,
      target: r,
      config: a,
      filter: {
        scale: !0,
        adaptiveWindow: !0
      },
      engine: e
    }), r.updateProjectionMatrix(), a.adaptiveWindow) {
      const o = e.dom.offsetWidth, n = e.dom.offsetHeight;
      r.left = -o, r.right = o, r.top = n, r.bottom = -n, r.updateProjectionMatrix(), e.addEventListener(d.SETSIZE, t.updateFun);
    }
    return r;
  },
  dispose({ target: t }) {
    i.dispose({ target: t });
  }
})), C = p((i) => ({
  type: "PerspectiveCamera",
  config: w,
  context({ model: t }) {
    return {
      updateFun: (a) => {
        t.puppet.aspect = a.width / a.height, t.puppet.updateProjectionMatrix();
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
      adaptiveWindow({ model: t, value: a, engine: e }) {
        a ? (e.addEventListener(d.SETSIZE, t.updateFun), t.updateFun({
          type: "setSize",
          width: e.dom.offsetWidth,
          height: e.dom.offsetHeight
        })) : e.removeEventListener(d.SETSIZE, t.updateFun);
      },
      $reg: [
        {
          reg: new RegExp("fov|aspect|near|far"),
          handler({ target: t, key: a, value: e }) {
            t[a] = e, t.updateProjectionMatrix();
          }
        }
      ]
    },
    delete: {
      scale() {
      }
    }
  },
  create({ model: t, config: a, engine: e, compiler: r }) {
    const o = new E();
    return i.create({
      model: t,
      target: o,
      config: a,
      filter: {
        scale: !0,
        adaptiveWindow: !0
      },
      engine: e
    }), o.updateProjectionMatrix(), a.adaptiveWindow && (o.aspect = e.dom.offsetWidth / e.dom.offsetHeight, o.updateProjectionMatrix(), e.addEventListener(d.SETSIZE, t.updateFun)), o;
  },
  dispose({ target: t }) {
    i.dispose({ target: t });
  }
})), j = u({
  type: "camera",
  object: !0,
  rule: h,
  extend: l,
  models: [v, C],
  lifeOrder: f.THREE
});
export {
  j as default,
  g as getOrthographicCameraConfig,
  w as getPerspectiveCameraConfig
};
