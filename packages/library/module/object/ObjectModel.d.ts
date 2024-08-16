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
export declare const defineObjectModel: <AC extends ObjectConfig = ObjectConfig, AP extends Object3D<import("three").Object3DEventMap> = Object3D<import("three").Object3DEventMap>, AD extends ObjectModelContext = ObjectModelContext, AE extends EngineSupport = EngineSupport, AO extends Compiler<EngineSupport> & Compiler<AE> = Compiler<EngineSupport> & Compiler<AE>>(fun: (abstract: import("@vis-three/tdcm").AbstractModelOption<ObjectConfig, Object3D<import("three").Object3DEventMap>, ObjectModelContext, EngineSupport, Compiler<EngineSupport>, (params: {
    model: Model<ObjectConfig, Object3D> & ObjectModelContext;
    target: Object3D;
    config: ObjectConfig;
    filter: IgnoreAttribute<ObjectConfig>;
    engine: EngineSupport;
}) => void, Function>) => import("@vis-three/tdcm").ModelOption<AC, AP, AD, AE, AO>) => import("@vis-three/tdcm").ModelOption<AC, AP, AD, AE, AO>;
