const e={name:"uvPulseShader",uniforms:{time:{value:0},width:{value:.5},color:{value:{r:1,g:0,b:0}},center:{value:{x:.5,y:.5}}},vertexShader:`
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
    }`};export{e as u};
