(function(o,r){typeof exports=="object"&&typeof module!="undefined"?module.exports=r(require("@vis-three/middleware"),require("@vis-three/module-object"),require("uuid"),require("three")):typeof define=="function"&&define.amd?define(["@vis-three/middleware","@vis-three/module-object","uuid","three"],r):(o=typeof globalThis!="undefined"?globalThis:o||self,o["vis-three"]=o["vis-three"]||{},o["vis-three"]["module-particle"]=r(o.middleware,o.moduleObject,o.uuid,o.three))})(this,function(o,r,s,u){"use strict";var M=Object.defineProperty;var z=(o,r,s)=>r in o?M(o,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[r]=s;var f=(o,r,s)=>(z(o,typeof r!="symbol"?r+"":r,s),s);class m extends r.ObjectCompiler{constructor(){super()}}const d=function(e,a,t=s.validate){r.ObjectRule(e,a,t)},h=function(){return Object.assign(r.getObjectConfig(),{range:{top:100,bottom:-100,left:-100,right:100,front:100,back:-100},amount:200,size:1,alphaMap:"",opacity:1,flicker:!0,time:0,floatRange:5,refColor:"rgb(255, 255, 255)",colorRange:.5})},p=`
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
`,v=`
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
`;class R extends u.ShaderMaterial{constructor(a){super(),this.uniforms={flicker:{value:a.flicker||!1},time:{value:a.time||0},alphaMap:{value:a.alphaMap||null},size:{value:a.size||1},opacity:{value:a.opacity||1},floatRange:{value:a.floatRange||5}},this.vertexShader=p,this.fragmentShader=v,this.vertexColors=!0,this.blending=u.AdditiveBlending,this.transparent=!0}}class C extends u.Points{constructor(t){super();f(this,"range",{top:100,bottom:-100,left:-100,right:100,front:100,back:-100});f(this,"amount",200);f(this,"refColor",new u.Color(1,1,1));f(this,"colorRange",1);this.raycast=()=>{},Object.assign(this.range,t.range),this.refColor.setHex(t.refColor.getHex()),this.colorRange=t.colorRange,this.amount=t.amount,this.resetGeometry(),this.material=new R({size:t.size||1,alphaMap:t.alphaMap||null,opacity:t.opacity||1,flicker:t.flicker,floatRange:t.floatRange})}getRandomNum(t,n){return Math.floor(Math.random()*(n-t+1))+t}getRandomColor(t){const n=this.refColor,l=this.colorRange;return this.getRandomNum(n[t]-n[t]*l,(1-n[t])*l+n[t])}updateGeometry(){const t=this.range,n=this.geometry,l=this.amount,c=n.getAttribute("position"),g=n.getAttribute("color");for(let i=0;i<l;i+=1)c.setXYZ(i,this.getRandomNum(t.left,t.right),this.getRandomNum(t.bottom,t.top),this.getRandomNum(t.back,t.front)),g.setXYZ(i,this.getRandomColor("r"),this.getRandomColor("g"),this.getRandomColor("b"));c.needsUpdate=!0,g.needsUpdate=!0}resetGeometry(){const t=this.range,n=this.geometry,l=this.amount,c=new Array(l*3),g=new Array(l*3);for(let i=0;i<l*3;i+=3)c[i]=this.getRandomNum(t.left,t.right),c[i+1]=this.getRandomNum(t.bottom,t.top),c[i+2]=this.getRandomNum(t.back,t.front),g[i]=this.getRandomColor("r"),g[i+1]=this.getRandomColor("g"),g[i+2]=this.getRandomColor("b");n.setAttribute("position",new u.BufferAttribute(new Float32Array(c),3)),n.setAttribute("color",new u.BufferAttribute(new Float32Array(g),3))}}var y=o.defineProcessor({type:"FloatParticle",config:h,commands:{set:{range(e){Object.assign(e.target.range,e.config.range),e.target.updateGeometry()},amount(e){e.target.amount=e.value,e.target.resetGeometry()},time(e){e.target.material.uniforms.time.value=e.value},flicker(e){e.target.material.uniforms.flicker.value=e.value},size(e){e.target.material.uniforms.size.value=e.value},opacity(e){e.target.material.uniforms.opacity.value=e.value},floatRange(e){e.target.material.uniforms.floatRange.value=e.value},colorRange(e){e.target.colorRange=e.value,e.target.updateGeometry()},refColor(e){e.target.refColor.setStyle(e.value),e.target.updateGeometry()},alphaMap(e){e.target.material.uniforms.alphaMap.value=e.engine.getObjectfromModule(o.MODULETYPE.TEXTURE,e.value)||null}}},create(e,a){const t=new C({range:{...e.range},amount:e.amount,size:e.size,opacity:e.opacity,alphaMap:a.getObjectfromModule(o.MODULETYPE.TEXTURE,e.alphaMap),flicker:e.flicker,floatRange:e.floatRange,refColor:new u.Color(e.refColor),colorRange:e.colorRange});return r.objectCreate(t,e,{range:!0,amount:!0,size:!0,alphaMap:!0,opacity:!0,flicker:!0,floatRange:!0,refColor:!0,colorRange:!0},a)},dispose(){}}),b={type:"particle",object:!0,compiler:m,rule:d,processors:[y],lifeOrder:o.SUPPORT_LIFE_CYCLE.THREE};return b});
