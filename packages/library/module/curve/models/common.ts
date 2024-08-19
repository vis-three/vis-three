import { CommandParameters } from "@vis-three/tdcm";
import { CurveConfig } from "../CurveConfig";
import { Curve, Vector2 } from "three";

const commonRegCommand = {
  reg: new RegExp(".*"),
  handler({
    config,
    target,
    model,
    engine,
    compiler,
  }: CommandParameters<CurveConfig, Curve<Vector2>>) {
    compiler.symbolMap.delete(target);

    model.dispose();

    const newCurve = model.create();

    compiler.symbolMap.set(newCurve, config.vid);
  },
};

export const getRegCommand = function <
  C extends CurveConfig = CurveConfig,
  O extends Curve<Vector2> = Curve<Vector2>
>() {
  return commonRegCommand as unknown as {
    reg: RegExp;
    handler: (params: CommandParameters<C, O>) => void;
  };
};
