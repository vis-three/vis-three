import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, getObjectConfig, objectCommands, objectCreate, objectDispose, ObjectRule } from "@vis-three/module-object";
import { Bone } from "three";
class BoneCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const getBoneConfig = function() {
  return Object.assign(getObjectConfig(), {
    children: []
  });
};
var BoneProcessor = defineProcessor({
  type: "Bone",
  config: getBoneConfig,
  commands: objectCommands,
  create(config, engine) {
    return objectCreate(new Bone(), config, {}, engine);
  },
  dispose: objectDispose
});
const BoneRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
var index = {
  type: "bone",
  object: true,
  compiler: BoneCompiler,
  rule: BoneRule,
  processors: [BoneProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE - 2
};
export { BoneCompiler, index as default, getBoneConfig };
