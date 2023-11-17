import { Points, ShaderMaterial, Texture } from "three";
export interface RangeParticleParameters {
    range: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        front: number;
        back: number;
    };
    amount: number;
    size: number;
    alphaMap: Texture;
    opacity: number;
    flicker: boolean;
}
export declare class RangeParticleMaterial extends ShaderMaterial {
    constructor(params: {
        flicker?: boolean;
        time?: number;
        alphaMap?: Texture;
        size?: number;
        opacity?: number;
    });
}
export declare class RangeParticle extends Points {
    range: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        front: number;
        back: number;
    };
    amount: number;
    constructor(params: RangeParticleParameters);
    updateGeometry(): void;
    resetGeometry(): void;
}
