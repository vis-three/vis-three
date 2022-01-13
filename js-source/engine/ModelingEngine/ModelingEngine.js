import { WebGLRenderer, EventDispatcher, Vector2, WebGLMultisampleRenderTarget, RGBAFormat } from "three";
import { ModelingScene, SCENEDISPLAYMODE, SCENEVIEWPOINT } from "./ModelingScene";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { PointerManager } from "../../plugins/PointerManager";
import { SceneStatusManager } from "../../plugins/SceneStatusManager";
import { VisStats } from "../../optimize/VisStats";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { VisTransformControls } from "../../optimize/VisTransformControls";
import { RenderManager } from "../../manager/RenderManager";
import { POINTERMANAGER, SCENESTATUSMANAGER } from "../../case/constants/EVENTTYPE";
export var MODELINGENGINEEVNET;
(function (MODELINGENGINEEVNET) {
    MODELINGENGINEEVNET["SETCAMERA"] = "setCamera";
    MODELINGENGINEEVNET["SETSIZE"] = "setSize";
})(MODELINGENGINEEVNET || (MODELINGENGINEEVNET = {}));
export class ModelingEngine extends EventDispatcher {
    stats;
    orbitControls;
    transformControls;
    pointerManager;
    sceneStatusManager;
    composer;
    renderer;
    scene;
    renderManager;
    transing; // 是否处于变换控制器状态下
    currentCamera; // 当前正在使用的相机
    constructor(dom) {
        super();
        // 渲染器
        const renderer = new WebGLRenderer({
            antialias: true,
            alpha: true
        });
        // 场景
        const scene = new ModelingScene({
            hasDefaultPerspectiveCamera: true,
            hasDefaultOrthographicCamera: true,
            hasAxesHelper: true,
            hasGridHelper: true,
            hasDisplayMode: true,
            displayMode: SCENEDISPLAYMODE.ENV
        });
        const camera = scene.getDefaultPerspectiveCamera();
        const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera();
        const defaultOrthograpbicCamera = scene.getDefaultOrthographicCamera();
        // 性能监视器
        const stats = new VisStats();
        // 轨道控制器
        const orbitControls = new VisOrbitControls(camera, renderer.domElement);
        // 变换控制器
        const transformControls = new VisTransformControls(camera, renderer.domElement);
        this.transing = false;
        // 鼠标管理器
        const pointerManager = new PointerManager(renderer.domElement);
        // 场景状态管理器
        const sceneStatusManager = new SceneStatusManager(camera, scene);
        const hoverObjectSet = sceneStatusManager.getHoverObjectSet();
        const activeObjectSet = sceneStatusManager.getActiveObjectSet();
        sceneStatusManager.filterTransformControls(transformControls);
        const pixelRatio = renderer.getPixelRatio();
        const size = renderer.getDrawingBufferSize(new Vector2());
        const renderTarget = new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
            format: RGBAFormat
        });
        const composer = new EffectComposer(renderer, renderTarget);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);
        // 渲染管理器
        const renderManager = new RenderManager();
        // 视角监听
        scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, e => {
            this.setCamera(defaultPerspectiveCamera);
            orbitControls.enableRotate = true;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, e => {
            this.setCamera(defaultOrthograpbicCamera);
            orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, e => {
            this.setCamera(defaultOrthograpbicCamera);
            orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, e => {
            this.setCamera(defaultOrthograpbicCamera);
            orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, e => {
            this.setCamera(defaultOrthograpbicCamera);
            orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, e => {
            this.setCamera(defaultOrthograpbicCamera);
            orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, e => {
            this.setCamera(defaultOrthograpbicCamera);
            orbitControls.enableRotate = false;
        });
        // 尺寸变化
        this.addEventListener(MODELINGENGINEEVNET.SETSIZE, event => {
            const e = event;
            const width = e.width;
            const height = e.height;
            defaultPerspectiveCamera.aspect = width / height;
            defaultPerspectiveCamera.updateProjectionMatrix();
            defaultOrthograpbicCamera.left = -width / 16;
            defaultOrthograpbicCamera.right = width / 16;
            defaultOrthograpbicCamera.top = height / 16;
            defaultOrthograpbicCamera.bottom = -height / 16;
            defaultOrthograpbicCamera.updateProjectionMatrix();
            renderer.setSize(width, height);
            composer.setSize(width, height);
        });
        // 相机变化
        this.addEventListener(MODELINGENGINEEVNET.SETCAMERA, event => {
            const e = event;
            const camera = e.camera;
            orbitControls.setCamera(camera);
            transformControls.setCamera(camera);
            sceneStatusManager.setCamera(camera);
            renderPass.camera = camera;
            this.currentCamera = camera;
        });
        // 变换事件
        transformControls.addEventListener('mouseDown', () => { this.transing = true; });
        // 鼠标事件
        pointerManager.addEventListener(POINTERMANAGER.POINTERDOWN, (event) => {
            if (event.button === 0 && !this.transing) {
                sceneStatusManager.selectStart(event);
            }
        });
        pointerManager.addEventListener(POINTERMANAGER.POINTERMOVE, (event) => {
            if (!this.transing) {
                if (event.buttons === 1) {
                    sceneStatusManager.selecting(event);
                }
                sceneStatusManager.checkHoverObject(event);
            }
            else {
                scene.setObjectHelperHover();
            }
        });
        pointerManager.addEventListener(POINTERMANAGER.POINTERUP, (event) => {
            if (this.transing) {
                this.transing = false;
                return;
            }
            if (event.button === 0 && !this.transing) {
                sceneStatusManager.checkActiveObject(event);
                sceneStatusManager.selectEnd(event);
            }
        });
        // 场景状态事件
        sceneStatusManager.addEventListener(SCENESTATUSMANAGER.HOVERCHANGE, (event) => {
            scene.setObjectHelperHover(...hoverObjectSet);
        });
        sceneStatusManager.addEventListener(SCENESTATUSMANAGER.ACTIVECHANGE, (event) => {
            scene.setObjectHelperActive(...activeObjectSet);
        });
        // 渲染事件
        renderManager.addEventListener('render', (event) => {
            const e = event;
            composer.render(e.delta);
        });
        this.renderer = renderer;
        this.orbitControls = orbitControls;
        this.transformControls = transformControls;
        this.pointerManager = pointerManager;
        this.sceneStatusManager = sceneStatusManager;
        this.composer = composer;
        this.stats = stats;
        this.scene = scene;
        this.renderManager = renderManager;
        this.currentCamera = camera;
        if (dom) {
            this.setSize(dom.offsetWidth, dom.offsetHeight);
            dom.appendChild(renderer.domElement);
        }
    }
    // 设置变换控制器是否可见
    showTransformControls(visiable) {
        this.transformControls.visible = visiable;
        return this;
    }
    // 设置性能监视器监控是否可见
    showStats(visiable) {
        if (visiable) {
            this.renderManager.addEventListener('render', this.stats.render);
            const targetElement = this.renderer.domElement.parentElement;
            if (targetElement) {
                targetElement.appendChild(this.stats.domElement);
            }
            else {
                console.warn('can not found renderer canvas parent dom');
            }
        }
        else {
            if (this.renderManager.hasEventListener('render', this.stats.render)) {
                this.renderManager.removeEventListener('render', this.stats.render);
            }
            const targetElement = this.renderer.domElement.parentElement;
            if (targetElement) {
                try {
                    targetElement.removeChild(this.stats.domElement);
                }
                catch (error) {
                }
            }
        }
        return this;
    }
    // 获取场景状态管理器
    getSceneStatusManager() {
        return this.sceneStatusManager;
    }
    // 获取变换控制器
    getTransformControls() {
        return this.transformControls;
    }
    // 获取渲染器
    getRenderer() {
        return this.renderer;
    }
    // 获取场景
    getScene() {
        return this.scene;
    }
    // 获取当前渲染相机
    getCurrentCamera() {
        return this.currentCamera;
    }
    // 获取引擎渲染管理器
    getRenderManager() {
        return this.renderManager;
    }
    // 获取指针管理器
    getPointerManager() {
        return this.pointerManager;
    }
    // 设置相机
    setCamera(camera) {
        this.dispatchEvent({
            type: 'setCamera',
            camera
        });
        return this;
    }
    // 设置窗口尺寸
    setSize(width, height) {
        if (width <= 0 || height <= 0) {
            console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
            return this;
        }
        this.dispatchEvent({ type: 'setSize', width, height });
        return this;
    }
    // 渲染
    render() {
        this.renderManager.render();
    }
    // 播放
    play() {
        this.renderManager.play();
    }
    // 停止
    stop() {
        this.renderManager.stop();
    }
    // 添加渲染 TODO: 
    addRender() {
        return this;
    }
    // 清空缓存
    dispose() {
        this.renderer.clear();
        this.renderer.dispose();
        // TODO: scene dispose
    }
}
//# sourceMappingURL=ModelingEngine.js.map