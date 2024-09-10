import { EngineSupport, EngineSupportOptions, EngineSupportParameters } from "@vis-three/tdcm";
import { ComponentOptions } from "../component";
import { Widget } from "../widget";
export declare class EngineWidget extends EngineSupport {
    constructor(params?: Partial<EngineSupportParameters>);
    createWidget<Props extends object = {}, RawBindings extends object = {}>(component: ComponentOptions<typeof this, Props, RawBindings>): Widget<this, Props, RawBindings>;
}
export interface EngineWidgetOptions extends EngineSupportOptions {
    wdigets: ComponentOptions[];
}
export declare const defineEngineWidget: <E extends EngineWidget = EngineWidget>(options: EngineWidgetOptions, params?: Partial<EngineSupportParameters>) => E;
