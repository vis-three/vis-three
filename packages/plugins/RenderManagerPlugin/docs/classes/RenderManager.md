# Class: RenderManager

## Hierarchy

- `EventDispatcher`

  ↳ **`RenderManager`**

## Constructors

### constructor

• **new RenderManager**(`fps?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fps` | `number` | `0` |

#### Overrides

EventDispatcher.constructor

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L24)

## Properties

### animationFrame

• `Private` **animationFrame**: `number` = `-1`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L18)

___

### clock

• `Private` **clock**: `Clock`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L17)

___

### fps

• `Private` **fps**: `number` = `0`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L19)

___

### playFun

• `Private` **playFun**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:22](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L22)

___

### timer

• `Private` **timer**: ``null`` \| `Timeout` = `null`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L20)

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

[core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L23)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

EventDispatcher.clear

#### Defined in

[core/eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L218)

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

[core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): `void`

销毁内存

#### Returns

`void`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:143](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L143)

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

[core/eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L134)

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

[core/eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L195)

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

[core/eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L165)

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

[core/eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L48)

___

### hasRendering

▸ **hasRendering**(): `boolean`

是否处于渲染当中

#### Returns

`boolean`

boolean

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:128](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L128)

___

### hasVaildRender

▸ **hasVaildRender**(): `boolean`

是否有效渲染队列

#### Returns

`boolean`

boolean

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:136](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L136)

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

[core/eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L178)

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

[core/eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L155)

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

[core/eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L120)

___

### play

▸ **play**(): `void`

根据指定fps进行持续渲染

#### Returns

`void`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:92](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L92)

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

[core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L207)

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

[core/eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L89)

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

[core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L66)

___

### render

▸ **render**(): `void`

渲染一帧

#### Returns

`void`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:81](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L81)

___

### setFPS

▸ **setFPS**(`fps`): [`RenderManager`](RenderManager.md)

设置fps

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fps` | `number` | 帧率 |

#### Returns

[`RenderManager`](RenderManager.md)

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:34](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L34)

___

### stop

▸ **stop**(): `void`

停止渲染

#### Returns

`void`

#### Defined in

[plugins/RenderManagerPlugin/RenderManager.ts:108](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/plugins/RenderManagerPlugin/RenderManager.ts#L108)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

EventDispatcher.useful

#### Defined in

[core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/20852c50/packages/core/eventDispatcher/index.ts#L226)
