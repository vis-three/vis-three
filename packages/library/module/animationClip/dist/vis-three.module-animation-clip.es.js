import { getBasicConfig as s, defineModel as l, defineModule as u, SUPPORT_LIFE_CYCLE as m } from "@vis-three/tdcm";
import { NormalAnimationBlendMode as c, BooleanKeyframeTrack as f, ColorKeyframeTrack as d, NumberKeyframeTrack as C, QuaternionKeyframeTrack as y, StringKeyframeTrack as g, VectorKeyframeTrack as h, AnimationClip as a } from "three";
const k = function() {
  return Object.assign(s(), {
    duration: -1,
    tracks: [],
    blendMode: c
  });
}, w = function() {
  return Object.assign(s(), {
    url: ""
  });
}, M = l({
  type: "AnimationClip",
  config: k,
  shared: {
    parseName(n) {
      const r = n.split(".");
      return r.length < 2 ? n : r.slice(0, 2).join(".") + r.slice(2, r.length).map((i) => `[${i}]`).join("");
    },
    parseColor(n) {
      return n.slice(4, -1).split(",").map((r) => Number(r.trim()) / 255);
    }
  },
  commands: {},
  create({ model: n, config: r, engine: i }) {
    const t = [];
    for (const e of r.tracks) {
      const o = n.parseName(e.name);
      e.type === "Boolean" ? t.push(
        new f(o, e.times, e.values)
      ) : e.type === "Color" ? t.push(
        new d(
          o,
          e.times,
          e.values.map((p) => n.parseColor(p)).flat(),
          e.interpolation
        )
      ) : e.type === "Number" ? t.push(
        new C(
          o,
          e.times,
          e.values,
          e.interpolation
        )
      ) : e.type === "Quaternion" ? t.push(
        new y(
          o,
          e.times,
          e.values,
          e.interpolation
        )
      ) : e.type === "String" ? t.push(
        new g(o, e.times, e.values)
      ) : e.type === "Vector" && t.push(
        new h(
          o,
          e.times,
          e.values,
          e.interpolation
        )
      );
    }
    return new a(
      "",
      r.duration,
      t,
      r.blendMode
    );
  },
  dispose({ target: n }) {
  }
}), A = l({
  type: "LoadAnimationClip",
  config: w,
  create({ config: n, engine: r }) {
    if (!n.url)
      return console.warn("load animation clip processor must have url"), new a();
    const i = r.resourceManager.resourceMap;
    return i.has(n.url) ? i.get(n.url) : (console.warn(
      `load animation clip processor can not found url in engine: ${n.url}`
    ), new a());
  },
  dispose(n) {
  }
}), v = u({
  type: "animationClip",
  models: [M, A],
  lifeOrder: m.ZERO
});
export {
  v as default,
  k as getAnimationClipConfig,
  w as getLoadAnimationClipConfig
};
