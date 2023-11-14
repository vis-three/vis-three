import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { ReflectorCompiler } from "../ReflectorCompiler";
import { getReflectorConfig, ReflectorConfig } from "../ReflectorConfig";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { BufferGeometry, Material } from "three";
import {
  objectCommands,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";

const setSize = function (
  reflector: Reflector,
  config: ReflectorConfig,
  engine: EngineSupport
) {
  reflector
    .getRenderTarget()
    .setSize(
      config.textureHeight || engine.dom.offsetWidth * window.devicePixelRatio,
      config.textureWidth || engine.dom.offsetHeight * window.devicePixelRatio
    );
};

export default defineProcessor<
  ReflectorConfig,
  Reflector,
  EngineSupport,
  ReflectorCompiler
>({
  type: "Reflector",
  config: getReflectorConfig,
  commands: {
    add: (<
      ProcessorCommands<
        ReflectorConfig,
        Reflector,
        EngineSupport,
        ReflectorCompiler
      >
    >objectCommands).add,
    set: {
      ...(<
        ProcessorCommands<
          ReflectorConfig,
          Reflector,
          EngineSupport,
          ReflectorCompiler
        >
      >objectCommands).set,
      textureHeight({ target, config, engine }) {
        setSize(target, config, engine);
      },
      textureWidth({ target, config, engine }) {
        setSize(target, config, engine);
      },
    },
    delete: (<
      ProcessorCommands<
        ReflectorConfig,
        Reflector,
        EngineSupport,
        ReflectorCompiler
      >
    >objectCommands).delete,
  },
  create(config, engine) {
    const reflector = new Reflector(engine.getObjectBySymbol(config.geometry), {
      color: config.color,
      clipBias: config.clipBias,
      textureHeight:
        config.textureHeight ||
        engine.dom.offsetWidth * window.devicePixelRatio,
      textureWidth:
        config.textureWidth ||
        engine.dom.offsetHeight * window.devicePixelRatio,
      multisample: config.multisample,
    });

    return objectCreate(
      reflector,
      config,
      {
        geometry: true,
        clipBias: true,
        color: true,
      },
      engine
    );
  },
  dispose(target) {
    target.geometry = undefined as unknown as BufferGeometry;
    //@ts-ignore
    target.dispose();
    objectDispose(target);
  },
});
