import { MeshCompiler } from "./MeshCompiler";
import { MeshRule } from "./MeshRule";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof MeshCompiler;
    rule: MeshRule;
    processors: import("@vis-three/middleware").Processor<import("./MeshConfig").MeshConfig, import("three").Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]>, import("@vis-three/middleware").EngineSupport, MeshCompiler>[];
};
export default _default;
