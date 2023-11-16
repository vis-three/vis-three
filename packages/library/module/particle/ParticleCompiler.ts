import { ObjectCompiler } from "@vis-three/module-object";
import { RangeParticle } from "./extends/RangeParticle";
import { RangeParticleConfig } from "./ParticleConfig";

export class ParticleCompiler extends ObjectCompiler<
  RangeParticleConfig,
  RangeParticle
> {
  constructor() {
    super();
  }
}
