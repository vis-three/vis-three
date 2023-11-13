import { ProxyNotice } from "@vis-three/middleware";
import { ReflectorCompiler } from "./ReflectorCompiler";
import { validate } from "uuid";
import { ObjectRule } from "@vis-three/module-object";
import { ReflectorConfig } from "./ReflectorConfig";
import { Reflector } from "three/examples/jsm/objects/Reflector";

export const ReflectorRule: ObjectRule<
  ReflectorCompiler,
  ReflectorConfig,
  Reflector
> = function (input: ProxyNotice, compiler, validateFun = validate) {
  ObjectRule(input, compiler, validateFun);
};
