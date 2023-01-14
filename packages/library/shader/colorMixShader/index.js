export const colorMixShader = {
    name: "colorMixShader",
    uniforms: {
        colorA: {
            value: {
                r: 1,
                g: 0,
                b: 0,
            },
        },
        colorB: {
            value: {
                r: 0,
                g: 1,
                b: 0,
            },
        },
        percent: {
            value: 0.5,
        },
    },
    vertexShader: `
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
    fragmentShader: `
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform float percent;

    void main () {
      gl_FragColor = vec4(mix(colorA, colorB, percent), 1.0);
    }`,
};
