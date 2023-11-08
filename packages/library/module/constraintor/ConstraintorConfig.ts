import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface ConstraintorConfig extends SymbolConfig {
  target: string;
}

export interface NumberConstraintorConfig extends ConstraintorConfig {
  targetAttr: string;
  ref: string;
  refAttr: string;
  offset: {
    operate: string; // "+" | "-" | "*" | "/";
    value: number;
  } | null;
}

export interface BoundingBoxConstraintorConfig extends ConstraintorConfig {
  targetAttr: string;
  ref: string; // geometry
  space: string;
  offset: {
    position: {
      direction: string; //"+" | "-";
      axes: string; //"x" | "y" | "z";
    };
    operate: string; //"+" | "-" | "*" | "/";
    value: number;
  };
}

export const getConstraintorConfig = function (): ConstraintorConfig {
  return Object.assign(getSymbolConfig(), {
    target: "",
  });
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

export const getBoundingBoxConstraintorConfig =
  function (): BoundingBoxConstraintorConfig {
    return Object.assign(getConstraintorConfig(), {
      targetAttr: "",
      ref: "",
      space: "world",
      offset: {
        position: {
          direction: "+",
          axes: "y",
        },
        operate: "+",
        value: 0,
      },
    });
  };
