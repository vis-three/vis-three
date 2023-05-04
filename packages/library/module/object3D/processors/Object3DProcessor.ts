import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  objectCommands,
  ObjectConfig,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";
import { Object3D } from "three";
import { Object3DCompiler } from "../Object3DCompiler";
import { getObject3DConfig } from "../Object3DConfig";

export default defineProcessor<
  ObjectConfig,
  Object3D,
  EngineSupport,
  Object3DCompiler
>({
  type: "Object3D",
  config: getObject3DConfig,
  commands: objectCommands,
  create(config: ObjectConfig, engine: EngineSupport): Object3D {
    return objectCreate(new Object3D(), config, {}, engine);
  },
  dispose: objectDispose,
});
