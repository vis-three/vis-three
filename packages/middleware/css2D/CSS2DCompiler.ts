import { VisCSS2DObject } from "@vis-three/core";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { CSS2DAllType } from "./CSS2DConfig";

export class CSS2DCompiler extends ObjectCompiler<
  CSS2DAllType,
  VisCSS2DObject
> {
  constructor() {
    super();
  }
}
