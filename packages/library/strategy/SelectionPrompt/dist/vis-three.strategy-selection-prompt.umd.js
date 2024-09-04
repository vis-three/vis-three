(function(s,n){typeof exports=="object"&&typeof module<"u"?n(exports,require("@vis-three/core"),require("@vis-three/utils"),require("@vis-three/plugin-selection"),require("@vis-three/plugin-effect-composer"),require("three"),require("three/examples/jsm/postprocessing/Pass.js"),require("three/examples/jsm/shaders/CopyShader.js")):typeof define=="function"&&define.amd?define(["exports","@vis-three/core","@vis-three/utils","@vis-three/plugin-selection","@vis-three/plugin-effect-composer","three","three/examples/jsm/postprocessing/Pass.js","three/examples/jsm/shaders/CopyShader.js"],n):(s=typeof globalThis<"u"?globalThis:s||self,n((s["vis-three"]=s["vis-three"]||{},s["vis-three"]["strategy-selection-prompt"]={}),s.core,s.utils,s.pluginSelection,s.pluginEffectComposer,s.three,s.Pass_js,s.CopyShader_js))})(this,function(s,n,g,f,x,t,c,h){"use strict";const T="@vis-three/strategy-selection-prompt",u=class u extends c.Pass{constructor(e,l,a){super(),this.renderScene=new t.Scene,this.resolution=new t.Vector2(256,256),this.selected=[],this.visibleEdgeColor=new t.Color(1,1,1),this.hiddenEdgeColor=new t.Color(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this.patternTexture=null,this.msaa=4,this._oldClearColor=new t.Color,this.oldClearAlpha=1,this.fsQuad=new c.FullScreenQuad(void 0),this.tempPulseColor1=new t.Color,this.tempPulseColor2=new t.Color,this.textureMatrix=new t.Matrix4,this.depthMaterial=new t.MeshDepthMaterial({side:t.DoubleSide,depthPacking:t.RGBADepthPacking,blending:t.NoBlending}),this.prepareMaskMaterial=new t.ShaderMaterial({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new t.Vector2(.5,.5)},textureMatrix:{value:null},projectMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
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

      }`,fragmentShader:`#include <packing>
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

      }`,side:t.DoubleSide}),this.edgeDetectionMaterial=new t.ShaderMaterial({uniforms:{maskTexture:{value:null},texSize:{value:new t.Vector2(.5,.5)},visibleEdgeColor:{value:new t.Vector3(1,1,1)},hiddenEdgeColor:{value:new t.Vector3(1,1,1)}},vertexShader:`varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,fragmentShader:`varying vec2 vUv;

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
      }`}),this.overlayMaterial=new t.ShaderMaterial({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,fragmentShader:`varying vec2 vUv;

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
      }`,blending:t.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.materialCopy=new t.ShaderMaterial({uniforms:t.UniformsUtils.merge([t.UniformsUtils.clone(h.CopyShader.uniforms),{opacity:{value:1}}]),vertexShader:h.CopyShader.vertexShader,fragmentShader:h.CopyShader.fragmentShader,blending:t.NoBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.cacheParents=new Map,this.renderScene.matrixAutoUpdate=!1,this.resolution.copy(e),this.renderCamera=l,this.selected=a;const r=Math.round(this.resolution.x/this.downSampleRatio),i=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new t.WebGLRenderTarget(this.resolution.x,this.resolution.y,{samples:this.msaa}),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.renderTargetDepthBuffer=new t.WebGLRenderTarget(this.resolution.x,this.resolution.y,{samples:this.msaa}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new t.WebGLRenderTarget(r,i),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new t.WebGLRenderTarget(r,i),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new t.WebGLRenderTarget(Math.round(r/2),Math.round(i/2)),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer1=new t.WebGLRenderTarget(r,i),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new t.WebGLRenderTarget(Math.round(r/2),Math.round(i/2)),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const o=4,d=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(o),this.separableBlurMaterial1.uniforms.texSize.value.set(r,i),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(d),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(r/2),Math.round(i/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=d,this.enabled=!0,this.needsSwap=!1}getSeperableBlurMaterial(e){return new t.ShaderMaterial({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new t.Vector2(.5,.5)},direction:{value:new t.Vector2(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
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
				}`})}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose()}setSize(e,l){this.renderTargetMaskBuffer.setSize(e,l),this.renderTargetDepthBuffer.setSize(e,l);let a=Math.round(e/this.downSampleRatio),r=Math.round(l/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(a,r),this.renderTargetBlurBuffer1.setSize(a,r),this.renderTargetEdgeBuffer1.setSize(a,r),this.separableBlurMaterial1.uniforms.texSize.value.set(a,r),a=Math.round(a/2),r=Math.round(r/2),this.renderTargetBlurBuffer2.setSize(a,r),this.renderTargetEdgeBuffer2.setSize(a,r),this.separableBlurMaterial2.uniforms.texSize.value.set(a,r)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}changeParentOfSelectedObjects(e){const l=this.cacheParents,a=this.renderScene,r=this.selected;for(let i=0;i<r.length;i++){const o=r[i];o.isCSS3DObject||o.isCSS2DObject||(e===!0?(l.set(o,o.parent),a.add(o)):(l.get(o).add(o),l.delete(o)))}}render(e,l,a,r,i){if(this.selected.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;if(e.autoClear=!1,i&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.changeParentOfSelectedObjects(!0),this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.updateTextureMatrix(),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.projectMatrix.value=this.renderCamera.projectionMatrix,this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeParentOfSelectedObjects(!1),this.fsQuad.material=this.materialCopy,this.materialCopy.uniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const d=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(d),this.tempPulseColor2.multiplyScalar(d)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=u.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=u.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=u.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=u.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,i&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(a),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.materialCopy.uniforms.tDiffuse.value=a.texture,e.setRenderTarget(null),this.fsQuad.render(e))}};u.BlurDirectionX=new t.Vector2(1,0),u.BlurDirectionY=new t.Vector2(0,1);let v=u;const m=g.transPkgName(T),M=function(p={}){let e,l,a;return{name:m,condition:[f.SELECTION_PLUGIN,x.EFFECT_COMPOSER_PLUGIN],exec(r){a=new v(new t.Vector2(r.dom.offsetWidth,r.dom.offsetHeight),r.camera,[]);for(const i in p)a[i]!==void 0&&(a[i]=p[i]);r.effectComposer.addPass(a),e=i=>{a.renderCamera=i.camera},r.addEventListener(n.ENGINE_EVENT.SETCAMERA,e),l=i=>{a.selected=i.objects},r.addEventListener(f.SELECTED,l)},rollback(r){r.removeEventListener(n.ENGINE_EVENT.SETCAMERA,e),r.removeEventListener(f.SELECTED,l),r.effectComposer.removePass(a)}}};s.SELECTION_PROMPT_STRATEGY=m,s.SelectionPromptStrategy=M,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
