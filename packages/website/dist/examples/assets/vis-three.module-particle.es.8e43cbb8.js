import{S as z,R as te,b as re,u as Tr,v as se,c as oe,d as u,M as E,A as co,i as Se,j as jt,O as Ar,k as dr,l as hs,B as T,m as R,n as Hr,g as uo,a as ho,J as po}from"./vis-three.middleware.es.7f273029.js";import{t as de,s as k,V as y,k as he,E as Ce,d as ut,N as _,v as Y,m as L,aY as ps,aZ as ms,H as mo,a_ as ve,a$ as fo,a8 as Ze,b0 as hr,b1 as pr,b2 as mr,b3 as Lt,M as Ve,n as f,h as $e,b4 as Or,b5 as V,S as Er,b6 as go,K as et,Y as Qe,b7 as Ke,L as fs,b as tt,b8 as Dr,b9 as gs,ba as vo,u as Ft,bb as vs,O as xs,az as ke,Q as Rr,i as ee,j as ne,bc as ys,bd as bs,be as ws,bf as Ht,bg as Ms,bh as Ss,bi as Cs,bj as we,B as Gt,bk as xo,bl as yo,bm as bo,bn as wo,bo as Mo,bp as So,bq as Co,br as Po,aH as fr,bs as To,bt as Ao,J as Oo,g as Eo,f as Do,A as Ro,a7 as jo,P as Lo,a6 as Bo,bu as dt,_ as ae,Z as zo,a9 as Wo,a as Uo,bv as No,bw as Ps,aa as jr,a0 as Ts,bx as Kt,by as Jt,bz as Fo,bA as ft,bB as Ho,bC as Go,c as Io,C as Gr,af as ko,R as Vo,w as Xo,bD as As,at as Yo,bE as Os,bF as qo,bG as Zo,bH as Qo,aA as Lr,bI as Ir,am as ht,bJ as Es,z as Ko,ay as Jo,ap as _o,ax as gr,bK as $o,aB as Wt,U as kr}from"./three.237d835c.js";import{P as It,F as kt,S as ei,C as _t}from"./ShaderPass.02f07bc0.js";import{U as ti,L as Vr}from"./UnrealBloomPass.2cdbe9ee.js";import{a as ri,c as Ds,d as si}from"./CSS3DRenderer.ba0f6fa5.js";import{s as Pe,b as Rs,g as vr}from"./index.202ebdec.js";import{B as oi}from"./index.ee52b7bf.js";import{C as gt}from"./vis-three.convenient.es.7b860830.js";import{a as ii}from"./index.c35e5a3e.js";const ni={"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t},js=function(e,t,r){return ni[e](t,r)},Ls=[],ai=function(e,t){te(e,t,r=>se(r)||Ls.includes(r))};class li extends re{constructor(){super()}reigstProcessor(t,r){return Ls.push(Tr(t.type)),super.reigstProcessor(t,r)}}const Cd=function(){return Object.assign(oe(),{})};var Pd={type:"controls",compiler:li,rule:ai,processors:[],lifeOrder:z.NINE};const Xr={uniforms:{tDiffuse:{value:null},time:{value:0},nIntensity:{value:.5},sIntensity:{value:.05},sCount:{value:4096},grayscale:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		// control parameter
		uniform float time;

		uniform bool grayscale;

		// noise effect intensity value (0 = no effect, 1 = full effect)
		uniform float nIntensity;

		// scanlines effect intensity value (0 = no effect, 1 = full effect)
		uniform float sIntensity;

		// scanlines effect count value (0 = no effect, 4096 = full effect)
		uniform float sCount;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

		// sample the source
			vec4 cTextureScreen = texture2D( tDiffuse, vUv );

		// make some noise
			float dx = rand( vUv + time );

		// add noise
			vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );

		// get us a sine and cosine
			vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );

		// add scanlines
			cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;

		// interpolate between source and result by intensity
			cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );

		// convert to grayscale if desired
			if( grayscale ) {

				cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );

			}

			gl_FragColor =  vec4( cResult, cTextureScreen.a );

		}`};class ci extends It{constructor(t,r,s,o){super(),Xr===void 0&&console.error("THREE.FilmPass relies on FilmShader");const i=Xr;this.uniforms=de.clone(i.uniforms),this.material=new k({uniforms:this.uniforms,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader}),o!==void 0&&(this.uniforms.grayscale.value=o),t!==void 0&&(this.uniforms.nIntensity.value=t),r!==void 0&&(this.uniforms.sIntensity.value=r),s!==void 0&&(this.uniforms.sCount.value=s),this.fsQuad=new kt(this.material)}render(t,r,s,o){this.uniforms.tDiffuse.value=s.texture,this.uniforms.time.value+=o,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(r),this.clear&&t.clear(),this.fsQuad.render(t))}}const ui={defines:{USE_3DTEXTURE:1},uniforms:{lut3d:{value:null},lut:{value:null},lutSize:{value:0},tDiffuse:{value:null},intensity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform float lutSize;
		#if USE_3DTEXTURE
		precision highp sampler3D;
		uniform sampler3D lut3d;
		#else
		uniform sampler2D lut;

		vec3 lutLookup( sampler2D tex, float size, vec3 rgb ) {

			float sliceHeight = 1.0 / size;
			float yPixelHeight = 1.0 / ( size * size );

			// Get the slices on either side of the sample
			float slice = rgb.b * size;
			float interp = fract( slice );
			float slice0 = slice - interp;
			float centeredInterp = interp - 0.5;

			float slice1 = slice0 + sign( centeredInterp );

			// Pull y sample in by half a pixel in each direction to avoid color
			// bleeding from adjacent slices.
			float greenOffset = clamp( rgb.g * sliceHeight, yPixelHeight * 0.5, sliceHeight - yPixelHeight * 0.5 );

			vec2 uv0 = vec2(
				rgb.r,
				slice0 * sliceHeight + greenOffset
			);
			vec2 uv1 = vec2(
				rgb.r,
				slice1 * sliceHeight + greenOffset
			);

			vec3 sample0 = texture2D( tex, uv0 ).rgb;
			vec3 sample1 = texture2D( tex, uv1 ).rgb;

			return mix( sample0, sample1, abs( centeredInterp ) );

		}
		#endif

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

			#if USE_3DTEXTURE

			lutVal = vec4( texture( lut3d, uvw ).rgb, val.a );

			#else

			lutVal = vec4( lutLookup( lut, lutSize, uvw ), val.a );

			#endif

			gl_FragColor = vec4( mix( val, lutVal, intensity ) );

		}

	`};class di extends ei{set lut(t){const r=this.material;if(t!==this.lut&&(r.uniforms.lut3d.value=null,r.uniforms.lut.value=null,t)){const s=t.isData3DTexture?1:0;s!==r.defines.USE_3DTEXTURE&&(r.defines.USE_3DTEXTURE=s,r.needsUpdate=!0),r.uniforms.lutSize.value=t.image.width,t.isData3DTexture?r.uniforms.lut3d.value=t:r.uniforms.lut.value=t}}get lut(){return this.material.uniforms.lut.value||this.material.uniforms.lut3d.value}set intensity(t){this.material.uniforms.intensity.value=t}get intensity(){return this.material.uniforms.intensity.value}constructor(t={}){super(ui),this.lut=t.lut||null,this.intensity="intensity"in t?t.intensity:1}}const at={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new y(1/1024,1/512)}},vertexShader:`

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

		}`},Mt={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new y(1/1024,1/512)}},vertexShader:`

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

		}`},$t={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new y(1/1024,1/512)}},vertexShader:`

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

		}`};class hi extends It{constructor(t,r){super(),this.edgesRT=new he(t,r,{depthBuffer:!1}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new he(t,r,{depthBuffer:!1}),this.weightsRT.texture.name="SMAAPass.weights";const s=this,o=new Image;o.src=this.getAreaTexture(),o.onload=function(){s.areaTexture.needsUpdate=!0},this.areaTexture=new Ce,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=o,this.areaTexture.minFilter=ut,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const i=new Image;i.src=this.getSearchTexture(),i.onload=function(){s.searchTexture.needsUpdate=!0},this.searchTexture=new Ce,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=i,this.searchTexture.magFilter=_,this.searchTexture.minFilter=_,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,at===void 0&&console.error("THREE.SMAAPass relies on SMAAShader"),this.uniformsEdges=de.clone(at.uniforms),this.uniformsEdges.resolution.value.set(1/t,1/r),this.materialEdges=new k({defines:Object.assign({},at.defines),uniforms:this.uniformsEdges,vertexShader:at.vertexShader,fragmentShader:at.fragmentShader}),this.uniformsWeights=de.clone(Mt.uniforms),this.uniformsWeights.resolution.value.set(1/t,1/r),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new k({defines:Object.assign({},Mt.defines),uniforms:this.uniformsWeights,vertexShader:Mt.vertexShader,fragmentShader:Mt.fragmentShader}),this.uniformsBlend=de.clone($t.uniforms),this.uniformsBlend.resolution.value.set(1/t,1/r),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new k({uniforms:this.uniformsBlend,vertexShader:$t.vertexShader,fragmentShader:$t.fragmentShader}),this.needsSwap=!1,this.fsQuad=new kt(null)}render(t,r,s){this.uniformsEdges.tDiffuse.value=s.texture,this.fsQuad.material=this.materialEdges,t.setRenderTarget(this.edgesRT),this.clear&&t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialWeights,t.setRenderTarget(this.weightsRT),this.clear&&t.clear(),this.fsQuad.render(t),this.uniformsBlend.tColor.value=s.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(r),this.clear&&t.clear(),this.fsQuad.render(t))}setSize(t,r){this.edgesRT.setSize(t,r),this.weightsRT.setSize(t,r),this.materialEdges.uniforms.resolution.value.set(1/t,1/r),this.materialWeights.uniforms.resolution.value.set(1/t,1/r),this.materialBlend.uniforms.resolution.value.set(1/t,1/r)}getAreaTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAIwCAIAAACOVPcQAACBeklEQVR42u39W4xlWXrnh/3WWvuciIzMrKxrV8/0rWbY0+SQFKcb4owIkSIFCjY9AC1BT/LYBozRi+EX+cV+8IMsYAaCwRcBwjzMiw2jAWtgwC8WR5Q8mDFHZLNHTarZGrLJJllt1W2qKrsumZWZcTvn7L3W54e1vrXX3vuciLPPORFR1XE2EomorB0nVuz//r71re/y/1eMvb4Cb3N11xV/PP/2v4UBAwJG/7H8urx6/25/Gf8O5hypMQ0EEEQwAqLfoN/Z+97f/SW+/NvcgQk4sGBJK6H7N4PFVL+K+e0N11yNfkKvwUdwdlUAXPHHL38oa15f/i/46Ih6SuMSPmLAYAwyRKn7dfMGH97jaMFBYCJUgotIC2YAdu+LyW9vvubxAP8kAL8H/koAuOKP3+q6+xGnd5kdYCeECnGIJViwGJMAkQKfDvB3WZxjLKGh8VSCCzhwEWBpMc5/kBbjawT4HnwJfhr+pPBIu7uu+OOTo9vsmtQcniMBGkKFd4jDWMSCRUpLjJYNJkM+IRzQ+PQvIeAMTrBS2LEiaiR9b/5PuT6Ap/AcfAFO4Y3dA3DFH7/VS+M8k4baEAQfMI4QfbVDDGIRg7GKaIY52qAjTAgTvGBAPGIIghOCYAUrGFNgzA7Q3QhgCwfwAnwe5vDejgG44o/fbm1C5ZlYQvQDARPAIQGxCWBM+wWl37ZQESb4gImexGMDouhGLx1Cst0Saa4b4AqO4Hk4gxo+3DHAV/nx27p3JziPM2pVgoiia5MdEzCGULprIN7gEEeQ5IQxEBBBQnxhsDb5auGmAAYcHMA9eAAz8PBol8/xij9+C4Djlim4gJjWcwZBhCBgMIIYxGAVIkH3ZtcBuLdtRFMWsPGoY9rN+HoBji9VBYdwD2ZQg4cnO7OSq/z4rU5KKdwVbFAjNojCQzTlCLPFSxtamwh2jMUcEgg2Wm/6XgErIBhBckQtGN3CzbVacERgCnfgLswhnvqf7QyAq/z4rRZm1YglYE3affGITaZsdIe2FmMIpnOCap25I6jt2kCwCW0D1uAD9sZctNGXcQIHCkINDQgc78aCr+zjtw3BU/ijdpw3zhCwcaONwBvdeS2YZKkJNJsMPf2JKEvC28RXxxI0ASJyzQCjCEQrO4Q7sFArEzjZhaFc4cdv+/JFdKULM4px0DfUBI2hIsy06BqLhGTQEVdbfAIZXYMPesq6VoCHICzUyjwInO4Y411//LYLs6TDa9wvg2CC2rElgAnpTBziThxaL22MYhzfkghz6GAs2VHbbdM91VZu1MEEpupMMwKyVTb5ij9+u4VJG/5EgEMMmFF01cFai3isRbKbzb+YaU/MQbAm2XSMoUPAmvZzbuKYRIFApbtlrfFuUGd6vq2hXNnH78ZLh/iFhsQG3T4D1ib7k5CC6vY0DCbtrohgLEIClXiGtl10zc0CnEGIhhatLBva7NP58Tvw0qE8yWhARLQ8h4+AhQSP+I4F5xoU+VilGRJs6wnS7ruti/4KvAY/CfdgqjsMy4pf8fodQO8/gnuX3f/3xi3om1/h7THr+co3x93PP9+FBUfbNUjcjEmhcrkT+8K7ml7V10Jo05mpIEFy1NmCJWx9SIKKt+EjAL4Ez8EBVOB6havuT/rByPvHXK+9zUcfcbb254+9fydJknYnRr1oGfdaiAgpxu1Rx/Rek8KISftx3L+DfsLWAANn8Hvw0/AFeAGO9DFV3c6D+CcWbL8Dj9e7f+T1k8AZv/d7+PXWM/Z+VvdCrIvuAKO09RpEEQJM0Ci6+B4xhTWr4cZNOvhktabw0ta0rSJmqz3Yw5/AKXwenod7cAhTmBSPKf6JBdvH8IP17h95pXqw50/+BFnj88fev4NchyaK47OPhhtI8RFSvAfDSNh0Ck0p2gLxGkib5NJj/JWCr90EWQJvwBzO4AHcgztwAFN1evHPUVGwfXON+0debT1YeGON9Yy9/63X+OguiwmhIhQhD7l4sMqlG3D86Suc3qWZ4rWjI1X7u0Ytw6x3rIMeIOPDprfe2XzNgyj6PahhBjO4C3e6puDgXrdg+/5l948vF3bqwZetZ+z9Rx9zdIY5pInPK4Nk0t+l52xdK2B45Qd87nM8fsD5EfUhIcJcERw4RdqqH7Yde5V7m1vhNmtedkz6EDzUMF/2jJYWbC+4fzzA/Y+/8PPH3j9dcBAPIRP8JLXd5BpAu03aziOL3VVHZzz3CXWDPWd+SH2AnxIqQoTZpo9Ckc6HIrFbAbzNmlcg8Ag8NFDDAhbJvTBZXbC94P7t68EXfv6o+21gUtPETU7bbkLxvNKRFG2+KXzvtObonPP4rBvsgmaKj404DlshFole1Glfh02fE7bYR7dZ82oTewIBGn1Md6CG6YUF26X376oevOLzx95vhUmgblI6LBZwTCDY7vMq0op5WVXgsObOXJ+1x3qaBl9j1FeLxbhU9w1F+Wiba6s1X/TBz1LnUfuYDi4r2C69f1f14BWfP+p+W2GFKuC9phcELMYRRLur9DEZTUdEH+iEqWdaM7X4WOoPGI+ZYD2+wcQ+y+ioHUZ9dTDbArzxmi/bJI9BND0Ynd6lBdve/butBw8+f/T9D3ABa3AG8W3VPX4hBin+bj8dMMmSpp5pg7fJ6xrBFE2WQQEWnV8Qg3FbAWzYfM1rREEnmvkN2o1+acG2d/9u68GDzx91v3mAjb1zkpqT21OipPKO0b9TO5W0nTdOmAQm0TObts3aBKgwARtoPDiCT0gHgwnbArzxmtcLc08HgF1asN0C4Ms/fvD5I+7PhfqyXE/b7RbbrGyRQRT9ARZcwAUmgdoz0ehJ9Fn7QAhUjhDAQSw0bV3T3WbNa59jzmiP6GsWbGXDX2ytjy8+f9T97fiBPq9YeLdBmyuizZHaqXITnXiMUEEVcJ7K4j3BFPurtB4bixW8wTpweL8DC95szWMOqucFYGsWbGU7p3TxxxefP+r+oTVktxY0v5hbq3KiOKYnY8ddJVSBxuMMVffNbxwIOERShst73HZ78DZrHpmJmH3K6sGz0fe3UUj0eyRrSCGTTc+rjVNoGzNSv05srAxUBh8IhqChiQgVNIIBH3AVPnrsnXQZbLTm8ammv8eVXn/vWpaTem5IXRlt+U/LA21zhSb9cye6jcOfCnOwhIAYXAMVTUNV0QhVha9xjgA27ODJbLbmitt3tRN80lqG6N/khgot4ZVlOyO4WNg3OIMzhIZQpUEHieg2im6F91hB3I2tubql6BYNN9Hj5S7G0G2tahslBWKDnOiIvuAEDzakDQKDNFQT6gbn8E2y4BBubM230YIpBnDbMa+y3dx0n1S0BtuG62lCCXwcY0F72T1VRR3t2ONcsmDjbmzNt9RFs2LO2hQNyb022JisaI8rAWuw4HI3FuAIhZdOGIcdjLJvvObqlpqvWTJnnQbyi/1M9O8UxWhBs//H42I0q1Yb/XPGONzcmm+ri172mHKvZBpHkJaNJz6v9jxqiklDj3U4CA2ugpAaYMWqNXsdXbmJNd9egCnJEsphXNM+MnK3m0FCJ5S1kmJpa3DgPVbnQnPGWIDspW9ozbcO4K/9LkfaQO2KHuqlfFXSbdNzcEcwoqNEFE9zcIXu9/6n/ym/BC/C3aJLzEKPuYVlbFnfhZ8kcWxV3dbv4bKl28566wD+8C53aw49lTABp9PWbsB+knfc/Li3eVizf5vv/xmvnPKg5ihwKEwlrcHqucuVcVOxEv8aH37E3ZqpZypUulrHEtIWKUr+txHg+ojZDGlwnqmkGlzcVi1dLiNSJiHjfbRNOPwKpx9TVdTn3K05DBx4psIk4Ei8aCkJahRgffk4YnEXe07T4H2RR1u27E6wfQsBDofUgjFUFnwC2AiVtA+05J2zpiDK2Oa0c5fmAecN1iJzmpqFZxqYBCYhFTCsUNEmUnIcZ6aEA5rQVhEywG6w7HSW02XfOoBlQmjwulOFQAg66SvJblrTEX1YtJ3uG15T/BH1OfOQeuR8g/c0gdpT5fx2SKbs9EfHTKdM8A1GaJRHLVIwhcGyydZsbifAFVKl5EMKNU2Hryo+06BeTgqnxzYjThVySDikbtJPieco75lYfKAJOMEZBTjoITuWHXXZVhcUDIS2hpiXHV9Ku4u44bN5OYLDOkJo8w+xJSMbhBRHEdEs9JZUCkQrPMAvaHyLkxgkEHxiNkx/x2YB0mGsQ8EUWj/stW5YLhtS5SMu+/YBbNPDCkGTUybN8krRLBGPlZkVOA0j+a1+rkyQKWGaPHPLZOkJhioQYnVZ2hS3zVxMtgC46KuRwbJNd9nV2PHgb36F194ecf/Yeu2vAFe5nm/bRBFrnY4BauE8ERmZRFUn0k8hbftiVYSKMEme2dJCJSCGYAlNqh87bXOPdUkGy24P6d1ll21MBqqx48Fvv8ZHH8HZFY7j/uAq1xMJUFqCSUlJPmNbIiNsmwuMs/q9CMtsZsFO6SprzCS1Z7QL8xCQClEelpjTduDMsmWD8S1PT152BtvmIGvUeDA/yRn83u/x0/4qxoPHjx+PXY9pqX9bgMvh/Nz9kpP4pOe1/fYf3axUiMdHLlPpZCNjgtNFAhcHEDxTumNONhHrBduW+vOyY++70WWnPXj98eA4kOt/mj/5E05l9+O4o8ePx67HFqyC+qSSnyselqjZGaVK2TadbFLPWAQ4NBhHqDCCV7OTpo34AlSSylPtIdd2AJZlyzYQrDJ5lcWGNceD80CunPLGGzsfD+7wRb95NevJI5docQ3tgCyr5bGnyaPRlmwNsFELViOOx9loebGNq2moDOKpHLVP5al2cymWHbkfzGXL7kfRl44H9wZy33tvt+PB/Xnf93e+nh5ZlU18wCiRUa9m7kib9LYuOk+hudQNbxwm0AQqbfloimaB2lM5fChex+ylMwuTbfmXQtmWlenZljbdXTLuOxjI/fDDHY4Hjx8/Hrse0zXfPFxbUN1kKqSCCSk50m0Ajtx3ub9XHBKHXESb8iO6E+qGytF4nO0OG3SXzbJlhxBnKtKyl0NwybjvYCD30aMdjgePHz8eu56SVTBbgxJMliQ3Oauwg0QHxXE2Ez/EIReLdQj42Gzb4CLS0YJD9xUx7bsi0vJi5mUbW1QzL0h0PFk17rtiIPfJk52MB48fPx67npJJwyrBa2RCCQRTbGZSPCxTPOiND4G2pYyOQ4h4jINIJh5wFU1NFZt+IsZ59LSnDqBjZ2awbOku+yInunLcd8VA7rNnOxkPHj9+PGY9B0MWJJNozOJmlglvDMXDEozdhQWbgs/U6oBanGzLrdSNNnZFjOkmbi5bNt1lX7JLLhn3vXAg9/h4y/Hg8ePHI9dzQMEkWCgdRfYykYKnkP7D4rIujsujaKPBsB54vE2TS00ccvFY/Tth7JXeq1hz+qgVy04sAJawTsvOknHfCwdyT062HA8eP348Zj0vdoXF4pilKa2BROed+9fyw9rWRXeTFXESMOanvDZfJuJaSXouQdMdDJZtekZcLLvEeK04d8m474UDuaenW44Hjx8/Xns9YYqZpszGWB3AN/4VHw+k7WSFtJ3Qicuqb/NlVmgXWsxh570xg2UwxUw3WfO6B5nOuO8aA7lnZxuPB48fPx6znm1i4bsfcbaptF3zNT78eFPtwi1OaCNOqp1x3zUGcs/PN++AGD1+fMXrSVm2baTtPhPahbPhA71wIHd2bXzRa69nG+3CraTtPivahV/55tXWg8fyRY/9AdsY8VbSdp8V7cKrrgdfM//z6ILQFtJ2nxHtwmuoB4/kf74+gLeRtvvMaBdeSz34+vifx0YG20jbfTa0C6+tHrwe//NmOG0L8EbSdp8R7cLrrQe/996O+ai3ujQOskpTNULa7jOjXXj99eCd8lHvoFiwsbTdZ0a78PrrwTvlo966pLuRtB2fFe3Cm6oHP9kNH/W2FryxtN1nTLvwRurBO+Kj3pWXHidtx2dFu/Bm68Fb81HvykuPlrb7LGkX3mw9eGs+6h1Y8MbSdjegXcguQLjmevDpTQLMxtJ2N6NdyBZu9AbrwVvwUW+LbteULUpCdqm0HTelXbhNPe8G68Gb8lFvVfYfSNuxvrTdTWoXbozAzdaDZzfkorOj1oxVxlIMlpSIlpLrt8D4hrQL17z+c3h6hU/wv4Q/utps4+bm+6P/hIcf0JwQ5oQGPBL0eKPTYEXTW+eL/2DKn73J9BTXYANG57hz1cEMviVf/4tf5b/6C5pTQkMIWoAq7hTpOJjtAM4pxKu5vg5vXeUrtI09/Mo/5H+4z+Mp5xULh7cEm2QbRP2tFIKR7WM3fPf/jZ3SWCqLM2l4NxID5zB72HQXv3jj/8mLR5xXNA5v8EbFQEz7PpRfl1+MB/hlAN65qgDn3wTgH13hK7T59bmP+NIx1SHHU84nLOITt3iVz8mNO+lPrjGAnBFqmioNn1mTyk1ta47R6d4MrX7tjrnjYUpdUbv2rVr6YpVfsGG58AG8Ah9eyUN8CX4WfgV+G8LVWPDGb+Zd4cU584CtqSbMKxauxTg+dyn/LkVgA+IR8KHtejeFKRtTmLLpxN6mYVLjYxwXf5x2VofiZcp/lwKk4wGOpYDnoIZPdg/AAbwMfx0+ge9dgZvYjuqKe4HnGnykYo5TvJbG0Vj12JagRhwKa44H95ShkZa5RyLGGdfYvG7aw1TsF6iapPAS29mNS3NmsTQZCmgTzFwgL3upCTgtBTRwvGMAKrgLn4evwin8+afJRcff+8izUGUM63GOOuAs3tJkw7J4kyoNreqrpO6cYLQeFUd7TTpr5YOTLc9RUUogUOVJQ1GYJaFLAW0oTmKyYS46ZooP4S4EON3xQ5zC8/CX4CnM4c1PE8ApexpoYuzqlP3d4S3OJP8ZDK7cKWNaTlqmgDiiHwl1YsE41w1zT4iRTm3DBqxvOUsbMKKDa/EHxagtnta072ejc3DOIh5ojvh8l3tk1JF/AV6FU6jh3U8HwEazLgdCLYSQ+MYiAI2ltomkzttUb0gGHdSUUgsIYjTzLG3mObX4FBRaYtpDVNZrih9TgTeYOBxsEnN1gOCTM8Bsw/ieMc75w9kuAT6A+/AiHGvN/+Gn4KRkiuzpNNDYhDGFndWRpE6SVfm8U5bxnSgVV2jrg6JCKmneqey8VMFgq2+AM/i4L4RUbfSi27lNXZ7R7W9RTcq/q9fk4Xw3AMQd4I5ifAZz8FcVtm9SAom/dyN4lczJQW/kC42ZrHgcCoIf1oVMKkVItmMBi9cOeNHGLqOZk+QqQmrbc5YmYgxELUUN35z2iohstgfLIFmcMV7s4CFmI74L9+EFmGsi+tGnAOD4Yk9gIpo01Y4cA43BWGygMdr4YZekG3OBIUXXNukvJS8tqa06e+lSDCtnqqMFu6hWHXCF+WaYt64m9QBmNxi7Ioy7D+fa1yHw+FMAcPt7SysFLtoG4PXAk7JOA3aAxBRqUiAdU9Yp5lK3HLSRFtOim0sa8euEt08xvKjYjzeJ2GU7YawexrnKI9tmobInjFXCewpwriY9+RR4aaezFhMhGCppKwom0ChrgFlKzyPKkGlTW1YQrE9HJqu8hKGgMc6hVi5QRq0PZxNfrYNgE64utmRv6KKHRpxf6VDUaOvNP5jCEx5q185My/7RKz69UQu2im5k4/eownpxZxNLwiZ1AZTO2ZjWjkU9uaB2HFn6Q3u0JcsSx/qV9hTEApRzeBLDJQXxYmTnq7bdLa3+uqFrxLJ5w1TehnNHx5ECvCh2g2c3hHH5YsfdaSKddztfjQ6imKFGSyFwlLzxEGPp6r5IevVjk1AMx3wMqi1NxDVjLBiPs9tbsCkIY5we5/ML22zrCScFxnNtzsr9Wcc3CnD+pYO+4VXXiDE0oc/vQQ/fDK3oPESJMYXNmJa/DuloJZkcTpcYE8lIH8Dz8DJMiynNC86Mb2lNaaqP/+L7f2fcE/yP7/Lde8xfgSOdMxvOixZf/9p3+M4hT1+F+zApxg9XfUvYjc8qX2lfOOpK2gNRtB4flpFu9FTKCp2XJRgXnX6olp1zyYjTKJSkGmLE2NjUr1bxFM4AeAAHBUFIeSLqXR+NvH/M9fOnfHzOD2vCSyQJKzfgsCh+yi/Mmc35F2fUrw7miW33W9hBD1vpuUojFphIyvg7aTeoymDkIkeW3XLHmguMzbIAJejN6B5MDrhipE2y6SoFRO/AK/AcHHZHNIfiWrEe/C6cr3f/yOvrQKB+zMM55/GQdLDsR+ifr5Fiuu+/y+M78LzOE5dsNuXC3PYvYWd8NXvphLSkJIasrlD2/HOqQ+RjcRdjKTGWYhhVUm4yxlyiGPuMsZR7sMCHUBeTuNWA7if+ifXgc/hovftHXs/DV+Fvwe+f8shzMiMcweFgBly3//vwJfg5AN4450fn1Hd1Rm1aBLu22Dy3y3H2+OqMemkbGZ4jozcDjJf6596xOLpC0eMTHbKnxLxH27uZ/bMTGs2jOaMOY4m87CfQwF0dw53oa1k80JRuz/XgS+8fX3N9Af4qPIMfzKgCp4H5TDGe9GGeFPzSsZz80SlPTxXjgwJmC45njzgt2vbQ4b4OAdUK4/vWhO8d8v6EE8fMUsfakXbPpFJeLs2ubM/qdm/la3WP91uWhxXHjoWhyRUq2iJ/+5mA73zwIIo+LoZ/SgvIRjAd1IMvvn98PfgOvAJfhhm8scAKVWDuaRaK8aQ9f7vuPDH6Bj47ZXau7rqYJ66mTDwEDU6lLbCjCK0qTXyl5mnDoeNRxanj3FJbaksTk0faXxHxLrssgPkWB9LnA/MFleXcJozzjwsUvUG0X/QCve51qkMDXp9mtcyOy3rwBfdvVJK7D6/ACSzg3RoruIq5UDeESfEmVclDxnniU82vxMLtceD0hGZWzBNPMM/jSPne2OVatiTKUpY5vY7gc0LdUAWeWM5tH+O2I66AOWw9xT2BuyRVLGdoDHUsVRXOo/c+ZdRXvFfnxWyIV4upFLCl9eAL7h8Zv0QH8Ry8pA2cHzQpGesctVA37ZtklBTgHjyvdSeKY/RZw/kJMk0Y25cSNRWSigQtlULPTw+kzuJPeYEkXjQRpoGZobYsLF79pyd1dMRHInbgFTZqNLhDqiIsTNpoex2WLcy0/X6rHcdMMQvFSd5dWA++4P7xv89deACnmr36uGlL69bRCL6BSZsS6c0TU2TKK5gtWCzgAOOwQcurqk9j8whvziZSMLcq5hbuwBEsYjopUBkqw1yYBGpLA97SRElEmx5MCInBY5vgLk94iKqSWmhIGmkJ4Bi9m4L645J68LyY4wsFYBfUg5feP/6gWWm58IEmKQM89hq7KsZNaKtP5TxxrUZZVkNmMJtjbKrGxLNEbHPJxhqy7lAmbC32ZqeF6lTaknRWcYaFpfLUBh/rwaQycCCJmW15Kstv6jRHyJFry2C1ahkkIW0LO75s61+owxK1y3XqweX9m5YLM2DPFeOjn/iiqCKJ+yKXF8t5Yl/kNsqaSCryxPq5xWTFIaP8KSW0RYxqupaUf0RcTNSSdJZGcKYdYA6kdtrtmyBckfKXwqk0pHpUHlwWaffjNRBYFPUDWa8e3Lt/o0R0CdisKDM89cX0pvRHEfM8ca4t0s2Xx4kgo91MPQJ/0c9MQYq0co8MBh7bz1fio0UUHLR4aAIOvOmoYO6kwlEVODSSTliWtOtH6sPkrtctF9ZtJ9GIerBskvhdVS5cFNv9s1BU0AbdUgdK4FG+dRnjFmDTzniRMdZO1QhzMK355vigbdkpz9P6qjUGE5J2qAcXmwJ20cZUiAD0z+pGMx6xkzJkmEf40Hr4qZfVg2XzF9YOyoV5BjzVkUJngKf8lgNYwKECEHrCNDrWZzMlflS3yBhr/InyoUgBc/lKT4pxVrrC6g1YwcceK3BmNxZcAtz3j5EIpqguh9H6wc011YN75cKDLpFDxuwkrPQmUwW4KTbj9mZTwBwLq4aQMUZbHm1rylJ46dzR0dua2n3RYCWZsiHROeywyJGR7mXKlpryyCiouY56sFkBWEnkEB/raeh/Sw4162KeuAxMQpEkzy5alMY5wamMsWKKrtW2WpEWNnReZWONKWjrdsKZarpFjqCslq773PLmEhM448Pc3+FKr1+94vv/rfw4tEcu+lKTBe4kZSdijBrykwv9vbCMPcLQTygBjzVckSLPRVGslqdunwJ4oegtFOYb4SwxNgWLCmD7T9kVjTv5YDgpo0XBmN34Z/rEHp0sgyz7lngsrm4lvMm2Mr1zNOJYJ5cuxuQxwMGJq/TP5emlb8fsQBZviK4t8hFL+zbhtlpwaRSxQRWfeETjuauPsdGxsBVdO7nmP4xvzSoT29pRl7kGqz+k26B3Oy0YNV+SXbbQas1ctC/GarskRdFpKczVAF1ZXnLcpaMuzVe6lZ2g/1ndcvOVgRG3sdUAY1bKD6achijMPdMxV4muKVorSpiDHituH7rSTs7n/4y5DhRXo4FVBN4vO/zbAcxhENzGbHCzU/98Mcx5e7a31kWjw9FCe/zNeYyQjZsWb1uc7U33pN4Mji6hCLhivqfa9Ss6xLg031AgfesA/l99m9fgvnaF9JoE6bYKmkGNK3aPbHB96w3+DnxFm4hs0drLsk7U8kf/N/CvwQNtllna0rjq61sH8L80HAuvwH1tvBy2ChqWSCaYTaGN19sTvlfzFD6n+iKTbvtayfrfe9ueWh6GJFoxLdr7V72a5ZpvHcCPDzma0wTO4EgbLyedxstO81n57LYBOBzyfsOhUKsW1J1BB5vr/tz8RyqOFylQP9Tvst2JALsC5lsH8PyQ40DV4ANzYa4dedNiKNR1s+x2wwbR7q4/4cTxqEk4LWDebfisuo36JXLiWFjOtLrlNWh3K1rRS4xvHcDNlFnNmWBBAl5SWaL3oPOfnvbr5pdjVnEaeBJSYjuLEkyLLsWhKccadmOphZkOPgVdalj2QpSmfOsADhMWE2ZBu4+EEJI4wKTAuCoC4xwQbWXBltpxbjkXJtKxxabo9e7tyhlgb6gNlSbUpMh+l/FaqzVwewGu8BW1Zx7pTpQDJUjb8tsUTW6+GDXbMn3mLbXlXJiGdggxFAoUrtPS3wE4Nk02UZG2OOzlk7fRs7i95QCLo3E0jtrjnM7SR3uS1p4qtS2nJ5OwtQVHgOvArLBFijZUV9QtSl8dAY5d0E0hM0w3HS2DpIeB6m/A1+HfhJcGUq4sOxH+x3f5+VO+Ds9rYNI7zPXOYWPrtf8bYMx6fuOAX5jzNR0PdsuON+X1f7EERxMJJoU6GkTEWBvVolVlb5lh3tKCg6Wx1IbaMDdJ+9sUCc5KC46hKGCk3IVOS4TCqdBNfUs7Kd4iXf2RjnT/LLysJy3XDcHLh/vde3x8DoGvwgsa67vBk91G5Pe/HbOe7xwym0NXbtiuuDkGO2IJDh9oQvJ4cY4vdoqLDuoH9Zl2F/ofsekn8lkuhIlhQcffUtSjytFyp++p6NiE7Rqx/lodgKVoceEp/CP4FfjrquZaTtj2AvH5K/ywpn7M34K/SsoYDAdIN448I1/0/wveW289T1/lX5xBzc8N5IaHr0XMOQdHsIkDuJFifj20pBm5jzwUv9e2FhwRsvhAbalCIuIw3bhJihY3p6nTFFIZgiSYjfTf3aXuOjmeGn4bPoGvwl+CFzTRczBIuHBEeImHc37/lGfwZR0cXzVDOvaKfNHvwe+suZ771K/y/XcBlsoN996JpBhoE2toYxOznNEOS5TJc6Id5GEXLjrWo+LEWGNpPDU4WAwsIRROu+1vM+0oW37z/MBN9kqHnSArwPfgFJ7Cq/Ai3Ie7g7ncmI09v8sjzw9mzOAEXoIHxURueaAce5V80f/DOuuZwHM8vsMb5wBzOFWM7wymTXPAEvm4vcFpZ2ut0VZRjkiP2MlmLd6DIpbGSiHOjdnUHN90hRYmhTnmvhzp1iKDNj+b7t5hi79lWGwQ+HN9RsfFMy0FXbEwhfuczKgCbyxYwBmcFhhvo/7a44v+i3XWcwDP86PzpGQYdWh7csP5dBvZ1jNzdxC8pBGuxqSW5vw40nBpj5JhMwvOzN0RWqERHMr4Lv1kWX84xLR830G3j6yqZ1a8UstTlW+qJPOZ+sZ7xZPKTJLhiNOAFd6tk+jrTH31ncLOxid8+nzRb128HhUcru/y0Wn6iT254YPC6FtVSIMoW2sk727AhvTtrWKZTvgsmckfXYZWeNRXx/3YQ2OUxLDrbHtN11IwrgXT6c8dATDwLniYwxzO4RzuQqTKSC5gAofMZ1QBK3zQ4JWobFbcvJm87FK+6JXrKahLn54m3p+McXzzYtP8VF/QpJuh1OwieElEoI1pRxPS09FBrkq2tWCU59+HdhNtTIqKm8EBrw2RTOEDpG3IKo2Y7mFdLm3ZeVjYwVw11o/oznceMve4CgMfNym/utA/d/ILMR7gpXzRy9eDsgLcgbs8O2Va1L0zzIdwGGemTBuwROHeoMShkUc7P+ISY3KH5ZZeWqO8mFTxQYeXTNuzvvK5FGPdQfuu00DwYFY9dyhctEt+OJDdnucfpmyhzUJzfsJjr29l8S0bXBfwRS9ZT26tmMIdZucch5ZboMz3Nio3nIOsYHCGoDT4kUA9MiXEp9Xsui1S8th/kbWIrMBxDGLodWUQIWcvnXy+9M23xPiSMOiRPqM+YMXkUN3gXFrZJwXGzUaMpJfyRS9ZT0lPe8TpScuRlbMHeUmlaKDoNuy62iWNTWNFYjoxFzuJs8oR+RhRx7O4SVNSXpa0ZJQ0K1LAHDQ+D9IepkMXpcsq5EVCvClBUIzDhDoyKwDw1Lc59GbTeORivugw1IcuaEOaGWdNm+Ps5fQ7/tm0DjMegq3yM3vb5j12qUId5UZD2oxDSEWOZMSqFl/W+5oynWDa/aI04tJRQ2eTXusg86SQVu/nwSYwpW6wLjlqIzwLuxGIvoAvul0PS+ZNz0/akp/pniO/8JDnGyaCkzbhl6YcqmK/69prxPqtpx2+Km9al9sjL+rwMgHw4jE/C8/HQ3m1vBuL1fldbzd8mOueVJ92syqdEY4KJjSCde3mcRw2TA6szxedn+zwhZMps0XrqEsiUjnC1hw0TELC2Ek7uAAdzcheXv1BYLagspxpzSAoZZUsIzIq35MnFQ9DOrlNB30jq3L4pkhccKUAA8/ocvN1Rzx9QyOtERs4CVsJRK/DF71kPYrxYsGsm6RMh4cps5g1DOmM54Ly1ii0Hd3Y/BMk8VWFgBVmhqrkJCPBHAolwZaWzLR9Vb7bcWdX9NyUYE+uB2BKfuaeBUcjDljbYVY4DdtsVWvzRZdWnyUzDpjNl1Du3aloAjVJTNDpcIOVVhrHFF66lLfJL1zJr9PQ2nFJSBaKoDe+sAvLufZVHVzYh7W0h/c6AAZ+7Tvj6q9j68G/cTCS/3n1vLKHZwNi+P+pS0WkZNMBMUl+LDLuiE4omZy71r3UFMwNJV+VJ/GC5ixVUkBStsT4gGKh0Gm4Oy3qvq7Lbmq24nPdDuDR9deR11XzP4vFu3TYzfnIyiSVmgizUYGqkIXNdKTY9pgb9D2Ix5t0+NHkVzCdU03suWkkVZAoCONCn0T35gAeW38de43mf97sMOpSvj4aa1KYUm58USI7Wxxes03bAZdRzk6UtbzMaCQ6IxO0dy7X+XsjoD16hpsBeGz9dfzHj+R/Hp8nCxZRqkEDTaCKCSywjiaoMJ1TITE9eg7Jqnq8HL6gDwiZb0u0V0Rr/rmvqjxKuaLCX7ZWXTvAY+uvm3z8CP7nzVpngqrJpZKwWnCUjIviYVlirlGOzPLI3SMVyp/elvBUjjDkNhrtufFFErQ8pmdSlbK16toBHlt/HV8uHMX/vEGALkV3RJREiSlopxwdMXOZPLZ+ix+kAHpMKIk8UtE1ygtquttwxNhphrIZ1IBzjGF3IIGxGcBj6q8bHJBG8T9vdsoWrTFEuebEZuVxhhClH6P5Zo89OG9fwHNjtNQTpD0TG9PJLEYqvEY6Rlxy+ZZGfL0Aj62/bnQCXp//eeM4KzfQVJbgMQbUjlMFIm6TpcfWlZje7NBSV6IsEVmumWIbjiloUzQX9OzYdo8L1wjw2PrrpimONfmfNyzKklrgnEkSzT5QWYQW40YShyzqsRmMXbvVxKtGuYyMKaU1ugenLDm5Ily4iT14fP11Mx+xJv+zZ3MvnfdFqxU3a1W/FTB4m3Qfsyc1XUcdVhDeUDZXSFHHLQj/Y5jtC7ZqM0CXGwB4bP11i3LhOvzPGygYtiUBiwQV/4wFO0majijGsafHyRLu0yG6q35cL1rOpVxr2s5cM2jJYMCdc10Aj6q/blRpWJ//+dmm5psMl0KA2+AFRx9jMe2WbC4jQxnikd4DU8TwUjRVacgdlhmr3bpddzuJ9zXqr2xnxJfzP29RexdtjDVZqzkqa6PyvcojGrfkXiJ8SEtml/nYskicv0ivlxbqjemwUjMw5evdg8fUX9nOiC/lf94Q2i7MURk9nW1MSj5j8eAyV6y5CN2S6qbnw3vdA1Iwq+XOSCl663udN3IzLnrt+us25cI1+Z83SXQUldqQq0b5XOT17bGpLd6ssN1VMPf8c+jG8L3NeCnMdF+Ra3fRa9dft39/LuZ/3vwHoHrqGmQFafmiQw6eyzMxS05K4bL9uA+SKUQzCnSDkqOGokXyJvbgJ/BHI+qvY69//4rl20NsmK2ou2dTsyIALv/91/8n3P2Aao71WFGi8KKv1fRC5+J67Q/507/E/SOshqN5TsmYIjVt+kcjAx98iz/4SaojbIV1rexE7/C29HcYD/DX4a0rBOF5VTu7omsb11L/AWcVlcVZHSsqGuXLLp9ha8I//w3Mv+T4Ew7nTBsmgapoCrNFObIcN4pf/Ob/mrvHTGqqgAupL8qWjWPS9m/31jAe4DjA+4+uCoQoT/zOzlrNd3qd4SdphFxsUvYwGWbTWtISc3wNOWH+kHBMfc6kpmpwPgHWwqaSUG2ZWWheYOGQGaHB+eQ/kn6b3pOgLV+ODSn94wDvr8Bvb70/LLuiPPEr8OGVWfDmr45PZyccEmsVXZGe1pRNX9SU5+AVQkNTIVPCHF/jGmyDC9j4R9LfWcQvfiETmgMMUCMN1uNCakkweZsowdYobiMSlnKA93u7NzTXlSfe+SVbfnPQXmg9LpYAQxpwEtONyEyaueWM4FPjjyjG3uOaFmBTWDNgBXGEiQpsaWhnAqIijB07Dlsy3fUGeP989xbWkyf+FF2SNEtT1E0f4DYYVlxFlbaSMPIRMk/3iMU5pME2SIWJvjckciebkQuIRRyhUvkHg/iUljG5kzVog5hV7vIlCuBrmlhvgPfNHQM8lCf+FEGsYbMIBC0qC9a0uuy2wLXVbLBaP5kjHokCRxapkQyzI4QEcwgYHRZBp+XEFTqXFuNVzMtjXLJgX4gAid24Hjwc4N3dtVSe+NNiwTrzH4WVUOlDobUqr1FuAgYllc8pmzoVrELRHSIW8ViPxNy4xwjBpyR55I6J220qQTZYR4guvUICJiSpr9gFFle4RcF/OMB7BRiX8sSfhpNSO3lvEZCQfLUVTKT78Ek1LRLhWN+yLyTnp8qWUZ46b6vxdRGXfHVqx3eI75YaLa4iNNiK4NOW7wPW6lhbSOF9/M9qw8e/aoB3d156qTzxp8pXx5BKAsYSTOIIiPkp68GmTq7sZtvyzBQaRLNxIZ+paozHWoLFeExIhRBrWitHCAHrCF7/thhD8JhYz84wg93QRV88wLuLY8zF8sQ36qF1J455bOlgnELfshKVxYOXKVuKx0jaj22sczTQqPqtV/XDgpswmGTWWMSDw3ssyUunLLrVPGjYRsH5ggHeHSWiV8kT33ycFSfMgkoOK8apCye0J6VW6GOYvffgU9RWsukEi2kUV2nl4dOYUzRik9p7bcA4ggdJ53LxKcEe17B1R8eqAd7dOepV8sTXf5lhejoL85hUdhDdknPtKHFhljOT+bdq0hxbm35p2nc8+Ja1Iw+tJykgp0EWuAAZYwMVwac5KzYMslhvgHdHRrxKnvhTYcfKsxTxtTETkjHO7rr3zjoV25lAQHrqpV7bTiy2aXMmUhTBnKS91jhtR3GEoF0oLnWhWNnYgtcc4N0FxlcgT7yz3TgNIKkscx9jtV1ZKpWW+Ub1tc1eOv5ucdgpx+FJy9pgbLE7xDyXb/f+hLHVGeitHOi6A7ybo3sF8sS7w7cgdk0nJaOn3hLj3uyD0Zp5pazFIUXUpuTTU18d1EPkDoX8SkmWTnVIozEdbTcZjoqxhNHf1JrSS/AcvHjZ/SMHhL/7i5z+POsTUh/8BvNfYMTA8n+yU/MlTZxSJDRStqvEuLQKWwDctMTQogUDyQRoTQG5Kc6oQRE1yV1jCA7ri7jdZyK0sYTRjCR0Hnnd+y7nHxNgTULqw+8wj0mQKxpYvhjm9uSUxg+TTy7s2GtLUGcywhXSKZN275GsqlclX90J6bRI1aouxmgL7Q0Nen5ziM80SqMIo8cSOo+8XplT/5DHNWsSUr/6lLN/QQ3rDyzLruEW5enpf7KqZoShEduuSFOV7DLX7Ye+GmXb6/hnNNqKsVXuMDFpb9Y9eH3C6NGEzuOuI3gpMH/I6e+zDiH1fXi15t3vA1czsLws0TGEtmPEJdiiFPwlwKbgLHAFk4P6ZyPdymYYHGE0dutsChQBl2JcBFlrEkY/N5bQeXQ18gjunuMfMfsBlxJSx3niO485fwO4fGD5T/+3fPQqkneWVdwnw/3bMPkW9Wbqg+iC765Zk+xcT98ibKZc2EdgHcLoF8cSOo/Oc8fS+OyEULF4g4sJqXVcmfMfsc7A8v1/yfGXmL9I6Fn5pRwZhsPv0TxFNlAfZCvG+Oohi82UC5f/2IsJo0cTOm9YrDoKhFPEUr/LBYTUNht9zelHXDqwfPCIw4owp3mOcIQcLttWXFe3VZ/j5H3cIc0G6oPbCR+6Y2xF2EC5cGUm6wKC5tGEzhsWqw5hNidUiKX5gFWE1GXh4/Qplw4sVzOmx9QxU78g3EF6wnZlEN4FzJ1QPSLEZz1KfXC7vd8ssGdIbNUYpVx4UapyFUHzJoTOo1McSkeNn1M5MDQfs4qQuhhX5vQZFw8suwWTcyYTgioISk2YdmkhehG4PkE7w51inyAGGaU+uCXADabGzJR1fn3lwkty0asIo8cROm9Vy1g0yDxxtPvHDAmpu+PKnM8Ix1wwsGw91YJqhteaWgjYBmmQiebmSpwKKzE19hx7jkzSWOm66oPbzZ8Yj6kxVSpYjVAuvLzYMCRo3oTQecOOjjgi3NQ4l9K5/hOGhNTdcWVOTrlgYNkEXINbpCkBRyqhp+LdRB3g0OU6rMfW2HPCFFMV9nSp+uB2woepdbLBuJQyaw/ZFysXrlXwHxI0b0LovEkiOpXGA1Ijagf+KUNC6rKNa9bQnLFqYNkEnMc1uJrg2u64ELPBHpkgWbmwKpJoDhMwNbbGzAp7Yg31wS2T5rGtzit59PrKhesWG550CZpHEzpv2NGRaxlNjbMqpmEIzygJqQfjypycs2pg2cS2RY9r8HUqkqdEgKTWtWTKoRvOBPDYBltja2SO0RGjy9UHtxwRjA11ujbKF+ti5cIR9eCnxUg6owidtyoU5tK4NLji5Q3HCtiyF2IqLGYsHViOXTXOYxucDqG0HyttqYAKqYo3KTY1ekyDXRAm2AWh9JmsVh/ccg9WJ2E8YjG201sPq5ULxxX8n3XLXuMInbft2mk80rRGjCGctJ8/GFdmEQ9Ug4FlE1ll1Y7jtiraqm5Fe04VV8lvSVBL8hiPrfFVd8+7QH3Qbu2ipTVi8cvSGivc9cj8yvH11YMHdNSERtuOslM97feYFOPKzGcsI4zW0YGAbTAOaxCnxdfiYUmVWslxiIblCeAYr9VYR1gM7GmoPrilunSxxeT3DN/2eBQ9H11+nk1adn6VK71+5+Jfct4/el10/7KBZfNryUunWSCPxPECk1rdOv1WVSrQmpC+Tl46YD3ikQYcpunSQgzVB2VHFhxHVGKDgMEY5GLlQnP7FMDzw7IacAWnO6sBr12u+XanW2AO0wQ8pknnFhsL7KYIqhkEPmEXFkwaN5KQphbkUmG72wgw7WSm9RiL9QT925hkjiVIIhphFS9HKI6/8QAjlpXqg9W2C0apyaVDwKQwrwLY3j6ADR13ZyUNByQXHQu6RY09Hu6zMqXRaNZGS/KEJs0cJEe9VH1QdvBSJv9h09eiRmy0V2uJcqHcShcdvbSNg5fxkenkVprXM9rDVnX24/y9MVtncvbKY706anNl3ASll9a43UiacVquXGhvq4s2FP62NGKfQLIQYu9q1WmdMfmUrDGt8eDS0cXozH/fjmUH6Jruvm50hBDSaEU/2Ru2LEN/dl006TSc/g7tfJERxGMsgDUEr104pfWH9lQaN+M4KWQjwZbVc2rZVNHsyHal23wZtIs2JJqtIc/WLXXRFCpJkfE9jvWlfFbsNQ9pP5ZBS0zKh4R0aMFj1IjTcTnvi0Zz2rt7NdvQb2mgbju1plsH8MmbnEk7KbK0b+wC2iy3aX3szW8xeZvDwET6hWZYwqTXSSG+wMETKum0Dq/q+x62gt2ua2ppAo309TRk9TPazfV3qL9H8z7uhGqGqxNVg/FKx0HBl9OVUORn8Q8Jx9gFttGQUDr3tzcXX9xGgN0EpzN9mdZ3GATtPhL+CjxFDmkeEU6x56kqZRusLzALXVqkCN7zMEcqwjmywDQ6OhyUe0Xao1Qpyncrg6wKp9XfWDsaZplElvQ/b3sdweeghorwBDlHzgk1JmMc/wiERICVy2VJFdMjFuLQSp3S0W3+sngt2njwNgLssFGVQdJ0tu0KH4ky1LW4yrbkuaA6Iy9oz/qEMMXMMDWyIHhsAyFZc2peV9hc7kiKvfULxCl9iddfRK1f8kk9qvbdOoBtOg7ZkOZ5MsGrSHsokgLXUp9y88smniwWyuFSIRVmjplga3yD8Uij5QS1ZiM4U3Qw5QlSm2bXjFe6jzzBFtpg+/YBbLAWG7OPynNjlCw65fukGNdkJRf7yM1fOxVzbxOJVocFoYIaGwH22mIQkrvu1E2nGuebxIgW9U9TSiukPGU+Lt++c3DJPKhyhEEbXCQLUpae2exiKy6tMPe9mDRBFCEMTWrtwxN8qvuGnt6MoihKWS5NSyBhbH8StXoAz8PLOrRgLtOT/+4vcu+7vDLnqNvztOq7fmd8sMmY9Xzn1zj8Dq8+XVdu2Nv0IIySgEdQo3xVHps3Q5i3fLFsV4aiqzAiBhbgMDEd1uh8qZZ+lwhjkgokkOIv4xNJmyncdfUUzgB4oFMBtiu71Xumpz/P+cfUP+SlwFExwWW62r7b+LSPxqxn/gvMZ5z9C16t15UbNlq+jbGJtco7p8wbYlL4alSyfWdeuu0j7JA3JFNuVAwtst7F7FhWBbPFNKIUORndWtLraFLmMu7KFVDDOzqkeaiN33YAW/r76wR4XDN/yN1z7hejPau06EddkS/6XThfcz1fI/4K736fO48vlxt2PXJYFaeUkFS8U15XE3428xdtn2kc8GQlf1vkIaNRRnOMvLTWrZbElEHeLWi1o0dlKPAh1MVgbbVquPJ5+Cr8LU5/H/+I2QlHIU2ClXM9G8v7Rr7oc/hozfUUgsPnb3D+I+7WF8kNO92GY0SNvuxiE+2Bt8prVJTkzE64sfOstxuwfxUUoyk8VjcTlsqe2qITSFoSj6Epd4KsT6BZOWmtgE3hBfir8IzZDwgV4ZTZvD8VvPHERo8v+vL1DASHTz/i9OlKueHDjK5Rnx/JB1Vb1ioXdBra16dmt7dgik10yA/FwJSVY6XjA3oy4SqM2frqDPPSRMex9qs3XQtoWxMj7/Er8GWYsXgjaVz4OYumP2+9kbxvny/6kvWsEBw+fcb5bInc8APdhpOSs01tEqIkoiZjbAqKMruLbJYddHuHFRIyJcbdEdbl2sVLaySygunutBg96Y2/JjKRCdyHV+AEFtTvIpbKIXOamknYSiB6KV/0JetZITgcjjk5ZdaskBtWO86UF0ap6ozGXJk2WNiRUlCPFir66lzdm/SLSuK7EUdPz8f1z29Skq6F1fXg8+5UVR6bszncP4Tn4KUkkdJ8UFCY1zR1i8RmL/qQL3rlei4THG7OODlnKko4oI01kd3CaM08Ia18kC3GNoVaO9iDh+hWxSyTXFABXoau7Q6q9OxYg/OVEMw6jdbtSrJ9cBcewGmaZmg+bvkUnUUaGr+ZfnMH45Ivevl61hMcXsxYLFTu1hTm2zViCp7u0o5l+2PSUh9bDj6FgYypufBDhqK2+oXkiuHFHR3zfj+9PtA8oR0xnqX8qn+sx3bFODSbbF0X8EUvWQ8jBIcjo5bRmLOljDNtcqNtOe756h3l0VhKa9hDd2l1eqmsnh0MNMT/Cqnx6BInumhLT8luljzQ53RiJeA/0dxe5NK0o2fA1+GLXr6eNQWHNUOJssQaTRlGpLHKL9fD+IrQzTOMZS9fNQD4AnRNVxvTdjC+fJdcDDWQcyB00B0t9BDwTxXgaAfzDZ/DBXzRnfWMFRwuNqocOmX6OKNkY63h5n/fFcB28McVHqnXZVI27K0i4rDLNE9lDKV/rT+udVbD8dFFu2GGZ8mOt0kAXcoX3ZkIWVtw+MNf5NjR2FbivROHmhV1/pj2egv/fMGIOWTIWrV3Av8N9imV9IWml36H6cUjqEWNv9aNc+veb2sH46PRaHSuMBxvtW+twxctq0z+QsHhux8Q7rCY4Ct8lqsx7c6Sy0dl5T89rIeEuZKoVctIk1hNpfavER6yyH1Vvm3MbsUHy4ab4hWr/OZPcsRBphnaV65/ZcdYPNNwsjN/djlf9NqCw9U5ExCPcdhKxUgLSmfROpLp4WSUr8ojdwbncbvCf+a/YzRaEc6QOvXcGO256TXc5Lab9POvB+AWY7PigWYjzhifbovuunzRawsO24ZqQQAqguBtmpmPB7ysXJfyDDaV/aPGillgz1MdQg4u5MYaEtBNNHFjkRlSpd65lp4hd2AVPTfbV7FGpyIOfmNc/XVsPfg7vzaS/3nkvLL593ANLvMuRMGpQIhiF7kUEW9QDpAUbTWYBcbp4WpacHHY1aacqQyjGZS9HI3yCBT9kUZJhVOD+zUDvEH9ddR11fzPcTDQ5TlgB0KwqdXSavk9BC0pKp0WmcuowSw07VXmXC5guzSa4p0UvRw2lbDiYUx0ExJJRzWzi6Gm8cnEkfXXsdcG/M/jAJa0+bmCgdmQ9CYlNlSYZOKixmRsgiFxkrmW4l3KdFKv1DM8tk6WxPYJZhUUzcd8Kdtgrw/gkfXXDT7+avmfVak32qhtkg6NVdUS5wgkru1YzIkSduTW1FDwVWV3JQVJVuieTc0y4iDpFwc7/BvSalvKdQM8sv662cevz/+8sQVnjVAT0W2wLllw1JiMhJRxgDjCjLQsOzSFSgZqx7lAW1JW0e03yAD3asC+GD3NbQhbe+mN5GXH1F83KDOM4n/e5JIuH4NpdQARrFPBVptUNcjj4cVMcFSRTE2NpR1LEYbYMmfWpXgP9KejaPsLUhuvLCsVXznAG9dfx9SR1ud/3hZdCLHb1GMdPqRJgqDmm76mHbvOXDtiO2QPUcKo/TWkQ0i2JFXpBoo7vij1i1Lp3ADAo+qvG3V0rM//vFnnTE4hxd5Ka/Cor5YEdsLVJyKtDgVoHgtW11pWSjolPNMnrlrVj9Fv2Qn60twMwKPqr+N/wvr8z5tZcDsDrv06tkqyzESM85Ycv6XBWA2birlNCXrI6VbD2lx2L0vQO0QVTVVLH4SE67fgsfVXv8n7sz7/85Z7cMtbE6f088wSaR4kCkCm10s6pKbJhfqiUNGLq+0gLWC6eUAZFPnLjwqtKd8EwGvWX59t7iPW4X/eAN1svgRVSY990YZg06BD1ohLMtyFTI4pKTJsS9xREq9EOaPWiO2gpms7397x6nQJkbh+Fz2q/rqRROX6/M8bJrqlVW4l6JEptKeUFuMYUbtCQ7CIttpGc6MY93x1r1vgAnRXvY5cvwWPqb9uWQm+lP95QxdNMeWhOq1x0Db55C7GcUv2ZUuN6n8iKzsvOxibC//Yfs9Na8r2Rlz02vXXDT57FP/zJi66/EJSmsJKa8QxnoqW3VLQ+jZVUtJwJ8PNX1NQCwfNgdhhHD9on7PdRdrdGPF28rJr1F+3LBdeyv+8yYfLoMYet1vX4upNAjVvwOUWnlNXJXlkzk5Il6kqeoiL0C07qno+/CYBXq/+utlnsz7/Mzvy0tmI4zm4ag23PRN3t/CWryoUVJGm+5+K8RJ0V8Hc88/XHUX/HfiAq7t+BH+x6v8t438enWmdJwFA6ZINriLGKv/95f8lT9/FnyA1NMVEvQyaXuu+gz36f/DD73E4pwqpLcvm/o0Vle78n//+L/NPvoefp1pTJye6e4A/D082FERa5/opeH9zpvh13cNm19/4v/LDe5xMWTi8I0Ta0qKlK27AS/v3/r+/x/2GO9K2c7kVMonDpq7//jc5PKCxeNPpFVzaRr01wF8C4Pu76hXuX18H4LduTr79guuFD3n5BHfI+ZRFhY8w29TYhbbLi/bvBdqKE4fUgg1pBKnV3FEaCWOWyA+m3WpORZr/j+9TKJtW8yBTF2/ZEODI9/QavHkVdGFp/Pjn4Q+u5hXapsP5sOH+OXXA1LiKuqJxiMNbhTkbdJTCy4llEt6NnqRT4dhg1V3nbdrm6dYMecA1yTOL4PWTE9L5VzPFlLBCvlG58AhehnN4uHsAYinyJ+AZ/NkVvELbfOBUuOO5syBIEtiqHU1k9XeISX5bsimrkUUhnGDxourN8SgUsCZVtKyGbyGzHXdjOhsAvOAswSRyIBddRdEZWP6GZhNK/yjwew9ehBo+3jEADu7Ay2n8mDc+TS7awUHg0OMzR0LABhqLD4hJEh/BEGyBdGlSJoXYXtr+3HS4ijzVpgi0paWXtdruGTknXBz+11qT1Q2inxaTzQCO46P3lfLpyS4fou2PH/PupwZgCxNhGlj4IvUuWEsTkqMWm6i4xCSMc9N1RDQoCVcuGItJ/MRWefais+3synowi/dESgJjkilnWnBTGvRWmaw8oR15257t7CHmCf8HOn7cwI8+NQBXMBEmAa8PMRemrNCEhLGEhDQKcGZWS319BX9PFBEwGTbRBhLbDcaV3drFcDqk5kCTd2JF1Wp0HraqBx8U0wwBTnbpCadwBA/gTH/CDrcCs93LV8E0YlmmcyQRQnjBa8JESmGUfIjK/7fkaDJpmD2QptFNVJU1bbtIAjjWQizepOKptRjbzR9Kag6xZmMLLjHOtcLT3Tx9o/0EcTT1XN3E45u24AiwEypDJXihKjQxjLprEwcmRKclaDNZCVqr/V8mYWyFADbusiY5hvgFoU2vio49RgJLn5OsReRFN6tabeetiiy0V7KFHT3HyZLx491u95sn4K1QQSPKM9hNT0wMVvAWbzDSVdrKw4zRjZMyJIHkfq1VAVCDl/bUhNKlGq0zGr05+YAceXVPCttVk0oqjVwMPt+BBefx4yPtGVkUsqY3CHDPiCM5ngupUwCdbkpd8kbPrCWHhkmtIKLEetF2499eS1jZlIPGYnlcPXeM2KD9vLS0bW3ktYNqUllpKLn5ZrsxlIzxvDu5eHxzGLctkZLEY4PgSOg2IUVVcUONzUDBEpRaMoXNmUc0tFZrTZquiLyKxrSm3DvIW9Fil+AkhXu5PhEPx9mUNwqypDvZWdKlhIJQY7vn2OsnmBeOWnYZ0m1iwbbw1U60by5om47iHRV6fOgzjMf/DAZrlP40Z7syxpLK0lJ0gqaAK1c2KQKu7tabTXkLFz0sCftuwX++MyNeNn68k5Buq23YQhUh0SNTJa1ioQ0p4nUG2y0XilF1JqODqdImloPS4Bp111DEWT0jJjVv95uX9BBV7eB3bUWcu0acSVM23YZdd8R8UbQUxJ9wdu3oMuhdt929ME+mh6JXJ8di2RxbTi6TbrDquqV4aUKR2iwT6aZbyOwEXN3DUsWr8Hn4EhwNyHuXHh7/pdaUjtR7vnDh/d8c9xD/s5f501eQ1+CuDiCvGhk1AN/4Tf74RfxPwD3toLarR0zNtsnPzmS64KIRk861dMWCU8ArasG9T9H0ZBpsDGnjtAOM2+/LuIb2iIUGXNgl5ZmKD/Tw8TlaAuihaFP5yrw18v4x1898zIdP+DDAX1bM3GAMvPgRP/cJn3zCW013nrhHkrITyvYuwOUkcHuKlRSW5C6rzIdY4ppnF7J8aAJbQepgbJYBjCY9usGXDKQxq7RZfh9eg5d1UHMVATRaD/4BHK93/1iAgYZ/+jqPn8Dn4UExmWrpa3+ZOK6MvM3bjwfzxNWA2dhs8+51XHSPJiaAhGSpWevEs5xHLXcEGFXYiCONySH3fPWq93JIsBiSWvWyc3CAN+EcXoT7rCSANloPPoa31rt/5PUA/gp8Q/jDD3hyrjzlR8VkanfOvB1XPubt17vzxAfdSVbD1pzAnfgyF3ycadOTOTXhpEUoLC1HZyNGW3dtmjeXgr2r56JNmRwdNNWaQVBddd6rh4MhviEB9EFRD/7RGvePvCbwAL4Mx/D6M541hHO4D3e7g6PafdcZVw689z7NGTwo5om7A8sPhccT6qKcl9NJl9aM/9kX+e59Hh1yPqGuCCZxuITcsmNaJ5F7d0q6J3H48TO1/+M57085q2icdu2U+W36Ldllz9Agiv4YGljoEN908EzvDOrBF98/vtJwCC/BF2AG75xxEmjmMIcjxbjoaxqOK3/4hPOZzhMPBpYPG44CM0dTVm1LjLtUWWVz1Bcf8tEx0zs8O2A2YVHRxKYOiy/aOVoAaMu0i7ubu43njjmd4ibMHU1sIDHaQNKrZND/FZYdk54oCXetjq7E7IVl9eAL7t+oHnwXXtLx44czzoRFHBztYVwtH1d+NOMkupZ5MTM+gUmq90X+Bh9zjRlmaQ+m7YMqUL/veemcecAtOJ0yq1JnVlN27di2E0+Klp1tAJ4KRw1eMI7aJjsO3R8kPSI3fUFXnIOfdQe86sIIVtWDL7h//Ok6vj8vwDk08NEcI8zz7OhBy+WwalzZeZ4+0XniRfst9pAJqQHDGLzVQ2pheZnnv1OWhwO43/AgcvAEXEVVpa4db9sGvNK8wjaENHkfFQ4Ci5i7dqnQlPoLQrHXZDvO3BIXZbJOBrOaEbML6sFL798I4FhKihjHMsPjBUZYCMFr6nvaArxqXPn4lCa+cHfSa2cP27g3Z3ziYTRrcbQNGLQmGF3F3cBdzzzX7AILx0IB9rbwn9kx2G1FW3Inic+ZLIsVvKR8Zwfj0l1fkqo8LWY1M3IX14OX3r9RKTIO+d9XzAI8qRPGPn/4NC2n6o4rN8XJ82TOIvuVA8zLKUHRFgBCetlDZlqR1gLKjS39xoE7Bt8UvA6BxuEDjU3tFsEijgA+615tmZkXKqiEENrh41iLDDZNq4pKTWR3LZfnos81LOuNa15cD956vLMsJd1rqYp51gDUQqMYm2XsxnUhD2jg1DM7SeuJxxgrmpfISSXVIJIS5qJJSvJPEQ49DQTVIbYWJ9QWa/E2+c/oPK1drmC7WSfJRNKBO5Yjvcp7Gc3dmmI/Xh1kDTEuiSnWqQf37h+fTMhGnDf6dsS8SQfQWlqqwXXGlc/PEZ/SC5mtzIV0nAshlQdM/LvUtYutrEZ/Y+EAFtq1k28zQhOwLr1AIeANzhF8t9qzTdZf2qRKO6MWE9ohBYwibbOmrFtNmg3mcS+tB28xv2uKd/agYCvOP+GkSc+0lr7RXzyufL7QbkUpjLjEWFLqOIkAGu2B0tNlO9Eau2W1qcOUvVRgKzypKIQZ5KI3q0MLzqTNRYqiZOqmtqloIRlmkBHVpHmRYV6/HixbO6UC47KOFJnoMrVyr7wYz+SlW6GUaghYbY1I6kkxA2W1fSJokUdSh2LQ1GAimRGm0MT+uu57H5l7QgOWxERpO9moLRPgTtquWCfFlGlIjQaRly9odmzMOWY+IBO5tB4sW/0+VWGUh32qYk79EidWKrjWuiLpiVNGFWFRJVktyeXWmbgBBzVl8anPuXyNJlBJOlKLTgAbi/EYHVHxWiDaVR06GnHQNpJcWcK2jJtiCfG2sEHLzuI66sGrMK47nPIInPnu799935aOK2cvmvubrE38ZzZjrELCmXM2hM7UcpXD2oC3+ECVp7xtIuxptJ0jUr3sBmBS47TVxlvJ1Sqb/E0uLdvLj0lLr29ypdd/eMX3f6lrxGlKwKQxEGvw0qHbkbwrF3uHKwVENbIV2wZ13kNEF6zD+x24aLNMfDTCbDPnEikZFyTNttxWBXDaBuM8KtI2rmaMdUY7cXcUPstqTGvBGSrFWIpNMfbdea990bvAOC1YX0qbc6smDS1mPxSJoW4fwEXvjMmhlijDRq6qale6aJEuFGoppYDoBELQzLBuh/mZNx7jkinv0EtnUp50lO9hbNK57lZaMAWuWR5Yo9/kYwcYI0t4gWM47Umnl3YmpeBPqSyNp3K7s2DSAS/39KRuEN2bS4xvowV3dFRMx/VFcp2Yp8w2nTO9hCXtHG1kF1L4KlrJr2wKfyq77R7MKpFKzWlY9UkhYxyHWW6nBWPaudvEAl3CGcNpSXPZ6R9BbBtIl6cHL3gIBi+42CYXqCx1gfGWe7Ap0h3luyXdt1MKy4YUT9xSF01G16YEdWsouW9mgDHd3veyA97H+Ya47ZmEbqMY72oPztCGvK0onL44AvgC49saZKkWRz4veWljE1FHjbRJaWv6ZKKtl875h4CziFCZhG5rx7tefsl0aRT1bMHZjm8dwL/6u7wCRysaQblQoG5yAQN5zpatMNY/+yf8z+GLcH/Qn0iX2W2oEfXP4GvwQHuIL9AYGnaO3zqAX6946nkgqZNnUhx43DIdQtMFeOPrgy/y3Yd85HlJWwjLFkU3kFwq28xPnuPhMWeS+tDLV9Otllq7pQCf3uXJDN9wFDiUTgefHaiYbdfi3b3u8+iY6TnzhgehI1LTe8lcd7s1wJSzKbahCRxKKztTLXstGAiu3a6rPuQs5pk9TWAan5f0BZmGf7Ylxzzk/A7PAs4QPPPAHeFQ2hbFHszlgZuKZsJcUmbDC40sEU403cEjczstOEypa+YxevL4QBC8oRYqWdK6b7sK25tfE+oDZgtOQ2Jg8T41HGcBE6fTWHn4JtHcu9S7uYgU5KSCkl/mcnq+5/YBXOEr6lCUCwOTOM1taOI8mSxx1NsCXBEmLKbMAg5MkwbLmpBaFOPrNSlO2HnLiEqW3tHEwd8AeiQLmn+2gxjC3k6AxREqvKcJbTEzlpLiw4rNZK6oJdidbMMGX9FULKr0AkW+2qDEPBNNm5QAt2Ik2nftNWHetubosHLo2nG4vQA7GkcVCgVCgaDixHqo9UUn1A6OshapaNR/LPRYFV8siT1cCtJE0k/3WtaNSuUZYKPnsVIW0xXWnMUxq5+En4Kvw/MqQmVXnAXj9Z+9zM98zM/Agy7F/qqj2Nh67b8HjFnPP3iBn/tkpdzwEJX/whIcQUXOaikeliCRGUk7tiwF0rItwMEhjkZ309hikFoRAmLTpEXWuHS6y+am/KB/fM50aLEhGnSMwkpxzOov4H0AvgovwJ1iGzDLtJn/9BU+fAINfwUe6FHSLhu83viV/+/HrOePX+STT2B9uWGbrMHHLldRBlhS/CJQmcRxJFqZica01XixAZsYiH1uolZxLrR/SgxVIJjkpQP4PE9sE59LKLr7kltSBogS5tyszzH8Fvw8/AS8rNOg0xUS9fIaHwb+6et8Q/gyvKRjf5OusOzGx8evA/BP4IP11uN/grca5O0lcsPLJ5YjwI4QkJBOHa0WdMZYGxPbh2W2nR9v3WxEWqgp/G3+6VZbRLSAAZ3BhdhAaUL33VUSw9yjEsvbaQ9u4A/gGXwZXoEHOuU1GSj2chf+Mo+f8IcfcAxfIKVmyunRbYQVnoevwgfw3TXXcw++xNuP4fhyueEUNttEduRVaDttddoP0eSxLe2LENk6itYxlrxBNBYrNNKSQmeaLcm9c8UsaB5WyO6675yyQIAWSDpBVoA/gxmcwEvwoDv0m58UE7gHn+fJOa8/Ywan8EKRfjsopF83eCglX/Sfr7OeaRoQfvt1CGvIDccH5BCvw1sWIzRGC/66t0VTcLZQZtm6PlAasbOJ9iwWtUo7biktTSIPxnR24jxP1ZKaqq+2RcXM9OrBAm/AAs7hDJ5bNmGb+KIfwCs8a3jnjBrOFeMjHSCdbKr+2uOLfnOd9eiA8Hvvwwq54VbP2OqwkB48Ytc4YEOiH2vTXqodabfWEOzso4qxdbqD5L6tbtNPECqbhnA708DZH4QOJUXqScmUlks7Ot6FBuZw3n2mEbaUX7kDzxHOOQk8nKWMzAzu6ZZ8sOFw4RK+6PcuXo9tB4SbMz58ApfKDXf3szjNIIbGpD5TKTRxGkEMLjLl+K3wlWXBsCUxIDU+jbOiysESqAy1MGUJpXgwbTWzNOVEziIXZrJ+VIztl1PUBxTSo0dwn2bOmfDRPD3TRTGlfbCJvO9KvuhL1hMHhB9wPuPRLGHcdOWG2xc0U+5bQtAJT0nRTewXL1pgk2+rZAdeWmz3jxAqfNQQdzTlbF8uJ5ecEIWvTkevAHpwz7w78QujlD/Lr491bD8/1vhM2yrUQRrWXNQY4fGilfctMWYjL72UL/qS9eiA8EmN88nbNdour+PBbbAjOjIa4iBhfFg6rxeKdEGcL6p3EWR1Qq2Qkhs2DrnkRnmN9tG2EAqmgPw6hoL7Oza7B+3SCrR9tRftko+Lsf2F/mkTndN2LmzuMcKTuj/mX2+4Va3ki16+nnJY+S7MefpkidxwnV+4wkXH8TKnX0tsYzYp29DOOoSW1nf7nTh2akYiWmcJOuTidSaqESrTYpwjJJNVGQr+rLI7WsqerHW6Kp/oM2pKuV7T1QY9gjqlZp41/WfKpl56FV/0kvXQFRyeQ83xaTu5E8p5dNP3dUF34ihyI3GSpeCsywSh22ZJdWto9winhqifb7VRvgktxp13vyjrS0EjvrRfZ62uyqddSWaWYlwTPAtJZ2oZ3j/Sgi/mi+6vpzesfAcWNA0n8xVyw90GVFGuZjTXEQy+6GfLGLMLL523f5E0OmxVjDoOuRiH91RKU+vtoCtH7TgmvBLvtFXWLW15H9GTdVw8ow4IlRLeHECN9ym1e9K0I+Cbnhgv4Yu+aD2HaQJ80XDqOzSGAV4+4yCqBxrsJAX6ZTIoX36QnvzhhzzMfFW2dZVLOJfo0zbce5OvwXMFaZ81mOnlTVXpDZsQNuoYWveketKb5+6JOOsgX+NTm7H49fUTlx+WLuWL7qxnOFh4BxpmJx0p2gDzA/BUARuS6phR+pUsY7MMboAHx5xNsSVfVZcYSwqCKrqon7zM+8ecCkeS4nm3rINuaWvVNnMRI1IRpxTqx8PZUZ0Br/UEduo3B3hNvmgZfs9gQPj8vIOxd2kndir3awvJ6BLvoUuOfFWNYB0LR1OQJoUySKb9IlOBx74q1+ADC2G6rOdmFdJcD8BkfualA+BdjOOzP9uUhGUEX/TwhZsUduwRr8wNuXKurCixLBgpQI0mDbJr9dIqUuV+92ngkJZ7xduCk2yZKbfWrH1VBiTg9VdzsgRjW3CVXCvAwDd+c1z9dWw9+B+8MJL/eY15ZQ/HqvTwVdsZn5WQsgRRnMaWaecu3jFvMBEmgg+FJFZsnSl0zjB9OqPYaBD7qmoVyImFvzi41usesV0julaAR9dfR15Xzv9sEruRDyk1nb+QaLU67T885GTls6YgcY+UiMa25M/pwGrbCfzkvR3e0jjtuaFtnwuagHTSb5y7boBH119HXhvwP487jJLsLJ4XnUkHX5sLbS61dpiAXRoZSCrFJ+EjpeU3puVfitngYNo6PJrAigKktmwjyQdZpfq30mmtulaAx9Zfx15Xzv+cyeuiBFUs9zq8Kq+XB9a4PVvph3GV4E3y8HENJrN55H1X2p8VyqSKwVusJDKzXOZzplWdzBUFK9e+B4+uv468xvI/b5xtSAkBHQaPvtqWzllVvEOxPbuiE6+j2pvjcKsbvI7txnRErgfH7LdXqjq0IokKzga14GzQ23SSbCQvO6r+Or7SMIr/efOkkqSdMnj9mBx2DRsiY29Uj6+qK9ZrssCKaptR6HKURdwUYeUWA2kPzVKQO8ku2nU3Anhs/XWkBx3F/7wJtCTTTIKftthue1ty9xvNYLY/zo5KSbIuKbXpbEdSyeRyYdAIwKY2neyoc3+k1XUaufYga3T9daMUx/r8z1s10ITknIO0kuoMt+TB8jK0lpayqqjsJ2qtXAYwBU932zinimgmd6mTRDnQfr88q36NAI+tv24E8Pr8zxtasBqx0+xHH9HhlrwsxxNUfKOHQaZBITNf0uccj8GXiVmXAuPEAKSdN/4GLHhs/XWj92dN/uetNuBMnVR+XWDc25JLjo5Mg5IZIq226tmCsip2zZliL213YrTlL2hcFjpCduyim3M7/eB16q/blQsv5X/esDRbtJeabLIosWy3ycavwLhtxdWzbMmHiBTiVjJo6lCLjXZsi7p9PEPnsq6X6wd4bP11i0rD5fzPm/0A6brrIsllenZs0lCJlU4abakR59enZKrKe3BZihbTxlyZ2zl1+g0wvgmA166/bhwDrcn/7Ddz0eWZuJvfSESug6NzZsox3Z04FIxz0mUjMwVOOVTq1CQ0AhdbBGVdjG/CgsfUX7esJl3K/7ytWHRv683praW/8iDOCqWLLhpljDY1ZpzK75QiaZoOTpLKl60auHS/97oBXrv+umU9+FL+5+NtLFgjqVLCdbmj7pY5zPCPLOHNCwXGOcLquOhi8CmCWvbcuO73XmMUPab+ug3A6/A/78Bwe0bcS2+tgHn4J5pyS2WbOck0F51Vq3LcjhLvZ67p1ABbaL2H67bg78BfjKi/jr3+T/ABV3ilLmNXTI2SpvxWBtt6/Z//D0z/FXaGbSBgylzlsEGp+5//xrd4/ae4d8DUUjlslfIYS3t06HZpvfQtvv0N7AHWqtjP2pW08QD/FLy//da38vo8PNlKHf5y37Dxdfe/oj4kVIgFq3koLReSR76W/bx//n9k8jonZxzWTANVwEniDsg87sOSd/z7//PvMp3jQiptGVWFX2caezzAXwfgtzYUvbr0iozs32c3Uge7varH+CNE6cvEYmzbPZ9hMaYDdjK4V2iecf6EcEbdUDVUARda2KzO/JtCuDbNQB/iTeL0EG1JSO1jbXS+nLxtPMDPw1fh5+EPrgSEKE/8Gry5A73ui87AmxwdatyMEBCPNOCSKUeRZ2P6Myb5MRvgCHmA9ywsMifU+AYXcB6Xa5GibUC5TSyerxyh0j6QgLVpdyhfArRTTLqQjwe4HOD9s92D4Ap54odXAPBWLAwB02igG5Kkc+piN4lvODIFGAZgT+EO4Si1s7fjSR7vcQETUkRm9O+MXyo9OYhfe4xt9STQ2pcZRLayCV90b4D3jR0DYAfyxJ+eywg2IL7NTMXna7S/RpQ63JhWEM8U41ZyQGjwsVS0QBrEKLu8xwZsbi4wLcCT+OGidPIOCe1PiSc9Qt+go+vYqB7cG+B9d8cAD+WJPz0Am2gxXgU9IneOqDpAAXOsOltVuMzpdakJXrdPCzXiNVUpCeOos5cxnpQT39G+XVLhs1osQVvJKPZyNq8HDwd4d7pNDuWJPxVX7MSzqUDU6gfadKiNlUFTzLeFHHDlzO4kpa7aiKhBPGKwOqxsBAmYkOIpipyXcQSPlRTf+Tii0U3EJGaZsDER2qoB3h2hu0qe+NNwUooYU8y5mILbJe6OuX+2FTKy7bieTDAemaQyQ0CPthljSWO+xmFDIYiESjM5xKd6Ik5lvLq5GrQ3aCMLvmCA9wowLuWJb9xF59hVVP6O0CrBi3ZjZSNOvRy+I6klNVRJYRBaEzdN+imiUXQ8iVF8fsp+W4JXw7WISW7fDh7lptWkCwZ4d7QTXyBPfJMYK7SijjFppGnlIVJBJBYj7eUwtiP1IBXGI1XCsjNpbjENVpSAJ2hq2LTywEly3hUYazt31J8w2+aiLx3g3fohXixPfOMYm6zCGs9LVo9MoW3MCJE7R5u/WsOIjrqBoHUO0bJE9vxBpbhsd3+Nb4/vtPCZ4oZYCitNeYuC/8UDvDvy0qvkiW/cgqNqRyzqSZa/s0mqNGjtKOoTm14zZpUauiQgVfqtQiZjq7Q27JNaSK5ExRcrGCXO1FJYh6jR6CFqK7bZdQZ4t8g0rSlPfP1RdBtqaa9diqtzJkQ9duSryi2brQXbxDwbRUpFMBHjRj8+Nt7GDKgvph9okW7LX47gu0SpGnnFQ1S1lYldOsC7hYteR574ZuKs7Ei1lBsfdz7IZoxzzCVmmVqaSySzQbBVAWDek+N4jh9E/4VqZrJjPwiv9BC1XcvOWgO8275CVyBPvAtTVlDJfZkaZGU7NpqBogAj/xEHkeAuJihWYCxGN6e8+9JtSegFXF1TrhhLGP1fak3pebgPz192/8gB4d/6WT7+GdYnpH7hH/DJzzFiYPn/vjW0SgNpTNuPIZoAEZv8tlGw4+RLxy+ZjnKa5NdFoC7UaW0aduoYse6+bXg1DLg6UfRYwmhGEjqPvF75U558SANrElK/+MdpXvmqBpaXOa/MTZaa1DOcSiLaw9j0NNNst3c+63c7EKTpkvKHzu6bPbP0RkuHAVcbRY8ijP46MIbQeeT1mhA+5PV/inyDdQipf8LTvMXbwvoDy7IruDNVZKTfV4CTSRUYdybUCnGU7KUTDxLgCknqUm5aAW6/1p6eMsOYsphLzsHrE0Y/P5bQedx1F/4yPHnMB3/IOoTU9+BL8PhtjuFKBpZXnYNJxTuv+2XqolKR2UQgHhS5novuxVySJhBNRF3SoKK1XZbbXjVwWNyOjlqWJjrWJIy+P5bQedyldNScP+HZ61xKSK3jyrz+NiHG1hcOLL/+P+PDF2gOkekKGiNWKgJ+8Z/x8Iv4DdQHzcpZyF4v19I27w9/yPGDFQvmEpKtqv/TLiWMfn4sofMm9eAH8Ao0zzh7h4sJqYtxZd5/D7hkYPneDzl5idlzNHcIB0jVlQ+8ULzw/nc5/ojzl2juE0apD7LRnJxe04dMz2iOCFNtGFpTuXA5AhcTRo8mdN4kz30nVjEC4YTZQy4gpC7GlTlrePKhGsKKgeXpCYeO0MAd/GH7yKQUlXPLOasOH3FnSphjHuDvEu4gB8g66oNbtr6eMbFIA4fIBJkgayoXriw2XEDQPJrQeROAlY6aeYOcMf+IVYTU3XFlZufMHinGywaW3YLpObVBAsbjF4QJMsVUSayjk4voPsHJOQfPWDhCgDnmDl6XIRerD24HsGtw86RMHOLvVSHrKBdeVE26gKB5NKHzaIwLOmrqBWJYZDLhASG16c0Tn+CdRhWDgWXnqRZUTnPIHuMJTfLVpkoYy5CzylHVTGZMTwkGAo2HBlkQplrJX6U+uF1wZz2uwS1SQ12IqWaPuO4baZaEFBdukksJmkcTOm+YJSvoqPFzxFA/YUhIvWxcmSdPWTWwbAKVp6rxTtPFUZfKIwpzm4IoMfaYQLWgmlG5FME2gdBgm+J7J+rtS/XBbaVLsR7bpPQnpMFlo2doWaVceHk9+MkyguZNCJ1He+kuHTWyQAzNM5YSUg/GlTk9ZunAsg1qELVOhUSAK0LABIJHLKbqaEbHZLL1VA3VgqoiOKXYiS+HRyaEKgsfIqX64HYWbLRXy/qWoylIV9gudL1OWBNgBgTNmxA6b4txDT4gi3Ri7xFSLxtXpmmYnzAcWDZgY8d503LFogz5sbonDgkKcxGsWsE1OI+rcQtlgBBCSOKD1mtqYpIU8cTvBmAT0yZe+zUzeY92fYjTtGipXLhuR0ePoHk0ofNWBX+lo8Z7pAZDk8mEw5L7dVyZZoE/pTewbI6SNbiAL5xeygW4xPRuLCGbhcO4RIeTMFYHEJkYyEO9HmJfXMDEj/LaH781wHHZEtqSQ/69UnGpzH7LKIAZEDSPJnTesJTUa+rwTepI9dLJEawYV+ZkRn9g+QirD8vF8Mq0jFQ29js6kCS3E1+jZIhgPNanHdHFqFvPJLHqFwQqbIA4jhDxcNsOCCQLDomaL/dr5lyJaJU6FxPFjO3JOh3kVMcROo8u+C+jo05GjMF3P3/FuDLn5x2M04xXULPwaS6hBYki+MrMdZJSgPHlcB7nCR5bJ9Kr5ACUn9jk5kivdd8tk95SOGrtqu9lr2IhK65ZtEl7ZKrp7DrqwZfRUSN1el7+7NJxZbywOC8neNKTch5vsTEMNsoCCqHBCqIPRjIPkm0BjvFODGtto99rCl+d3wmHkW0FPdpZtC7MMcVtGFQjJLX5bdQ2+x9ypdc313uj8xlsrfuLgWXz1cRhZvJYX0iNVBRcVcmCXZs6aEf3RQF2WI/TcCbKmGU3IOoDJGDdDub0+hYckt6PlGu2BcxmhbTdj/klhccLGJMcqRjMJP1jW2ETqLSWJ/29MAoORluJ+6LPffBZbi5gqi5h6catQpmOT7/OFf5UorRpLzCqcMltBLhwd1are3kztrSzXO0LUbXRQcdLh/RdSZ+swRm819REDrtqzC4es6Gw4JCKlSnjYVpo0xeq33PrADbFLL3RuCmObVmPN+24kfa+AojDuM4umKe2QwCf6EN906HwjujaitDs5o0s1y+k3lgbT2W2i7FJdnwbLXhJUBq/9liTctSmFC/0OqUinb0QddTWamtjbHRFuWJJ6NpqZ8vO3fZJ37Db+2GkaPYLGHs7XTTdiFQJ68SkVJFVmY6McR5UycflNCsccHFaV9FNbR4NttLxw4pQ7wJd066Z0ohVbzihaxHVExd/ay04oxUKWt+AsdiQ9OUyZ2krzN19IZIwafSTFgIBnMV73ADj7V/K8u1MaY2sJp2HWm0f41tqwajEvdHWOJs510MaAqN4aoSiPCXtN2KSi46dUxHdaMquar82O1x5jqhDGvqmoE9LfxcY3zqA7/x3HA67r9ZG4O6Cuxu12/+TP+eLP+I+HErqDDCDVmBDO4larujNe7x8om2rMug0MX0rL1+IWwdwfR+p1TNTyNmVJ85ljWzbWuGv8/C7HD/izjkHNZNYlhZcUOKVzKFUxsxxN/kax+8zPWPSFKw80rJr9Tizyj3o1gEsdwgWGoxPezDdZ1TSENE1dLdNvuKL+I84nxKesZgxXVA1VA1OcL49dFlpFV5yJMhzyCmNQ+a4BqusPJ2bB+xo8V9u3x48VVIEPS/mc3DvAbXyoYr6VgDfh5do5hhHOCXMqBZUPhWYbWZECwVJljLgMUWOCB4MUuMaxGNUQDVI50TQ+S3kFgIcu2qKkNSHVoM0SHsgoZxP2d5HH8B9woOk4x5bPkKtAHucZsdykjxuIpbUrSILgrT8G7G5oCW+K0990o7E3T6AdW4TilH5kDjds+H64kS0mz24grtwlzDHBJqI8YJQExotPvoC4JBq0lEjjQkyBZ8oH2LnRsQ4Hu1QsgDTJbO8fQDnllitkxuVskoiKbRF9VwzMDvxHAdwB7mD9yCplhHFEyUWHx3WtwCbSMMTCUCcEmSGlg4gTXkHpZXWQ7kpznK3EmCHiXInqndkQjunG5kxTKEeGye7jWz9cyMR2mGiFQ15ENRBTbCp+Gh86vAyASdgmJq2MC6hoADQ3GosP0QHbnMHjyBQvQqfhy/BUbeHd5WY/G/9LK/8Ka8Jd7UFeNWEZvzPb458Dn8DGLOe3/wGL/4xP+HXlRt+M1PE2iLhR8t+lfgxsuh7AfO2AOf+owWhSZRYQbd622hbpKWKuU+XuvNzP0OseRDa+mObgDHJUSc/pKx31QdKffQ5OIJpt8GWjlgTwMc/w5MPCR/yl1XC2a2Yut54SvOtMev55Of45BOat9aWG27p2ZVORRvnEk1hqWMVUmqa7S2YtvlIpspuF1pt0syuZS2NV14mUidCSfzQzg+KqvIYCMljIx2YK2AO34fX4GWdu5xcIAb8MzTw+j/lyWM+Dw/gjs4GD6ehNgA48kX/AI7XXM/XAN4WHr+9ntywqoCakCqmKP0rmQrJJEErG2Upg1JObr01lKQy4jskWalKYfJ/EDLMpjNSHFEUAde2fltaDgmrNaWQ9+AAb8I5vKjz3L1n1LriB/BXkG/wwR9y/oRX4LlioHA4LzP2inzRx/DWmutRweFjeP3tNeSGlaE1Fde0OS11yOpmbIp2u/jF1n2RRZviJM0yBT3IZl2HWImKjQOxIyeU325b/qWyU9Moj1o07tS0G7qJDoGHg5m8yeCxMoEH8GU45tnrNM84D2l297DQ9t1YP7jki/7RmutRweEA77/HWXOh3HCxkRgldDQkAjNTMl2Iloc1qN5JfJeeTlyTRzxURTdn1Ixv2uKjs12AbdEWlBtmVdk2k7FFwj07PCZ9XAwW3dG+8xKzNFr4EnwBZpy9Qzhh3jDXebBpYcpuo4fQ44u+fD1dweEnHzI7v0xuuOALRUV8rXpFyfSTQYkhd7IHm07jpyhlkCmI0ALYqPTpUxXS+z4jgDj1Pflvmz5ecuItpIBxyTHpSTGWd9g1ApfD/bvwUhL4nT1EzqgX7cxfCcNmb3mPL/qi9SwTHJ49oj5ZLjccbTG3pRmlYi6JCG0mQrAt1+i2UXTZ2dv9IlQpN5naMYtviaXlTrFpoMsl3bOAFEa8sqPj2WCMrx3Yjx99qFwO59Aw/wgx+HlqNz8oZvA3exRDvuhL1jMQHPaOJ0+XyA3fp1OfM3qObEVdhxjvynxNMXQV4+GJyvOEFqeQBaIbbO7i63rpxCltdZShPFxkjM2FPVkn3TG+Rp9pO3l2RzFegGfxGDHIAh8SteR0C4HopXzRF61nheDw6TFN05Ebvq8M3VKKpGjjO6r7nhudTEGMtYM92HTDaR1FDMXJ1eThsbKfywyoWwrzRSXkc51flG3vIid62h29bIcFbTGhfV+faaB+ohj7dPN0C2e2lC96+XouFByen9AsunLDJZ9z7NExiUc0OuoYW6UZkIyx2YUR2z6/TiRjyKMx5GbbjLHvHuf7YmtKghf34LJfx63Yg8vrvN2zC7lY0x0tvKezo4HmGYDU+Gab6dFL+KI761lDcNifcjLrrr9LWZJctG1FfU1uwhoQE22ObjdfkSzY63CbU5hzs21WeTddH2BaL11Gi7lVdlxP1nkxqhnKhVY6knS3EPgVGg1JpN5cP/hivujOelhXcPj8HC/LyI6MkteVjlolBdMmF3a3DbsuAYhL44dxzthWSN065xxUd55Lmf0wRbOYOqH09/o9WbO2VtFdaMb4qBgtFJoT1SqoN8wPXMoXLb3p1PUEhxfnnLzGzBI0Ku7FxrKsNJj/8bn/H8fPIVOd3rfrklUB/DOeO+nkghgSPzrlPxluCMtOnDL4Yml6dK1r3vsgMxgtPOrMFUZbEUbTdIzii5beq72G4PD0DKnwjmBULUVFmy8t+k7fZ3pKc0Q4UC6jpVRqS9Umv8bxw35flZVOU1X7qkjnhZlsMbk24qQ6Hz7QcuL6sDC0iHHki96Uh2UdvmgZnjIvExy2TeJdMDZNSbdZyAHe/Yd1xsQhHiKzjh7GxQ4yqMPaywPkjMamvqrYpmO7Knad+ZQC5msCuAPWUoxrxVhrGv7a+KLXFhyONdTMrZ7ke23qiO40ZJUyzgYyX5XyL0mV7NiUzEs9mjtbMN0dERqwyAJpigad0B3/zRV7s4PIfXSu6YV/MK7+OrYe/JvfGMn/PHJe2fyUdtnFrKRNpXV0Y2559aWPt/G4BlvjTMtXlVIWCnNyA3YQBDmYIodFz41PvXPSa6rq9lWZawZ4dP115HXV/M/tnFkkrBOdzg6aP4pID+MZnTJ1SuuB6iZlyiox4HT2y3YBtkUKWooacBQUDTpjwaDt5poBHl1/HXltwP887lKKXxNUEyPqpGTyA699UqY/lt9yGdlUKra0fFWS+36iylVWrAyd7Uw0CZM0z7xKTOduznLIjG2Hx8cDPLb+OvK6Bv7n1DYci4CxUuRxrjBc0bb4vD3rN5Zz36ntLb83eVJIB8LiIzCmn6SMPjlX+yNlTjvIGjs+QzHPf60Aj62/jrzG8j9vYMFtm1VoRWCJdmw7z9N0t+c8cxZpPeK4aTRicS25QhrVtUp7U578chk4q04Wx4YoQSjFryUlpcQ1AbxZ/XVMknIU//OGl7Q6z9Zpxi0+3yFhSkjUDpnCIUhLWVX23KQ+L9vKvFKI0ZWFQgkDLvBoylrHNVmaw10zwCPrr5tlodfnf94EWnQ0lFRWy8pW9LbkLsyUVDc2NSTHGDtnD1uMtchjbCeb1mpxFP0YbcClhzdLu6lfO8Bj6q+bdT2sz/+8SZCV7VIxtt0DUn9L7r4cLYWDSXnseEpOGFuty0qbOVlS7NNzs5FOGJUqQpl2Q64/yBpZf90sxbE+//PGdZ02HSipCbmD6NItmQ4Lk5XUrGpDMkhbMm2ZVheNYV+VbUWTcv99+2NyX1VoafSuC+AN6q9bFIMv5X/eagNWXZxEa9JjlMwNWb00akGUkSoepp1/yRuuqHGbUn3UdBSTxBU6SEVklzWRUkPndVvw2PrrpjvxOvzPmwHc0hpmq82npi7GRro8dXp0KXnUQmhZbRL7NEVp1uuZmO45vuzKsHrktS3GLWXODVjw+vXXLYx4Hf7njRPd0i3aoAGX6W29GnaV5YdyDj9TFkakje7GHYzDoObfddHtOSpoi2SmzJHrB3hM/XUDDEbxP2/oosszcRlehWXUvzHv4TpBVktHqwenFo8uLVmy4DKLa5d3RtLrmrM3aMFr1183E4sewf+85VWeg1c5ag276NZrM9IJVNcmLEvDNaV62aq+14IAOGFsBt973Ra8Xv11YzXwNfmft7Jg2oS+XOyoC8/cwzi66Dhmgk38kUmP1CUiYWOX1bpD2zWXt2FCp7uq8703APAa9dfNdscR/M/bZLIyouVxqJfeWvG9Je+JVckHQ9+CI9NWxz+blX/KYYvO5n2tAP/vrlZ7+8/h9y+9qeB/Hnt967e5mevX10rALDWK//FaAT5MXdBXdP0C/BAes792c40H+AiAp1e1oH8HgH94g/Lttx1gp63op1eyoM/Bvw5/G/7xFbqJPcCXnmBiwDPb/YKO4FX4OjyCb289db2/Noqicw4i7N6TVtoz8tNwDH+8x/i6Ae7lmaQVENzJFb3Di/BFeAwz+Is9SjeQySpPqbLFlNmyz47z5a/AF+AYFvDmHqibSXTEzoT4Gc3OALaqAP4KPFUJ6n+1x+rGAM6Zd78bgJ0a8QN4GU614vxwD9e1Amy6CcskNrczLx1JIp6HE5UZD/DBHrFr2oNlgG4Odv226BodoryjGJ9q2T/AR3vQrsOCS0ctXZi3ruLlhpFDJYl4HmYtjQCP9rhdn4suySLKDt6wLcC52h8xPlcjju1fn+yhuw4LZsAGUuo2b4Fx2UwQu77uqRHXGtg92aN3tQCbFexc0uk93vhTXbct6y7MulLycoUljx8ngDMBg1tvJjAazpEmOtxlzclvj1vQf1Tx7QlPDpGpqgtdSKz/d9/hdy1vTfFHSmC9dGDZbLiezz7Ac801HirGZsWjydfZyPvHXL/Y8Mjzg8BxTZiuwKz4Eb8sBE9zznszmjvFwHKPIWUnwhqfVRcd4Ck0K6ate48m1oOfrX3/yOtvAsJ8zsPAM89sjnddmuLuDPjX9Bu/L7x7xpMzFk6nWtyQfPg278Gn4Aekz2ZgOmU9eJ37R14vwE/BL8G3aibCiWMWWDQ0ZtkPMnlcGeAu/Ag+8ZyecU5BPuy2ILD+sQqyZhAKmn7XZd+jIMTN9eBL7x95xVLSX4On8EcNlXDqmBlqS13jG4LpmGbkF/0CnOi3H8ETOIXzmnmtb0a16Tzxj1sUvQCBiXZGDtmB3KAefPH94xcUa/6vwRn80GOFyjEXFpba4A1e8KQfFF+259tx5XS4egYn8fQsLGrqGrHbztr+uByTahWuL1NUGbDpsnrwBfePPwHHIf9X4RnM4Z2ABWdxUBlqQ2PwhuDxoS0vvqB1JzS0P4h2nA/QgTrsJFn+Y3AOjs9JFC07CGWX1oNX3T/yHOzgDjwPn1PM3g9Jk9lZrMEpxnlPmBbjyo2+KFXRU52TJM/2ALcY57RUzjObbjqxVw++4P6RAOf58pcVsw9Daje3htriYrpDOonre3CudSe6bfkTEgHBHuDiyu5MCsc7BHhYDx7ePxLjqigXZsw+ijMHFhuwBmtoTPtOxOrTvYJDnC75dnUbhfwu/ZW9AgYd+peL68HD+0emKquiXHhWjJg/UrkJYzuiaL3E9aI/ytrCvAd4GcYZMCkSQxfUg3v3j8c4e90j5ZTPdvmJJGHnOCI2nHS8081X013pHuBlV1gB2MX1YNmWLHqqGN/TWmG0y6clJWthxNUl48q38Bi8vtMKyzzpFdSDhxZ5WBA5ZLt8Jv3895DduBlgbPYAj8C4B8hO68FDkoh5lydC4FiWvBOVqjYdqjiLv92t8yPDjrDaiHdUD15qkSURSGmXJwOMSxWAXYwr3zaAufJ66l+94vv3AO+vPcD7aw/w/toDvL/2AO+vPcD7aw/wHuD9tQd4f+0B3l97gPfXHuD9tQd4f+0B3l97gG8LwP8G/AL8O/A5OCq0Ys2KIdv/qOIXG/4mvFAMF16gZD+2Xvu/B8as5+8bfllWyg0zaNO5bfXj6vfhhwD86/Aq3NfRS9t9WPnhfnvCIw/CT8GLcFTMnpntdF/z9V+PWc/vWoIH+FL3Znv57PitcdGP4R/C34avw5fgRVUInCwbsn1yyA8C8zm/BH8NXoXnVE6wVPjdeCI38kX/3+Ct9dbz1pTmHFRu+Hm4O9Ch3clr99negxfwj+ER/DR8EV6B5+DuQOnTgUw5rnkY+FbNU3gNXh0o/JYTuWOvyBf9FvzX663HH/HejO8LwAl8Hl5YLTd8q7sqA3wbjuExfAFegQdwfyDoSkWY8swzEf6o4Qyewefg+cHNbqMQruSL/u/WWc+E5g7vnnEXgDmcDeSGb/F4cBcCgT+GGRzDU3hZYburAt9TEtHgbM6JoxJ+6NMzzTcf6c2bycv2+KK/f+l6LBzw5IwfqZJhA3M472pWT/ajKxnjv4AFnMEpnBTPND6s2J7qHbPAqcMK74T2mZ4VGB9uJA465It+/eL1WKhYOD7xHOkr1ajK7d0C4+ke4Hy9qXZwpgLr+Znm/uNFw8xQOSy8H9IzjUrd9+BIfenYaylf9FsXr8fBAadnPIEDna8IBcwlxnuA0/Wv6GAWPd7dDIKjMdSWueAsBj4M7TOd06qBbwDwKr7oleuxMOEcTuEZTHWvDYUO7aHqAe0Bbq+HEFRzOz7WVoTDQkVds7A4sIIxfCQdCefFRoIOF/NFL1mPab/nvOakSL/Q1aFtNpUb/nFOVX6gzyg/1nISyDfUhsokIzaBR9Kxm80s5mK+6P56il1jXic7nhQxsxSm3OwBHl4fFdLqi64nDQZvqE2at7cWAp/IVvrN6/BFL1mPhYrGMBfOi4PyjuSGf6wBBh7p/FZTghCNWGgMzlBbrNJoPJX2mW5mwZfyRffXo7OFi5pZcS4qZUrlViptrXtw+GQoyhDPS+ANjcGBNRiLCQDPZPMHuiZfdFpPSTcQwwKYdRNqpkjm7AFeeT0pJzALgo7g8YYGrMHS0iocy+YTm2vyRUvvpXCIpQ5pe666TJrcygnScUf/p0NDs/iAI/nqDHC8TmQT8x3NF91l76oDdQGwu61Z6E0ABv7uO1dbf/37Zlv+Zw/Pbh8f1s4Avur6657/+YYBvur6657/+YYBvur6657/+YYBvur6657/+aYBvuL6657/+VMA8FXWX/f8zzcN8BXXX/f8zzcNMFdbf93zP38KLPiK6697/uebtuArrr/u+Z9vGmCusP6653/+1FjwVdZf9/zPN7oHX339dc//fNMu+irrr3v+50+Bi+Zq6697/uebA/jz8Pudf9ht/fWv517J/XUzAP8C/BAeX9WCDrUpZ3/dEMBxgPcfbtTVvsYV5Yn32u03B3Ac4P3b8I+vxNBKeeL9dRMAlwO83959qGO78sT769oB7g3w/vGVYFzKE++v6wV4OMD7F7tckFkmT7y/rhHgpQO8b+4Y46XyxPvrugBeNcB7BRiX8sT767oAvmCA9woAHsoT76+rBJjLBnh3txOvkifeX1dswZcO8G6N7sXyxPvr6i340gHe3TnqVfLE++uKAb50gHcXLnrX8sR7gNdPRqwzwLu7Y/FO5Yn3AK9jXCMGeHdgxDuVJ75VAI8ljP7PAb3/RfjcZfePHBB+79dpfpH1CanN30d+mT1h9GqAxxJGM5LQeeQ1+Tb+EQJrElLb38VHQ94TRq900aMIo8cSOo+8Dp8QfsB8zpqE1NO3OI9Zrj1h9EV78PqE0WMJnUdeU6E+Jjyk/hbrEFIfeWbvId8H9oTRFwdZaxJGvziW0Hn0gqYB/wyZ0PwRlxJST+BOw9m77Amj14ii1yGM/txYQudN0qDzGe4EqfA/5GJCagsHcPaEPWH0esekSwmjRxM6b5JEcZ4ww50ilvAOFxBSx4yLW+A/YU8YvfY5+ALC6NGEzhtmyZoFZoarwBLeZxUhtY4rc3bKnjB6TKJjFUHzJoTOozF2YBpsjcyxDgzhQ1YRUse8+J4wenwmaylB82hC5w0zoRXUNXaRBmSMQUqiWSWkLsaVqc/ZE0aPTFUuJWgeTei8SfLZQeMxNaZSIzbII4aE1Nmr13P2hNHjc9E9guYNCZ032YlNwESMLcZiLQHkE4aE1BFg0yAR4z1h9AiAGRA0jyZ03tyIxWMajMPWBIsxYJCnlITU5ShiHYdZ94TR4wCmSxg9jtB5KyPGYzymAYexWEMwAPIsAdYdV6aObmNPGD0aYLoEzaMJnTc0Ygs+YDw0GAtqxBjkuP38bMRWCHn73xNGjz75P73WenCEJnhwyVe3AEe8TtKdJcYhBl97wuhNAObK66lvD/9J9NS75v17wuitAN5fe4D31x7g/bUHeH/tAd5fe4D3AO+vPcD7aw/w/toDvL/2AO+vPcD7aw/w/toDvAd4f/24ABzZ8o+KLsSLS+Pv/TqTb3P4hKlQrTGh+fbIBT0Axqznnb+L/V2mb3HkN5Mb/nEHeK7d4IcDld6lmDW/iH9E+AH1MdOw/Jlu2T1xNmY98sv4wHnD7D3uNHu54WUuOsBTbQuvBsPT/UfzNxGYzwkP8c+Yz3C+r/i6DcyRL/rZ+utRwWH5PmfvcvYEt9jLDS/bg0/B64DWKrQM8AL8FPwS9beQCe6EMKNZYJol37jBMy35otdaz0Bw2H/C2Smc7+WGB0HWDELBmOByA3r5QONo4V+DpzR/hFS4U8wMW1PXNB4TOqYz9urxRV++ntWCw/U59Ty9ebdWbrgfRS9AYKKN63ZokZVygr8GZ/gfIhZXIXPsAlNjPOLBby5c1eOLvmQ9lwkOy5x6QV1j5TYqpS05JtUgUHUp5toHGsVfn4NX4RnMCe+AxTpwmApTYxqMxwfCeJGjpXzRF61nbcHhUBPqWze9svwcHJ+S6NPscKrEjug78Dx8Lj3T8D4YxGIdxmJcwhi34fzZUr7olevZCw5vkOhoClq5zBPZAnygD/Tl9EzDh6kl3VhsHYcDEb+hCtJSvuiV69kLDm+WycrOTArHmB5/VYyP6jOVjwgGawk2zQOaTcc1L+aLXrKeveDwZqlKrw8U9Y1p66uK8dEzdYwBeUQAY7DbyYNezBfdWQ97weEtAKYQg2xJIkuveAT3dYeLGH+ShrWNwZgN0b2YL7qznr3g8JYAo5bQBziPjx7BPZ0d9RCQp4UZbnFdzBddor4XHN4KYMrB2qHFRIzzcLAHQZ5the5ovui94PCWAPefaYnxIdzRwdHCbuR4B+tbiy96Lzi8E4D7z7S0mEPd+eqO3cT53Z0Y8SV80XvB4Z0ADJi/f7X113f+7p7/+UYBvur6657/+YYBvur6657/+aYBvuL6657/+aYBvuL6657/+aYBvuL6657/+aYBvuL6657/+VMA8FXWX/f8z58OgK+y/rrnf75RgLna+uue//lTA/CV1V/3/M837aKvvv6653++UQvmauuve/7nTwfAV1N/3fM/fzr24Cuuv+75nz8FFnxl9dc9//MOr/8/glixwRuUfM4AAAAASUVORK5CYII="}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}const xe={defines:{MAX_STEP:0,PERSPECTIVE_CAMERA:!0,DISTANCE_ATTENUATION:!0,FRESNEL:!0,INFINITE_THICK:!1,SELECTIVE:!1},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tMetalness:{value:null},tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new y},cameraProjectionMatrix:{value:new Y},cameraInverseProjectionMatrix:{value:new Y},opacity:{value:.5},maxDistance:{value:180},cameraRange:{value:0},thickness:{value:.018}},vertexShader:`

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
	`},St={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`

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

	`},Be={uniforms:{tDiffuse:{value:null},resolution:{value:new y},opacity:{value:.5}},vertexShader:`

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
	`};class Ee extends It{constructor({renderer:t,scene:r,camera:s,width:o,height:i,selects:n,bouncing:a=!1,groundReflector:c}){super(),this.width=o!==void 0?o:512,this.height=i!==void 0?i:512,this.clear=!0,this.renderer=t,this.scene=r,this.camera=s,this.groundReflector=c,this.opacity=xe.uniforms.opacity.value,this.output=0,this.maxDistance=xe.uniforms.maxDistance.value,this.thickness=xe.uniforms.thickness.value,this.tempColor=new L,this._selects=n,this.selective=Array.isArray(this._selects),Object.defineProperty(this,"selects",{get(){return this._selects},set(p){this._selects!==p&&(this._selects=p,Array.isArray(p)?(this.selective=!0,this.ssrMaterial.defines.SELECTIVE=!0,this.ssrMaterial.needsUpdate=!0):(this.selective=!1,this.ssrMaterial.defines.SELECTIVE=!1,this.ssrMaterial.needsUpdate=!0))}}),this._bouncing=a,Object.defineProperty(this,"bouncing",{get(){return this._bouncing},set(p){this._bouncing!==p&&(this._bouncing=p,p?this.ssrMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture:this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture)}}),this.blur=!0,this._distanceAttenuation=xe.defines.DISTANCE_ATTENUATION,Object.defineProperty(this,"distanceAttenuation",{get(){return this._distanceAttenuation},set(p){this._distanceAttenuation!==p&&(this._distanceAttenuation=p,this.ssrMaterial.defines.DISTANCE_ATTENUATION=p,this.ssrMaterial.needsUpdate=!0)}}),this._fresnel=xe.defines.FRESNEL,Object.defineProperty(this,"fresnel",{get(){return this._fresnel},set(p){this._fresnel!==p&&(this._fresnel=p,this.ssrMaterial.defines.FRESNEL=p,this.ssrMaterial.needsUpdate=!0)}}),this._infiniteThick=xe.defines.INFINITE_THICK,Object.defineProperty(this,"infiniteThick",{get(){return this._infiniteThick},set(p){this._infiniteThick!==p&&(this._infiniteThick=p,this.ssrMaterial.defines.INFINITE_THICK=p,this.ssrMaterial.needsUpdate=!0)}});const l=new ps;l.type=ms,l.minFilter=_,l.magFilter=_,this.beautyRenderTarget=new he(this.width,this.height,{minFilter:_,magFilter:_,depthTexture:l,depthBuffer:!0}),this.prevRenderTarget=new he(this.width,this.height,{minFilter:_,magFilter:_}),this.normalRenderTarget=new he(this.width,this.height,{minFilter:_,magFilter:_,type:mo}),this.metalnessRenderTarget=new he(this.width,this.height,{minFilter:_,magFilter:_}),this.ssrRenderTarget=new he(this.width,this.height,{minFilter:_,magFilter:_}),this.blurRenderTarget=this.ssrRenderTarget.clone(),this.blurRenderTarget2=this.ssrRenderTarget.clone(),xe===void 0&&console.error("THREE.SSRPass: The pass relies on SSRShader."),this.ssrMaterial=new k({defines:Object.assign({},xe.defines,{MAX_STEP:Math.sqrt(this.width*this.width+this.height*this.height)}),uniforms:de.clone(xe.uniforms),vertexShader:xe.vertexShader,fragmentShader:xe.fragmentShader,blending:ve}),this.ssrMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssrMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssrMaterial.defines.SELECTIVE=this.selective,this.ssrMaterial.needsUpdate=!0,this.ssrMaterial.uniforms.tMetalness.value=this.metalnessRenderTarget.texture,this.ssrMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.ssrMaterial.uniforms.cameraNear.value=this.camera.near,this.ssrMaterial.uniforms.cameraFar.value=this.camera.far,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.ssrMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new fo,this.normalMaterial.blending=ve,this.metalnessOnMaterial=new Ze({color:"white"}),this.metalnessOffMaterial=new Ze({color:"black"}),this.blurMaterial=new k({defines:Object.assign({},Be.defines),uniforms:de.clone(Be.uniforms),vertexShader:Be.vertexShader,fragmentShader:Be.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.blurMaterial2=new k({defines:Object.assign({},Be.defines),uniforms:de.clone(Be.uniforms),vertexShader:Be.vertexShader,fragmentShader:Be.fragmentShader}),this.blurMaterial2.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.blurMaterial2.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new k({defines:Object.assign({},St.defines),uniforms:de.clone(St.uniforms),vertexShader:St.vertexShader,fragmentShader:St.fragmentShader,blending:ve}),this.depthRenderMaterial.uniforms.tDepth.value=this.beautyRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new k({uniforms:de.clone(_t.uniforms),vertexShader:_t.vertexShader,fragmentShader:_t.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:hr,blendDst:pr,blendEquation:mr,blendSrcAlpha:hr,blendDstAlpha:pr,blendEquationAlpha:mr}),this.fsQuad=new kt(null),this.originalClearColor=new L}dispose(){this.beautyRenderTarget.dispose(),this.prevRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.metalnessRenderTarget.dispose(),this.ssrRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.blurRenderTarget2.dispose(),this.normalMaterial.dispose(),this.metalnessOnMaterial.dispose(),this.metalnessOffMaterial.dispose(),this.blurMaterial.dispose(),this.blurMaterial2.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(t,r){switch(t.setRenderTarget(this.beautyRenderTarget),t.clear(),this.groundReflector&&(this.groundReflector.visible=!1,this.groundReflector.doRender(this.renderer,this.scene,this.camera),this.groundReflector.visible=!0),t.render(this.scene,this.camera),this.groundReflector&&(this.groundReflector.visible=!1),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,0,0),this.selective&&this.renderMetalness(t,this.metalnessOnMaterial,this.metalnessRenderTarget,0,0),this.ssrMaterial.uniforms.opacity.value=this.opacity,this.ssrMaterial.uniforms.maxDistance.value=this.maxDistance,this.ssrMaterial.uniforms.thickness.value=this.thickness,this.renderPass(t,this.ssrMaterial,this.ssrRenderTarget),this.blur&&(this.renderPass(t,this.blurMaterial,this.blurRenderTarget),this.renderPass(t,this.blurMaterial2,this.blurRenderTarget2)),this.output){case Ee.OUTPUT.Default:this.bouncing?(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=ve,this.renderPass(t,this.copyMaterial,this.prevRenderTarget),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=Lt,this.renderPass(t,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.prevRenderTarget.texture,this.copyMaterial.blending=ve,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:r)):(this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=ve,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:r),this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=Lt,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:r));break;case Ee.OUTPUT.SSR:this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=ve,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:r),this.bouncing&&(this.blur?this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget2.texture:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=ve,this.renderPass(t,this.copyMaterial,this.prevRenderTarget),this.copyMaterial.uniforms.tDiffuse.value=this.ssrRenderTarget.texture,this.copyMaterial.blending=Lt,this.renderPass(t,this.copyMaterial,this.prevRenderTarget));break;case Ee.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=ve,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:r);break;case Ee.OUTPUT.Depth:this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:r);break;case Ee.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=ve,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:r);break;case Ee.OUTPUT.Metalness:this.copyMaterial.uniforms.tDiffuse.value=this.metalnessRenderTarget.texture,this.copyMaterial.blending=ve,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:r);break;default:console.warn("THREE.SSRPass: Unknown output type.")}}renderPass(t,r,s,o,i){this.originalClearColor.copy(t.getClearColor(this.tempColor));const n=t.getClearAlpha(this.tempColor),a=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,o!=null&&(t.setClearColor(o),t.setClearAlpha(i||0),t.clear()),this.fsQuad.material=r,this.fsQuad.render(t),t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(n)}renderOverride(t,r,s,o,i){this.originalClearColor.copy(t.getClearColor(this.tempColor));const n=t.getClearAlpha(this.tempColor),a=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,o=r.clearColor||o,i=r.clearAlpha||i,o!=null&&(t.setClearColor(o),t.setClearAlpha(i||0),t.clear()),this.scene.overrideMaterial=r,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(n)}renderMetalness(t,r,s,o,i){this.originalClearColor.copy(t.getClearColor(this.tempColor));const n=t.getClearAlpha(this.tempColor),a=t.autoClear;t.setRenderTarget(s),t.autoClear=!1,o=r.clearColor||o,i=r.clearAlpha||i,o!=null&&(t.setClearColor(o),t.setClearAlpha(i||0),t.clear()),this.scene.traverseVisible(c=>{c._SSRPassBackupMaterial=c.material,this._selects.includes(c)?c.material=this.metalnessOnMaterial:c.material=this.metalnessOffMaterial}),t.render(this.scene,this.camera),this.scene.traverseVisible(c=>{c.material=c._SSRPassBackupMaterial}),t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(n)}setSize(t,r){this.width=t,this.height=r,this.ssrMaterial.defines.MAX_STEP=Math.sqrt(t*t+r*r),this.ssrMaterial.needsUpdate=!0,this.beautyRenderTarget.setSize(t,r),this.prevRenderTarget.setSize(t,r),this.ssrRenderTarget.setSize(t,r),this.normalRenderTarget.setSize(t,r),this.metalnessRenderTarget.setSize(t,r),this.blurRenderTarget.setSize(t,r),this.blurRenderTarget2.setSize(t,r),this.ssrMaterial.uniforms.resolution.value.set(t,r),this.ssrMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssrMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(t,r),this.blurMaterial2.uniforms.resolution.value.set(t,r)}}Ee.OUTPUT={Default:0,SSR:1,Beauty:3,Depth:4,Normal:5,Metalness:7};class De extends Ve{constructor(t,r={}){super(t),this.isReflectorForSSRPass=!0,this.type="ReflectorForSSRPass";const s=this,o=r.color!==void 0?new L(r.color):new L(8355711),i=r.textureWidth||512,n=r.textureHeight||512,a=r.clipBias||0,c=r.shader||De.ReflectorShader,l=r.useDepthTexture===!0,p=new f(0,1,0),M=new f,A=new f;s.needsUpdate=!1,s.maxDistance=De.ReflectorShader.uniforms.maxDistance.value,s.opacity=De.ReflectorShader.uniforms.opacity.value,s.color=o,s.resolution=r.resolution||new y(window.innerWidth,window.innerHeight),s._distanceAttenuation=De.ReflectorShader.defines.DISTANCE_ATTENUATION,Object.defineProperty(s,"distanceAttenuation",{get(){return s._distanceAttenuation},set(w){s._distanceAttenuation!==w&&(s._distanceAttenuation=w,s.material.defines.DISTANCE_ATTENUATION=w,s.material.needsUpdate=!0)}}),s._fresnel=De.ReflectorShader.defines.FRESNEL,Object.defineProperty(s,"fresnel",{get(){return s._fresnel},set(w){s._fresnel!==w&&(s._fresnel=w,s.material.defines.FRESNEL=w,s.material.needsUpdate=!0)}});const j=new f,C=new f,d=new f,x=new Y,g=new f(0,0,-1),S=new f,v=new f,U=new Y,h=new $e;let b;l&&(b=new ps,b.type=ms,b.minFilter=_,b.magFilter=_);const D={depthTexture:l?b:null},P=new he(i,n,D),N=new k({transparent:l,defines:Object.assign({},De.ReflectorShader.defines,{useDepthTexture:l}),uniforms:de.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});N.uniforms.tDiffuse.value=P.texture,N.uniforms.color.value=s.color,N.uniforms.textureMatrix.value=U,l&&(N.uniforms.tDepth.value=P.depthTexture),this.material=N;const W=[new Or(new f(0,1,0),a)];this.doRender=function(w,ce,G){if(N.uniforms.maxDistance.value=s.maxDistance,N.uniforms.color.value=s.color,N.uniforms.opacity.value=s.opacity,M.copy(G.position).normalize(),A.copy(M).reflect(p),N.uniforms.fresnelCoe.value=(M.dot(A)+1)/2,C.setFromMatrixPosition(s.matrixWorld),d.setFromMatrixPosition(G.matrixWorld),x.extractRotation(s.matrixWorld),j.set(0,0,1),j.applyMatrix4(x),S.subVectors(C,d),S.dot(j)>0)return;S.reflect(j).negate(),S.add(C),x.extractRotation(G.matrixWorld),g.set(0,0,-1),g.applyMatrix4(x),g.add(d),v.subVectors(C,g),v.reflect(j).negate(),v.add(C),h.position.copy(S),h.up.set(0,1,0),h.up.applyMatrix4(x),h.up.reflect(j),h.lookAt(v),h.far=G.far,h.updateMatrixWorld(),h.projectionMatrix.copy(G.projectionMatrix),N.uniforms.virtualCameraNear.value=G.near,N.uniforms.virtualCameraFar.value=G.far,N.uniforms.virtualCameraMatrixWorld.value=h.matrixWorld,N.uniforms.virtualCameraProjectionMatrix.value=G.projectionMatrix,N.uniforms.virtualCameraProjectionMatrixInverse.value=G.projectionMatrixInverse,N.uniforms.resolution.value=s.resolution,U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(h.projectionMatrix),U.multiply(h.matrixWorldInverse),U.multiply(s.matrixWorld),P.texture.encoding=w.outputEncoding;const Q=w.getRenderTarget(),J=w.xr.enabled,Qt=w.shadowMap.autoUpdate,Le=w.clippingPlanes;w.xr.enabled=!1,w.shadowMap.autoUpdate=!1,w.clippingPlanes=W,w.setRenderTarget(P),w.state.buffers.depth.setMask(!0),w.autoClear===!1&&w.clear(),w.render(ce,h),w.xr.enabled=J,w.shadowMap.autoUpdate=Qt,w.clippingPlanes=Le,w.setRenderTarget(Q);const me=G.viewport;me!==void 0&&w.state.viewport(me)},this.getRenderTarget=function(){return P}}}De.ReflectorShader={defines:{DISTANCE_ATTENUATION:!0,FRESNEL:!0},uniforms:{color:{value:null},tDiffuse:{value:null},tDepth:{value:null},textureMatrix:{value:new Y},maxDistance:{value:180},opacity:{value:.5},fresnelCoe:{value:null},virtualCameraNear:{value:null},virtualCameraFar:{value:null},virtualCameraProjectionMatrix:{value:new Y},virtualCameraMatrixWorld:{value:new Y},virtualCameraProjectionMatrixInverse:{value:new Y},resolution:{value:new y}},vertexShader:`
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
	`};var pi=Object.defineProperty,mi=(e,t,r)=>t in e?pi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,O=(e,t,r)=>(mi(e,typeof t!="symbol"?t+"":t,r),r);class fi extends re{constructor(){super(),O(this,"composer")}useEngine(t){return super.useEngine(t),t.effectComposer?(this.composer=t.effectComposer,this):(console.warn("engine need install effectComposer plugin that can use pass compiler."),this)}add(t){const r=super.add(t);return r&&(t.index<0?this.composer.addPass(r):this.composer.insertPass(r,t.index)),r}remove(t){if(!this.map.has(t.vid))return console.warn(`PassCompiler can not found this vid pass: ${t.vid}.`),this;const r=this.map.get(t.vid);return this.composer.removePass(r),super.remove(t),this}}const gi=function(e,t){te(e,t)},rt=function(){return Object.assign(oe(),{vid:"",name:"",type:"Pass",index:-1})},vi=function(){return Object.assign(rt(),{})},xi=function(){return Object.assign(rt(),{strength:1.5,threshold:0,radius:0})},yi=function(){return Object.assign(rt(),{strength:1,threshold:0,radius:0,renderScene:"",renderCamera:"",selectedObjects:[]})},bi=function(){return Object.assign(rt(),{renderer:"",scene:"",camera:"",width:0,height:0,ground:!0,groudOption:{geometry:"",color:"rgb(127, 127, 127)",textureWidth:0,textureHeight:0,clipBias:0,multisample:4},selects:[],opacity:.5,output:0,maxDistance:180,thickness:.018,bouncing:!0,distanceAttenuation:!0,fresnel:!0,infiniteThick:!0,index:0})},wi=function(){return Object.assign(rt(),{grayscale:!1,noiseIntensity:.5,scanlinesIntensity:.05,scanlinesCount:4096})},Mi=function(){return Object.assign(rt(),{lut:"",intensity:1,use2D:!1})};var Si=u({type:"FilmPass",config:wi,commands:{set:{noiseIntensity({target:e,value:t}){e.uniforms.nIntensity.value=t},grayscale({target:e,value:t}){e.uniforms.grayscale.value=t?1:0},scanlinesIntensity({target:e,value:t}){e.uniforms.sIntensity.value=t},scanlinesCount({target:e,value:t}){e.uniforms.sCount.value=t}}},create(e,t){return new ci(e.noiseIntensity,e.scanlinesIntensity,e.scanlinesCount,e.grayscale?1:0)},dispose(e){}});const er=function(e,t){if(e.lut){const r=t.resourceManager.resourceMap.get(e.lut);if(!r)console.warn(`LUT pass processor can not found resource: ${e.lut}`);else return e.use2D?r.texture:r.texture3D}return null};var Ci=u({type:"LUTPass",config:Mi,commands:{set:{lut({target:e,config:t,engine:r}){e.lut=er(t,r)},use2D({target:e,config:t,engine:r}){e.lut=er(t,r)}}},create(e,t){return new di({intensity:e.intensity,lut:er(e,t)})},dispose(e){e.lut=void 0}});const xr=class extends It{constructor(e=new y(256,256),t=1,r=0,s=0,o=new Er,i=new $e,n){super(),O(this,"resolution"),O(this,"strength"),O(this,"radius"),O(this,"threshold"),O(this,"selectedObjects",[]),O(this,"renderScene"),O(this,"renderCamera"),O(this,"clearColor",new L(0,0,0)),O(this,"renderTargetsHorizontal",[]),O(this,"renderTargetsVertical",[]),O(this,"nMips",5),O(this,"selectRenderTarget"),O(this,"renderTargetBright"),O(this,"highPassUniforms"),O(this,"materialHighPassFilter"),O(this,"separableBlurMaterials",[]),O(this,"compositeMaterial"),O(this,"bloomTintColors"),O(this,"mixMaterial"),O(this,"enabled",!0),O(this,"needsSwap",!1),O(this,"_oldClearColor",new L),O(this,"oldClearAlpha",1),O(this,"basic",new Ze),O(this,"fsQuad",new kt),O(this,"materialCache",new Map),O(this,"sceneBackgroundCache",null),O(this,"overrideBackground",new L("black")),O(this,"overrideMeshMaterial",new Ze({color:"black"})),O(this,"overrideLineMaterial",new et({color:"black"})),O(this,"overridePointsMaterial",new Qe({color:"black"})),O(this,"overrideSpriteMaterial",new Ke({color:"black"})),this.resolution=e,this.strength=t,this.radius=r,this.threshold=s,this.renderScene=o,this.renderCamera=i,this.selectedObjects=n;let a=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);this.selectRenderTarget=new he(a,c),this.selectRenderTarget.texture.name="UnrealBloomPass.selected",this.selectRenderTarget.texture.generateMipmaps=!1,this.renderTargetBright=new he(a,c),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let A=0;A<this.nMips;A++){const j=new he(a,c);j.texture.name="UnrealBloomPass.h"+A,j.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(j);const C=new he(a,c);C.texture.name="UnrealBloomPass.v"+A,C.texture.generateMipmaps=!1,this.renderTargetsVertical.push(C),a=Math.round(a/2),c=Math.round(c/2)}Vr===void 0&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const l=Vr;this.highPassUniforms=de.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new k({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,defines:{}});const p=[3,5,7,9,11];a=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);for(let A=0;A<this.nMips;A++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(p[A])),this.separableBlurMaterials[A].uniforms.texSize.value=new y(a,c),a=Math.round(a/2),c=Math.round(c/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const M=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=M,this.bloomTintColors=[new f(1,1,1),new f(1,1,1),new f(1,1,1),new f(1,1,1),new f(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.mixMaterial=this.getMixMaterial()}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose()}setSize(e,t){let r=Math.round(e/2),s=Math.round(t/2);this.selectRenderTarget.setSize(r,s),this.renderTargetBright.setSize(r,s);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(r,s),this.renderTargetsVertical[o].setSize(r,s),this.separableBlurMaterials[o].uniforms.texSize.value=new y(r,s),r=Math.round(r/2),s=Math.round(s/2)}render(e,t,r,s,o){if(!this.selectedObjects.length){this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e));return}e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const i=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),o&&e.state.buffers.stencil.setTest(!1);const n=new Map;for(const l of this.selectedObjects)n.set(l,!0);const a=this.materialCache;this.renderScene.background&&(this.sceneBackgroundCache=this.renderScene.background,this.renderScene.background=this.overrideBackground),this.renderScene.traverse(l=>{!n.has(l)&&!l.isLight&&l.visible&&(a.set(l,l.material),l instanceof Ve?l.material=this.overrideMeshMaterial:l instanceof fs?l.material=this.overrideLineMaterial:l instanceof tt?l.material=this.overridePointsMaterial:l instanceof Dr&&(l.material=this.overrideSpriteMaterial))}),e.setRenderTarget(this.selectRenderTarget),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=this.selectRenderTarget.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=this.selectRenderTarget.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let c=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[l].uniforms.direction.value=xr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=xr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),c=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.mixMaterial,this.mixMaterial.uniforms.bloom.value=this.renderTargetsHorizontal[0].texture,this.mixMaterial.uniforms.origin.value=r.texture,o&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=i;for(const l of a.entries())l[0].material=l[1];a.clear(),this.sceneBackgroundCache&&(this.renderScene.background=this.sceneBackgroundCache,this.sceneBackgroundCache=null)}getMixMaterial(){return new k({blending:gs,depthTest:!1,depthWrite:!1,transparent:!0,uniforms:{bloom:{value:null},origin:{value:null}},vertexShader:`
    
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
        }`})}getSeperableBlurMaterial(e){return new k({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new y(.5,.5)},direction:{value:new y(.5,.5)}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new k({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}};let Br=xr;O(Br,"BlurDirectionX",new y(1,0));O(Br,"BlurDirectionY",new y(0,1));var Pi=u({type:"SelectiveBloomPass",config:yi,commands:{add:{selectedObjects({target:e,engine:t,value:r}){const s=t.getObject3D(r);s?e.selectedObjects.push(s):console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${r}`)}},set:{renderScene({target:e,engine:t,value:r}){const s=t.getObject3D(r);s instanceof Er&&(e.renderScene=s)},renderCamera({target:e,engine:t,value:r}){const s=t.getObject3D(r);s instanceof go&&(e.renderCamera=s)},selectedObjects({target:e,config:t,engine:r}){const s=t.selectedObjects.map(o=>{const i=r.getObject3D(o);if(i)return i;console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${o}`)}).filter(o=>o);e.selectedObjects=s}},delete:{selectedObjects({target:e,engine:t,value:r}){const s=t.getObject3D(r);s?e.selectedObjects.includes(s)&&e.selectedObjects.splice(e.selectedObjects.indexOf(s),1):console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${r}`)}}},create(e,t){const r=[];for(const i of e.selectedObjects){const n=t.getObject3D(i);n&&r.push(n)}const s=window.devicePixelRatio;return new Br(new y(t.dom?t.dom.offsetWidth*s:window.innerWidth*s,t.dom?t.dom.offsetHeight*s:window.innerWidth*s),e.strength,e.radius,e.threshold,e.renderScene&&t.getObjectfromModule(E.SCENE,e.renderScene)||void 0,e.renderCamera&&t.getObjectfromModule(E.CAMERA,e.renderCamera)||void 0,r)},dispose(e){e.dispose()}}),Ti=u({type:"SMAAPass",config:vi,create(e,t){const r=window.devicePixelRatio;return new hi(t.dom?t.dom.offsetWidth*r:window.innerWidth*r,t.dom?t.dom.offsetHeight*r:window.innerWidth*r)},dispose(e){}});let pt=new V(window.innerWidth,window.innerHeight);const Bs=function(e){const t=new V(e.width?e.width:window.innerWidth,e.height?e.height:window.innerHeight);return pt.copy(t),t.dispose(),pt},Yr=function(e,t){const r=new De(t.getObjectBySymbol(e.groudOption.geometry)||Bs(e),{color:e.groudOption.color,clipBias:e.groudOption.clipBias,textureHeight:e.groudOption.textureHeight||t.dom.offsetWidth*window.devicePixelRatio,textureWidth:e.groudOption.textureWidth||t.dom.offsetHeight*window.devicePixelRatio,multisample:e.groudOption.multisample,useDepthTexture:!0});return r.material.depthWrite=!1,r.raycast=()=>{},r.visible=!1,r.geometry===pt&&(r.rotation.x=-Math.PI/2),(e.scene?t.getObjectBySymbol(e.scene):t.scene).add(r),r},qr=function(e){e.getRenderTarget().dispose(),e.material.dispose()};var Ai=u({type:"SSRPass",config:bi,commands:{set:{ground({target:e,config:t,value:r,engine:s}){if(r&&!e.groundReflector){e.groundReflector=Yr(t,s);return}!r&&e.groundReflector&&(qr(e.groundReflector),e.groundReflector=null)},groudOption:{geometry({target:e,config:t,value:r,engine:s}){if(t.ground)if(r){const o=s.getObjectBySymbol(r);if(!o){console.warn(`SSR pass processor: can not found geometry with: ${r}`);return}e.groundReflector.geometry=o}else e.groundReflector.geometry=Bs(t)}},opacity({target:e,value:t}){e.groundReflector&&(e.groundReflector.opacity=t),e.opacity=t},maxDistance({target:e,value:t}){e.groundReflector&&(e.groundReflector.maxDistance=t),e.maxDistance=t}}},create(e,t){const r=window.devicePixelRatio,s=new Ee({renderer:e.renderer?t.getObjectBySymbol(e.renderer):t.webGLRenderer,scene:e.scene?t.getObjectBySymbol(e.scene):t.scene,camera:e.camera?t.getObjectBySymbol(e.camera):t.camera,width:e.width?e.width:t.dom.offsetWidth*r,height:e.height?e.height:t.dom.offsetHeight*r,groundReflector:e.ground?Yr(e,t):void 0,selects:e.selects.map(o=>t.getObjectBySymbol(o)),bouncing:e.bouncing});if(s.infiniteThick=e.infiniteThick,s.opacity=e.opacity,s.output=e.output,s.maxDistance=e.maxDistance,s.thickness=e.thickness,s.groundReflector){const o=s.groundReflector;o.opacity=s.opacity,o.maxDistance=s.maxDistance}return s},dispose(e){qr(e.groundReflector),e.groundReflector=null,e.dispose(),pt.dispose(),pt=void 0}}),Oi=u({type:"UnrealBloomPass",config:xi,create(e,t){const r=window.devicePixelRatio;return new ti(new y(t.dom?t.dom.offsetWidth*r:window.innerWidth*r,t.dom?t.dom.offsetHeight*r:window.innerWidth*r),e.strength,e.radius,e.threshold)},dispose(e){e.dispose()}}),Td={type:"pass",compiler:fi,rule:gi,processors:[Oi,Ti,Pi,Ai,Si,Ci]},Ei=Object.defineProperty,Di=(e,t,r)=>t in e?Ei(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ri=(e,t,r)=>(Di(e,typeof t!="symbol"?t+"":t,r),r);class ji extends re{constructor(){super(),Ri(this,"scriptAniSymbol","vis.scriptAni")}playAnimation(t){this.engine.renderManager.addEventListener("render",t)}stopAnimation(t){this.engine.renderManager.removeEventListener("render",t)}restoreAttribute(t){if(!t.target||!t.attribute)return this;let r=this.engine.getObjectBySymbol(t.target),s=this.engine.getConfigBySymbol(t.target);(!r||!s)&&console.warn("AnimationCompiler: can not found object target or config in engine",t.vid);const o=t.attribute.split(".");o.shift();const i=o.pop();for(const n of o)if(r[n]&&s[n])r=r[n],s=s[n];else return console.warn("AnimationCompiler: object and config attribute are not sync"),this;return r[i]=s[i],this}cover(t){if(super.cover(t),t.type==="ScriptAnimation"){const r=this.map.get(t.vid);t[Symbol.for(this.scriptAniSymbol)]=r}return this}remove(t){return t.type==="ScriptAnimation"&&(this.engine.removeEventListener("render",t[Symbol.for(this.scriptAniSymbol)]),this.restoreAttribute(t),delete t[Symbol.for(this.scriptAniSymbol)]),super.remove(t),this}compile(t,r){const s=this.target[t];if(s.type==="ScriptAnimation"){this.restoreAttribute(s),super.compile(t,r);const o=this.map.get(t),i=s[Symbol.for(this.scriptAniSymbol)];return this.map.set(s.vid,i),this.weakMap.delete(o),this.weakMap.set(i,t),this}return super.compile(t,r),this}}const Li=function(e,t){e.key==="name"&&e.path.length===1||te(e,t)},zs=function(){return Object.assign(oe(),{play:!0})},Bi=function(){return Object.assign(zs(),{target:"",time:0,timeScale:1})},zi=function(){return Object.assign(zs(),{target:"",script:{name:""},attribute:""})},Zr=function(e,t){let r=t.compilerManager.getObjectBySymbol(e.target);if(!r)return console.warn(`can not found object in enigne: ${e.target}`),()=>{};const s=e.attribute.split(".");s.shift();const o=s.pop();for(const i of s){if(r[i]===void 0)return console.warn(`animaton processor: target object can not found key: ${i}`,r),()=>{};r=r[i]}return co.generateScript(t,r,o,e.script)};var Wi=u({type:"ScriptAnimation",config:zi,commands:{set:{play({target:e,compiler:t,value:r}){r?t.playAnimation(e):t.stopAnimation(e)},$reg:[{reg:new RegExp(".*"),handler({config:e,engine:t,compiler:r}){const s=e[Symbol.for(r.scriptAniSymbol)];r.stopAnimation(s);const o=Zr(e,t);e[Symbol.for(r.scriptAniSymbol)]=o,e.play&&r.playAnimation(s)}}]}},create(e,t,r){const s=Zr(e,t);return e.play&&r.playAnimation(s),e[Symbol.for(r.scriptAniSymbol)]=s,s},dispose(e,t,r){r.stopAnimation(e)}});const tr=new WeakMap;var Ui=u({type:"MixerAnimation",config:Bi,create(e,t,r){let s;Array.isArray(e.target)?(s=new vo,e.target.forEach(i=>{const n=t.getObjectBySymbol(i);n?s.add(n):console.warn(`mixer animation processor can not found vid in engine: ${i}`)})):(s=t.getObjectBySymbol(e.target),s||(console.warn(`mixer animation processor can not found vid in engine: ${e.target}`),s=new Ft));const o=new vs(s);if(o.time=e.time,o.timeScale=e.timeScale,e.play){const i=n=>{o.update(n.delta)};r.playAnimation(i),tr.set(o,i)}return o},dispose(e,t,r){const s=tr.get(e);s&&(r.stopAnimation(s),tr.delete(e)),e.uncacheRoot(e.getRoot()),e._actions.forEach(o=>{const i=o.getClip();e.uncacheClip(i),e.uncacheAction(i)})}}),Ad={type:"animation",compiler:ji,rule:Li,processors:[Wi,Ui],lifeOrder:z.NINE};class ge extends re{constructor(){super()}}const pe=function(){return Object.assign(oe(),{type:"Object3D",castShadow:!0,receiveShadow:!0,lookAt:"",visible:!0,matrixAutoUpdate:!0,renderOrder:0,position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},up:{x:0,y:1,z:0},parent:"",children:[],pointerdown:[],pointermove:[],pointerup:[],pointerenter:[],pointerleave:[],click:[],dblclick:[],contextmenu:[]})},ie=function(e,t,r=se){e.key!=="parent"&&te(e,t,r)},Qr=new WeakMap,Ws=function({target:e,config:t,value:r,engine:s}){if(t.vid===r){console.warn("can not set object lookAt itself.");return}let o=Qr.get(e);if(o||(o={lookAtTarget:null,updateMatrixWorldFun:null},Qr.set(e,o)),!r){if(!o.updateMatrixWorldFun)return;e.updateMatrixWorld=o.updateMatrixWorldFun,o.lookAtTarget=null,o.updateMatrixWorldFun=null;return}Se.exec(i=>{const n=s.compilerManager.getObjectfromModules(Ar,r);if(!n)return i&&console.warn(`lookAt handler can not found this vid mapping object: '${r}'`),!1;const a=e.updateMatrixWorld;return o.updateMatrixWorldFun=a,o.lookAtTarget=n.position,e.updateMatrixWorld=c=>{a.call(e,c),e.lookAt(o.lookAtTarget)},!0})},mt="vis.event",Oe=function({target:e,path:t,value:r,engine:s}){const o=t[0];if(!dr.has(r.name)){console.warn(`EventGeneratorManager: can not support this event: ${r.name}`);return}const i=dr.generateEvent(r,s),n=Symbol.for(mt);r[n]=i,e.addEventListener(o,i)},ze=function({target:e,path:t,value:r}){const s=t[0],o=r[Symbol.for(mt)];if(!o){console.warn("event remove can not fun found event in config",r);return}e.removeEventListener(s,o),delete r[Symbol.for(mt)]},We=function({target:e,config:t,path:r,engine:s}){if(r.length<2)return;const o=r[0],i=t[r[0]][r[1]],n=i[Symbol.for(mt)];if(!n){console.warn("event remove can not fun found event in config",i);return}e.removeEventListener(o,n);const a=dr.generateEvent(i,s);i[Symbol.for(mt)]=a,e.addEventListener(o,a)},yr=function({target:e,config:t,value:r,engine:s}){hs.registerExec(o=>{const i=s.getConfigBySymbol(r);if(!i)return o||console.warn(` can not foud object config in engine: ${r}`),!1;if(i.parent&&i.parent!==t.vid){const a=s.getConfigBySymbol(i.parent);if(!a)return o||console.warn(` can not foud object parent config in engine: ${i.parent}`),!1;a.children.splice(a.children.indexOf(r),1)}i.parent=t.vid;const n=s.compilerManager.getObjectfromModules(Ar,r);return n?(e.add(n),n.updateMatrixWorld(!0),T.compilerEvent.emit(n,`${R.COMPILE}:parent`),!0):(o||console.warn(`can not found this vid in engine: ${r}.`),!1)})},Ni=function({target:e,config:t,value:r,engine:s}){const o=s.compilerManager.getObjectfromModules(Ar,r);if(!o){console.warn(`can not found this vid in engine: ${r}.`);return}e.remove(o);const i=s.getConfigBySymbol(r);if(!i){console.warn(`can not found this vid in engine: ${r}.`);return}i.parent="",T.compilerEvent.emit(o,`${R.COMPILE}:parent`)},le=function(e,t,r,s){!r.lookAt&&Ws({target:e,config:t,engine:s,value:t.lookAt}),t.children.forEach(o=>{yr({target:e,config:t,value:o,engine:s})});for(const o of Object.values(ii))Se.nextTick(()=>(t[o].forEach((i,n)=>{Oe({target:e,path:[o,n.toString()],value:i,engine:s})}),!0));return Pe(t,e,{vid:!0,type:!0,lookAt:!0,parent:!0,children:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointerenter:!0,pointerleave:!0,click:!0,dblclick:!0,contextmenu:!0,...r}),e},q=function(e){e._listener={}},B={add:{pointerdown:Oe,pointerup:Oe,pointermove:Oe,pointerenter:Oe,pointerleave:Oe,click:Oe,dblclick:Oe,contextmenu:Oe,children:yr},set:{lookAt:Ws,pointerdown:We,pointerup:We,pointermove:We,pointerenter:We,pointerleave:We,click:We,dblclick:We,contextmenu:We,parent:jt,children:{$reg:[{reg:new RegExp(".*"),handler:yr}]}},delete:{pointerdown:ze,pointerup:ze,pointermove:ze,pointerenter:ze,pointerleave:ze,click:ze,dblclick:ze,contextmenu:ze,children:Ni}};var Fi=Object.defineProperty,Hi=(e,t,r)=>t in e?Fi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Gi=(e,t,r)=>(Hi(e,typeof t!="symbol"?t+"":t,r),r);class Ii extends ge{constructor(){super(),Gi(this,"cacheCameraMap",new WeakMap)}}function ki(e){e.setCameraBySymbol=function(t){const r=this.compilerManager.getCompiler(E.CAMERA);return r.map.has(t)?this.setCamera(r.map.get(t)):console.warn("can not found camera",t),this}}const Vi=function(e,t){ie(e,t)},Xi=function(){return Object.assign(pe(),{adaptiveWindow:!1,fov:45,aspect:1920/1080,near:5,far:50})},Yi=function(){return Object.assign(pe(),{adaptiveWindow:!1,left:-window.innerWidth,right:window.innerWidth,top:window.innerHeight,bottom:-window.innerHeight,near:5,far:50,zoom:1})};var qi=u({type:"OrthographicCamera",config:Yi,commands:{add:{scale(){},...B.add},set:{scale(){},adaptiveWindow({target:e,value:t,engine:r,compiler:s}){if(t){if(!s.cacheCameraMap.has(t)){const o=i=>{const n=i.width,a=i.height;e.left=-n,e.right=n,e.top=a,e.bottom=-a,e.updateProjectionMatrix()};s.cacheCameraMap.set(e,o),r.addEventListener("setSize",o),o({type:"setSize",width:r.dom.offsetWidth,height:r.dom.offsetHeight})}}else{const o=s.cacheCameraMap.get(e);o&&(r.removeEventListener("setSize",o),s.cacheCameraMap.delete(e))}},...B.set,$reg:[{reg:new RegExp("left|right|top|bottom|near|far|zoom"),handler({target:e,key:t,value:r}){e[t]=r,e.updateProjectionMatrix()}}]},delete:{scale(){},...B.delete}},create(e,t,r){const s=new xs(-50,50,50,-50);if(le(s,e,{scale:!0,adaptiveWindow:!0},t),s.updateProjectionMatrix(),e.adaptiveWindow){const o=i=>{const n=i.width,a=i.height;s.left=-n,s.right=n,s.top=a,s.bottom=-a,s.updateProjectionMatrix()};r.cacheCameraMap.set(s,o),t.addEventListener("setSize",o),o({type:"setSize",width:t.dom.offsetWidth,height:t.dom.offsetHeight})}return s},dispose(e,t,r){r.cacheCameraMap.delete(e),q(e)}}),Zi=u({type:"PerspectiveCamera",config:Xi,commands:{add:{scale(){},...B.add},set:{scale(){},adaptiveWindow({target:e,value:t,engine:r,compiler:s}){if(t){if(!s.cacheCameraMap.has(t)){const o=i=>{e.aspect=i.width/i.height,e.updateProjectionMatrix()};s.cacheCameraMap.set(e,o),r.addEventListener("setSize",o),o({type:"setSize",width:r.dom.offsetWidth,height:r.dom.offsetHeight})}}else{const o=s.cacheCameraMap.get(e);o&&(r.removeEventListener("setSize",o),s.cacheCameraMap.delete(e))}},...B.set,$reg:[{reg:new RegExp("fov|aspect|near|far"),handler({target:e,key:t,value:r}){e[t]=r,e.updateProjectionMatrix()}}]},delete:{scale(){},...B.delete}},create(e,t,r){const s=new $e;if(le(s,e,{scale:!0,adaptiveWindow:!0},t),s.updateProjectionMatrix(),e.adaptiveWindow){const o=i=>{s.aspect=i.width/i.height,s.updateProjectionMatrix()};r.cacheCameraMap.set(s,o),t.addEventListener("setSize",o),o({type:"setSize",width:t.dom.offsetWidth,height:t.dom.offsetHeight})}return s},dispose(e,t,r){r.cacheCameraMap.delete(e),q(e)}}),Od={type:"camera",object:!0,compiler:Ii,rule:Vi,processors:[qi,Zi],extend:ki,lifeOrder:z.THREE},Qi=Object.defineProperty,Ki=(e,t,r)=>t in e?Qi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ue=(e,t,r)=>(Ki(e,typeof t!="symbol"?t+"":t,r),r);class Ji extends ge{constructor(){super()}}const _i=function(){return Object.assign(pe(),{element:"",width:50,height:50})},$i=function(){return Object.assign(_i(),{})};class en extends ri{constructor(t=document.createElement("div")){const r=document.createElement("div"),s=50,o=50;r.style.width=`${s}px`,r.style.height=`${o}px`,r.appendChild(t),super(r),ue(this,"geometry"),ue(this,"_width"),ue(this,"_height"),this.geometry=new V(s,o),this.geometry.computeBoundingBox(),this._width=s,this._height=o}get width(){return this._width}set width(t){this.geometry.dispose(),this.geometry=new V(t,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${t}px`,this._width=t}get height(){return this._height}set height(t){this.geometry.dispose(),this.geometry=new V(this._width,t),this.geometry.computeBoundingBox(),this.element.style.height=`${t}px`,this._height=t}}class tn extends en{constructor(t=document.createElement("div")){super(t),ue(this,"cacheBox",new ke),ue(this,"viewWorldMatrix",new Y),ue(this,"mvPosition",new f),ue(this,"matrixScale",new f),ue(this,"worldScale",new f),ue(this,"vA",new f),ue(this,"vB",new f),ue(this,"vC",new f),ue(this,"alignedPosition",new y),ue(this,"rotatedPosition",new y),ue(this,"intersectPoint",new f),this.type="CSS2DPlane",this.element.classList.add("vis-css2d","vis-css2d-plane"),new MutationObserver(()=>{this.matrixScale.set(Math.abs(this.width/100)*.1,Math.abs(this.height/100)*.1,1)}).observe(this.element,{attributeFilter:["style"]})}transformVertex(t,r,s){const o=this.alignedPosition,i=this.rotatedPosition,n=0,a=1;o.copy(t).multiply(s),i.x=a*o.x-n*o.y,i.y=n*o.x+a*o.y,t.copy(r),t.x+=i.x,t.y+=i.y,t.applyMatrix4(this.viewWorldMatrix)}raycast(t,r){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),this.viewWorldMatrix.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),this.mvPosition.setFromMatrixPosition(this.modelViewMatrix),this.worldScale.copy(this.matrixScale).multiplyScalar(-this.mvPosition.z),this.transformVertex(this.vA.set(-.5,-.5,0),this.mvPosition,this.worldScale),this.transformVertex(this.vB.set(.5,-.5,0),this.mvPosition,this.worldScale),this.transformVertex(this.vC.set(.5,.5,0),this.mvPosition,this.worldScale);let s=t.ray.intersectTriangle(this.vA,this.vB,this.vC,!1,this.intersectPoint);if(s===null&&(this.transformVertex(this.vB.set(-.5,.5,0),this.mvPosition,this.worldScale),s=t.ray.intersectTriangle(this.vA,this.vC,this.vB,!1,this.intersectPoint),s===null))return;const o=t.ray.origin.distanceTo(this.intersectPoint);o<t.near||o>t.far||r.push({distance:o,point:this.intersectPoint.clone(),face:null,object:this})}}const Kr=function(e,t){const r=t.resourceManager.resourceMap;if(!r.has(e))return console.warn(`css2D compiler: can not found resource element: ${e}`),document.createElement("div");const s=r.get(e);return s instanceof HTMLElement?s:(console.warn("css2D compiler can not suport render this resource type.",s.constructor,e),document.createElement("div"))};var rn=u({type:"CSS2DPlane",config:$i,commands:{add:B.add,set:{element({target:e,value:t,engine:r}){e.element.innerHTML="",e.element.appendChild(Kr(t,r))},...B.set},delete:B.delete},create(e,t){return le(new tn(Kr(e.element,t)),e,{element:!0},t)},dispose:q});const sn=function(e,t){ie(e,t)};var Ed={type:"css2D",object:!0,compiler:Ji,rule:sn,processors:[rn],lifeOrder:z.THREE},on=Object.defineProperty,nn=(e,t,r)=>t in e?on(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,fe=(e,t,r)=>(nn(e,typeof t!="symbol"?t+"":t,r),r);class an extends ge{constructor(){super()}}const ln=function(e,t){ie(e,t)},zr=function(){return Object.assign(pe(),{element:"",width:50,height:50})},cn=function(){return Object.assign(zr(),{})},un=function(){return Object.assign(zr(),{rotation2D:0})},Je=function(e,t){const r=t.resourceManager.resourceMap;if(!r.has(e))return console.warn(`css3D compiler: can not found resource element: ${e}`),document.createElement("div");const s=r.get(e);return s instanceof HTMLElement?s:(console.warn("css3D compiler can not suport render this resource type.",s.constructor,e),document.createElement("div"))};class dn extends Ds{constructor(t=document.createElement("div")){const r=document.createElement("div"),s=50,o=50;r.style.width=`${s}px`,r.style.height=`${o}px`,r.appendChild(t),super(r),fe(this,"geometry"),fe(this,"_width"),fe(this,"_height"),this.geometry=new V(s,o),this.geometry.computeBoundingBox(),this._width=s,this._height=o}get width(){return this._width}set width(t){this.geometry.dispose(),this.geometry=new V(t,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${t}px`,this._width=t}get height(){return this._height}set height(t){this.geometry.dispose(),this.geometry=new V(this._width,t),this.geometry.computeBoundingBox(),this.element.style.height=`${t}px`,this._height=t}}class hn extends dn{constructor(t=document.createElement("div")){super(t),fe(this,"cacheBox",new ke),this.type="CSS3DPlane",this.element.classList.add("vis-css3d","vis-css3d-plane")}raycast(t,r){const s=this.cacheBox.copy(this.geometry.boundingBox);s.applyMatrix4(this.matrixWorld),t.ray.intersectsBox(s)&&r.push({distance:t.ray.origin.distanceTo(this.position),object:this,point:this.position})}}var pn=u({type:"CSS3DPlane",config:cn,commands:{add:B.add,set:{element({target:e,value:t,engine:r}){e.element.innerHTML="",e.element.appendChild(Je(t,r))},...B.set},delete:B.delete},create(e,t){return le(new hn(Je(e.element,t)),e,{element:!0},t)},dispose:q}),mn=u({type:"CSS3DObject",config:zr,commands:{add:B.add,set:{element({target:e,value:t,engine:r}){e.element=Je(t,r)},...B.set},delete:B.delete},create(e,t){return le(new Ds(Je(e.element,t)),e,{element:!0},t)},dispose:q});class fn extends si{constructor(t=document.createElement("div")){const r=document.createElement("div"),s=50,o=50;r.style.width=`${s}px`,r.style.height=`${o}px`,r.appendChild(t),t.classList.add("vis-css3d","vis-css3d-sprite"),super(r),fe(this,"geometry"),fe(this,"_width"),fe(this,"_height"),fe(this,"cacheBox",new ke),fe(this,"cachePosition",new f),fe(this,"cacheQuaternion",new Rr),fe(this,"cacheScale",new f),fe(this,"cacheMatrix4",new Y),fe(this,"rotateMatrix4",new Y),this.geometry=new V(s,o),this.geometry.computeBoundingBox(),this._width=s,this._height=o,this.type="CSS3DSprite"}get width(){return this._width}set width(t){this.geometry.dispose(),this.geometry=new V(t,this._height),this.geometry.computeBoundingBox(),this.element.style.width=`${t}px`,this._width=t}get height(){return this._height}set height(t){this.geometry.dispose(),this.geometry=new V(this._width,t),this.geometry.computeBoundingBox(),this.element.style.height=`${t}px`,this._height=t}raycast(t,r){const s=this.cacheBox.copy(this.geometry.boundingBox);this.matrixWorld.decompose(this.cachePosition,this.cacheQuaternion,this.cacheScale);const o=this.rotateMatrix4.lookAt(this.position,t.camera.position,this.up);this.cacheQuaternion.setFromRotationMatrix(o),this.cacheMatrix4.compose(this.cachePosition,this.cacheQuaternion,this.cacheScale),s.applyMatrix4(this.cacheMatrix4),t.ray.intersectsBox(s)&&r.push({distance:t.ray.origin.distanceTo(this.position),object:this,point:this.position})}}class gn extends fn{constructor(t=document.createElement("div")){super(t),this.type="CSS3DSprite",this.element.classList.add("vis-css3d","vis-css3d-plane")}}var vn=u({type:"CSS3DSprite",config:un,commands:{add:B.add,set:{element({target:e,value:t,engine:r}){e.element.innerHTML="",e.element.appendChild(Je(t,r))},...B.set},delete:B.delete},create(e,t){return le(new gn(Je(e.element,t)),e,{element:!0},t)},dispose:q}),Dd={type:"css3D",object:!0,compiler:an,rule:ln,processors:[pn,mn,vn],lifeOrder:z.THREE};class xn extends ee{constructor(t,r,s,o){super();const i=[],n=[],a=[],c=new f,l=new Y;l.makeRotationFromEuler(s),l.setPosition(r);const p=new Y;p.copy(l).invert(),M(),this.setAttribute("position",new ne(i,3)),this.setAttribute("normal",new ne(n,3)),this.setAttribute("uv",new ne(a,2));function M(){let d=[];const x=new f,g=new f,S=t.geometry,v=S.attributes.position,U=S.attributes.normal;if(S.index!==null){const h=S.index;for(let b=0;b<h.count;b++)x.fromBufferAttribute(v,h.getX(b)),g.fromBufferAttribute(U,h.getX(b)),A(d,x,g)}else for(let h=0;h<v.count;h++)x.fromBufferAttribute(v,h),g.fromBufferAttribute(U,h),A(d,x,g);d=j(d,c.set(1,0,0)),d=j(d,c.set(-1,0,0)),d=j(d,c.set(0,1,0)),d=j(d,c.set(0,-1,0)),d=j(d,c.set(0,0,1)),d=j(d,c.set(0,0,-1));for(let h=0;h<d.length;h++){const b=d[h];a.push(.5+b.position.x/o.x,.5+b.position.y/o.y),b.position.applyMatrix4(l),i.push(b.position.x,b.position.y,b.position.z),n.push(b.normal.x,b.normal.y,b.normal.z)}}function A(d,x,g){x.applyMatrix4(t.matrixWorld),x.applyMatrix4(p),g.transformDirection(t.matrixWorld),d.push(new Jr(x.clone(),g.clone()))}function j(d,x){const g=[],S=.5*Math.abs(o.dot(x));for(let v=0;v<d.length;v+=3){let U=0,h,b,D,P;const N=d[v+0].position.dot(x)-S,K=d[v+1].position.dot(x)-S,W=d[v+2].position.dot(x)-S,w=N>0,ce=K>0,G=W>0;switch(U=(w?1:0)+(ce?1:0)+(G?1:0),U){case 0:{g.push(d[v]),g.push(d[v+1]),g.push(d[v+2]);break}case 1:{if(w&&(h=d[v+1],b=d[v+2],D=C(d[v],h,x,S),P=C(d[v],b,x,S)),ce){h=d[v],b=d[v+2],D=C(d[v+1],h,x,S),P=C(d[v+1],b,x,S),g.push(D),g.push(b.clone()),g.push(h.clone()),g.push(b.clone()),g.push(D.clone()),g.push(P);break}G&&(h=d[v],b=d[v+1],D=C(d[v+2],h,x,S),P=C(d[v+2],b,x,S)),g.push(h.clone()),g.push(b.clone()),g.push(D),g.push(P),g.push(D.clone()),g.push(b.clone());break}case 2:{w||(h=d[v].clone(),b=C(h,d[v+1],x,S),D=C(h,d[v+2],x,S),g.push(h),g.push(b),g.push(D)),ce||(h=d[v+1].clone(),b=C(h,d[v+2],x,S),D=C(h,d[v],x,S),g.push(h),g.push(b),g.push(D)),G||(h=d[v+2].clone(),b=C(h,d[v],x,S),D=C(h,d[v+1],x,S),g.push(h),g.push(b),g.push(D));break}}}return g}function C(d,x,g,S){const v=d.position.dot(g)-S,U=x.position.dot(g)-S,h=v/(v-U);return new Jr(new f(d.position.x+h*(x.position.x-d.position.x),d.position.y+h*(x.position.y-d.position.y),d.position.z+h*(x.position.z-d.position.z)),new f(d.normal.x+h*(x.normal.x-d.normal.x),d.normal.y+h*(x.normal.y-d.normal.y),d.normal.z+h*(x.normal.z-d.normal.z)))}}}class Jr{constructor(t,r){this.position=t,this.normal=r}clone(){return new this.constructor(this.position.clone(),this.normal.clone())}}var yn=Object.defineProperty,bn=(e,t,r)=>t in e?yn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Wr=(e,t,r)=>(bn(e,typeof t!="symbol"?t+"":t,r),r);const wn=function(e,t){t.center&&e.center(),e.computeBoundingBox();const r=e.boundingBox,s=t.position,o=t.rotation,i=t.scale,n=new Rr().setFromEuler(new fr(o.x,o.y,o.z,"XYZ"));return e.applyQuaternion(n),e.scale(i.x,i.y,i.z),t.center&&e.center(),e.computeBoundingBox(),e.translate((r.max.x-r.min.x)/2*s.x,(r.max.y-r.min.y)/2*s.y,(r.max.z-r.min.z)/2*s.z),e},rr={reg:new RegExp(".*"),handler({config:e,target:t,processor:r,engine:s,compiler:o}){const i=r.create(e,s,o);t.copy(i),t.uuid=i.uuid,r.dispose(i,s,o)}},F={add:{groups({target:e,value:t}){e.addGroup(t.start,t.count,t.materialIndex)},$reg:[rr]},set:{groups(e){const{path:t,target:r,config:s}=e;if(t[1]!==void 0){r.groups.splice(Number(e.path[1]),1);const o=s.groups[t[1]];r.addGroup(o.start,o.count,o.materialIndex)}else console.warn("geometry processor can not set group",e)},$reg:[rr]},delete:{groups({target:e,key:t}){e.groups.splice(Number(t),1)},$reg:[rr]}},H=function(e,t){e.clearGroups();for(const r of t.groups)e.addGroup(r.start,r.count,r.materialIndex);return wn(e,t)},X=function(e){e.dispose()},Z=function(){return Object.assign(oe(),{center:!0,position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},groups:[]})},Mn=function(){return Object.assign(Z(),{width:5,height:5,depth:5,widthSegments:1,heightSegments:1,depthSegments:1})},Sn=function(){return Object.assign(Z(),{radius:3,widthSegments:32,heightSegments:32,phiStart:0,phiLength:Math.PI*2,thetaStart:0,thetaLength:Math.PI})},Cn=function(){return Object.assign(Z(),{width:5,height:5,widthSegments:1,heightSegments:1})},Pn=function(){return Object.assign(Z(),{radius:3,segments:8,thetaStart:0,thetaLength:Math.PI*2})},Tn=function(){return Object.assign(Z(),{radius:3,height:5,radialSegments:8,heightSegments:1,openEnded:!1,thetaStart:0,thetaLength:Math.PI*2})},An=function(){return Object.assign(Z(),{radius:3,tube:.4,radialSegments:8,tubularSegments:6,arc:Math.PI*2})},On=function(){return Object.assign(Z(),{innerRadius:2,outerRadius:3,thetaSegments:8,phiSegments:8,thetaStart:0,thetaLength:Math.PI*2})},En=function(){return Object.assign(Z(),{url:""})},Dn=function(){return Object.assign(Z(),{attribute:{position:[],color:[],index:[],normal:[],uv:[],uv2:[]}})},Rn=function(){return Object.assign(Z(),{radiusTop:3,radiusBottom:3,height:5,radialSegments:8,heightSegments:1,openEnded:!1,thetaStart:0,thetaLength:Math.PI*2})},jn=function(){return Object.assign(Z(),{target:"",thresholdAngle:1})},Vt=function(){return Object.assign(Z(),{center:!1,path:[],divisions:36,space:!0})},Ln=function(){return Object.assign(Vt(),{center:!1})},Bn=function(){return Object.assign(Vt(),{center:!1})},zn=function(){return Object.assign(Vt(),{center:!1})},Wn=function(){return Object.assign(Vt(),{center:!1})},Us=function(){return Object.assign(Z(),{center:!1,path:[],tubularSegments:64,radius:1,radialSegments:8,closed:!1})},Un=function(){return Object.assign(Us(),{center:!1})},Nn=function(){return Object.assign(Us(),{center:!1})},Fn=function(){return Object.assign(Z(),{center:!1,shape:"",curveSegments:12})},Hn=function(){return Object.assign(Z(),{center:!1,path:[],curveSegments:12})},Gn=function(){return Object.assign(Z(),{center:!1,shapes:"",options:{curveSegments:12,steps:1,depth:1,bevelEnabled:!0,bevelThickness:.2,bevelSize:.1,bevelOffset:0,bevelSegments:3,extrudePath:"",UVGenerator:"default"}})},In=function(){return Object.assign(Z(),{center:!1,path:"",space:!1,divisions:36})},kn=function(){return Object.assign(Z(),{path:"",divisions:32,segments:12,phiStart:0,phiLength:Math.PI*2})},Vn=function(){return Object.assign(Z(),{center:!1,target:{geometry:"",position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0},scale:{x:0,y:0,z:0}},point:{x:0,y:0,z:0},orientation:{x:0,y:0,z:0},size:{x:0,y:0,z:0}})};var Xn=u({type:"BoxGeometry",config:Mn,commands:F,create:e=>H(new Gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments),e),dispose:X}),Yn=u({type:"CircleGeometry",config:Pn,commands:F,create:e=>H(new xo(e.radius,e.segments,e.thetaStart,e.thetaLength),e),dispose:X}),qn=u({type:"ConeGeometry",config:Tn,commands:F,create:e=>H(new yo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength),e),dispose:X});const I=function(e){return e>1?1:e<0?0:e},Zn={generateTopUV(e,t,r,s,o){const i=t[r*3],n=t[r*3+1],a=t[s*3],c=t[s*3+1],l=t[o*3],p=t[o*3+1];return[new y(I(i),I(n)),new y(I(a),I(c)),new y(I(l),I(p))]},generateSideWallUV(e,t,r,s,o,i){const n=t[r*3],a=t[r*3+1],c=t[r*3+2],l=t[s*3],p=t[s*3+1],M=t[s*3+2],A=t[o*3],j=t[o*3+1],C=t[o*3+2],d=t[i*3],x=t[i*3+1],g=t[i*3+2];return Math.abs(a-p)<Math.abs(n-l)?[new y(I(n),I(1-c)),new y(I(l),I(1-M)),new y(I(A),I(1-C)),new y(I(d),I(1-g))]:[new y(I(a),I(1-c)),new y(I(p),I(1-M)),new y(I(j),I(1-C)),new y(I(x),I(1-g))]}};var Qn={default:void 0,cover:Zn};class Kn extends ee{constructor(t){super(),Wr(this,"type","LoadBufferGeometry"),t&&this.copy(t)}}class Xt extends ee{constructor(t=[],r=36,s=!0){super(),Wr(this,"parameters"),this.type="CurveGeometry",this.parameters={path:t.map(o=>o.clone()),space:s,divisions:r}}}class Jn extends Xt{constructor(t=[],r=36,s=!0){super(t,r,s),this.type="CubicBezierCurveGeometry";const o=new Ht;if(t.length<4){console.warn("CubicBezierCurveGeometry path length at least 4.");return}const i=4+(t.length-4)-(t.length-4)%3;for(let a=2;a<i;a+=3)o.add(new To(t[a-2],t[a-1],t[a],t[a+1]));const n=o.curves.reduce((a,c)=>a+=c.arcLengthDivisions,0);if(r>n){const a=Math.ceil((r-n)/o.curves.length);o.curves.forEach(c=>{c.arcLengthDivisions=c.arcLengthDivisions*(a+1),c.updateArcLengths()})}this.setFromPoints(s?o.getSpacedPoints(r):o.getPoints(r))}}class _n extends Xt{constructor(t=[],r=36,s=!0){if(super(t,r,s),this.type="LineCurveGeometry",!t.length){console.warn("LineCurveGeometry path length at least 1.");return}const o=new Ht;for(let n=1;n<t.length;n+=1)o.add(new Ms(t[n-1],t[n]));const i=o.curves.reduce((n,a)=>n+=a.arcLengthDivisions,0);if(r>i){const n=Math.ceil((r-i)/o.curves.length);o.curves.forEach(a=>{a.arcLengthDivisions=a.arcLengthDivisions*(n+1),a.updateArcLengths()})}this.setFromPoints(s?o.getSpacedPoints(r):o.getPoints(r))}}class $n extends Xt{constructor(t=[],r=36,s=!0){super(t,r,s),this.type="QuadraticBezierCurveGeometry";const o=new Ht;if(t.length<3){console.warn("QuadraticBezierCurveGeometry path length at least 3.");return}const i=3+(t.length-3)-(t.length-3)%2;for(let a=1;a<i;a+=2)o.add(new Ao(t[a-1],t[a],t[a+1]));const n=o.curves.reduce((a,c)=>a+=c.arcLengthDivisions,0);if(r>n){const a=Math.ceil((r-n)/o.curves.length);o.curves.forEach(c=>{c.arcLengthDivisions=c.arcLengthDivisions*(a+1),c.updateArcLengths()})}this.setFromPoints(s?o.getSpacedPoints(r):o.getPoints(r))}}class ea extends Xt{constructor(t=[],r=36,s=!0){if(super(t,r,s),this.type="SplineCurveGeometry",!t.length){console.warn("SplineCurveGeometry path length at least 1.");return}const o=new Ss(t);this.setFromPoints(s?o.getSpacedPoints(r):o.getPoints(r))}}class ta extends ys{constructor(t=[new y(0,0)],r=12){const s=new bs,o=t[0];if(o){s.moveTo(o.x,o.y);for(let i=1;i<t.length;i+=1)s.lineTo(t[i].x,t[i].y)}super(s,r),this.type="LineShapeGeometry"}}class ra extends ws{constructor(t=[],r=64,s=1,o=8,i=!1){if(!t.length){console.warn("LineTubeGeometry path length at least 1.");return}const n=new Ht;for(let a=1;a<t.length;a+=1)n.add(new Ms(t[a-1],t[a]));super(n,r,s,o,i),this.type="LineTubeGeometry"}}class sa extends ws{constructor(t=[],r=64,s=1,o=8,i=!1){if(!t.length){console.warn("SplineTubeGeometry path length at least 1.");return}const n=new Ss(t);super(n,r,s,o,i),this.type="SplineTubeGeometry"}}class oa extends ee{constructor(t=new Cs,r=36,s=!0){super(),Wr(this,"parameters"),this.type="PathGeometry",this.parameters={path:t,space:s,divisions:r},t.curves.length&&this.setFromPoints(s?t.getSpacedPoints(r):t.getPoints(r))}}var ia=u({type:"CubicBezierCurveGeometry",config:zn,commands:F,create:e=>H(new Jn(e.path.map(t=>new f(t.x,t.y,t.z)),e.divisions,e.space),e),dispose:X});const na=function(e){const t=new ee;return e.position.length&&t.setAttribute("position",new ne(e.position,3)),e.color.length&&t.setAttribute("color",new ne(e.color,3)),e.normal.length&&t.setAttribute("normal",new ne(e.normal,3)),e.uv.length&&t.setAttribute("uv",new ne(e.uv,2)),e.uv2.length&&t.setAttribute("uv2",new ne(e.uv2,2)),e.index.length&&t.setIndex(e.index),t};var aa=u({type:"CustomGeometry",config:Dn,commands:F,create(e){return H(na(e.attribute),e)},dispose(e){e.dispose()}}),la=u({type:"CylinderGeometry",config:Rn,commands:F,create:e=>H(new bo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength),e),dispose:X});const ca=new we(new Gt(5,5,5));var ua=u({type:"EdgesGeometry",config:jn,commands:F,create(e,t){const r=t.compilerManager.getObjectfromModule(E.GEOMETRY,e.target);return!r||!(r instanceof ee)?(console.error(`engine rescoure can not found url: ${e.target}`),ca):H(new we(r,e.thresholdAngle),e)},dispose(e){e.dispose()}});class da extends re{constructor(){super()}}const ha=function(e,t){te(e,t)};var pa=u({type:"LineCurveGeometry",config:Ln,commands:F,create:e=>H(new _n(e.path.map(t=>new f(t.x,t.y,t.z)),e.divisions,e.space),e),dispose:X}),ma=u({type:"LineShapeGeometry",config:Hn,commands:F,create:e=>H(new ta(e.path.map(t=>new y(t.x,t.y)),e.curveSegments),e),dispose:X}),fa=u({type:"LineTubeGeometry",config:Un,commands:F,create:e=>H(new ra(e.path.map(t=>new f(t.x,t.y,t.z)),e.tubularSegments,e.radius,e.radialSegments,e.closed),e),dispose:X}),ga=u({type:"LoadGeometry",config:En,commands:F,create(e,t){const r=t.resourceManager.resourceMap.get(e.url);return!r&&!(r instanceof ee)?(console.error(`engine rescoure can not found url: ${e.url}`),new Gt(5,5,5)):H(new Kn(r),e)},dispose(e){e.dispose()}}),va=u({type:"PlaneGeometry",config:Cn,commands:F,create:e=>H(new V(e.width,e.height,e.widthSegments,e.heightSegments),e),dispose:X}),xa=u({type:"QuadraticBezierCurveGeometry",config:Wn,commands:F,create:e=>H(new $n(e.path.map(t=>new f(t.x,t.y,t.z)),e.divisions,e.space),e),dispose:X}),ya=u({type:"RingGeometry",config:On,commands:F,create:e=>H(new wo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength),e),dispose:X}),ba=u({type:"SphereGeometry",config:Sn,commands:F,create:e=>H(new Mo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength),e),dispose:X}),wa=u({type:"SplineCurveGeometry",config:Bn,commands:F,create:e=>H(new ea(e.path.map(t=>new f(t.x,t.y,t.z)),e.divisions,e.space),e),dispose:X}),Ma=u({type:"SplineTubeGeometry",config:Nn,commands:F,create:e=>H(new sa(e.path.map(t=>new f(t.x,t.y,t.z)),e.tubularSegments,e.radius,e.radialSegments,e.closed),e),dispose:X}),Sa=u({type:"TorusGeometry",config:An,commands:F,create:e=>H(new So(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc),e),dispose:X});const ct=new WeakMap,_r=function(e,t,r){ct.has(e)||ct.set(e,new Set),ct.get(e).add({target:t,eventFun:r})};var Ca=u({type:"ExtrudeGeometry",config:Gn,commands:F,create(e,t){const r=t.compilerManager.getObjectfromModule(E.SHAPE,e.shapes)||void 0,s=t.compilerManager.getObjectfromModule(E.PATH,e.options.extrudePath)||void 0,o=new Co(r,Object.assign({},e.options,{extrudePath:s,UVGenerator:Qn[e.options.UVGenerator||"default"]}));if(r){const i=()=>{e.shapes=e.shapes};T.compilerEvent.on(r,R.UPDATE,i),_r(o,r,i)}if(s){const i=()=>{e.options.extrudePath=e.options.extrudePath};T.compilerEvent.on(s,R.UPDATE,i),_r(o,s,i)}return H(o,e)},dispose(e,t,r){const s=ct.get(e);s&&s.forEach(o=>{T.compilerEvent.off(o.target,R.UPDATE,o.eventFun)}),ct.delete(e),X(e)}});const br=new WeakMap,Pa=function(e,t,r){br.set(e,{target:t,eventFun:r})};var Ta=u({type:"PathGeometry",config:In,commands:F,create(e,t){const r=t.compilerManager.getObjectfromModule(E.PATH,e.path)||void 0,s=new oa(r,e.divisions,e.space);if(r){const o=()=>{e.path=e.path};T.compilerEvent.on(r,R.UPDATE,o),Pa(s,r,o)}return H(s,e)},dispose(e,t,r){const s=br.get(e);s&&T.compilerEvent.off(s.target,R.UPDATE,s.eventFun),br.delete(e),X(e)}});const wr=new WeakMap,Aa=function(e,t,r){wr.set(e,{target:t,eventFun:r})};var Oa=u({type:"ShapeGeometry",config:Fn,commands:F,create(e,t){const r=t.compilerManager.getObjectfromModule(E.SHAPE,e.shape)||void 0,s=new ys(r,e.curveSegments);if(r){const o=()=>{e.shape=e.shape};T.compilerEvent.on(r,R.UPDATE,o),Aa(s,r,o)}return H(s,e)},dispose(e,t,r){const s=wr.get(e);s&&T.compilerEvent.off(s.target,R.UPDATE,s.eventFun),wr.delete(e),X(e)}});const Mr=new WeakMap,Ea=function(e,t,r){Mr.set(e,{target:t,eventFun:r})};var Da=u({type:"LatheGeometry",config:kn,commands:F,create(e,t){const r=t.compilerManager.getObjectfromModule(E.PATH,e.path)||void 0,s=new Po(r?r.getPoints(e.divisions):void 0,e.segments,e.phiStart,e.phiLength);if(r){const o=()=>{e.path=e.path};T.compilerEvent.on(r,R.UPDATE,o),Ea(s,r,o)}return H(s,e)},dispose(e){const t=Mr.get(e);t&&T.compilerEvent.off(t.target,R.UPDATE,t.eventFun),Mr.delete(e),X(e)}});const $r=new ee,sr=new Ve;var Ra=u({type:"DecalGeometry",config:Vn,commands:F,create:(e,t)=>{const r=e.target.geometry&&t.getObjectBySymbol(e.target.geometry)||$r;return sr.geometry=r,sr.matrixWorld.compose(new f(e.target.position.x,e.target.position.y,e.target.position.z),new Rr().setFromEuler(new fr(e.target.rotation.x,e.target.rotation.y,e.target.rotation.z)),new f(e.target.scale.x,e.target.scale.y,e.target.scale.z)),H(new xn(sr,new f(e.point.x,e.point.y,e.point.z),new fr(e.orientation.x,e.orientation.y,e.orientation.z),new f(e.size.x,e.size.y,e.size.z)),e)},dispose:X}),Rd={type:"geometry",compiler:da,rule:ha,lifeOrder:z.TWO,processors:[Xn,Yn,qn,ia,aa,la,ua,pa,ma,fa,ga,va,xa,ya,ba,wa,Ma,Sa,Ca,Ta,Oa,Da,Ra]};class ja extends ge{constructor(){super()}}const La=function(){return Object.assign(pe(),{children:[]})};var Ba=u({type:"Group",config:La,commands:B,create(e,t){return le(new Oo,e,{},t)},dispose:q});const za=function(e,t){ie(e,t)};var jd={type:"group",object:!0,compiler:ja,rule:za,processors:[Ba],lifeOrder:z.THREE};class Wa extends ge{constructor(){super()}}const Ua=function(e,t){ie(e,t)},vt=function(){return Object.assign(pe(),{type:"Light",color:"rgb(255, 255, 255)",intensity:1})},Na=function(){return Object.assign(pe(),{color:"rgb(255, 255, 255)",intensity:1})},Fa=function(){return Object.assign(vt(),{distance:30,decay:.01})},Ha=function(){return Object.assign(vt(),{distance:30,angle:Math.PI/180*45,penumbra:.01,decay:.01})},Ga=function(){return Object.assign(vt(),{shadow:{mapSize:{width:512,height:512},camera:{near:.5,far:500}}})},Ia=function(){return Object.assign(vt(),{color:"rgb(255, 255, 255)",groundColor:"rgb(0, 0, 0)"})},ka=function(){return Object.assign(vt(),{width:10,height:10})},Va=function({target:e,value:t}){e.color.copy(new L(t))},st=function(e,t,r,s){return e.color.copy(new L(t.color)),le(e,t,{color:!0,scale:!0,rotation:!0,lookAt:!0,...r},s)},ot=Object.assign({},B,{set:{color:Va,scale:jt,rotation:jt,lookAt:jt}});var Xa=u({type:"AmbientLight",config:Na,commands:ot,create(e,t){return st(new Ro,e,{},t)},dispose:q}),Ya=u({type:"DirectionalLight",config:Ga,commands:ot,create(e,t){return st(new jo,e,{},t)},dispose:q}),qa=u({type:"HemisphereLight",config:Ia,commands:{set:{...ot.set,groundColor:function({target:e,value:t}){e.groundColor.copy(new L(t))}}},create(e,t){const r=new Eo;return r.groundColor.copy(new L(e.groundColor)),st(r,e,{groundColor:!0},t)},dispose:q}),Za=u({type:"PointLight",config:Fa,commands:ot,create(e,t){return st(new Lo,e,{},t)},dispose:q}),Qa=u({type:"RectAreaLight",config:ka,commands:{set:{...ot.set,rotation:void 0}},create(e,t){const r=st(new Do,e,{},t);return r.rotation.set(e.rotation.x,e.rotation.y,e.rotation.z),r.updateMatrixWorld(),r},dispose:q}),Ka=u({type:"SpotLight",config:Ha,commands:ot,create(e,t){return st(new Bo,e,{},t)},dispose:q}),Ld={type:"light",object:!0,compiler:Wa,rule:Ua,processors:[Xa,Za,Ya,qa,Qa,Ka],lifeOrder:z.THREE};class xt extends ge{constructor(){super()}}const yt=function(){return Object.assign(pe(),{material:"",geometry:""})},Ct=new k({fragmentShader:`
  void main () {
    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
  }
  `}),Ja=new Gt(10,10,10),Yt=function({target:e,value:t,engine:r}){Se.exec(s=>{const o=r.compilerManager.getObjectfromModule(E.GEOMETRY,t);return o?(e.geometry=o,!0):(s&&console.warn(`can not found geometry by vid in engine: ${t}`),e.geometry=Ja,!1)})},Bt=function({target:e,config:t,engine:r}){Se.exec(s=>{let o;return typeof t.material=="string"?o=r.compilerManager.getObjectfromModule(E.MATERIAL,t.material)||Ct:o=t.material.map(i=>r.compilerManager.getObjectfromModule(E.MATERIAL,i)||Ct),e.material=o,!(Array.isArray(o)&&o.length&&o[0]===Ct||o===Ct)})},it=function(e,t,r,s){return r.geometry||(e.geometry.dispose(),Yt({target:e,value:t.geometry,engine:s})),r.material||Bt({target:e,config:t,engine:s}),le(e,t,{geometry:!0,material:!0,...r},s)},bt=function(e){q(e)},be={add:{material:Bt,...B.add},set:{geometry:Yt,material:Bt,...B.set},delete:{material:Bt,...B.delete}};class _a extends xt{constructor(){super()}}const Ns=function(){return Object.assign(yt(),{geometry:"",material:"",dashed:!1})},$a=function(){return Ns()},Ut=new WeakMap,Ye=new WeakMap,Sr=function(e,t,r){Ye.has(t)?console.warn("Line processor has already exist geometry cache"):(Ye.set(t,r),T.compilerEvent.on(t,R.UPDATE,r),Ut.set(e,t))},Fs=function(e,t){if(!Ye.has(t)){console.warn("Line processor found an error can not found cache geometry:",t);return}T.compilerEvent.off(t,R.UPDATE,Ye.get(t)),Ye.delete(t),Ut.get(e)===t&&Ut.delete(e)},el=function(e,t){const r=Ut.get(e);if(!r){console.warn("line processor can not change line geometry");return}const s=Ye.get(r);Fs(e,r),Sr(e,t,s)};var tl=u({type:"Line",config:Ns,commands:{add:be.add,set:{...be.set,dashed({target:e,value:t}){if(e.material instanceof dt&&t){const r=()=>{e.computeLineDistances()};Sr(e,e.geometry,r),r();return}t||Fs(e,e.geometry)},geometry(e){Yt(e),el(e.target,e.target.geometry)}},delete:be.delete},create(e,t){const r=it(new fs,e,{dashed:!0},t);if(r.material instanceof dt&&e.dashed){const s=()=>{r.computeLineDistances()};Sr(r,r.geometry,s),s()}return r},dispose:bt});const rl=function(e,t){ie(e,t)},Nt=new WeakMap,qe=new WeakMap,Cr=function(e,t,r){qe.has(t)?console.warn("LineSegments processor has already exist geometry cache"):(qe.set(t,r),T.compilerEvent.on(t,R.UPDATE,r),Nt.set(e,t))},Hs=function(e,t){if(!qe.has(t)){console.warn("LineSegments processor found an error can not found cache geometry:",t);return}T.compilerEvent.off(t,R.UPDATE,qe.get(t)),qe.delete(t),Nt.get(e)===t&&Nt.delete(e)},sl=function(e,t){const r=Nt.get(e);if(!r){console.warn("line processor can not change line geometry");return}const s=qe.get(r);Hs(e,r),Cr(e,t,s)};var ol=u({type:"LineSegments",config:$a,commands:{add:be.add,set:{...be.set,dashed({target:e,value:t}){if(e.material instanceof dt&&t){const r=()=>{e.computeLineDistances()};Cr(e,e.geometry,r),r();return}t||Hs(e,e.geometry)},geometry(e){Yt(e),sl(e.target,e.target.geometry)}},delete:be.delete},create(e,t){const r=it(new ae,e,{dashed:!0},t);if(r.material instanceof dt&&e.dashed){const s=()=>{r.computeLineDistances()};Cr(r,r.geometry,s),s()}return r},dispose:bt}),Bd={type:"line",object:!0,compiler:_a,rule:rl,processors:[tl,ol],lifeOrder:z.THREE};class il extends re{constructor(){super()}}const nl=function(e,t){te(e,t)},He=function(){return Object.assign(oe(),{type:"Material",alphaTest:0,colorWrite:!0,depthTest:!0,depthWrite:!0,name:"",needsUpdate:!1,opacity:1,dithering:!1,shadowSide:null,side:Ts,toneMapped:!0,transparent:!1,visible:!0,blendDst:pr,blendDstAlpha:null,blendEquation:mr,blendEquationAlpha:null,blending:Lt,blendSrc:hr,blendSrcAlpha:null,polygonOffset:!1,polygonOffsetFactor:0,polygonOffsetUnits:0})},al=function(){return Object.assign(He(),{color:"rgb(255, 255, 255)",combine:Ps,aoMapIntensity:1,fog:!0,lightMapIntensity:1,reflectivity:1,refractionRatio:.98,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",wireframeLinewidth:1,map:"",envMap:"",alphaMap:"",aoMap:"",lightMap:"",specularMap:""})},Gs=function(){return Object.assign(He(),{aoMapIntensity:1,bumpScale:1,color:"rgb(255, 255, 255)",displacementScale:1,displacementBias:0,emissive:"rgb(0, 0, 0)",emissiveIntensity:1,envMapIntensity:1,flatShading:!1,lightMapIntensity:1,metalness:0,normalMapType:jr,refractionRatio:.98,roughness:1,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",roughnessMap:"",normalMap:"",metalnessMap:"",map:"",lightMap:"",envMap:"",emissiveMap:"",displacementMap:"",bumpMap:"",alphaMap:"",aoMap:""})},ll=function(){return Object.assign(Gs(),{attenuationColor:"rgb(255, 255, 255)",attenuationDistance:0,clearcoat:0,clearcoatNormalScale:{x:1,y:1},clearcoatRoughness:0,ior:1.5,reflectivity:.5,sheen:0,sheenRoughness:1,sheenColor:"rgb(255, 255, 255)",specularIntensity:0,specularColor:"rgb(255, 255, 255)",thickness:0,transmission:0,clearcoatMap:"",clearcoatNormalMap:"",clearcoatRoughnessMap:"",sheenRoughnessMap:"",sheenColorMap:"",specularIntensityMap:"",specularColorMap:"",thicknessMap:"",transmissionMap:""})},cl=function(){return Object.assign(He(),{aoMapIntensity:1,bumpScale:1,color:"rgb(255, 255, 255)",displacementScale:1,displacementBias:0,emissive:"rgb(0, 0, 0)",emissiveIntensity:1,envMapIntensity:1,flatShading:!1,lightMapIntensity:1,normalMapType:jr,refractionRatio:.98,wireframe:!1,wireframeLinecap:"round",wireframeLinejoin:"round",specular:"rgb(17, 17, 17)",shininess:30,combine:Ps,normalMap:"",map:"",lightMap:"",envMap:"",emissiveMap:"",displacementMap:"",bumpMap:"",alphaMap:"",aoMap:"",specularMap:""})},ul=function(){return Object.assign(He(),{color:"rgb(255, 255, 255)",rotation:0,map:"",alphaMap:"",sizeAttenuation:!0})},Is=function(){return Object.assign(He(),{color:"rgb(255, 255, 255)",linecap:"round",linejoin:"round",linewidth:1})},dl=function(){return Object.assign(Is(),{dashSize:3,gapSize:1,scale:1})},hl=function(){return Object.assign(He(),{map:"",alphaMap:"",color:"rgb(255, 255, 255)",sizeAttenuation:!0,size:1})},pl=function(){return Object.assign(He(),{shader:"",uniforms:{}})},ml=function(){return Object.assign(He(),{color:"rgb(255, 255, 255)",bumpScale:1,displacementScale:1,displacementBias:0,flatShading:!1,fog:!0,normalMapType:jr,normalSale:{x:1,y:1},map:"",alphaMap:"",bumpMap:"",displacementMap:"",matcap:"",normalMap:""})},Te={reg:new RegExp("transparent|sizeAttenuation"),handler({target:e,key:t,value:r}){e[t]=r,e.needsUpdate=!0}},Ur=function({target:e,key:t,value:r,engine:s}){Se.exec(o=>{if(!r)return e[t]=null,e.needsUpdate=!0,!0;const i=s.compilerManager.getObjectBySymbol(r);return i instanceof Ce?(e[t]=i,e.needsUpdate=!0,!0):(o&&console.warn(`this url resource is not instance of Texture: ${t}`,r,i),e[t]=null,!1)})},Re={reg:new RegExp("map$","i"),handler:Ur},$=function({target:e,key:t,value:r}){e[t].copy(new L(r))},je=function(e,t,r){const s={};for(const o of Object.keys(t))o.toLocaleLowerCase().endsWith("map")&&t[o]?(Ur({target:e,key:o,value:t[o],engine:r}),s[o]=!0):e[o]instanceof L&&(e[o]=new L(t[o]),s[o]=!0);return Pe(t,e,s),e.needsUpdate=!0,e},Ae=function(e){e.dispose()};var fl=u({type:"MeshBasicMaterial",config:al,commands:{set:{color:$,$reg:[Re,Te]}},create:function(e,t){return je(new Ze,e,t)},dispose:Ae}),gl=u({type:"MeshPhongMaterial",config:cl,commands:{set:{color:$,emissive:$,specular:$,$reg:[Re,Te]}},create:function(e,t){return je(new zo,e,t)},dispose:Ae}),vl=u({type:"MeshPhysicalMaterial",config:ll,commands:{set:{color:$,emissive:$,specularColor:$,sheenColor:$,attenuationColor:$,$reg:[Re,Te]}},create:function(e,t){return je(new Wo,e,t)},dispose:Ae}),xl=u({type:"MeshStandardMaterial",config:Gs,commands:{set:{color:$,emissive:$,$reg:[Re,Te]}},create:function(e,t){return je(new Uo,e,t)},dispose:Ae}),yl=u({type:"PointsMaterial",config:hl,commands:{set:{color:$,$reg:[Re,Te]}},create:function(e,t){return je(new Qe,e,t)},dispose:Ae});const Pt={vertexShader:`
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,fragmentShader:`
    void main () {
      gl_FragColor = vec4(0.8,0.8,0.8,1.0);
    }`};var bl=u({type:"ShaderMaterial",config:pl,commands:{set:{shader({target:e,value:t}){if(e.vertexShader=Pt.vertexShader,e.fragmentShader=Pt.fragmentShader,t){const r=Hr.getShader(t);r!=null&&r.vertexShader&&(e.vertexShader=r.vertexShader),r!=null&&r.fragmentShader&&(e.fragmentShader=r.fragmentShader),r!=null&&r.uniforms&&(e.uniforms=r.uniforms),r!=null&&r.defines&&(e.defines=r.defines)}e.needsUpdate=!0},$reg:[Te]}},create:function(e,t){const r=new k;if(r.vertexShader=Pt.vertexShader,r.fragmentShader=Pt.fragmentShader,e.shader){const s=Hr.getShader(e.shader);s!=null&&s.vertexShader&&(r.vertexShader=s.vertexShader),s!=null&&s.fragmentShader&&(r.fragmentShader=s.fragmentShader),s!=null&&s.uniforms&&(r.uniforms=s.uniforms),s!=null&&s.defines&&(r.defines=s.defines)}return Pe(e,r,{type:!0,shader:!0}),r.needsUpdate=!0,r},dispose:Ae}),wl=u({type:"SpriteMaterial",config:ul,commands:{set:{color:$,$reg:[Re,Te]}},create:function(e,t){return je(new Ke,e,t)},dispose:Ae}),Ml=u({type:"LineBasicMaterial",config:Is,commands:{set:{color:$,$reg:[Re,Te]}},create:function(e,t){return je(new et,e,t)},dispose:Ae}),Sl=u({type:"LineDashedMaterial",config:dl,commands:{set:{color:$,$reg:[Re,Te]}},create:function(e,t){return je(new dt,e,t)},dispose:Ae}),Cl=u({type:"MeshMatcapMaterial",config:ml,commands:{set:{color:$,matcap:Ur,$reg:[Re,Te]}},create(e,t){return je(new No,e,t)},dispose:Ae}),zd={type:"material",compiler:il,rule:nl,processors:[Ml,Sl,fl,gl,vl,xl,yl,bl,wl,Cl],lifeOrder:z.TWO};class Pl extends xt{constructor(){super()}}const Tl=function(){return Object.assign(yt(),{geometry:"",material:""})};var Al=u({type:"Mesh",config:Tl,commands:be,create(e,t){return it(new Ve,e,{},t)},dispose:bt});const Ol=function(e,t){ie(e,t)};var Wd={type:"mesh",object:!0,compiler:Pl,rule:Ol,processors:[Al],lifeOrder:z.THREE},El=Object.defineProperty,Dl=(e,t,r)=>t in e?El(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,es=(e,t,r)=>(Dl(e,typeof t!="symbol"?t+"":t,r),r);const Rl=function(){return Object.assign(oe(),{name:"",visible:!0,source:"",index:0})},jl=function(){return Object.assign(Rl(),{target:"",mode:"subtract"})},Tt=["position.x","position.y","position.z","rotation.x","rotation.y","rotation.z","scale.x","scale.y","scale.z","parent"],or=new Map;var Ll=u({type:"BooleanModifier",config:jl,commands:{set:{source:()=>{},target:({target:e,config:t,engine:r,compiler:s})=>{Se.exec(o=>{if(t.target){const i=r.compilerManager.getObjectBySymbol(t.target);if(!i)return o&&console.warn(`Boolean modifier processor can not found object by vid: ${t.target}`),!1;e.target=i;const n=s.cacheRenderFun.get(e);if(!n)return console.error(`can not found cache render fun in ${s.MODULE} compiler`),!0;const a=or.get(e);if(a){for(const c of Tt)T.compilerEvent.off(a,`${R.COMPILE}:${c}`,n);T.compilerEvent.off(a.geometry,R.UPDATE,n)}for(const c of Tt)T.compilerEvent.on(i,`${R.COMPILE}:${c}`,n);return T.compilerEvent.on(i.geometry,R.UPDATE,n),or.set(e,i),n(),!0}return!0})},$reg:[{reg:new RegExp(".*"),handler({value:e,key:t,target:r,compiler:s}){r[t]=e;const o=s.cacheRenderFun.get(r);if(!o){console.error(`can not found cache render fun in ${s.MODULE} compiler`);return}o()}}]}},create:function(e,t,r){const s=new oi({mode:e.mode}),o=()=>{s.render(),r.chainRender(s)};return r.cacheRenderFun.set(s,o),Se.exec(i=>{if(e.source){const n=t.compilerManager.getObjectBySymbol(e.source);if(!n)return i&&console.warn(`Boolean modifier processor can not found object by vid: ${e.source}`),!1;for(const a of Tt)T.compilerEvent.on(n,`${R.COMPILE}:${a}`,o);return T.compilerEvent.check(n.geometry)&&T.compilerEvent.on(n.geometry,R.UPDATE,o),s.source=n,r.integrateModifer(s),o(),!0}return!0}),Se.exec(i=>{if(e.target){const n=t.compilerManager.getObjectBySymbol(e.target);if(!n)return i&&console.warn(`Boolean modifier processor can not found object by vid: ${e.target}`),!1;s.target=n;for(const a of Tt)T.compilerEvent.on(n,`${R.COMPILE}:${a}`,o);return T.compilerEvent.on(n.geometry,R.UPDATE,o),or.set(s,n),o(),!0}return!0}),Pe(e,s,{target:!0,source:!0}),s},dispose:function(e,t,r){e.dispose()}});class Bl extends re{constructor(){super(),es(this,"cacheRenderFun",new Map),es(this,"sourceModifiers",new Map)}integrateModifer(t){this.sourceModifiers.has(t.source)||this.sourceModifiers.set(t.source,[]);const r=this.sourceModifiers.get(t.source);r.includes(t)||r.push(t)}chainRender(t){if(!this.sourceModifiers.has(t.source)){console.error(`${this.MODULE} compiler can not found modifier list`,t);return}const r=this.sourceModifiers.get(t.source);r.includes(t)||console.error(`${this.MODULE} compiler: can not found this modifier in source list`,t);const s=r.slice(r.indexOf(t)+1,r.length);for(const o of s)o.render()}}const zl=function(e,t){te(e,t)};var Ud={type:"modifier",compiler:Bl,rule:zl,processors:[Ll],lifeOrder:z.NINE};class Wl extends ge{constructor(){super()}}const Ul=function(){return Object.assign(pe(),{})};var Nl=u({type:"Object3D",config:Ul,commands:B,create(e,t){return le(new Ft,e,{},t)},dispose:q});const Fl=function(e,t){ie(e,t)};var Nd={type:"object3D",object:!0,compiler:Wl,rule:Fl,processors:[Nl],lifeOrder:z.THREE};class Hl extends xt{constructor(){super()}}const Gl=function(){return Object.assign(yt(),{geometry:"",material:""})};var Il=u({type:"Points",config:Gl,commands:be,create(e,t){return it(new tt,e,{},t)},dispose:bt});const kl=function(e,t){ie(e,t)};var Fd={type:"points",object:!0,compiler:Hl,rule:kl,processors:[Il],lifeOrder:z.THREE};class Vl extends ge{constructor(){super()}}function Xl(e){e.setSceneBySymbol=function(t){const r=this.compilerManager.getCompiler(E.SCENE);return r.map.has(t)?this.setScene(r.map.get(t)):console.warn("can not found scene",t),this}}const Yl=function(){return Object.assign(pe(),{vid:Tr("Scene"),background:"",environment:"",fog:{type:"",color:"rgb(150, 150, 150)",near:1,far:200,density:.003}})},ts=function(e,t,r){if(!t){e.background=null;return}if(se(t)){const s=r.compilerManager.getObjectfromModule(E.TEXTURE,t);s?e.background=s:console.warn(`engine can not found this vid texture : '${t}'`)}else e.background=new L(t)},rs=function(e,t,r){if(!t){e.environment=null;return}if(se(t)){const s=r.compilerManager.getObjectfromModule(E.TEXTURE,t);s?e.environment=s:console.warn(`engine can not found this vid texture : '${t}'`)}else console.warn(`scene environment is illeage: ${t}`)};var ql=u({type:"Scene",config:Yl,commands:{add:B.add,set:{...B.set,lookAt(){},fog({target:e,config:t,key:r,value:s}){const o=t.fog;o.type?o.type==="Fog"?!e.fog||!(e.fog instanceof Kt)?e.fog=new Kt(o.color,o.near,o.far):r==="color"?e.fog.color.copy(new L(o.color)):e.fog[r]&&(e.fog[r]=s):o.type==="FogExp2"&&(!e.fog||!(e.fog instanceof Jt)?e.fog=new Jt(o.color,o.density):r==="color"?e.fog.color.copy(new L(o.color)):e.fog[r]&&(e.fog[r]=s)):e.fog=null},background({target:e,value:t,engine:r}){ts(e,t,r)},environment({target:e,value:t,engine:r}){rs(e,t,r)}},delete:B.delete},create(e,t){const r=new Er;if(ts(r,e.background,t),rs(r,e.environment,t),e.fog.type){const s=e.fog;s.type==="Fog"?r.fog=new Kt(s.color,s.near,s.far):s.type==="FogExp2"?r.fog=new Jt(s.color,s.density):console.warn(`scene processor can not support this type fog:'${e.type}'`)}return le(r,e,{lookAt:!0,background:!0,environment:!0,fog:!0},t)},dispose:q});const Zl=[Tr("Scene")],Ql=function(e,t){ie(e,t,r=>se(r)||Zl.includes(r))};var Hd={type:"scene",object:!0,compiler:Vl,rule:Ql,processors:[ql],extend:Xl,lifeOrder:z.THREE+1};class Kl extends xt{constructor(){super()}}const Jl=function(){return Object.assign(yt(),{type:"Sprite",material:"",center:{x:.5,y:.5}})},ss=new Ke({color:"rgb(123, 123, 123)"});var _l=u({type:"Sprite",config:Jl,commands:{add:be.add,set:{lookAt(){},...be.set,material({target:e,engine:t,value:r}){const s=t.compilerManager.getObjectfromModule(E.MATERIAL,r);s&&s instanceof Ke?e.material=s:e.material=ss}},delete:be.add},create(e,t){const r=new Dr,s=t.compilerManager.getObjectfromModule(E.MATERIAL,e.material);return s&&s instanceof Ke?r.material=s:r.material=ss,it(r,e,{geometry:!0,material:!0,lookAt:!0},t)},dispose:bt});const $l=function(e,t){e.key!=="geometry"&&ie(e,t)};var Gd={type:"sprite",object:!0,compiler:Kl,rule:$l,processors:[_l],lifeOrder:z.THREE},ec=Object.defineProperty,tc=(e,t,r)=>t in e?ec(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ks=(e,t,r)=>(tc(e,typeof t!="symbol"?t+"":t,r),r);const zt=class extends re{constructor(){super()}getResource(e,t){const r=this.engine.resourceManager.resourceMap;if(!r.has(e))return console.warn(`engine resourceManager can not found this url: ${e}`),zt.replaceImage;const s=r.get(e);if(Array.isArray(t)){for(const o of t)if(s instanceof o)return s;return console.warn(`this url mapping resource is not a texture image class: ${e}`,s),zt.replaceImage}else return s instanceof t?s:(console.warn(`this url mapping resource is not a texture image class: ${e}`,s),zt.replaceImage)}};let Nr=zt;ks(Nr,"replaceImage",new gt({width:512,height:512}).draw(e=>{e.translate(256,256),e.font="72px",e.fillStyle="white",e.fillText("\u6682\u65E0\u56FE\u7247",0,0)}).getDom());const qt={reg:new RegExp("wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping|flipY"),handler({target:e,key:t,value:r}){e[t]=r,e.needsUpdate=!0}},_e=function({target:e,value:t,engine:r}){Se.exec(s=>(e.image=r.compilerManager.getCompiler(E.TEXTURE).getResource(t,[HTMLImageElement,HTMLVideoElement,HTMLCanvasElement]),e.needsUpdate=!0,e.images!==Nr.replaceImage))},wt=function(){return{vid:"",type:"Texture",name:"",mapping:Io,wrapS:Gr,wrapT:Gr,magFilter:ut,minFilter:ko,anisotropy:1,format:Vo,flipY:!0,offset:{x:0,y:0},repeat:{x:1,y:1},rotation:0,center:{x:0,y:0},matrixAutoUpdate:!0,encoding:Xo,needsUpdate:!1}},rc=function(){return Object.assign(wt(),{url:""})},sc=function(){return Object.assign(wt(),{url:"",minFilter:ut})},oc=function(){return Object.assign(wt(),{cube:{nx:"",ny:"",nz:"",px:"",py:"",pz:""},mapping:Go,flipY:!1})},ic=function(){return Object.assign(wt(),{url:"",needsUpdate:!1})},nc=function(){return Object.assign(wt(),{url:""})};var ac=u({type:"CanvasTexture",config:ic,commands:{set:{url:_e,$reg:[qt]}},create(e,t){const r=new ft(t.compilerManager.getCompiler(E.TEXTURE).getResource(e.url,HTMLCanvasElement));return _e({target:r,value:e.url,engine:t}),Pe(e,r,{type:!0,url:!0}),r.needsUpdate=!0,r},dispose(e){e.dispose()}});const Ge=[HTMLImageElement,HTMLVideoElement,HTMLCanvasElement],Xe=function({target:e,index:t,value:r,engine:s}){e.images[t]=s.compilerManager.getCompiler(E.TEXTURE).getResource(r,Ge),e.needsUpdate=!0};var lc=u({type:"CubeTexture",config:oc,commands:{set:{cube:{px({target:e,value:t,engine:r}){Xe({target:e,value:t,engine:r,index:0})},nx({target:e,value:t,engine:r}){Xe({target:e,value:t,engine:r,index:1})},py({target:e,value:t,engine:r}){Xe({target:e,value:t,engine:r,index:2})},ny({target:e,value:t,engine:r}){Xe({target:e,value:t,engine:r,index:3})},pz({target:e,value:t,engine:r}){Xe({target:e,value:t,engine:r,index:4})},nz({target:e,value:t,engine:r}){Xe({target:e,value:t,engine:r,index:5})}}}},create(e,t){const r=new Ho,s=e.cube,o=t.compilerManager.getCompiler(E.TEXTURE),i=[o.getResource(s.px,Ge),o.getResource(s.nx,Ge),o.getResource(s.py,Ge),o.getResource(s.ny,Ge),o.getResource(s.pz,Ge),o.getResource(s.nz,Ge)];return r.image=i,Pe(e,r,{type:!0,cube:!0}),r.needsUpdate=!0,r},dispose(e){e.dispose()}});class cc extends Ce{constructor(t,r,s,o,i,n,a,c,l,p){super(t,r,s,o,i,n,a,c,l,p)}}var uc=u({type:"ImageTexture",config:rc,commands:{set:{url:_e,$reg:[qt]}},create(e,t){const r=new cc;return e.url&&_e({target:r,value:e.url,engine:t}),Pe(e,r,{type:!0,url:!0}),r.needsUpdate=!0,r},dispose(e){e.dispose()}});class os extends Ce{constructor(t){super(),Object.keys(t).forEach(r=>{this[r]=t[r]}),this.copy(t)}}var dc=u({type:"LoadTexture",config:nc,commands:{set:{url({}){},$reg:[qt]}},create(e,t){let r;const s=t.compilerManager.getCompiler(E.TEXTURE).getResource(e.url,Ce);if(s instanceof Ce)r=new os(s);else{const o=new Ce(s);r=new os(o)}return Pe(e,r,{type:!0,url:!0}),r.needsUpdate=!0,r},dispose(e){e.dispose()}});const hc=function(e,t){te(e,t)};class pc extends Ce{constructor(t,r,s,o,i,n,a,c,l){super(t,r,s,o,i,n,a,c,l),ks(this,"isVideoTexture",!0),this.format=a!==void 0?a:Fo,this.minFilter=n!==void 0?n:ut,this.magFilter=i!==void 0?i:ut,this.generateMipmaps=!1}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image,r="requestVideoFrameCallback"in t;r?this.needsUpdate=!0:r===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}var mc=u({type:"VideoTexture",config:sc,commands:{set:{url:_e,$reg:[qt]}},create(e,t){const r=new pc(document.createElement("video"));return e.url&&_e({target:r,value:e.url,engine:t}),Pe(e,r,{type:!0,url:!0}),r.needsUpdate=!0,r},dispose(e){e.dispose()}});function fc(e){e.generateLoadTextureConfig=function(t){const r=this.compilerManager.getCompiler(E.TEXTURE).getResource(t,Ce);return r instanceof HTMLCanvasElement?null:uo(ho.LOADTEXTURE,{url:t,flipY:r.flipY,format:r.format,mapping:r.mapping,encoding:r.encoding,minFilter:r.minFilter,magFilter:r.magFilter})}}var Id={type:"texture",compiler:Nr,rule:hc,processors:[ac,lc,uc,dc,mc],extend:fc},gc=Object.defineProperty,vc=(e,t,r)=>t in e?gc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Me=(e,t,r)=>(vc(e,typeof t!="symbol"?t+"":t,r),r);class xc extends re{constructor(){super()}compile(t,r){return super.compile(t,r),this}}const yc=function(e,t,r=se){te(e,t,r)},bc=function(){return Object.assign(oe(),{curves:[],autoClose:!1})},ye=class extends As{constructor(e,t,r,s,o,i){super(0,0,1,1,0,Math.PI*2,!1,0),Me(this,"start",new y),Me(this,"end",new y),Me(this,"vertical",0),Me(this,"center",new y),Me(this,"mid",new y);const n=e,a=r,c=o,l=t,p=s,M=i,A=n-a,j=l-p,C=n-c,d=l-M,x=(n*n-a*a+(l*l-p*p))/2,g=(n*n-c*c+(l*l-M*M))/2,S=j*C-A*d,v=-(d*x-j*g)/S,U=-(A*g-C*x)/S,h=(c+n)/2,b=(M+l)/2,D=ye.isLeft(ye.tempVector1.set(n,l),ye.tempVector2.set(c,M),ye.tempVector3.set(v,U)),P=ye.tempVector1.set(v,U).sub(ye.tempVector2.set(h,b)).length()*(D?-1:1);this.start.set(e,t),this.end.set(o,i),this.vertical=P;const N=this.start,K=this.end,W=this.center.copy(this.end).sub(this.start),w=this.mid.set(h,b);W.set(-W.y,W.x).negate().normalize().multiplyScalar(P).add(w),this.aX=W.x,this.aY=W.y;const ce=ye.tempVector1;this.xRadius=ce.copy(K).sub(W).length(),this.yRadius=this.xRadius,this.aStartAngle=ce.copy(N).sub(W).angle(),this.aEndAngle=ce.copy(K).sub(W).angle();const G=ye.tempVector2.set(a,p).sub(w),Q=ye.tempVector3.set(v,U).sub(w);this.aClockwise=!((D?1:-1)*(ye.isSameDirecton(G,Q)?1:-1)<0)}};let nt=ye;Me(nt,"isLeft",function(e,t,r){return(t.x-e.x)*(r.y-e.y)-(t.y-e.y)*(r.x-e.x)>0});Me(nt,"isSameDirecton",function(e,t){const r=Math.sqrt(e.lengthSq()*t.lengthSq());if(r===0)return!1;const s=e.dot(t)/r;return Math.acos(Yo.clamp(s,-1,1))<Math.PI/2});Me(nt,"tempVector1",new y);Me(nt,"tempVector2",new y);Me(nt,"tempVector3",new y);const is={arc:(e,t,r,s,o,i)=>new nt(e,t,r,s,o,i),line:(e,t,r,s)=>new Os(new y(e,t),new y(r,s)),bezier:(e,t,r,s,o,i,n,a)=>new qo(new y(e,t),new y(r,s),new y(o,i),new y(n,a)),quadratic:(e,t,r,s,o,i)=>new Zo(new y(e,t),new y(r,s),new y(o,i))},ir=function(e,t){return t==="start"?{x:e.params[0],y:e.params[1]}:{x:e.params[e.params.length-2],y:e.params[e.params.length-1]}},nr=function(e){return is[e.curve]?is[e.curve](...e.params):(console.warn(`path processor can not support this curve: ${e.curve}`),null)},ar=function(e,t,r){if(r==="start")e.params[0]!==t[0]&&(e.params[0]=t[0]),e.params[1]!==t[1]&&(e.params[1]=t[1]);else{const s=e.params.length-1;e.params[s-1]!==t[0]&&(e.params[s-1]=t[0]),e.params[s]!==t[1]&&(e.params[s]=t[1])}};var wc=u({type:"Path",config:bc,commands:{add:{curves({target:e,config:t,value:r}){const s=nr(r);s&&e.curves.push(s)}},set:{curves({target:e,config:t,path:r,key:s}){let o=Number(r[1]);if(!Number.isInteger(o)){if(Number.isInteger(Number(s)))return;console.warn("path processor: set curves path error:",r);return}const i=nr(t.curves[o]);e.curves[o]=i;const n=ir(t.curves[o],"start"),a=ir(t.curves[o],"end");o-1>=0&&ar(t.curves[o-1],[n.x,n.y],"end"),o+1<=t.curves.length-1&&ar(t.curves[o+1],[a.x,a.y],"start")}},delete:{curves({target:e,config:t,key:r}){const s=Number(r);if(!(e.curves.length-1<s)&&(e.curves.splice(s,1),s<=t.curves.length-1&&s-1>=0)){const o=ir(t.curves[s-1],"end");ar(t.curves[s],[o.x,o.y],"start")}}}},create(e,t){const r=new Cs;if(e.curves.length)for(const s of e.curves){const o=nr(s);o&&r.curves.push(o)}return r.autoClose=e.autoClose,r},dispose(e){e.curves=[]}}),kd={type:"path",compiler:xc,rule:yc,processors:[wc],lifeOrder:z.ZERO};class Mc extends re{constructor(){super()}}const Sc=function(e,t,r=se){te(e,t,r)},Cc=function(){return Object.assign(oe(),{shape:"",holes:[]})},Ie=new WeakMap,lr=function(e,t,r){Ie.has(e)||Ie.set(e,new Set),Ie.get(e).add({target:t,eventFun:r}),T.compilerEvent.on(t,R.UPDATE,r)},ns=function(e,t){if(!Ie.has(e)){console.warn("shape processor found an error can not found cache shape:",e);return}const r=Ie.get(e);for(const s of r.values())if(s.target===t){T.compilerEvent.off(t,R.UPDATE,s.eventFun),r.delete(s);break}};var Pc=u({type:"Shape",config:Cc,commands:{add:{holes({target:e,engine:t,config:r,value:s}){const o=t.compilerManager.getObjectfromModule(E.PATH,s);if(!o){console.warn(`shape processor can not found path: ${s}`);return}e.holes.push(o);const i=r.holes.length-1;lr(e,o,()=>{r.holes[i]=r.holes[i]})}},set:{shape({target:e,engine:t,value:r}){const s=t.compilerManager.getObjectfromModule(E.PATH,r);s?e.curves=s.curves:console.warn(`shape processor can not found path: ${r}`)},holes({target:e,engine:t,path:r,value:s}){const o=Number(r[1]);if(!Number.isInteger(o)){console.warn("shape processor: delete holes error:",r);return}const i=t.compilerManager.getObjectfromModule(E.PATH,s);if(!i){console.warn(`shape processor can not found path: ${s}`);return}e.holes[o]=i}},delete:{holes({target:e,path:t}){const r=Number(t[1]);if(!Number.isInteger(r)){console.warn("shape processor: delete holes error:",t);return}ns(e,e.holes[r]),e.holes.splice(r,1)}}},create(e,t){const r=new bs;if(e.shape){const s=t.compilerManager.getObjectfromModule(E.PATH,e.shape);s?(r.curves=s.curves,lr(r,s,()=>{e.shape=e.shape})):console.warn(`shape processor can not found path: ${e.shape}`)}if(e.holes.length)for(let s=0;s<e.holes.length;s+=1){const o=e.holes[s],i=t.compilerManager.getObjectfromModule(E.PATH,o);i?(r.holes.push(i),lr(r,i,()=>{e.holes[s]=e.holes[s]})):console.warn(`shape processor can not found path: ${o}`)}return r},dispose(e){e.curves=[],e.holes=[];const t=Ie.get(e);if(!e){console.warn("shape processor found an error can not found cache shape:",e);return}t.forEach(r=>{ns(e,r.target)}),Ie.delete(e)}}),Vd={type:"shape",compiler:Mc,rule:Sc,processors:[Pc],lifeOrder:z.ONE},Tc=Object.defineProperty,Ac=(e,t,r)=>t in e?Tc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,lt=(e,t,r)=>(Ac(e,typeof t!="symbol"?t+"":t,r),r);class Oc extends re{constructor(){super()}}const Ec=function(e,t,r=se){te(e,t,r)},Vs=function(){return Object.assign(oe(),{arcLengthDivisions:200})},Dc=function(){return Object.assign(Vs(),{startX:0,startY:0,vertical:5,clockwise:!1,endX:10,endY:10})},Rc=function(){return Object.assign(Vs(),{startX:0,startY:0,endX:10,endY:10})};class jc extends As{constructor(t,r,s,o,i,n){super(0,0,1,1,0,Math.PI*2,!1,0),lt(this,"start",new y),lt(this,"end",new y),lt(this,"vertical",0),lt(this,"center",new y),lt(this,"tempVector",new y),this.start.set(t,r),this.end.set(i,n),this.vertical=s;const a=this.tempVector,c=this.start,l=this.end,p=new y((i+t)/2,(n+r)/2),M=this.center.copy(this.end).sub(this.start);M.set(-M.y,M.x).negate().normalize().multiplyScalar(s).add(p),this.aX=M.x,this.aY=M.y,this.xRadius=a.copy(l).sub(M).length(),this.yRadius=this.xRadius,this.aStartAngle=a.copy(c).sub(M).angle(),this.aEndAngle=a.copy(l).sub(M).angle(),this.aClockwise=o}}const Xs={reg:new RegExp(".*"),handler({config:e,target:t,processor:r,engine:s,compiler:o}){const i=r.create(e,s,o);o.map.set(e.vid,i),o.weakMap.set(i,e.vid),o.weakMap.delete(t),r.dispose(t,s,o)}};var Lc=u({type:"ArcCurve",config:Dc,commands:{add:{},set:{$reg:[Xs]},delete:{}},create(e,t){return new jc(e.startX,e.startY,e.vertical,e.clockwise,e.endX,e.endY)},dispose(){}}),Bc=u({type:"LineCurve",config:Rc,commands:{add:{},set:{$reg:[Xs]},delete:{}},create(e,t){return new Os(new y(e.startX,e.startY),new y(e.endX,e.endY))},dispose(){}}),Xd={type:"curve",compiler:Oc,rule:Ec,processors:[Lc,Bc],lifeOrder:z.ZERO-1},zc=Object.defineProperty,Wc=(e,t,r)=>t in e?zc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,m=(e,t,r)=>(Wc(e,typeof t!="symbol"?t+"":t,r),r);class Uc extends re{constructor(){super()}}const Nc=function(e,t,r=se){te(e,t,r)},Fc=function(){return Object.assign(oe(),{})},Hc=function(){return Object.assign(Fc(),{target:"",shape:!0,boundingBox:!1,geometricOrigin:!1,localAxes:!1})},Fe=()=>new et({color:"rgb(255, 255, 255)"});class as extends ae{constructor(t){super(),m(this,"shape"),m(this,"target"),m(this,"type","CameraHelper"),m(this,"cachaData");const r=new ee,s=[0,0,0,-1,1,-1,0,0,0,-1,1,1,0,0,0,-1,-1,-1,0,0,0,-1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,1,-1,-1,1,1,-1,1,1,-1,-1,1,0,0,0,0,1,1,0,0,0,0,1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0,-1,-1,0,-1,1,0,-1,1,0,1,1,0,-1,1,2,-1,1,0,1,-1,2,1,-1,0,-1,-1,2,-1,-1,0,1,1,2,1,1,2,1,1,2,-1,1,2,-1,1,2,-1,-1,2,-1,-1,2,1,-1,2,1,-1,2,1,1];r.setAttribute("position",new ne(s,3)),r.rotateY(-90*Math.PI/180),r.computeBoundingBox();const o=new Qo(t);o.matrix=new Y,o.matrixAutoUpdate=!0,o.raycast=()=>{},this.add(o),this.shape=o,this.geometry=r,this.material=Fe(),this.target=t,this.matrixAutoUpdate=!1,this.matrix=t.matrix,t instanceof $e?this.cachaData={fov:t.fov,aspect:t.aspect,near:t.near,far:t.far}:t instanceof xs?this.cachaData={left:t.left,right:t.right,top:t.top,bottom:t.bottom,near:t.near,far:t.far}:this.cachaData={},this.onBeforeRender=()=>{let i=!1;const n=this.cachaData;Object.keys(n).forEach(a=>{n[a]!==t[a]&&(n[a]=t[a],i=!0)}),i&&this.shape.update()}}raycast(t,r){const s=this.matrixWorld,o=this.geometry.boundingBox.clone();if(o.applyMatrix4(s),t.ray.intersectsBox(o)){const i=this.target;r.push({distance:t.ray.origin.distanceTo(i.position),object:i,point:i.position})}}dispose(){this.geometry.dispose(),this.material.dispose(),this.shape.dispose()}}class Gc extends ae{constructor(t){super(),m(this,"sphere"),m(this,"target"),m(this,"shape"),m(this,"type","VisDirectionalLightHelper"),m(this,"cacheColor"),m(this,"cacheVector3"),this.geometry=new ee;const r=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new ne(r,3)),this.material=Fe(),this.geometry.boundingSphere;const s=new L().copy(t.color).multiplyScalar(t.intensity),o=new V(20,20);o.dispose();const i=new ae(new we(o),new et({color:s}));i.raycast=()=>{},this.shape=i,this.target=t,this.sphere=new Lr(new f(0,0,0),1),this.cacheColor=t.color.getHex(),this.cacheVector3=new f,this.add(this.shape),this.matrixAutoUpdate=!1,this.matrix=t.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=t.matrixWorld,this.onBeforeRender=()=>{const n=this.target,a=this.shape;n.color.getHex()!==this.cacheColor&&(a.material.color.copy(n.color).multiplyScalar(n.intensity),this.cacheColor=n.color.getHex()),a.lookAt(n.target.position)}}raycast(t,r){const s=this.target,o=s.matrixWorld,i=this.sphere;i.set(this.cacheVector3.set(0,0,0),1),i.applyMatrix4(o),t.ray.intersectsSphere(i)&&r.push({distance:t.ray.origin.distanceTo(s.position),object:s,point:s.position})}dispose(){this.shape.geometry.dispose(),this.shape.material.dispose(),this.geometry.dispose(),this.material.dispose()}}class Ic extends ae{constructor(t){super(),m(this,"sphere"),m(this,"target"),m(this,"shape"),m(this,"type","VisPointLightHelper"),m(this,"cacheColor"),m(this,"cacheDistance"),m(this,"cacheVector3"),this.geometry=new ee;const r=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new ne(r,3)),this.material=Fe(),this.geometry.boundingSphere;const s=new L().copy(t.color).multiplyScalar(t.intensity),o=new Ve(new Ir(t.distance,0),new Ze({color:s,wireframe:!0}));o.raycast=()=>{},o.matrixAutoUpdate=!1,this.shape=o,this.target=t,this.sphere=new Lr(new f(0,0,0),1),this.cacheColor=t.color.getHex(),this.cacheDistance=t.distance,this.cacheVector3=new f,this.add(this.shape),this.matrixAutoUpdate=!1,this.matrix=t.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=t.matrixWorld,this.onBeforeRender=()=>{const i=this.target,n=this.shape;i.distance!==this.cacheDistance&&(n.geometry.dispose(),n.geometry=new Ir(i.distance,0),this.cacheDistance=i.distance),i.color.getHex()!==this.cacheColor&&(n.material.color.copy(i.color).multiplyScalar(i.intensity),this.cacheColor=i.color.getHex())}}raycast(t,r){const s=this.target,o=s.matrixWorld,i=this.sphere;i.set(this.cacheVector3.set(0,0,0),1),i.applyMatrix4(o),t.ray.intersectsSphere(i)&&r.push({distance:t.ray.origin.distanceTo(s.position),object:s,point:s.position})}dispose(){this.shape.geometry.dispose(),this.shape.material.dispose(),this.geometry.dispose(),this.material.dispose()}}class kc extends ae{constructor(t){super(),m(this,"target"),m(this,"type","VisRectAreaLightHelper"),m(this,"cacheBox",new ke),m(this,"cacheVector3",new f),m(this,"cacheColor"),m(this,"cacheIntensity"),this.target=t,this.generateShape();const r=Fe();r.color.copy(t.color).multiplyScalar(t.intensity),this.cacheColor=t.color.getHex(),this.cacheIntensity=t.intensity,this.material=r,this.matrixAutoUpdate=!1,this.matrix=t.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=t.matrixWorld,this.onBeforeRender=()=>{const s=this.target;(s.width!==this.geometry.parameters.width||s.height!==this.geometry.parameters.height)&&this.generateShape(),(s.color.getHex()!==this.cacheColor||this.cacheIntensity!==s.intensity)&&(this.material.color.copy(s.color).multiplyScalar(s.intensity),this.cacheColor=s.color.getHex())}}generateShape(){this.geometry.dispose(),this.geometry=new V(this.target.width,this.target.height,4,4),this.geometry.computeBoundingBox()}raycast(t,r){const s=this.target,o=this.cacheBox;o.copy(this.geometry.boundingBox),o.applyMatrix4(s.matrixWorld),t.ray.intersectBox(o,this.cacheVector3)&&r.push({distance:t.ray.origin.distanceTo(s.position),object:s,point:s.position})}dispose(){this.geometry.dispose(),this.material.dispose()}}class Vc extends ae{constructor(t){super(),m(this,"sphere"),m(this,"target"),m(this,"shape"),m(this,"type","VisSpotLightHelper"),m(this,"cacheVector3"),m(this,"cacheColor"),m(this,"cacheAngle"),m(this,"cacheDistance"),this.geometry=new ee;const r=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new ne(r,3)),this.material=Fe(),this.geometry.boundingSphere;const s=new ee,o=[0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let l=0,p=1,M=32;l<M;l++,p++){const A=l/M*Math.PI*2,j=p/M*Math.PI*2;o.push(Math.cos(A),Math.sin(A),1,Math.cos(j),Math.sin(j),1)}s.setAttribute("position",new ne(o,3));const i=Fe(),n=new ae(s,i);n.material.color.copy(t.color).multiplyScalar(t.intensity);const a=t.distance?t.distance:1e3,c=a*Math.tan(t.angle);n.scale.set(c,c,a),n.raycast=()=>{},this.add(n),this.matrixAutoUpdate=!1,this.matrix=t.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=t.matrixWorld,this.target=t,this.shape=n,this.sphere=new Lr(new f(0,0,0),1),this.cacheColor=t.color.getHex(),this.cacheDistance=t.distance,this.cacheAngle=t.angle,this.cacheVector3=new f,this.onBeforeRender=()=>{const l=this.target,p=this.shape;let M=!1;if(l.distance!==this.cacheDistance&&(this.cacheDistance=l.distance,p.scale.z=l.distance,M=!0),l.angle!==this.cacheAngle&&(this.cacheAngle=l.angle,M=!0),M){const A=l.distance*Math.tan(l.angle);p.scale.set(A,A,l.distance)}l.color.getHex()!==this.cacheColor&&(p.material.color.copy(l.color).multiplyScalar(l.intensity),this.cacheColor=l.color.getHex()),p.lookAt(l.target.position)}}raycast(t,r){const s=this.target,o=s.matrixWorld,i=this.sphere;i.set(this.cacheVector3.set(0,0,0),1),i.applyMatrix4(o),t.ray.intersectsSphere(i)&&r.push({distance:t.ray.origin.distanceTo(s.position),object:s,point:s.position})}dispose(){this.shape.geometry.dispose(),this.shape.material.dispose(),this.geometry.dispose(),this.material.dispose()}}const Ys=class extends tt{constructor(e){super(),m(this,"target"),m(this,"type","GeometricOriginHelper"),this.target=e,this.geometry=new ee().setAttribute("position",new ht(new Float32Array([0,0,0]),3)),this.material=new Qe({map:Ys.colorTexture,transparent:!0,alphaTest:.1,depthFunc:Es,size:10,sizeAttenuation:!1}),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.renderOrder=100,this.raycast=()=>{}}dispose(){}};let qs=Ys;m(qs,"colorTexture",new ft(new gt({width:32,height:32}).draw(e=>{e.beginPath(),e.fillStyle="rgba(0, 0, 0, 0)",e.fillRect(0,0,32,32),e.closePath(),e.beginPath(),e.fillStyle="rgb(255, 163, 0)",e.strokeStyle="black",e.lineWidth=1,e.arc(16,16,15,0,2*Math.PI),e.stroke(),e.fill(),e.closePath()}).get()));class Xc extends ae{constructor(t){const r=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(8*3),o=new ee;o.setIndex(new ht(r,1)),o.setAttribute("position",new ht(s,3)),super(o,new et({color:15662848,toneMapped:!1})),m(this,"target"),m(this,"type","BoundingBoxHelper"),m(this,"cacheBox",new ke),m(this,"compareBox",new ke),this.matrixAutoUpdate=!1,this.raycast=()=>{},this.target=t,this.onBeforeRender=()=>{this.update()}}update(){if(this.cacheBox.setFromObject(this.target),this.cacheBox.isEmpty()||this.cacheBox.equals(this.compareBox))return;this.compareBox.copy(this.cacheBox);const t=this.cacheBox.min,r=this.cacheBox.max,s=this.geometry.attributes.position,o=s.array;o[0]=r.x,o[1]=r.y,o[2]=r.z,o[3]=t.x,o[4]=r.y,o[5]=r.z,o[6]=t.x,o[7]=t.y,o[8]=r.z,o[9]=r.x,o[10]=t.y,o[11]=r.z,o[12]=r.x,o[13]=r.y,o[14]=t.z,o[15]=t.x,o[16]=r.y,o[17]=t.z,o[18]=t.x,o[19]=t.y,o[20]=t.z,o[21]=r.x,o[22]=t.y,o[23]=t.z,s.needsUpdate=!0,this.geometry.computeBoundingSphere()}dispose(){}}class Yc extends ae{constructor(t){let r=5;if(t.geometry){const a=t.geometry;!a.boundingSphere&&a.computeBoundingSphere(),r=a.boundingSphere.radius*.8}const s=[0,0,0,r,0,0,0,0,0,0,r,0,0,0,0,0,0,r],o=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new ee;i.setAttribute("position",new ne(s,3)),i.setAttribute("color",new ne(o,3));const n=new et({vertexColors:!0,toneMapped:!1,depthFunc:Es});super(i,n),m(this,"target"),this.target=t,this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=t.matrix,this.matrixWorld=t.matrixWorld,this.renderOrder=100,this.raycast=()=>{}}dispose(){}}const qc=`

#include <common>

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

  bool isPerspective = isPerspectiveMatrix( projectionMatrix );

  if ( isPerspective ) scale *= - mvPosition.z;

	vec2 alignedPosition = position.xy * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( 0.0 ) * alignedPosition.x - sin( 0.0 ) * alignedPosition.y;
	rotatedPosition.y = sin( 0.0 ) * alignedPosition.x + cos( 0.0 ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

}

`,Zc=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class Qc extends k{constructor(){super(),this.vertexShader=qc,this.fragmentShader=Zc,this.uniforms={color:{value:new L("white")}}}}class Kc extends ae{constructor(t){super(),m(this,"target"),m(this,"type","VisCSS2DPlaneHelper"),m(this,"observer"),this.geometry=new we(new V(1,1)),this.geometry.computeBoundingBox(),this.material=new Qc,this.scale.copy(t.matrixScale),this.position.set(t.position.x,t.position.y,t.position.z),this.target=t;const r=new MutationObserver(()=>{this.scale.copy(t.matrixScale)});r.observe(t.element,{attributeFilter:["style"]}),this.observer=r,this.onBeforeRender=()=>{this.position.set(this.target.position.x,this.target.position.y,this.target.position.z)},this.raycast=()=>{}}dispose(){this.observer.disconnect()}}class Jc extends ae{constructor(t){super(),m(this,"target"),m(this,"type","VisCSS3DPlaneHelper"),m(this,"observer"),this.geometry=new we(new V(t.width,t.height)),this.geometry.computeBoundingBox(),this.material=Fe(),this.matrixAutoUpdate=!1,this.matrix=t.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=t.matrixWorld,this.target=t;const r=new MutationObserver(()=>{this.geometry.dispose(),this.geometry=new we(new V(t.width,t.height)),this.geometry.computeBoundingBox()});r.observe(t.element,{attributeFilter:["style"]}),this.observer=r,this.raycast=()=>{},this.updateMatrixWorld=()=>{}}dispose(){this.observer.disconnect()}}const _c=`
uniform float rotation2D;

#include <common>

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	vec2 alignedPosition = position.xy * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation2D ) * alignedPosition.x - sin( rotation2D ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation2D ) * alignedPosition.x + cos( rotation2D ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

}

