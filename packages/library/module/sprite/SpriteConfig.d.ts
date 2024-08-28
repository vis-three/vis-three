import { Vector2Config } from "@vis-three/tdcm";
import { SolidObjectConfig } from "@vis-three/module-solid-object";
export interface SpriteConfig extends SolidObjectConfig {
    material: string;
    center: Vector2Config;
}
export declare const getSpriteConfig: () => SpriteConfig;
