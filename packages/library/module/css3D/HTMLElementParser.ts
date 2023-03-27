import {
  CONFIGFACTORY,
  CONFIGTYPE,
  ParseParams,
  Parser,
  ResourceHanlder,
} from "@vis-three/middleware";
import { CSS3DPlaneConfig } from "./CSS3DConfig";

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
    const config = CONFIGFACTORY[CONFIGTYPE.CSS3DPLANE]() as CSS3DPlaneConfig;
    config.element = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
