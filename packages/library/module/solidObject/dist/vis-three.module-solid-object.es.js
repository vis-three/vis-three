import { defineObjectModel as s } from "@vis-three/module-object";
import { ShaderMaterial as p, BoxGeometry as y } from "three";
import { MODULE_TYPE as m } from "@vis-three/tdcm";
const n = function({
  model: r,
  target: a,
  value: t,
  engine: o
}) {
  r.toAsync((i) => {
    const e = o.compilerManager.getObjectFromModule(
      m.GEOMETRY,
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
      m.MATERIAL,
      t.material
    ) || r.replaceMaterial : e = t.material.map(
      (c) => o.compilerManager.getObjectFromModule(
        m.MATERIAL,
        c
      ) || r.replaceMaterial
    ), a.material = e, !(Array.isArray(e) && e.length && e[0] === r.replaceMaterial || e === r.replaceMaterial);
  });
}, u = s.extend((r) => ({
  shared: {
    replaceMaterial: new p({
      fragmentShader: `
      void main () {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
      `
    }),
    replaceGeometry: new y(10, 10, 10)
  },
  commands: {
    add: {
      material: l
    },
    set: {
      geometry: n,
      material: l
    },
    delete: {
      material: l
    }
  },
  create({ model: a, target: t, config: o, filter: i, engine: e }) {
    i.geometry || (t.geometry.dispose(), n.call(a, {
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
  u as defineSolidObjectModel,
  n as geometryHandler,
  l as materialHandler
};
