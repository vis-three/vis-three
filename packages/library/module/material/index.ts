import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { MaterialCompiler } from "./MaterialCompiler";
import { MaterialRule } from "./MaterialRule";
import MeshBasicMaterialProcessor from "./processors/MeshBasicMaterialProcessor";
import MeshPhongMaterialProcessor from "./processors/MeshPhongMaterialProcessor";
import MeshPhysicalMaterialProcessor from "./processors/MeshPhysicalMaterialProcessor";
import MeshStandardMaterialProcessor from "./processors/MeshStandardMaterialProcessor";
import PointsMaterialProcessor from "./processors/PointsMaterialProcessor";
import ShaderMaterialProcessor from "./processors/ShaderMaterialProcessor";
import SpriteMaterialProcessor from "./processors/SpriteMaterialProcessor";
import LineBasicMaterialProcessor from "./processors/LineBasicMaterialProcessor";
import LineDashMaterialProcessor from "./processors/LineDashMaterialProcessor";

export * from "./MaterialCompiler";
export * from "./MaterialConfig";

export default {
  type: "material",
  compiler: MaterialCompiler,
  rule: MaterialRule,
  processors: [
    LineBasicMaterialProcessor,
    LineDashMaterialProcessor,
    MeshBasicMaterialProcessor,
    MeshPhongMaterialProcessor,
    MeshPhysicalMaterialProcessor,
    MeshStandardMaterialProcessor,
    PointsMaterialProcessor,
    ShaderMaterialProcessor,
    SpriteMaterialProcessor,
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.TWO,
};
