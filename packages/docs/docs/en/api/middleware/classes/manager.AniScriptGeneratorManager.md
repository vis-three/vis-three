# Class: AniScriptGeneratorManager

[manager](../modules/manager.md).AniScriptGeneratorManager

## Constructors

### constructor

• **new AniScriptGeneratorManager**()

## Properties

### configLibrary

▪ `Static` `Private` **configLibrary**: `Map`<`string`, `unknown`\>

#### Defined in

[packages/middleware/manager/AniScriptGeneratorManager.ts:16](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/AniScriptGeneratorManager.ts#L16)

___

### generatorLibrary

▪ `Static` `Private` **generatorLibrary**: `Map`<`string`, [`AniScriptGenerator`](../modules/manager.md#aniscriptgenerator)<`any`\>\>

#### Defined in

[packages/middleware/manager/AniScriptGeneratorManager.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/AniScriptGeneratorManager.ts#L17)

___

### register

▪ `Static` **register**: <C\>(`__namedParameters`: { `config`: `C` ; `generator`: [`AniScriptGenerator`](../modules/manager.md#aniscriptgenerator)<`C`\>  }) => [`AniScriptGeneratorManager`](manager.AniScriptGeneratorManager.md)

#### Type declaration

▸ <`C`\>(`«destructured»`): [`AniScriptGeneratorManager`](manager.AniScriptGeneratorManager.md)

##### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BasicAniScriptConfig`](../interfaces/manager.BasicAniScriptConfig.md) |

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `config` | `C` |
| › `generator` | [`AniScriptGenerator`](../modules/manager.md#aniscriptgenerator)<`C`\> |

##### Returns

[`AniScriptGeneratorManager`](manager.AniScriptGeneratorManager.md)

#### Defined in

[packages/middleware/manager/AniScriptGeneratorManager.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/AniScriptGeneratorManager.ts#L19)

## Methods

### generateConfig

▸ `Static` **generateConfig**(`name`, `merge`): [`BasicAniScriptConfig`](../interfaces/manager.BasicAniScriptConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `merge` | `object` |

#### Returns

[`BasicAniScriptConfig`](../interfaces/manager.BasicAniScriptConfig.md)

#### Defined in

[packages/middleware/manager/AniScriptGeneratorManager.ts:43](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/AniScriptGeneratorManager.ts#L43)

___

### generateScript

▸ `Static` **generateScript**(`engine`, `target`, `attribute`, `config`): (`event`: `RenderEvent`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | [`EngineSupport`](engine.EngineSupport.md) |
| `target` | `object` |
| `attribute` | `string` |
| `config` | [`BasicAniScriptConfig`](../interfaces/manager.BasicAniScriptConfig.md) |

#### Returns

`fn`

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `RenderEvent` |

##### Returns

`void`

#### Defined in

[packages/middleware/manager/AniScriptGeneratorManager.ts:77](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/AniScriptGeneratorManager.ts#L77)

___

### has

▸ `Static` **has**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/middleware/manager/AniScriptGeneratorManager.ts:98](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/AniScriptGeneratorManager.ts#L98)
