import { CSS3DObject as $ } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { Easing as S, Tween as g } from "@tweenjs/tween.js";
import { Color as I, Material as N, Object3D as C, Euler as M, Vector3 as w, Matrix4 as U } from "three";
const F = {
  name: "addClass",
  params: {
    target: "",
    className: "",
    delay: 0
  }
}, L = function(e, l) {
  const t = l.params, n = [];
  if (t.target === "all")
    e.scene.traverse((r) => {
      r instanceof $ && n.push(r);
    });
  else if (Array.isArray(t.target))
    t.target.forEach((r) => {
      const i = e.getObjectBySymbol(r);
      i ? n.push(i) : console.warn(
        `basic event AddClass: can not found vid object: ${t.target}`
      );
    });
  else {
    const r = e.getObjectBySymbol(t.target);
    if (!r)
      return console.warn(
        `basic event AddClass: can not found vid object: ${t.target}`
      ), () => {
      };
    if (!(r instanceof $))
      return console.warn("basic event AddClass: object is not a CSS3DObject."), () => {
      };
    n.push(r);
  }
  return n.length ? () => {
    setTimeout(() => {
      n.forEach((r) => {
        r.element.classList.add(t.className);
      });
    }, t.delay);
  } : (console.warn(
    `basic event AddClass: can not found vid object: ${t.target}`
  ), () => {
  });
}, R = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: F,
  generator: L
}, Symbol.toStringTag, { value: "Module" })), h = {
  name: "changeCamera",
  params: {
    camera: "",
    delay: 0
  }
}, Q = function(e, l) {
  const t = l.params;
  return () => {
    setTimeout(() => {
      e.setCameraBySymbol(t.camera);
    }, t.delay);
  };
}, D = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: h,
  generator: Q
}, Symbol.toStringTag, { value: "Module" })), B = {
  name: "changeScene",
  params: {
    scene: "Scene",
    delay: 0
  }
}, P = function(e, l) {
  const t = l.params;
  return () => {
    setTimeout(() => {
      e.setSceneBySymbol(t.scene);
    }, t.delay);
  };
}, G = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: B,
  generator: P
}, Symbol.toStringTag, { value: "Module" })), k = {
  name: "openWindow",
  params: {
    url: ""
  }
}, W = function(e, l) {
  return () => {
    window.open(l.params.url);
  };
}, H = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: k,
  generator: W
}, Symbol.toStringTag, { value: "Module" })), V = {
  name: "switchAnimate",
  params: {
    target: "",
    toggle: "auto",
    delay: 0
  }
}, q = function(e, l) {
  const t = l.params, n = e.getConfigBySymbol(t.target);
  return n ? () => {
    setTimeout(() => {
      if (t.toggle === "auto") {
        n.play != n.play;
        return;
      }
      if (t.toggle === "off") {
        n.play = !1;
        return;
      }
      if (t.toggle === "on") {
        n.play = !0;
        return;
      }
    }, t.delay);
  } : (console.warn(
    `basic event switchAnimate: can not found vid config: ${t.target}`
  ), () => {
  });
}, J = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: V,
  generator: q
}, Symbol.toStringTag, { value: "Module" })), K = {
  name: "visibleObject",
  params: {
    target: "",
    visible: !0,
    delay: 0
  }
}, X = function(e, l) {
  const t = l.params, n = e.getObjectBySymbol(t.target);
  return n ? () => {
    setTimeout(() => {
      n.visible = t.visible;
    }, t.delay);
  } : (console.warn(
    `basic event visibleObject: can not found vid object: ${t.target}`
  ), () => {
  });
}, Y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: K,
  generator: X
}, Symbol.toStringTag, { value: "Module" })), Z = {
  name: "setPosition",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0
  }
}, tt = function(e, l) {
  const t = l.params, n = e.getConfigBySymbol(t.target);
  return n ? () => {
    setTimeout(() => {
      n.position.x = t.position.x, n.position.y = t.position.y, n.position.z = t.position.z;
    }, t.delay);
  } : (console.warn(
    `basic event setPosition: can not found vid config: ${t.target}`
  ), () => {
  });
}, et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: Z,
  generator: tt
}, Symbol.toStringTag, { value: "Module" })), nt = {
  name: "setParent",
  params: {
    target: "",
    parent: "",
    delay: 0
  }
}, ot = function(e, l) {
  const t = l.params, n = e.getConfigBySymbol(t.parent);
  return n ? () => {
    setTimeout(() => {
      n.children.includes(t.target) || n.children.push(t.target);
    }, t.delay);
  } : (console.warn(
    `basic event setParent: can not found vid config: ${t.parent}`
  ), () => {
  });
}, rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: nt,
  generator: ot
}, Symbol.toStringTag, { value: "Module" })), at = {
  name: "changeCursor",
  params: {
    cursor: "",
    delay: 0
  }
}, it = function(e, l) {
  const t = l.params;
  return () => {
    setTimeout(() => {
      document.body.style.cursor = t.cursor;
    }, t.delay);
  };
}, ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: at,
  generator: it
}, Symbol.toStringTag, { value: "Module" }));
var p = /* @__PURE__ */ ((e) => (e.EASING_LINEAR_NONE = "EASING_LINEAR_NONE", e.EASING_QUARTIC_IN = "EASING_QUARTIC_IN", e.EASING_QUARTIC_OUT = "EASING_QUARTIC_OUT", e.EASING_QUARTIC_INOUT = "EASING_QUARTIC_INOUT", e.EASING_QUADRATIC_IN = "EASING_QUADRATIC_IN", e.EASING_QUADRATIC_OUT = "EASING_QUADRATIC_OUT", e.EASING_QUADRATIC_INOUT = "EASING_QUADRATIC_INOUT", e))(p || {});
const m = {
  EASING_LINEAR_NONE: S.Linear.None,
  EASING_QUARTIC_IN: S.Quartic.In,
  EASING_QUARTIC_OUT: S.Quartic.Out,
  EASING_QUARTIC_INOUT: S.Quartic.InOut,
  EASING_QUADRATIC_IN: S.Quadratic.In,
  EASING_QUADRATIC_OUT: S.Quadratic.Out,
  EASING_QUADRATIC_INOUT: S.Quadratic.InOut
}, st = {
  name: "colorChange",
  params: {
    target: "",
    attribute: "color",
    color: "rgb(255, 255, 255)",
    delay: 0,
    duration: 500,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, lt = function(e, l) {
  const t = l.params, n = e.getObjectBySymbol(t.target);
  if (!n)
    return console.warn(
      `real time animation ColorChange: can not found vid material: ${t.target}`
    ), () => {
    };
  if (!n[t.attribute] || !(n[t.attribute] instanceof I))
    return console.warn(
      `real time animation ColorChange: material attribute is illeage: ${t.attribute}`
    ), () => {
    };
  const r = e.getConfigBySymbol(t.target);
  if (!r)
    return console.warn(
      `real time animation ColorChange: can not found material config: ${t.target}`
    ), () => {
    };
  const i = new I(t.color), c = e.renderManager;
  let o = !1;
  return () => {
    if (o)
      return;
    o = !0;
    const a = new g(n[t.attribute]).to({
      r: i.r,
      g: i.g,
      b: i.b
    }).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), s = (u) => {
      a.update();
    };
    c.addEventListener("render", s), a.onComplete(() => {
      c.removeEventListener("render", s), r[t.attribute] = t.color, o = !1;
    });
  };
}, ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: st,
  generator: lt
}, Symbol.toStringTag, { value: "Module" })), dt = {
  name: "fadeObject",
  params: {
    target: "",
    direction: "out",
    delay: 0,
    duration: 300,
    timingFunction: p.EASING_QUADRATIC_INOUT,
    visible: !0
  }
}, gt = function(e, l) {
  const t = l.params, n = e.getObjectBySymbol(t.target);
  if (!n)
    return console.warn(
      `real time animation fadeObject: can not found vid object: ${t.target}`
    ), () => {
    };
  const r = e.getObjectConfig(n);
  if (!r.material)
    return console.warn(
      `real time animation fadeObject: target can not support fade: ${t.target}`
    ), () => {
    };
  const i = [], c = [], o = Array.isArray(r.material) ? [].concat(r.material) : [r.material];
  for (const s of o) {
    const u = e.getObjectBySymbol(s), d = e.getConfigBySymbol(s);
    if (!(u instanceof N)) {
      console.error(
        `real time animation fadeObject: object config material is not instanceof Material: ${s}`
      );
      continue;
    }
    if (!d) {
      console.error(
        `real time animation fadeObject: object config material can not found config: ${s}`
      );
      continue;
    }
    i.push(u), c.push(d);
  }
  let a = !1;
  return () => {
    if (a)
      return;
    a = !0;
    const s = e.renderManager;
    r.visible = !0, i.forEach((u, d, b) => {
      u.visible = !0, u.transparent = !0, u.opacity = t.direction === "in" ? 0 : 1, u.needsUpdate = !0;
      const y = new g(u).to({
        opacity: t.direction === "in" ? 1 : 0
      }).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), v = (O) => {
        y.update();
      };
      s.addEventListener("render", v), y.onComplete(() => {
        s.removeEventListener("render", v), t.direction === "out" && t.visible ? (c[d].visible = !1, r.visible = !1) : t.direction === "in" && t.visible && (c[d].visible = !0, r.visible = !0), c[d].opacity = t.direction === "in" ? 1 : 0, a = !1;
      });
    });
  };
}, mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: dt,
  generator: gt
}, Symbol.toStringTag, { value: "Module" })), ft = {
  name: "focusObject",
  params: {
    target: "",
    camera: "",
    space: "world",
    offset: {
      x: 0,
      y: 0,
      z: 20
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT,
    back: !0
  }
}, pt = function(e, l) {
  const t = l.params, n = e.getObjectBySymbol(t.target), r = e.orbitControls.target;
  if (!n)
    return console.warn(
      `real time animation focusObject: can not found vid object: ${t.target}`
    ), () => {
    };
  if (!(n instanceof C))
    return console.warn(
      `real time animation focusObject: vid object is not a class of THREE.Object3D: ${t.target}`
    ), () => {
    };
  let i = !1;
  const c = new M();
  return () => {
    if (i)
      return;
    i = !0;
    let o = e.camera;
    t.camera && (o = e.getObjectBySymbol(t.camera), o || (o = e.camera, console.warn(
      `real time animation focusObject: can not found camera config: ${t.camera}`
    )));
    const a = e.getObjectConfig(o), s = e.orbitControls && e.orbitControls.object === o;
    a || console.warn("engine current camera can not found config.");
    const u = e.renderManager;
    let d = {
      x: n.matrixWorld.elements[12] + t.offset.x,
      y: n.matrixWorld.elements[13] + t.offset.y,
      z: n.matrixWorld.elements[14] + t.offset.z
    };
    const b = {
      x: o.position.x,
      y: o.position.y,
      z: o.position.z
    };
    if (t.space === "local") {
      const f = new w(
        t.offset.x,
        t.offset.y,
        t.offset.z
      ).applyEuler(c.setFromRotationMatrix(n.matrixWorld));
      d = {
        x: n.matrixWorld.elements[12] + f.x,
        y: n.matrixWorld.elements[13] + f.y,
        z: n.matrixWorld.elements[14] + f.z
      };
    }
    const y = new g(o.position).to(d).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start();
    let v;
    const O = {
      x: o.up.x,
      y: o.up.y,
      z: o.up.z
    };
    if (t.space === "local") {
      const f = new w(0, 1, 0).applyEuler(
        c.setFromRotationMatrix(n.matrixWorld)
      );
      v = new g(o.up).to({
        x: f.x,
        y: f.y,
        z: f.z
      }).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start();
    }
    let j;
    const T = {
      x: r.x,
      y: r.y,
      z: r.z
    };
    s && (j = new g(r).to({
      x: n.matrixWorld.elements[12],
      y: n.matrixWorld.elements[13],
      z: n.matrixWorld.elements[14]
    }).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start());
    let _;
    s && t.space === "local" ? _ = (f) => {
      y.update(), v.update(), j.update();
    } : s ? _ = (f) => {
      y.update(), j.update();
    } : t.space === "local" ? _ = (f) => {
      y.update(), v.update();
    } : _ = (f) => {
      y.update();
    }, u.addEventListener("render", _), y.onComplete(() => {
      if (u.removeEventListener("render", _), a && (a.position.x = d.x, a.position.y = d.y, a.position.z = d.z), i = !1, t.back) {
        const f = () => {
          const x = new g(o.position).to(b).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start();
          let z;
          t.space === "local" && (z = new g(o.up).to(O).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start());
          let A;
          s && (A = new g(r).to(T).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start());
          const E = (kt) => {
            x.update(), z && z.update(), A && A.update();
          };
          x.onComplete(() => {
            u.removeEventListener(
              "render",
              E
            );
          }), u.addEventListener("render", E), document.removeEventListener("dblclick", f);
        };
        document.addEventListener("dblclick", f);
      }
    });
  };
}, yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: ft,
  generator: pt
}, Symbol.toStringTag, { value: "Module" })), bt = {
  name: "moveFromTo",
  params: {
    target: "",
    from: {
      x: 0,
      y: 0,
      z: 0
    },
    to: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, vt = function(e, l) {
  const t = l.params, r = e.compilerManager.getObjectBySymbol(t.target);
  if (!r)
    return console.warn(
      `real time animation moveTO: can not found vid object: ${t.target}`
    ), () => {
    };
  const i = e.renderManager, c = e.dataSupportManager.getConfigBySymbol(
    t.target
  );
  if (!c)
    return console.warn(`can not found object config: ${t.target}`), () => {
    };
  let o = !1;
  return () => {
    if (o)
      return;
    o = !0, r.position.set(t.from.x, t.from.y, t.from.z), r.updateMatrix(), r.updateMatrixWorld();
    const a = new g(r.position).to(t.to).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), s = (u) => {
      a.update();
    };
    i.addEventListener("render", s), a.onComplete(() => {
      i.removeEventListener("render", s), c.position.x = t.to.x, c.position.y = t.to.y, c.position.z = t.to.z, o = !1;
    });
  };
}, _t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: bt,
  generator: vt
}, Symbol.toStringTag, { value: "Module" })), jt = {
  name: "moveSpacing",
  params: {
    target: "",
    spacing: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, St = function(e, l) {
  const t = l.params, n = e.getObjectBySymbol(t.target);
  if (!n)
    return console.warn(`can not found vid object: ${t.target}`), () => {
    };
  if (!(n instanceof C))
    return console.warn(`object is not instanceof Object3D: ${t.target}`), () => {
    };
  const r = e.renderManager, i = e.getConfigBySymbol(t.target);
  let c = !1;
  return () => {
    if (c)
      return;
    c = !0;
    const o = {
      x: n.position.x + t.spacing.x,
      y: n.position.y + t.spacing.y,
      z: n.position.z + t.spacing.z
    }, a = new g(n.position).to(o).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), s = (u) => {
      a.update();
    };
    r.addEventListener("render", s), a.onComplete(() => {
      r.removeEventListener("render", s), i.position.x = o.x, i.position.y = o.y, i.position.z = o.z, c = !1;
    });
  };
}, Ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: jt,
  generator: St
}, Symbol.toStringTag, { value: "Module" })), Tt = {
  name: "moveTo",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, xt = function(e, l) {
  const t = l.params, r = e.compilerManager.getObjectBySymbol(t.target);
  if (!r)
    return console.warn(
      `real time animation moveTO: can not found vid object: ${t.target}`
    ), () => {
    };
  const i = e.renderManager, c = e.dataSupportManager.getConfigBySymbol(
    t.target
  );
  if (!c)
    return console.warn(`can not found object config: ${t.target}`), () => {
    };
  let o = !1;
  return () => {
    if (o)
      return;
    o = !0;
    const a = new g(r.position).to(t.position).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), s = (u) => {
      a.update();
    };
    i.addEventListener("render", s), a.onComplete(() => {
      i.removeEventListener("render", s), c.position.x = t.position.x, c.position.y = t.position.y, c.position.z = t.position.z, o = !1;
    });
  };
}, zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: Tt,
  generator: xt
}, Symbol.toStringTag, { value: "Module" })), At = {
  name: "moveToObject",
  params: {
    target: "",
    to: "",
    offset: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, wt = function(e, l) {
  const t = l.params, n = e.compilerManager, r = n.getObjectBySymbol(t.target), i = n.getObjectBySymbol(t.to);
  if (!r)
    return console.warn(
      `real time animation MoveToObject: can not found vid object: ${t.target}`
    ), () => {
    };
  if (!i)
    return console.warn(
      `real time animation MoveToObject: can not found vid object: ${t.target}`
    ), () => {
    };
  const c = e.renderManager, o = e.dataSupportManager.getConfigBySymbol(
    t.target
  );
  if (!o)
    return console.warn(`can not found object config: ${t.target}`), () => {
    };
  let a = !1;
  return () => {
    if (a)
      return;
    a = !0;
    const s = {
      x: i.position.x + t.offset.x,
      y: i.position.y + t.offset.y,
      z: i.position.z + t.offset.z
    }, u = new g(r.position).to(s).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), d = (b) => {
      u.update();
    };
    c.addEventListener("render", d), u.onComplete(() => {
      c.removeEventListener("render", d), o.position.x = s.x, o.position.y = s.y, o.position.z = s.z, a = !1;
    });
  };
}, Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: At,
  generator: wt
}, Symbol.toStringTag, { value: "Module" })), Et = {
  name: "orbitTargetMove",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, $t = function(e, l) {
  const t = l.params;
  if (e.compilerManager, !e.orbitControls)
    return console.warn(
      "real time animation orbitTargetMove: engine can not install orbitControls."
    ), () => {
    };
  const n = e.renderManager;
  let r = !1;
  return () => {
    if (r)
      return;
    r = !0;
    let i = t.offset;
    if (t.target) {
      const a = e.getObjectBySymbol(t.target);
      a ? i = {
        x: a.matrixWorld.elements[12] + i.x,
        y: a.matrixWorld.elements[13] + i.y,
        z: a.matrixWorld.elements[14] + i.z
      } : console.warn(
        `real time animation orbitTargetMove: can not found vid object: ${t.target}`
      );
    }
    const c = new g(e.orbitControls.target).to(i).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), o = (a) => {
      c.update();
    };
    n.addEventListener("render", o), c.onComplete(() => {
      n.removeEventListener("render", o), r = !1;
    });
  };
}, It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: Et,
  generator: $t
}, Symbol.toStringTag, { value: "Module" })), Mt = {
  name: "rotationTo",
  params: {
    target: "",
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, Nt = function(e, l) {
  const t = l.params, r = e.compilerManager.getObjectBySymbol(t.target);
  if (!r)
    return console.warn(
      `real time animation moveTO: can not found vid object: ${t.target}`
    ), () => {
    };
  const i = e.renderManager, c = e.dataSupportManager.getConfigBySymbol(
    t.target
  );
  if (!c)
    return console.warn(`can not found object config: ${t.target}`), () => {
    };
  let o = !1;
  return () => {
    if (o)
      return;
    o = !0;
    const a = new g(r.rotation).to(t.rotation).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), s = (u) => {
      a.update();
    };
    i.addEventListener("render", s), a.onComplete(() => {
      i.removeEventListener("render", s), c.rotation.x = t.rotation.x, c.rotation.y = t.rotation.y, c.rotation.z = t.rotation.z, o = !1;
    });
  };
}, Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: Mt,
  generator: Nt
}, Symbol.toStringTag, { value: "Module" })), Ft = {
  name: "showToCamera",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: -30
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT,
    back: !0
  }
}, Lt = function(e, l) {
  const t = l.params, n = e.getObjectBySymbol(t.target), r = e.getConfigBySymbol(t.target), i = e.camera;
  if (!n)
    return console.warn(
      `real time animation showToCamera: can not found vid object: ${t.target}`
    ), () => {
    };
  if (!n)
    return console.warn(
      `real time animation showToCamera: can not found vid config: ${t.target}`
    ), () => {
    };
  if (!(n instanceof C))
    return console.warn(
      `real time animation showToCamera: vid object is not a class of THREE.Object3D: ${t.target}`
    ), () => {
    };
  const c = new U(), o = new M(), a = new w();
  let s = !1;
  return () => {
    if (s)
      return;
    s = !0;
    const u = e.renderManager;
    a.set(t.offset.x, t.offset.y, t.offset.z).applyEuler(i.rotation), a.set(
      i.position.x + a.x,
      i.position.y + a.y,
      i.position.z + a.z
    ), c.lookAt(i.position, a, i.up), o.setFromRotationMatrix(c);
    const d = {
      x: n.position.x,
      y: n.position.y,
      z: n.position.z
    }, b = {
      x: n.rotation.x,
      y: n.rotation.y,
      z: n.rotation.z
    }, y = new g(n.position).to({
      x: a.x,
      y: a.y,
      z: a.z
    }).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), v = new g(n.rotation).to({
      x: o.x,
      y: o.y,
      z: o.z
    }).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), O = (j) => {
      y.update(), v.update();
    };
    u.addEventListener("render", O), y.onComplete(() => {
      if (u.removeEventListener("render", O), r.position.x = a.x, r.position.y = a.y, r.position.z = a.z, r.rotation.x = o.x, r.rotation.y = o.y, r.rotation.z = o.z, s = !1, t.back) {
        const j = () => {
          const T = new g(n.position).to(d).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), _ = new g(n.rotation).to(b).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), f = (x) => {
            T.update(), _.update();
          };
          T.onComplete(() => {
            u.removeEventListener("render", f), r.position.x = d.x, r.position.y = d.y, r.position.z = d.z, r.rotation.x = b.x, r.rotation.y = b.y, r.rotation.z = b.z;
          }), u.addEventListener("render", f), document.removeEventListener("dblclick", j);
        };
        document.addEventListener("dblclick", j);
      }
    });
  };
}, Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: Ft,
  generator: Lt
}, Symbol.toStringTag, { value: "Module" })), ht = {
  name: "upTo",
  params: {
    target: "",
    up: {
      x: 0,
      y: 1,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, Qt = function(e, l) {
  const t = l.params, r = e.compilerManager.getObjectBySymbol(t.target);
  if (!r)
    return console.warn(
      `real time animation upTo: can not found vid object: ${t.target}`
    ), () => {
    };
  const i = e.renderManager, c = e.dataSupportManager.getConfigBySymbol(
    t.target
  );
  if (!c)
    return console.warn(`can not found object config: ${t.target}`), () => {
    };
  let o = !1;
  return () => {
    if (o)
      return;
    o = !0;
    const a = new g(r.up).to(t.up).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), s = (u) => {
      a.update();
    };
    i.addEventListener("render", s), a.onComplete(() => {
      i.removeEventListener("render", s), c.up.x = t.up.x, c.up.y = t.up.y, c.up.z = t.up.z, o = !1;
    });
  };
}, Dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: ht,
  generator: Qt
}, Symbol.toStringTag, { value: "Module" })), Bt = {
  name: "vector3To",
  params: {
    target: "",
    attribute: ".position",
    props: {
      x: "x",
      y: "y",
      z: "z"
    },
    delay: 0,
    duration: 500,
    to: {},
    compiling: !1,
    timingFunction: p.EASING_QUADRATIC_INOUT
  }
}, Pt = function(e, l) {
  const t = l.params, n = e.compilerManager.getObjectBySymbol(t.target);
  if (!n)
    return console.warn(
      `real time animation vector3To: can not found vid object: ${t.target}`
    ), () => {
    };
  const r = e.renderManager;
  let i = e.dataSupportManager.getConfigBySymbol(t.target);
  if (!i)
    return console.warn(
      `real time animation vector3To: can not found object config: ${t.target}`
    ), () => {
    };
  const c = t.attribute.split(".");
  c.shift();
  let o = n;
  for (const d of c) {
    if (o[d] === void 0)
      return console.error(
        `real time animation vector3To: object can not support key: ${d}`,
        n
      ), () => {
      };
    o = o[d], i = i[d];
  }
  const a = t.props;
  if (!(a.x in o) || !(a.y in o) || !(a.z in o))
    return console.error(
      "real time animation vector3To: object can not support props:",
      o,
      a
    ), () => {
    };
  if (!(a.x in i) || !(a.y in i) || !(a.z in i))
    return console.error(
      "real time animation vector3To: config can not support props:",
      i,
      a
    ), () => {
    };
  const s = {
    x: t.to.x ?? o[a.x],
    y: t.to.y ?? o[a.y],
    z: t.to.z ?? o[a.z]
  };
  let u = !1;
  return () => {
    if (u)
      return;
    u = !0;
    const d = new g(t.compiling ? i : o).to(s).duration(t.duration).delay(t.delay).easing(m[t.timingFunction]).start(), b = (y) => {
      d.update();
    };
    r.addEventListener("render", b), d.onComplete(() => {
      r.removeEventListener("render", b), t.compiling || (i[a.x] = s.x, i[a.y] = s.y, i[a.z] = s.z), u = !1;
    });
  };
}, Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: Bt,
  generator: Pt
}, Symbol.toStringTag, { value: "Module" })), qt = {
  addClass: R,
  changeCamera: D,
  changeScene: G,
  openWindow: H,
  switchAnimate: J,
  visibleObject: Y,
  colorChange: ut,
  fadeObject: mt,
  focusObject: yt,
  moveFromTo: _t,
  moveSpacing: Ot,
  moveTo: zt,
  moveToObject: Ct,
  orbitTargetMove: It,
  rotationTo: Ut,
  showToCamera: Rt,
  upTo: Dt,
  vector3To: Gt,
  setPosition: et,
  setParent: rt,
  changeCursor: ct
};
export {
  p as TIMINGFUNCTION,
  qt as default,
  m as timingFunction
};
