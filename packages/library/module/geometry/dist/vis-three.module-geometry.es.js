import { getBasicConfig as U, defineModel as F, MODULE_TYPE as m, MODEL_EVENT as d, defineModule as R, SUPPORT_LIFE_CYCLE as Q } from "@vis-three/tdcm";
import { Quaternion as V, Euler as H, BoxGeometry as b, CircleGeometry as $, Vector2 as l, BufferGeometry as y, CurvePath as C, CubicBezierCurve3 as Y, LineCurve3 as T, QuadraticBezierCurve3 as N, CatmullRomCurve3 as D, ShapeGeometry as _, Shape as W, TubeGeometry as S, Path as z, Vector3 as E, Float32BufferAttribute as g, EdgesGeometry as O, ExtrudeGeometry as k, LatheGeometry as q, PlaneGeometry as X, RingGeometry as Z, TorusGeometry as J } from "three";
const h = function() {
  return Object.assign(U(), {
    center: !0,
    position: {
      x: 0,
      // percent
      y: 0,
      // percent
      z: 0
      // percent
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    },
    groups: []
  });
}, K = function() {
  return Object.assign(h(), {
    width: 5,
    height: 5,
    depth: 5,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  });
}, ee = function() {
  return Object.assign(h(), {
    width: 5,
    height: 5,
    widthSegments: 1,
    heightSegments: 1
  });
}, te = function() {
  return Object.assign(h(), {
    radius: 3,
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
}, re = function() {
  return Object.assign(h(), {
    radius: 3,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2
  });
}, ne = function() {
  return Object.assign(h(), {
    innerRadius: 2,
    outerRadius: 3,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
}, se = function() {
  return Object.assign(h(), {
    url: ""
  });
}, oe = function() {
  return Object.assign(h(), {
    attribute: {
      position: [],
      color: [],
      index: [],
      normal: [],
      uv: [],
      uv2: []
    }
  });
}, ae = function() {
  return Object.assign(h(), {
    target: "",
    thresholdAngle: 1
  });
}, x = function() {
  return Object.assign(h(), {
    center: !1,
    path: [],
    divisions: 36,
    space: !0
  });
}, ue = function() {
  return Object.assign(x(), { center: !1 });
}, ce = function() {
  return Object.assign(x(), { center: !1 });
}, ie = function() {
  return Object.assign(x(), { center: !1 });
}, pe = function() {
  return Object.assign(h(), {
    center: !1,
    path: [],
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: !1
  });
}, he = function() {
  return Object.assign(pe(), { center: !1 });
}, le = function() {
  return Object.assign(h(), {
    center: !1,
    path: "",
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: !1
  });
}, de = function() {
  return Object.assign(h(), {
    center: !1,
    shape: "",
    curveSegments: 12
  });
}, me = function() {
  return Object.assign(h(), {
    center: !1,
    shapes: "",
    options: {
      curveSegments: 12,
      steps: 1,
      depth: 1,
      bevelEnabled: !0,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 3,
      extrudePath: "",
      UVGenerator: "default"
    }
  });
}, ye = function() {
  return Object.assign(h(), {
    center: !1,
    path: "",
    space: !1,
    divisions: 36
  });
}, ge = function() {
  return Object.assign(h(), {
    path: "",
    divisions: 32,
    segments: 12,
    phiStart: 0,
    phiLength: Math.PI * 2
  });
}, Ge = function(r, e) {
  e.center && r.center(), r.computeBoundingBox();
  const t = r.boundingBox, s = e.position, n = e.rotation, o = e.scale, a = new V().setFromEuler(
    new H(n.x, n.y, n.z, "XYZ")
  );
  return r.applyQuaternion(a), r.scale(o.x, o.y, o.z), e.center && r.center(), r.computeBoundingBox(), r.translate(
    (t.max.x - t.min.x) / 2 * s.x,
    (t.max.y - t.min.y) / 2 * s.y,
    (t.max.z - t.min.z) / 2 * s.z
  ), r;
}, w = {
  reg: new RegExp(".*"),
  handler({
    config: r,
    target: e,
    model: t,
    engine: s,
    compiler: n
  }) {
    const o = t.createPuppet({
      model: t,
      config: r,
      engine: s,
      compiler: n
    });
    e.copy(o), t.disposePuppet({
      model: t,
      target: o,
      puppet: o,
      config: r,
      engine: s,
      compiler: n
    });
  }
}, p = F.extend({
  commands: {
    add: {
      groups({ target: r, value: e }) {
        r.addGroup(e.start, e.count, e.materialIndex);
      },
      $reg: [w]
    },
    set: {
      groups(r) {
        const { path: e, target: t, config: s } = r;
        if (e[1] !== void 0) {
          t.groups.splice(Number(r.path[1]), 1);
          const n = s.groups[e[1]];
          t.addGroup(n.start, n.count, n.materialIndex);
        } else
          console.warn("geometry processor can not set group", r);
      },
      $reg: [w]
    },
    delete: {
      groups({ target: r, key: e }) {
        r.groups.splice(Number(e), 1);
      },
      $reg: [w]
    }
  },
  create(r, e) {
    r.clearGroups();
    for (const t of e.groups)
      r.addGroup(t.start, t.count, t.materialIndex);
    return Ge(r, e);
  },
  dispose(r) {
    r.dispose();
  }
}), Pe = p(
  (r) => ({
    type: "BoxGeometry",
    config: K,
    create({ config: e }) {
      return r.create(
        new b(
          e.width,
          e.height,
          e.depth,
          e.widthSegments,
          e.heightSegments,
          e.depthSegments
        ),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), Ce = p(
  (r) => ({
    type: "CircleGeometry",
    config: te,
    create({ config: e }) {
      return r.create(
        new $(
          e.radius,
          e.segments,
          e.thetaStart,
          e.thetaLength
        ),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), c = function(r) {
  return r > 1 ? 1 : r < 0 ? 0 : r;
}, Ee = {
  generateTopUV(r, e, t, s, n) {
    const o = e[t * 3], a = e[t * 3 + 1], u = e[s * 3], i = e[s * 3 + 1], G = e[n * 3], P = e[n * 3 + 1];
    return [
      new l(c(o), c(a)),
      new l(c(u), c(i)),
      new l(c(G), c(P))
    ];
  },
  generateSideWallUV(r, e, t, s, n, o) {
    const a = e[t * 3], u = e[t * 3 + 1], i = e[t * 3 + 2], G = e[s * 3], P = e[s * 3 + 1], L = e[s * 3 + 2], A = e[n * 3], j = e[n * 3 + 1], M = e[n * 3 + 2], B = e[o * 3], I = e[o * 3 + 1], f = e[o * 3 + 2];
    return Math.abs(u - P) < Math.abs(a - G) ? [
      new l(c(a), c(1 - i)),
      new l(c(G), c(1 - L)),
      new l(c(A), c(1 - M)),
      new l(c(B), c(1 - f))
    ] : [
      new l(c(u), c(1 - i)),
      new l(c(P), c(1 - L)),
      new l(c(j), c(1 - M)),
      new l(c(I), c(1 - f))
    ];
  }
}, ve = { default: void 0, cover: Ee };
class we extends y {
  constructor(e) {
    super(), this.type = "LoadBufferGeometry", e && this.copy(e);
  }
}
class v extends y {
  constructor(e = [], t = 36, s = !0) {
    super(), this.type = "CurveGeometry", this.parameters = {
      path: e.map((n) => n.clone()),
      space: s,
      divisions: t
    };
  }
}
class be extends v {
  constructor(e = [], t = 36, s = !0) {
    super(e, t, s), this.type = "CubicBezierCurveGeometry";
    const n = new C();
    if (e.length < 4) {
      console.warn("CubicBezierCurveGeometry path length at least 4.");
      return;
    }
    const o = 4 + (e.length - 4) - (e.length - 4) % 3;
    for (let u = 2; u < o; u += 3)
      n.add(
        new Y(e[u - 2], e[u - 1], e[u], e[u + 1])
      );
    const a = n.curves.reduce((u, i) => u += i.arcLengthDivisions, 0);
    if (t > a) {
      const u = Math.ceil(
        (t - a) / n.curves.length
      );
      n.curves.forEach((i) => {
        i.arcLengthDivisions = i.arcLengthDivisions * (u + 1), i.updateArcLengths();
      });
    }
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class Ne extends v {
  constructor(e = [], t = 36, s = !0) {
    if (super(e, t, s), this.type = "LineCurveGeometry", !e.length) {
      console.warn("LineCurveGeometry path length at least 1.");
      return;
    }
    const n = new C();
    for (let a = 1; a < e.length; a += 1)
      n.add(new T(e[a - 1], e[a]));
    const o = n.curves.reduce((a, u) => a += u.arcLengthDivisions, 0);
    if (t > o) {
      const a = Math.ceil(
        (t - o) / n.curves.length
      );
      n.curves.forEach((u) => {
        u.arcLengthDivisions = u.arcLengthDivisions * (a + 1), u.updateArcLengths();
      });
    }
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class Se extends v {
  constructor(e = [], t = 36, s = !0) {
    super(e, t, s), this.type = "QuadraticBezierCurveGeometry";
    const n = new C();
    if (e.length < 3) {
      console.warn("QuadraticBezierCurveGeometry path length at least 3.");
      return;
    }
    const o = 3 + (e.length - 3) - (e.length - 3) % 2;
    for (let u = 1; u < o; u += 2)
      n.add(
        new N(e[u - 1], e[u], e[u + 1])
      );
    const a = n.curves.reduce((u, i) => u += i.arcLengthDivisions, 0);
    if (t > a) {
      const u = Math.ceil(
        (t - a) / n.curves.length
      );
      n.curves.forEach((i) => {
        i.arcLengthDivisions = i.arcLengthDivisions * (u + 1), i.updateArcLengths();
      });
    }
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class xe extends v {
  constructor(e = [], t = 36, s = !0) {
    if (super(e, t, s), this.type = "SplineCurveGeometry", !e.length) {
      console.warn("SplineCurveGeometry path length at least 1.");
      return;
    }
    const n = new D(e);
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class We extends _ {
  constructor(e = [new l(0, 0)], t = 12) {
    const s = new W(), n = e[0];
    if (n) {
      s.moveTo(n.x, n.y);
      for (let o = 1; o < e.length; o += 1)
        s.lineTo(e[o].x, e[o].y);
    }
    super(s, t), this.type = "LineShapeGeometry";
  }
}
class Le extends S {
  constructor(e = [], t = 64, s = 1, n = 8, o = !1) {
    if (!e.length) {
      console.warn("LineTubeGeometry path length at least 1.");
      return;
    }
    const a = new C();
    for (let u = 1; u < e.length; u += 1)
      a.add(new T(e[u - 1], e[u]));
    super(a, t, s, n, o), this.type = "LineTubeGeometry";
  }
}
class ke extends S {
  constructor(e = [], t = 64, s = 1, n = 8, o = !1) {
    if (!e.length) {
      console.warn("SplineTubeGeometry path length at least 1.");
      return;
    }
    const a = new D(e);
    super(a, t, s, n, o), this.type = "SplineTubeGeometry";
  }
}
class Me extends S {
  constructor(e = new z(), t = 64, s = 1, n = 8, o = !1) {
    super(e, t, s, n, o), this.type = "PathTubeGeometry";
  }
}
class fe extends y {
  constructor(e = new z(), t = 36, s = !0) {
    super(), this.type = "PathGeometry", this.parameters = {
      path: e,
      space: s,
      divisions: t
    }, e.curves.length && this.setFromPoints(
      s ? e.getSpacedPoints(t) : e.getPoints(t)
    );
  }
}
const Oe = p((r) => ({
  type: "CubicBezierCurveGeometry",
  config: ce,
  create({ config: e }) {
    return r.create(
      new be(
        e.path.map(
          (t) => new E(t.x, t.y, t.z)
        ),
        e.divisions,
        e.space
      ),
      e
    );
  },
  dispose({ target: e }) {
    r.dispose(e);
  }
})), Te = p((r) => ({
  type: "CustomGeometry",
  config: oe,
  shared: {
    generateGeometry(e) {
      const t = new y();
      return e.position.length && t.setAttribute(
        "position",
        new g(e.position, 3)
      ), e.color.length && t.setAttribute(
        "color",
        new g(e.color, 3)
      ), e.normal.length && t.setAttribute(
        "normal",
        new g(e.normal, 3)
      ), e.uv.length && t.setAttribute(
        "uv",
        new g(e.uv, 2)
      ), e.uv2.length && t.setAttribute(
        "uv2",
        new g(e.uv2, 2)
      ), e.index.length && t.setIndex(e.index), t;
    }
  },
  create({ model: e, config: t }) {
    return r.create(
      e.generateGeometry(t.attribute),
      t
    );
  },
  dispose({ target: e }) {
    r.dispose(e);
  }
})), De = p((r) => ({
  type: "EdgesGeometry",
  config: ae,
  shared: {
    occupyGeometry: new O(new b(5, 5, 5))
  },
  create({ model: e, config: t, engine: s }) {
    const n = s.compilerManager.getObjectFromModule(
      m.GEOMETRY,
      t.target
    );
    return !n || !(n instanceof y) ? (console.error(`engine rescoure can not found url: ${t.target}`), e.occupyGeometry) : r.create(
      new O(n, t.thresholdAngle),
      t
    );
  },
  dispose({ target: e }) {
    r.dispose(e);
  }
})), _e = p((r) => ({
  type: "ExtrudeGeometry",
  config: me,
  context({ model: e }) {
    return {
      shapeEvent: void 0,
      pathEvent: void 0
    };
  },
  create({ model: e, config: t, engine: s }) {
    var u, i;
    const n = s.compilerManager.getObjectFromModule(
      m.SHAPE,
      t.shapes
    ) || void 0, o = s.compilerManager.getObjectFromModule(
      m.PATH,
      t.options.extrudePath
    ) || void 0, a = new k(
      n,
      Object.assign({}, t.options, {
        extrudePath: o,
        UVGenerator: ve[t.options.UVGenerator || "default"]
      })
    );
    return n && (e.shapeEvent = () => {
      t.shapes = t.shapes;
    }, (u = e.toModel(t.shapes)) == null || u.on(d.COMPILED_UPDATE, e.shapeEvent)), o && (e.pathEvent = () => {
      t.options.extrudePath = t.options.extrudePath;
    }, (i = e.toModel(t.options.extrudePath)) == null || i.on(d.COMPILED_UPDATE, e.pathEvent)), r.create(a, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n, o;
    e.shapeEvent && ((n = e.toModel(t.shapes)) == null || n.off(d.COMPILED_UPDATE, e.shapeEvent)), e.pathEvent && ((o = e.toModel(t.options.extrudePath)) == null || o.off(d.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), ze = p((r) => ({
  type: "LatheGeometry",
  config: ge,
  context({ model: e }) {
    return {
      pathEvent: void 0
    };
  },
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      m.PATH,
      t.path
    ) || void 0, o = new q(
      n ? n.getPoints(t.divisions) : void 0,
      t.segments,
      t.phiStart,
      t.phiLength
    );
    return n && (e.pathEvent = () => {
      t.path = t.path;
    }, (a = e.toModel(t.path)) == null || a.on(d.COMPILED_UPDATE, e.pathEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    e.pathEvent && ((n = e.toModel(t.path)) == null || n.off(d.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), Ae = p(
  (r) => ({
    type: "LineTubeGeometry",
    config: he,
    create({ config: e }) {
      return r.create(
        new Le(
          e.path.map(
            (t) => new E(t.x, t.y, t.z)
          ),
          e.tubularSegments,
          e.radius,
          e.radialSegments,
          e.closed
        ),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), je = p(
  (r) => ({
    type: "LoadGeometry",
    config: se,
    create({ config: e, engine: t }) {
      const s = t.resourceManager.resourceMap.get(
        e.url
      );
      return !s && !(s instanceof y) ? (console.error(`engine rescoure can not found url: ${e.url}`), new b(5, 5, 5)) : r.create(
        new we(s),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), Be = p((r) => ({
  type: "PathGeometry",
  config: ye,
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      m.PATH,
      t.path
    ) || void 0, o = new fe(n, t.divisions, t.space);
    return n && (e.pathEvent = () => {
      t.path = t.path;
    }, (a = e.toModel(t.path)) == null || a.on(d.COMPILED_UPDATE, e.pathEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    e.pathEvent && ((n = e.toModel(t.path)) == null || n.off(d.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), Ie = p((r) => ({
  type: "PathTubeGeometry",
  config: le,
  context() {
    return {
      pathEvent: void 0,
      restrictor: 0
    };
  },
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      m.PATH,
      t.path
    ) || void 0, o = new Me(
      n,
      t.tubularSegments,
      t.radius,
      t.radialSegments,
      t.closed
    );
    return n && (e.pathEvent = () => {
      e.restrictor || (e.restrictor = window.setTimeout(() => {
        t.path = t.path, e.restrictor = 0;
      }, 1e3 / 30));
    }, (a = e.toModel(t.path)) == null || a.on(d.COMPILED_UPDATE, e.pathEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    window.clearTimeout(e.restrictor), e.pathEvent && ((n = e.toModel(t.path)) == null || n.off(d.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), Ue = p(
  (r) => ({
    type: "PlaneGeometry",
    config: ee,
    create({ config: e }) {
      return r.create(
        new X(
          e.width,
          e.height,
          e.widthSegments,
          e.heightSegments
        ),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), Fe = p((r) => ({
  type: "QuadraticBezierCurveGeometry",
  config: ie,
  create({ config: e }) {
    return r.create(
      new Se(
        e.path.map(
          (t) => new E(t.x, t.y, t.z)
        ),
        e.divisions,
        e.space
      ),
      e
    );
  },
  dispose({ target: e }) {
    r.dispose(e);
  }
})), Re = p(
  (r) => ({
    type: "RingGeometry",
    config: ne,
    create({ config: e }) {
      return r.create(
        new Z(
          e.innerRadius,
          e.outerRadius,
          e.thetaSegments,
          e.phiSegments,
          e.thetaStart,
          e.thetaLength
        ),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), Qe = p((r) => ({
  type: "ShapeGeometry",
  config: de,
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      m.SHAPE,
      t.shape
    ) || void 0, o = new _(n, t.curveSegments);
    return n && (e.shapeEvent = () => {
      t.shape = t.shape;
    }, (a = e.toModel(t.shape)) == null || a.on(d.COMPILED_UPDATE, e.shapeEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    e.shapeEvent && ((n = e.toModel(t.shape)) == null || n.on(d.COMPILED_UPDATE, e.shapeEvent)), r.dispose(s);
  }
})), Ve = p((r) => ({
  type: "SplineCurveGeometry",
  config: ue,
  create({ config: e }) {
    return r.create(
      new xe(
        e.path.map(
          (t) => new E(t.x, t.y, t.z)
        ),
        e.divisions,
        e.space
      ),
      e
    );
  },
  dispose({ target: e }) {
    r.dispose(e);
  }
})), He = p(
  (r) => ({
    type: "TorusGeometry",
    config: re,
    create({ config: e }) {
      return r.create(
        new J(
          e.radius,
          e.tube,
          e.radialSegments,
          e.tubularSegments,
          e.arc
        ),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), qe = R({
  type: "geometry",
  models: [
    Pe,
    Ce,
    Oe,
    Te,
    De,
    _e,
    ze,
    Ae,
    je,
    Be,
    Ie,
    Ue,
    Fe,
    Re,
    Qe,
    Ve,
    He
  ],
  lifeOrder: Q.TWO
});
export {
  be as CubicBezierCurveGeometry,
  v as CurveGeometry,
  ve as ExtrudeUVGenerator,
  Ne as LineCurveGeometry,
  We as LineShapeGeometry,
  Le as LineTubeGeometry,
  we as LoadGeometry,
  fe as PathGeometry,
  Me as PathTubeGeometry,
  Se as QuadraticBezierCurveGeometry,
  xe as SplineCurveGeometry,
  ke as SplineTubeGeometry,
  qe as default
};
