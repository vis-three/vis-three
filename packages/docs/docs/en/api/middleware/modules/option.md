# Module: option

## Interfaces

- [GlobalOption](../interfaces/option.GlobalOption.md)

## Variables

### globalOption

• `Const` **globalOption**: [`GlobalOption`](../interfaces/option.GlobalOption.md)

#### Defined in

[packages/middleware/option/index.ts:16](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/option/index.ts#L16)

## Functions

### defineOption

▸ **defineOption**(`options`): ```void```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.proxy?` | { expand?: ((c: any) =\> any) \| undefined; timing?: "after" \| "before" \| undefined; toRaw?: ((c: any) =\> any) \| undefined; } |
| `options.symbol?` | { generator?: Function \| undefined; validator?: Function \| undefined; } |

#### Returns

`void`

#### Defined in

[packages/middleware/option/index.ts:28](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/option/index.ts#L28)
