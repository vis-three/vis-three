import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Engine } from "../engine/Engine";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { Plugin } from "./plugin";
import { SetCameraEvent } from "./WebGLRendererPlugin";


export const OrbitControlsPlugin: Plugin<Object> = function (engine: Engine) {
  console.log(1)
  if (engine.orbitControls) {
    console.warn('engine has installed orbitControls plugin.')
    return
  }

  if (!engine.webGLRenderer) {
    console.warn('engine must install renderer before install orbitControls plugin.')
    return
  }

  if (!engine.renderManager) {
    console.warn('engine must install renderManager before install orbitControls plugin.')
    return
  }

  engine.orbitControls = new VisOrbitControls(engine.currentCamera!, engine.dom!)

  engine.addEventListener<SetCameraEvent>('setCamera', (event) => {
    (engine.orbitControls as VisOrbitControls).setCamera(event.camera)
  })
  
  engine.renderManager!.addEventListener('render', () => {
    engine.orbitControls!.update()
  })
}