# Interface: VisPointerEvent

## Hierarchy

- `Omit`<`PointerEvent`, ``"type"``\>

- `BaseEvent`

  ↳ **`VisPointerEvent`**

## Properties

### AT\_TARGET

• `Readonly` **AT\_TARGET**: `number`

#### Inherited from

Omit.AT\_TARGET

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5221

___

### BUBBLING\_PHASE

• `Readonly` **BUBBLING\_PHASE**: `number`

#### Inherited from

Omit.BUBBLING\_PHASE

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5222

___

### CAPTURING\_PHASE

• `Readonly` **CAPTURING\_PHASE**: `number`

#### Inherited from

Omit.CAPTURING\_PHASE

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5223

___

### NONE

• `Readonly` **NONE**: `number`

#### Inherited from

Omit.NONE

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5224

___

### altKey

• `Readonly` **altKey**: `boolean`

#### Inherited from

Omit.altKey

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9847

___

### bubbles

• `Readonly` **bubbles**: `boolean`

Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.

#### Inherited from

Omit.bubbles

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5186

___

### button

• `Readonly` **button**: `number`

#### Inherited from

Omit.button

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9848

___

### buttons

• `Readonly` **buttons**: `number`

#### Inherited from

Omit.buttons

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9849

___

### cancelBubble

• **cancelBubble**: `boolean`

**`Deprecated`**

#### Inherited from

Omit.cancelBubble

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5188

___

### cancelable

• `Readonly` **cancelable**: `boolean`

Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.

#### Inherited from

Omit.cancelable

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5190

___

### clientX

• `Readonly` **clientX**: `number`

#### Inherited from

Omit.clientX

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9850

___

### clientY

• `Readonly` **clientY**: `number`

#### Inherited from

Omit.clientY

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9851

___

### composed

• `Readonly` **composed**: `boolean`

Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.

#### Inherited from

Omit.composed

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5192

___

### ctrlKey

• `Readonly` **ctrlKey**: `boolean`

#### Inherited from

Omit.ctrlKey

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9852

___

### currentTarget

• `Readonly` **currentTarget**: ``null`` \| `EventTarget`

Returns the object whose event listener's callback is currently being invoked.

#### Inherited from

Omit.currentTarget

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5194

___

### defaultPrevented

• `Readonly` **defaultPrevented**: `boolean`

Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.

#### Inherited from

Omit.defaultPrevented

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5196

___

### detail

• `Readonly` **detail**: `number`

#### Inherited from

Omit.detail

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:14485

___

### eventPhase

• `Readonly` **eventPhase**: `number`

Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE.

#### Inherited from

Omit.eventPhase

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5198

___

### height

• `Readonly` **height**: `number`

#### Inherited from

Omit.height

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11011

___

### isPrimary

• `Readonly` **isPrimary**: `boolean`

#### Inherited from

Omit.isPrimary

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11012

___

### isTrusted

• `Readonly` **isTrusted**: `boolean`

Returns true if event was dispatched by the user agent, and false otherwise.

#### Inherited from

Omit.isTrusted

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5200

___

### metaKey

• `Readonly` **metaKey**: `boolean`

#### Inherited from

Omit.metaKey

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9853

___

### mouse

• **mouse**: `Vector2`

#### Defined in

