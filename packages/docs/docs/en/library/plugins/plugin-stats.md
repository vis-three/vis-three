# @vis-three/plugin-stats

Rendering Statistics Monitoring Plugin.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-stats">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-stats?color=blue">

## Plugin Name

`StatsPlugin`

:::tip
You can use the enumeration: `STATS_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export interface VisStatsParameters {
    /** Monitoring mode */
    mode: number;
    /** Distance from the top */
    top: number;
    /** Distance from the left */
    left: number;
    /** Distance from the bottom */
    bottom: number;
    /** Distance from the right */
    right: number;
}
```

## Engine Extensions

```ts
export interface StatsEngine extends Engine {
    /** Monitor */
    stats: VisStats;
    /** Set the visibility of the monitor */
    setStats: (show: boolean) => StatsEngine;
}
```
