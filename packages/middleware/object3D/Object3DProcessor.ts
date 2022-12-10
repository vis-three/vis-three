import { defineProcessor, EngineSupport } from "@vis-three/core";
import { Object3D } from "three";
import { CONFIGTYPE } from "../constants/configType";
import { ObjectConfig } from "../object/ObjectConfig";
import {
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";

export default defineProcessor<ObjectConfig, Object3D>({
  configType: CONFIGTYPE.OBJECT3D,
  commands: objectCommands,
  create(config: ObjectConfig, engine: EngineSupport): Object3D {
    return objectCreate(new Object3D(), config, {}, engine);
  },
  dispose: objectDispose,
});
