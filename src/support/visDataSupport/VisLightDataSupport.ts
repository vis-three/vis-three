import { VisLightCompiler, VisLightCompileTarget } from "../../visCompiler/VisLightCompiler";
import { rule } from "../../visRule/VisLightRule";
import { VisDataSupport } from "./VisDataSupport";

export class VisLightDataSupport extends VisDataSupport<VisLightCompileTarget, VisLightCompiler> {
  constructor (data: VisLightCompileTarget) {
    super(rule, data)
  }
}