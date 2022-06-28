import { EngineSupport } from "../engine/EngineSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { DeepPartial } from "../utils/utils";
export interface GenerateConfig {
    (type: CONFIGTYPE | string, merge?: DeepPartial<ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>> | undefined, strict?: boolean, warn?: boolean): ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>;
    autoInject: boolean;
    injectEngine: EngineSupport | null;
    injectScene: string | boolean;
}
export interface C extends SymbolConfig {
}
/**
 * 生成相关对象配置单
 * @param type 对象类型 CONFIGTYPE
 * @param merge 合并的对象
 * @param strict 严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭
 * @param warn 是否输出warn
 * @returns config object
 */
export declare const generateConfig: GenerateConfig;
