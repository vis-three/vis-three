import { BufferGeometry, Material, Points } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, SolidObjectCompilerParameters, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { PointsConfig } from "./PointsConfig";
export interface PointsCompilerTarget extends SolidObjectCompilerTarget<PointsConfig> {
    [key: string]: PointsConfig;
}
export declare type PointsCompilerParameters = SolidObjectCompilerParameters<PointsConfig, PointsCompilerTarget>;
export declare class PointsCompiler extends SolidObjectCompiler<PointsConfig, PointsCompilerTarget, Points> {
    COMPILER_NAME: MODULETYPE;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parameters?: PointsCompilerParameters);
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    add(vid: string, config: PointsConfig): this;
    dispose(): this;
}
