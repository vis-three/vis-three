import { BasicConfig, Vector2Config, getBasicConfig } from "@vis-three/tdcm";

export interface CurveConfig extends BasicConfig {
  arcLengthDivisions: number;
}

export interface ArcCurveConfig extends CurveConfig {
  startX: number;
  startY: number;
  vertical: number;
  clockwise: boolean;
  endX: number;
  endY: number;
}

export interface LineCurveConfig extends CurveConfig {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type CurveAllType = LineCurveConfig | ArcCurveConfig;

export const getCurveConfig = function (): CurveConfig {
  return Object.assign(getBasicConfig(), {
    arcLengthDivisions: 200,
  });
};

export const getArcCurveConfig = function (): ArcCurveConfig {
  return Object.assign(getCurveConfig(), {
    startX: 0,
    startY: 0,
    vertical: 5,
    clockwise: false,
    endX: 10,
    endY: 10,
  });
};

export const getLineCurveConfig = function (): LineCurveConfig {
  return Object.assign(getCurveConfig(), {
    startX: 0,
    startY: 0,
    endX: 10,
    endY: 10,
  });
};
