import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SolidObjectCompiler, getSolidObjectConfig, solidObjectCommands, solidObjectCreate, solidObjectDispose } from "@vis-three/module-solid-object";
import { LineDashedMaterial, Line } from "three";
import { ObjectRule } from "@vis-three/module-object";
class LineCompiler extends SolidObjectCompiler {
  constructor() {
    super();
  }
}
const getLineConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: "",
    computeLineDistances: false
  });
};
var LineProcessor = defineProcessor({
  type: "Line",
  config: getLineConfig,
  commands: {
    add: solidObjectCommands.add,
    set: {
      ...solidObjectCommands.set,
      computeLineDistances({ target, value }) {
        if (target.material instanceof LineDashedMaterial && value) {
          target.computeLineDistances();
        }
      }
    },
    delete: solidObjectCommands.delete
  },
  create(config, engine) {
    const line = solidObjectCreate(
      new Line(),
      config,
      { computeLineDistances: true },
      engine
    );
    if (line.material instanceof LineDashedMaterial && config.computeLineDistances) {
      line.computeLineDistances();
    }
    return line;
  },
  dispose: solidObjectDispose
});
const LineRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
var index = {
  type: "line",
  object: true,
  compiler: LineCompiler,
  rule: LineRule,
  processors: [LineProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { LineCompiler, index as default, getLineConfig };
