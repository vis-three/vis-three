import { ProcessParams } from "../../../core/Processor";
export declare const needUpdateRegCommand: {
    reg: RegExp;
    handler({ target, key, value }: ProcessParams<any, any>): void;
};
