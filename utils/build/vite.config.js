import path from "path";
export default {
  build: {
    lib: {
      entry: path.resolve(__dirname, "../../src/main.ts"),
      name: "Vis",
    },
    rollupOptions: {
      output: {
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "Vis.[format].js",
        assetFileNames: "static/[name]-[hash].[ext]",
      },
      external: [
        "uuid",
        "keyboardjs",
        "three-csg-ts",
        "@tweenjs/tween.js",
        "three",
        "three/src/lights/LightShadow",
        "three/examples/jsm/postprocessing/EffectComposer",
        "three/examples/jsm/postprocessing/RenderPass",
        "three/examples/jsm/postprocessing/SMAAPass",
        "three/examples/jsm/postprocessing/UnrealBloomPass",
        "three/examples/jsm/controls/OrbitControls",
        "three/examples/jsm/controls/TransformControls",
        "three/examples/jsm/libs/stats.module",
        "three/examples/jsm/renderers/CSS3DRenderer",
        "three/examples/jsm/postprocessing/Pass",
        "three/examples/jsm/shaders/LuminosityHighPassShader",
        "three/examples/jsm/shaders/CopyShader",
        "three/examples/jsm/loaders/OBJLoader",
        "three/examples/jsm/loaders/MTLLoader",
        "three/examples/jsm/loaders/RGBELoader",
      ],
      plugins: [],
    },
  },
};
