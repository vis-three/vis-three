import { getBasicConfig as i, defineModel as t, defineModule as a, SUPPORT_LIFE_CYCLE as s } from "@vis-three/tdcm";
import { AnimationClip as o } from "three";
const l = function() {
  return Object.assign(i(), {
    duration: -1,
    tracks: []
  });
}, c = function() {
  return Object.assign(i(), {
    url: ""
  });
}, u = t({
  type: "AnimationClip",
  config: l,
  create() {
    return {};
  },
  dispose() {
  }
}), p = t({
  type: "LoadAnimationClip",
  config: c,
  create({ config: n, engine: r }) {
    if (!n.url)
      return console.warn("load animation clip processor must have url"), new o();
    const e = r.resourceManager.resourceMap;
    return e.has(n.url) ? e.get(n.url) : (console.warn(
      `load animation clip processor can not found url in engine: ${n.url}`
    ), new o());
  },
  dispose(n) {
  }
}), f = a({
  type: "animationClip",
  models: [u, p],
  lifeOrder: s.ZERO
});
export {
  f as default,
  l as getAnimationClipConfig,
  c as getLoadAnimationClipConfig
};
