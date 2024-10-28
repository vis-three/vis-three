### checkEqualNumber

- **详情**

```ts
/**
 * 根据精度判断数值是否相等
 * @param number1
 * @param number2
 * @param accuracy
 * @returns boolean
 */
function checkEqualNumber(
  number1: number,
  number2: number,
  accuracy?: number
): boolean;
```

### checkEqualVector2

- **详情**

```ts
/**
 * 根据精度判断vector2是否相等
 * @param v1
 * @param v2
 * @param accuracy
 * @returns boolean
 */
function checkEqualVector2(
  v1: Vector2,
  v2: Vector2,
  accuracy?: number
): boolean;
```

### checkEqualVector3

- **详情**

```ts
/**
 * 根据精度判断vector3是否相等
 * @param v1
 * @param v2
 * @param accuracy
 * @returns boolean
 */
function checkEqualVector3(
  v1: Vector3,
  v2: Vector3,
  accuracy?: number
): boolean;
```

### checkPointLeftSideLine

- **详情**

```ts
/**
 * 测试一个点是否在线的右侧
 * @param line1 线上一点
 * @param line2 线上另外一点
 * @param point v2点
 * @returns boolean
 */
const checkPointLeftSideLine: (
  line1: Vector2,
  line2: Vector2,
  point: Vector2
) => boolean;
```

### checkSameDirecton

- **详情**

```ts
/**
 * 测试两个vector2是否是同方向向量，夹角小于90度
 * @param vect1
 * @param vect2
 * @returns boolean
 */
const checkSameDirecton: (vect1: Vector2, vect2: Vector2) => boolean;
```