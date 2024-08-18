import { getBasicConfig as r, defineModel as m, defineModule as l, SUPPORT_LIFE_CYCLE as p } from "@vis-three/tdcm";
import { LoopRepeat as s } from "three";
import { syncObject as d } from "@vis-three/utils";
const u = function() {
  return Object.assign(r(), {
    mixer: "",
    clip: "",
    clampWhenFinished: !0,
    enabled: !0,
    loop: s,
    paused: !1,
    repetitions: 1 / 0,
    timeScale: 1,
    weight: 1,
    zeroSlopeAtEnd: !0,
    zeroSlopeAtStart: !0
  });
}, f = m(
  {
    type: "AnimationAction",
    config: u,
    commands: {
      set: {
        clip({ target: n, config: i, value: o, engine: t }) {
          n.action && n.action.getMixer().uncacheAction(n.action.getClip());
          const e = t.getObjectBySymbol(
            i.mixer
          );
          if (!e) {
            console.warn(
              `animation action model can not found animation mixer in engine: ${i.mixer}`
            );
            return;
          }
          const c = t.getObjectBySymbol(o);
          c || console.warn(
            `animation action model can not found animation clip in engine: ${o}`
          );
          const a = e.clipAction(c);
          a.play(), n.action = a;
        }
      }
    },
    create({ config: n, engine: i }) {
      if (!n.mixer)
        return console.warn("animation action model must have mixer"), {};
      if (!n.clip)
        return {};
      const o = i.getObjectBySymbol(n.mixer);
      if (!o)
        return console.warn(
          `animation action model can not found animation mixer in engine: ${n.mixer}`
        ), {};
      const t = i.getObjectBySymbol(n.clip);
      if (!t)
        return console.warn(
          `animation action model can not found animation clip in engine: ${n.clip}`
        ), {};
      const e = o.clipAction(t);
      return d(n, e, {
        clip: !0,
        mixer: !0
      }), e.play(), { action: e };
    },
    dispose({ target: n }) {
      if (n.action) {
        const i = n.action.getMixer();
        i.uncacheAction(n.action.getClip()), i.uncacheClip(n.action.getClip());
      }
    }
  }
), b = l({
  type: "animationAction",
  models: [f],
  lifeOrder: p.NINE + 1
});
export {
  b as default,
  u as getAnimationActionConfig
};
