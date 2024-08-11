# Class: Translater<S, O, C\>

[module](../modules/module.md).Translater

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `O` | extends `object` |
| `C` | extends [`Compiler`](module.Compiler.md)<`S`, `O`\> |

## Constructors

### constructor

• **new Translater**<`S`, `O`, `C`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `O` | extends `object` |
| `C` | extends [`Compiler`](module.Compiler.md)<`S`, `O`, `C`\> |

## Properties

### members

• `Private` **members**: `C`[] = `[]`

#### Defined in

[packages/middleware/module/translater/index.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/translater/index.ts#L12)

___

### rule

• `Private` **rule**: [`Rule`](../modules/module.md#rule-1)<`C`\>

#### Defined in

[packages/middleware/module/translater/index.ts:11](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/translater/index.ts#L11)

## Methods

### apply

▸ **apply**(`compiler`): [`Translater`](module.Translater.md)<`S`, `O`, `C`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `compiler` | `C` |

#### Returns

[`Translater`](module.Translater.md)<`S`, `O`, `C`\>

#### Defined in

[packages/middleware/module/translater/index.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/translater/index.ts#L14)

___

### cancel

▸ **cancel**(`compiler`): [`Translater`](module.Translater.md)<`S`, `O`, `C`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `compiler` | `C` |

#### Returns

[`Translater`](module.Translater.md)<`S`, `O`, `C`\>

#### Defined in

[packages/middleware/module/translater/index.ts:21](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/translater/index.ts#L21)

___

### setRule

▸ **setRule**(`rule`): [`Translater`](module.Translater.md)<`S`, `O`, `C`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rule` | [`Rule`](../modules/module.md#rule-1)<`C`\> |

#### Returns

[`Translater`](module.Translater.md)<`S`, `O`, `C`\>

#### Defined in

[packages/middleware/module/translater/index.ts:28](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/translater/index.ts#L28)

___

### translate

▸ **translate**(`notice`): [`Translater`](module.Translater.md)<`S`, `O`, `C`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `notice` | [`ProxyNotice`](../interfaces/module.ProxyNotice.md) |

#### Returns

[`Translater`](module.Translater.md)<`S`, `O`, `C`\>

#### Defined in

[packages/middleware/module/translater/index.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/translater/index.ts#L33)
