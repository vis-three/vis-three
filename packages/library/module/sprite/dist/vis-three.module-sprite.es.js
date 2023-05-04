import { defineProcessor, MODULETYPE, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { SolidObjectCompiler, getSolidObjectConfig, solidObjectCommands, solidObjectCreate, solidObjectDispose } from "@vis-three/module-solid-object";
import { SpriteMaterial, Sprite } from "three";
import { ObjectRule } from "@vis-three/module-object";
class SpriteCompiler extends SolidObjectCompiler {
  constructor() {
    super();
  }
}
const getSpriteConfig = function() {
  return Object.assign(getSolidObjectConfig(), {
    type: "Sprite",
    material: "",
    center: {
      x: 0.5,
      y: 0.5
    }
  });
};
const spriteReplaceMaterial = new SpriteMaterial({
  color: "rgb(123, 123, 123)"
});
var SpriteProcessor = defineProcessor({
  type: "Sprite",
  config: getSpriteConfig,
  commands: {
    add: solidObjectCommands.add,
    set: {
      lookAt() {
      },
      ...solidObjectCommands.set,
      material({ target, engine, value }) {
        const material = engine.compilerManager.getObjectfromModule(
          MODULETYPE.MATERIAL,
          value
        );
        if (material && material instanceof SpriteMaterial) {
          target.material = material;
        } else {
          target.material = spriteReplaceMaterial;
        }
      }
    },
    delete: solidObjectCommands.add
  },
  create(config, engine) {
    const sprite = new Sprite();
    const material = engine.compilerManager.getObjectfromModule(
      MODULETYPE.MATERIAL,
      config.material
    );
    if (material && material instanceof SpriteMaterial) {
      sprite.material = material;
    } else {
      sprite.material = spriteReplaceMaterial;
    }
    return solidObjectCreate(
      sprite,
      config,
      {
        geometry: true,
        material: true,
        lookAt: true
      },
      engine
    );
  },
  dispose: solidObjectDispose
});
const SpriteRule = function(notice, compiler) {
  if (notice.key === "geometry") {
    return;
  }
  ObjectRule(notice, compiler);
};
var index = {
  type: "sprite",
  object: true,
  compiler: SpriteCompiler,
  rule: SpriteRule,
  processors: [SpriteProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { SpriteCompiler, index as default, getSpriteConfig };
