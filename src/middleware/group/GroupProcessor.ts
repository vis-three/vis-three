import { Group } from "three";
import { defineProcessor } from "../../core/Processor";
import { EngineSupport } from "../../engine/EngineSupport";
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
