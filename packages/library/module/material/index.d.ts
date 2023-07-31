import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { MaterialCompiler } from "./MaterialCompiler";
export * from "./MaterialCompiler";
export * from "./MaterialConfig";
declare const _default: {
    type: string;
    compiler: typeof MaterialCompiler;
    rule: import("@vis-three/middleware").Rule<MaterialCompiler>;
    processors: (import("@vis-three/middleware").Processor<import("./MaterialConfig").MeshBasicMaterialConfig, import("three").MeshBasicMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").MeshPhongMaterialConfig, import("three").MeshPhongMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").MeshPhysicalMaterialConfig, import("three").MeshPhysicalMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").MeshStandardMaterialConfig, import("three").MeshStandardMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").PointsMaterialConfig, import("three").PointsMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").ShaderMaterialConfig, import("three").ShaderMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").SpriteMaterialConfig, import("three").SpriteMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").LineBasicMaterialConfig, import("three").LineBasicMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").LineDashedMaterialConfig, import("three").LineDashedMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler> | import("@vis-three/middleware").Processor<import("./MaterialConfig").MeshMatcapMaterialConfig, import("three").MeshMatcapMaterial, import("@vis-three/middleware").EngineSupport, MaterialCompiler>)[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
