import {
  CONFIGFACTORY,
  CONFIGTYPE,
  ParseParams,
  Parser,
  ResourceHanlder,
} from "@vis-three/middleware";
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
    const config = CONFIGFACTORY[
      CONFIGTYPE.IMAGETEXTURE
    ]() as ImageTextureConfig;
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
