import { VisCSS2DObject } from "@vis-three/core";
import { ProxyNotice } from "@vis-three/middleware";
import { ObjectRule } from "@vis-three/module-object";
import { CSS2DCompiler } from "./CSS2DCompiler";
import { CSS2DAllType } from "./CSS2DConfig";

export type CSS2DRule = ObjectRule<CSS2DCompiler, CSS2DAllType, VisCSS2DObject>;

export const CSS2DRule: CSS2DRule = function (
  notice: ProxyNotice,
  compiler: CSS2DCompiler
) {
  ObjectRule(notice, compiler);
};
