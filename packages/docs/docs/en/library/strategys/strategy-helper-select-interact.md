# @vis-three/strategy-helper-select-interact

Object Helper Interaction Strategy for Mouse Selection.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/strategy-helper-select-interact">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/strategy-helper-select-interact?color=blue">

## Strategy Name

`HelperSelectInteractStrategy`

## Strategy Dependencies

- @vis-three/plugin-grid-helper
- @vis-three/plugin-viewpoint

## Strategy Parameters

```ts
export interface HelperSelectInteractParameters {
  /** Whether to interact with the helper */
  interact?: boolean;
  /** Color when active */
  activeColor?: string;
  /** Color on mouse hover */
  hoverColor?: string;
  /** Default color of the helper */
  defaultColor?: string;
  /** Color when selected */
  selectedColor?: string;
}
```
