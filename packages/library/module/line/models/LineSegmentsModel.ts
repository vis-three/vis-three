import {
  defineSolidObjectModel,
  SolidObjectModel,
} from "@vis-three/module-solid-object";
import { getLineSegmentsConfig, LineSegmentsConfig } from "../LineConfig";
import { LineDashedMaterial, LineSegments } from "three";
import { MODEL_EVENT } from "@vis-three/tdcm";

export default defineSolidObjectModel<
  LineSegmentsConfig,
  LineSegments,
  {
    dashedLineEvent: () => void;
  }
>((solidObjectModel) => ({
  type: "LineSegments",
  config: getLineSegmentsConfig,
  context({ model }) {
    return {
      dashedLineEvent: () => {
        model.puppet.computeLineDistances();
      },
    };
  },
  commands: {
    set: {
      dashed({ model, config, target, value }) {
        if (target.material instanceof LineDashedMaterial && value) {
          model
            .toModel(config.geometry)
            ?.on(MODEL_EVENT.COMPILED_UPDATE, model.dashedLineEvent);

          model.dashedLineEvent();
          return;
        }

        if (!value) {
          model
            .toModel(config.geometry)
            ?.off(MODEL_EVENT.COMPILED_UPDATE, model.dashedLineEvent);
        }
      },
    },
  },
  create({ model, config, engine }) {
    const line = new LineSegments();

    solidObjectModel.create!({
      model: model as unknown as SolidObjectModel,
      target: line,
      engine,
      config,
      filter: {
        dashed: true,
      },
    });

    if (line.material instanceof LineDashedMaterial && config.dashed) {
      model
        .toModel(config.geometry)
        ?.on(MODEL_EVENT.COMPILED_UPDATE, model.dashedLineEvent);

      model.dashedLineEvent();
    }

    return line;
  },
  dispose({ target }) {
    solidObjectModel.dispose!({ target });
  },
}));
