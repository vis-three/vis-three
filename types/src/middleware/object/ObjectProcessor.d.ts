import { Object3D, Vector3 } from "three";
import { ProcessorCommands, ProcessParams } from "../../core/Processor";
import { EngineSupport } from "../../engine/EngineSupport";
import { IgnoreAttribute } from "../../utils/utils";
import { ObjectConfig } from "./ObjectConfig";
export interface ObjectCacheData {
    lookAtTarget: Vector3 | null;
    updateMatrixWorldFun: ((focus: boolean) => void) | null;
}
export declare const lookAtHandler: <C extends ObjectConfig, O extends Object3D<import("three").Event>>({ target, config, value, engine }: ProcessParams<C, O>) => void;
export declare const addEventHanlder: <C extends ObjectConfig, O extends Object3D<import("three").Event>>({ target, path, value, engine }: ProcessParams<C, O>) => void;
export declare const removeEventHandler: <C extends ObjectConfig, O extends Object3D<import("three").Event>>({ target, path, value }: ProcessParams<C, O>) => void;
export declare const updateEventHandler: <C extends ObjectConfig, O extends Object3D<import("three").Event>>({ target, config, path, engine }: ProcessParams<C, O>) => void;
export declare const addChildrenHanlder: <C extends ObjectConfig, O extends Object3D<import("three").Event>>({ target, config, value, engine }: ProcessParams<C, O>) => void;
export declare const removeChildrenHandler: <C extends ObjectConfig, O extends Object3D<import("three").Event>>({ target, config, value, engine }: ProcessParams<C, O>) => void;
export declare const objectCreate: <C extends ObjectConfig, O extends Object3D<import("three").Event>>(object: O, config: C, filter: import("../../utils/utils").DeepUnion<import("../../utils/utils").DeepPartial<import("../../utils/utils").DeepRecord<C, boolean>>, boolean>, engine: EngineSupport) => O;
export declare const objectDispose: <O extends Object3D<import("three").Event>>(target: O) => void;
export declare type ObjectCommands<C extends ObjectConfig, T extends Object3D> = ProcessorCommands<C, T>;
export declare const objectCommands: ObjectCommands<ObjectConfig, Object3D>;
