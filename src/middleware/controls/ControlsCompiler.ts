import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
import {
  getOrbitControlsConfig,
  getTransformControlsConfig,
  ControlsAllConfig,
} from "./ControlsConfig";
import { OrbitControlsProcessor } from "./OrbitControlsProcessor";
import { TransformControlsProcessor } from "./TransformControlsProcessor";

export interface ControlsCompilerTarget extends CompilerTarget {
  [key: string]: ControlsAllConfig;
}

export interface ControlsCompilerParameters {
  target?: ControlsCompilerTarget;
  transformControls?: TransformControls;
  orbitControls?: OrbitControls;
}

export class ControlsCompiler extends Compiler {
  private target!: ControlsCompilerTarget;

  // TODO: 需要支持不止一个控件
  private transformControls?: TransformControls;
  private orbitControls?: OrbitControls;

  private processorMap = {
    [CONFIGTYPE.TRNASFORMCONTROLS]: new TransformControlsProcessor(),
    [CONFIGTYPE.ORBITCONTROLS]: new OrbitControlsProcessor(),
  };

  private controlMap: {
    [CONFIGTYPE.TRNASFORMCONTROLS]: undefined | TransformControls;
    [CONFIGTYPE.ORBITCONTROLS]: undefined | OrbitControls;
  } = {
    [CONFIGTYPE.TRNASFORMCONTROLS]: undefined,
    [CONFIGTYPE.ORBITCONTROLS]: undefined,
  };

  constructor(parameters?: ControlsCompilerParameters) {
    super();
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.transformControls &&
        (this.controlMap[CONFIGTYPE.TRNASFORMCONTROLS] =
          parameters.transformControls);
      parameters.orbitControls &&
        (this.controlMap[CONFIGTYPE.ORBITCONTROLS] = parameters.orbitControls);
    } else {
      this.target = {
        [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig(),
        [CONFIGTYPE.ORBITCONTROLS]: getOrbitControlsConfig(),
      };
    }
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

    const control = this.controlMap[config.type];

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
    return this;
  }
}
