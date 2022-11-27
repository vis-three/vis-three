export const stringify = (key, value) => {
  if (value === Infinity) {
    return "Infinity";
  }

  if (value === -Infinity) {
    return "-Infinity";
  }

  return value;
};

export const parse = (key, value) => {
  if (value === "Infinity") {
    return Infinity;
  }

  if (value === "-Infinity") {
    return -Infinity;
  }

  return value;
};

/**
 * 深度克隆对象
 * @param object 配置对象
 * @returns deep clone object
 */
export const clone = <T extends object>(object: T): T => {
  return JSON.parse(JSON.stringify(object, stringify), parse);
};

/**
 * 管道处理
 */
export class Pipeline {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  pipe(fun: (config: any) => any): this {
    this.config = fun(this.config);
    return this;
  }

  get() {
    return this.config;
  }
}

export default {
  stringify,
  parse,
  clone,
  Pipeline,
};
