import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SkinnedMeshCompiler } from "./SkinnedMeshCompiler";
export * from "./SkinnedMeshConfig";
export * from "./SkinnedMeshCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof SkinnedMeshCompiler;
    rule: import("@vis-three/middleware").Rule<SkinnedMeshCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./SkinnedMeshConfig").SkinnedMeshConfig, import("three").SkinnedMesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]>, import("@vis-three/middleware").EngineSupport, SkinnedMeshCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
