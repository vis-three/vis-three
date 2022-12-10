import { validate } from "uuid";
import { ProxyNotice, Rule } from "@vis-three/core";
import { CONFIGTYPE } from "../constants/configType";
import { ControlsCompiler } from "./ControlsCompiler";
import { uniqueSymbol } from "../common";

export const ControlsRule: Rule<ControlsCompiler> = function (
  input: ProxyNotice,
  compiler: ControlsCompiler
) {
  Rule(input, compiler, (vid) => {
    return (
      validate(vid) ||
      [
        uniqueSymbol(CONFIGTYPE.TRNASFORMCONTROLS),
        uniqueSymbol(CONFIGTYPE.ORBITCONTROLS),
      ].includes(vid as CONFIGTYPE)
    );
  });
};
