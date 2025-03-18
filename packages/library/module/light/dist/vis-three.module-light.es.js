import { emptyHandler as d, defineModule as y, SUPPORT_LIFE_CYCLE as L } from "@vis-three/tdcm";
import { Vector2 as w, Color as f, AmbientLight as b, DirectionalLight as S, HemisphereLight as C, PointLight as z, RectAreaLight as x, Object3D as j, SpotLight as E } from "three";
import { getObjectConfig as m, defineObjectModel as O } from "@vis-three/module-object";
import { ENGINE_EVENT as l } from "@vis-three/core";
const h = function() {
  return Object.assign(m(), {
    type: "Light",
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
}, p = function(a) {
  return Object.assign(h(), {
    shadow: {
      bias: 0,
      normalBias: 0,
      radius: 1,
      mapSize: {
        x: 512,
        y: 512
      },
      camera: a
    }
  });
}, M = function() {
  return Object.assign(m(), {
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
}, R = function() {
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
}, v = function() {
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
      target: {
        x: 0,
        y: 0,
        z: 0
      }
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
}, D = function() {
  return Object.assign(h(), {
    width: 10,
    height: 10
  });
}, c = O.extend((a) => ({
  shared: {
    cacheMapSize: new w(),
    cacheViewportSize: new w(),
    updateShadowSize(e, t, r) {
      const o = this.cacheMapSize, i = this.cacheViewportSize, n = e.shadow;
      e.shadow.mapSize.set(
        t.shadow.mapSize.x,
        t.shadow.mapSize.y
      ), o.copy(n.mapSize);
      const s = n.getFrameExtents();
      o.multiply(s), i.copy(n.mapSize), (o.x > r || o.y > r) && (o.x > r && (i.x = Math.floor(
        r / s.x
      ), o.x = i.x * s.x, n.mapSize.x = i.x), o.y > r && (i.y = Math.floor(
        r / s.y
      ), o.y = i.y * s.y, n.mapSize.y = i.y)), e.shadow.map.setSize(o.x, o.y);
    }
  },
  context() {
    return {
      cacheColor: new f()
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
        mapSize({ model: e, target: t, config: r, engine: o, key: i, value: n }) {
          t.shadow.mapSize[i] = n, e.updateShadowSize(
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
  create({ model: e, light: t, config: r, filter: o, engine: i, shadow: n }) {
    if (t.color.copy(e.cacheColor.set(r.color)), n) {
      const s = r, g = () => {
        t.shadow.map && (e.updateShadowSize(
          t,
          s,
          i.webGLRenderer.capabilities.maxTextureSize
        ), i.renderManager.removeEventListener(
          l.RENDER,
          g
        ));
      };
      if (i.renderManager.addEventListener(
        l.RENDER,
        g
      ), s.shadow) {
        for (const u in s.shadow.camera)
          t.shadow.camera[u] = s.shadow.camera[u];
        t.shadow.camera.updateProjectionMatrix();
      }
    }
    a.create({
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
      engine: i
    });
  },
  dispose(e) {
    a.dispose(e);
  }
})), H = c(
  (a) => ({
    type: "AmbientLight",
    config: M,
    create({ model: e, config: t, engine: r }) {
      const o = new b();
      return a.create({
        model: e,
        light: o,
        config: t,
        filter: {},
        engine: r,
        shadow: !1
      }), o;
    },
    dispose({ target: e }) {
      a.dispose(e);
    }
  })
), N = c(
  (a) => ({
    type: "DirectionalLight",
    config: A,
    create({ model: e, config: t, engine: r }) {
      const o = new S();
      return a.create({
        model: e,
        light: o,
        config: t,
        filter: {},
        engine: r,
        shadow: !0
      }), o;
    },
    dispose({ target: e }) {
      a.dispose(e);
    }
  })
), T = c((a) => ({
  type: "HemisphereLight",
  config: P,
  shared: {
    cacheColor: new f()
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
    return o.groundColor.copy(e.cacheColor.set(t.groundColor)), a.create({
      model: e,
      light: o,
      config: t,
      filter: { groundColor: !0 },
      engine: r,
      shadow: !1
    }), o;
  },
  dispose({ target: e }) {
    a.dispose(e);
  }
})), V = c((a) => ({
  type: "PointLight",
  config: R,
  create({ model: e, config: t, engine: r }) {
    const o = new z();
    return a.create({
      model: e,
      light: o,
      config: t,
      filter: {},
      engine: r,
      shadow: !0
    }), o;
  },
  dispose({ target: e }) {
    a.dispose(e);
  }
})), F = c(
  (a) => ({
    type: "RectAreaLight",
    config: D,
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
      ), o.updateMatrixWorld(), a.create({
        model: e,
        light: o,
        config: t,
        filter: {},
        engine: r,
        shadow: !0
      }), o;
    },
    dispose({ target: e }) {
      a.dispose(e);
    }
  })
), k = c((a) => ({
  type: "SpotLight",
  config: v,
  context() {
    return {
      virtualTarget: new j()
    };
  },
  create({ model: e, config: t, engine: r }) {
    const o = new E();
    return o.target = e.virtualTarget, t.target && (typeof t.target == "string" ? e.toTrigger("object", (i) => {
      const n = r.getObject3D(t.target);
      return n ? (o.target = n, !0) : (i || console.error(
        "SpotLight model: can not found vid object in engine",
        t.target
      ), !1);
    }) : e.virtualTarget.position.set(
      t.target.x,
      t.target.y,
      t.target.z
    )), a.create({
      model: e,
      light: o,
      config: t,
      filter: { target: !0 },
      engine: r,
      shadow: !0
    }), o;
  },
  dispose({ model: e, target: t }) {
    t.target = e.virtualTarget, a.dispose(t);
  }
})), B = y({
  type: "light",
  object: !0,
  models: [
    H,
    N,
    T,
    V,
    F,
    k
  ],
  lifeOrder: L.THREE
});
export {
  B as default,
  M as getAmbientLightConfig,
  A as getDirectionalLightConfig,
  P as getHemisphereLightConfig,
  R as getPointLightConfig,
  D as getRectAreaLightConfig,
  v as getSpotLightConfig
};
