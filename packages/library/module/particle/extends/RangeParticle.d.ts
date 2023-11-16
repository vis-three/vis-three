import { Points, Texture } from "three";
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
    colorMap: Texture;
    alphaMap: Texture;
    sizeAttenuation: boolean;
    opacity: number;
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
}