[packages/plugins/PointerManager/PointerManager.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/PointerManager/PointerManager.ts#L14)

___

### movementX

• `Readonly` **movementX**: `number`

#### Inherited from

Omit.movementX

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9854

___

### movementY

• `Readonly` **movementY**: `number`

#### Inherited from

Omit.movementY

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9855

___

### offsetX

• `Readonly` **offsetX**: `number`

#### Inherited from

Omit.offsetX

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9856

___

### offsetY

• `Readonly` **offsetY**: `number`

#### Inherited from

Omit.offsetY

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9857

___

### pageX

• `Readonly` **pageX**: `number`

#### Inherited from

Omit.pageX

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9858

___

### pageY

• `Readonly` **pageY**: `number`

#### Inherited from

Omit.pageY

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9859

___

### pointerId

• `Readonly` **pointerId**: `number`

#### Inherited from

Omit.pointerId

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11013

___

### pointerType

• `Readonly` **pointerType**: `string`

#### Inherited from

Omit.pointerType

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11014

___

### pressure

• `Readonly` **pressure**: `number`

#### Inherited from

Omit.pressure

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11015

___

### relatedTarget

• `Readonly` **relatedTarget**: ``null`` \| `EventTarget`

#### Inherited from

Omit.relatedTarget

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9860

___

### returnValue

• **returnValue**: `boolean`

**`Deprecated`**

#### Inherited from

Omit.returnValue

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5202

___

### screenX

• `Readonly` **screenX**: `number`

#### Inherited from

Omit.screenX

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9861

___

### screenY

• `Readonly` **screenY**: `number`

#### Inherited from

Omit.screenY

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9862

___

### shiftKey

• `Readonly` **shiftKey**: `boolean`

#### Inherited from

Omit.shiftKey

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9863

___

### srcElement

• `Readonly` **srcElement**: ``null`` \| `EventTarget`

**`Deprecated`**

#### Inherited from

Omit.srcElement

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5204

___

### tangentialPressure

• `Readonly` **tangentialPressure**: `number`

#### Inherited from

Omit.tangentialPressure

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11016

___

### target

• `Readonly` **target**: ``null`` \| `EventTarget`

Returns the object to which event is dispatched (its target).

#### Inherited from

Omit.target

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5206

___

### tiltX

• `Readonly` **tiltX**: `number`

#### Inherited from

Omit.tiltX

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11017

___

### tiltY

• `Readonly` **tiltY**: `number`

#### Inherited from

Omit.tiltY

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11018

___

### timeStamp

• `Readonly` **timeStamp**: `number`

Returns the event's timestamp as the number of milliseconds measured relative to the time origin.

#### Inherited from

Omit.timeStamp

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5208

___

### twist

• `Readonly` **twist**: `number`

#### Inherited from

Omit.twist

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11019

___

### type

• **type**: `string`

#### Inherited from

BaseEvent.type

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/EventDispatcher.d.ts:2

___

### view

• `Readonly` **view**: ``null`` \| `Window`

#### Inherited from

Omit.view

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:14486

___

### which

• `Readonly` **which**: `number`

**`Deprecated`**

#### Inherited from

Omit.which

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:14488

___

### width

• `Readonly` **width**: `number`

#### Inherited from

Omit.width

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11020

___

### x

• `Readonly` **x**: `number`

#### Inherited from

Omit.x

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9864

___

### y

• `Readonly` **y**: `number`

#### Inherited from

Omit.y

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9865

## Methods

### composedPath

▸ **composedPath**(): `EventTarget`[]

Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.

#### Returns

`EventTarget`[]

#### Inherited from

Omit.composedPath

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5212

___

### getCoalescedEvents

▸ **getCoalescedEvents**(): `PointerEvent`[]

Available only in secure contexts.

#### Returns

`PointerEvent`[]

#### Inherited from

Omit.getCoalescedEvents

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11022

___

### getModifierState

▸ **getModifierState**(`keyArg`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyArg` | `string` |

#### Returns

`boolean`

#### Inherited from

Omit.getModifierState

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9866

___

### getPredictedEvents

▸ **getPredictedEvents**(): `PointerEvent`[]

#### Returns

`PointerEvent`[]

#### Inherited from

Omit.getPredictedEvents

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:11023

___

### initEvent

▸ **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `bubbles?` | `boolean` |
| `cancelable?` | `boolean` |

#### Returns

`void`

#### Inherited from

Omit.initEvent

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5214

___

### initMouseEvent

▸ **initMouseEvent**(`typeArg`, `canBubbleArg`, `cancelableArg`, `viewArg`, `detailArg`, `screenXArg`, `screenYArg`, `clientXArg`, `clientYArg`, `ctrlKeyArg`, `altKeyArg`, `shiftKeyArg`, `metaKeyArg`, `buttonArg`, `relatedTargetArg`): `void`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeArg` | `string` |
| `canBubbleArg` | `boolean` |
| `cancelableArg` | `boolean` |
| `viewArg` | `Window` |
| `detailArg` | `number` |
| `screenXArg` | `number` |
| `screenYArg` | `number` |
| `clientXArg` | `number` |
| `clientYArg` | `number` |
| `ctrlKeyArg` | `boolean` |
| `altKeyArg` | `boolean` |
| `shiftKeyArg` | `boolean` |
| `metaKeyArg` | `boolean` |
| `buttonArg` | `number` |
| `relatedTargetArg` | ``null`` \| `EventTarget` |

#### Returns

`void`

#### Inherited from

Omit.initMouseEvent

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:9868

___

### initUIEvent

▸ **initUIEvent**(`typeArg`, `bubblesArg?`, `cancelableArg?`, `viewArg?`, `detailArg?`): `void`

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeArg` | `string` |
| `bubblesArg?` | `boolean` |
| `cancelableArg?` | `boolean` |
| `viewArg?` | ``null`` \| `Window` |
| `detailArg?` | `number` |

#### Returns

`void`

#### Inherited from

Omit.initUIEvent

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:14490

___

### preventDefault

▸ **preventDefault**(): `void`

If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.

#### Returns

`void`

#### Inherited from

Omit.preventDefault

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5216

___

### stopImmediatePropagation

▸ **stopImmediatePropagation**(): `void`

Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.

#### Returns

`void`

#### Inherited from

Omit.stopImmediatePropagation

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5218

___

### stopPropagation

▸ **stopPropagation**(): `void`

When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.

#### Returns

`void`

#### Inherited from

Omit.stopPropagation

#### Defined in

node_modules/.pnpm/typescript@4.9.5/node_modules/typescript/lib/lib.dom.d.ts:5220
