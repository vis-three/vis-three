export const BloomShader = {
    name: "BloomShader",
    uniforms: {
        brightness: { value: 0.8 },
        extend: { value: 5.0 },
        specular: { value: 0.9 },
        outFade: { value: 2.0 },
        inFade: { value: 0.3 },
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

  varying vec3 vNormal;
  varying vec3 vView;

  void main () {

    vec3 extendPosition = position + normalize(position) * extend;

    vNormal = normalize(position);
    vView = normalize(cameraPosition - (modelMatrix * vec4(extendPosition , 1.0 )).xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(extendPosition , 1.0 );
  }`,
    fragmentShader: `
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
    }`,
};
