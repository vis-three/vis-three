# @vis-three/strategy-helper-select-interact

物体辅助在鼠标选择时的交互策略。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/strategy-helper-select-interact">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/strategy-helper-select-interact?color=blue">

## 策略名称

`GridViewpointStrategy`

## 策略条件

- @vis-three/plugin-grid-helper
- @vis-three/plugin-viewpoin

## 策略传参

```ts
export interface HelperSelectInteractParameters {
  /**是否会与辅助进行交互 */
  interact?: boolean;
  /**选中激活时的颜色 */
  activeColor?: string;
  /**鼠标hover时候的颜色 */
  hoverColor?: string;
  /**默认的辅助颜色 */
  defaultColor?: string;
  /**选中时候的辅助颜色 */
  selectedColor?: string;
}
```
