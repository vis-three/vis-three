# @vis-three/module-geometry

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-geometry">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-geometry?color=blue">

## Module Information

### module.type

- **Value**: `geometry`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.TWO` - 200

## Provided Configuration

### Basic Geometry - Geometry

- **Type**: `Geometry`
- **Configuration Type**:

```ts
/**
 * Geometry Group Configuration
 */
export interface GeometryGroup {
    /** Starting point of the geometry */
    start: number;
    /** Number of geometry points */
    count: number;
    /** Material index */
    materialIndex: number;
}

/**
 * Basic Geometry Configuration
 */
export interface GeometryConfig extends SymbolConfig {
    /** Whether to center the geometry. If enabled, the geometry will be centered first before any other operations, which is useful for models where the geometry center is not at the origin. */
    center: boolean;
    /** Center position of the geometry anchor */
    position: Vector3Config;
    /** Rotation of the geometry anchor */
    rotation: Vector3Config;
    /** Scaling of the geometry anchor */
    scale: Vector3Config;
    /** Geometry groups */
    groups: GeometryGroup[];
}

```

- **Default Configuration**:

```ts
{
    vid: "",
    type: "Geometry",
    name: "",
    center: true,
    position: {
    x: 0, // percent
    y:0, // percent
    z:0, // percent
    },
    rotation: {
        x: 0,
        y:0,
        z:0,
    },
    scale: {
        x: 1,
        y:1,
        z:1,
    },
    groups: [],
}
```

:::tip

- The `position` property is a percentage value. For example, if the geometry center is at the far
  right: `position.x = 1`
- This type is for internal use.
  :::

### Box Geometry - BoxGeometry

- **Type**: `BoxGeometry`
- **Configuration Type**:

```ts
export interface BoxGeometryConfig extends GeometryConfig {
  /** Width of the cube */
  width: number;
  /** Height of the cube */
  height: number;
  /** Depth of the cube */
  depth: number;
  /** Number of segments along the width */
  widthSegments: number;
  /** Number of segments along the height */
  heightSegments: number;
  /** Number of segments along the depth */
  depthSegments: number;
}

