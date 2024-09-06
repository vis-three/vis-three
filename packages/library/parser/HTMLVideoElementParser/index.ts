import {
  CONFIG_FACTORY,
  CONFIG_TYPE,
  ParseParams,
  Parser,
  ResourceHanlder,
} from "@vis-three/tdcm";
import { VideoTextureConfig } from "@vis-three/module-texture/TextureConfig";

export class HTMLVideoElementParser extends Parser {
  selector: ResourceHanlder = (
    url: string,
    resource: HTMLVideoElement,
    parseMap: Map<Function, Parser>
  ) => {
    if (resource instanceof HTMLVideoElement) {
      return parseMap.get(HTMLVideoElementParser) || null;
    } else {
      return null;
    }
  };

  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    const config = CONFIG_FACTORY[
      CONFIG_TYPE.VIDEOTEXTURE
    ]() as VideoTextureConfig;
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
