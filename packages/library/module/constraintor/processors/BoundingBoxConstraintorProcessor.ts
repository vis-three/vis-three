import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
  JSONHandler,
} from "@vis-three/middleware";
import { ConstraintorCompiler } from "../ConstraintorCompiler";
import {
  BoundingBoxConstraintorConfig,
  getBoundingBoxConstraintorConfig,
} from "../ConstraintorConfig";
import { BoundingBoxConstraintor } from "@vis-three/library-constraintor";
import { commonRegCommand } from "./common";
import { Mesh, Object3D } from "three";

const cacheEventMap: WeakMap<BoundingBoxConstraintor, () => void> =
  new WeakMap();

const eventList = [
  "geometry",
  "position.x",
  "position.y",
  "position.z",
  "rotation.x",
  "rotation.y",
  "rotation.z",
  "scale.x",
  "scale.y",
  "scale.z",
];

const bindEvent = function (
  constraintor: BoundingBoxConstraintor,
  object: Object3D
) {
  const event = () => {
    constraintor.constrain();
  };

  cacheEventMap.set(constraintor, event);

  eventList.forEach((path) => {
    Bus.compilerEvent.on(object, `${COMPILER_EVENT.COMPILE}${path}`, event);
  });

  if ((<Mesh>object).geometry) {
    Bus.compilerEvent.on((<Mesh>object).geometry, COMPILER_EVENT.UPDATE, event);
  }
};

const removeEvent = function (constraintor: BoundingBoxConstraintor) {
  const object = constraintor.reference as Mesh;

  const event = cacheEventMap.get(constraintor);

  if (event) {
    eventList.forEach((path) => {
      Bus.compilerEvent.off(object, `${COMPILER_EVENT.COMPILE}${path}`, event);
    });

    if ((<Mesh>object).geometry) {
      Bus.compilerEvent.off(
        (<Mesh>object).geometry,
        COMPILER_EVENT.UPDATE,
        event
      );
    }
  }
};

export default defineProcessor<
  BoundingBoxConstraintorConfig,
  BoundingBoxConstraintor,
  EngineSupport,
  ConstraintorCompiler
>({
  type: "BoundingBoxConstraintor",
  config: getBoundingBoxConstraintorConfig,
  commands: {
    set: {
      target({ target, config, engine }) {
        if (config.target && config.targetAttr) {
          target.setTarget(
            engine.getConfigBySymbol(config.target)!,
            config.targetAttr
          );

          target.constrain();
        }
      },
      targetAttr({ target, config, engine }) {
        if (config.target && config.targetAttr) {
          target.setTarget(
            engine.getConfigBySymbol(config.target)!,
            config.targetAttr
          );

          target.constrain();
        }
      },

      ref({ target, config, engine, value }) {
        removeEvent(target);

        if (!value) {
          return;
        }

        const refObject = engine.getObjectBySymbol(config.ref)! as Mesh;

        if (!refObject) {
          console.warn(
            `BoundingBox constraintor processor: can not found object: ${config.ref}`
          );
          return;
        }

        target.setReference(refObject);

        target.constrain();

        bindEvent(target, refObject);
      },
      $reg: [commonRegCommand],
    },
  },
  create(config, engine) {
    const refObject = engine.getObjectBySymbol(config.ref)! as Mesh;

    const constraintor = new BoundingBoxConstraintor(
      engine.getConfigBySymbol(config.target)!,
      config.targetAttr,
      config.space,
      refObject,
      JSONHandler.clone(config.offset) as unknown as undefined
    );

    if (refObject) {
      constraintor.constrain();

      bindEvent(constraintor, refObject);
    }

    return constraintor;
  },
  dispose(target) {
    removeEvent(target);
  },
});
