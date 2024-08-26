import { getBasicConfig as O, defineModel as j, defineModule as $, SUPPORT_LIFE_CYCLE as k } from "@vis-three/tdcm";
import { EllipseCurve as F, Vector2 as o, MathUtils as T, Path as Z, LineCurve as G, CubicBezierCurve as B, QuadraticBezierCurve as H, CurvePath as J, LineCurve3 as K, Vector3 as l, CubicBezierCurve3 as W, QuadraticBezierCurve3 as Y } from "three";
const X = function() {
  return Object.assign(O(), {
    curves: [],
    autoClose: !1
  });
}, A = function() {
  return Object.assign(O(), { curves: [], autoClose: !1 });
}, h = class h extends F {
  constructor(t, r, s, a, n, c) {
    super(0, 0, 1, 1, 0, Math.PI * 2, !1, 0), this.start = new o(), this.end = new o(), this.vertical = 0, this.center = new o(), this.mid = new o();
    const u = t, i = s, p = n, v = r, x = a, d = c, w = u - i, g = v - x, V = u - p, z = v - d, M = (u * u - i * i + (v * v - x * x)) / 2, f = (u * u - p * p + (v * v - d * d)) / 2, N = g * V - w * z, y = -(z * M - g * f) / N, C = -(w * f - V * M) / N, I = (p + u) / 2, S = (d + v) / 2, L = h.isLeft(
      h.tempVector1.set(u, v),
      h.tempVector2.set(p, d),
      h.tempVector3.set(y, C)
    ), R = h.tempVector1.set(y, C).sub(h.tempVector2.set(I, S)).length() * (L ? -1 : 1);
    this.start.set(t, r), this.end.set(n, c), this.vertical = R;
    const D = this.start, q = this.end, m = this.center.copy(this.end).sub(this.start), P = this.mid.set(I, S);
    m.set(-m.y, m.x).negate().normalize().multiplyScalar(R).add(P), this.aX = m.x, this.aY = m.y;
    const b = h.tempVector1;
    this.xRadius = b.copy(q).sub(m).length(), this.yRadius = this.xRadius, this.aStartAngle = b.copy(D).sub(m).angle(), this.aEndAngle = b.copy(q).sub(m).angle();
    const Q = h.tempVector2.set(i, x).sub(P), U = h.tempVector3.set(y, C).sub(P);
    this.aClockwise = !((L ? 1 : -1) * (h.isSameDirecton(Q, U) ? 1 : -1) < 0);
  }
};
h.isLeft = function(t, r, s) {
  return (r.x - t.x) * (s.y - t.y) - (r.y - t.y) * (s.x - t.x) > 0;
}, h.isSameDirecton = function(t, r) {
  const s = Math.sqrt(t.lengthSq() * r.lengthSq());
  if (s === 0)
    return !1;
  const a = t.dot(r) / s;
  return Math.acos(T.clamp(a, -1, 1)) < Math.PI / 2;
}, h.tempVector1 = new o(), h.tempVector2 = new o(), h.tempVector3 = new o();
let E = h;
const _ = j({
  type: "Path",
  config: X,
  shared: {
    getCurveExtrPoint(e, t) {
      return t === "start" ? { x: e.params[0], y: e.params[1] } : {
        x: e.params[e.params.length - 2],
        y: e.params[e.params.length - 1]
      };
    },
    generateCurve(e) {
      const t = {
        arc: (r, s, a, n, c, u) => new E(r, s, a, n, c, u),
        // ellipse: (
        //   startX: number,
        //   startY: number,
        //   aX: number,
        //   aY: number,
        //   xRadius: number,
        //   yRadius: number,
        //   aStartAngle: number,
        //   aEndAngle: number,
        //   aClockwise: boolean,
        //   aRotation: number
        // ) =>
        //   new EllipseCurve(
        //     startX + aX,
        //     startY + aY,
        //     xRadius,
        //     yRadius,
        //     aStartAngle,
        //     aEndAngle,
        //     aClockwise,
        //     aRotation
        //   ),
        line: (r, s, a, n) => new G(new o(r, s), new o(a, n)),
        bezier: (r, s, a, n, c, u, i, p) => new B(
          new o(r, s),
          new o(a, n),
          new o(c, u),
          new o(i, p)
        ),
        cubic: (r, s, a, n, c, u, i, p) => new B(
          new o(r, s),
          new o(a, n),
          new o(c, u),
          new o(i, p)
        ),
        quadratic: (r, s, a, n, c, u) => new H(
          new o(r, s),
          new o(a, n),
          new o(c, u)
        )
      };
      return t[e.curve] ? t[e.curve](...e.params) : (console.warn(
        `path processor can not support this curve: ${e.curve}`
      ), null);
    },
    syncExtrParams(e, t, r) {
      if (r === "start")
        e.params[0] !== t[0] && (e.params[0] = t[0]), e.params[1] !== t[1] && (e.params[1] = t[1]);
      else {
        const s = e.params.length - 1;
        e.params[s - 1] !== t[0] && (e.params[s - 1] = t[0]), e.params[s] !== t[1] && (e.params[s] = t[1]);
      }
    }
  },
  commands: {
    add: {
      curves({ model: e, target: t, config: r, value: s }) {
        const a = e.generateCurve(s);
        a && t.curves.push(a);
      }
    },
    set: {
      curves({ model: e, target: t, config: r, path: s, key: a }) {
        let n = Number(s[1]);
        if (!Number.isInteger(n)) {
          if (Number.isInteger(Number(a)))
            return;
          console.warn("path processor: set curves path error:", s);
          return;
        }
        const c = e.generateCurve(r.curves[n]);
        t.curves[n] = c;
        const u = e.getCurveExtrPoint(
          r.curves[n],
          "start"
        ), i = e.getCurveExtrPoint(r.curves[n], "end");
        n - 1 >= 0 && e.syncExtrParams(
          r.curves[n - 1],
          [u.x, u.y],
          "end"
        ), n + 1 <= r.curves.length - 1 && e.syncExtrParams(
          r.curves[n + 1],
          [i.x, i.y],
          "start"
        );
      }
    },
    delete: {
      curves({ model: e, target: t, config: r, key: s }) {
        const a = Number(s);
        if (!(t.curves.length - 1 < a) && (t.curves.splice(a, 1), a <= r.curves.length - 1 && a - 1 >= 0)) {
          const n = e.getCurveExtrPoint(
            r.curves[a - 1],
            "end"
          );
          e.syncExtrParams(
            r.curves[a],
            [n.x, n.y],
            "start"
          );
        }
      }
    }
  },
  create({ model: e, config: t, engine: r }) {
    const s = new Z();
    if (t.curves.length)
      for (const a of t.curves) {
        const n = e.generateCurve(a);
        n && s.curves.push(n);
      }
    return s.autoClose = t.autoClose, s;
  },
  dispose({ target: e }) {
    e.curves = [];
  }
}), ee = j({
  type: "Path3",
  config: A,
  shared: {
    getCurveExtrPoint(e, t) {
      return t === "start" ? {
        x: e.params[0],
        y: e.params[1],
        z: e.params[2]
      } : {
        x: e.params[e.params.length - 3],
        y: e.params[e.params.length - 2],
        z: e.params[e.params.length - 1]
      };
    },
    generateCurve(e) {
      const t = {
        line: (r, s, a, n, c, u) => new K(
          new l(r, s, a),
          new l(n, c, u)
        ),
        cubic: (r, s, a, n, c, u, i, p, v, x, d, w) => new W(
          new l(r, s, a),
          new l(n, c, u),
          new l(i, p, v),
          new l(x, d, w)
        ),
        quadratic: (r, s, a, n, c, u, i, p, v) => new Y(
          new l(r, s, a),
          new l(n, c, u),
          new l(i, p, v)
        )
      };
      return t[e.curve] ? t[e.curve](...e.params) : (console.warn(
        `path processor can not support this curve: ${e.curve}`
      ), null);
    },
    syncExtrParams(e, t, r) {
      if (r === "start")
        e.params[0] !== t[0] && (e.params[0] = t[0]), e.params[1] !== t[1] && (e.params[1] = t[1]), e.params[2] !== t[2] && (e.params[2] = t[2]);
      else {
        const s = e.params.length - 1;
        e.params[s - 2] !== t[0] && (e.params[s - 2] = t[0]), e.params[s - 1] !== t[1] && (e.params[s - 1] = t[1]), e.params[s] !== t[2] && (e.params[s] = t[2]);
      }
    }
  },
  commands: {
    add: {
      curves({ model: e, target: t, config: r, value: s }) {
        const a = e.generateCurve(s);
        a && t.curves.push(a);
      }
    },
    set: {
      curves({ model: e, target: t, config: r, path: s, key: a }) {
        let n = Number(s[1]);
        if (!Number.isInteger(n)) {
          if (Number.isInteger(Number(a)))
            return;
          console.warn("path3 processor: set curves path error:", s);
          return;
        }
        const c = e.generateCurve(r.curves[n]);
        t.curves[n] = c;
        const u = e.getCurveExtrPoint(
          r.curves[n],
          "start"
        ), i = e.getCurveExtrPoint(r.curves[n], "end");
        n - 1 >= 0 && e.syncExtrParams(
          r.curves[n - 1],
          [u.x, u.y, u.z],
          "end"
        ), n + 1 <= r.curves.length - 1 && e.syncExtrParams(
          r.curves[n + 1],
          [i.x, i.y, i.z],
          "start"
        );
      }
    },
    delete: {
      curves({ model: e, target: t, config: r, key: s }) {
        const a = Number(s);
        if (!(t.curves.length - 1 < a) && (t.curves.splice(a, 1), a <= r.curves.length - 1 && a - 1 >= 0)) {
          const n = e.getCurveExtrPoint(
            r.curves[a - 1],
            "end"
          );
          e.syncExtrParams(
            r.curves[a],
            [n.x, n.y, n.z],
            "start"
          );
        }
      }
    }
  },
  create({ model: e, config: t, engine: r }) {
    const s = new J();
    if (t.curves.length)
      for (const a of t.curves) {
        const n = e.generateCurve(a);
        n && s.curves.push(n);
      }
    return s.autoClose = t.autoClose, s;
  },
  dispose({ target: e }) {
    e.curves = [];
  }
}), re = $({
  type: "path",
  models: [_, ee],
  lifeOrder: k.ZERO
});
export {
  re as default,
  A as getPath3Config,
  X as getPathConfig
};
