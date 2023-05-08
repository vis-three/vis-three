import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SolidObjectCompiler, getSolidObjectConfig, solidObjectCommands, solidObjectCreate, solidObjectDispose } from "@vis-three/module-solid-object";
import { Line } from "three";
import { ObjectRule } from "@vis-three/module-object";
class LineCompiler extends SolidObjectCompiler {
  constructor() {
    super();
  }
}
const getLineConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: ""
  });
};
var LineProcessor = defineProcessor({
  type: "Line",
  config: getLineConfig,
  commands: solidObjectCommands,
  create(config, engine) {
    return solidObjectCreate(new Line(), config, {}, engine);
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
