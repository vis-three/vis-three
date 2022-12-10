import { antiShake, EngineSupport, ProcessParams } from "@vis-three/core";
import { TextureCompiler } from "../TextureCompiler";

export const needUpdateRegCommand = {
  reg: new RegExp(
    "wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter|mapping"
  ),
  handler({ target, key, value }: ProcessParams<any, any>) {
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
  antiShake.exec((finish) => {
    target.image = engine.compilerManager.textureCompiler.getResource(value, [
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
