import { getBasicConfig as s, defineModel as l, defineModule as p, SUPPORT_LIFE_CYCLE as u } from "@vis-three/tdcm";
import { NormalAnimationBlendMode as c, BooleanKeyframeTrack as m, ColorKeyframeTrack as d, NumberKeyframeTrack as f, QuaternionKeyframeTrack as y, StringKeyframeTrack as g, VectorKeyframeTrack as C, AnimationClip as a } from "three";
const h = function() {
  return Object.assign(s(), {
    duration: -1,
    tracks: [],
    blendMode: c
  });
}, k = function() {
  return Object.assign(s(), {
    url: ""
  });
}, w = l({
  type: "AnimationClip",
  config: h,
  shared: {
    parseName(n) {
      const t = n.split(".");
      return t.length < 2 ? n : t.slice(0, 2).join(".") + t.slice(2, t.length).map((i) => `[${i}]`);
    }
  },
  commands: {},
  create({ model: n, config: t, engine: i }) {
    const r = [];
    for (const e of t.tracks) {
      const o = n.parseName(e.name);
      e.type === "Boolean" ? r.push(
        new m(o, e.times, e.values)
      ) : e.type === "Color" ? r.push(
        new d(
          o,
          e.times,
          e.values,
          e.interpolation
        )
      ) : e.type === "Number" ? r.push(
        new f(
          o,
          e.times,
          e.values,
          e.interpolation
        )
      ) : e.type === "Quaternion" ? r.push(
        new y(
          o,
          e.times,
          e.values,
          e.interpolation
        )
      ) : e.type === "String" ? r.push(
        new g(o, e.times, e.values)
      ) : e.type === "Vector" && r.push(
        new C(
          o,
          e.times,
          e.values,
          e.interpolation
        )
      );
    }
    return new a(
      "",
      t.duration,
      r,
      t.blendMode
    );
  },
  dispose({ target: n }) {
  }
}), M = l({
  type: "LoadAnimationClip",
  config: k,
  create({ config: n, engine: t }) {
    if (!n.url)
      return console.warn("load animation clip processor must have url"), new a();
    const i = t.resourceManager.resourceMap;
    return i.has(n.url) ? i.get(n.url) : (console.warn(
      `load animation clip processor can not found url in engine: ${n.url}`
    ), new a());
  },
  dispose(n) {
  }
}), v = p({
  type: "animationClip",
  models: [w, M],
  lifeOrder: u.ZERO
});
export {
  v as default,
  h as getAnimationClipConfig,
  k as getLoadAnimationClipConfig
};
