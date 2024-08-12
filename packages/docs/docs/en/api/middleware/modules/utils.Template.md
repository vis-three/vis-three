# Namespace: Template

[utils](utils.md).Template

## Interfaces

- [CloneResult](../interfaces/utils.Template.CloneResult.md)

## Functions

### clone

▸ **clone**(`object`, `options?`): [`CloneResult`](../interfaces/utils.Template.CloneResult.md) \| [`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions)

Clone Entire Configuration

#### Parameters

| Name | Type | Description                                                                                                       |
| :------ | :------ |:------------------------------------------------------------------------------------------------------------------|
| `object` | [`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions) | EngineSupportLoadOptions                                                                                          |
| `options` | `Object` | Additional Options - `detail: boolean` returns a clone map - `fillName` determines whether to fill unnamed units  |
| `options.detail?` | `boolean` | -                                                                                                                 |
| `options.fillName?` | `boolean` \| (`SymbolConfig`: `any`) => `string` | -                                                                                                                 |

#### Returns

[`CloneResult`](../interfaces/utils.Template.CloneResult.md) \| [`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions)

EngineSupportLoadOptions | CloneResult

#### Defined in

[packages/middleware/utils/template.ts:21](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/template.ts#L21)

___

### handler

▸ **handler**(`object`, `handler`, `options?`): [`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions)

Process each configuration item in the configuration

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | [`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions) |
| `handler` | (`config`: [`SymbolConfig`](../interfaces/module.SymbolConfig.md)) => [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `options` | `Object` |
| `options.assets?` | `boolean` |
| `options.clone?` | `boolean` |

#### Returns

[`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions)

#### Defined in

[packages/middleware/utils/template.ts:77](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/template.ts#L77)

___

### observable

▸ **observable**(`object`, `obCallback?`): [`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `string` \| [`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions) |
| `obCallback?` | (`config`: [`SymbolConfig`](../interfaces/module.SymbolConfig.md)) => [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

#### Returns

[`EngineSupportLoadOptions`](engine.md#enginesupportloadoptions)

#### Defined in

[packages/middleware/utils/template.ts:118](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/template.ts#L118)

___

### planish

▸ **planish**(`configs`): `Record`<`string`, [`SymbolConfig`](../interfaces/module.SymbolConfig.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs` | [`LoadOptions`](plugin_DataSupportManagerPlugin.md#loadoptions) |

#### Returns

`Record`<`string`, [`SymbolConfig`](../interfaces/module.SymbolConfig.md)\>

#### Defined in

[packages/middleware/utils/template.ts:104](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/template.ts#L104)
