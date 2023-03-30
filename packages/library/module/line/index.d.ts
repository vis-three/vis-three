import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { LineCompiler } from "./LineCompiler";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof LineCompiler;
    rule: import("@vis-three/middleware").Rule<LineCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./LineConfig").LineConfig, import("three").Line<import("three").BufferGeometry, import("three").Material | import("three").Material[]>, import("@vis-three/middleware").EngineSupport, LineCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
