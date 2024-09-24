# Module: plugin

## Interfaces

- [PluginOptions](../interfaces/plugin.PluginOptions.md)

## Type Aliases

### Plugin

Ƭ **Plugin**<`E`, `P`\>: (`params?`: `P`) => [`PluginOptions`](../interfaces/plugin.PluginOptions.md)<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](../classes/engine.Engine.md) |
| `P` | extends `object` = {} |

#### Type declaration

▸ (`params?`): [`PluginOptions`](../interfaces/plugin.PluginOptions.md)<`E`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `P` |

##### Returns

[`PluginOptions`](../interfaces/plugin.PluginOptions.md)<`E`\>

#### Defined in

[plugin/index.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/plugin/index.ts#L10)

## Functions

### definePlugin

▸ **definePlugin**<`E`\>(`options`): [`Plugin`](plugin.md#plugin)<`E`, `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](../classes/engine.Engine.md)<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PluginOptions`](../interfaces/plugin.PluginOptions.md)<`E`\> |

#### Returns

[`Plugin`](plugin.md#plugin)<`E`, `any`\>

#### Defined in

[plugin/index.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/plugin/index.ts#L14)
