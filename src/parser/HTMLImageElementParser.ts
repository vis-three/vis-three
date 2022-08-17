import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { ParseParams, Parser } from "./Parser";

export class HTMLImageElementParser extends Parser {
  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    const config = CONFIGFACTORY[CONFIGTYPE.IMAGETEXTURE]();
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
