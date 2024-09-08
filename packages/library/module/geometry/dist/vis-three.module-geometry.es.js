import { getBasicConfig as U, defineModel as F, MODULE_TYPE as m, MODEL_EVENT as d, defineModule as R, SUPPORT_LIFE_CYCLE as Q } from "@vis-three/tdcm";
import { Quaternion as V, Euler as H, BoxGeometry as S, CircleGeometry as $, Vector2 as l, BufferGeometry as y, CurvePath as w, CubicBezierCurve3 as Y, LineCurve3 as T, QuadraticBezierCurve3 as N, CatmullRomCurve3 as D, ShapeGeometry as _, Shape as W, TubeGeometry as b, Path as z, Vector3 as C, Float32BufferAttribute as g, EdgesGeometry as O, ExtrudeGeometry as k, LatheGeometry as q, PlaneGeometry as X, RingGeometry as Z, TorusGeometry as J, SphereGeometry as K } from "three";
const p = function() {
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
}, ee = function() {
  return Object.assign(p(), {
    width: 5,
    height: 5,
    depth: 5,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  });
}, te = function() {
  return Object.assign(p(), {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  });
}, re = function() {
  return Object.assign(p(), {
    width: 5,
    height: 5,
    widthSegments: 1,
    heightSegments: 1
  });
}, ne = function() {
  return Object.assign(p(), {
    radius: 3,
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
}, se = function() {
  return Object.assign(p(), {
    radius: 3,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2
  });
}, oe = function() {
  return Object.assign(p(), {
    innerRadius: 2,
    outerRadius: 3,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
}, ae = function() {
  return Object.assign(p(), {
    url: ""
  });
}, ue = function() {
  return Object.assign(p(), {
    attribute: {
      position: [],
      color: [],
      index: [],
      normal: [],
      uv: [],
      uv2: []
    }
  });
}, ie = function() {
  return Object.assign(p(), {
    target: "",
    thresholdAngle: 1
  });
}, L = function() {
  return Object.assign(p(), {
    center: !1,
    path: [],
    divisions: 36,
    space: !0
  });
}, ce = function() {
  return Object.assign(L(), { center: !1 });
}, he = function() {
  return Object.assign(L(), { center: !1 });
}, pe = function() {
  return Object.assign(L(), { center: !1 });
}, le = function() {
  return Object.assign(p(), {
    center: !1,
    path: [],
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: !1
  });
}, de = function() {
  return Object.assign(le(), { center: !1 });
}, me = function() {
  return Object.assign(p(), {
    center: !1,
    path: "",
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: !1
  });
}, ye = function() {
  return Object.assign(p(), {
    center: !1,
    shape: "",
    curveSegments: 12
  });
}, ge = function() {
  return Object.assign(p(), {
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
}, Ge = function() {
  return Object.assign(p(), {
    center: !1,
    path: "",
    space: !1,
    divisions: 36
  });
}, Pe = function() {
  return Object.assign(p(), {
    path: "",
    divisions: 32,
    segments: 12,
    phiStart: 0,
    phiLength: Math.PI * 2
  });
}, we = function(r, e) {
  e.center && r.center(), r.computeBoundingBox();
  const t = r.boundingBox, s = e.position, n = e.rotation, o = e.scale, a = new V().setFromEuler(
    new H(n.x, n.y, n.z, "XYZ")
  );
  return r.applyQuaternion(a), r.scale(o.x, o.y, o.z), e.center && r.center(), r.computeBoundingBox(), r.translate(
    (t.max.x - t.min.x) / 2 * s.x,
    (t.max.y - t.min.y) / 2 * s.y,
    (t.max.z - t.min.z) / 2 * s.z
  ), r;
}, v = {
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
}, h = F.extend({
  commands: {
    add: {
      groups({ target: r, value: e }) {
        r.addGroup(e.start, e.count, e.materialIndex);
      },
      $reg: [v]
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
      $reg: [v]
    },
    delete: {
      groups({ target: r, key: e }) {
        r.groups.splice(Number(e), 1);
      },
      $reg: [v]
    }
  },
  create(r, e) {
    r.clearGroups();
    for (const t of e.groups)
      r.addGroup(t.start, t.count, t.materialIndex);
    return we(r, e);
  },
  dispose(r) {
    r.dispose();
  }
}), Ce = h(
  (r) => ({
    type: "BoxGeometry",
    config: ee,
    create({ config: e }) {
      return r.create(
        new S(
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
), Ee = h(
  (r) => ({
    type: "CircleGeometry",
    config: ne,
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
), i = function(r) {
  return r > 1 ? 1 : r < 0 ? 0 : r;
}, ve = {
  generateTopUV(r, e, t, s, n) {
    const o = e[t * 3], a = e[t * 3 + 1], u = e[s * 3], c = e[s * 3 + 1], G = e[n * 3], P = e[n * 3 + 1];
    return [
      new l(i(o), i(a)),
      new l(i(u), i(c)),
      new l(i(G), i(P))
    ];
  },
  generateSideWallUV(r, e, t, s, n, o) {
    const a = e[t * 3], u = e[t * 3 + 1], c = e[t * 3 + 2], G = e[s * 3], P = e[s * 3 + 1], x = e[s * 3 + 2], A = e[n * 3], j = e[n * 3 + 1], M = e[n * 3 + 2], B = e[o * 3], I = e[o * 3 + 1], f = e[o * 3 + 2];
    return Math.abs(u - P) < Math.abs(a - G) ? [
      new l(i(a), i(1 - c)),
      new l(i(G), i(1 - x)),
      new l(i(A), i(1 - M)),
      new l(i(B), i(1 - f))
    ] : [
      new l(i(u), i(1 - c)),
      new l(i(P), i(1 - x)),
      new l(i(j), i(1 - M)),
      new l(i(I), i(1 - f))
    ];
  }
}, Se = { default: void 0, cover: ve };
class be extends y {
  constructor(e) {
    super(), this.type = "LoadBufferGeometry", e && this.copy(e);
  }
}
class E extends y {
  constructor(e = [], t = 36, s = !0) {
    super(), this.type = "CurveGeometry", this.parameters = {
      path: e.map((n) => n.clone()),
      space: s,
      divisions: t
    };
  }
}
class Le extends E {
  constructor(e = [], t = 36, s = !0) {
    super(e, t, s), this.type = "CubicBezierCurveGeometry";
    const n = new w();
    if (e.length < 4) {
      console.warn("CubicBezierCurveGeometry path length at least 4.");
      return;
    }
    const o = 4 + (e.length - 4) - (e.length - 4) % 3;
    for (let u = 2; u < o; u += 3)
      n.add(
        new Y(e[u - 2], e[u - 1], e[u], e[u + 1])
      );
    const a = n.curves.reduce((u, c) => u += c.arcLengthDivisions, 0);
    if (t > a) {
      const u = Math.ceil(
        (t - a) / n.curves.length
      );
      n.curves.forEach((c) => {
        c.arcLengthDivisions = c.arcLengthDivisions * (u + 1), c.updateArcLengths();
      });
    }
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class qe extends E {
  constructor(e = [], t = 36, s = !0) {
    if (super(e, t, s), this.type = "LineCurveGeometry", !e.length) {
      console.warn("LineCurveGeometry path length at least 1.");
      return;
    }
    const n = new w();
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
class xe extends E {
  constructor(e = [], t = 36, s = !0) {
    super(e, t, s), this.type = "QuadraticBezierCurveGeometry";
    const n = new w();
    if (e.length < 3) {
      console.warn("QuadraticBezierCurveGeometry path length at least 3.");
      return;
    }
    const o = 3 + (e.length - 3) - (e.length - 3) % 2;
    for (let u = 1; u < o; u += 2)
      n.add(
        new N(e[u - 1], e[u], e[u + 1])
      );
    const a = n.curves.reduce((u, c) => u += c.arcLengthDivisions, 0);
    if (t > a) {
      const u = Math.ceil(
        (t - a) / n.curves.length
      );
      n.curves.forEach((c) => {
        c.arcLengthDivisions = c.arcLengthDivisions * (u + 1), c.updateArcLengths();
      });
    }
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class Me extends E {
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
class Xe extends _ {
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
class fe extends b {
  constructor(e = [], t = 64, s = 1, n = 8, o = !1) {
    if (!e.length) {
      console.warn("LineTubeGeometry path length at least 1.");
      return;
    }
    const a = new w();
    for (let u = 1; u < e.length; u += 1)
      a.add(new T(e[u - 1], e[u]));
    super(a, t, s, n, o), this.type = "LineTubeGeometry";
  }
}
class Ze extends b {
  constructor(e = [], t = 64, s = 1, n = 8, o = !1) {
    if (!e.length) {
      console.warn("SplineTubeGeometry path length at least 1.");
      return;
    }
    const a = new D(e);
    super(a, t, s, n, o), this.type = "SplineTubeGeometry";
  }
}
class Oe extends b {
  constructor(e = new z(), t = 64, s = 1, n = 8, o = !1) {
    super(e, t, s, n, o), this.type = "PathTubeGeometry";
  }
}
class Te extends y {
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
const De = h((r) => ({
  type: "CubicBezierCurveGeometry",
  config: he,
  create({ config: e }) {
    return r.create(
      new Le(
        e.path.map(
          (t) => new C(t.x, t.y, t.z)
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
})), _e = h((r) => ({
  type: "CustomGeometry",
  config: ue,
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
})), ze = h((r) => ({
  type: "EdgesGeometry",
  config: ie,
  shared: {
    occupyGeometry: new O(new S(5, 5, 5))
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
})), Ae = h((r) => ({
  type: "ExtrudeGeometry",
  config: ge,
  context({ model: e }) {
    return {
      shapeEvent: void 0,
      pathEvent: void 0
    };
  },
  create({ model: e, config: t, engine: s }) {
    var u, c;
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
        UVGenerator: Se[t.options.UVGenerator || "default"]
      })
    );
    return n && (e.shapeEvent = () => {
      t.shapes = t.shapes;
    }, (u = e.toModel(t.shapes)) == null || u.on(d.COMPILED_UPDATE, e.shapeEvent)), o && (e.pathEvent = () => {
      t.options.extrudePath = t.options.extrudePath;
    }, (c = e.toModel(t.options.extrudePath)) == null || c.on(d.COMPILED_UPDATE, e.pathEvent)), r.create(a, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n, o;
    e.shapeEvent && ((n = e.toModel(t.shapes)) == null || n.off(d.COMPILED_UPDATE, e.shapeEvent)), e.pathEvent && ((o = e.toModel(t.options.extrudePath)) == null || o.off(d.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), je = h((r) => ({
  type: "LatheGeometry",
  config: Pe,
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
})), Be = h(
  (r) => ({
    type: "LineTubeGeometry",
    config: de,
    create({ config: e }) {
      return r.create(
        new fe(
          e.path.map(
            (t) => new C(t.x, t.y, t.z)
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
), Ie = h(
  (r) => ({
    type: "LoadGeometry",
    config: ae,
    create({ config: e, engine: t }) {
      const s = t.resourceManager.resourceMap.get(
        e.url
      );
      return !s && !(s instanceof y) ? (console.error(`engine rescoure can not found url: ${e.url}`), new S(5, 5, 5)) : r.create(
        new be(s),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), Ue = h((r) => ({
  type: "PathGeometry",
  config: Ge,
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      m.PATH,
      t.path
    ) || void 0, o = new Te(n, t.divisions, t.space);
    return n && (e.pathEvent = () => {
      t.path = t.path;
    }, (a = e.toModel(t.path)) == null || a.on(d.COMPILED_UPDATE, e.pathEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    e.pathEvent && ((n = e.toModel(t.path)) == null || n.off(d.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), Fe = h((r) => ({
  type: "PathTubeGeometry",
  config: me,
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
    ) || void 0, o = new Oe(
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
})), Re = h(
  (r) => ({
    type: "PlaneGeometry",
    config: re,
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
), Qe = h((r) => ({
  type: "QuadraticBezierCurveGeometry",
  config: pe,
  create({ config: e }) {
    return r.create(
      new xe(
        e.path.map(
          (t) => new C(t.x, t.y, t.z)
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
})), Ve = h(
  (r) => ({
    type: "RingGeometry",
    config: oe,
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
), He = h((r) => ({
  type: "ShapeGeometry",
  config: ye,
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
})), $e = h((r) => ({
  type: "SplineCurveGeometry",
  config: ce,
  create({ config: e }) {
    return r.create(
      new Me(
        e.path.map(
          (t) => new C(t.x, t.y, t.z)
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
})), Ye = h(
  (r) => ({
    type: "TorusGeometry",
    config: se,
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
), Ne = h(
  (r) => ({
    type: "SphereGeometry",
    config: te,
    create({ config: e }) {
      return r.create(
        new K(
          e.radius,
          e.widthSegments,
          e.heightSegments,
          e.phiStart,
          e.phiLength,
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
), Je = R({
  type: "geometry",
  models: [
    Ce,
    Ee,
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
    He,
    Ne,
    $e,
    Ye
  ],
  lifeOrder: Q.TWO
});
export {
  Le as CubicBezierCurveGeometry,
  E as CurveGeometry,
  Se as ExtrudeUVGenerator,
  qe as LineCurveGeometry,
  Xe as LineShapeGeometry,
  fe as LineTubeGeometry,
  be as LoadGeometry,
  Te as PathGeometry,
  Oe as PathTubeGeometry,
  xe as QuadraticBezierCurveGeometry,
  Me as SplineCurveGeometry,
  Ze as SplineTubeGeometry,
  Je as default
};
