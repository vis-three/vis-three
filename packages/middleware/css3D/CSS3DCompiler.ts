import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { CSS3DAllType } from "./CSS3DConfig";
import CSS3DObjectProcessor from "./processor/CSS3DObjectProcessor";
import CSS3DPlaneProcessor from "./processor/CSS3DPlaneProcessor";
import CSS3DSpriteProcessor from "./processor/CSS3DSpriteProcessor";

export class CSS3DCompiler extends ObjectCompiler<CSS3DAllType, CSS3DObject> {
  MODULE: MODULETYPE = MODULETYPE.CSS3D;

  constructor() {
    super();
  }
}

Compiler.processor(CSS3DPlaneProcessor);
Compiler.processor(CSS3DObjectProcessor);
Compiler.processor(CSS3DSpriteProcessor);
