import { Texture } from "three";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGTYPE } from "../middleware/constants/configType";
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
