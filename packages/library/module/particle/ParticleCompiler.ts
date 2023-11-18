import { ObjectCompiler } from "@vis-three/module-object";
import { FloatParticle } from "./extends/FloatParticle";
import { FloatParticleConfig } from "./ParticleConfig";

export class ParticleCompiler extends ObjectCompiler<
  FloatParticleConfig,
  FloatParticle
> {
  constructor() {
    super();
  }
}
