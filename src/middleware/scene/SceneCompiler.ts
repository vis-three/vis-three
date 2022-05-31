import { Color, Fog, FogExp2, Scene, Texture } from "three";
import { validate } from "uuid";
import { SymbolConfig } from "../common/CommonConfig";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SceneConfig, SceneFogConfig } from "./SceneConfig";

export interface SceneCompilerTarget extends ObjectCompilerTarget<SceneConfig> {
  [key: string]: SceneConfig;
}

export class SceneCompiler extends ObjectCompiler<
  SceneConfig,
  SceneCompilerTarget,
  Scene
> {
  MODULE: MODULETYPE = MODULETYPE.SCENE;

  private textureMap: Map<SymbolConfig["type"], Texture>;

  private fogCache: Fog | FogExp2 | null;

  constructor() {
    super();
    this.textureMap = new Map();
    this.fogCache = null;

    this.mergeFilterAttribute({
      background: true,
      environment: true,
      fog: true,
    });
  }

  /**
   * @override
   */
  protected setLookAt(vid: string, target: string): this {
    return this;
  }

  private background(vid: string, value: string | null) {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid mapping object: '${vid}'`
      );
      return;
    }

    const scene = this.map.get(vid)!;
    if (!value) {
      scene.background = null;
      return;
    }

    if (validate(value)) {
      if (this.textureMap.has(value)) {
        scene.background = this.textureMap.get(value)!;
      } else {
        console.warn(
          `scene compiler can not found this vid texture : '${value}'`
        );
      }
    } else {
      scene.background = new Color(value);
    }
  }

  private environment(vid: string, value: string | null) {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid mapping object: '${vid}'`
      );
      return;
    }

    const scene = this.map.get(vid)!;

    if (!value) {
      scene.environment = null;
      return;
    }

    if (validate(value)) {
      if (this.textureMap.has(value)) {
        scene.environment = this.textureMap.get(value)!;
      } else {
        console.warn(
          `scene compiler can not found this vid texture : '${value}'`
        );
      }
    } else {
      console.warn(`this vid is illegal: '${value}'`);
    }
  }

  private fog(vid: string, config: SceneFogConfig) {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid mapping object: '${vid}'`
      );
      return;
    }

    const scene = this.map.get(vid)!;

    if (config.type === "") {
      this.fogCache = null;
      scene.fog = null;
      return;
    }

    if (config.type === "Fog") {
      if (this.fogCache instanceof Fog) {
        const fog = this.fogCache;
        fog.color = new Color(config.color);
        fog.near = config.near;
        fog.far = config.far;
      } else {
        scene.fog = new Fog(config.color, config.near, config.far);
        this.fogCache = scene.fog as Fog;
      }
      return;
    }

    if (config.type === "FogExp2") {
      if (this.fogCache instanceof FogExp2) {
        const fog = this.fogCache;
        fog.color = new Color(config.color);
        fog.density = config.density;
      } else {
        scene.fog = new FogExp2(config.color, config.density);
        this.fogCache = scene.fog as FogExp2;
      }
      return;
    }

    console.warn(
      `scene compiler can not support this type fog:'${config.type}'`
    );
  }

  linkTextureMap(map: Map<SymbolConfig["type"], Texture>): this {
    this.textureMap = map;
    return this;
  }

  add(vid: string, config: SceneConfig): this {
    const scene = new Scene();

    this.map.set(vid, scene);
    this.weakMap.set(scene, vid);

    this.background(vid, config.background);
    this.environment(vid, config.environment);
    this.fog(vid, config.fog);

    super.add(vid, config);
    return this;
  }

  cover(vid: string, config: SceneConfig): this {
    this.background(vid, config.background);
    this.environment(vid, config.environment);
    this.fog(vid, config.fog);
    return super.cover(vid, config);
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(
        `sceneCompiler: can not found this vid mapping object: '${vid}'`
      );
      return this;
    }

    const attribute = path.length ? path[0] : key;

    const actionMap = {
      background: () => this.background(vid, value),
      environment: () => this.environment(vid, value),
      fog: () => this.fog(vid, this.target[vid].fog),
    };

    if (actionMap[attribute]) {
      actionMap[attribute]();
      return this;
    }

    super.set(vid, path, key, value);
    return this;
  }

  setTarget(target: SceneCompilerTarget): this {
    this.target = target;
    return this;
  }

  dispose(): this {
    super.dispose();
    return this;
  }
}
