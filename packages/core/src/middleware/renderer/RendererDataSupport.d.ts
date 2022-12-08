import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { RendererAllType, RendererCompiler } from "./RendererCompiler";
import { RendererConfigAllType } from "./RendererConfig";
export declare class RendererDataSupport extends DataSupport<RendererConfigAllType, RendererAllType, RendererCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<RendererConfigAllType>);
}
