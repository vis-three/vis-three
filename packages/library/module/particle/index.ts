import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ParticleCompiler } from "./ParticleCompiler";
import { ParticleRule } from "./ParticleRule";
import FloatParticleProcessor from "./processors/FloatParticleProcessor";

export default {
  type: "particle",
  object: true,
  compiler: ParticleCompiler,
  rule: ParticleRule,
  processors: [FloatParticleProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
