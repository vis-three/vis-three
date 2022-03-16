import { CameraCompilerTarget } from "../middleware/camera/CameraCompiler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
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
export declare type SupportDataAllType = TextureCompilerTarget | MaterialCompilerTarget | LightCompilerTarget | GeometryCompilerTarget | CameraCompilerTarget | RendererCompilerTarget | SpriteCompilerTarget | GroupCompilerTarget | MeshCompilerTarget | PointsCompilerTarget | LineCompilerTarget;
export declare class SupportDataGenerator {
    private static configModelMap;
    private supportData?;
    private supportDataType?;
    constructor();
    create(type: MODULETYPE): this;
    add<C extends SymbolConfig>(config: C): this;
    get(): SupportDataAllType;
}
