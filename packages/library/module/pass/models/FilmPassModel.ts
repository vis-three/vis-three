import { defineModel } from "@vis-three/tdcm";
import { FilmPassConfig, getFilmPassConfig } from "../PassConfig";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { PassModuleEngine, PassCompiler } from "../PassCompiler";

export default defineModel<
  FilmPassConfig,
  FilmPass,
  {},
  {},
  PassModuleEngine,
  PassCompiler
>({
  type: "FilmPass",
  config: getFilmPassConfig,
  commands: {
    set: {
      intensity({ target, value }) {
        //@ts-ignore
        target.uniforms.intensity.value = value;
      },
      grayscale({ target, value }) {
        //@ts-ignore
        target.uniforms.grayscale.value = value ? 1 : 0;
      },
    },
  },
  create({ config, engine }) {
    return new FilmPass(config.intensity, config.grayscale);
  },
  dispose(target) {},
});
