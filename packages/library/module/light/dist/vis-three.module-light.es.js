import { emptyHandler as d, defineModule as L, SUPPORT_LIFE_CYCLE as y } from "@vis-three/tdcm";
import { Vector2 as u, Color as l, AmbientLight as b, DirectionalLight as S, HemisphereLight as C, PointLight as z, RectAreaLight as j, SpotLight as x } from "three";
import { getObjectConfig as m, defineObjectModel as E } from "@vis-three/module-object";
import { ENGINE_EVENT as f } from "@vis-three/core";
const h = function() {
  return Object.assign(m(), {
    type: "Light",
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
}, p = function(i) {
  return Object.assign(h(), {
    shadow: {
      bias: 0,
      normalBias: 0,
      radius: 1,
      mapSize: {
        x: 512,
        y: 512
      },
      camera: i
    }
  });
}, O = function() {
  return Object.assign(m(), {
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
}, M = function() {
  return Object.assign(
    p({
      fov: 90,
      aspect: 1,
      near: 0.5,
      far: 500
    }),
    {
      distance: 30,
      decay: 0.01
    }
  );
}, R = function() {
  return Object.assign(
    p({
      fov: 50,
      aspect: 1,
      near: 0.5,
      far: 500
    }),
    {
      distance: 30,
      angle: Math.PI / 180 * 45,
      penumbra: 0.01,
      decay: 0.01,
      target: ""
    }
  );
}, A = function() {
  return Object.assign(
    p({
      near: 0.5,
      far: 500,
      top: window.innerHeight,
      bottom: -window.innerHeight,
      left: -window.innerWidth,
      right: window.innerWidth
    }),
    {}
  );
}, P = function() {
  return Object.assign(h(), {
    color: "rgb(255, 255, 255)",
    groundColor: "rgb(0, 0, 0)"
  });
}, H = function() {
  return Object.assign(h(), {
    width: 10,
    height: 10
  });
}, c = E.extend((i) => ({
  shared: {
    cacheMapSize: new u(),
    cacheViewportSize: new u(),
    updateShadowSize(e, t, r) {
      const o = this.cacheMapSize, a = this.cacheViewportSize, n = e.shadow;
      e.shadow.mapSize.set(
        t.shadow.mapSize.x,
        t.shadow.mapSize.y
      ), o.copy(n.mapSize);
      const s = n.getFrameExtents();
      o.multiply(s), a.copy(n.mapSize), (o.x > r || o.y > r) && (o.x > r && (a.x = Math.floor(
        r / s.x
      ), o.x = a.x * s.x, n.mapSize.x = a.x), o.y > r && (a.y = Math.floor(
        r / s.y
      ), o.y = a.y * s.y, n.mapSize.y = a.y)), e.shadow.map.setSize(o.x, o.y);
    }
  },
  context() {
    return {
      cacheColor: new l()
    };
  },
  commands: {
    set: {
      color({ model: e, target: t, value: r }) {
        t.color.copy(e.cacheColor.set(r));
      },
      scale: d,
      rotation: d,
      lookAt: d,
      shadow: {
        mapSize({ model: e, target: t, config: r, engine: o, key: a, value: n }) {
          t.shadow.mapSize[a] = n, e.updateShadowSize(
            t,
            r,
            o.webGLRenderer.capabilities.maxTextureSize
          );
        },
        camera({ target: e, key: t, value: r }) {
          e.shadow.camera[t] = r, e.shadow.camera.updateProjectionMatrix();
        }
      }
    }
  },
  create({ model: e, light: t, config: r, filter: o, engine: a, shadow: n }) {
    if (t.color.copy(e.cacheColor.set(r.color)), n) {
      const s = r, g = () => {
        t.shadow.map && (e.updateShadowSize(
          t,
          s,
          a.webGLRenderer.capabilities.maxTextureSize
        ), a.renderManager.removeEventListener(
          f.RENDER,
          g
        ));
      };
      if (a.renderManager.addEventListener(
        f.RENDER,
        g
      ), s.shadow) {
        for (const w in s.shadow.camera)
          t.shadow.camera[w] = s.shadow.camera[w];
        t.shadow.camera.updateProjectionMatrix();
      }
    }
    i.create({
      model: e,
      target: t,
      config: r,
      filter: {
        color: !0,
        scale: !0,
        rotation: !0,
        lookAt: !0,
        shadow: {
          mapSize: !0,
          camera: !0
        },
        ...o
      },
      engine: a
    });
  },
  dispose(e) {
    i.dispose(e);
  }
})), v = c(
  (i) => ({
    type: "AmbientLight",
    config: O,
    create({ model: e, config: t, engine: r }) {
      const o = new b();
      return i.create({
        model: e,
        light: o,
        config: t,
        filter: {},
        engine: r,
        shadow: !1
      }), o;
    },
    dispose({ target: e }) {
      i.dispose(e);
    }
  })
), D = c(
  (i) => ({
    type: "DirectionalLight",
    config: A,
    create({ model: e, config: t, engine: r }) {
      const o = new S();
      return i.create({
        model: e,
        light: o,
        config: t,
        filter: {},
        engine: r,
        shadow: !0
      }), o;
    },
    dispose({ target: e }) {
      i.dispose(e);
    }
  })
), N = c((i) => ({
  type: "HemisphereLight",
  config: P,
  shared: {
    cacheColor: new l()
  },
  commands: {
    set: {
      groundColor({ model: e, target: t, value: r }) {
        t.groundColor.copy(e.cacheColor.set(r));
      }
    }
  },
  create({ model: e, config: t, engine: r }) {
    const o = new C();
    return o.groundColor.copy(e.cacheColor.set(t.groundColor)), i.create({
      model: e,
      light: o,
      config: t,
      filter: { groundColor: !0 },
      engine: r,
      shadow: !1
    }), o;
  },
  dispose({ target: e }) {
    i.dispose(e);
  }
})), V = c((i) => ({
  type: "PointLight",
  config: M,
  create({ model: e, config: t, engine: r }) {
    const o = new z();
    return i.create({
      model: e,
      light: o,
      config: t,
      filter: {},
      engine: r,
      shadow: !0
    }), o;
  },
  dispose({ target: e }) {
    i.dispose(e);
  }
})), F = c(
  (i) => ({
    type: "RectAreaLight",
    config: H,
    commands: {
      set: {
        rotation: void 0
      }
    },
    create({ model: e, config: t, engine: r }) {
      const o = new j();
      return o.rotation.set(
        t.rotation.x,
        t.rotation.y,
        t.rotation.z
      ), o.updateMatrixWorld(), i.create({
        model: e,
        light: o,
        config: t,
        filter: {},
        engine: r,
        shadow: !0
      }), o;
    },
    dispose({ target: e }) {
      i.dispose(e);
    }
  })
), k = c((i) => ({
  type: "SpotLight",
  config: R,
  create({ model: e, config: t, engine: r }) {
    const o = new x();
    let a = {
      model: e,
      light: o,
      config: t,
      filter: { target: !0 },
      engine: r,
      shadow: !0
    };
    return t.target ? e.toTrigger("object", () => {
      const n = r.getObject3D(t.target);
      n ? (o.target = n, a.light = o) : console.error("SpotLight model: can not found vid object in engine", t.target), i.create(a);
    }) : i.create(a), o;
  },
  dispose({ target: e }) {
    i.dispose(e);
  }
})), B = L({
  type: "light",
  object: !0,
  models: [
    v,
    D,
    N,
    V,
    F,
    k
  ],
  lifeOrder: y.THREE
});
export {
  B as default,
  O as getAmbientLightConfig,
  A as getDirectionalLightConfig,
  P as getHemisphereLightConfig,
  M as getPointLightConfig,
  H as getRectAreaLightConfig,
  R as getSpotLightConfig
};
