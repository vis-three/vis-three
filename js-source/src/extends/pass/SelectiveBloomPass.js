import { AdditiveBlending, Color, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, ShaderMaterial, Sprite, SpriteMaterial, UniformsUtils, Vector2, Vector3, WebGLRenderTarget, } from "three";
import { FullScreenQuad, Pass } from "three/examples/jsm/postprocessing/Pass";
import { LuminosityHighPassShader } from "three/examples/jsm/shaders/LuminosityHighPassShader";
export class SelectiveBloomPass extends Pass {
    static BlurDirectionX = new Vector2(1.0, 0.0);
    static BlurDirectionY = new Vector2(0.0, 1.0);
    resolution;
    strength;
    radius;
    threshold;
    selectedObjects = [];
    renderScene;
    renderCamera;
    clearColor = new Color(0, 0, 0);
    renderTargetsHorizontal = [];
    renderTargetsVertical = [];
    nMips = 5;
    selectRenderTarget;
    renderTargetBright;
    highPassUniforms;
    materialHighPassFilter;
    separableBlurMaterials = [];
    compositeMaterial;
    bloomTintColors;
    mixMaterial;
    enabled = true;
    needsSwap = false;
    _oldClearColor = new Color();
    oldClearAlpha = 1;
    basic = new MeshBasicMaterial();
    fsQuad = new FullScreenQuad();
    materialCache = new Map();
    sceneBackgroundCache = null;
    overrideBackground = new Color("black");
    overrideMeshMaterial = new MeshBasicMaterial({
        color: "black",
    });
    overrideLineMaterial = new LineBasicMaterial({ color: "black" });
    overridePointsMaterial = new PointsMaterial({ color: "black" });
    overrideSpriteMaterial = new SpriteMaterial({ color: "black" });
    constructor(resolution = new Vector2(256, 256), strength = 1, radius = 0, threshold = 0, renderScene = new Scene(), renderCamera = new PerspectiveCamera(), selectedObjects) {
        super();
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
        if (LuminosityHighPassShader === undefined)
            console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");
        const highPassShader = LuminosityHighPassShader;
        this.highPassUniforms = UniformsUtils.clone(highPassShader.uniforms);
        this.highPassUniforms["luminosityThreshold"].value = threshold;
        this.highPassUniforms["smoothWidth"].value = 0.01;
        this.materialHighPassFilter = new ShaderMaterial({
            uniforms: this.highPassUniforms,
            vertexShader: highPassShader.vertexShader,
            fragmentShader: highPassShader.fragmentShader,
            defines: {},
        });
        const kernelSizeArray = [3, 5, 7, 9, 11];
        resx = Math.round(this.resolution.x / 2);
        resy = Math.round(this.resolution.y / 2);
        for (let i = 0; i < this.nMips; i++) {
            this.separableBlurMaterials.push(this.getSeperableBlurMaterial(kernelSizeArray[i]));
            this.separableBlurMaterials[i].uniforms["texSize"].value = new Vector2(resx, resy);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }
        // Composite material
        this.compositeMaterial = this.getCompositeMaterial(this.nMips);
        this.compositeMaterial.uniforms["blurTexture1"].value =
            this.renderTargetsVertical[0].texture;
        this.compositeMaterial.uniforms["blurTexture2"].value =
            this.renderTargetsVertical[1].texture;
        this.compositeMaterial.uniforms["blurTexture3"].value =
            this.renderTargetsVertical[2].texture;
        this.compositeMaterial.uniforms["blurTexture4"].value =
            this.renderTargetsVertical[3].texture;
        this.compositeMaterial.uniforms["blurTexture5"].value =
            this.renderTargetsVertical[4].texture;
        this.compositeMaterial.uniforms["bloomStrength"].value = strength;
        this.compositeMaterial.uniforms["bloomRadius"].value = 0.1;
        this.compositeMaterial.needsUpdate = true;
        const bloomFactors = [1.0, 0.8, 0.6, 0.4, 0.2];
        this.compositeMaterial.uniforms["bloomFactors"].value = bloomFactors;
        this.bloomTintColors = [
            new Vector3(1, 1, 1),
            new Vector3(1, 1, 1),
            new Vector3(1, 1, 1),
            new Vector3(1, 1, 1),
            new Vector3(1, 1, 1),
        ];
        this.compositeMaterial.uniforms["bloomTintColors"].value =
            this.bloomTintColors;
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
            this.separableBlurMaterials[i].uniforms["texSize"].value = new Vector2(resx, resy);
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
        // visiable
        const selectedObjectsMap = new Map();
        for (const object of this.selectedObjects) {
            selectedObjectsMap.set(object, true);
        }
        const materialCache = this.materialCache;
        if (this.renderScene.background) {
            this.sceneBackgroundCache = this.renderScene.background;
            this.renderScene.background = this.overrideBackground;
        }
        this.renderScene.traverse((object) => {
            if (!selectedObjectsMap.has(object) &&
                !object.isLight &&
                object.visible) {
                materialCache.set(object, object.material);
                if (object instanceof Mesh) {
                    object.material = this.overrideMeshMaterial;
                }
                else if (object instanceof Line) {
                    object.material = this.overrideLineMaterial;
                }
                else if (object instanceof Points) {
                    object.material = this.overridePointsMaterial;
                }
                else if (object instanceof Sprite) {
                    object.material = this.overrideSpriteMaterial;
                }
            }
        });
        renderer.setRenderTarget(this.selectRenderTarget);
        renderer.clear();
        renderer.render(this.renderScene, this.renderCamera);
        // Render input to screen
        if (this.renderToScreen) {
            this.fsQuad.material = this.basic;
            this.basic.map = this.selectRenderTarget.texture;
            renderer.setRenderTarget(null);
            renderer.clear();
            this.fsQuad.render(renderer);
        }
        // // 1. Extract Bright Areas
        this.highPassUniforms["tDiffuse"].value = this.selectRenderTarget.texture;
        this.highPassUniforms["luminosityThreshold"].value = this.threshold;
        this.fsQuad.material = this.materialHighPassFilter;
        renderer.setRenderTarget(this.renderTargetBright);
        renderer.clear();
        this.fsQuad.render(renderer);
        // 2. Blur All the mips progressively
        let inputRenderTarget = this.renderTargetBright;
        for (let i = 0; i < this.nMips; i++) {
            this.fsQuad.material = this.separableBlurMaterials[i];
            this.separableBlurMaterials[i].uniforms["colorTexture"].value =
                inputRenderTarget.texture;
            this.separableBlurMaterials[i].uniforms["direction"].value =
                SelectiveBloomPass.BlurDirectionX;
            renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
            renderer.clear();
            this.fsQuad.render(renderer);
            this.separableBlurMaterials[i].uniforms["colorTexture"].value =
                this.renderTargetsHorizontal[i].texture;
            this.separableBlurMaterials[i].uniforms["direction"].value =
                SelectiveBloomPass.BlurDirectionY;
            renderer.setRenderTarget(this.renderTargetsVertical[i]);
            renderer.clear();
            this.fsQuad.render(renderer);
            inputRenderTarget = this.renderTargetsVertical[i];
        }
        // Composite All the mips
        this.fsQuad.material = this.compositeMaterial;
        this.compositeMaterial.uniforms["bloomStrength"].value = this.strength;
        this.compositeMaterial.uniforms["bloomRadius"].value = this.radius;
        this.compositeMaterial.uniforms["bloomTintColors"].value =
            this.bloomTintColors;
        renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
        renderer.clear();
        this.fsQuad.render(renderer);
        // 发光部分完成
        // 搞一个原图像然后做结合
        // Blend it additively over the input texture
        this.fsQuad.material = this.mixMaterial;
        this.mixMaterial.uniforms["bloom"].value =
            this.renderTargetsHorizontal[0].texture;
        this.mixMaterial.uniforms["origin"].value = readBuffer.texture;
        if (maskActive)
            renderer.state.buffers.stencil.setTest(true);
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        }
        else {
            renderer.setRenderTarget(readBuffer);
            this.fsQuad.render(renderer);
        }
        // Restore renderer settings
        renderer.setClearColor(this._oldClearColor, this.oldClearAlpha);
        renderer.autoClear = oldAutoClear;
        // back visible
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
                origin: { value: null },
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
        }`,
        });
    }
    getSeperableBlurMaterial(kernelRadius) {
        return new ShaderMaterial({
            defines: {
                KERNEL_RADIUS: kernelRadius,
                SIGMA: kernelRadius,
            },
            uniforms: {
                colorTexture: { value: null },
                texSize: { value: new Vector2(0.5, 0.5) },
                direction: { value: new Vector2(0.5, 0.5) },
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
				}`,
        });
    }
    getCompositeMaterial(nMips) {
        return new ShaderMaterial({
            defines: {
                NUM_MIPS: nMips,
            },
            uniforms: {
                blurTexture1: { value: null },
                blurTexture2: { value: null },
                blurTexture3: { value: null },
                blurTexture4: { value: null },
                blurTexture5: { value: null },
                bloomStrength: { value: 1.0 },
                bloomFactors: { value: null },
                bloomTintColors: { value: null },
                bloomRadius: { value: 0.0 },
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
				}`,
        });
    }
}
//# sourceMappingURL=SelectiveBloomPass.js.map