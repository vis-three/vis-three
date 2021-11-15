import { CompilerTarget } from "../../middleware/Compiler";
import { TextureAllType } from "./TextureConfig";

export interface TextureCompilerTarget extends CompilerTarget {
  [key: string]: TextureAllType
}
