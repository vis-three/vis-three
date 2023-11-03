import{t as I,a as U,b as L}from"./index.5fd0e639.js";import{$ as m,k as f,l as v,bC as $,w as k,h as Y,O as Z,o as w,b2 as g,ba as u,X as F,aB as C,q as x,M as q,bD as E,a9 as J,aA as X,b as A,an as K,Z as H,bE as Q,bv as W,i as D,a_ as ee,aZ as te,V as ie,S as M,Y as se}from"./three.837c9bb0.js";import{C as j}from"./vis-three.convenient.es.9947652a.js";var re=Object.defineProperty,oe=(t,e,i)=>e in t?re(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,s=(t,e,i)=>(oe(t,typeof e!="symbol"?e+"":e,i),i);const y=()=>new F({color:"rgb(255, 255, 255)"});class O extends m{constructor(e){super(),s(this,"shape"),s(this,"target"),s(this,"type","CameraHelper"),s(this,"cachaData");const i=new f,r=[0,0,0,-1,1,-1,0,0,0,-1,1,1,0,0,0,-1,-1,-1,0,0,0,-1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,1,-1,-1,1,1,-1,1,1,-1,-1,1,0,0,0,0,1,1,0,0,0,0,1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0,-1,-1,0,-1,1,0,-1,1,0,1,1,0,-1,1,2,-1,1,0,1,-1,2,1,-1,0,-1,-1,2,-1,-1,0,1,1,2,1,1,2,1,1,2,-1,1,2,-1,1,2,-1,-1,2,-1,-1,2,1,-1,2,1,-1,2,1,1];i.setAttribute("position",new v(r,3)),i.rotateY(-90*Math.PI/180),i.computeBoundingBox();const o=new $(e);o.matrix=new k,o.matrixAutoUpdate=!0,o.raycast=()=>{},this.add(o),this.shape=o,this.geometry=i,this.material=y(),this.target=e,this.matrixAutoUpdate=!1,this.matrix=e.matrix,e instanceof Y?this.cachaData={fov:e.fov,aspect:e.aspect,near:e.near,far:e.far}:e instanceof Z?this.cachaData={left:e.left,right:e.right,top:e.top,bottom:e.bottom,near:e.near,far:e.far}:this.cachaData={},this.onBeforeRender=()=>{let a=!1;const h=this.cachaData;Object.keys(h).forEach(d=>{h[d]!==e[d]&&(h[d]=e[d],a=!0)}),a&&this.shape.update()}}raycast(e,i){const r=this.matrixWorld,o=this.geometry.boundingBox.clone();if(o.applyMatrix4(r),e.ray.intersectsBox(o)){const a=this.target;i.push({distance:e.ray.origin.distanceTo(a.position),object:a,point:a.position})}}}class ae extends m{constructor(e){super(),s(this,"sphere"),s(this,"target"),s(this,"shape"),s(this,"type","VisDirectionalLightHelper"),s(this,"cacheColor"),s(this,"cacheVector3"),this.geometry=new f;const i=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new v(i,3)),this.material=y(),this.geometry.boundingSphere;const r=new w().copy(e.color).multiplyScalar(e.intensity),o=new g(20,20);o.dispose();const a=new m(new u(o),new F({color:r}));a.raycast=()=>{},this.shape=a,this.target=e,this.sphere=new C(new x(0,0,0),1),this.cacheColor=e.color.getHex(),this.cacheVector3=new x,this.add(this.shape),this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.onBeforeRender=()=>{const h=this.target,d=this.shape;h.color.getHex()!==this.cacheColor&&(d.material.color.copy(h.color).multiplyScalar(h.intensity),this.cacheColor=h.color.getHex()),d.lookAt(h.target.position)}}raycast(e,i){const r=this.target,o=r.matrixWorld,a=this.sphere;a.set(this.cacheVector3.set(0,0,0),1),a.applyMatrix4(o),e.ray.intersectsSphere(a)&&i.push({distance:e.ray.origin.distanceTo(r.position),object:r,point:r.position})}}class ne extends m{constructor(e){super(),s(this,"sphere"),s(this,"target"),s(this,"shape"),s(this,"type","VisPointLightHelper"),s(this,"cacheColor"),s(this,"cacheDistance"),s(this,"cacheVector3"),this.geometry=new f;const i=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new v(i,3)),this.material=y(),this.geometry.boundingSphere;const r=new w().copy(e.color).multiplyScalar(e.intensity),o=new q(new E(e.distance,0),new J({color:r,wireframe:!0}));o.raycast=()=>{},o.matrixAutoUpdate=!1,this.shape=o,this.target=e,this.sphere=new C(new x(0,0,0),1),this.cacheColor=e.color.getHex(),this.cacheDistance=e.distance,this.cacheVector3=new x,this.add(this.shape),this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.onBeforeRender=()=>{const a=this.target,h=this.shape;a.distance!==this.cacheDistance&&(h.geometry.dispose(),h.geometry=new E(a.distance,0),this.cacheDistance=a.distance),a.color.getHex()!==this.cacheColor&&(h.material.color.copy(a.color).multiplyScalar(a.intensity),this.cacheColor=a.color.getHex())}}raycast(e,i){const r=this.target,o=r.matrixWorld,a=this.sphere;a.set(this.cacheVector3.set(0,0,0),1),a.applyMatrix4(o),e.ray.intersectsSphere(a)&&i.push({distance:e.ray.origin.distanceTo(r.position),object:r,point:r.position})}}class he extends m{constructor(e){super(),s(this,"target"),s(this,"type","VisRectAreaLightHelper"),s(this,"cacheBox",new X),s(this,"cacheVector3",new x),s(this,"cacheColor"),s(this,"cacheIntensity"),this.target=e,this.generateShape();const i=y();i.color.copy(e.color).multiplyScalar(e.intensity),this.cacheColor=e.color.getHex(),this.cacheIntensity=e.intensity,this.material=i,this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.onBeforeRender=()=>{const r=this.target;(r.width!==this.geometry.parameters.width||r.height!==this.geometry.parameters.height)&&this.generateShape(),(r.color.getHex()!==this.cacheColor||this.cacheIntensity!==r.intensity)&&(this.material.color.copy(r.color).multiplyScalar(r.intensity),this.cacheColor=r.color.getHex())}}generateShape(){this.geometry.dispose(),this.geometry=new g(this.target.width,this.target.height,4,4),this.geometry.computeBoundingBox()}raycast(e,i){const r=this.target,o=this.cacheBox;o.copy(this.geometry.boundingBox),o.applyMatrix4(r.matrixWorld),e.ray.intersectBox(o,this.cacheVector3)&&i.push({distance:e.ray.origin.distanceTo(r.position),object:r,point:r.position})}}class le extends m{constructor(e){super(),s(this,"sphere"),s(this,"target"),s(this,"shape"),s(this,"type","VisSpotLightHelper"),s(this,"cacheVector3"),s(this,"cacheColor"),s(this,"cacheAngle"),s(this,"cacheDistance"),this.geometry=new f;const i=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new v(i,3)),this.material=y(),this.geometry.boundingSphere;const r=new f,o=[0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let n=0,l=1,p=32;n<p;n++,l++){const b=n/p*Math.PI*2,B=l/p*Math.PI*2;o.push(Math.cos(b),Math.sin(b),1,Math.cos(B),Math.sin(B),1)}r.setAttribute("position",new v(o,3));const a=y(),h=new m(r,a);h.material.color.copy(e.color).multiplyScalar(e.intensity);const d=e.distance?e.distance:1e3,c=d*Math.tan(e.angle);h.scale.set(c,c,d),h.raycast=()=>{},this.add(h),this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.target=e,this.shape=h,this.sphere=new C(new x(0,0,0),1),this.cacheColor=e.color.getHex(),this.cacheDistance=e.distance,this.cacheAngle=e.angle,this.cacheVector3=new x,this.onBeforeRender=()=>{const n=this.target,l=this.shape;let p=!1;if(n.distance!==this.cacheDistance&&(this.cacheDistance=n.distance,l.scale.z=n.distance,p=!0),n.angle!==this.cacheAngle&&(this.cacheAngle=n.angle,p=!0),p){const b=n.distance*Math.tan(n.angle);l.scale.set(b,b,n.distance)}n.color.getHex()!==this.cacheColor&&(l.material.color.copy(n.color).multiplyScalar(n.intensity),this.cacheColor=n.color.getHex()),l.lookAt(n.target.position)}}raycast(e,i){const r=this.target,o=r.matrixWorld,a=this.sphere;a.set(this.cacheVector3.set(0,0,0),1),a.applyMatrix4(o),e.ray.intersectsSphere(a)&&i.push({distance:e.ray.origin.distanceTo(r.position),object:r,point:r.position})}}const G=class extends A{constructor(t){super(),s(this,"target"),s(this,"type","GeometricOriginHelper"),this.target=t,this.geometry=new f().setAttribute("position",new K(new Float32Array([0,0,0]),3)),this.material=new H({map:G.colorTexture,transparent:!0,alphaTest:.1,depthFunc:Q}),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=t.matrix,this.matrixWorld=t.matrixWorld,this.renderOrder=100,this.raycast=()=>{}}};let ce=G;s(ce,"colorTexture",new W(new j({width:32,height:32}).draw(t=>{t.beginPath(),t.fillStyle="rgba(0, 0, 0, 0)",t.fillRect(0,0,32,32),t.closePath(),t.beginPath(),t.fillStyle="rgb(255, 163, 0)",t.strokeStyle="black",t.lineWidth=1,t.arc(16,16,15,0,2*Math.PI),t.stroke(),t.fill(),t.closePath()}).get()));const pe=`

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

`,de=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class me extends D{constructor(){super(),this.vertexShader=pe,this.fragmentShader=de,this.uniforms={color:{value:new w("white")}}}}class ue extends m{constructor(e){super(),s(this,"target"),s(this,"type","VisCSS2DPlaneHelper"),s(this,"observer"),this.geometry=new u(new g(1,1)),this.geometry.computeBoundingBox(),this.material=new me,this.scale.copy(e.matrixScale),this.position.set(e.position.x,e.position.y,e.position.z),this.target=e;const i=new MutationObserver(()=>{this.scale.copy(e.matrixScale)});i.observe(e.element,{attributeFilter:["style"]}),this.observer=i,this.onBeforeRender=()=>{this.position.set(this.target.position.x,this.target.position.y,this.target.position.z)},this.raycast=()=>{}}dispose(){this.observer.disconnect()}}class ge extends m{constructor(e){super(),s(this,"target"),s(this,"type","VisCSS3DPlaneHelper"),s(this,"observer"),this.geometry=new u(new g(e.width,e.height)),this.geometry.computeBoundingBox(),this.material=y(),this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.target=e;const i=new MutationObserver(()=>{this.geometry.dispose(),this.geometry=new u(new g(e.width,e.height)),this.geometry.computeBoundingBox()});i.observe(e.element,{attributeFilter:["style"]}),this.observer=i,this.raycast=()=>{},this.updateMatrixWorld=()=>{}}dispose(){this.observer.disconnect()}}const ye=`
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

`,xe=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class fe extends D{constructor(){super(),this.vertexShader=ye,this.fragmentShader=xe,this.uniforms={color:{value:new w("white")},rotation2D:{value:0}}}}class be extends m{constructor(e){super(),s(this,"target"),s(this,"type","VisCSS3DSpriteHelper"),s(this,"observer"),this.geometry=new u(new g(1,1)),this.geometry.computeBoundingBox(),this.material=new fe,this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.target=e;const i=new MutationObserver(()=>{this.geometry.dispose(),this.geometry=new u(new g(e.width,e.height)),this.geometry.computeBoundingBox()});i.observe(e.element,{attributeFilter:["style"]}),this.observer=i,this.onBeforeRender=()=>{this.material.uniforms.rotation2D.value=this.target.rotation2D},this.raycast=()=>{},this.updateMatrixWorld=()=>{}}dispose(){this.observer.disconnect()}}const V=class extends ee{constructor(t){super(),s(this,"target"),s(this,"type","VisGroupHelper"),this.target=t,this.geometry.computeBoundingBox(),this.material=new te({map:V.colorTexture}),this.material.depthTest=!1,this.material.depthWrite=!1,this.scale.set(5,5,5);const e=this.updateMatrixWorld.bind(this);this.updateMatrixWorld=i=>{const r=this.position,o=this.target.position;r.x=o.x,r.y=o.y,r.z=o.z,e(i)}}raycast(t,e){const i=this.matrixWorld,r=this.geometry.boundingBox.clone();if(r.applyMatrix4(i),t.ray.intersectsBox(r)){const o=this.target;e.push({distance:t.ray.origin.distanceTo(o.position),object:o,point:o.position})}}};let R=V;s(R,"colorTexture",new W(new j({width:512,height:512}).draw(t=>{t.beginPath(),t.fillStyle="rgba(0, 0, 0, 0)",t.fillRect(0,0,512,512),t.closePath(),t.translate(256,200),t.beginPath(),t.fillStyle="yellow",t.fillRect(-200,0,400,200),t.closePath(),t.beginPath(),t.fillStyle="yellow",t.fillRect(-200,-70,200,70),t.closePath()}).get()));const T=class extends A{constructor(t){super(),s(this,"target"),s(this,"cachaGeometryUUid"),s(this,"type","VisLineHelper"),this.target=t,this.geometry.dispose(),this.geometry.copy(t.geometry),this.cachaGeometryUUid=t.geometry.uuid,this.material=new H({color:"rgb(255, 255, 255)",alphaMap:T.alphaTexture,transparent:!0,size:5,sizeAttenuation:!1}),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=t.matrix,this.matrixWorld=t.matrixWorld,this.renderOrder=-1,this.raycast=()=>{},this.onBeforeRender=()=>{const e=this.target;e.geometry.uuid!==this.cachaGeometryUUid&&(this.geometry.dispose(),this.geometry=e.geometry.clone(),this.cachaGeometryUUid=e.geometry.uuid)}}};let z=T;s(z,"alphaTexture",new W(new j({width:512,height:512,bgColor:"rgb(0, 0, 0)"}).draw(t=>{t.beginPath(),t.fillStyle="rgb(255, 255, 255)",t.arc(256,256,200,0,Math.PI*2),t.fill(),t.closePath()}).getDom()));class ve extends m{constructor(e){super(),s(this,"target"),s(this,"type","VisMeshHelper"),s(this,"cachaGeometryUUid");const i=1;this.target=e,this.geometry=new u(e.geometry,i),this.cachaGeometryUUid=e.geometry.uuid,this.material=y(),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.updateMatrixWorld=()=>{},this.raycast=()=>{},this.onBeforeRender=()=>{const r=this.target;r.geometry.uuid!==this.cachaGeometryUUid&&(this.geometry.dispose(),this.geometry=new u(r.geometry,i),this.cachaGeometryUUid=r.geometry.uuid)}}}const _=class extends A{constructor(t){super(),s(this,"target"),s(this,"type","VisPointsHelper"),this.target=t,this.geometry.dispose(),this.geometry.copy(t.geometry),this.material.dispose(),this.material=new H({color:"rgb(255, 255, 255)",alphaMap:_.alphaTexture,transparent:!0});const e=Array.isArray(t.material)?t.material[0]:t.material;e instanceof H&&(this.material.size=e.size,this.material.sizeAttenuation=e.sizeAttenuation),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=t.matrix,this.matrixWorld=t.matrixWorld,this.raycast=()=>{}}};let N=_;s(N,"alphaTexture",new W(new j({width:512,height:512,bgColor:"rgb(0, 0, 0)"}).draw(t=>{t.beginPath(),t.strokeStyle="rgb(255, 255, 255)",t.lineWidth=4,t.strokeRect(0,0,512,512),t.closePath()}).get()));const we=`

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

`,Me=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class Pe extends D{constructor(){super(),this.vertexShader=we,this.fragmentShader=Me,this.uniforms={color:{value:new w("white")},center:{value:new ie(.5,.5)},rotation:{value:0},sizeAttenuation:{value:!1}}}}class Se extends m{constructor(e){super(),s(this,"target"),s(this,"type","VisSpriteHelper"),this.geometry=new u(new g(1,1)),this.geometry.computeBoundingBox(),this.material=new Pe,this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.target=e,this.onBeforeRender=()=>{this.material.uniforms.rotation.value=this.target.material.rotation,this.material.uniforms.sizeAttenuation.value=this.target.material.sizeAttenuation},this.raycast=()=>{}}}class He extends L{constructor(e={}){super(),s(this,"helperGenerator",{PointLight:ne,SpotLight:le,DirectionalLight:ae,RectAreaLight:he,PerspectiveCamera:O,OrthographicCamera:O,Mesh:ve,Group:R,Sprite:Se,Points:N,Line:z,CSS3DPlane:ge,CSS3DSprite:be,CSS2DPlane:ue}),s(this,"helperFilter",{AmbientLight:!0,HemisphereLight:!0,Object3D:!0,TransformControls:!0,Scene:!0}),s(this,"objectFilter",new Set),s(this,"objectHelperMap",new Map),e.helperGenerator&&(this.helperGenerator=Object.assign(this.helperGenerator,e.helperGenerator)),e.helperFilter&&(this.helperFilter=Object.assign(this.helperFilter,e.helperFilter)),e.objectFilter&&(this.objectFilter=new Set(e.objectFilter.concat(Array.from(this.objectFilter))))}addFilteredObject(...e){for(const i of e)this.objectFilter.add(i);return this}addObjectHelper(e){if(this.objectFilter.has(e)||this.objectHelperMap.has(e)||this.helperFilter[e.type]||e.type.toLocaleLowerCase().includes("helper"))return null;if(!this.helperGenerator[e.type])return console.warn(`object helper can not support this type object: '${e.type}'`),null;const i=new this.helperGenerator[e.type](e);return this.objectHelperMap.set(e,i),i}disposeObjectHelper(e){if(this.objectFilter.has(e)||this.helperFilter[e.type]||e.type.toLocaleLowerCase().includes("helper"))return null;if(!this.objectHelperMap.has(e))return console.warn("object helper manager can not found this object`s helper: ",e),null;const i=this.objectHelperMap.get(e);return i.geometry&&i.geometry.dispose(),i.material&&(i.material instanceof se?i.material.dispose():i.material.forEach(r=>{r.dispose()})),this.objectHelperMap.delete(e),i}dispose(){for(const e of this.objectHelperMap.keys())this.disposeObjectHelper(e);this.objectHelperMap.clear()}}const We="@vis-three/plugin-object-helper",P="afterAdd",S="afterRemove";M.prototype.add=function(...t){if(!arguments.length)return this;if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}const e=t[0];if(e===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this;if(e&&e.isObject3D){if(e.parent!==null){const i=this.children.indexOf(e);i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent({type:"removed"}))}e.parent=this,this.children.push(e),e.dispatchEvent({type:"added"})}else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t);return this};const je=M.prototype.add,Ce=M.prototype.remove;M.prototype.add=function(...t){return je.call(this,...t),this.dispatchEvent({type:P,objects:t}),this};M.prototype.remove=function(...t){return Ce.call(this,...t),this.dispatchEvent({type:S,objects:t}),this};const Ae=I(We),Ee=function(){let t,e,i;const r=new WeakSet;return{name:Ae,install(o){const a=new He,h=a.objectHelperMap;o.objectHelperManager=a,o.setObjectHelper=function(c){if(c)this.scene.traverse(n=>{h.has(n)&&this.scene.add(h.get(n))});else for(let n=0;n<this.scene.children.length;n++){const l=this.scene.children[n];h.has(l)&&this.scene.remove(h.get(l))}return this};const d=c=>{r.has(c)||(c.traverse(n=>{const l=a.addObjectHelper(n);l&&c.add(l)}),r.add(c))};e=c=>{const n=c.objects;for(const l of n){const p=a.addObjectHelper(l);!p||o.scene.add(p)}},i=c=>{const n=c.objects;for(const l of n){const p=a.disposeObjectHelper(l);!p||o.scene.remove(p)}},o.scene.addEventListener(P,e),o.scene.addEventListener(S,i),t=c=>{const n=c.scene;!r.has(n)&&d(n),n.hasEventListener(P,e)||n.addEventListener(P,e),n.hasEventListener(S,i)||n.addEventListener(S,i)},o.addEventListener(U.SETSCENE,t)},dispose(o){o.objectHelperManager.objectHelperMap.forEach(a=>{a.parent&&a.parent.remove(a)}),o.objectHelperManager.dispose(),delete o.objectHelperManager,delete o.setObjectHelper,o.removeEventListener(U.SETSCENE,t)}}};export{P as A,Ee as O,Ae as a,S as b};
