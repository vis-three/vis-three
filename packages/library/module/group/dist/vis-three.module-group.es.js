import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, getObjectConfig, objectCommands, objectCreate, objectDispose, ObjectRule } from "@vis-three/module-object";
import { Group } from "three";
class GroupCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const getGroupConfig = function() {
  return Object.assign(getObjectConfig(), {
    children: []
  });
};
var GroupProcessor = defineProcessor({
  type: "Group",
  config: getGroupConfig,
  commands: objectCommands,
  create(config, engine) {
    return objectCreate(new Group(), config, {}, engine);
  },
  dispose: objectDispose
});
const GroupRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
var index = {
  type: "group",
  object: true,
  compiler: GroupCompiler,
  rule: GroupRule,
  processors: [GroupProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { GroupCompiler, index as default, getGroupConfig };
