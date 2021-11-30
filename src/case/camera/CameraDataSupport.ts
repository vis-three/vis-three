import { DataSupport } from "../../middleware/DataSupport";
import { CameraCompiler, CameraCompilerTarget } from "./CameraCompiler";
import { CameraRule } from "./CameraRule";

export class CameraDataSupport extends DataSupport<CameraCompilerTarget, CameraCompiler> {
  constructor (data?: CameraCompilerTarget) {
    !data && (data = {})
    super(CameraRule, data)
  }
}