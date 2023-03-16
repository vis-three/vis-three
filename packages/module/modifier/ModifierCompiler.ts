import { Compiler } from "@vis-three/middleware";
import { Modifier } from "@vis-three/modifier-base";
import { ModifierAllType } from "./ModifierConfig";

export class ModifierCompiler extends Compiler<ModifierAllType, Modifier> {
  constructor() {
    super();
  }
}
