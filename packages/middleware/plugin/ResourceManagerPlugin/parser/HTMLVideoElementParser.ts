import { CONFIGFACTORY, CONFIGTYPE } from "../../../module";
import { VideoTextureConfig } from "../../../texture/TextureConfig";
import { ParseParams, Parser, ResourceHanlder } from "./Parser";

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
    const config = CONFIGFACTORY[
      CONFIGTYPE.VIDEOTEXTURE
    ]() as VideoTextureConfig;
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
