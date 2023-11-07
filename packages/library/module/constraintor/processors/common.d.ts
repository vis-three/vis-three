import { EngineSupport, ProcessParams } from "@vis-three/middleware";
import { ConstraintorCompiler } from "../ConstraintorCompiler";
export declare const commonRegCommand: {
    reg: RegExp;
    handler(params: ProcessParams<any, any, EngineSupport, ConstraintorCompiler>): void;
};
