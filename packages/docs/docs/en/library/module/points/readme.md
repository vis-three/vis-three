# @vis-three/module-points

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-points">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-points?color=blue">

## Module Information

### module.type

- **Value**: `points`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## Provided Configuration

### Point Object - Points

- **Type**: `Points`
- **Configuration Type**:


```ts
export interface PointsConfig extends SolidObjectConfig {
  geometry: string;
  material: string;
}
```

- **Default Configuration**:

```ts
{
   geometry: "",
   material: "",
}
```
