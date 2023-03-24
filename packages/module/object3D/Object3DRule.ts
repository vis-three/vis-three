import { ProxyNotice } from "../module";
import { Object3D } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { Object3DCompiler } from "./Object3DCompiler";
import { Object3DConfig } from "./Object3DConfig";

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
