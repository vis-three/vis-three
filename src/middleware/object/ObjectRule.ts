import { Object3D } from "three";
import { ProxyNotice } from "../../core/DataContainer";
import { Rule } from "../../core/Rule";
import { ObjectCompiler } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";

export type ObjectRule<
  E extends ObjectCompiler<C, O>,
  C extends ObjectConfig,
  O extends Object3D
> = Rule<E>;

export const ObjectRule = function <
  E extends ObjectCompiler<C, O>,
  C extends ObjectConfig,
  O extends Object3D
>(input: ProxyNotice, compiler: E) {
  if (input.key === "parent") {
    return;
  }

  Rule(input, compiler);
};
