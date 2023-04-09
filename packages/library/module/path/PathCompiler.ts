import { CompileNotice, Compiler } from "@vis-three/middleware";
import { PathConfig } from "./PathConfig";

export class PathCompiler extends Compiler<PathConfig, object> {
  constructor() {
    super();
  }

  compile(vid: string, notice: CompileNotice): this {
    super.compile(vid, notice)
    
    return this
  }
}
