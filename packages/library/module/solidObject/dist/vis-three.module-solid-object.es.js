import { getObjectConfig as s, defineObjectModel as y } from "@vis-three/module-object";
import { ShaderMaterial as p, BoxGeometry as f } from "three";
import { MODULE_TYPE as n } from "@vis-three/tdcm";
const d = function() {
  return Object.assign(s(), {
    material: "",
    geometry: ""
  });
}, m = function({
  model: t,
  target: r,
  value: a,
  engine: i
}) {
  t.toAsync((o) => {
    const e = i.compilerManager.getObjectFromModule(
      n.GEOMETRY,
      a
    );
    return e ? (r.geometry = e, !0) : (o && console.warn(`can not found geometry by vid in engine: ${a}`), r.geometry = t.replaceGeometry, !1);
  });
}, l = function({
  model: t,
  target: r,
  config: a,
  engine: i
}) {
  t.toAsync((o) => {
    let e;
    return typeof a.material == "string" ? e = i.compilerManager.getObjectFromModule(
      n.MATERIAL,
      a.material
    ) || t.replaceMaterial : e = a.material.map(
      (c) => i.compilerManager.getObjectFromModule(
        n.MATERIAL,
        c
      ) || t.replaceMaterial
    ), r.material = e, !(Array.isArray(e) && e.length && e[0] === t.replaceMaterial || e === t.replaceMaterial);
  });
}, O = y.extend((t) => ({
  shared: {
    replaceMaterial: new p({
      fragmentShader: `
      void main () {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
      `
    }),
    replaceGeometry: new f(10, 10, 10)
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
  create({ model: r, target: a, config: i, filter: o, engine: e }) {
    o.geometry || (a.geometry.dispose(), m.call(r, {
      model: r,
      target: a,
      value: i.geometry,
      engine: e
    })), o.material || l.call(r, {
      model: r,
      target: a,
      config: i,
      engine: e
    }), t.create({
      model: r,
      target: a,
      config: i,
      filter: {
        material: !0,
        geometry: !0,
        ...o
      },
      engine: e
    });
  },
  dispose({ target: r }) {
    t.dispose({ target: r });
  }
}));
export {
  O as defineSolidObjectModel,
  m as geometryHandler,
  d as getSolidObjectConfig,
  l as materialHandler
};
