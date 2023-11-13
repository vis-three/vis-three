import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { ReflectorCompiler } from "../ReflectorCompiler";
import {
  AdvReflectorConfig,
  getAdvReflectorConfig,
  ReflectorConfig,
} from "../ReflectorConfig";
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
  AdvReflectorConfig,
  Reflector,
  EngineSupport,
  ReflectorCompiler
>({
  type: "Reflector",
  config: getAdvReflectorConfig,
  commands: {
    add: (<
      ProcessorCommands<
        AdvReflectorConfig,
        Reflector,
        EngineSupport,
        ReflectorCompiler
      >
    >objectCommands).add,
    set: {
      ...(<
        ProcessorCommands<
          AdvReflectorConfig,
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
      transparent({ target, value }) {
        (<Material>target.material).transparent = value;
        (<Material>target.material).needsUpdate = true;
      },
      opacity({ target, value }) {
        (<Material>target.material).opacity = value;
      },
    },
    delete: (<
      ProcessorCommands<
        AdvReflectorConfig,
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
      //@ts-ignore
      multisample: config.multisample,
    });

    (<Material>reflector.material).transparent = config.transparent;
    (<Material>reflector.material).opacity = config.opacity;
    (<Material>reflector.material).needsUpdate = true;

    return objectCreate(
      reflector,
      config,
      {
        geometry: true,
        clipBias: true,
        color: true,
        transparent: true,
        opacity: true,
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
