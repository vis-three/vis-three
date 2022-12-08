import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { CSS3DAllType } from "./CSS3DConfig";
export declare class CSS3DCompiler extends ObjectCompiler<CSS3DAllType, CSS3DObject> {
    MODULE: MODULETYPE;
    constructor();
}
