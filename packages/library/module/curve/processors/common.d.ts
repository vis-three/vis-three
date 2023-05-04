import { EngineSupport, ProcessParams } from "@vis-three/middleware";
import { CurveCompiler } from "../CurveCompiler";
export declare const commonRegCommand: {
    reg: RegExp;
    handler({ config, target, processor, engine, compiler, }: ProcessParams<any, any, EngineSupport, CurveCompiler>): void;
};
