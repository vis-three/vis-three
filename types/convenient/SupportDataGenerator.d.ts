import { CameraCompilerTarget } from "../middleware/camera/CameraCompiler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { GeometryCompilerTarget } from "../middleware/geometry/GeometryCompiler";
import { LightCompilerTarget } from "../middleware/light/LightCompiler";
import { MaterialCompilerTarget } from "../middleware/material/MaterialCompiler";
import { ModelCompilerTarget } from "../middleware/model/ModelCompiler";
import { RendererCompilerTarget } from "../middleware/render/RendererCompiler";
import { TextureCompilerTarget } from "../middleware/texture/TextureCompiler";
export declare type SupportDataAllType = TextureCompilerTarget | MaterialCompilerTarget | LightCompilerTarget | GeometryCompilerTarget | ModelCompilerTarget | CameraCompilerTarget | RendererCompilerTarget;
export declare class SupportDataGenerator {
    private static configModelMap;
    private supportData?;
    private supportDataType?;
    constructor();
    create(type: MODULETYPE): this;
    add<C extends SymbolConfig>(config: C): this;
    get(): SupportDataAllType;
}
