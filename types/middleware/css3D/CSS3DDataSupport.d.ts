import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CSS3DCompiler, CSS3DCompilerTarget } from "./CSS3DCompiler";
import { CSS3DAllType } from "./CSS3DConfig";
import { CSS3DRule } from "./CSS3DRule";
export declare class CSS3DDataSupport extends ObjectDataSupport<CSS3DRule, CSS3DCompiler, CSS3DAllType, CSS3DCompilerTarget, CSS3DObject> {
    MODULE: MODULETYPE;
    constructor(data?: CSS3DCompilerTarget, ignore?: IgnoreAttribute);
}
