import { defineProcessor, EngineSupport } from "@vis-three/core";
import { Group } from "three";
import { CONFIGTYPE } from "../constants/configType";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import { GroupConfig } from "./GroupConfig";

export default defineProcessor<GroupConfig, Group>({
  configType: CONFIGTYPE.GROUP,
  commands: <ObjectCommands<GroupConfig, Group>>(<unknown>objectCommands),
  create(config: GroupConfig, engine: EngineSupport): Group {
    return objectCreate(new Group(), config, {}, engine);
  },
  dispose: objectDispose,
});
