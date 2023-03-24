import { ProxyNotice } from "@vis-three/middleware";
import { SolidObjectRule } from "@vis-three/module-solid-object";
import { ObjectRule } from "@vis-three/module-object";
import { Points } from "three";
import { PointsCompiler } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";

export type PointsRule = SolidObjectRule<PointsCompiler, PointsConfig, Points>;

export const PointsRule: PointsRule = function (
  notice: ProxyNotice,
  compiler: PointsCompiler
) {
  ObjectRule(notice, compiler);
};
