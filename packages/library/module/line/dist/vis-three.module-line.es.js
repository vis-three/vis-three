import { MODEL_EVENT as r, defineModule as f, SUPPORT_LIFE_CYCLE as g } from "@vis-three/tdcm";
import { ObjectRule as u } from "@vis-three/module-object";
import { getSolidObjectConfig as L, defineSolidObjectModel as E } from "@vis-three/module-solid-object";
import { LineDashedMaterial as d, Line as m, LineSegments as h } from "three";
const c = function() {
  return Object.assign(L(), {
    geometry: "",
    material: "",
    dashed: !1
  });
}, p = function() {
  return c();
}, l = function() {
  return Object.assign(L(), {
    geometry: "",
    material: ""
  });
}, v = function() {
  return Object.assign(L(), {
    geometry: "",
    material: ""
  });
}, D = E((a) => ({
  type: "Line",
  config: c,
  context({ model: e }) {
    return {
      dashedLineEvent: () => {
        e.puppet.computeLineDistances();
      }
    };
  },
  commands: {
    set: {
      dashed({ model: e, config: t, target: s, value: n }) {
        var i, o;
        if (s.material instanceof d && n) {
          (i = e.toModel(t.geometry)) == null || i.on(r.COMPILED_UPDATE, e.dashedLineEvent), e.dashedLineEvent();
          return;
        }
        n || (o = e.toModel(t.geometry)) == null || o.off(r.COMPILED_UPDATE, e.dashedLineEvent);
      }
    }
  },
  create({ model: e, config: t, engine: s }) {
    var i;
    const n = new m();
    return a.create({
      model: e,
      target: n,
      engine: s,
      config: t,
      filter: {
        dashed: !0
      }
    }), n.material instanceof d && t.dashed && ((i = e.toModel(t.geometry)) == null || i.on(r.COMPILED_UPDATE, e.dashedLineEvent), e.dashedLineEvent()), n;
  },
  dispose({ target: e }) {
    a.dispose({ target: e });
  }
})), M = E((a) => ({
  type: "LineSegments",
  config: p,
  context({ model: e }) {
    return {
      dashedLineEvent: () => {
        e.puppet.computeLineDistances();
      }
    };
  },
  commands: {
    set: {
      dashed({ model: e, config: t, target: s, value: n }) {
        var i, o;
        if (s.material instanceof d && n) {
          (i = e.toModel(t.geometry)) == null || i.on(r.COMPILED_UPDATE, e.dashedLineEvent), e.dashedLineEvent();
          return;
        }
        n || (o = e.toModel(t.geometry)) == null || o.off(r.COMPILED_UPDATE, e.dashedLineEvent);
      }
    }
  },
  create({ model: e, config: t, engine: s }) {
    var i;
    const n = new h();
    return a.create({
      model: e,
      target: n,
      engine: s,
      config: t,
      filter: {
        dashed: !0
      }
    }), n.material instanceof d && t.dashed && ((i = e.toModel(t.geometry)) == null || i.on(r.COMPILED_UPDATE, e.dashedLineEvent), e.dashedLineEvent()), n;
  },
  dispose({ target: e }) {
    a.dispose({ target: e });
  }
})), T = f({
  type: "line",
  object: !0,
  rule: u,
  models: [D, M],
  lifeOrder: g.THREE
});
export {
  T as default,
  c as getLineConfig,
  l as getLineFatConfig,
  p as getLineSegmentsConfig,
  v as getLineSegmentsFatConfig
};
