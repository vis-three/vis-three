import { CameraCompilerTarget } from "../case/camera/CameraCompiler";
import { SymbolConfig } from "../case/common/CommonConfig";
import { MODULETYPE } from "../case/constants/MODULETYPE";
import { GeometryCompilerTarget } from "../case/geometry/GeometryCompiler";
import { LightCompilerTarget } from "../case/light/LightCompiler";
import { MaterialCompilerTarget } from "../case/material/MaterialCompiler";
import { ModelCompilerTarget } from "../case/model/ModelCompiler";
import { RendererCompilerTarget } from "../case/render/RendererCompiler";
import { TextureCompilerTarget } from "../case/texture/TextureCompiler";
export declare type SupportDataAllType = TextureCompilerTarget | MaterialCompilerTarget | LightCompilerTarget | GeometryCompilerTarget | ModelCompilerTarget | CameraCompilerTarget | RendererCompilerTarget;
export declare class SupportDataGenerator {
    private static dataTypeMap;
    private supportData?;
    private supportDataType?;
    constructor();
    create(type: MODULETYPE): this;
    add<C extends SymbolConfig>(config: C): this;
    get(): SupportDataAllType;
}
