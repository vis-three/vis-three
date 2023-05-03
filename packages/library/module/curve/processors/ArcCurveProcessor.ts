import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { CurveCompiler } from "../CurveCompiler";
import { getArcCurveConfig, ArcCurveConfig } from "../CurveConfig";
import { EllipseCurve, Vector2 } from "three";

class ArcCurve extends EllipseCurve {
  private start = new Vector2();
  private end = new Vector2();
  private radius = 0;

  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    radius: number,
    clockwise: boolean
  ) {
    this.start.set(startX, startY);
    this.end.set(endX, endY);
    this.radius = radius;
    this.aClockwise = clockwise;

    const mid = new Vector2((endX + startX) / 2, (endY + startY) / 2);
  }
}

export default defineProcessor<
  ArcCurveConfig,
  ArcCurve,
  EngineSupport,
  CurveCompiler
>({
  type: "ArcCurve",
  config: getArcCurveConfig,
  commands: {
    add: {},
    set: {},
    delete: {},
  },
  create(config, engine) {
    return {};
  },
  dispose() {},
});
