import { ProxyNotice } from "@vis-three/core";
import { Points } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { PointsCompiler } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";

export type PointsRule = SolidObjectRule<PointsCompiler, PointsConfig, Points>;

export const PointsRule: PointsRule = function (
  notice: ProxyNotice,
  compiler: PointsCompiler
) {
  ObjectRule(notice, compiler);
};
