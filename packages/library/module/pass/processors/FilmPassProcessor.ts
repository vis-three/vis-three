import { defineProcessor } from "@vis-three/middleware";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { ComposerSupportEngine, PassCompiler } from "../PassCompiler";

import { FilmPassConfig, getFilmPassConfig } from "../PassConfig";

export default defineProcessor<
  FilmPassConfig,
  FilmPass,
  ComposerSupportEngine,
  PassCompiler
>({
  type: "FilmPass",
  config: getFilmPassConfig,
  commands: {
    set: {
      noiseIntensity({ target, value }) {
        //@ts-ignore
        target.uniforms.nIntensity.value = value;
      },
      grayscale({ target, value }) {
        //@ts-ignore
        target.uniforms.grayscale.value = value ? 1 : 0;
      },
      scanlinesIntensity({ target, value }) {
        //@ts-ignore
        target.uniforms.sIntensity.value = value;
      },
      scanlinesCount({ target, value }) {
        //@ts-ignore
        target.uniforms.sCount.value = value;
      },
    },
  },
  create(config, engine) {
    return new FilmPass(
      config.noiseIntensity,
      config.scanlinesIntensity,
      config.scanlinesCount,
      config.grayscale ? 1 : 0
    );
  },
  dispose(target) {},
});
