import { DataSupport } from "../../core/DataSupport";
import { MeshCompiler, MeshCompilerTarget } from "./MeshCompiler";
import { MeshRule } from "./MeshRule";

export class MeshDataSupport extends DataSupport<MeshCompilerTarget, MeshCompiler> {
  constructor (data?: MeshCompilerTarget) {
    !data && (data = {})
    super(MeshRule, data)
  }
}