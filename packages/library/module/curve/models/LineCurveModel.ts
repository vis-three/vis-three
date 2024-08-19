import { defineModel } from "@vis-three/tdcm";
import { getLineCurveConfig, LineCurveConfig } from "../CurveConfig";
import { getRegCommand } from "./common";
import { LineCurve, Vector2 } from "three";

export default defineModel<LineCurveConfig, LineCurve>({
  type: "LineCurve",
  config: getLineCurveConfig,
  commands: {
    set: {
      $reg: [getRegCommand()],
    },
  },
  create({ config }) {
    return new LineCurve(
      new Vector2(config.startX, config.startY),
      new Vector2(config.endX, config.endY)
    );
  },
  dispose() {},
});
