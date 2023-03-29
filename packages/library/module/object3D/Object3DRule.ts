import { ProxyNotice } from "@vis-three/middleware";
import { Object3D } from "three";
import { Object3DCompiler } from "./Object3DCompiler";
import { Object3DConfig } from "./Object3DConfig";
import { ObjectRule } from "@vis-three/module-object";

export type Object3DRule = ObjectRule<
  Object3DCompiler,
  Object3DConfig,
  Object3D
>;

export const Object3DRule: Object3DRule = function (
  notice: ProxyNotice,
  compiler: Object3DCompiler
) {
  ObjectRule(notice, compiler);
};
