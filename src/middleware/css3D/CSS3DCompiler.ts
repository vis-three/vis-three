import {
  CSS3DObject,
  CSS3DSprite,
} from "three/examples/jsm/renderers/CSS3DRenderer";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { CSS3DAllType } from "./CSS3DConfig";

export interface CSS3DCompilerTarget
  extends ObjectCompilerTarget<CSS3DAllType> {
  [key: string]: CSS3DAllType;
}

export class CSS3DCompiler extends ObjectCompiler<
  CSS3DAllType,
  CSS3DCompilerTarget,
  CSS3DObject
> {
  COMPILER_NAME: string = MODULETYPE.CSS3D;

  private resourceMap: Map<string, unknown>;
  private constructMap: Map<string, (config: CSS3DAllType) => CSS3DObject>;

  constructor() {
    super();

    this.constructMap = new Map();
    this.resourceMap = new Map();

    this.constructMap.set(
      CONFIGTYPE.CSS3DOBJECT,
      (config: CSS3DAllType) => new CSS3DObject(this.getElement(config.element))
    );
    this.constructMap.set(
      CONFIGTYPE.CSS3DSPRITE,
      (config: CSS3DAllType) => new CSS3DSprite(this.getElement(config.element))
    );

    this.mergeFilterAttribute({
      element: true,
      interactive: true,
    });
  }

  private getElement(element: string): HTMLElement {
    if (!this.resourceMap.has(element)) {
      console.warn(
        `css3D compiler: can not found resource element: ${element}`
      );
      return document.createElement("div");
    }

    const resource = this.resourceMap.get(element);

    if (resource instanceof HTMLElement) {
      return resource;
    } else {
      console.warn(
        `css3D compiler can not suport render this resource type.`,
        (resource as object).constructor,
        element
      );
      return document.createElement("div");
    }
  }

  linkRescourceMap(map: Map<string, unknown>): this {
    this.resourceMap = map;
    return this;
  }

  add(vid: string, config: CSS3DAllType): this {
    if (config.type && this.constructMap.has(config.type)) {
      const css3d = this.constructMap.get(config.type)!(config);
      css3d.type = config.type;

      this.map.set(vid, css3d);
      this.weakMap.set(css3d, vid);

      super.add(vid, config);
    } else {
      console.warn(`css3D compiler can not support this type: ${config.type}`);
    }
    return this;
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(
        `css3D compiler: can not found this vid mapping object: '${vid}'`
      );
      return this;
    }

    const object = this.map.get(vid)!;

    if (key === "element") {
      object.element = this.getElement(value);
      return this;
    }

    super.set(vid, path, key, value);

    return this;
  }
}
