import {
  Scene,
  Object3D,
  Camera,
  Light,
  Mesh,
  Line,
  Points,
  Sprite,
  AxesHelper,
  GridHelper,
  Material,
  BufferAttribute,
  MeshLambertMaterial,
  LineBasicMaterial,
  PointsMaterial,
  SpriteMaterial,
  AmbientLight,
  DirectionalLight,
  Texture,
  BoxBufferGeometry,
  MeshStandardMaterial,
  SphereBufferGeometry
} from 'three'


import { validate } from 'uuid'
import VisHelper from '../visObject/visHelper/VisHelper'
import { VisPerspectiveCamera } from '../visObject/visCamera/VisPerspectiveCamera'
import { VisOrthographicCamera } from '../visObject/visCamera/VisOrthographicCamera'
import { VisCamera } from '../visObject/visCamera/VisCamera'
import { VisEngine } from './VisEngine'
import { VisLight } from '../visObject/VisLight'
import { VisMesh } from '../visObject/VisMesh'
import { VisLine } from '../visObject/VisLine'
import { VisPoints } from '../visObject/VisPoints'
import { VisSprite } from '../visObject/VisSprite'
import { VisObject3D } from '../visObject/VisObject'
import { VisPointLight } from '../visObject/visLight/VisPointLight'

// 默认相机枚举
export enum VisSceneCameraDefalutType {
  DefaultPerspectiveCamera = 'DefaultPerspectiveCamera',
  DefaultOrthograpbicCamera = 'DefaultOrthograpbicCamera'
}

// 默认视角枚举
export enum VisSceneViewpoint {
  DEFAULT = 'default',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT ='right',
  FRONT = 'front',
  BACK ='back'
}

// 默认展示枚举
export enum VisSceneDisplayMode {
  GEOMETRY = 0,
  MATERIAL = 1,
  LIGHT = 2,
  ENV = 3
}

// 场景物体渲染顺序枚举
export enum VisSceneRenderOrder {
  GRIDHELPER = -200,
  AXESHELPER = -199
}

// vis场景的构造参数
export interface VisSceneParameters {
  hasDefaultPerspectiveCamera?: boolean // 是否需要默认的透视相机
  hasDefaultOrthographicCamera?: boolean // 是否需要默认的正交相机
  hasAxesHelper?: boolean // 是否需要坐标轴辅助
  hasGridHelper?: boolean // 是否需要网格辅助
  hasDisplayMode?: boolean // 是否需要渲染模式

  displayMode?: VisSceneDisplayMode //渲染mode

  defaultPerspectiveCameraSetting?: { // 透视相机初始配置
    fov: number,
    aspect: number,
    near: number,
    far: number
  }

  defaultOrthographicCameraSetting?: { // 正交相机设置
    left: number,
    right: number,
    top: number,
    bottom: number,
    near: number,
    far: number
  }
}

// 坐标轴设置接口
export interface VisAxesHelperSetting {
  size?: number
  visiable?: boolean
}

// 网格辅助接口
export interface VisGridHelperSetting {
  size?: number
  division?: number
  axesColor?: number
  meshColor?: number
  rotation?: {
    x: number,
    y: number,
    z: number
  }
}

// vis场景对象
export class VisScene extends Scene {

  private cameraMap: Map<string, VisCamera>
  private lightMap: Map<string, VisLight>
  private meshMap: Map<string, VisMesh>
  private lineMap: Map<string, VisLine>
  private pointsMap: Map<string, VisPoints>
  private spriteMap: Map<string, VisSprite>

  private displayMode?: VisSceneDisplayMode // 展示mode
  private meshOverrideMaterial?: MeshLambertMaterial
  private lineOverrideMaterial?: LineBasicMaterial
  private pointsOverrideMaterial?: PointsMaterial
  private spriteOverrideMaterial?: SpriteMaterial

  private materialCacheMap?: WeakMap<VisObject3D, Material | Material[]>

  private defaultAmbientLight?: AmbientLight
  private defaultDirectionalLight?: DirectionalLight
  
  private backgroundCache?: Texture
  private environmentCache?: Texture
  