`,$c=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class eu extends k{constructor(){super(),this.vertexShader=_c,this.fragmentShader=$c,this.uniforms={color:{value:new L("white")},rotation2D:{value:0}}}}class tu extends ae{constructor(t){super(),m(this,"target"),m(this,"type","VisCSS3DSpriteHelper"),m(this,"observer"),this.geometry=new we(new V(1,1)),this.geometry.computeBoundingBox(),this.material=new eu,this.matrixAutoUpdate=!1,this.matrix=t.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=t.matrixWorld,this.target=t;const r=new MutationObserver(()=>{this.geometry.dispose(),this.geometry=new we(new V(t.width,t.height)),this.geometry.computeBoundingBox()});r.observe(t.element,{attributeFilter:["style"]}),this.observer=r,this.onBeforeRender=()=>{this.material.uniforms.rotation2D.value=this.target.rotation2D},this.raycast=()=>{},this.updateMatrixWorld=()=>{}}dispose(){this.observer.disconnect()}}const Zs=class extends Dr{constructor(e){super(),m(this,"target"),m(this,"type","VisGroupHelper"),this.target=e,this.geometry.computeBoundingBox(),this.material=new Ke({map:Zs.colorTexture}),this.material.depthTest=!1,this.material.depthWrite=!1,this.scale.set(5,5,5);const t=this.updateMatrixWorld.bind(this);this.updateMatrixWorld=r=>{const s=this.position,o=this.target.position;s.x=o.x,s.y=o.y,s.z=o.z,t(r)}}raycast(e,t){const r=this.matrixWorld,s=this.geometry.boundingBox.clone();if(s.applyMatrix4(r),e.ray.intersectsBox(s)){const o=this.target;t.push({distance:e.ray.origin.distanceTo(o.position),object:o,point:o.position})}}dispose(){this.geometry.dispose(),this.material.dispose()}};let Qs=Zs;m(Qs,"colorTexture",new ft(new gt({width:512,height:512}).draw(e=>{e.beginPath(),e.fillStyle="rgba(0, 0, 0, 0)",e.fillRect(0,0,512,512),e.closePath(),e.translate(256,200),e.beginPath(),e.fillStyle="yellow",e.fillRect(-200,0,400,200),e.closePath(),e.beginPath(),e.fillStyle="yellow",e.fillRect(-200,-70,200,70),e.closePath()}).get()));const Ks=class extends tt{constructor(e){super(),m(this,"target"),m(this,"cachaGeometryUUid"),m(this,"type","VisLineHelper"),this.target=e,this.geometry.dispose(),this.geometry.copy(e.geometry),this.cachaGeometryUUid=e.geometry.uuid,this.material=new Qe({color:"rgb(255, 255, 255)",alphaMap:Ks.alphaTexture,transparent:!0,size:5,sizeAttenuation:!1}),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.renderOrder=-1,this.raycast=()=>{},this.onBeforeRender=()=>{const t=this.target;t.geometry.uuid!==this.cachaGeometryUUid&&(this.geometry.dispose(),this.geometry=t.geometry.clone(),this.cachaGeometryUUid=t.geometry.uuid)}}dispose(){this.geometry.dispose(),this.material.dispose()}};let Js=Ks;m(Js,"alphaTexture",new ft(new gt({width:512,height:512,bgColor:"rgb(0, 0, 0)"}).draw(e=>{e.beginPath(),e.fillStyle="rgb(255, 255, 255)",e.arc(256,256,200,0,Math.PI*2),e.fill(),e.closePath()}).getDom()));class ru extends ae{constructor(t){super(),m(this,"target"),m(this,"type","VisMeshHelper"),m(this,"cachaGeometryUUid");const r=1;this.target=t,this.geometry=new we(t.geometry,r),this.cachaGeometryUUid=t.geometry.uuid,this.material=Fe(),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=t.matrix,this.matrixWorld=t.matrixWorld,this.updateMatrixWorld=()=>{},this.raycast=()=>{},this.onBeforeRender=()=>{const s=this.target;s.geometry.uuid!==this.cachaGeometryUUid&&(this.geometry.dispose(),this.geometry=new we(s.geometry,r),this.cachaGeometryUUid=s.geometry.uuid)}}dispose(){this.geometry.dispose(),this.material.dispose()}}const _s=class extends tt{constructor(e){super(),m(this,"target"),m(this,"type","VisPointsHelper"),this.target=e,this.geometry.dispose(),this.geometry.copy(e.geometry),this.material.dispose(),this.material=new Qe({color:"rgb(255, 255, 255)",alphaMap:_s.alphaTexture,transparent:!0});const t=Array.isArray(e.material)?e.material[0]:e.material;t instanceof Qe&&(this.material.size=t.size,this.material.sizeAttenuation=t.sizeAttenuation),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.raycast=()=>{}}dispose(){this.geometry.dispose(),this.material.dispose()}};let $s=_s;m($s,"alphaTexture",new ft(new gt({width:512,height:512,bgColor:"rgb(0, 0, 0)"}).draw(e=>{e.beginPath(),e.strokeStyle="rgb(255, 255, 255)",e.lineWidth=4,e.strokeRect(0,0,512,512),e.closePath()}).get()));const su=`

