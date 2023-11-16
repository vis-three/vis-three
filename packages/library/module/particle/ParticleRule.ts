import { ProxyNotice, Rule } from "@vis-three/middleware";
import { ParticleCompiler } from "./ParticleCompiler";
import { validate } from "uuid";
import { ObjectRule } from "@vis-three/module-object";
import { RangeParticleConfig } from "./ParticleConfig";
import { Object3D } from "three";

export const ParticleRule: ObjectRule<
  ParticleCompiler,
  RangeParticleConfig,
  Object3D
> = function (input: ProxyNotice, compiler, validateFun = validate) {
  ObjectRule(input, compiler, validateFun);
};