  private defaultCamera?: VisPerspectiveCamera // 最基础的默认相机，当场景没有指定相机的时候创建
  private defaultPerspectiveCamera?: VisPerspectiveCamera  // 默认透视相机
  private defaultOrthograpbicCamera?: VisOrthographicCamera // 默认正交相机
  
  private axesHelper?: AxesHelper // 坐标轴辅助
  private gridHelper?: GridHelper // 网格辅助

  private showAxesHelper?: (show: boolean) => void // 是否展示坐标轴辅助
  private showGridHelper?: (show: boolean) => void // 是否展示网格辅助
  public getDefaultPerspectiveCamera?: () => VisPerspectiveCamera // 获取默认的透视相机
  public getDefaultOrthographicCamera?: () => VisOrthographicCamera // 获取默认正交相机
  public setAxesHelper?: (setting: VisAxesHelperSetting) => void // 设置坐标轴辅助
  public setGridHelper?: (setting: VisGridHelperSetting) => void // 设置网格辅助
  public setDispalyMode?: (mode: VisSceneDisplayMode) => void // 设置场景的渲染模式

  constructor (config: VisSceneParameters) {
    super()

    this.cameraMap = new Map()
    this.lightMap = new Map()
    this.meshMap = new Map()
    this.lineMap = new Map()
    this.pointsMap = new Map()
    this.spriteMap = new Map()

   
    
    // 初始化透视相机
    if (config.hasDefaultPerspectiveCamera) {
      if (config.defaultPerspectiveCameraSetting) {
        this.defaultPerspectiveCamera = new VisPerspectiveCamera(
          config.defaultPerspectiveCameraSetting.fov,
          config.defaultPerspectiveCameraSetting.aspect,
          config.defaultPerspectiveCameraSetting.near,
          config.defaultPerspectiveCameraSetting.far
        )
      } else {
        this.defaultPerspectiveCamera = new VisPerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          1,
          1000
        )
      }
      this.defaultPerspectiveCamera.position.set(30, 30, 30)

      this.cameraMap.set(VisSceneCameraDefalutType.DefaultPerspectiveCamera, this.defaultPerspectiveCamera)
      
      // 获取默认透视相机
      this.getDefaultPerspectiveCamera = function (): VisPerspectiveCamera {
        return this.defaultPerspectiveCamera!
      }
    }

    // 初始化正交相机
    if (config.hasDefaultOrthographicCamera) {
      if (config.defaultOrthographicCameraSetting) {
        const setting = config.defaultOrthographicCameraSetting
        this.defaultOrthograpbicCamera = new VisOrthographicCamera(
          setting.left,
          setting.right,
          setting.top,
          setting.bottom,
          setting.near,
          setting.far
        )
      } else {
        const domWidth: number = window.innerWidth / 2
        const domHeight: number = window.innerHeight / 2
        this.defaultOrthograpbicCamera = new VisOrthographicCamera(
          -domWidth / 2,
          domWidth / 2,
          domHeight / 2,
          -domHeight / 2,
          1,
          1000
        )
      }
      this.cameraMap.set(VisSceneCameraDefalutType.DefaultOrthograpbicCamera, this.defaultOrthograpbicCamera)
      
      // 获取默认正交相机
      this.getDefaultOrthographicCamera = function(): VisOrthographicCamera {
        return this.defaultOrthograpbicCamera!
      }
      // 视角监听
      this.addEventListener(`${VisSceneViewpoint.TOP}ViewPoint`, e => {
        this.defaultOrthograpbicCamera!.position.set(0, 100, 0)
      })
      this.addEventListener(`${VisSceneViewpoint.BOTTOM}ViewPoint`, e => {
        this.defaultOrthograpbicCamera!.position.set(0, -100, 0)
      })
      this.addEventListener(`${VisSceneViewpoint.RIGHT}ViewPoint`, e => {
        this.defaultOrthograpbicCamera!.position.set(100, 0, 0)
      })
      this.addEventListener(`${VisSceneViewpoint.LEFT}ViewPoint`, e => {
        this.defaultOrthograpbicCamera!.position.set(-100, 0, 0)
      })
      this.addEventListener(`${VisSceneViewpoint.FRONT}ViewPoint`, e => {
        this.defaultOrthograpbicCamera!.position.set(0, 0, 100)
      })
      this.addEventListener(`${VisSceneViewpoint.BACK}ViewPoint`, e => {
        this.defaultOrthograpbicCamera!.position.set(0, 0, -100)
      })
    }

