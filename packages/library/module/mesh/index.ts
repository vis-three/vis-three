import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { MeshCompiler } from "./MeshCompiler";
import MeshProcessor from "./processors/MeshProcessor";
import { MeshRule } from "./MeshRule";

export * from "./MeshConfig";
export * from "./MeshCompiler";

export default {
  type: "mesh",
  object: true,
  compiler: MeshCompiler,
  rule: MeshRule,
  processors: [MeshProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
