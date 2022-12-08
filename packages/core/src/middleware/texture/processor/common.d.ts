import { ProcessParams } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
export declare const needUpdateRegCommand: {
    reg: RegExp;
    handler({ target, key, value }: ProcessParams<any, any>): void;
};
export declare const urlHanlder: ({ target, value, engine, }: {
    target: any;
    value: string;
    engine: EngineSupport;
}) => void;
