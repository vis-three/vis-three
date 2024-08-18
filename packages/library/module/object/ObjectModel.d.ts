import { CommandParameters, Compiler, EngineSupport, Model } from "@vis-three/tdcm";
import { ObjectConfig } from "./ObjectConfig";
import { Object3D, Vector3 } from "three";
import { IgnoreAttribute } from "@vis-three/utils";
export interface ObjectModelContext {
    cacheLookAt: {
        target: Vector3 | null;
        updateMatrixWorld: ((focus: boolean) => void) | null;
    };
    eventSymbol: string;
    emptyRaycast: () => void;
}
export type ObjectCommandParameters = CommandParameters<ObjectConfig, Object3D, EngineSupport, Compiler<EngineSupport>, Model<ObjectConfig, Object3D> & ObjectModelContext>;
export type ObjectCommandHandler = (this: Model<ObjectConfig, Object3D> & ObjectModelContext, params: ObjectCommandParameters) => void;
export type ObjectModel = Model<ObjectConfig, Object3D> & ObjectModelContext;
export declare const defineObjectModel: <ACf extends ObjectConfig = ObjectConfig, AObj extends Object3D<import("three").Object3DEventMap> = Object3D<import("three").Object3DEventMap>, ACtx extends object = object, ASrd extends object = object, AEg extends EngineSupport = EngineSupport, ACpl extends Compiler<AEg> = Compiler<AEg>>(fun: (abstract: import("@vis-three/tdcm").AbstractModelOption<ObjectConfig, Object3D<import("three").Object3DEventMap>, ObjectModelContext, {}, EngineSupport, Compiler<EngineSupport>, <I extends ObjectConfig = ObjectConfig>(params: {
    model: Model<ObjectConfig, Object3D> & ObjectModelContext;
    target: Object3D;
    config: ObjectConfig;
    filter: IgnoreAttribute<I>;
    engine: EngineSupport;
}) => void, Function>) => import("@vis-three/tdcm").ModelOption<ACf, AObj, ACtx, ASrd, AEg, ACpl>) => import("@vis-three/tdcm").ModelOption<ACf, AObj, ObjectModelContext & ACtx, {} & ASrd, AEg, ACpl>;
