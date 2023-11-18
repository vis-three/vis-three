import { ProxyNotice, Rule } from "@vis-three/middleware";
import { ParticleCompiler } from "./ParticleCompiler";
import { validate } from "uuid";
import { ObjectRule } from "@vis-three/module-object";
import { Object3D } from "three";
import { FloatParticleConfig } from "./ParticleConfig";

export const ParticleRule: ObjectRule<
  ParticleCompiler,
  FloatParticleConfig,
  Object3D
> = function (input: ProxyNotice, compiler, validateFun = validate) {
  ObjectRule(input, compiler, validateFun);
};
