import { LightCompiler } from "./LightCompiler";
import { LightRule } from "./LightRule";
import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
export * from "./LightConfig";
export * from "./LightCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof LightCompiler;
    rule: LightRule;
    processors: (import("@vis-three/middleware").Processor<import("./LightConfig").LightConifg, import("three").AmbientLight, import("@vis-three/middleware").EngineSupport, LightCompiler> | import("@vis-three/middleware").Processor<import("./LightConfig").DirectionalLightConfig, import("three").DirectionalLight, import("@vis-three/middleware").EngineSupport, LightCompiler> | import("@vis-three/middleware").Processor<import("./LightConfig").HemisphereLightConfig, import("three").HemisphereLight, import("@vis-three/middleware").EngineSupport, LightCompiler> | import("@vis-three/middleware").Processor<import("./LightConfig").PointLightConfig, import("three").PointLight, import("@vis-three/middleware").EngineSupport, LightCompiler> | import("@vis-three/middleware").Processor<import("./LightConfig").RectAreaLightConfig, import("three").RectAreaLight, import("@vis-three/middleware").EngineSupport, LightCompiler> | import("@vis-three/middleware").Processor<import("./LightConfig").SpotLightConfig, import("three").SpotLight, import("@vis-three/middleware").EngineSupport, LightCompiler>)[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
