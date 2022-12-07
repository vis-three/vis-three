import { Object3D } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ObjectEvent } from "../../../manager/EventManager";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";

export interface AddClass extends BasicEventConfig {
  params: {
    target: string | string[] | "all";
    className: string;
    delay: number;
  };
}

export const config: AddClass = {
  name: "addClass",
  params: {
    target: "",
    className: "",
    delay: 0,
  },
};

export const generator: EventGenerator<AddClass> = function (
  engine: EngineSupport,
  config: AddClass
): (event?: ObjectEvent) => void {
  const params = config.params;
  const targets: CSS3DObject[] = [];

  if (params.target === "all") {
    engine.scene.traverse((object) => {
      if (object instanceof CSS3DObject) {
        targets.push(object);
      }
    });
  } else if (Array.isArray(params.target)) {
    params.target.forEach((symbol) => {
      const target = engine.getObjectBySymbol(symbol)! as CSS3DObject;
      if (!target) {
        console.warn(
          `basic event AddClass: can not found vid object: ${params.target}`
        );
      } else {
        targets.push(target);
      }
    });
  } else {
    const target = engine.getObjectBySymbol(params.target)! as CSS3DObject;

    if (!target) {
      console.warn(
        `basic event AddClass: can not found vid object: ${params.target}`
      );
      return () => {};
    }

    if (!(target instanceof CSS3DObject)) {
      console.warn(`basic event AddClass: object is not a CSS3DObject.`);
      return () => {};
    }

    targets.push(target);
  }

  if (!targets.length) {
    console.warn(
      `basic event AddClass: can not found vid object: ${params.target}`
    );
    return () => {};
  }

  return () => {
    setTimeout(() => {
      targets.forEach((target) => {
        target.element.classList.add(params.className);
      });
    }, params.delay);
  };
};
