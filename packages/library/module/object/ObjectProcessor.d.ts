import { EngineSupport, ProcessorCommands } from "@vis-three/middleware";
import { IgnoreAttribute } from "@vis-three/utils";
import { Object3D, Vector3 } from "three";
import { ObjectCompiler } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";
export interface ObjectCacheData {
    lookAtTarget: Vector3 | null;
    updateMatrixWorldFun: ((focus: boolean) => void) | null;
}
export declare const lookAtHandler: <C extends ObjectConfig, O extends Object3D<import("three").Object3DEventMap>>({ target, config, value, engine, }: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) => void;
export declare const addEventHanlder: <C extends ObjectConfig, O extends Object3D<import("three").Object3DEventMap>>({ target, path, value, engine, }: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) => void;
export declare const removeEventHandler: <C extends ObjectConfig, O extends Object3D<import("three").Object3DEventMap>>({ target, path, value, }: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) => void;
export declare const updateEventHandler: <C extends ObjectConfig, O extends Object3D<import("three").Object3DEventMap>>({ target, config, path, engine, }: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) => void;
export declare const addChildrenHanlder: <C extends ObjectConfig, O extends Object3D<import("three").Object3DEventMap>>({ target, config, value, engine, }: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) => void;
export declare const removeChildrenHandler: <C extends ObjectConfig, O extends Object3D<import("three").Object3DEventMap>>({ target, config, value, engine, }: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) => void;
export declare const raycastHandler: <C extends ObjectConfig, O extends Object3D<import("three").Object3DEventMap>>({ target, config, value, engine, }: ProcessParams<C, O, EngineSupport, ObjectCompiler<C, O>>) => void;
export declare const objectCreate: <C extends ObjectConfig, O extends Object3D<import("three").Object3DEventMap>>(object: O, config: C, filter: IgnoreAttribute<C>, engine: EngineSupport) => O;
export declare const objectDispose: <O extends Object3D<import("three").Object3DEventMap>>(target: O) => void;
export type ObjectCommands<C extends ObjectConfig, T extends Object3D> = ProcessorCommands<C, T, EngineSupport, ObjectCompiler<C, T>>;
export declare const objectCommands: ObjectCommands<ObjectConfig, Object3D>;
