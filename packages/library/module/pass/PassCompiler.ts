import {
  EffectComposer,
  Pass,
} from "three/examples/jsm/postprocessing/EffectComposer.js";
import { PassConfigAllType } from "./PassConfig";
import { Compiler, CompilerParameters, EngineSupport } from "@vis-three/tdcm";
import { EffectComposerEngine } from "@vis-three/plugin-effect-composer";

export interface PassModuleEngine extends EngineSupport, EffectComposerEngine {}

export class PassCompiler extends Compiler<PassModuleEngine> {
  private composer!: EffectComposer;

  constructor(params: CompilerParameters<PassModuleEngine>) {
    super(params);
  }

  useEngine(engine): this {
    super.useEngine(engine);

    if (!engine.effectComposer) {
      console.warn(
        `engine need install effectComposer plugin that can use pass compiler.`
      );
      return this;
    }

    this.composer = engine.effectComposer;

    return this;
  }

  add(config: PassConfigAllType) {
    const pass = super.add(config);
    if (pass) {
      if (config.index < 0) {
        this.composer.addPass(pass);
      } else {
        this.composer.insertPass(pass, config.index);
      }
    }
    return pass;
  }

  remove(config: PassConfigAllType): this {
    if (!this.map.has(config.vid)) {
      console.warn(`PassCompiler can not found this vid pass: ${config.vid}.`);
      return this;
    }

    const model = this.map.get(config.vid)!;
    this.composer.removePass(model.puppet);

    super.remove(config);
    return this;
  }
}
