import { UVMapping as y, ClampToEdgeWrapping as m, LinearFilter as d, LinearMipmapLinearFilter as L, RGBAFormat as E, CubeReflectionMapping as C, CanvasTexture as H, CubeTexture as h, Texture as i, VideoTexture as I } from "three";
import { getBasicConfig as w, defineModel as R, generateConfig as b, CONFIG_TYPE as U, defineModule as v } from "@vis-three/tdcm";
import { CanvasGenerator as F } from "@vis-three/convenient";
import { syncObject as u } from "@vis-three/utils";
const o = function() {
  return Object.assign(w(), {
    mapping: y,
    wrapS: m,
    wrapT: m,
    magFilter: d,
    minFilter: L,
    anisotropy: 1,
    format: E,
    flipY: !0,
    offset: {
      x: 0,
      y: 0
    },
    repeat: {
      x: 1,
      y: 1
    },
    rotation: 0,
    center: {
      x: 0,
      y: 0
    },
    matrixAutoUpdate: !0,
    needsUpdate: !1
  });
}, V = function() {
  return Object.assign(o(), {
    url: ""
  });
}, A = function() {
  return Object.assign(o(), {
    url: "",
    minFilter: d
  });
}, O = function() {
  return Object.assign(o(), {
    cube: {
      nx: "",
      ny: "",
      nz: "",
      px: "",
      py: "",
      pz: ""
    },
    mapping: C,
    flipY: !1
  });
}, j = function() {
  return Object.assign(o(), {
    url: "",
    needsUpdate: !1
  });
}, z = function() {
  return Object.assign(o(), {
    url: ""
  });
}, p = new F({
  width: 512,
  height: 512
}).draw((e) => {
  e.translate(256, 256), e.font = "72px", e.fillStyle = "white", e.fillText("暂无图片", 0, 0);
}).getDom(), f = function(e, t, n) {
  const r = t.resourceManager.resourceMap;
  if (!r.has(e))
    return console.warn(`engine resourceManager can not found this url: ${e}`), p;
  const a = r.get(e);
  if (Array.isArray(n)) {
    for (const s of n)
      if (a instanceof s)
        return a;
    return console.warn(
      `this url mapping resource is not a texture image class: ${e}`,
      a
    ), p;
  } else
    return a instanceof n ? a : (console.warn(
      `this url mapping resource is not a texture image class: ${e}`,
      a
    ), p);
}, c = R.extend({
  shared: {
    replaceImage: p,
    getResource: f
  },
  commands: {
    set: {
      $reg: [
        {
          reg: new RegExp(
            "wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping|flipY"
          ),
          handler({ target: e, key: t, value: n }) {
            e[t] = n, e.needsUpdate = !0;
          }
        }
      ]
    }
  }
}), Y = c(() => ({
  type: "CanvasTexture",
  config: j,
  commands: {
    set: {
      url({ model: e, target: t, value: n, engine: r }) {
        e.toAsync((a) => (t.image = e.getResource(n, r, [
          HTMLImageElement,
          HTMLVideoElement,
          HTMLCanvasElement
        ]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    const r = new H(e.replaceImage);
    return e.toAsync((a) => (r.image = e.getResource(t.url, n, [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ]), r.needsUpdate = !0, r.image !== e.replaceImage)), u(t, r, {
      type: !0,
      url: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
})), $ = c(() => ({
  type: "CubeTexture",
  config: O,
  shared: {
    imageHanlder({ model: e, target: t, index: n, value: r, engine: a }) {
      t.images[n] = e.getResource(r, a, [
        HTMLImageElement,
        HTMLVideoElement,
        HTMLCanvasElement
      ]), t.needsUpdate = !0;
    }
  },
  commands: {
    set: {
      cube: {
        px({ model: e, target: t, value: n, engine: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: n,
            index: 0,
            engine: r
          });
        },
        nx({ model: e, target: t, value: n, engine: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: n,
            index: 1,
            engine: r
          });
        },
        py({ model: e, target: t, value: n, engine: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: n,
            index: 2,
            engine: r
          });
        },
        ny({ model: e, target: t, value: n, engine: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: n,
            index: 3,
            engine: r
          });
        },
        pz({ model: e, target: t, value: n, engine: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: n,
            index: 4,
            engine: r
          });
        },
        nz({ model: e, target: t, value: n, engine: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: n,
            index: 5,
            engine: r
          });
        }
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    const r = new h(), a = t.cube, s = [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ], g = [
      e.getResource(a.px, n, s),
      e.getResource(a.nx, n, s),
      e.getResource(a.py, n, s),
      e.getResource(a.ny, n, s),
      e.getResource(a.pz, n, s),
      e.getResource(a.nz, n, s)
    ];
    return r.image = g, u(t, r, {
      type: !0,
      cube: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
class G extends i {
  constructor(t, n, r, a, s, g, x, T, M) {
    super(
      t,
      n,
      r,
      a,
      s,
      g,
      x,
      T,
      M
    );
  }
}
const S = c(() => ({
  type: "ImageTexture",
  config: V,
  commands: {
    set: {
      url({ model: e, target: t, value: n, engine: r }) {
        e.toAsync((a) => (t.image = e.getResource(n, r, [
          HTMLImageElement,
          HTMLVideoElement,
          HTMLCanvasElement
        ]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    const r = new G(e.replaceImage);
    return t.url && e.toAsync((a) => (r.image = e.getResource(t.url, n, [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ]), r.needsUpdate = !0, r.image !== e.replaceImage)), u(t, r, {
      type: !0,
      url: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
class l extends i {
  constructor(t) {
    super(), Object.keys(t).forEach((n) => {
      this[n] = t[n];
    }), this.copy(t);
  }
}
const B = c(() => ({
  type: "LoadTexture",
  config: z,
  commands: {
    set: {
      url() {
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    let r;
    const a = e.getResource(t.url, n, i);
    if (a instanceof i)
      r = new l(a);
    else {
      const s = new i(a);
      r = new l(s);
    }
    return u(t, r, {
      type: !0,
      url: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
})), D = c(() => ({
  type: "VideoTexture",
  config: A,
  commands: {
    set: {
      url({ model: e, target: t, value: n, engine: r }) {
        e.toAsync((a) => (t.image = e.getResource(n, r, [HTMLVideoElement]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    const r = new I(document.createElement("video"));
    return t.url && e.toAsync((a) => (r.image = e.getResource(t.url, n, [
      HTMLVideoElement
    ]), r.needsUpdate = !0, r.image !== e.replaceImage)), u(t, r, {
      type: !0,
      url: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
function N(e) {
  e.generateLoadTextureConfig = function(t) {
    const n = f(t, this, i);
    return n instanceof HTMLCanvasElement ? null : b(U.LOADTEXTURE, {
      url: t,
      flipY: n.flipY,
      format: n.format,
      mapping: n.mapping,
      minFilter: n.minFilter,
      magFilter: n.magFilter
    });
  };
}
const k = v({
  type: "texture",
  models: [
    Y,
    $,
    S,
    B,
    D
  ],
  extend: N
});
export {
  k as default,
  j as getCanvasTextureConfig,
  O as getCubeTextureConfig,
  V as getImageTextureConfig,
  z as getLoadTextureConfig,
  o as getTextureConfig,
  A as getVideoTextureConfig
};
