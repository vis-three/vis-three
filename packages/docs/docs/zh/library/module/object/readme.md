# @vis-three/module-object

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-object">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-object?color=blue">

## 模块信息

这是一个虚拟公共模块，是其他物体模块的基础模块，没有实际的模块对象，只提供相关方法属性。

## 模块规则

### ObjectRule

▸ **ObjectRule**<`E`, `C`, `O`\>(`input`, `compiler`, `validateFun?`): `void`

### 类型参数

| 命名 | 类型                                     |
| :--- | :--------------------------------------- |
| `E`  | extends `ObjectCompiler`<`C`, `O`, `E`\> |
| `C`  | extends `ObjectConfig`                   |
| `O`  | extends `Object3D`<`Event`, `O`\>        |

### 入参

| 命名          | 类型          | 默认值      | 描述         |
| :------------ | :------------ | :---------- | :----------- |
| `input`       | `ProxyNotice` | `undefined` | 代理通知输入 |
| `compiler`    | `E`           | `undefined` | 编译器       |
| `validateFun` | `any`         | `validate`  | 验证规则     |

### 返回值

`void`

### 使用

```ts
import { ProxyNotice } from "@vis-three/middleware";
import { Object3D } from "three";
import { Object3DCompiler } from "./Object3DCompiler";
import { Object3DConfig } from "./Object3DConfig";
import { ObjectRule } from "@vis-three/module-object";

export type Object3DRule = ObjectRule<
  Object3DCompiler,
  Object3DConfig,
  Object3D
>;

export const Object3DRule: Object3DRule = function (
  notice: ProxyNotice,
  compiler: Object3DCompiler
) {
  ObjectRule(notice, compiler);
};
```

## 模块编译器

`ObjectCompiler<C, O>`继承了基础编译器，供物体编译器使用。

### 类型参数

| 名称 | 类型                   |
| :--- | :--------------------- |
| `C`  | extends `ObjectConfig` |
| `O`  | extends `Object3D`     |

### 使用

```ts
import { ObjectCompiler } from "@vis-three/module-object";
import { Object3D } from "three";
import { Object3DConfig } from "./Object3DConfig";

export class Object3DCompiler extends ObjectCompiler<Object3DConfig, Object3D> {
  constructor() {
    super();
  }
}
```

## 模块处理器

### 物体命令链-ObjectCommands

**ObjectCommands**<`C`, `T`\>: `ProcessorCommands`<`C`, `T`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `T`\>\>

作为公共的物体命令链模块使用，也可以使用其中的部分命令。

#### 类型参数

| Name | Type                   |
| :--- | :--------------------- |
| `C`  | extends `ObjectConfig` |
| `T`  | extends `Object3D`     |

#### 预览

```ts
export const objectCommands: ObjectCommands<ObjectConfig, Object3D> = {
  add: {
    pointerdown: addEventHanlder,
    pointerup: addEventHanlder,
    pointermove: addEventHanlder,
    pointerenter: addEventHanlder,
    pointerleave: addEventHanlder,
    click: addEventHanlder,
    dblclick: addEventHanlder,
    contextmenu: addEventHanlder,
    children: addChildrenHanlder,
  },
  set: {
    lookAt: lookAtHandler,
    pointerdown: updateEventHandler,
    pointerup: updateEventHandler,
    pointermove: updateEventHandler,
    pointerenter: updateEventHandler,
    pointerleave: updateEventHandler,
    click: updateEventHandler,
    dblclick: updateEventHandler,
    contextmenu: updateEventHandler,
    parent: emptyHandler,
    children: {
      $reg: [
        {
          reg: new RegExp(".*"),
          handler: addChildrenHanlder,
        },
      ],
    },
  },
  delete: {
    pointerdown: removeEventHandler,
    pointerup: removeEventHandler,
    pointermove: removeEventHandler,
    pointerenter: removeEventHandler,
    pointerleave: removeEventHandler,
    click: removeEventHandler,
    dblclick: removeEventHandler,
    contextmenu: removeEventHandler,
    children: removeChildrenHandler,
  },
};
```

### 使用

```ts
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  objectCommands,
  ObjectConfig,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";
import { Object3D } from "three";
import { Object3DCompiler } from "../Object3DCompiler";
import { getObject3DConfig } from "../Object3DConfig";

export default defineProcessor<
  ObjectConfig,
  Object3D,
  EngineSupport,
  Object3DCompiler
>({
  type: "Object3D",
  config: getObject3DConfig,
  commands: objectCommands,
  create(config: ObjectConfig, engine: EngineSupport): Object3D {
    return objectCreate(new Object3D(), config, {}, engine);
  },
  dispose: objectDispose,
});
```

