import { ProcessParams } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
export declare const replaceImage: HTMLCanvasElement;
export declare const getResource: <T extends Function>(url: string, engine: EngineSupport, instanceClasses: T | T[]) => HTMLCanvasElement | T;
export declare const needUpdateRegCommand: {
    reg: RegExp;
    handler({ target, key, value }: ProcessParams<any, any>): void;
};
