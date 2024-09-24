# Class: DataSupportManager

[plugin/DataSupportManagerPlugin](../modules/plugin_DataSupportManagerPlugin.md).DataSupportManager

## Hierarchy

- `EventDispatcher`

  ↳ **`DataSupportManager`**

## Constructors

### constructor

• **new DataSupportManager**()

#### Overrides

EventDispatcher.constructor

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:11](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L11)

## Properties

### dataSupportMap

• **dataSupportMap**: `Map`<`string`, [`DataSupport`](module.DataSupport.md)<`any`, `any`, `any`\>\>

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:9](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L9)

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

### applyConfig

▸ **applyConfig**<`T`\>(`...configs`): [`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

应用配置对象

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...configs` | `T`[] |

#### Returns

[`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

this

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:106](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L106)

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

### exportConfig

▸ **exportConfig**(`extendsConfig?`, `compress?`): [`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

导出配置单

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `extendsConfig` | `Record`<`string`, `any`[]\> | `{}` | 拓展配置对象 |
| `compress` | `boolean` | `true` | 是否压缩配置单 default true |

#### Returns

[`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

LoadOptions

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:170](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L170)

___

### extend

▸ **extend**(`dataSupport`, `focus?`): `void`

编译器扩展

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dataSupport` | [`DataSupport`](module.DataSupport.md)<`any`, `any`, `any`\> | `undefined` |
| `focus` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L19)

___

### getConfigBySymbol

▸ **getConfigBySymbol**<`T`\>(`vid`): ``null`` \| `T`

通过vid标识获取相应配置对象

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vid` | `string` | vid标识 |

#### Returns

``null`` \| `T`

config || null

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:53](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L53)

___

### getDataSupport

▸ **getDataSupport**<`D`\>(`type`): ``null`` \| `D`

获取该模块下的支持插件

#### Type parameters

| Name |
| :------ |
| `D` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | MODULETYPE |

#### Returns

``null`` \| `D`

DataSupport

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:39](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L39)

___

### getModuleBySymbol

▸ **getModuleBySymbol**(`vid`): ``null`` \| `string`

通过vid标识获取该标识所处的模块

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vid` | `string` | vid标识 |

#### Returns

``null`` \| `string`

MODULETYPE || null

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L89)

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

### load

▸ **load**(`config`): [`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

根据配置单加载对象

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions) | 符合vis配置选项的配置单对象 |

#### Returns

[`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

this

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:127](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L127)

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

▸ **remove**(`config`): [`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

根据配置单移除相关对象

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions) | 符合vis配置选项的配置单对象 |

#### Returns

[`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

this

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:140](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L140)

___

### removeConfigBySymbol

▸ **removeConfigBySymbol**(`...vids`): [`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

通过vid标识移除相关配置对象

#### Parameters

| Name | Type |
| :------ | :------ |
| `...vids` | `string`[] |

#### Returns

[`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

this

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:71](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L71)

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

### toJSON

▸ **toJSON**(`extendsConfig?`, `compress?`): `string`

获取JSON化的配置单

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `extendsConfig` | `Record`<`string`, `any`[]\> | `{}` | 需要额外JSON化的配置对象，会被dataSupport的对象覆盖 |
| `compress` | `boolean` | `true` | 是否压缩配置单 default true |

#### Returns

`string`

JSON string

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts:154](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/DataSupportManager.ts#L154)

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
