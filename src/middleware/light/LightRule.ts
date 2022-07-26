import { Light } from "three";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { LightCompiler } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";

export type LightRule = ObjectRule<LightCompiler, LightConfigAllType, Light>;

export const LightRule: LightRule = function (
  notice: ProxyNotice,
  compiler: LightCompiler
) {
  ObjectRule(notice, compiler);
};
