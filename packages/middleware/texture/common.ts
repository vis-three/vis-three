import { EngineSupport } from "../engine";
import { MODULETYPE, ProcessParams } from "../module";
import { globalAntiShake } from "../utils";
import { TextureCompiler } from "./TextureCompiler";

export const needUpdateRegCommand = {
  reg: new RegExp(
    "wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping"
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
