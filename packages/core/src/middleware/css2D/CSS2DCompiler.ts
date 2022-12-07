import { Compiler } from "../../core/Compiler";
import { VisCSS2DObject } from "../../optimize/VisCSS2DObject";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { CSS2DAllType } from "./CSS2DConfig";
import CSS2DPlaneProcessor from "./CSS2DPlaneProcessor";

export class CSS2DCompiler extends ObjectCompiler<
  CSS2DAllType,
  VisCSS2DObject
> {
  MODULE: MODULETYPE = MODULETYPE.CSS2D;

  constructor() {
    super();
  }
}

Compiler.processor(CSS2DPlaneProcessor);
