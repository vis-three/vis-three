import { ProxyNotice } from "@vis-three/core";
import { Camera } from "three";
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
