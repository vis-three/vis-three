import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { CONFIGTYPE } from "../middleware/constants/configType";
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
    const config = CONFIGFACTORY[CONFIGTYPE.CANVASTEXTURE]();
    config.url = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
