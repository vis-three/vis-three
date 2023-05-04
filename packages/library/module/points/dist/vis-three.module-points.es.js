import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SolidObjectCompiler, getSolidObjectConfig, solidObjectCommands, solidObjectCreate, solidObjectDispose } from "@vis-three/module-solid-object";
import { Points } from "three";
import { ObjectRule } from "@vis-three/module-object";
class PointsCompiler extends SolidObjectCompiler {
  constructor() {
    super();
  }
}
const getPointsConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: ""
  });
};
var PointsProcessor = defineProcessor({
  type: "Points",
  config: getPointsConfig,
  commands: solidObjectCommands,
  create(config, engine) {
    return solidObjectCreate(new Points(), config, {}, engine);
  },
  dispose: solidObjectDispose
});
const PointsRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
var index = {
  type: "points",
  object: true,
  compiler: PointsCompiler,
  rule: PointsRule,
  processors: [PointsProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { PointsCompiler, index as default, getPointsConfig };