    // 初始化坐标轴辅助
    if (config.hasAxesHelper) {
      this.axesHelper = new AxesHelper(500)
      this.axesHelper.renderOrder = VisSceneRenderOrder.AXESHELPER
      this.axesHelper.matrixAutoUpdate = false
      this.axesHelper.raycast = () => {}
      super.add(this.axesHelper)
        // 设置坐标轴辅助
      this.setAxesHelper = function (setting: VisAxesHelperSetting): void {
        const axesHelper: AxesHelper = this.axesHelper!

        if (setting.size) {
          const position: BufferAttribute = axesHelper.geometry.getAttribute('position') as BufferAttribute

          // 改变 1， 3， 5索引的x, y, z
          position.setX(setting.size, 1)
          position.setY(setting.size, 3)
          position.setZ(setting.size, 5)

          position.needsUpdate = true
        }

        if (typeof setting.visiable !== undefined) {
          axesHelper.visible = (setting.visiable) as boolean
        }
      }
      // 是否展示坐标轴
      this.showAxesHelper = (show: boolean): void => {
        if (show) {
          super.add(this.axesHelper!)
        } else {
          super.remove(this.axesHelper!)
        }
      }

    }

    // 初始化网格
    if (config.hasGridHelper) {
      const gridHelper = new GridHelper(500, 50, 'rgb(130, 130, 130)', 'rgb(70, 70, 70)')
      const material = gridHelper.material as Material
      material.transparent = true
      material.opacity = 0.5
      material.needsUpdate = true
      gridHelper.renderOrder = VisSceneRenderOrder.GRIDHELPER
      gridHelper.matrixAutoUpdate = false
      gridHelper.raycast = () => {}
      this.gridHelper = gridHelper
      super.add(gridHelper)
      // 视角监听
      this.addEventListener(`${VisSceneViewpoint.DEFAULT}ViewPoint`, e => {
        gridHelper.rotation.set(0, 0, 0)
        gridHelper.updateMatrix()
        gridHelper.updateMatrixWorld()
      })
      this.addEventListener(`${VisSceneViewpoint.TOP}ViewPoint`, e => {
        gridHelper.rotation.set(0, 0, 0)
        gridHelper.updateMatrix()
        gridHelper.updateMatrixWorld()
      })
      this.addEventListener(`${VisSceneViewpoint.BOTTOM}ViewPoint`, e => {
        gridHelper.rotation.set(0, 0, 0)
        gridHelper.updateMatrix()
        gridHelper.updateMatrixWorld()
      })
      this.addEventListener(`${VisSceneViewpoint.RIGHT}ViewPoint`, e => {
        gridHelper.rotation.set(0, 0, Math.PI / 2)
        gridHelper.updateMatrix()
        gridHelper.updateMatrixWorld()
      })
      this.addEventListener(`${VisSceneViewpoint.LEFT}ViewPoint`, e => {
        gridHelper.rotation.set(0, 0, Math.PI / 2)
        gridHelper.updateMatrix()
        gridHelper.updateMatrixWorld()
      })
      this.addEventListener(`${VisSceneViewpoint.FRONT}ViewPoint`, e => {
        gridHelper.rotation.set(Math.PI / 2, 0, 0)
        gridHelper.updateMatrix()
        gridHelper.updateMatrixWorld()
      })
      this.addEventListener(`${VisSceneViewpoint.BACK}ViewPoint`, e => {
        gridHelper.rotation.set(Math.PI / 2, 0, 0)
        gridHelper.updateMatrix()
        gridHelper.updateMatrixWorld()
      })

      // 是否展示网格
      this.showGridHelper = (show: boolean): void => {
        if (show) {
          super.add(this.gridHelper!)
        } else {
          super.remove(this.gridHelper!)
        }
      }
    }

