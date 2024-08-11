# @vis-three/plugin-selection-support

Configurable Selection Support Plugin.

This plugin extends the selection plugin to support configurable settings for selected objects. It also includes the configuration `vid` information for the selected objects in the interaction return values.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-selection-support">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-selection-support?color=blue">

## Plugin Name

`SelectionSupportPlugin`

:::tip
You can use the enumeration: `SELECTION_SUPPORT_PLUGIN`
:::

## Plugin Dependencies

- @vis-three/middleware
- @vis-three/plugin-selection

## Plugin Parameters

None

## Engine Extensions

```ts
export interface SelectionSupportEngine extends SelectionEngine, EngineSupport {
    /** Set the scene's selected objects by vid symbol */
    setSelectionBoxBySymbol: (symbols: string[]) => SelectionSupportEngine;
}
```
