import { Color, Vector2 } from "three";
export default {
    uniforms: {
        uTime: { value: 0.0 },
        uWidth: { value: 0.5 },
        uColor: { value: new Color("rgb(255, 0, 0)") },
        uCenter: { value: new Vector2(0.5, 0.5) },
    },
    vertexFhader: `
    uniform float uWidth;
    uniform float uTime;
    
    varying vec2 vUv;

    void main () {

      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
    FragmentShader: `
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
//# sourceMappingURL=uvPulseShader.js.map