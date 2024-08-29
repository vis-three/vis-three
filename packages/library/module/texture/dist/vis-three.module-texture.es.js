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
}).getDom(), f = function(e, t, r) {
  const n = t.resourceManager.resourceMap;
  if (!n.has(e))
    return console.warn(`engine resourceManager can not found this url: ${e}`), p;
  const a = n.get(e);
  if (Array.isArray(r)) {
    for (const s of r)
      if (a instanceof s)
        return a;
    return console.warn(
      `this url mapping resource is not a texture image class: ${e}`,
      a
    ), p;
  } else
    return a instanceof r ? a : (console.warn(
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
          handler({ target: e, key: t, value: r }) {
            e[t] = r, e.needsUpdate = !0;
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
      url({ model: e, target: t, value: r, engine: n }) {
        e.toAsync((a) => (t.image = e.getResource(r, n, [
          HTMLImageElement,
          HTMLVideoElement,
          HTMLCanvasElement
        ]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: r }) {
    const n = new H(e.replaceImage);
    return e.toAsync((a) => (n.image = e.getResource(t.url, r, [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ]), n.needsUpdate = !0, n.image !== e.replaceImage)), u(t, n, {
      type: !0,
      url: !0
    }), n.needsUpdate = !0, n;
  },
  dispose({ target: e }) {
    e.dispose();
  }
})), $ = c(() => ({
  type: "CubeTexture",
  config: O,
  shared: {
    imageHanlder({ model: e, target: t, index: r, value: n }) {
      t.images[r] = e.getResource(n, [
        HTMLImageElement,
        HTMLVideoElement,
        HTMLCanvasElement
      ]), t.needsUpdate = !0;
    }
  },
  commands: {
    set: {
      cube: {
        px({ model: e, target: t, value: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: r,
            index: 0
          });
        },
        nx({ model: e, target: t, value: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: r,
            index: 1
          });
        },
        py({ model: e, target: t, value: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: r,
            index: 2
          });
        },
        ny({ model: e, target: t, value: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: r,
            index: 3
          });
        },
        pz({ model: e, target: t, value: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: r,
            index: 4
          });
        },
        nz({ model: e, target: t, value: r }) {
          e.imageHanlder({
            model: e,
            target: t,
            value: r,
            index: 5
          });
        }
      }
    }
  },
  create({ model: e, config: t, engine: r }) {
    const n = new h(), a = t.cube, s = [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ], g = [
      e.getResource(a.px, r, s),
      e.getResource(a.nx, r, s),
      e.getResource(a.py, r, s),
      e.getResource(a.ny, r, s),
      e.getResource(a.pz, r, s),
      e.getResource(a.nz, r, s)
    ];
    return n.image = g, u(t, n, {
      type: !0,
      cube: !0
    }), n.needsUpdate = !0, n;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
class G extends i {
  constructor(t, r, n, a, s, g, x, T, M) {
    super(
      t,
      r,
      n,
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
      url({ model: e, target: t, value: r, engine: n }) {
        e.toAsync((a) => (t.image = e.getResource(r, n, [
          HTMLImageElement,
          HTMLVideoElement,
          HTMLCanvasElement
        ]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: r }) {
    const n = new G(e.replaceImage);
    return t.url && e.toAsync((a) => (n.image = e.getResource(t.url, r, [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ]), n.needsUpdate = !0, n.image !== e.replaceImage)), u(t, n, {
      type: !0,
      url: !0
    }), n.needsUpdate = !0, n;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
class l extends i {
  constructor(t) {
    super(), Object.keys(t).forEach((r) => {
      this[r] = t[r];
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
  create({ model: e, config: t, engine: r }) {
    let n;
    const a = e.getResource(t.url, r, i);
    if (a instanceof i)
      n = new l(a);
    else {
      const s = new i(a);
      n = new l(s);
    }
    return u(t, n, {
      type: !0,
      url: !0
    }), n.needsUpdate = !0, n;
  },
  dispose({ target: e }) {
    e.dispose();
  }
})), D = c(() => ({
  type: "VideoTexture",
  config: A,
  commands: {
    set: {
      url({ model: e, target: t, value: r, engine: n }) {
        e.toAsync((a) => (t.image = e.getResource(r, n, [HTMLVideoElement]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: r }) {
    const n = new I(document.createElement("video"));
    return t.url && e.toAsync((a) => (n.image = e.getResource(t.url, r, [
      HTMLVideoElement
    ]), n.needsUpdate = !0, n.image !== e.replaceImage)), u(t, n, {
      type: !0,
      url: !0
    }), n.needsUpdate = !0, n;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
function N(e) {
  e.generateLoadTextureConfig = function(t) {
    const r = f(t, this, i);
    return r instanceof HTMLCanvasElement ? null : b(U.LOADTEXTURE, {
      url: t,
      flipY: r.flipY,
      format: r.format,
      mapping: r.mapping,
      minFilter: r.minFilter,
      magFilter: r.magFilter
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
