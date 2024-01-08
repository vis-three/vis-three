import{t as B,a as c}from"./index.202ebdec.js";import{V as u,S,m as d,v as C,bO as w,an as g,bP as D,a_ as p,s as f,n as x,b9 as b,t as T,k as o}from"./three.237d835c.js";import{a as P,b as M}from"./index.4ec3bfd2.js";import{a as E}from"./index.2e2f06f6.js";import{P as k,F as y,C as m}from"./ShaderPass.02f07bc0.js";var _=Object.defineProperty,O=(e,s,a)=>s in e?_(e,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[s]=a,t=(e,s,a)=>(O(e,typeof s!="symbol"?s+"":s,a),a);const R="@vis-three/strategy-selection-prompt",h=class extends k{constructor(e,s,a){super(),t(this,"renderCamera"),t(this,"renderScene",new S),t(this,"resolution",new u(256,256)),t(this,"selected",[]),t(this,"visibleEdgeColor",new d(1,1,1)),t(this,"hiddenEdgeColor",new d(.1,.04,.02)),t(this,"edgeGlow",0),t(this,"usePatternTexture",!1),t(this,"edgeThickness",1),t(this,"edgeStrength",3),t(this,"downSampleRatio",2),t(this,"pulsePeriod",0),t(this,"patternTexture",null),t(this,"msaa",4),t(this,"_oldClearColor",new d),t(this,"oldClearAlpha",1),t(this,"fsQuad",new y(void 0)),t(this,"tempPulseColor1",new d),t(this,"tempPulseColor2",new d),t(this,"textureMatrix",new C),t(this,"renderTargetBlurBuffer1"),t(this,"renderTargetBlurBuffer2"),t(this,"renderTargetMaskBuffer"),t(this,"renderTargetDepthBuffer"),t(this,"renderTargetMaskDownSampleBuffer"),t(this,"renderTargetEdgeBuffer1"),t(this,"renderTargetEdgeBuffer2"),t(this,"depthMaterial",new w({side:g,depthPacking:D,blending:p})),t(this,"prepareMaskMaterial",new f({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new u(.5,.5)},textureMatrix:{value:null},projectMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
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

      }`,side:g})),t(this,"edgeDetectionMaterial",new f({uniforms:{maskTexture:{value:null},texSize:{value:new u(.5,.5)},visibleEdgeColor:{value:new x(1,1,1)},hiddenEdgeColor:{value:new x(1,1,1)}},vertexShader:`varying vec2 vUv;

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
      }`})),t(this,"separableBlurMaterial1"),t(this,"separableBlurMaterial2"),t(this,"overlayMaterial",new f({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

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
      }`,blending:b,depthTest:!1,depthWrite:!1,transparent:!0})),t(this,"materialCopy",new f({uniforms:T.merge([T.clone(m.uniforms),{opacity:{value:1}}]),vertexShader:m.vertexShader,fragmentShader:m.fragmentShader,blending:p,depthTest:!1,depthWrite:!1,transparent:!0})),t(this,"cacheParents",new Map),this.renderScene.autoUpdate=!1,this.renderScene.matrixAutoUpdate=!1,this.resolution.copy(e),this.renderCamera=s,this.selected=a;const r=Math.round(this.resolution.x/this.downSampleRatio),i=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new o(this.resolution.x,this.resolution.y,{samples:this.msaa}),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.renderTargetDepthBuffer=new o(this.resolution.x,this.resolution.y,{samples:this.msaa}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new o(r,i),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new o(r,i),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new o(Math.round(r/2),Math.round(i/2)),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer1=new o(r,i),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new o(Math.round(r/2),Math.round(i/2)),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const l=4,n=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(l),this.separableBlurMaterial1.uniforms.texSize.value.set(r,i),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(n),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(r/2),Math.round(i/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=n,this.enabled=!0,this.needsSwap=!1}getSeperableBlurMaterial(e){return new f({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new u(.5,.5)},direction:{value:new u(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

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
				}`})}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose()}setSize(e,s){this.renderTargetMaskBuffer.setSize(e,s),this.renderTargetDepthBuffer.setSize(e,s);let a=Math.round(e/this.downSampleRatio),r=Math.round(s/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(a,r),this.renderTargetBlurBuffer1.setSize(a,r),this.renderTargetEdgeBuffer1.setSize(a,r),this.separableBlurMaterial1.uniforms.texSize.value.set(a,r),a=Math.round(a/2),r=Math.round(r/2),this.renderTargetBlurBuffer2.setSize(a,r),this.renderTargetEdgeBuffer2.setSize(a,r),this.separableBlurMaterial2.uniforms.texSize.value.set(a,r)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}changeParentOfSelectedObjects(e){const s=this.cacheParents,a=this.renderScene,r=this.selected;for(let i=0;i<r.length;i++){const l=r[i];l.isCSS3DObject||l.isCSS2DObject||(e===!0?(s.set(l,l.parent),a.add(l)):(s.get(l).add(l),s.delete(l)))}}render(e,s,a,r,i){if(this.selected.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const l=e.autoClear;if(e.autoClear=!1,i&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.changeParentOfSelectedObjects(!0),this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.updateTextureMatrix(),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.projectMatrix.value=this.renderCamera.projectionMatrix,this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeParentOfSelectedObjects(!1),this.fsQuad.material=this.materialCopy,this.materialCopy.uniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const n=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(n),this.tempPulseColor2.multiplyScalar(n)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=h.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=h.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=h.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=h.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,i&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(a),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=l}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.materialCopy.uniforms.tDiffuse.value=a.texture,e.setRenderTarget(null),this.fsQuad.render(e))}};let v=h;t(v,"BlurDirectionX",new u(1,0));t(v,"BlurDirectionY",new u(0,1));const U=B(R),G=function(e={}){let s,a,r;return{name:U,condition:[P,E],exec(i){r=new v(new u(i.dom.offsetWidth,i.dom.offsetHeight),i.camera,[]);for(const l in e)r[l]!==void 0&&(r[l]=e[l]);i.effectComposer.addPass(r),s=l=>{r.renderCamera=l.camera},i.addEventListener(c.SETCAMERA,s),a=l=>{r.selected=l.objects},i.addEventListener(M,a)},rollback(i){i.removeEventListener(c.SETCAMERA,s),i.removeEventListener(M,a),i.effectComposer.removePass(r)}}};export{G as S};
