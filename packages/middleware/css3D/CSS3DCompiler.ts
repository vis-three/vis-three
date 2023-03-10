import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { CSS3DAllType } from "./CSS3DConfig";

export class CSS3DCompiler extends ObjectCompiler<CSS3DAllType, CSS3DObject> {
  constructor() {
    super();
  }
}
