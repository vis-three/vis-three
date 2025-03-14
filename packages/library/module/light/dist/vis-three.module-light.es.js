import { emptyHandler as d, defineModule as y, SUPPORT_LIFE_CYCLE as L } from "@vis-three/tdcm";
import { Vector2 as u, Color as m, AmbientLight as S, DirectionalLight as b, HemisphereLight as C, PointLight as z, RectAreaLight as x, SpotLight as E } from "three";
import { getObjectConfig as l, defineObjectModel as j } from "@vis-three/module-object";
import { ENGINE_EVENT as f } from "@vis-three/core";
const h = function() {
  return Object.assign(l(), {
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
}, A = function() {
  return Object.assign(l(), {
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
}, O = function() {
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
      targetAt: ""
    }
  );
}, R = function() {
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
}, c = j.extend((i) => ({
  shared: {
    cacheMapSize: new u(),
    cacheViewportSize: new u(),
    updateShadowSize(e, t, r) {
      const o = this.cacheMapSize, a = this.cacheViewportSize, s = e.shadow;
      e.shadow.mapSize.set(
        t.shadow.mapSize.x,
        t.shadow.mapSize.y
      ), o.copy(s.mapSize);
      const n = s.getFrameExtents();
      o.multiply(n), a.copy(s.mapSize), (o.x > r || o.y > r) && (o.x > r && (a.x = Math.floor(
        r / n.x
      ), o.x = a.x * n.x, s.mapSize.x = a.x), o.y > r && (a.y = Math.floor(
        r / n.y
      ), o.y = a.y * n.y, s.mapSize.y = a.y)), e.shadow.map.setSize(o.x, o.y);
    }
  },
  context() {
    return {
      cacheColor: new m()
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
        mapSize({ model: e, target: t, config: r, engine: o, key: a, value: s }) {
          t.shadow.mapSize[a] = s, e.updateShadowSize(
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
  create({ model: e, light: t, config: r, filter: o, engine: a, shadow: s }) {
    if (t.color.copy(e.cacheColor.set(r.color)), s) {
      const n = r, g = () => {
        t.shadow.map && (e.updateShadowSize(
          t,
          n,
          a.webGLRenderer.capabilities.maxTextureSize
        ), a.renderManager.removeEventListener(
          f.RENDER,
          g
        ));
      };
      if (a.renderManager.addEventListener(
        f.RENDER,
        g
      ), n.shadow) {
        for (const w in n.shadow.camera)
          t.shadow.camera[w] = n.shadow.camera[w];
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
})), D = c(
  (i) => ({
    type: "AmbientLight",
    config: A,
    create({ model: e, config: t, engine: r }) {
      const o = new S();
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
), v = c(
  (i) => ({
    type: "DirectionalLight",
    config: R,
    create({ model: e, config: t, engine: r }) {
      const o = new b();
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
    cacheColor: new m()
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
      const o = new x();
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
  config: O,
  create({ model: e, config: t, engine: r }) {
    const o = new E();
    return t.targetAt && (o.target = r.getObject3D(t.targetAt)), i.create({
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
})), B = y({
  type: "light",
  object: !0,
  models: [
    D,
    v,
    N,
    V,
    F,
    k
  ],
  lifeOrder: L.THREE
});
export {
  B as default,
  A as getAmbientLightConfig,
  R as getDirectionalLightConfig,
  P as getHemisphereLightConfig,
  M as getPointLightConfig,
  H as getRectAreaLightConfig,
  O as getSpotLightConfig
};
