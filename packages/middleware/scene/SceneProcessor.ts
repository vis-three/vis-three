import { Color, Fog, FogExp2, Scene } from "three";
import { validate } from "uuid";
import { CONFIGTYPE } from "../constants/configType";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  objectCommands,
  ObjectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import { SceneConfig } from "./SceneConfig";

const setBackground = function (
  scene: Scene,
  value: string | null,
  engine: EngineSupport
) {
  if (!value) {
    scene.background = null;
    return;
  }

  if (validate(value)) {
    const texture = engine.compilerManager.getTexture(value);
    if (texture) {
      scene.background = texture;
    } else {
      console.warn(`engine can not found this vid texture : '${value}'`);
    }
  } else {
    scene.background = new Color(value);
  }
};

const setEnvironment = function (
  scene: Scene,
  value: string | null,
  engine: EngineSupport
) {
  if (!value) {
    scene.environment = null;
    return;
  }

  if (validate(value)) {
    const texture = engine.compilerManager.getTexture(value);
    if (texture) {
      scene.environment = texture;
    } else {
      console.warn(`engine can not found this vid texture : '${value}'`);
    }
  } else {
    console.warn(`scene environment is illeage: ${value}`);
  }
};

export default defineProcessor<SceneConfig, Scene>({
  configType: CONFIGTYPE.SCENE,
  commands: {
    add: (<ObjectCommands<SceneConfig, Scene>>(<unknown>objectCommands)).add,
    set: {
      ...(<ObjectCommands<SceneConfig, Scene>>(<unknown>objectCommands)).set,
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
      background({ target, value, engine }) {
        setBackground(target, value, engine);
      },
      environment({ target, value, engine }) {
        setEnvironment(target, value, engine);
      },
    },
    delete: (<ObjectCommands<SceneConfig, Scene>>(<unknown>objectCommands))
      .delete,
  },
  create(config: SceneConfig, engine: EngineSupport): Scene {
    const scene = new Scene();
    setBackground(scene, config.background, engine);
    setEnvironment(scene, config.environment, engine);

    if (config.fog.type) {
      const fog = config.fog;
      if (fog.type === "Fog") {
        scene.fog = new Fog(fog.color, fog.near, fog.far);
      } else if (fog.type === "FogExp2") {
        scene.fog = new FogExp2(fog.color, fog.density);
      } else {
        console.warn(
          `scene processor can not support this type fog:'${config.type}'`
        );
      }
    }

    return objectCreate(
      scene,
      config,
      {
        lookAt: true,
        background: true,
        environment: true,
        fog: true,
      },
      engine
    );
  },
  dispose: objectDispose,
});
