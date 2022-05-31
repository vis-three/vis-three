import {
  AmbientLight,
  Color,
  DirectionalLight,
  Light,
  PointLight,
  SpotLight,
} from "three";
import { LightConfigAllType } from "./LightConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { CONFIGTYPE } from "../constants/configType";

export interface LightCompilerTarget
  extends ObjectCompilerTarget<LightConfigAllType> {
  [key: string]: LightConfigAllType;
}

export class LightCompiler extends ObjectCompiler<
  LightConfigAllType,
  LightCompilerTarget,
  Light
> {
  MODULE: MODULETYPE = MODULETYPE.LIGHT;

  private constructMap: Map<string, () => Light>;

  constructor() {
    super();
    this.constructMap = new Map();
    this.constructMap.set(CONFIGTYPE.POINTLIGHT, () => new PointLight());
    this.constructMap.set(CONFIGTYPE.SPOTLIGHT, () => new SpotLight());
    this.constructMap.set(CONFIGTYPE.AMBIENTLIGHT, () => new AmbientLight());
    this.constructMap.set(
      CONFIGTYPE.DIRECTIONALLIGHT,
      () => new DirectionalLight()
    );

    this.mergeFilterAttribute({
      color: true,
      scale: true,
      rotation: true,
    });
  }

  protected setLookAt(vid: string, target: string): this {
    return this;
  }

  add(vid: string, config: LightConfigAllType): this {
    if (config.type && this.constructMap.has(config.type)) {
      const light = this.constructMap.get(config.type)!();

      light.color = new Color(config.color);

      this.map.set(vid, light);
      this.weakMap.set(light, vid);

      super.add(vid, config);
    } else {
      console.warn(
        `LightCompiler: can not support Light type: ${config.type}.`
      );
    }
    return this;
  }

  cover(vid: string, config: LightConfigAllType): this {
    const light = this.map.get(vid)!;

    if (!light) {
      console.warn(`light compiler can not found light: ${vid}`);
      return this;
    }

    light.color = new Color(config.color);
    return super.cover(vid, config);
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(
        `LightCompiler: can not found this vid mapping object: '${vid}'`
      );
      return this;
    }

    const object = this.map.get(vid)!;

    if (key === "color") {
      object.color = new Color(value);
      return this;
    }

    super.set(vid, path, key, value);

    return this;
  }

  dispose(): this {
    super.dispose();
    return this;
  }
}
