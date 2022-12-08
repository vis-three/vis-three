import { Material } from "three";
import { ProcessParams } from "../../../core/Processor";
import { MaterialConfig } from "../MaterialConfig";
export declare const commonNeedUpdatesRegCommand: {
    reg: RegExp;
    handler<T extends Material, C extends MaterialConfig>({ target, key, value, }: ProcessParams<C, T>): void;
};
export declare const mapHandler: <T extends Material, C extends MaterialConfig>({ target, key, value, engine }: ProcessParams<C, T>) => void;
export declare const commonMapRegCommand: {
    reg: RegExp;
    handler: <T extends Material, C extends MaterialConfig>({ target, key, value, engine }: ProcessParams<C, T>) => void;
};
export declare const colorSetHandler: <T extends Material, C extends MaterialConfig>({ target, key, value }: ProcessParams<C, T>) => void;
export declare const create: <T extends Material, C extends MaterialConfig>(target: T, config: C, engine: EngineSupport) => T;
export declare const dispose: <T extends Material>(target: T) => void;
