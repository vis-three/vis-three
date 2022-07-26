import { Compiler } from "../../core/Compiler";
import { ProxyNotice } from "../../core/ProxyBroadcast";

import { MODULETYPE } from "../constants/MODULETYPE";
import { AnimationAllType } from "./AnimationConfig";
import { scriptAniSymbol } from "./processor/common";
import ScriptAnimationProcessor from "./processor/ScriptAnimationProcessor";

export class AnimationCompiler extends Compiler<AnimationAllType, Function> {
  MODULE: MODULETYPE = MODULETYPE.ANIMATION;

  constructor() {
    super();
  }

  cover(config: AnimationAllType): this {
    super.cover(config);

    const fun = this.map.get(config.vid)!;
    config[Symbol.for(scriptAniSymbol)] = fun;

    return this;
  }

  remove(config: AnimationAllType): this {
    delete config[Symbol.for(scriptAniSymbol)];
    super.remove(config);
    return this;
  }

  compile(vid: string, notice: ProxyNotice): this {
    super.compile(vid, notice);
    const config = this.target[vid]!;
    const fun = this.map.get(config.vid)!;
    config[Symbol.for(scriptAniSymbol)] = fun;
    return this;
  }
}

Compiler.processor(ScriptAnimationProcessor);
