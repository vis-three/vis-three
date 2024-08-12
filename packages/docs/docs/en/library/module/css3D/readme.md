# @vis-three/module-css3D

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-css3d">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-css3d?color=blue">

## Module Information

### module.type

- **Value**: `css3D`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## Provided Configuration

### CSS3D Object - CSS3DObject

- **Type**: `CSS3DObject`
- **Configuration Type**:

```ts
export interface CSS3DObjectConfig extends ObjectConfig {
    element: string; // External resource resolved by resourceManagerPlugin
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

### CSS3D Plane - CSS3DPlane

- **Type**: `CSS3DPlane`
- **Configuration Type**:

```ts
export interface CSS3DPlaneConfig extends CSS3DObjectConfig {
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

### CSS3D Sprite - CSS3DSprite

- **Type**: `CSS3DSprite`
- **Configuration Type**:

```ts
export interface CSS3DSpriteConfig extends CSS3DObjectConfig {
    /** Rotation angle */
    rotation2D: number;
}
```

- **Default Configuration**:

```ts
{
    rotation2D: 0,
}
```
