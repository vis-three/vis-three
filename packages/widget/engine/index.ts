import { EngineSupport, EngineSupportParameters } from "@vis-three/middleware";
import { Component } from "../component";
import { Widget } from "../widget";

export class EngineWidget extends EngineSupport {
  constructor(params: Partial<EngineSupportParameters> = {}) {
    super(params);
  }

  createWidget(component: Component): Widget {
    return new Widget(this, component);
  }
}
