import {
  EffectComposer,
  Pass,
} from "three/examples/jsm/postprocessing/EffectComposer";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { PassConfigAllType } from "./PassConfig";
import { EngineSupport } from "../../engine/EngineSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SetSizeEvent } from "../../engine/Engine";
import { CompilerManager } from "../../manager/CompilerManager";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Processor2 } from "../../core/Processor";
import SMAAPassProcessor from "./processor/SMAAPassProcessor";
import UnrealBloomPassProcessor from "./processor/UnrealBloomPassProcessor";
import SelectiveBloomPassProcessor from "./processor/SelectiveBloomPassProcessor";

export interface PassCompilerTarget extends CompilerTarget {
  [key: string]: PassConfigAllType;
}

export class PassCompiler extends Compiler<PassCompilerTarget, Pass> {
  MODULE: MODULETYPE = MODULETYPE.PASS;

  compilerManager!: CompilerManager;
  private composer!: EffectComposer;
  private engine!: EngineSupport;

  private width: number = window.innerWidth * window.devicePixelRatio;
  private height: number = window.innerHeight * window.devicePixelRatio;

  constructor() {
    super();
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
    this.engine = engine;
    this.composer = engine.effectComposer;
    this.compilerManager = engine.compilerManager;

    const pixelRatio = this.composer.renderer.getPixelRatio();

    this.width = (engine.dom?.offsetWidth || window.innerWidth) * pixelRatio;

    this.height = (engine.dom?.offsetHeight || window.innerHeight) * pixelRatio;

    engine.addEventListener<SetSizeEvent>("setSize", (event) => {
      this.width = event.width * pixelRatio;
      this.height = event.height * pixelRatio;
    });

    return this;
  }

  add(config: PassConfigAllType): this {
    if (!Compiler.processors.has(config.type)) {
      console.warn(`PassCompiler can not support this type: ${config.type}`);
      return this;
    }

    const processor = Compiler.processors.get(config.type)! as Processor2<
      PassConfigAllType,
      Pass
    >;

    const pass = processor.create(config, this.engine);
    this.composer.addPass(pass);
    this.map.set(config.vid, pass);
    this.weakMap.set(pass, config.vid);

    return this;
  }

  compile(vid: string, notice: ProxyNotice): this {
    if (!this.map.has(vid)) {
      console.warn(
        `pass compiler set function: can not found object which vid is: '${vid}'`
      );
      return this;
    }

    if (!this.target[vid]) {
      console.warn(
        `pass compiler set function: can not found config which vid is: '${vid}'`
      );
      return this;
    }

    const pass = this.map.get(vid)!;
    const config = this.target[vid]!;

    if (!Compiler.processors.has(config.type)) {
      console.warn(`PassCompiler can not support this type: ${config.type}`);
      return this;
    }

    const processor = Compiler.processors.get(config.type)! as Processor2<
      PassConfigAllType,
      Pass
    >;

    processor.process({
      config,
      target: pass,
      engine: this.engine,
      ...notice,
    });

    return this;
  }

  remove(config: PassConfigAllType): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(`PassCompiler can not found this vid pass: ${vid}.`);
      return this;
    }

    if (!Compiler.processors.has(config.type)) {
      console.warn(`PassCompiler can not support this type: ${config.type}`);
      return this;
    }

    const pass = this.map.get(vid)!;
    Compiler.processors.get(config.type)!.dispose(pass);

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

Compiler.processor(SMAAPassProcessor);
Compiler.processor(UnrealBloomPassProcessor);
Compiler.processor(SelectiveBloomPassProcessor);
