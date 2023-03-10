import { CONFIGFACTORY, CONFIGTYPE } from "../../../module";
import { CanvasTextureConfig } from "../../../texture/TextureConfig";
import { ParseParams, Parser, ResourceHanlder } from "./Parser";

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
    const config = CONFIGFACTORY[
      CONFIGTYPE.CANVASTEXTURE
    ]() as CanvasTextureConfig;
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
