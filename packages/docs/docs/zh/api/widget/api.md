## defineComponent()

- **详情**

```ts
export interface ComponentOptions<
  Engine extends EngineWidget = any,
  Emit extends object = any,
  Props extends object = any,
  RawBindings extends object = any,
  Resources extends object = any
> {
  /**组件名 */
  name?: string;
  /**组件的事件列表 */
  emits?: Emit;
  /**父组件的传入 */
  props?: PropsOptions<Props>;
  /**注册的子组件 */
  components?: Record<string, ComponentOptions>;
  /**组件使用的engine */
  engine: Engine;
  /**组件挂载的位置 */
  el: string;
  /**组件需要加载的外部资源 */
  load: Record<string, string>;
  /**组件可以使用的资源 */
  resources?: () => Resources;
  /**组件的响应式对象和业务逻辑的位置 */
  setup?: (params: SetupParams<Engine, Props>) => RawBindings;
  /**组件渲染的目标 */
  render: (params: RenderParams<Resources>) => VNode | VNode[];
}

export const defineComponent = function <
  Engine extends EngineWidget = any,
  Emit extends object = any,
  Props extends object = any,
  RawBindings extends object = any,
  Resources extends object = any
>(
  options: ComponentOptions<Engine, Emit, Props, RawBindings, Resources>
): ComponentOptions<Engine, Emit, Props, RawBindings, Resources> {
  return options;
};
```

## onMounted()

- **详情**

```ts
/**
 * 组件挂载完成后的钩子函数
 * @param fn 函数方法
 */
const onMounted: (fn?: Function) => void;
```

## onBeforeDistory()

- **详情**

```ts
/**
 * 组件销毁之前的钩子函数
 * @param fn 函数方法
 */
const onBeforeDistory: (fn?: Function) => void;
```

## onFrame()

- **详情**

```ts
/**
 * 组件在每帧渲染时的钩子函数
 * @param fn 函数方法
 */
const onFrame: (fn?: Function) => void;
```

## h()

- **详情**

```ts
/**
 * 模板元素生成函数
 * @param type 元素类型
 * @param props 元素的属性
 * @returns VNode
 */
const h: (type: VNodeTypes, props?: Data | null) => VNode<Data>;

export type VNodeTypes = string | ComponentOptions;
```

## vfor()

- **详情**

```ts
/**
 * 模板渲染下的列表渲染空间
 * @param fun 列表渲染方法
 */
const vfor: (fun: () => void) => void;
```

## vif()

- **详情**

```ts
/**
 * 模板渲染下的条件渲染空间
 * @param fun 条件渲染方法
 */
const vif: (fun: () => void) => void;
```

## ref()

- **详情**

[https://cn.vuejs.org/api/reactivity-core.html#ref](https://cn.vuejs.org/api/reactivity-core.html#ref)

## reactive()

- **详情**

[https://cn.vuejs.org/api/reactivity-core.html#reactive](https://cn.vuejs.org/api/reactivity-core.html#reactive)

## computed()

- **详情**

[https://cn.vuejs.org/api/reactivity-core.html#computed](https://cn.vuejs.org/api/reactivity-core.html#computed)

## toRef()

- **详情**

[https://cn.vuejs.org/api/reactivity-utilities.html#toref](https://cn.vuejs.org/api/reactivity-utilities.html#toref)

## toRefs()

- **详情**

[https://cn.vuejs.org/api/reactivity-utilities.html#torefs](https://cn.vuejs.org/api/reactivity-utilities.html#torefs)

## shallowReactive()

- **详情**

[https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)

## shallowRef()

- **详情**

[https://cn.vuejs.org/api/reactivity-advanced.html#shallowref](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)

## shallowReadonly()

- **详情**

[https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly)

## watch()

- **详情**

[https://cn.vuejs.org/api/reactivity-core.html#watcheffect](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)

## watchEffect()

- **详情**

[https://cn.vuejs.org/api/reactivity-core.html#watch](https://cn.vuejs.org/api/reactivity-core.html#watch)
