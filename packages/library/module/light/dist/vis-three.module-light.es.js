import { emptyHandler as d, defineModule as y, SUPPORT_LIFE_CYCLE as L } from "@vis-three/tdcm";
import { Vector2 as u, Color as l, AmbientLight as b, DirectionalLight as S, HemisphereLight as C, PointLight as z, RectAreaLight as x, SpotLight as E } from "three";
import { getObjectConfig as m, defineObjectModel as j } from "@vis-three/module-object";
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
}, c = j.extend((i) => ({
  shared: {
    cacheMapSize: new u(),
    cacheViewportSize: new u(),
    updateShadowSize(e, o, r) {
      const t = this.cacheMapSize, a = this.cacheViewportSize, s = e.shadow;
      e.shadow.mapSize.set(
        o.shadow.mapSize.x,
        o.shadow.mapSize.y
      ), t.copy(s.mapSize);
      const n = s.getFrameExtents();
      t.multiply(n), a.copy(s.mapSize), (t.x > r || t.y > r) && (t.x > r && (a.x = Math.floor(
        r / n.x
      ), t.x = a.x * n.x, s.mapSize.x = a.x), t.y > r && (a.y = Math.floor(
        r / n.y
      ), t.y = a.y * n.y, s.mapSize.y = a.y)), e.shadow.map.setSize(t.x, t.y);
    }
  },
  context() {
    return {
      cacheColor: new l()
    };
  },
  commands: {
    set: {
      color({ model: e, target: o, value: r }) {
        o.color.copy(e.cacheColor.set(r));
      },
      scale: d,
      rotation: d,
      lookAt: d,
      shadow: {
        mapSize({ model: e, target: o, config: r, engine: t, key: a, value: s }) {
          o.shadow.mapSize[a] = s, e.updateShadowSize(
            o,
            r,
            t.webGLRenderer.capabilities.maxTextureSize
          );
        },
        camera({ target: e, key: o, value: r }) {
          e.shadow.camera[o] = r, e.shadow.camera.updateProjectionMatrix();
        }
      }
    }
  },
  create({ model: e, light: o, config: r, filter: t, engine: a, shadow: s }) {
    if (o.color.copy(e.cacheColor.set(r.color)), s) {
      const n = r, g = () => {
        o.shadow.map && (e.updateShadowSize(
          o,
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
          o.shadow.camera[w] = n.shadow.camera[w];
        o.shadow.camera.updateProjectionMatrix();
      }
    }
    i.create({
      model: e,
      target: o,
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
        ...t
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
    config: O,
    create({ model: e, config: o, engine: r }) {
      const t = new b();
      return i.create({
        model: e,
        light: t,
        config: o,
        filter: {},
        engine: r,
        shadow: !1
      }), t;
    },
    dispose({ target: e }) {
      i.dispose(e);
    }
  })
), v = c(
  (i) => ({
    type: "DirectionalLight",
    config: A,
    create({ model: e, config: o, engine: r }) {
      const t = new S();
      return i.create({
        model: e,
        light: t,
        config: o,
        filter: {},
        engine: r,
        shadow: !0
      }), t;
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
      groundColor({ model: e, target: o, value: r }) {
        o.groundColor.copy(e.cacheColor.set(r));
      }
    }
  },
  create({ model: e, config: o, engine: r }) {
    const t = new C();
    return t.groundColor.copy(e.cacheColor.set(o.groundColor)), i.create({
      model: e,
      light: t,
      config: o,
      filter: { groundColor: !0 },
      engine: r,
      shadow: !1
    }), t;
  },
  dispose({ target: e }) {
    i.dispose(e);
  }
})), V = c((i) => ({
  type: "PointLight",
  config: M,
  create({ model: e, config: o, engine: r }) {
    const t = new z();
    return i.create({
      model: e,
      light: t,
      config: o,
      filter: {},
      engine: r,
      shadow: !0
    }), t;
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
    create({ model: e, config: o, engine: r }) {
      const t = new x();
      return t.rotation.set(
        o.rotation.x,
        o.rotation.y,
        o.rotation.z
      ), t.updateMatrixWorld(), i.create({
        model: e,
        light: t,
        config: o,
        filter: {},
        engine: r,
        shadow: !0
      }), t;
    },
    dispose({ target: e }) {
      i.dispose(e);
    }
  })
), k = c((i) => ({
  type: "SpotLight",
  config: R,
  create({ model: e, config: o, engine: r }) {
    const t = new E();
    let a = {
      model: e,
      light: t,
      config: o,
      filter: { target: !0 },
      engine: r,
      shadow: !0
    };
    return o.target ? e.toTrigger("object", () => {
      t.target = r.getObject3D(o.target), a.light = t, i.create(a);
    }) : i.create(a), t;
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
  O as getAmbientLightConfig,
  A as getDirectionalLightConfig,
  P as getHemisphereLightConfig,
  M as getPointLightConfig,
  H as getRectAreaLightConfig,
  R as getSpotLightConfig
};
