# Interface: SetDomEvent

[engine](../modules/engine.md).SetDomEvent

设置Dom事件的触发对象接口

**`Example`**

可以将其作为泛型传入Engine的EventDispatcher方法中
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

设置时传入的dom对象

#### Defined in

[engine/index.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L20)

___

### type

• **type**: ``"setDom"``

事件类型

#### Overrides

[BaseEvent](eventDispatcher.BaseEvent.md).[type](eventDispatcher.BaseEvent.md#type)

#### Defined in

[engine/index.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L18)
