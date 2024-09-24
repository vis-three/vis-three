# Class: CompilerManager

[plugin/CompilerManagerPlugin](../modules/plugin_CompilerManagerPlugin.md).CompilerManager

## Hierarchy

- `EventDispatcher`

  ↳ **`CompilerManager`**

## Constructors

### constructor

• **new CompilerManager**()

#### Overrides

EventDispatcher.constructor

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:8](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L8)

## Properties

### compilerMap

• **compilerMap**: `Map`<`string`, [`BasicCompiler`](../modules/module.md#basiccompiler)\>

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L6)

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

▸ **dispose**(): [`CompilerManager`](plugin_CompilerManagerPlugin.CompilerManager.md)

#### Returns

[`CompilerManager`](plugin_CompilerManagerPlugin.CompilerManager.md)

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:99](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L99)

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

### extend

▸ **extend**<`C`\>(`compiler`, `focus?`): `void`

编译器扩展

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`Compiler`](module.Compiler.md)<`any`, `any`, `C`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `compiler` | `C` | `undefined` |
| `focus` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:16](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L16)

___

### getCompiler

▸ **getCompiler**<`D`\>(`module`): ``null`` \| `D`

#### Type parameters

| Name |
| :------ |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `module` | `string` |

#### Returns

``null`` \| `D`

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:28](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L28)

___

### getObjectBySymbol

▸ **getObjectBySymbol**(`vid`): `any`

通过vid标识获取相应的three对象

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vid` | `string` | vid标识 |

#### Returns

`any`

three object || null

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:58](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L58)

___

### getObjectSymbol

▸ **getObjectSymbol**<`O`\>(`object`): ``null`` \| `string`

获取该three物体的vid标识

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `O` | three object |

#### Returns

``null`` \| `string`

vid or null

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:42](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L42)

___

### getObjectfromModule

▸ **getObjectfromModule**(`module`, `vid`): ``null`` \| `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `module` | `string` |
| `vid` | `string` |

#### Returns

``null`` \| `object`

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:68](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L68)

___

### getObjectfromModules

▸ **getObjectfromModules**(`modules`, `vid`): ``null`` \| `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `modules` | `string`[] \| `Record`<`string`, `any`\> |
| `vid` | `string` |

#### Returns

``null`` \| `object`

#### Defined in

[packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts:78](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/CompilerManagerPlugin/CompilerManager.ts#L78)

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
