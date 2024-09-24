# @vis-three/module-group

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-group">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-group?color=blue">

## Module Information

### module.type

- **Value**: `group`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## Provided Configuration

### Group - Group

- **Type**: `Group`
- **Configuration Type**:

```ts
export interface GroupConfig extends ObjectConfig {
  children: string[];
}
```

- **Default Configuration**:

```ts
{
   children: [],
}
```
