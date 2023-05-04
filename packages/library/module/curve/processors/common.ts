import { EngineSupport, ProcessParams } from "@vis-three/middleware";
import { CurveCompiler } from "../CurveCompiler";

export const commonRegCommand = {
  reg: new RegExp(".*"),
  handler({
    config,
    target,
    processor,
    engine,
    compiler,
  }: ProcessParams<any, any, EngineSupport, CurveCompiler>) {
    const newCurve = processor.create(config, engine, compiler);

    compiler.map.set(config.vid, newCurve);
    compiler.weakMap.set(newCurve, config.vid);
    compiler.weakMap.delete(target);

    processor.dispose(target, engine, compiler);
  },
};
