import { getObjectConfig as s, defineObjectModel as p } from "@vis-three/module-object";
import { ShaderMaterial as y, BoxGeometry as M } from "three";
import { MODULE_TYPE as n } from "@vis-three/tdcm";
const u = function() {
  return Object.assign(s(), {
    material: "",
    geometry: ""
  });
}, m = function({
  model: r,
  target: a,
  value: t,
  engine: o
}) {
  r.toAsync((i) => {
    const e = o.compilerManager.getObjectFromModule(
      n.GEOMETRY,
      t
    );
    return e ? (a.geometry = e, !0) : (i && console.warn(`can not found geometry by vid in engine: ${t}`), a.geometry = r.replaceGeometry, !1);
  });
}, l = function({
  model: r,
  target: a,
  config: t,
  engine: o
}) {
  r.toAsync((i) => {
    let e;
    return typeof t.material == "string" ? e = o.compilerManager.getObjectFromModule(
      n.MATERIAL,
      t.material
    ) || r.replaceMaterial : e = t.material.map(
      (c) => o.compilerManager.getObjectFromModule(
        n.MATERIAL,
        c
      ) || r.replaceMaterial
    ), a.material = e, !(Array.isArray(e) && e.length && e[0] === r.replaceMaterial || e === r.replaceMaterial);
  });
}, O = p.extend((r) => ({
  shared: {
    replaceMaterial: new y({
      fragmentShader: `
      void main () {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
      `
    }),
    replaceGeometry: new M(10, 10, 10)
  },
  commands: {
    add: {
      material: l
    },
    set: {
      geometry: m,
      material: l
    },
    delete: {
      material: l
    }
  },
  create({ model: a, target: t, config: o, filter: i, engine: e }) {
    i.geometry || (t.geometry.dispose(), m.call(a, {
      model: a,
      target: t,
      value: o.geometry,
      engine: e
    })), i.material || l.call(a, {
      target: t,
      config: o,
      engine: e
    }), r.create({
      model: a,
      target: t,
      config: o,
      filter: i,
      engine: e
    });
  },
  dispose({ target: a }) {
    r.dispose({ target: a });
  }
}));
export {
  O as defineSolidObjectModel,
  m as geometryHandler,
  u as getSolidObjectConfig,
  l as materialHandler
};
