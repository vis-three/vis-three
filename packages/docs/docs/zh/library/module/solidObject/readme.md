# @vis-three/module-solid-object

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-solid-object">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-solid-object?color=blue">

## 模块信息

这是一个虚拟公共模块，是其他实体物体模块的基础模块，没有实际的模块对象，只提供相关方法属性。

:::tip
实体物体也就是这个物体既有`geometry`又有`material`。
:::

## 模块规则

### SolidObjectRule

此规则目前仅作为`ts`的声明拓展使用。

```ts
import { Rule } from "@vis-three/middleware";
import { SolidObject3D, SolidObjectCompiler } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export type SolidObjectRule<
  E extends SolidObjectCompiler<C, O>,
  C extends SolidObjectConfig,
  O extends SolidObject3D
> = Rule<E>;
```

### 使用

```ts
import { ProxyNotice } from "@vis-three/middleware";
import { ObjectRule } from "@vis-three/module-object";
import { SolidObjectRule } from "@vis-three/module-solid-object";
import { Mesh } from "three";

import { MeshCompiler } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";

export type MeshRule = SolidObjectRule<MeshCompiler, MeshConfig, Mesh>;

export const MeshRule: MeshRule = function (
  notice: ProxyNotice,
  compiler: MeshCompiler
) {
  ObjectRule(notice, compiler);
};
```

## 模块编译器

```ts
export abstract class SolidObjectCompiler<
  C extends SolidObjectConfig,
  O extends SolidObject3D
> extends ObjectCompiler<C, O> {
  constructor() {
    super();
  }
}
```

### 使用

```ts
import { SolidObjectCompiler } from "@vis-three/module-solid-object";
import { Mesh } from "three";
import { MeshConfig } from "./MeshConfig";

export class MeshCompiler extends SolidObjectCompiler<MeshConfig, Mesh> {
  constructor() {
    super();
  }
}
```

## 模块处理器

### 实体物体命令链-SolidObjectCommands

Ƭ **SolidObjectCommands**<`C`, `T`\>: `ObjectCommands`<`C`, `T`\>

作为公共的实体物体命令链模块使用，也可以使用其中的部分命令。

#### 类型参数

| Name | Type                        |
| :--- | :-------------------------- |
| `C`  | extends `SolidObjectConfig` |
| `T`  | extends `SolidObject3D`     |

#### 预览

```ts
export const solidObjectCommands: SolidObjectCommands<
  SolidObjectConfig,
  SolidObject3D
> = {
  add: {
    material: materialHandler,
    ...(<SolidObjectCommands<SolidObjectConfig, SolidObject3D>>(
      objectCommands.add
    )),
  },
  set: {
    geometry: geometryHandler,
    material: materialHandler,
    ...(<SolidObjectCommands<SolidObjectConfig, SolidObject3D>>(
      objectCommands.set
    )),
  },
  delete: {
    material: materialHandler,
    ...(<SolidObjectCommands<SolidObjectConfig, SolidObject3D>>(
      objectCommands.delete
    )),
  },
};
```

### 使用

```ts
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "@vis-three/module-solid-object";
import { Mesh } from "three";

import { MeshCompiler } from "../MeshCompiler";
import { getMeshConfig, MeshConfig } from "../MeshConfig";

export default defineProcessor<MeshConfig, Mesh, EngineSupport, MeshCompiler>({
  type: "Mesh",
  config: getMeshConfig,
  commands: <SolidObjectCommands<MeshConfig, Mesh>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: MeshConfig, engine: EngineSupport): Mesh {
    return solidObjectCreate(new Mesh(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
```

### geometryHandler

▸ **geometryHandler**<`C`, `O`\>(`«destructured»`): `void`

#### 类型参数

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `C`  | extends `SolidObjectConfig`                                                         |
| `O`  | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### 参数

| Name             | Type                                               |
| :--------------- | :------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `any`\> |

#### Returns

`void`

---

### materialHandler

▸ **materialHandler**<`C`, `O`\>(`«destructured»`): `void`

#### 类型参数

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `C`  | extends `SolidObjectConfig`                                                         |
| `O`  | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### 参数

| Name             | Type                                               |
| :--------------- | :------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `any`\> |

#### Returns

`void`

---

### solidObjectCreate

▸ **solidObjectCreate**<`C`, `O`\>(`object`, `config`, `filter`, `engine`): `O`

#### 类型参数

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `C`  | extends `SolidObjectConfig`                                                         |
| `O`  | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### 参数

| Name     | Type                                                                   |
| :------- | :--------------------------------------------------------------------- |
| `object` | `O`                                                                    |
| `config` | `C`                                                                    |
| `filter` | `DeepUnion`<`DeepPartial`<`DeepRecord`<`C`, `boolean`\>\>, `boolean`\> |
| `engine` | `EngineSupport`                                                        |

#### Returns

`O`

### solidObjectDispose

▸ **solidObjectDispose**<`O`\>(`target`): `void`

#### 类型参数

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `O`  | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### 参数

| Name     | Type |
| :------- | :--- |
| `target` | `O`  |

#### Returns

`void`

## 提供配置

### 实体物体-SolidObject

- **类型**：`SolidObject`
- **配置类型**:

```ts
export interface SolidObjectConfig extends ObjectConfig {
  material: string | string[];
  geometry: string;
}
```

- **默认配置**:

```ts
{
    material: "",
    geometry: "",
  }
```

:::tip
此配置供其他物体模块使用。
:::
