import { 
  Camera,
  Scene,
  WebGLRenderer,
  Object3D,
  EventDispatcher,
  Vector2,
  WebGLMultisampleRenderTarget,
  RGBAFormat,
  BaseEvent
} from "three"

import { ModelingScene, ModelingSceneDisplayMode, ModelingSceneViewpoint } from "./ModelingScene";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { PointerManager, VisPointerEvent } from "../../plugins/PointerManager"
import { SceneStatusManager } from "../../plugins/SceneStatusManager"

import { VisStats } from "../../optimize/VisStats"
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { VisTransformControls } from "../../optimize/VisTransformControls";
import { RenderEvent, RenderManager } from "../../manager/RenderManager";





// 相机事件
export interface SetCameraEvent extends BaseEvent {
  camera: Camera
}

// 改变窗口事件
export interface SetSizeEvent extends BaseEvent {
  width: number
  height: number
}

export class ModelingEngine extends EventDispatcher<SetCameraEvent | SetSizeEvent> {

  protected stats: VisStats
  protected orbitControls: VisOrbitControls
  protected transformControls: VisTransformControls
  protected pointerManager: PointerManager
  protected sceneStatusManager: SceneStatusManager
  protected composer: EffectComposer
  protected renderer: WebGLRenderer
  protected scene: Scene
  protected renderManager: RenderManager

  protected hoverObjectSet: Set<Object3D>
  protected activeObjectSet: Set<Object3D>

  private transing: boolean

