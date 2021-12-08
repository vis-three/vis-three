import { Color, Material, Mesh, MeshBasicMaterial, Object3D } from "three";
import { PointLightHelper } from "../../extends/helper/light/PointLightHelper";
import { CameraHelper } from "../../extends/helper/camera/CameraHelper";
import { ModelingScene } from "./ModelingScene";
import { MeshHelper } from "../../extends/helper/object/MeshHelper";
import { ACTIVECOLOR, HELPERCOLOR, HOVERCOLOR } from "../../case/constants/COLOR";

export class SceneHelperCompiler {

  private static helperColorHex = new Color(HELPERCOLOR).getHex()
  private static activeColorHex = new Color(ACTIVECOLOR).getHex()
  private static hoverColorHex = new Color(HOVERCOLOR).getHex()

  private static typeHelperMap = {
    'PointLight': PointLightHelper,
    'PerspectiveCamera': CameraHelper,
    'OrthographicCamera': CameraHelper,
    'Mesh': MeshHelper
  }

  private static filterHelperMap = {
    'AmbientLight': true
  }

  private map: Map<Object3D, Object3D>
  private scene: ModelingScene

  constructor (scene: ModelingScene) {
    this.map = new Map()
    this.scene = scene
  }

  add (object: Object3D) {
    if (SceneHelperCompiler.filterHelperMap[object.type]) {
      return
    }

    if (SceneHelperCompiler.typeHelperMap[object.type]) {
      const helper = new SceneHelperCompiler.typeHelperMap[object.type](object)
      this.map.set(object, helper)
      this.scene._add(helper)
    } else {
      console.warn(`Scene helper compiler can not support this type object: '${object.type}'`)
    }
  }

  remove(object: Object3D) {
    if (SceneHelperCompiler.filterHelperMap[object.type]) {
      return
    }

    if (this.map.has(object)) {
      const helper = this.map.get(object)! as Mesh
      this.scene._remove(helper)
      helper.geometry.dispose()
      if (helper.material) {
        if (helper.material instanceof Material) {
          helper.material.dispose()
        } else {
          helper.material.forEach(material => {
            material.dispose()
          })
        }
      }
      this.map.delete(object)
    } else {
      console.warn(`Scene helper compiler can not found this object\`s helper: ${object}`)
    }
  }

  setVisiable (visiable: boolean) {
    const scene = this.scene
    if (visiable) {
      this.map.forEach((origin, helper) => {
        scene._add(helper)
      })
    } else {
      this.map.forEach((origin, helper) => {
        scene._remove(helper)
      })
    }
  }

  // 重置辅助的颜色
  resetHelperColor (...object: Object3D[]) {
    const map = this.map
    const helperColorHex = SceneHelperCompiler.helperColorHex
    object.forEach(elem => {
      if (map.has(elem)) {
        const helper = map.get(elem)! as Mesh
        (helper.material as MeshBasicMaterial).color.setHex(helperColorHex)
      }
    })
  }

  // 设置hover辅助色
  setHelperHoverColor (...object: Object3D[]) {
    const map = this.map
    const hoverColorHex = SceneHelperCompiler.hoverColorHex
    object.forEach(elem => {
      if (map.has(elem)) {
        const helper = map.get(elem)! as Mesh
        (helper.material as MeshBasicMaterial).color.setHex(hoverColorHex)
      }
    })
  }

  // 设置激活辅助色
  setHelperActiveColor (...object: Object3D[]) {
    const map = this.map
    const activeColorHex = SceneHelperCompiler.activeColorHex
    object.forEach(elem => {
      if (map.has(elem)) {
        const helper = map.get(elem)! as Mesh
        (helper.material as MeshBasicMaterial).color.setHex(activeColorHex)
      }
    })
  }
}