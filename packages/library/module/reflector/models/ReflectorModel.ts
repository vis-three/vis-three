import { EngineSupport, MODULE_TYPE } from "@vis-three/tdcm";
import { getReflectorConfig, ReflectorConfig } from "../ReflectorConfig";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { BufferGeometry } from "three";

export default defineObjectModel<
  ReflectorConfig,
  Reflector,
  {},
  {
    setSize: (
      reflector: Reflector,
      config: ReflectorConfig,
      engine: EngineSupport
    ) => void;
  }
>((objectModel) => ({
  type: "Reflector",
  config: getReflectorConfig,
  shared: {
    setSize(
      reflector: Reflector,
      config: ReflectorConfig,
      engine: EngineSupport
    ) {
      reflector
        .getRenderTarget()
        .setSize(
          config.textureHeight ||
            engine.dom.offsetWidth * window.devicePixelRatio,
          config.textureWidth ||
            engine.dom.offsetHeight * window.devicePixelRatio
        );
    },
  },
  commands: {
    set: {
      textureHeight({ model, target, config, engine }) {
        model.setSize(target, config, engine);
      },
      textureWidth({ model, target, config, engine }) {
        model.setSize(target, config, engine);
      },
      geometry(params) {
        params.target.geometry = params.engine.getObjectFromModule(
          MODULE_TYPE.GEOMETRY,
          params.value
        )!;
      },
    },
  },
  create({ model, config, engine }) {
    const reflector = new Reflector(
      engine.getObjectFromModule(MODULE_TYPE.GEOMETRY, config.geometry)!,
      {
        color: config.color,
        clipBias: config.clipBias,
        textureHeight:
          config.textureHeight ||
          engine.dom.offsetWidth * window.devicePixelRatio,
        textureWidth:
          config.textureWidth ||
          engine.dom.offsetHeight * window.devicePixelRatio,
        multisample: config.multisample,
      }
    );
    objectModel.create!<ReflectorConfig>({
      model: model as unknown as ObjectModel,
      target: reflector,
      config,
      engine,
      filter: { geometry: true, clipBias: true, color: true },
    });

    return reflector;
  },
  dispose({ target }) {
    target.geometry = undefined as unknown as BufferGeometry;
    //@ts-ignore
    target.dispose();

    objectModel.dispose!({ target });
  },
}));
