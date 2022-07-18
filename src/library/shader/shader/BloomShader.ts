import { Shader } from "../shader";

const shader: Shader = {
  name: "BloomShader",
  uniforms: {
    brightness: { value: 0.5 },
    width: { value: 5.0 },
    color: {
      value: {
        r: 1,
        g: 1,
        b: 1,
      },
    },
  },
  vertexShader: `
  uniform float width;

  varying vec3 vNormal; // 法线
  varying vec3 vPositionNormal;
  void main () {
    vec3 vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
    vec3 vPositionNormal = normalize(normalMatrix * -cameraPosition);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position + normalize(position) * width, 1.0);
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }`,
  fragmentShader: `
    uniform vec3 color;
    uniform float brightness;

    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    
    void main () {
      float a = dot(vNormal, vPositionNormal);
      gl_FragColor = vec4(color, a);
    }`,
};

export default shader;
