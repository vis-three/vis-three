import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, getObjectConfig, objectCommands, objectCreate, objectDispose, ObjectRule } from "@vis-three/module-object";
import { Object3D } from "three";
class Object3DCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const getObject3DConfig = function() {
  return Object.assign(getObjectConfig(), {});
};
var Object3DProcessor = defineProcessor({
  type: "Object3D",
  config: getObject3DConfig,
  commands: objectCommands,
  create(config, engine) {
    return objectCreate(new Object3D(), config, {}, engine);
  },
  dispose: objectDispose
});
const Object3DRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
var index = {
  type: "object3D",
  object: true,
  compiler: Object3DCompiler,
  rule: Object3DRule,
  processors: [Object3DProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { Object3DCompiler, index as default, getObject3DConfig };
