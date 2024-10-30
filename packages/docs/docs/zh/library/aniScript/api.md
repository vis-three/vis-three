### linearTime

数值线性时间动画。

- **类型**

```ts
export interface LinearTime extends BasicAniScriptConfig {
  /**时间倍率 */
  multiply: number;
}
```

- **默认**

```ts
export const config: LinearTime = {
  name: "linearTime",
  multiply: 1,
};
```

### sinWave

数值正弦波时间动画。

- **类型**

```ts
export interface SinWave extends BasicAniScriptConfig {
  /**波长 */
  wavelength: number;
  /**波段整体偏移 */
  offset: number;
  /**波的评率 */
  amplitude: number;
  /**波的速度 */
  speed: number;
}
```

- **默认**

```ts
export const config: SinWave = {
  name: "sinWave",
  wavelength: 1,
  offset: 0,
  amplitude: 1,
  speed: 1,
};
```
