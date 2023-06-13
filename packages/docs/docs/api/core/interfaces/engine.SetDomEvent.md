# Interface: SetDomEvent

[engine](../modules/engine.md).SetDomEvent

设置Dom事件的触发对象

**`Example`**

可以将其作为泛型传入EventDispatcher方法中
```ts
eventDispatcher.addEventListener<SetDomEvent>('setDom', (event) => {
 console.log(event.dom);
})
```

## Hierarchy

- [`BaseEvent`](eventDispatcher.BaseEvent.md)

  ↳ **`SetDomEvent`**

## Table of contents

### Properties

- [dom](engine.SetDomEvent.md#dom)
- [type](engine.SetDomEvent.md#type)

## Properties

### dom

• **dom**: `HTMLElement`

设置时传入的dom对象

#### Defined in

[engine/index.ts:25](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L25)

___

### type

• **type**: ``"setDom"``

事件类型

#### Overrides

[BaseEvent](eventDispatcher.BaseEvent.md).[type](eventDispatcher.BaseEvent.md#type)

#### Defined in

[engine/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L23)
