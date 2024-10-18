import { DeepPartial } from "@vis-three/utils";
import { EngineSupport } from "../engine";
import { nanoid } from "nanoid";

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

export const globalOption: GlobalOption = {
  proxy: {
    expand: undefined,
    timing: "before",
    toRaw: undefined,
  },
  symbol: {
    generator: nanoid,
    validator: (id) => typeof id === "string" && id.length === 21,
  },
  engine: undefined,
};

/**
 * 定义全局选项
 * @param options 可定义的选项
 */
export const defineOption = function (options: DeepPartial<GlobalOption>) {
  if (options.proxy) {
    Object.assign(globalOption.proxy, options.proxy);
  }

  if (options.symbol) {
    Object.assign(globalOption.symbol, options.symbol);
  }
};
