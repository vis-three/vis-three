# 常量

## MODULE_TYPE

当前所有注册的模块类型。

- **类型**

```ts
Record<string, string>;
```

- **详情**

```ts
const engine = defineEngineSupport({
  modules: [MeshModule, GeometryModule, MaterialModule],
});

console.log(MODULE_TYPE.MESH); // mesh
console.log(MODULE_TYPE.GEOMETRY); // geometry
console.log(MODULE_TYPE.MATERIAL); // material
```

## CONFIG_TYPE

当前所有注册的配置化模型类型。

- **类型**

```ts
Record<string, string>;
```

- **详情**

```ts
const GeometryModule = defineModule({
  type: "geometry",
  models: [BoxGeometryModel, SphereGeometryModel],
});

const engine = defineEngineSupport({
  modules: [GeometryModule],
});

console.log(CONFIG_TYPE.BOXGEOMETRY); // BoxGeometry
console.log(CONFIG_TYPE.SPHEREGEOMETRY); // SphereGeometry
```

## OBJECT_MODULE

当前注册的模块中属于物体模块。

- **类型**

```ts
Record<string, boolean>;
```

- **详情**

```ts
const MeshModule = defineModule({
  type: "mesh",
  object: true,
});

const engine = defineEngineSupport({
  modules: [MeshModule, GeometryModule, MaterialModule],
});
console.log(OBJECT_MODULE["mesh"]); // true
console.log(OBJECT_MODULE["geometry"]); // false
```

## CONFIG_MODULE

该模型类型对应的模块类型。

- **类型**

```ts
Record<string, string>;
```

- **详情**

```ts
const GeometryModule = defineModule({
  type: "geometry",
  models: [BoxGeometryModel, SphereGeometryModel],
});

const engine = defineEngineSupport({
  modules: [GeometryModule],
});

console.log(CONFIG_MODULE["BoxGeometry"]); // 'geometry'
```

## MODEL_EVENT

配置化模型所有的模型事件。

- **类型**

```ts
export enum MODEL_EVENT {
  COMPILED_ADD = "compiledAdd",
  COMPILED_REMOVE = "compiledRemove",
  COMPILED_ATTR = "compiledAttr",
  COMPILED_UPDATE = "compiledUpdate",
  COMPILED = "compiled",
  NOTICED = "noticed",
}
```

## SUPPORT_LIFE_CYCLE

`@vis-three/tdcm`提供的模块生命周期。

- **类型**

```ts
export enum SUPPORT_LIFE_CYCLE {
  ZERO = 0,
  ONE = 100,
  TWO = 200,
  THREE = 300,
  FOUR = 400,
  FIVE = 500,
  SIX = 600,
  SEVEN = 700,
  EIGHT = 800,
  NINE = 900,
}
```

## DEFAULT_RULE

`@vis-three/tdcm`提供的默认处理规则。

- **类型**

```ts
export const DEFAULT_RULE: Record<string, Rule> = {
  SYMBOL_VALIDATOR(input) {
    return globalOption.symbol.validator(input.symbol);
  },
  OPERATE_ADD({ operate, path, symbol, key, value }, compiler) {
    if (operate === "add" && !path.length && symbol === key) {
      compiler.add(value);
      return false;
    } else {
      return true;
    }
  },
  OPERATE_DELETE({ operate, path, value }, compiler) {
    if (operate === "delete" && !path.length) {
      compiler.remove(value);
      return false;
    } else {
      return true;
    }
  },
  OPERATE_COVER({ operate, path, value, key, symbol }, compiler) {
    if (operate === "set" && !path.length && key === symbol) {
      compiler.cover(value);
      return false;
    } else {
      return true;
    }
  },
  OPERATE_COMPILE(input, compiler) {
    compiler.compile(input.symbol, input);
    return false;
  },
};
```
