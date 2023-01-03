import { Object3D } from "three";
import { CONFIGTYPE } from "../constants/CONFIGTYPE";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import { ObjectConfig } from "../object/ObjectConfig";
import {
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";

export default defineProcessor<ObjectConfig, Object3D, EngineSupport>({
  configType: CONFIGTYPE.OBJECT3D,
  commands: objectCommands,
  create(config: ObjectConfig, engine: EngineSupport): Object3D {
    return objectCreate(new Object3D(), config, {}, engine);
  },
  dispose: objectDispose,
});
