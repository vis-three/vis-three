# Module: plugin/ResourceManagerPlugin

## Enumerations

- [RESOURCE\_EVENT](../enums/plugin_ResourceManagerPlugin.RESOURCE_EVENT.md)

## Classes

- [Parser](../classes/plugin_ResourceManagerPlugin.Parser.md)
- [ResourceManager](../classes/plugin_ResourceManagerPlugin.ResourceManager.md)

## Interfaces

- [MappedEvent](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)
- [MappingOptions](../interfaces/plugin_ResourceManagerPlugin.MappingOptions.md)
- [ParseParams](../interfaces/plugin_ResourceManagerPlugin.ParseParams.md)
- [ResourceManagerEngine](../interfaces/plugin_ResourceManagerPlugin.ResourceManagerEngine.md)
- [ResourceManagerPluginParameters](../interfaces/plugin_ResourceManagerPlugin.ResourceManagerPluginParameters.md)

## Type Aliases

### ResourceHanlder

Ƭ **ResourceHanlder**: (`url`: `string`, `resource`: `any`, `parseMap`: `Map`<`Function`, [`Parser`](../classes/plugin_ResourceManagerPlugin.Parser.md)\>) => [`Parser`](../classes/plugin_ResourceManagerPlugin.Parser.md) \| ``null``

#### Type declaration

▸ (`url`, `resource`, `parseMap`): [`Parser`](../classes/plugin_ResourceManagerPlugin.Parser.md) \| ``null``

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `resource` | `any` |
| `parseMap` | `Map`<`Function`, [`Parser`](../classes/plugin_ResourceManagerPlugin.Parser.md)\> |

##### Returns

[`Parser`](../classes/plugin_ResourceManagerPlugin.Parser.md) \| ``null``

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/Parser.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/Parser.ts#L10)

## Variables

### RESOURCE\_MANAGER\_PLUGIN

• `Const` **RESOURCE\_MANAGER\_PLUGIN**: ``"ResourceManagerPlugin"``

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/index.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/index.ts#L17)

## Functions

### ResourceManagerPlugin

▸ **ResourceManagerPlugin**(`params?`): `PluginOptions`<[`ResourceManagerEngine`](../interfaces/plugin_ResourceManagerPlugin.ResourceManagerEngine.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`ResourceManagerPluginParameters`](../interfaces/plugin_ResourceManagerPlugin.ResourceManagerPluginParameters.md) |

#### Returns

`PluginOptions`<[`ResourceManagerEngine`](../interfaces/plugin_ResourceManagerPlugin.ResourceManagerEngine.md)\>

#### Defined in

[packages/core/plugin/index.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/plugin/index.ts#L10)
