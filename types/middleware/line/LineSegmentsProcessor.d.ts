import { LineSegments, Object3D } from "three";
import { LineCompiler } from "./LineCompiler";
import { LineSegmentsConfig } from "./LineConfig";
import { Processor } from "./Processor";
export declare class LineSegmentsProcessor implements Processor {
    static replaceObject: Object3D<import("three").Event>;
    private compiler;
    private cacheAutoUpdateMap;
    constructor(compiler: LineCompiler);
    getObject(vid: string): Object3D;
    add(config: LineSegmentsConfig): LineSegments;
    set(): void;
}
