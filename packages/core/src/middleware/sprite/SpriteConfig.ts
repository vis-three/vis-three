import { Vector2Config } from "../common/CommonConfig";
import {
  getSolidObjectConfig,
  SolidObjectConfig,
} from "../solidObject/SolidObjectConfig";

export interface SpriteConfig extends SolidObjectConfig {
  material: string;
  center: Vector2Config;
}

export const getSpriteConfig = function (): SpriteConfig {
  return Object.assign(getSolidObjectConfig(), {
    type: "Sprite",

    material: "",
    center: {
      x: 0.5,
      y: 0.5,
    },
  });
};
