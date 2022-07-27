import { CompilerTarget } from "../core/Compiler";
import { AnimationAllType } from "../middleware/animation/AnimationConfig";
import { CameraConfigAllType } from "../middleware/camera/CameraConfig";
import { SymbolConfig } from "../middleware/common/CommonConfig";
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
export declare type SupportDataAllType = CompilerTarget<TextureAllType> | CompilerTarget<MaterialAllType> | CompilerTarget<GeometryAllType> | CompilerTarget<LightConfigAllType> | CompilerTarget<CameraConfigAllType> | CompilerTarget<SpriteConfig> | CompilerTarget<LineConfig> | CompilerTarget<MeshConfig> | CompilerTarget<PointsConfig> | CompilerTarget<GroupConfig> | CompilerTarget<CSS3DAllType> | CompilerTarget<RendererConfigAllType> | CompilerTarget<SceneConfig> | CompilerTarget<PassConfigAllType> | CompilerTarget<ControlsAllConfig> | CompilerTarget<AnimationAllType>;
export declare class SupportDataGenerator {
    private supportData?;
    private supportDataType?;
    constructor();
    create(type: MODULETYPE): this;
    add<C extends SymbolConfig>(config: C): this;
    get(): SupportDataAllType;
}
