import { ENGINE_EVENT as c } from "@vis-three/core";
import { transPkgName as S } from "@vis-three/utils";
import { SELECTION_PLUGIN as B, SELECTED as g } from "@vis-three/plugin-selection";
import { EFFECT_COMPOSER_PLUGIN as C } from "@vis-three/plugin-effect-composer";
import { Scene as w, Vector2 as l, Color as d, Matrix4 as D, MeshDepthMaterial as k, DoubleSide as p, RGBADepthPacking as E, NoBlending as x, ShaderMaterial as f, Vector3 as T, AdditiveBlending as b, UniformsUtils as M, WebGLRenderTarget as o } from "three";
import { Pass as P, FullScreenQuad as y } from "three/examples/jsm/postprocessing/Pass.js";
import { CopyShader as h } from "three/examples/jsm/shaders/CopyShader.js";
const R = "@vis-three/strategy-selection-prompt", u = class u extends P {
  constructor(e, i, r) {
    super(), this.renderScene = new w(), this.resolution = new l(256, 256), this.selected = [], this.visibleEdgeColor = new d(1, 1, 1), this.hiddenEdgeColor = new d(0.1, 0.04, 0.02), this.edgeGlow = 0, this.usePatternTexture = !1, this.edgeThickness = 1, this.edgeStrength = 3, this.downSampleRatio = 2, this.pulsePeriod = 0, this.patternTexture = null, this.msaa = 4, this._oldClearColor = new d(), this.oldClearAlpha = 1, this.fsQuad = new y(void 0), this.tempPulseColor1 = new d(), this.tempPulseColor2 = new d(), this.textureMatrix = new D(), this.depthMaterial = new k({
      side: p,
      depthPacking: E,
      blending: x
    }), this.prepareMaskMaterial = new f({
      uniforms: {
        depthTexture: { value: null },
        cameraNearFar: { value: new l(0.5, 0.5) },
        textureMatrix: { value: null },
        projectMatrix: { value: null }
      },
      vertexShader: `#include <morphtarget_pars_vertex>
      #include <skinning_pars_vertex>

      varying vec4 projTexCoord;
      varying vec4 vPosition;
      uniform mat4 textureMatrix;

      void main() {

        #include <skinbase_vertex>
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <project_vertex>

        vPosition = mvPosition;
        vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );
        projTexCoord = textureMatrix * worldPosition;

      }`,
      fragmentShader: `#include <packing>
      #include <common>
      varying vec4 vPosition;
      varying vec4 projTexCoord;
      uniform sampler2D depthTexture;
      uniform vec2 cameraNearFar;
      uniform mat4 projectMatrix;
      void main() {

        float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
        float viewZ = isPerspectiveMatrix(projectMatrix) ? - perspectiveDepthToViewZ( depth, cameraNearFar.x, cameraNearFar.y ) : - orthographicDepthToViewZ( depth, cameraNearFar.x, cameraNearFar.y ) ;
        float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
        gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

      }`,
      side: p
    }), this.edgeDetectionMaterial = new f({
      uniforms: {
        maskTexture: { value: null },
        texSize: { value: new l(0.5, 0.5) },
        visibleEdgeColor: { value: new T(1, 1, 1) },
        hiddenEdgeColor: { value: new T(1, 1, 1) }
      },
      vertexShader: `varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
      fragmentShader: `varying vec2 vUv;

      uniform sampler2D maskTexture;
      uniform vec2 texSize;
      uniform vec3 visibleEdgeColor;
      uniform vec3 hiddenEdgeColor;

      void main() {
        vec2 invSize = 1.0 / texSize;
        vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
        vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
        vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
        vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
        vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
        float diff1 = (c1.r - c2.r)*0.5;
        float diff2 = (c3.r - c4.r)*0.5;
        float d = length( vec2(diff1, diff2) );
        float a1 = min(c1.g, c2.g);
        float a2 = min(c3.g, c4.g);
        float visibilityFactor = min(a1, a2);
        vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
        gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
      }`
    }), this.overlayMaterial = new f({
      uniforms: {
        maskTexture: { value: null },
        edgeTexture1: { value: null },
        edgeTexture2: { value: null },
        patternTexture: { value: null },
        edgeStrength: { value: 1 },
        edgeGlow: { value: 1 },
        usePatternTexture: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
      fragmentShader: `varying vec2 vUv;

      uniform sampler2D maskTexture;
      uniform sampler2D edgeTexture1;
      uniform sampler2D edgeTexture2;
      uniform sampler2D patternTexture;
      uniform float edgeStrength;
      uniform float edgeGlow;
      uniform bool usePatternTexture;

      void main() {
        vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
        vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
        vec4 maskColor = texture2D(maskTexture, vUv);
        vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
        float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
        vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
        vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
        if(usePatternTexture)
          finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
        gl_FragColor = finalColor;
      }`,
      blending: b,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.materialCopy = new f({
      uniforms: M.merge([
        M.clone(h.uniforms),
        {
          opacity: { value: 1 }
        }
      ]),
      vertexShader: h.vertexShader,
      fragmentShader: h.fragmentShader,
      blending: x,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.cacheParents = /* @__PURE__ */ new Map(), this.renderScene.matrixAutoUpdate = !1, this.resolution.copy(e), this.renderCamera = i, this.selected = r;
    const t = Math.round(this.resolution.x / this.downSampleRatio), a = Math.round(this.resolution.y / this.downSampleRatio);
    this.renderTargetMaskBuffer = new o(
      this.resolution.x,
      this.resolution.y,
      { samples: this.msaa }
    ), this.renderTargetMaskBuffer.texture.name = "OutlinePass.mask", this.renderTargetMaskBuffer.texture.generateMipmaps = !1, this.renderTargetDepthBuffer = new o(
      this.resolution.x,
      this.resolution.y,
      { samples: this.msaa }
    ), this.renderTargetDepthBuffer.texture.name = "OutlinePass.depth", this.renderTargetDepthBuffer.texture.generateMipmaps = !1, this.renderTargetMaskDownSampleBuffer = new o(t, a), this.renderTargetMaskDownSampleBuffer.texture.name = "OutlinePass.depthDownSample", this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps = !1, this.renderTargetBlurBuffer1 = new o(t, a), this.renderTargetBlurBuffer1.texture.name = "OutlinePass.blur1", this.renderTargetBlurBuffer1.texture.generateMipmaps = !1, this.renderTargetBlurBuffer2 = new o(
      Math.round(t / 2),
      Math.round(a / 2)
    ), this.renderTargetBlurBuffer2.texture.name = "OutlinePass.blur2", this.renderTargetBlurBuffer2.texture.generateMipmaps = !1, this.renderTargetEdgeBuffer1 = new o(t, a), this.renderTargetEdgeBuffer1.texture.name = "OutlinePass.edge1", this.renderTargetEdgeBuffer1.texture.generateMipmaps = !1, this.renderTargetEdgeBuffer2 = new o(
      Math.round(t / 2),
      Math.round(a / 2)
    ), this.renderTargetEdgeBuffer2.texture.name = "OutlinePass.edge2", this.renderTargetEdgeBuffer2.texture.generateMipmaps = !1;
    const s = 4, n = 4;
    this.separableBlurMaterial1 = this.getSeperableBlurMaterial(s), this.separableBlurMaterial1.uniforms.texSize.value.set(t, a), this.separableBlurMaterial1.uniforms.kernelRadius.value = 1, this.separableBlurMaterial2 = this.getSeperableBlurMaterial(n), this.separableBlurMaterial2.uniforms.texSize.value.set(
      Math.round(t / 2),
      Math.round(a / 2)
    ), this.separableBlurMaterial2.uniforms.kernelRadius.value = n, this.enabled = !0, this.needsSwap = !1;
  }
  getSeperableBlurMaterial(e) {
    return new f({
      defines: {
        MAX_RADIUS: e
      },
      uniforms: {
        colorTexture: { value: null },
        texSize: { value: new l(0.5, 0.5) },
        direction: { value: new l(0.5, 0.5) },
        kernelRadius: { value: 1 }
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
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float weightSum = gaussianPdf(0.0, kernelRadius);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float w = gaussianPdf(uvOffset.x, kernelRadius);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`
    });
  }
  dispose() {
    this.renderTargetMaskBuffer.dispose(), this.renderTargetDepthBuffer.dispose(), this.renderTargetMaskDownSampleBuffer.dispose(), this.renderTargetBlurBuffer1.dispose(), this.renderTargetBlurBuffer2.dispose(), this.renderTargetEdgeBuffer1.dispose(), this.renderTargetEdgeBuffer2.dispose();
  }
  setSize(e, i) {
    this.renderTargetMaskBuffer.setSize(e, i), this.renderTargetDepthBuffer.setSize(e, i);
    let r = Math.round(e / this.downSampleRatio), t = Math.round(i / this.downSampleRatio);
    this.renderTargetMaskDownSampleBuffer.setSize(r, t), this.renderTargetBlurBuffer1.setSize(r, t), this.renderTargetEdgeBuffer1.setSize(r, t), this.separableBlurMaterial1.uniforms.texSize.value.set(r, t), r = Math.round(r / 2), t = Math.round(t / 2), this.renderTargetBlurBuffer2.setSize(r, t), this.renderTargetEdgeBuffer2.setSize(r, t), this.separableBlurMaterial2.uniforms.texSize.value.set(r, t);
  }
  updateTextureMatrix() {
    this.textureMatrix.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), this.textureMatrix.multiply(this.renderCamera.projectionMatrix), this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse);
  }
  changeParentOfSelectedObjects(e) {
    const i = this.cacheParents, r = this.renderScene, t = this.selected;
    for (let a = 0; a < t.length; a++) {
      const s = t[a];
      s.isCSS3DObject || s.isCSS2DObject || (e === !0 ? (i.set(s, s.parent), r.add(s)) : (i.get(s).add(s), i.delete(s)));
    }
  }
  render(e, i, r, t, a) {
    if (this.selected.length > 0) {
      e.getClearColor(this._oldClearColor), this.oldClearAlpha = e.getClearAlpha();
      const s = e.autoClear;
      if (e.autoClear = !1, a && e.state.buffers.stencil.setTest(!1), e.setClearColor(16777215, 1), this.changeParentOfSelectedObjects(!0), this.renderScene.overrideMaterial = this.depthMaterial, e.setRenderTarget(this.renderTargetDepthBuffer), e.clear(), e.render(this.renderScene, this.renderCamera), this.updateTextureMatrix(), this.renderScene.overrideMaterial = this.prepareMaskMaterial, this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(
        this.renderCamera.near,
        this.renderCamera.far
      ), this.prepareMaskMaterial.uniforms.projectMatrix.value = this.renderCamera.projectionMatrix, this.prepareMaskMaterial.uniforms.depthTexture.value = this.renderTargetDepthBuffer.texture, this.prepareMaskMaterial.uniforms.textureMatrix.value = this.textureMatrix, e.setRenderTarget(this.renderTargetMaskBuffer), e.clear(), e.render(this.renderScene, this.renderCamera), this.renderScene.overrideMaterial = null, this.changeParentOfSelectedObjects(!1), this.fsQuad.material = this.materialCopy, this.materialCopy.uniforms.tDiffuse.value = this.renderTargetMaskBuffer.texture, e.setRenderTarget(this.renderTargetMaskDownSampleBuffer), e.clear(), this.fsQuad.render(e), this.tempPulseColor1.copy(this.visibleEdgeColor), this.tempPulseColor2.copy(this.hiddenEdgeColor), this.pulsePeriod > 0) {
        const n = 0.625 + Math.cos(performance.now() * 0.01 / this.pulsePeriod) * 0.75 / 2;
        this.tempPulseColor1.multiplyScalar(n), this.tempPulseColor2.multiplyScalar(n);
      }
      this.fsQuad.material = this.edgeDetectionMaterial, this.edgeDetectionMaterial.uniforms.maskTexture.value = this.renderTargetMaskDownSampleBuffer.texture, this.edgeDetectionMaterial.uniforms.texSize.value.set(
        this.renderTargetMaskDownSampleBuffer.width,
        this.renderTargetMaskDownSampleBuffer.height
      ), this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value = this.tempPulseColor1, this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value = this.tempPulseColor2, e.setRenderTarget(this.renderTargetEdgeBuffer1), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.separableBlurMaterial1, this.separableBlurMaterial1.uniforms.colorTexture.value = this.renderTargetEdgeBuffer1.texture, this.separableBlurMaterial1.uniforms.direction.value = u.BlurDirectionX, this.separableBlurMaterial1.uniforms.kernelRadius.value = this.edgeThickness, e.setRenderTarget(this.renderTargetBlurBuffer1), e.clear(), this.fsQuad.render(e), this.separableBlurMaterial1.uniforms.colorTexture.value = this.renderTargetBlurBuffer1.texture, this.separableBlurMaterial1.uniforms.direction.value = u.BlurDirectionY, e.setRenderTarget(this.renderTargetEdgeBuffer1), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.separableBlurMaterial2, this.separableBlurMaterial2.uniforms.colorTexture.value = this.renderTargetEdgeBuffer1.texture, this.separableBlurMaterial2.uniforms.direction.value = u.BlurDirectionX, e.setRenderTarget(this.renderTargetBlurBuffer2), e.clear(), this.fsQuad.render(e), this.separableBlurMaterial2.uniforms.colorTexture.value = this.renderTargetBlurBuffer2.texture, this.separableBlurMaterial2.uniforms.direction.value = u.BlurDirectionY, e.setRenderTarget(this.renderTargetEdgeBuffer2), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.overlayMaterial, this.overlayMaterial.uniforms.maskTexture.value = this.renderTargetMaskBuffer.texture, this.overlayMaterial.uniforms.edgeTexture1.value = this.renderTargetEdgeBuffer1.texture, this.overlayMaterial.uniforms.edgeTexture2.value = this.renderTargetEdgeBuffer2.texture, this.overlayMaterial.uniforms.patternTexture.value = this.patternTexture, this.overlayMaterial.uniforms.edgeStrength.value = this.edgeStrength, this.overlayMaterial.uniforms.edgeGlow.value = this.edgeGlow, this.overlayMaterial.uniforms.usePatternTexture.value = this.usePatternTexture, a && e.state.buffers.stencil.setTest(!0), e.setRenderTarget(r), this.fsQuad.render(e), e.setClearColor(this._oldClearColor, this.oldClearAlpha), e.autoClear = s;
    }
    this.renderToScreen && (this.fsQuad.material = this.materialCopy, this.materialCopy.uniforms.tDiffuse.value = r.texture, e.setRenderTarget(null), this.fsQuad.render(e));
  }
};
u.BlurDirectionX = new l(1, 0), u.BlurDirectionY = new l(0, 1);
let m = u;
const O = S(R), G = function(v = {}) {
  let e, i, r;
  return {
    name: O,
    condition: [B, C],
    exec(t) {
      r = new m(
        new l(t.dom.offsetWidth, t.dom.offsetHeight),
        t.camera,
        []
      );
      for (const a in v)
        r[a] !== void 0 && (r[a] = v[a]);
      t.effectComposer.addPass(r), e = (a) => {
        r.renderCamera = a.camera;
      }, t.addEventListener(c.SETCAMERA, e), i = (a) => {
        r.selected = a.objects;
      }, t.addEventListener(g, i);
    },
    rollback(t) {
      t.removeEventListener(c.SETCAMERA, e), t.removeEventListener(g, i), t.effectComposer.removePass(r);
    }
  };
};
export {
  O as SELECTION_PROMPT_STRATEGY,
  G as SelectionPromptStrategy
};