  constructor (dom?: HTMLElement) {
    super()
    // 渲染器
    const renderer: WebGLRenderer = new WebGLRenderer({ 
      antialias: true,
      alpha: true
    })

    // 场景
    const scene: ModelingScene = new ModelingScene({
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: ModelingSceneDisplayMode.ENV
    })

    const camera = scene.getDefaultPerspectiveCamera!()!
    const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera!()!
    const defaultOrthograpbicCamera = scene.getDefaultOrthographicCamera!()!

    // 性能监视器
    const stats = new VisStats()

    // 轨道控制器
    const orbitControls = new VisOrbitControls(camera, renderer.domElement)

    // 变换控制器
    const transformControls = new VisTransformControls(camera, renderer.domElement)
    this.transing = false

    // 鼠标管理器
    const pointerManager = new PointerManager(renderer.domElement)

    // 场景状态管理器
    const sceneStatusManager = new SceneStatusManager(camera, scene)
    const hoverObjectSet: Set<Object3D> = sceneStatusManager.getHoverObjectSet()
    const activeObjectSet: Set<Object3D> = sceneStatusManager.getActiveObjectSet()
    
    sceneStatusManager.filterTransformControls(transformControls)

    const pixelRatio = renderer.getPixelRatio()
    const size = renderer.getDrawingBufferSize(new Vector2())
    const renderTarget = new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
      format: RGBAFormat
    })
    const composer = new EffectComposer(renderer, renderTarget)

    const renderPass = new RenderPass(scene, camera)

    composer.addPass(renderPass)

    // 渲染管理器
    const renderManager = new RenderManager()

    // 视角监听
    scene.addEventListener(`${ModelingSceneViewpoint.DEFAULT}ViewPoint`, e => {
      this.setCamera(defaultPerspectiveCamera)
      orbitControls.enableRotate = true
    })
    scene.addEventListener(`${ModelingSceneViewpoint.TOP}ViewPoint`, e => {
      this.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${ModelingSceneViewpoint.BOTTOM}ViewPoint`, e => {
      this.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${ModelingSceneViewpoint.RIGHT}ViewPoint`, e => {
      this.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${ModelingSceneViewpoint.LEFT}ViewPoint`, e => {
      this.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${ModelingSceneViewpoint.FRONT}ViewPoint`, e => {
      this.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${ModelingSceneViewpoint.BACK}ViewPoint`, e => {
      this.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })

    // 尺寸变化
    this.addEventListener('setSize', event => {
      const e = event as SetSizeEvent
      const width = e.width
      const height = e.height
      defaultPerspectiveCamera.aspect = width / height
      defaultPerspectiveCamera.updateProjectionMatrix()

      defaultOrthograpbicCamera.left = -width / 16
      defaultOrthograpbicCamera.right = width / 16
      defaultOrthograpbicCamera.top = height / 16
      defaultOrthograpbicCamera.bottom = -height / 16
      defaultOrthograpbicCamera.updateProjectionMatrix()

      renderer.setSize(width, height)
      composer.setSize(width, height)
    })

    // 相机变化
    this.addEventListener('setCamera', event => {
      const e = event as SetCameraEvent
      const camera = e.camera
      orbitControls.setCamera(camera)
      transformControls.setCamera(camera)
      sceneStatusManager.setCamera(camera)
      renderPass.camera = camera
    })

    // 变换事件
    transformControls.addEventListener('mouseDown', () => { this.transing = true })

    // 鼠标事件
    pointerManager.addEventListener<VisPointerEvent>('pointerdown', (event) => {
      if (event.button === 0 && !this.transing) {
        sceneStatusManager.selectStart(event)
      }
    })
    pointerManager.addEventListener<VisPointerEvent>('pointermove', (event: VisPointerEvent) => {
      if (!this.transing) {
        if (event.buttons === 1) {
          sceneStatusManager.selecting(event)
        }
        sceneStatusManager.checkHoverObject(event)
        scene.setObjectHelperHover(...hoverObjectSet)

        if (hoverObjectSet.size) {
          hoverObjectSet.forEach(object => {
            object.dispatchEvent({
              type: 'hover'
            })
          })
        }
      } else {
        scene.setObjectHelperHover()
      }
    })
    pointerManager.addEventListener<VisPointerEvent>('pointerup', (event: VisPointerEvent) => {
      if (this.transing) {
        this.transing = false
        return
      }

      if (event.button === 0 && !this.transing) {
        sceneStatusManager.checkActiveObject(event)
        sceneStatusManager.selectEnd(event)
        scene.setObjectHelperActive(...activeObjectSet)
        if (activeObjectSet.size) {
          scene._add(transformControls.getTarget())
          scene._add(transformControls)
          transformControls.setAttach(...activeObjectSet)
          activeObjectSet.forEach(object => {
            object.dispatchEvent({
              type: 'active'
            })
          })
        } else {
          scene._remove(transformControls.getTarget())
          scene._remove(transformControls)
        }
        
      }
    })

    // 渲染事件
    renderManager.addEventListener('render', (event) => {
      const e = event as RenderEvent
      composer.render(e.delta)
    })  

    this.renderer = renderer
    this.orbitControls = orbitControls
    this.transformControls = transformControls
    this.pointerManager = pointerManager
    this.sceneStatusManager = sceneStatusManager
    this.composer = composer
    this.stats = stats
    this.scene = scene
    this.renderManager = renderManager

    this.hoverObjectSet = hoverObjectSet
    this.activeObjectSet = activeObjectSet

    if (dom) {
      this.setSize(dom.offsetWidth, dom.offsetHeight)
      dom.appendChild(renderer.domElement)

    }
  }
  
  // 获取渲染器
  getRenderer(): WebGLRenderer {
    return this.renderer
  }

  // 获取场景
  getScene (): Scene {
    return this.scene
  }

  // 设置相机
  setCamera (camera: Camera): this {
    this.dispatchEvent({
      type: 'setCamera',
      camera
    })
    return this
  }

   // 设置窗口尺寸
  setSize (width: number, height: number): this {
    if(width <= 0 || height <= 0) {
      console.error(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`)
      return this
    }
    this.dispatchEvent({type: 'setSize', width, height})
    return this
  }

  // 渲染
  render (): void {
    this.renderManager.render()
  }

  // 播放
  play (): void {
    this.renderManager.play()
  }

  // 停止
  stop (): void {
    this.renderManager.stop()
  }

  // 添加渲染 TODO: 
  addRender (): this {
    return this
  }

  // 清空缓存
  dispose (): void {
    this.renderer.clear()
    this.renderer.dispose()
    // TODO: scene dispose
  }
}