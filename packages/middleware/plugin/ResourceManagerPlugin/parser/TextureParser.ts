import { Texture } from "three";
import { CONFIGFACTORY, CONFIGTYPE } from "../../../module";
import { ImageTextureConfig } from "../../../texture/TextureConfig";
import { ParseParams, Parser, ResourceHanlder } from "./Parser";

export class TextureParser extends Parser {
  selector: ResourceHanlder = (
    url: string,
    resource: Texture,
    parseMap: Map<Function, Parser>
  ) => {
    if (resource instanceof Texture) {
      return parseMap.get(TextureParser) || null;
    } else {
      return null;
    }
  };
  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    const config = CONFIGFACTORY[
      CONFIGTYPE.LOADTEXTURE
    ]() as ImageTextureConfig;
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
