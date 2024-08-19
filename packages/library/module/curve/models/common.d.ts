import { CommandParameters } from "@vis-three/tdcm";
import { CurveConfig } from "../CurveConfig";
import { Curve, Vector2 } from "three";
export declare const getRegCommand: <C extends CurveConfig = CurveConfig, O extends Curve<Vector2> = Curve<Vector2>>() => {
    reg: RegExp;
    handler: (params: CommandParameters<C, O>) => void;
};
