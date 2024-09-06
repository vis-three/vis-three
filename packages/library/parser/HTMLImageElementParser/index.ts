import {
  CONFIG_FACTORY,
  CONFIG_TYPE,
  ParseParams,
  Parser,
  ResourceHanlder,
} from "@vis-three/tdcm";
import { ImageTextureConfig } from "@vis-three/module-texture/TextureConfig";

export class HTMLImageElementParser extends Parser {
  selector: ResourceHanlder = (
    url: string,
    resource: HTMLImageElement,
    parseMap: Map<Function, Parser>
  ) => {
    if (resource instanceof HTMLImageElement) {
      return parseMap.get(HTMLImageElementParser) || null;
    } else {
      return null;
    }
  };

  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    const config = CONFIG_FACTORY[
      CONFIG_TYPE.IMAGETEXTURE
    ]() as ImageTextureConfig;
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
