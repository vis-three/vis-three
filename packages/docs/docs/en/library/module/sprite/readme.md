# @vis-three/module-sprite

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-sprite">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-sprite?color=blue">

## Module Information

### module.type

- **Value**: `sprite`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## Provided Configuration

### Sprite - Sprite

- **Type**: `Sprite`
- **Configuration Type**:

```ts
export interface SpriteConfig extends SolidObjectConfig {
  material: string;
  center: Vector2Config;
}
```

- **Default Configuration**:

```ts
{
    material: "",
    center: {
      x: 0.5,
      y: 0.5,
    },
  }
```
