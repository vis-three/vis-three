
import { Engine } from "../engine/Engine";

export interface Plugin<O extends Object> {
  (engine: Engine, params: O): void
}

export { WebGLRendererPlugin } from './WebGLRendererPlugin'
export { ScenePlugin } from './ScenePlugin'
export { ModelingScenePlugin } from './ModelingScenePlugin'