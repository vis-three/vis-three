import { validate } from "uuid";
import { CONFIGTYPE } from "../constants/configType";
import { ControlsCompiler } from "./ControlsCompiler";
import { uniqueSymbol } from "../common";
import { ProxyNotice, Rule } from "../module";

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
