import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ParticleCompiler } from "./ParticleCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof ParticleCompiler;
    rule: import("@vis-three/module-object").ObjectRule<ParticleCompiler, import("./ParticleConfig").RangeParticleConfig, import("three").Object3D<import("three").Event>>;
    processors: import("@vis-three/middleware").Processor<import("./ParticleConfig").RangeParticleConfig, import("./extends/RangeParticle").RangeParticle, import("@vis-three/middleware").EngineSupport, ParticleCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
