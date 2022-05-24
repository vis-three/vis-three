const shader = {
    name: "uvPulseShader",
    uniforms: {
        uTime: { value: 0.0 },
        uWidth: { value: 0.5 },
        uColor: {
            value: {
                r: 1,
                g: 0,
                b: 0,
            },
        },
        uCenter: {
            value: {
                x: 0.5,
                y: 0.5,
            },
        },
    },
    vertexShader: `
    uniform float uWidth;
    uniform float uTime;
    
    varying vec2 vUv;

    void main () {

      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
    fragmentShader: `
    uniform float uWidth;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec2 uCenter;

    varying vec2 vUv;

    void main () {
      // 根据uTime求出百分比
      float deg = mod(degrees(uTime), 360.0);
      if (deg > 0.0 && deg < 90.0) {
        discard;
      }

      float percent = sin(uTime);
      float distancePercent = distance(uCenter, vUv);

      // 从外向里
      if (distancePercent > 0.5) {
        discard;
      }
      if (distancePercent < percent) {
        discard;
      }

      if (distancePercent - percent > uWidth) {
        discard;
      }

      float opacity =  (uWidth - (distancePercent - percent)) / uWidth;

      // float opacity = distancePercent;
      gl_FragColor = vec4(uColor, opacity);
    }`,
};
export default shader;
//# sourceMappingURL=uvPulseShader.js.map