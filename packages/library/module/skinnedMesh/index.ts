import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SkinnedMeshCompiler } from "./SkinnedMeshCompiler";
import { SkinnedMeshRule } from "./SkinnedMeshRule";
import SkinnedMeshProcessor from "./processors/SkinnedMeshProcessor";

export * from "./SkinnedMeshConfig";
export * from "./SkinnedMeshCompiler";

export default {
  type: "skinnedMesh",
  object: true,
  compiler: SkinnedMeshCompiler,
  rule: SkinnedMeshRule,
  processors: [SkinnedMeshProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
