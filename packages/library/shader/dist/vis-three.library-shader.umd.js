(function(e,o){typeof exports=="object"&&typeof module!="undefined"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(e=typeof globalThis!="undefined"?globalThis:e||self,o((e["vis-three"]=e["vis-three"]||{},e["vis-three"]["library-shader"]={})))})(this,function(e){"use strict";const o={name:"BloomShader",uniforms:{brightness:{value:.8},extend:{value:5},specular:{value:.9},outFade:{value:2},inFade:{value:.3},color:{value:{r:1,g:1,b:1}}},vertexShader:`
  uniform float extend;

  varying vec3 vNormal;
  varying vec3 vView;

  void main () {

    vec3 extendPosition = position + normalize(position) * extend;

    vNormal = normalize(position);
    vView = normalize(cameraPosition - (modelMatrix * vec4(extendPosition , 1.0 )).xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(extendPosition , 1.0 );
  }`,fragmentShader:`
    uniform vec3 color;
    uniform float brightness;
    uniform float specular;
    uniform float outFade;
    uniform float inFade;

    varying vec3 vNormal;
    varying vec3 vView;
    
    void main () {

      float present = smoothstep(0.0, 1.0, dot(vView, vNormal));

      if (present >= specular) {
        present = pow(smoothstep(1.0, specular, present), inFade);
      } else {
        present = pow(smoothstep(0.0, specular, present), outFade);
      }

      gl_FragColor = vec4(color, present * brightness);
    }`},i={name:"colorMixShader",uniforms:{colorA:{value:{r:1,g:0,b:0}},colorB:{value:{r:0,g:1,b:0}},percent:{value:.5}},vertexShader:`
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,fragmentShader:`
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform float percent;

    void main () {
      gl_FragColor = vec4(mix(colorA, colorB, percent), 1.0);
    }`},r={name:"fragCoordTestingShader",uniforms:{resolution:{value:{x:1920,y:1080}}},vertexShader:`
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,fragmentShader:`
    uniform vec2 resolution;

    void main () {
      vec2 st = gl_FragCoord.xy / resolution;
      gl_FragColor = vec4(st.x,st.y,0.0,1.0);
    }`},t={name:"uvPulseShader",uniforms:{time:{value:0},width:{value:.5},color:{value:{r:1,g:0,b:0}},center:{value:{x:.5,y:.5}}},vertexShader:`
    varying vec2 vUv;

    void main () {

      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,fragmentShader:`
    uniform float width;
    uniform float time;
    uniform vec3 color;
    uniform vec2 center;

    varying vec2 vUv;

    void main () {
      // \u6839\u636EuTime\u6C42\u51FA\u767E\u5206\u6BD4
      float deg = mod(degrees(time), 360.0);
      if (deg > 0.0 && deg < 180.0) {
        discard;
      }

      float percent = cos(time);
      float distancePercent = distance(center, vUv);

      // \u4ECE\u5916\u5411\u91CC
      if (distancePercent > 0.5) {
        discard;
      }

      if (distancePercent < percent) {
        discard;
      }

      if (distancePercent - percent > width) {
        discard;
      }

      float opacity =  (width - (distancePercent - percent)) / width;

      // float opacity = distancePercent;
      gl_FragColor = vec4(color, opacity);
    }`};e.BloomShader=o,e.colorMixShader=i,e.fragCoordTestingShader=r,e.uvPulseShader=t,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
