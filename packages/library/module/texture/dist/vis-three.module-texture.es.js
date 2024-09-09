import { UVMapping as y, ClampToEdgeWrapping as x, LinearFilter as l, LinearMipmapLinearFilter as h, RGBAFormat as C, CubeReflectionMapping as E, CanvasTexture as L, CubeTexture as H, Texture as u, RGBFormat as R } from "three";
import { getBasicConfig as U, defineModel as b, generateConfig as w, CONFIG_TYPE as I, defineModule as v } from "@vis-three/tdcm";
import { CanvasGenerator as V } from "@vis-three/convenient";
import { syncObject as c } from "@vis-three/utils";
const p = function() {
  return Object.assign(U(), {
    mapping: y,
    wrapS: x,
    wrapT: x,
    magFilter: l,
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
    needsUpdate: !1
  });
}, A = function() {
  return Object.assign(p(), {
    url: ""
  });
}, F = function() {
  return Object.assign(p(), {
    url: "",
    minFilter: l
  });
}, O = function() {
  return Object.assign(p(), {
    cube: {
      nx: "",
      ny: "",
      nz: "",
      px: "",
      py: "",
      pz: ""
    },
    mapping: E,
    flipY: !1
  });
}, j = function() {
  return Object.assign(p(), {
    url: "",
    needsUpdate: !1
  });
}, z = function() {
  return Object.assign(p(), {
    url: ""
  });
}, g = new V({
  width: 512,
  height: 512
}).draw((e) => {
  e.translate(256, 256), e.font = "72px", e.fillStyle = "white", e.fillText("暂无图片", 0, 0);
}).getDom(), M = function(e, t, n) {
  const r = t.resourceManager.resourceMap;
  if (!r.has(e))
    return console.warn(`engine resourceManager can not found this url: ${e}`), g;
  const s = r.get(e);
  if (Array.isArray(n)) {
    for (const a of n)
      if (s instanceof a)
        return s;
    return console.warn(
      `this url mapping resource is not a texture image class: ${e}`,
      s
    ), g;
  } else
    return s instanceof n ? s : (console.warn(
      `this url mapping resource is not a texture image class: ${e}`,
      s
    ), g);
}, d = b.extend({
  shared: {
    replaceImage: g,
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
  config: j,
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
    const r = new L(e.replaceImage);
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
  config: O,
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
    const r = new H(), s = t.cube, a = [
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
class S extends u {
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
const $ = d(() => ({
  type: "ImageTexture",
  config: A,
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
    const r = new S(e.replaceImage);
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
const B = d(() => ({
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
class D extends u {
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
    ), this.isVideoTexture = !0, this.format = o !== void 0 ? o : R, this.minFilter = i !== void 0 ? i : l, this.magFilter = a !== void 0 ? a : l, this.generateMipmaps = !1;
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
  config: F,
  commands: {
    set: {
      url({ model: e, target: t, value: n, engine: r }) {
        e.toAsync((s) => (t.image = e.getResource(n, r, [HTMLVideoElement]), t.needsUpdate = !0, t.image !== e.replaceImage));
      }
    }
  },
  create({ model: e, config: t, engine: n }) {
    const r = new D(document.createElement("video"));
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
    return n instanceof HTMLCanvasElement ? null : w(I.LOADTEXTURE, {
      url: t,
      flipY: n.flipY,
      format: n.format,
      mapping: n.mapping,
      minFilter: n.minFilter,
      magFilter: n.magFilter
    });
  };
}
const X = v({
  type: "texture",
  models: [
    Y,
    G,
    $,
    B,
    _
  ],
  extend: k
});
export {
  X as default,
  j as getCanvasTextureConfig,
  O as getCubeTextureConfig,
  A as getImageTextureConfig,
  z as getLoadTextureConfig,
  p as getTextureConfig,
  F as getVideoTextureConfig
};
