import { validate } from "uuid";
import { ProxyNotice } from "../../core/DataContainer";
import { Rule } from "../../core/Rule";
import { CONFIGTYPE } from "../constants/configType";
import { uniqueSymbol } from "../../core/middleware/UNIQUESYMBOL";
import { ControlsCompiler } from "./ControlsCompiler";

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
