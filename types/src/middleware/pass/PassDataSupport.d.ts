import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { PassCompiler } from "./PassCompiler";
import { PassConfigAllType } from "./PassConfig";
export declare class PassDataSupport extends DataSupport<PassConfigAllType, Pass, PassCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: CompilerTarget<PassConfigAllType>, ignore?: IgnoreAttribute);
}
