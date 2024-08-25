(function(o,s){typeof exports=="object"&&typeof module<"u"?module.exports=s(require("@vis-three/tdcm"),require("@vis-three/module-object"),require("three")):typeof define=="function"&&define.amd?define(["@vis-three/tdcm","@vis-three/module-object","three"],s):(o=typeof globalThis<"u"?globalThis:o||self,o["vis-three"]=o["vis-three"]||{},o["vis-three"]["module-particle"]=s(o.tdcm,o.moduleObject,o.three))})(this,function(o,s,n){"use strict";const c=function(){return Object.assign(s.getObjectConfig(),{range:{top:100,bottom:-100,left:-100,right:100,front:100,back:-100},amount:200,size:1,alphaMap:"",opacity:1,flicker:!0,time:0,floatRange:5,refColor:"rgb(255, 255, 255)",colorRange:.5})},g=`
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
`,f=`
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
`;class m extends n.ShaderMaterial{constructor(e){super(),this.uniforms={flicker:{value:e.flicker||!1},time:{value:e.time||0},alphaMap:{value:e.alphaMap||null},size:{value:e.size||1},opacity:{value:e.opacity||1},floatRange:{value:e.floatRange||5},useAlphaMap:{value:e.useAlphaMap||!1}},this.vertexShader=g,this.fragmentShader=f,this.vertexColors=!0,this.blending=n.AdditiveBlending,this.transparent=!0}}class h extends n.Points{constructor(e){super(),this.range={top:100,bottom:-100,left:-100,right:100,front:100,back:-100},this.amount=200,this.refColor=new n.Color(1,1,1),this.colorRange=1,this.raycast=()=>{},Object.assign(this.range,e.range),this.refColor.setHex(e.refColor.getHex()),this.colorRange=e.colorRange,this.amount=e.amount,this.resetGeometry(),this.material=new m({size:e.size||1,alphaMap:e.alphaMap||null,opacity:e.opacity||1,flicker:e.flicker,floatRange:e.floatRange,useAlphaMap:!!e.alphaMap})}getRandomNum(e,t){return Math.floor(Math.random()*(t-e+1))+e}getRandomColor(e){const t=this.refColor,r=this.colorRange;return this.getRandomNum(t[e]-t[e]*r,(1-t[e])*r+t[e])}updateGeometry(){const e=this.range,t=this.geometry,r=this.amount,a=t.getAttribute("position"),l=t.getAttribute("color");for(let i=0;i<r;i+=1)a.setXYZ(i,this.getRandomNum(e.left,e.right),this.getRandomNum(e.bottom,e.top),this.getRandomNum(e.back,e.front)),l.setXYZ(i,this.getRandomColor("r"),this.getRandomColor("g"),this.getRandomColor("b"));a.needsUpdate=!0,l.needsUpdate=!0}resetGeometry(){const e=this.range,t=this.geometry,r=this.amount,a=new Array(r*3),l=new Array(r*3);for(let i=0;i<r*3;i+=3)a[i]=this.getRandomNum(e.left,e.right),a[i+1]=this.getRandomNum(e.bottom,e.top),a[i+2]=this.getRandomNum(e.back,e.front),l[i]=this.getRandomColor("r"),l[i+1]=this.getRandomColor("g"),l[i+2]=this.getRandomColor("b");t.setAttribute("position",new n.BufferAttribute(new Float32Array(a),3)),t.setAttribute("color",new n.BufferAttribute(new Float32Array(l),3))}dispose(){this.geometry.dispose(),this.material.dispose(),this.removeFromParent()}}const p=s.defineObjectModel(u=>({type:"FloatParticle",config:c,commands:{set:{range(e){Object.assign(e.target.range,e.config.range),e.target.updateGeometry()},amount(e){e.target.amount=e.value,e.target.resetGeometry()},time(e){e.target.material.uniforms.time.value=e.value},flicker(e){e.target.material.uniforms.flicker.value=e.value},size(e){e.target.material.uniforms.size.value=e.value},opacity(e){e.target.material.uniforms.opacity.value=e.value},floatRange(e){e.target.material.uniforms.floatRange.value=e.value},colorRange(e){e.target.colorRange=e.value,e.target.updateGeometry()},refColor(e){e.target.refColor.setStyle(e.value),e.target.updateGeometry()},alphaMap(e){const t=e.engine.getObjectFromModule(o.MODULE_TYPE.TEXTURE,e.value)||null;e.target.material.uniforms.alphaMap.value=t,e.target.material.uniforms.useAlphaMap.value=!!t}}},create({model:e,config:t,engine:r}){const a=new h({range:{...t.range},amount:t.amount,size:t.size,opacity:t.opacity,alphaMap:r.getObjectFromModule(o.MODULE_TYPE.TEXTURE,t.alphaMap),flicker:t.flicker,floatRange:t.floatRange,refColor:new n.Color(t.refColor),colorRange:t.colorRange});return u.create({model:e,target:a,config:t,filter:{range:!0,amount:!0,size:!0,alphaMap:!0,opacity:!0,flicker:!0,floatRange:!0,refColor:!0,colorRange:!0},engine:r}),a},dispose({target:e}){e.dispose()}}));return o.defineModule({type:"particle",object:!0,models:[p],lifeOrder:o.SUPPORT_LIFE_CYCLE.THREE})});
