import { ProxyNotice } from "@vis-three/middleware";
import { WaterCompiler } from "./WaterCompiler";
import { validate } from "uuid";
import { ObjectRule } from "@vis-three/module-object";
import { DeepWaterConfig } from "./WaterConfig";
import { Object3D } from "three";

export const WaterRule: ObjectRule<WaterCompiler, DeepWaterConfig, Object3D> =
  function (input: ProxyNotice, compiler, validateFun = validate) {
    ObjectRule(input, compiler, validateFun);
  };