### addChildrenHanlder

▸ **addChildrenHanlder**<`C`, `O`\>(`«destructured»`): `void`

#### 类型参数

| Name | Type                              |
| :--- | :-------------------------------- |
| `C`  | extends `ObjectConfig`            |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### 参数

| Name             | Type                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### 返回值

`void`

### addEventHanlder

▸ **addEventHanlder**<`C`, `O`\>(`«destructured»`): `void`

#### 类型参数

| Name | Type                              |
| :--- | :-------------------------------- |
| `C`  | extends `ObjectConfig`            |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### 参数

| Name             | Type                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### 返回值

`void`

---

### lookAtHandler

▸ **lookAtHandler**<`C`, `O`\>(`«destructured»`): `void`

#### 类型参数

| Name | Type                              |
| :--- | :-------------------------------- |
| `C`  | extends `ObjectConfig`            |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### 参数

| Name             | Type                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### 返回值

`void`

---

### objectCreate

▸ **objectCreate**<`C`, `O`\>(`object`, `config`, `filter`, `engine`): `O`

#### 类型参数

| Name | Type                              |
| :--- | :-------------------------------- |
| `C`  | extends `ObjectConfig`            |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### 参数

| Name     | Type                                                                   |
| :------- | :--------------------------------------------------------------------- |
| `object` | `O`                                                                    |
| `config` | `C`                                                                    |
| `filter` | `DeepUnion`<`DeepPartial`<`DeepRecord`<`C`, `boolean`\>\>, `boolean`\> |
| `engine` | `EngineSupport`                                                        |

#### 返回值

`O`

---

### objectDispose

▸ **objectDispose**<`O`\>(`target`): `void`

#### 类型参数

| Name | Type                              |
| :--- | :-------------------------------- |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### 参数

| Name     | Type |
| :------- | :--- |
| `target` | `O`  |

#### 返回值

`void`

## 提供配置

### 物体-Object

- **类型**：`Object`
- **参照**：[https://threejs.org/docs/index.html#api/zh/core/Object3D](https://threejs.org/docs/index.html#api/zh/core/Object3D)
- **配置类型**:

```ts
export interface ObjectConfig extends SymbolConfig {
  /**造成阴影 */
  castShadow: boolean;
  /**接收阴影 */
  receiveShadow: boolean;
  /**看向目标 vid 标识 */
  lookAt: string;
  /**物体位置 本地矩阵*/
  position: Vector3Config;
  /**物体旋转 本地矩阵 */
  rotation: Vector3Config;
  /**物体缩放 本地矩阵 */
  scale: Vector3Config;
  /**物体上部朝向 */
  up: Vector3Config;
  /**物体是否可见 */
  visible: boolean;
  /**物体是否会自动更新世界矩阵 */
  matrixAutoUpdate: boolean;
  /**物体渲染顺序 */
  renderOrder: number;
  /**物体的父级 vid 标识 */
  parent: string;
  /**物体的子集 vid 标识 */
  children: string[];
  /**鼠标按下事件列表 */
  pointerdown: BasicEventConfig[];
  /**鼠标移动事件列表 */
  pointermove: BasicEventConfig[];
  /**鼠标抬起事件列表 */
  pointerup: BasicEventConfig[];
  /**鼠标进入事件列表 */
  pointerenter: BasicEventConfig[];
  /**鼠标离开事件列表 */
  pointerleave: BasicEventConfig[];
  /**鼠标点击事件列表 */
  click: BasicEventConfig[];
  /**鼠标双击事件列表 */
  dblclick: BasicEventConfig[];
  /**鼠标右键事件列表 */
  contextmenu: BasicEventConfig[];
}
```

- **默认配置**:

```ts
{
   castShadow: true,
   receiveShadow: true,
   lookAt: "",
   visible: true,
   matrixAutoUpdate: true,
   renderOrder: 0,
   position: {
   x: 0,
   y: 0,
   z: 0,
   },
   rotation: {
   x: 0,
   y: 0,
   z: 0,
   },
   scale: {
   x: 1,
   y: 1,
   z: 1,
   },
   up: {
   x: 0,
   y: 1,
   z: 0,
   },
   parent: "",
   children: [],
   pointerdown: [],
   pointermove: [],
   pointerup: [],
   pointerenter: [],
   pointerleave: [],
   click: [],
   dblclick: [],
   contextmenu: [],
}
```

:::tip
此配置供其他物体模块使用。
:::
