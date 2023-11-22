(function(o,r){typeof exports=="object"&&typeof module!="undefined"?module.exports=r(require("@vis-three/middleware"),require("@vis-three/module-object"),require("uuid"),require("three")):typeof define=="function"&&define.amd?define(["@vis-three/middleware","@vis-three/module-object","uuid","three"],r):(o=typeof globalThis!="undefined"?globalThis:o||self,o["vis-three"]=o["vis-three"]||{},o["vis-three"]["module-particle"]=r(o.middleware,o.moduleObject,o.uuid,o.three))})(this,function(o,r,s,u){"use strict";var b=Object.defineProperty;var P=(o,r,s)=>r in o?b(o,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[r]=s;var f=(o,r,s)=>(P(o,typeof r!="symbol"?r+"":r,s),s);class m extends r.ObjectCompiler{constructor(){super()}}const p=function(e,i,t=s.validate){r.ObjectRule(e,i,t)},h=function(){return Object.assign(r.getObjectConfig(),{range:{top:100,bottom:-100,left:-100,right:100,front:100,back:-100},amount:200,size:1,alphaMap:"",opacity:1,flicker:!0,time:0,floatRange:5,refColor:"rgb(255, 255, 255)",colorRange:.5})},d=`
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
`;class R extends u.ShaderMaterial{constructor(i){super(),this.uniforms={flicker:{value:i.flicker||!1},time:{value:i.time||0},alphaMap:{value:i.alphaMap||null},size:{value:i.size||1},opacity:{value:i.opacity||1},floatRange:{value:i.floatRange||5},useAlphaMap:{value:i.useAlphaMap||!1}},this.vertexShader=d,this.fragmentShader=v,this.vertexColors=!0,this.blending=u.AdditiveBlending,this.transparent=!0}}class y extends u.Points{constructor(t){super();f(this,"range",{top:100,bottom:-100,left:-100,right:100,front:100,back:-100});f(this,"amount",200);f(this,"refColor",new u.Color(1,1,1));f(this,"colorRange",1);this.raycast=()=>{},Object.assign(this.range,t.range),this.refColor.setHex(t.refColor.getHex()),this.colorRange=t.colorRange,this.amount=t.amount,this.resetGeometry(),this.material=new R({size:t.size||1,alphaMap:t.alphaMap||null,opacity:t.opacity||1,flicker:t.flicker,floatRange:t.floatRange,useAlphaMap:!!t.alphaMap})}getRandomNum(t,n){return Math.floor(Math.random()*(n-t+1))+t}getRandomColor(t){const n=this.refColor,l=this.colorRange;return this.getRandomNum(n[t]-n[t]*l,(1-n[t])*l+n[t])}updateGeometry(){const t=this.range,n=this.geometry,l=this.amount,c=n.getAttribute("position"),g=n.getAttribute("color");for(let a=0;a<l;a+=1)c.setXYZ(a,this.getRandomNum(t.left,t.right),this.getRandomNum(t.bottom,t.top),this.getRandomNum(t.back,t.front)),g.setXYZ(a,this.getRandomColor("r"),this.getRandomColor("g"),this.getRandomColor("b"));c.needsUpdate=!0,g.needsUpdate=!0}resetGeometry(){const t=this.range,n=this.geometry,l=this.amount,c=new Array(l*3),g=new Array(l*3);for(let a=0;a<l*3;a+=3)c[a]=this.getRandomNum(t.left,t.right),c[a+1]=this.getRandomNum(t.bottom,t.top),c[a+2]=this.getRandomNum(t.back,t.front),g[a]=this.getRandomColor("r"),g[a+1]=this.getRandomColor("g"),g[a+2]=this.getRandomColor("b");n.setAttribute("position",new u.BufferAttribute(new Float32Array(c),3)),n.setAttribute("color",new u.BufferAttribute(new Float32Array(g),3))}dispose(){this.geometry.dispose(),this.material.dispose(),this.removeFromParent()}}var C=o.defineProcessor({type:"FloatParticle",config:h,commands:{set:{range(e){Object.assign(e.target.range,e.config.range),e.target.updateGeometry()},amount(e){e.target.amount=e.value,e.target.resetGeometry()},time(e){e.target.material.uniforms.time.value=e.value},flicker(e){e.target.material.uniforms.flicker.value=e.value},size(e){e.target.material.uniforms.size.value=e.value},opacity(e){e.target.material.uniforms.opacity.value=e.value},floatRange(e){e.target.material.uniforms.floatRange.value=e.value},colorRange(e){e.target.colorRange=e.value,e.target.updateGeometry()},refColor(e){e.target.refColor.setStyle(e.value),e.target.updateGeometry()},alphaMap(e){const i=e.engine.getObjectfromModule(o.MODULETYPE.TEXTURE,e.value)||null;e.target.material.uniforms.alphaMap.value=i,e.target.material.uniforms.useAlphaMap.value=!!i}}},create(e,i){const t=new y({range:{...e.range},amount:e.amount,size:e.size,opacity:e.opacity,alphaMap:i.getObjectfromModule(o.MODULETYPE.TEXTURE,e.alphaMap),flicker:e.flicker,floatRange:e.floatRange,refColor:new u.Color(e.refColor),colorRange:e.colorRange});return r.objectCreate(t,e,{range:!0,amount:!0,size:!0,alphaMap:!0,opacity:!0,flicker:!0,floatRange:!0,refColor:!0,colorRange:!0},i)},dispose(e){e.dispose()}}),M={type:"particle",object:!0,compiler:m,rule:p,processors:[C],lifeOrder:o.SUPPORT_LIFE_CYCLE.THREE};return M});
