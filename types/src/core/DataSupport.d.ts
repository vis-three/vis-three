import { SymbolConfig } from "../middleware/common/CommonConfig";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { Compiler, CompilerTarget } from "./Compiler";
import { IgnoreAttribute } from "./DataContainer";
import { Rule } from "./Rule";
export declare abstract class DataSupport<
  C extends SymbolConfig,
  O extends object,
  P extends Compiler<C, O>
> {
  abstract MODULE: MODULETYPE;
  private data;
  private broadcast;
  private translater;
  constructor(rule: Rule<P>, data: CompilerTarget<C>, ignore?: IgnoreAttribute);
  getData(): CompilerTarget<C>;
  setData(data: CompilerTarget<C>): this;
  proxyData(data: CompilerTarget<C>): CompilerTarget<C>;
  existSymbol(vid: string): boolean;
  addConfig(config: valueOf<CompilerTarget<C>>): this;
  getConfig(vid: string): C;
  removeConfig(vid: string): void;
  addCompiler(compiler: P): this;
  /**
   * 导出json化配置单
   * @returns json config
   */
  toJSON(compress?: boolean): string;
  /**
   * 导出配置单
   * @param compress 是否压缩配置单 default true
   * @returns config
   */
  exportConfig(compress?: boolean): CompilerTarget<C>;
  /**
   * 加载配置
   * @param configMap this module configMap
   * @returns true
   */
  load(configMap: CompilerTarget<C>): this;
  remove(config: CompilerTarget<C>): this;
  getModule(): MODULETYPE;
}
