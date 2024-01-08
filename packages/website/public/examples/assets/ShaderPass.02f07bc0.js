import{O as n,i as u,j as r,M as l,s as a,t as f}from"./three.237d835c.js";const v={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class m{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}}const h=new n(-1,1,1,-1,0,1),s=new u;s.setAttribute("position",new r([-1,3,0,-1,-1,0,3,-1,0],3));s.setAttribute("uv",new r([0,2,0,0,2,0],2));class c{constructor(e){this._mesh=new l(s,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,h)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class p extends m{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof a?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=f.clone(e.uniforms),this.material=new a({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new c(this.material)}render(e,t,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}}export{v as C,c as F,m as P,p as S};
