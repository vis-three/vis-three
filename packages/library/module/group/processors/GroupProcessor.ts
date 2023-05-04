import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";
import { Group } from "three";

import { GroupCompiler } from "../GroupCompiler";
import { getGroupConfig, GroupConfig } from "../GroupConfig";

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
