import { defineRule as c, MODULE_TYPE as n, defineModule as p, SUPPORT_LIFE_CYCLE as m } from "@vis-three/tdcm";
import { ObjectRule as s } from "@vis-three/module-object";
import { getSolidObjectConfig as f, defineSolidObjectModel as u } from "@vis-three/module-solid-object";
import { SpriteMaterial as l, Sprite as d } from "three";
const M = c([
  function(a) {
    return a.key !== "geometry";
  },
  ...s
]), g = function() {
  return Object.assign(f(), {
    type: "Sprite",
    material: "",
    center: {
      x: 0.5,
      y: 0.5
    }
  });
}, R = u((a) => ({
  type: "Sprite",
  config: g,
  shared: {
    spriteReplaceMaterial: new l({
      color: "rgb(123, 123, 123)"
    })
  },
  commands: {
    set: {
      lookAt() {
      },
      material({ model: t, target: i, engine: o, value: r }) {
        const e = o.compilerManager.getObjectFromModule(
          n.MATERIAL,
          r
        );
        e && e instanceof l ? i.material = e : i.material = t.spriteReplaceMaterial;
      }
    }
  },
  create({ model: t, config: i, engine: o }) {
    const r = new d(), e = o.compilerManager.getObjectFromModule(
      n.MATERIAL,
      i.material
    );
    return e && e instanceof l ? r.material = e : r.material = t.spriteReplaceMaterial, a.create({
      model: t,
      target: r,
      config: i,
      engine: o,
      filter: {
        geometry: !0,
        material: !0,
        lookAt: !0
      }
    }), r;
  },
  dispose({ target: t }) {
    a.dispose({ target: t });
  }
})), y = p({
  type: "sprite",
  object: !0,
  rule: M,
  models: [R],
  lifeOrder: m.THREE
});
export {
  y as default,
  g as getSpriteConfig
};
