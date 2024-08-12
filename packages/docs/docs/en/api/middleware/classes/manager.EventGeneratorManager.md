# Class: EventGeneratorManager

[manager](../modules/manager.md).EventGeneratorManager

## Constructors

### constructor

• **new EventGeneratorManager**()

## Properties

### configLibrary

▪ `Static` `Private` **configLibrary**: `Map`<`string` \| `Symbol`, `unknown`\>

#### Defined in

[packages/middleware/manager/EventGeneratorManager.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/EventGeneratorManager.ts#L14)

___

### generatorLibrary

▪ `Static` `Private` **generatorLibrary**: `Map`<`string` \| `Symbol`, [`EventGenerator`](../modules/manager.md#eventgenerator)<`any`\>\>

#### Defined in

[packages/middleware/manager/EventGeneratorManager.ts:15](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/EventGeneratorManager.ts#L15)

___

### register

▪ `Static` **register**: <C\>(`__namedParameters`: { `config`: `C` ; `generator`: [`EventGenerator`](../modules/manager.md#eventgenerator)<`C`\>  }) => [`EventGeneratorManager`](manager.EventGeneratorManager.md)

#### Type declaration

▸ <`C`\>(`«destructured»`): [`EventGeneratorManager`](manager.EventGeneratorManager.md)

##### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BasicEventConfig`](../interfaces/manager.BasicEventConfig.md) |

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `config` | `C` |
| › `generator` | [`EventGenerator`](../modules/manager.md#eventgenerator)<`C`\> |

##### Returns

[`EventGeneratorManager`](manager.EventGeneratorManager.md)

#### Defined in

[packages/middleware/manager/EventGeneratorManager.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/EventGeneratorManager.ts#L20)

## Methods

### generateConfig

▸ `Static` **generateConfig**(`name`, `merge`): [`BasicEventConfig`](../interfaces/manager.BasicEventConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `merge` | `object` |

#### Returns

[`BasicEventConfig`](../interfaces/manager.BasicEventConfig.md)

#### Defined in

[packages/middleware/manager/EventGeneratorManager.ts:43](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/EventGeneratorManager.ts#L43)

___

### generateEvent

▸ `Static` **generateEvent**(`config`, `engine`): (`event?`: `ObjectEvent`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`BasicEventConfig`](../interfaces/manager.BasicEventConfig.md) |
| `engine` | [`EngineSupport`](engine.EngineSupport.md) |

#### Returns

`fn`

▸ (`event?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `ObjectEvent` |

##### Returns

`void`

#### Defined in

[packages/middleware/manager/EventGeneratorManager.ts:74](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/EventGeneratorManager.ts#L74)

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

[packages/middleware/manager/EventGeneratorManager.ts:91](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/EventGeneratorManager.ts#L91)
