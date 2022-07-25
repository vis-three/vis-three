import { Object3D } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { EVENTNAME } from "../../manager/EventManager";
import { UNIQUESYMBOL } from "../constants/UNIQUESYMBOL";
import { ObjectCompiler, ObjectCompilerTarget } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";

export type ObjectRule<
  E extends ObjectCompiler<C, T, O>,
  C extends ObjectConfig,
  T extends ObjectCompilerTarget<C>,
  O extends Object3D
> = Rule<E>;

export const ObjectRule = function <
  E extends ObjectCompiler<C, T, O>,
  C extends ObjectConfig,
  T extends ObjectCompilerTarget<C>,
  O extends Object3D
>(input: ProxyNotice, compiler: E) {
  if (input.key === "parent") {
    return;
  }

  Rule(input, compiler);
};
