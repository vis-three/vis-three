# realTimeAnimate

实时动画事件。

### colorChange

变换颜色。

- **类型**

```ts
export interface ColorChange extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**目标属性 */
    attribute: string;
    /**目标颜色rgb */
    color: string;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: ColorChange = {
  name: "colorChange",
  params: {
    target: "",
    attribute: "color",
    color: "rgb(255, 255, 255)",
    delay: 0,
    duration: 500,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```

### fadeObject

渐变物体。

- **类型**

```ts
export interface FadeObject extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**渐变方向 */
    direction: "in" | "out";
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
    /**是否影响visible */
    visible: boolean;
  };
}
```

- **默认**

```ts
export const config: FadeObject = {
  name: "fadeObject",
  params: {
    target: "",
    direction: "out",
    delay: 0,
    duration: 300,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    visible: true,
  },
};
```

### focusObject

相机聚焦物体。

- **类型**

```ts
export interface FocusObject extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**所使用的相机，可以不传，不传为当前的相机 */
    camera: string;
    /**聚焦的坐标空间 */
    space: "local" | "world";
    /**相机的偏移距离 */
    offset: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
    /**是否双击自动返回 */
    back: boolean;
  };
}
```

- **默认**

```ts
export const config: FocusObject = {
  name: "focusObject",
  params: {
    target: "",
    camera: "",
    space: "world",
    offset: {
      x: 0,
      y: 0,
      z: 20,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    back: true,
  },
};
```

### moveFromTo

从一个位置移动到另一个位置。

- **类型**

```ts
export interface moveFromTo extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**起点位置 */
    from: Vector3Config;
    /**终点位置 */
    to: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: moveFromTo = {
  name: "moveFromTo",
  params: {
    target: "",
    from: {
      x: 0,
      y: 0,
      z: 0,
    },
    to: {
      x: 10,
      y: 10,
      z: 10,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```

### moveSpacing

移动一段距离。

- **类型**

```ts
export interface MoveSpacing extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**移动距离 */
    spacing: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: MoveSpacing = {
  name: "moveSpacing",
  params: {
    target: "",
    spacing: {
      x: 10,
      y: 10,
      z: 10,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```

### moveTo

从当前位置移动到一个位置。

- **类型**

```ts
export interface MoveTo extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**目标位置 */
    position: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: MoveTo = {
  name: "moveTo",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```

### moveToObject

移动到一个指定物体的位置。

- **类型**

```ts
export interface MoveToObject extends BasicEventConfig {
  params: {
    /**要移动的物体 */
    target: string;
    /**参照物体 */
    to: string;
    /**位置偏移量 */
    offset: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: MoveToObject = {
  name: "moveToObject",
  params: {
    target: "",
    to: "",
    offset: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```

### orbitTargetMove

轨道控制器目标的移动方法。

- **类型**

```ts
export interface OrbitTargetMove extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**偏移量 */
    offset: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: OrbitTargetMove = {
  name: "orbitTargetMove",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```

### rotationTo

旋转到一个角度。

- **类型**

```ts
export interface RotationTo extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**目标角度欧拉角 */
    rotation: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: RotationTo = {
  name: "rotationTo",
  params: {
    target: "",
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```

### showToCamera

将物体展示到相机。

- **类型**

```ts
export interface ShowToCamera extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**面对相机的偏移量 */
    offset: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
    /**是否双击返回 */
    back: boolean;
  };
}
```

- **默认**

```ts
export const config: ShowToCamera = {
  name: "showToCamera",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: -30,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    back: true,
  },
};
```

### upTo

将物体的上朝向更改到指定方向。

- **类型**

```ts
export interface UpTo extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**目标朝向 */
    up: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: UpTo = {
  name: "upTo",
  params: {
    target: "",
    up: {
      x: 0,
      y: 1,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```

### vector3To

将物体一个为`vector3`属性更改到另外一个值。

- **类型**

```ts
export interface Vector3To extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**目标属性 */
    attribute: string;
    /**属性对应的x,y,z分量 */
    props: {
      x: string;
      y: string;
      z: string;
    };
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**目标值 */
    to: Partial<Vector3Config>;
    /**是否同步变化后配置 */
    compiling: boolean;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}
```

- **默认**

```ts
export const config: Vector3To = {
  name: "vector3To",
  params: {
    target: "",
    attribute: ".position",
    props: {
      x: "x",
      y: "y",
      z: "z",
    },
    delay: 0,
    duration: 500,
    to: {},
    compiling: false,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};
```
