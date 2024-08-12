# @vis-three/module-renderer

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-renderer">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-renderer?color=blue">

## Module Information

### module.type

- **Value**: `renderer`

### module.lifeOrder

- **Value**: 0

## Provided Configuration

### Renderer - Renderer

- **Type**: `Renderer`
- **Configuration Type**:

```ts
export interface RendererConfig extends SymbolConfig {
  size: Vector2Config | null; // If null, follows the default canvas
}
```

```ts
{
   size: null,
}
```

:::tip

- This module provides the common configuration `RendererConfig`.
- Since different projects may use different renderer plugins, please refer to the relevant controller plugins or strategy documentation for specific renderer configurations in this module.
:::
