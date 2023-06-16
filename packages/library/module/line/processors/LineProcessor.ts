import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "@vis-three/module-solid-object";
import { Line, LineDashedMaterial } from "three";
import { LineCompiler } from "../LineCompiler";
import { getLineConfig, LineConfig } from "../LineConfig";

export default defineProcessor<LineConfig, Line, EngineSupport, LineCompiler>({
  type: "Line",
  config: getLineConfig,
  commands: {
    add: (<SolidObjectCommands<LineConfig, Line>>(<unknown>solidObjectCommands))
      .add,
    set: {
      ...(<SolidObjectCommands<LineConfig, Line>>(<unknown>solidObjectCommands))
        .set,
      computeLineDistances({ target, value }) {
        if (target.material instanceof LineDashedMaterial && value) {
          target.computeLineDistances();
        }
      },
    },
    delete: (<SolidObjectCommands<LineConfig, Line>>(
      (<unknown>solidObjectCommands)
    )).delete,
  },

  create(config: LineConfig, engine: EngineSupport): Line {
    const line = solidObjectCreate(
      new Line(),
      config,
      { computeLineDistances: true },
      engine
    );

    if (
      line.material instanceof LineDashedMaterial &&
      config.computeLineDistances
    ) {
      //TODO: compiler update auto computed
      line.computeLineDistances();
    }

    return line;
  },
  dispose: solidObjectDispose,
});
