import { ProxyNotice, Rule } from "@vis-three/middleware";
import { Object3D } from "three";
import { validate } from "uuid";
import { ObjectCompiler } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";

export type ObjectRule<
  E extends ObjectCompiler<C, O>,
  C extends ObjectConfig,
  O extends Object3D
> = Rule<E>;

/**
 *
 * @param input - 代理通知输入
 * @param compiler - 编译器
 * @param validateFun - 验证规则
 * @returns
 */
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
