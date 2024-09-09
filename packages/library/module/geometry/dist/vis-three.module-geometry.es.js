import { getBasicConfig as Q, defineModel as V, MODULE_TYPE as d, MODEL_EVENT as m, defineModule as H, SUPPORT_LIFE_CYCLE as $ } from "@vis-three/tdcm";
import { Quaternion as D, Euler as S, BoxGeometry as b, CircleGeometry as Y, Vector2 as l, BufferGeometry as g, CurvePath as E, CubicBezierCurve3 as N, LineCurve3 as f, QuadraticBezierCurve3 as W, CatmullRomCurve3 as _, ShapeGeometry as j, Shape as k, TubeGeometry as x, Path as A, Vector3 as y, Float32BufferAttribute as G, EdgesGeometry as z, ExtrudeGeometry as q, LatheGeometry as X, PlaneGeometry as Z, RingGeometry as J, TorusGeometry as K, SphereGeometry as ee, Mesh as te } from "three";
import { DecalGeometry as re } from "three/examples/jsm/geometries/DecalGeometry.js";
const h = function() {
  return Object.assign(Q(), {
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
}, ne = function() {
  return Object.assign(h(), {
    width: 5,
    height: 5,
    depth: 5,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  });
}, se = function() {
  return Object.assign(h(), {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  });
}, oe = function() {
  return Object.assign(h(), {
    width: 5,
    height: 5,
    widthSegments: 1,
    heightSegments: 1
  });
}, ae = function() {
  return Object.assign(h(), {
    radius: 3,
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
}, ue = function() {
  return Object.assign(h(), {
    radius: 3,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2
  });
}, ie = function() {
  return Object.assign(h(), {
    innerRadius: 2,
    outerRadius: 3,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
}, ce = function() {
  return Object.assign(h(), {
    url: ""
  });
}, pe = function() {
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
}, he = function() {
  return Object.assign(h(), {
    target: "",
    thresholdAngle: 1
  });
}, L = function() {
  return Object.assign(h(), {
    center: !1,
    path: [],
    divisions: 36,
    space: !0
  });
}, le = function() {
  return Object.assign(L(), { center: !1 });
}, me = function() {
  return Object.assign(L(), { center: !1 });
}, ye = function() {
  return Object.assign(L(), { center: !1 });
}, B = function() {
  return Object.assign(h(), {
    center: !1,
    path: [],
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: !1
  });
}, de = function() {
  return Object.assign(B(), { center: !1 });
}, ge = function() {
  return Object.assign(B(), { center: !1 });
}, Ge = function() {
  return Object.assign(h(), {
    center: !1,
    path: "",
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: !1
  });
}, we = function() {
  return Object.assign(h(), {
    center: !1,
    shape: "",
    curveSegments: 12
  });
}, Pe = function() {
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
}, Ee = function() {
  return Object.assign(h(), {
    center: !1,
    path: "",
    space: !1,
    divisions: 36
  });
}, ve = function() {
  return Object.assign(h(), {
    path: "",
    divisions: 32,
    segments: 12,
    phiStart: 0,
    phiLength: Math.PI * 2
  });
}, Ce = function() {
  return Object.assign(h(), {
    center: !1,
    target: {
      geometry: "",
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 0, y: 0, z: 0 }
    },
    point: { x: 0, y: 0, z: 0 },
    orientation: { x: 0, y: 0, z: 0 },
    size: { x: 0, y: 0, z: 0 }
  });
}, Se = function(r, e) {
  e.center && r.center(), r.computeBoundingBox();
  const t = r.boundingBox, s = e.position, n = e.rotation, o = e.scale, a = new D().setFromEuler(
    new S(n.x, n.y, n.z, "XYZ")
  );
  return r.applyQuaternion(a), r.scale(o.x, o.y, o.z), e.center && r.center(), r.computeBoundingBox(), r.translate(
    (t.max.x - t.min.x) / 2 * s.x,
    (t.max.y - t.min.y) / 2 * s.y,
    (t.max.z - t.min.z) / 2 * s.z
  ), r;
}, C = {
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
}, c = V.extend({
  commands: {
    add: {
      groups({ target: r, value: e }) {
        r.addGroup(e.start, e.count, e.materialIndex);
      },
      $reg: [C]
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
      $reg: [C]
    },
    delete: {
      groups({ target: r, key: e }) {
        r.groups.splice(Number(e), 1);
      },
      $reg: [C]
    }
  },
  create(r, e) {
    r.clearGroups();
    for (const t of e.groups)
      r.addGroup(t.start, t.count, t.materialIndex);
    return Se(r, e);
  },
  dispose(r) {
    r.dispose();
  }
}), be = c(
  (r) => ({
    type: "BoxGeometry",
    config: ne,
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
), xe = c(
  (r) => ({
    type: "CircleGeometry",
    config: ae,
    create({ config: e }) {
      return r.create(
        new Y(
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
}, Le = {
  generateTopUV(r, e, t, s, n) {
    const o = e[t * 3], a = e[t * 3 + 1], u = e[s * 3], p = e[s * 3 + 1], w = e[n * 3], P = e[n * 3 + 1];
    return [
      new l(i(o), i(a)),
      new l(i(u), i(p)),
      new l(i(w), i(P))
    ];
  },
  generateSideWallUV(r, e, t, s, n, o) {
    const a = e[t * 3], u = e[t * 3 + 1], p = e[t * 3 + 2], w = e[s * 3], P = e[s * 3 + 1], M = e[s * 3 + 2], I = e[n * 3], U = e[n * 3 + 1], O = e[n * 3 + 2], F = e[o * 3], R = e[o * 3 + 1], T = e[o * 3 + 2];
    return Math.abs(u - P) < Math.abs(a - w) ? [
      new l(i(a), i(1 - p)),
      new l(i(w), i(1 - M)),
      new l(i(I), i(1 - O)),
      new l(i(F), i(1 - T))
    ] : [
      new l(i(u), i(1 - p)),
      new l(i(P), i(1 - M)),
      new l(i(U), i(1 - O)),
      new l(i(R), i(1 - T))
    ];
  }
}, Me = { default: void 0, cover: Le };
class Oe extends g {
  constructor(e) {
    super(), this.type = "LoadBufferGeometry", e && this.copy(e);
  }
}
class v extends g {
  constructor(e = [], t = 36, s = !0) {
    super(), this.type = "CurveGeometry", this.parameters = {
      path: e.map((n) => n.clone()),
      space: s,
      divisions: t
    };
  }
}
class Te extends v {
  constructor(e = [], t = 36, s = !0) {
    super(e, t, s), this.type = "CubicBezierCurveGeometry";
    const n = new E();
    if (e.length < 4) {
      console.warn("CubicBezierCurveGeometry path length at least 4.");
      return;
    }
    const o = 4 + (e.length - 4) - (e.length - 4) % 3;
    for (let u = 2; u < o; u += 3)
      n.add(
        new N(e[u - 2], e[u - 1], e[u], e[u + 1])
      );
    const a = n.curves.reduce((u, p) => u += p.arcLengthDivisions, 0);
    if (t > a) {
      const u = Math.ceil(
        (t - a) / n.curves.length
      );
      n.curves.forEach((p) => {
        p.arcLengthDivisions = p.arcLengthDivisions * (u + 1), p.updateArcLengths();
      });
    }
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class nt extends v {
  constructor(e = [], t = 36, s = !0) {
    if (super(e, t, s), this.type = "LineCurveGeometry", !e.length) {
      console.warn("LineCurveGeometry path length at least 1.");
      return;
    }
    const n = new E();
    for (let a = 1; a < e.length; a += 1)
      n.add(new f(e[a - 1], e[a]));
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
class ze extends v {
  constructor(e = [], t = 36, s = !0) {
    super(e, t, s), this.type = "QuadraticBezierCurveGeometry";
    const n = new E();
    if (e.length < 3) {
      console.warn("QuadraticBezierCurveGeometry path length at least 3.");
      return;
    }
    const o = 3 + (e.length - 3) - (e.length - 3) % 2;
    for (let u = 1; u < o; u += 2)
      n.add(
        new W(e[u - 1], e[u], e[u + 1])
      );
    const a = n.curves.reduce((u, p) => u += p.arcLengthDivisions, 0);
    if (t > a) {
      const u = Math.ceil(
        (t - a) / n.curves.length
      );
      n.curves.forEach((p) => {
        p.arcLengthDivisions = p.arcLengthDivisions * (u + 1), p.updateArcLengths();
      });
    }
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class De extends v {
  constructor(e = [], t = 36, s = !0) {
    if (super(e, t, s), this.type = "SplineCurveGeometry", !e.length) {
      console.warn("SplineCurveGeometry path length at least 1.");
      return;
    }
    const n = new _(e);
    this.setFromPoints(
      s ? n.getSpacedPoints(t) : n.getPoints(t)
    );
  }
}
class st extends j {
  constructor(e = [new l(0, 0)], t = 12) {
    const s = new k(), n = e[0];
    if (n) {
      s.moveTo(n.x, n.y);
      for (let o = 1; o < e.length; o += 1)
        s.lineTo(e[o].x, e[o].y);
    }
    super(s, t), this.type = "LineShapeGeometry";
  }
}
class fe extends x {
  constructor(e = [], t = 64, s = 1, n = 8, o = !1) {
    if (!e.length) {
      console.warn("LineTubeGeometry path length at least 1.");
      return;
    }
    const a = new E();
    for (let u = 1; u < e.length; u += 1)
      a.add(new f(e[u - 1], e[u]));
    super(a, t, s, n, o), this.type = "LineTubeGeometry";
  }
}
class _e extends x {
  constructor(e = [], t = 64, s = 1, n = 8, o = !1) {
    if (!e.length) {
      console.warn("SplineTubeGeometry path length at least 1.");
      return;
    }
    const a = new _(e);
    super(a, t, s, n, o), this.type = "SplineTubeGeometry";
  }
}
class je extends x {
  constructor(e = new A(), t = 64, s = 1, n = 8, o = !1) {
    super(e, t, s, n, o), this.type = "PathTubeGeometry";
  }
}
class Ae extends g {
  constructor(e = new A(), t = 36, s = !0) {
    super(), this.type = "PathGeometry", this.parameters = {
      path: e,
      space: s,
      divisions: t
    }, e.curves.length && this.setFromPoints(
      s ? e.getSpacedPoints(t) : e.getPoints(t)
    );
  }
}
const Be = c((r) => ({
  type: "CubicBezierCurveGeometry",
  config: me,
  create({ config: e }) {
    return r.create(
      new Te(
        e.path.map(
          (t) => new y(t.x, t.y, t.z)
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
})), Ie = c((r) => ({
  type: "CustomGeometry",
  config: pe,
  shared: {
    generateGeometry(e) {
      const t = new g();
      return e.position.length && t.setAttribute(
        "position",
        new G(e.position, 3)
      ), e.color.length && t.setAttribute(
        "color",
        new G(e.color, 3)
      ), e.normal.length && t.setAttribute(
        "normal",
        new G(e.normal, 3)
      ), e.uv.length && t.setAttribute(
        "uv",
        new G(e.uv, 2)
      ), e.uv2.length && t.setAttribute(
        "uv2",
        new G(e.uv2, 2)
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
})), Ue = c((r) => ({
  type: "EdgesGeometry",
  config: he,
  shared: {
    occupyGeometry: new z(new b(5, 5, 5))
  },
  create({ model: e, config: t, engine: s }) {
    const n = s.compilerManager.getObjectFromModule(
      d.GEOMETRY,
      t.target
    );
    return !n || !(n instanceof g) ? (console.error(`engine rescoure can not found url: ${t.target}`), e.occupyGeometry) : r.create(
      new z(n, t.thresholdAngle),
      t
    );
  },
  dispose({ target: e }) {
    r.dispose(e);
  }
})), Fe = c((r) => ({
  type: "ExtrudeGeometry",
  config: Pe,
  context({ model: e }) {
    return {
      shapeEvent: void 0,
      pathEvent: void 0
    };
  },
  create({ model: e, config: t, engine: s }) {
    var u, p;
    const n = s.compilerManager.getObjectFromModule(
      d.SHAPE,
      t.shapes
    ) || void 0, o = s.compilerManager.getObjectFromModule(
      d.PATH,
      t.options.extrudePath
    ) || void 0, a = new q(
      n,
      Object.assign({}, t.options, {
        extrudePath: o,
        UVGenerator: Me[t.options.UVGenerator || "default"]
      })
    );
    return n && (e.shapeEvent = () => {
      t.shapes = t.shapes;
    }, (u = e.toModel(t.shapes)) == null || u.on(m.COMPILED_UPDATE, e.shapeEvent)), o && (e.pathEvent = () => {
      t.options.extrudePath = t.options.extrudePath;
    }, (p = e.toModel(t.options.extrudePath)) == null || p.on(m.COMPILED_UPDATE, e.pathEvent)), r.create(a, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n, o;
    e.shapeEvent && ((n = e.toModel(t.shapes)) == null || n.off(m.COMPILED_UPDATE, e.shapeEvent)), e.pathEvent && ((o = e.toModel(t.options.extrudePath)) == null || o.off(m.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), Re = c((r) => ({
  type: "LatheGeometry",
  config: ve,
  context({ model: e }) {
    return {
      pathEvent: void 0
    };
  },
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      d.PATH,
      t.path
    ) || void 0, o = new X(
      n ? n.getPoints(t.divisions) : void 0,
      t.segments,
      t.phiStart,
      t.phiLength
    );
    return n && (e.pathEvent = () => {
      t.path = t.path;
    }, (a = e.toModel(t.path)) == null || a.on(m.COMPILED_UPDATE, e.pathEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    e.pathEvent && ((n = e.toModel(t.path)) == null || n.off(m.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), Qe = c(
  (r) => ({
    type: "LineTubeGeometry",
    config: de,
    create({ config: e }) {
      return r.create(
        new fe(
          e.path.map(
            (t) => new y(t.x, t.y, t.z)
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
), Ve = c(
  (r) => ({
    type: "LoadGeometry",
    config: ce,
    create({ config: e, engine: t }) {
      const s = t.resourceManager.resourceMap.get(
        e.url
      );
      return !s && !(s instanceof g) ? (console.error(`engine rescoure can not found url: ${e.url}`), new b(5, 5, 5)) : r.create(
        new Oe(s),
        e
      );
    },
    dispose({ target: e }) {
      r.dispose(e);
    }
  })
), He = c((r) => ({
  type: "PathGeometry",
  config: Ee,
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      d.PATH,
      t.path
    ) || void 0, o = new Ae(n, t.divisions, t.space);
    return n && (e.pathEvent && (e.cachePathEvent = e.pathEvent), e.pathEvent = () => {
      t.path = t.path;
    }, (a = e.toModel(t.path)) == null || a.on(m.COMPILED_UPDATE, e.pathEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    e.pathEvent && ((n = e.toModel(t.path)) == null || n.off(m.COMPILED_UPDATE, e.pathEvent), e.cachePathEvent && (e.pathEvent = e.cachePathEvent, e.cachePathEvent = void 0)), r.dispose(s);
  }
})), $e = c((r) => ({
  type: "PathTubeGeometry",
  config: Ge,
  context() {
    return {
      pathEvent: void 0,
      restrictor: 0
    };
  },
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      d.PATH,
      t.path
    ) || void 0, o = new je(
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
    }, (a = e.toModel(t.path)) == null || a.on(m.COMPILED_UPDATE, e.pathEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    window.clearTimeout(e.restrictor), e.pathEvent && ((n = e.toModel(t.path)) == null || n.off(m.COMPILED_UPDATE, e.pathEvent)), r.dispose(s);
  }
})), Ye = c(
  (r) => ({
    type: "PlaneGeometry",
    config: oe,
    create({ config: e }) {
      return r.create(
        new Z(
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
), Ne = c((r) => ({
  type: "QuadraticBezierCurveGeometry",
  config: ye,
  create({ config: e }) {
    return r.create(
      new ze(
        e.path.map(
          (t) => new y(t.x, t.y, t.z)
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
})), We = c(
  (r) => ({
    type: "RingGeometry",
    config: ie,
    create({ config: e }) {
      return r.create(
        new J(
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
), ke = c((r) => ({
  type: "ShapeGeometry",
  config: we,
  create({ model: e, config: t, engine: s }) {
    var a;
    const n = s.compilerManager.getObjectFromModule(
      d.SHAPE,
      t.shape
    ) || void 0, o = new j(n, t.curveSegments);
    return n && (e.shapeEvent = () => {
      t.shape = t.shape;
    }, (a = e.toModel(t.shape)) == null || a.on(m.COMPILED_UPDATE, e.shapeEvent)), r.create(o, t);
  },
  dispose({ model: e, config: t, target: s }) {
    var n;
    e.shapeEvent && ((n = e.toModel(t.shape)) == null || n.on(m.COMPILED_UPDATE, e.shapeEvent)), r.dispose(s);
  }
})), qe = c((r) => ({
  type: "SplineCurveGeometry",
  config: le,
  create({ config: e }) {
    return r.create(
      new De(
        e.path.map(
          (t) => new y(t.x, t.y, t.z)
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
})), Xe = c(
  (r) => ({
    type: "TorusGeometry",
    config: ue,
    create({ config: e }) {
      return r.create(
        new K(
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
), Ze = c(
  (r) => ({
    type: "SphereGeometry",
    config: se,
    create({ config: e }) {
      return r.create(
        new ee(
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
), Je = c((r) => ({
  type: "DecalGeometry",
  config: Ce,
  shared: {
    tempGeometry: new g(),
    tempMesh: new te()
  },
  create({ model: e, config: t, engine: s }) {
    const n = t.target.geometry && s.getObjectBySymbol(t.target.geometry) || e.tempGeometry;
    return e.tempMesh.geometry = n, e.tempMesh.matrixWorld.compose(
      new y(
        t.target.position.x,
        t.target.position.y,
        t.target.position.z
      ),
      new D().setFromEuler(
        new S(
          t.target.rotation.x,
          t.target.rotation.y,
          t.target.rotation.z
        )
      ),
      new y(
        t.target.scale.x,
        t.target.scale.y,
        t.target.scale.z
      )
    ), r.create(
      new re(
        e.tempMesh,
        new y(t.point.x, t.point.y, t.point.z),
        new S(
          t.orientation.x,
          t.orientation.y,
          t.orientation.z
        ),
        new y(t.size.x, t.size.y, t.size.z)
      ),
      t
    );
  },
  dispose({ target: e }) {
    r.dispose(e);
  }
})), Ke = c((r) => ({
  type: "SplineTubeGeometry",
  config: ge,
  create({ config: e }) {
    return r.create(
      new _e(
        e.path.map(
          (t) => new y(t.x, t.y, t.z)
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
})), ot = H({
  type: "geometry",
  models: [
    be,
    xe,
    Be,
    Ie,
    Je,
    Ue,
    Fe,
    Re,
    Qe,
    Ve,
    He,
    $e,
    Ye,
    Ne,
    We,
    ke,
    Ze,
    qe,
    Ke,
    Xe
  ],
  lifeOrder: $.TWO
});
export {
  Te as CubicBezierCurveGeometry,
  v as CurveGeometry,
  Me as ExtrudeUVGenerator,
  nt as LineCurveGeometry,
  st as LineShapeGeometry,
  fe as LineTubeGeometry,
  Oe as LoadGeometry,
  Ae as PathGeometry,
  je as PathTubeGeometry,
  ze as QuadraticBezierCurveGeometry,
  De as SplineCurveGeometry,
  _e as SplineTubeGeometry,
  ot as default
};
