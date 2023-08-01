import { defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SolidObjectCompiler, getSolidObjectConfig, solidObjectCreate } from "@vis-three/module-solid-object";
import { ObjectRule } from "@vis-three/module-object";
import { SkinnedMesh } from "three";
class SkinnedMeshCompiler extends SolidObjectCompiler {
  constructor() {
    super();
  }
}
const SkinnedMeshRule = function(input, compiler) {
  ObjectRule(input, compiler);
};
const getSkinnedMeshConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    skeleton: "",
    bindMode: "attached"
  });
};
var SkinnedMeshProcessor = defineProcessor({
  type: "SkinnedMesh",
  config: getSkinnedMeshConfig,
  commands: {
    add: {},
    set: {},
    delete: {}
  },
  create(config, engine) {
    const skinnedMesh = solidObjectCreate(
      new SkinnedMesh(),
      config,
      {
        skeleton: true
      },
      engine
    );
    if (config.skeleton) {
      const skeleton = engine.getObjectBySymbol(config.skeleton);
      if (!skeleton) {
        console.warn(
          `skinnedMesh processor can not found skeleton in engine: ${config.skeleton}`
        );
      }
      skinnedMesh.bind(skeleton);
    }
    return skinnedMesh;
  },
  dispose() {
  }
});
var index = {
  type: "skinnedMesh",
  object: true,
  compiler: SkinnedMeshCompiler,
  rule: SkinnedMeshRule,
  processors: [SkinnedMeshProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { SkinnedMeshCompiler, index as default, getSkinnedMeshConfig };
