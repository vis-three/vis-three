# Module: manager

## Classes

- [AniScriptGeneratorManager](../classes/manager.AniScriptGeneratorManager.md)
- [EventGeneratorManager](../classes/manager.EventGeneratorManager.md)
- [ShaderGeneratorManager](../classes/manager.ShaderGeneratorManager.md)

## Interfaces

- [BasicAniScriptConfig](../interfaces/manager.BasicAniScriptConfig.md)
- [BasicEventConfig](../interfaces/manager.BasicEventConfig.md)
- [Shader](../interfaces/manager.Shader.md)

## Type Aliases

### AniScriptGenerator

Ƭ **AniScriptGenerator**<`C`\>: (`engine`: [`EngineSupport`](../classes/engine.EngineSupport.md), `target`: `object`, `attribute`: `string`, `config`: `C`) => (`event`: `RenderEvent`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BasicAniScriptConfig`](../interfaces/manager.BasicAniScriptConfig.md) |

#### Type declaration

▸ (`engine`, `target`, `attribute`, `config`): (`event`: `RenderEvent`) => `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `target` | `object` |
| `attribute` | `string` |
| `config` | `C` |

##### Returns

`fn`

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `RenderEvent` |

##### Returns

`void`

#### Defined in

[packages/middleware/manager/AniScriptGeneratorManager.ts:8](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/AniScriptGeneratorManager.ts#L8)

___

### EventGenerator

Ƭ **EventGenerator**<`C`\>: (`engine`: [`EngineSupport`](../classes/engine.EngineSupport.md), `config`: `C`) => (`event?`: `ObjectEvent`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BasicEventConfig`](../interfaces/manager.BasicEventConfig.md) |

#### Type declaration

▸ (`engine`, `config`): (`event?`: `ObjectEvent`) => `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `config` | `C` |

##### Returns

`fn`

▸ (`event?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `ObjectEvent` |

##### Returns

`void`

#### Defined in

[packages/middleware/manager/EventGeneratorManager.ts:8](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/EventGeneratorManager.ts#L8)
