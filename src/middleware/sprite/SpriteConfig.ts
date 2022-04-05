import { Vector2Config } from "../common/CommonConfig";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface SpriteConfig extends ObjectConfig {
  material: string;
  center: Vector2Config;
}

export const getSpriteConfig = function (): SpriteConfig {
  return Object.assign(getObjectConfig(), {
    type: "Sprite",
    material: "",
    center: {
      x: 0.5,
      y: 0.5,
    },
  });
};
