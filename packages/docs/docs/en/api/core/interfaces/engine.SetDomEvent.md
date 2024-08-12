# Interface: SetDomEvent

[engine](../modules/engine.md).SetDomEvent

Set DOM Event Target Interface

**`Example`**

This can be passed as a generic type to the EventDispatcher method of the Engine.

```ts
engine.addEventListener<SetDomEvent>('setDom', (event) => {
 console.log(event.dom);
})
```

## Hierarchy

- [`BaseEvent`](eventDispatcher.BaseEvent.md)

  ↳ **`SetDomEvent`**

## Properties

### dom

• **dom**: `HTMLElement`

DOM Object Passed During Setup

#### Defined in

[engine/index.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L20)

___

### type

• **type**: ``"setDom"``

Event Type

#### Overrides

[BaseEvent](eventDispatcher.BaseEvent.md).[type](eventDispatcher.BaseEvent.md#type)

#### Defined in

[engine/index.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L18)
