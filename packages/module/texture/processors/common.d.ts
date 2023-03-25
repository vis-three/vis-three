import { EngineSupport, ProcessParams } from "@vis-three/middleware";
import { TextureCompiler } from "../TextureCompiler";
export declare const needUpdateRegCommand: {
    reg: RegExp;
    handler({ target, key, value, }: ProcessParams<any, any, EngineSupport, TextureCompiler>): void;
};
export declare const urlHanlder: ({ target, value, engine, }: {
    target: any;
    value: string;
    engine: EngineSupport;
}) => void;
