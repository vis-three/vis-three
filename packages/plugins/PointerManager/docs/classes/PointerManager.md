# Class: PointerManager

## Hierarchy

- `EventDispatcher`

  ↳ **`PointerManager`**

## Constructors

### constructor

• **new PointerManager**(`parameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters` | [`PointerManagerParameters`](../interfaces/PointerManagerParameters.md) |

#### Overrides

EventDispatcher.constructor

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:44](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L44)

## Properties

### canMouseMove

• `Private` **canMouseMove**: `boolean`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L32)

___

### clickHandler

• `Private` **clickHandler**: (`event`: `MouseEvent`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

##### Returns

`void`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:40](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L40)

___

### contextmenuHandler

• `Private` **contextmenuHandler**: (`event`: `MouseEvent`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

##### Returns

`void`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:42](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L42)

___

### dblclickHandler

• `Private` **dblclickHandler**: (`event`: `MouseEvent`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

##### Returns

`void`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:41](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L41)

___

### dom

• `Private` **dom**: `undefined` \| `HTMLElement`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:25](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L25)

___

### mouse

• **mouse**: `Vector2`

归一化鼠标指针

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:28](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L28)

___

### mouseDownHandler

• `Private` **mouseDownHandler**: (`event`: `MouseEvent`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

##### Returns

`void`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:38](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L38)

___

### mouseEventTimer

• `Private` **mouseEventTimer**: ``null`` \| `number`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L33)

___

### mouseUpHandler

• `Private` **mouseUpHandler**: (`event`: `MouseEvent`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MouseEvent` |

##### Returns

`void`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:39](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L39)

___

### pointerDownHandler

• `Private` **pointerDownHandler**: (`event`: `PointerEvent`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `PointerEvent` |

##### Returns

`void`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:35](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L35)

___

### pointerMoveHandler

• `Private` **pointerMoveHandler**: (`event`: `PointerEvent`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `PointerEvent` |

##### Returns

`void`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:36](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L36)

___

### pointerUpHandler

• `Private` **pointerUpHandler**: (`event`: `PointerEvent`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `PointerEvent` |

##### Returns

`void`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:37](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L37)

___

### throttleTime

• **throttleTime**: `number`

鼠标事件的节流时间

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:30](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L30)

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

[packages/core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L23)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

EventDispatcher.clear

#### Defined in

[packages/core/eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L218)

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

[packages/core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L101)

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

[packages/core/eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L134)

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

[packages/core/eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L195)

___

### getNormalMouse

▸ **getNormalMouse**(): `Vector2`

获取归一化的鼠标指针

#### Returns

`Vector2`

mouse

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:145](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L145)

___

### getWorldPosition

▸ **getWorldPosition**(`camera`, `offset`, `result?`): `Vector3`

获取当前指针位置从给定相机出发的世界坐标

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `offset` | `number` |
| `result?` | `Vector3` |

#### Returns

`Vector3`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:156](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L156)

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

[packages/core/eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L165)

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

[packages/core/eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L48)

___

### intersectPlane

▸ **intersectPlane**(`camera`, `plane`, `result?`): ``null`` \| `Vector3`

获取当前指针从给定相机出发与给定平面的焦点

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `plane` | `Plane` |
| `result?` | `Vector3` |

#### Returns

``null`` \| `Vector3`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:192](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L192)

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

[packages/core/eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L178)

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

[packages/core/eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L155)

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

[packages/core/eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L120)

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

[packages/core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L207)

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

[packages/core/eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L89)

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

[packages/core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L66)

___

### setDom

▸ **setDom**(`dom`): [`PointerManager`](PointerManager.md)

设置当前作用的dom

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | `HTMLElement` |

#### Returns

[`PointerManager`](PointerManager.md)

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:116](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L116)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

EventDispatcher.useful

#### Defined in

[packages/core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L226)
