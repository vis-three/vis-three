# Class: EventManager

## Hierarchy

- `EventDispatcher`

  ↳ **`EventManager`**

## Constructors

### constructor

• **new EventManager**(`parameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`EventManagerParameters`](../interfaces/EventManagerParameters.md) |

#### Overrides

EventDispatcher.constructor

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:71](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L71)

## Properties

### camera

• `Private` **camera**: `Camera`

目标相机

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:60](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L60)

___

### delegation

• **delegation**: `boolean` = `false`

**`Todo`**

委托

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:69](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L69)

___

### filter

• `Private` **filter**: `Set`<`Object3D`<`Event`\>\>

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:61](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L61)

___

### penetrate

• **penetrate**: `boolean` = `false`

事件穿透

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:65](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L65)

___

### propagation

• **propagation**: `boolean` = `false`

**`Todo`**

冒泡

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:67](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L67)

___

### raycaster

• **raycaster**: `Raycaster`

射线发射器

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:56](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L56)

___

### recursive

• **recursive**: `boolean` = `false`

递归子物体

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:63](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L63)

___

### scene

• `Private` **scene**: `Scene`

目标场景

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:58](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L58)

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

[packages/core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L23)

___

### addFilterObject

▸ **addFilterObject**(`object`): [`EventManager`](EventManager.md)

添加不会触发事件的场景中的物体

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `Object3D`<`Event`\> | Object3D |

#### Returns

[`EventManager`](EventManager.md)

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:110](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L110)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

EventDispatcher.clear

#### Defined in

[packages/core/eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L218)

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

[packages/core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L101)

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

[packages/core/eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L134)

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

[packages/core/eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L195)

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

[packages/core/eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L165)

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

[packages/core/eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L48)

___

### intersectObject

▸ `Private` **intersectObject**(`mouse`): `Intersection`<`Object3D`<`Event`\>\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mouse` | `Vector2` |

#### Returns

`Intersection`<`Object3D`<`Event`\>\>[]

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:125](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L125)

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

[packages/core/eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L178)

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

[packages/core/eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L155)

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

[packages/core/eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L120)

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

[packages/core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L207)

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

[packages/core/eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L89)

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

[packages/core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L66)

___

### removeFilterObject

▸ **removeFilterObject**(`object`): [`EventManager`](EventManager.md)

移除过滤器中的物体

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `Object3D`<`Event`\> | Object3D |

#### Returns

[`EventManager`](EventManager.md)

this

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L120)

___

### setCamera

▸ **setCamera**(`camera`): [`EventManager`](EventManager.md)

设置当前相机

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |

#### Returns

[`EventManager`](EventManager.md)

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:100](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L100)

___

### setScene

▸ **setScene**(`scene`): [`EventManager`](EventManager.md)

设置当前场景

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

[`EventManager`](EventManager.md)

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:90](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L90)

___

### use

▸ **use**(`pointerManager`): [`EventManager`](EventManager.md)

使用pointerManger

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointerManager` | `PointerManager` |

#### Returns

[`EventManager`](EventManager.md)

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:140](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L140)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

EventDispatcher.useful

#### Defined in

[packages/core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/core/eventDispatcher/index.ts#L226)
