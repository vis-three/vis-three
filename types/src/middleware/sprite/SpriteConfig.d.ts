import { Vector2Config } from "../common/CommonConfig";
import { SolidObjectConfig } from "../solidObject/SolidObjectConfig";
export interface SpriteConfig extends SolidObjectConfig {
    material: string;
    center: Vector2Config;
}
export declare const getSpriteConfig: () => SpriteConfig;
