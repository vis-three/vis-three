import{O as n,M as o,J as u,K as i,X as a,m as l}from"./three.3f33d046.js";const v={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class m{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const f=new n(-1,1,1,-1,0,1);class h extends u{constructor(){super(),this.setAttribute("position",new i([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new i([0,2,0,0,2,0],2))}}const c=new h;class d{constructor(e){this._mesh=new o(c,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,f)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class S extends m{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof a?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=l.clone(e.uniforms),this.material=new a({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new d(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}export{v as C,d as F,m as P,S};
