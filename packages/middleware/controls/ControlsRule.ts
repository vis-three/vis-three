import { validate } from "uuid";
import { CONFIGTYPE } from "../constants/configType";
import { ControlsCompiler } from "./ControlsCompiler";
import { uniqueSymbol } from "../common";
import { ProxyNotice, Rule } from "../module";

const symbols = [
  uniqueSymbol(CONFIGTYPE.TRNASFORMCONTROLS),
  uniqueSymbol(CONFIGTYPE.ORBITCONTROLS),
];

export const ControlsRule: Rule<ControlsCompiler> = function (
  input: ProxyNotice,
  compiler: ControlsCompiler
) {
  Rule(input, compiler, (vid) => {
    return validate(vid) || symbols.includes(vid as CONFIGTYPE);
  });
};
