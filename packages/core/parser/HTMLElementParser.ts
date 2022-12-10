import { CONFIGFACTORY, CONFIGTYPE } from "@vis-three/middleware";
import { ParseParams, Parser, ResourceHanlder } from "./Parser";

export class HTMLElementParser extends Parser {
  selector: ResourceHanlder = (
    url: string,
    resource: HTMLElement,
    parseMap: Map<Function, Parser>
  ) => {
    if (resource instanceof HTMLElement) {
      return parseMap.get(HTMLElementParser) || null;
    } else {
      return null;
    }
  };

  parse({ url, resource, configMap, resourceMap }: ParseParams): void {
    const config = CONFIGFACTORY[CONFIGTYPE.CSS3DPLANE]();
    config.element = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
