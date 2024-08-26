import { Compiler as D, getBasicConfig as U, defineModel as f, MODULE_TYPE as S, defineModule as j } from "@vis-three/tdcm";
import { FilmPass as F } from "three/examples/jsm/postprocessing/FilmPass.js";
import { LUTPass as G } from "three/examples/jsm/postprocessing/LUTPass.js";
import { Color as x, MeshBasicMaterial as y, LineBasicMaterial as H, PointsMaterial as z, SpriteMaterial as k, WebGLRenderTarget as v, UniformsUtils as A, ShaderMaterial as b, Vector2 as c, Vector3 as p, Scene as R, PerspectiveCamera as W, Mesh as V, Line as L, Points as Q, Sprite as E, AdditiveBlending as _, Camera as I, PlaneGeometry as C } from "three";
import { Pass as N, FullScreenQuad as $ } from "three/examples/jsm/postprocessing/Pass.js";
import { LuminosityHighPassShader as P } from "three/examples/jsm/shaders/LuminosityHighPassShader.js";
import { SMAAPass as Y } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { SSRPass as K } from "three/examples/jsm/postprocessing/SSRPass.js";
import { ReflectorForSSRPass as X } from "three/examples/jsm/objects/ReflectorForSSRPass.js";
import { UnrealBloomPass as q } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
class J extends D {
  constructor(e) {
    super(e);
  }
  useEngine(e) {
    return super.useEngine(e), e.effectComposer ? (this.composer = e.effectComposer, this) : (console.warn(
      "engine need install effectComposer plugin that can use pass compiler."
    ), this);
  }
  add(e) {
    const r = super.add(e);
    return r && (e.index < 0 ? this.composer.addPass(r) : this.composer.insertPass(r, e.index)), r;
  }
  remove(e) {
    if (!this.map.has(e.vid))
      return console.warn(`PassCompiler can not found this vid pass: ${e.vid}.`), this;
    const r = this.map.get(e.vid);
    return this.composer.removePass(r.puppet), super.remove(e), this;
  }
}
const d = function() {
  return Object.assign(U(), {
    vid: "",
    name: "",
    type: "Pass",
    index: -1
    // TODO: 顺序
  });
}, Z = function() {
  return Object.assign(d(), {});
}, ee = function() {
  return Object.assign(d(), {
    strength: 1.5,
    threshold: 0,
    radius: 0
  });
}, te = function() {
  return Object.assign(d(), {
    strength: 1,
    threshold: 0,
    radius: 0,
    renderScene: "",
    renderCamera: "",
    selectedObjects: []
  });
}, Te = function() {
  return Object.assign(d(), {
    camera: "",
    scene: "",
    kernelRadius: 8,
    kernelSize: 32,
    noiseTexture: "",
    output: 0,
    minDistance: 5e-3,
    maxDistance: 0.1
  });
}, re = function() {
  return Object.assign(d(), {
    renderer: "",
    scene: "",
    camera: "",
    width: 0,
    height: 0,
    ground: !0,
    groudOption: {
      geometry: "",
      color: "rgb(127, 127, 127)",
      textureWidth: 0,
      textureHeight: 0,
      clipBias: 0,
      multisample: 4
    },
    selects: [],
    opacity: 0.5,
    output: 0,
    maxDistance: 180,
    thickness: 0.018,
    bouncing: !0,
    distanceAttenuation: !0,
    fresnel: !0,
    infiniteThick: !0
  });
}, se = function() {
  return Object.assign(d(), {
    grayscale: !1,
    intensity: 0.5
  });
}, ie = function() {
  return Object.assign(d(), {
    lut: "",
    intensity: 1,
    use2D: !1
  });
}, oe = f({
  type: "FilmPass",
  config: se,
  commands: {
    set: {
      intensity({ target: t, value: e }) {
        t.uniforms.intensity.value = e;
      },
      grayscale({ target: t, value: e }) {
        t.uniforms.grayscale.value = e ? 1 : 0;
      }
    }
  },
  create({ config: t, engine: e }) {
    return new F(t.intensity, t.grayscale);
  },
  dispose(t) {
  }
}), ae = f({
  type: "LUTPass",
  config: ie,
  shared: {
    getResource(t, e) {
      if (t.lut) {
        const r = e.resourceManager.resourceMap.get(t.lut);
        if (!r)
          console.warn(
            `LUT pass processor can not found resource: ${t.lut}`
          );
        else
          return t.use2D ? r.texture : r.texture3D;
      }
    }
  },
  commands: {
    set: {
      lut({ model: t, target: e, config: r, engine: s }) {
        e.lut = t.getResource(r, s);
      },
      use2D({ model: t, target: e, config: r, engine: s }) {
        e.lut = t.getResource(r, s);
      }
    }
  },
  create({ model: t, config: e, engine: r }) {
    return new G({
      intensity: e.intensity,
      lut: t.getResource(e, r)
    });
  },
  dispose({ target: t }) {
    t.lut = void 0;
  }
}), m = class m extends N {
  constructor(e = new c(256, 256), r = 1, s = 0, o = 0, a = new R(), h = new W(), g) {
    super(), this.selectedObjects = [], this.clearColor = new x(0, 0, 0), this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5, this.separableBlurMaterials = [], this.enabled = !0, this.needsSwap = !1, this._oldClearColor = new x(), this.oldClearAlpha = 1, this.basic = new y(), this.fsQuad = new $(), this.materialCache = /* @__PURE__ */ new Map(), this.sceneBackgroundCache = null, this.overrideBackground = new x("black"), this.overrideMeshMaterial = new y({
      color: "black"
    }), this.overrideLineMaterial = new H({ color: "black" }), this.overridePointsMaterial = new z({ color: "black" }), this.overrideSpriteMaterial = new k({ color: "black" }), this.resolution = e, this.strength = r, this.radius = s, this.threshold = o, this.renderScene = a, this.renderCamera = h, this.selectedObjects = g;
    let n = Math.round(this.resolution.x / 2), l = Math.round(this.resolution.y / 2);
    this.selectRenderTarget = new v(n, l), this.selectRenderTarget.texture.name = "UnrealBloomPass.selected", this.selectRenderTarget.texture.generateMipmaps = !1, this.renderTargetBright = new v(n, l), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let u = 0; u < this.nMips; u++) {
      const M = new v(n, l);
      M.texture.name = "UnrealBloomPass.h" + u, M.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(M);
      const T = new v(n, l);
      T.texture.name = "UnrealBloomPass.v" + u, T.texture.generateMipmaps = !1, this.renderTargetsVertical.push(T), n = Math.round(n / 2), l = Math.round(l / 2);
    }
    P === void 0 && console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");
    const i = P;
    this.highPassUniforms = A.clone(i.uniforms), this.highPassUniforms.luminosityThreshold.value = o, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new b({
      uniforms: this.highPassUniforms,
      vertexShader: i.vertexShader,
      fragmentShader: i.fragmentShader,
      defines: {}
    });
    const B = [3, 5, 7, 9, 11];
    n = Math.round(this.resolution.x / 2), l = Math.round(this.resolution.y / 2);
    for (let u = 0; u < this.nMips; u++)
      this.separableBlurMaterials.push(
        this.getSeperableBlurMaterial(B[u])
      ), this.separableBlurMaterials[u].uniforms.texSize.value = new c(
        n,
        l
      ), n = Math.round(n / 2), l = Math.round(l / 2);
    this.compositeMaterial = this.getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = r, this.compositeMaterial.uniforms.bloomRadius.value = 0.1, this.compositeMaterial.needsUpdate = !0;
    const O = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms.bloomFactors.value = O, this.bloomTintColors = [
      new p(1, 1, 1),
      new p(1, 1, 1),
      new p(1, 1, 1),
      new p(1, 1, 1),
      new p(1, 1, 1)
    ], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, this.mixMaterial = this.getMixMaterial();
  }
  dispose() {
    for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
      this.renderTargetsHorizontal[e].dispose();
    for (let e = 0; e < this.renderTargetsVertical.length; e++)
      this.renderTargetsVertical[e].dispose();
    this.renderTargetBright.dispose();
  }
  setSize(e, r) {
    let s = Math.round(e / 2), o = Math.round(r / 2);
    this.selectRenderTarget.setSize(s, o), this.renderTargetBright.setSize(s, o);
    for (let a = 0; a < this.nMips; a++)
      this.renderTargetsHorizontal[a].setSize(s, o), this.renderTargetsVertical[a].setSize(s, o), this.separableBlurMaterials[a].uniforms.texSize.value = new c(
        s,
        o
      ), s = Math.round(s / 2), o = Math.round(o / 2);
  }
  render(e, r, s, o, a) {
    if (!this.selectedObjects.length) {
      this.renderToScreen && (this.fsQuad.material = this.basic, this.basic.map = s.texture, e.setRenderTarget(null), e.clear(), this.fsQuad.render(e));
      return;
    }
    e.getClearColor(this._oldClearColor), this.oldClearAlpha = e.getClearAlpha();
    const h = e.autoClear;
    e.autoClear = !1, e.setClearColor(this.clearColor, 0), a && e.state.buffers.stencil.setTest(!1);
    const g = /* @__PURE__ */ new Map();
    for (const i of this.selectedObjects)
      g.set(i, !0);
    const n = this.materialCache;
    this.renderScene.background && (this.sceneBackgroundCache = this.renderScene.background, this.renderScene.background = this.overrideBackground), this.renderScene.traverse((i) => {
      !g.has(i) && !i.isLight && i.visible && (n.set(i, i.material), i instanceof V ? i.material = this.overrideMeshMaterial : i instanceof L ? i.material = this.overrideLineMaterial : i instanceof Q ? i.material = this.overridePointsMaterial : i instanceof E && (i.material = this.overrideSpriteMaterial));
    }), e.setRenderTarget(this.selectRenderTarget), e.clear(), e.render(this.renderScene, this.renderCamera), this.renderToScreen && (this.fsQuad.material = this.basic, this.basic.map = this.selectRenderTarget.texture, e.setRenderTarget(null), e.clear(), this.fsQuad.render(e)), this.highPassUniforms.tDiffuse.value = this.selectRenderTarget.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this.fsQuad.material = this.materialHighPassFilter, e.setRenderTarget(this.renderTargetBright), e.clear(), this.fsQuad.render(e);
    let l = this.renderTargetBright;
    for (let i = 0; i < this.nMips; i++)
      this.fsQuad.material = this.separableBlurMaterials[i], this.separableBlurMaterials[i].uniforms.colorTexture.value = l.texture, this.separableBlurMaterials[i].uniforms.direction.value = m.BlurDirectionX, e.setRenderTarget(this.renderTargetsHorizontal[i]), e.clear(), this.fsQuad.render(e), this.separableBlurMaterials[i].uniforms.colorTexture.value = this.renderTargetsHorizontal[i].texture, this.separableBlurMaterials[i].uniforms.direction.value = m.BlurDirectionY, e.setRenderTarget(this.renderTargetsVertical[i]), e.clear(), this.fsQuad.render(e), l = this.renderTargetsVertical[i];
    this.fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, e.setRenderTarget(this.renderTargetsHorizontal[0]), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.mixMaterial, this.mixMaterial.uniforms.bloom.value = this.renderTargetsHorizontal[0].texture, this.mixMaterial.uniforms.origin.value = s.texture, a && e.state.buffers.stencil.setTest(!0), this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(s), this.fsQuad.render(e)), e.setClearColor(this._oldClearColor, this.oldClearAlpha), e.autoClear = h;
    for (const i of n.entries())
      i[0].material = i[1];
    n.clear(), this.sceneBackgroundCache && (this.renderScene.background = this.sceneBackgroundCache, this.sceneBackgroundCache = null);
  }
  getMixMaterial() {
    return new b({
      blending: _,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0,
      uniforms: {
        bloom: { value: null },
        origin: { value: null }
      },
      vertexShader: `
    
        varying vec2 vUv;
    
        void main() {
    
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    
        }`,
      fragmentShader: `
        uniform sampler2D bloom;
        uniform sampler2D origin;
    
        varying vec2 vUv;
    
        void main() {
          vec3 bloomColor = texture2D(bloom, vUv).rgb;
          vec3 originColor = texture2D(origin, vUv).rgb;
          gl_FragColor = vec4(originColor + bloomColor, 1.0);
        }`
    });
  }
  getSeperableBlurMaterial(e) {
    return new b({
      defines: {
        KERNEL_RADIUS: e,
        SIGMA: e
      },
      uniforms: {
        colorTexture: { value: null },
        texSize: { value: new c(0.5, 0.5) },
        direction: { value: new c(0.5, 0.5) }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
    });
  }
  getCompositeMaterial(e) {
    return new b({
      defines: {
        NUM_MIPS: e
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
    });
  }
};
m.BlurDirectionX = new c(1, 0), m.BlurDirectionY = new c(0, 1);
let w = m;
const ne = f({
  type: "SelectiveBloomPass",
  config: te,
  commands: {
    add: {
      selectedObjects({ target: t, engine: e, value: r }) {
        const s = e.getObject3D(r);
        s ? t.selectedObjects.push(s) : console.warn(
          `selectiveBloomPassProcessor: can not found vid in engine: ${r}`
        );
      }
    },
    set: {
      renderScene({ target: t, engine: e, value: r }) {
        const s = e.getObject3D(r);
        s instanceof R && (t.renderScene = s);
      },
      renderCamera({ target: t, engine: e, value: r }) {
        const s = e.getObject3D(r);
        s instanceof I && (t.renderCamera = s);
      },
      selectedObjects({ target: t, config: e, engine: r }) {
        const s = e.selectedObjects.map((o) => {
          const a = r.getObject3D(o);
          if (a)
            return a;
          console.warn(
            `selectiveBloomPassProcessor: can not found vid in engine: ${o}`
          );
        }).filter((o) => o);
        t.selectedObjects = s;
      }
    },
    delete: {
      selectedObjects({ target: t, engine: e, value: r }) {
        const s = e.getObject3D(r);
        s ? t.selectedObjects.includes(s) && t.selectedObjects.splice(
          t.selectedObjects.indexOf(s),
          1
        ) : console.warn(
          `selectiveBloomPassProcessor: can not found vid in engine: ${r}`
        );
      }
    }
  },
  create({ config: t, engine: e }) {
    const r = [];
    for (const a of t.selectedObjects) {
      const h = e.getObject3D(a);
      h && r.push(h);
    }
    const s = window.devicePixelRatio;
    return new w(
      new c(
        e.dom ? e.dom.offsetWidth * s : window.innerWidth * s,
        e.dom ? e.dom.offsetHeight * s : window.innerWidth * s
      ),
      t.strength,
      t.radius,
      t.threshold,
      t.renderScene && e.getObjectFromModule(
        S.SCENE,
        t.renderScene
      ) || void 0,
      t.renderCamera && e.getObjectFromModule(
        S.CAMERA,
        t.renderCamera
      ) || void 0,
      r
    );
  },
  dispose({ target: t }) {
    t.dispose();
  }
}), le = f({
  type: "SMAAPass",
  config: Z,
  create({ config: t, engine: e }) {
    const r = window.devicePixelRatio;
    return new Y(
      e.dom ? e.dom.offsetWidth * r : window.innerWidth * r,
      e.dom ? e.dom.offsetHeight * r : window.innerWidth * r
    );
  },
  dispose(t) {
  }
}), ue = f({
  type: "SSRPass",
  config: re,
  shared: {
    defaultGroundGeometry: new C(
      window.innerWidth,
      window.innerHeight
    ),
    setDefaultGroundGeometry(t) {
      const e = new C(
        t.width ? t.width : window.innerWidth,
        t.height ? t.height : window.innerHeight
      );
      return this.defaultGroundGeometry.copy(e), e.dispose(), this.defaultGroundGeometry;
    },
    generateGround(t, e) {
      const r = new X(
        e.getObjectBySymbol(t.groudOption.geometry) || this.setDefaultGroundGeometry(t),
        {
          color: new x(t.groudOption.color).getHex(),
          clipBias: t.groudOption.clipBias,
          textureHeight: t.groudOption.textureHeight || e.dom.offsetWidth * window.devicePixelRatio,
          textureWidth: t.groudOption.textureWidth || e.dom.offsetHeight * window.devicePixelRatio,
          useDepthTexture: !0
        }
      );
      return r.material.depthWrite = !1, r.raycast = () => {
      }, r.visible = !1, r.geometry === this.defaultGroundGeometry && (r.rotation.x = -Math.PI / 2), (t.scene ? e.getObjectBySymbol(t.scene) : e.scene).add(r), r;
    },
    disposeGround(t) {
      t.getRenderTarget().dispose(), t.material.dispose();
    }
  },
  commands: {
    set: {
      ground({ model: t, target: e, config: r, value: s, engine: o }) {
        if (s && !e.groundReflector) {
          e.groundReflector = t.generateGround(r, o);
          return;
        }
        !s && e.groundReflector && (t.disposeGround(e.groundReflector), e.groundReflector = null);
      },
      groudOption: {
        geometry({ model: t, target: e, config: r, value: s, engine: o }) {
          if (r.ground)
            if (s) {
              const a = o.getObjectBySymbol(s);
              if (!a) {
                console.warn(
                  `SSR pass processor: can not found geometry with: ${s}`
                );
                return;
              }
              e.groundReflector.geometry = a;
            } else
              e.groundReflector.geometry = t.setDefaultGroundGeometry(r);
        }
      },
      opacity({ target: t, value: e }) {
        t.groundReflector && (t.groundReflector.opacity = e), t.opacity = e;
      },
      maxDistance({ target: t, value: e }) {
        t.groundReflector && (t.groundReflector.maxDistance = e), t.maxDistance = e;
      }
    }
  },
  create({ model: t, config: e, engine: r }) {
    const s = window.devicePixelRatio, o = new K({
      renderer: e.renderer ? r.getObjectBySymbol(e.renderer) : r.webGLRenderer,
      scene: e.scene ? r.getObjectBySymbol(e.scene) : r.scene,
      camera: e.camera ? r.getObjectBySymbol(e.camera) : r.camera,
      width: e.width ? e.width : r.dom.offsetWidth * s,
      height: e.height ? e.height : r.dom.offsetHeight * s,
      groundReflector: e.ground ? t.generateGround(e, r) : null,
      selects: e.selects.map((a) => r.getObjectBySymbol(a)),
      //@ts-ignore
      bouncing: e.bouncing
    });
    if (o.infiniteThick = e.infiniteThick, o.opacity = e.opacity, o.output = e.output, o.maxDistance = e.maxDistance, o.thickness = e.thickness, o.groundReflector) {
      const a = o.groundReflector;
      a.opacity = o.opacity, a.maxDistance = o.maxDistance;
    }
    return o;
  },
  dispose({ model: t, target: e }) {
    e.groundReflector && t.disposeGround(e.groundReflector), e.groundReflector = null, e.dispose(), t.defaultGroundGeometry.dispose(), defaultGroundGeometry = void 0;
  }
}), ce = f({
  type: "UnrealBloomPass",
  config: ee,
  create({ config: t, engine: e }) {
    const r = window.devicePixelRatio;
    return new q(
      new c(
        e.dom ? e.dom.offsetWidth * r : window.innerWidth * r,
        e.dom ? e.dom.offsetHeight * r : window.innerWidth * r
      ),
      t.strength,
      t.radius,
      t.threshold
    );
  },
  dispose({ target: t }) {
    t.dispose();
  }
}), we = j({
  type: "pass",
  compiler: J,
  models: [
    oe,
    ae,
    ne,
    le,
    ue,
    ce
  ]
});
export {
  J as PassCompiler,
  we as default,
  se as getFilmPassConfig,
  ie as getLUTPassConfig,
  d as getPassConfig,
  Z as getSMAAPassConfig,
  Te as getSSAOPassConfig,
  re as getSSRPassConfig,
  te as getSelectiveBloomPassConfig,
  ee as getUnrealBloomPassConfig
};
