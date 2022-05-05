import { v4 as getUuid } from "uuid";
import { ShaderLibrary } from "../library/shader/ShaderLibrary";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGTYPE } from "../middleware/constants/configType";
/**
 * 生成相关对象配置单
 * @param type 对象类型 CONFIGTYPE
 * @param merge 合并的对象
 * @param strict 严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭
 * @param warn 是否输出warn
 * @returns config object
 */
export const generateConfig = function (type, merge, strict = true, warn = true) {
    if (CONFIGFACTORY[type]) {
        const recursion = (config, merge) => {
            for (const key in merge) {
                if (config[key] === undefined) {
                    !strict && (config[key] = merge[key]); // 允许额外配置
                    strict &&
                        warn &&
                        console.warn(`'${type}' config can not set key: ${key}`);
                    continue;
                }
                if (typeof merge[key] === "object" &&
                    merge[key] !== null &&
                    !Array.isArray(merge[key])) {
                    recursion(config[key], merge[key]);
                }
                else {
                    config[key] = merge[key];
                }
            }
        };
        const initConfig = CONFIGFACTORY[type]();
        // shader配置
        if ([CONFIGTYPE.SHADERMATERIAL, CONFIGTYPE.RAWSHADERMATERIAL].includes(type)) {
            const shaderConfig = ShaderLibrary.generateConfig(merge?.shader || "defaultShader");
            const cacheStrict = strict;
            strict = false;
            recursion(initConfig, shaderConfig);
            strict = cacheStrict;
        }
        // 自动生成uuid
        if (initConfig.vid === "") {
            initConfig.vid = getUuid();
        }
        merge && recursion(initConfig, merge);
        return initConfig;
    }
    else {
        console.error(`type: ${type} can not be found in configList.`);
        return null;
    }
};
//# sourceMappingURL=generateConfig.js.map