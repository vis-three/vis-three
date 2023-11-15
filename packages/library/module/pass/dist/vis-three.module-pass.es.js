var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Compiler, Rule, getSymbolConfig, defineProcessor, MODULETYPE } from "@vis-three/middleware";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass";
import { Vector2, Color, MeshBasicMaterial, LineBasicMaterial, PointsMaterial, SpriteMaterial, WebGLRenderTarget, UniformsUtils, ShaderMaterial, Vector3, Scene, PerspectiveCamera, Mesh, Line, Points, Sprite, AdditiveBlending, Camera, PlaneBufferGeometry } from "three";
import { Pass, FullScreenQuad } from "three/examples/jsm/postprocessing/Pass";
import { LuminosityHighPassShader } from "three/examples/jsm/shaders/LuminosityHighPassShader";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass";
import { ReflectorForSSRPass } from "three/examples/jsm/objects/ReflectorForSSRPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
class PassCompiler extends Compiler {
  constructor() {
    super();
    __publicField(this, "composer");
  }
  useEngine(engine) {
    super.useEngine(engine);
    if (!engine.effectComposer) {
      console.warn(
        `engine need install effectComposer plugin that can use pass compiler.`
      );
      return this;
    }
    this.composer = engine.effectComposer;
    return this;
  }
  add(config) {
    const pass = super.add(config);
    pass && this.composer.addPass(pass);
    return pass;
  }
  remove(config) {
    if (!this.map.has(config.vid)) {
      console.warn(`PassCompiler can not found this vid pass: ${config.vid}.`);
      return this;
    }
    const pass = this.map.get(config.vid);
    this.composer.removePass(pass);
    super.remove(config);
    return this;
  }
}
const PassRule = function(input, compiler) {
  Rule(input, compiler);
};
const getPassConfig = function() {
  return Object.assign(getSymbolConfig(), {
    vid: "",
    name: "",
    type: "Pass",
    index: 0
  });
};
const getSMAAPassConfig = function() {
  return Object.assign(getPassConfig(), {});
};
const getUnrealBloomPassConfig = function() {
  return Object.assign(getPassConfig(), {
    strength: 1.5,
    threshold: 0,
    radius: 0
  });
};
const getSelectiveBloomPassConfig = function() {
  return Object.assign(getPassConfig(), {
    strength: 1,
    threshold: 0,
    radius: 0,
    renderScene: "",
    renderCamera: "",
    selectedObjects: []
  });
};
const getSSAOPassConfig = function() {
  return Object.assign(getPassConfig(), {
    camera: "",
    scene: "",
    kernelRadius: 8,
    kernelSize: 32,
    noiseTexture: "",
    output: 0,
    minDistance: 5e-3,
    maxDistance: 0.1
  });
};
const getSSRPassConfig = function() {
  return Object.assign(getPassConfig(), {
    renderer: "",
    scene: "",
    camera: "",
    width: 0,
    height: 0,
    ground: true,
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
    bouncing: true,
    distanceAttenuation: true,
    fresnel: true,
    infiniteThick: true
  });
};
const getFilmPassConfig = function() {
  return Object.assign(getPassConfig(), {
    grayscale: false,
    noiseIntensity: 0.5,
    scanlinesIntensity: 0.05,
    scanlinesCount: 4096
  });
};
const getLUTPassConfig = function() {
  return Object.assign(getPassConfig(), {
    lut: "",
    intensity: 1,
    use2D: false
  });
};
var FilmPassProcessor = defineProcessor({
  type: "FilmPass",
  config: getFilmPassConfig,
  commands: {
    set: {
      noiseIntensity({ target, value }) {
        target.uniforms.nIntensity.value = value;
      },
      grayscale({ target, value }) {
        target.uniforms.grayscale.value = value ? 1 : 0;
      },
      scanlinesIntensity({ target, value }) {
        target.uniforms.sIntensity.value = value;
      },
      scanlinesCount({ target, value }) {
        target.uniforms.sCount.value = value;
      }
    }
  },
  create(config, engine) {
    return new FilmPass(
      config.noiseIntensity,
      config.scanlinesIntensity,
      config.scanlinesCount,
      config.grayscale ? 1 : 0
    );
  },
  dispose(target) {
  }
});
const getResource = function(config, engine) {
  if (config.lut) {
    const resource = engine.resourceManager.resourceMap.get(config.lut);
    if (!resource) {
      console.warn(`LUT pass processor can not found resource: ${config.lut}`);
    } else {
      return config.use2D ? resource.texture : resource.texture3D;
    }
  }
  return null;
};
var LUTPassProcessor = defineProcessor({
  type: "LUTPass",
  config: getLUTPassConfig,
  commands: {
    set: {
      lut({ target, config, engine }) {
        target.lut = getResource(config, engine);
      },
      use2D({ target, config, engine }) {
        target.lut = getResource(config, engine);
      }
    }
  },
  create(config, engine) {
    return new LUTPass({
      intensity: config.intensity,
      lut: getResource(config, engine)
    });
  },
  dispose(pass) {
    pass.lut = void 0;
  }
});
const _SelectiveBloomPass = class extends Pass {
  constructor(resolution = new Vector2(256, 256), strength = 1, radius = 0, threshold = 0, renderScene = new Scene(), renderCamera = new PerspectiveCamera(), selectedObjects) {
    super();
    __publicField(this, "resolution");
    __publicField(this, "strength");
    __publicField(this, "radius");
    __publicField(this, "threshold");
    __publicField(this, "selectedObjects", []);
    __publicField(this, "renderScene");
    __publicField(this, "renderCamera");
    __publicField(this, "clearColor", new Color(0, 0, 0));
    __publicField(this, "renderTargetsHorizontal", []);
    __publicField(this, "renderTargetsVertical", []);
    __publicField(this, "nMips", 5);
    __publicField(this, "selectRenderTarget");
    __publicField(this, "renderTargetBright");
    __publicField(this, "highPassUniforms");
    __publicField(this, "materialHighPassFilter");
    __publicField(this, "separableBlurMaterials", []);
    __publicField(this, "compositeMaterial");
    __publicField(this, "bloomTintColors");
    __publicField(this, "mixMaterial");
    __publicField(this, "enabled", true);
    __publicField(this, "needsSwap", false);
    __publicField(this, "_oldClearColor", new Color());
    __publicField(this, "oldClearAlpha", 1);
    __publicField(this, "basic", new MeshBasicMaterial());
    __publicField(this, "fsQuad", new FullScreenQuad());
    __publicField(this, "materialCache", /* @__PURE__ */ new Map());
    __publicField(this, "sceneBackgroundCache", null);
    __publicField(this, "overrideBackground", new Color("black"));
    __publicField(this, "overrideMeshMaterial", new MeshBasicMaterial({
      color: "black"
    }));
    __publicField(this, "overrideLineMaterial", new LineBasicMaterial({ color: "black" }));
    __publicField(this, "overridePointsMaterial", new PointsMaterial({ color: "black" }));
    __publicField(this, "overrideSpriteMaterial", new SpriteMaterial({ color: "black" }));
    this.resolution = resolution;
    this.strength = strength;
    this.radius = radius;
    this.threshold = threshold;
    this.renderScene = renderScene;
    this.renderCamera = renderCamera;
    this.selectedObjects = selectedObjects;
    let resx = Math.round(this.resolution.x / 2);
    let resy = Math.round(this.resolution.y / 2);
    this.selectRenderTarget = new WebGLRenderTarget(resx, resy);
    this.selectRenderTarget.texture.name = "UnrealBloomPass.selected";
    this.selectRenderTarget.texture.generateMipmaps = false;
    this.renderTargetBright = new WebGLRenderTarget(resx, resy);
    this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
    this.renderTargetBright.texture.generateMipmaps = false;
    for (let i = 0; i < this.nMips; i++) {
      const renderTargetHorizonal = new WebGLRenderTarget(resx, resy);
      renderTargetHorizonal.texture.name = "UnrealBloomPass.h" + i;
      renderTargetHorizonal.texture.generateMipmaps = false;
      this.renderTargetsHorizontal.push(renderTargetHorizonal);
      const renderTargetVertical = new WebGLRenderTarget(resx, resy);
      renderTargetVertical.texture.name = "UnrealBloomPass.v" + i;
      renderTargetVertical.texture.generateMipmaps = false;
      this.renderTargetsVertical.push(renderTargetVertical);
      resx = Math.round(resx / 2);
      resy = Math.round(resy / 2);
    }
    if (LuminosityHighPassShader === void 0)
      console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");
    const highPassShader = LuminosityHighPassShader;
    this.highPassUniforms = UniformsUtils.clone(highPassShader.uniforms);
    this.highPassUniforms["luminosityThreshold"].value = threshold;
    this.highPassUniforms["smoothWidth"].value = 0.01;
    this.materialHighPassFilter = new ShaderMaterial({
      uniforms: this.highPassUniforms,
      vertexShader: highPassShader.vertexShader,
      fragmentShader: highPassShader.fragmentShader,
      defines: {}
    });
    const kernelSizeArray = [3, 5, 7, 9, 11];
    resx = Math.round(this.resolution.x / 2);
    resy = Math.round(this.resolution.y / 2);
    for (let i = 0; i < this.nMips; i++) {
      this.separableBlurMaterials.push(
        this.getSeperableBlurMaterial(kernelSizeArray[i])
      );
      this.separableBlurMaterials[i].uniforms["texSize"].value = new Vector2(
        resx,
        resy
      );
      resx = Math.round(resx / 2);
      resy = Math.round(resy / 2);
    }
    this.compositeMaterial = this.getCompositeMaterial(this.nMips);
    this.compositeMaterial.uniforms["blurTexture1"].value = this.renderTargetsVertical[0].texture;
    this.compositeMaterial.uniforms["blurTexture2"].value = this.renderTargetsVertical[1].texture;
    this.compositeMaterial.uniforms["blurTexture3"].value = this.renderTargetsVertical[2].texture;
    this.compositeMaterial.uniforms["blurTexture4"].value = this.renderTargetsVertical[3].texture;
    this.compositeMaterial.uniforms["blurTexture5"].value = this.renderTargetsVertical[4].texture;
    this.compositeMaterial.uniforms["bloomStrength"].value = strength;
    this.compositeMaterial.uniforms["bloomRadius"].value = 0.1;
    this.compositeMaterial.needsUpdate = true;
    const bloomFactors = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms["bloomFactors"].value = bloomFactors;
    this.bloomTintColors = [
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 1)
    ];
    this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
    this.mixMaterial = this.getMixMaterial();
  }
  dispose() {
    for (let i = 0; i < this.renderTargetsHorizontal.length; i++) {
      this.renderTargetsHorizontal[i].dispose();
    }
    for (let i = 0; i < this.renderTargetsVertical.length; i++) {
      this.renderTargetsVertical[i].dispose();
    }
    this.renderTargetBright.dispose();
  }
  setSize(width, height) {
    let resx = Math.round(width / 2);
    let resy = Math.round(height / 2);
    this.selectRenderTarget.setSize(resx, resy);
    this.renderTargetBright.setSize(resx, resy);
    for (let i = 0; i < this.nMips; i++) {
      this.renderTargetsHorizontal[i].setSize(resx, resy);
      this.renderTargetsVertical[i].setSize(resx, resy);
      this.separableBlurMaterials[i].uniforms["texSize"].value = new Vector2(
        resx,
        resy
      );
      resx = Math.round(resx / 2);
      resy = Math.round(resy / 2);
    }
  }
  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    if (!this.selectedObjects.length) {
      if (this.renderToScreen) {
        this.fsQuad.material = this.basic;
        this.basic.map = readBuffer.texture;
        renderer.setRenderTarget(null);
        renderer.clear();
        this.fsQuad.render(renderer);
      }
      return;
    }
    renderer.getClearColor(this._oldClearColor);
    this.oldClearAlpha = renderer.getClearAlpha();
    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.setClearColor(this.clearColor, 0);
    if (maskActive)
      renderer.state.buffers.stencil.setTest(false);
    const selectedObjectsMap = /* @__PURE__ */ new Map();
    for (const object of this.selectedObjects) {
      selectedObjectsMap.set(object, true);
    }
    const materialCache = this.materialCache;
    if (this.renderScene.background) {
      this.sceneBackgroundCache = this.renderScene.background;
      this.renderScene.background = this.overrideBackground;
    }
    this.renderScene.traverse((object) => {
      if (!selectedObjectsMap.has(object) && !object.isLight && object.visible) {
        materialCache.set(object, object.material);
        if (object instanceof Mesh) {
          object.material = this.overrideMeshMaterial;
        } else if (object instanceof Line) {
          object.material = this.overrideLineMaterial;
        } else if (object instanceof Points) {
          object.material = this.overridePointsMaterial;
        } else if (object instanceof Sprite) {
          object.material = this.overrideSpriteMaterial;
        }
      }
    });
    renderer.setRenderTarget(this.selectRenderTarget);
    renderer.clear();
    renderer.render(this.renderScene, this.renderCamera);
    if (this.renderToScreen) {
      this.fsQuad.material = this.basic;
      this.basic.map = this.selectRenderTarget.texture;
      renderer.setRenderTarget(null);
      renderer.clear();
      this.fsQuad.render(renderer);
    }
    this.highPassUniforms["tDiffuse"].value = this.selectRenderTarget.texture;
    this.highPassUniforms["luminosityThreshold"].value = this.threshold;
    this.fsQuad.material = this.materialHighPassFilter;
    renderer.setRenderTarget(this.renderTargetBright);
    renderer.clear();
    this.fsQuad.render(renderer);
    let inputRenderTarget = this.renderTargetBright;
    for (let i = 0; i < this.nMips; i++) {
      this.fsQuad.material = this.separableBlurMaterials[i];
      this.separableBlurMaterials[i].uniforms["colorTexture"].value = inputRenderTarget.texture;
      this.separableBlurMaterials[i].uniforms["direction"].value = _SelectiveBloomPass.BlurDirectionX;
      renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
      renderer.clear();
      this.fsQuad.render(renderer);
      this.separableBlurMaterials[i].uniforms["colorTexture"].value = this.renderTargetsHorizontal[i].texture;
      this.separableBlurMaterials[i].uniforms["direction"].value = _SelectiveBloomPass.BlurDirectionY;
      renderer.setRenderTarget(this.renderTargetsVertical[i]);
      renderer.clear();
      this.fsQuad.render(renderer);
      inputRenderTarget = this.renderTargetsVertical[i];
    }
    this.fsQuad.material = this.compositeMaterial;
    this.compositeMaterial.uniforms["bloomStrength"].value = this.strength;
    this.compositeMaterial.uniforms["bloomRadius"].value = this.radius;
    this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
    renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
    renderer.clear();
    this.fsQuad.render(renderer);
    this.fsQuad.material = this.mixMaterial;
    this.mixMaterial.uniforms["bloom"].value = this.renderTargetsHorizontal[0].texture;
    this.mixMaterial.uniforms["origin"].value = readBuffer.texture;
    if (maskActive)
      renderer.state.buffers.stencil.setTest(true);
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(readBuffer);
      this.fsQuad.render(renderer);
    }
    renderer.setClearColor(this._oldClearColor, this.oldClearAlpha);
    renderer.autoClear = oldAutoClear;
    for (const entry of materialCache.entries()) {
      entry[0].material = entry[1];
    }
    materialCache.clear();
    if (this.sceneBackgroundCache) {
      this.renderScene.background = this.sceneBackgroundCache;
      this.sceneBackgroundCache = null;
    }
  }
  getMixMaterial() {
    return new ShaderMaterial({
      blending: AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true,
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
  getSeperableBlurMaterial(kernelRadius) {
    return new ShaderMaterial({
      defines: {
        KERNEL_RADIUS: kernelRadius,
        SIGMA: kernelRadius
      },
      uniforms: {
        colorTexture: { value: null },
        texSize: { value: new Vector2(0.5, 0.5) },
        direction: { value: new Vector2(0.5, 0.5) }
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
  getCompositeMaterial(nMips) {
    return new ShaderMaterial({
      defines: {
        NUM_MIPS: nMips
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
let SelectiveBloomPass = _SelectiveBloomPass;
__publicField(SelectiveBloomPass, "BlurDirectionX", new Vector2(1, 0));
__publicField(SelectiveBloomPass, "BlurDirectionY", new Vector2(0, 1));
var SelectiveBloomPassProcessor = defineProcessor({
  type: "SelectiveBloomPass",
  config: getSelectiveBloomPassConfig,
  commands: {
    add: {
      selectedObjects({ target, engine, value }) {
        const object = engine.getObject3D(value);
        if (object) {
          target.selectedObjects.push(object);
        } else {
          console.warn(
            `selectiveBloomPassProcessor: can not found vid in engine: ${value}`
          );
        }
      }
    },
    set: {
      renderScene({ target, engine, value }) {
        const object = engine.getObject3D(value);
        if (object instanceof Scene) {
          target.renderScene = object;
        }
      },
      renderCamera({ target, engine, value }) {
        const object = engine.getObject3D(value);
        if (object instanceof Camera) {
          target.renderCamera = object;
        }
      },
      selectedObjects({ target, config, engine }) {
        const objects = config.selectedObjects.map((vid) => {
          const object = engine.getObject3D(vid);
          if (object) {
            return object;
          } else {
            console.warn(
              `selectiveBloomPassProcessor: can not found vid in engine: ${vid}`
            );
            return void 0;
          }
        }).filter((object) => object);
        target.selectedObjects = objects;
      }
    },
    delete: {
      selectedObjects({ target, engine, value }) {
        const object = engine.getObject3D(value);
        if (object) {
          if (target.selectedObjects.includes(object)) {
            target.selectedObjects.splice(
              target.selectedObjects.indexOf(object),
              1
            );
          }
        } else {
          console.warn(
            `selectiveBloomPassProcessor: can not found vid in engine: ${value}`
          );
        }
      }
    }
  },
  create(config, engine) {
    const objects = [];
    for (const vid of config.selectedObjects) {
      const object = engine.getObject3D(vid);
      object && objects.push(object);
    }
    const pixelRatio = window.devicePixelRatio;
    const pass = new SelectiveBloomPass(
      new Vector2(
        engine.dom ? engine.dom.offsetWidth * pixelRatio : window.innerWidth * pixelRatio,
        engine.dom ? engine.dom.offsetHeight * pixelRatio : window.innerWidth * pixelRatio
      ),
      config.strength,
      config.radius,
      config.threshold,
      config.renderScene && engine.getObjectfromModule(
        MODULETYPE.SCENE,
        config.renderScene
      ) || void 0,
      config.renderCamera && engine.getObjectfromModule(
        MODULETYPE.CAMERA,
        config.renderCamera
      ) || void 0,
      objects
    );
    return pass;
  },
  dispose(target) {
    target.dispose();
  }
});
var SMAAPassProcessor = defineProcessor({
  type: "SMAAPass",
  config: getSMAAPassConfig,
  create(config, engine) {
    const pixelRatio = window.devicePixelRatio;
    const pass = new SMAAPass(
      engine.dom ? engine.dom.offsetWidth * pixelRatio : window.innerWidth * pixelRatio,
      engine.dom ? engine.dom.offsetHeight * pixelRatio : window.innerWidth * pixelRatio
    );
    return pass;
  },
  dispose(pass) {
  }
});
let defaultGroundGeometry = new PlaneBufferGeometry(
  window.innerWidth,
  window.innerHeight
);
const setDefaultGroundGeometry = function(config) {
  const newGeometry = new PlaneBufferGeometry(
    config.width ? config.width : window.innerWidth,
    config.height ? config.height : window.innerHeight
  );
  defaultGroundGeometry.copy(newGeometry);
  newGeometry.dispose();
  return defaultGroundGeometry;
};
const generateGround = function(config, engine) {
  const reflector = new ReflectorForSSRPass(
    engine.getObjectBySymbol(config.groudOption.geometry) || setDefaultGroundGeometry(config),
    {
      color: config.groudOption.color,
      clipBias: config.groudOption.clipBias,
      textureHeight: config.groudOption.textureHeight || engine.dom.offsetWidth * window.devicePixelRatio,
      textureWidth: config.groudOption.textureWidth || engine.dom.offsetHeight * window.devicePixelRatio,
      multisample: config.groudOption.multisample,
      useDepthTexture: true
    }
  );
  reflector.material.depthWrite = false;
  reflector.raycast = () => {
  };
  reflector.visible = false;
  if (reflector.geometry === defaultGroundGeometry) {
    reflector.rotation.x = -Math.PI / 2;
  }
  const scene = config.scene ? engine.getObjectBySymbol(config.scene) : engine.scene;
  scene.add(reflector);
  return reflector;
};
const disposeGround = function(reflector) {
  reflector.getRenderTarget().dispose();
  reflector.material.dispose();
};
var SSRPassProcessor = defineProcessor({
  type: "SSRPass",
  config: getSSRPassConfig,
  commands: {
    set: {
      ground({ target, config, value, engine }) {
        if (value && !target.groundReflector) {
          target.groundReflector = generateGround(config, engine);
          return;
        }
        if (!value && target.groundReflector) {
          disposeGround(target.groundReflector);
          target.groundReflector = null;
        }
      },
      groudOption: {
        geometry({ target, config, value, engine }) {
          if (config.ground) {
            if (value) {
              const geometry = engine.getObjectBySymbol(value);
              if (!geometry) {
                console.warn(
                  `SSR pass processor: can not found geometry with: ${value}`
                );
                return;
              }
              target.groundReflector.geometry = geometry;
            } else {
              target.groundReflector.geometry = setDefaultGroundGeometry(config);
            }
          }
        }
      },
      opacity({ target, value }) {
        if (target.groundReflector) {
          target.groundReflector.opacity = value;
          target.opacity = value;
        } else {
          target.opacity = value;
        }
      },
      maxDistance({ target, value }) {
        if (target.groundReflector) {
          target.groundReflector.maxDistance = value;
          target.maxDistance = value;
        } else {
          target.maxDistance = value;
        }
      }
    }
  },
  create(config, engine) {
    const pixelRatio = window.devicePixelRatio;
    const pass = new SSRPass({
      renderer: config.renderer ? engine.getObjectBySymbol(config.renderer) : engine.webGLRenderer,
      scene: config.scene ? engine.getObjectBySymbol(config.scene) : engine.scene,
      camera: config.camera ? engine.getObjectBySymbol(config.camera) : engine.camera,
      width: config.width ? config.width : engine.dom.offsetWidth * pixelRatio,
      height: config.height ? config.height : engine.dom.offsetHeight * pixelRatio,
      groundReflector: config.ground ? generateGround(config, engine) : void 0,
      selects: config.selects.map((vid) => engine.getObjectBySymbol(vid)),
      bouncing: config.bouncing
    });
    pass.infiniteThick = config.infiniteThick;
    pass.opacity = config.opacity;
    pass.output = config.output;
    pass.maxDistance = config.maxDistance;
    pass.thickness = config.thickness;
    if (pass.groundReflector) {
      const reflector = pass.groundReflector;
      reflector.opacity = pass.opacity;
      reflector.maxDistance = pass.maxDistance;
    }
    return pass;
  },
  dispose(target) {
    disposeGround(target.groundReflector);
    target.groundReflector = null;
    target.dispose();
    defaultGroundGeometry.dispose();
    defaultGroundGeometry = void 0;
  }
});
var UnrealBloomPassProcessor = defineProcessor({
  type: "UnrealBloomPass",
  config: getUnrealBloomPassConfig,
  create(config, engine) {
    const pixelRatio = window.devicePixelRatio;
    const pass = new UnrealBloomPass(
      new Vector2(
        engine.dom ? engine.dom.offsetWidth * pixelRatio : window.innerWidth * pixelRatio,
        engine.dom ? engine.dom.offsetHeight * pixelRatio : window.innerWidth * pixelRatio
      ),
      config.strength,
      config.radius,
      config.threshold
    );
    return pass;
  },
  dispose(pass) {
    pass.dispose();
  }
});
var index = {
  type: "pass",
  compiler: PassCompiler,
  rule: PassRule,
  processors: [
    UnrealBloomPassProcessor,
    SMAAPassProcessor,
    SelectiveBloomPassProcessor,
    SSRPassProcessor,
    FilmPassProcessor,
    LUTPassProcessor
  ]
};
export { PassCompiler, index as default, getFilmPassConfig, getLUTPassConfig, getPassConfig, getSMAAPassConfig, getSSAOPassConfig, getSSRPassConfig, getSelectiveBloomPassConfig, getUnrealBloomPassConfig };
