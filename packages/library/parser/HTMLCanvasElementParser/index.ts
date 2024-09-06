import {
  CONFIG_FACTORY,
  CONFIG_TYPE,
  ParseParams,
  Parser,
  ResourceHanlder,
} from "@vis-three/tdcm";
import { CanvasTextureConfig } from "@vis-three/module-texture/TextureConfig";

export class HTMLCanvasElementParser extends Parser {
  selector: ResourceHanlder = (
    url: string,
    resource: HTMLCanvasElement,
    parseMap: Map<Function, Parser>
  ) => {
    if (resource instanceof HTMLCanvasElement) {
      return parseMap.get(HTMLCanvasElementParser) || null;
    } else {
      return null;
    }
  };

  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    const config = CONFIG_FACTORY[
      CONFIG_TYPE.CANVASTEXTURE
    ]() as CanvasTextureConfig;
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
