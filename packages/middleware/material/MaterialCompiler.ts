import { Compiler } from "../module";
import { Material } from "three";
import { MaterialAllType } from "./MaterialConfig";

export class MaterialCompiler extends Compiler<MaterialAllType, Material> {
  constructor() {
    super();
  }
}
