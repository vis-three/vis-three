import { Shader } from "../shader";

const shader: Shader = {
  name: "BloomShader",
  uniforms: {
    brightness: { value: 0.5 },
    extend: { value: 5.0 },
    range: { value: 10.0 },
    specular: { value: 0.8 },
    specularRange: { value: 2.0 },
    color: {
      value: {
        r: 1,
        g: 1,
        b: 1,
      },
    },
  },
  vertexShader: `
  uniform float extend;

  varying vec2 vUv;

  void main () {

    vUv = uv;

    vec3 extendPosition = position + normalize(position) * extend;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(extendPosition , 1.0 );
  }`,
  fragmentShader: `
    uniform vec3 color;
    uniform float brightness;
    uniform float specular;
    uniform float range;
    uniform float specularRange;

    varying vec2 vUv;
    
    void main () {

      gl_FragColor = vec4(color, brightness);
    }`,
};

export default shader;
