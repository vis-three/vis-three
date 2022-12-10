import { CONFIGFACTORY, CONFIGTYPE } from "@vis-three/middleware";
import { Texture } from "three";
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
    const config = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]();
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
