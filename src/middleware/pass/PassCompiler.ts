import {
  EffectComposer,
  Pass,
} from "three/examples/jsm/postprocessing/EffectComposer";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
import { PassConfigAllType, UnrealBloomPassConfig } from "./PassConfig";

import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { Vector2 } from "three";

export interface PassCompilerTarget extends CompilerTarget {
  [key: string]: PassConfigAllType;
}

export interface PassCompilerParameters {
  target?: PassCompilerTarget;
  composer?: EffectComposer;
}

export class PassCompiler extends Compiler {
  private target!: PassCompilerTarget;
  private map!: Map<SymbolConfig["type"], Pass>;
  private constructMap: Map<string, (config: PassConfigAllType) => Pass>;

  private composer!: EffectComposer;

  constructor(parameters?: PassCompilerParameters) {
    super();
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.composer && (this.composer = parameters.composer);
    }

    this.map = new Map();

    const constructMap = new Map();

    const pixelRatio = this.composer.renderer.getPixelRatio();
    const width =
      Number(this.composer.renderer.domElement.getAttribute("width")) *
      pixelRatio;

    const height =
      Number(this.composer.renderer.domElement.getAttribute("height")) *
      pixelRatio;

    constructMap.set(CONFIGTYPE.SMAAPASS, () => new SMAAPass(width, height));
    constructMap.set(
      CONFIGTYPE.UNREALBLOOMPASS,
      (config: UnrealBloomPassConfig) =>
        new UnrealBloomPass(
          new Vector2(width, height),
          config.strength,
          config.radius,
          config.threshold
        )
    );

    this.constructMap = constructMap;
  }

  setTarget(target: PassCompilerTarget): this {
    this.target = target;
    return this;
  }

  add(config: PassConfigAllType) {
    if (this.constructMap.has(config.type)) {
      const pass = this.constructMap.get(config.type)!(config);
      this.composer.addPass(pass);
      this.map.set(config.vid, pass);
    } else {
      console.warn(
        `pass compiler can not support this type pass: ${config.type}.`
      );
    }
  }

  /**
   * @todo
   */
  set() {}

  remove(vid: string): this {
    if (!this.map.has(vid)) {
      console.warn(`pass compiler can not found this vid pass: ${vid}.`);
      return this;
    }

    const pass = this.map.get(vid)!;
    this.composer.removePass(pass);
    this.map.delete(vid);
    return this;
  }

  compileAll(): this {
    const target = this.target;
    for (const config of Object.values(target)) {
      this.add(config);
    }
    return this;
  }

  dispose(): this {
    return this;
  }
}
