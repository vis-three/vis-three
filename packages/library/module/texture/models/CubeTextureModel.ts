import { CubeTexture } from "three";
import { CubeTextureConfig, getCubeTextureConfig } from "../TextureConfig";
import { defineTextureModel, TextureModelShared } from "./TextureModel";
import { syncObject } from "@vis-three/utils";

export default defineTextureModel<
  CubeTextureConfig,
  CubeTexture,
  {},
  TextureModelShared & {
    imageHanlder: ({ model, target, index, value }) => void;
  }
>(() => ({
  type: "CubeTexture",
  config: getCubeTextureConfig,
  shared: {
    imageHanlder({ model, target, index, value }) {
      target.images[index] = model.getResource(value, [
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
        px({ model, target, value }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 0,
          });
        },
        nx({ model, target, value }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 1,
          });
        },
        py({ model, target, value }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 2,
          });
        },
        ny({ model, target, value }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 3,
          });
        },
        pz({ model, target, value }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 4,
          });
        },
        nz({ model, target, value }) {
          model.imageHanlder({
            model,
            target,
            value,
            index: 5,
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
