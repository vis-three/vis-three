import { Vector2Config } from "@vis-three/middleware";
import { SolidObjectConfig } from "@vis-three/module-solid-object";
export interface SpriteConfig extends SolidObjectConfig {
    material: string;
    center: Vector2Config;
}
export declare const getSpriteConfig: () => SpriteConfig;
