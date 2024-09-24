# @vis-three/plugin-render-manager

Render Manager Plugin.

Provides better control over overall frame rate and unified rendering control.

- This plugin overrides the original `render` method of the `engine`.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-render-manager">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-render-manager?color=blue">

## Plugin Name

`RenderManagerPlugin`

:::tip
You can use the enumeration: `RENDER_MANAGER_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export interface RenderManagerPluginParams {
  fps?: number;
}
```

## Engine Extensions

```ts
export interface RenderManagerEngine extends Engine {
    /** Render manager */
    renderManager: RenderManager;
    /** Start rendering function */
    play: () => void;
    /** Stop rendering function */
    stop: () => void;
}
```

## RenderManager

This class extends `@vis-three/core`'s `EventDispatcher`.

### dispose

▸ **dispose**(): `void`

Destroys memory.

#### Returns

`void`

### hasRendering

▸ **hasRendering**(): `boolean`

Checks if rendering is currently happening.

#### Returns

`boolean`

### hasVaildRender

▸ **hasVaildRender**(): `boolean`

Checks if there is a valid rendering queue.

#### Returns

`boolean`

### play

▸ **play**(): `void`

Continues rendering at the specified FPS.

#### Returns

`void`

### render

▸ **render**(): `void`

Renders a single frame.

#### Returns

`void`

### setFPS

▸ **setFPS**(`fps`): `RenderManager`

Sets the FPS.

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `fps` | `number` | Frame rate   |

#### Returns

`RenderManager`

### stop

▸ **stop**(): `void`

Stops rendering.

#### Returns

`void`

