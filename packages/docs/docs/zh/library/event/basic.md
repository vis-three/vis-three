# BasicEvent

基础事件。

### addClass

给`dom`物体添加一个`class`。

- **类型**

```ts
export interface AddClass extends BasicEventConfig {
  params: {
    /**dom物体，一个或者多个，或者engine中所有 */
    target: string | string[] | "all";
    /**class名字 */
    className: string;
    /**延迟时间 */
    delay: number;
  };
}
```

- **默认**

```ts
export const config: AddClass = {
  name: "addClass",
  params: {
    target: "",
    className: "",
    delay: 0,
  },
};
```

### changeCamera

更换`engine`的相机。

- **类型**

```ts
export interface ChangeCamera extends BasicEventConfig {
  params: {
    /**要更换的相机 */
    camera: string;
    /**延迟时间 */
    delay: number;
  };
}
```

- **默认**

```ts
export const config: ChangeCamera = {
  name: "changeCamera",
  params: {
    camera: "",
    delay: 0,
  },
};
```

### changeCursor

更换鼠标`css`指针类型。

- **类型**

```ts
export interface ChangeCursor extends BasicEventConfig {
  params: {
    /**指针类型 */
    cursor: string;
    /**延迟时间 */
    delay: number;
  };
}
```

- **默认**

```ts
export const config: ChangeCursor = {
  name: "changeCursor",
  params: {
    cursor: "",
    delay: 0,
  },
};
```

### changeScene

切换`engine`的当前渲染场景。

- **类型**

```ts
export interface ChangeScene extends BasicEventConfig {
  params: {
    /**当前场景 */
    scene: string;
    /**延迟时间 */
    delay: number;
  };
}
```

- **默认**

```ts
export const config: ChangeScene = {
  name: "changeScene",
  params: {
    scene: "Scene",
    delay: 0,
  },
};
```

### openWindow

打开一个外部链接。

- **类型**

```ts
export interface OpenWindow extends BasicEventConfig {
  params: {
    /**链接地址 */
    url: string;
  };
}
```

- **默认**

```ts
export const config: OpenWindow = {
  name: "openWindow",
  params: {
    url: "",
  },
};
```

### setParent

设置一个对象的父级。

- **类型**

```ts
export interface OpenWindow extends BasicEventConfig {
  params: {
    /**链接地址 */
    url: string;
  };
}
```

- **默认**

```ts
export const config: OpenWindow = {
  name: "openWindow",
  params: {
    url: "",
  },
};
```

### setPosition

设置一个物体的位置。

- **类型**

```ts
export interface SetPosition extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**位置信息 */
    position: Vector3Config;
    /**延迟时间 */
    delay: number;
  };
}
```

- **默认**

```ts
export const config: SetPosition = {
  name: "setPosition",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
  },
};
```

### switchAnimate

控制一个动画。

- **类型**

```ts
export interface SwitchAnimate extends BasicEventConfig {
  params: {
    /**目标动画 */
    target: string;
    /**自动切换，播放，关闭 */
    toggle: "auto" | "on" | "off";
    /**延迟时间 */
    delay: number;
  };
}
```

- **默认**

```ts
export const config: SwitchAnimate = {
  name: "switchAnimate",
  params: {
    target: "",
    toggle: "auto",
    delay: 0,
  },
};
```

### visibleObject

显示隐藏物体。

- **类型**

```ts
export interface VisibleObject extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**显示状态 */
    visible: boolean;
    /**延迟时间 */
    delay: number;
  };
}
```

- **默认**

```ts
export const config: VisibleObject = {
  name: "visibleObject",
  params: {
    target: "",
    visible: true,
    delay: 0,
  },
};
```
