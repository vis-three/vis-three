import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { getSceneConfig, SceneConfig } from "../SceneConfig";
import { Color, Fog, FogExp2, Scene, Texture } from "three";
import { EngineSupport, globalOption, MODULE_TYPE } from "@vis-three/tdcm";
import { SceneEngineSupport } from "../SceneExtend";

export default defineObjectModel<
  SceneConfig,
  Scene,
  {},
  {
    setBackground: (
      scene: Scene,
      value: string | null,
      engine: EngineSupport
    ) => void;
    setEnvironment: (
      scene: Scene,
      value: string | null,
      engine: EngineSupport
    ) => void;
  },
  SceneEngineSupport
>((objectModel) => ({
  type: "Scene",
  config: getSceneConfig,
  shared: {
    setBackground(scene: Scene, value: string | null, engine: EngineSupport) {
      if (!value) {
        scene.background = null;
        return;
      }

      if (globalOption.symbol.validator(value)) {
        const texture = engine.compilerManager.getObjectFromModule(
          MODULE_TYPE.TEXTURE,
          value
        ) as Texture;
        if (texture) {
          scene.background = texture;
        } else {
          console.warn(`engine can not found this vid texture : '${value}'`);
        }
      } else {
        scene.background = new Color(value);
      }
    },
    setEnvironment(scene: Scene, value: string | null, engine: EngineSupport) {
      if (!value) {
        scene.environment = null;
        return;
      }

      if (globalOption.symbol.validator(value)) {
        const texture = engine.compilerManager.getObjectFromModule(
          MODULE_TYPE.TEXTURE,
          value
        ) as Texture;
        if (texture) {
          scene.environment = texture;
        } else {
          console.warn(`engine can not found this vid texture : '${value}'`);
        }
      } else {
        console.warn(`scene environment is illeage: ${value}`);
      }
    },
  },
  commands: {
    set: {
      lookAt() {},
      fog({ target, config, key, value }) {
        const fog = config.fog;
        if (!fog.type) {
          target.fog = null;
        } else if (fog.type === "Fog") {
          if (!target.fog || !(target.fog instanceof Fog)) {
            target.fog = new Fog(fog.color, fog.near, fog.far);
          } else {
            if (key === "color") {
              target.fog.color.copy(new Color(fog.color));
            } else {
              target.fog[key] && (target.fog[key] = value);
            }
          }
        } else if (fog.type === "FogExp2") {
          if (!target.fog || !(target.fog instanceof FogExp2)) {
            target.fog = new FogExp2(fog.color, fog.density);
          } else {
            if (key === "color") {
              target.fog.color.copy(new Color(fog.color));
            } else {
              target.fog[key] && (target.fog[key] = value);
            }
          }
        }
      },
      background({ model, target, value, engine }) {
        model.setBackground(target, value, engine);
      },
      environment({ model, target, value, engine }) {
        model.setEnvironment(target, value, engine);
      },
    },
  },
  create({ model, config, engine }) {
    const scene = new Scene();
    model.setBackground(scene, config.background, engine);
    model.setEnvironment(scene, config.environment, engine);

    if (config.fog.type) {
      const fog = config.fog;
      if (fog.type === "Fog") {
        scene.fog = new Fog(fog.color, fog.near, fog.far);
      } else if (fog.type === "FogExp2") {
        scene.fog = new FogExp2(fog.color, fog.density);
      } else {
        console.warn(
          `scene model: can not support this type fog:'${config.type}'`
        );
      }
    }

    objectModel.create!<SceneConfig>({
      model: model as unknown as ObjectModel,
      config,
      target: scene,
      engine,
      filter: {
        lookAt: true,
        background: true,
        environment: true,
        fog: true,
      },
    });

    return scene;
  },
  dispose({ target }) {
    objectModel.dispose!({ target });
  },
}));
