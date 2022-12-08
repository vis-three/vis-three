import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { PassCompiler } from "./PassCompiler";
import { PassConfigAllType } from "./PassConfig";
export declare class PassDataSupport extends DataSupport<PassConfigAllType, Pass, PassCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<PassConfigAllType>);
}
