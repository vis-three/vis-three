(function(s,u){typeof exports=="object"&&typeof module!="undefined"?u(exports,require("@vis-three/core"),require("@vis-three/utils"),require("@vis-three/plugin-selection"),require("@vis-three/plugin-effect-composer"),require("three"),require("three/examples/jsm/postprocessing/Pass"),require("three/examples/jsm/shaders/CopyShader.js")):typeof define=="function"&&define.amd?define(["exports","@vis-three/core","@vis-three/utils","@vis-three/plugin-selection","@vis-three/plugin-effect-composer","three","three/examples/jsm/postprocessing/Pass","three/examples/jsm/shaders/CopyShader.js"],u):(s=typeof globalThis!="undefined"?globalThis:s||self,u((s["vis-three"]=s["vis-three"]||{},s["vis-three"]["strategy-selection-prompt"]={}),s.core,s.utils,s.pluginSelection,s.pluginEffectComposer,s.three,s.Pass,s.CopyShader_js))})(this,function(s,u,d,m,M,r,p,g){"use strict";var C=Object.defineProperty;var w=(s,u,d)=>u in s?C(s,u,{enumerable:!0,configurable:!0,writable:!0,value:d}):s[u]=d;var t=(s,u,d)=>(w(s,typeof u!="symbol"?u+"":u,d),d);const S="@vis-three/strategy-selection-prompt",f=class extends p.Pass{constructor(e,l,i){super();t(this,"renderCamera");t(this,"renderScene",new r.Scene);t(this,"resolution",new r.Vector2(256,256));t(this,"selected",[]);t(this,"visibleEdgeColor",new r.Color(1,1,1));t(this,"hiddenEdgeColor",new r.Color(.1,.04,.02));t(this,"edgeGlow",0);t(this,"usePatternTexture",!1);t(this,"edgeThickness",1);t(this,"edgeStrength",3);t(this,"downSampleRatio",2);t(this,"pulsePeriod",0);t(this,"patternTexture",null);t(this,"msaa",4);t(this,"_oldClearColor",new r.Color);t(this,"oldClearAlpha",1);t(this,"fsQuad",new p.FullScreenQuad(void 0));t(this,"tempPulseColor1",new r.Color);t(this,"tempPulseColor2",new r.Color);t(this,"textureMatrix",new r.Matrix4);t(this,"renderTargetBlurBuffer1");t(this,"renderTargetBlurBuffer2");t(this,"renderTargetMaskBuffer");t(this,"renderTargetDepthBuffer");t(this,"renderTargetMaskDownSampleBuffer");t(this,"renderTargetEdgeBuffer1");t(this,"renderTargetEdgeBuffer2");t(this,"depthMaterial",new r.MeshDepthMaterial({side:r.DoubleSide,depthPacking:r.RGBADepthPacking,blending:r.NoBlending}));t(this,"prepareMaskMaterial",new r.ShaderMaterial({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new r.Vector2(.5,.5)},textureMatrix:{value:null},projectMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
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

      }`,side:r.DoubleSide}));t(this,"edgeDetectionMaterial",new r.ShaderMaterial({uniforms:{maskTexture:{value:null},texSize:{value:new r.Vector2(.5,.5)},visibleEdgeColor:{value:new r.Vector3(1,1,1)},hiddenEdgeColor:{value:new r.Vector3(1,1,1)}},vertexShader:`varying vec2 vUv;

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
      }`}));t(this,"separableBlurMaterial1");t(this,"separableBlurMaterial2");t(this,"overlayMaterial",new r.ShaderMaterial({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

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
      }`,blending:r.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}));t(this,"materialCopy",new r.ShaderMaterial({uniforms:r.UniformsUtils.merge([r.UniformsUtils.clone(g.CopyShader.uniforms),{opacity:{value:1}}]),vertexShader:g.CopyShader.vertexShader,fragmentShader:g.CopyShader.fragmentShader,blending:r.NoBlending,depthTest:!1,depthWrite:!1,transparent:!0}));t(this,"cacheParents",new Map);this.renderScene.autoUpdate=!1,this.renderScene.matrixAutoUpdate=!1,this.resolution.copy(e),this.renderCamera=l,this.selected=i;const a=Math.round(this.resolution.x/this.downSampleRatio),o=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new r.WebGLRenderTarget(this.resolution.x,this.resolution.y,{samples:this.msaa}),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.renderTargetDepthBuffer=new r.WebGLRenderTarget(this.resolution.x,this.resolution.y,{samples:this.msaa}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new r.WebGLRenderTarget(a,o),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new r.WebGLRenderTarget(a,o),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new r.WebGLRenderTarget(Math.round(a/2),Math.round(o/2)),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer1=new r.WebGLRenderTarget(a,o),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new r.WebGLRenderTarget(Math.round(a/2),Math.round(o/2)),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const n=4,v=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(n),this.separableBlurMaterial1.uniforms.texSize.value.set(a,o),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(v),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(a/2),Math.round(o/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=v,this.enabled=!0,this.needsSwap=!1}getSeperableBlurMaterial(e){return new r.ShaderMaterial({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new r.Vector2(.5,.5)},direction:{value:new r.Vector2(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

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
				}`})}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose()}setSize(e,l){this.renderTargetMaskBuffer.setSize(e,l),this.renderTargetDepthBuffer.setSize(e,l);let i=Math.round(e/this.downSampleRatio),a=Math.round(l/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(i,a),this.renderTargetBlurBuffer1.setSize(i,a),this.renderTargetEdgeBuffer1.setSize(i,a),this.separableBlurMaterial1.uniforms.texSize.value.set(i,a),i=Math.round(i/2),a=Math.round(a/2),this.renderTargetBlurBuffer2.setSize(i,a),this.renderTargetEdgeBuffer2.setSize(i,a),this.separableBlurMaterial2.uniforms.texSize.value.set(i,a)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}changeParentOfSelectedObjects(e){const l=this.cacheParents,i=this.renderScene,a=this.selected;for(let o=0;o<a.length;o++){const n=a[o];n.isCSS3DObject||n.isCSS2DObject||(e===!0?(l.set(n,n.parent),i.add(n)):(l.get(n).add(n),l.delete(n)))}}render(e,l,i,a,o){if(this.selected.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const n=e.autoClear;if(e.autoClear=!1,o&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.changeParentOfSelectedObjects(!0),this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.updateTextureMatrix(),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.projectMatrix.value=this.renderCamera.projectionMatrix,this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeParentOfSelectedObjects(!1),this.fsQuad.material=this.materialCopy,this.materialCopy.uniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const v=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(v),this.tempPulseColor2.multiplyScalar(v)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=f.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=f.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=f.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=f.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,o&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(i),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=n}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.materialCopy.uniforms.tDiffuse.value=i.texture,e.setRenderTarget(null),this.fsQuad.render(e))}};let h=f;t(h,"BlurDirectionX",new r.Vector2(1,0)),t(h,"BlurDirectionY",new r.Vector2(0,1));const x=d.transPkgName(S),B=function(T={}){let c,e,l;return{name:x,condition:[m.SELECTION_PLUGIN,M.EFFECT_COMPOSER_PLUGIN],exec(i){l=new h(new r.Vector2(i.dom.offsetWidth,i.dom.offsetHeight),i.camera,[]);for(const a in T)l[a]!==void 0&&(l[a]=T[a]);i.effectComposer.addPass(l),c=a=>{l.renderCamera=a.camera},i.addEventListener(u.ENGINE_EVENT.SETCAMERA,c),e=a=>{l.selected=a.objects},i.addEventListener(m.SELECTED,e)},rollback(i){i.removeEventListener(u.ENGINE_EVENT.SETCAMERA,c),i.removeEventListener(m.SELECTED,e),i.effectComposer.removePass(l)}}};s.SELECTION_PROMPT_STRATEGY=x,s.SelectionPromptStrategy=B,Object.defineProperties(s,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
