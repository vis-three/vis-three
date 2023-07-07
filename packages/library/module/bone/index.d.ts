import { BoneCompiler } from "./BoneCompiler";
import { BoneRule } from "./BoneRule";
export * from "./BoneCompiler";
export * from "./BoneConfig";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof BoneCompiler;
    rule: BoneRule;
    processors: import("@vis-three/middleware").Processor<import("./BoneConfig").BoneConfig, import("three").Bone, import("@vis-three/middleware").EngineSupport, BoneCompiler>[];
    lifeOrder: number;
};
export default _default;
