import { EngineSupport, ProcessorCommands, ProcessParams } from "@vis-three/middleware";
import { IgnoreAttribute } from "@vis-three/utils";
import { Light, Object3D } from "three";
import { LightCompiler } from "./LightCompiler";
import { LightConifg } from "./LightConfig";
export declare const colorHandler: <C extends LightConifg, O extends Light>({ target, value, }: ProcessParams<C, O, EngineSupport, LightCompiler>) => void;
export declare const lightCreate: <C extends LightConifg, O extends Light>(light: O, config: C, filter: import("@vis-three/utils").DeepUnion<import("@vis-three/utils").DeepPartial<import("@vis-three/utils").DeepRecord<C, boolean>>, boolean>, engine: EngineSupport) => O;
export type LightCommands<C extends LightConifg, O extends Light> = ProcessorCommands<C, O, EngineSupport, LightCompiler>;
export declare const lightCommands: import("@vis-three/module-object").ObjectCommands<import("@vis-three/module-object").ObjectConfig, Object3D<import("three").Event>> & {
    set: {
        color: <C extends LightConifg, O extends Light>({ target, value, }: ProcessParams<C, O, EngineSupport, LightCompiler>) => void;
        scale: () => void;
        rotation: () => void;
        lookAt: () => void;
    };
};
