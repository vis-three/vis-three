import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { ParseParams, Parser } from "./Parser";

export class HTMLElementParser extends Parser {
  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    const config = CONFIGFACTORY[CONFIGTYPE.CSS3DPLANE]();
    config.element = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
