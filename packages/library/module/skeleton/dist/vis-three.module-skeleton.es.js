import { getBasicConfig as i, defineModel as b, defineModule as a, SUPPORT_LIFE_CYCLE as d } from "@vis-three/tdcm";
import { Skeleton as c, Matrix4 as u, Bone as f } from "three";
const p = function() {
  return Object.assign(i(), {
    bones: [],
    boneInverses: []
  });
}, m = function() {
  return Object.assign(i(), {
    url: ""
  });
}, k = b({
  type: "Skeleton",
  config: p,
  commands: {
    add: {
      bones({ target: e, value: n, engine: o }) {
        const s = o.getObjectBySymbol(n);
        s ? (e.bones.push(s), e.boneInverses = [], e.init()) : console.warn(
          `skeleton processor can not found bone in engine: ${n}`
        );
      }
    },
    set: {},
    delete: {
      bones({ target: e, value: n, engine: o }) {
        e.bones.splice(n, 1), e.boneInverses = [], e.init();
      }
    }
  },
  create({ model: e, config: n, engine: o }) {
    const s = [];
    n.bones.forEach((r) => {
      const t = o.getObjectBySymbol(r);
      t ? s.push(t) : console.warn(`skeleton processor can not found bone in engine: ${r}`);
    });
    const l = new c(
      s,
      n.boneInverses.length ? n.boneInverses.map((r) => {
        const t = new u();
        return t.elements = [].concat(
          r
        ), t;
      }) : []
    );
    return n.boneInverses.length || e.toTrigger("object", () => (l.calculateInverses(), !1)), l;
  },
  dispose({ target: e }) {
    e.bones = [], e.boneInverses = [], e.dispose();
  }
}), g = b({
  type: "LoadSkeleton",
  config: m,
  commands: {
    set: {
      url() {
      }
    }
  },
  create({ config: e, engine: n }) {
    const o = n.resourceManager.resourceMap.get(e.url);
    return !o && !(o instanceof c) ? (console.error(
      `LoadSkeletonProcessor: engine rescoure can not found url: ${e.url}`
    ), new c([new f()])) : new c(
      [].concat(o.bones),
      [].concat(o.boneInverses)
    );
  },
  dispose({ target: e }) {
    e.bones = [], e.boneInverses = [], e.dispose();
  }
}), v = a({
  type: "skeleton",
  models: [k, g],
  lifeOrder: d.THREE - 1
});
export {
  v as default,
  m as getLoadSkeletonConfig,
  p as getSkeletonConfig
};
