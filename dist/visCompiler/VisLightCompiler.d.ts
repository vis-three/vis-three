import { VisLightConfigType } from "../visObject/VisLight";
import { VisScene } from "../visCore/VisScene";
import { VisCompiler, VisCompilerTarget } from "./VisCompiler";
export interface VisLightCompileTarget extends VisCompilerTarget {
    [key: string]: VisLightConfigType;
}
export declare class VisLightCompiler implements VisCompiler {
    private scene;
    private target;
    private map;
    constructor(scene: VisScene, target: VisLightCompileTarget);
    initCompile(): this;
    disposeCompile(): this;
    add(vid: string, type: string): this;
}
//# sourceMappingURL=VisLightCompiler.d.ts.map