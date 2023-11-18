import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ParticleCompiler } from "./ParticleCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof ParticleCompiler;
    rule: import("@vis-three/module-object").ObjectRule<ParticleCompiler, import("./ParticleConfig").FloatParticleConfig, import("three").Object3D<import("three").Event>>;
    processors: import("@vis-three/middleware").Processor<import("./ParticleConfig").FloatParticleConfig, import("./extends/FloatParticle").FloatParticle, import("@vis-three/middleware").EngineSupport, ParticleCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
