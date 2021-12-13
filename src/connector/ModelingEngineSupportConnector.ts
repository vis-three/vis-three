import { Camera, Light, Material, Mesh, Object3D } from 'three';
import { CameraCompiler } from '../case/camera/CameraCompiler';
import { SymbolConfig } from '../case/common/CommonConfig';
import { LightCompiler } from '../case/light/LightCompiler';
import { ModelCompiler } from '../case/model/ModelCompiler';
import { AddHelperEvent, HELPERCOMPILEREVENTTYPE } from '../engine/ModelingEngine/SceneHelperCompiler';
import { ModelingEngineSupport, MODULETYPE } from '../main';
import { DataSupportManager} from '../manager/DataSupportManager';
import { ResourceManager } from '../manager/ResourceManager';

export interface ModelingConnectorParameters {
  domList: Array<HTMLElement>
  dataSupportManager?: DataSupportManager
  resourceManager?: ResourceManager
}

export class ModelingEngineSupportConnector {

  private domEngineMap!: Map<HTMLElement, ModelingEngineSupport>

  constructor (parameters: ModelingConnectorParameters) {
    if (!parameters.domList.length) {
      console.error(`modeling engine connector must have a dom target`)
      return
    }

    const dataSupportManager = parameters.dataSupportManager || new DataSupportManager()
    const resourceManager = parameters.resourceManager || new ResourceManager()

    // 创建引擎
    // dom与引擎映射 dom -- engineSupport
    const domEngineMap = new Map<HTMLElement, ModelingEngineSupport>()

    const DIEngine = (dom: HTMLElement, i: number, arr: HTMLElement[]) => {
      const engineSupport = new ModelingEngineSupport({
        dom,
        dataSupportManager,
        resourceManager
      })
      domEngineMap.set(dom, engineSupport)
    }

    // 同步物体变换
    let cameraMap: Map<string, Camera>
    let lightMap: Map<string, Light>
    let modelMap: Map<string, Object3D>
    // dom与编译物体映射 dom -- [Map<vid, object3D> ... ]
    const domCompilerObjectMap = new Map<HTMLElement, Set<Map<string, Object3D>>>()

    // 编译物体反转映射 WeakMap<object3D, vid>
    const objectReversalMap = new WeakMap<Object3D, string>()

    const syncObject = (dom: HTMLElement, i: number, arr: HTMLElement[]) => {
      const engineSupport = domEngineMap.get(dom)!
      // 物体map
      cameraMap = (engineSupport.getCompiler(MODULETYPE.CAMERA) as CameraCompiler).getMap()
      lightMap = (engineSupport.getCompiler(MODULETYPE.LIGHT) as LightCompiler).getMap()
      modelMap = (engineSupport.getCompiler(MODULETYPE.MODEL) as ModelCompiler).getMap()

      // 添加物体map vid -- object
      const objectMapSet = new Set<Map<string, Object3D>>()
      
      objectMapSet.add(cameraMap)
      objectMapSet.add(lightMap)
      objectMapSet.add(modelMap)

      domCompilerObjectMap.set(dom, objectMapSet)

      // 添加物体反转
      cameraMap.forEach((camera, vid) => {
        objectReversalMap.set(camera, vid)
      })

      lightMap.forEach((light, vid) => {
        objectReversalMap.set(light, vid)
      })

      modelMap.forEach((model, vid) => {
        objectReversalMap.set(model, vid)
      })
    }

    // 同步辅助
    // dom与物体辅助映射 dom -- helperMap
    const domHelperMap = new Map<HTMLElement, Map<Object3D, Object3D>>()
    const cacheRootVidHelperMap = new Map()
    const syncHelper = (dom: HTMLElement, i: number, arr: HTMLElement[]) => {
      // 添加物体辅助
      const helperCompiler = domEngineMap.get(dom)!.getScene().getHelperCompiler()
      const helperMap = helperCompiler.getMap()

      domHelperMap.set(dom, helperMap)
      // 同步辅助物体材质
      // 初始同步
      if (i === 0) {
        helperMap.forEach((helper, object) => {
          // 查object的vid
          cacheRootVidHelperMap.set(objectReversalMap.get(object)!, helper)
        })
      } else {
        const currentHelperMap = helperCompiler.getMap()
        currentHelperMap.forEach((helper, object) => {
          // 查object的vid
          const rootHelper = cacheRootVidHelperMap.get(objectReversalMap.get(object)!)
          const oldMaterial = (helper as Mesh).material
            // 清空显存
            if (Array.isArray(oldMaterial)) {
              oldMaterial.forEach(material => {
                material.dispose()
              })
            } else {
              (oldMaterial as Material).dispose()
            }
            (helper as Mesh).material = rootHelper.material
        })
      }

      
      // 运行时同步
      helperCompiler.addEventListener(HELPERCOMPILEREVENTTYPE.ADD, event => {
        const e = event as AddHelperEvent
        const helper = e.helper as Mesh
        const object = e.object
        // 查出物体vid
        const vid = objectReversalMap.get(object)
        if (vid) {
          // 从每个引擎里面查出vid对应的物体
          const otherObjectSet = new Set<Object3D>()
          domCompilerObjectMap.forEach((engineObjectMapSet, dom) => {

            engineObjectMapSet.forEach(vidObjectMap => {
              if (vidObjectMap.has(vid) && vidObjectMap.get(vid) !== object) {
                otherObjectSet.add(vidObjectMap.get(vid)!)
              }   
            })

          })
          // 从每个辅助map里面查出对应的辅助
          const otherHelperSet = new Set<Object3D>()
          domHelperMap.forEach((helperMap, dom) => {
            otherObjectSet.forEach(targetObject => {
              const otherHelper = helperMap.get(targetObject)
              if (otherHelper && otherHelper !== helper) {
                otherHelperSet.add(otherHelper)
              }
            })
          })

          otherObjectSet.clear()

          // 对齐辅助的材质
          otherHelperSet.forEach(otherHelper => {
            const oldMaterial = (otherHelper as Mesh).material
            if (oldMaterial !== helper.material) {
              // 清空显存
              if (Array.isArray(oldMaterial)) {
                oldMaterial.forEach(material => {
                  material.dispose()
                })
              } else {
                (oldMaterial as Material).dispose()
              }
              (otherHelper as Mesh).material = helper.material
            }
          })
        } else {
          console.error(`connector can not found this object vid sign: ${object}`)
        }
        
      })
    }
    

    parameters.domList.forEach((dom, i, arr) => {
      // 创建引擎
      DIEngine(dom, i, arr)
      // 同步物体
      syncObject(dom, i, arr)
      // 同步辅助
      syncHelper(dom, i, arr)
      // 同步ransformControls
    })

    cacheRootVidHelperMap.clear()

    this.domEngineMap = domEngineMap
  }

  getEngineSupport (dom: HTMLElement): ModelingEngineSupport | undefined {
    return this.domEngineMap.get(dom)
  }
}