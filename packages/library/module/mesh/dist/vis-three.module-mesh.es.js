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
    material: "",
    morphTargetInfluences: [],
    morphTargetDictionary: {}
  });
};
var MeshProcessor = defineProcessor({
  type: "Mesh",
  config: getMeshConfig,
  commands: solidObjectCommands,
  create(config, engine) {
    const mesh = new Mesh();
    mesh.morphTargetInfluences = JSON.parse(
      JSON.stringify(config.morphTargetInfluences)
    );
    mesh.morphTargetDictionary = JSON.parse(
      JSON.stringify(config.morphTargetDictionary)
    );
    return solidObjectCreate(
      mesh,
      config,
      {
        morphTargetInfluences: true,
        morphTargetDictionary: true
      },
      engine
    );
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
