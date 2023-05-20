import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { HelperCompiler } from "./HelperCompiler";
import { HelperRule } from "./HelperRule";
import HelperProcessor from "./processors/ObjectHelperProcessor";
import { expandCommand } from "./expand/objectHelper";

export * from "./expand/objectHelper";
export * from "./HelperConfig";
export * from "./HelperCompiler";

export default {
  type: "helper",
  compiler: HelperCompiler,
  rule: HelperRule,
  processors: [HelperProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.FOUR,
  expand: [
    {
      processors: new RegExp("Mesh|Light|Line|Points|Group|Object3D"),
      command: expandCommand,
    },
  ],
};
