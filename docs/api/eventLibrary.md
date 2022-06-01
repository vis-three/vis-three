## 介绍

基于配置化开发下的应用能够通过配置编译给物体增加相应的事件。

## 事件使用

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

### 前置变量

具体请查看 vis-three\src\library\event\RealTimeAnimateLibrary\common.ts

```ts
import { Easing } from "@tweenjs/tween.js";

export enum TIMINGFUNCTION {
  ELN = "ELN",
  EQI = "EQI",
}

export const timingFunction: {
  [key in TIMINGFUNCTION]: (amount: number) => number;
} = {
  ELN: Easing.Linear.None,
  EQI: Easing.Quadratic.InOut,
};
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
    timingFunction: TIMINGFUNCTION.EQI, // 动画插值函数
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
    timingFunction: TIMINGFUNCTION.EQI, // 动画插值函数
  },
};
```
