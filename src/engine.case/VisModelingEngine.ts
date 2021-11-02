import { 
  WebGLRenderer,
  Vector2,
  WebGLMultisampleRenderTarget,
  RGBAFormat,
  Color
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { VisEngine, VisEngineSetCameraEvent, VisEngineSetSizeEvent, VisRenderFun } from "../visCore/VisEngine";
import { VisPointerEvent, VisPointerManager } from "../visPlugins/VisMouseManager";
import { VisOrbitControls } from "../visPlugins/VisOrbitControls";
import { VisSceneObjectStatusManager } from "../visPlugins/VisSceneObjectStatusManager";
import { VisStats } from "../visPlugins/VisStats";
import { VisTransformControls } from "../visPlugins/VisTransformControls";
import { VisScene, VisSceneViewpoint } from "../visCore/VisScene";
//@ts-ignore
import { OutlinePass } from '../visFix/OutlinePass'
import { VisObject3D } from "../visObject/VisObject";

export class VisModelingEngine {

  private visEngine: VisEngine
  private stats: VisStats
  private orbitControls: VisOrbitControls
  private transformControls: VisTransformControls
  private pointerManager: VisPointerManager
  private sceneObjectStatusManager: VisSceneObjectStatusManager
  private composer: EffectComposer
  private renderFun: VisRenderFun

  private hoverObjectSet: Set<VisObject3D>
  private activeObjectSet: Set<VisObject3D>

  constructor (dom?: HTMLElement) {

    // 渲染器
    const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true })
    const rendererCanvas: HTMLCanvasElement = renderer.domElement
    // 场景
    const scene: VisScene = new VisScene({
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: 0
    })
    const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera!()!
    const defaultOrthograpbicCamera = scene.getDefaultOrthographicCamera!()!

    // 渲染引擎
    const visEngine = new VisEngine({
      renderer,
      scene,
      camera: defaultPerspectiveCamera
    })

    const camera = visEngine.getCamera()
    
    // stats
    this.stats = new VisStats()

    // 轨道控制器
    const orbitControls = new VisOrbitControls(camera, renderer.domElement)

    // 变换控制器
    const transformControls = new VisTransformControls(camera, renderer.domElement)

    // 鼠标管理器
    const pointerManager = new VisPointerManager(renderer.domElement)

    // 场景状态管理器
    const sceneObjectStatusManager = new VisSceneObjectStatusManager(renderer.domElement, camera, scene)
    const hoverObjectSet: Set<VisObject3D> = sceneObjectStatusManager.getHoverObjectSet()
    const activeObjectSet: Set<VisObject3D> = sceneObjectStatusManager.getActiveObjectSet()

    // 后期管理器
    const pixelRatio = renderer.getPixelRatio()
    const size = renderer.getDrawingBufferSize(new Vector2())
    const renderTarget = new WebGLMultisampleRenderTarget(size.width, size.height, {
      format: RGBAFormat
    })
    const composer = new EffectComposer(renderer, renderTarget)

    const renderPass = new RenderPass(scene, camera)
    const hoverOutlinePass = new OutlinePass (
      new Vector2(rendererCanvas.offsetWidth * pixelRatio, rendererCanvas.offsetHeight * pixelRatio),
      scene,
      camera
    )
    hoverOutlinePass.pulsePeriod = 0
    hoverOutlinePass.edgeStrength = 5
    hoverOutlinePass.edgeThickness = 1
    hoverOutlinePass.visibleEdgeColor = new Color('rgb(255, 158, 240)')
    hoverOutlinePass.hiddenEdgeColor = new Color('rgb(255, 158, 240)')

    const activeOutlinePass = new OutlinePass(
      new Vector2(rendererCanvas.offsetWidth * pixelRatio, rendererCanvas.offsetHeight * pixelRatio),
      scene,
      camera
    )
    activeOutlinePass.pulsePeriod = 0
    activeOutlinePass.edgeStrength = 5
    activeOutlinePass.edgeThickness = 1
    activeOutlinePass.visibleEdgeColor = new Color('rgb(230, 20, 240)')
    activeOutlinePass.hiddenEdgeColor = new Color('rgb(230, 20, 240)')

    composer.addPass(renderPass)
    composer.addPass(hoverOutlinePass)
    composer.addPass(activeOutlinePass)

    // 视角监听
    scene.addEventListener(`${VisSceneViewpoint.DEFAULT}ViewPoint`, e => {
      visEngine.setCamera(defaultPerspectiveCamera)
      orbitControls.enableRotate = true
    })
    scene.addEventListener(`${VisSceneViewpoint.TOP}ViewPoint`, e => {
      visEngine.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${VisSceneViewpoint.BOTTOM}ViewPoint`, e => {
      this.visEngine.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${VisSceneViewpoint.RIGHT}ViewPoint`, e => {
      this.visEngine.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${VisSceneViewpoint.LEFT}ViewPoint`, e => {
      this.visEngine.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${VisSceneViewpoint.FRONT}ViewPoint`, e => {
      this.visEngine.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })
    scene.addEventListener(`${VisSceneViewpoint.BACK}ViewPoint`, e => {
      this.visEngine.setCamera(defaultOrthograpbicCamera)
      orbitControls.enableRotate = false
    })

    // 尺寸变化
    visEngine.addEventListener('setSize', event => {
      const e = event as VisEngineSetSizeEvent
      scene.getDefaultPerspectiveCamera!()!.setSize(e.width, e.height)
      scene.getDefaultOrthographicCamera!()!.setSize(e.width, e.height)
      composer.setSize(e.width, e.height)
    })

    // 相机变化
    visEngine.addEventListener('setCamera', event => {
      const e = event as VisEngineSetCameraEvent
      orbitControls.setCamera(e.camera)
      transformControls.setCamera(e.camera)
      sceneObjectStatusManager.setCamera(e.camera)
      renderPass.camera = e.camera
      hoverOutlinePass.renderCamera = e.camera
      activeOutlinePass.renderCamera = e.camera
    })

    // 鼠标事件
    pointerManager.addEventListener('pointerdown', (event: VisPointerEvent) => {
      if (event.button === 0) {
        sceneObjectStatusManager.selectStart(event)
      }
    })
    pointerManager.addEventListener('pointermove', (event: VisPointerEvent) => {
      if (event.button === 0) {
        sceneObjectStatusManager.selecting(event)
      }
      sceneObjectStatusManager.checkHoverObject(event)
      activeObjectSet.forEach(object => {
        if (hoverObjectSet.has(object)) {
          hoverObjectSet.delete(object)
        }
      })
      hoverOutlinePass.selectedObjects = Array.from(hoverObjectSet)
    })
    pointerManager.addEventListener('pointerup', (event: VisPointerEvent) => {
      if (event.button === 0) {
        sceneObjectStatusManager.selectEnd(event)
        sceneObjectStatusManager.checkActiveObject(event)
        activeOutlinePass.selectedObjects = Array.from(activeObjectSet)
      }
    })

    this.visEngine = visEngine
    this.orbitControls = orbitControls
    this.transformControls = transformControls
    this.pointerManager = pointerManager
    this.sceneObjectStatusManager = sceneObjectStatusManager
    this.composer = composer
    this.hoverObjectSet = hoverObjectSet
    this.activeObjectSet = activeObjectSet

    this.renderFun = (delta: number) => { composer.render(delta) }

    if (dom) {
      dom.appendChild(rendererCanvas)
      this.visEngine.setSize(dom.offsetWidth, dom.offsetHeight)
    }
  }

  // 渲染
  render (): void {
    VisEngine.addRenderFun(this.renderFun)
  }

  // 停止
  stop (): void {
    if (VisEngine.hasVisRenderFun(this.renderFun)) {
      VisEngine.removeRenderFun(this.renderFun)
    }
    
  }

  // 获取引擎
  getEngine (): VisEngine {
    return this.visEngine
  }

  getScene (): VisScene {
    return this.visEngine.getScene()
  }

  setSize (width: number, height: number): this {
    this.visEngine.setSize(width, height)
    return this
  }

  // 设置性能监视器
  setStats (show: boolean): this {
    if (show) {
      VisEngine.addRenderFun(this.stats.renderFun)
      this.visEngine.getRenderCanvas().appendChild(this.stats.domElement)
    } else {
      if (VisEngine.hasVisRenderFun(this.stats.renderFun)) {
        VisEngine.removeRenderFun(this.stats.renderFun)
      }

      try {
        this.visEngine.getRenderCanvas().removeChild(this.stats.domElement)
      } catch (error) {
        
      }
      
    }
    return this
  }

  // 设置hover的物体
  setHoverObjectSet (list: Array<VisObject3D>): this {
    list.forEach(object => {
      this.hoverObjectSet.add(object)
    })
    return this
  }

  // 设置active的物体
  setActiveObjectSet (list: Array<VisObject3D>): this {
    list.forEach(object => {
      this.activeObjectSet.add(object)
    })
    return this
  }
}