    // 初始化渲染模式
    if (config.hasDisplayMode) {
      // 场景默认覆盖材质
      const overrideColor = 'rgb(250, 250, 250)'

      this.meshOverrideMaterial = new MeshLambertMaterial({color: overrideColor})
      this.lineOverrideMaterial = new LineBasicMaterial({color: overrideColor})
      this.pointsOverrideMaterial = new PointsMaterial({color: overrideColor, size: 5, sizeAttenuation: false})
      this.spriteOverrideMaterial = new SpriteMaterial({color: overrideColor})

      this.materialCacheMap = new WeakMap()

      this.defaultAmbientLight = new AmbientLight('rgb(255, 255, 255)', 0.5)
      this.defaultAmbientLight.matrixAutoUpdate = false

      this.defaultDirectionalLight = new DirectionalLight('rgb(255, 255, 255)', 0.3)
      this.defaultDirectionalLight.castShadow = false
      this.defaultDirectionalLight.position.set(-100, 100, 100)
      this.defaultDirectionalLight.updateMatrix()
      this.defaultDirectionalLight.updateMatrixWorld()
      this.defaultDirectionalLight.matrixAutoUpdate = false

      this.setDispalyMode = (mode: VisSceneDisplayMode) => {
        // 过滤材质
        const filterMaterial = (): void => {
          const meterialCacheMap = this.materialCacheMap!
          const meshOverrideMaterial = this.meshOverrideMaterial!
          this.meshMap.forEach((mesh, key) => {
            meterialCacheMap.set(mesh, mesh.material)
            mesh.material = meshOverrideMaterial
          })

          const lineOverrideMaterial = this.lineOverrideMaterial!
          this.lineMap.forEach((line, key) => {
            meterialCacheMap.set(line, line.material)
            line.material = lineOverrideMaterial
          })

          const pointsOverrideMaterial = this.pointsOverrideMaterial!
          this.pointsMap.forEach((points, key) => {
            meterialCacheMap.set(points, points.material)
            points.material = pointsOverrideMaterial
          })

          const spriteOverrideMaterial = this.spriteOverrideMaterial!
          this.spriteMap.forEach((sprite, key) => {
            meterialCacheMap.set(sprite, sprite.material)
            sprite.material = spriteOverrideMaterial
          })
        }
        // 还原材质
        const reduceMaterial = (): void => {
          const meterialCacheMap = this.materialCacheMap!
          this.meshMap.forEach((mesh, key) => {
            if (meterialCacheMap.get(mesh)) {
              mesh.material = meterialCacheMap.get(mesh)!
              meterialCacheMap.delete(mesh)
            }
          })
          this.lineMap.forEach((line, key) => {
            if (meterialCacheMap.get(line)) {
              line.material = meterialCacheMap.get(line)!
              meterialCacheMap.delete(line)
            }
          })
          this.pointsMap.forEach((points, key) => {
            if (meterialCacheMap.get(points)) {
              points.material = meterialCacheMap.get(points)!
              meterialCacheMap.delete(points)
            }
          })
          this.spriteMap.forEach((sprite, key) => {
            if (meterialCacheMap.get(sprite)) {
              sprite.material = meterialCacheMap.get(sprite)! as SpriteMaterial
              meterialCacheMap.delete(sprite)
            }
          })
        }
        // 过滤灯光
        const filterLight = (): void => {
          this.lightMap.forEach((light, key) => {
            super.remove(light)
          })
          super.add(this.defaultAmbientLight!)
          super.add(this.defaultDirectionalLight!)
        }
        // 还原灯光
        const reduceLight = (): void => {
          this.lightMap.forEach((light, key) => {
            super.add(light)
          })
          super.remove(this.defaultAmbientLight!)
          super.remove(this.defaultDirectionalLight!)
        }
        // 过滤场景设置
        const filterScene = (): void => {
          if (this.background instanceof Texture) {
            this.backgroundCache = this.background
            this.background = null
          }

          if (this.environment instanceof Texture) {
            this.environmentCache = this.environment
            this.environment = null
          }
        }
        // 还原场景
        const reduceScene = (): void => {
          if (this.backgroundCache) {
            this.background = this.backgroundCache
            this.backgroundCache = undefined
          }

          if (this.environmentCache) {
            this.environment = this.environmentCache
            this.environmentCache = undefined
          }
        }

        if (mode === VisSceneDisplayMode.GEOMETRY) {
          filterMaterial()
          filterScene()
          filterLight()
        } else if (mode === VisSceneDisplayMode.MATERIAL) {
          reduceMaterial()
          filterScene()
          filterLight()
        } else if (mode === VisSceneDisplayMode.LIGHT) {
          reduceMaterial()
          filterScene()
          reduceLight()
        } else if (mode === VisSceneDisplayMode.ENV) {
          reduceMaterial()
          reduceScene()
          reduceLight()
        } else {
          console.warn(`VisScene can not set this mode: ${mode}`)
        }
      }

      if (config.displayMode) {
        this.displayMode = config.displayMode
        this.setDispalyMode(this.displayMode)
      } else {
        this.displayMode = VisSceneDisplayMode.ENV
        this.setDispalyMode(this.displayMode)
      }
    }

