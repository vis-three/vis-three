import { getBasicConfig as l, defineModel as p, defineModule as s, SUPPORT_LIFE_CYCLE as d } from "@vis-three/tdcm";
import { LoopRepeat as u } from "three";
import { syncObject as x } from "@vis-three/utils";
const y = function() {
  return Object.assign(l(), {
    mixer: "",
    clip: "",
    clampWhenFinished: !0,
    enabled: !0,
    loop: u,
    paused: !1,
    repetitions: 1 / 0,
    timeScale: 1,
    weight: 1,
    zeroSlopeAtEnd: !0,
    zeroSlopeAtStart: !0
  });
}, f = p({
  type: "AnimationAction",
  config: y,
  commands: {
    set: {
      clip({ model: n, target: e, config: i, value: o, engine: t, compiler: a }) {
        e.getMixer().uncacheAction(e.getClip()), a.symbolMap.delete(e);
        const r = t.getObjectBySymbol(i.mixer);
        if (!r) {
          console.warn(
            `animation action model can not found animation mixer in engine: ${i.mixer}`
          );
          return;
        }
        const m = t.getObjectBySymbol(o);
        m || console.warn(
          `animation action model can not found animation clip in engine: ${o}`
        );
        const c = r.clipAction(m);
        c.play(), n.puppet = c, a.symbolMap.set(c, i.vid);
      }
    }
  },
  create({ config: n, engine: e }) {
    if (!n.mixer)
      return console.warn("animation action model must have mixer"), {};
    if (!n.clip)
      return {};
    const i = e.getObjectBySymbol(n.mixer);
    if (!i)
      return console.warn(
        `animation action model can not found animation mixer in engine: ${n.mixer}`
      ), {};
    const o = e.getObjectBySymbol(n.clip);
    if (!o)
      return console.warn(
        `animation action model can not found animation clip in engine: ${n.clip}`
      ), {};
    const t = i.clipAction(o);
    return x(n, t, {
      clip: !0,
      mixer: !0
    }), t.play(), t;
  },
  dispose({ target: n }) {
    const e = n.getMixer();
    e.uncacheAction(n.getClip()), e.uncacheClip(n.getClip());
  }
}), C = s({
  type: "animationAction",
  models: [f],
  lifeOrder: d.NINE + 1
});
export {
  C as default,
  y as getAnimationActionConfig
};
