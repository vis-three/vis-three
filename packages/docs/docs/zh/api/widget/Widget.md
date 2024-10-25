# 部件对象

`3D`层面的`App`概念，但是由于都在场景中，相当于场景中的一部分，所以命名为`widget`小部件。

## 构造

- **类型**

```ts
/**
 * @param engine 组件使用的引擎
 * @param component 部件所使用的组件
 */
constructor Widget<Engine extends EngineWidget = EngineWidget, Props extends object = any, RawBindings extends object = any>(engine: Engine, component: ComponentOptions<Engine, Props, RawBindings>): Widget<Engine, Props, RawBindings>
```

## 属性

### wid

组件的 id 标识，使用的是`@vis-three/tdcm`的`globalOption.symbol.generator`

- **类型**

```ts
any;
```

### version

组件的版本。

- **类型**

```ts
string;
```

### components

组件的版本。

- **类型**

```ts
string;
```

### renderer

组件的渲染器。

- **类型**

```ts
Renderer<Engine>;
```

### root

当前部件的根组件

- **类型**

```ts
ComponentOptions<Engine, Props, RawBindings, any, any>;
```

### instance

当前部件的根组件实例。

- **类型**

```ts
Component<any, any, any, any, any> | null;
```

### engine

当前部件所使用的引擎。

- **类型**

```ts
Engine extends EngineWidget = EngineWidget;
```

## 方法

### component

- **详情**

```ts
/**
 * 注册布局全局组件
 * @param name 组件名
 * @param component 组件选项
 * @returns
 */
component(name: string | ComponentOptions, component?: ComponentOptions): void
```

### mount

- **详情**

```ts
/**
 * 部件挂载
 * @returns this
 */
mount(): this
```

### getState

- **详情**

```ts
/**
 * 获取根组件的状态对象
 * @returns any
 */
getState(): any
```

### unmount

- **详情**

```ts
/**
 * 解除部件绑定
 */
unmount(): void
```
