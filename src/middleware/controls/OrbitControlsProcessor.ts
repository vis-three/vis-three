import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Process, Processor } from "../../core/Processor";
import { OrbitControlsConfig } from "./ControlsConfig";

export interface ProcessAssemble {
  control: OrbitControls;
  config: OrbitControlsConfig;
}

export class OrbitControlsProcessor extends Processor {
  config?: OrbitControlsConfig;
  target?: OrbitControls;

  constructor() {
    super();
  }

  assemble(params: ProcessAssemble): this {
    this.config = params.config;
    this.target = params.control;
    this.assembly = true;
    return this;
  }

  process(params: Process): this {
    if (!this.assembly) {
      console.warn(`OrbitControls Processor unassembled`);
      return this;
    }
    this.mergeAttribute([], params.key, params.value);
    return this;
  }

  dispose(): this {
    this.config = undefined;
    this.target = undefined;
    this.assembly = false;
    return this;
  }
}
