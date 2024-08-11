# @vis-three/module-css2D

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-css2d">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-css2d?color=blue">

## Module Information

### module.type

- **Value**: `css2D`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## Provided Configuration

### CSS2D Object - CSS2DObject

- **Type**: `CSS2DObject`
- **Configuration Type**:

```ts
export interface CSS2DObjectConfig extends ObjectConfig {
    element: string;
    width: number;
    height: number;
}
```

- **Default Configuration**:

```ts
{
    element: "",
        width: 50,
        height: 50,
}
```

:::tip
This configuration is for internal use within the module.
:::

### CSS2D Plane - CSS2DPlane

- **Type**: `CSS2DPlane`
- **Configuration Type**:

```ts
export interface CSS2DPlaneConfig extends CSS2DObjectConfig {
}
```

- **Default Configuration**:

```ts
{
    element: "",
        width: 50,
        height: 50,
}
```
