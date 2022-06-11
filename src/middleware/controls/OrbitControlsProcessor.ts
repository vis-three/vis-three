import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Process, Processor } from "../../core/Processor";
import { EngineSupport } from "../../engine/EngineSupport";
import { Vector3Config } from "../common/CommonConfig";
import { OrbitControlsConfig } from "./ControlsConfig";

export interface ProcessAssemble {
  control: OrbitControls;
  config: OrbitControlsConfig;
  engine: EngineSupport;
}

export class OrbitControlsProcessor extends Processor {
  config?: OrbitControlsConfig;
  target?: OrbitControls;
  engine?: EngineSupport;

  constructor() {
    super();
  }

  assemble(params: ProcessAssemble): this {
    this.config = params.config;
    this.target = params.control;
    this.engine = params.engine;
    this.assembly = true;
    return this;
  }

  process(params: Process): this {
    if (!this.assembly) {
      console.warn(`OrbitControls Processor unassembled`);
      return this;
    }

    if (
      params.key === "target" ||
      (params.path.length && params.path[0] === "target")
    ) {
      this.setTarget(this.config!.target);
      return this;
    }
    this.mergeAttribute([], params.key, params.value);
    return this;
  }

  setTarget(target: Vector3Config | string | null) {
    if (typeof target === "object" && target !== null) {
      this.target!.target = new Vector3(target.x, target.y, target.z);
    }
  }

  dispose(): this {
    this.config = undefined;
    this.target = undefined;
    this.assembly = false;
    return this;
  }
}
