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
        new RegExp("^three/examples/jsm"),
        "rxjs",
      ],
      plugins: [],
    },
  },
};
