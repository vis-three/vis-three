import { MODULE_TYPE as n, defineModule as g, SUPPORT_LIFE_CYCLE as c } from "@vis-three/tdcm";
import { getObjectConfig as f, defineObjectModel as m } from "@vis-three/module-object";
import { Points as h, Color as u, BufferAttribute as s, ShaderMaterial as p, AdditiveBlending as d } from "three";
const R = function() {
  return Object.assign(f(), {
    range: {
      top: 100,
      bottom: -100,
      left: -100,
      right: 100,
      front: 100,
      back: -100
    },
    amount: 200,
    size: 1,
    alphaMap: "",
    opacity: 1,
    flicker: !0,
    time: 0,
    floatRange: 5,
    refColor: "rgb(255, 255, 255)",
    colorRange: 0.5
  });
}, v = `
varying vec3 vColor;
uniform bool flicker;
uniform float time;
uniform float size;
uniform float floatRange;

void main() {

  vColor = color;
  float positionX = position.x + sin(time  + color.r + position.y + color.b ) * floatRange;
  float positionY = position.y + sin(time  + color.r + color.g + color.g ) * floatRange;
  float positionZ = position.z + sin(time  + color.b + color.g + position.x ) * floatRange;

  vec4 mvPosition = modelViewMatrix * vec4( positionX, positionY, positionZ, 1.0 );

  float pointSize = size * ( 300.0 / -mvPosition.z );

  if (flicker) {
    pointSize = sin(time + position.x + color.g + color.b + position.z - position.y) * pointSize;
  }

  gl_PointSize = pointSize;

  gl_Position = projectionMatrix * mvPosition;

}
`, y = `
uniform sampler2D alphaMap;
uniform float opacity;
uniform bool useAlphaMap;
varying vec3 vColor;

void main() {

  gl_FragColor = vec4( vColor, opacity );

  if (useAlphaMap) {  
    gl_FragColor = gl_FragColor * texture2D( alphaMap, gl_PointCoord );
  }


  if (gl_FragColor.a < 0.01) {
    discard;
  }

}
`;
class C extends p {
  constructor(t) {
    super(), this.uniforms = {
      flicker: { value: t.flicker || !1 },
      time: { value: t.time || 0 },
      alphaMap: { value: t.alphaMap || null },
      size: { value: t.size || 1 },
      opacity: { value: t.opacity || 1 },
      floatRange: { value: t.floatRange || 5 },
      useAlphaMap: { value: t.useAlphaMap || !1 }
    }, this.vertexShader = v, this.fragmentShader = y, this.vertexColors = !0, this.blending = d, this.transparent = !0;
  }
}
class M extends h {
  constructor(t) {
    super(), this.range = {
      top: 100,
      bottom: -100,
      left: -100,
      right: 100,
      front: 100,
      back: -100
    }, this.amount = 200, this.refColor = new u(1, 1, 1), this.colorRange = 1, this.raycast = () => {
    }, Object.assign(this.range, t.range), this.refColor.setHex(t.refColor.getHex()), this.colorRange = t.colorRange, this.amount = t.amount, this.resetGeometry(), this.material = new C({
      size: t.size || 1,
      alphaMap: t.alphaMap || null,
      opacity: t.opacity || 1,
      flicker: t.flicker,
      floatRange: t.floatRange,
      useAlphaMap: !!t.alphaMap
    });
  }
  getRandomNum(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t;
  }
  getRandomColor(t) {
    const e = this.refColor, r = this.colorRange;
    return this.getRandomNum(
      e[t] - e[t] * r,
      (1 - e[t]) * r + e[t]
    );
  }
  updateGeometry() {
    const t = this.range, e = this.geometry, r = this.amount, i = e.getAttribute("position"), a = e.getAttribute("color");
    for (let o = 0; o < r; o += 1)
      i.setXYZ(
        o,
        this.getRandomNum(t.left, t.right),
        this.getRandomNum(t.bottom, t.top),
        this.getRandomNum(t.back, t.front)
      ), a.setXYZ(
        o,
        this.getRandomColor("r"),
        this.getRandomColor("g"),
        this.getRandomColor("b")
      );
    i.needsUpdate = !0, a.needsUpdate = !0;
  }
  resetGeometry() {
    const t = this.range, e = this.geometry, r = this.amount, i = new Array(r * 3), a = new Array(r * 3);
    for (let o = 0; o < r * 3; o += 3)
      i[o] = this.getRandomNum(t.left, t.right), i[o + 1] = this.getRandomNum(t.bottom, t.top), i[o + 2] = this.getRandomNum(t.back, t.front), a[o] = this.getRandomColor("r"), a[o + 1] = this.getRandomColor("g"), a[o + 2] = this.getRandomColor("b");
    e.setAttribute(
      "position",
      new s(new Float32Array(i), 3)
    ), e.setAttribute(
      "color",
      new s(new Float32Array(a), 3)
    );
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.removeFromParent();
  }
}
const b = m(
  (l) => ({
    type: "FloatParticle",
    config: R,
    commands: {
      set: {
        range(t) {
          Object.assign(t.target.range, t.config.range), t.target.updateGeometry();
        },
        amount(t) {
          t.target.amount = t.value, t.target.resetGeometry();
        },
        time(t) {
          t.target.material.uniforms.time.value = t.value;
        },
        flicker(t) {
          t.target.material.uniforms.flicker.value = t.value;
        },
        size(t) {
          t.target.material.uniforms.size.value = t.value;
        },
        opacity(t) {
          t.target.material.uniforms.opacity.value = t.value;
        },
        floatRange(t) {
          t.target.material.uniforms.floatRange.value = t.value;
        },
        colorRange(t) {
          t.target.colorRange = t.value, t.target.updateGeometry();
        },
        refColor(t) {
          t.target.refColor.setStyle(t.value), t.target.updateGeometry();
        },
        alphaMap(t) {
          const e = t.engine.getObjectFromModule(
            n.TEXTURE,
            t.value
          ) || null;
          t.target.material.uniforms.alphaMap.value = e, t.target.material.uniforms.useAlphaMap.value = !!e;
        }
      }
    },
    create({ model: t, config: e, engine: r }) {
      const i = new M({
        range: { ...e.range },
        amount: e.amount,
        size: e.size,
        opacity: e.opacity,
        alphaMap: r.getObjectFromModule(
          n.TEXTURE,
          e.alphaMap
        ),
        flicker: e.flicker,
        floatRange: e.floatRange,
        refColor: new u(e.refColor),
        colorRange: e.colorRange
      });
      return l.create({
        model: t,
        target: i,
        config: e,
        filter: {
          range: !0,
          amount: !0,
          size: !0,
          alphaMap: !0,
          opacity: !0,
          flicker: !0,
          floatRange: !0,
          refColor: !0,
          colorRange: !0
        },
        engine: r
      }), i;
    },
    dispose({ target: t }) {
      t.dispose();
    }
  })
), P = g({
  type: "particle",
  object: !0,
  models: [b],
  lifeOrder: c.THREE
});
export {
  P as default
};
