## 介绍

基于配置化开发下的应用能够通过配置编译给物体增加相应的事件。

## 事件库使用

事件库目前是`EngineSupport`下的专用库，可以在`generateConfig`下的事件属性中使用。

```js
const mesh = Vis.generateConfig("Mesh", {
  pointerup: [
    Vis.EventLibrary.generateConfig("openWindow", {
      params: {
        url: "https://gitee.com/Shiotsukikaedesari/vis-three",
      },
    }),
  ],
});
```

## 自定义事件

EventLibrary 除了内置的部分事件还运行自定义事件供不同场景下使用。

### 定义事件的配置和对应的事件生成器

```ts
// 配置化的配置接口
export interface OpenWindow extends BasicEventConfig {
  params: {
    url: string;
  };
}

// 配置单
export const config: OpenWindow = {
  name: "openWindow", // name为此事件的事件名，唯一
  // 参数接口最好统一格式，方便统一组件
  params: {
    url: "",
  },
  // finish: { // 完成时结构

  // }
};

// 事件生成器
export const generator: EventGenerator<OpenWindow> = function (
  engine: EngineSupport,
  config: OpenWindow
): (event?: ObjectEvent) => void {
  return () => {
    window.open(config.params.url);
  };
};
```

### 自定义事件注册

```ts
import * as OpenWindow from "./BasicEventLibrary/openWindow";

EventLibrary.register(OpenWindow.config, OpenWindow.generator);
```

## 基础事件库

### openWindow

打开窗口

```js
const config = {
  name: "openWindow",
  params: {
    url: "", // 窗口地址
  },
};
```

## 事件动画库

### 动画插值函数

```ts
export enum TIMINGFUNCTION {
  EASING_LINEAR_NONE = "EASING_LINEAR_NONE", // 线性
  EASING_QUARTIC_IN = "EASING_QUARTIC_IN",
  EASING_QUARTIC_OUT = "EASING_QUARTIC_OUT",
  EASING_QUARTIC_INOUT = "EASING_QUARTIC_INOUT",
  EASING_QUARTIC_INOUT = "EASING_QUARTIC_INOUT",
  EASING_QUADRATIC_IN = "EASING_QUADRATIC_IN",
  EASING_QUADRATIC_OUT = "EASING_QUADRATIC_OUT",
  EASING_QUADRATIC_INOUT = "EASING_QUADRATIC_INOUT",
}
```

### moveSpacing

物体移动距离

```js
const config = {
  name: "moveSpacing",
  params: {
    target: "", // 目标物体vid
    // 移动距离
    spacing: {
      x: 10,
      y: 10,
      z: 10,
    },
    delay: 0, // 延迟时间
    duration: 1000, // 动画时长
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT, // 动画插值函数
  },
};
```

### moveTo

物体移动到

```js
const config = {
  name: "moveTo",
  params: {
    target: "", // 目标物体vid
    // 目标位置
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0, // 延迟时间
    duration: 1000, // 动画时长
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT, // 动画插值函数
  },
};
```

### fadeObject

淡入淡出物体

```js
const config = {
  name: "fadeObject",
  params: {
    target: "", // 目标物体vid
    direction: "out", // out 淡出， in 淡入
    delay: 0, // 延迟时间
    duration: 1000, // 动画时长
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT, // 动画插值函数
    visible: false, // 是否会影响物体的visible属性 direction为out时
  },
};
```

### focusObject

聚焦物体

> 会让当前的场景相机聚焦到目标物体

```js
const config = {
  name: "foucsObject",
  params: {
    target: "", // 目标物体vid
    space: "world", // 聚焦基于的物体空间 world: 基于世界矩阵聚焦， local: 基于本地矩阵聚焦
    // 相对偏移量
    offset: {
      x: 0,
      y: 0,
      z: 20,
    },
    delay: 0, // 延迟时间
    duration: 1000, // 动画时长
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT, // 动画插值函数
    back: true, // 是否能返回到聚焦前状态 双击触发
  },
};
```

### showToCamera

展示到相机

```js
const config = {
  name: "showToCamera",
  params: {
    target: "", // 目标物体vid
    // 相对偏移量
    offset: {
      x: 0,
      y: 0,
      z: -30,
    },
    delay: 0, // 延迟时间
    duration: 1000, // 动画时长
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT, // 动画插值函数
    back: true, // 是否能返回到展示前状态 双击触发
  },
};
```
