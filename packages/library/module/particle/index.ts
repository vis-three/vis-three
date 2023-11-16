import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ParticleCompiler } from "./ParticleCompiler";
import { ParticleRule } from "./ParticleRule";
import RangeParticleProcessor from "./processors/RangeParticleProcessor";

export default {
  type: "particle",
  object: true,
  compiler: ParticleCompiler,
  rule: ParticleRule,
  processors: [RangeParticleProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
