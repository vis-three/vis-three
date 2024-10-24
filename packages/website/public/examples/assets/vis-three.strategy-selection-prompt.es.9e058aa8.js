import{t as B,b as g}from"./curve.0ba3d968.js";import{S,V as l,l as o,I as C,ca as w,au as c,cb as D,j as p,X as d,w as x,bu as k,m as T,i as n}from"./three.3f33d046.js";import{a as b,b as M}from"./index.ca8957d4.js";import{a as P}from"./index.0317c091.js";import{P as y,F as E,C as f}from"./ShaderPass.025732a5.js";const R="@vis-three/strategy-selection-prompt",v=class h extends y{constructor(e,i,t){super(),this.renderScene=new S,this.resolution=new l(256,256),this.selected=[],this.visibleEdgeColor=new o(1,1,1),this.hiddenEdgeColor=new o(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this.patternTexture=null,this.msaa=4,this._oldClearColor=new o,this.oldClearAlpha=1,this.fsQuad=new E(void 0),this.tempPulseColor1=new o,this.tempPulseColor2=new o,this.textureMatrix=new C,this.depthMaterial=new w({side:c,depthPacking:D,blending:p}),this.prepareMaskMaterial=new d({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new l(.5,.5)},textureMatrix:{value:null},projectMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
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

      }`,side:c}),this.edgeDetectionMaterial=new d({uniforms:{maskTexture:{value:null},texSize:{value:new l(.5,.5)},visibleEdgeColor:{value:new x(1,1,1)},hiddenEdgeColor:{value:new x(1,1,1)}},vertexShader:`varying vec2 vUv;

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
      }`}),this.overlayMaterial=new d({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

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
      }`,blending:k,depthTest:!1,depthWrite:!1,transparent:!0}),this.materialCopy=new d({uniforms:T.merge([T.clone(f.uniforms),{opacity:{value:1}}]),vertexShader:f.vertexShader,fragmentShader:f.fragmentShader,blending:p,depthTest:!1,depthWrite:!1,transparent:!0}),this.cacheParents=new Map,this.renderScene.matrixAutoUpdate=!1,this.resolution.copy(e),this.renderCamera=i,this.selected=t;const r=Math.round(this.resolution.x/this.downSampleRatio),a=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new n(this.resolution.x,this.resolution.y,{samples:this.msaa}),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.renderTargetDepthBuffer=new n(this.resolution.x,this.resolution.y,{samples:this.msaa}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new n(r,a),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new n(r,a),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new n(Math.round(r/2),Math.round(a/2)),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer1=new n(r,a),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new n(Math.round(r/2),Math.round(a/2)),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const s=4,u=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(s),this.separableBlurMaterial1.uniforms.texSize.value.set(r,a),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(u),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(r/2),Math.round(a/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=u,this.enabled=!0,this.needsSwap=!1}getSeperableBlurMaterial(e){return new d({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new l(.5,.5)},direction:{value:new l(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

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
				}`})}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose()}setSize(e,i){this.renderTargetMaskBuffer.setSize(e,i),this.renderTargetDepthBuffer.setSize(e,i);let t=Math.round(e/this.downSampleRatio),r=Math.round(i/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(t,r),this.renderTargetBlurBuffer1.setSize(t,r),this.renderTargetEdgeBuffer1.setSize(t,r),this.separableBlurMaterial1.uniforms.texSize.value.set(t,r),t=Math.round(t/2),r=Math.round(r/2),this.renderTargetBlurBuffer2.setSize(t,r),this.renderTargetEdgeBuffer2.setSize(t,r),this.separableBlurMaterial2.uniforms.texSize.value.set(t,r)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}changeParentOfSelectedObjects(e){const i=this.cacheParents,t=this.renderScene,r=this.selected;for(let a=0;a<r.length;a++){const s=r[a];s.isCSS3DObject||s.isCSS2DObject||(e===!0?(i.set(s,s.parent),t.add(s)):(i.get(s).add(s),i.delete(s)))}}render(e,i,t,r,a){if(this.selected.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;if(e.autoClear=!1,a&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.changeParentOfSelectedObjects(!0),this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.updateTextureMatrix(),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.projectMatrix.value=this.renderCamera.projectionMatrix,this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeParentOfSelectedObjects(!1),this.fsQuad.material=this.materialCopy,this.materialCopy.uniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const u=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(u),this.tempPulseColor2.multiplyScalar(u)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=h.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=h.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=h.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=h.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,a&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(t),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.materialCopy.uniforms.tDiffuse.value=t.texture,e.setRenderTarget(null),this.fsQuad.render(e))}};v.BlurDirectionX=new l(1,0),v.BlurDirectionY=new l(0,1);let O=v;const U=B(R),Q=function(m={}){let e,i,t;return{name:U,condition:[b,P],exec(r){t=new O(new l(r.dom.offsetWidth,r.dom.offsetHeight),r.camera,[]);for(const a in m)t[a]!==void 0&&(t[a]=m[a]);r.effectComposer.addPass(t),e=a=>{t.renderCamera=a.camera},r.addEventListener(g.SETCAMERA,e),i=a=>{t.selected=a.objects},r.addEventListener(M,i)},rollback(r){r.removeEventListener(g.SETCAMERA,e),r.removeEventListener(M,i),r.effectComposer.removePass(t)}}};export{Q as G};
