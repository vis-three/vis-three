import { CanvasGenerator } from "../../../convenient/CanvasGenerator";
import { ProcessParams } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";

export const replaceImage = new CanvasGenerator({
  width: 512,
  height: 512,
})
  .draw((ctx) => {
    ctx.translate(256, 256);
    ctx.font = "72px";
    ctx.fillStyle = "white";
    ctx.fillText("暂无图片", 0, 0);
  })
  .getDom();

export const getResource = function <T extends Function>(
  url: string,
  engine: EngineSupport,
  instanceClasses: T | T[]
): T | HTMLCanvasElement {
  const resourceMap = engine.resourceManager.resourceMap;

  if (!resourceMap.has(url)) {
    console.warn(`engine resourceManager can not found this url: ${url}`);
    return replaceImage;
  }

  const resource = resourceMap.get(url)!;

  if (Array.isArray(instanceClasses)) {
    for (const instanceClass of instanceClasses) {
      if (resource instanceof instanceClass) {
        return resource as T;
      }
    }

    console.warn(
      `this url mapping resource is not a texture image class: ${url}`,
      resource
    );
    return replaceImage;
  } else {
    if (resource instanceof instanceClasses) {
      return resource as T;
    } else {
      console.warn(
        `this url mapping resource is not a texture image class: ${url}`,
        resource
      );
      return replaceImage;
    }
  }
};

export const needUpdateRegCommand = {
  reg: new RegExp("wrapS|wrapT|format|encoding|anisotropy|magFilter|minFilter"),
  handler({ target, key, value }: ProcessParams<any, any>) {
    target[key] = value;
    target.needsUpdate = true;
  },
};
