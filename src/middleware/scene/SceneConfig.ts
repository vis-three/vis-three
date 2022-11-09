import { CONFIGTYPE } from "../constants/configType";
import { uniqueSymbol } from "../constants/UNIQUESYMBOL";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface SceneFogConfig {
  type: string; //"Fog" | "FogExp2" | "";
  color: string;
  near: number;
  far: number;
  density: number;
}

export interface SceneConfig extends ObjectConfig {
  background: string | null; // color or vid
  environment: string | null;
  fog: SceneFogConfig;
}

export const getSceneConfig = function (): SceneConfig {
  return Object.assign(getObjectConfig(), {
    vid: uniqueSymbol(CONFIGTYPE.SCENE),
    type: CONFIGTYPE.SCENE,
    background: "",
    environment: "",
    fog: {
      type: "",
      color: "rgb(150, 150, 150)",
      near: 1,
      far: 200,
      density: 0.003,
    },
  });
};
