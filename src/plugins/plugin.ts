export interface Plugin<O extends Object> {
  (params: O): void
}

export { WebGLRendererPlugin } from './WebGLRendererPlugin'
export { ScenePlugin } from './ScenePlugin'
export { ModelingScenePlugin } from './ModelingScenePlugin'