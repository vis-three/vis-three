import { Object3D } from "three";
import { Engine } from "../../engine/Engine";
import { BasicAction } from "./Action";
export interface SectionActionParameters {
    oldObjects: Object3D[];
    newObjects: Object3D[];
    engine: Engine;
}
export declare class SectionAction implements BasicAction {
    private oldObjects;
    private newObjects;
    private engine;
    private impact;
    constructor(parameters: SectionActionParameters);
    next(): void;
    prev(): void;
}
