import { ObjectCompiler } from "@vis-three/module-object";
import { CSS2DAllType } from "./CSS2DConfig";
import { VisCSS2DObject } from "./extends/VisCSS2DObject";

export class CSS2DCompiler extends ObjectCompiler<
  CSS2DAllType,
  VisCSS2DObject
> {
  constructor() {
    super();
  }
}
