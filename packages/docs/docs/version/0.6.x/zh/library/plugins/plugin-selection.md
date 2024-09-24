# @vis-three/plugin-selection

选择插件。

场景物体选择的统一分发处理入口。

- 此插件会通过`engine`抛出`selected`方法

```ts
engine.install(SelectionPlugin());

engine.addEventListener("selected", (event) => {
  console.log(event.objects);
});
```

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-selection">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-selection?color=blue">

## 插件名称

`SelectionPlugin`

:::tip
可以使用枚举：`SELECTION_PLUGIN`
:::

## 插件依赖

无

## 插件传参

无

## 引擎拓展

```ts
export interface SelectionEngine extends Engine {
  /**当前engine的选中对象集合 */
  selectionBox: Set<Object3D>;
  /**设置当前engine的选中物体 */
  setSelectionBox: (objects: Object3D[]) => SelectionEngine;
}
```

:::tip
如果你想通过脚本设置当前`engine`的选中物体，请通过`setSelectionBox`进行，因为其内部会触发`engine`的`selected`事件。
:::
