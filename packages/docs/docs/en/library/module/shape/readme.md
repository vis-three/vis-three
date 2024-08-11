# @vis-three/module-shape

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-shape">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-shape?color=blue">

## Module Information

### module.type

- **Value**: `shape`

### module.object

- **Value**: `false`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.ONE` - 100

## Provided Configuration

### Shape - Shape

- **Type**: `Shape`
- **Configuration Type**:

```ts
export interface ShapeConfig extends SymbolConfig {
    /** Path vid identifier */
    shape: string;
    /** List of path vid identifiers for holes */
    holes: string[];
}
```

- **Default Configuration**:

```ts
{
   shape: "",
   holes: [],
}
```
