import { Group } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import { GroupCompiler } from "./GroupCompiler";
import { getGroupConfig, GroupConfig } from "./GroupConfig";

export default defineProcessor<
  GroupConfig,
  Group,
  EngineSupport,
  GroupCompiler
>({
  type: "Group",
  config: getGroupConfig,
  commands: <ObjectCommands<GroupConfig, Group>>(<unknown>objectCommands),
  create(config: GroupConfig, engine: EngineSupport): Group {
    return objectCreate(new Group(), config, {}, engine);
  },
  dispose: objectDispose,
});
