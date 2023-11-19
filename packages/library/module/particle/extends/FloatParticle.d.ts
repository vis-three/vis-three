import { Color, Points, ShaderMaterial, Texture } from "three";
export interface FloatParticleParameters {
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
    floatRange: number;
    refColor: Color;
    colorRange: number;
}
export declare class RangeParticleMaterial extends ShaderMaterial {
    constructor(params: {
        flicker?: boolean;
        time?: number;
        alphaMap?: Texture;
        size?: number;
        opacity?: number;
        floatRange?: number;
    });
}
export declare class FloatParticle extends Points {
    range: {
        top: number;
        bottom: number;
        left: number;
        right: number;
        front: number;
        back: number;
    };
    amount: number;
    refColor: Color;
    colorRange: number;
    constructor(params: FloatParticleParameters);
    private getRandomNum;
    private getRandomColor;
    updateGeometry(): void;
    resetGeometry(): void;
    dispose(): void;
}
