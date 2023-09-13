import {
  EngineSupport,
  globalAntiShake,
  MODULETYPE,
  ProcessParams,
} from "@vis-three/middleware";
import { TextureCompiler } from "../TextureCompiler";

export const needUpdateRegCommand = {
  reg: new RegExp(
    "wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping|flipY"
  ),
  handler({
    target,
    key,
    value,
  }: ProcessParams<any, any, EngineSupport, TextureCompiler>) {
    target[key] = value;
    target.needsUpdate = true;
  },
};

export const urlHanlder = function ({
  target,
  value,
  engine,
}: {
  target: any;
  value: string;
  engine: EngineSupport;
}) {
  globalAntiShake.exec((finish) => {
    target.image = engine.compilerManager
      .getCompiler<TextureCompiler>(MODULETYPE.TEXTURE)!
      .getResource(value, [
        HTMLImageElement,
        HTMLVideoElement,
        HTMLCanvasElement,
      ]);

    target.needsUpdate = true;

    if (target.images === TextureCompiler.replaceImage) {
      return false;
    }

    return true;
  });
};
