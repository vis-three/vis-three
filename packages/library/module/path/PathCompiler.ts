import { CompileNotice, Compiler } from "@vis-three/middleware";
import { PathConfig } from "./PathConfig";
import { Path } from "three";

export class PathCompiler extends Compiler<PathConfig, Path> {
  constructor() {
    super();
  }

  compile(vid: string, notice: CompileNotice): this {
    super.compile(vid, notice);

    return this;
  }
}
