var $=Object.defineProperty;var k=(n,a,e)=>a in n?$(n,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[a]=e;var s=(n,a,e)=>(k(n,typeof a!="symbol"?a+"":a,e),e);import{e as _,t as L,a as z}from"./index.5dcba3b7.js";import{al as N,aA as m,k as b,x as w,bt as q,f as J,u as Y,g as K,I as M,w as g,ai as u,b3 as A,V as f,M as Q,br as G,am as X,r as Z,y as B,at as ee,au as U,aq as te,b as I,ap as D,m as ie,az as se,v as S}from"./three.057c7ef5.js";import{C as E}from"./TextureDisplayer.0e66dd70.js";const y=()=>new N({color:"rgb(255, 255, 255)"});class T extends m{constructor(e){super();s(this,"shape");s(this,"target");s(this,"type","CameraHelper");s(this,"cachaData");const t=new b,i=[0,0,0,-1,1,-1,0,0,0,-1,1,1,0,0,0,-1,-1,-1,0,0,0,-1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,1,-1,-1,1,1,-1,1,1,-1,-1,1,0,0,0,0,1,1,0,0,0,0,1,-1,0,0,0,0,-1,-1,0,0,0,0,-1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0,-1,-1,0,-1,1,0,-1,1,0,1,1,0,-1,1,2,-1,1,0,1,-1,2,1,-1,0,-1,-1,2,-1,-1,0,1,1,2,1,1,2,1,1,2,-1,1,2,-1,1,2,-1,-1,2,-1,-1,2,1,-1,2,1,-1,2,1,1];t.setAttribute("position",new w(i,3)),t.rotateY(-90*Math.PI/180),t.computeBoundingBox();const o=new q(e);o.matrix=new J,o.matrixAutoUpdate=!0,o.raycast=()=>{},this.add(o),this.shape=o,this.geometry=t,this.material=y(),this.target=e,this.matrixAutoUpdate=!1,this.matrix=e.matrix,e instanceof Y?this.cachaData={fov:e.fov,aspect:e.aspect,near:e.near,far:e.far}:e instanceof K?this.cachaData={left:e.left,right:e.right,top:e.top,bottom:e.bottom,near:e.near,far:e.far}:this.cachaData={},this.onBeforeRender=()=>{let r=!1;const p=this.cachaData;Object.keys(p).forEach(l=>{p[l]!==e[l]&&(p[l]=e[l],r=!0)}),r&&this.shape.update()}}raycast(e,t){const i=this.matrixWorld,o=this.geometry.boundingBox.clone();if(o.applyMatrix4(i),e.ray.intersectsBox(o)){const r=this.target;t.push({distance:e.ray.origin.distanceTo(r.position),object:r,point:r.position})}}}class oe extends m{constructor(e){super();s(this,"sphere");s(this,"target");s(this,"shape");s(this,"type","VisDirectionalLightHelper");s(this,"cacheColor");s(this,"cacheVector3");this.geometry=new b;const t=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new w(t,3)),this.material=y(),this.geometry.boundingSphere;const i=new M().copy(e.color).multiplyScalar(e.intensity),o=new g(20,20);o.dispose();const r=new m(new u(o),new N({color:i}));r.raycast=()=>{},this.shape=r,this.target=e,this.sphere=new A(new f(0,0,0),1),this.cacheColor=e.color.getHex(),this.cacheVector3=new f,this.add(this.shape),this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.onBeforeRender=()=>{const p=this.target,l=this.shape;p.color.getHex()!==this.cacheColor&&(l.material.color.copy(p.color).multiplyScalar(p.intensity),this.cacheColor=p.color.getHex()),l.lookAt(p.target.position)}}raycast(e,t){const i=this.target,o=i.matrixWorld,r=this.sphere;r.set(this.cacheVector3.set(0,0,0),1),r.applyMatrix4(o),e.ray.intersectsSphere(r)&&t.push({distance:e.ray.origin.distanceTo(i.position),object:i,point:i.position})}}class re extends m{constructor(e){super();s(this,"sphere");s(this,"target");s(this,"shape");s(this,"type","VisPointLightHelper");s(this,"cacheColor");s(this,"cacheDistance");s(this,"cacheVector3");this.geometry=new b;const t=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new w(t,3)),this.material=y(),this.geometry.boundingSphere;const i=new M().copy(e.color).multiplyScalar(e.intensity),o=new Q(new G(e.distance,0),new X({color:i,wireframe:!0}));o.raycast=()=>{},o.matrixAutoUpdate=!1,this.shape=o,this.target=e,this.sphere=new A(new f(0,0,0),1),this.cacheColor=e.color.getHex(),this.cacheDistance=e.distance,this.cacheVector3=new f,this.add(this.shape),this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.onBeforeRender=()=>{const r=this.target,p=this.shape;r.distance!==this.cacheDistance&&(p.geometry.dispose(),p.geometry=new G(r.distance,0),this.cacheDistance=r.distance),r.color.getHex()!==this.cacheColor&&(p.material.color.copy(r.color).multiplyScalar(r.intensity),this.cacheColor=r.color.getHex())}}raycast(e,t){const i=this.target,o=i.matrixWorld,r=this.sphere;r.set(this.cacheVector3.set(0,0,0),1),r.applyMatrix4(o),e.ray.intersectsSphere(r)&&t.push({distance:e.ray.origin.distanceTo(i.position),object:i,point:i.position})}}class ae extends m{constructor(e){super();s(this,"target");s(this,"type","VisRectAreaLightHelper");s(this,"cacheBox",new Z);s(this,"cacheVector3",new f);s(this,"cacheColor");s(this,"cacheIntensity");this.target=e,this.generateShape();const t=y();t.color.copy(e.color).multiplyScalar(e.intensity),this.cacheColor=e.color.getHex(),this.cacheIntensity=e.intensity,this.material=t,this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.onBeforeRender=()=>{const i=this.target;(i.width!==this.geometry.parameters.width||i.height!==this.geometry.parameters.height)&&this.generateShape(),(i.color.getHex()!==this.cacheColor||this.cacheIntensity!==i.intensity)&&(this.material.color.copy(i.color).multiplyScalar(i.intensity),this.cacheColor=i.color.getHex())}}generateShape(){this.geometry.dispose(),this.geometry=new g(this.target.width,this.target.height,4,4),this.geometry.computeBoundingBox()}raycast(e,t){const i=this.target,o=this.cacheBox;o.copy(this.geometry.boundingBox),o.applyMatrix4(i.matrixWorld),e.ray.intersectBox(o,this.cacheVector3)&&t.push({distance:e.ray.origin.distanceTo(i.position),object:i,point:i.position})}}class ne extends m{constructor(e){super();s(this,"sphere");s(this,"target");s(this,"shape");s(this,"type","VisSpotLightHelper");s(this,"cacheVector3");s(this,"cacheColor");s(this,"cacheAngle");s(this,"cacheDistance");this.geometry=new b;const t=[-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1,0,0,1,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,0,0,-.707,-.707,0,.707,.707,0,.707,-.707,0,-.707,.707,-.707,0,-.707,.707,0,.707,.707,0,-.707,-.707,0,.707];this.geometry.setAttribute("position",new w(t,3)),this.material=y(),this.geometry.boundingSphere;const i=new b,o=[0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let c=0,d=1,x=32;c<x;c++,d++){const v=c/x*Math.PI*2,R=d/x*Math.PI*2;o.push(Math.cos(v),Math.sin(v),1,Math.cos(R),Math.sin(R),1)}i.setAttribute("position",new w(o,3));const r=y(),p=new m(i,r);p.material.color.copy(e.color).multiplyScalar(e.intensity);const l=e.distance?e.distance:1e3,h=l*Math.tan(e.angle);p.scale.set(h,h,l),p.raycast=()=>{},this.add(p),this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.target=e,this.shape=p,this.sphere=new A(new f(0,0,0),1),this.cacheColor=e.color.getHex(),this.cacheDistance=e.distance,this.cacheAngle=e.angle,this.cacheVector3=new f,this.onBeforeRender=()=>{const c=this.target,d=this.shape;let x=!1;if(c.distance!==this.cacheDistance&&(this.cacheDistance=c.distance,d.scale.z=c.distance,x=!0),c.angle!==this.cacheAngle&&(this.cacheAngle=c.angle,x=!0),x){const v=c.distance*Math.tan(c.angle);d.scale.set(v,v,c.distance)}c.color.getHex()!==this.cacheColor&&(d.material.color.copy(c.color).multiplyScalar(c.intensity),this.cacheColor=c.color.getHex()),d.lookAt(c.target.position)}}raycast(e,t){const i=this.target,o=i.matrixWorld,r=this.sphere;r.set(this.cacheVector3.set(0,0,0),1),r.applyMatrix4(o),e.ray.intersectsSphere(r)&&t.push({distance:e.ray.origin.distanceTo(i.position),object:i,point:i.position})}}const ce=`

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

`,le=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class he extends B{constructor(){super(),this.vertexShader=ce,this.fragmentShader=le,this.uniforms={color:{value:new M("white")}}}}class pe extends m{constructor(e){super();s(this,"target");s(this,"type","VisCSS2DPlaneHelper");s(this,"observer");this.geometry=new u(new g(1,1)),this.geometry.computeBoundingBox(),this.material=new he,this.scale.copy(e.matrixScale),this.position.set(e.position.x,e.position.y,e.position.z),this.target=e;const t=new MutationObserver(()=>{this.scale.copy(e.matrixScale)});t.observe(e.element,{attributeFilter:["style"]}),this.observer=t,this.onBeforeRender=()=>{this.position.set(this.target.position.x,this.target.position.y,this.target.position.z)},this.raycast=()=>{}}dispose(){this.observer.disconnect()}}class de extends m{constructor(e){super();s(this,"target");s(this,"type","VisCSS3DPlaneHelper");s(this,"observer");this.geometry=new u(new g(e.width,e.height)),this.geometry.computeBoundingBox(),this.material=y(),this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.target=e;const t=new MutationObserver(()=>{this.geometry.dispose(),this.geometry=new u(new g(e.width,e.height)),this.geometry.computeBoundingBox()});t.observe(e.element,{attributeFilter:["style"]}),this.observer=t,this.raycast=()=>{},this.updateMatrixWorld=()=>{}}dispose(){this.observer.disconnect()}}const me=`
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

`,ue=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class ge extends B{constructor(){super(),this.vertexShader=me,this.fragmentShader=ue,this.uniforms={color:{value:new M("white")},rotation2D:{value:0}}}}class ye extends m{constructor(e){super();s(this,"target");s(this,"type","VisCSS3DSpriteHelper");s(this,"observer");this.geometry=new u(new g(1,1)),this.geometry.computeBoundingBox(),this.material=new ge,this.matrixAutoUpdate=!1,this.matrix=e.matrix,this.matrixWorldNeedsUpdate=!1,this.matrixWorld=e.matrixWorld,this.target=e;const t=new MutationObserver(()=>{this.geometry.dispose(),this.geometry=new u(new g(e.width,e.height)),this.geometry.computeBoundingBox()});t.observe(e.element,{attributeFilter:["style"]}),this.observer=t,this.onBeforeRender=()=>{this.material.uniforms.rotation2D.value=this.target.rotation2D},this.raycast=()=>{},this.updateMatrixWorld=()=>{}}dispose(){this.observer.disconnect()}}const O=class extends ee{constructor(e){super();s(this,"target");s(this,"type","VisGroupHelper");this.target=e,this.geometry.computeBoundingBox(),this.material=new te({map:O.colorTexture}),this.material.depthTest=!1,this.material.depthWrite=!1,this.scale.set(5,5,5);const t=this.updateMatrixWorld.bind(this);this.updateMatrixWorld=i=>{const o=this.position,r=this.target.position;o.x=r.x,o.y=r.y,o.z=r.z,t(i)}}raycast(e,t){const i=this.matrixWorld,o=this.geometry.boundingBox.clone();if(o.applyMatrix4(i),e.ray.intersectsBox(o)){const r=this.target;t.push({distance:e.ray.origin.distanceTo(r.position),object:r,point:r.position})}}};let P=O;s(P,"colorTexture",new U(new E({width:512,height:512}).draw(e=>{e.beginPath(),e.fillStyle="rgba(0, 0, 0, 0)",e.fillRect(0,0,512,512),e.closePath(),e.translate(256,200),e.beginPath(),e.fillStyle="yellow",e.fillRect(-200,0,400,200),e.closePath(),e.beginPath(),e.fillStyle="yellow",e.fillRect(-200,-70,200,70),e.closePath()}).get()));const V=class extends I{constructor(e){super();s(this,"target");s(this,"cachaGeometryUUid");s(this,"type","VisLineHelper");this.target=e,this.geometry.dispose(),this.geometry.copy(e.geometry),this.cachaGeometryUUid=e.geometry.uuid,this.material=new D({color:"rgb(255, 255, 255)",alphaMap:V.alphaTexture,transparent:!0,size:5,sizeAttenuation:!1}),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.renderOrder=-1,this.raycast=()=>{},this.onBeforeRender=()=>{const t=this.target;t.geometry.uuid!==this.cachaGeometryUUid&&(this.geometry.dispose(),this.geometry=t.geometry.clone(),this.cachaGeometryUUid=t.geometry.uuid)}}};let H=V;s(H,"alphaTexture",new U(new E({width:512,height:512,bgColor:"rgb(0, 0, 0)"}).draw(e=>{e.beginPath(),e.fillStyle="rgb(255, 255, 255)",e.arc(256,256,200,0,Math.PI*2),e.fill(),e.closePath()}).getDom()));class xe extends m{constructor(e){super();s(this,"target");s(this,"type","VisMeshHelper");s(this,"cachaGeometryUUid");const t=1;this.target=e,this.geometry=new u(e.geometry,t),this.cachaGeometryUUid=e.geometry.uuid,this.material=y(),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.updateMatrixWorld=()=>{},this.raycast=()=>{},this.onBeforeRender=()=>{const i=this.target;i.geometry.uuid!==this.cachaGeometryUUid&&(this.geometry.dispose(),this.geometry=new u(i.geometry,t),this.cachaGeometryUUid=i.geometry.uuid)}}}const F=class extends I{constructor(e){super();s(this,"target");s(this,"type","VisPointsHelper");this.target=e,this.geometry.dispose(),this.geometry.copy(e.geometry),this.material.dispose(),this.material=new D({color:"rgb(255, 255, 255)",alphaMap:F.alphaTexture,transparent:!0});const t=Array.isArray(e.material)?e.material[0]:e.material;t instanceof D&&(this.material.size=t.size,this.material.sizeAttenuation=t.sizeAttenuation),this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.raycast=()=>{}}};let j=F;s(j,"alphaTexture",new U(new E({width:512,height:512,bgColor:"rgb(0, 0, 0)"}).draw(e=>{e.beginPath(),e.strokeStyle="rgb(255, 255, 255)",e.lineWidth=4,e.strokeRect(0,0,512,512),e.closePath()}).get()));const fe=`

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

`,ve=`

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;class be extends B{constructor(){super(),this.vertexShader=fe,this.fragmentShader=ve,this.uniforms={color:{value:new M("white")},center:{value:new ie(.5,.5)},rotation:{value:0},sizeAttenuation:{value:!1}}}}class we extends m{constructor(e){super();s(this,"target");s(this,"type","VisSpriteHelper");this.geometry=new u(new g(1,1)),this.geometry.computeBoundingBox(),this.material=new be,this.matrixAutoUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.matrix=e.matrix,this.matrixWorld=e.matrixWorld,this.target=e,this.onBeforeRender=()=>{this.material.uniforms.rotation.value=this.target.material.rotation,this.material.uniforms.sizeAttenuation.value=this.target.material.sizeAttenuation},this.raycast=()=>{}}}class Me extends _{constructor(e={}){super();s(this,"helperGenerator",{PointLight:re,SpotLight:ne,DirectionalLight:oe,RectAreaLight:ae,PerspectiveCamera:T,OrthographicCamera:T,Mesh:xe,Group:P,Sprite:we,Points:j,Line:H,CSS3DPlane:de,CSS3DSprite:ye,CSS2DPlane:pe});s(this,"helperFilter",{AmbientLight:!0,HemisphereLight:!0,Object3D:!0,TransformControls:!0,Scene:!0});s(this,"objectFilter",new Set);s(this,"objectHelperMap",new Map);e.helperGenerator&&(this.helperGenerator=Object.assign(this.helperGenerator,e.helperGenerator)),e.helperFilter&&(this.helperFilter=Object.assign(this.helperFilter,e.helperFilter)),e.objectFilter&&(this.objectFilter=new Set(e.objectFilter.concat(Array.from(this.objectFilter))))}addFilteredObject(...e){for(const t of e)this.objectFilter.add(t);return this}addObjectHelper(e){if(this.objectFilter.has(e)||this.objectHelperMap.has(e)||this.helperFilter[e.type]||e.type.toLocaleLowerCase().includes("helper"))return null;if(!this.helperGenerator[e.type])return console.warn(`object helper can not support this type object: '${e.type}'`),null;const t=new this.helperGenerator[e.type](e);return this.objectHelperMap.set(e,t),t}disposeObjectHelper(e){if(this.objectFilter.has(e)||this.helperFilter[e.type]||e.type.toLocaleLowerCase().includes("helper"))return null;if(!this.objectHelperMap.has(e))return console.warn("object helper manager can not found this object`s helper: ",e),null;const t=this.objectHelperMap.get(e);return t.geometry&&t.geometry.dispose(),t.material&&(t.material instanceof se?t.material.dispose():t.material.forEach(i=>{i.dispose()})),this.objectHelperMap.delete(e),t}dispose(){for(const e of this.objectHelperMap.keys())this.disposeObjectHelper(e);this.objectHelperMap.clear()}}const Se="@vis-three/object-helper-plugin",W="afterAdd",C="afterRemove";S.prototype.add=function(...n){if(!arguments.length)return this;if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}const a=n[0];if(a===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",n),this;if(a&&a.isObject3D){if(a.parent!==null){const e=this.children.indexOf(a);e!==-1&&(a.parent=null,this.children.splice(e,1),a.dispatchEvent({type:"removed"}))}a.parent=this,this.children.push(a),a.dispatchEvent({type:"added"})}else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",n);return this};const Pe=S.prototype.add,He=S.prototype.remove;S.prototype.add=function(...n){return Pe.call(this,...n),this.dispatchEvent({type:W,objects:n}),this};S.prototype.remove=function(...n){return He.call(this,...n),this.dispatchEvent({type:C,objects:n}),this};const je=L(Se),Be=function(){let n,a,e;const t=new WeakSet;return{name:je,install(i){const o=new Me,r=o.objectHelperMap;i.objectHelperManager=o,i.setObjectHelper=function(l){if(l)this.scene.traverse(h=>{r.has(h)&&this.scene.add(r.get(h))});else for(let h=0;h<this.scene.children.length;h++){const c=this.scene.children[h];r.has(c)&&this.scene.remove(r.get(c))}return this};const p=l=>{t.has(l)||(l.traverse(h=>{const c=o.addObjectHelper(h);c&&l.add(c)}),t.add(l))};a=l=>{const h=l.objects;for(const c of h){const d=o.addObjectHelper(c);!d||i.scene.add(d)}},e=l=>{const h=l.objects;for(const c of h){const d=o.disposeObjectHelper(c);!d||i.scene.remove(d)}},i.scene.addEventListener(W,a),i.scene.addEventListener(C,e),n=l=>{const h=l.scene;!t.has(h)&&p(h),h.hasEventListener(W,a)||h.addEventListener(W,a),h.hasEventListener(C,e)||h.addEventListener(C,e)},i.addEventListener(z.SETSCENE,n)},dispose(i){i.objectHelperManager.objectHelperMap.forEach(o=>{o.parent&&o.parent.remove(o)}),i.objectHelperManager.dispose(),delete i.objectHelperManager,delete i.setObjectHelper,i.removeEventListener(z.SETSCENE,n)}}};export{W as A,Be as O,je as a,C as b};
