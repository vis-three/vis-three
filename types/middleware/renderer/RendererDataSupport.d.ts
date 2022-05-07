import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { RendererCompiler, RendererCompilerTarget } from "./RendererCompiler";
export declare class RendererDataSupport extends DataSupport<RendererCompilerTarget, RendererCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: RendererCompilerTarget, ignore?: IgnoreAttribute);
}
