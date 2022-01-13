import { DataSupport } from "../../middleware/DataSupport";
import { RendererCompiler, RendererCompilerTarget } from "./RendererCompiler";
export declare class RendererDataSupport extends DataSupport<RendererCompilerTarget, RendererCompiler> {
    constructor(data?: RendererCompilerTarget);
}
