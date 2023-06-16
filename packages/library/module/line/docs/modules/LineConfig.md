# Module: LineConfig

## Interfaces

- [LineConfig](../interfaces/LineConfig.LineConfig.md)

## Functions

### getLineConfig

▸ **getLineConfig**(): [`LineConfig`](../interfaces/LineConfig.LineConfig.md)

获取直线物体配置 - 其他属性继承`getSolidObjectConfig`并会与之合并。

**`Example`**

```ts
{
    type: "Line",
    geometry: "",
    material: "",
    computeLineDistances: false,
  }
```

#### Returns

[`LineConfig`](../interfaces/LineConfig.LineConfig.md)

#### Defined in

[library/module/line/LineConfig.ts:29](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/library/module/line/LineConfig.ts#L29)
