# @vis-three/module-mesh

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-mesh">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-mesh?color=blue">

## Module Information

### module.type

- **Value**: `mesh`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## Configuration Provided

### Mesh Object - Mesh

- **Type**: `Mesh`
- **Configuration Type**:


```ts
export interface MeshConfig extends SolidObjectConfig {
  material: string | string[];
}
```

- **Default Configuration**:

```ts
{
   geometry: "",
   material: "",
}
```
