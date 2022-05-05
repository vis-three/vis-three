import { Material, Object3D, Texture } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../engine/EngineSupport";
import { AniScriptLibrary } from "../../main";
import { RenderManager } from "../../manager/RenderManager";
import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
import { AnimationAllType, ScriptAnimationConfig } from "./AnimationConfig";

export interface AnimationCompilerTarget extends CompilerTarget {
  [key: string]: AnimationAllType;
}

export class AnimationCompiler extends Compiler {
  private target: AnimationCompilerTarget = {};
  private engine!: EngineSupport;

  private objectMapSet = new Set<Map<string, any>>();

  private scriptAniSymbol = "vis.scriptAni";

  constructor() {
    super();
  }

  linkObjectMap(...map: Map<SymbolConfig["vid"], Object3D>[]): this {
    for (const objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
    }
    return this;
  }

  linkTextureMap(textureMap: Map<SymbolConfig["vid"], Texture>): this {
    this.objectMapSet.add(textureMap);
    return this;
  }

  linkMaterialMap(materialMap: Map<SymbolConfig["vid"], Material>): this {
    this.objectMapSet.add(materialMap);
    return this;
  }

  private getObject(vid: string): object {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid)!;
      }
    }
    console.error(`animation compiler can not found object which vid: ${vid}`);
    return {};
  }

  add(vid: string, config: AnimationAllType): this {
    const renderManager = this.engine.renderManager!;
    let object = this.getObject(config.target);
    const attributeList = config.attribute.split(".");
    attributeList.shift();
    const attribute = attributeList.pop()!;
    for (const key of attributeList) {
      if (object[key] === undefined) {
        console.error(
          `animaton compiler: target object can not found key: ${key}`,
          object
        );
        break;
      }

      object = object[key];
    }

    if (config.type === CONFIGTYPE.SCRIPTANIMATION) {
      const fun = AniScriptLibrary.generateScript(
        this.engine,
        object,
        attribute,
        (config as ScriptAnimationConfig).script
      );

      config[Symbol.for(this.scriptAniSymbol)] = fun;

      renderManager.addEventListener("render", fun);
    } else {
      console.warn(
        `animation compiler can not support this type config: ${config.type}`
      );
    }
    return this;
  }

  update(vid: string): this {
    return this.remove(vid).add(vid, this.target[vid]);
  }

  remove(vid: string): this {
    const config = this.target[vid]!;

    if (!config) {
      console.warn(`animation compiler can not found config with vid: ${vid}`);
      return this;
    }

    if (config.type === CONFIGTYPE.SCRIPTANIMATION) {
      this.engine.renderManager!.removeEventListener(
        "render",
        config[Symbol.for(this.scriptAniSymbol)]
      );
    }
    return this;
  }

  setTarget(target: AnimationCompilerTarget): this {
    this.target = target;
    return this;
  }

  useEngine(engine: EngineSupport): this {
    this.engine = engine!;
    return this;
  }
  compileAll(): this {
    for (const config of Object.values(this.target)) {
      this.add(config.vid, config);
    }
    return this;
  }

  dispose(parameter: unknown): this {
    for (const config of Object.values(this.target)) {
      this.remove(config.vid);
    }
    return this;
  }
}
