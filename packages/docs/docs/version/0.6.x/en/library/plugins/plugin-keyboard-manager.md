# @vis-three/plugin-keyboard-manager

Keyboard Manager Plugin.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-keyboard-manager">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-keyboard-manager?color=blue">

## Plugin Name

`KeyboardManagerPlugin`

:::tip
You can use the enumeration: `KEYBOARD_MANAGER_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
interface KeyboardEntity {
    /** Shortcut Key Combination, e.g., ['ctrl', 'z'] */
    shortcutKey: string[];
    /** Description of the Shortcut Function */
    desp: string;
    /** Function triggered on key down */
    keydown?: (event?: KeyEvent) => void;
    /** Function triggered on key up */
    keyup?: (event?: KeyEvent) => void;
}

export interface KeyboardParameters {
    /** Shortcut Key Settings */
    keyboards?: Array<KeyboardEntity>;
}
```

## Engine Extensions

```ts
export interface KeyboardManagerEngine extends Engine {
  keyboardManager: KeyboardManager;
}
```

## keyboardManager

This class extends `@vis-three/core`'s `Dispatcher`.

### cancel

▸ **cancel**(`keyArray`): `KeyboardManager`

Unregisters a shortcut key.

#### Parameters

| Name       | Type       | Description        |
| :--------- | :--------- | :----------------- |
| `keyArray` | `string`[] | Shortcut key combination |

#### Returns

this

### getDocs

▸ **getDocs**(): `Pick`<`KeyboardEntity`, `"shortcutKey"` \| `"desp"`\>[]

Retrieves the shortcut key documentation.

#### Returns

### register

▸ **register**(`entity`): `KeyboardManager`

Registers a shortcut key.

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `entity` | `KeyboardEntity` |

#### Returns

this

### update

▸ **update**(`entity`): `KeyboardManager`

Updates a shortcut key.

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `entity` | `KeyboardEntity` |

#### Returns

`KeyboardManager`

### watch

▸ **watch**(`dom`): `KeyboardManager`

Limits the shortcut key listener to a specific DOM element—defaults to `document`.

#### Parameters

| Name  | Type                         |
| :---- | :--------------------------- |
| `dom` | `undefined` \| `HTMLElement` |

#### Returns

this

