# Module: utils

## Namespaces

- [Bus](utils.Bus.md)
- [JSONHandler](utils.JSONHandler.md)
- [Template](utils.Template.md)

## Classes

- [AntiShake](../classes/utils.AntiShake.md)

## Interfaces

- [GenerateConfig](../interfaces/utils.GenerateConfig.md)
- [GenerateOptions](../interfaces/utils.GenerateOptions.md)

## Variables

### globalAntiShake

• `Const` **globalAntiShake**: [`AntiShake`](../classes/utils.AntiShake.md)

#### Defined in

[packages/middleware/utils/AntiShake.ts:63](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/AntiShake.ts#L63)

## Functions

### createSymbol

▸ **createSymbol**(): `any`

#### Returns

`any`

#### Defined in

[packages/middleware/utils/index.ts:9](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/index.ts#L9)

___

### generateConfig

▸ **generateConfig**<`C`\>(`type`, `merge?`, `options?`): `C`

生成相关对象配置单

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | 对象类型 CONFIGTYPE |
| `merge?` | `DeepPartial`<`C`\> | 合并的对象 |
| `options?` | [`GenerateOptions`](../interfaces/utils.GenerateOptions.md)<`C`\> | 函数的拓展选项 |

#### Returns

`C`

config object

#### Defined in

[packages/middleware/utils/generateConfig.ts:22](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L22)
