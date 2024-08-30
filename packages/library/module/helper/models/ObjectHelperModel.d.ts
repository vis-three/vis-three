import { EventDispatcher } from "@vis-three/core";
import { Compiler, EngineSupport, Model } from "@vis-three/tdcm";
import { Object3D } from "three";
import { VisHelper } from "../extends/common";
import { BoundingBoxHelper, GeometricOriginHelper, LocalAxesHelper } from "../extends";
import { ObjectHelperConfig } from "../HelperConfig";
export interface ShapeHelper extends VisHelper {
}
export declare class ObjectHelper extends EventDispatcher {
    target?: Object3D;
    shape?: ShapeHelper;
    boundingBox?: BoundingBoxHelper;
    geometricOrigin?: GeometricOriginHelper;
    localAxes?: LocalAxesHelper;
    private shapeMap;
    constructor();
    generateShape(): void;
    generateBoundingBox(): void;
    generateGeometricOrigin(): void;
    generateLocalAxes(): void;
    dispose(params?: string): void;
}
export interface ObjectHelperModelContext {
    helperEventMap: Record<string, () => void>;
}
export interface ObjectHelperModelShared {
    addHelper: (helper: string, target: ObjectHelper, config: ObjectHelperConfig, model: Model<ObjectHelperConfig, ObjectHelper, EngineSupport, Compiler<EngineSupport>> & ObjectHelperModelContext & Readonly<ObjectHelperModelShared>) => void;
    removeHelper: (helper: string, target: ObjectHelper, config: ObjectHelperConfig, model: Model<ObjectHelperConfig, ObjectHelper, EngineSupport, Compiler<EngineSupport>> & ObjectHelperModelContext & Readonly<ObjectHelperModelShared>) => void;
}
declare const _default: import("@vis-three/tdcm").ModelOption<ObjectHelperConfig, ObjectHelper, ObjectHelperModelContext, ObjectHelperModelShared, EngineSupport, Compiler<EngineSupport>>;
export default _default;