uniform float rotation;
uniform vec2 center;
uniform bool sizeAttenuation;

#include <common>

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	if (!sizeAttenuation) {
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;
  }

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

}

`,ou=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class iu extends k{constructor(){super(),this.vertexShader=su,this.fragmentShader=ou,this.uniforms={color:{value:new L("white")},center:{value:new y(.5,.5)},rotation:{value:0},sizeAttenuation:{value:!1}}}}class nu extends ae{constructor(t){super(),m(this,"target"),m(this,"type","VisSpriteHelper"),this.geometry=new we(new V(1,1)),this.geometry.computeBoundingBox(),this.material=new iu,this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=t.matrix,this.matrixWorld=t.matrixWorld,this.target=t,this.onBeforeRender=()=>{this.material.uniforms.rotation.value=this.target.material.rotation,this.material.uniforms.sizeAttenuation.value=this.target.material.sizeAttenuation},this.raycast=()=>{}}dispose(){this.geometry.dispose(),this.material.dispose()}}const au=function(e){return e},lu={add:{helper(){}},set:{helper(){}}};class cu extends Rs{constructor(){super(),m(this,"target"),m(this,"shape"),m(this,"boundingBox"),m(this,"geometricOrigin"),m(this,"localAxes"),m(this,"shapeMap",{PointLight:Ic,SpotLight:Vc,DirectionalLight:Gc,RectAreaLight:kc,PerspectiveCamera:as,OrthographicCamera:as,Mesh:ru,Group:Qs,Sprite:nu,Points:$s,Line:Js,CSS3DPlane:Jc,CSS3DSprite:tu,CSS2DPlane:Kc})}generateShape(){if(this.target){if(!this.shapeMap[this.target.type]){console.warn(`object helper can not support ${this.target.type}`);return}const t=new this.shapeMap[this.target.type](this.target);this.shape=t}}generateBoundingBox(){if(this.target){const t=new Xc(this.target);this.boundingBox=t}}generateGeometricOrigin(){if(this.target){const t=new qs(this.target);this.geometricOrigin=t}}generateLocalAxes(){if(this.target){const t=new Yc(this.target);this.localAxes=t}}dispose(t){if(t&&this[t]){this[t].removeFromParent(),this[t].dispose(),this[t]=void 0;return}this.target=void 0,["shape","boundingBox","geometricOrigin","localAxes"].forEach(r=>{this[r]&&(this[r].removeFromParent(),this[r].dispose(),this[r]=void 0)})}}const eo=new WeakMap,Ue=function(e,t,r){Se.exec(s=>{const o=r.getObjectBySymbol(t.target);if(!o||!o.parent)return s&&console.warn(`object helper processor can not fund object parent: ${o}`),!1;o.parent.add(e);const i=()=>{o.parent.add(e)};return T.compilerEvent.on(o,`${R.UPDATE}:parent`,i),eo.set(o,i),!0})},At=function(e,t,r,s){const o=s.getObjectBySymbol(t.target);if(!o){console.warn(`object helper processor can not fund object: ${t.target}`);return}const i=eo.get(o);i&&T.compilerEvent.off(o,`${R.UPDATE}:parent`,i),r.dispose(e)};var uu=u({type:"ObjectHelper",config:Hc,commands:{set:{shape({config:e,target:t,value:r,engine:s}){r&&!t.shape?(t.generateShape(),Ue(t.shape,e,s)):!r&&t.shape&&At("shape",e,t,s)},boundingBox({config:e,target:t,value:r,engine:s}){r&&!t.boundingBox?(t.generateBoundingBox(),Ue(t.boundingBox,e,s)):!r&&t.boundingBox&&At("boundingBox",e,t,s)},geometricOrigin({config:e,target:t,value:r,engine:s}){r&&!t.geometricOrigin?(t.generateGeometricOrigin(),Ue(t.geometricOrigin,e,s)):!r&&t.geometricOrigin&&At("geometricOrigin",e,t,s)},localAxes({config:e,target:t,value:r,engine:s}){r&&!t.localAxes?(t.generateLocalAxes(),Ue(t.localAxes,e,s)):!r&&t.localAxes&&At("localAxes",e,t,s)}}},create(e,t){const r=new cu;if(e.target){const s=t.getObjectBySymbol(e.target),o=au(t.getConfigBySymbol(e.target));o.helper=e.vid,s?(r.target=s,e.shape&&(r.generateShape(),Ue(r.shape,e,t)),e.boundingBox&&(r.generateBoundingBox(),Ue(r.boundingBox,e,t)),e.geometricOrigin&&(r.generateGeometricOrigin(),Ue(r.geometricOrigin,e,t)),e.localAxes&&(r.generateLocalAxes(),Ue(r.localAxes,e,t))):console.warn(`object helper processor can not found target in engine ${e.target}`)}return r},dispose(e){e.dispose()}}),Yd={type:"helper",compiler:Uc,rule:Nc,processors:[uu],lifeOrder:z.FOUR,expand:[{processors:new RegExp("Mesh|Light|Line|Points|Group|Object3D"),command:lu}]};class du extends ge{constructor(){super()}}const hu=function(){return Object.assign(pe(),{children:[]})};var pu=u({type:"Bone",config:hu,commands:B,create(e,t){return le(new Ko,e,{},t)},dispose:q});const mu=function(e,t){ie(e,t)};var qd={type:"bone",object:!0,compiler:du,rule:mu,processors:[pu],lifeOrder:z.THREE-2};class fu extends re{constructor(){super()}}const gu=function(e,t,r=se){te(e,t,r)},vu=function(){return Object.assign(oe(),{bones:[]})};var xu=u({type:"Skeleton",config:vu,commands:{add:{bones({target:e,value:t,engine:r}){const s=r.getObjectBySymbol(t);s?(e.bones.push(s),e.boneInverses=[],e.init()):console.warn(`skeleton processor can not found bone in engine: ${t}`)}},set:{},delete:{bones({target:e,value:t,engine:r}){e.bones.splice(t,1),e.boneInverses=[],e.init()}}},create(e,t){const r=[];e.bones.forEach(o=>{const i=t.getObjectBySymbol(o);i?r.push(i):console.warn(`skeleton processor can not found bone in engine: ${o}`)});const s=new Jo(r);return hs.registerExec(()=>(s.calculateInverses(),!1)),s},dispose(e){e.bones=[],e.boneInverses=[],e.dispose()}}),Zd={type:"skeleton",compiler:fu,rule:gu,processors:[xu],lifeOrder:z.THREE-1};class yu extends xt{constructor(){super()}}const bu=function(e,t){ie(e,t)},wu=function(){return Object.assign(yt(),{skeleton:"",bindMode:"attached"})};var Mu=u({type:"SkinnedMesh",config:wu,commands:{add:{},set:{},delete:{}},create(e,t){const r=it(new _o,e,{skeleton:!0},t);if(e.skeleton){const s=t.getObjectBySymbol(e.skeleton);s||console.warn(`skinnedMesh processor can not found skeleton in engine: ${e.skeleton}`),r.bind(s)}return r},dispose(){}}),Qd={type:"skinnedMesh",object:!0,compiler:yu,rule:bu,processors:[Mu],lifeOrder:z.THREE};class Su extends re{constructor(){super()}}const Cu=function(e,t,r=se){te(e,t,r)},Pu=function(){return Object.assign(oe(),{duration:-1,tracks:[]})},Tu=function(){return Object.assign(oe(),{url:""})};var Au=u({type:"AnimationClip",config:Pu,commands:{add:{},set:{},delete:{}},create(e,t){return{}},dispose(){}}),Ou=u({type:"LoadAnimationClip",config:Tu,create(e,t){if(!e.url)return console.warn("load animation clip processor must have url"),new gr;const r=t.resourceManager.resourceMap;return r.has(e.url)?r.get(e.url):(console.warn(`load animation clip processor can not found url in engine: ${e.url}`),new gr)},dispose(e){}}),Kd={type:"animationClip",compiler:Su,rule:Cu,processors:[Au,Ou],lifeOrder:z.ZERO};const Eu=2200,Du=2201,Ru=2202,Ot=2400,Et=2401,ls=2402,ju=2500,Lu=2501;class Bu{constructor(t,r,s=null,o=r.blendMode){this._mixer=t,this._clip=r,this._localRoot=s,this.blendMode=o;const i=r.tracks,n=i.length,a=new Array(n),c={endingStart:Ot,endingEnd:Ot};for(let l=0;l!==n;++l){const p=i[l].createInterpolant(null);a[l]=p,p.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(n),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Du,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,r){return this.loop=t,this.repetitions=r,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,r,s){if(t.fadeOut(r),this.fadeIn(r),s){const o=this._clip.duration,i=t._clip.duration,n=i/o,a=o/i;t.warp(1,n,r),this.warp(a,1,r)}return this}crossFadeTo(t,r,s){return t.crossFadeFrom(this,r,s)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,r,s){const o=this._mixer,i=o.time,n=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=o._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=i,c[1]=i+s,l[0]=t/n,l[1]=r/n,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,r,s,o){if(!this.enabled){this._updateWeight(t);return}const i=this._startTime;if(i!==null){const c=(t-i)*s;if(c<0||s===0)return;this._startTime=null,r=s*c}r*=this._updateTimeScale(t);const n=this._updateTime(r),a=this._updateWeight(t);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Lu:for(let p=0,M=c.length;p!==M;++p)c[p].evaluate(n),l[p].accumulateAdditive(a);break;case ju:default:for(let p=0,M=c.length;p!==M;++p)c[p].evaluate(n),l[p].accumulate(o,a)}}}_updateWeight(t){let r=0;if(this.enabled){r=this.weight;const s=this._weightInterpolant;if(s!==null){const o=s.evaluate(t)[0];r*=o,t>s.parameterPositions[1]&&(this.stopFading(),o===0&&(this.enabled=!1))}}return this._effectiveWeight=r,r}_updateTimeScale(t){let r=0;if(!this.paused){r=this.timeScale;const s=this._timeScaleInterpolant;s!==null&&(r*=s.evaluate(t)[0],t>s.parameterPositions[1]&&(this.stopWarping(),r===0?this.paused=!0:this.timeScale=r))}return this._effectiveTimeScale=r,r}_updateTime(t){const r=this._clip.duration,s=this.loop;let o=this.time+t,i=this._loopCount;const n=s===Ru;if(t===0)return i===-1?o:n&&(i&1)===1?r-o:o;if(s===Eu){i===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(o>=r)o=r;else if(o<0)o=0;else{this.time=o;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=o,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(i===-1&&(t>=0?(i=0,this._setEndings(!0,this.repetitions===0,n)):this._setEndings(this.repetitions===0,!0,n)),o>=r||o<0){const a=Math.floor(o/r);o-=r*a,i+=Math.abs(a);const c=this.repetitions-i;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,o=t>0?r:0,this.time=o,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,n)}else this._setEndings(!1,!1,n);this._loopCount=i,this.time=o,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=o;if(n&&(i&1)===1)return r-o}return o}_setEndings(t,r,s){const o=this._interpolantSettings;s?(o.endingStart=Et,o.endingEnd=Et):(t?o.endingStart=this.zeroSlopeAtStart?Et:Ot:o.endingStart=ls,r?o.endingEnd=this.zeroSlopeAtEnd?Et:Ot:o.endingEnd=ls)}_scheduleFading(t,r,s){const o=this._mixer,i=o.time;let n=this._weightInterpolant;n===null&&(n=o._lendControlInterpolant(),this._weightInterpolant=n);const a=n.parameterPositions,c=n.sampleValues;return a[0]=i,c[0]=r,a[1]=i+t,c[1]=s,this}}class zu extends re{constructor(){super()}updateAction(t,r){const s=this.map.get(t);if(!s){console.warn(`Animation action compiler update action can not found oldAction by:${t}`);return}this.map.delete(t),this.weakMap.delete(s),T.compilerEvent.dispose(s),this.map.set(t,r),this.weakMap.set(r,t),T.compilerEvent.create(r),this.cacheCompile=void 0}}const Wu=function(e,t,r=se){te(e,t,r)},Uu=function(){return Object.assign(oe(),{mixer:"",clip:"",clampWhenFinished:!0,enabled:!0,loop:$o,paused:!1,repetitions:1/0,timeScale:1,weight:1,zeroSlopeAtEnd:!0,zeroSlopeAtStart:!0})},Nu=new Ft,Dt=()=>new Bu(new vs(Nu),new gr("empty",1,[]));var Fu=u({type:"AnimationAction",config:Uu,commands:{set:{clip({target:e,config:t,value:r,engine:s,compiler:o}){let i=e.getMixer();if(i.uncacheAction(e.getClip()),i=s.getObjectBySymbol(t.mixer),!i){console.warn(`animation action processor can not found animation mixer in engine: ${t.mixer}`);return}const n=s.getObjectBySymbol(r);n||console.warn(`animation action processor can not found animation clip in engine: ${r}`);const a=i.clipAction(n);a.play(),o.updateAction(t.vid,a)}}},create(e,t){if(!e.mixer)return console.warn("animation action processor must have mixer"),Dt();if(!e.clip)return Dt();const r=t.getObjectBySymbol(e.mixer);if(!r)return console.warn(`animation action processor can not found animation mixer in engine: ${e.mixer}`),Dt();const s=t.getObjectBySymbol(e.clip);if(!s)return console.warn(`animation action processor can not found animation clip in engine: ${e.clip}`),Dt();const o=r.clipAction(s);return Pe(e,o,{clip:!0,mixer:!0}),o.play(),o},dispose(e){const t=e.getMixer();t.uncacheAction(e.getClip()),t.uncacheClip(e.getClip())}}),Jd={type:"animationAction",compiler:zu,rule:Wu,processors:[Fu],lifeOrder:z.NINE+1},Hu=Object.defineProperty,Gu=(e,t,r)=>t in e?Hu(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ne=(e,t,r)=>(Gu(e,typeof t!="symbol"?t+"":t,r),r);class to extends Rs{}class Iu extends to{constructor(t,r,s="world",o,i){super(),Ne(this,"target",{object:{},key:""}),Ne(this,"reference",new Ft),Ne(this,"offset",{position:{direction:"+",axes:"y"},operate:"+",value:0}),Ne(this,"cacheBox",new ke),Ne(this,"_space","world"),this._space=s,this.setTarget(t,r),o&&this.setReference(o),i&&(this.offset=i)}get space(){return this._space}set space(t){this._space=t,this.updateBox()}setTarget(t,r){const s=vr(t,r);this.target={object:s.reference,key:s.key}}updateBox(){const t=this.reference;this.cacheBox.setFromObject(t),this.space==="local"&&this.cacheBox.applyMatrix4(t.matrixWorld.invert())}setReference(t){this.reference=t,this.updateBox()}constrain(){this.updateBox();const t=this.offset,r=this.cacheBox;this.target.object[this.target.key]=js(t.operate,r[t.position.direction==="+"?"max":"min"][t.position.axes],t.value)}}class ku extends to{constructor(t,r,s,o,i){super(),Ne(this,"target",{object:{},key:""}),Ne(this,"reference",{object:{},key:""}),Ne(this,"offset",null),t&&r&&this.setTarget(t,r),s&&o&&this.setReference(s,o),this.offset=i}setTarget(t,r){const s=vr(t,r);this.target={object:s.reference,key:s.key}}setReference(t,r){const s=vr(t,r);this.reference={object:s.reference,key:s.key}}constrain(){this.offset?this.target.object[this.target.key]=js(this.offset.operate,this.reference.object[this.reference.key],this.offset.value):this.target.object[this.target.key]=this.reference.object[this.reference.key]}}class Vu extends re{constructor(){super()}}const Xu=function(e,t,r=se){te(e,t,r)},ro=function(){return Object.assign(oe(),{target:""})},Yu=function(){return Object.assign(ro(),{target:"",targetAttr:"",ref:"",refAttr:"",offset:null})},qu=function(){return Object.assign(ro(),{targetAttr:"",ref:"",space:"world",offset:{position:{direction:"+",axes:"y"},operate:"+",value:0}})},so={reg:new RegExp(".*"),handler(e){e.processor.set(e),e.target.constrain()}},Pr=new WeakMap,cr=function(e,t,r){e.constrain();const s=r.getObjectBySymbol(t.ref);if(s){const o=()=>{e.constrain()};Pr.set(e,{object:t.ref,attr:t.refAttr,event:o}),T.compilerEvent.on(s,`${R.COMPILE}:${t.refAttr}`,o)}},ur=function(e,t){const r=Pr.get(e);!r||(T.compilerEvent.off(t.getObjectBySymbol(r.object),`${R.COMPILE}:${r.attr}`,r.event),Pr.delete(e))};var Zu=u({type:"NumberConstraintor",config:Yu,commands:{set:{target({target:e,config:t,engine:r}){t.target&&t.targetAttr&&(e.setTarget(r.getConfigBySymbol(t.target),t.targetAttr),e.constrain())},targetAttr({target:e,config:t,engine:r}){t.target&&t.targetAttr&&(e.setTarget(r.getConfigBySymbol(t.target),t.targetAttr),e.constrain())},ref({target:e,config:t,engine:r}){t.ref&&t.refAttr&&(ur(e,r),e.setReference(r.getConfigBySymbol(t.ref),t.refAttr),cr(e,t,r))},refAttr({target:e,config:t,engine:r}){t.ref&&t.refAttr&&(ur(e,r),e.setReference(r.getConfigBySymbol(t.ref),t.refAttr),cr(e,t,r))},$reg:[so]}},create(e,t){const r=new ku(t.getConfigBySymbol(e.target),e.targetAttr,t.getConfigBySymbol(e.ref),e.refAttr,e.offset?{...e.offset}:null);return cr(r,e,t),r},dispose(e,t){ur(e,t)}});const oo=new WeakMap,io=["geometry","position.x","position.y","position.z","rotation.x","rotation.y","rotation.z","scale.x","scale.y","scale.z"],cs=function(e,t){const r=()=>{e.constrain()};oo.set(e,r),io.forEach(s=>{T.compilerEvent.on(t,`${R.COMPILE}${s}`,r)}),t.geometry&&T.compilerEvent.on(t.geometry,R.UPDATE,r)},us=function(e){const t=e.reference,r=oo.get(e);r&&(io.forEach(s=>{T.compilerEvent.off(t,`${R.COMPILE}${s}`,r)}),t.geometry&&T.compilerEvent.off(t.geometry,R.UPDATE,r))};var Qu=u({type:"BoundingBoxConstraintor",config:qu,commands:{set:{target({target:e,config:t,engine:r}){t.target&&t.targetAttr&&(e.setTarget(r.getConfigBySymbol(t.target),t.targetAttr),e.constrain())},targetAttr({target:e,config:t,engine:r}){t.target&&t.targetAttr&&(e.setTarget(r.getConfigBySymbol(t.target),t.targetAttr),e.constrain())},ref({target:e,config:t,engine:r,value:s}){if(us(e),!s)return;const o=r.getObjectBySymbol(t.ref);if(!o){console.warn(`BoundingBox constraintor processor: can not found object: ${t.ref}`);return}e.setReference(o),e.constrain(),cs(e,o)},$reg:[so]}},create(e,t){const r=t.getObjectBySymbol(e.ref),s=new Iu(t.getConfigBySymbol(e.target),e.targetAttr,e.space,r,po.clone(e.offset));return r&&(s.constrain(),cs(s,r)),s},dispose(e){us(e)}}),_d={type:"constraintor",compiler:Vu,rule:Xu,processors:[Zu,Qu],lifeOrder:z.NINE};class Zt extends Ve{constructor(t,r={}){super(t),this.isReflector=!0,this.type="Reflector",this.camera=new $e;const s=this,o=r.color!==void 0?new L(r.color):new L(8355711),i=r.textureWidth||512,n=r.textureHeight||512,a=r.clipBias||0,c=r.shader||Zt.ReflectorShader,l=r.multisample!==void 0?r.multisample:4,p=new Or,M=new f,A=new f,j=new f,C=new Y,d=new f(0,0,-1),x=new Wt,g=new f,S=new f,v=new Wt,U=new Y,h=this.camera,b=new he(i,n,{samples:l}),D=new k({uniforms:de.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});D.uniforms.tDiffuse.value=b.texture,D.uniforms.color.value=o,D.uniforms.textureMatrix.value=U,this.material=D,this.onBeforeRender=function(P,N,K){if(A.setFromMatrixPosition(s.matrixWorld),j.setFromMatrixPosition(K.matrixWorld),C.extractRotation(s.matrixWorld),M.set(0,0,1),M.applyMatrix4(C),g.subVectors(A,j),g.dot(M)>0)return;g.reflect(M).negate(),g.add(A),C.extractRotation(K.matrixWorld),d.set(0,0,-1),d.applyMatrix4(C),d.add(j),S.subVectors(A,d),S.reflect(M).negate(),S.add(A),h.position.copy(g),h.up.set(0,1,0),h.up.applyMatrix4(C),h.up.reflect(M),h.lookAt(S),h.far=K.far,h.updateMatrixWorld(),h.projectionMatrix.copy(K.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(h.projectionMatrix),U.multiply(h.matrixWorldInverse),U.multiply(s.matrixWorld),p.setFromNormalAndCoplanarPoint(M,A),p.applyMatrix4(h.matrixWorldInverse),x.set(p.normal.x,p.normal.y,p.normal.z,p.constant);const W=h.projectionMatrix;v.x=(Math.sign(x.x)+W.elements[8])/W.elements[0],v.y=(Math.sign(x.y)+W.elements[9])/W.elements[5],v.z=-1,v.w=(1+W.elements[10])/W.elements[14],x.multiplyScalar(2/x.dot(v)),W.elements[2]=x.x,W.elements[6]=x.y,W.elements[10]=x.z+1-a,W.elements[14]=x.w,b.texture.encoding=P.outputEncoding,s.visible=!1;const w=P.getRenderTarget(),ce=P.xr.enabled,G=P.shadowMap.autoUpdate;P.xr.enabled=!1,P.shadowMap.autoUpdate=!1,P.setRenderTarget(b),P.state.buffers.depth.setMask(!0),P.autoClear===!1&&P.clear(),P.render(N,h),P.xr.enabled=ce,P.shadowMap.autoUpdate=G,P.setRenderTarget(w);const Q=K.viewport;Q!==void 0&&P.state.viewport(Q),s.visible=!0},this.getRenderTarget=function(){return b},this.dispose=function(){b.dispose(),s.material.dispose()}}}Zt.ReflectorShader={uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

			#include <encodings_fragment>

		}`};class Ku extends ge{constructor(){super()}}const Ju=function(e,t,r=se){ie(e,t,r)},_u=function(){return Object.assign(pe(),{geometry:"",color:"rgb(127, 127, 127)",textureWidth:0,textureHeight:0,clipBias:0,multisample:4})},ds=function(e,t,r){e.getRenderTarget().setSize(t.textureHeight||r.dom.offsetWidth*window.devicePixelRatio,t.textureWidth||r.dom.offsetHeight*window.devicePixelRatio)};var $u=u({type:"Reflector",config:_u,commands:{add:B.add,set:{...B.set,textureHeight({target:e,config:t,engine:r}){ds(e,t,r)},textureWidth({target:e,config:t,engine:r}){ds(e,t,r)},geometry(e){e.target.geometry=e.engine.getObjectBySymbol(e.value)}},delete:B.delete},create(e,t){const r=new Zt(t.getObjectBySymbol(e.geometry),{color:e.color,clipBias:e.clipBias,textureHeight:e.textureHeight||t.dom.offsetWidth*window.devicePixelRatio,textureWidth:e.textureWidth||t.dom.offsetHeight*window.devicePixelRatio,multisample:e.multisample});return le(r,e,{geometry:!0,clipBias:!0,color:!0},t)},dispose(e){e.geometry=void 0,e.dispose(),q(e)}}),$d={type:"reflector",object:!0,compiler:Ku,rule:Ju,processors:[$u],lifeOrder:z.THREE};class ed extends Ve{constructor(t,r={}){super(t),this.isWater=!0;const s=this,o=r.textureWidth!==void 0?r.textureWidth:512,i=r.textureHeight!==void 0?r.textureHeight:512,n=r.clipBias!==void 0?r.clipBias:0,a=r.alpha!==void 0?r.alpha:1,c=r.time!==void 0?r.time:0,l=r.waterNormals!==void 0?r.waterNormals:null,p=r.sunDirection!==void 0?r.sunDirection:new f(.70707,.70707,0),M=new L(r.sunColor!==void 0?r.sunColor:16777215),A=new L(r.waterColor!==void 0?r.waterColor:8355711),j=r.eye!==void 0?r.eye:new f(0,0,0),C=r.distortionScale!==void 0?r.distortionScale:20,d=r.side!==void 0?r.side:Ts,x=r.fog!==void 0?r.fog:!1,g=new Or,S=new f,v=new f,U=new f,h=new Y,b=new f(0,0,-1),D=new Wt,P=new f,N=new f,K=new Wt,W=new Y,w=new $e,ce=new he(o,i),G={uniforms:de.merge([kr.fog,kr.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new Y},sunColor:{value:new L(8355711)},sunDirection:{value:new f(.70707,.70707,0)},eye:{value:new f},waterColor:{value:new L(5592405)}}]),vertexShader:`
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
					#include <fog_fragment>
				}`},Q=new k({fragmentShader:G.fragmentShader,vertexShader:G.vertexShader,uniforms:de.clone(G.uniforms),lights:!0,side:d,fog:x});Q.uniforms.mirrorSampler.value=ce.texture,Q.uniforms.textureMatrix.value=W,Q.uniforms.alpha.value=a,Q.uniforms.time.value=c,Q.uniforms.normalSampler.value=l,Q.uniforms.sunColor.value=M,Q.uniforms.waterColor.value=A,Q.uniforms.sunDirection.value=p,Q.uniforms.distortionScale.value=C,Q.uniforms.eye.value=j,s.material=Q,s.onBeforeRender=function(J,Qt,Le){if(v.setFromMatrixPosition(s.matrixWorld),U.setFromMatrixPosition(Le.matrixWorld),h.extractRotation(s.matrixWorld),S.set(0,0,1),S.applyMatrix4(h),P.subVectors(v,U),P.dot(S)>0)return;P.reflect(S).negate(),P.add(v),h.extractRotation(Le.matrixWorld),b.set(0,0,-1),b.applyMatrix4(h),b.add(U),N.subVectors(v,b),N.reflect(S).negate(),N.add(v),w.position.copy(P),w.up.set(0,1,0),w.up.applyMatrix4(h),w.up.reflect(S),w.lookAt(N),w.far=Le.far,w.updateMatrixWorld(),w.projectionMatrix.copy(Le.projectionMatrix),W.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),W.multiply(w.projectionMatrix),W.multiply(w.matrixWorldInverse),g.setFromNormalAndCoplanarPoint(S,v),g.applyMatrix4(w.matrixWorldInverse),D.set(g.normal.x,g.normal.y,g.normal.z,g.constant);const me=w.projectionMatrix;K.x=(Math.sign(D.x)+me.elements[8])/me.elements[0],K.y=(Math.sign(D.y)+me.elements[9])/me.elements[5],K.z=-1,K.w=(1+me.elements[10])/me.elements[14],D.multiplyScalar(2/D.dot(K)),me.elements[2]=D.x,me.elements[6]=D.y,me.elements[10]=D.z+1-n,me.elements[14]=D.w,j.setFromMatrixPosition(Le.matrixWorld);const no=J.getRenderTarget(),ao=J.xr.enabled,lo=J.shadowMap.autoUpdate;s.visible=!1,J.xr.enabled=!1,J.shadowMap.autoUpdate=!1,J.setRenderTarget(ce),J.state.buffers.depth.setMask(!0),J.autoClear===!1&&J.clear(),J.render(Qt,w),s.visible=!0,J.xr.enabled=ao,J.shadowMap.autoUpdate=lo,J.setRenderTarget(no);const Fr=Le.viewport;Fr!==void 0&&J.state.viewport(Fr)}}}class td extends ge{constructor(){super()}}const rd=function(e,t,r=se){ie(e,t,r)},sd=function(){return Object.assign(pe(),{geometry:"",textureWidth:512,textureHeight:512,waterNormals:"",waterColor:"rgb(127, 127, 127)",sunColor:"rgb(255, 255, 255)",sunDirection:{x:.70707,y:.70707,z:0},size:1,alpha:1,time:0,distortionScale:20,eye:{x:0,y:0,z:0},fog:!1})};new L;var od=u({type:"DeepWater",config:sd,commands:{set:{geometry({value:e,target:t,engine:r}){const s=r.getObjectfromModule(E.GEOMETRY,e);if(!s){console.warn(`DeepWater processor: can not found geometry with:${e}`);return}t.geometry=s},waterNormals({value:e,target:t,engine:r}){const s=r.getObjectfromModule(E.TEXTURE,e);if(!s){console.warn(`DeepWater processor: can not found texture with:${e}`);return}t.material.uniforms.normalSampler.value=s},time(e){e.target.material.uniforms.time.value=e.value},size(e){e.target.material.uniforms.size.value=e.value},alpha(e){e.target.material.uniforms.alpha.value=e.value},distortionScale(e){e.target.material.uniforms.distortionScale.value=e.value},waterColor(e){e.target.material.uniforms.waterColor.value.setStyle(e.value)},sunColor(e){e.target.material.uniforms.waterColor.value.setStyle(e.value)},sunDirection(e){e.target.material.uniforms.sunDirection.value[e.key]=e.value},eye(e){e.target.material.uniforms.eye.value[e.key]=e.value}}},create(e,t){const r=new ed(t.getObjectfromModule(E.GEOMETRY,e.geometry),{textureWidth:e.textureWidth||512,textureHeight:e.textureHeight||512,waterNormals:t.getObjectfromModule(E.TEXTURE,e.waterNormals),waterColor:e.waterColor,sunColor:e.sunColor,sunDirection:new f(e.sunDirection.x,e.sunDirection.y,e.sunDirection.z),alpha:e.alpha,time:e.time,distortionScale:e.distortionScale,eye:new f(e.eye.x,e.eye.y,e.eye.z),fog:e.fog});return le(r,e,{geometry:!0,textureWidth:!0,textureHeight:!0,waterNormals:!0,waterColor:!0,sunColor:!0,sunDirection:!0,alpha:!0,time:!0,distortionScale:!0,eye:!0,fog:!0},t)},dispose(e){e.onBeforeRender=()=>{},e.material.dispose(),e.geometry=null,q(e)}}),eh={type:"water",object:!0,compiler:td,rule:rd,processors:[od],lifeOrder:z.THREE},id=Object.defineProperty,nd=(e,t,r)=>t in e?id(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Rt=(e,t,r)=>(nd(e,typeof t!="symbol"?t+"":t,r),r);class ad extends ge{constructor(){super()}}const ld=function(e,t,r=se){ie(e,t,r)},cd=function(){return Object.assign(pe(),{range:{top:100,bottom:-100,left:-100,right:100,front:100,back:-100},amount:200,size:1,alphaMap:"",opacity:1,flicker:!0,time:0,floatRange:5,refColor:"rgb(255, 255, 255)",colorRange:.5})},ud=`
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
`,dd=`
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
`;class hd extends k{constructor(t){super(),this.uniforms={flicker:{value:t.flicker||!1},time:{value:t.time||0},alphaMap:{value:t.alphaMap||null},size:{value:t.size||1},opacity:{value:t.opacity||1},floatRange:{value:t.floatRange||5},useAlphaMap:{value:t.useAlphaMap||!1}},this.vertexShader=ud,this.fragmentShader=dd,this.vertexColors=!0,this.blending=gs,this.transparent=!0}}class pd extends tt{constructor(t){super(),Rt(this,"range",{top:100,bottom:-100,left:-100,right:100,front:100,back:-100}),Rt(this,"amount",200),Rt(this,"refColor",new L(1,1,1)),Rt(this,"colorRange",1),this.raycast=()=>{},Object.assign(this.range,t.range),this.refColor.setHex(t.refColor.getHex()),this.colorRange=t.colorRange,this.amount=t.amount,this.resetGeometry(),this.material=new hd({size:t.size||1,alphaMap:t.alphaMap||null,opacity:t.opacity||1,flicker:t.flicker,floatRange:t.floatRange,useAlphaMap:!!t.alphaMap})}getRandomNum(t,r){return Math.floor(Math.random()*(r-t+1))+t}getRandomColor(t){const r=this.refColor,s=this.colorRange;return this.getRandomNum(r[t]-r[t]*s,(1-r[t])*s+r[t])}updateGeometry(){const t=this.range,r=this.geometry,s=this.amount,o=r.getAttribute("position"),i=r.getAttribute("color");for(let n=0;n<s;n+=1)o.setXYZ(n,this.getRandomNum(t.left,t.right),this.getRandomNum(t.bottom,t.top),this.getRandomNum(t.back,t.front)),i.setXYZ(n,this.getRandomColor("r"),this.getRandomColor("g"),this.getRandomColor("b"));o.needsUpdate=!0,i.needsUpdate=!0}resetGeometry(){const t=this.range,r=this.geometry,s=this.amount,o=new Array(s*3),i=new Array(s*3);for(let n=0;n<s*3;n+=3)o[n]=this.getRandomNum(t.left,t.right),o[n+1]=this.getRandomNum(t.bottom,t.top),o[n+2]=this.getRandomNum(t.back,t.front),i[n]=this.getRandomColor("r"),i[n+1]=this.getRandomColor("g"),i[n+2]=this.getRandomColor("b");r.setAttribute("position",new ht(new Float32Array(o),3)),r.setAttribute("color",new ht(new Float32Array(i),3))}dispose(){this.geometry.dispose(),this.material.dispose(),this.removeFromParent()}}var md=u({type:"FloatParticle",config:cd,commands:{set:{range(e){Object.assign(e.target.range,e.config.range),e.target.updateGeometry()},amount(e){e.target.amount=e.value,e.target.resetGeometry()},time(e){e.target.material.uniforms.time.value=e.value},flicker(e){e.target.material.uniforms.flicker.value=e.value},size(e){e.target.material.uniforms.size.value=e.value},opacity(e){e.target.material.uniforms.opacity.value=e.value},floatRange(e){e.target.material.uniforms.floatRange.value=e.value},colorRange(e){e.target.colorRange=e.value,e.target.updateGeometry()},refColor(e){e.target.refColor.setStyle(e.value),e.target.updateGeometry()},alphaMap(e){const t=e.engine.getObjectfromModule(E.TEXTURE,e.value)||null;e.target.material.uniforms.alphaMap.value=t,e.target.material.uniforms.useAlphaMap.value=!!t}}},create(e,t){const r=new pd({range:{...e.range},amount:e.amount,size:e.size,opacity:e.opacity,alphaMap:t.getObjectfromModule(E.TEXTURE,e.alphaMap),flicker:e.flicker,floatRange:e.floatRange,refColor:new L(e.refColor),colorRange:e.colorRange});return le(r,e,{range:!0,amount:!0,size:!0,alphaMap:!0,opacity:!0,flicker:!0,floatRange:!0,refColor:!0,colorRange:!0},t)},dispose(e){e.dispose()}}),th={type:"particle",object:!0,compiler:ad,rule:ld,processors:[md],lifeOrder:z.THREE};export{Kd as A,Jd as B,_d as C,$d as D,eh as E,th as F,Ad as a,Od as b,Pd as c,Ed as d,Dd as e,Rd as f,Cd as g,jd as h,Td as i,Ld as j,Bd as k,zd as l,Wd as m,Ud as n,Nd as o,Fd as p,Hd as q,Gd as r,Id as s,kd as t,Vd as u,Xd as v,Yd as w,qd as x,Zd as y,Qd as z};
