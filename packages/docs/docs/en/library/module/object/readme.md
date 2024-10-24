# @vis-three/module-object

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-object">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-object?color=blue">

## Module Information

This is a virtual public module and serves as a base module for other object modules. It does not have an actual module object and only provides relevant methods and properties.

## Module Rules

### ObjectRule

▸ **ObjectRule**<`E`, `C`, `O`\>(`input`, `compiler`, `validateFun?`): `void`

### Type Parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `E`  | extends `ObjectCompiler`<`C`, `O`, `E`\> |
| `C`  | extends `ObjectConfig`                   |
| `O`  | extends `Object3D`<`Event`, `O`\>        |

### Parameters

| Name          | Type          | Default Value | Description         |
| :------------ | :------------ | :------------ | :------------------ |
| `input`       | `ProxyNotice` | `undefined`   | Proxy notice input  |
| `compiler`    | `E`           | `undefined`   | Compiler            |
| `validateFun` | `any`         | `validate`    | Validation function |

### Return Value

`void`

### Usage

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

## Module Compiler

`ObjectCompiler<C, O>` extends the base compiler and is used by object compilers.

### Type Parameters

| Name | Type                   |
| :--- | :--------------------- |
| `C`  | extends `ObjectConfig` |
| `O`  | extends `Object3D`     |

### Usage

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

## Module Processor

### Object Commands Chain - ObjectCommands

**ObjectCommands**<`C`, `T`\>: `ProcessorCommands`<`C`, `T`, `EngineSupport`

Used as a public object command chain module, and can also be used for some of its commands.

#### Type Parameters

| Name | Type                   |
| :--- | :--------------------- |
| `C`  | extends `ObjectConfig` |
| `T`  | extends `Object3D`     |

#### Preview

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

### Usage

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

### addChildrenHandler

▸ **addChildrenHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type Parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `C`  | extends `ObjectConfig`            |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name             | Type                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `ObjectCompiler`<`C`, `O`\>\> |

#### Return Value

`void`

### addEventHandler

▸ **addEventHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type Parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `C`  | extends `ObjectConfig`            |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name             | Type                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `ObjectCompiler`<`C`, `O`\>\> |

#### Return Value

`void`

---

### lookAtHandler

▸ **lookAtHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type Parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `C`  | extends `ObjectConfig`            |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name             | Type                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `ObjectCompiler`<`C`, `O`\>\> |

#### Return Value

`void`

---

### objectCreate

▸ **objectCreate**<`C`, `O`\>(`object`, `config`, `filter`, `engine`): `O`

#### Type Parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `C`  | extends `ObjectConfig`            |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name     | Type                                                                   |
| :------- | :--------------------------------------------------------------------- |
| `object` | `O`                                                                    |
| `config` | `C`                                                                    |
| `filter` | `DeepUnion`<`DeepPartial`<`DeepRecord`<`C`, `boolean`\>\>, `boolean`\> |
| `engine` | `EngineSupport`                                                        |

#### Return Value

`O`

---

### objectDispose

▸ **objectDispose**<`O`\>(`target`): `void`

#### Type Parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `O`  | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `target` | `O`  |

#### Return Value

`void`

## Configuration Provided

### Object - Object

- **Type**: `Object`
- **Reference**: [https://threejs.org/docs/index.html#api/en/core/Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D)
- **Configuration Type**:

```ts
export interface ObjectConfig extends SymbolConfig {
  /** Whether to cast shadows */
  castShadow: boolean;
  /** Whether to receive shadows */
  receiveShadow: boolean;
  /** Target identifier for look-at */
  lookAt: string;
  /** Position of the object in local matrix */
  position: Vector3Config;
  /** Rotation of the object in local matrix */
  rotation: Vector3Config;
  /** Scale of the object in local matrix */
  scale: Vector3Config;
  /** Up direction of the object */
  up: Vector3Config;
  /** Whether the object is visible */
  visible: boolean;
  /** Whether the object automatically updates its world matrix */
  matrixAutoUpdate: boolean;
  /** Render order of the object */
  renderOrder: number;
  /** Parent identifier for the object */
  parent: string;
  /** Child identifiers for the object */
  children: string[];
  /** List of mouse down events */
  pointerdown: BasicEventConfig[];
  /** List of mouse move events */
  pointermove: BasicEventConfig[];
  /** List of mouse up events */
  pointerup: BasicEventConfig[];
  /** List of mouse enter events */
  pointerenter: BasicEventConfig[];
  /** List of mouse leave events */
  pointerleave: BasicEventConfig[];
  /** List of mouse click events */
  click: BasicEventConfig[];
  /** List of mouse double click events */
  dblclick: BasicEventConfig[];
  /** List of mouse right-click events */
  contextmenu: BasicEventConfig[];
}
```

- **Default Configuration**:

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
This configuration is intended for use by other object modules.
:::
