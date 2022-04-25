import { Light } from "three";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { LightCompiler, LightCompilerTarget } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";

export type LightRule = ObjectRule<
  LightCompiler,
  LightConfigAllType,
  LightCompilerTarget,
  Light
>;

export const LightRule: LightRule = function (
  notice: ProxyNotice,
  compiler: LightCompiler
) {
  ObjectRule(notice, compiler);
};
