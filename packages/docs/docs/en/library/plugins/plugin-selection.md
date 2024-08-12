# @vis-three/plugin-selection

Selection Plugin.

A unified dispatch handling entry for selecting scene objects.

- This plugin will emit a `selected` event through the `engine`.

```ts
engine.install(SelectionPlugin());

engine.addEventListener("selected", (event) => {
  console.log(event.objects);
});
```

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-selection">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-selection?color=blue">

## Plugin Name

`SelectionPlugin`

:::tip
You can use the enumeration: `SELECTION_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

None

## Engine Extensions


```ts
export interface SelectionEngine extends Engine {
    /** Collection of selected objects in the current engine */
    selectionBox: Set<Object3D>;
    /** Set the selected objects in the current engine */
    setSelectionBox: (objects: Object3D[]) => SelectionEngine;
}
```

:::tip
If you want to set the selected objects in the current `engine` via script, use `setSelectionBox`, as it will internally trigger the `selected` event of the `engine`.
:::