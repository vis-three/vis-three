# @vis-three/module-geometry

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-geometry">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-geometry?color=blue">

## 模块信息

### module.type

- **值**: `geometry`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.TWO` - 200

## 提供配置

### 几何基础-Geometry

- **类型**：`Geometry`
- **配置类型**:

```ts
/**
 * 几何组配置
 */
export interface GeometryGroup {
  /**开始几何点 */
  start: number;
  /**结束几何点 */
  count: number;
  /**材质索引 */
  materialIndex: number;
}
/**
 * 几何配置基础
 */
export interface GeometryConfig extends SymbolConfig {
  /**是否居中几何，开启后会先居中几何，再进行其他几何运算，这对于几何中心不再原点的模型很有用。 */
  center: boolean;
  /**几何锚点中心位置 */
  position: Vector3Config;
  /**几何锚点旋转 */
  rotation: Vector3Config;
  /**几何锚点缩放 */
  scale: Vector3Config;
  /**几何组 */
  groups: GeometryGroup[];
}
```

- **默认配置**：

```ts
{
  vid: "",
  type: "Geometry",
  name: "",
  center: true,
  position: {
    x: 0, // percent
    y: 0, // percent
    z: 0, // percent
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  scale: {
    x: 1,
    y: 1,
    z: 1,
  },
  groups: [],
}
```

:::tip

- `position`属性为百分比值。例如几何中心在最右侧：`position.x = 1`
- 此类型为内部调用
  :::

### 立方体几何-BoxGeometry

- **类型**：`BoxGeometry`
- **配置类型**:

```ts
export interface BoxGeometryConfig extends GeometryConfig {
  /**立方体宽 */
  width: number;
  /**立方体高 */
  height: number;
  /** 立方体深度 */
  depth: number;
  /** 宽分段数 */
  widthSegments: number;
  /** 高分段数 */
  heightSegments: number;
  /** 深分段数 */
  depthSegments: number;
}
```

- **默认配置**：

```ts
{
  width: 5,
  height: 5,
  depth: 5,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
}
```

### 球型几何-SphereGeometry

- **类型**：`SphereGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/SphereGeometry](https://threejs.org/docs/index.html#api/zh/geometries/SphereGeometry)
- **配置类型**:

```ts
export interface SphereGeometryConfig extends GeometryConfig {
  radius: number;
  widthSegments: number;
  heightSegments: number;
  phiStart: number;
  phiLength: number;
  thetaStart: number;
  thetaLength: number;
}
```

- **默认配置**：

```ts
{
  radius: 3,
  widthSegments: 32,
  heightSegments: 32,
  phiStart: 0,
  phiLength: Math.PI * 2,
  thetaStart: 0,
  thetaLength: Math.PI,
}
```

### 平面几何-PlaneGeometry

- **类型**：`PlaneGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/PlaneGeometry](https://threejs.org/docs/index.html#api/zh/geometries/PlaneGeometry)

- **配置类型**:

```ts
export interface PlaneGeometryConfig extends GeometryConfig {
  width: number;
  height: number;
  widthSegments: number;
  heightSegments: number;
}
```

- **默认配置**：

```ts
{
  width: 5,
  height: 5,
  widthSegments: 1,
  heightSegments: 1,
}
```

### 圆形几何-CircleGeometry

- **类型**：`CircleGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/CircleGeometry](https://threejs.org/docs/index.html#api/zh/geometries/CircleGeometry)

- **配置类型**:

```ts
export interface CircleGeometryConfig extends GeometryConfig {
  radius: number;
  segments: number;
  thetaStart: number;
  thetaLength: number;
}
```

- **默认配置**：

```ts
{
  radius: 3,
  segments: 8,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
}
```

### 圆锥几何-ConeGeometry

- **类型**：`ConeGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/ConeGeometry](https://threejs.org/docs/index.html#api/zh/geometries/ConeGeometry)

- **配置类型**:

```ts
export interface ConeGeometryConfig extends GeometryConfig {
  radius: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
  openEnded: boolean;
  thetaStart: number;
  thetaLength: number;
}
```

- **默认配置**：

```ts
{
  radius: 3,
  height: 5,
  radialSegments: 8,
  heightSegments: 1,
  openEnded: false,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
}
```

### 圆柱几何-CylinderGeometry

- **类型**：`CylinderGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/CylinderGeometry](https://threejs.org/docs/index.html#api/zh/geometries/CylinderGeometry)

- **配置类型**:

```ts
export interface CylinderGeometryConfig extends GeometryConfig {
  radiusTop: number;
  radiusBottom: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
  openEnded: boolean;
  thetaStart: number;
  thetaLength: number;
}
```

- **默认配置**：

```ts
{
  radiusTop: 3,
  radiusBottom: 3,
  height: 5,
  radialSegments: 8,
  heightSegments: 1,
  openEnded: false,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
}
```

### 十二面几何-DodecahedronGeometry

- **类型**：`DodecahedronGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/DodecahedronGeometry](https://threejs.org/docs/index.html#api/zh/geometries/DodecahedronGeometry)

- **配置类型**:

```ts
export interface DodecahedronGeometryConfig extends GeometryConfig {
  radius: number;
  detail: number;
}
```

- **默认配置**：

```ts
{
  radius: 3,
  detail: 0,
}
```

### 边缘几何-EdgesGeometry

- **类型**：`EdgesGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/EdgesGeometry](https://threejs.org/docs/index.html#api/zh/geometries/EdgesGeometry)

- **配置类型**:

```ts
export interface EdgesGeometryConfig extends GeometryConfig {
  /**目标几何vid标识 */
  url: string;
  thresholdAngle: number;
}
```

- **默认配置**：

```ts
{
  url: "",
  thresholdAngle: 1,
}
```

### 圆环几何-TorusGeometry

- **类型**：`TorusGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/TorusGeometry](https://threejs.org/docs/index.html#api/zh/geometries/TorusGeometry)

- **配置类型**:

```ts
export interface TorusGeometryConfig extends GeometryConfig {
  radius: number;
  tube: number;
  radialSegments: number;
  tubularSegments: number;
  arc: number;
}
```

- **默认配置**：

```ts
{
  radius: 3,
  tube: 0.4,
  radialSegments: 8,
  tubularSegments: 6,
  arc: Math.PI * 2,
}
```

### 圆环平面几何-RingGeometry

- **类型**：`RingGeometry`
- **参考**: [https://threejs.org/docs/index.html#api/zh/geometries/RingGeometry](https://threejs.org/docs/index.html#api/zh/geometries/RingGeometry)

- **配置类型**:

```ts
export interface RingGeometryConfig extends GeometryConfig {
  innerRadius: number;
  outerRadius: number;
  thetaSegments: number;
  phiSegments: number;
  thetaStart: number;
  thetaLength: number;
}
```

- **默认配置**：

```ts
{
  innerRadius: 2,
  outerRadius: 3,
  thetaSegments: 8,
  phiSegments: 8,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
}
```

### 加载几何-LoadGeometry

- **类型**：`LoadGeometry`
- **配置类型**:

```ts
/**
 * 加载几何
 */
export interface LoadGeometryConfig extends GeometryConfig {
  /**目标几何资源地址，通过ResourceManagerPlugin解析 */
  url: string;
}
```

- **默认配置**：

```ts
{
  url: "",
}
```

### 自定义几何-CustomGeometry

- **类型**：`CustomGeometry`
- **配置类型**:

```ts
export interface CustomGeometryConfig extends GeometryConfig {
  attribute: {
    position: number[];
    color: number[];
    index: number[];
    normal: number[];
    uv: number[];
    uv2: number[];
  };
}
```

- **默认配置**：

```ts
{
  attribute: {
    position: [],
    color: [],
    index: [],
    normal: [],
    uv: [],
    uv2: [],
  },
}
```

### 曲线路径几何-CurveGeometry

- **类型**：`CurveGeometry`
- **配置类型**:

```ts
export interface CurveGeometryConfig extends GeometryConfig {
  /**曲线参数点集 */
  path: Vector3Config[];
  /**曲线分段数 */
  divisions: number;
  /**是否等距分段 */
  space: boolean;
}
```

- **默认配置**：

```ts
{
  center: false,
  path: [],
  divisions: 36,
  space: true,
}
```

:::tip
此类型为内部其他曲线几何调用
:::

### 直线路径几何-LineCurveGeometry

- **类型**：`LineCurveGeometry`
- **配置类型**:

```ts
export interface LineCurveGeometryConfig extends CurveGeometryConfig {}
```

- **默认配置**：

```ts
{
  center: false;
}
```

### 样条曲线路径几何-SplineCurveGeometry

- **类型**：`SplineCurveGeometry`
- **配置类型**:

```ts
export interface SplineCurveGeometryConfig extends CurveGeometryConfig {}
```

- **默认配置**：

```ts
{
  center: false;
}
```

### 二维三次贝塞尔曲线路径几何-CubicBezierCurveGeometry

- **类型**：`CubicBezierCurveGeometry`
- **配置类型**:

```ts
export interface CubicBezierCurveGeometryConfig extends CurveGeometryConfig {}
```

- **默认配置**：

```ts
{
  center: false;
}
```

### 二维二次贝塞尔曲线路径几何-QuadraticBezierCurveGeometry

- **类型**：`QuadraticBezierCurveGeometry`
- **配置类型**:

```ts
export interface QuadraticBezierCurveGeometryConfig
  extends CurveGeometryConfig {}
```

- **默认配置**：

```ts
{
  center: false;
}
```

### 管道几何-TubeGeometry

- **类型**：`TubeGeometry`
- **参照**：[https://threejs.org/docs/index.html#api/zh/geometries/TubeGeometry](https://threejs.org/docs/index.html#api/zh/geometries/TubeGeometry)
- **配置类型**:

```ts
export interface TubeGeometryConfig extends GeometryConfig {
  /**曲线参数点集 */
  path: Vector3Config[];
  tubularSegments: number;
  radius: number;
  radialSegments: number;
  closed: boolean;
}
```

- **默认配置**：

```ts
{
  center: false,
  path: [],
  tubularSegments: 64,
  radius: 1,
  radialSegments: 8,
  closed: false,
}
```

:::tip
此类型为内部其他管道几何调用
:::

### 直线管道几何-LineTubeGeometry

- **类型**：`LineTubeGeometry`
- **配置类型**:

```ts
export interface LineTubeGeometryConfig extends TubeGeometryConfig {}
```

- **默认配置**：

```ts
{
  center: false;
}
```

### 曲线管道几何-SplineTubeGeometry

- **类型**：`SplineTubeGeometry`
- **配置类型**:

```ts
export interface SplineTubeGeometryConfig extends TubeGeometryConfig {}
```

- **默认配置**：

```ts
{
  center: false;
}
```

### 形状几何-ShapeGeometry

- **类型**：`ShapeGeometry`
- **配置类型**:

```ts
export interface ShapeGeometryConfig extends GeometryConfig {
  /**形状vid标识 */
  shape: string;
  curveSegments: number;
}
```

- **默认配置**：

```ts
{
  center: false,
  shape: "",
  curveSegments: 12,
}
```

### 挤压几何-ExtrudeGeometry

- **类型**：`ExtrudeGeometry`
- **配置类型**:

```ts
export interface ExtrudeGeometryConfig extends GeometryConfig {
  /**挤压形状vid标识 */
  shapes: string;
  options: {
    curveSegments: number;
    steps: number;
    depth: number;
    bevelEnabled: boolean;
    bevelThickness: number;
    bevelSize: number;
    bevelOffset: number;
    bevelSegments: number;
    extrudePath: string;
  };
}
```

- **默认配置**：

```ts
{
  center: false,
  shapes: "",
  options: {
    curveSegments: 12,
    steps: 1,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 3,
    extrudePath: "",
  },
}
```

### 路径几何-PathGeometry

- **类型**：`PathGeometry`
- **配置类型**:

```ts
export interface PathGeometryConfig extends GeometryConfig {
  /**路径vid标识 */
  path: string;
  space: boolean;
  divisions: number;
}
```

- **默认配置**：

```ts
{
  center: false,
  path: "",
  space: false,
  divisions: 36,
}
```
