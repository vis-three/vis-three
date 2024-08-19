import { getBasicConfig as C, defineModel as l, defineModule as v, SUPPORT_LIFE_CYCLE as w } from "@vis-three/tdcm";
import { EllipseCurve as y, Vector2 as s, LineCurve as f } from "three";
const h = function() {
  return Object.assign(C(), {
    arcLengthDivisions: 200
  });
}, b = function() {
  return Object.assign(h(), {
    startX: 0,
    startY: 0,
    vertical: 5,
    clockwise: !1,
    endX: 10,
    endY: 10
  });
}, x = function() {
  return Object.assign(h(), {
    startX: 0,
    startY: 0,
    endX: 10,
    endY: 10
  });
}, R = {
  reg: new RegExp(".*"),
  handler({
    config: e,
    target: r,
    model: n,
    engine: c,
    compiler: i
  }) {
    i.symbolMap.delete(r), n.dispose();
    const a = n.create();
    i.symbolMap.set(a, e.vid);
  }
}, m = function() {
  return R;
};
class Y extends y {
  constructor(r, n, c, i, a, d) {
    super(0, 0, 1, 1, 0, Math.PI * 2, !1, 0), this.start = new s(), this.end = new s(), this.vertical = 0, this.center = new s(), this.tempVector = new s(), this.start.set(r, n), this.end.set(a, d), this.vertical = c;
    const o = this.tempVector, p = this.start, u = this.end, g = new s((a + r) / 2, (d + n) / 2), t = this.center.copy(this.end).sub(this.start);
    t.set(-t.y, t.x).negate().normalize().multiplyScalar(c).add(g), this.aX = t.x, this.aY = t.y, this.xRadius = o.copy(u).sub(t).length(), this.yRadius = this.xRadius, this.aStartAngle = o.copy(p).sub(t).angle(), this.aEndAngle = o.copy(u).sub(t).angle(), this.aClockwise = i;
  }
}
const L = l({
  type: "ArcCurve",
  config: b,
  commands: {
    set: {
      $reg: [m()]
    }
  },
  create({ config: e }) {
    return new Y(
      e.startX,
      e.startY,
      e.vertical,
      e.clockwise,
      e.endX,
      e.endY
    );
  },
  dispose() {
  }
}), M = l({
  type: "LineCurve",
  config: x,
  commands: {
    set: {
      $reg: [m()]
    }
  },
  create({ config: e }) {
    return new f(
      new s(e.startX, e.startY),
      new s(e.endX, e.endY)
    );
  },
  dispose() {
  }
}), E = v({
  type: "curve",
  models: [L, M],
  lifeOrder: w.ZERO - 1
});
export {
  Y as ArcCurve,
  E as default,
  b as getArcCurveConfig,
  h as getCurveConfig,
  x as getLineCurveConfig
};
