import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";
import { Bone } from "three";

import { BoneCompiler } from "../BoneCompiler";
import { getBoneConfig, BoneConfig } from "../BoneConfig";

export default defineProcessor<BoneConfig, Bone, EngineSupport, BoneCompiler>({
  type: "Bone",
  config: getBoneConfig,
  commands: <ObjectCommands<BoneConfig, Bone>>(<unknown>objectCommands),
  create(config: BoneConfig, engine: EngineSupport) {
    return objectCreate(new Bone(), config, {}, engine);
  },
  dispose: objectDispose,
});
