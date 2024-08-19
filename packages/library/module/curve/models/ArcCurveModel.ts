import { defineModel } from "@vis-three/tdcm";
import { ArcCurveConfig, getArcCurveConfig } from "../CurveConfig";
import { getRegCommand } from "./common";
import { ArcCurve } from "../extends";

export default defineModel<ArcCurveConfig, ArcCurve>({
  type: "ArcCurve",
  config: getArcCurveConfig,
  commands: {
    set: {
      $reg: [getRegCommand()],
    },
  },
  create({ config }) {
    return new ArcCurve(
      config.startX,
      config.startY,
      config.vertical,
      config.clockwise,
      config.endX,
      config.endY
    );
  },
  dispose() {},
});
