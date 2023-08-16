import {
  CONFIGFACTORY,
  CONFIGTYPE,
  ParseParams,
  Parser,
  ResourceHanlder,
} from "@vis-three/middleware";
import { CSS3DPlaneConfig } from "@vis-three/module-css3d/CSS3DConfig";

export class HTMLElementParser extends Parser {
  private type: "css2D" | "css3D";

  constructor(type: "css2D" | "css3D" = "css3D") {
    super();

    this.type = type;
  }
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
    const config = CONFIGFACTORY[
      this.type === "css3D" ? CONFIGTYPE.CSS3DPLANE : CONFIGTYPE.CSS2DPLANE
    ]() as CSS3DPlaneConfig;
    config.element = url;

    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
