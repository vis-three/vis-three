import { Shader } from "@vis-three/middleware";

export const fragCoordTestingShader: Shader = {
  name: "fragCoordTestingShader",
  uniforms: {
    resolution: {
      value: {
        x: 1920,
        y: 1080,
      },
    },
  },
  vertexShader: `
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  fragmentShader: `
    uniform vec2 resolution;

    void main () {
      vec2 st = gl_FragCoord.xy / resolution;
      gl_FragColor = vec4(st.x,st.y,0.0,1.0);
    }`,
};
