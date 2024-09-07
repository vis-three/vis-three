import { MODULE_TYPE as d, defineModule as l, SUPPORT_LIFE_CYCLE as s } from "@vis-three/tdcm";
import { getObjectConfig as u, defineObjectModel as c, ObjectRule as m } from "@vis-three/module-object";
import { Reflector as f } from "three/examples/jsm/objects/Reflector.js";
const a = function() {
  return Object.assign(u(), {
    geometry: "",
    color: "rgb(127, 127, 127)",
    textureWidth: 0,
    textureHeight: 0,
    clipBias: 0,
    multisample: 4
  });
}, x = c((i) => ({
  type: "Reflector",
  config: a,
  shared: {
    setSize(e, t, o) {
      e.getRenderTarget().setSize(
        t.textureHeight || o.dom.offsetWidth * window.devicePixelRatio,
        t.textureWidth || o.dom.offsetHeight * window.devicePixelRatio
      );
    }
  },
  commands: {
    set: {
      textureHeight({ model: e, target: t, config: o, engine: r }) {
        e.setSize(t, o, r);
      },
      textureWidth({ model: e, target: t, config: o, engine: r }) {
        e.setSize(t, o, r);
      },
      geometry(e) {
        e.target.geometry = e.engine.getObjectFromModule(
          d.GEOMETRY,
          e.value
        );
      }
    }
  },
  create({ model: e, config: t, engine: o }) {
    const r = new f(
      o.getObjectFromModule(d.GEOMETRY, t.geometry),
      {
        color: t.color,
        clipBias: t.clipBias,
        textureHeight: t.textureHeight || o.dom.offsetWidth * window.devicePixelRatio,
        textureWidth: t.textureWidth || o.dom.offsetHeight * window.devicePixelRatio,
        multisample: t.multisample
      }
    );
    return i.create({
      model: e,
      target: r,
      config: t,
      engine: o,
      filter: { geometry: !0, clipBias: !0, color: !0 }
    }), r;
  },
  dispose({ target: e }) {
    e.geometry = void 0, e.dispose(), i.dispose({ target: e });
  }
})), R = l({
  type: "reflector",
  object: !0,
  rule: m,
  models: [x],
  lifeOrder: s.THREE
});
export {
  R as default
};
