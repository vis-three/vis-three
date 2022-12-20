import { Object3D } from "three";
import { validate } from "uuid";
import { ProxyNotice, Rule } from "../module";
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
>(input: ProxyNotice, compiler: E, validateFun = validate) {
  if (input.key === "parent") {
    return;
  }

  Rule(input, compiler, validateFun);
};
