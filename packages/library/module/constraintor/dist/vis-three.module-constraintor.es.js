import { getBasicConfig as c, defineModel as u, MODEL_EVENT as a, JSONHandler as A, defineModule as E, SUPPORT_LIFE_CYCLE as M } from "@vis-three/tdcm";
import { NumberConstraintor as y, BoundingBoxConstraintor as P } from "@vis-three/library-constraintor";
const C = function() {
  return Object.assign(c(), {
    target: ""
  });
}, b = function() {
  return Object.assign(C(), {
    target: "",
    targetAttr: "",
    ref: "",
    refAttr: "",
    offset: null
  });
}, l = function() {
  return Object.assign(C(), {
    targetAttr: "",
    ref: "",
    space: "world",
    offset: {
      position: {
        direction: "+",
        axes: "y"
      },
      operate: "+",
      value: 0
    }
  });
}, g = {
  reg: new RegExp(".*"),
  handler(r) {
    r.processor.set(r), r.target.constrain();
  }
}, D = u({
  type: "NumberConstraintor",
  config: b,
  context({ model: r }) {
    return {
      constrainFun: () => {
        r.puppet.constrain();
      }
    };
  },
  commands: {
    set: {
      target({ target: r, config: t, engine: e }) {
        t.target && t.targetAttr && (r.setTarget(
          e.getConfigBySymbol(t.target),
          t.targetAttr
        ), r.constrain());
      },
      targetAttr({ target: r, config: t, engine: e }) {
        t.target && t.targetAttr && (r.setTarget(
          e.getConfigBySymbol(t.target),
          t.targetAttr
        ), r.constrain());
      },
      ref({ target: r, config: t, engine: e, model: n }) {
        var o, s;
        t.ref && t.refAttr && ((o = n.toModel(t.ref)) == null || o.off(a.COMPILED_UPDATE, n.constrainFun), r.setReference(
          e.getConfigBySymbol(t.ref),
          t.refAttr
        ), (s = n.toModel(t.ref)) == null || s.on(a.COMPILED_UPDATE, n.constrainFun));
      },
      refAttr({ target: r, config: t, engine: e, model: n }) {
        var o, s;
        t.ref && t.refAttr && ((o = n.toModel(t.ref)) == null || o.off(a.COMPILED_UPDATE, n.constrainFun), r.setReference(
          e.getConfigBySymbol(t.ref),
          t.refAttr
        ), (s = n.toModel(t.ref)) == null || s.on(a.COMPILED_UPDATE, n.constrainFun));
      },
      $reg: [g]
    }
  },
  create({ model: r, config: t, engine: e }) {
    var o;
    const n = new y(
      e.getConfigBySymbol(t.target),
      t.targetAttr,
      e.getConfigBySymbol(t.ref),
      t.refAttr,
      t.offset ? { ...t.offset } : null
    );
    return (o = r.toModel(t.ref)) == null || o.on(a.COMPILED_UPDATE, r.constrainFun), n;
  },
  dispose({ model: r, config: t }) {
    var e;
    (e = r.toModel(t.ref)) == null || e.off(a.COMPILED_UPDATE, r.constrainFun);
  }
}), O = u({
  type: "BoundingBoxConstraintor",
  config: l,
  context({ model: r }) {
    return {
      constrainFun: () => {
        r.puppet.constrain();
      }
    };
  },
  commands: {
    set: {
      target({ target: r, config: t, engine: e }) {
        t.target && t.targetAttr && (r.setTarget(
          e.getConfigBySymbol(t.target),
          t.targetAttr
        ), r.constrain());
      },
      targetAttr({ target: r, config: t, engine: e }) {
        t.target && t.targetAttr && (r.setTarget(
          e.getConfigBySymbol(t.target),
          t.targetAttr
        ), r.constrain());
      },
      ref({ model: r, target: t, config: e, engine: n, value: o }) {
        var f, i;
        if ((f = r.toModel(e.ref)) == null || f.off(a.COMPILED_UPDATE, r.constrainFun), !o)
          return;
        const s = n.getObjectBySymbol(e.ref);
        if (!s) {
          console.warn(
            `BoundingBox constraintor processor: can not found object: ${e.ref}`
          );
          return;
        }
        t.setReference(s), t.constrain(), (i = r.toModel(e.ref)) == null || i.on(a.COMPILED_UPDATE, r.constrainFun);
      },
      $reg: [g]
    }
  },
  create({ model: r, config: t, engine: e }) {
    var s;
    const n = r.toObject(t.ref), o = new P(
      r.toConfig(t.target),
      t.targetAttr,
      t.space,
      n,
      A.clone(t.offset)
    );
    return n && (o.constrain(), (s = r.toModel(t.ref)) == null || s.on(a.COMPILED_UPDATE, r.constrainFun)), o;
  },
  dispose({ model: r, config: t }) {
    var e;
    (e = r.toModel(t.ref)) == null || e.off(a.COMPILED_UPDATE, r.constrainFun);
  }
}), p = E({
  type: "constraintor",
  models: [D, O],
  lifeOrder: M.NINE
});
export {
  p as default
};
