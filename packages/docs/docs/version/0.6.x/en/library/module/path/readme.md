# @vis-three/module-path

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-path">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-path?color=blue">

## Module Information

### module.type

- **Value**: `path`

### module.object

- **Value**: `false`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.ZERO` - 0

## Provided Configuration

### Path - Path

- **Type**: `Path`
- **Configuration Type**:

```ts
export type LineSegmentConfig = [number, number, number, number];

export type ArcSegmentConfig = [
  number,
  number,
  number,
  boolean,
  number,
  number
];

export type bezierSegmentConfig = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export type quadraticSegmentConfig = [
  number,
  number,
  number,
  number,
  number,
  number
];

export interface SegmentConfig {
    /** Path type: line, arc, bezier, quadratic */
    curve: string;
  params:
    | LineSegmentConfig
    | ArcSegmentConfig
    | bezierSegmentConfig
    | quadraticSegmentConfig;
}

export interface PathConfig extends SymbolConfig {
  curves: SegmentConfig[];
  /** Automatically closes the path by adding a straight line between the start and end points */
  autoClose: boolean;
}
```

- **Default Configuration**:

```ts
{
   curves: [],
   autoClose: false,
}
```

:::tip
Modifying a value in the `params` of a curve in the path configuration will affect the values of the adjacent curves (if any) to ensure continuity between the start and end of the curves.
:::

