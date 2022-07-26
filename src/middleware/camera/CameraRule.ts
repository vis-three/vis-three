import { Camera } from "three";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { CameraCompiler } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";

export type CameraRule = ObjectRule<
  CameraCompiler,
  CameraConfigAllType,
  Camera
>;
export const CameraRule: CameraRule = function (
  notice: ProxyNotice,
  compiler: CameraCompiler
) {
  ObjectRule(notice, compiler);
};
