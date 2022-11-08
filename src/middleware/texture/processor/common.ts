import { ProcessParams } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { antiShake } from "../../../utils/AntiShake";
import { TextureCompiler } from "../TextureCompiler";
import { TextureConfig } from "../TextureConfig";

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
    target.url = engine.compilerManager.textureCompiler.getResource(value, [
      HTMLImageElement,
      HTMLVideoElement,
      HTMLCanvasElement,
    ]);

    target.needsUpdate = true;

    if (target.url === TextureCompiler.replaceImage) {
      return false;
    }

    return true;
  });
};
