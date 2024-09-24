# Class: ResourceManager

[plugin/ResourceManagerPlugin](../modules/plugin_ResourceManagerPlugin.md).ResourceManager

## Hierarchy

- `EventDispatcher`

  ↳ **`ResourceManager`**

## Constructors

### constructor

• **new ResourceManager**(`resources?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | `Object` |

#### Overrides

EventDispatcher.constructor

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:28](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L28)

## Properties

### configMap

• **configMap**: `Map`<`string`, [`SymbolConfig`](../interfaces/module.SymbolConfig.md)\>

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L23)

___

### paserMap

• `Private` **paserMap**: `Map`<`Function`, [`Parser`](plugin_ResourceManagerPlugin.Parser.md)\>

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L26)

___

### resourceMap

• **resourceMap**: `Map`<`string`, `any`\>

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L24)

## Methods

### addEventListener

▸ **addEventListener**<`C`\>(`type`, `listener`): `void`

添加事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.addEventListener

#### Defined in

[packages/core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L23)

___

### addParser

▸ **addParser**(`parser`): [`ResourceManager`](plugin_ResourceManagerPlugin.ResourceManager.md)

添加解析器

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parser` | [`Parser`](plugin_ResourceManagerPlugin.Parser.md) | extends VIS.Parser |

#### Returns

[`ResourceManager`](plugin_ResourceManagerPlugin.ResourceManager.md)

this

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L51)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

EventDispatcher.clear

#### Defined in

[packages/core/eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L218)

___

### dispatchEvent

▸ **dispatchEvent**<`C`\>(`event`): `void`

触发事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `C` |

#### Returns

`void`

#### Inherited from

EventDispatcher.dispatchEvent

#### Defined in

[packages/core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): `void`

清空所有资源

#### Returns

`void`

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:216](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L216)

___

### emit

▸ **emit**<`C`\>(`name`, `params?`): `void`

触发事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `C`[``"type"``] |
| `params` | `Omit`<`C`, ``"type"``\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.emit

#### Defined in

[packages/core/eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L134)

___

### eventCount

▸ **eventCount**(`type`): `number`

获取事件数量

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`number`

#### Inherited from

EventDispatcher.eventCount

#### Defined in

[packages/core/eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L195)

___

### getResourceConfig

▸ **getResourceConfig**(`url`): [`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

获取资源的配置单，该配置单根据资源结构生成

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | 资源url |

#### Returns

[`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

LoadOptions

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:152](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L152)

___

### has

▸ **has**<`C`\>(`type`, `listener`): `boolean`

是否有此事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener` | `EventListener`<`C`\> |

#### Returns

`boolean`

#### Inherited from

EventDispatcher.has

#### Defined in

[packages/core/eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L165)

___

### hasEventListener

▸ **hasEventListener**<`C`\>(`type`, `listener`): `boolean`

是否有此事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener`<`C`\> |

#### Returns

`boolean`

#### Inherited from

EventDispatcher.hasEventListener

#### Defined in

[packages/core/eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L48)

___

### hasResource

▸ **hasResource**(`url`): `boolean`

是否有此资源

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | 资源 url |

#### Returns

`boolean`

boolean

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:188](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L188)

___

### mappingResource

▸ **mappingResource**(`loadResourceMap`, `options?`): [`ResourceManager`](plugin_ResourceManagerPlugin.ResourceManager.md)

根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loadResourceMap` | `Map`<`string`, `unknown`\> | loaderManager的resourceMap |
| `options?` | [`MappingOptions`](../interfaces/plugin_ResourceManagerPlugin.MappingOptions.md) | options.handler: {url, hanlder}可以根据特定的url指定特定的解析器 |

#### Returns

[`ResourceManager`](plugin_ResourceManagerPlugin.ResourceManager.md)

this

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L66)

___

### off

▸ **off**<`C`\>(`type`, `listener?`): `void`

移除事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener?` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.off

#### Defined in

[packages/core/eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L178)

___

### on

▸ **on**<`C`\>(`type`, `listener`): `void`

订阅事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.on

#### Defined in

[packages/core/eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L155)

___

### once

▸ **once**<`C`\>(`type`, `listener`): `void`

一次性事件触发

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.once

#### Defined in

[packages/core/eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L120)

___

### popLatestEvent

▸ **popLatestEvent**(`type`): `void`

销毁该类型的最后一个事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`void`

#### Inherited from

EventDispatcher.popLatestEvent

#### Defined in

[packages/core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L207)

___

### remove

▸ **remove**(`url`): [`ResourceManager`](plugin_ResourceManagerPlugin.ResourceManager.md)

移除url下的所有资源

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | url |

#### Returns

[`ResourceManager`](plugin_ResourceManagerPlugin.ResourceManager.md)

this

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts:197](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/ResourceManager.ts#L197)

___

### removeEvent

▸ **removeEvent**(`type`): `void`

移除该类型的所有事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`void`

#### Inherited from

EventDispatcher.removeEvent

#### Defined in

[packages/core/eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L89)

___

### removeEventListener

▸ **removeEventListener**<`C`\>(`type`, `listener`): `void`

移除事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.removeEventListener

#### Defined in

[packages/core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L66)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

EventDispatcher.useful

#### Defined in

[packages/core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L226)
