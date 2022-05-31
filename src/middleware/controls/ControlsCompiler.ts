import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  getOrbitControlsConfig,
  getTransformControlsConfig,
  ControlsAllConfig,
} from "./ControlsConfig";
import { OrbitControlsProcessor } from "./OrbitControlsProcessor";
import { TransformControlsProcessor } from "./TransformControlsProcessor";

export type ControlsAllType = TransformControls | VisOrbitControls;

export interface ControlsCompilerTarget extends CompilerTarget {
  [key: string]: ControlsAllConfig;
}

export class ControlsCompiler extends Compiler {
  MODULE: MODULETYPE = MODULETYPE.CONTROLS;

  private target: ControlsCompilerTarget = {};
  private map = new Map<SymbolConfig["vid"], ControlsAllType>();
  private weakMap = new Map<ControlsAllType, SymbolConfig["vid"]>();

  private processorMap = {
    [CONFIGTYPE.TRNASFORMCONTROLS]: new TransformControlsProcessor(),
    [CONFIGTYPE.ORBITCONTROLS]: new OrbitControlsProcessor(),
  };

  constructor() {
    super();
  }

  private getAssembly(
    vid: string
  ): { config: ControlsAllConfig; processer: any; control: any } | null {
    const config = this.target[vid];
    if (!config) {
      console.warn(`controls compiler can not found this config: '${vid}'`);
      return null;
    }

    const processer = this.processorMap[config.type];

    if (!processer) {
      console.warn(`controls compiler can not support this controls: '${vid}'`);
      return null;
    }

    const control = this.map.get(config.type)!;

    if (!control) {
      console.warn(
        `controls compiler can not found type of control: '${config.type}'`
      );
      return null;
    }

    return {
      config,
      processer,
      control,
    };
  }

  set(vid: string, path: string[], key: string, value: any): this {
    const assembly = this.getAssembly(vid);

    if (!assembly) {
      return this;
    }

    assembly.processer
      .assemble({
        config: assembly.config,
        control: assembly.control,
      })
      .process({
        key,
        path,
        value,
      });

    return this;
  }

  setAll(vid: string): this {
    const assembly = this.getAssembly(vid);

    if (!assembly) {
      return this;
    }

    assembly.processer
      .assemble({
        config: assembly.config,
        control: assembly.control,
      })
      .processAll()
      .dispose();

    return this;
  }

  setTarget(target: ControlsCompilerTarget): this {
    this.target = target;
    return this;
  }

  useEngine(engine: EngineSupport): this {
    if (engine.transformControls) {
      this.map.set(CONFIGTYPE.TRNASFORMCONTROLS, engine.transformControls);
      this.weakMap.set(engine.transformControls, CONFIGTYPE.TRNASFORMCONTROLS);
    }

    if (engine.orbitControls) {
      this.map.set(CONFIGTYPE.ORBITCONTROLS, engine.orbitControls);
      this.weakMap.set(engine.orbitControls, CONFIGTYPE.ORBITCONTROLS);
    }
    return this;
  }

  compileAll(): this {
    for (const vid of Object.keys(this.target)) {
      const assembly = this.getAssembly(vid);

      if (!assembly) {
        continue;
      }

      assembly.processer
        .assemble({
          config: assembly.config,
          control: assembly.control,
        })
        .processAll()
        .dispose();
    }
    return this;
  }

  dispose(): this {
    this.map.forEach((controls) => {
      controls.dispose && controls.dispose();
    });

    this.map.clear();
    return this;
  }

  getObjectSymbol(texture: ControlsAllType): string | null {
    return this.weakMap.get(texture) || null;
  }

  getObjectBySymbol(vid: string): ControlsAllType | null {
    return this.map.get(vid) || null;
  }
}
