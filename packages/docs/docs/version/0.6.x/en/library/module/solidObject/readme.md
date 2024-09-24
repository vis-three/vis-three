# @vis-three/module-solid-object

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-solid-object">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-solid-object?color=blue">

## Module Information

This is a virtual public module and serves as a base module for other solid object modules. It does not have an actual module object and only provides relevant methods and properties.

:::tip
A solid object is one that has both `geometry` and `material`.
:::

## Module Rules

### SolidObjectRule

This rule is currently used only as a TypeScript declaration extension.

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

### Usage

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

## Module Compiler

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

### Usage

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

## Module Processor

### Solid Object Command Chain - SolidObjectCommands

Ƭ **SolidObjectCommands**<`C`, `T`\>: `ObjectCommands`<`C`, `T`\>

Used as a public solid object command chain module, with the option to use some of its commands.

#### Type Parameters

| Name | Type                        |
| :--- | :-------------------------- |
| `C`  | extends `SolidObjectConfig` |
| `T`  | extends `SolidObject3D`     |

#### Preview

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

### Usage

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

#### Type Parameters

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `C`  | extends `SolidObjectConfig`                                                         |
| `O`  | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### Parameters

| Name             | Type                                               |
| :--------------- | :------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `any`\> |

#### Returns

`void`

---

### materialHandler

▸ **materialHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type Parameters

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `C`  | extends `SolidObjectConfig`                                                         |
| `O`  | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### Parameters

| Name             | Type                                               |
| :--------------- | :------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `any`\> |

#### Returns

`void`

---

### solidObjectCreate

▸ **solidObjectCreate**<`C`, `O`\>(`object`, `config`, `filter`, `engine`): `O`

#### Type Parameters

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `C`  | extends `SolidObjectConfig`                                                         |
| `O`  | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### Parameters

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

#### Type Parameters

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `O`  | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `target` | `O`  |

#### Returns

`void`

## Provided Configuration

### Solid Object - SolidObject

- **Type**: `SolidObject`
- **Configuration Type**:

```ts
export interface SolidObjectConfig extends ObjectConfig {
  material: string | string[];
  geometry: string;
}
```

- **Default Configuration**:

```ts
{
    material: "",
    geometry: "",
  }
```

:::tip
This configuration is used by other object modules.
:::
