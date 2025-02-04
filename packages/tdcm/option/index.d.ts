import { DeepPartial } from "@vis-three/utils";
import { EngineSupport } from "../engine";
/**全局选项 */
export interface GlobalOption {
    /**代理选项 */
    proxy: {
        /**代理拓展方法 */
        expand?: (c: any) => any;
        /**拓展时机 */
        timing: "before" | "after";
        /**获取原对象的方法 */
        toRaw?: (c: any) => any;
    };
    /**唯一id选项 */
    symbol: {
        /**id生成器 */
        generator: Function;
        /**id的校验方法 */
        validator: (id: string) => boolean;
    };
    /**全局引擎 */
    engine?: EngineSupport;
}
export declare const globalOption: GlobalOption;
/**
 * 定义全局选项
 * @param options 可定义的选项
 */
export declare const defineOption: (options: DeepPartial<GlobalOption>) => void;
