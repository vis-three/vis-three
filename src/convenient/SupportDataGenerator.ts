import { CameraCompilerTarget } from "../middleware/camera/CameraCompiler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { GeometryCompilerTarget } from "../middleware/geometry/GeometryCompiler";
import { GroupCompilerTarget } from "../middleware/group/GroupCompiler";
import { LightCompilerTarget } from "../middleware/light/LightCompiler";
import { LineCompilerTarget } from "../middleware/line/LineCompiler";
import { MaterialCompilerTarget } from "../middleware/material/MaterialCompiler";
import { MeshCompilerTarget } from "../middleware/mesh/MeshCompiler";
import { PointsCompilerTarget } from "../middleware/points/PointsCompiler";
import { RendererCompilerTarget } from "../middleware/renderer/RendererCompiler";
import { SpriteCompilerTarget } from "../middleware/sprite/SpriteCompiler";
import { TextureCompilerTarget } from "../middleware/texture/TextureCompiler";
import { getConfigModuleMap } from "../utils/utils";
import { generateConfig } from "./generateConfig";

export type SupportDataAllType =
  | TextureCompilerTarget
  | MaterialCompilerTarget
  | LightCompilerTarget
  | GeometryCompilerTarget
  | CameraCompilerTarget
  | RendererCompilerTarget
  | SpriteCompilerTarget
  | GroupCompilerTarget
  | MeshCompilerTarget
  | PointsCompilerTarget
  | LineCompilerTarget;

export class SupportDataGenerator {
  private static configModelMap = getConfigModuleMap();

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

    if (
      SupportDataGenerator.configModelMap[config.type] !== this.supportDataType
    ) {
      console.warn(
        `current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config.type}'`
      );
      return this;
    }

    this.supportData[config.vid] = generateConfig(config.type, config)!;
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
