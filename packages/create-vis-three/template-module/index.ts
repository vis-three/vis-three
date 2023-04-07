import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { TemplateCompiler } from "./TemplateCompiler";
import { TemplateRule } from "./TemplateRule";
import TemplateProcessor from "./processors/TemplateProcessor";

export default {
  type: "template",
  object: true,
  compiler: TemplateCompiler,
  rule: TemplateRule,
  processors: [TemplateProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
};
