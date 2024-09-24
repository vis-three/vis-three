# @vis-three/plugin-stats

渲染状态监控插件。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-stats">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-stats?color=blue">

## 插件名称

`StatsPlugin`

:::tip
可以使用枚举：`STATS_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface VisStatsParameters {
  /**监视器模式 */
  mode: number;
  /**顶部距离 */
  top: number;
  /**左边距离 */
  left: number;
  /**底部距离 */
  bottom: number;
  /**右边距离 */
  right: number;
}
```

## 引擎拓展

```ts
export interface StatsEngine extends Engine {
  /**监视器 */
  stats: VisStats;
  /**设置监视器显示隐藏 */
  setStats: (show: boolean) => StatsEngine;
}
```
