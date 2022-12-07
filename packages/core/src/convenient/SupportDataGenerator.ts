import { CompilerTarget } from "../core/Compiler";
import { AnimationAllType } from "../middleware/animation/AnimationConfig";
import { CameraConfigAllType } from "../middleware/camera/CameraConfig";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { getModule } from "../middleware/constants/CONFIGMODULE";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { ControlsAllConfig } from "../middleware/controls/ControlsConfig";
import { CSS3DAllType } from "../middleware/css3D/CSS3DConfig";
import { GeometryAllType } from "../middleware/geometry/GeometryInterface";
import { GroupConfig } from "../middleware/group/GroupConfig";
import { LightConfigAllType } from "../middleware/light/LightConfig";
import { LineConfig } from "../middleware/line/LineConfig";
import { MaterialAllType } from "../middleware/material/MaterialConfig";
import { MeshConfig } from "../middleware/mesh/MeshConfig";
import { PassConfigAllType } from "../middleware/pass/PassConfig";
import { PointsConfig } from "../middleware/points/PointsConfig";
import { RendererConfigAllType } from "../middleware/renderer/RendererConfig";
import { SceneConfig } from "../middleware/scene/SceneConfig";
import { SpriteConfig } from "../middleware/sprite/SpriteConfig";
import { TextureAllType } from "../middleware/texture/TextureConfig";
import { generateConfig } from "./generateConfig";

export type SupportDataAllType =
  | CompilerTarget<TextureAllType>
  | CompilerTarget<MaterialAllType>
  | CompilerTarget<GeometryAllType>
  | CompilerTarget<LightConfigAllType>
  | CompilerTarget<CameraConfigAllType>
  | CompilerTarget<SpriteConfig>
  | CompilerTarget<LineConfig>
  | CompilerTarget<MeshConfig>
  | CompilerTarget<PointsConfig>
  | CompilerTarget<GroupConfig>
  | CompilerTarget<CSS3DAllType>
  | CompilerTarget<RendererConfigAllType>
  | CompilerTarget<SceneConfig>
  | CompilerTarget<PassConfigAllType>
  | CompilerTarget<ControlsAllConfig>
  | CompilerTarget<AnimationAllType>;

export class SupportDataGenerator {
  private supportData?: SupportDataAllType;
  private supportDataType?: MODULETYPE;

  constructor() {}

  create(type: MODULETYPE): this {
    if (!type) {
      console.warn("you must give a module type in create params");
      return this;
    }
    this.supportData = {};
    this.supportDataType = type;

    return this;
  }

  add<C extends SymbolConfig>(config: C): this {
    if (!this.supportData || !this.supportDataType) {
      console.warn(`you must call 'create' method before the 'add' method`);
      return this;
    }

    if (!config.type) {
      console.warn(`config can not found attribute 'type'`);
      return this;
    }

    if (getModule(config.type as CONFIGTYPE) !== this.supportDataType) {
      console.warn(
        `current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config.type}'`
      );
      return this;
    }

    this.supportData[config.vid] = generateConfig(config.type, config)! as any;
    return this;
  }

  get(): SupportDataAllType {
    this.supportDataType = undefined;
    if (this.supportData) {
      return this.supportData;
    } else {
      return {};
    }
  }
}
