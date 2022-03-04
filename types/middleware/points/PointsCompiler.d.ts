import { BufferGeometry, Material, Points } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { PointsConfig } from "./PointsConfig";
export interface PointsCompilerTarget extends ObjectCompilerTarget<PointsConfig> {
    [key: string]: PointsConfig;
}
export interface PointsCompilerParameters extends ObjectCompilerParameters<PointsConfig, PointsCompilerTarget> {
}
export declare class PointsCompiler extends ObjectCompiler<PointsConfig, PointsCompilerTarget, Points> {
    COMPILER_NAME: MODULETYPE;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parameters?: PointsCompilerParameters);
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: PointsConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    dispose(): this;
}
