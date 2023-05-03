import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { MeshCompiler } from "./MeshCompiler";
import { MeshRule } from "./MeshRule";
export * from "./MeshConfig";
export * from "./MeshCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof MeshCompiler;
    rule: MeshRule;
    processors: import("@vis-three/middleware").Processor<import("./MeshConfig").MeshConfig, import("three").Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]>, import("@vis-three/middleware").EngineSupport, MeshCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
