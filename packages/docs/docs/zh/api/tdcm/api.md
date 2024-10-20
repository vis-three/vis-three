# 核心 api

## JSONHandler

`json`结构处理`api`，用于快速处理配置单。

### JSONHandler.stringify()

对象`json`化。相较于普通的`stringify`内部含有特殊`key`、`value`处理。

- **示例**

```ts
const json = JSON.stringify(obj, JSONHandler.string);
```

### JSONHandler.parse()

`json`解析。相较于普通的`parse`内部含有特殊`key`、`value`处理。

- **示例**

```ts
const obj = JSON.parse(json, JSONHandler.parse);
```

### JSONHandler.clone()

对象通过`json`化进行深度拷贝。

- **示例**

```ts
const obj = JSONHandler.clone(raw);
```

## Template

对象结构的模板化处理。

### Template.clone()

- **详情**

```ts
/**
 * 克隆整个配置单
 * @param object EngineSupportLoadOptions
 * @param options 额外选项
 * - detail:bolean 返回clone映射 old -> new
 * - fillName 是否填充未命名的单位
 * - filter 过滤的选项，不会被克隆
 * @returns EngineSupportLoadOptions | CloneResult
 */
const clone: (
  object: EngineSupportLoadOptions,
  options?: {
    filter?: string[];
    detail?: boolean;
    fillName?: boolean | ((BasicConfig: any) => string);
  }
) => EngineSupportLoadOptions | CloneResult;
```

- **示例**

```ts
const cloneConfig = Template.clone(config);

const { config: newConfig, detail } = Template.clone(config, { detail: true });

const cloneConfig = Template.clone(config, {
  filter: ["mesh", "geometry"],
});
```

### Template.handler()

- **详情**

```ts
/**
 * 对配置单中的每个配置项做处理
 * @param object 需要模板处理的对象
 * @param handler 模板处理方法
 * @param options
 * - filter 过滤的选项，不会被处理
 * - clone 是否为克隆处理，不克隆会直接影响原对象
 * @return 原对象或克隆对象
 */
const handler: (
  object: EngineSupportLoadOptions,
  handler: (config: BasicConfig) => BasicConfig,
  options?: {
    filter?: string[];
    clone?: boolean;
  }
) => EngineSupportLoadOptions;
```

- **示例**

```ts
const doConfig = Template.handler(config, (c) => {
  c.name = c.vid.slice(-2);
  return c;
});

const cloneConfig = Template.handler(
  config,
  (c) => {
    c.name = c.vid.slice(-2);
    return c;
  },
  {
    clone: true,
    filter: ["mesh", "geometry"],
  }
);
```

### Template.observable()

- **详情**

```ts
/**
 * 将整个对象进行观察者转化，内部会进行深度拷贝，和使用`generateConfig` api
 * @param object 配置单结构
 * @param obCallback 转化完成后的处理
 * @returns 可观察的配置
 */
const observable: (
  object: EngineSupportLoadOptions | string,
  obCallback?: (config: BasicConfig) => BasicConfig
) => EngineSupportLoadOptions;
```

- **示例**

```ts
const obConfig = Template.observable(config);

const obConfig = Template.observable(config, (c) => Vue.observable(c));
```

## createSymbol()

- **详情**

```ts
/**
 * 生成标记，内部使用defineOption定义的方法
 * @returns 标记
 */
const createSymbol: () => any;
```

- **示例**

```ts
const vid = createSymbol();
```

## uniqueSymbol()

- **详情**

```ts
/**
 * 默认唯一标记，通过类型生成，这个标记是固定的
 * 比如对于全局只有唯一的配置类型可以使用此方法
 * @param type 配置的类型
 * @returns
 * @example
 * const gl = uniqueSymbol('WebGLRenderer')
 */
const uniqueSymbol: (type: string) => string;
```

- **示例**

```ts
const gl = uniqueSymbol("WebGLRenderer");

const vid = uniqueSymbol(CONFIG_TYPE.SCENE);
```

