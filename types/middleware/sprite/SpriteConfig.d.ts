import { Vector2Config } from "../common/CommonConfig";
import { ObjectConfig } from "../object/ObjectConfig";
export interface SpriteConfig extends ObjectConfig {
    material: string;
    center: Vector2Config;
}
export declare const getSpriteConfig: () => SpriteConfig;
