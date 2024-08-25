import { getBasicConfig as w, defineModel as v, MODULE_TYPE as C, defineModule as x, SUPPORT_LIFE_CYCLE as O } from "@vis-three/tdcm";
import { FrontSide as j, OneMinusSrcAlphaFactor as L, AddEquation as P, NormalBlending as B, SrcAlphaFactor as I, MultiplyOperation as g, TangentSpaceNormalMap as M, Color as h, Texture as R, LineBasicMaterial as T, LineDashedMaterial as A, MeshBasicMaterial as U, MeshMatcapMaterial as E, MeshPhongMaterial as F, MeshPhysicalMaterial as D, MeshStandardMaterial as N, PointsMaterial as z, ShaderMaterial as $, SpriteMaterial as H } from "three";
import { syncObject as S } from "@vis-three/utils";
const d = function() {
  return Object.assign(w(), {
    type: "Material",
    alphaTest: 0,
    colorWrite: !0,
    depthTest: !0,
    depthWrite: !0,
    name: "",
    needsUpdate: !1,
    opacity: 1,
    dithering: !1,
    shadowSide: null,
    side: j,
    toneMapped: !0,
    transparent: !1,
    visible: !0,
    blendDst: L,
    blendDstAlpha: null,
    blendEquation: P,
    blendEquationAlpha: null,
    blending: B,
    blendSrc: I,
    blendSrcAlpha: null,
    polygonOffset: !1,
    polygonOffsetFactor: 0,
    polygonOffsetUnits: 0
  });
}, J = function() {
  return Object.assign(d(), {
    color: "rgb(255, 255, 255)",
    combine: g,
    aoMapIntensity: 1,
    fog: !0,
    lightMapIntensity: 1,
    reflectivity: 1,
    refractionRatio: 0.98,
    wireframe: !1,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    wireframeLinewidth: 1,
    map: "",
    envMap: "",
    alphaMap: "",
    aoMap: "",
    lightMap: "",
    specularMap: ""
  });
}, y = function() {
  return Object.assign(d(), {
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: !1,
    lightMapIntensity: 1,
    metalness: 0,
    normalMapType: M,
    refractionRatio: 0.98,
    roughness: 1,
    wireframe: !1,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    roughnessMap: "",
    normalMap: "",
    metalnessMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: ""
  });
}, V = function() {
  return Object.assign(y(), {
    attenuationColor: "rgb(255, 255, 255)",
    attenuationDistance: 0,
    clearcoat: 0,
    clearcoatNormalScale: {
      x: 1,
      y: 1
    },
    clearcoatRoughness: 0,
    ior: 1.5,
    reflectivity: 0.5,
    sheen: 0,
    sheenRoughness: 1,
    sheenColor: "rgb(255, 255, 255)",
    specularIntensity: 0,
    specularColor: "rgb(255, 255, 255)",
    thickness: 0,
    transmission: 0,
    clearcoatMap: "",
    clearcoatNormalMap: "",
    clearcoatRoughnessMap: "",
    sheenRoughnessMap: "",
    sheenColorMap: "",
    specularIntensityMap: "",
    specularColorMap: "",
    thicknessMap: "",
    transmissionMap: ""
  });
}, W = function() {
  return Object.assign(d(), {
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: !1,
    lightMapIntensity: 1,
    normalMapType: M,
    refractionRatio: 0.98,
    wireframe: !1,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    specular: "rgb(17, 17, 17)",
    shininess: 30,
    combine: g,
    normalMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: "",
    specularMap: ""
  });
}, q = function() {
  return Object.assign(d(), {
    color: "rgb(255, 255, 255)",
    rotation: 0,
    map: "",
    alphaMap: "",
    sizeAttenuation: !0
  });
}, b = function() {
  return Object.assign(d(), {
    color: "rgb(255, 255, 255)",
    linecap: "round",
    linejoin: "round",
    linewidth: 1
  });
}, k = function() {
  return Object.assign(b(), {
    dashSize: 3,
    gapSize: 1,
    scale: 1
  });
}, Y = function() {
  return Object.assign(d(), {
    map: "",
    alphaMap: "",
    color: "rgb(255, 255, 255)",
    sizeAttenuation: !0,
    size: 1
  });
}, X = function() {
  return Object.assign(d(), {
    shader: "",
    uniforms: {}
  });
}, G = function() {
  return Object.assign(d(), {
    color: "rgb(255, 255, 255)",
    bumpScale: 1,
    displacementScale: 1,
    displacementBias: 0,
    flatShading: !1,
    fog: !0,
    normalMapType: M,
    normalSale: { x: 1, y: 1 },
    map: "",
    alphaMap: "",
    bumpMap: "",
    displacementMap: "",
    matcap: "",
    normalMap: ""
  });
}, K = {
  reg: new RegExp("transparent|sizeAttenuation"),
  handler({ target: t, key: e, value: a }) {
    t[e] = a, t.needsUpdate = !0;
  }
}, m = function({
  model: t,
  target: e,
  key: a,
  value: r,
  engine: n
}) {
  t.toAsync((i) => {
    if (!r)
      return e[a] = null, e.needsUpdate = !0, !0;
    const p = n.compilerManager.getObjectFromModule(
      C.TEXTURE,
      r
    );
    return p instanceof R ? (e[a] = p, e.needsUpdate = !0, !0) : (i && console.warn(
      `this url resource is not instance of Texture: ${a}`,
      r,
      p
    ), e[a] = null, !1);
  });
}, Q = function() {
  return m;
}, Z = {
  reg: new RegExp("map$", "i"),
  handler: m
}, _ = function({
  model: t,
  target: e,
  key: a,
  value: r
}) {
  e[a].copy(t.cacheColor.set(r));
}, s = function() {
  return _;
}, l = v.extend({
  commands: {
    set: {
      $reg: [Z, K]
    }
  },
  create({
    model: t,
    target: e,
    config: a,
    engine: r
  }) {
    const n = {};
    for (const i of Object.keys(a))
      i.toLocaleLowerCase().endsWith("map") && a[i] ? (m.call(t, {
        target: e,
        key: i,
        value: a[i],
        engine: r
      }), n[i] = !0) : e[i] instanceof h && (e[i] = new h(a[i]), n[i] = !0);
    return S(a, e, n), e.needsUpdate = !0, e;
  },
  dispose({ target: t }) {
    t.dispose();
  }
}), ee = l(
  (t) => ({
    type: "LineBasicMaterial",
    config: b,
    commands: {
      set: {
        color: s()
      }
    },
    create({ model: e, config: a, engine: r }) {
      return t.create({
        model: e,
        target: new T(),
        config: a,
        engine: r
      });
    },
    dispose({ target: e }) {
      t.dispose({ target: e });
    }
  })
), ae = l((t) => ({
  type: "LineDashedMaterial",
  config: k,
  commands: {
    set: {
      color: s()
    }
  },
  create({ model: e, config: a, engine: r }) {
    return t.create({
      model: e,
      target: new A(),
      config: a,
      engine: r
    });
  },
  dispose({ target: e }) {
    t.dispose({ target: e });
  }
})), te = l(
  (t) => ({
    type: "MeshBasicMaterial",
    config: J,
    commands: {
      set: {
        color: s()
      }
    },
    create({ model: e, config: a, engine: r }) {
      return t.create({
        model: e,
        target: new U(),
        config: a,
        engine: r
      });
    },
    dispose({ target: e }) {
      t.dispose({ target: e });
    }
  })
), ne = l((t) => ({
  type: "MeshMatcapMaterial",
  config: G,
  commands: {
    set: {
      color: s(),
      matcap: Q()
    }
  },
  create({ model: e, config: a, engine: r }) {
    return t.create({
      model: e,
      target: new E(),
      config: a,
      engine: r
    });
  },
  dispose({ target: e }) {
    t.dispose({ target: e });
  }
})), re = l(
  (t) => ({
    type: "MeshPhongMaterial",
    config: W,
    commands: {
      set: {
        color: s(),
        emissive: s(),
        specular: s()
      }
    },
    create({ model: e, config: a, engine: r }) {
      return t.create({
        model: e,
        target: new F(),
        config: a,
        engine: r
      });
    },
    dispose({ target: e }) {
      t.dispose({ target: e });
    }
  })
), ie = l((t) => ({
  type: "MeshPhysicalMaterial",
  config: V,
  commands: {
    set: {
      color: s(),
      emissive: s(),
      specularColor: s(),
      sheenColor: s(),
      attenuationColor: s()
    }
  },
  create({ model: e, config: a, engine: r }) {
    return t.create({
      model: e,
      target: new D(),
      config: a,
      engine: r
    });
  },
  dispose({ target: e }) {
    t.dispose({ target: e });
  }
})), se = l((t) => ({
  type: "MeshStandardMaterial",
  config: y,
  commands: {
    set: {
      color: s(),
      emissive: s()
    }
  },
  create({ model: e, config: a, engine: r }) {
    return t.create({
      model: e,
      target: new N(),
      config: a,
      engine: r
    });
  },
  dispose({ target: e }) {
    t.dispose({ target: e });
  }
})), oe = l(
  (t) => ({
    type: "PointsMaterial",
    config: Y,
    commands: {
      set: {
        color: s()
      }
    },
    create({ model: e, config: a, engine: r }) {
      return t.create({
        model: e,
        target: new z(),
        config: a,
        engine: r
      });
    },
    dispose({ target: e }) {
      t.dispose({ target: e });
    }
  })
), c = class c {
  /**
   * 获取着色器文件
   * @param name 文件名
   * @returns shader | null
   */
  static getShader(e) {
    return c.library.has(e) ? c.cloneShader(c.library.get(e)) : (console.warn(`con not found shader in shader library: ${e}`), null);
  }
  /**
   * 获取该着色器文件对应的配置
   * @param name
   * @returns
   */
  static generateConfig(e, a) {
    if (!c.library.has(e))
      return console.warn(`con not found shader in shader library: ${e}`), { shader: e, uniforms: {} };
    const r = c.library.get(e), n = {
      shader: e,
      uniforms: {}
    };
    if (r.uniforms && (n.uniforms = JSON.parse(JSON.stringify(r.uniforms))), a) {
      const i = (p, u) => {
        for (const o in u)
          p[o] !== void 0 && (typeof u[o] == "object" && u[o] !== null && !Array.isArray(u[o]) ? (p[o] === null && (p[o] = { ...u[o] }), i(p[o], u[o])) : p[o] = u[o]);
      };
      i(n.uniforms, a);
    }
    return n;
  }
  /**
   * 克隆着色器
   * @param shader
   * @returns
   */
  static cloneShader(e) {
    const a = {
      name: e.name
    };
    return e.vertexShader && (a.vertexShader = e.vertexShader), e.fragmentShader && (a.fragmentShader = e.fragmentShader), e.uniforms && (a.uniforms = JSON.parse(JSON.stringify(e.uniforms))), a;
  }
};
c.library = /* @__PURE__ */ new Map(), c.register = function(e) {
  c.library.has(e.name) && console.warn(
    `shader library has exist shader: ${e.name} that will be cover.`
  ), c.library.set(e.name, e);
};
let f = c;
const ce = l((t) => ({
  type: "ShaderMaterial",
  config: X,
  shared: {
    defaultVertexShader: `
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
    defaultFragmentShader: `
    void main () {
      gl_FragColor = vec4(0.8,0.8,0.8,1.0);
    }`
  },
  commands: {
    set: {
      shader({ model: e, target: a, value: r }) {
        if (a.vertexShader = e.defaultVertexShader, a.fragmentShader = e.defaultFragmentShader, r) {
          const n = f.getShader(r);
          n != null && n.vertexShader && (a.vertexShader = n.vertexShader), n != null && n.fragmentShader && (a.fragmentShader = n.fragmentShader), n != null && n.uniforms && (a.uniforms = n.uniforms), n != null && n.defines && (a.defines = n.defines);
        }
        a.needsUpdate = !0;
      }
    }
  },
  create({ model: e, config: a, engine: r }) {
    const n = new $();
    if (n.vertexShader = e.defaultVertexShader, n.fragmentShader = e.defaultFragmentShader, a.shader) {
      const i = f.getShader(a.shader);
      i != null && i.vertexShader && (n.vertexShader = i.vertexShader), i != null && i.fragmentShader && (n.fragmentShader = i.fragmentShader), i != null && i.uniforms && (n.uniforms = i.uniforms), i != null && i.defines && (n.defines = i.defines);
    }
    return S(a, n, {
      type: !0,
      shader: !0
    }), n.needsUpdate = !0, n;
  },
  dispose({ target: e }) {
    t.dispose({ target: e });
  }
})), le = l(
  (t) => ({
    type: "SpriteMaterial",
    config: q,
    commands: {
      set: {
        color: s()
      }
    },
    create({ model: e, config: a, engine: r }) {
      return t.create({
        model: e,
        target: new H(),
        config: a,
        engine: r
      });
    },
    dispose({ target: e }) {
      t.dispose({ target: e });
    }
  })
), fe = x({
  type: "material",
  models: [
    ee,
    ae,
    te,
    ne,
    re,
    ie,
    se,
    oe,
    ce,
    le
  ],
  lifeOrder: O.TWO
});
export {
  f as ShaderManager,
  fe as default,
  b as getLineBasicMaterialConfig,
  k as getLineDashedMaterialConfig,
  d as getMaterialConfig,
  J as getMeshBasicMaterialConfig,
  G as getMeshMatcapMaterialConfig,
  W as getMeshPhongMaterialConfig,
  V as getMeshPhysicalMaterialConfig,
  y as getMeshStandardMaterialConfig,
  Y as getPointsMaterialConfig,
  X as getShaderMaterialConfig,
  q as getSpriteMaterialConfig
};
