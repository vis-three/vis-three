(function(o,r){typeof exports=="object"&&typeof module!="undefined"?module.exports=r(require("@vis-three/middleware"),require("@vis-three/module-object"),require("uuid"),require("three")):typeof define=="function"&&define.amd?define(["@vis-three/middleware","@vis-three/module-object","uuid","three"],r):(o=typeof globalThis!="undefined"?globalThis:o||self,o["vis-three"]=o["vis-three"]||{},o["vis-three"]["module-particle"]=r(o.middleware,o.moduleObject,o.uuid,o.three))})(this,function(o,r,l,u){"use strict";var C=Object.defineProperty;var k=(o,r,l)=>r in o?C(o,r,{enumerable:!0,configurable:!0,writable:!0,value:l}):o[r]=l;var g=(o,r,l)=>(k(o,typeof r!="symbol"?r+"":r,l),l);class d extends r.ObjectCompiler{constructor(){super()}}const h=function(t,a,e=l.validate){r.ObjectRule(t,a,e)},v=function(){return Object.assign(r.getObjectConfig(),{range:{top:100,bottom:-100,left:-100,right:100,front:100,back:-100},amount:200,size:1,alphaMap:"",opacity:1,flicker:!0,time:0})},y=`
varying vec3 vColor;
uniform bool flicker;
uniform float time;
uniform float size;

void main() {

  vColor = color;
  float positionX = position.x + sin(time  + color.r + position.y + color.b ) * 5.0;
  float positionY = position.y + sin(time  + color.r + color.g + color.g ) * 5.0;
  float positionZ = position.z + sin(time  + color.b + color.g + position.x ) * 5.0;

  vec4 mvPosition = modelViewMatrix * vec4( positionX, positionY, positionZ, 1.0 );

  float pointSize = size * ( 300.0 / -mvPosition.z );

  if (flicker) {
    pointSize = sin(time + position.x + color.g + color.b) * pointSize;
  }

  gl_PointSize = pointSize;

  gl_Position = projectionMatrix * mvPosition;

}
`,b=`
uniform sampler2D alphaMap;
uniform float opacity;
varying vec3 vColor;

void main() {

  gl_FragColor = vec4( vColor, opacity );

  gl_FragColor = gl_FragColor * texture2D( alphaMap, gl_PointCoord );

  if (gl_FragColor.a < 0.01) {
    discard;
  }

}
`;class M extends u.ShaderMaterial{constructor(a){super(),this.uniforms={flicker:{value:a.flicker||!1},time:{value:a.time||0},alphaMap:{value:a.alphaMap||null},size:{value:a.size||1},opacity:{value:a.opacity||1}},this.vertexShader=y,this.fragmentShader=b,this.vertexColors=!0,this.blending=u.AdditiveBlending,this.transparent=!0}}class P extends u.Points{constructor(e){super();g(this,"range",{top:100,bottom:-100,left:-100,right:100,front:100,back:-100});g(this,"amount",200);this.raycast=()=>{},Object.assign(this.range,e.range),this.amount=e.amount,this.resetGeometry(),this.material=new M({size:e.size||1,alphaMap:e.alphaMap||null,opacity:e.opacity||1,flicker:e.flicker})}updateGeometry(){const e=this.range,p=this.geometry,f=this.amount,n=(i,m)=>Math.floor(Math.random()*(m-i+1))+i,s=p.getAttribute("position"),c=p.getAttribute("color");for(let i=0;i<f;i+=1)s.setXYZ(i,n(e.left,e.right),n(e.bottom,e.top),n(e.back,e.front)),s.setXYZ(i,n(0,1),n(0,1),n(0,1));s.needsUpdate=!0,c.needsUpdate=!0}resetGeometry(){const e=this.range,p=this.geometry,f=this.amount,n=(i,m)=>Math.floor(Math.random()*(m-i+1))+i,s=new Array(f*3),c=new Array(f*3);for(let i=0;i<f*3;i+=3)s[i]=n(e.left,e.right),s[i+1]=n(e.bottom,e.top),s[i+2]=n(e.back,e.front),c[i]=n(0,1),c[i+1]=n(0,1),c[i+2]=n(0,1);p.setAttribute("position",new u.BufferAttribute(new Float32Array(s),3)),p.setAttribute("color",new u.BufferAttribute(new Float32Array(c),3))}}var x=o.defineProcessor({type:"RangeParticle",config:v,commands:{set:{range(t){Object.assign(t.target.range,t.config.range),t.target.updateGeometry()},amount(t){t.target.amount=t.value,t.target.resetGeometry()},time(t){t.target.material.uniforms.time.value=t.value}}},create(t,a){const e=new P({range:{...t.range},amount:t.amount,size:t.size,opacity:t.opacity,alphaMap:a.getObjectfromModule(o.MODULETYPE.TEXTURE,t.alphaMap),flicker:t.flicker});return r.objectCreate(e,t,{range:!0,amount:!0,size:!0,alphaMap:!0,opacity:!0,flicker:!0},a)},dispose(){}}),z={type:"particle",object:!0,compiler:d,rule:h,processors:[x],lifeOrder:o.SUPPORT_LIFE_CYCLE.THREE};return z});
