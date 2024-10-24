import{t as R,b as n}from"./curve.0ba3d968.js";import{V as c,i as E,H as m,j as S,k as M,l as T,m as P,n as v,o as A,p as w,q as N,r as b,s as x,t as L,u as F,v as I,R as O}from"./three.3f33d046.js";import{P as f,S as G,C as B,F as k}from"./ShaderPass.025732a5.js";import{a as p}from"./index.c0df7946.js";class g extends f{constructor(e,s){super(),this.scene=e,this.camera=s,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,s,a){const i=e.getContext(),t=e.state;t.buffers.color.setMask(!1),t.buffers.depth.setMask(!1),t.buffers.color.setLocked(!0),t.buffers.depth.setLocked(!0);let r,l;this.inverse?(r=0,l=1):(r=1,l=0),t.buffers.stencil.setTest(!0),t.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),t.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),t.buffers.stencil.setClear(l),t.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),t.buffers.color.setLocked(!1),t.buffers.depth.setLocked(!1),t.buffers.color.setMask(!0),t.buffers.depth.setMask(!0),t.buffers.stencil.setLocked(!1),t.buffers.stencil.setFunc(i.EQUAL,1,4294967295),t.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),t.buffers.stencil.setLocked(!0)}}class D extends f{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class _{constructor(e,s){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),s===void 0){const a=e.getSize(new c);this._width=a.width,this._height=a.height,s=new E(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:m}),s.texture.name="EffectComposer.rt1"}else this._width=s.width,this._height=s.height;this.renderTarget1=s,this.renderTarget2=s.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new G(B),this.copyPass.material.blending=S,this.clock=new M}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,s){this.passes.splice(s,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const s=this.passes.indexOf(e);s!==-1&&this.passes.splice(s,1)}isLastEnabledPass(e){for(let s=e+1;s<this.passes.length;s++)if(this.passes[s].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const s=this.renderer.getRenderTarget();let a=!1;for(let i=0,t=this.passes.length;i<t;i++){const r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),r.needsSwap){if(a){const l=this.renderer.getContext(),o=this.renderer.state.buffers.stencil;o.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),o.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}g!==void 0&&(r instanceof g?a=!0:r instanceof D&&(a=!1))}}this.renderer.setRenderTarget(s)}reset(e){if(e===void 0){const s=this.renderer.getSize(new c);this._pixelRatio=this.renderer.getPixelRatio(),this._width=s.width,this._height=s.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,s){this._width=e,this._height=s;const a=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(a,i),this.renderTarget2.setSize(a,i);for(let t=0;t<this.passes.length;t++)this.passes[t].setSize(a,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class z extends f{constructor(e,s,a=null,i=null,t=null){super(),this.scene=e,this.camera=s,this.overrideMaterial=a,this.clearColor=i,this.clearAlpha=t,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new T}render(e,s,a){const i=e.autoClear;e.autoClear=!1;let t,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(t=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(t),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=i}}const U="@vis-three/plugin-effect-composer",y={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Q extends f{constructor(){super();const e=y;this.uniforms=P.clone(e.uniforms),this.material=new v({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new k(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,s,a){this.uniforms.tDiffuse.value=a.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},A.getTransfer(this._outputColorSpace)===w&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===N?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===b?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===x?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===L?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===F?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===I&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const C=R(U),j=function(h={}){let e,s,a,i;return{name:C,deps:p,install(t){let r;if(h.MSAA){const o=t.webGLRenderer,u=o.getPixelRatio(),d=o.getDrawingBufferSize(new c);r=new _(o,new E(d.width*u,d.height*u,{format:h.format||O,samples:h.samples||4,type:m}))}else r=new _(t.webGLRenderer);t.effectComposer=r;const l=new z(t.scene,t.camera);r.addPass(l),r.addPass(new Q),e=o=>{l.camera=o.camera},t.addEventListener(n.SETCAMERA,e),a=o=>{l.scene=o.scene},t.addEventListener(n.SETSCENE,a),s=o=>{r.setSize(o.width,o.height)},t.addEventListener(n.SETSIZE,s),console.warn(`${C}: hope install close behind the ${p}, because ${p}\`s renderFun can be dispose. if you not do this, render are prone to bugs`),t.popLatestEvent(n.RENDER),i=()=>{r.render()},t.addEventListener(n.RENDER,i)},dispose(t){t.removeEventListener(n.SETCAMERA,e),t.removeEventListener(n.SETSCENE,a),t.removeEventListener(n.SETSIZE,s),t.removeEventListener(n.RENDER,i),delete t.effectComposer}}};export{j as E,C as a};
