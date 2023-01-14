import { DataSupport, MODULETYPE } from "@vis-three/middleware";
import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { PassCompiler } from "./PassCompiler";
import { PassConfigAllType } from "./PassConfig";
export declare class PassDataSupport extends DataSupport<PassConfigAllType, Pass, PassCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<PassConfigAllType>);
}