## getBasicConfig()

- **详情**

```ts
/**
 * 获取基础配置单结构
 * @returns
 */
const getBasicConfig: () => BasicConfig;
```

- **示例**

```ts
const config = getBasicConfig();

defineModel({
  config: () => {
    ...getBasicConfig(),
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  }
})
```

## generateConfig()

- **详情**

```ts
export interface GenerateOptions<C extends BasicConfig> {
  /**是否生成响应式配置，默认为true */
  observer?: boolean;
  /**严格模式，只允许合并CONFIG_TYPE规定的属性，自定义扩展配置下关闭 */
  strict?: boolean;
  /**控制台是否输出warn */
  warn?: boolean;
  /**
   * 配置额外处理方法，不过建议使用全局选项`defineOption`,除非特殊情况再使用此方法。
   */
  handler?: (c: C) => C;
}

export interface GenerateConfig {
  /**
   * 生成相关对象配置单
   * @param type 对象类型 CONFIG_TYPE
   * @param merge 合并的对象
   * @param options 函数的拓展选项
   * @returns config object
   */
  <C extends BasicConfig>(
    type: string,
    merge?: DeepPartial<C>,
    options?: GenerateOptions<C>
  ): C;
  /**是否自动注入*/
  autoInject: boolean;
  /**自动注入的目标引擎 */
  injectEngine: EngineSupport | null;
  /**自动注入场景，设置目标场景可以传入场景的vid，如果是true则会加入当前的场景 */
  injectScene: string | boolean;
}
```

- **示例**

```ts
const config = generateConfig("Mesh");

const config = generateConfig("Mesh", {
  position: { x: 10 },
});

const config = generateConfig(
  "Mesh",
  {
    position: { x: 10 },
  },
  {
    ob: false,
  }
);

generateConfig.autoInject = true;
generateConfig.injectEngine = engine;

generateConfig(
  "Mesh",
  {
    click: EventGeneratorManager.generateConfig("MoveTo", {
      x: 10,
    }),
  },
  {
    strict: false,
    warn: false,
  }
);
```

## defineModule()

- **详情**

```ts
/**
 * 定义一个模块
 * @param module 模块选项moduleOptions
 * @returns
 */
const defineModule: <
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
>(
  module: ModuleOptions<E, O>
) => ModuleOptions<E, O>;

/** 模块选项 */
export interface ModuleOptions<
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
> {
  /** 模块类型 建议为小驼峰*/
  type: string;
  /** 模块的编译器 */
  compiler?: new (...args) => O;
  /** 模块的编译规则 */
  rule?: Rule[];
  /** 模块所包含的配置化模型 */
  models: ModelOption<any, any, any, any, E, O>[];
  resources?: LoadUnit[];
  /** 是否为一个物体模块 */
  object?: boolean;
  /** 安装该模块对engine产生的扩展 */
  extend?: (engine: E) => void;
  /** 模块的生命周期顺序 */
  lifeOrder?: number;
}
```

- **示例**

```ts
export default defineModule({
  type: "light",
  models: [PointLightModel, SpotLightModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
```

## defineModel()

- **详情**

