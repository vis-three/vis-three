import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import LineBasicMaterialModel from "./models/LineBasicMaterialModel";
import LineDashMaterialModel from "./models/LineDashMaterialModel";
import MeshBasicMaterialModel from "./models/MeshBasicMaterialModel";
import MeshMatcapMaterialModel from "./models/MeshMatcapMaterialModel";
import MeshPhongMaterialModel from "./models/MeshPhongMaterialModel";
import MeshPhysicalMaterialModel from "./models/MeshPhysicalMaterialModel";
import MeshStandardMaterialModel from "./models/MeshStandardMaterialModel";
import PointsMaterialModel from "./models/PointsMaterialModel";
import ShaderMaterialModel from "./models/ShaderMaterialModel";
import SpriteMaterialModel from "./models/SpriteMaterialModel";

export * from "./MaterialConfig";
export * from "./ShaderGeneratorManager";

export default defineModule({
  type: "material",
  models: [
    LineBasicMaterialModel,
    LineDashMaterialModel,
    MeshBasicMaterialModel,
    MeshMatcapMaterialModel,
    MeshPhongMaterialModel,
    MeshPhysicalMaterialModel,
    MeshStandardMaterialModel,
    PointsMaterialModel,
    ShaderMaterialModel,
    SpriteMaterialModel,
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.TWO,
});
