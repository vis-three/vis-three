import { Object3D } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import { ObjectConfig } from "../object/ObjectConfig";
import {
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import { Object3DCompiler } from "./Object3DCompiler";
import { getObject3DConfig } from "./Object3DConfig";

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
