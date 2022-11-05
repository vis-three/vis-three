import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CSS3DCompiler } from "./CSS3DCompiler";
import { CSS3DAllType } from "./CSS3DConfig";
export declare class CSS3DDataSupport extends ObjectDataSupport<
  CSS3DAllType,
  CSS3DObject,
  CSS3DCompiler
> {
  MODULE: MODULETYPE;
  constructor(data?: CompilerTarget<CSS3DAllType>, ignore?: IgnoreAttribute);
}