```

- **Default Configuration**:

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

### Sphere Geometry - SphereGeometry

- **Type**: `SphereGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/SphereGeometry](https://threejs.org/docs/index.html#api/en/geometries/SphereGeometry)
- **Configuration Type**:

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

- **Default Configuration**:

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

### Plane Geometry - PlaneGeometry

- **Type**: `PlaneGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry](https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry)
- **Configuration Type**:

```ts
export interface PlaneGeometryConfig extends GeometryConfig {
    width: number;
    height: number;
    widthSegments: number;
    heightSegments: number;
}
```

- **Default Configuration**:

```ts
{
    width: 5,
    height: 5,
    widthSegments: 1,
    heightSegments: 1,
}
```

### Circle Geometry - CircleGeometry

- **Type**: `CircleGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/CircleGeometry](https://threejs.org/docs/index.html#api/en/geometries/CircleGeometry)
- **Configuration Type**:

```ts
export interface CircleGeometryConfig extends GeometryConfig {
    radius: number;
    segments: number;
    thetaStart: number;
    thetaLength: number;
}
```

- **Default Configuration**:

```ts
{
    radius: 3, 
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2,
}
```

### Cone Geometry - ConeGeometry

- **Type**: `ConeGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/ConeGeometry](https://threejs.org/docs/index.html#api/en/geometries/ConeGeometry)
- **Configuration Type**:

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

- **Default Configuration**:

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

### Cylinder Geometry - CylinderGeometry

- **Type**: `CylinderGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/CylinderGeometry](https://threejs.org/docs/index.html#api/en/geometries/CylinderGeometry)
- **Configuration Type**:

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

- **Default Configuration**:

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

### Dodecahedron Geometry - DodecahedronGeometry

- **Type**: `DodecahedronGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/DodecahedronGeometry](https://threejs.org/docs/index.html#api/en/geometries/DodecahedronGeometry)
- **Configuration Type**:

```ts
export interface DodecahedronGeometryConfig extends GeometryConfig {
    radius: number;
    detail: number;
}
```

- **Default Configuration**:

```ts
{
    radius: 3,
    detail: 0,
}
```

### Edges Geometry - EdgesGeometry

- **Type**: `EdgesGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/EdgesGeometry](https://threejs.org/docs/index.html#api/en/geometries/EdgesGeometry)
- **Configuration Type**:

```ts
export interface EdgesGeometryConfig extends GeometryConfig {
  /** Target geometry VID identifier */
    url: string;
    thresholdAngle: number;
}
```

- **Default Configuration**:

```ts
{
    url: "",
    hresholdAngle: 1,
}
```

### Torus Geometry - TorusGeometry

- **Type**: `TorusGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/TorusGeometry](https://threejs.org/docs/index.html#api/en/geometries/TorusGeometry)
- **Configuration Type**:

```ts
export interface TorusGeometryConfig extends GeometryConfig {
    radius: number;
    tube: number;
    radialSegments: number;
    tubularSegments: number;
    arc: number;
}
```

- **Default Configuration**:

```ts
{
    radius: 3,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6,
    arc:Math.PI * 2,
}
```

### Ring Geometry - RingGeometry

- **Type**: `RingGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/RingGeometry](https://threejs.org/docs/index.html#api/en/geometries/RingGeometry)
- **Configuration Type**:

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

- **Default Configuration**:

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

### Load Geometry - LoadGeometry

- **Type**: `LoadGeometry`
- **Configuration Type**:

```ts
/**
 * 加载几何
 */
export interface LoadGeometryConfig extends GeometryConfig {
    /**目标几何资源地址，通过ResourceManagerPlugin解析 */
    url: string;
}
```

- **Default Configuration**:

```ts
{
    url: "",
}
```

### Custom Geometry - CustomGeometry

- **Type**: `CustomGeometry`
- **Configuration Type**:

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

- **Default Configuration**:

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

### Curve Geometry - CurveGeometry

- **Type**: `CurveGeometry`
- **Configuration Type**:

```ts
export interface CurveGeometryConfig extends GeometryConfig {
  /** Collection of curve parameter points */
  path: Vector3Config[];
  /** Number of divisions along the curve */
  divisions: number;
  /** Whether to use equidistant segments */
  space: boolean;
}
```

- **Default Configuration**:

```ts
{
    center: false,
    path: [],
    divisions: 36,
    space: true,
}
```

:::tip
This type is used internally for other curve geometries.
:::

### Line Curve Geometry - LineCurveGeometry

- **Type**: `LineCurveGeometry`
- **Configuration Type**:

```ts
export interface LineCurveGeometryConfig extends CurveGeometryConfig {
}
```

- **Default Configuration**:

```ts
{
    center: false;
}
```

### Spline Curve Geometry - SplineCurveGeometry

- **Type**: `SplineCurveGeometry`
- **Configuration Type**:

```ts
export interface SplineCurveGeometryConfig extends CurveGeometryConfig {
}
```

- **Default Configuration**:

```ts
{
    center: false;
}
```

### Cubic Bezier Curve Geometry - CubicBezierCurveGeometry

- **Type**: `CubicBezierCurveGeometry`
- **Configuration Type**:

```ts
export interface CubicBezierCurveGeometryConfig extends CurveGeometryConfig {
}
```

- **Default Configuration**:

```ts
{
    center: false;
}
```

### Quadratic Bezier Curve Geometry - QuadraticBezierCurveGeometry

- **Type**: `QuadraticBezierCurveGeometry`
- **Configuration Type**:

```ts
export interface QuadraticBezierCurveGeometryConfig
    extends CurveGeometryConfig {
}
```

- **Default Configuration**:

```ts
{
    center: false;
}
```

### Tube Geometry - TubeGeometry

- **Type**: `TubeGeometry`
- **Reference**: [https://threejs.org/docs/index.html#api/en/geometries/TubeGeometry](https://threejs.org/docs/index.html#api/en/geometries/TubeGeometry)
- **Configuration Type**:

```ts
export interface TubeGeometryConfig extends GeometryConfig {
  /** Collection of curve parameter points */
    path: Vector3Config[];
    tubularSegments: number;
    radius: number;
    radialSegments: number;
    closed: boolean;
}
```

- **Default Configuration**:

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
This type is used internally for other tube geometries.
:::

### Line Tube Geometry - LineTubeGeometry

- **Type**: `LineTubeGeometry`
- **Configuration Type**:

```ts
export interface LineTubeGeometryConfig extends TubeGeometryConfig {
}
```

- **Default Configuration**:

```ts
{
    center: false;
}
```

### Spline Tube Geometry - SplineTubeGeometry

- **Type**: `SplineTubeGeometry`
- **Configuration Type**:

```ts
export interface SplineTubeGeometryConfig extends TubeGeometryConfig {
}
```

- **Default Configuration**:

```ts
{
    center: false;
}
```

### Shape Geometry - ShapeGeometry

- **Type**: `ShapeGeometry`
- **Configuration Type**:

```ts
export interface ShapeGeometryConfig extends GeometryConfig {
    /** Shape VID identifier */
    shape: string;
    curveSegments: number;
}
```

- **Default Configuration**:

```ts
{
    center: false,
    shape: "",
    curveSegments: 12,
}
```

### Extrude Geometry - ExtrudeGeometry

- **Type**: `ExtrudeGeometry`
- **Configuration Type**:

```ts
export interface ExtrudeGeometryConfig extends GeometryConfig {
  /** Extrude shape VID identifier */
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

- **Default Configuration**:

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

### Path Geometry - PathGeometry

- **Type**: `PathGeometry`
- **Configuration Type**:

```ts
export interface PathGeometryConfig extends GeometryConfig {
  /** Path VID identifier */
  path: string;
  space: boolean;
  divisions: number;
}
```

- **Default Configuration**:

```ts
  {
      center: false,
      path: "",
      space: false,
      divisions: 36,
  }
```
