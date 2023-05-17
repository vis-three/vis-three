import { EngineSupport } from "@vis-three/middleware";
import { HelperCompiler } from "../HelperCompiler";
import { ObjectHelperConfig } from "../HelperConfig";
import { EventDispatcher } from "@vis-three/core";
import { BoundingBoxHelper, GeometricOriginHelper, LocalAxesHelper } from "../extends";
import { Object3D } from "three";
import { VisHelper } from "../extends/common";
export interface ShapeHelper extends Object3D, VisHelper {
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
declare const _default: import("@vis-three/middleware").Processor<ObjectHelperConfig, ObjectHelper, EngineSupport, HelperCompiler>;
export default _default;
