import { MODULE_TYPE as a, defineModule as i, SUPPORT_LIFE_CYCLE as n } from "@vis-three/tdcm";
import { getObjectConfig as s, defineObjectModel as m, ObjectRule as d } from "@vis-three/module-object";
import { Water as y } from "three/examples/jsm/objects/Water.js";
import { Vector3 as l } from "three";
const c = function() {
  return Object.assign(s(), {
    geometry: "",
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: "",
    waterColor: "rgb(127, 127, 127)",
    sunColor: "rgb(255, 255, 255)",
    sunDirection: { x: 0.70707, y: 0.70707, z: 0 },
    size: 1,
    alpha: 1,
    time: 0,
    distortionScale: 20,
    eye: {
      x: 0,
      y: 0,
      z: 0
    },
    fog: !1
  });
}, w = m((u) => ({
  type: "DeepWater",
  config: c,
  commands: {
    set: {
      geometry({ value: e, target: t, engine: o }) {
        const r = o.getObjectFromModule(
          a.GEOMETRY,
          e
        );
        if (!r) {
          console.warn(
            `DeepWater processor: can not found geometry with:${e}`
          );
          return;
        }
        t.geometry = r;
      },
      waterNormals({ value: e, target: t, engine: o }) {
        const r = o.getObjectFromModule(
          a.TEXTURE,
          e
        );
        if (!r) {
          console.warn(
            `DeepWater processor: can not found texture with:${e}`
          );
          return;
        }
        t.material.uniforms.normalSampler.value = r;
      },
      time(e) {
        e.target.material.uniforms.time.value = e.value;
      },
      size(e) {
        e.target.material.uniforms.size.value = e.value;
      },
      alpha(e) {
        e.target.material.uniforms.alpha.value = e.value;
      },
      distortionScale(e) {
        e.target.material.uniforms.distortionScale.value = e.value;
      },
      waterColor(e) {
        e.target.material.uniforms.waterColor.value.setStyle(
          e.value
        );
      },
      sunColor(e) {
        e.target.material.uniforms.waterColor.value.setStyle(
          e.value
        );
      },
      sunDirection(e) {
        e.target.material.uniforms.sunDirection.value[e.key] = e.value;
      },
      eye(e) {
        e.target.material.uniforms.eye.value[e.key] = e.value;
      }
    }
  },
  create({ model: e, config: t, engine: o }) {
    const r = new y(
      o.getObjectFromModule(
        a.GEOMETRY,
        t.geometry
      ),
      {
        textureWidth: t.textureWidth || 512,
        textureHeight: t.textureHeight || 512,
        waterNormals: o.getObjectFromModule(
          a.TEXTURE,
          t.waterNormals
        ),
        waterColor: t.waterColor,
        sunColor: t.sunColor,
        sunDirection: new l(
          t.sunDirection.x,
          t.sunDirection.y,
          t.sunDirection.z
        ),
        alpha: t.alpha,
        time: t.time,
        distortionScale: t.distortionScale,
        eye: new l(t.eye.x, t.eye.y, t.eye.z),
        fog: t.fog
      }
    );
    return u.create({
      model: e,
      target: r,
      config: t,
      filter: {
        geometry: !0,
        textureWidth: !0,
        textureHeight: !0,
        waterNormals: !0,
        waterColor: !0,
        sunColor: !0,
        sunDirection: !0,
        alpha: !0,
        time: !0,
        distortionScale: !0,
        eye: !0,
        fog: !0
      },
      engine: o
    }), r;
  },
  dispose({ target: e }) {
    e.onBeforeRender = () => {
    }, e.material.dispose(), e.geometry = null, u.dispose({ target: e });
  }
})), C = i({
  type: "water",
  object: !0,
  rule: d,
  models: [w],
  lifeOrder: n.THREE
});
export {
  C as default
};
