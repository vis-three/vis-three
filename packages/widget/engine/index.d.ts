import { EngineSupport, EngineSupportParameters } from "@vis-three/middleware";
import { ComponentOptions } from "../component";
import { Widget } from "../widget";
export declare class EngineWidget extends EngineSupport {
    constructor(params?: Partial<EngineSupportParameters>);
    createWidget(component: ComponentOptions): Widget;
}
