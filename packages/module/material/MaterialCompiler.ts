import { Compiler } from "@vis-three/middleware";
import { Material } from "three";
import { MaterialAllType } from "./MaterialConfig";

export class MaterialCompiler extends Compiler<MaterialAllType, Material> {
  constructor() {
    super();
  }
}
