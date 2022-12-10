import { Object3D } from "three";
import { antiShake, EngineSupport } from "@vis-three/core";
import { ObjectEvent } from "../../../manager/EventManager";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";

export interface VisibleObject extends BasicEventConfig {
  params: {
    target: string;
    visible: boolean;
    delay: number;
  };
}

export const config: VisibleObject = {
  name: "visibleObject",
  params: {
    target: "",
    visible: true,
    delay: 0,
  },
};

export const generator: EventGenerator<VisibleObject> = function (
  engine: EngineSupport,
  config: VisibleObject
): (event?: ObjectEvent) => void {
  const params = config.params;
  const target = engine.getObjectBySymbol(params.target)! as Object3D;

  if (!target) {
    console.warn(
      `basic event visibleObject: can not found vid object: ${params.target}`
    );
    return () => {};
  }

  return () => {
    setTimeout(() => {
      target.visible = params.visible;
    }, params.delay);
  };
};
