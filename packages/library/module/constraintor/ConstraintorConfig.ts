import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface ConstraintorConfig extends SymbolConfig {}

export interface NumberConstraintorConfig extends ConstraintorConfig {
  target: string;
  targetAttr: string;
  ref: string;
  refAttr: string;
  offset: {
    operate: "+" | "-" | "*" | "/";
    value: number;
  } | null;
}

export interface BoundingBoxConstraintorConfig extends ConstraintorConfig {
  target: string;
  targetAttr: string;
  ref: string; // geometry
  offset: {
    position: {
      direction: "+" | "-";
      axes: "x" | "y" | "z";
    };
    operate: "+" | "-" | "*" | "/";
    value: number;
  };
}

export const getConstraintorConfig = function (): ConstraintorConfig {
  return Object.assign(getSymbolConfig(), {});
};

export const getNumberConstraintorConfig =
  function (): NumberConstraintorConfig {
    return Object.assign(getConstraintorConfig(), {
      target: "",
      targetAttr: "",
      ref: "",
      refAttr: "",
      offset: null,
    });
  };

export const getBoundingBoxConstraintorConfig = function () {};
