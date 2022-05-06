import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { CSS3DAllType } from "./CSS3DConfig";
export interface CSS3DCompilerTarget extends ObjectCompilerTarget<CSS3DAllType> {
    [key: string]: CSS3DAllType;
}
export declare class CSS3DCompiler extends ObjectCompiler<CSS3DAllType, CSS3DCompilerTarget, CSS3DObject> {
    COMPILER_NAME: string;
    private resourceMap;
    private constructMap;
    constructor();
    private getElement;
    linkRescourceMap(map: Map<string, unknown>): this;
    add(vid: string, config: CSS3DAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
}
