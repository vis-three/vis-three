### parseColor

- **详情**

```ts
/**
 * 解析颜色
 * @param str 颜色rgb或rgba
 * @param percent 是否已百分比解析
 * @returns {r, g, b, a?}
 */
const parseColor: (
  str: string,
  percent?: boolean
) =>
  | {
      r: number;
      g: number;
      b: number;
      a: number;
    }
  | {
      r: number;
      g: number;
      b: number;
      a: null;
    };
```

### getArcDetail

- **详情**

```ts
/**
 * 获取一个圆的详情
 * @param startX 起始点X
 * @param startY 起始点y
 * @param vertical 垂线距离
 * @param clockwise 是否逆时针
 * @param endX 结束点x
 * @param endY 结束点y
 * @returns
 */
const getArcDetail: (
  startX: number,
  startY: number,
  vertical: number,
  clockwise: boolean,
  endX: number,
  endY: number
) => {
  start: Vector2;
  end: Vector2;
  mid: Vector2;
  center: Vector2;
  r: number;
  verticalDirection: Vector2;
};
```

### AttrDeduplicate

- **详情**

```ts
/**
 * 删除几何的重复点
 * @param geometry 几何
 * @param name 几何属性
 * @returns number[]
 */
const AttrDeduplicate: (geometry: BufferGeometry, name: string) => number[];
```
