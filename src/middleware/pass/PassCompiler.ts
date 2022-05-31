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
import { EngineSupport } from "../../engine/EngineSupport";
import { MODULETYPE } from "../constants/MODULETYPE";

export interface PassCompilerTarget extends CompilerTarget {
  [key: string]: PassConfigAllType;
}

export class PassCompiler extends Compiler {
  MODULE: MODULETYPE = MODULETYPE.PASS;

  private target!: PassCompilerTarget;
  private map: Map<SymbolConfig["vid"], Pass>;
  private weakMap: WeakMap<Pass, SymbolConfig["vid"]>;
  private constructMap: Map<string, (config: PassConfigAllType) => Pass>;

  private composer!: EffectComposer;

  private width: number = window.innerWidth * window.devicePixelRatio;
  private height: number = window.innerHeight * window.devicePixelRatio;

  constructor() {
    super();

    this.map = new Map();
    this.weakMap = new WeakMap();

    const constructMap = new Map();
    constructMap.set(
      CONFIGTYPE.SMAAPASS,
      () => new SMAAPass(this.width, this.height)
    );
    constructMap.set(
      CONFIGTYPE.UNREALBLOOMPASS,
      (config: UnrealBloomPassConfig) =>
        new UnrealBloomPass(
          new Vector2(this.width, this.height),
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

  useEngine(engine: EngineSupport): this {
    if (!engine.effectComposer) {
      console.warn(
        `engine need install effectComposer plugin that can use pass compiler.`
      );
      return this;
    }
    this.composer = engine.effectComposer;

    const pixelRatio = this.composer.renderer.getPixelRatio();
    this.width =
      Number(this.composer.renderer.domElement.getAttribute("width")) *
      pixelRatio;

    this.height =
      Number(this.composer.renderer.domElement.getAttribute("height")) *
      pixelRatio;
    return this;
  }

  add(config: PassConfigAllType) {
    if (this.constructMap.has(config.type)) {
      const pass = this.constructMap.get(config.type)!(config);
      this.composer.addPass(pass);
      this.map.set(config.vid, pass);
      this.weakMap.set(pass, config.vid);
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
    this.weakMap.delete(pass);
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
    this.map.clear();
    return this;
  }

  getObjectSymbol(object: Pass): string | null {
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid: string): Pass | null {
    return this.map.get(vid) || null;
  }
}
