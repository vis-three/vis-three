# Interface: GenerateConfig

[utils](../modules/utils.md).GenerateConfig

## Callable

### GenerateConfig

▸ **GenerateConfig**<`C`\>(`type`, `merge?`, `options?`): `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](module.SymbolConfig.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `merge?` | `DeepPartial`<`C`\> |
| `options?` | [`GenerateOptions`](utils.GenerateOptions.md)<`C`\> |

#### Returns

`C`

#### Defined in

[packages/middleware/utils/generateConfig.ts:22](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L22)

## Properties

### autoInject

• **autoInject**: `boolean`

#### Defined in

[packages/middleware/utils/generateConfig.ts:27](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L27)

___

### injectEngine

• **injectEngine**: ``null`` \| [`EngineSupport`](../classes/engine.EngineSupport.md)

#### Defined in

[packages/middleware/utils/generateConfig.ts:28](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L28)

___

### injectScene

• **injectScene**: `string` \| `boolean`

#### Defined in

[packages/middleware/utils/generateConfig.ts:29](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L29)
