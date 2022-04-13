/**
 * 生成相关对象配置单
 * @param type 对象类型 CONFIGTYPE
 * @param merge 合并的对象
 * @param strict 严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭
 * @param warn 是否输出warn
 * @returns config object
 */
export declare const generateConfig: <C extends object>(type: string, merge?: object | undefined, strict?: boolean, warn?: boolean) => C | null;