    this.dispalyModeTest()
  }

  // 设置默认相机
  setDefaultCamera (): void {
    this.defaultCamera = new VisPerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    this.cameraMap.set('defaultCamera', this.defaultCamera)
  }

  // 获取相机
  getCamera (vid: string): VisCamera | null {
    if (validate(vid)) {
      return this.cameraMap.get(vid) || null
    } else {
      console.error('You provided an illegal vid')
      return null
    }
  }

  // 设置视角方向
  setViewPoint (direction: VisSceneViewpoint): void {
    
    this.dispatchEvent({type: `${direction}ViewPoint`})
    
  }

  // 添加物体进入场景记录物体与分组 与 渲染模式
  add(...object: VisObject3D[]): this {
    object.forEach(elem => {
      if (elem instanceof Mesh) {
        this.meshMap.set(elem.vid, elem)
      } else if (elem instanceof Line) {
        this.lineMap.set(elem.vid, elem)
      } else if (elem instanceof Light) {
        this.lightMap.set(elem.vid, elem)
      } else if (elem instanceof Points) {
        this.pointsMap.set(elem.vid, elem)
      } else if (elem instanceof Sprite) {
        this.spriteMap.set(elem.vid, elem)
      } else if (elem instanceof Camera) {
        this.cameraMap.set(elem.vid, elem as VisCamera)
      }
    })
    if (this.displayMode !== undefined) {
      this.setDispalyMode!(this.displayMode)
    }
    return super.add(...object)
  }

  // 清除不同物体组的缓存 材质缓存
  remove (...object: VisObject3D[]): this {
    const materialCacheMap = this.materialCacheMap
    object.forEach(elem => {
      materialCacheMap && materialCacheMap.has(elem) && materialCacheMap.delete(elem)
      if (elem instanceof Mesh) {
        this.meshMap.delete(elem.vid)
      } else if (elem instanceof Line) {
        this.lineMap.delete(elem.vid)
      } else if (elem instanceof Light) {
        this.lightMap.delete(elem.vid)
      } else if (elem instanceof Points) {
        this.pointsMap.delete(elem.vid)
      } else if (elem instanceof Sprite) {
        this.spriteMap.delete(elem.vid)
      } else if (elem instanceof Camera) {
        this.cameraMap.delete(elem.vid)
      }
    })

    return super.remove(...object)
  }

  // 内部直接加入场景
  _add(...object: Object3D[]): this {
    return super.add(...object)
  }
  // 内部直接移出场景
  _remove(...object: Object3D[]): this {
    return super.remove(...object)
  }

  // displayMode 测试
  dispalyModeTest (): this {
    const mesh = new VisMesh(new BoxBufferGeometry(10, 10, 10), new MeshStandardMaterial({ color: 'red' }))
    const mesh2 = new VisMesh(new SphereBufferGeometry(), new MeshStandardMaterial({ color: 'red' }))
    mesh.vid = '111'
    mesh2.vid = '222'
    mesh.position.set(7, 7, 7)
    mesh2.position.set(-7, -7, -7)
    this.add(mesh)
    this.add(mesh2)
    const pointLight = new VisPointLight({
      distance: 55
    })

    pointLight.position.set(15, 15, 15)

    this.add(pointLight)
    return this
  }
}