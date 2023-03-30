import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import LineBasicMaterialProcessor from "./LineBasicMaterialProcessor";
import { MaterialCompiler } from "./MaterialCompiler";
import { MaterialRule } from "./MaterialRule";
import MeshBasicMaterialProcessor from "./MeshBasicMaterialProcessor";
import MeshPhongMaterialProcessor from "./MeshPhongMaterialProcessor";
import MeshPhysicalMaterialProcessor from "./MeshPhysicalMaterialProcessor";
import MeshStandardMaterialProcessor from "./MeshStandardMaterialProcessor";
import PointsMaterialProcessor from "./PointsMaterialProcessor";
import ShaderMaterialProcessor from "./ShaderMaterialProcessor";
import SpriteMaterialProcessor from "./SpriteMaterialProcessor";

export default {
  type: "material",
  compiler: MaterialCompiler,
  rule: MaterialRule,
  processors: [
    LineBasicMaterialProcessor,
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
