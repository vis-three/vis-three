# @vis-three/plugin-object-helper

Object Helper Management Plugin.

- This plugin automatically recognizes objects added to the scene and generates relevant helpers for those objects.
- When an object is removed from the scene, the corresponding helper is also removed.

:::tip
For configurable modules, you may use `@vis-three/module-helper` instead of this plugin, which offers more refined helper management features.
:::

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-object-helper">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-object-helper?color=blue">

## Plugin Name

`ObjectHelperPlugin`

:::tip
You can use the enumeration: `OBJECT_HELPER_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

None

## Engine Extensions


```ts
export interface ObjectHelperEngine extends Engine {
    /** Object Helper Manager */
    objectHelperManager: ObjectHelperManager;
    /** Set object helper visibility */
    setObjectHelper: (show: boolean) => ObjectHelperEngine;
}
```

## ObjectHelperManager

### addFilteredObject

▸ **addFilteredObject**(`...objects`): `ObjectHelperManager`

@description: Adds filtered objects.

#### Parameters

| Name         | Type                   | Description  |
| :----------- | :--------------------- | :----------- |
| `...objects` | `Object3D`<`Event`\>[] | Three.js objects |

#### Returns

`ObjectHelperManager`

this

### addObjectHelper

▸ **addObjectHelper**(`object`): `null` \| `Object3D`<`Event`\>

Adds an object helper.

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `object` | `Object3D`<`Event`\> |

#### Returns

`null` \| `Object3D`<`Event`\>

Three.js object or null

### dispose

▸ **dispose**(): `void`

Releases all manager resources.

#### Returns

`void`

### disposeObjectHelper

▸ **disposeObjectHelper**(`object`): `null` \| `Object3D`<`Event`\>

@description: Destroys an object helper.

#### Parameters

| Name     | Type                 | Description  |
| :------- | :------------------- | :----------- |
| `object` | `Object3D`<`Event`\> | Three.js object |

#### Returns

`null` \| `Object3D`<`Event`\>

Three.js object or null

