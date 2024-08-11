# @vis-three/module-line

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-line">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-line?color=blue">

## Module Information

### module.type

- **Value**: `line`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## Provided Configuration

### Line Object - Line

- **Type**: `Line`
- **Configuration Type**:

```ts
export interface LineConfig extends SolidObjectConfig {
    /** Material VID identifier */
    material: string;
    /** Geometry VID identifier */
    geometry: string;
    /** Whether it is a dashed line. Enable this if the material used is `LineDashedMaterial` */
    dashed: boolean;
}
```

- **Default Configuration**:

```ts
{
    geometry: "",
    material: "",
    dashed: false,
  }
```
