import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CSS3DCompiler } from "./CSS3DCompiler";
import { CSS3DAllType } from "./CSS3DConfig";
import { CSS3DRule } from "./CSS3DRule";

export class CSS3DDataSupport extends ObjectDataSupport<
  CSS3DAllType,
  CSS3DObject,
  CSS3DCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.CSS3D;

  constructor(data?: CompilerTarget<CSS3DAllType>, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(CSS3DRule, data, ignore);
  }
}
