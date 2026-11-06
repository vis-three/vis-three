import { defineModule as s, SUPPORT_LIFE_CYCLE as l } from "@vis-three/tdcm";
import { getObjectConfig as d, defineObjectModel as u, ObjectRule as f } from "@vis-three/module-object";
import { Box3 as i, Object3D as m } from "three";
import { clone as p } from "three/examples/jsm/utils/SkeletonUtils.js";
const y = function() {
  return Object.assign(d(), {
    url: "",
    raw: !1
  });
};
function b(r, n) {
  this.boundingBox.copy(this.cacheBox).applyMatrix4(this.matrixWorld), r.ray.intersectsBox(this.boundingBox) && n.push({
    distance: r.ray.origin.distanceTo(this.position),
    object: this,
    point: this.position
  });
}
const x = () => {
}, g = (r) => {
  const n = p(r);
  return n.traverse((o) => {
    const e = o;
    if (e.geometry && (e.geometry = e.geometry.clone()), e.material) {
      const a = (t) => {
        for (const c of Object.keys(t))
          typeof t[c] == "object" && t[c] !== null && t[c].isTexture && (t[c] = t[c].clone());
      };
      if (Array.isArray(e.material)) {
        e.material = e.material.map((t) => t.clone());
        for (const t of e.material)
          a(t);
      } else
        e.material = e.material.clone(), a(e.material);
    }
  }), n;
};
function j(r, n) {
  const o = g(r);
  return o.type = "Model", o.cacheBox = new i(), o.boundingBox = new i(), o.cacheBox.setFromObject(o, !0), o.traverse((e) => {
    e.raycast = x;
  }), o.raycast = b, o;
}
const h = u((r) => ({
  type: "LoadModel",
  config: y,
  commands: {
    set: {
      //TODO:
      url() {
      },
      //TODO:
      raw() {
      }
    }
  },
  create({ model: n, config: o, engine: e }) {
    const a = e.resourceManager.resourceMap.get(o.url) || new m(), t = j(a, o.raw);
    return r.create({
      model: n,
      target: t,
      config: o,
      filter: {},
      engine: e
    }), t;
  },
  dispose({ target: n }) {
    r.dispose({ target: n });
  }
})), C = s({
  type: "model",
  object: !0,
  rule: f,
  models: [h],
  lifeOrder: l.THREE
});
export {
  C as default
};
