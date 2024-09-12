import { UVMapping as y, ClampToEdgeWrapping as x, LinearFilter as g, LinearMipmapLinearFilter as h, RGBAFormat as C, NoColorSpace as E, CubeReflectionMapping as L, CanvasTexture as H, CubeTexture as R, Texture as u, RGBFormat as U } from "three";
import { getBasicConfig as b, defineModel as w, generateConfig as I, CONFIG_TYPE as v, defineModule as V } from "@vis-three/tdcm";
import { CanvasGenerator as A } from "@vis-three/convenient";
import { syncObject as c } from "@vis-three/utils";
const p = function() {
  return Object.assign(b(), {
    mapping: y,
    wrapS: x,
    wrapT: x,
    magFilter: g,
    minFilter: h,
    anisotropy: 1,
    format: C,
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
    colorSpace: E,
    needsUpdate: !1
  });
}, F = function() {
  return Object.assign(p(), {
    url: ""
  });
}, O = function() {
  return Object.assign(p(), {
    url: "",
    minFilter: g
  });
}, j = function() {
  return Object.assign(p(), {
    cube: {
      nx: "",
      ny: "",
      nz: "",
      px: "",
      py: "",
      pz: ""
    },
    mapping: L,
    flipY: !1
  });
}, z = function() {
  return Object.assign(p(), {
    url: "",
    needsUpdate: !1
  });
}, S = function() {
  return Object.assign(p(), {
    url: ""
  });
}, l = new A({
  width: 512,
  height: 512
}).draw((e) => {
  e.translate(256, 256), e.font = "72px", e.fillStyle = "white", e.fillText("暂无图片", 0, 0);
}).getDom(), M = function(e, t, n) {
  const r = t.resourceManager.resourceMap;
  if (!r.has(e))
    return console.warn(`engine resourceManager can not found this url: ${e}`), l;
  const s = r.get(e);
  if (Array.isArray(n)) {
    for (const a of n)
      if (s instanceof a)
        return s;
    return console.warn(
      `this url mapping resource is not a texture image class: ${e}`,
      s
    ), l;
  } else
    return s instanceof n ? s : (console.warn(
      `this url mapping resource is not a texture image class: ${e}`,
      s
    ), l);
}, d = w.extend({
  shared: {
    replaceImage: l,
    getResource: M
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
}), Y = d(() => ({
  type: "CanvasTexture",
  config: z,
  commands: {
    set: {
      url({ model: e, target: t, value: n, engine: r }) {
        e.toAsync((s) => (t.image = e.getResource(n, r, [
          HTMLImageElement,
          HTMLVideoElement,
          HTMLCanvasElement
        ]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    const r = new H(e.replaceImage);
    return e.toAsync((s) => (r.image = e.getResource(t.url, n, [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ]), r.needsUpdate = !0, r.image !== e.replaceImage)), c(t, r, {
      type: !0,
      url: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
})), G = d(() => ({
  type: "CubeTexture",
  config: j,
  shared: {
    imageHanlder({ model: e, target: t, index: n, value: r, engine: s }) {
      t.images[n] = e.getResource(r, s, [
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
    const r = new R(), s = t.cube, a = [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ], i = [
      e.getResource(s.px, n, a),
      e.getResource(s.nx, n, a),
      e.getResource(s.py, n, a),
      e.getResource(s.ny, n, a),
      e.getResource(s.pz, n, a),
      e.getResource(s.nz, n, a)
    ];
    return r.image = i, c(t, r, {
      type: !0,
      cube: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
class $ extends u {
  constructor(t, n, r, s, a, i, o, m, f) {
    super(
      t,
      n,
      r,
      s,
      a,
      i,
      o,
      m,
      f
    );
  }
}
const B = d(() => ({
  type: "ImageTexture",
  config: F,
  commands: {
    set: {
      url({ model: e, target: t, value: n, engine: r }) {
        e.toAsync((s) => (t.image = e.getResource(n, r, [
          HTMLImageElement,
          HTMLVideoElement,
          HTMLCanvasElement
        ]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    const r = new $(e.replaceImage);
    return t.url && e.toAsync((s) => (r.image = e.getResource(t.url, n, [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement
    ]), r.needsUpdate = !0, r.image !== e.replaceImage)), c(t, r, {
      type: !0,
      url: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
class T extends u {
  constructor(t) {
    super(), Object.keys(t).forEach((n) => {
      this[n] = t[n];
    }), this.copy(t);
  }
}
const D = d(() => ({
  type: "LoadTexture",
  config: S,
  commands: {
    set: {
      url() {
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    let r;
    const s = e.getResource(t.url, n, u);
    if (s instanceof u)
      r = new T(s);
    else {
      const a = new u(s);
      r = new T(a);
    }
    return c(t, r, {
      type: !0,
      url: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
class N extends u {
  constructor(t, n, r, s, a, i, o, m, f) {
    super(
      t,
      n,
      r,
      s,
      a,
      i,
      o,
      m,
      f
    ), this.isVideoTexture = !0, this.format = o !== void 0 ? o : U, this.minFilter = i !== void 0 ? i : g, this.magFilter = a !== void 0 ? a : g, this.generateMipmaps = !1;
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const t = this.image, n = "requestVideoFrameCallback" in t;
    n ? this.needsUpdate = !0 : n === !1 && t.readyState >= t.HAVE_CURRENT_DATA && (this.needsUpdate = !0);
  }
}
const _ = d(() => ({
  type: "VideoTexture",
  config: O,
  commands: {
    set: {
      url({ model: e, target: t, value: n, engine: r }) {
        e.toAsync((s) => (t.image = e.getResource(n, r, [HTMLVideoElement]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    const r = new N(document.createElement("video"));
    return t.url && e.toAsync((s) => (r.image = e.getResource(t.url, n, [
      HTMLVideoElement
    ]), r.needsUpdate = !0, r.image !== e.replaceImage)), c(t, r, {
      type: !0,
      url: !0
    }), r.needsUpdate = !0, r;
  },
  dispose({ target: e }) {
    e.dispose();
  }
}));
function k(e) {
  e.generateLoadTextureConfig = function(t) {
    const n = M(t, this, u);
    return n instanceof HTMLCanvasElement ? null : I(v.LOADTEXTURE, {
      url: t,
      flipY: n.flipY,
      format: n.format,
      mapping: n.mapping,
      minFilter: n.minFilter,
      magFilter: n.magFilter
    });
  };
}
const J = V({
  type: "texture",
  models: [
    Y,
    G,
    B,
    D,
    _
  ],
  extend: k
});
export {
  J as default,
  z as getCanvasTextureConfig,
  j as getCubeTextureConfig,
  F as getImageTextureConfig,
  S as getLoadTextureConfig,
  p as getTextureConfig,
  O as getVideoTextureConfig
};
