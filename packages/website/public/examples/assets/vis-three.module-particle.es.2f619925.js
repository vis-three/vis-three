import{b as P,S as D,c as Fe,e as Qe,f as V,h as yt,u as bt,i as X,d as z,M as C,m as Ye,O as wt,n as w,g as Cr,a as Pr,J as Or}from"./vis-three.tdcm.es.ba892fff.js";import{m as J,X as I,V as f,i as $,H as Te,a0 as le,c as ze,N as q,I as W,l as B,bk as Zt,bl as Kt,j as oe,bm as Dr,am as Be,bn as dt,bo as gt,bp as mt,bq as qe,M as Pe,w as m,f as Ue,br as Mt,a4 as Qt,a6 as Jt,bs as je,S as St,L as $t,b as Tt,bt as _t,bu as er,bv as ne,bw as Rr,bx as Lr,G as Et,by as jr,O as zr,aK as $e,Q as At,J as Me,K as be,B as _e,bz as Br,bA as Nr,bB as Fr,bC as Ct,bD as et,bE as tr,bF as rr,bG as Pt,bH as Nt,bI as Ur,bJ as Wr,bK as Ir,bL as Hr,bM as kr,aU as ht,bN as Gr,bO as Vr,bP as nr,bQ as or,a3 as Xr,A as Yr,al as qr,h as Zr,P as Kr,g as Qr,ak as Jr,bR as Ne,a8 as $r,bS as _r,a7 as en,an as tn,a as rn,bT as ar,bU as Ot,aa as ir,bV as at,bW as it,bX as nn,bY as on,bZ as an,b_ as sn,U as ln,C as Ft,at as cn,R as un,bc as dn,b$ as sr,ay as gn,c0 as lr,c1 as Ut,c2 as mn,$ as cr,az as Ze,aw as hn,aA as Wt,c3 as fn,aN as Je,e as It,ag as Ht}from"./three.3f33d046.js";import{P as tt,F as rt,S as pn,C as st}from"./ShaderPass.025732a5.js";import{L as kt,U as vn}from"./UnrealBloomPass.a03f7d16.js";import{b as Z,s as ce,g as ft,m as xn}from"./curve.0ba3d968.js";import{a as yn,c as bn,d as wn}from"./CSS3DRenderer.56d2804d.js";import{u as Mn}from"./vis-three.library-modifier.es.9bf56217.js";import{H as Sn}from"./vis-three.convenient.es.3345d486.js";import{a as Tn}from"./index.b5597af3.js";const En={"+":(r,e)=>r+e,"-":(r,e)=>r-e,"*":(r,e)=>r*e,"/":(r,e)=>r/e},ur=function(r,e,t){return En[r](e,t)},dr=[],An=Fe([function(r){return Qe.symbol.validator(r.symbol)||dr.includes(r.symbol)},V.OPERATE_ADD,V.OPERATE_DELETE,V.OPERATE_COVER,V.OPERATE_COMPILE]);class Cn extends yt{constructor(e){super(e)}useModel(e,t){return dr.push(bt(e.type)),super.useModel(e,t)}reigstProcessor(e,t){return this.useModel(e,t)}}const js=function(){return Object.assign(X(),{})},zs=P({type:"controls",compiler:Cn,rule:An,models:[],lifeOrder:D.NINE}),Pn={name:"FilmShader",uniforms:{tDiffuse:{value:null},time:{value:0},intensity:{value:.5},grayscale:{value:!1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		uniform float intensity;
		uniform bool grayscale;
		uniform float time;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 base = texture2D( tDiffuse, vUv );

			float noise = rand( fract( vUv + time ) );

			vec3 color = base.rgb + base.rgb * clamp( 0.1 + noise, 0.0, 1.0 );

			color = mix( base.rgb, color, intensity );

			if ( grayscale ) {

				color = vec3( luminance( color ) ); // assuming linear-srgb

			}

			gl_FragColor = vec4( color, base.a );

		}`};class On extends tt{constructor(e=.5,t=!1){super();const n=Pn;this.uniforms=J.clone(n.uniforms),this.material=new I({name:n.name,uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.uniforms.intensity.value=e,this.uniforms.grayscale.value=t,this.fsQuad=new rt(this.material)}render(e,t,n,o){this.uniforms.tDiffuse.value=n.texture,this.uniforms.time.value+=o,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Dn={name:"LUTShader",uniforms:{lut:{value:null},lutSize:{value:0},tDiffuse:{value:null},intensity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform float lutSize;
		uniform sampler3D lut;

		varying vec2 vUv;
		uniform float intensity;
		uniform sampler2D tDiffuse;
		void main() {

			vec4 val = texture2D( tDiffuse, vUv );
			vec4 lutVal;

			// pull the sample in by half a pixel so the sample begins
			// at the center of the edge pixels.
			float pixelWidth = 1.0 / lutSize;
			float halfPixelWidth = 0.5 / lutSize;
			vec3 uvw = vec3( halfPixelWidth ) + val.rgb * ( 1.0 - pixelWidth );


			lutVal = vec4( texture( lut, uvw ).rgb, val.a );

			gl_FragColor = vec4( mix( val, lutVal, intensity ) );

		}

	`};class Rn extends pn{set lut(e){const t=this.material;e!==this.lut&&(t.uniforms.lut.value=null,e&&(t.uniforms.lutSize.value=e.image.width,t.uniforms.lut.value=e))}get lut(){return this.material.uniforms.lut.value}set intensity(e){this.material.uniforms.intensity.value=e}get intensity(){return this.material.uniforms.intensity.value}constructor(e={}){super(Dn),this.lut=e.lut||null,this.intensity="intensity"in e?e.intensity:1}}const ke={name:"SMAAEdgesShader",defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new f(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},Ge={name:"SMAAWeightsShader",defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new f(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},lt={name:"SMAABlendShader",uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new f(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class Ln extends tt{constructor(e,t){super(),this.edgesRT=new $(e,t,{depthBuffer:!1,type:Te}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new $(e,t,{depthBuffer:!1,type:Te}),this.weightsRT.texture.name="SMAAPass.weights";const n=this,o=new Image;o.src=this.getAreaTexture(),o.onload=function(){n.areaTexture.needsUpdate=!0},this.areaTexture=new le,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=o,this.areaTexture.minFilter=ze,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const a=new Image;a.src=this.getSearchTexture(),a.onload=function(){n.searchTexture.needsUpdate=!0},this.searchTexture=new le,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=a,this.searchTexture.magFilter=q,this.searchTexture.minFilter=q,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=J.clone(ke.uniforms),this.uniformsEdges.resolution.value.set(1/e,1/t),this.materialEdges=new I({defines:Object.assign({},ke.defines),uniforms:this.uniformsEdges,vertexShader:ke.vertexShader,fragmentShader:ke.fragmentShader}),this.uniformsWeights=J.clone(Ge.uniforms),this.uniformsWeights.resolution.value.set(1/e,1/t),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new I({defines:Object.assign({},Ge.defines),uniforms:this.uniformsWeights,vertexShader:Ge.vertexShader,fragmentShader:Ge.fragmentShader}),this.uniformsBlend=J.clone(lt.uniforms),this.uniformsBlend.resolution.value.set(1/e,1/t),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new I({uniforms:this.uniformsBlend,vertexShader:lt.vertexShader,fragmentShader:lt.fragmentShader}),this.fsQuad=new rt(null)}render(e,t,n){this.uniformsEdges.tDiffuse.value=n.texture,this.fsQuad.material=this.materialEdges,e.setRenderTarget(this.edgesRT),this.clear&&e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialWeights,e.setRenderTarget(this.weightsRT),this.clear&&e.clear(),this.fsQuad.render(e),this.uniformsBlend.tColor.value=n.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.edgesRT.setSize(e,t),this.weightsRT.setSize(e,t),this.materialEdges.uniforms.resolution.value.set(1/e,1/t),this.materialWeights.uniforms.resolution.value.set(1/e,1/t),this.materialBlend.uniforms.resolution.value.set(1/e,1/t)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const se={name:"SSRShader",defines:{MAX_STEP:0,PERSPECTIVE_CAMERA:!0,DISTANCE_ATTENUATION:!0,FRESNEL:!0,INFINITE_THICK:!1,SELECTIVE:!1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tMetalness:{value:null},tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new f},cameraProjectionMatrix:{value:new W},cameraInverseProjectionMatrix:{value:new W},opacity:{value:.5},maxDistance:{value:180},cameraRange:{value:0},thickness:{value:.018}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`
		// precision highp float;
		precision highp sampler2D;
		varying vec2 vUv;
		uniform sampler2D tDepth;
		uniform sampler2D tNormal;
		uniform sampler2D tMetalness;
		uniform sampler2D tDiffuse;
		uniform float cameraRange;
		uniform vec2 resolution;
		uniform float opacity;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform float maxDistance;
		uniform float thickness;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;
		#include <packing>
		float pointToLineDistance(vec3 x0, vec3 x1, vec3 x2) {
			//x0: point, x1: linePointA, x2: linePointB
			//https://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
			return length(cross(x0-x1,x0-x2))/length(x2-x1);
		}
		float pointPlaneDistance(vec3 point,vec3 planePoint,vec3 planeNormal){
			// https://mathworld.wolfram.com/Point-PlaneDistance.html
			//// https://en.wikipedia.org/wiki/Plane_(geometry)
			//// http://paulbourke.net/geometry/pointlineplane/
			float a=planeNormal.x,b=planeNormal.y,c=planeNormal.z;
			float x0=point.x,y0=point.y,z0=point.z;
			float x=planePoint.x,y=planePoint.y,z=planePoint.z;
			float d=-(a*x+b*y+c*z);
			float distance=(a*x0+b*y0+c*z0+d)/sqrt(a*a+b*b+c*c);
			return distance;
		}
		float getDepth( const in vec2 uv ) {
			return texture2D( tDepth, uv ).x;
		}
		float getViewZ( const in float depth ) {
			#ifdef PERSPECTIVE_CAMERA
				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
			#else
				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
			#endif
		}
		vec3 getViewPosition( const in vec2 uv, const in float depth/*clip space*/, const in float clipW ) {
			vec4 clipPosition = vec4( ( vec3( uv, depth ) - 0.5 ) * 2.0, 1.0 );//ndc
			clipPosition *= clipW; //clip
			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;//view
		}
		vec3 getViewNormal( const in vec2 uv ) {
			return unpackRGBToNormal( texture2D( tNormal, uv ).xyz );
		}
		vec2 viewPositionToXY(vec3 viewPosition){
			vec2 xy;
			vec4 clip=cameraProjectionMatrix*vec4(viewPosition,1);
			xy=clip.xy;//clip
			float clipW=clip.w;
			xy/=clipW;//NDC
			xy=(xy+1.)/2.;//uv
			xy*=resolution;//screen
			return xy;
		}
		void main(){
			#ifdef SELECTIVE
				float metalness=texture2D(tMetalness,vUv).r;
				if(metalness==0.) return;
			#endif

			float depth = getDepth( vUv );
			float viewZ = getViewZ( depth );
			if(-viewZ>=cameraFar) return;

			float clipW = cameraProjectionMatrix[2][3] * viewZ+cameraProjectionMatrix[3][3];
			vec3 viewPosition=getViewPosition( vUv, depth, clipW );

			vec2 d0=gl_FragCoord.xy;
			vec2 d1;

			vec3 viewNormal=getViewNormal( vUv );

			#ifdef PERSPECTIVE_CAMERA
				vec3 viewIncidentDir=normalize(viewPosition);
				vec3 viewReflectDir=reflect(viewIncidentDir,viewNormal);
			#else
				vec3 viewIncidentDir=vec3(0,0,-1);
				vec3 viewReflectDir=reflect(viewIncidentDir,viewNormal);
			#endif

			float maxReflectRayLen=maxDistance/dot(-viewIncidentDir,viewNormal);
			// dot(a,b)==length(a)*length(b)*cos(theta) // https://www.mathsisfun.com/algebra/vectors-dot-product.html
			// if(a.isNormalized&&b.isNormalized) dot(a,b)==cos(theta)
			// maxDistance/maxReflectRayLen=cos(theta)
			// maxDistance/maxReflectRayLen==dot(a,b)
			// maxReflectRayLen==maxDistance/dot(a,b)

			vec3 d1viewPosition=viewPosition+viewReflectDir*maxReflectRayLen;
			#ifdef PERSPECTIVE_CAMERA
				if(d1viewPosition.z>-cameraNear){
					//https://tutorial.math.lamar.edu/Classes/CalcIII/EqnsOfLines.aspx
					float t=(-cameraNear-viewPosition.z)/viewReflectDir.z;
					d1viewPosition=viewPosition+viewReflectDir*t;
				}
			#endif
			d1=viewPositionToXY(d1viewPosition);

			float totalLen=length(d1-d0);
			float xLen=d1.x-d0.x;
			float yLen=d1.y-d0.y;
			float totalStep=max(abs(xLen),abs(yLen));
			float xSpan=xLen/totalStep;
			float ySpan=yLen/totalStep;
			for(float i=0.;i<float(MAX_STEP);i++){
				if(i>=totalStep) break;
				vec2 xy=vec2(d0.x+i*xSpan,d0.y+i*ySpan);
				if(xy.x<0.||xy.x>resolution.x||xy.y<0.||xy.y>resolution.y) break;
				float s=length(xy-d0)/totalLen;
				vec2 uv=xy/resolution;

				float d = getDepth(uv);
				float vZ = getViewZ( d );
				if(-vZ>=cameraFar) continue;
				float cW = cameraProjectionMatrix[2][3] * vZ+cameraProjectionMatrix[3][3];
				vec3 vP=getViewPosition( uv, d, cW );

				#ifdef PERSPECTIVE_CAMERA
					// https://comp.nus.edu.sg/~lowkl/publications/lowk_persp_interp_techrep.pdf
					float recipVPZ=1./viewPosition.z;
					float viewReflectRayZ=1./(recipVPZ+s*(1./d1viewPosition.z-recipVPZ));
				#else
					float viewReflectRayZ=viewPosition.z+s*(d1viewPosition.z-viewPosition.z);
				#endif

				// if(viewReflectRayZ>vZ) continue; // will cause "npm run make-screenshot webgl_postprocessing_ssr" high probability hang.
				// https://github.com/mrdoob/three.js/pull/21539#issuecomment-821061164
				if(viewReflectRayZ<=vZ){

					bool hit;
					#ifdef INFINITE_THICK
						hit=true;
					#else
						float away=pointToLineDistance(vP,viewPosition,d1viewPosition);

						float minThickness;
						vec2 xyNeighbor=xy;
						xyNeighbor.x+=1.;
						vec2 uvNeighbor=xyNeighbor/resolution;
						vec3 vPNeighbor=getViewPosition(uvNeighbor,d,cW);
						minThickness=vPNeighbor.x-vP.x;
						minThickness*=3.;
						float tk=max(minThickness,thickness);

						hit=away<=tk;
					#endif

					if(hit){
						vec3 vN=getViewNormal( uv );
						if(dot(viewReflectDir,vN)>=0.) continue;
						float distance=pointPlaneDistance(vP,viewPosition,viewNormal);
						if(distance>maxDistance) break;
						float op=opacity;
						#ifdef DISTANCE_ATTENUATION
							float ratio=1.-(distance/maxDistance);
							float attenuation=ratio*ratio;
							op=opacity*attenuation;
						#endif
						#ifdef FRESNEL
							float fresnelCoe=(dot(viewIncidentDir,viewReflectDir)+1.)/2.;
							op*=fresnelCoe;
						#endif
						vec4 reflectColor=texture2D(tDiffuse,uv);
						gl_FragColor.xyz=reflectColor.xyz;
						gl_FragColor.a=op;
						break;
					}
				}
			}
		}
	`},Ve={name:"SSRDepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 uv ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, uv ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, uv ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			float d = 1.0 - depth;
			// d=(d-.999)*1000.;
			gl_FragColor = vec4( vec3( d ), 1.0 );

		}

	`},ve={name:"SSRBlurShader",uniforms:{tDiffuse:{value:null},resolution:{value:new f},opacity:{value:.5}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;
		void main() {
			//reverse engineering from PhotoShop blur filter, then change coefficient

			vec2 texelSize = ( 1.0 / resolution );

			vec4 c=texture2D(tDiffuse,vUv);

			vec2 offset;

			offset=(vec2(-1,0))*texelSize;
			vec4 cl=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(1,0))*texelSize;
			vec4 cr=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(0,-1))*texelSize;
			vec4 cb=texture2D(tDiffuse,vUv+offset);

			offset=(vec2(0,1))*texelSize;
			vec4 ct=texture2D(tDiffuse,vUv+offset);

			// float coeCenter=.5;
			// float coeSide=.125;
			float coeCenter=.2;
			float coeSide=.2;
			float a=c.a*coeCenter+cl.a*coeSide+cr.a*coeSide+cb.a*coeSide+ct.a*coeSide;
			vec3 rgb=(c.rgb*c.a*coeCenter+cl.rgb*cl.a*coeSide+cr.rgb*cr.a*coeSide+cb.rgb*cb.a*coeSide+ct.rgb*ct.a*coeSide)/a;
			gl_FragColor=vec4(rgb,a);

		}
	`};class he extends tt{constructor({renderer:e,scene:t,camera:n,width:o,height:a,selects:i,bouncing:s=!1,groundReflector:l}){super(),this.width=o!==void 0?o:512,this.height=a!==void 0?a:512,this.clear=!0,this.renderer=e,this.scene=t,this.camera=n,this.groundReflector=l,this.opacity=se.uniforms.opacity.value,this.output=0,this.maxDistance=se.uniforms.maxDistance.value,this.thickness=se.uniforms.thickness.value,this.tempColor=new B,this._selects=i,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(c){this._selects!==c&&(this._selects=c,Array.isArray(c)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=s,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(c){this._bouncing!==c&&(this._bouncing=c,c?this.ssrMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture:this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=se.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(c){this._distanceAttenuation!==c&&(this._distanceAttenuation=c,this.ssrMaterial.defines.DISTANCE_ATTENUATION=c,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=se.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(c){this._fresnel!==c&&(this._fresnel=c,this.ssrMaterial.defines.FRESNEL=c,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=se.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(c){this._infiniteThick!==c&&(this._infiniteThick=c,this.ssrMaterial.defines.INFINITE_THICK=c,this.ssrMaterial.needsUpdate=!0)}});const u=new Zt;u.type=Kt,u.minFilter=q,u.magFilter=q,this.beautyRenderTarget=new $(this.width,this.height,{minFilter:q,magFilter:q,type:Te,depthTexture:u,depthBuffer:!0}),this.prevRenderTarget=new $(this.width,this.height,{minFilter:q,magFilter:q}),this.normalRenderTarget=new $(this.width,this.height,{minFilter:q,magFilter:q,type:Te}),this.metalnessRenderTarget=new $(this.width,this.height,{minFilter:q,magFilter:q,type:Te}),this.ssrRenderTarget=new $(this.width,this.height,{minFilter:q,magFilter:q}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),this.ssrMaterial=new I({defines:Object.assign({},se.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:J.clone(se.uniforms),vertexShader:se.vertexShader,fragmentShader:se.fragmentShader,blending:oe}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Dr,this.normalMaterial.blending=oe,this.metalnessOnMaterial=new Be({color:"white"}),this.metalnessOffMaterial=new Be({color:"black"}),this.blurMaterial=new I({defines:Object.assign({},ve.defines),uniforms:J.clone(ve.uniforms),vertexShader:ve.vertexShader,fragmentShader:ve.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new I({defines:Object.assign({},ve.defines),uniforms:J.clone(ve.uniforms),vertexShader:ve.vertexShader,fragmentShader:ve.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new I({defines:Object.assign({},Ve.defines),uniforms:J.clone(Ve.uniforms),vertexShader:Ve.vertexShader,fragmentShader:Ve.fragmentShader,blending:oe}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new I({uniforms:J.clone(st.uniforms),vertexShader:st.vertexShader,fragmentShader:st.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:dt,blendDst:gt,blendEquation:mt,blendSrcAlpha:dt,blendDstAlpha:gt,blendEquationAlpha:mt}),this.fsQuad=new rt(null),this.originalClearColor=new B}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,t){switch(e.setRenderTarget(this.beautyRenderTarget),e.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),e.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this.renderMetalness(e,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.renderPass(e,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this.renderPass(e,this.blurMaterial,this.blurRenderTarget),this.renderPass(e,this.blurMaterial2,this.blurRenderTarget2)),this.output){case he.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=oe,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=qe,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=oe,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=oe,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=qe,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t));break;case he.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=oe,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=oe,this.renderPass(e,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=qe,this.renderPass(e,this.copyMaterial,this.prevRenderTarget));break;case he.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=oe,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case he.OUTPUT.Depth:this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case he.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=oe,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case he.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=oe,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}renderPass(e,t,n,o,a){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),s=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,o!=null&&(e.setClearColor(o),e.setClearAlpha(a||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=s,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}renderOverride(e,t,n,o,a){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),s=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,o=t.clearColor||o,a=t.clearAlpha||a,o!=null&&(e.setClearColor(o),e.setClearAlpha(a||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=s,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}renderMetalness(e,t,n,o,a){this.originalClearColor.copy(e.getClearColor(this.tempColor));const i=e.getClearAlpha(this.tempColor),s=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,o=t.clearColor||o,a=t.clearAlpha||a,o!=null&&(e.setClearColor(o),e.setClearAlpha(a||0),e.clear()),this.scene.traverseVisible(l=>{l._SSRPassBackupMaterial=l.material,this._selects.includes(l)?l.material=this.metalnessOnMaterial:l.material=this.metalnessOffMaterial}),e.render(this.scene,this.camera),this.scene.traverseVisible(l=>{l.material=l._SSRPassBackupMaterial}),e.autoClear=s,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}setSize(e,t){this.width=e,this.height=t,this.ssrMaterial.defines.MAX_STEP=Math.sqrt(e*e+t*t),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(e,t),this.prevRenderTarget.setSize(e,t),this.ssrRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.metalnessRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.blurRenderTarget2.setSize(e,t),this.ssrMaterial.uniforms.resolution.value.set(e,t),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t),this.blurMaterial2.uniforms.resolution.value.set(e,t)}}he.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7};class fe extends Pe{constructor(e,t={}){super(e),this.isReflectorForSSRPass=!0,this.type="ReflectorForSSRPass";const n=this,o=t.color!==void 0?new B(t.color):new B(8355711),a=t.textureWidth||512,i=t.textureHeight||512,s=t.clipBias||0,l=t.shader||fe.ReflectorShader,u=t.useDepthTexture===!0,c=new m(0,1,0),M=new m,O=new m;n.needsUpdate=!1,n.maxDistance=fe.ReflectorShader.uniforms.maxDistance.value,n.opacity=fe.ReflectorShader.uniforms.opacity.value,n.color=o,n.resolution=t.resolution||new f(window.innerWidth,window.innerHeight),n._distanceAttenuation=fe.ReflectorShader.defines.DISTANCE_ATTENUATION,Object.defineProperty(n,"distanceAttenuation",{get(){return n._distanceAttenuation},set(x){n._distanceAttenuation!==x&&(n._distanceAttenuation=x,n.material.defines.DISTANCE_ATTENUATION=x,n.material.needsUpdate=!0)}}),n._fresnel=fe.ReflectorShader.defines.FRESNEL,Object.defineProperty(n,"fresnel",{get(){return n._fresnel},set(x){n._fresnel!==x&&(n._fresnel=x,n.material.defines.FRESNEL=x,n.material.needsUpdate=!0)}});const S=new m,T=new m,d=new m,v=new W,h=new m(0,0,-1),b=new m,p=new m,R=new W,g=new Ue;let y;u&&(y=new Zt,y.type=Kt,y.minFilter=q,y.magFilter=q);const A={depthTexture:u?y:null,type:Te},E=new $(a,i,A),L=new I({name:l.name!==void 0?l.name:"unspecified",transparent:u,defines:Object.assign({},fe.ReflectorShader.defines,{useDepthTexture:u}),uniforms:J.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});L.uniforms.tDiffuse.value=E.texture,L.uniforms.color.value=n.color,L.uniforms.textureMatrix.value=R,u&&(L.uniforms.tDepth.value=E.depthTexture),this.material=L;const N=[new Mt(new m(0,1,0),s)];this.doRender=function(x,Q,j){if(L.uniforms.maxDistance.value=n.maxDistance,L.uniforms.color.value=n.color,L.uniforms.opacity.value=n.opacity,M.copy(j.position).normalize(),O.copy(M).reflect(c),L.uniforms.fresnelCoe.value=(M.dot(O)+1)/2,T.setFromMatrixPosition(n.matrixWorld),d.setFromMatrixPosition(j.matrixWorld),v.extractRotation(n.matrixWorld),S.set(0,0,1),S.applyMatrix4(v),b.subVectors(T,d),b.dot(S)>0)return;b.reflect(S).negate(),b.add(T),v.extractRotation(j.matrixWorld),h.set(0,0,-1),h.applyMatrix4(v),h.add(d),p.subVectors(T,h),p.reflect(S).negate(),p.add(T),g.position.copy(b),g.up.set(0,1,0),g.up.applyMatrix4(v),g.up.reflect(S),g.lookAt(p),g.far=j.far,g.updateMatrixWorld(),g.projectionMatrix.copy(j.projectionMatrix),L.uniforms.virtualCameraNear.value=j.near,L.uniforms.virtualCameraFar.value=j.far,L.uniforms.virtualCameraMatrixWorld.value=g.matrixWorld,L.uniforms.virtualCameraProjectionMatrix.value=j.projectionMatrix,L.uniforms.virtualCameraProjectionMatrixInverse.value=j.projectionMatrixInverse,L.uniforms.resolution.value=n.resolution,R.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),R.multiply(g.projectionMatrix),R.multiply(g.matrixWorldInverse),R.multiply(n.matrixWorld);const k=x.getRenderTarget(),G=x.xr.enabled,ot=x.shadowMap.autoUpdate,pe=x.clippingPlanes;x.xr.enabled=!1,x.shadowMap.autoUpdate=!1,x.clippingPlanes=N,x.setRenderTarget(E),x.state.buffers.depth.setMask(!0),x.autoClear===!1&&x.clear(),x.render(Q,g),x.xr.enabled=G,x.shadowMap.autoUpdate=ot,x.clippingPlanes=pe,x.setRenderTarget(k);const re=j.viewport;re!==void 0&&x.state.viewport(re)},this.getRenderTarget=function(){return E}}}fe.ReflectorShader={name:"ReflectorShader",defines:{DISTANCE_ATTENUATION:!0,FRESNEL:!0},uniforms:{color:{value:null},tDiffuse:{value:null},tDepth:{value:null},textureMatrix:{value:new W},maxDistance:{value:180},opacity:{value:.5},fresnelCoe:{value:null},virtualCameraNear:{value:null},virtualCameraFar:{value:null},virtualCameraProjectionMatrix:{value:new W},virtualCameraMatrixWorld:{value:new W},virtualCameraProjectionMatrixInverse:{value:new W},resolution:{value:new f}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		uniform sampler2D tDepth;
		uniform float maxDistance;
		uniform float opacity;
		uniform float fresnelCoe;
		uniform float virtualCameraNear;
		uniform float virtualCameraFar;
		uniform mat4 virtualCameraProjectionMatrix;
		uniform mat4 virtualCameraProjectionMatrixInverse;
		uniform mat4 virtualCameraMatrixWorld;
		uniform vec2 resolution;
		varying vec4 vUv;
		#include <packing>
		float blendOverlay( float base, float blend ) {
			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
		}
		vec3 blendOverlay( vec3 base, vec3 blend ) {
			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );
		}
		float getDepth( const in vec2 uv ) {
			return texture2D( tDepth, uv ).x;
		}
		float getViewZ( const in float depth ) {
			return perspectiveDepthToViewZ( depth, virtualCameraNear, virtualCameraFar );
		}
		vec3 getViewPosition( const in vec2 uv, const in float depth/*clip space*/, const in float clipW ) {
			vec4 clipPosition = vec4( ( vec3( uv, depth ) - 0.5 ) * 2.0, 1.0 );//ndc
			clipPosition *= clipW; //clip
			return ( virtualCameraProjectionMatrixInverse * clipPosition ).xyz;//view
		}
		void main() {
			vec4 base = texture2DProj( tDiffuse, vUv );
			#ifdef useDepthTexture
				vec2 uv=(gl_FragCoord.xy-.5)/resolution.xy;
				uv.x=1.-uv.x;
				float depth = texture2DProj( tDepth, vUv ).r;
				float viewZ = getViewZ( depth );
				float clipW = virtualCameraProjectionMatrix[2][3] * viewZ+virtualCameraProjectionMatrix[3][3];
				vec3 viewPosition=getViewPosition( uv, depth, clipW );
				vec3 worldPosition=(virtualCameraMatrixWorld*vec4(viewPosition,1)).xyz;
				if(worldPosition.y>maxDistance) discard;
				float op=opacity;
				#ifdef DISTANCE_ATTENUATION
					float ratio=1.-(worldPosition.y/maxDistance);
					float attenuation=ratio*ratio;
					op=opacity*attenuation;
				#endif
				#ifdef FRESNEL
					op*=fresnelCoe;
				#endif
				gl_FragColor = vec4( blendOverlay( base.rgb, color ), op );
			#else
				gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );
			#endif
		}
	`};class jn extends yt{constructor(e){super(e)}useEngine(e){return super.useEngine(e),e.effectComposer?(this.composer=e.effectComposer,this):(console.warn("engine need install effectComposer plugin that can use pass compiler."),this)}add(e){const t=super.add(e);return t&&(e.index<0?this.composer.addPass(t):this.composer.insertPass(t,e.index)),t}remove(e){if(!this.map.has(e.vid))return console.warn(`PassCompiler can not found this vid pass: ${e.vid}.`),this;const t=this.map.get(e.vid);return this.composer.removePass(t.puppet),super.remove(e),this}}const Oe=function(){return Object.assign(X(),{vid:"",name:"",type:"Pass",index:-1})},zn=function(){return Object.assign(Oe(),{})},Bn=function(){return Object.assign(Oe(),{strength:1.5,threshold:0,radius:0})},Nn=function(){return Object.assign(Oe(),{strength:1,threshold:0,radius:0,renderScene:"",renderCamera:"",selectedObjects:[]})},Fn=function(){return Object.assign(Oe(),{renderer:"",scene:"",camera:"",width:0,height:0,ground:!0,groudOption:{geometry:"",color:"rgb(127, 127, 127)",textureWidth:0,textureHeight:0,clipBias:0,multisample:4},selects:[],opacity:.5,output:0,maxDistance:180,thickness:.018,bouncing:!0,distanceAttenuation:!0,fresnel:!0,infiniteThick:!0})},Un=function(){return Object.assign(Oe(),{grayscale:!1,intensity:.5})},Wn=function(){return Object.assign(Oe(),{lut:"",intensity:1,use2D:!1})},In=z({type:"FilmPass",config:Un,commands:{set:{intensity({target:r,value:e}){r.uniforms.intensity.value=e},grayscale({target:r,value:e}){r.uniforms.grayscale.value=e?1:0}}},create({config:r,engine:e}){return new On(r.intensity,r.grayscale)},dispose(r){}}),Hn=z({type:"LUTPass",config:Wn,shared:{getResource(r,e){if(r.lut){const t=e.resourceManager.resourceMap.get(r.lut);if(!t)console.warn(`LUT pass processor can not found resource: ${r.lut}`);else return r.use2D?t.texture:t.texture3D}}},commands:{set:{lut({model:r,target:e,config:t,engine:n}){e.lut=r.getResource(t,n)},use2D({model:r,target:e,config:t,engine:n}){e.lut=r.getResource(t,n)}}},create({model:r,config:e,engine:t}){return new Rn({intensity:e.intensity,lut:r.getResource(e,t)})},dispose({target:r}){r.lut=void 0}}),pt=class vt extends tt{constructor(e=new f(256,256),t=1,n=0,o=0,a=new St,i=new Ue,s){super(),this.selectedObjects=[],this.clearColor=new B(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5,this.separableBlurMaterials=[],this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new B,this.oldClearAlpha=1,this.basic=new Be,this.fsQuad=new rt,this.materialCache=new Map,this.sceneBackgroundCache=null,this.overrideBackground=new B("black"),this.overrideMeshMaterial=new Be({color:"black"}),this.overrideLineMaterial=new Qt({color:"black"}),this.overridePointsMaterial=new Jt({color:"black"}),this.overrideSpriteMaterial=new je({color:"black"}),this.resolution=e,this.strength=t,this.radius=n,this.threshold=o,this.renderScene=a,this.renderCamera=i,this.selectedObjects=s;let l=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);this.selectRenderTarget=new $(l,u),this.selectRenderTarget.texture.name="UnrealBloomPass.selected",this.selectRenderTarget.texture.generateMipmaps=!1,this.renderTargetBright=new $(l,u),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let S=0;S<this.nMips;S++){const T=new $(l,u);T.texture.name="UnrealBloomPass.h"+S,T.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(T);const d=new $(l,u);d.texture.name="UnrealBloomPass.v"+S,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),l=Math.round(l/2),u=Math.round(u/2)}kt===void 0&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const c=kt;this.highPassUniforms=J.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new I({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,defines:{}});const M=[3,5,7,9,11];l=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);for(let S=0;S<this.nMips;S++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(M[S])),this.separableBlurMaterials[S].uniforms.texSize.value=new f(l,u),l=Math.round(l/2),u=Math.round(u/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const O=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=O,this.bloomTintColors=[new m(1,1,1),new m(1,1,1),new m(1,1,1),new m(1,1,1),new m(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.mixMaterial=this.getMixMaterial()}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose()}setSize(e,t){let n=Math.round(e/2),o=Math.round(t/2);this.selectRenderTarget.setSize(n,o),this.renderTargetBright.setSize(n,o);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(n,o),this.renderTargetsVertical[a].setSize(n,o),this.separableBlurMaterials[a].uniforms.texSize.value=new f(n,o),n=Math.round(n/2),o=Math.round(o/2)}render(e,t,n,o,a){if(!this.selectedObjects.length){this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e));return}e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const i=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1);const s=new Map;for(const c of this.selectedObjects)s.set(c,!0);const l=this.materialCache;this.renderScene.background&&(this.sceneBackgroundCache=this.renderScene.background,this.renderScene.background=this.overrideBackground),this.renderScene.traverse(c=>{!s.has(c)&&!c.isLight&&c.visible&&(l.set(c,c.material),c instanceof Pe?c.material=this.overrideMeshMaterial:c instanceof $t?c.material=this.overrideLineMaterial:c instanceof Tt?c.material=this.overridePointsMaterial:c instanceof _t&&(c.material=this.overrideSpriteMaterial))}),e.setRenderTarget(this.selectRenderTarget),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=this.selectRenderTarget.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=this.selectRenderTarget.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let u=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=u.texture,this.separableBlurMaterials[c].uniforms.direction.value=vt.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=vt.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),u=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.mixMaterial,this.mixMaterial.uniforms.bloom.value=this.renderTargetsHorizontal[0].texture,this.mixMaterial.uniforms.origin.value=n.texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=i;for(const c of l.entries())c[0].material=c[1];l.clear(),this.sceneBackgroundCache&&(this.renderScene.background=this.sceneBackgroundCache,this.sceneBackgroundCache=null)}getMixMaterial(){return new I({blending:er,depthTest:!1,depthWrite:!1,transparent:!0,uniforms:{bloom:{value:null},origin:{value:null}},vertexShader:`
    
        varying vec2 vUv;
    
        void main() {
    
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    
        }`,fragmentShader:`
        uniform sampler2D bloom;
        uniform sampler2D origin;
    
        varying vec2 vUv;
    
        void main() {
          vec3 bloomColor = texture2D(bloom, vUv).rgb;
          vec3 originColor = texture2D(origin, vUv).rgb;
          gl_FragColor = vec4(originColor + bloomColor, 1.0);
        }`})}getSeperableBlurMaterial(e){return new I({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new f(.5,.5)},direction:{value:new f(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
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
				}`})}getCompositeMaterial(e){return new I({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
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
				}`})}};pt.BlurDirectionX=new f(1,0),pt.BlurDirectionY=new f(0,1);let kn=pt;const Gn=z({type:"SelectiveBloomPass",config:Nn,commands:{add:{selectedObjects({target:r,engine:e,value:t}){const n=e.getObject3D(t);n?r.selectedObjects.push(n):console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${t}`)}},set:{renderScene({target:r,engine:e,value:t}){const n=e.getObject3D(t);n instanceof St&&(r.renderScene=n)},renderCamera({target:r,engine:e,value:t}){const n=e.getObject3D(t);n instanceof Rr&&(r.renderCamera=n)},selectedObjects({target:r,config:e,engine:t}){const n=e.selectedObjects.map(o=>{const a=t.getObject3D(o);if(a)return a;console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${o}`)}).filter(o=>o);r.selectedObjects=n}},delete:{selectedObjects({target:r,engine:e,value:t}){const n=e.getObject3D(t);n?r.selectedObjects.includes(n)&&r.selectedObjects.splice(r.selectedObjects.indexOf(n),1):console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${t}`)}}},create({config:r,engine:e}){const t=[];for(const o of r.selectedObjects){const a=e.getObject3D(o);a&&t.push(a)}const n=window.devicePixelRatio;return new kn(new f(e.dom?e.dom.offsetWidth*n:window.innerWidth*n,e.dom?e.dom.offsetHeight*n:window.innerWidth*n),r.strength,r.radius,r.threshold,r.renderScene&&e.getObjectFromModule(C.SCENE,r.renderScene)||void 0,r.renderCamera&&e.getObjectFromModule(C.CAMERA,r.renderCamera)||void 0,t)},dispose({target:r}){r.dispose()}}),Vn=z({type:"SMAAPass",config:zn,create({config:r,engine:e}){const t=window.devicePixelRatio;return new Ln(e.dom?e.dom.offsetWidth*t:window.innerWidth*t,e.dom?e.dom.offsetHeight*t:window.innerWidth*t)},dispose(r){}}),Xn=z({type:"SSRPass",config:Fn,shared:{defaultGroundGeometry:new ne(window.innerWidth,window.innerHeight),setDefaultGroundGeometry(r){const e=new ne(r.width?r.width:window.innerWidth,r.height?r.height:window.innerHeight);return this.defaultGroundGeometry.copy(e),e.dispose(),this.defaultGroundGeometry},generateGround(r,e){const t=new fe(e.getObjectBySymbol(r.groudOption.geometry)||this.setDefaultGroundGeometry(r),{color:new B(r.groudOption.color).getHex(),clipBias:r.groudOption.clipBias,textureHeight:r.groudOption.textureHeight||e.dom.offsetWidth*window.devicePixelRatio,textureWidth:r.groudOption.textureWidth||e.dom.offsetHeight*window.devicePixelRatio,useDepthTexture:!0});return t.material.depthWrite=!1,t.raycast=()=>{},t.visible=!1,t.geometry===this.defaultGroundGeometry&&(t.rotation.x=-Math.PI/2),(r.scene?e.getObjectBySymbol(r.scene):e.scene).add(t),t},disposeGround(r){r.getRenderTarget().dispose(),r.material.dispose()}},commands:{set:{ground({model:r,target:e,config:t,value:n,engine:o}){if(n&&!e.groundReflector){e.groundReflector=r.generateGround(t,o);return}!n&&e.groundReflector&&(r.disposeGround(e.groundReflector),e.groundReflector=null)},groudOption:{geometry({model:r,target:e,config:t,value:n,engine:o}){if(t.ground)if(n){const a=o.getObjectBySymbol(n);if(!a){console.warn(`SSR pass processor: can not found geometry with: ${n}`);return}e.groundReflector.geometry=a}else e.groundReflector.geometry=r.setDefaultGroundGeometry(t)}},opacity({target:r,value:e}){r.groundReflector&&(r.groundReflector.opacity=e),r.opacity=e},maxDistance({target:r,value:e}){r.groundReflector&&(r.groundReflector.maxDistance=e),r.maxDistance=e}}},create({model:r,config:e,engine:t}){const n=window.devicePixelRatio,o=new he({renderer:e.renderer?t.getObjectBySymbol(e.renderer):t.webGLRenderer,scene:e.scene?t.getObjectBySymbol(e.scene):t.scene,camera:e.camera?t.getObjectBySymbol(e.camera):t.camera,width:e.width?e.width:t.dom.offsetWidth*n,height:e.height?e.height:t.dom.offsetHeight*n,groundReflector:e.ground?r.generateGround(e,t):null,selects:e.selects.map(a=>t.getObjectBySymbol(a)),bouncing:e.bouncing});if(o.infiniteThick=e.infiniteThick,o.opacity=e.opacity,o.output=e.output,o.maxDistance=e.maxDistance,o.thickness=e.thickness,o.groundReflector){const a=o.groundReflector;a.opacity=o.opacity,a.maxDistance=o.maxDistance}return o},dispose({model:r,target:e}){e.groundReflector&&r.disposeGround(e.groundReflector),e.groundReflector=null,e.dispose(),r.defaultGroundGeometry.dispose(),defaultGroundGeometry=void 0}}),Yn=z({type:"UnrealBloomPass",config:Bn,create({config:r,engine:e}){const t=window.devicePixelRatio;return new vn(new f(e.dom?e.dom.offsetWidth*t:window.innerWidth*t,e.dom?e.dom.offsetHeight*t:window.innerWidth*t),r.strength,r.radius,r.threshold)},dispose({target:r}){r.dispose()}}),Bs=P({type:"pass",compiler:jn,models:[In,Hn,Gn,Vn,Xn,Yn]}),qn=Fe([function(r){return!(r.key==="name"&&r.path.length===1)},V.SYMBOL_VALIDATOR,V.OPERATE_ADD,V.OPERATE_DELETE,V.OPERATE_COVER,V.OPERATE_COMPILE]),gr=function(){return Object.assign(X(),{play:!0})},Zn=function(){return Object.assign(gr(),{target:"",time:0,timeScale:1})},Kn=function(){return Object.assign(gr(),{target:"",script:{name:""},attribute:""})},ge=class Ee{static generateConfig(e,t){if(!Ee.configLibrary.has(e))return console.warn(`event library can not found config by name: ${e}`),{name:""};const n=(a,i)=>{for(const s in i)a[s]!==void 0&&(typeof i[s]=="object"&&i[s]!==null&&!Array.isArray(i[s])?n(a[s],i[s]):a[s]=i[s])},o=JSON.parse(JSON.stringify(Ee.configLibrary.get(e)));return n(o,t),o}static generateScript(e,t,n,o){return Ee.generatorLibrary.has(o.name)?Ee.generatorLibrary.get(o.name)(e,t,n,o):(console.error(`event library can not found generator by name: ${o.name}`),()=>{})}static has(e){return Ee.configLibrary.has(e)}};ge.configLibrary=new Map,ge.generatorLibrary=new Map,ge.register=function({config:r,generator:e}){return ge.configLibrary.has(r.name)?(console.warn(`EventLibrary has already exist this event generator: ${r.name}, that will be cover.`),ge):(ge.configLibrary.set(r.name,JSON.parse(JSON.stringify(r))),ge.generatorLibrary.set(r.name,e),ge)};let Qn=ge;const Jn=z({type:"ScriptAnimation",config:Kn,shared:{eventSymbol:"vis.event",createFunction(r,e){let t=e.compilerManager.getObjectBySymbol(r.target);if(!t)return console.warn(`can not found object in enigne: ${r.target}`),()=>{};const n=r.attribute.split(".");n.shift();const o=n.pop();for(const a of n){if(t[a]===void 0)return console.warn(`animaton processor: target object can not found key: ${a}`,t),()=>{};t=t[a]}return Qn.generateScript(e,t,o,r.script)},restoreAttribute(r,e){if(!r.target||!r.attribute)return this;let t=e.getObjectBySymbol(r.target),n=e.getConfigBySymbol(r.target);(!t||!n)&&console.warn("scrpit animation model: can not found object target or config in engine",r.vid);const o=r.attribute.split(".");o.shift();const a=o.pop();for(const i of o)if(t[i]&&n[i])t=t[i],n=n[i];else return console.warn("scrpit animation model: object and config attribute are not sync"),this;return t[a]=n[a],this}},commands:{set:{play({target:r,value:e,engine:t}){e?t.renderManager.addEventListener(Z.RENDER,r):t.renderManager.removeEventListener(Z.RENDER,r)},$reg:[{reg:new RegExp(".*"),handler({model:r,target:e,config:t,engine:n,compiler:o}){n.renderManager.removeEventListener(Z.RENDER,e),o.symbolMap.delete(e),r.restoreAttribute(t,n);const a=r.createFunction(t,n);t.play&&n.renderManager.addEventListener(Z.RENDER,a),r.puppet=a,o.symbolMap.set(a,t.vid)}}]}},create({model:r,config:e,engine:t}){const n=r.createFunction(e,t);return e.play&&t.renderManager.addEventListener(Z.RENDER,n),n},dispose({model:r,target:e,config:t,engine:n}){n.renderManager.removeEventListener(Z.RENDER,e),r.restoreAttribute(t,n)}}),$n=z({type:"MixerAnimation",config:Zn,context(){return{mixerAni:void 0}},create({model:r,config:e,engine:t,compiler:n}){let o;Array.isArray(e.target)?(o=new Lr,e.target.forEach(i=>{const s=t.getObjectBySymbol(i);s?o.add(s):console.warn(`mixer animation processor can not found vid in engine: ${i}`)})):(o=t.getObjectBySymbol(e.target),o||(console.warn(`mixer animation processor can not found vid in engine: ${e.target}`),o=new Et));const a=new jr(o);if(a.time=e.time,a.timeScale=e.timeScale,e.play){const i=s=>{a.update(s.delta)};t.renderManager.addEventListener(Z.RENDER,i),r.mixerAni=i}return a},dispose({model:r,target:e,engine:t}){r.mixerAni&&(t.renderManager.removeEventListener(Z.RENDER,r.mixerAni),r.mixerAni=void 0),e.uncacheRoot(e.getRoot()),e._actions.forEach(n=>{const o=n.getClip();e.uncacheClip(o),e.uncacheAction(o)})}}),Ns=P({type:"animation",rule:qn,models:[Jn,$n],lifeOrder:D.NINE}),_=function(){return Object.assign(X(),{type:"Object3D",castShadow:!0,receiveShadow:!0,lookAt:"",visible:!0,raycast:!0,matrixAutoUpdate:!0,renderOrder:0,position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},up:{x:0,y:1,z:0},parent:"",children:[],pointerdown:[],pointermove:[],pointerup:[],pointerenter:[],pointerleave:[],click:[],dblclick:[],contextmenu:[]})},ee=Fe([function(r){return r.key!=="parent"},V.SYMBOL_VALIDATOR,V.OPERATE_ADD,V.OPERATE_DELETE,V.OPERATE_COVER,V.OPERATE_COMPILE]),me=class ae{static generateConfig(e,t){if(!ae.configLibrary.has(e))return console.warn(`event library can not found config by name: ${e}`),null;const n=(a,i)=>{for(const s in i)typeof i[s]=="object"&&i[s]!==null&&!Array.isArray(i[s])?n(a[s],i[s]):a[s]=i[s]},o=JSON.parse(JSON.stringify(ae.configLibrary.get(e)));return n(o,t),o}static generateEvent(e,t){return ae.generatorLibrary.has(e.name)?ae.generatorLibrary.get(e.name)(t,e):(console.error(`event library can not found generator by name: ${e.name}`),()=>{})}static has(e){return ae.configLibrary.has(e)}static useEngine(e){ae.engine=e}static createEvent(e,t,n){if(!ae.engine&&!n)return console.error("EventGenerator Manager createEvent must provide an engine, you can use 'useEngine' to set it."),null;const o=ae.generateConfig(e,t);return o?ae.generateEvent(o,n||ae.engine):null}};me.configLibrary=new Map,me.generatorLibrary=new Map,me.register=function({config:r,generator:e}){return me.configLibrary.has(r.name)?(console.warn(`EventGeneratorManager has already exist this event generator: ${r.name}, that will be cover.`),me):(me.configLibrary.set(r.name,JSON.parse(JSON.stringify(r))),me.generatorLibrary.set(r.name,e),me)};let xt=me;const Gt=function({model:r,target:e,config:t,value:n,engine:o}){if(t.vid===n){console.warn("can not set object lookAt itself.");return}const a=r.cacheLookAt;if(!n){if(!a.updateMatrixWorld)return;e.updateMatrixWorld=a.updateMatrixWorld,a.target=null,a.updateMatrixWorld=null;return}r.toAsync(i=>{const s=o.compilerManager.getObjectFromModules(wt,n);if(!s)return i&&console.warn(`lookAt handler can not found this vid mapping object: '${n}'`),!1;const l=e.updateMatrixWorld;return a.updateMatrixWorld=l,a.target=s.position,e.updateMatrixWorld=u=>{l.call(e,u),e.lookAt(a.target)},!0})},de=function({model:r,path:e,value:t,engine:n,target:o}){const a=e[0];if(!xt.has(t.name)){console.warn(`EventGeneratorManager: can not support this event: ${t.name}`);return}const i=xt.generateEvent(t,n),s=Symbol.for(r.eventSymbol);t[s]=i,o.addEventListener(a,i)},xe=function({model:r,target:e,path:t,value:n}){const o=t[0],a=n[Symbol.for(r.eventSymbol)];if(!a){console.warn("event remove can not fun found event in config",n);return}e.removeEventListener(o,a),delete n[Symbol.for(r.eventSymbol)]},ye=function({model:r,target:e,config:t,path:n,engine:o}){if(n.length<2)return;const a=n[0],i=t[n[0]][n[1]],s=i[Symbol.for(r.eventSymbol)];if(!s){console.warn("event remove can not fun found event in config",i);return}e.removeEventListener(a,s);const l=xt.generateEvent(i,o);i[Symbol.for(r.eventSymbol)]=l,e.addEventListener(a,l)},ct=function({model:r,target:e,config:t,value:n,engine:o}){r.toTrigger("object",a=>{var i;const s=r.toConfig(n);if(!s)return a||console.warn(` can not foud object config in engine: ${n}`),!1;if(s.parent&&s.parent!==t.vid){const u=r.toConfig(s.parent);if(!u)return a||console.warn(` can not foud object parent config in engine: ${s.parent}`),!1;u.children.splice(u.children.indexOf(n),1)}s.parent=t.vid;const l=o.compilerManager.getObjectFromModules(wt,n);return l?(e.add(l),l.updateMatrixWorld(!0),(i=r.toModel(n))==null||i.emit(`${w.COMPILED_ATTR}:parent`),!0):(a||console.warn(`can not found this vid in engine: ${n}.`),!1)})},_n=function({model:r,target:e,config:t,value:n,engine:o}){var a;const i=o.compilerManager.getObjectFromModules(wt,n);if(!i){console.warn(`can not found this vid in engine: ${n}.`);return}e.remove(i);const s=o.getConfigBySymbol(n);if(!s){console.warn(`can not found this vid in engine: ${n}.`);return}s.parent="",(a=r.toModel(n))==null||a.emit(`${w.COMPILED_ATTR}:parent`)},eo=function({model:r,target:e,config:t,value:n,engine:o}){n?delete e.raycast:e.raycast=r.emptyRaycast},te=z.extend({shared:{eventSymbol:"vis.event",emptyRaycast:()=>{}},context(){return{cacheLookAt:{target:null,updateMatrixWorld:null}}},commands:{add:{pointerdown:de,pointerup:de,pointermove:de,pointerenter:de,pointerleave:de,click:de,dblclick:de,contextmenu:de,children:ct},set:{lookAt:Gt,pointerdown:ye,pointerup:ye,pointermove:ye,pointerenter:ye,pointerleave:ye,click:ye,dblclick:ye,contextmenu:ye,parent:Ye,raycast:eo,children:{$reg:[{reg:new RegExp(".*"),handler:ct}]}},delete:{pointerdown:xe,pointerup:xe,pointermove:xe,pointerenter:xe,pointerleave:xe,click:xe,dblclick:xe,contextmenu:xe,children:_n}},create({model:r,target:e,config:t,engine:n,filter:o}){!o.lookAt&&Gt.call(r,{model:r,target:e,config:t,value:t.lookAt,engine:n}),!t.raycast&&(e.raycast=r.emptyRaycast),t.children.forEach(a=>{ct.call(r,{model:r,target:e,config:t,value:a,engine:n})});for(const a of Object.values(Tn))r.asyncNextTick(()=>(t[a].forEach((i,s)=>{de.call(r,{model:r,target:e,path:[a,s.toString()],value:i,engine:n})}),!0));ce(t,e,{vid:!0,type:!0,lookAt:!0,parent:!0,children:!0,raycast:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointerenter:!0,pointerleave:!0,click:!0,dblclick:!0,contextmenu:!0,...o})},dispose({target:r}){r._listener={}}});function to(r){r.setCameraBySymbol=function(e){const t=this.getObjectFromModule(C.CAMERA,e);return t?this.setCamera(t):console.warn("can not found camera",e),this}}const ro=function(){return Object.assign(_(),{adaptiveWindow:!1,fov:45,aspect:1920/1080,near:5,far:50})},no=function(){return Object.assign(_(),{adaptiveWindow:!1,left:-window.innerWidth,right:window.innerWidth,top:window.innerHeight,bottom:-window.innerHeight,near:5,far:50,zoom:1})},oo=te(r=>({type:"OrthographicCamera",config:no,context({model:e}){return{updateFun:t=>{const n=e.puppet,o=t.width,a=t.height;n.left=-o,n.right=o,n.top=a,n.bottom=-a,n.updateProjectionMatrix()}}},commands:{add:{scale(){}},set:{scale(){},adaptiveWindow({model:e,value:t,engine:n}){t?(n.addEventListener(Z.SETSIZE,e.updateFun),e.updateFun({type:"setSize",width:n.dom.offsetWidth,height:n.dom.offsetHeight})):n.removeEventListener(Z.SETSIZE,e.updateFun)},$reg:[{reg:new RegExp("left|right|top|bottom|near|far|zoom"),handler({target:e,key:t,value:n}){e[t]=n,e.updateProjectionMatrix()}}]},delete:{scale(){}}},create({model:e,config:t,engine:n}){const o=new zr(-50,50,50,-50);if(r.create({model:e,target:o,config:t,filter:{scale:!0,adaptiveWindow:!0},engine:n}),o.updateProjectionMatrix(),t.adaptiveWindow){const a=n.dom.offsetWidth,i=n.dom.offsetHeight;o.left=-a,o.right=a,o.top=i,o.bottom=-i,o.updateProjectionMatrix(),n.addEventListener(Z.SETSIZE,e.updateFun)}return o},dispose({target:e}){r.dispose({target:e})}})),ao=te(r=>({type:"PerspectiveCamera",config:ro,context({model:e}){return{updateFun:t=>{e.puppet.aspect=t.width/t.height,e.puppet.updateProjectionMatrix()}}},commands:{add:{scale(){}},set:{scale(){},adaptiveWindow({model:e,value:t,engine:n}){t?(n.addEventListener(Z.SETSIZE,e.updateFun),e.updateFun({type:"setSize",width:n.dom.offsetWidth,height:n.dom.offsetHeight})):n.removeEventListener(Z.SETSIZE,e.updateFun)},$reg:[{reg:new RegExp("fov|aspect|near|far"),handler({target:e,key:t,value:n}){e[t]=n,e.updateProjectionMatrix()}}]},delete:{scale(){}}},create({model:e,config:t,engine:n,compiler:o}){const a=new Ue;return r.create({model:e,target:a,config:t,filter:{scale:!0,adaptiveWindow:!0},engine:n}),a.updateProjectionMatrix(),t.adaptiveWindow&&(a.aspect=n.dom.offsetWidth/n.dom.offsetHeight,a.updateProjectionMatrix(),n.addEventListener(Z.SETSIZE,e.updateFun)),a},dispose({target:e}){r.dispose({target:e})}})),Fs=P({type:"camera",object:!0,rule:ee,extend:to,models:[oo,ao],lifeOrder:D.THREE}),io=function(){return Object.assign(_(),{element:"",width:50,height:50})},so=function(){return Object.assign(io(),{})};class lo extends yn{constructor(e=document.createElement("div")){const t=document.createElement("div"),n=50,o=50;t.style.width=`${n}px`,t.style.height=`${o}px`,t.appendChild(e),super(t),this.geometry=new ne(n,o),this.geometry.computeBoundingBox(),this._width=n,this._height=o}get width(){return this._width}set width(e){this.geometry.dispose(),this.geometry=new ne(e,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${e}px`,this._width=e}get height(){return this._height}set height(e){this.geometry.dispose(),this.geometry=new ne(this._width,e),this.geometry.computeBoundingBox(),this.element.style.height=`${e}px`,this._height=e}}class co extends lo{constructor(e=document.createElement("div")){super(e),this.cacheBox=new $e,this.viewWorldMatrix=new W,this.mvPosition=new m,this.matrixScale=new m,this.worldScale=new m,this.vA=new m,this.vB=new m,this.vC=new m,this.alignedPosition=new f,this.rotatedPosition=new f,this.intersectPoint=new m,this.type="CSS2DPlane",this.element.classList.add("vis-css2d","vis-css2d-plane"),new MutationObserver(()=>{this.matrixScale.set(Math.abs(this.width/100)*.1,Math.abs(this.height/100)*.1,1)}).observe(this.element,{attributeFilter:["style"]})}transformVertex(e,t,n){const o=this.alignedPosition,a=this.rotatedPosition,i=0,s=1;o.copy(e).multiply(n),a.x=s*o.x-i*o.y,a.y=i*o.x+s*o.y,e.copy(t),e.x+=a.x,e.y+=a.y,e.applyMatrix4(this.viewWorldMatrix)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),this.viewWorldMatrix.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),this.mvPosition.setFromMatrixPosition(this.modelViewMatrix),this.worldScale.copy(this.matrixScale).multiplyScalar(-this.mvPosition.z),this.transformVertex(this.vA.set(-.5,-.5,0),this.mvPosition,this.worldScale),this.transformVertex(this.vB.set(.5,-.5,0),this.mvPosition,this.worldScale),this.transformVertex(this.vC.set(.5,.5,0),this.mvPosition,this.worldScale);let n=e.ray.intersectTriangle(this.vA,this.vB,this.vC,!1,this.intersectPoint);if(n===null&&(this.transformVertex(this.vB.set(-.5,.5,0),this.mvPosition,this.worldScale),n=e.ray.intersectTriangle(this.vA,this.vC,this.vB,!1,this.intersectPoint),n===null))return;const o=e.ray.origin.distanceTo(this.intersectPoint);o<e.near||o>e.far||t.push({distance:o,point:this.intersectPoint.clone(),face:null,object:this})}}const Us=P({type:"css2D",object:!0,rule:ee,models:[te(r=>({type:"CSS2DPlane",config:so,shared:{getElement(e,t){const n=t.resourceManager.resourceMap;if(!n.has(e))return console.warn(`css2D compiler: can not found resource element: ${e}`),document.createElement("div");const o=n.get(e);return o instanceof HTMLElement?o:(console.warn("css2D compiler can not suport render this resource type.",o.constructor,e),document.createElement("div"))}},commands:{set:{element({model:e,target:t,value:n,engine:o}){t.element.innerHTML="",t.element.appendChild(e.getElement(n,o))}}},create({model:e,config:t,engine:n}){const o=new co(e.getElement(t.element,n));return r.create({model:e,target:o,config:t,filter:{element:!0},engine:n}),o},dispose({target:e}){r.dispose({target:e})}}))],lifeOrder:D.THREE}),mr=function(){return Object.assign(_(),{element:"",width:50,height:50})},uo=function(){return Object.assign(mr(),{})},go=function(){return Object.assign(mr(),{rotation2D:0})};class mo extends bn{constructor(e=document.createElement("div")){const t=document.createElement("div"),n=50,o=50;t.style.width=`${n}px`,t.style.height=`${o}px`,t.appendChild(e),super(t),this.geometry=new ne(n,o),this.geometry.computeBoundingBox(),this._width=n,this._height=o}get width(){return this._width}set width(e){this.geometry.dispose(),this.geometry=new ne(e,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${e}px`,this._width=e}get height(){return this._height}set height(e){this.geometry.dispose(),this.geometry=new ne(this._width,e),this.geometry.computeBoundingBox(),this.element.style.height=`${e}px`,this._height=e}}class ho extends mo{constructor(e=document.createElement("div")){super(e),this.cacheBox=new $e,this.type="CSS3DPlane",this.element.classList.add("vis-css3d","vis-css3d-plane")}raycast(e,t){const n=this.cacheBox.copy(this.geometry.boundingBox);n.applyMatrix4(this.matrixWorld),e.ray.intersectsBox(n)&&t.push({distance:e.ray.origin.distanceTo(this.position),object:this,point:this.position})}}const fo=te(r=>({type:"CSS3DPlane",config:uo,shared:{getElement(e,t){const n=t.resourceManager.resourceMap;if(!n.has(e))return console.warn(`css3D compiler: can not found resource element: ${e}`),document.createElement("div");const o=n.get(e);return o instanceof HTMLElement?o:(console.warn("css3D compiler can not suport render this resource type.",o.constructor,e),document.createElement("div"))}},commands:{set:{element({model:e,target:t,value:n,engine:o}){t.element.innerHTML="",t.element.appendChild(e.getElement(n,o))}}},create({model:e,config:t,engine:n}){const o=new ho(e.getElement(t.element,n));return r.create({model:e,target:o,config:t,filter:{element:!0},engine:n}),o},dispose({target:e}){r.dispose({target:e})}}));class po extends wn{constructor(e=document.createElement("div")){const t=document.createElement("div"),n=50,o=50;t.style.width=`${n}px`,t.style.height=`${o}px`,t.appendChild(e),e.classList.add("vis-css3d","vis-css3d-sprite"),super(t),this.cacheBox=new $e,this.cachePosition=new m,this.cacheQuaternion=new At,this.cacheScale=new m,this.cacheMatrix4=new W,this.rotateMatrix4=new W,this.geometry=new ne(n,o),this.geometry.computeBoundingBox(),this._width=n,this._height=o,this.type="CSS3DSprite"}get width(){return this._width}set width(e){this.geometry.dispose(),this.geometry=new ne(e,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${e}px`,this._width=e}get height(){return this._height}set height(e){this.geometry.dispose(),this.geometry=new ne(this._width,e),this.geometry.computeBoundingBox(),this.element.style.height=`${e}px`,this._height=e}raycast(e,t){const n=this.cacheBox.copy(this.geometry.boundingBox);this.matrixWorld.decompose(this.cachePosition,this.cacheQuaternion,this.cacheScale);const o=this.rotateMatrix4.lookAt(this.position,e.camera.position,this.up);this.cacheQuaternion.setFromRotationMatrix(o),this.cacheMatrix4.compose(this.cachePosition,this.cacheQuaternion,this.cacheScale),n.applyMatrix4(this.cacheMatrix4),e.ray.intersectsBox(n)&&t.push({distance:e.ray.origin.distanceTo(this.position),object:this,point:this.position})}}class vo extends po{constructor(e=document.createElement("div")){super(e),this.type="CSS3DSprite",this.element.classList.add("vis-css3d","vis-css3d-plane")}}const xo=te(r=>({type:"CSS3DSprite",config:go,shared:{getElement(e,t){const n=t.resourceManager.resourceMap;if(!n.has(e))return console.warn(`css3D compiler: can not found resource element: ${e}`),document.createElement("div");const o=n.get(e);return o instanceof HTMLElement?o:(console.warn("css3D compiler can not suport render this resource type.",o.constructor,e),document.createElement("div"))}},commands:{set:{element({model:e,target:t,value:n,engine:o}){t.element.innerHTML="",t.element.appendChild(e.getElement(n,o))}}},create({model:e,config:t,engine:n}){const o=new vo(e.getElement(t.element,n));return r.create({model:e,target:o,config:t,filter:{element:!0},engine:n}),o},dispose({target:e}){r.dispose({target:e})}})),Ws=P({type:"css3D",object:!0,rule:ee,models:[fo,xo],lifeOrder:D.THREE});class yo extends Me{constructor(e,t,n,o){super();const a=[],i=[],s=[],l=new m,u=new W;u.makeRotationFromEuler(n),u.setPosition(t);const c=new W;c.copy(u).invert(),M(),this.setAttribute("position",new be(a,3)),this.setAttribute("normal",new be(i,3)),this.setAttribute("uv",new be(s,2));function M(){let d=[];const v=new m,h=new m,b=e.geometry,p=b.attributes.position,R=b.attributes.normal;if(b.index!==null){const g=b.index;for(let y=0;y<g.count;y++)v.fromBufferAttribute(p,g.getX(y)),h.fromBufferAttribute(R,g.getX(y)),O(d,v,h)}else for(let g=0;g<p.count;g++)v.fromBufferAttribute(p,g),h.fromBufferAttribute(R,g),O(d,v,h);d=S(d,l.set(1,0,0)),d=S(d,l.set(-1,0,0)),d=S(d,l.set(0,1,0)),d=S(d,l.set(0,-1,0)),d=S(d,l.set(0,0,1)),d=S(d,l.set(0,0,-1));for(let g=0;g<d.length;g++){const y=d[g];s.push(.5+y.position.x/o.x,.5+y.position.y/o.y),y.position.applyMatrix4(u),a.push(y.position.x,y.position.y,y.position.z),i.push(y.normal.x,y.normal.y,y.normal.z)}}function O(d,v,h){v.applyMatrix4(e.matrixWorld),v.applyMatrix4(c),h.transformDirection(e.matrixWorld),d.push(new Vt(v.clone(),h.clone()))}function S(d,v){const h=[],b=.5*Math.abs(o.dot(v));for(let p=0;p<d.length;p+=3){let R=0,g,y,A,E;const L=d[p+0].position.dot(v)-b,Y=d[p+1].position.dot(v)-b,N=d[p+2].position.dot(v)-b,x=L>0,Q=Y>0,j=N>0;switch(R=(x?1:0)+(Q?1:0)+(j?1:0),R){case 0:{h.push(d[p]),h.push(d[p+1]),h.push(d[p+2]);break}case 1:{if(x&&(g=d[p+1],y=d[p+2],A=T(d[p],g,v,b),E=T(d[p],y,v,b)),Q){g=d[p],y=d[p+2],A=T(d[p+1],g,v,b),E=T(d[p+1],y,v,b),h.push(A),h.push(y.clone()),h.push(g.clone()),h.push(y.clone()),h.push(A.clone()),h.push(E);break}j&&(g=d[p],y=d[p+1],A=T(d[p+2],g,v,b),E=T(d[p+2],y,v,b)),h.push(g.clone()),h.push(y.clone()),h.push(A),h.push(E),h.push(A.clone()),h.push(y.clone());break}case 2:{x||(g=d[p].clone(),y=T(g,d[p+1],v,b),A=T(g,d[p+2],v,b),h.push(g),h.push(y),h.push(A)),Q||(g=d[p+1].clone(),y=T(g,d[p+2],v,b),A=T(g,d[p],v,b),h.push(g),h.push(y),h.push(A)),j||(g=d[p+2].clone(),y=T(g,d[p],v,b),A=T(g,d[p+1],v,b),h.push(g),h.push(y),h.push(A));break}}}return h}function T(d,v,h,b){const p=d.position.dot(h)-b,R=v.position.dot(h)-b,g=p/(p-R);return new Vt(new m(d.position.x+g*(v.position.x-d.position.x),d.position.y+g*(v.position.y-d.position.y),d.position.z+g*(v.position.z-d.position.z)),new m(d.normal.x+g*(v.normal.x-d.normal.x),d.normal.y+g*(v.normal.y-d.normal.y),d.normal.z+g*(v.normal.z-d.normal.z)))}}}class Vt{constructor(e,t){this.position=e,this.normal=t}clone(){return new this.constructor(this.position.clone(),this.normal.clone())}}const H=function(){return Object.assign(X(),{center:!0,position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},groups:[]})},bo=function(){return Object.assign(H(),{width:5,height:5,depth:5,widthSegments:1,heightSegments:1,depthSegments:1})},wo=function(){return Object.assign(H(),{radius:3,widthSegments:32,heightSegments:32,phiStart:0,phiLength:Math.PI*2,thetaStart:0,thetaLength:Math.PI})},Mo=function(){return Object.assign(H(),{width:5,height:5,widthSegments:1,heightSegments:1})},So=function(){return Object.assign(H(),{radius:3,segments:8,thetaStart:0,thetaLength:Math.PI*2})},To=function(){return Object.assign(H(),{radius:3,height:5,radialSegments:8,heightSegments:1,openEnded:!1,thetaStart:0,thetaLength:Math.PI*2})},Eo=function(){return Object.assign(H(),{radius:3,tube:.4,radialSegments:8,tubularSegments:6,arc:Math.PI*2})},Ao=function(){return Object.assign(H(),{innerRadius:2,outerRadius:3,thetaSegments:8,phiSegments:8,thetaStart:0,thetaLength:Math.PI*2})},Co=function(){return Object.assign(H(),{url:""})},Po=function(){return Object.assign(H(),{attribute:{position:[],color:[],index:[],normal:[],uv:[],uv2:[]}})},Oo=function(){return Object.assign(H(),{radiusTop:3,radiusBottom:3,height:5,radialSegments:8,heightSegments:1,openEnded:!1,thetaStart:0,thetaLength:Math.PI*2})},Do=function(){return Object.assign(H(),{target:"",thresholdAngle:1})},Dt=function(){return Object.assign(H(),{center:!1,path:[],divisions:36,space:!0})},Ro=function(){return Object.assign(Dt(),{center:!1})},Lo=function(){return Object.assign(Dt(),{center:!1})},jo=function(){return Object.assign(Dt(),{center:!1})},hr=function(){return Object.assign(H(),{center:!1,path:[],tubularSegments:64,radius:1,radialSegments:8,closed:!1})},zo=function(){return Object.assign(hr(),{center:!1})},Bo=function(){return Object.assign(hr(),{center:!1})},No=function(){return Object.assign(H(),{center:!1,path:"",tubularSegments:64,radius:1,radialSegments:8,closed:!1})},Fo=function(){return Object.assign(H(),{center:!1,shape:"",curveSegments:12})},Uo=function(){return Object.assign(H(),{center:!1,shapes:"",options:{curveSegments:12,steps:1,depth:1,bevelEnabled:!0,bevelThickness:.2,bevelSize:.1,bevelOffset:0,bevelSegments:3,extrudePath:"",UVGenerator:"default"}})},Wo=function(){return Object.assign(H(),{center:!1,path:"",space:!1,divisions:36})},Io=function(){return Object.assign(H(),{path:"",divisions:32,segments:12,phiStart:0,phiLength:Math.PI*2})},Ho=function(){return Object.assign(H(),{center:!1,target:{geometry:"",position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:0,y:0,z:0}},point:{x:0,y:0,z:0},orientation:{x:0,y:0,z:0},size:{x:0,y:0,z:0}})},ko=function(r,e){e.center&&r.center(),r.computeBoundingBox();const t=r.boundingBox,n=e.position,o=e.rotation,a=e.scale,i=new At().setFromEuler(new ht(o.x,o.y,o.z,"XYZ"));return r.applyQuaternion(i),r.scale(a.x,a.y,a.z),e.center&&r.center(),r.computeBoundingBox(),r.translate((t.max.x-t.min.x)/2*n.x,(t.max.y-t.min.y)/2*n.y,(t.max.z-t.min.z)/2*n.z),r},ut={reg:new RegExp(".*"),handler({config:r,target:e,model:t,engine:n,compiler:o}){const a=t.createPuppet({model:t,config:r,engine:n,compiler:o});e.copy(a),t.disposePuppet({model:t,target:a,puppet:a,config:r,engine:n,compiler:o})}},U=z.extend({commands:{add:{groups({target:r,value:e}){r.addGroup(e.start,e.count,e.materialIndex)},$reg:[ut]},set:{groups(r){const{path:e,target:t,config:n}=r;if(e[1]!==void 0){t.groups.splice(Number(r.path[1]),1);const o=n.groups[e[1]];t.addGroup(o.start,o.count,o.materialIndex)}else console.warn("geometry processor can not set group",r)},$reg:[ut]},delete:{groups({target:r,key:e}){r.groups.splice(Number(e),1)},$reg:[ut]}},create(r,e){r.clearGroups();for(const t of e.groups)r.addGroup(t.start,t.count,t.materialIndex);return ko(r,e)},dispose(r){r.dispose()}}),Go=U(r=>({type:"BoxGeometry",config:bo,create({config:e}){return r.create(new _e(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments),e)},dispose({target:e}){r.dispose(e)}})),Vo=U(r=>({type:"CircleGeometry",config:So,create({config:e}){return r.create(new Br(e.radius,e.segments,e.thetaStart,e.thetaLength),e)},dispose({target:e}){r.dispose(e)}})),F=function(r){return r>1?1:r<0?0:r},Xo={generateTopUV(r,e,t,n,o){const a=e[t*3],i=e[t*3+1],s=e[n*3],l=e[n*3+1],u=e[o*3],c=e[o*3+1];return[new f(F(a),F(i)),new f(F(s),F(l)),new f(F(u),F(c))]},generateSideWallUV(r,e,t,n,o,a){const i=e[t*3],s=e[t*3+1],l=e[t*3+2],u=e[n*3],c=e[n*3+1],M=e[n*3+2],O=e[o*3],S=e[o*3+1],T=e[o*3+2],d=e[a*3],v=e[a*3+1],h=e[a*3+2];return Math.abs(s-c)<Math.abs(i-u)?[new f(F(i),F(1-l)),new f(F(u),F(1-M)),new f(F(O),F(1-T)),new f(F(d),F(1-h))]:[new f(F(s),F(1-l)),new f(F(c),F(1-M)),new f(F(S),F(1-T)),new f(F(v),F(1-h))]}},Yo={default:void 0,cover:Xo};class qo extends Me{constructor(e){super(),this.type="LoadBufferGeometry",e&&this.copy(e)}}class Rt extends Me{constructor(e=[],t=36,n=!0){super(),this.type="CurveGeometry",this.parameters={path:e.map(o=>o.clone()),space:n,divisions:t}}}class Zo extends Rt{constructor(e=[],t=36,n=!0){super(e,t,n),this.type="CubicBezierCurveGeometry";const o=new et;if(e.length<4){console.warn("CubicBezierCurveGeometry path length at least 4.");return}const a=4+(e.length-4)-(e.length-4)%3;for(let s=2;s<a;s+=3)o.add(new nr(e[s-2],e[s-1],e[s],e[s+1]));const i=o.curves.reduce((s,l)=>s+=l.arcLengthDivisions,0);if(t>i){const s=Math.ceil((t-i)/o.curves.length);o.curves.forEach(l=>{l.arcLengthDivisions=l.arcLengthDivisions*(s+1),l.updateArcLengths()})}this.setFromPoints(n?o.getSpacedPoints(t):o.getPoints(t))}}class Ko extends Rt{constructor(e=[],t=36,n=!0){super(e,t,n),this.type="QuadraticBezierCurveGeometry";const o=new et;if(e.length<3){console.warn("QuadraticBezierCurveGeometry path length at least 3.");return}const a=3+(e.length-3)-(e.length-3)%2;for(let s=1;s<a;s+=2)o.add(new or(e[s-1],e[s],e[s+1]));const i=o.curves.reduce((s,l)=>s+=l.arcLengthDivisions,0);if(t>i){const s=Math.ceil((t-i)/o.curves.length);o.curves.forEach(l=>{l.arcLengthDivisions=l.arcLengthDivisions*(s+1),l.updateArcLengths()})}this.setFromPoints(n?o.getSpacedPoints(t):o.getPoints(t))}}class Qo extends Rt{constructor(e=[],t=36,n=!0){if(super(e,t,n),this.type="SplineCurveGeometry",!e.length){console.warn("SplineCurveGeometry path length at least 1.");return}const o=new rr(e);this.setFromPoints(n?o.getSpacedPoints(t):o.getPoints(t))}}class Jo extends Ct{constructor(e=[],t=64,n=1,o=8,a=!1){if(!e.length){console.warn("LineTubeGeometry path length at least 1.");return}const i=new et;for(let s=1;s<e.length;s+=1)i.add(new tr(e[s-1],e[s]));super(i,t,n,o,a),this.type="LineTubeGeometry"}}class $o extends Ct{constructor(e=[],t=64,n=1,o=8,a=!1){if(!e.length){console.warn("SplineTubeGeometry path length at least 1.");return}const i=new rr(e);super(i,t,n,o,a),this.type="SplineTubeGeometry"}}class _o extends Ct{constructor(e=new Pt,t=64,n=1,o=8,a=!1){super(e,t,n,o,a),this.type="PathTubeGeometry"}}class ea extends Me{constructor(e=new Pt,t=36,n=!0){super(),this.type="PathGeometry",this.parameters={path:e,space:n,divisions:t},e.curves.length&&this.setFromPoints(n?e.getSpacedPoints(t):e.getPoints(t))}}const ta=U(r=>({type:"CubicBezierCurveGeometry",config:Lo,create({config:e}){return r.create(new Zo(e.path.map(t=>new m(t.x,t.y,t.z)),e.divisions,e.space),e)},dispose({target:e}){r.dispose(e)}})),ra=U(r=>({type:"CustomGeometry",config:Po,shared:{generateGeometry(e){const t=new Me;return e.position.length&&t.setAttribute("position",new be(e.position,3)),e.color.length&&t.setAttribute("color",new be(e.color,3)),e.normal.length&&t.setAttribute("normal",new be(e.normal,3)),e.uv.length&&t.setAttribute("uv",new be(e.uv,2)),e.uv2.length&&t.setAttribute("uv2",new be(e.uv2,2)),e.index.length&&t.setIndex(e.index),t}},create({model:e,config:t}){return r.create(e.generateGeometry(t.attribute),t)},dispose({target:e}){r.dispose(e)}})),na=U(r=>({type:"EdgesGeometry",config:Do,shared:{occupyGeometry:new Nt(new _e(5,5,5))},create({model:e,config:t,engine:n}){const o=n.compilerManager.getObjectFromModule(C.GEOMETRY,t.target);return!o||!(o instanceof Me)?(console.error(`engine rescoure can not found url: ${t.target}`),e.occupyGeometry):r.create(new Nt(o,t.thresholdAngle),t)},dispose({target:e}){r.dispose(e)}})),oa=U(r=>({type:"ExtrudeGeometry",config:Uo,context({model:e}){return{shapeEvent:void 0,pathEvent:void 0}},create({model:e,config:t,engine:n}){var o,a;const i=n.compilerManager.getObjectFromModule(C.SHAPE,t.shapes)||void 0,s=n.compilerManager.getObjectFromModule(C.PATH,t.options.extrudePath)||void 0,l=new Ur(i,Object.assign({},t.options,{extrudePath:s,UVGenerator:Yo[t.options.UVGenerator||"default"]}));return i&&(e.shapeEvent=()=>{t.shapes=t.shapes},(o=e.toModel(t.shapes))==null||o.on(w.COMPILED_UPDATE,e.shapeEvent)),s&&(e.pathEvent=()=>{t.options.extrudePath=t.options.extrudePath},(a=e.toModel(t.options.extrudePath))==null||a.on(w.COMPILED_UPDATE,e.pathEvent)),r.create(l,t)},dispose({model:e,config:t,target:n}){var o,a;e.shapeEvent&&((o=e.toModel(t.shapes))==null||o.off(w.COMPILED_UPDATE,e.shapeEvent)),e.pathEvent&&((a=e.toModel(t.options.extrudePath))==null||a.off(w.COMPILED_UPDATE,e.pathEvent)),r.dispose(n)}})),aa=U(r=>({type:"LatheGeometry",config:Io,context({model:e}){return{pathEvent:void 0}},create({model:e,config:t,engine:n}){var o;const a=n.compilerManager.getObjectFromModule(C.PATH,t.path)||void 0,i=new Wr(a?a.getPoints(t.divisions):void 0,t.segments,t.phiStart,t.phiLength);return a&&(e.pathEvent=()=>{t.path=t.path},(o=e.toModel(t.path))==null||o.on(w.COMPILED_UPDATE,e.pathEvent)),r.create(i,t)},dispose({model:e,config:t,target:n}){var o;e.pathEvent&&((o=e.toModel(t.path))==null||o.off(w.COMPILED_UPDATE,e.pathEvent)),r.dispose(n)}})),ia=U(r=>({type:"LineTubeGeometry",config:zo,create({config:e}){return r.create(new Jo(e.path.map(t=>new m(t.x,t.y,t.z)),e.tubularSegments,e.radius,e.radialSegments,e.closed),e)},dispose({target:e}){r.dispose(e)}})),sa=U(r=>({type:"LoadGeometry",config:Co,create({config:e,engine:t}){const n=t.resourceManager.resourceMap.get(e.url);return!n&&!(n instanceof Me)?(console.error(`engine rescoure can not found url: ${e.url}`),new _e(5,5,5)):r.create(new qo(n),e)},dispose({target:e}){r.dispose(e)}})),la=U(r=>({type:"PathGeometry",config:Wo,create({model:e,config:t,engine:n}){var o;const a=n.compilerManager.getObjectFromModule(C.PATH,t.path)||void 0,i=new ea(a,t.divisions,t.space);return a&&(e.pathEvent&&(e.cachePathEvent=e.pathEvent),e.pathEvent=()=>{t.path=t.path},(o=e.toModel(t.path))==null||o.on(w.COMPILED_UPDATE,e.pathEvent)),r.create(i,t)},dispose({model:e,config:t,target:n}){var o;e.pathEvent&&((o=e.toModel(t.path))==null||o.off(w.COMPILED_UPDATE,e.pathEvent),e.cachePathEvent&&(e.pathEvent=e.cachePathEvent,e.cachePathEvent=void 0)),r.dispose(n)}})),ca=U(r=>({type:"PathTubeGeometry",config:No,context(){return{pathEvent:void 0,restrictor:0}},create({model:e,config:t,engine:n}){var o;const a=n.compilerManager.getObjectFromModule(C.PATH,t.path)||void 0,i=new _o(a,t.tubularSegments,t.radius,t.radialSegments,t.closed);return a&&(e.pathEvent=()=>{e.restrictor||(e.restrictor=window.setTimeout(()=>{t.path=t.path,e.restrictor=0},1e3/30))},(o=e.toModel(t.path))==null||o.on(w.COMPILED_UPDATE,e.pathEvent)),r.create(i,t)},dispose({model:e,config:t,target:n}){var o;window.clearTimeout(e.restrictor),e.pathEvent&&((o=e.toModel(t.path))==null||o.off(w.COMPILED_UPDATE,e.pathEvent)),r.dispose(n)}})),ua=U(r=>({type:"PlaneGeometry",config:Mo,create({config:e}){return r.create(new ne(e.width,e.height,e.widthSegments,e.heightSegments),e)},dispose({target:e}){r.dispose(e)}})),da=U(r=>({type:"QuadraticBezierCurveGeometry",config:jo,create({config:e}){return r.create(new Ko(e.path.map(t=>new m(t.x,t.y,t.z)),e.divisions,e.space),e)},dispose({target:e}){r.dispose(e)}})),ga=U(r=>({type:"RingGeometry",config:Ao,create({config:e}){return r.create(new Ir(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength),e)},dispose({target:e}){r.dispose(e)}})),ma=U(r=>({type:"ShapeGeometry",config:Fo,create({model:e,config:t,engine:n}){var o;const a=n.compilerManager.getObjectFromModule(C.SHAPE,t.shape)||void 0,i=new Nr(a,t.curveSegments);return a&&(e.shapeEvent&&(e.cacheShapeEvent=e.shapeEvent),e.shapeEvent=()=>{t.shape=t.shape},(o=e.toModel(t.shape))==null||o.on(w.COMPILED_UPDATE,e.shapeEvent)),r.create(i,t)},dispose({model:e,config:t,target:n}){var o;e.shapeEvent&&((o=e.toModel(t.shape))==null||o.off(w.COMPILED_UPDATE,e.shapeEvent),e.cacheShapeEvent&&(e.shapeEvent=e.cacheShapeEvent,e.cacheShapeEvent=void 0)),r.dispose(n)}})),ha=U(r=>({type:"SplineCurveGeometry",config:Ro,create({config:e}){return r.create(new Qo(e.path.map(t=>new m(t.x,t.y,t.z)),e.divisions,e.space),e)},dispose({target:e}){r.dispose(e)}})),fa=U(r=>({type:"TorusGeometry",config:Eo,create({config:e}){return r.create(new Hr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc),e)},dispose({target:e}){r.dispose(e)}})),pa=U(r=>({type:"SphereGeometry",config:wo,create({config:e}){return r.create(new kr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength),e)},dispose({target:e}){r.dispose(e)}})),va=U(r=>({type:"DecalGeometry",config:Ho,shared:{tempGeometry:new Me,tempMesh:new Pe},create({model:e,config:t,engine:n}){const o=t.target.geometry&&n.getObjectBySymbol(t.target.geometry)||e.tempGeometry;return e.tempMesh.geometry=o,e.tempMesh.matrixWorld.compose(new m(t.target.position.x,t.target.position.y,t.target.position.z),new At().setFromEuler(new ht(t.target.rotation.x,t.target.rotation.y,t.target.rotation.z)),new m(t.target.scale.x,t.target.scale.y,t.target.scale.z)),r.create(new yo(e.tempMesh,new m(t.point.x,t.point.y,t.point.z),new ht(t.orientation.x,t.orientation.y,t.orientation.z),new m(t.size.x,t.size.y,t.size.z)),t)},dispose({target:e}){r.dispose(e)}})),xa=U(r=>({type:"SplineTubeGeometry",config:Bo,create({config:e}){return r.create(new $o(e.path.map(t=>new m(t.x,t.y,t.z)),e.tubularSegments,e.radius,e.radialSegments,e.closed),e)},dispose({target:e}){r.dispose(e)}})),ya=U(r=>({type:"ConeGeometry",config:To,create({config:e}){return r.create(new Gr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength),e)},dispose({target:e}){r.dispose(e)}})),ba=U(r=>({type:"CylinderGeometry",config:Oo,create({config:e}){return r.create(new Vr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength),e)},dispose({target:e}){r.dispose(e)}})),Is=P({type:"geometry",models:[Go,Vo,ta,ra,ya,ba,va,na,oa,aa,ia,sa,la,ca,ua,da,ga,ma,pa,ha,xa,fa],lifeOrder:D.TWO}),wa=function(){return Object.assign(_(),{children:[]})},Hs=P({type:"group",object:!0,rule:ee,models:[te(r=>({type:"Group",config:wa,create({model:e,config:t,engine:n}){const o=new Xr;return r.create({model:e,target:o,config:t,filter:{},engine:n}),o},dispose({target:e}){r.dispose({target:e})}}))],lifeOrder:D.THREE}),Lt=function(){return Object.assign(_(),{type:"Light",color:"rgb(255, 255, 255)",intensity:1})},jt=function(r){return Object.assign(Lt(),{shadow:{bias:0,normalBias:0,radius:1,mapSize:{x:512,y:512},camera:r}})},Ma=function(){return Object.assign(_(),{color:"rgb(255, 255, 255)",intensity:1})},Sa=function(){return Object.assign(jt({fov:90,aspect:1,near:.5,far:500}),{distance:30,decay:.01})},Ta=function(){return Object.assign(jt({fov:50,aspect:1,near:.5,far:500}),{distance:30,angle:Math.PI/180*45,penumbra:.01,decay:.01})},Ea=function(){return Object.assign(jt({near:.5,far:500,top:window.innerHeight,bottom:-window.innerHeight,left:-window.innerWidth,right:window.innerWidth}),{})},Aa=function(){return Object.assign(Lt(),{color:"rgb(255, 255, 255)",groundColor:"rgb(0, 0, 0)"})},Ca=function(){return Object.assign(Lt(),{width:10,height:10})},De=te.extend(r=>({shared:{cacheMapSize:new f,cacheViewportSize:new f,updateShadowSize(e,t,n){const o=this.cacheMapSize,a=this.cacheViewportSize,i=e.shadow;e.shadow.mapSize.set(t.shadow.mapSize.x,t.shadow.mapSize.y),o.copy(i.mapSize);const s=i.getFrameExtents();o.multiply(s),a.copy(i.mapSize),(o.x>n||o.y>n)&&(o.x>n&&(a.x=Math.floor(n/s.x),o.x=a.x*s.x,i.mapSize.x=a.x),o.y>n&&(a.y=Math.floor(n/s.y),o.y=a.y*s.y,i.mapSize.y=a.y)),e.shadow.map.setSize(o.x,o.y)}},context(){return{cacheColor:new B}},commands:{set:{color({model:e,target:t,value:n}){t.color.copy(e.cacheColor.set(n))},scale:Ye,rotation:Ye,lookAt:Ye,shadow:{mapSize({model:e,target:t,config:n,engine:o,key:a,value:i}){t.shadow.mapSize[a]=i,e.updateShadowSize(t,n,o.webGLRenderer.capabilities.maxTextureSize)},camera({target:e,key:t,value:n}){e.shadow.camera[t]=n,e.shadow.camera.updateProjectionMatrix()}}}},create({model:e,light:t,config:n,filter:o,engine:a,shadow:i}){if(t.color.copy(e.cacheColor.set(n.color)),i){const s=n,l=()=>{t.shadow.map&&(e.updateShadowSize(t,s,a.webGLRenderer.capabilities.maxTextureSize),a.renderManager.removeEventListener(Z.RENDER,l))};if(a.renderManager.addEventListener(Z.RENDER,l),s.shadow){for(const u in s.shadow.camera)t.shadow.camera[u]=s.shadow.camera[u];t.shadow.camera.updateProjectionMatrix()}}r.create({model:e,target:t,config:n,filter:{color:!0,scale:!0,rotation:!0,lookAt:!0,shadow:{mapSize:!0,camera:!0},...o},engine:a})},dispose(e){r.dispose(e)}})),Pa=De(r=>({type:"AmbientLight",config:Ma,create({model:e,config:t,engine:n}){const o=new Yr;return r.create({model:e,light:o,config:t,filter:{},engine:n,shadow:!1}),o},dispose({target:e}){r.dispose(e)}})),Oa=De(r=>({type:"DirectionalLight",config:Ea,create({model:e,config:t,engine:n}){const o=new qr;return r.create({model:e,light:o,config:t,filter:{},engine:n,shadow:!0}),o},dispose({target:e}){r.dispose(e)}})),Da=De(r=>({type:"HemisphereLight",config:Aa,shared:{cacheColor:new B},commands:{set:{groundColor({model:e,target:t,value:n}){t.groundColor.copy(e.cacheColor.set(n))}}},create({model:e,config:t,engine:n}){const o=new Zr;return o.groundColor.copy(e.cacheColor.set(t.groundColor)),r.create({model:e,light:o,config:t,filter:{groundColor:!0},engine:n,shadow:!1}),o},dispose({target:e}){r.dispose(e)}})),Ra=De(r=>({type:"PointLight",config:Sa,create({model:e,config:t,engine:n}){const o=new Kr;return r.create({model:e,light:o,config:t,filter:{},engine:n,shadow:!0}),o},dispose({target:e}){r.dispose(e)}})),La=De(r=>({type:"RectAreaLight",config:Ca,commands:{set:{rotation:void 0}},create({model:e,config:t,engine:n}){const o=new Qr;return o.rotation.set(t.rotation.x,t.rotation.y,t.rotation.z),o.updateMatrixWorld(),r.create({model:e,light:o,config:t,filter:{},engine:n,shadow:!0}),o},dispose({target:e}){r.dispose(e)}})),ja=De(r=>({type:"SpotLight",config:Ta,create({model:e,config:t,engine:n}){const o=new Jr;return r.create({model:e,light:o,config:t,filter:{},engine:n,shadow:!0}),o},dispose({target:e}){r.dispose(e)}})),ks=P({type:"light",object:!0,models:[Pa,Oa,Da,Ra,La,ja],lifeOrder:D.THREE}),We=function(){return Object.assign(_(),{material:"",geometry:""})},Xt=function({model:r,target:e,value:t,engine:n}){r.toAsync(o=>{const a=n.compilerManager.getObjectFromModule(C.GEOMETRY,t);return a?(e.geometry=a,!0):(o&&console.warn(`can not found geometry by vid in engine: ${t}`),e.geometry=r.replaceGeometry,!1)})},Xe=function({model:r,target:e,config:t,engine:n}){r.toAsync(o=>{let a;return typeof t.material=="string"?a=n.compilerManager.getObjectFromModule(C.MATERIAL,t.material)||r.replaceMaterial:a=t.material.map(i=>n.compilerManager.getObjectFromModule(C.MATERIAL,i)||r.replaceMaterial),e.material=a,!(Array.isArray(a)&&a.length&&a[0]===r.replaceMaterial||a===r.replaceMaterial)})},Re=te.extend(r=>({shared:{replaceMaterial:new I({fragmentShader:`
      void main () {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
      `}),replaceGeometry:new _e(10,10,10)},commands:{add:{material:Xe},set:{geometry:Xt,material:Xe},delete:{material:Xe}},create({model:e,target:t,config:n,filter:o,engine:a}){o.geometry||(t.geometry.dispose(),Xt.call(e,{model:e,target:t,value:n.geometry,engine:a})),o.material||Xe.call(e,{model:e,target:t,config:n,engine:a}),r.create({model:e,target:t,config:n,filter:{material:!0,geometry:!0,...o},engine:a})},dispose({target:e}){r.dispose({target:e})}})),fr=function(){return Object.assign(We(),{geometry:"",material:"",dashed:!1})},za=function(){return fr()},Ba=Re(r=>({type:"Line",config:fr,context({model:e}){return{dashedLineEvent:()=>{e.puppet.computeLineDistances()}}},commands:{set:{dashed({model:e,config:t,target:n,value:o}){var a,i;if(n.material instanceof Ne&&o){(a=e.toModel(t.geometry))==null||a.on(w.COMPILED_UPDATE,e.dashedLineEvent),e.dashedLineEvent();return}o||(i=e.toModel(t.geometry))==null||i.off(w.COMPILED_UPDATE,e.dashedLineEvent)}}},create({model:e,config:t,engine:n}){var o;const a=new $t;return r.create({model:e,target:a,engine:n,config:t,filter:{dashed:!0}}),a.material instanceof Ne&&t.dashed&&((o=e.toModel(t.geometry))==null||o.on(w.COMPILED_UPDATE,e.dashedLineEvent),e.dashedLineEvent()),a},dispose({target:e}){r.dispose({target:e})}})),Na=Re(r=>({type:"LineSegments",config:za,context({model:e}){return{dashedLineEvent:()=>{e.puppet.computeLineDistances()}}},commands:{set:{dashed({model:e,config:t,target:n,value:o}){var a,i;if(n.material instanceof Ne&&o){(a=e.toModel(t.geometry))==null||a.on(w.COMPILED_UPDATE,e.dashedLineEvent),e.dashedLineEvent();return}o||(i=e.toModel(t.geometry))==null||i.off(w.COMPILED_UPDATE,e.dashedLineEvent)}}},create({model:e,config:t,engine:n}){var o;const a=new $r;return r.create({model:e,target:a,engine:n,config:t,filter:{dashed:!0}}),a.material instanceof Ne&&t.dashed&&((o=e.toModel(t.geometry))==null||o.on(w.COMPILED_UPDATE,e.dashedLineEvent),e.dashedLineEvent()),a},dispose({target:e}){r.dispose({target:e})}})),Gs=P({type:"line",object:!0,rule:ee,models:[Ba,Na],lifeOrder:D.THREE}),Se=function(){return Object.assign(X(),{type:"Material",alphaTest:0,colorWrite:!0,depthTest:!0,depthWrite:!0,name:"",needsUpdate:!1,opacity:1,dithering:!1,shadowSide:null,side:ir,toneMapped:!0,transparent:!1,visible:!0,blendDst:gt,blendDstAlpha:null,blendEquation:mt,blendEquationAlpha:null,blending:qe,blendSrc:dt,blendSrcAlpha:null,polygonOffset:!1,polygonOffsetFactor:0,polygonOffsetUnits:0})},Fa=function(){return Object.assign(Se(),{color:"rgb(255, 255, 255)",combine:ar,aoMapIntensity:1,fog:!0,lightMapIntensity:1,reflectivity:1,refractionRatio:.98,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",wireframeLinewidth:1,map:"",envMap:"",alphaMap:"",aoMap:"",lightMap:"",specularMap:""})},pr=function(){return Object.assign(Se(),{aoMapIntensity:1,bumpScale:1,color:"rgb(255, 255, 255)",displacementScale:1,displacementBias:0,emissive:"rgb(0, 0, 0)",emissiveIntensity:1,envMapIntensity:1,flatShading:!1,lightMapIntensity:1,metalness:0,normalMapType:Ot,refractionRatio:.98,roughness:1,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",roughnessMap:"",normalMap:"",metalnessMap:"",map:"",lightMap:"",envMap:"",emissiveMap:"",displacementMap:"",bumpMap:"",alphaMap:"",aoMap:""})},Ua=function(){return Object.assign(pr(),{attenuationColor:"rgb(255, 255, 255)",attenuationDistance:0,clearcoat:0,clearcoatNormalScale:{x:1,y:1},clearcoatRoughness:0,ior:1.5,reflectivity:.5,sheen:0,sheenRoughness:1,sheenColor:"rgb(255, 255, 255)",specularIntensity:0,specularColor:"rgb(255, 255, 255)",thickness:0,transmission:0,clearcoatMap:"",clearcoatNormalMap:"",clearcoatRoughnessMap:"",sheenRoughnessMap:"",sheenColorMap:"",specularIntensityMap:"",specularColorMap:"",thicknessMap:"",transmissionMap:""})},Wa=function(){return Object.assign(Se(),{aoMapIntensity:1,bumpScale:1,color:"rgb(255, 255, 255)",displacementScale:1,displacementBias:0,emissive:"rgb(0, 0, 0)",emissiveIntensity:1,envMapIntensity:1,flatShading:!1,lightMapIntensity:1,normalMapType:Ot,refractionRatio:.98,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",specular:"rgb(17, 17, 17)",shininess:30,combine:ar,normalMap:"",map:"",lightMap:"",envMap:"",emissiveMap:"",displacementMap:"",bumpMap:"",alphaMap:"",aoMap:"",specularMap:""})},Ia=function(){return Object.assign(Se(),{color:"rgb(255, 255, 255)",rotation:0,map:"",alphaMap:"",sizeAttenuation:!0})},vr=function(){return Object.assign(Se(),{color:"rgb(255, 255, 255)",linecap:"round",linejoin:"round",linewidth:1})},Ha=function(){return Object.assign(vr(),{dashSize:3,gapSize:1,scale:1})},ka=function(){return Object.assign(Se(),{map:"",alphaMap:"",color:"rgb(255, 255, 255)",sizeAttenuation:!0,size:1})},Ga=function(){return Object.assign(Se(),{shader:"",uniforms:{}})},Va=function(){return Object.assign(Se(),{color:"rgb(255, 255, 255)",bumpScale:1,displacementScale:1,displacementBias:0,flatShading:!1,fog:!0,normalMapType:Ot,normalSale:{x:1,y:1},map:"",alphaMap:"",bumpMap:"",displacementMap:"",matcap:"",normalMap:""})},Xa={reg:new RegExp("transparent|sizeAttenuation"),handler({target:r,key:e,value:t}){r[e]=t,r.needsUpdate=!0}},zt=function({model:r,target:e,key:t,value:n,engine:o}){r.toAsync(a=>{if(!n)return e[t]=null,e.needsUpdate=!0,!0;const i=o.compilerManager.getObjectFromModule(C.TEXTURE,n);return i instanceof le?(e[t]=i,e.needsUpdate=!0,!0):(a&&console.warn(`this url resource is not instance of Texture: ${t}`,n,i),e[t]=null,!1)})},Ya=function(){return zt},qa={reg:new RegExp("map$","i"),handler:zt},Za=function({model:r,target:e,key:t,value:n}){e[t].copy(r.cacheColor.set(n))},K=function(){return Za},ue=z.extend({shared:{cacheColor:new B},commands:{set:{$reg:[qa,Xa]}},create({model:r,target:e,config:t,engine:n}){const o={};for(const a of Object.keys(t))a.toLocaleLowerCase().endsWith("map")&&t[a]?(zt.call(r,{model:r,target:e,key:a,value:t[a],engine:n}),o[a]=!0):e[a]instanceof B&&(e[a]=new B(t[a]),o[a]=!0);return ce(t,e,o),e.needsUpdate=!0,e},dispose({target:r}){r.dispose()}}),Ka=ue(r=>({type:"LineBasicMaterial",config:vr,commands:{set:{color:K()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new Qt,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),Qa=ue(r=>({type:"LineDashedMaterial",config:Ha,commands:{set:{color:K()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new Ne,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),Ja=ue(r=>({type:"MeshBasicMaterial",config:Fa,commands:{set:{color:K()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new Be,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),$a=ue(r=>({type:"MeshMatcapMaterial",config:Va,commands:{set:{color:K(),matcap:Ya()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new _r,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),_a=ue(r=>({type:"MeshPhongMaterial",config:Wa,commands:{set:{color:K(),emissive:K(),specular:K()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new en,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),ei=ue(r=>({type:"MeshPhysicalMaterial",config:Ua,commands:{set:{color:K(),emissive:K(),specularColor:K(),sheenColor:K(),attenuationColor:K()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new tn,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),ti=ue(r=>({type:"MeshStandardMaterial",config:pr,commands:{set:{color:K(),emissive:K()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new rn,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),ri=ue(r=>({type:"PointsMaterial",config:ka,commands:{set:{color:K()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new Jt,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),Le=class Ae{static getShader(e){return Ae.library.has(e)?Ae.cloneShader(Ae.library.get(e)):(console.warn(`con not found shader in shader library: ${e}`),null)}static generateConfig(e,t){if(!Ae.library.has(e))return console.warn(`con not found shader in shader library: ${e}`),{shader:e,uniforms:{}};const n=Ae.library.get(e),o={shader:e,uniforms:{}};if(n.uniforms&&(o.uniforms=JSON.parse(JSON.stringify(n.uniforms))),t){const a=(i,s)=>{for(const l in s)i[l]!==void 0&&(typeof s[l]=="object"&&s[l]!==null&&!Array.isArray(s[l])?(i[l]===null&&(i[l]={...s[l]}),a(i[l],s[l])):i[l]=s[l])};a(o.uniforms,t)}return o}static cloneShader(e){const t={name:e.name};return e.vertexShader&&(t.vertexShader=e.vertexShader),e.fragmentShader&&(t.fragmentShader=e.fragmentShader),e.uniforms&&(t.uniforms=JSON.parse(JSON.stringify(e.uniforms))),t}};Le.library=new Map,Le.register=function(r){Le.library.has(r.name)&&console.warn(`shader library has exist shader: ${r.name} that will be cover.`),Le.library.set(r.name,r)};let Yt=Le;const ni=ue(r=>({type:"ShaderMaterial",config:Ga,shared:{defaultVertexShader:`
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,defaultFragmentShader:`
    void main () {
      gl_FragColor = vec4(0.8,0.8,0.8,1.0);
    }`},commands:{set:{shader({model:e,target:t,value:n}){if(t.vertexShader=e.defaultVertexShader,t.fragmentShader=e.defaultFragmentShader,n){const o=Yt.getShader(n);o!=null&&o.vertexShader&&(t.vertexShader=o.vertexShader),o!=null&&o.fragmentShader&&(t.fragmentShader=o.fragmentShader),o!=null&&o.uniforms&&(t.uniforms=o.uniforms),o!=null&&o.defines&&(t.defines=o.defines)}t.needsUpdate=!0}}},create({model:e,config:t,engine:n}){const o=new I;if(o.vertexShader=e.defaultVertexShader,o.fragmentShader=e.defaultFragmentShader,t.shader){const a=Yt.getShader(t.shader);a!=null&&a.vertexShader&&(o.vertexShader=a.vertexShader),a!=null&&a.fragmentShader&&(o.fragmentShader=a.fragmentShader),a!=null&&a.uniforms&&(o.uniforms=a.uniforms),a!=null&&a.defines&&(o.defines=a.defines)}return ce(t,o,{type:!0,shader:!0}),o.needsUpdate=!0,o},dispose({target:e}){r.dispose({target:e})}})),oi=ue(r=>({type:"SpriteMaterial",config:Ia,commands:{set:{color:K()}},create({model:e,config:t,engine:n}){return r.create({model:e,target:new je,config:t,engine:n})},dispose({target:e}){r.dispose({target:e})}})),Vs=P({type:"material",models:[Ka,Qa,Ja,$a,_a,ei,ti,ri,ni,oi],lifeOrder:D.TWO}),ai=function(){return Object.assign(We(),{geometry:"",material:"",morphTargetInfluences:[],morphTargetDictionary:{}})},Xs=P({type:"mesh",object:!0,models:[Re(r=>({type:"Mesh",config:ai,create({model:e,config:t,engine:n}){const o=new Pe;return o.morphTargetInfluences=JSON.parse(JSON.stringify(t.morphTargetInfluences)),o.morphTargetDictionary=JSON.parse(JSON.stringify(t.morphTargetDictionary)),r.create({model:e,config:t,engine:n,target:o,filter:{morphTargetInfluences:!0,morphTargetDictionary:!0}}),o},dispose({target:e}){r.dispose({target:e})}}))],rule:ee,lifeOrder:D.THREE});class ii extends yt{constructor(e){super(e),this.cacheRenderFun=new Map,this.sourceModifiers=new Map}integrateModifer(e){this.sourceModifiers.has(e.source)||this.sourceModifiers.set(e.source,[]);const t=this.sourceModifiers.get(e.source);t.includes(e)||t.push(e)}chainRender(e){if(!this.sourceModifiers.has(e.source)){console.error(`${this.MODULE} compiler can not found modifier list`,e);return}const t=this.sourceModifiers.get(e.source);t.includes(e)||console.error(`${this.MODULE} compiler: can not found this modifier in source list`,e);const n=t.slice(t.indexOf(e)+1,t.length);for(const o of n)o.render()}}const si=function(){return Object.assign(X(),{name:"",visible:!0,source:"",index:0})},li=function(){return Object.assign(si(),{target:"",mode:"subtract"})},ci=z({type:"BooleanModifier",config:li,shared:{modifyKey:["position.x","position.y","position.z","rotation.x","rotation.y","rotation.z","scale.x","scale.y","scale.z","parent"]},context(){return{renderFun:()=>{},cacheTarget:""}},commands:{set:{source:()=>{},target:({model:r,target:e,config:t,engine:n})=>{r.toAsync(o=>{var a,i;if(t.target){const s=n.compilerManager.getObjectBySymbol(t.target);if(!s)return o&&console.warn(`Boolean modifier processor can not found object by vid: ${t.target}`),!1;if(e.target=s,r.cacheTarget){const c=r.toModel(r.cacheTarget);for(const O of r.modifyKey)c==null||c.off(`${w.COMPILED_ATTR}:${O}`,r.renderFun);const M=r.toConfig(r.cacheTarget);M&&M.geometry&&((a=r.toModel(M.geometry))==null||a.off(w.COMPILED_UPDATE,r.renderFun))}const l=r.toModel(t.target);for(const c of r.modifyKey)l==null||l.on(`${w.COMPILED_ATTR}:${c}`,r.renderFun);const u=r.toConfig(t.target);return u&&u.geometry&&((i=r.toModel(u.geometry))==null||i.on(w.COMPILED_UPDATE,r.renderFun)),r.cacheTarget=t.target,r.renderFun(),!0}return!0})},$reg:[{reg:new RegExp(".*"),handler({model:r,value:e,key:t,target:n}){n[t]=e,r.renderFun()}}]}},create({model:r,config:e,engine:t,compiler:n}){const o=new Mn({mode:e.mode});return r.renderFun=()=>{o.render(),n.chainRender(o)},r.toAsync(a=>{var i;if(e.source){const s=t.compilerManager.getObjectBySymbol(e.source);if(!s)return a&&console.warn(`Boolean modifier processor can not found object by vid: ${e.source}`),!1;const l=r.toModel(e.source);for(const c of r.modifyKey)l==null||l.on(`${w.COMPILED_ATTR}:${c}`,r.renderFun);const u=r.toConfig(e.source);return u&&u.geometry&&((i=r.toModel(u.geometry))==null||i.on(w.COMPILED_UPDATE,r.renderFun)),o.source=s,n.integrateModifer(o),r.renderFun(),!0}return!0}),r.toAsync(a=>{var i;if(e.target){const s=t.compilerManager.getObjectBySymbol(e.target);if(!s)return a&&console.warn(`Boolean modifier processor can not found object by vid: ${e.target}`),!1;o.target=s;const l=r.toModel(e.target);for(const c of r.modifyKey)l==null||l.on(`${w.COMPILED_ATTR}:${c}`,r.renderFun);const u=r.toConfig(e.target);return u&&u.geometry&&((i=r.toModel(u.geometry))==null||i.on(w.COMPILED_UPDATE,r.renderFun)),r.cacheTarget=e.target,r.renderFun(),!0}return!0}),ce(e,o,{target:!0,source:!0}),o},dispose({target:r}){r.dispose()}}),Ys=P({type:"modifier",compiler:ii,models:[ci],lifeOrder:D.NINE}),ui=function(){return Object.assign(_(),{})},qs=P({type:"object3D",object:!0,rule:ee,models:[te(r=>({type:"Object3D",config:ui,create({model:e,config:t,engine:n}){const o=new Et;return r.create({model:e,target:o,config:t,filter:{},engine:n}),o},dispose({target:e}){r.dispose({target:e})}}))],lifeOrder:D.THREE}),di=function(){return Object.assign(We(),{geometry:"",material:""})},Zs=P({type:"points",object:!0,models:[Re(r=>({type:"Points",config:di,create({model:e,config:t,engine:n}){const o=new Tt;return r.create({model:e,config:t,engine:n,target:o,filter:{}}),o},dispose({target:e}){r.dispose({target:e})}}))],rule:ee,lifeOrder:D.THREE});function gi(r){r.setSceneBySymbol=function(e){const t=this.compilerManager.getCompiler(C.SCENE);return t.map.has(e)?this.setScene(t.map.get(e).puppet):console.warn("can not found scene",e),this}}const mi=[bt("Scene")],hi=Fe([ee[0],function(r){return Qe.symbol.validator(r.symbol)||mi.includes(r.symbol)},V.OPERATE_ADD,V.OPERATE_DELETE,V.OPERATE_COVER,V.OPERATE_COMPILE]),fi=function(){return Object.assign(_(),{vid:bt("Scene"),background:"",environment:"",fog:{type:"",color:"rgb(150, 150, 150)",near:1,far:200,density:.003}})},pi=te(r=>({type:"Scene",config:fi,shared:{setBackground(e,t,n){if(!t){e.background=null;return}if(Qe.symbol.validator(t)){const o=n.compilerManager.getObjectFromModule(C.TEXTURE,t);o?e.background=o:console.warn(`engine can not found this vid texture : '${t}'`)}else e.background=new B(t)},setEnvironment(e,t,n){if(!t){e.environment=null;return}if(Qe.symbol.validator(t)){const o=n.compilerManager.getObjectFromModule(C.TEXTURE,t);o?e.environment=o:console.warn(`engine can not found this vid texture : '${t}'`)}else console.warn(`scene environment is illeage: ${t}`)}},commands:{set:{lookAt(){},fog({target:e,config:t,key:n,value:o}){const a=t.fog;a.type?a.type==="Fog"?!e.fog||!(e.fog instanceof at)?e.fog=new at(a.color,a.near,a.far):n==="color"?e.fog.color.copy(new B(a.color)):e.fog[n]&&(e.fog[n]=o):a.type==="FogExp2"&&(!e.fog||!(e.fog instanceof it)?e.fog=new it(a.color,a.density):n==="color"?e.fog.color.copy(new B(a.color)):e.fog[n]&&(e.fog[n]=o)):e.fog=null},background({model:e,target:t,value:n,engine:o}){e.setBackground(t,n,o)},environment({model:e,target:t,value:n,engine:o}){e.setEnvironment(t,n,o)}}},create({model:e,config:t,engine:n}){const o=new St;if(e.setBackground(o,t.background,n),e.setEnvironment(o,t.environment,n),t.fog.type){const a=t.fog;a.type==="Fog"?o.fog=new at(a.color,a.near,a.far):a.type==="FogExp2"?o.fog=new it(a.color,a.density):console.warn(`scene model: can not support this type fog:'${t.type}'`)}return r.create({model:e,config:t,target:o,engine:n,filter:{lookAt:!0,background:!0,environment:!0,fog:!0}}),o},dispose({target:e}){r.dispose({target:e})}})),Ks=P({type:"scene",object:!0,rule:hi,models:[pi],extend:gi,lifeOrder:D.THREE+1}),vi=Fe([function(r){return r.key!=="geometry"},...ee]),xi=function(){return Object.assign(We(),{type:"Sprite",material:"",center:{x:.5,y:.5}})},yi=Re(r=>({type:"Sprite",config:xi,shared:{spriteReplaceMaterial:new je({color:"rgb(123, 123, 123)"})},commands:{set:{lookAt(){},material({model:e,target:t,engine:n,value:o}){const a=n.compilerManager.getObjectFromModule(C.MATERIAL,o);a&&a instanceof je?t.material=a:t.material=e.spriteReplaceMaterial}}},create({model:e,config:t,engine:n}){const o=new _t,a=n.compilerManager.getObjectFromModule(C.MATERIAL,t.material);return a&&a instanceof je?o.material=a:o.material=e.spriteReplaceMaterial,r.create({model:e,target:o,config:t,engine:n,filter:{geometry:!0,material:!0,lookAt:!0}}),o},dispose({target:e}){r.dispose({target:e})}})),Qs=P({type:"sprite",object:!0,rule:vi,models:[yi],lifeOrder:D.THREE}),Ie=function(){return Object.assign(X(),{mapping:ln,wrapS:Ft,wrapT:Ft,magFilter:ze,minFilter:cn,anisotropy:1,format:un,flipY:!0,offset:{x:0,y:0},repeat:{x:1,y:1},rotation:0,center:{x:0,y:0},matrixAutoUpdate:!0,colorSpace:dn,needsUpdate:!1})},bi=function(){return Object.assign(Ie(),{url:""})},wi=function(){return Object.assign(Ie(),{url:"",minFilter:ze})},Mi=function(){return Object.assign(Ie(),{cube:{nx:"",ny:"",nz:"",px:"",py:"",pz:""},mapping:sn,flipY:!1})},Si=function(){return Object.assign(Ie(),{url:"",needsUpdate:!1})},Ti=function(){return Object.assign(Ie(),{url:""})},Ke=new Sn({width:512,height:512}).draw(r=>{r.translate(256,256),r.font="72px",r.fillStyle="white",r.fillText("\u6682\u65E0\u56FE\u7247",0,0)}).getDom(),xr=function(r,e,t){const n=e.resourceManager.resourceMap;if(!n.has(r))return console.warn(`engine resourceManager can not found this url: ${r}`),Ke;const o=n.get(r);if(Array.isArray(t)){for(const a of t)if(o instanceof a)return o;return console.warn(`this url mapping resource is not a texture image class: ${r}`,o),Ke}else return o instanceof t?o:(console.warn(`this url mapping resource is not a texture image class: ${r}`,o),Ke)},He=z.extend({shared:{replaceImage:Ke,getResource:xr},commands:{set:{$reg:[{reg:new RegExp("wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping|flipY"),handler({target:r,key:e,value:t}){r[e]=t,r.needsUpdate=!0}}]}}}),Ei=He(()=>({type:"CanvasTexture",config:Si,commands:{set:{url({model:r,target:e,value:t,engine:n}){r.toAsync(o=>(e.image=r.getResource(t,n,[HTMLImageElement,HTMLVideoElement,HTMLCanvasElement]),e.needsUpdate=!0,e.image!==r.replaceImage))}}},create({model:r,config:e,engine:t}){const n=new nn(r.replaceImage);return r.toAsync(o=>(n.image=r.getResource(e.url,t,[HTMLImageElement,HTMLVideoElement,HTMLCanvasElement]),n.needsUpdate=!0,n.image!==r.replaceImage)),ce(e,n,{type:!0,url:!0}),n.needsUpdate=!0,n},dispose({target:r}){r.dispose()}})),Ai=He(()=>({type:"CubeTexture",config:Mi,shared:{imageHanlder({model:r,target:e,index:t,value:n,engine:o}){e.images[t]=r.getResource(n,o,[HTMLImageElement,HTMLVideoElement,HTMLCanvasElement]),e.needsUpdate=!0}},commands:{set:{cube:{px({model:r,target:e,value:t,engine:n}){r.imageHanlder({model:r,target:e,value:t,index:0,engine:n})},nx({model:r,target:e,value:t,engine:n}){r.imageHanlder({model:r,target:e,value:t,index:1,engine:n})},py({model:r,target:e,value:t,engine:n}){r.imageHanlder({model:r,target:e,value:t,index:2,engine:n})},ny({model:r,target:e,value:t,engine:n}){r.imageHanlder({model:r,target:e,value:t,index:3,engine:n})},pz({model:r,target:e,value:t,engine:n}){r.imageHanlder({model:r,target:e,value:t,index:4,engine:n})},nz({model:r,target:e,value:t,engine:n}){r.imageHanlder({model:r,target:e,value:t,index:5,engine:n})}}}},create({model:r,config:e,engine:t}){const n=new on,o=e.cube,a=[HTMLImageElement,HTMLVideoElement,HTMLCanvasElement],i=[r.getResource(o.px,t,a),r.getResource(o.nx,t,a),r.getResource(o.py,t,a),r.getResource(o.ny,t,a),r.getResource(o.pz,t,a),r.getResource(o.nz,t,a)];return n.image=i,ce(e,n,{type:!0,cube:!0}),n.needsUpdate=!0,n},dispose({target:r}){r.dispose()}}));class Ci extends le{constructor(e,t,n,o,a,i,s,l,u){super(e,t,n,o,a,i,s,l,u)}}const Pi=He(()=>({type:"ImageTexture",config:bi,commands:{set:{url({model:r,target:e,value:t,engine:n}){r.toAsync(o=>(e.image=r.getResource(t,n,[HTMLImageElement,HTMLVideoElement,HTMLCanvasElement]),e.needsUpdate=!0,e.image!==r.replaceImage))}}},create({model:r,config:e,engine:t}){const n=new Ci(r.replaceImage);return e.url&&r.toAsync(o=>(n.image=r.getResource(e.url,t,[HTMLImageElement,HTMLVideoElement,HTMLCanvasElement]),n.needsUpdate=!0,n.image!==r.replaceImage)),ce(e,n,{type:!0,url:!0}),n.needsUpdate=!0,n},dispose({target:r}){r.dispose()}}));class qt extends le{constructor(e){super(),Object.keys(e).forEach(t=>{this[t]=e[t]}),this.copy(e)}}const Oi=He(()=>({type:"LoadTexture",config:Ti,commands:{set:{url(){}}},create({model:r,config:e,engine:t}){let n;const o=r.getResource(e.url,t,le);if(o instanceof le)n=new qt(o);else{const a=new le(o);n=new qt(a)}return ce(e,n,{type:!0,url:!0}),n.needsUpdate=!0,n},dispose({target:r}){r.dispose()}}));class Di extends le{constructor(e,t,n,o,a,i,s,l,u){super(e,t,n,o,a,i,s,l,u),this.isVideoTexture=!0,this.format=s!==void 0?s:an,this.minFilter=i!==void 0?i:ze,this.magFilter=a!==void 0?a:ze,this.generateMipmaps=!1}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image,t="requestVideoFrameCallback"in e;t?this.needsUpdate=!0:t===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}const Ri=He(()=>({type:"VideoTexture",config:wi,commands:{set:{url({model:r,target:e,value:t,engine:n}){r.toAsync(o=>(e.image=r.getResource(t,n,[HTMLVideoElement]),e.needsUpdate=!0,e.image!==r.replaceImage))}}},create({model:r,config:e,engine:t}){const n=new Di(document.createElement("video"));return e.url&&r.toAsync(o=>(n.image=r.getResource(e.url,t,[HTMLVideoElement]),n.needsUpdate=!0,n.image!==r.replaceImage)),ce(e,n,{type:!0,url:!0}),n.needsUpdate=!0,n},dispose({target:r}){r.dispose()}}));function Li(r){r.generateLoadTextureConfig=function(e){const t=xr(e,this,le);return t instanceof HTMLCanvasElement?null:Cr(Pr.LOADTEXTURE,{url:e,flipY:t.flipY,format:t.format,mapping:t.mapping,minFilter:t.minFilter,magFilter:t.magFilter})}}const Js=P({type:"texture",models:[Ei,Ai,Pi,Oi,Ri],extend:Li}),ji=function(){return Object.assign(X(),{curves:[],autoClose:!1})},zi=function(){return Object.assign(X(),{curves:[],autoClose:!1})},Ce=class ie extends sr{constructor(e,t,n,o,a,i){super(0,0,1,1,0,Math.PI*2,!1,0),this.start=new f,this.end=new f,this.vertical=0,this.center=new f,this.mid=new f;const s=e,l=n,u=a,c=t,M=o,O=i,S=s-l,T=c-M,d=s-u,v=c-O,h=(s*s-l*l+(c*c-M*M))/2,b=(s*s-u*u+(c*c-O*O))/2,p=T*d-S*v,R=-(v*h-T*b)/p,g=-(S*b-d*h)/p,y=(u+s)/2,A=(O+c)/2,E=ie.isLeft(ie.tempVector1.set(s,c),ie.tempVector2.set(u,O),ie.tempVector3.set(R,g)),L=ie.tempVector1.set(R,g).sub(ie.tempVector2.set(y,A)).length()*(E?-1:1);this.start.set(e,t),this.end.set(a,i),this.vertical=L;const Y=this.start,N=this.end,x=this.center.copy(this.end).sub(this.start),Q=this.mid.set(y,A);x.set(-x.y,x.x).negate().normalize().multiplyScalar(L).add(Q),this.aX=x.x,this.aY=x.y;const j=ie.tempVector1;this.xRadius=j.copy(N).sub(x).length(),this.yRadius=this.xRadius,this.aStartAngle=j.copy(Y).sub(x).angle(),this.aEndAngle=j.copy(N).sub(x).angle();const k=ie.tempVector2.set(l,M).sub(Q),G=ie.tempVector3.set(R,g).sub(Q);this.aClockwise=!((E?1:-1)*(ie.isSameDirecton(k,G)?1:-1)<0)}};Ce.isLeft=function(r,e,t){return(e.x-r.x)*(t.y-r.y)-(e.y-r.y)*(t.x-r.x)>0},Ce.isSameDirecton=function(r,e){const t=Math.sqrt(r.lengthSq()*e.lengthSq());if(t===0)return!1;const n=r.dot(e)/t;return Math.acos(gn.clamp(n,-1,1))<Math.PI/2},Ce.tempVector1=new f,Ce.tempVector2=new f,Ce.tempVector3=new f;let Bi=Ce;const Ni=z({type:"Path",config:ji,shared:{getCurveExtrPoint(r,e){return e==="start"?{x:r.params[0],y:r.params[1]}:{x:r.params[r.params.length-2],y:r.params[r.params.length-1]}},generateCurve(r){const e={arc:(t,n,o,a,i,s)=>new Bi(t,n,o,a,i,s),line:(t,n,o,a)=>new lr(new f(t,n),new f(o,a)),bezier:(t,n,o,a,i,s,l,u)=>new Ut(new f(t,n),new f(o,a),new f(i,s),new f(l,u)),cubic:(t,n,o,a,i,s,l,u)=>new Ut(new f(t,n),new f(o,a),new f(i,s),new f(l,u)),quadratic:(t,n,o,a,i,s)=>new mn(new f(t,n),new f(o,a),new f(i,s))};return e[r.curve]?e[r.curve](...r.params):(console.warn(`path processor can not support this curve: ${r.curve}`),null)},syncExtrParams(r,e,t){if(t==="start")r.params[0]!==e[0]&&(r.params[0]=e[0]),r.params[1]!==e[1]&&(r.params[1]=e[1]);else{const n=r.params.length-1;r.params[n-1]!==e[0]&&(r.params[n-1]=e[0]),r.params[n]!==e[1]&&(r.params[n]=e[1])}}},commands:{add:{curves({model:r,target:e,config:t,value:n}){const o=r.generateCurve(n);o&&e.curves.push(o)}},set:{curves({model:r,target:e,config:t,path:n,key:o}){let a=Number(n[1]);if(!Number.isInteger(a)){if(Number.isInteger(Number(o)))return;console.warn("path processor: set curves path error:",n);return}const i=r.generateCurve(t.curves[a]);e.curves[a]=i;const s=r.getCurveExtrPoint(t.curves[a],"start"),l=r.getCurveExtrPoint(t.curves[a],"end");a-1>=0&&r.syncExtrParams(t.curves[a-1],[s.x,s.y],"end"),a+1<=t.curves.length-1&&r.syncExtrParams(t.curves[a+1],[l.x,l.y],"start")}},delete:{curves({model:r,target:e,config:t,key:n}){const o=Number(n);if(!(e.curves.length-1<o)&&(e.curves.splice(o,1),o<=t.curves.length-1&&o-1>=0)){const a=r.getCurveExtrPoint(t.curves[o-1],"end");r.syncExtrParams(t.curves[o],[a.x,a.y],"start")}}}},create({model:r,config:e,engine:t}){const n=new Pt;if(e.curves.length)for(const o of e.curves){const a=r.generateCurve(o);a&&n.curves.push(a)}return n.autoClose=e.autoClose,n},dispose({target:r}){r.curves=[]}}),Fi=z({type:"Path3",config:zi,shared:{getCurveExtrPoint(r,e){return e==="start"?{x:r.params[0],y:r.params[1],z:r.params[2]}:{x:r.params[r.params.length-3],y:r.params[r.params.length-2],z:r.params[r.params.length-1]}},generateCurve(r){const e={line:(t,n,o,a,i,s)=>new tr(new m(t,n,o),new m(a,i,s)),cubic:(t,n,o,a,i,s,l,u,c,M,O,S)=>new nr(new m(t,n,o),new m(a,i,s),new m(l,u,c),new m(M,O,S)),quadratic:(t,n,o,a,i,s,l,u,c)=>new or(new m(t,n,o),new m(a,i,s),new m(l,u,c))};return e[r.curve]?e[r.curve](...r.params):(console.warn(`path processor can not support this curve: ${r.curve}`),null)},syncExtrParams(r,e,t){if(t==="start")r.params[0]!==e[0]&&(r.params[0]=e[0]),r.params[1]!==e[1]&&(r.params[1]=e[1]),r.params[2]!==e[2]&&(r.params[2]=e[2]);else{const n=r.params.length-1;r.params[n-2]!==e[0]&&(r.params[n-2]=e[0]),r.params[n-1]!==e[1]&&(r.params[n-1]=e[1]),r.params[n]!==e[2]&&(r.params[n]=e[2])}}},commands:{add:{curves({model:r,target:e,config:t,value:n}){const o=r.generateCurve(n);o&&e.curves.push(o)}},set:{curves({model:r,target:e,config:t,path:n,key:o}){let a=Number(n[1]);if(!Number.isInteger(a)){if(Number.isInteger(Number(o)))return;console.warn("path3 processor: set curves path error:",n);return}const i=r.generateCurve(t.curves[a]);e.curves[a]=i;const s=r.getCurveExtrPoint(t.curves[a],"start"),l=r.getCurveExtrPoint(t.curves[a],"end");a-1>=0&&r.syncExtrParams(t.curves[a-1],[s.x,s.y,s.z],"end"),a+1<=t.curves.length-1&&r.syncExtrParams(t.curves[a+1],[l.x,l.y,l.z],"start")}},delete:{curves({model:r,target:e,config:t,key:n}){const o=Number(n);if(!(e.curves.length-1<o)&&(e.curves.splice(o,1),o<=t.curves.length-1&&o-1>=0)){const a=r.getCurveExtrPoint(t.curves[o-1],"end");r.syncExtrParams(t.curves[o],[a.x,a.y,a.z],"start")}}}},create({model:r,config:e,engine:t}){const n=new et;if(e.curves.length)for(const o of e.curves){const a=r.generateCurve(o);a&&n.curves.push(a)}return n.autoClose=e.autoClose,n},dispose({target:r}){r.curves=[]}}),$s=P({type:"path",models:[Ni,Fi],lifeOrder:D.ZERO}),Ui=function(){return Object.assign(X(),{shape:"",holes:[]})},Wi=z({type:"Shape",config:Ui,context(){return{pathEventMap:new Map}},commands:{add:{holes({model:r,target:e,engine:t,config:n,value:o}){var a;const i=t.compilerManager.getObjectFromModule(C.PATH,o);if(!i){console.warn(`shape model: can not found path: ${o}`);return}e.holes.push(i);const s=n.holes.length-1,l=()=>{n.holes[s]=n.holes[s]};(a=r.toModel(o))==null||a.on(w.COMPILED_UPDATE,l),r.pathEventMap.set(i,l)}},set:{shape({model:r,target:e,engine:t,value:n}){const o=t.compilerManager.getObjectFromModule(C.PATH,n);o?e.curves=o.curves:console.warn(`shape model: can not found path: ${n}`)},holes({target:r,engine:e,path:t,value:n}){const o=Number(t[1]);if(!Number.isInteger(o)){console.warn("shape model: delete holes error:",t);return}const a=e.compilerManager.getObjectFromModule(C.PATH,n);if(!a){console.warn(`shape model: can not found path: ${n}`);return}r.holes[o]=a}},delete:{holes({model:r,target:e,path:t}){var n;const o=Number(t[1]);if(!Number.isInteger(o)){console.warn("shape processor: delete holes error:",t);return}(n=r.toModel(e.holes[o]))==null||n.off(w.COMPILED_UPDATE,r.pathEventMap.get(e.holes[o])),r.pathEventMap.delete(e.holes[o]),e.holes.splice(o,1)}}},create({model:r,config:e,engine:t}){var n,o;const a=new Fr;if(e.shape){const i=t.compilerManager.getObjectFromModule(C.PATH,e.shape);if(!i)console.warn(`shape processor can not found path: ${e.shape}`);else{a.curves=i.curves;const s=()=>{e.shape=e.shape};(n=r.toModel(e.shape))==null||n.on(w.COMPILED_UPDATE,s),r.pathEventMap.set(i,s)}}if(e.holes.length)for(let i=0;i<e.holes.length;i+=1){const s=e.holes[i],l=t.compilerManager.getObjectFromModule(C.PATH,s);if(!l)console.warn(`shape processor can not found path: ${s}`);else{a.holes.push(l);const u=()=>{e.holes[i]=e.holes[i]};(o=r.toModel(e.shape))==null||o.on(w.COMPILED_UPDATE,u),r.pathEventMap.set(l,u)}}return a},dispose({model:r,target:e}){var t;e.curves=[],e.holes=[];for(const[n,o]of r.pathEventMap.entries())(t=r.toModel(n))==null||t.off(w.COMPILED_UPDATE,o);r.pathEventMap.clear()}}),_s=P({type:"shape",models:[Wi],lifeOrder:D.ONE}),yr=function(){return Object.assign(X(),{arcLengthDivisions:200})},Ii=function(){return Object.assign(yr(),{startX:0,startY:0,vertical:5,clockwise:!1,endX:10,endY:10})},Hi=function(){return Object.assign(yr(),{startX:0,startY:0,endX:10,endY:10})},ki={reg:new RegExp(".*"),handler({config:r,target:e,model:t,engine:n,compiler:o}){o.symbolMap.delete(e),t.dispose();const a=t.create();o.symbolMap.set(a,r.vid)}},br=function(){return ki};class Gi extends sr{constructor(e,t,n,o,a,i){super(0,0,1,1,0,Math.PI*2,!1,0),this.start=new f,this.end=new f,this.vertical=0,this.center=new f,this.tempVector=new f,this.start.set(e,t),this.end.set(a,i),this.vertical=n;const s=this.tempVector,l=this.start,u=this.end,c=new f((a+e)/2,(i+t)/2),M=this.center.copy(this.end).sub(this.start);M.set(-M.y,M.x).negate().normalize().multiplyScalar(n).add(c),this.aX=M.x,this.aY=M.y,this.xRadius=s.copy(u).sub(M).length(),this.yRadius=this.xRadius,this.aStartAngle=s.copy(l).sub(M).angle(),this.aEndAngle=s.copy(u).sub(M).angle(),this.aClockwise=o}}const Vi=z({type:"ArcCurve",config:Ii,commands:{set:{$reg:[br()]}},create({config:r}){return new Gi(r.startX,r.startY,r.vertical,r.clockwise,r.endX,r.endY)},dispose(){}}),Xi=z({type:"LineCurve",config:Hi,commands:{set:{$reg:[br()]}},create({config:r}){return new lr(new f(r.startX,r.startY),new f(r.endX,r.endY))},dispose(){}}),el=P({type:"curve",models:[Vi,Xi],lifeOrder:D.ZERO-1}),Yi=function(){return Object.assign(_(),{children:[]})},tl=P({type:"bone",object:!0,rule:ee,models:[te(r=>({type:"Bone",config:Yi,create({model:e,config:t,engine:n}){const o=new cr;return r.create({model:e,target:o,config:t,filter:{},engine:n}),o},dispose({target:e}){r.dispose({target:e})}}))],lifeOrder:D.THREE-2}),qi=function(){return Object.assign(X(),{bones:[],boneInverses:[]})},Zi=function(){return Object.assign(X(),{url:""})},Ki=z({type:"Skeleton",config:qi,commands:{add:{bones({target:r,value:e,engine:t}){const n=t.getObjectBySymbol(e);n?(r.bones.push(n),r.boneInverses=[],r.init()):console.warn(`skeleton processor can not found bone in engine: ${e}`)}},set:{},delete:{bones({target:r,value:e,engine:t}){r.bones.splice(e,1),r.boneInverses=[],r.init()}}},create({model:r,config:e,engine:t}){const n=[];e.bones.forEach(a=>{const i=t.getObjectBySymbol(a);i?n.push(i):console.warn(`skeleton processor can not found bone in engine: ${a}`)});const o=new Ze(n,e.boneInverses.length?e.boneInverses.map(a=>{const i=new W;return i.elements=[].concat(a),i}):[]);return e.boneInverses.length||r.toTrigger("object",()=>(o.calculateInverses(),!1)),o},dispose({target:r}){r.bones=[],r.boneInverses=[],r.dispose()}}),Qi=z({type:"LoadSkeleton",config:Zi,commands:{set:{url(){}}},create({config:r,engine:e}){const t=e.resourceManager.resourceMap.get(r.url);return!t&&!(t instanceof Ze)?(console.error(`LoadSkeletonProcessor: engine rescoure can not found url: ${r.url}`),new Ze([new cr])):new Ze([].concat(t.bones),[].concat(t.boneInverses))},dispose({target:r}){r.bones=[],r.boneInverses=[],r.dispose()}}),rl=P({type:"skeleton",models:[Ki,Qi],lifeOrder:D.THREE-1}),Ji=function(){return Object.assign(We(),{skeleton:"",bindMode:"attached",bindMatrix:[]})},$i=Re(r=>({type:"SkinnedMesh",config:Ji,commands:{add:{},set:{},delete:{}},create({model:e,config:t,engine:n}){const o=new hn;if(r.create({model:e,target:o,config:t,engine:n,filter:{skeleton:!0}}),t.skeleton){const a=n.getObjectBySymbol(t.skeleton);a||console.warn(`skinnedMesh processor can not found skeleton in engine: ${t.skeleton}`),e.toTrigger("object",()=>{if(t.bindMatrix.length){const i=new W;i.elements=[].concat(t.bindMatrix),o.bind(a,i)}else o.bind(a,o.matrixWorld);return!1})}return o},dispose(){}})),nl=P({type:"skinnedMesh",object:!0,rule:ee,models:[$i],lifeOrder:D.THREE}),_i=function(){return Object.assign(X(),{duration:-1,tracks:[]})},es=function(){return Object.assign(X(),{url:""})},ts=z({type:"AnimationClip",config:_i,create(){return{}},dispose(){}}),rs=z({type:"LoadAnimationClip",config:es,create({config:r,engine:e}){if(!r.url)return console.warn("load animation clip processor must have url"),new Wt;const t=e.resourceManager.resourceMap;return t.has(r.url)?t.get(r.url):(console.warn(`load animation clip processor can not found url in engine: ${r.url}`),new Wt)},dispose(r){}}),ol=P({type:"animationClip",models:[ts,rs],lifeOrder:D.ZERO}),ns=function(){return Object.assign(X(),{mixer:"",clip:"",clampWhenFinished:!0,enabled:!0,loop:fn,paused:!1,repetitions:1/0,timeScale:1,weight:1,zeroSlopeAtEnd:!0,zeroSlopeAtStart:!0})},os=z({type:"AnimationAction",config:ns,commands:{set:{clip({model:r,target:e,config:t,value:n,engine:o,compiler:a}){e.getMixer().uncacheAction(e.getClip()),a.symbolMap.delete(e);const i=o.getObjectBySymbol(t.mixer);if(!i){console.warn(`animation action model can not found animation mixer in engine: ${t.mixer}`);return}const s=o.getObjectBySymbol(n);s||console.warn(`animation action model can not found animation clip in engine: ${n}`);const l=i.clipAction(s);l.play(),r.puppet=l,a.symbolMap.set(l,t.vid)}}},create({config:r,engine:e}){if(!r.mixer)return console.warn("animation action model must have mixer"),{};if(!r.clip)return{};const t=e.getObjectBySymbol(r.mixer);if(!t)return console.warn(`animation action model can not found animation mixer in engine: ${r.mixer}`),{};const n=e.getObjectBySymbol(r.clip);if(!n)return console.warn(`animation action model can not found animation clip in engine: ${r.clip}`),{};const o=t.clipAction(n);return ce(r,o,{clip:!0,mixer:!0}),o.play(),o},dispose({target:r}){const e=r.getMixer();e.uncacheAction(r.getClip()),e.uncacheClip(r.getClip())}}),al=P({type:"animationAction",models:[os],lifeOrder:D.NINE+1});var as=Object.defineProperty,is=(r,e,t)=>e in r?as(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,we=(r,e,t)=>(is(r,typeof e!="symbol"?e+"":e,t),t);class wr extends xn{}class ss extends wr{constructor(e,t,n="world",o,a){super(),we(this,"target",{object:{},key:""}),we(this,"reference",new Et),we(this,"offset",{position:{direction:"+",axes:"y"},operate:"+",value:0}),we(this,"cacheBox",new $e),we(this,"_space","world"),this._space=n,this.setTarget(e,t),o&&this.setReference(o),a&&(this.offset=a)}get space(){return this._space}set space(e){this._space=e,this.updateBox()}setTarget(e,t){const n=ft(e,t);this.target={object:n.reference,key:n.key}}updateBox(){const e=this.reference;this.cacheBox.setFromObject(e),this.space==="local"&&this.cacheBox.applyMatrix4(e.matrixWorld.invert())}setReference(e){this.reference=e,this.updateBox()}constrain(){this.updateBox();const e=this.offset,t=this.cacheBox;this.target.object[this.target.key]=ur(e.operate,t[e.position.direction==="+"?"max":"min"][e.position.axes],e.value)}}class ls extends wr{constructor(e,t,n,o,a){super(),we(this,"target",{object:{},key:""}),we(this,"reference",{object:{},key:""}),we(this,"offset",null),e&&t&&this.setTarget(e,t),n&&o&&this.setReference(n,o),this.offset=a}setTarget(e,t){const n=ft(e,t);this.target={object:n.reference,key:n.key}}setReference(e,t){const n=ft(e,t);this.reference={object:n.reference,key:n.key}}constrain(){this.offset?this.target.object[this.target.key]=ur(this.offset.operate,this.reference.object[this.reference.key],this.offset.value):this.target.object[this.target.key]=this.reference.object[this.reference.key]}}const Mr=function(){return Object.assign(X(),{target:""})},cs=function(){return Object.assign(Mr(),{target:"",targetAttr:"",ref:"",refAttr:"",offset:null})},us=function(){return Object.assign(Mr(),{targetAttr:"",ref:"",space:"world",offset:{position:{direction:"+",axes:"y"},operate:"+",value:0}})},Sr={reg:new RegExp(".*"),handler(r){r.model.set(r),r.target.constrain()}},ds=z({type:"NumberConstraintor",config:cs,context({model:r}){return{constrainFun:()=>{r.puppet.constrain()}}},commands:{set:{target({target:r,config:e,engine:t}){e.target&&e.targetAttr&&(r.setTarget(t.getConfigBySymbol(e.target),e.targetAttr),r.constrain())},targetAttr({target:r,config:e,engine:t}){e.target&&e.targetAttr&&(r.setTarget(t.getConfigBySymbol(e.target),e.targetAttr),r.constrain())},ref({target:r,config:e,engine:t,model:n}){var o,a;e.ref&&e.refAttr&&((o=n.toModel(e.ref))==null||o.off(w.COMPILED_UPDATE,n.constrainFun),r.setReference(t.getConfigBySymbol(e.ref),e.refAttr),(a=n.toModel(e.ref))==null||a.on(w.COMPILED_UPDATE,n.constrainFun))},refAttr({target:r,config:e,engine:t,model:n}){var o,a;e.ref&&e.refAttr&&((o=n.toModel(e.ref))==null||o.off(w.COMPILED_UPDATE,n.constrainFun),r.setReference(t.getConfigBySymbol(e.ref),e.refAttr),(a=n.toModel(e.ref))==null||a.on(w.COMPILED_UPDATE,n.constrainFun))},$reg:[Sr]}},create({model:r,config:e,engine:t}){var n;const o=new ls(t.getConfigBySymbol(e.target),e.targetAttr,t.getConfigBySymbol(e.ref),e.refAttr,e.offset?{...e.offset}:null);return(n=r.toModel(e.ref))==null||n.on(w.COMPILED_UPDATE,r.constrainFun),o.constrain(),o},dispose({model:r,config:e}){var t;(t=r.toModel(e.ref))==null||t.off(w.COMPILED_UPDATE,r.constrainFun)}}),gs=z({type:"BoundingBoxConstraintor",config:us,context({model:r}){return{constrainFun:()=>{r.puppet.constrain()}}},commands:{set:{target({target:r,config:e,engine:t}){e.target&&e.targetAttr&&(r.setTarget(t.getConfigBySymbol(e.target),e.targetAttr),r.constrain())},targetAttr({target:r,config:e,engine:t}){e.target&&e.targetAttr&&(r.setTarget(t.getConfigBySymbol(e.target),e.targetAttr),r.constrain())},ref({model:r,target:e,config:t,engine:n,value:o}){var a,i;if((a=r.toModel(t.ref))==null||a.off(w.COMPILED_UPDATE,r.constrainFun),!o)return;const s=n.getObjectBySymbol(t.ref);if(!s){console.warn(`BoundingBox constraintor processor: can not found object: ${t.ref}`);return}e.setReference(s),e.constrain(),(i=r.toModel(t.ref))==null||i.on(w.COMPILED_UPDATE,r.constrainFun)},$reg:[Sr]}},create({model:r,config:e,engine:t}){var n;const o=r.toObject(e.ref),a=new ss(r.toConfig(e.target),e.targetAttr,e.space,o,Or.clone(e.offset));return o&&(a.constrain(),(n=r.toModel(e.ref))==null||n.on(w.COMPILED_UPDATE,r.constrainFun)),a},dispose({model:r,config:e}){var t;(t=r.toModel(e.ref))==null||t.off(w.COMPILED_UPDATE,r.constrainFun)}}),il=P({type:"constraintor",models:[ds,gs],lifeOrder:D.NINE});class nt extends Pe{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new Ue;const n=this,o=t.color!==void 0?new B(t.color):new B(8355711),a=t.textureWidth||512,i=t.textureHeight||512,s=t.clipBias||0,l=t.shader||nt.ReflectorShader,u=t.multisample!==void 0?t.multisample:4,c=new Mt,M=new m,O=new m,S=new m,T=new W,d=new m(0,0,-1),v=new Je,h=new m,b=new m,p=new Je,R=new W,g=this.camera,y=new $(a,i,{samples:u,type:Te}),A=new I({name:l.name!==void 0?l.name:"unspecified",uniforms:J.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});A.uniforms.tDiffuse.value=y.texture,A.uniforms.color.value=o,A.uniforms.textureMatrix.value=R,this.material=A,this.onBeforeRender=function(E,L,Y){if(O.setFromMatrixPosition(n.matrixWorld),S.setFromMatrixPosition(Y.matrixWorld),T.extractRotation(n.matrixWorld),M.set(0,0,1),M.applyMatrix4(T),h.subVectors(O,S),h.dot(M)>0)return;h.reflect(M).negate(),h.add(O),T.extractRotation(Y.matrixWorld),d.set(0,0,-1),d.applyMatrix4(T),d.add(S),b.subVectors(O,d),b.reflect(M).negate(),b.add(O),g.position.copy(h),g.up.set(0,1,0),g.up.applyMatrix4(T),g.up.reflect(M),g.lookAt(b),g.far=Y.far,g.updateMatrixWorld(),g.projectionMatrix.copy(Y.projectionMatrix),R.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),R.multiply(g.projectionMatrix),R.multiply(g.matrixWorldInverse),R.multiply(n.matrixWorld),c.setFromNormalAndCoplanarPoint(M,O),c.applyMatrix4(g.matrixWorldInverse),v.set(c.normal.x,c.normal.y,c.normal.z,c.constant);const N=g.projectionMatrix;p.x=(Math.sign(v.x)+N.elements[8])/N.elements[0],p.y=(Math.sign(v.y)+N.elements[9])/N.elements[5],p.z=-1,p.w=(1+N.elements[10])/N.elements[14],v.multiplyScalar(2/v.dot(p)),N.elements[2]=v.x,N.elements[6]=v.y,N.elements[10]=v.z+1-s,N.elements[14]=v.w,n.visible=!1;const x=E.getRenderTarget(),Q=E.xr.enabled,j=E.shadowMap.autoUpdate;E.xr.enabled=!1,E.shadowMap.autoUpdate=!1,E.setRenderTarget(y),E.state.buffers.depth.setMask(!0),E.autoClear===!1&&E.clear(),E.render(L,g),E.xr.enabled=Q,E.shadowMap.autoUpdate=j,E.setRenderTarget(x);const k=Y.viewport;k!==void 0&&E.state.viewport(k),n.visible=!0},this.getRenderTarget=function(){return y},this.dispose=function(){y.dispose(),n.material.dispose()}}}nt.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const ms=function(){return Object.assign(_(),{geometry:"",color:"rgb(127, 127, 127)",textureWidth:0,textureHeight:0,clipBias:0,multisample:4})},hs=te(r=>({type:"Reflector",config:ms,shared:{setSize(e,t,n){e.getRenderTarget().setSize(t.textureHeight||n.dom.offsetWidth*window.devicePixelRatio,t.textureWidth||n.dom.offsetHeight*window.devicePixelRatio)}},commands:{set:{textureHeight({model:e,target:t,config:n,engine:o}){e.setSize(t,n,o)},textureWidth({model:e,target:t,config:n,engine:o}){e.setSize(t,n,o)},geometry(e){e.target.geometry=e.engine.getObjectFromModule(C.GEOMETRY,e.value)}}},create({model:e,config:t,engine:n}){const o=new nt(n.getObjectFromModule(C.GEOMETRY,t.geometry),{color:t.color,clipBias:t.clipBias,textureHeight:t.textureHeight||n.dom.offsetWidth*window.devicePixelRatio,textureWidth:t.textureWidth||n.dom.offsetHeight*window.devicePixelRatio,multisample:t.multisample});return r.create({model:e,target:o,config:t,engine:n,filter:{geometry:!0,clipBias:!0,color:!0}}),o},dispose({target:e}){e.geometry=void 0,e.dispose(),r.dispose({target:e})}})),sl=P({type:"reflector",object:!0,rule:ee,models:[hs],lifeOrder:D.THREE});class fs extends Pe{constructor(e,t={}){super(e),this.isWater=!0;const n=this,o=t.textureWidth!==void 0?t.textureWidth:512,a=t.textureHeight!==void 0?t.textureHeight:512,i=t.clipBias!==void 0?t.clipBias:0,s=t.alpha!==void 0?t.alpha:1,l=t.time!==void 0?t.time:0,u=t.waterNormals!==void 0?t.waterNormals:null,c=t.sunDirection!==void 0?t.sunDirection:new m(.70707,.70707,0),M=new B(t.sunColor!==void 0?t.sunColor:16777215),O=new B(t.waterColor!==void 0?t.waterColor:8355711),S=t.eye!==void 0?t.eye:new m(0,0,0),T=t.distortionScale!==void 0?t.distortionScale:20,d=t.side!==void 0?t.side:ir,v=t.fog!==void 0?t.fog:!1,h=new Mt,b=new m,p=new m,R=new m,g=new W,y=new m(0,0,-1),A=new Je,E=new m,L=new m,Y=new Je,N=new W,x=new Ue,Q=new $(o,a),j={name:"MirrorShader",uniforms:J.merge([It.fog,It.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new W},sunColor:{value:new B(8355711)},sunDirection:{value:new m(.70707,.70707,0)},eye:{value:new m},waterColor:{value:new B(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},k=new I({name:j.name,uniforms:J.clone(j.uniforms),vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,lights:!0,side:d,fog:v});k.uniforms.mirrorSampler.value=Q.texture,k.uniforms.textureMatrix.value=N,k.uniforms.alpha.value=s,k.uniforms.time.value=l,k.uniforms.normalSampler.value=u,k.uniforms.sunColor.value=M,k.uniforms.waterColor.value=O,k.uniforms.sunDirection.value=c,k.uniforms.distortionScale.value=T,k.uniforms.eye.value=S,n.material=k,n.onBeforeRender=function(G,ot,pe){if(p.setFromMatrixPosition(n.matrixWorld),R.setFromMatrixPosition(pe.matrixWorld),g.extractRotation(n.matrixWorld),b.set(0,0,1),b.applyMatrix4(g),E.subVectors(p,R),E.dot(b)>0)return;E.reflect(b).negate(),E.add(p),g.extractRotation(pe.matrixWorld),y.set(0,0,-1),y.applyMatrix4(g),y.add(R),L.subVectors(p,y),L.reflect(b).negate(),L.add(p),x.position.copy(E),x.up.set(0,1,0),x.up.applyMatrix4(g),x.up.reflect(b),x.lookAt(L),x.far=pe.far,x.updateMatrixWorld(),x.projectionMatrix.copy(pe.projectionMatrix),N.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),N.multiply(x.projectionMatrix),N.multiply(x.matrixWorldInverse),h.setFromNormalAndCoplanarPoint(b,p),h.applyMatrix4(x.matrixWorldInverse),A.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const re=x.projectionMatrix;Y.x=(Math.sign(A.x)+re.elements[8])/re.elements[0],Y.y=(Math.sign(A.y)+re.elements[9])/re.elements[5],Y.z=-1,Y.w=(1+re.elements[10])/re.elements[14],A.multiplyScalar(2/A.dot(Y)),re.elements[2]=A.x,re.elements[6]=A.y,re.elements[10]=A.z+1-i,re.elements[14]=A.w,S.setFromMatrixPosition(pe.matrixWorld);const Tr=G.getRenderTarget(),Er=G.xr.enabled,Ar=G.shadowMap.autoUpdate;n.visible=!1,G.xr.enabled=!1,G.shadowMap.autoUpdate=!1,G.setRenderTarget(Q),G.state.buffers.depth.setMask(!0),G.autoClear===!1&&G.clear(),G.render(ot,x),n.visible=!0,G.xr.enabled=Er,G.shadowMap.autoUpdate=Ar,G.setRenderTarget(Tr);const Bt=pe.viewport;Bt!==void 0&&G.state.viewport(Bt)}}}const ps=function(){return Object.assign(_(),{geometry:"",textureWidth:512,textureHeight:512,waterNormals:"",waterColor:"rgb(127, 127, 127)",sunColor:"rgb(255, 255, 255)",sunDirection:{x:.70707,y:.70707,z:0},size:1,alpha:1,time:0,distortionScale:20,eye:{x:0,y:0,z:0},fog:!1})},vs=te(r=>({type:"DeepWater",config:ps,commands:{set:{geometry({value:e,target:t,engine:n}){const o=n.getObjectFromModule(C.GEOMETRY,e);if(!o){console.warn(`DeepWater processor: can not found geometry with:${e}`);return}t.geometry=o},waterNormals({value:e,target:t,engine:n}){const o=n.getObjectFromModule(C.TEXTURE,e);if(!o){console.warn(`DeepWater processor: can not found texture with:${e}`);return}t.material.uniforms.normalSampler.value=o},time(e){e.target.material.uniforms.time.value=e.value},size(e){e.target.material.uniforms.size.value=e.value},alpha(e){e.target.material.uniforms.alpha.value=e.value},distortionScale(e){e.target.material.uniforms.distortionScale.value=e.value},waterColor(e){e.target.material.uniforms.waterColor.value.setStyle(e.value)},sunColor(e){e.target.material.uniforms.waterColor.value.setStyle(e.value)},sunDirection(e){e.target.material.uniforms.sunDirection.value[e.key]=e.value},eye(e){e.target.material.uniforms.eye.value[e.key]=e.value}}},create({model:e,config:t,engine:n}){const o=new fs(n.getObjectFromModule(C.GEOMETRY,t.geometry),{textureWidth:t.textureWidth||512,textureHeight:t.textureHeight||512,waterNormals:n.getObjectFromModule(C.TEXTURE,t.waterNormals),waterColor:t.waterColor,sunColor:t.sunColor,sunDirection:new m(t.sunDirection.x,t.sunDirection.y,t.sunDirection.z),alpha:t.alpha,time:t.time,distortionScale:t.distortionScale,eye:new m(t.eye.x,t.eye.y,t.eye.z),fog:t.fog});return r.create({model:e,target:o,config:t,filter:{geometry:!0,textureWidth:!0,textureHeight:!0,waterNormals:!0,waterColor:!0,sunColor:!0,sunDirection:!0,alpha:!0,time:!0,distortionScale:!0,eye:!0,fog:!0},engine:n}),o},dispose({target:e}){e.onBeforeRender=()=>{},e.material.dispose(),e.geometry=null,r.dispose({target:e})}})),ll=P({type:"water",object:!0,rule:ee,models:[vs],lifeOrder:D.THREE}),xs=function(){return Object.assign(_(),{range:{top:100,bottom:-100,left:-100,right:100,front:100,back:-100},amount:200,size:1,alphaMap:"",opacity:1,flicker:!0,time:0,floatRange:5,refColor:"rgb(255, 255, 255)",colorRange:.5})},ys=`
varying vec3 vColor;
uniform bool flicker;
uniform float time;
uniform float size;
uniform float floatRange;

void main() {

  vColor = color;
  float positionX = position.x + sin(time  + color.r + position.y + color.b ) * floatRange;
  float positionY = position.y + sin(time  + color.r + color.g + color.g ) * floatRange;
  float positionZ = position.z + sin(time  + color.b + color.g + position.x ) * floatRange;

  vec4 mvPosition = modelViewMatrix * vec4( positionX, positionY, positionZ, 1.0 );

  float pointSize = size * ( 300.0 / -mvPosition.z );

  if (flicker) {
    pointSize = sin(time + position.x + color.g + color.b + position.z - position.y) * pointSize;
  }

  gl_PointSize = pointSize;

  gl_Position = projectionMatrix * mvPosition;

}
`,bs=`
uniform sampler2D alphaMap;
uniform float opacity;
uniform bool useAlphaMap;
varying vec3 vColor;

void main() {

  gl_FragColor = vec4( vColor, opacity );

  if (useAlphaMap) {  
    gl_FragColor = gl_FragColor * texture2D( alphaMap, gl_PointCoord );
  }


  if (gl_FragColor.a < 0.01) {
    discard;
  }

}
`;class ws extends I{constructor(e){super(),this.uniforms={flicker:{value:e.flicker||!1},time:{value:e.time||0},alphaMap:{value:e.alphaMap||null},size:{value:e.size||1},opacity:{value:e.opacity||1},floatRange:{value:e.floatRange||5},useAlphaMap:{value:e.useAlphaMap||!1}},this.vertexShader=ys,this.fragmentShader=bs,this.vertexColors=!0,this.blending=er,this.transparent=!0}}class Ms extends Tt{constructor(e){super(),this.range={top:100,bottom:-100,left:-100,right:100,front:100,back:-100},this.amount=200,this.refColor=new B(1,1,1),this.colorRange=1,this.raycast=()=>{},Object.assign(this.range,e.range),this.refColor.setHex(e.refColor.getHex()),this.colorRange=e.colorRange,this.amount=e.amount,this.resetGeometry(),this.material=new ws({size:e.size||1,alphaMap:e.alphaMap||null,opacity:e.opacity||1,flicker:e.flicker,floatRange:e.floatRange,useAlphaMap:!!e.alphaMap})}getRandomNum(e,t){return Math.floor(Math.random()*(t-e+1))+e}getRandomColor(e){const t=this.refColor,n=this.colorRange;return this.getRandomNum(t[e]-t[e]*n,(1-t[e])*n+t[e])}updateGeometry(){const e=this.range,t=this.geometry,n=this.amount,o=t.getAttribute("position"),a=t.getAttribute("color");for(let i=0;i<n;i+=1)o.setXYZ(i,this.getRandomNum(e.left,e.right),this.getRandomNum(e.bottom,e.top),this.getRandomNum(e.back,e.front)),a.setXYZ(i,this.getRandomColor("r"),this.getRandomColor("g"),this.getRandomColor("b"));o.needsUpdate=!0,a.needsUpdate=!0}resetGeometry(){const e=this.range,t=this.geometry,n=this.amount,o=new Array(n*3),a=new Array(n*3);for(let i=0;i<n*3;i+=3)o[i]=this.getRandomNum(e.left,e.right),o[i+1]=this.getRandomNum(e.bottom,e.top),o[i+2]=this.getRandomNum(e.back,e.front),a[i]=this.getRandomColor("r"),a[i+1]=this.getRandomColor("g"),a[i+2]=this.getRandomColor("b");t.setAttribute("position",new Ht(new Float32Array(o),3)),t.setAttribute("color",new Ht(new Float32Array(a),3))}dispose(){this.geometry.dispose(),this.material.dispose(),this.removeFromParent()}}const Ss=te(r=>({type:"FloatParticle",config:xs,commands:{set:{range(e){Object.assign(e.target.range,e.config.range),e.target.updateGeometry()},amount(e){e.target.amount=e.value,e.target.resetGeometry()},time(e){e.target.material.uniforms.time.value=e.value},flicker(e){e.target.material.uniforms.flicker.value=e.value},size(e){e.target.material.uniforms.size.value=e.value},opacity(e){e.target.material.uniforms.opacity.value=e.value},floatRange(e){e.target.material.uniforms.floatRange.value=e.value},colorRange(e){e.target.colorRange=e.value,e.target.updateGeometry()},refColor(e){e.target.refColor.setStyle(e.value),e.target.updateGeometry()},alphaMap(e){const t=e.engine.getObjectFromModule(C.TEXTURE,e.value)||null;e.target.material.uniforms.alphaMap.value=t,e.target.material.uniforms.useAlphaMap.value=!!t}}},create({model:e,config:t,engine:n}){const o=new Ms({range:{...t.range},amount:t.amount,size:t.size,opacity:t.opacity,alphaMap:n.getObjectFromModule(C.TEXTURE,t.alphaMap),flicker:t.flicker,floatRange:t.floatRange,refColor:new B(t.refColor),colorRange:t.colorRange});return r.create({model:e,target:o,config:t,filter:{range:!0,amount:!0,size:!0,alphaMap:!0,opacity:!0,flicker:!0,floatRange:!0,refColor:!0,colorRange:!0},engine:n}),o},dispose({target:e}){e.dispose()}})),cl=P({type:"particle",object:!0,models:[Ss],lifeOrder:D.THREE});export{Ws as $,Ys as A,Us as B,al as C,el as E,Js as J,Zs as O,cl as P,sl as R,nl as S,Gs as T,js as a,Ns as b,Is as c,Hs as d,ks as e,zs as f,Vs as g,Xs as h,qs as i,Fs as j,Ks as k,_s as l,tl as m,ol as n,ll as o,il as p,Qn as q,$s as r,xt as s,Yt as t,rl as v,Bs as w,Qs as y};
