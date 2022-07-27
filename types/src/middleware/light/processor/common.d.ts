import { Light } from "three";
import { ProcessParams } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { IgnoreAttribute } from "../../../utils/utils";
import { LightConifg } from "../LightConfig";
export declare const colorHandler: <C extends LightConifg, O extends Light>({ target, value, }: ProcessParams<C, O>) => void;
export declare const lightCreate: <C extends LightConifg, O extends Light>(light: O, config: C, filter: import("../../../utils/utils").DeepUnion<import("../../../utils/utils").DeepPartial<import("../../../utils/utils").DeepRecord<C, boolean>>, boolean>, engine: EngineSupport) => O;
export declare const lightCommands: import("../../object/ObjectProcessor").ObjectCommands<import("../../object/ObjectConfig").ObjectConfig, import("three").Object3D<import("three").Event>> & {
    set: {
        color: <C extends LightConifg, O extends Light>({ target, value, }: ProcessParams<C, O>) => void;
        scale: () => void;
        rotation: () => void;
        lookAt: () => void;
    };
};
