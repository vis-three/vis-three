import { EngineSupport } from "@vis-three/tdcm";
import { ConstraintorCompiler } from "../ConstraintorCompiler";

export const commonRegCommand = {
  reg: new RegExp(".*"),
  handler(
    params: ProcessParams<any, any, EngineSupport, ConstraintorCompiler>
  ) {
    params.processor.set(params);
    params.target.constrain();
  },
};
