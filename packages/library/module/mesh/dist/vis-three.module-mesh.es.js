import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SolidObjectCompiler, getSolidObjectConfig, solidObjectCommands, solidObjectCreate, solidObjectDispose } from "@vis-three/module-solid-object";
import { Mesh } from "three";
import { ObjectRule } from "@vis-three/module-object";
class MeshCompiler extends SolidObjectCompiler {
  constructor() {
    super();
  }
}
const getMeshConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: ""
  });
};
var MeshProcessor = defineProcessor({
  type: "Mesh",
  config: getMeshConfig,
  commands: solidObjectCommands,
  create(config, engine) {
    return solidObjectCreate(new Mesh(), config, {}, engine);
  },
  dispose: solidObjectDispose
});
const MeshRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
var index = {
  type: "mesh",
  object: true,
  compiler: MeshCompiler,
  rule: MeshRule,
  processors: [MeshProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { MeshCompiler, index as default, getMeshConfig };
