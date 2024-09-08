import { CubeTexture } from "three";
import { CubeTextureConfig, getCubeTextureConfig } from "../TextureConfig";
import { defineTextureModel, TextureModelShared } from "./TextureModel";
import { syncObject } from "@vis-three/utils";

export default defineTextureModel<
  CubeTextureConfig,
  CubeTexture,
  {},
  TextureModelShared & {
    imageHanlder: ({ model, target, index, value, engine }) => void;
  }
>(() => ({
  type: "CubeTexture",
  config: getCubeTextureConfig,
  shared: {
    imageHanlder({ model, target, index, value, engine }) {
      target.images[index] = model.getResource(value, engine, [
        HTMLImageElement,
        HTMLVideoElement,
        HTMLCanvasElement,
      ]);
      target.needsUpdate = true;
    },
  } as TextureModelShared & {
    imageHanlder: () => void;
  },
  commands: {
    set: {
      cube: {
        px({ model, target, value, engine }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 0,
            engine,
          });
        },
        nx({ model, target, value, engine }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 1,
            engine,
          });
        },
        py({ model, target, value, engine }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 2,
            engine,
          });
        },
        ny({ model, target, value, engine }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 3,
            engine,
          });
        },
        pz({ model, target, value, engine }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 4,
            engine,
          });
        },
        nz({ model, target, value, engine }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 5,
            engine,
          });
        },
      },
    },
  },

  create({ model, config, engine }) {
    const texture = new CubeTexture();
    const cube = config.cube;

    const instanceClasses = [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement,
    ];

    const images = [
      model.getResource(cube.px, engine, instanceClasses),
      model.getResource(cube.nx, engine, instanceClasses),
      model.getResource(cube.py, engine, instanceClasses),
      model.getResource(cube.ny, engine, instanceClasses),
      model.getResource(cube.pz, engine, instanceClasses),
      model.getResource(cube.nz, engine, instanceClasses),
    ];

    texture.image = images;

    syncObject(config, texture, {
      type: true,
      cube: true,
    });

    texture.needsUpdate = true;

    return texture;
  },

  dispose({ target }) {
    target.dispose();
  },
}));