```ts
/**
 * 定义一个模型
 * @param option 模型选项ModelOption
 * @returns
 */
const defineModel = function <
  Cf extends BasicConfig = BasicConfig,
  Obj extends object = object,
  Ctx extends object = object,
  Srd extends object = object,
  Eg extends EngineSupport = EngineSupport,
  Cpl extends Compiler<Eg> = Compiler<Eg>
>(option: ModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl>) {
  return option;
};

/**模型选项 */
export interface ModelOption<
  Cf extends BasicConfig = BasicConfig,
  Obj extends object = object,
  Ctx extends object = object,
  Srd extends object = object,
  Eg extends EngineSupport = EngineSupport,
  Cpl extends Compiler<Eg> = Compiler<Eg>
> {
  /**模型类型 建议为大驼峰*/
  type: string;
  /**模型的配置结构 */
  config: () => Cf;
  /**模型实例的共享属性方法 */
  shared?: Srd;
  /**模型实例的特有属性方法 */
  context?: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
    }
  ) => Ctx;
  /**模型的命令链 */
  commands?: ModelCommands<
    Cf,
    Obj,
    Eg,
    Cpl,
    Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx
  >;
  /**模型的生成方法 */
  create: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
      config: Cf;
      engine: Eg;
      compiler: Cpl;
    }
  ) => Obj;
  /**模型的销毁方法 */
  dispose: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
      target: Obj;
      puppet: Obj;
      config: Cf;
      engine: Eg;
      compiler: Cpl;
    }
  ) => void;
  /**该模型应用时对其他模型产生的扩展 */
  expand?: [
    {
      models: string | string[] | RegExp;
      config: () => object;
      commands: ModelCommands<any, any, any, any, any>;
    }
  ];
}
```

- **示例**

```ts
export default defineModel({
  type: "Pointlight",
  config: () => ({
    ...getBasicConfig(),
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  }),
  commands: {
    set: {
      position: {
        x() {
          // do ...
        },
      },
    },
  },
  create() {
    // do ...
  },
  dispose() {
    // do ...
  },
});
```

### defineModel.extend()

- **详情**

```ts
/**
 * 定义模型的拓展方法，相当于定义一个父类
 * @param abstract 父类的抽象方法
 * @returns defineModel((abstract) => ModelOptions)
 */

defineModel.extend = function (abstract) {
  return function ((abstract) => ModelOptions) {
    return ModelOptions
  }
}; // 太长简化
```

- **示例**

```ts
const defineLightModel = defineModel.extend({
  commands: {
    // do...
  },
  create() {
    // do...
  },
});

const PointLightModel = defineLightModel((lightModel) => {
  type: 'PointLight',
  config: () => {},
  commands: {},
  create() {
    lightModel.create()
    // do...
  },
  dispose() {}
})
```

## defineRule()

- **详情**

```ts
export interface CtnNotice extends ObNotice {
  /**配置唯一的vid */
  symbol: string;
  /**操作属性 */
  operate: "add" | "set" | "delete";
  /**操作的对象路径 */
  path: string;
  /**操作的当前key */
  key: string;
  /**操作值 */
  value: any;
}

export type Rule = (input: CtnNotice, compiler: Compiler) => boolean;

/**
 * 定义规则链
 * @param rules 规则链
 * @returns rules
 */
const defineRule: (rules: Rule[]) => Rule[];
```

- **示例**

```ts
export default defineRule([
  DEFAULT_RULE.SYMBOL_VALIDATOR,
  (input) => {
    return input.key !== "parent";
  },
  DEFAULT_RULE.OPERATE_ADD,
  DEFAULT_RULE.OPERATE_DELETE,
  DEFAULT_RULE.OPERATE_COVER,
  DEFAULT_RULE.OPERATE_COMPILE,
]);
```

## defineOption()

- **详情**

```ts
/**
 * 定义全局选项
 * @param options 可定义的选项
 */
const defineOption: (options: DeepPartial<GlobalOption>) => void;

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
```

- **示例**

```ts
defineOption({
  proxy: {
    expend: reactive,
    timing: "after",
  },
});

defineOption({
  symbol: {
    generator: v4,
    validator: validate,
  },
});
```

## defineEngineSupport()

- **详情**

```ts
/**
 * 定义一个配置化引擎
 * @param options 定义引擎的选项
 * @param params 引擎的参数
 * @returns engine extends EngineSupport
 */
const defineEngineSupport: <E extends EngineSupport = EngineSupport>(
  options: EngineSupportOptions,
  params?: Partial<EngineSupportParameters>
) => E;
```

- **示例**

```ts
const engine = defineEngineSupport({
  plugins: [WebGLRendererPlugin(), EffectComposerPlugin()],
  strategys: [EffectRenderPlugin()],
  modules: [GeometryModule, MaterialModule, MeshModule],
});
```
